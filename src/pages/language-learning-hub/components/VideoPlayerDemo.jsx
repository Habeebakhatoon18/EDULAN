import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VideoPlayerDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes demo
  const [volume, setVolume] = useState(80);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [selectedSubtitleLanguage, setSelectedSubtitleLanguage] = useState('hi');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);

  const subtitleLanguages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi (हिन्दी)' },
    { value: 'bn', label: 'Bengali (বাংলা)' },
    { value: 'te', label: 'Telugu (తెలుగు)' },
    { value: 'ta', label: 'Tamil (தமிழ்)' },
    { value: 'es', label: 'Spanish (Español)' },
    { value: 'fr', label: 'French (Français)' }
  ];

  const speedOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' }
  ];

  const subtitleContent = {
    en: [
      { start: 0, end: 5, text: "Welcome to our advanced mathematics course." },
      { start: 5, end: 12, text: "Today we\'ll explore the fascinating world of calculus and its real-world applications." },
      { start: 12, end: 18, text: "Calculus helps us understand rates of change and areas under curves." },
      { start: 18, end: 25, text: "Let\'s begin with the fundamental concept of derivatives." },
      { start: 25, end: 32, text: "A derivative represents the instantaneous rate of change of a function." },
      { start: 32, end: 40, text: "Think of it as the slope of a tangent line at any given point on a curve." }
    ],
    hi: [
      { start: 0, end: 5, text: "हमारे उन्नत गणित पाठ्यक्रम में आपका स्वागत है।" },
      { start: 5, end: 12, text: "आज हम कैलकुलस की आकर्षक दुनिया और इसके वास्तविक जीवन के अनुप्रयोगों का अन्वेषण करेंगे।" },
      { start: 12, end: 18, text: "कैलकुलस हमें परिवर्तन की दरों और वक्रों के नीचे के क्षेत्रों को समझने में मदद करता है।" },
      { start: 18, end: 25, text: "आइए अवकलज की मौलिक अवधारणा से शुरुआत करते हैं।" },
      { start: 25, end: 32, text: "एक अवकलज किसी फ़ंक्शन के परिवर्तन की तात्कालिक दर को दर्शाता है।" },
      { start: 32, end: 40, text: "इसे किसी वक्र पर किसी भी दिए गए बिंदु पर स्पर्श रेखा की ढलान के रूप में सोचें।" }
    ],
    bn: [
      { start: 0, end: 5, text: "আমাদের উন্নত গণিত কোর্সে আপনাদের স্বাগতম।" },
      { start: 5, end: 12, text: "আজ আমরা ক্যালকুলাসের আকর্ষণীয় জগত এবং এর বাস্তব জীবনের প্রয়োগ অন্বেষণ করব।" },
      { start: 12, end: 18, text: "ক্যালকুলাস আমাদের পরিবর্তনের হার এবং বক্ররেখার নিচের ক্ষেত্রফল বুঝতে সাহায্য করে।" },
      { start: 18, end: 25, text: "আসুন অন্তরকলনের মৌলিক ধারণা দিয়ে শুরু করি।" },
      { start: 25, end: 32, text: "একটি অন্তরকলন একটি ফাংশনের তাৎক্ষণিক পরিবর্তনের হার প্রতিনিধিত্ব করে।" },
      { start: 32, end: 40, text: "এটিকে একটি বক্ররেখার যেকোনো নির্দিষ্ট বিন্দুতে স্পর্শক রেখার ঢাল হিসেবে ভাবুন।" }
    ]
  };

  const getCurrentSubtitle = () => {
    const subtitles = subtitleContent?.[selectedSubtitleLanguage] || subtitleContent?.en;
    return subtitles?.find(sub => currentTime >= sub?.start && currentTime < sub?.end);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  // Simulate video playback
  React.useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 0.1 * playbackSpeed, duration));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, playbackSpeed]);

  const currentSubtitle = getCurrentSubtitle();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Video Translation Demo
        </h3>
        <p className="text-muted-foreground">
          Experience automatic subtitle generation and multi-language video translation
        </p>
      </div>
      <div className="glass rounded-2xl overflow-hidden border border-border/50">
        {/* Video Player */}
        <div className="relative bg-black aspect-video">
          {/* Video Thumbnail/Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop"
              alt="Mathematics lecture"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Play Button Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary"
                iconName="Play"
                iconSize={32}
              >
                <span className="sr-only">Play video</span>
              </Button>
            </div>
          )}

          {/* Subtitles */}
          {subtitlesEnabled && currentSubtitle && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-3xl px-4">
              <div className="bg-black/80 text-white text-center py-2 px-4 rounded-lg">
                <p className="text-lg leading-relaxed">{currentSubtitle?.text}</p>
              </div>
            </div>
          )}

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  iconName={isPlaying ? "Pause" : "Play"}
                  className="text-white hover:bg-white/20"
                >
                  <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                </Button>

                <div className="flex items-center space-x-2 text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Volume2"
                    className="text-white hover:bg-white/20"
                  >
                    <span className="sr-only">Volume</span>
                  </Button>
                  <div className="w-20 h-1 bg-white/20 rounded-full">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${volume}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                  iconName="Subtitles"
                  className={`text-white hover:bg-white/20 ${subtitlesEnabled ? 'bg-white/20' : ''}`}
                >
                  <span className="sr-only">Toggle subtitles</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  className="text-white hover:bg-white/20"
                >
                  <span className="sr-only">Settings</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Maximize"
                  className="text-white hover:bg-white/20"
                >
                  <span className="sr-only">Fullscreen</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Settings Panel */}
        <div className="p-6 bg-muted/20 border-t border-border/50">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Select
                label="Subtitle Language"
                options={subtitleLanguages}
                value={selectedSubtitleLanguage}
                onChange={setSelectedSubtitleLanguage}
                searchable
              />
            </div>

            <div>
              <Select
                label="Playback Speed"
                options={speedOptions}
                value={playbackSpeed}
                onChange={setPlaybackSpeed}
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Download Subtitles
              </Button>
            </div>
          </div>
        </div>

        {/* Video Information */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-1">
                Advanced Calculus: Understanding Derivatives
              </h4>
              <p className="text-sm text-muted-foreground">
                Mathematics • Professor Sarah Johnson • 3:00 duration
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
              <span className="text-xs text-success">Live Translation</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-heading font-semibold text-primary">7</div>
              <div className="text-xs text-muted-foreground">Languages Available</div>
            </div>
            <div>
              <div className="text-lg font-heading font-semibold text-secondary">99.1%</div>
              <div className="text-xs text-muted-foreground">Subtitle Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-heading font-semibold text-accent">Real-time</div>
              <div className="text-xs text-muted-foreground">Translation Speed</div>
            </div>
            <div>
              <div className="text-lg font-heading font-semibold text-success">HD</div>
              <div className="text-xs text-muted-foreground">Video Quality</div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <Icon name="Captions" size={24} className="text-primary mx-auto mb-2" />
          <h5 className="font-medium text-foreground mb-1">Auto Subtitles</h5>
          <p className="text-xs text-muted-foreground">AI-generated subtitles in 100+ languages</p>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <Icon name="Zap" size={24} className="text-secondary mx-auto mb-2" />
          <h5 className="font-medium text-foreground mb-1">Real-time Processing</h5>
          <p className="text-xs text-muted-foreground">Instant translation as video plays</p>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-border/50">
          <Icon name="Download" size={24} className="text-accent mx-auto mb-2" />
          <h5 className="font-medium text-foreground mb-1">Export Options</h5>
          <p className="text-xs text-muted-foreground">Download subtitles in multiple formats</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerDemo;