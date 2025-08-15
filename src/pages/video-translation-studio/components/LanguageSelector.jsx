import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LanguageSelector = ({ 
  sourceLanguage = 'auto', 
  targetLanguages = [], 
  onSourceChange, 
  onTargetChange,
  detectedLanguage = null,
  confidence = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const languages = [
    { code: 'auto', name: 'Auto-detect', flag: '🔍', popular: true },
    { code: 'en', name: 'English', flag: '🇺🇸', popular: true },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', popular: true },
    { code: 'fr', name: 'French', flag: '🇫🇷', popular: true },
    { code: 'de', name: 'German', flag: '🇩🇪', popular: true },
    { code: 'it', name: 'Italian', flag: '🇮🇹', popular: true },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', popular: true },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', popular: true },
    { code: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳', popular: true },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', popular: true },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', popular: true },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', popular: true },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', popular: false },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', popular: false },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰', popular: false },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', popular: false },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', popular: false },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', popular: false },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', popular: false },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', popular: false },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳', popular: false },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳', popular: false },
    { code: 'or', name: 'Odia', flag: '🇮🇳', popular: false },
    { code: 'as', name: 'Assamese', flag: '🇮🇳', popular: false },
    { code: 'ne', name: 'Nepali', flag: '🇳🇵', popular: false },
    { code: 'si', name: 'Sinhala', flag: '🇱🇰', popular: false },
    { code: 'th', name: 'Thai', flag: '🇹🇭', popular: false },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', popular: false },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', popular: false },
    { code: 'ms', name: 'Malay', flag: '🇲🇾', popular: false },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭', popular: false },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪', popular: false },
    { code: 'am', name: 'Amharic', flag: '🇪🇹', popular: false },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱', popular: false },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', popular: false },
    { code: 'pl', name: 'Polish', flag: '🇵🇱', popular: false },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', popular: false },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪', popular: false },
    { code: 'da', name: 'Danish', flag: '🇩🇰', popular: false },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴', popular: false },
    { code: 'fi', name: 'Finnish', flag: '🇫🇮', popular: false }
  ];

  const popularLanguages = languages?.filter(lang => lang?.popular);
  const allLanguages = languages?.filter(lang => !lang?.popular);

  const filteredLanguages = (showAllLanguages ? allLanguages : popularLanguages)?.filter(lang =>
    lang?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    lang?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getLanguageByCode = (code) => {
    return languages?.find(lang => lang?.code === code);
  };

  const handleSourceLanguageSelect = (langCode) => {
    onSourceChange?.(langCode);
  };

  const handleTargetLanguageToggle = (langCode) => {
    const isSelected = targetLanguages?.includes(langCode);
    let newTargetLanguages;
    
    if (isSelected) {
      newTargetLanguages = targetLanguages?.filter(code => code !== langCode);
    } else {
      newTargetLanguages = [...targetLanguages, langCode];
    }
    
    onTargetChange?.(newTargetLanguages);
  };

  const clearAllTargetLanguages = () => {
    onTargetChange?.([]);
  };

  const addPopularTargetLanguages = () => {
    const popularCodes = ['es', 'fr', 'de', 'it', 'pt'];
    const newTargets = [...new Set([...targetLanguages, ...popularCodes])];
    onTargetChange?.(newTargets);
  };

  return (
    <div className="space-y-6">
      {/* Source Language Selection */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center">
          <Icon name="Mic" size={20} className="mr-2 text-primary" />
          Source Language
        </h3>

        {/* Auto-detection Result */}
        {detectedLanguage && sourceLanguage === 'auto' && (
          <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Language Detected</span>
              </div>
              {confidence && (
                <span className="text-xs text-success">
                  {Math.round(confidence * 100)}% confidence
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-2xl">{getLanguageByCode(detectedLanguage)?.flag}</span>
              <span className="font-medium text-foreground">
                {getLanguageByCode(detectedLanguage)?.name}
              </span>
            </div>
          </div>
        )}

        {/* Source Language Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {popularLanguages?.slice(0, 8)?.map((lang) => (
            <button
              key={lang?.code}
              onClick={() => handleSourceLanguageSelect(lang?.code)}
              className={`p-3 rounded-lg border transition-smooth focus-ring ${
                sourceLanguage === lang?.code
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{lang?.flag}</span>
                <span className="text-sm font-medium truncate">{lang?.name}</span>
              </div>
            </button>
          ))}
        </div>

        {sourceLanguage !== 'auto' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSourceLanguageSelect('auto')}
            iconName="RotateCcw"
            iconPosition="left"
            className="mt-3"
          >
            Use Auto-detect
          </Button>
        )}
      </div>
      {/* Target Languages Selection */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-medium text-foreground flex items-center">
            <Icon name="Languages" size={20} className="mr-2 text-secondary" />
            Target Languages
          </h3>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={addPopularTargetLanguages}
              iconName="Plus"
              iconPosition="left"
            >
              Add Popular
            </Button>
            {targetLanguages?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllTargetLanguages}
                iconName="X"
                iconPosition="left"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Selected Target Languages */}
        {targetLanguages?.length > 0 && (
          <div className="mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Selected Languages ({targetLanguages?.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {targetLanguages?.map((langCode) => {
                const lang = getLanguageByCode(langCode);
                return (
                  <div
                    key={langCode}
                    className="flex items-center space-x-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{lang?.flag}</span>
                    <span className="text-sm font-medium">{lang?.name}</span>
                    <button
                      onClick={() => handleTargetLanguageToggle(langCode)}
                      className="hover:bg-secondary/30 rounded-full p-0.5 transition-smooth"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Language Grid */}
        <div className="space-y-4">
          {/* Popular Languages */}
          {!showAllLanguages && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Languages</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredLanguages?.map((lang) => {
                  if (lang?.code === 'auto') return null;
                  const isSelected = targetLanguages?.includes(lang?.code);
                  const isSourceLang = sourceLanguage === lang?.code;
                  
                  return (
                    <button
                      key={lang?.code}
                      onClick={() => !isSourceLang && handleTargetLanguageToggle(lang?.code)}
                      disabled={isSourceLang}
                      className={`p-3 rounded-lg border transition-smooth focus-ring ${
                        isSelected
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : isSourceLang
                            ? 'border-muted bg-muted/30 text-muted-foreground cursor-not-allowed'
                            : 'border-border hover:border-secondary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{lang?.flag}</span>
                        <span className="text-sm font-medium truncate">{lang?.name}</span>
                        {isSelected && (
                          <Icon name="Check" size={14} className="text-secondary" />
                        )}
                        {isSourceLang && (
                          <Icon name="Minus" size={14} className="text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Languages */}
          {showAllLanguages && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">All Languages</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {filteredLanguages?.map((lang) => {
                  const isSelected = targetLanguages?.includes(lang?.code);
                  const isSourceLang = sourceLanguage === lang?.code;
                  
                  return (
                    <button
                      key={lang?.code}
                      onClick={() => !isSourceLang && handleTargetLanguageToggle(lang?.code)}
                      disabled={isSourceLang}
                      className={`p-3 rounded-lg border transition-smooth focus-ring ${
                        isSelected
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : isSourceLang
                            ? 'border-muted bg-muted/30 text-muted-foreground cursor-not-allowed'
                            : 'border-border hover:border-secondary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{lang?.flag}</span>
                        <span className="text-sm font-medium truncate">{lang?.name}</span>
                        {isSelected && (
                          <Icon name="Check" size={14} className="text-secondary" />
                        )}
                        {isSourceLang && (
                          <Icon name="Minus" size={14} className="text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllLanguages(!showAllLanguages)}
              iconName={showAllLanguages ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {showAllLanguages ? 'Show Less' : 'Show All Languages'}
            </Button>
          </div>
        </div>
      </div>
      {/* Translation Summary */}
      {targetLanguages?.length > 0 && (
        <div className="glass rounded-lg p-4 border border-border/50">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="ArrowRight" size={16} className="mr-2 text-accent" />
            Translation Summary
          </h4>
          <div className="text-sm text-muted-foreground">
            <p>
              Your video will be translated from{' '}
              <span className="font-medium text-foreground">
                {sourceLanguage === 'auto' ? (detectedLanguage ? getLanguageByCode(detectedLanguage)?.name :'Auto-detected language')
                  : getLanguageByCode(sourceLanguage)?.name
                }
              </span>
              {' '}to{' '}
              <span className="font-medium text-foreground">
                {targetLanguages?.length} language{targetLanguages?.length > 1 ? 's' : ''}
              </span>
            </p>
            <p className="mt-2">
              Estimated processing time: {Math.ceil(targetLanguages?.length * 2.5)} - {Math.ceil(targetLanguages?.length * 4)} minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;