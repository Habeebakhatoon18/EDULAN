/**
 * File Processing Service for EduLingua AI
 * Handles file uploads, parsing, and content extraction
 */

/**
 * Supported file types for text translation
 */
export const SUPPORTED_TEXT_FILES = [
  'text/plain',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/msword', // DOC
  'text/rtf',
  'text/html',
  'application/json'
];

/**
 * Supported file types for audio processing
 */
export const SUPPORTED_AUDIO_FILES = [
  'audio/mpeg', // MP3
  'audio/mp4', // M4A
  'audio/wav',
  'audio/webm',
  'audio/ogg',
  'video/mp4', // MP4 video
  'video/webm',
  'video/quicktime', // MOV
  'video/x-msvideo' // AVI
];

/**
 * Maximum file sizes (in bytes)
 */
export const MAX_FILE_SIZES = {
  text: 10 * 1024 * 1024, // 10MB for text files
  audio: 25 * 1024 * 1024, // 25MB for audio files (OpenAI Whisper limit)
  video: 100 * 1024 * 1024 // 100MB for video files
};

/**
 * Validates file type and size
 * @param {File} file - File to validate
 * @param {string} purpose - 'text', 'audio', or 'video'
 * @returns {object} Validation result
 */
export function validateFile(file, purpose = 'text') {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const supportedTypes = {
    text: SUPPORTED_TEXT_FILES,
    audio: SUPPORTED_AUDIO_FILES,
    video: SUPPORTED_AUDIO_FILES // Video files are processed the same way as audio
  };

  const maxSize = MAX_FILE_SIZES?.[purpose];

  // Check file type
  if (!supportedTypes?.[purpose]?.includes(file?.type)) {
    return { 
      valid: false, 
      error: `Unsupported file type: ${file?.type}. Supported types: ${supportedTypes?.[purpose]?.join(', ')}` 
    };
  }

  // Check file size
  if (file?.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / 1024 / 1024);
    const fileSizeMB = Math.round(file?.size / 1024 / 1024);
    return { 
      valid: false, 
      error: `File too large: ${fileSizeMB}MB. Maximum allowed: ${maxSizeMB}MB` 
    };
  }

  return { valid: true, error: null };
}

/**
 * Extracts text content from various file types
 * @param {File} file - File to process
 * @returns {Promise<string>} Extracted text content
 */
export async function extractTextFromFile(file) {
  try {
    const validation = validateFile(file, 'text');
    if (!validation?.valid) {
      throw new Error(validation.error);
    }

    switch (file?.type) {
      case 'text/plain': case'text/html': case'text/rtf': case'application/json':
        return await readTextFile(file);
      
      case 'application/pdf':
        return await extractTextFromPDF(file);
      
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        return await extractTextFromWord(file);
      
      default:
        throw new Error(`Unsupported file type: ${file.type}`);
    }
  } catch (error) {
    console.error('File processing error:', error);
    throw new Error(`Failed to extract text from file: ${error.message}`);
  }
}

/**
 * Reads plain text file
 * @param {File} file - Text file
 * @returns {Promise<string>} File content
 */
async function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Extracts text from PDF file (simplified implementation)
 * Note: This is a basic implementation. For production use, consider using pdf.js or similar library
 * @param {File} file - PDF file
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromPDF(file) {
  try {
    // For now, we'll use a simplified approach
    // In a real implementation, you'd use pdf.js or send to a backend service
    const arrayBuffer = await file?.arrayBuffer();
    
    // This is a placeholder implementation
    // You would typically use a library like pdf.js here
    return "PDF content extraction requires pdf.js library. Please implement PDF parsing or use text files for now.";
  } catch (error) {
    throw new Error(`PDF processing failed: ${error.message}`);
  }
}

/**
 * Extracts text from Word document (simplified implementation)
 * Note: This is a basic implementation. For production use, consider using mammoth.js or similar library
 * @param {File} file - Word document file
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromWord(file) {
  try {
    // For now, we'll use a simplified approach
    // In a real implementation, you'd use mammoth.js or send to a backend service
    const arrayBuffer = await file?.arrayBuffer();
    
    // This is a placeholder implementation
    // You would typically use a library like mammoth.js here
    return "Word document content extraction requires mammoth.js library. Please implement Word parsing or use text files for now.";
  } catch (error) {
    throw new Error(`Word document processing failed: ${error.message}`);
  }
}

/**
 * Creates a downloadable file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body?.appendChild(a);
  a?.click();
  document.body?.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Formats file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
}

/**
 * Gets file extension from filename
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export function getFileExtension(filename) {
  return filename?.split('.')?.pop()?.toLowerCase() || '';
}

/**
 * Processes YouTube URL to extract video info
 * @param {string} url - YouTube URL
 * @returns {object} Video info object
 */
export function processYouTubeURL(url) {
  try {
    const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(videoIdRegex);
    
    if (!match) {
      throw new Error('Invalid YouTube URL');
    }
    
    const videoId = match?.[1];
    return {
      id: videoId,
      url: url,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      title: `YouTube Video - ${videoId}`,
      type: 'youtube'
    };
  } catch (error) {
    throw new Error(`YouTube URL processing failed: ${error.message}`);
  }
}

/**
 * Extracts video duration (placeholder implementation)
 * @param {File} videoFile - Video file
 * @returns {Promise<number>} Duration in seconds
 */
export async function getVideoDuration(videoFile) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      resolve(video.duration);
      URL.revokeObjectURL(video.src);
    };
    
    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
      URL.revokeObjectURL(video.src);
    };
    
    video.src = URL.createObjectURL(videoFile);
  });
}

/**
 * Creates a processing job object
 * @param {File|object} input - File or YouTube info
 * @param {object} options - Processing options
 * @returns {object} Processing job
 */
export function createProcessingJob(input, options = {}) {
  const jobId = `job_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
  
  return {
    id: jobId,
    title: input?.name || input?.title || 'Processing Job',
    type: input?.type || 'file',
    status: 'queued',
    progress: 0,
    startTime: new Date()?.toISOString(),
    estimatedCompletion: null,
    sourceLanguage: options?.sourceLanguage || 'auto',
    targetLanguages: options?.targetLanguages || [],
    fileSize: input?.size ? formatFileSize(input?.size) : null,
    duration: null,
    error: null,
    result: null
  };
}

export default {
  validateFile,
  extractTextFromFile,
  downloadFile,
  formatFileSize,
  getFileExtension,
  processYouTubeURL,
  getVideoDuration,
  createProcessingJob,
  SUPPORTED_TEXT_FILES,
  SUPPORTED_AUDIO_FILES,
  MAX_FILE_SIZES
};