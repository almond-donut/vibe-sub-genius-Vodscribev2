import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, XCircle, Upload, Zap, Brain, Download, Star, Users, Clock, Shield } from "lucide-react";
import { ComparisonDemo } from "@/components/landing/ComparisonDemo";
import { PricingSection } from "@/components/landing/PricingSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TestimonialSection } from "@/components/landing/TestimonialSection";

const Index = () => {
  const [currentExample, setCurrentExample] = useState(0);
  
  const examples = [
    {
      korean: "아 진짜 대박이다!",
      generic: "Oh really amazing!",
      vodscribe: "Holy crap, that's insane!",
      context: "Gaming reaction"
    },
    {
      korean: "오빠... 진짜?",
      generic: "Big brother... really?",
      vodscribe: "Oppa... seriously?",
      context: "Cultural context"
    },
    {
      korean: "개웃기네",
      generic: "Very funny",
      vodscribe: "I'm literally dying lol",
      context: "Stream banter"
    },
    {
      korean: "진짜 빡친다",
      generic: "Really angry",
      vodscribe: "This is pissing me off",
      context: "Frustration"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-slate-800">VODSCRIBE</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#examples" className="text-slate-600 hover:text-blue-600 transition-colors">Examples</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-600" onClick={() => window.location.href = '/auth'}>
                Login
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600"
                onClick={() => window.location.href = '/auth'}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
            🎉 Preview Gratis 15 Menit dengan Login!
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Subtitles That Actually
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Get The Joke</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Stop missing out on Korean stream culture. Our AI doesn't just translate - it captures the memes, slang, and personality that makes content actually fun to watch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600"
              onClick={() => window.location.href = '/auth'}
            >
              <Play className="mr-2 h-4 w-4" />
              Try Free Preview (15 min)
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          {/* Live Example */}
          <Card className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Live Translation Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800 text-white p-4 rounded-lg mb-4">
                <p className="text-lg font-medium">{examples[currentExample].korean}</p>
                <Badge variant="secondary" className="mt-2">{examples[currentExample].context}</Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">Generic AI</span>
                  </div>
                  <p className="text-red-700">"{examples[currentExample].generic}"</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">VODSCRIBE</span>
                  </div>
                  <p className="text-green-700">"{examples[currentExample].vodscribe}"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Generic AI <span className="text-red-500">Ruins The Vibe</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Other tools give you dictionary words. We give you the whole cultural vibe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Generic AI Problems */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <div className="flex items-center">
                  <XCircle className="w-8 h-8 text-red-500 mr-3" />
                  <CardTitle className="text-red-700">Generic AI Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="text-slate-600 mb-2">"오빠" becomes weird "big brother"</p>
                  <p className="text-red-600 font-medium">❌ Kills the cultural context</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="text-slate-600 mb-2">Streamers sound like formal textbooks</p>
                  <p className="text-red-600 font-medium">❌ No personality preservation</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <p className="text-slate-600 mb-2">$30/month for culturally-clueless translations</p>
                  <p className="text-red-600 font-medium">❌ Overpriced and underwhelming</p>
                </div>
              </CardContent>
            </Card>

            {/* VODSCRIBE Solutions */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <CardTitle className="text-green-700">VODSCRIBE Intelligence</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-slate-600 mb-2">Keeps "oppa" as "oppa" - cultural intelligence</p>
                  <p className="text-green-600 font-medium">✅ Preserves natural context</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-slate-600 mb-2">Maintains streamer's unique humor and style</p>
                  <p className="text-green-600 font-medium">✅ Personality-rich subtitles</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <p className="text-slate-600 mb-2">Premium quality starting at just $6.99/month</p>
                  <p className="text-green-600 font-medium">✅ Affordable excellence</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Cultural Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Understands memes, slang, and cultural references that generic AI completely misses.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Personality Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Keeps each streamer's unique voice, humor, and speaking style intact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Context Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Knows when someone's joking vs being serious. We don't just translate words - we translate vibes.
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Actually Understand Korean Streams?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of viewers who finally get the jokes. Start with 15 minutes free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-slate-100"
              onClick={() => window.location.href = '/auth'}
            >
              Start Free Preview
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-bold">VODSCRIBE</span>
              </div>
              <p className="text-slate-400">
                AI-powered subtitle generation that actually gets the culture and humor.
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
              Made by viewers, for viewers who want to actually understand the content.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
