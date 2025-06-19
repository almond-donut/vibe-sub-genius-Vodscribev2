import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PayPalButton } from './PayPalButton';
import { X, CreditCard, Zap, Star } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  selectedPlan?: 'popular' | 'premium';
}

export const PaymentModal = ({ isOpen, onClose, userId, selectedPlan = 'popular' }: PaymentModalProps) => {
  const [currentPlan, setCurrentPlan] = useState<'popular' | 'premium'>(selectedPlan);

  const plans = {
    popular: {
      name: 'Popular Plan',
      price: '$12.99',
      monthlyPrice: '12.99',
      credits: 8,      features: [
        '8 video processing credits/month',
        'Credits auto-reset every month',
        'Priority processing (15-20 min)',
        'Cultural translation',
        'All subtitle formats',
        'Email delivery',
        'Cancel anytime'
      ],
      icon: '🔥',
      badge: 'Most Popular',
      color: 'purple'
    },
    premium: {
      name: 'Premium Plan',
      price: '$29.99', 
      monthlyPrice: '29.99',
      credits: 999,      features: [
        'Unlimited video processing',
        'Credits auto-reset every month',
        'Super fast processing (10-15 min)',
        'API access for developers',
        'Batch processing',
        'Priority support (vodscribe@proton.me)',
        'Advanced customization'
      ],
      icon: '⭐',
      badge: 'Best Value',
      color: 'blue'
    }
  };

  const handlePlanSelect = (plan: 'popular' | 'premium') => {
    setCurrentPlan(plan);
  };

  const handlePaymentSuccess = () => {
    onClose();
    // Page will reload automatically from PayPalButton component
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              🚀 Upgrade to Premium
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(plans).map(([planKey, plan]) => (
              <div
                key={planKey}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  currentPlan === planKey
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
                onClick={() => handlePlanSelect(planKey as 'popular' | 'premium')}
              >
                {plan.badge && (
                  <div className="absolute -top-2 left-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    {plan.badge}
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{plan.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">{plan.name}</h3>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {plan.price}<span className="text-sm">/month</span>
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Security & Guarantee */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-800 dark:text-green-200">Secure Payment</span>
            </div>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>✅ PayPal secure checkout</li>
              <li>✅ Cancel anytime - no contracts</li>
              <li>✅ 7-day money-back guarantee</li>
              <li>✅ Instant activation</li>
            </ul>
          </div>

          {/* PayPal Checkout */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-4">
              Complete your purchase with PayPal:
            </h4>
            <PayPalButton 
              planId={currentPlan}
              userId={userId}
              onSuccess={handlePaymentSuccess}
            />
          </div>          {/* Terms */}
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>By proceeding with payment, you agree to our Terms of Service and Privacy Policy.</p>
            <p>Subscription will automatically renew monthly until cancelled.</p>
            <p>Need support? Contact us: <a href="mailto:vodscribe@proton.me" className="text-blue-600 dark:text-blue-400 hover:underline">vodscribe@proton.me</a></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
