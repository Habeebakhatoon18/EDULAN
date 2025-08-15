import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import useTranslation from '../../../hooks/useTranslation';

const LiveTranslationDemo = () => {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [demoMode, setDemoMode] = useState('manual'); // 'manual' or 'auto'

  // Use translation hook
  const {
    isTranslating,
    translatedContent,
    detectedLanguage,
    translateText,
    clearTranslation
  } = useTranslation();

  // Sample demo texts
  const demoTexts = [
    { text: "Welcome to our online learning platform", lang: "en" },
    { text: "Mathematics is the language of the universe", lang: "en" },
    { text: "Science helps us understand the world around us", lang: "en" },
    { text: "Education is the key to unlocking human potential", lang: "en" }
  ];

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);

  // Auto-cycle demo text
  useEffect(() => {
    if (demoMode === 'auto') {
      const interval = setInterval(() => {
        const demoText = demoTexts?.[currentDemoIndex];
        setInputText(demoText?.text);
        setCurrentDemoIndex((prev) => (prev + 1) % demoTexts?.length);
        
        // Auto translate after setting text
        setTimeout(() => {
          handleTranslate(demoText?.text);
        }, 500);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [demoMode, currentDemoIndex]);

  // Start auto demo on mount
  useEffect(() => {
    if (demoMode === 'auto' && !inputText) {
      const firstDemo = demoTexts?.[0];
      setInputText(firstDemo?.text);
      setTimeout(() => {
        handleTranslate(firstDemo?.text);
      }, 1000);
    }
  }, []);

  const handleTranslate = async (text = inputText) => {
    if (!text?.trim()) return;

    try {
      await translateText(text, sourceLanguage, targetLanguage);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleClear = () => {
    setInputText('');
    clearTranslation();
  };

  const handleLanguageSwap = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    
    if (inputText && translatedContent) {
      const tempText = inputText;
      setInputText(translatedContent);
      // The translated content will be cleared and needs retranslation
      clearTranslation();
    }
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
  ];

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4"
        >
          <Icon name="Zap" size={16} className="mr-2" />
          Live Translation Demo
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4"
        >
          See AI Translation in 
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Real-Time Action
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Experience instant translation powered by advanced AI. Type any text or watch our auto-demo 
          to see how EduLingua AI transforms educational content across languages.
        </motion.p>
      </div>
      {/* Demo Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Button
            variant={demoMode === 'manual' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDemoMode('manual')}
          >
            Manual Mode
          </Button>
          <Button
            variant={demoMode === 'auto' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDemoMode('auto')}
          >
            Auto Demo
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageSwap}
            iconName="ArrowLeftRight"
            iconPosition="left"
          >
            Swap
          </Button>
        </div>
      </motion.div>
      {/* Translation Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass rounded-2xl border border-border/50 overflow-hidden"
      >
        {/* Language Selection Bar */}
        <div className="bg-muted/30 border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e?.target?.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus-ring"
                disabled={demoMode === 'auto'}
              >
                {languages?.map((lang) => (
                  <option key={lang?.code} value={lang?.code}>
                    {lang?.flag} {lang?.name}
                  </option>
                ))}
              </select>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageSwap}
                className="p-2 rounded-full"
                iconName="ArrowLeftRight"
              />
              
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e?.target?.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus-ring"
                disabled={demoMode === 'auto'}
              >
                {languages?.map((lang) => (
                  <option key={lang?.code} value={lang?.code}>
                    {lang?.flag} {lang?.name}
                  </option>
                ))}
              </select>
            </div>

            {detectedLanguage && (
              <div className="flex items-center space-x-2 text-sm text-primary">
                <Icon name="Zap" size={14} />
                <span>Detected: {detectedLanguage?.language}</span>
              </div>
            )}
          </div>
        </div>

        {/* Translation Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Source Panel */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground flex items-center">
                <Icon name="Edit3" size={16} className="mr-2 text-primary" />
                Source Text
              </h4>
              {demoMode === 'manual' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTranslate()}
                  disabled={!inputText?.trim() || isTranslating}
                  iconName="Send"
                  iconPosition="left"
                >
                  Translate
                </Button>
              )}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e?.target?.value)}
              placeholder="Type your text here to see instant translation..."
              className="w-full h-32 bg-background border border-border/50 rounded-lg p-4 text-foreground placeholder-muted-foreground resize-none focus-ring"
              disabled={demoMode === 'auto' || isTranslating}
            />

            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>{inputText?.length || 0} characters</span>
              {demoMode === 'auto' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Auto demo active</span>
                </div>
              )}
            </div>
          </div>

          {/* Translation Panel */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground flex items-center">
                <Icon name="Languages" size={16} className="mr-2 text-secondary" />
                Translation
              </h4>
              {translatedContent && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                  onClick={() => navigator.clipboard?.writeText(translatedContent)}
                >
                  Copy
                </Button>
              )}
            </div>

            <div className="w-full h-32 bg-muted/30 border border-border/50 rounded-lg p-4 text-foreground overflow-auto">
              {isTranslating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">Translating...</span>
                  </div>
                </div>
              ) : translatedContent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {translatedContent}
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <span>Translation will appear here...</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>{translatedContent?.length || 0} characters</span>
              {translatedContent && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="CheckCircle" size={14} />
                  <span>Translation complete</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-muted/20 border-t border-border/50 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Instant AI Translation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">Context-Aware Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-secondary" />
              <span className="text-sm text-muted-foreground">50+ Languages Supported</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveTranslationDemo;