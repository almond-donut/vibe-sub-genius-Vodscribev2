
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Alex K.",
      role: "Korean Stream Watcher",
      content: "Finally! I can understand why everyone's laughing in chat. Other tools made streamers sound like robots - VODSCRIBE keeps their personality intact.",
      rating: 5,
      avatar: "A"
    },
    {
      name: "Sarah M.",
      role: "Content Creator",
      content: "I tried Rev.com and Otter.ai first - they were charging $30/month for translations that killed all the humor. VODSCRIBE gets the cultural context for half the price.",
      rating: 5,
      avatar: "S"
    },
    {
      name: "David L.",
      role: "Gaming Community Manager",
      content: "The difference is night and day. Generic AI: 'Big brother, that is very funny.' VODSCRIBE: 'Oppa, I'm literally dying lol.' Finally sounds human!",
      rating: 5,
      avatar: "D"
    },
    {
      name: "Yuki T.",
      role: "Japanese Content Fan", 
      content: "Perfect for Japanese streams too! Other tools completely missed the nuances and internet slang. VODSCRIBE actually understands otaku culture.",
      rating: 5,
      avatar: "Y"
    },
    {
      name: "Chen W.",
      role: "Chinese Stream Viewer",
      content: "Amazing work with Chinese content. Captures the humor and memes perfectly - finally can enjoy Bilibili streams with proper cultural context!",
      rating: 5,
      avatar: "C"
    },
    {
      name: "Lisa R.",
      role: "Language Learning Enthusiast",
      content: "Perfect for understanding natural Korean, Chinese, and Japanese! Unlike boring dictionary translations, I can see how real people actually talk and joke around.",
      rating: 5,
      avatar: "L"
    }
  ];

  return (
    <section className="py-16 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Finally, Subtitles That Don't Kill The Vibe
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Join thousands of viewers who actually understand Asian content now
          </p>
          
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg font-semibold text-slate-800 dark:text-white">4.9/5 Rating</p>
              <p className="text-slate-600 dark:text-slate-300">from 500+ beta users</p>
            </div>
            
            <div className="text-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3,000+</p>
              <p className="text-slate-600 dark:text-slate-300">Asian streams subtitled</p>
            </div>
            
            <div className="text-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">15min</p>
              <p className="text-slate-600 dark:text-slate-300">Average processing</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/30 dark:border-slate-600/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto border border-white/30 dark:border-slate-600/30">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Ready to Join the Community?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Stop missing out on the jokes. Start understanding Asian culture.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">📈 98%</p>
                <p className="text-slate-600 dark:text-slate-300">Say it's better than competitors</p>
              </div>
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">🎯 3x</p>
                <p className="text-slate-600 dark:text-slate-300">More cultural accuracy</p>
              </div>
              <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">💰 50%</p>
                <p className="text-slate-600 dark:text-slate-300">Cheaper than generic tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
