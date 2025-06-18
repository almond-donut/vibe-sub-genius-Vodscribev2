
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "$6.99",
      period: "/month",
      description: "Perfect for casual viewers",
      credits: "2 credits/month",
      maxDuration: "1 hour per file",
      features: [
        "Context-aware translations",
        "3 subtitle formats (Raw, Translated, Dual)",
        "Cultural intelligence",
        "Personality preservation",
        "Email support"
      ],
      popular: false,
      cta: "Start Basic"
    },
    {
      name: "Popular",
      price: "$12.99",
      period: "/month",
      description: "Most popular for regular watchers",
      credits: "8 credits/month",
      maxDuration: "2 hours per file",
      features: [
        "Everything in Basic",
        "Priority processing",
        "Advanced cultural context",
        "Custom tone selection",
        "Batch processing",
        "Discord support"
      ],
      popular: true,
      cta: "Go Popular"
    },
    {
      name: "Premium",
      price: "$29.99",
      period: "/month",
      description: "For content creators and teams",
      credits: "Unlimited credits",
      maxDuration: "3 hours per file",
      features: [
        "Everything in Popular",
        "Unlimited processing",
        "API access",
        "Custom integrations",
        "Priority support",
        "Team collaboration tools"
      ],
      popular: false,
      cta: "Go Premium"
    }
  ];

  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Pricing That Actually Makes Sense
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Why pay $30/month for culturally-clueless translations? Get personality-rich subtitles at human prices.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-red-700 font-medium">
              🚫 Competitor Comparison: Otter.ai charges $30/month for basic transcription. 
              Rev.com charges $25/month for generic translations that miss all the cultural context.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative text-center hover:shadow-lg transition-all duration-300 ${
                plan.popular ? 'border-green-500 border-2 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-slate-600 mt-2">{plan.description}</p>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-medium text-blue-600">{plan.credits}</p>
                  <p className="text-sm text-slate-500">{plan.maxDuration}</p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-600 text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600' 
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              💰 Anti-Boring Guarantee
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              If our subtitles are as boring and culturally-clueless as generic AI tools, we'll give you a full refund - no questions asked.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
              <div>
                <p className="font-medium text-red-600">❌ What you WON'T get:</p>
                <ul className="mt-2 space-y-1">
                  <li>• "Big brother" instead of "oppa"</li>
                  <li>• Robotic formal translations</li>
                  <li>• Missing cultural references</li>
                  <li>• Personality-less subtitles</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-600">✅ What you WILL get:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Natural cultural context</li>
                  <li>• Streamer personality preserved</li>
                  <li>• Slang and humor intact</li>
                  <li>• Actually entertaining subs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
