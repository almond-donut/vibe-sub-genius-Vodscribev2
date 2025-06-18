
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Upload, AlertTriangle } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface Profile {
  preview_minutes_used: number;
  preview_minutes_limit: number;
  subscription_tier: string;
}

interface VideoUploadProps {
  user: User;
}

export const VideoUpload = ({ user }: VideoUploadProps) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState(5); // default 5 minutes
  const [sourceLanguage, setSourceLanguage] = useState('korean');
  const [targetLanguage, setTargetLanguage] = useState('english');
  const [tone, setTone] = useState('casual');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('preview_minutes_used, preview_minutes_limit, subscription_tier')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
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
    }

    // Check if user has exceeded preview limit
    const remainingMinutes = profile.preview_minutes_limit - profile.preview_minutes_used;
    const isPreview = profile.subscription_tier === 'free';
    
    if (isPreview && duration > remainingMinutes) {
      setError(`Preview limit exceeded! You have ${remainingMinutes} minutes remaining. Please upgrade for unlimited processing.`);
      setLoading(false);
      return;
    }

    try {
      // Create processing job
      const { data: job, error: jobError } = await supabase
        .from('processing_jobs')
        .insert({
          user_id: user.id,
          video_url: videoUrl,
          video_duration: duration,
          source_language: sourceLanguage,
          target_language: targetLanguage,
          tone_preference: tone,
          is_preview: isPreview,
          status: 'pending'
        })
        .select()
        .single();

      if (jobError) throw jobError;

      // Update preview minutes used if it's a preview
      if (isPreview) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            preview_minutes_used: profile.preview_minutes_used + duration
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
      }

      setSuccess(`Processing job created! Job ID: ${job.id}`);
      setVideoUrl('');
      fetchProfile(); // Refresh profile data
      
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  const remainingMinutes = profile ? profile.preview_minutes_limit - profile.preview_minutes_used : 0;
  const usagePercentage = profile ? (profile.preview_minutes_used / profile.preview_minutes_limit) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Video untuk Subtitle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile && profile.subscription_tier === 'free' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Preview Gratis</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Sisa waktu preview: {remainingMinutes} menit dari {profile.preview_minutes_limit} menit
              </p>
              <Progress value={usagePercentage} className="h-2" />
              {remainingMinutes <= 5 && (
                <div className="flex items-center gap-2 mt-2 text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Waktu preview hampir habis!</span>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Video URL atau YouTube Link</Label>
              <Input
                id="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Durasi Video (menit)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max={profile?.subscription_tier === 'free' ? remainingMinutes : 180}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
              {profile?.subscription_tier === 'free' && (
                <p className="text-sm text-slate-600 mt-1">
                  Maksimal {remainingMinutes} menit untuk preview gratis
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Bahasa Sumber</Label>
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
              </div>

              <div>
                <Label>Bahasa Target</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="indonesian">Indonesian</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>

            <Button 
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
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
