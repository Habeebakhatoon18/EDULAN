import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const YouTubeInput = ({ onVideoSelect, isProcessing = false }) => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockVideoData = {
    title: "Advanced Mathematics: Calculus Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=480&h=270&fit=crop",
    duration: "24:35",
    views: "125,847",
    channel: "EduMath Academy",
    description: "Comprehensive introduction to calculus concepts including limits, derivatives, and basic integration techniques. Perfect for high school and early college students.",
    uploadDate: "2024-08-10",
    quality: ["720p", "1080p", "1440p"],
    language: "English",
    subtitles: ["English", "Spanish", "French"]
  };

  const validateYouTubeUrl = (url) => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /^https?:\/\/(www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
    ];
    return patterns?.some(pattern => pattern?.test(url));
  };

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
    ];
    for (const pattern of patterns) {
      const match = url?.match(pattern);
      if (match) return match?.[1];
    }
    return null;
  };

  const handleUrlSubmit = async () => {
    if (!url?.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setVideoInfo(mockVideoData);
      setIsLoading(false);
    }, 1500);
  };

  const handleProcessVideo = () => {
    if (videoInfo) {
      onVideoSelect?.({
        type: 'youtube',
        url: url,
        info: videoInfo
      });
    }
  };

  const formatDuration = (duration) => {
    return duration; // Already formatted in mock data
  };

  const formatViews = (views) => {
    return views; // Already formatted in mock data
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            YouTube Video URL
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter the URL of the YouTube video you want to translate
          </p>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => {
                setUrl(e?.target?.value);
                setError('');
                setVideoInfo(null);
              }}
              error={error}
              className="w-full"
            />
          </div>
          <Button
            onClick={handleUrlSubmit}
            loading={isLoading}
            disabled={!url?.trim() || isLoading}
            iconName="Search"
            iconPosition="left"
          >
            Fetch Info
          </Button>
        </div>

        {/* URL Examples */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <Icon name="Link" size={16} className="mr-2 text-secondary" />
            Supported URL Formats
          </h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• https://www.youtube.com/watch?v=VIDEO_ID</p>
            <p>• https://youtu.be/VIDEO_ID</p>
            <p>• https://www.youtube.com/embed/VIDEO_ID</p>
          </div>
        </div>
      </div>
      {/* Video Information */}
      {videoInfo && (
        <div className="glass rounded-lg p-6 border border-border/50 animate-fade-in">
          <div className="flex items-start space-x-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden">
                <Image
                  src={videoInfo?.thumbnail}
                  alt={videoInfo?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {videoInfo?.duration}
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-medium text-foreground mb-2 line-clamp-2">
                {videoInfo?.title}
              </h4>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center">
                  <Icon name="User" size={14} className="mr-1" />
                  {videoInfo?.channel}
                </span>
                <span className="flex items-center">
                  <Icon name="Eye" size={14} className="mr-1" />
                  {videoInfo?.views} views
                </span>
                <span className="flex items-center">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  {new Date(videoInfo.uploadDate)?.toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {videoInfo?.description}
              </p>

              {/* Video Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Quality Options</p>
                  <div className="flex space-x-1">
                    {videoInfo?.quality?.map((quality, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {quality}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Original Language</p>
                  <span className="text-sm font-medium text-foreground">{videoInfo?.language}</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Available Subtitles</p>
                  <div className="flex space-x-1">
                    {videoInfo?.subtitles?.slice(0, 2)?.map((lang, index) => (
                      <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                    {videoInfo?.subtitles?.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{videoInfo?.subtitles?.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleProcessVideo}
                disabled={isProcessing}
                loading={isProcessing}
                iconName="Play"
                iconPosition="left"
                className="w-full md:w-auto"
              >
                Process This Video
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Processing Guidelines */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-secondary" />
          YouTube Processing Guidelines
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Videos must be publicly accessible (not private or unlisted)</li>
          <li>• Maximum video length: 2 hours</li>
          <li>• Higher quality videos provide better transcription results</li>
          <li>• Processing time depends on video length and complexity</li>
          <li>• Respect copyright and fair use policies</li>
        </ul>
      </div>
      {/* Recent URLs */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Clock" size={16} className="mr-2 text-accent" />
          Recent URLs
        </h4>
        <div className="space-y-2">
          {[
            "Advanced Physics: Quantum Mechanics Basics",
            "World History: Industrial Revolution",
            "Biology: Cell Structure and Function"
          ]?.map((title, index) => (
            <button
              key={index}
              onClick={() => setUrl(`https://www.youtube.com/watch?v=example${index + 1}`)}
              className="w-full text-left p-2 rounded-md hover:bg-muted/50 transition-smooth focus-ring"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Play" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground truncate">{title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeInput;