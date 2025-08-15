import openai from './openai';

/**
 * Translation Service for EduLingua AI
 * Provides comprehensive AI-powered translation functionality
 */

// Language mappings for OpenAI compatibility
const LANGUAGE_MAPPINGS = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'hi': 'Hindi',
  'ar': 'Arabic',
  'bn': 'Bengali',
  'ta': 'Tamil',
  'te': 'Telugu',
  'mr': 'Marathi',
  'gu': 'Gujarati',
  'kn': 'Kannada',
  'ml': 'Malayalam',
  'pa': 'Punjabi',
  'ur': 'Urdu',
  'auto': 'auto-detect'
};

/**
 * Translates text content using OpenAI's GPT model with structured output
 * @param {string} text - The text to translate
 * @param {string} sourceLanguage - Source language code
 * @param {string} targetLanguage - Target language code
 * @param {object} options - Translation options
 * @returns {Promise<object>} Translation result with text and metadata
 */
export async function translateText(text, sourceLanguage, targetLanguage, options = {}) {
  try {
    if (!text?.trim()) {
      throw new Error('Text is required for translation');
    }

    const sourceLang = LANGUAGE_MAPPINGS?.[sourceLanguage] || sourceLanguage;
    const targetLang = LANGUAGE_MAPPINGS?.[targetLanguage] || targetLanguage;

    const systemPrompt = `You are a professional educational translator specializing in academic content. 
    Translate the following text from ${sourceLang} to ${targetLang}. 
    Maintain educational context, preserve formatting, and ensure accuracy for student comprehension.
    If the source language is auto-detect, first identify the language then translate.`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'translation_response',
          schema: {
            type: 'object',
            properties: {
              translatedText: { type: 'string' },
              detectedLanguage: { type: 'string' },
              confidence: { type: 'number' },
              wordCount: { type: 'number' }
            },
            required: ['translatedText', 'detectedLanguage', 'confidence', 'wordCount'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
      max_tokens: 4000,
    });

    const result = JSON.parse(response?.choices?.[0]?.message?.content);
    
    return {
      translatedText: result?.translatedText,
      detectedLanguage: result?.detectedLanguage,
      confidence: result?.confidence,
      wordCount: result?.wordCount,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      timestamp: new Date()?.toISOString()
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(`Translation failed: ${error.message}`);
  }
}

/**
 * Translates text with streaming for real-time display
 * @param {string} text - The text to translate
 * @param {string} sourceLanguage - Source language code
 * @param {string} targetLanguage - Target language code
 * @param {Function} onChunk - Callback for streaming chunks
 * @returns {Promise<string>} Complete translated text
 */
export async function translateTextStreaming(text, sourceLanguage, targetLanguage, onChunk) {
  try {
    if (!text?.trim()) {
      throw new Error('Text is required for translation');
    }

    const sourceLang = LANGUAGE_MAPPINGS?.[sourceLanguage] || sourceLanguage;
    const targetLang = LANGUAGE_MAPPINGS?.[targetLanguage] || targetLanguage;

    const systemPrompt = `You are a professional educational translator. Translate from ${sourceLang} to ${targetLang} maintaining educational context and accuracy.`;

    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      stream: true,
      temperature: 0.3,
    });

    let fullTranslation = '';
    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        fullTranslation += content;
        onChunk(content);
      }
    }

    return fullTranslation;
  } catch (error) {
    console.error('Streaming translation error:', error);
    throw new Error(`Streaming translation failed: ${error.message}`);
  }
}

/**
 * Detects the language of input text
 * @param {string} text - Text to analyze
 * @returns {Promise<object>} Language detection result
 */
export async function detectLanguage(text) {
  try {
    if (!text?.trim()) {
      return { language: 'unknown', confidence: 0 };
    }

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a language detection expert. Analyze the given text and identify its language.'
        },
        {
          role: 'user',
          content: `Detect the language of this text: "${text?.substring(0, 500)}"`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'language_detection',
          schema: {
            type: 'object',
            properties: {
              language: { type: 'string' },
              languageCode: { type: 'string' },
              confidence: { type: 'number' },
              script: { type: 'string' }
            },
            required: ['language', 'languageCode', 'confidence', 'script'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.1,
      max_tokens: 200,
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Language detection error:', error);
    return { language: 'unknown', languageCode: 'auto', confidence: 0, script: 'unknown' };
  }
}

/**
 * Transcribes audio file to text using OpenAI Whisper
 * @param {File} audioFile - Audio file to transcribe
 * @param {string} language - Optional language hint
 * @returns {Promise<object>} Transcription result
 */
export async function transcribeAudio(audioFile, language = null) {
  try {
    if (!audioFile) {
      throw new Error('Audio file is required');
    }

    const formData = new FormData();
    formData?.append('file', audioFile);
    formData?.append('model', 'whisper-1');
    if (language && language !== 'auto') {
      formData?.append('language', language);
    }

    const response = await openai?.audio?.transcriptions?.create({
      model: 'whisper-1',
      file: audioFile,
      language: language && language !== 'auto' ? language : undefined,
      response_format: 'verbose_json',
      temperature: 0.2,
    });

    return {
      text: response?.text,
      language: response?.language,
      duration: response?.duration,
      segments: response?.segments || [],
      timestamp: new Date()?.toISOString()
    };
  } catch (error) {
    console.error('Audio transcription error:', error);
    throw new Error(`Audio transcription failed: ${error.message}`);
  }
}

/**
 * Translates audio file directly to target language
 * @param {File} audioFile - Audio file to translate
 * @param {string} targetLanguage - Target language code
 * @returns {Promise<object>} Translation result
 */
export async function translateAudio(audioFile, targetLanguage) {
  try {
    // First transcribe the audio
    const transcription = await transcribeAudio(audioFile);
    
    // Then translate the transcribed text
    const translation = await translateText(
      transcription?.text,
      transcription?.language,
      targetLanguage
    );

    return {
      originalText: transcription?.text,
      translatedText: translation?.translatedText,
      sourceLanguage: transcription?.language,
      targetLanguage: targetLanguage,
      duration: transcription?.duration,
      confidence: translation?.confidence,
      timestamp: new Date()?.toISOString()
    };
  } catch (error) {
    console.error('Audio translation error:', error);
    throw new Error(`Audio translation failed: ${error.message}`);
  }
}

/**
 * Generates subtitles from video/audio with translations
 * @param {File} mediaFile - Video or audio file
 * @param {Array} targetLanguages - Array of target language codes
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<object>} Subtitle generation result
 */
export async function generateSubtitles(mediaFile, targetLanguages = [], onProgress = null) {
  try {
    if (!mediaFile) {
      throw new Error('Media file is required');
    }

    // Step 1: Transcribe the media file
    onProgress?.({ step: 'transcribing', progress: 10 });
    const transcription = await transcribeAudio(mediaFile);

    // Step 2: Format segments into subtitle format
    onProgress?.({ step: 'formatting', progress: 30 });
    const originalSubtitles = transcription?.segments?.map((segment, index) => ({
      id: index + 1,
      startTime: segment?.start,
      endTime: segment?.end,
      text: segment?.text?.trim()
    })) || [];

    // Step 3: Translate to target languages
    const translatedSubtitles = {};
    
    for (let i = 0; i < targetLanguages?.length; i++) {
      const targetLang = targetLanguages?.[i];
      onProgress?.({ 
        step: `translating_${targetLang}`, 
        progress: 30 + ((i + 1) / targetLanguages?.length) * 60 
      });

      const fullText = originalSubtitles?.map(sub => sub?.text)?.join('\n');
      const translation = await translateText(transcription?.language, targetLang, fullText);
      
      const translatedLines = translation?.translatedText?.split('\n');
      translatedSubtitles[targetLang] = originalSubtitles?.map((sub, idx) => ({
        ...sub,
        text: translatedLines?.[idx] || sub?.text
      }));
    }

    onProgress?.({ step: 'complete', progress: 100 });

    return {
      originalLanguage: transcription?.language,
      originalSubtitles,
      translatedSubtitles,
      duration: transcription?.duration,
      timestamp: new Date()?.toISOString()
    };
  } catch (error) {
    console.error('Subtitle generation error:', error);
    throw new Error(`Subtitle generation failed: ${error.message}`);
  }
}

/**
 * Exports subtitles in various formats (SRT, VTT, etc.)
 * @param {Array} subtitles - Subtitle data
 * @param {string} format - Export format ('srt', 'vtt', 'txt')
 * @returns {string} Formatted subtitle content
 */
export function exportSubtitles(subtitles, format = 'srt') {
  if (!subtitles || subtitles?.length === 0) {
    return '';
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    
    if (format === 'srt') {
      return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')},${ms?.toString()?.padStart(3, '0')}`;
    } else if (format === 'vtt') {
      return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}.${ms?.toString()?.padStart(3, '0')}`;
    }
    return seconds?.toString();
  };

  switch (format?.toLowerCase()) {
    case 'srt':
      return subtitles?.map(sub => 
        `${sub?.id}\n${formatTime(sub?.startTime)} --> ${formatTime(sub?.endTime)}\n${sub?.text}\n`
      )?.join('\n');

    case 'vtt':
      return `WEBVTT\n\n${subtitles?.map(sub => 
        `${formatTime(sub?.startTime)} --> ${formatTime(sub?.endTime)}\n${sub?.text}\n`
      )?.join('\n')}`;

    case 'txt':
      return subtitles?.map(sub => sub?.text)?.join('\n');

    default:
      return subtitles?.map(sub => 
        `[${formatTime(sub?.startTime)} - ${formatTime(sub?.endTime)}] ${sub?.text}`
      )?.join('\n');
  }
}

/**
 * Calculates estimated cost for translation
 * @param {string} text - Text to be translated
 * @param {string} model - OpenAI model to use
 * @returns {number} Estimated cost in USD
 */
export function calculateTranslationCost(text, model = 'gpt-4o') {
  if (!text) return 0;
  
  const tokenCount = Math.ceil(text?.length / 4); // Rough token estimation
  
  // OpenAI pricing (as of 2025) - adjust as needed
  const pricing = {
    'gpt-4o': { input: 0.005, output: 0.015 }, // per 1K tokens
    'gpt-4o-mini': { input: 0.00015, output: 0.0006 }
  };
  
  const modelPricing = pricing?.[model] || pricing?.['gpt-4o'];
  const inputCost = (tokenCount / 1000) * modelPricing?.input;
  const outputCost = (tokenCount / 1000) * modelPricing?.output; // Assume similar output length
  
  return inputCost + outputCost;
}

export default {
  translateText,
  translateTextStreaming,
  detectLanguage,
  transcribeAudio,
  translateAudio,
  generateSubtitles,
  exportSubtitles,
  calculateTranslationCost,
  LANGUAGE_MAPPINGS
};