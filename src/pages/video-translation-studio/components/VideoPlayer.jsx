import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoSrc, 
  subtitles = [], 
  currentLanguage = 'en',
  onTimeUpdate,
  currentTime = 0,
  isPlaying = false,
  onPlayPause,
  onSeek
}) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video?.duration);
    };

    const handleTimeUpdate = () => {
      onTimeUpdate?.(video?.currentTime);
    };

    video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    video?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    if (isPlaying) {
      video?.play();
    } else {
      video?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    video.currentTime = currentTime;
  }, [currentTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    onPlayPause?.();
  };

  const handleSeekChange = (e) => {
    const newTime = (e?.target?.value / 100) * duration;
    onSeek?.(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e?.target?.value / 100;
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef?.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef?.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getCurrentSubtitle = () => {
    return subtitles?.find(sub => 
      currentTime >= sub?.startTime && currentTime <= sub?.endTime
    );
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef?.current) {
      clearTimeout(controlsTimeoutRef?.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const currentSubtitle = getCurrentSubtitle();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-contain"
        onClick={handlePlayPause}
        onLoadedMetadata={() => setDuration(videoRef?.current?.duration || 0)}
      />
      {/* Subtitle Overlay */}
      {showSubtitles && currentSubtitle && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-center max-w-md">
            <p className="text-sm md:text-base font-medium">
              {currentSubtitle?.text}
            </p>
          </div>
        </div>
      )}
      {/* Loading Overlay */}
      {!videoSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No video loaded</p>
          </div>
        </div>
      )}
      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeekChange}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
              </Button>

              <div className="flex items-center space-x-2">
                <Icon name="Volume2" size={16} />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Playback Speed */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {playbackSpeed}x
                </Button>
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col space-y-1">
                    {playbackSpeeds?.map(speed => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-3 py-1 text-sm rounded hover:bg-white/20 ${
                          speed === playbackSpeed ? 'bg-white/20' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtitle Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`text-white hover:bg-white/20 ${showSubtitles ? 'bg-white/20' : ''}`}
              >
                <Icon name="Subtitles" size={18} />
              </Button>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;