import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import useAudioTranslation from '../../hooks/useAudioTranslation';

// Import all components
import VideoPlayer from './components/VideoPlayer';
import VideoUpload from './components/VideoUpload';
import YouTubeInput from './components/YouTubeInput';
import ProcessingQueue from './components/ProcessingQueue';
import LanguageSelector from './components/LanguageSelector';
import TranscriptEditor from './components/TranscriptEditor';
import SubtitlePreview from './components/SubtitlePreview';

const VideoTranslationStudio = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguages, setTargetLanguages] = useState(['es', 'fr']);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [processingJobs, setProcessingJobs] = useState([]);

  // Use audio translation hook
  const {
    isProcessing,
    transcription,
    subtitles,
    processingError,
    currentJob,
    generateSubtitles,
    exportSubtitles,
    processYouTubeVideo,
    clearProcessing
  } = useAudioTranslation();

  const tabs = [
    { id: 'upload', label: 'Upload Video', icon: 'Upload' },
    { id: 'youtube', label: 'YouTube URL', icon: 'Youtube' },
    { id: 'queue', label: 'Processing Queue', icon: 'Clock' }
  ];

  // Update processing jobs when currentJob changes
  useEffect(() => {
    if (currentJob) {
      setProcessingJobs(prev => {
        const existingIndex = prev?.findIndex(job => job?.id === currentJob?.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = currentJob;
          return updated;
        }
        return [currentJob, ...prev];
      });
    }
  }, [currentJob]);

  const handleVideoSelect = async (video) => {
    setCurrentVideo(video);
    
    try {
      // Generate subtitles for the video
      await generateSubtitles(video, targetLanguages);
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  const handleYouTubeSelect = async (url) => {
    try {
      const videoInfo = await processYouTubeVideo(url, targetLanguages);
      setCurrentVideo(videoInfo);
    } catch (error) {
      console.error('Error processing YouTube video:', error);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleJobAction = (jobId, action) => {
    setProcessingJobs(prev => 
      prev?.map(job => {
        if (job?.id === jobId) {
          switch (action) {
            case 'pause':
              return { ...job, status: 'paused' };
            case 'cancel':
              return { ...job, status: 'cancelled' };
            case 'retry':
              return { ...job, status: 'processing', progress: 0 };
            case 'delete':
              return null;
            default:
              return job;
          }
        }
        return job;
      })?.filter(Boolean)
    );
  };

  const handleTranscriptUpdate = (newTranscript) => {
    // Update transcription data
    // This would typically update the transcript and regenerate subtitles
    console.log('Transcript updated:', newTranscript);
  };

  const handleSubtitleExport = (language, format) => {
    exportSubtitles(language, format);
  };

  const handleLanguageChange = (type, value) => {
    if (type === 'source') {
      setSourceLanguage(value);
    } else if (type === 'target') {
      setTargetLanguages(value);
      if (value?.length > 0 && !value?.includes(selectedLanguage)) {
        setSelectedLanguage(value?.[0]);
      }
    }
  };

  // Get current subtitles for display
  const currentSubtitles = subtitles?.[selectedLanguage] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Video" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-semibold text-foreground">
                    Video Translation Studio
                  </h1>
                  <p className="text-muted-foreground">
                    Transform educational videos with AI-powered transcription and translation
                  </p>
                </div>
              </div>

              {/* Processing Error Display */}
              {processingError && (
                <div className="mb-4 p-4 bg-error/5 border border-error/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <span className="text-error font-medium">Processing Error</span>
                  </div>
                  <p className="text-sm text-error/80 mt-1">{processingError}</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass rounded-lg p-4 border border-border/50">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileVideo" size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Videos Processed</span>
                  </div>
                  <p className="text-2xl font-heading font-semibold text-foreground mt-1">
                    {processingJobs?.filter(job => job?.status === 'completed')?.length || 0}
                  </p>
                </div>
                <div className="glass rounded-lg p-4 border border-border/50">
                  <div className="flex items-center space-x-2">
                    <Icon name="Languages" size={18} className="text-secondary" />
                    <span className="text-sm text-muted-foreground">Languages</span>
                  </div>
                  <p className="text-2xl font-heading font-semibold text-foreground mt-1">
                    {targetLanguages?.length || 0}
                  </p>
                </div>
                <div className="glass rounded-lg p-4 border border-border/50">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={18} className="text-accent" />
                    <span className="text-sm text-muted-foreground">Processing</span>
                  </div>
                  <p className="text-2xl font-heading font-semibold text-foreground mt-1">
                    {processingJobs?.filter(job => job?.status === 'processing')?.length || 0}
                  </p>
                </div>
                <div className="glass rounded-lg p-4 border border-border/50">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={18} className="text-success" />
                    <span className="text-sm text-muted-foreground">Queue</span>
                  </div>
                  <p className="text-2xl font-heading font-semibold text-foreground mt-1">
                    {processingJobs?.filter(job => job?.status === 'queued')?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Video Player & Controls */}
              <div className="lg:col-span-2 space-y-6">
                {/* Video Player */}
                <div className="glass rounded-lg p-6 border border-border/50">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <VideoPlayer
                      videoSrc={currentVideo?.src || currentVideo?.embedUrl}
                      subtitles={currentSubtitles}
                      currentLanguage={selectedLanguage}
                      currentTime={currentTime}
                      isPlaying={isPlaying}
                      onTimeUpdate={handleTimeUpdate}
                      onPlayPause={handlePlayPause}
                      onSeek={handleSeek}
                    />
                  </div>
                </div>

                {/* Upload/Input Tabs */}
                <div className="glass rounded-lg border border-border/50">
                  {/* Tab Navigation */}
                  <div className="border-b border-border/50">
                    <nav className="flex space-x-1 p-1">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-smooth focus-ring ${
                            activeTab === tab?.id
                              ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <Icon name={tab?.icon} size={16} />
                          <span>{tab?.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'upload' && (
                      <VideoUpload onVideoSelect={handleVideoSelect} isProcessing={isProcessing} />
                    )}
                    {activeTab === 'youtube' && (
                      <YouTubeInput onVideoSelect={handleYouTubeSelect} isProcessing={isProcessing} />
                    )}
                    {activeTab === 'queue' && (
                      <ProcessingQueue 
                        jobs={processingJobs}
                        onJobAction={handleJobAction}
                      />
                    )}
                  </div>
                </div>

                {/* Transcript Editor */}
                <div className="glass rounded-lg p-6 border border-border/50">
                  <TranscriptEditor
                    transcript={transcription?.segments || []}
                    currentTime={currentTime}
                    onTranscriptUpdate={handleTranscriptUpdate}
                    onSeekToTime={handleSeek}
                    language={transcription?.language || sourceLanguage}
                  />
                </div>
              </div>

              {/* Right Column - Language & Subtitle Controls */}
              <div className="space-y-6">
                {/* Language Selection */}
                <div className="glass rounded-lg p-6 border border-border/50">
                  <LanguageSelector
                    sourceLanguage={sourceLanguage}
                    targetLanguages={targetLanguages}
                    onSourceChange={(lang) => handleLanguageChange('source', lang)}
                    onTargetChange={(langs) => handleLanguageChange('target', langs)}
                    detectedLanguage={transcription?.language || 'en'}
                    confidence={0.95}
                  />
                </div>

                {/* Language Switcher for Subtitles */}
                {targetLanguages?.length > 0 && (
                  <div className="glass rounded-lg p-4 border border-border/50">
                    <h4 className="font-medium text-foreground mb-3 flex items-center">
                      <Icon name="Globe" size={16} className="mr-2 text-primary" />
                      Preview Language
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {targetLanguages?.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`p-2 rounded-lg border text-sm font-medium transition-smooth focus-ring ${
                            selectedLanguage === lang
                              ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
                          }`}
                        >
                          {lang?.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtitle Preview */}
                <div className="glass rounded-lg p-6 border border-border/50">
                  <SubtitlePreview
                    subtitles={currentSubtitles}
                    currentTime={currentTime}
                    language={selectedLanguage}
                    onExport={handleSubtitleExport}
                    onStyleChange={() => {}}
                  />
                </div>

                {/* Quick Actions */}
                <div className="glass rounded-lg p-4 border border-border/50">
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <Icon name="Zap" size={16} className="mr-2 text-accent" />
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      className="w-full justify-start"
                      disabled={!currentSubtitles?.length}
                      onClick={() => handleSubtitleExport(selectedLanguage, 'srt')}
                    >
                      Download Video with Subtitles
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                      className="w-full justify-start"
                      disabled={!transcription}
                      onClick={() => {
                        if (transcription) {
                          const content = transcription?.segments?.map(s => s?.text)?.join('\n') || transcription?.text;
                          const filename = `transcript_${transcription?.language || 'unknown'}_${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
                          const blob = new Blob([content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = filename;
                          document.body?.appendChild(a);
                          a?.click();
                          document.body?.removeChild(a);
                          URL.revokeObjectURL(url);
                        }
                      }}
                    >
                      Export All Transcripts
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Share"
                      iconPosition="left"
                      className="w-full justify-start"
                      disabled={!currentVideo}
                    >
                      Share Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoTranslationStudio;