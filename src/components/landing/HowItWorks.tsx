
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Settings, Brain, Download } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Paste Your VOD Link",
      description: "Google Drive, Dropbox, YouTube, Twitch VOD - we handle all formats",
      color: "text-blue-600"
    },
    {
      icon: Settings,
      title: "We Download & Process",
      description: "Our system automatically extracts audio and prepares for cultural analysis",
      color: "text-purple-600"
    },
    {
      icon: Brain,
      title: "AI Translates with Context",
      description: "Cultural intelligence kicks in - preserving personality, slang, and vibes",
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
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            How VODSCRIBE Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Simple process, powerful results. No technical complexity - just paste your link and get culture-aware subtitles.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-green-200 z-0" />
              )}
              
              <Card className="relative z-10 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-slate-500">Step {index + 1}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{step.title}</h3>
                  </div>
                  
                  <p className="text-slate-600">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Smart Processing Times
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-lg font-semibold text-blue-600">⚡ Indonesia Daytime</p>
                <p className="text-slate-600">6AM-8PM: 10-30 minutes</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-purple-600">🌙 Night Queue</p>
                <p className="text-slate-600">8PM-6AM: 2-4 hours</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-green-600">🚀 Weekend Boost</p>
                <p className="text-slate-600">Even faster processing!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
