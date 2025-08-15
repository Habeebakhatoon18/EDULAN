import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourcePanel = ({ 
  content, 
  onContentChange, 
  activeTab, 
  onFileSelect,
  disabled = false 
}) => {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const text = e?.target?.value;
    onContentChange(text);
    
    // Update counts
    const words = text?.trim() ? text?.trim()?.split(/\s+/)?.length : 0;
    const chars = text?.length;
    setWordCount(words);
    setCharCount(chars);
  };

  const handleClearContent = () => {
    onContentChange('');
    setWordCount(0);
    setCharCount(0);
  };

  const renderLineNumbers = () => {
    if (!showLineNumbers || !content) return null;
    
    const lines = content?.split('\n');
    return (
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/30 border-r border-border/50 flex flex-col text-xs text-muted-foreground">
        {lines?.map((_, index) => (
          <div key={index} className="h-6 flex items-center justify-center">
            {index + 1}
          </div>
        ))}
      </div>
    );
  };

  const renderPasteContent = () => (
    <div className="relative h-full">
      {renderLineNumbers()}
      <textarea
        value={content}
        onChange={handleTextChange}
        placeholder="Paste your educational content here...\n\nExample:\nChapter 1: Introduction to Mathematics\nMathematics is the study of numbers, shapes, and patterns..."
        disabled={disabled}
        className={`w-full h-full resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm leading-6 ${
          showLineNumbers ? 'pl-14' : 'pl-4'
        } pr-4 py-4`}
      />
    </div>
  );

  const renderTypeContent = () => (
    <div className="relative h-full">
      {renderLineNumbers()}
      <textarea
        value={content}
        onChange={handleTextChange}
        placeholder="Start typing your educational content...\n\nTip: Use clear headings and paragraphs for better translation results."
        disabled={disabled}
        className={`w-full h-full resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm leading-6 ${
          showLineNumbers ? 'pl-14' : 'pl-4'
        } pr-4 py-4`}
      />
    </div>
  );

  const renderUploadContent = () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">No file uploaded</p>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a PDF or DOCX file to see its content here
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={() => onFileSelect()}
          >
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={18} className="text-primary" />
          <h3 className="font-medium text-foreground">Source Content</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {(activeTab === 'paste' || activeTab === 'type') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              iconName="Hash"
              className="text-xs"
            >
              {showLineNumbers ? 'Hide' : 'Show'} Lines
            </Button>
          )}
          
          {content && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearContent}
              iconName="X"
              className="text-xs text-muted-foreground hover:text-error"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-background">
        {activeTab === 'paste' && renderPasteContent()}
        {activeTab === 'type' && renderTypeContent()}
        {activeTab === 'upload' && renderUploadContent()}
      </div>

      {/* Footer Stats */}
      {(activeTab === 'paste' || activeTab === 'type') && content && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={12} />
            <span>Est. {Math.ceil(wordCount / 200)} min read</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcePanel;