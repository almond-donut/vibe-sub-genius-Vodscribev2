
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export const PricingSection = () => {  // Check current time in Singapore (UTC+7)
  const getSingaporeTime = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const singaporeTime = new Date(utc + (7 * 3600000)); // UTC+7
    return singaporeTime.getHours();
  };
  const currentHour = getSingaporeTime();
  const isWorkingHours = currentHour >= 6 && currentHour <= 20; // 6 AM - 8 PM Singapore time
  const getProcessingTime = (planName: string) => {
    if (isWorkingHours) {
      switch(planName) {
        case 'Basic': return '15-20 minutes';
        case 'Popular': return '10-15 minutes'; 
        case 'Premium': return '5-10 minutes';
        default: return '15-20 minutes';
      }    } else {
      // Night mode - longer processing times
      switch(planName) {
        case 'Basic': return '6-12 hours';
        case 'Popular': return '4-8 hours';
        case 'Premium': return '2-6 hours';
        default: return '6-12 hours';
      }
    }
  };

  const getProcessingStatus = () => {
    if (isWorkingHours) {      return {
        status: "🟢 FAST PROCESSING",
        message: "Operator is online! Your subtitles will be ready super quick.",
        timeInfo: "Live processing during Singapore business hours (6AM-8PM UTC+7)"
      };
    } else {      return {
        status: "🟡 QUEUE MODE",
        message: "Operator is sleeping! Your job will be processed when they wake up.",
        timeInfo: "Will be processed within 12 hours. Full refund guaranteed if longer!"
      };
    }  };

  const processingStatus = getProcessingStatus();

  const plans = [
    {
      name: "Basic",
      price: "$6.99",
      period: "/month",
      description: "Perfect for casual viewers",
      credits: "2 credits/month",
      weeklyInfo: "~0.5 files per week (2 monthly)", // Decoy: makes it look insufficient
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
      weeklyInfo: "1-2 files per week (4-8 monthly)", // Hero: looks abundant and reasonable
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
    },    {
      name: "Premium",
      price: "$29.99",
      period: "/month",
      description: "For content creators and teams",
      credits: "Unlimited credits",
      weeklyInfo: "Unlimited files per week", // Decoy: expensive anchor
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
    <section className="py-16 bg-white dark:bg-slate-900" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Pricing That Actually Makes Sense
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Why pay $30/month for culturally-clueless translations? Get personality-rich subtitles at human prices.
          </p>

          {/* Dynamic Processing Time Banner */}
          <div className={`max-w-4xl mx-auto mb-8 p-4 rounded-xl border-2 ${
            isWorkingHours 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50' 
              : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50'
          }`}>
            <div className="text-center">
              <h3 className={`text-lg font-bold mb-2 ${
                isWorkingHours 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-yellow-800 dark:text-yellow-200'
              }`}>
                {processingStatus.status}
              </h3>
              <p className={`font-medium mb-1 ${
                isWorkingHours 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-yellow-700 dark:text-yellow-300'
              }`}>
                {processingStatus.message}
              </p>
              <p className={`text-sm ${
                isWorkingHours 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {processingStatus.timeInfo}
              </p>
              {!isWorkingHours && (
                <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-700">                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <strong>🛡️ Refund Policy:</strong> If your subtitles aren't ready within 12 hours, you get an automatic full refund - no questions asked!
                  </p>
                </div>
              )}
            </div>
          </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4 max-w-2xl mx-auto mb-4">
            <p className="text-red-700 dark:text-red-300 font-medium">
              🚫 Competitor Comparison: Otter.ai charges $30/month for basic transcription. 
              Rev.com charges $25/month for generic translations that miss all the cultural context.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg p-3 max-w-lg mx-auto mb-8">
            <p className="text-green-700 dark:text-green-300 font-medium text-sm">
              💡 <strong>Smart Choice:</strong> Most users pick Popular plan - it's only $3.25 per video vs $7.50+ with competitors!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (            <Card 
              key={index} 
              className={`relative text-center hover:shadow-2xl hover:shadow-slate-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer group ${
                plan.popular ? 'border-green-500 dark:border-green-400 border-2 transform scale-105 ring-2 ring-green-500/20 dark:ring-green-400/20 hover:shadow-green-500/30' : ''
              }`}
            >              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white animate-pulse">
                  Most Popular
                </Badge>
              )}
              
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              
              <div className="relative z-10">
                <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-slate-600 dark:text-slate-300 ml-2">{plan.period}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-2">{plan.description}</p>                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{plan.credits}</p>
                  <div className={`text-sm px-3 py-2 rounded-lg border ${
                    plan.popular 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-300 font-semibold' 
                      : plan.name === 'Premium'
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {plan.weeklyInfo}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{plan.maxDuration}</p>
                  
                  {/* Dynamic Processing Time */}
                  <div className={`text-sm px-3 py-2 rounded-lg border font-medium ${
                    isWorkingHours 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-300' 
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50 text-yellow-700 dark:text-yellow-300'
                  }`}>
                    ⚡ Processing: {getProcessingTime(plan.name)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300 text-left">{feature}</span>
                    </li>
                  ))}
                </ul>                  <Button 
                  className={`w-full transform group-hover:scale-105 transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 shadow-lg hover:shadow-xl' 
                      : 'border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* What You Get Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              📁 What Files Do You Get?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Every processing job delivers 3 high-quality subtitle files for maximum flexibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Raw Format */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3">
                📝 Raw Original
              </h4>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Pure transcription in original language
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-left border border-blue-200 dark:border-blue-700">
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mb-2">
                  <strong>Korean example:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "아 진짜 대박이다!"
                </p>
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-2 mb-2">
                  <strong>Japanese example:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "やばいって、マジで神回だわ"
                </p>
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-2 mb-2">
                  <strong>Chinese example:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "卧槽，这也太6了吧！"
                </p>
              </div>
            </div>

            {/* Translated Format */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h4 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">
                🌍 Translated with Context
              </h4>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Smart English translation preserving culture & personality
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-left border border-green-200 dark:border-green-700">
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mb-2">
                  <strong>Korean → English:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "Holy crap, that's insane!"
                </p>
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-2 mb-2">
                  <strong>Japanese → English:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "This is insane, absolute legendary stream!"
                </p>
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-2 mb-2">
                  <strong>Chinese → English:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "Damn, that's sick as hell!"
                </p>
              </div>
            </div>

            {/* Dual Format */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3">
                🔄 Dual Language
              </h4>
              <p className="text-purple-700 dark:text-purple-300 mb-4">
                Both languages side by side for learning
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-left border border-purple-200 dark:border-purple-700">
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mb-2">
                  <strong>Korean + English:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "아 진짜 대박이다!"<br/>
                  "Holy crap, that's insane!"
                </p>
                <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-2 mb-2">
                  <strong>Japanese + English:</strong>
                </p>
                <p className="text-sm font-mono text-slate-800 dark:text-slate-200">
                  "やばいって、マジで神回だわ"<br/>
                  "This is insane, absolute legendary!"
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4 max-w-2xl mx-auto border border-slate-200 dark:border-slate-600">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                💡 <strong>Pro Tip:</strong> Use Raw for authenticity, Translated for understanding, and Dual for language learning!
              </p>
            </div>
          </div>
        </div>        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 max-w-4xl mx-auto border border-green-200/50 dark:border-green-800/50">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              💰 Anti-Boring Guarantee + Fast Processing Promise
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              If our subtitles are as boring and culturally-clueless as generic AI tools, we'll give you a full refund - no questions asked.
              <br className="hidden md:block"/>
              <strong>Plus:</strong> If processing takes longer than 12 hours during queue mode, automatic full refund!
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-slate-600 dark:text-slate-300">
                <p className="font-medium text-red-600 dark:text-red-400 mb-2">❌ What you WON'T get:</p>
                <ul className="space-y-1 text-left">
                  <li>• "Big brother" instead of "oppa"</li>
                  <li>• Robotic formal translations</li>
                  <li>• Missing cultural references</li>
                  <li>• Personality-less subtitles</li>
                </ul>
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">✅ What you WILL get:</p>
                <ul className="space-y-1 text-left">
                  <li>• Natural cultural context</li>
                  <li>• Streamer personality preserved</li>
                  <li>• Slang and humor intact</li>
                  <li>• Actually entertaining subs</li>
                </ul>
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">🛡️ Time Guarantees:</p>
                <ul className="space-y-1 text-left">
                  <li>• Fast mode: 5-20 minutes max</li>
                  <li>• Queue mode: 12 hours max</li>
                  <li>• Auto refund if delayed</li>
                  <li>• Real human touch, not bots</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
