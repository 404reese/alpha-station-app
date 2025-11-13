import { VideoData, FileData } from './types';

// Group videos by subject for easier rendering
export function groupVideosBySubject(videos: VideoData[]): Record<string, VideoData[]> {
  return videos.reduce((acc, video) => {
    if (!acc[video.subject]) {
      acc[video.subject] = [];
    }
    acc[video.subject].push(video);
    return acc;
  }, {} as Record<string, VideoData[]>);
}

// Filter data by department (for future use)
export function filterByDepartment(data: (FileData | VideoData)[], department: string): (FileData | VideoData)[] {
  if (department === 'Department Name' || department === 'All') {
    return data;
  }
  return data.filter(item => item.department === department);
}

// Filter data by semester (for future use)
export function filterBySemester(data: (FileData | VideoData)[], semester: string): (FileData | VideoData)[] {
  if (semester === 'Semester' || semester === 'All') {
    return data;
  }
  return data.filter(item => item.semester === semester);
}

// Filter data by subject (for future use)
export function filterBySubject(data: (FileData | VideoData)[], subject: string): (FileData | VideoData)[] {
  if (subject === 'Subjects' || subject === 'All') {
    return data;
  }
  return data.filter(item => item.subject === subject);
}

// Search function for future use
export function searchData(data: (FileData | VideoData)[], query: string): (FileData | VideoData)[] {
  if (!query.trim()) {
    return data;
  }
  
  const lowercaseQuery = query.toLowerCase();
  return data.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.subject.toLowerCase().includes(lowercaseQuery) ||
    item.semester.toLowerCase().includes(lowercaseQuery)
  );
}