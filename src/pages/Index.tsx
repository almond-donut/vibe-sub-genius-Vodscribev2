import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, XCircle, Upload, Zap, Brain, Download, Star, Users, Clock, Shield, Moon, Sun } from "lucide-react";
import { ComparisonDemo } from "@/components/landing/ComparisonDemo";
import { PricingSection } from "@/components/landing/PricingSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { Switch } from "@/components/ui/switch";

const Index = () => {  const [currentExample, setCurrentExample] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // Auto dark mode
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const examples = [
    {
      korean: "아 진짜 대박이다!",
      chinese: "哇，真的太棒了！",
      japanese: "本当にすごいですね！",
      generic: "Oh really amazing!",
      vodscribe: "Holy crap, that's insane!",
      context: "Gaming reaction",
      language: "Korean"
    },
    {
      korean: "오빠... 진짜?",
      chinese: "哥哥... 真的吗？",
      japanese: "お兄さん... 本当？",
      generic: "Big brother... really?",
      vodscribe: "Oppa... seriously?",
      context: "Cultural context",
      language: "Korean"
    },
    {
      korean: "개웃기네",
      chinese: "太搞笑了",
      japanese: "めっちゃ面白い",
      generic: "Very funny",
      vodscribe: "I'm literally dying lol",
      context: "Stream banter",
      language: "Korean"
    },
    {
      korean: "진짜 빡친다",
      chinese: "真的很生气",
      japanese: "本当にムカつく",
      generic: "Really angry",
      vodscribe: "This is pissing me off",
      context: "Frustration",
      language: "Korean"
    },
    {
      chinese: "卧槽，这也太6了吧！",
      korean: "와, 이거 진짜 대단하다!",
      japanese: "うわ、これマジでヤバい！",
      generic: "Wow, this is very good!",
      vodscribe: "Damn, that's sick as hell!",
      context: "Gaming achievement",
      language: "Chinese"
    },
    {
      japanese: "やばいって、マジで神回だわ",
      korean: "진짜 미쳤다, 완전 레전드야",
      chinese: "太厉害了，真的是神级表现",
      generic: "This is bad, really a legendary episode",
      vodscribe: "This is insane, absolute legendary stream!",
      context: "Stream highlight",
      language: "Japanese"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 5000); // Slowed down from 3000ms to 5000ms
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect scroll direction
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY]);

  const currentLang = examples[currentExample].language === 'Korean' ? examples[currentExample].korean : 
                     examples[currentExample].language === 'Chinese' ? examples[currentExample].chinese :
                     examples[currentExample].japanese;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">      {/* Glassmorphism background */}
      <div 
        className="fixed inset-0 opacity-30 dark:opacity-20 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(/lovable-uploads/b6e68362-a982-4382-9211-8fca017e2514.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />      {/* Navigation */}
      <nav className={`bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-all duration-300 ${
        isScrollingUp ? 'transform translate-y-0 shadow-lg' : scrollY > 100 ? 'transform -translate-y-1' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => window.location.href = '/'}
            >
              <img 
                src="/logo_update.png" 
                alt="VODSCRIBE Logo" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-slate-800 dark:text-white">VODSCRIBE</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#examples" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Examples</a>
            </div>
            <div className="flex items-center space-x-4">              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 dark:border-slate-600/40">
                <Sun className="w-4 h-4 text-yellow-500" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-slate-600"
                />
                <Moon className="w-4 h-4 text-blue-400" />
              </div>
              <Button variant="ghost" className="text-slate-600 dark:text-slate-300" onClick={() => window.location.href = '/auth'}>
                Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600"
                onClick={() => window.location.href = '/auth'}
              >
                Start Free Preview
              </Button>
            </div>
          </div>
        </div>
      </nav>      {/* Hero Section */}
      <section className="py-20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-all duration-700 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(0.3, 1 - scrollY / 600)
          }}
        >          <Badge className="mb-6 bg-blue-100/80 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700 backdrop-blur-sm">
            🎉 Free Preview - Submit One Video with Login!
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
            Subtitles That Actually
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Get The Culture</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto">
            Stop missing out on Asian stream culture. Our AI doesn't just translate - it captures the memes, slang, and personality from
          </p>          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className={`flex items-center space-x-2 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 dark:border-slate-600/40 transition-all duration-300 ${
              isScrollingUp ? 'transform translate-y-0 scale-100' : 'transform translate-y-0.5 scale-98'
            }`}>
              <span className="text-2xl">🇰🇷</span>
              <span className="font-semibold text-slate-800 dark:text-white">Korean</span>
            </div>
            <div className={`flex items-center space-x-2 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 dark:border-slate-600/40 transition-all duration-300 delay-75 ${
              isScrollingUp ? 'transform translate-y-0 scale-100' : 'transform translate-y-0.5 scale-98'
            }`}>
              <span className="text-2xl">🇨🇳</span>
              <span className="font-semibold text-slate-800 dark:text-white">Chinese</span>
            </div>
            <div className={`flex items-center space-x-2 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 dark:border-slate-600/40 transition-all duration-300 delay-150 ${
              isScrollingUp ? 'transform translate-y-0 scale-100' : 'transform translate-y-0.5 scale-98'
            }`}>
              <span className="text-2xl">🇯🇵</span>
              <span className="font-semibold text-slate-800 dark:text-white">Japanese</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600"
              onClick={() => window.location.href = '/auth'}
            >
              <Play className="mr-2 h-4 w-4" />
              Try Free Preview (1 video)
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 dark:border-slate-600/30 backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>          {/* Live Example with Glassmorphism */}
          <Card className={`max-w-2xl mx-auto bg-white/30 dark:bg-slate-800/40 backdrop-blur-md border border-white/40 dark:border-slate-600/40 transition-all duration-500 ${
            isScrollingUp ? 'transform translate-y-0 scale-100' : 'transform translate-y-1 scale-99'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-slate-800 dark:text-white">
                <Zap className="w-5 h-5 text-blue-600" />
                Live Translation Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800 dark:bg-slate-900/90 text-white p-4 rounded-lg mb-4 backdrop-blur-sm">
                <p className="text-lg font-medium">{currentLang}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="bg-white/30 backdrop-blur-sm">{examples[currentExample].context}</Badge>
                  <span className="text-sm text-slate-300">{examples[currentExample].language}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50/90 dark:bg-red-900/30 border border-red-200 dark:border-red-800/60 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800 dark:text-red-400">Generic AI</span>
                  </div>
                  <p className="text-red-700 dark:text-red-300">"{examples[currentExample].generic}"</p>
                </div>
                
                <div className="bg-green-50/90 dark:bg-green-900/30 border border-green-200 dark:border-green-800/60 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-400">VODSCRIBE</span>
                  </div>
                  <p className="text-green-700 dark:text-green-300">"{examples[currentExample].vodscribe}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>      {/* Problems We Solve */}
      <section className="py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Why Generic AI <span className="text-red-500">Ruins The Vibe</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Other tools give you dictionary words. We give you the whole cultural experience from Korea, China, and Japan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">            {/* Generic AI Problems */}
            <Card className="border-red-200 dark:border-red-800/60 bg-red-50/60 dark:bg-red-900/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center">
                  <XCircle className="w-8 h-8 text-red-500 mr-3" />
                  <CardTitle className="text-red-700 dark:text-red-400">Generic AI Tools</CardTitle>
                </div>
              </CardHeader>              <CardContent className="space-y-4">
                <div className="p-4 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-red-200 dark:border-red-800/40 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">"오빠" becomes weird "big brother"</p>
                  <p className="text-red-600 dark:text-red-400 font-medium">❌ Kills the cultural context</p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-red-200 dark:border-red-800/40 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Streamers sound like formal textbooks</p>
                  <p className="text-red-600 dark:text-red-400 font-medium">❌ No personality preservation</p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-red-200 dark:border-red-800/40 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">$30/month for culturally-clueless translations</p>
                  <p className="text-red-600 dark:text-red-400 font-medium">❌ Overpriced and underwhelming</p>
                </div>
              </CardContent>
            </Card>            {/* VODSCRIBE Solutions */}
            <Card className="border-green-200 dark:border-green-800/60 bg-green-50/60 dark:bg-green-900/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <CardTitle className="text-green-700 dark:text-green-400">VODSCRIBE Intelligence</CardTitle>
                </div>
              </CardHeader>              <CardContent className="space-y-4">
                <div className="p-4 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-green-200 dark:border-green-800/40 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Keeps cultural terms natural - "oppa", "哥哥", "お兄さん"</p>
                  <p className="text-green-600 dark:text-green-400 font-medium">✅ Preserves natural context</p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-green-200 dark:border-green-800/40 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Maintains streamer's unique humor across KR/CN/JP</p>
                  <p className="text-green-600 dark:text-green-400 font-medium">✅ Personality-rich subtitles</p>
                </div>
                <div className="p-4 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-green-200 dark:border-green-800/40 backdrop-blur-sm">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">Premium quality starting at just $6.99/month</p>
                  <p className="text-green-600 dark:text-green-400 font-medium">✅ Affordable excellence</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Grid */}          <div className="grid md:grid-cols-3 gap-8">            <Card className={`text-center hover:shadow-lg transition-all duration-500 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-600/40 ${
              isScrollingUp ? 'transform translate-y-0 scale-100 opacity-100' : 'transform translate-y-2 scale-98 opacity-95'
            }`}>
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-slate-800 dark:text-white">Cultural Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Understands memes, slang, and cultural references across Korean, Chinese, and Japanese content that generic AI completely misses.
                </p>
              </CardContent>
            </Card>            <Card className={`text-center hover:shadow-lg transition-all duration-500 delay-75 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-600/40 ${
              isScrollingUp ? 'transform translate-y-0 scale-100 opacity-100' : 'transform translate-y-2 scale-98 opacity-95'
            }`}>
              <CardHeader>
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-slate-800 dark:text-white">Personality Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Keeps each streamer's unique voice, humor, and speaking style intact across all Asian languages.
                </p>
              </CardContent>
            </Card>            <Card className={`text-center hover:shadow-lg transition-all duration-500 delay-150 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-600/40 ${
              isScrollingUp ? 'transform translate-y-0 scale-100 opacity-100' : 'transform translate-y-2 scale-98 opacity-95'
            }`}>
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-slate-800 dark:text-white">Context Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Knows when someone's joking vs being serious. We don't just translate words - we translate vibes and cultural nuances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500 relative">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Actually Understand Asian Streams?
          </h2>          <p className="text-xl text-blue-100 mb-8">
            Join thousands of viewers who finally get the jokes. Start with one free video preview!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-slate-100"
              onClick={() => window.location.href = '/auth'}
            >
              Start Free Preview
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur-sm">
              View Pricing
            </Button>
          </div>
        </div>
      </section>      {/* Footer */}
      <footer className="bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/logo_update.png" 
                  alt="VODSCRIBE Logo" 
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-xl font-bold">VODSCRIBE</span>
              </div>
              <p className="text-slate-400">
                AI-powered subtitle generation that actually gets the culture and humor from Korean, Chinese, and Japanese content.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2024 VODSCRIBE. All rights reserved.</p>
            <p className="text-slate-400 text-sm mt-4 md:mt-0">
              Made by viewers, for viewers who want to actually understand Asian content.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
