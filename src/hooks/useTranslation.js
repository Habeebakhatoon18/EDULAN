import { useState, useCallback } from 'react';
import translationService from '../services/translationService';

/**
 * Custom hook for translation functionality
 * Provides state management and methods for text translation
 */
export const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [translationError, setTranslationError] = useState(null);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [streamingContent, setStreamingContent] = useState('');

  /**
   * Translates text content
   */
  const translateText = useCallback(async (text, sourceLanguage, targetLanguage, options = {}) => {
    if (!text?.trim()) {
      setTranslationError('Text is required for translation');
      return null;
    }

    setIsTranslating(true);
    setTranslationError(null);
    setTranslatedContent('');

    try {
      const result = await translationService?.translateText(
        text, 
        sourceLanguage, 
        targetLanguage, 
        options
      );

      setTranslatedContent(result?.translatedText);
      setDetectedLanguage(result?.detectedLanguage);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        originalText: text?.substring(0, 100) + (text?.length > 100 ? '...' : ''),
        translatedText: result?.translatedText?.substring(0, 100) + (result?.translatedText?.length > 100 ? '...' : ''),
        sourceLanguage: result?.sourceLanguage,
        targetLanguage: result?.targetLanguage,
        timestamp: result?.timestamp
      };
      
      setTranslationHistory(prev => [historyItem, ...prev?.slice(0, 9)]); // Keep last 10
      
      return result;
    } catch (error) {
      setTranslationError(error?.message);
      console.error('Translation error:', error);
      return null;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  /**
   * Translates text with streaming for real-time display
   */
  const translateTextStreaming = useCallback(async (text, sourceLanguage, targetLanguage, onProgress) => {
    if (!text?.trim()) {
      setTranslationError('Text is required for translation');
      return null;
    }

    setIsTranslating(true);
    setTranslationError(null);
    setStreamingContent('');

    try {
      const result = await translationService?.translateTextStreaming(
        text,
        sourceLanguage,
        targetLanguage,
        (chunk) => {
          setStreamingContent(prev => prev + chunk);
          onProgress?.(chunk);
        }
      );

      setTranslatedContent(result);
      return result;
    } catch (error) {
      setTranslationError(error?.message);
      console.error('Streaming translation error:', error);
      return null;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  /**
   * Detects language of input text
   */
  const detectLanguage = useCallback(async (text) => {
    if (!text?.trim()) return null;

    try {
      const result = await translationService?.detectLanguage(text);
      setDetectedLanguage(result);
      return result;
    } catch (error) {
      console.error('Language detection error:', error);
      return null;
    }
  }, []);

  /**
   * Clears current translation state
   */
  const clearTranslation = useCallback(() => {
    setTranslatedContent('');
    setStreamingContent('');
    setDetectedLanguage(null);
    setTranslationError(null);
  }, []);

  /**
   * Calculates estimated cost for translation
   */
  const calculateCost = useCallback((text, model = 'gpt-4o') => {
    return translationService?.calculateTranslationCost(text, model);
  }, []);

  return {
    // State
    isTranslating,
    translatedContent,
    detectedLanguage,
    translationError,
    translationHistory,
    streamingContent,
    
    // Methods
    translateText,
    translateTextStreaming,
    detectLanguage,
    clearTranslation,
    calculateCost,
    
    // Setters for external control
    setTranslatedContent,
    setTranslationError
  };
};

export default useTranslation;