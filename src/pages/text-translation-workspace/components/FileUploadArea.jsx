import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadArea = ({ onFileSelect, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { ext: 'PDF', icon: 'FileText', color: 'text-error' },
    { ext: 'DOCX', icon: 'FileText', color: 'text-primary' },
    { ext: 'TXT', icon: 'File', color: 'text-muted-foreground' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files) => {
    const file = files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes?.includes(file?.type)) {
      alert('Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    if (file?.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB.');
      return;
    }

    simulateUpload(file);
  };

  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onFileSelect(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
          isDragOver && !disabled
            ? 'border-primary bg-primary/5'
            : disabled
            ? 'border-border/30 bg-muted/20' :'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary animate-pulse" />
            </div>
            <div>
              <p className="font-medium text-foreground">Uploading file...</p>
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                {isDragOver ? 'Drop your file here' : 'Drag and drop your file here'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <Button
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                disabled={disabled}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Browse Files
              </Button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => handleFileSelection(Array.from(e?.target?.files))}
          className="hidden"
          disabled={disabled}
        />
      </div>
      {/* Supported Formats */}
      <div className="flex items-center justify-center space-x-6">
        <span className="text-xs text-muted-foreground">Supported formats:</span>
        {supportedFormats?.map((format) => (
          <div key={format?.ext} className="flex items-center space-x-1">
            <Icon name={format?.icon} size={14} className={format?.color} />
            <span className="text-xs font-medium text-muted-foreground">{format?.ext}</span>
          </div>
        ))}
      </div>
      {/* File Size Limit */}
      <p className="text-xs text-muted-foreground text-center">
        Maximum file size: 10MB
      </p>
    </div>
  );
};

export default FileUploadArea;