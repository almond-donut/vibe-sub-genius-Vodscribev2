
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckCircle } from "lucide-react";

interface ComparisonDemoProps {
  korean: string;
  generic: string;
  vodscribe: string;
  context: string;
}

export const ComparisonDemo = ({ korean, generic, vodscribe, context }: ComparisonDemoProps) => {
  const [typingStage, setTypingStage] = useState(0);
  const [displayedGeneric, setDisplayedGeneric] = useState("");
  const [displayedVodscribe, setDisplayedVodscribe] = useState("");

  useEffect(() => {
    // Reset on prop changes
    setTypingStage(0);
    setDisplayedGeneric("");
    setDisplayedVodscribe("");

    const timer1 = setTimeout(() => setTypingStage(1), 500);
    const timer2 = setTimeout(() => setTypingStage(2), 1500);
    const timer3 = setTimeout(() => setTypingStage(3), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [korean, generic, vodscribe]);

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
      }, 30);
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
      }, 30);
      return () => clearInterval(timer);
    }
  }, [typingStage, vodscribe]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Badge className="mb-6 bg-blue-100 text-blue-800">
        {context} • Live Translation Comparison
      </Badge>
      
      {/* Original Korean */}
      <div className="mb-6 text-center">
        <div className={`inline-block p-4 bg-slate-100 rounded-lg transition-all duration-500 ${
          typingStage >= 1 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
        }`}>
          <p className="text-lg font-medium text-slate-800">Korean Stream:</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">"{korean}"</p>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Generic AI */}
        <Card className={`border-red-200 bg-red-50/50 transition-all duration-500 ${
          typingStage >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="font-semibold text-red-700">Generic AI Tools</h3>
            </div>
            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-lg text-slate-700">
                "{displayedGeneric}"
                {typingStage >= 2 && displayedGeneric.length < generic.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
            <p className="text-sm text-red-600 mt-2">😴 Boring and culturally clueless</p>
          </CardContent>
        </Card>

        {/* VODSCRIBE */}
        <Card className={`border-green-200 bg-green-50/50 transition-all duration-500 ${
          typingStage >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="font-semibold text-green-700">VODSCRIBE</h3>
            </div>
            <div className="min-h-[60px] flex items-center justify-center">
              <p className="text-lg text-slate-700 font-medium">
                "{displayedVodscribe}"
                {typingStage >= 3 && displayedVodscribe.length < vodscribe.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
            <p className="text-sm text-green-600 mt-2">🎉 Natural and personality-rich!</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-slate-500 text-sm">
          See the difference? We don't just translate words - we translate vibes.
        </p>
      </div>
    </div>
  );
};
