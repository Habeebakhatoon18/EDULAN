import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LanguageSelector from './components/LanguageSelector';
import InputMethodTabs from './components/InputMethodTabs';
import FileUploadArea from './components/FileUploadArea';
import SourcePanel from './components/SourcePanel';
import TranslationPanel from './components/TranslationPanel';
import TranslationControls from './components/TranslationControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import useTranslation from '../../hooks/useTranslation';
import fileProcessingService from '../../services/fileProcessingService';

const TextTranslationWorkspace = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [activeTab, setActiveTab] = useState('paste');
  const [sourceContent, setSourceContent] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeMobilePanel, setActiveMobilePanel] = useState('source');

  // Use translation hook
  const {
    isTranslating,
    translatedContent,
    detectedLanguage,
    translationError,
    translateText,
    clearTranslation,
    calculateCost,
    setTranslatedContent
  } = useTranslation();

  // Mock sample content for demonstration
  const sampleContent = `Chapter 1: Introduction to Mathematics

Mathematics is the study of numbers, shapes, and patterns. It is a fundamental subject that helps us understand the world around us through logical reasoning and problem-solving.

Key Topics:
• Number systems and operations
• Geometric shapes and properties  
• Algebraic expressions and equations
• Data analysis and statistics

Learning Objectives:
By the end of this chapter, students will be able to:
1. Identify different types of numbers
2. Perform basic mathematical operations
3. Recognize geometric patterns
4. Apply mathematical concepts to real-world problems

Mathematics forms the foundation for many other subjects including science, engineering, economics, and technology. Understanding mathematical principles is essential for academic success and practical life skills.`;

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleTranslate = async (settings) => {
    if (!sourceContent?.trim()) return;

    try {
      const result = await translateText(
        sourceContent,
        sourceLanguage === 'auto' ? 'auto' : sourceLanguage,
        targetLanguage,
        settings
      );

      if (result && isMobileView) {
        setActiveMobilePanel('translation');
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleClear = () => {
    setSourceContent('');
    clearTranslation();
    setActiveMobilePanel('source');
  };

  const handleFileSelect = async (file) => {
    try {
      // Show upload tab
      setActiveTab('upload');
      
      // Extract text from file
      const extractedText = await fileProcessingService?.extractTextFromFile(file);
      setSourceContent(extractedText);
      
      // Auto-detect language if set to auto
      if (sourceLanguage === 'auto') {
        // Language detection will be handled in translation
      }
    } catch (error) {
      console.error('File processing error:', error);
      alert(`Failed to process file: ${error?.message}`);
    }
  };

  const handleDownload = () => {
    if (!translatedContent) return;
    
    const filename = `translation_${targetLanguage}_${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
    fileProcessingService?.downloadFile(translatedContent, filename);
  };

  const handleSaveToLibrary = () => {
    // Mock save functionality - in real app, this would save to user's library
    if (!translatedContent) return;
    
    const savedTranslation = {
      id: Date.now(),
      originalText: sourceContent?.substring(0, 100) + '...',
      translatedText: translatedContent?.substring(0, 100) + '...',
      sourceLanguage: detectedLanguage?.languageCode || sourceLanguage,
      targetLanguage,
      timestamp: new Date()?.toISOString()
    };
    
    // Save to localStorage for demo purposes
    const savedTranslations = JSON.parse(localStorage.getItem('savedTranslations') || '[]');
    savedTranslations?.unshift(savedTranslation);
    localStorage.setItem('savedTranslations', JSON.stringify(savedTranslations?.slice(0, 50))); // Keep last 50
    
    alert('Translation saved to your library successfully!');
  };

  const handleSwapLanguages = () => {
    if (sourceLanguage === 'auto') return; // Can't swap with auto-detect
    
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    
    // Swap content if both exist
    if (sourceContent && translatedContent) {
      const tempContent = sourceContent;
      setSourceContent(translatedContent);
      setTranslatedContent(tempContent);
    }
  };

  const loadSampleContent = () => {
    setSourceContent(sampleContent);
    setActiveTab('paste');
  };

  const estimatedCost = calculateCost(sourceContent);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Text Translation Workspace - EduLingua AI</title>
        <meta name="description" content="Translate educational documents with AI-powered text translation workspace. Support for PDF, DOCX, and direct text input with real-time processing." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                  Text Translation Workspace
                </h1>
                <p className="text-muted-foreground">
                  Transform educational content across languages with AI-powered translation
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadSampleContent}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Load Sample
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                >
                  Help
                </Button>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <div className="glass rounded-lg border border-border/50 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LanguageSelector
                  label="Source Language"
                  selectedLanguage={sourceLanguage}
                  onLanguageChange={setSourceLanguage}
                  type="source"
                />
                
                <div className="relative">
                  <LanguageSelector
                    label="Target Language"
                    selectedLanguage={targetLanguage}
                    onLanguageChange={setTargetLanguage}
                    type="target"
                  />
                  
                  {/* Swap Button */}
                  {sourceLanguage !== 'auto' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSwapLanguages}
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border border-border shadow-md hover:shadow-lg z-10"
                      iconName="ArrowLeftRight"
                    >
                      <span className="sr-only">Swap languages</span>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Language Detection Info */}
              {detectedLanguage && sourceLanguage === 'auto' && (
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Zap" size={16} className="text-primary" />
                    <span className="text-primary font-medium">
                      Detected: {detectedLanguage?.language} 
                      {detectedLanguage?.confidence && (
                        <span className="text-muted-foreground ml-2">
                          ({Math.round(detectedLanguage?.confidence * 100)}% confidence)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {translationError && (
            <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-error font-medium">Translation Error</span>
              </div>
              <p className="text-sm text-error/80 mt-1">{translationError}</p>
            </div>
          )}

          {/* Mobile Panel Switcher */}
          {isMobileView && (
            <div className="mb-4">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveMobilePanel('source')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                    activeMobilePanel === 'source' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="FileText" size={16} />
                  <span>Source</span>
                </button>
                <button
                  onClick={() => setActiveMobilePanel('translation')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                    activeMobilePanel === 'translation' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Languages" size={16} />
                  <span>Translation</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Source Panel */}
            <div className={`glass rounded-lg border border-border/50 ${
              isMobileView && activeMobilePanel !== 'source' ? 'hidden' : ''
            }`}>
              <InputMethodTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              {activeTab === 'upload' ? (
                <div className="p-6">
                  <FileUploadArea onFileSelect={handleFileSelect} />
                </div>
              ) : (
                <div className="h-96">
                  <SourcePanel
                    content={sourceContent}
                    onContentChange={setSourceContent}
                    activeTab={activeTab}
                    onFileSelect={() => setActiveTab('upload')}
                  />
                </div>
              )}
            </div>

            {/* Translation Panel */}
            <div className={`glass rounded-lg border border-border/50 h-96 lg:h-auto ${
              isMobileView && activeMobilePanel !== 'translation' ? 'hidden' : ''
            }`}>
              <TranslationPanel
                translatedContent={translatedContent}
                isTranslating={isTranslating}
                onEdit={setTranslatedContent}
                onDownload={handleDownload}
                onSaveToLibrary={handleSaveToLibrary}
                targetLanguage={targetLanguage}
              />
            </div>
          </div>

          {/* Translation Controls */}
          <TranslationControls
            onTranslate={handleTranslate}
            onClear={handleClear}
            isTranslating={isTranslating}
            hasContent={!!sourceContent?.trim()}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            estimatedCost={estimatedCost}
          />

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-lg border border-border/50 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Recent Translations</h4>
                  <p className="text-sm text-muted-foreground">Access your translation history</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-border/50 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Saved Library</h4>
                  <p className="text-sm text-muted-foreground">Manage saved translations</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg border border-border/50 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Preferences</h4>
                  <p className="text-sm text-muted-foreground">Customize translation settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextTranslationWorkspace;