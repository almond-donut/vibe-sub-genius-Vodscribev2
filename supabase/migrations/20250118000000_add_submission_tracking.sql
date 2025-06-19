-- Add submission tracking to profiles table
ALTER TABLE public.profiles ADD COLUMN preview_submissions_used INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN preview_submissions_limit INTEGER DEFAULT 1;

-- Update existing users to have the new fields
UPDATE public.profiles SET 
  preview_submissions_used = 0,
  preview_submissions_limit = 1
WHERE preview_submissions_used IS NULL;

-- Update the trigger function to set submission limits for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    preview_minutes_used, 
    preview_minutes_limit,
    preview_submissions_used,
    preview_submissions_limit
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    0,
    30,
    0,
    1
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
