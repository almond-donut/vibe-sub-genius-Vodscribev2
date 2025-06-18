
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
      name: "Maya P.",
      role: "Japanese Content Fan",
      content: "I was spending way too much on expensive subtitle services that didn't understand internet culture. VODSCRIBE actually gets the memes and slang.",
      rating: 5,
      avatar: "M"
    },
    {
      name: "Jordan T.",
      role: "Variety Stream Viewer",
      content: "Other tools made my favorite streamers sound like textbooks. VODSCRIBE preserves their chaotic energy and makes the content actually enjoyable to watch.",
      rating: 5,
      avatar: "J"
    },
    {
      name: "Lisa R.",
      role: "Language Learning Enthusiast",
      content: "Perfect for understanding natural Korean! Unlike boring dictionary translations, I can see how real people actually talk and joke around.",
      rating: 5,
      avatar: "L"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Finally, Subtitles That Don't Kill The Vibe
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of viewers who actually understand the humor now
          </p>
          
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg font-semibold text-slate-800">4.9/5 Rating</p>
              <p className="text-slate-600">from 500+ beta users</p>
            </div>
            
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">2,000+</p>
              <p className="text-slate-600">Streamers subtitled</p>
            </div>
            
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">15min</p>
              <p className="text-slate-600">Average processing</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Join the Community?
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Stop missing out on the jokes. Start understanding the culture.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">📈 98%</p>
                <p className="text-slate-600">Say it's better than competitors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">🎯 3x</p>
                <p className="text-slate-600">More cultural accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">💰 50%</p>
                <p className="text-slate-600">Cheaper than generic tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
