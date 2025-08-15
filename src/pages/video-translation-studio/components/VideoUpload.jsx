import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoUpload = ({ onVideoSelect, isProcessing = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionInfo, setCompressionInfo] = useState(null);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { ext: 'MP4', desc: 'Most common format' },
    { ext: 'AVI', desc: 'High quality' },
    { ext: 'MOV', desc: 'Apple format' },
    { ext: 'WMV', desc: 'Windows format' },
    { ext: 'MKV', desc: 'Open source' },
    { ext: 'WEBM', desc: 'Web optimized' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = e?.dataTransfer?.files;
    if (files && files?.[0]) {
      handleFileSelect(files?.[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (!file?.type?.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file?.size > maxSize) {
      alert('File size must be less than 500MB');
      return;
    }

    setSelectedFile(file);
    
    // Simulate compression analysis
    const originalSize = file?.size;
    const compressedSize = Math.floor(originalSize * 0.7);
    setCompressionInfo({
      original: formatFileSize(originalSize),
      compressed: formatFileSize(compressedSize),
      savings: Math.floor(((originalSize - compressedSize) / originalSize) * 100)
    });

    // Simulate upload progress
    simulateUpload(file);
  };

  const simulateUpload = (file) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onVideoSelect?.(file);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : selectedFile 
              ? 'border-success bg-success/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => e?.target?.files?.[0] && handleFileSelect(e?.target?.files?.[0])}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                Upload Your Video
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your video file here, or click to browse
              </p>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef?.current?.click()}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Choose File
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                File Selected
              </h3>
              <p className="text-muted-foreground font-medium">{selectedFile?.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(selectedFile?.size)}
              </p>
            </div>
          </div>
        )}

        {dragActive && (
          <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="text-primary font-medium">Drop your video here</div>
          </div>
        )}
      </div>
      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="glass rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Uploading...</span>
            <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      {/* Compression Info */}
      {compressionInfo && (
        <div className="glass rounded-lg p-4 border border-border/50">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Zap" size={18} className="text-accent" />
            <h4 className="font-medium text-foreground">Compression Preview</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Original</p>
              <p className="font-medium text-foreground">{compressionInfo?.original}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Compressed</p>
              <p className="font-medium text-foreground">{compressionInfo?.compressed}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Savings</p>
              <p className="font-medium text-success">{compressionInfo?.savings}%</p>
            </div>
          </div>
        </div>
      )}
      {/* Supported Formats */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="FileVideo" size={18} className="mr-2 text-primary" />
          Supported Formats
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {supportedFormats?.map((format, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{format?.ext}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{format?.ext}</p>
                <p className="text-xs text-muted-foreground">{format?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upload Guidelines */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-secondary" />
          Upload Guidelines
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Maximum file size: 500MB</li>
          <li>• Recommended resolution: 1080p or higher</li>
          <li>• Clear audio quality improves transcription accuracy</li>
          <li>• Processing time varies based on video length</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoUpload;