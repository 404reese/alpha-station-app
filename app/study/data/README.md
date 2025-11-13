# Study Data Structure

This directory contains the data structure for the ClassConnect study resources feature.

## Files

- `types.ts` - TypeScript interfaces for all data structures
- `notes.json` - Study notes data
- `question-bank.json` - Question bank data  
- `pyq.json` - Previous Year Questions data
- `videos.json` - Video lectures/topics data
- `utils.ts` - Utility functions for data manipulation
- `index.ts` - Main export file

## Data Structure

### FileData Interface
Used for Notes, Question Bank, and PYQ:
```typescript
interface FileData {
  id: number;
  title: string;
  semester: string;
  subject: string;
  department: string;
  upvotes: number;
  views?: number;
  link?: string; // Google Drive link for PDF files
}
```

### VideoData Interface
Used for video content:
```typescript
interface VideoData {
  id: number;
  title: string;
  semester: string;
  subject: string;
  department: string;
  upvotes: number;
  views?: number;
  duration: string;
  videoId: string; // Used for navigation to player
  topicId: string; // Used for navigation to player
}
```

## Usage

```typescript
import { notesData, questionBankData, pyqData, videosData } from './data';
import { FileData, VideoData } from './data/types';
```

## Adding New Data

1. Add entries to the appropriate JSON file
2. Ensure all required fields are included
3. Use consistent format for semester names (e.g., "Semester 3")
4. Use consistent format for department names (e.g., "Computer Science")

## PDF Links

For files with PDF links, use the Google Drive sharing link format:
`https://drive.google.com/file/d/[FILE_ID]/view?usp=drive_link`

The PDF viewer component will automatically convert these to embeddable format.