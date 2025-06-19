
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VideoUpload } from '@/components/upload/VideoUpload';
import { LogOut, FileText, Clock, CheckCircle, AlertCircle, Sun, Moon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface ProcessingJob {
  id: string;
  video_url: string;
  video_duration: number;
  status: string;
  source_language: string;
  target_language: string;
  tone_preference: string;
  is_preview: boolean;
  created_at: string;
}

interface DashboardProps {
  user: User;
  onSignOut: () => void;
}

export const Dashboard = ({ user, onSignOut }: DashboardProps) => {  const [jobs, setJobs] = useState<ProcessingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Auto dark mode

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-300';
    }
  };return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
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
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <span className="text-sm text-slate-600 dark:text-slate-300">Welcome, {user.email}</span>
              <Button variant="ghost" onClick={onSignOut} className="dark:text-slate-300 dark:hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <VideoUpload user={user} />
          </div>

          {/* Jobs History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Processing History
                </CardTitle>
              </CardHeader>              <CardContent>
                {loading ? (
                  <p className="text-slate-600 dark:text-slate-400">Loading...</p>
                ) : jobs.length === 0 ? (
                  <p className="text-slate-600 dark:text-slate-400">No processing jobs yet. Upload your first video!</p>
                ) : (
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <div key={job.id} className="border dark:border-slate-700 rounded-lg p-3 bg-white dark:bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(job.status)}
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            {job.is_preview && (
                              <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">Preview</Badge>
                            )}
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {job.video_duration} min
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                          {job.video_url}
                        </p>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                          <span>{job.source_language} → {job.target_language}</span>
                          <span>{new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
