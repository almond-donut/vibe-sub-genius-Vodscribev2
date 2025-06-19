
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckCircle } from "lucide-react";

interface ComparisonDemoProps {
  korean: string;
  chinese?: string;
  japanese?: string;
  generic: string;
  vodscribe: string;
  context: string;
  language?: string;
}

export const ComparisonDemo = ({ korean, chinese, japanese, generic, vodscribe, context, language = "Korean" }: ComparisonDemoProps) => {
  const [typingStage, setTypingStage] = useState(0);
  const [displayedGeneric, setDisplayedGeneric] = useState("");
  const [displayedVodscribe, setDisplayedVodscribe] = useState("");

  const currentText = language === "Korean" ? korean : language === "Chinese" ? chinese : japanese;

  useEffect(() => {
    // Reset on prop changes
    setTypingStage(0);
    setDisplayedGeneric("");
    setDisplayedVodscribe("");

    const timer1 = setTimeout(() => setTypingStage(1), 800);
    const timer2 = setTimeout(() => setTypingStage(2), 2000);
    const timer3 = setTimeout(() => setTypingStage(3), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [korean, chinese, japanese, generic, vodscribe]);

  useEffect(() => {
    if (typingStage >= 2) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= generic.length) {
          setDisplayedGeneric(generic.slice(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [typingStage, generic]);

  useEffect(() => {
    if (typingStage >= 3) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= vodscribe.length) {
          setDisplayedVodscribe(vodscribe.slice(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [typingStage, vodscribe]);

  const languageFlag = language === "Korean" ? "🇰🇷" : language === "Chinese" ? "🇨🇳" : "🇯🇵";

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Badge className="mb-6 bg-blue-100/80 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 backdrop-blur-sm border border-blue-200 dark:border-blue-700">
        {languageFlag} {context} • Live Translation Comparison
      </Badge>
      
      {/* Original Text */}
      <div className="mb-6 text-center">
        <div className={`inline-block p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-lg border border-white/50 dark:border-slate-600/50 transition-all duration-500 ${
          typingStage >= 1 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
        }`}>
          <p className="text-lg font-medium text-slate-800 dark:text-slate-300">{language} Stream:</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">"{currentText}"</p>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Generic AI */}
        <Card className={`border-red-200 dark:border-red-800/50 bg-red-50/70 dark:bg-red-900/40 backdrop-blur-md transition-all duration-500 ${
          typingStage >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="font-semibold text-red-700 dark:text-red-400">Generic AI Tools</h3>
            </div>
            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-lg text-slate-700 dark:text-slate-300">
                "{displayedGeneric}"
                {typingStage >= 2 && displayedGeneric.length < generic.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">😴 Boring and culturally clueless</p>
          </CardContent>
        </Card>

        {/* VODSCRIBE */}
        <Card className={`border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/20 backdrop-blur-md transition-all duration-500 ${
          typingStage >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="font-semibold text-green-700 dark:text-green-400">VODSCRIBE</h3>
            </div>
            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                "{displayedVodscribe}"
                {typingStage >= 3 && displayedVodscribe.length < vodscribe.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">🎉 Natural and personality-rich!</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          See the difference? We don't just translate words - we translate culture and vibes.
        </p>
      </div>
    </div>
  );
};
