// Common interface for file-based content (Notes, PYQ, Question Bank)
export interface FileData {
  id: number;
  title: string;
  semester: string;
  subject: string;
  department: string;
  upvotes: number;
  views?: number;
  link?: string;
}

// Interface for video content
export interface VideoData {
  id: number;
  title: string;
  semester: string;
  subject: string;
  department: string;
  upvotes: number;
  views?: number;
  duration: string;
  videoId: string;
  topicId: string;
}

// Export type for different content types
export type ContentType = 'Notes' | 'Question Bank' | 'PYQ' | 'Videos';

// Data structure for study content
export interface StudyData {
  notes: FileData[];
  questionBank: FileData[];
  pyq: FileData[];
  videos: VideoData[];
}