import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TranslationPanel = ({ 
  translatedContent, 
  isTranslating, 
  onEdit, 
  onDownload, 
  onSaveToLibrary,
  targetLanguage 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(translatedContent);
  const [confidenceScores] = useState([
    { paragraph: 1, score: 95, status: 'high' },
    { paragraph: 2, score: 87, status: 'medium' },
    { paragraph: 3, score: 92, status: 'high' },
    { paragraph: 4, score: 78, status: 'low' }
  ]);

  const handleSaveEdit = () => {
    onEdit(editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(translatedContent);
    setIsEditing(false);
  };

  const getConfidenceColor = (status) => {
    switch (status) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConfidenceIcon = (status) => {
    switch (status) {
      case 'high': return 'CheckCircle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'XCircle';
      default: return 'Circle';
    }
  };

  const renderTranslatingState = () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Languages" size={24} className="text-primary animate-pulse" />
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">Translating content...</p>
          <p className="text-sm text-muted-foreground mb-4">
            AI is processing your educational content
          </p>
          <div className="w-48 mx-auto bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse w-3/4" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Estimated time: 30 seconds</p>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Icon name="Languages" size={32} className="text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">Ready for translation</p>
          <p className="text-sm text-muted-foreground">
            Add content to the source panel and click translate
          </p>
        </div>
      </div>
    </div>
  );

  const renderTranslatedContent = () => (
    <div className="h-full flex flex-col">
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e?.target?.value)}
          className="flex-1 w-full resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm leading-6 p-4"
        />
      ) : (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            {translatedContent?.split('\n\n')?.map((paragraph, index) => {
              const confidence = confidenceScores?.find(c => c?.paragraph === index + 1);
              return (
                <div key={index} className="relative group mb-4">
                  <p className="text-sm leading-6 text-foreground">{paragraph}</p>
                  {confidence && (
                    <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-smooth">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        confidence?.status === 'high' ? 'bg-success/10' :
                        confidence?.status === 'medium' ? 'bg-warning/10' : 'bg-error/10'
                      }`}>
                        <Icon 
                          name={getConfidenceIcon(confidence?.status)} 
                          size={12} 
                          className={getConfidenceColor(confidence?.status)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit Controls */}
      {isEditing && (
        <div className="flex items-center justify-end space-x-2 p-4 border-t border-border/50 bg-muted/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancelEdit}
            iconName="X"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSaveEdit}
            iconName="Check"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <Icon name="Languages" size={18} className="text-secondary" />
          <h3 className="font-medium text-foreground">Translation Output</h3>
          {targetLanguage && (
            <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
              {targetLanguage}
            </span>
          )}
        </div>
        
        {translatedContent && !isTranslating && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              iconName="Edit3"
              className="text-xs"
            >
              {isEditing ? 'View' : 'Edit'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownload}
              iconName="Download"
              className="text-xs"
            >
              Download
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onSaveToLibrary}
              iconName="BookOpen"
              className="text-xs"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-background">
        {isTranslating && renderTranslatingState()}
        {!isTranslating && !translatedContent && renderEmptyState()}
        {!isTranslating && translatedContent && renderTranslatedContent()}
      </div>

      {/* Confidence Scores Footer */}
      {translatedContent && !isTranslating && !isEditing && (
        <div className="px-4 py-2 bg-muted/20 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Translation Confidence:</span>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={12} className="text-success" />
                <span className="text-success">High: 2</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={12} className="text-warning" />
                <span className="text-warning">Medium: 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="XCircle" size={12} className="text-error" />
                <span className="text-error">Low: 1</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              Overall: 88% accuracy
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationPanel;