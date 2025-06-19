
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Settings, Brain, Download } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Paste Your Content Link",
      description: "Google Drive, Dropbox, YouTube, Twitch VOD, Bilibili, Niconico - we handle all Asian platforms",
      color: "text-blue-600"
    },
    {
      icon: Settings,
      title: "We Download & Process",
      description: "Our system automatically extracts audio and prepares for cultural analysis across KR/CN/JP",
      color: "text-purple-600"
    },
    {
      icon: Brain,
      title: "AI Translates with Culture",
      description: "Cultural intelligence kicks in - preserving personality, slang, and vibes from Asian content",
      color: "text-green-600"
    },
    {
      icon: Download,
      title: "Get 3 Perfect Formats",
      description: "Raw SRT, Translated SRT, and Dual-language SRT ready for download",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            How VODSCRIBE Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Simple process, powerful results. No technical complexity - just paste your link and get culture-aware subtitles for Korean, Chinese, and Japanese content.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-200/50 to-green-200/50 z-0" />
              )}
              
              <Card className="relative z-10 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/30 dark:border-slate-600/30">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-100/80 to-green-100/80 dark:from-blue-900/80 dark:to-green-900/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/30 dark:border-slate-600/30`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Step {index + 1}</span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">{step.title}</h3>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto border border-white/30 dark:border-slate-600/30">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Smart Processing Times
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">⚡ Peak Hours</p>
                <p className="text-slate-600 dark:text-slate-300">6AM-8PM: 10-30 minutes</p>
              </div>
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">🌙 Night Queue</p>
                <p className="text-slate-600 dark:text-slate-300">8PM-6AM: 2-4 hours</p>
              </div>
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">🚀 Weekend Boost</p>
                <p className="text-slate-600 dark:text-slate-300">Even faster processing!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
