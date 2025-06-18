
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
              <Button variant="ghost" className="text-slate-600">Login</Button>
              <Button className="bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              🎉 Finally! AI that actually gets Korean streamer humor
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Stop Missing The
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Jokes</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Context-aware subtitles that capture personality, slang, and culture - not just words. 
              Finally, AI that doesn't suck the soul out of your favorite content.
            </p>
            
            {/* Animated Comparison Demo */}
            <div className="max-w-4xl mx-auto mb-12">
              <ComparisonDemo 
                korean={examples[currentExample].korean}
                generic={examples[currentExample].generic}
                vodscribe={examples[currentExample].vodscribe}
                context={examples[currentExample].context}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600 px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                See Real Examples
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4">
                Stop Missing Out
              </Button>
            </div>

            <div className="mt-8 flex justify-center items-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>4.9/5 from beta users</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>2,000+ streamers subtitled</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Average 15min processing</span>
              </div>
            </div>
          </div>
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

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Finally Understand the Humor?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of viewers who actually get why everyone's laughing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4">
              Start Free Trial - No Credit Card
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              See More Examples
            </Button>
          </div>
          
          <div className="mt-8">
            <p className="text-blue-100 text-sm">
              <span className="font-semibold">Anti-Boring Guarantee:</span> If our subs are as boring as generic AI tools, full refund - no questions asked.
            </p>
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
