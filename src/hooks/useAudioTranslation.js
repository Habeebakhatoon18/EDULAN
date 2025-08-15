import { useState, useCallback } from 'react';
import translationService from '../services/translationService';
import fileProcessingService from '../services/fileProcessingService';

/**
 * Custom hook for audio/video translation functionality
 * Provides state management and methods for audio processing and subtitle generation
 */
export const useAudioTranslation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [subtitles, setSubtitles] = useState({});
  const [processingError, setProcessingError] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentJob, setCurrentJob] = useState(null);

  /**
   * Transcribes audio file to text
   */
  const transcribeAudio = useCallback(async (audioFile, language = null) => {
    if (!audioFile) {
      setProcessingError('Audio file is required');
      return null;
    }

    // Validate file
    const validation = fileProcessingService?.validateFile(audioFile, 'audio');
    if (!validation?.valid) {
      setProcessingError(validation?.error);
      return null;
    }

    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress(0);

    try {
      const result = await translationService?.transcribeAudio(audioFile, language);
      setTranscription(result);
      setProcessingProgress(100);
      return result;
    } catch (error) {
      setProcessingError(error?.message);
      console.error('Audio transcription error:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Translates audio file directly
   */
  const translateAudio = useCallback(async (audioFile, targetLanguage) => {
    if (!audioFile) {
      setProcessingError('Audio file is required');
      return null;
    }

    const validation = fileProcessingService?.validateFile(audioFile, 'audio');
    if (!validation?.valid) {
      setProcessingError(validation?.error);
      return null;
    }

    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress(0);

    try {
      const result = await translationService?.translateAudio(audioFile, targetLanguage);
      setProcessingProgress(100);
      return result;
    } catch (error) {
      setProcessingError(error?.message);
      console.error('Audio translation error:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Generates subtitles for video/audio with multiple target languages
   */
  const generateSubtitles = useCallback(async (mediaFile, targetLanguages = []) => {
    if (!mediaFile) {
      setProcessingError('Media file is required');
      return null;
    }

    const validation = fileProcessingService?.validateFile(mediaFile, 'video');
    if (!validation?.valid) {
      setProcessingError(validation?.error);
      return null;
    }

    setIsProcessing(true);
    setProcessingError(null);
    setProcessingProgress(0);

    // Create processing job
    const job = fileProcessingService?.createProcessingJob(mediaFile, {
      targetLanguages,
      type: 'subtitle_generation'
    });
    setCurrentJob(job);

    try {
      const result = await translationService?.generateSubtitles(
        mediaFile,
        targetLanguages,
        (progress) => {
          setProcessingProgress(progress?.progress || 0);
          setCurrentJob(prev => ({
            ...prev,
            status: progress?.step || 'processing',
            progress: progress?.progress || 0
          }));
        }
      );

      setSubtitles({
        [result?.originalLanguage]: result?.originalSubtitles,
        ...result?.translatedSubtitles
      });

      setCurrentJob(prev => ({
        ...prev,
        status: 'completed',
        progress: 100,
        result
      }));

      return result;
    } catch (error) {
      setProcessingError(error?.message);
      setCurrentJob(prev => ({
        ...prev,
        status: 'failed',
        error: error?.message
      }));
      console.error('Subtitle generation error:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Exports subtitles in specified format
   */
  const exportSubtitles = useCallback((language, format = 'srt') => {
    const languageSubtitles = subtitles?.[language];
    if (!languageSubtitles) {
      setProcessingError(`No subtitles available for language: ${language}`);
      return null;
    }

    try {
      const content = translationService?.exportSubtitles(languageSubtitles, format);
      const filename = `subtitles_${language}.${format}`;
      fileProcessingService?.downloadFile(content, filename, 'text/plain');
      return content;
    } catch (error) {
      setProcessingError(error?.message);
      console.error('Subtitle export error:', error);
      return null;
    }
  }, [subtitles]);

  /**
   * Processes YouTube video URL
   */
  const processYouTubeVideo = useCallback(async (url, targetLanguages = []) => {
    try {
      const videoInfo = fileProcessingService?.processYouTubeURL(url);
      
      // Create processing job
      const job = fileProcessingService?.createProcessingJob(videoInfo, {
        targetLanguages,
        type: 'youtube_processing'
      });
      setCurrentJob(job);
      
      // Note: Actual YouTube video processing would require backend integration
      // This is a placeholder for the UI flow
      setIsProcessing(true);
      setProcessingProgress(0);
      
      // Simulate processing
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setIsProcessing(false);
          }
          setProcessingProgress(progress);
          setCurrentJob(prev => ({
            ...prev,
            progress,
            status: progress >= 100 ? 'completed' : 'processing'
          }));
        }, 500);
      };
      
      setTimeout(simulateProgress, 1000);
      
      return videoInfo;
    } catch (error) {
      setProcessingError(error?.message);
      setCurrentJob(prev => prev && {
        ...prev,
        status: 'failed',
        error: error?.message
      });
      console.error('YouTube processing error:', error);
      return null;
    }
  }, []);

  /**
   * Clears current processing state
   */
  const clearProcessing = useCallback(() => {
    setTranscription(null);
    setSubtitles({});
    setProcessingError(null);
    setProcessingProgress(0);
    setCurrentJob(null);
  }, []);

  /**
   * Gets processing status
   */
  const getProcessingStatus = useCallback(() => {
    if (isProcessing) {
      return {
        status: 'processing',
        progress: processingProgress,
        message: currentJob?.status || 'Processing...'
      };
    }
    
    if (processingError) {
      return {
        status: 'error',
        progress: 0,
        message: processingError
      };
    }
    
    return {
      status: 'idle',
      progress: 0,
      message: 'Ready to process'
    };
  }, [isProcessing, processingProgress, processingError, currentJob]);

  return {
    // State
    isProcessing,
    transcription,
    subtitles,
    processingError,
    processingProgress,
    currentJob,
    
    // Methods
    transcribeAudio,
    translateAudio,
    generateSubtitles,
    exportSubtitles,
    processYouTubeVideo,
    clearProcessing,
    getProcessingStatus,
    
    // Setters for external control
    setTranscription,
    setSubtitles,
    setProcessingError
  };
};

export default useAudioTranslation;