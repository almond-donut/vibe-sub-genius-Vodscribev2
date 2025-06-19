
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Upload, AlertTriangle, CreditCard } from 'lucide-react';
import { PaymentModal } from '@/components/payment/PaymentModal';
import type { User } from '@supabase/supabase-js';

interface Profile {
  preview_minutes_used: number;
  preview_minutes_limit: number;
  subscription_tier: string;
  credits_remaining: number;
  credits_total: number;
}

interface VideoUploadProps {
  user: User;
}

export const VideoUpload = ({ user }: VideoUploadProps) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [targetEmail, setTargetEmail] = useState(user.email || '');
  const [durationCategory, setDurationCategory] = useState('10-min'); // default 10 minutes
  const [sourceLanguage, setSourceLanguage] = useState('korean');
  const [targetLanguage, setTargetLanguage] = useState('english');
  const [tone, setTone] = useState('casual');
  const [loading, setLoading] = useState(false);  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'popular' | 'premium'>('popular');

  useEffect(() => {
    fetchProfile();
  }, []);  // Get duration value from category
  const getDurationFromCategory = (category: string) => {
    switch (category) {
      case '10-min': return 10;
      case '15-min': return 15;
      case '30-min': return 30;
      case '1-hour': return 60;
      case '1.5-hour': return 90;
      case '2-hour': return 120;
      case '3-hour': return 180;
      default: return 10;
    }
  };
  const duration = getDurationFromCategory(durationCategory);  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('preview_minutes_used, preview_minutes_limit, subscription_tier, credits_remaining, credits_total')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        
        // Create profile if it doesn't exist
        if (error.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              subscription_tier: 'free',
              preview_minutes_used: 0,
              preview_minutes_limit: 30
            });
          
          if (!insertError) {
            setProfile({
              preview_minutes_used: 0,
              preview_minutes_limit: 30,
              subscription_tier: 'free',
              credits_remaining: 1,
              credits_total: 1
            });
          }
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!profile) {
      setError('Unable to load profile data');
      setLoading(false);
      return;
    }    // Check if user has exceeded preview limit
    const remainingMinutes = profile.preview_minutes_limit - profile.preview_minutes_used;
    const isPreview = profile.subscription_tier === 'free';
    
    // Check if preview minutes are exhausted
    if (isPreview && remainingMinutes <= 0) {
      setError(`Free preview used! You've used all ${profile.preview_minutes_limit} minutes. Upgrade to continue processing unlimited videos.`);
      setLoading(false);
      return;
    }

    // Check if current video exceeds remaining minutes
    if (isPreview && duration > remainingMinutes) {
      setError(`Video duration (${duration} min) exceeds remaining preview time (${remainingMinutes} min). Please choose a shorter duration or upgrade.`);
      setLoading(false);
      return;
    }

    try {      // Create processing job
      const { data: job, error: jobError } = await supabase
        .from('processing_jobs')
        .insert({
          user_id: user.id,
          video_url: videoUrl,
          video_duration: duration,
          source_language: sourceLanguage,
          target_language: targetLanguage,
          tone_preference: `${tone}|email:${targetEmail}`, // Store email temporarily in tone field
          is_preview: isPreview,
          status: 'pending'
        })
        .select()
        .single();

      if (jobError) throw jobError;      // Update preview minutes used if it's a preview
      if (isPreview) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            preview_minutes_used: profile.preview_minutes_used + duration
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
      }      setSuccess(`Processing job created! Job ID: ${job?.id || 'unknown'}`);
      setVideoUrl('');
      
      // Show dynamic processing time notification
      const now = new Date();
      const singaporeTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (7 * 3600000));
      const currentHour = singaporeTime.getHours();
      const isWorkingHours = currentHour >= 6 && currentHour <= 20;
      
      if (isWorkingHours) {
        // During working hours
        const processingTime = isPreview ? '15-20 minutes' : '10-15 minutes';
        setTimeout(() => {
          setSuccess(`Thank you! Your video is being processed and will be ready in around ${processingTime}. We'll notify you once it's complete! 🎬✨`);
        }, 2000);
      } else {
        // Outside working hours (night mode)
        setTimeout(() => {
          setSuccess(`Thank you! Our servers are currently in queue mode due to high demand. Your video will be processed within 6-12 hours maximum. We appreciate your patience! 🌙💤`);
        }, 2000);
      }
      
      fetchProfile(); // Refresh profile data
      
    } catch (error: any) {
      setError(error.message);
    }    setLoading(false);
  };

  const remainingMinutes = profile ? profile.preview_minutes_limit - profile.preview_minutes_used : 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Video for Subtitles
          </CardTitle>
        </CardHeader>        <CardContent className="space-y-6">
          {/* Profile/Credit Status Card */}
          {profile && (            <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-200 block">
                      {user.email?.split('@')[0] || 'User'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {profile.subscription_tier === 'free' ? 'Free Preview' : profile.subscription_tier}
                  </span>
                </div>
              </div>
                {profile.subscription_tier === 'free' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Preview Minutes</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {remainingMinutes} / {profile.preview_minutes_limit} remaining
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(remainingMinutes / profile.preview_minutes_limit) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
          {profile && profile.subscription_tier === 'free' && remainingMinutes <= 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800/50 rounded-xl p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                  Preview Complete! Ready to Upgrade?
                </h3>                <p className="text-purple-700 dark:text-purple-300 mb-4">
                  You've used all your free preview minutes. 
                  Upgrade to process unlimited videos with our premium cultural translation service!
                </p>
              </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">                <div 
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 cursor-pointer hover:border-purple-400 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    setSelectedPlan('popular');
                    setShowPaymentModal(true);
                  }}
                >
                  <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">Popular Plan 🔥</h4>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$12.99<span className="text-sm">/month</span></p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">8 credits • Priority processing</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400 mt-2">👆 Click to purchase</p>
                </div>
                <div 
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 cursor-pointer hover:border-purple-400 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    setSelectedPlan('premium');
                    setShowPaymentModal(true);
                  }}
                >
                  <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">Premium Plan ⭐</h4>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$29.99<span className="text-sm">/month</span></p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Unlimited • API access</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400 mt-2">👆 Click to purchase</p>
                </div>
              </div>              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
                onClick={() => {
                  setShowPaymentModal(true);
                }}
              >
                🚀 View All Pricing Plans
              </Button>
            </div>
          )}          {profile && profile.subscription_tier === 'free' && remainingMinutes > 0 && (            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Free Preview</span>
              </div>              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Free preview minutes remaining: {remainingMinutes} minutes
              </p>
              
              {remainingMinutes <= 5 && (
                <div className="flex items-center gap-2 mt-2 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Preview time almost up!</span>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">            <div>
              <Label htmlFor="videoUrl">Video URL or File Link</Label>
              <Input
                id="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube, Gofile, Bunkr, Google Drive, Mega, Dropbox..."
                required
              />              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ⚠️ Make sure the link is public and accessible! Private links won't work.
              </p>
            </div>

            <div>
              <Label htmlFor="targetEmail">Send Results To Email</Label>
              <Input
                id="targetEmail"
                type="email"
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                📧 We'll send your subtitle files to this email when processing is complete
              </p>
            </div><div>
              <Label>Video Duration Category</Label>
              <Select value={durationCategory} onValueChange={setDurationCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>                <SelectContent>
                  <SelectItem value="10-min">📺 10 minutes</SelectItem>
                  <SelectItem value="15-min">🎪 15 minutes</SelectItem>
                  <SelectItem value="30-min">🎬 30 minutes</SelectItem>
                  {profile?.subscription_tier !== 'free' && (
                    <>
                      <SelectItem value="1-hour">🎭 1 hour</SelectItem>
                      <SelectItem value="1.5-hour">🎪 1.5 hours</SelectItem>
                      <SelectItem value="2-hour">🎨 2 hours</SelectItem>
                      <SelectItem value="3-hour">🎯 3 hours</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>              {profile?.subscription_tier === 'free' && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Free preview: {remainingMinutes} minutes remaining
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">              <div>
                <Label>Source Language</Label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>              <div>
                <Label>Target Language</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage} disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">English only for now - more languages coming soon!</p>
              </div>
            </div>

            <div>
              <Label>Tone/Style</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual/Informal</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="funny">Funny/Humorous</SelectItem>
                </SelectContent>
              </Select>
            </div>            <Button 
              type="submit" 
              disabled={loading || (profile?.subscription_tier === 'free' && remainingMinutes <= 0)}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Start Processing'}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>          )}
        </CardContent>
      </Card>

      {/* PayPal Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        userId={user.id}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};
