import { StudyData } from './types';
import notesData from './notes.json';
import questionBankData from './question-bank.json';
import pyqData from './pyq.json';
import videosData from './videos.json';

// Export all study data
export const studyData: StudyData = {
  notes: notesData,
  questionBank: questionBankData,
  pyq: pyqData,
  videos: videosData
};

// Export individual data arrays
export { default as notesData } from './notes.json';
export { default as questionBankData } from './question-bank.json';
export { default as pyqData } from './pyq.json';
export { default as videosData } from './videos.json';

// Export types
export * from './types';

// Export utilities
export * from './utils';