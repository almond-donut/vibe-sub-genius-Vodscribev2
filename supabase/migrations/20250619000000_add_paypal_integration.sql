-- Create payment_transactions table
CREATE TABLE payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  paypal_order_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Users can only read their own transactions
CREATE POLICY "Users can view own transactions" ON payment_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can insert transactions (handled by service)
CREATE POLICY "Service can insert transactions" ON payment_transactions
  FOR INSERT WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_paypal_order_id ON payment_transactions(paypal_order_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);

-- Add new columns to profiles table for PayPal integration
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_date TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS paypal_order_id TEXT;

-- Update trigger function to handle subscription updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payment_transactions
CREATE TRIGGER update_payment_transactions_updated_at
    BEFORE UPDATE ON payment_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
