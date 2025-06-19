-- Add credit reset system for paid plan users
-- This migration adds automatic monthly credit reset functionality

-- Add fields for tracking credit cycles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_credit_reset TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS credits_used_this_cycle INTEGER DEFAULT 0;

-- Update existing data to set initial values
UPDATE public.profiles 
SET last_credit_reset = billing_cycle_start,
    credits_used_this_cycle = GREATEST(0, credits_total - credits_remaining)
WHERE last_credit_reset IS NULL;

-- Function to get credit allocation based on subscription tier
CREATE OR REPLACE FUNCTION get_tier_credits(tier TEXT)
RETURNS INTEGER AS $$
BEGIN
  CASE tier
    WHEN 'popular' THEN RETURN 8;
    WHEN 'premium' THEN RETURN 999;
    ELSE RETURN 1; -- free tier
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Function to check and reset credits if billing cycle has passed
CREATE OR REPLACE FUNCTION check_and_reset_credits(user_id UUID)
RETURNS VOID AS $$
DECLARE
  user_profile RECORD;
  should_reset BOOLEAN := FALSE;
  new_credits INTEGER;
BEGIN
  -- Get user profile
  SELECT * INTO user_profile 
  FROM public.profiles 
  WHERE id = user_id;
  
  -- Only reset for paid tiers (not free)
  IF user_profile.subscription_tier NOT IN ('popular', 'premium') THEN
    RETURN;
  END IF;
  
  -- Check if a month has passed since last reset
  IF user_profile.last_credit_reset IS NULL OR 
     user_profile.last_credit_reset <= (now() - INTERVAL '1 month') THEN
    should_reset := TRUE;
  END IF;
  
  -- Reset credits if needed
  IF should_reset THEN
    new_credits := get_tier_credits(user_profile.subscription_tier);
    
    UPDATE public.profiles 
    SET 
      credits_remaining = new_credits,
      credits_total = new_credits,
      credits_used_this_cycle = 0,
      last_credit_reset = now(),
      updated_at = now()
    WHERE id = user_id;
    
    -- Log the reset (optional, for debugging)
    INSERT INTO public.processing_jobs (
      user_id, 
      video_url, 
      status, 
      source_language, 
      target_language,
      tone_preference
    ) VALUES (
      user_id,
      'CREDIT_RESET_LOG', 
      'completed',
      'system',
      'system', 
      CONCAT('Credits reset to ', new_credits, ' for tier ', user_profile.subscription_tier)
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to deduct credits when processing a job
CREATE OR REPLACE FUNCTION deduct_credit(user_id UUID, credits_to_deduct INTEGER DEFAULT 1)
RETURNS BOOLEAN AS $$
DECLARE
  user_profile RECORD;
BEGIN
  -- First check and reset credits if needed
  PERFORM check_and_reset_credits(user_id);
  
  -- Get updated profile
  SELECT * INTO user_profile 
  FROM public.profiles 
  WHERE id = user_id;
  
  -- Check if user has enough credits
  IF user_profile.credits_remaining < credits_to_deduct THEN
    RETURN FALSE; -- Not enough credits
  END IF;
  
  -- Deduct credits
  UPDATE public.profiles 
  SET 
    credits_remaining = credits_remaining - credits_to_deduct,
    credits_used_this_cycle = credits_used_this_cycle + credits_to_deduct,
    updated_at = now()
  WHERE id = user_id;
  
  RETURN TRUE; -- Success
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to upgrade user subscription
CREATE OR REPLACE FUNCTION upgrade_subscription(user_id UUID, new_tier TEXT)
RETURNS VOID AS $$
DECLARE
  new_credits INTEGER;
BEGIN
  new_credits := get_tier_credits(new_tier);
  
  UPDATE public.profiles 
  SET 
    subscription_tier = new_tier,
    credits_remaining = new_credits,
    credits_total = new_credits,
    credits_used_this_cycle = 0,
    last_credit_reset = now(),
    billing_cycle_start = now(),
    updated_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-check credits on profile access
CREATE OR REPLACE FUNCTION auto_check_credits()
RETURNS TRIGGER AS $$
BEGIN
  -- Only check for paid tiers
  IF NEW.subscription_tier IN ('popular', 'premium') THEN
    PERFORM check_and_reset_credits(NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to auto-check credits when profile is accessed
DROP TRIGGER IF EXISTS auto_credit_check ON public.profiles;
CREATE TRIGGER auto_credit_check
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION auto_check_credits();

-- Add RLS policies for the new functions
GRANT EXECUTE ON FUNCTION check_and_reset_credits(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION deduct_credit(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION upgrade_subscription(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_tier_credits(TEXT) TO authenticated;
