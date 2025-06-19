import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface PayPalButtonProps {
  planId: 'popular' | 'premium';
  userId: string;
  onSuccess?: () => void;
}

interface PlanDetails {
  name: string;
  price: string;
  amount: number;
  credits: number;
  description: string;
}

const PLANS: Record<string, PlanDetails> = {
  popular: {
    name: 'Popular Plan',
    price: '$12.99',
    amount: 12.99,
    credits: 8,
    description: '8 credits + Priority processing'
  },
  premium: {
    name: 'Premium Plan', 
    price: '$29.99',
    amount: 29.99,
    credits: 999,
    description: 'Unlimited credits + API access'
  }
};

export const PayPalButton = ({ planId, userId, onSuccess }: PayPalButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const plan = PLANS[planId];
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", // Replace with your PayPal Client ID
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: plan.amount.toString(),
            currency_code: "USD"
          },
          description: `VODSCRIBE ${plan.name} - ${plan.description}`
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };

  const onApprove = async (data: any, actions: any) => {
    setLoading(true);
    setError('');

    try {
      const order = await actions.order.capture();
      console.log('PayPal Order:', order);

      // Update user subscription in Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          subscription_tier: planId,
          credits_remaining: plan.credits,
          credits_total: plan.credits,
          subscription_date: new Date().toISOString(),
          paypal_order_id: order.id
        })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      // Log payment transaction
      const { error: logError } = await supabase
        .from('payment_transactions')
        .insert({
          user_id: userId,
          plan_name: plan.name,
          amount: plan.amount,
          currency: 'USD',
          paypal_order_id: order.id,
          status: 'completed',
          transaction_date: new Date().toISOString()
        });

      if (logError) {
        console.error('Failed to log transaction:', logError);
        // Don't throw here as payment was successful
      }

      setSuccess(true);
      setLoading(false);
      
      if (onSuccess) {
        onSuccess();
      }

      // Show success message for 3 seconds then refresh
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error: any) {
      console.error('Payment processing error:', error);
      setError(`Payment failed: ${error.message}`);
      setLoading(false);
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    setError('Payment failed. Please try again.');
    setLoading(false);
  };

  if (success) {
    return (
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          🎉 Payment successful! Your {plan.name} is now active. Refreshing page...
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border">
        <div className="mb-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-200">{plan.name}</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{plan.price}<span className="text-sm">/month</span></p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>
        </div>

        {loading ? (
          <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded text-center">
            <span className="text-blue-800 dark:text-blue-200">Processing payment... 🔄</span>
          </div>
        ) : (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              style={{
                shape: "rect",
                color: "blue",
                layout: "horizontal",
                label: "paypal"
              }}
            />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
};
