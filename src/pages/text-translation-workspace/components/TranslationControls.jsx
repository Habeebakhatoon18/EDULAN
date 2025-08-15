import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TranslationControls = ({ 
  onTranslate, 
  onClear, 
  isTranslating, 
  hasContent, 
  sourceLanguage, 
  targetLanguage,
  estimatedCost = 0.05 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    tone: 'neutral',
    formality: 'standard',
    subject: 'general'
  });

  const toneOptions = [
    { value: 'neutral', label: 'Neutral', icon: 'Minus' },
    { value: 'friendly', label: 'Friendly', icon: 'Smile' },
    { value: 'formal', label: 'Formal', icon: 'Briefcase' },
    { value: 'casual', label: 'Casual', icon: 'Coffee' }
  ];

  const formalityOptions = [
    { value: 'informal', label: 'Informal', icon: 'MessageCircle' },
    { value: 'standard', label: 'Standard', icon: 'FileText' },
    { value: 'formal', label: 'Formal', icon: 'GraduationCap' },
    { value: 'academic', label: 'Academic', icon: 'BookOpen' }
  ];

  const subjectOptions = [
    { value: 'general', label: 'General Education', icon: 'Book' },
    { value: 'science', label: 'Science & Technology', icon: 'Atom' },
    { value: 'math', label: 'Mathematics', icon: 'Calculator' },
    { value: 'literature', label: 'Literature & Arts', icon: 'Feather' },
    { value: 'history', label: 'History & Social Studies', icon: 'Clock' },
    { value: 'language', label: 'Language Learning', icon: 'Languages' }
  ];

  const handleTranslate = () => {
    onTranslate(advancedSettings);
  };

  const canTranslate = hasContent && sourceLanguage && targetLanguage && !isTranslating;

  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <div className="flex items-center justify-between p-4 glass rounded-lg border border-border/50">
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            onClick={handleTranslate}
            disabled={!canTranslate}
            loading={isTranslating}
            iconName="Languages"
            iconPosition="left"
            className="px-6"
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onClear}
            disabled={!hasContent || isTranslating}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Cost Estimation */}
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Estimated cost</div>
            <div className="font-medium text-foreground">${estimatedCost?.toFixed(2)}</div>
          </div>

          {/* Advanced Settings Toggle */}
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "Settings"}
            iconPosition="left"
            className="text-sm"
          >
            Advanced
          </Button>
        </div>
      </div>
      {/* Advanced Settings Panel */}
      {showAdvanced && (
        <div className="glass rounded-lg border border-border/50 p-4 animate-slide-down">
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Settings" size={16} className="mr-2" />
            Advanced Translation Settings
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tone Setting */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tone
              </label>
              <div className="space-y-2">
                {toneOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => setAdvancedSettings(prev => ({ ...prev, tone: option?.value }))}
                    className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-smooth ${
                      advancedSettings?.tone === option?.value
                        ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={14} />
                    <span>{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formality Setting */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Formality Level
              </label>
              <div className="space-y-2">
                {formalityOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => setAdvancedSettings(prev => ({ ...prev, formality: option?.value }))}
                    className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-smooth ${
                      advancedSettings?.formality === option?.value
                        ? 'bg-secondary/10 text-secondary border border-secondary/20' :'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={14} />
                    <span>{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Matter Setting */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject Matter
              </label>
              <div className="space-y-2">
                {subjectOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => setAdvancedSettings(prev => ({ ...prev, subject: option?.value }))}
                    className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-smooth ${
                      advancedSettings?.subject === option?.value
                        ? 'bg-accent/10 text-accent-foreground border border-accent/20'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={14} />
                    <span className="truncate">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Summary */}
          <div className="mt-4 p-3 bg-muted/20 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current settings:</span>
              <div className="flex items-center space-x-2 text-foreground">
                <span className="capitalize">{advancedSettings?.tone}</span>
                <span>•</span>
                <span className="capitalize">{advancedSettings?.formality}</span>
                <span>•</span>
                <span className="capitalize">{advancedSettings?.subject?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Translation Progress */}
      {isTranslating && (
        <div className="glass rounded-lg border border-border/50 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Languages" size={16} className="text-primary animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Processing translation...</span>
                <span className="text-xs text-muted-foreground">Step 2 of 3</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse w-2/3" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Analyzing content structure and applying {advancedSettings?.formality} {advancedSettings?.tone} tone for {advancedSettings?.subject} subject matter
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationControls;