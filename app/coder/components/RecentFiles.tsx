"use client";

import React from 'react';
import { FileText, Clock, Code, ExternalLink } from 'lucide-react';

interface RecentFile {
  id: string;
  name: string;
  language: string;
  lastModified: string;
  size: string;
  type: 'practical' | 'personal';
}

interface RecentFilesProps {
  isDark: boolean;
}

// Mock data for recent files
const mockRecentFiles: RecentFile[] = [
  {
    id: '1',
    name: 'binary_search.java',
    language: 'Java',
    lastModified: '2 hours ago',
    size: '2.3 KB',
    type: 'practical'
  },
  {
    id: '2',
    name: 'stack_implementation.py',
    language: 'Python',
    lastModified: '5 hours ago',
    size: '1.8 KB',
    type: 'practical'
  },
  {
    id: '3',
    name: 'personal_project.js',
    language: 'JavaScript',
    lastModified: '1 day ago',
    size: '4.2 KB',
    type: 'personal'
  },
  {
    id: '4',
    name: 'linked_list.cpp',
    language: 'C++',
    lastModified: '2 days ago',
    size: '3.1 KB',
    type: 'practical'
  },
  {
    id: '5',
    name: 'database_queries.sql',
    language: 'SQL',
    lastModified: '3 days ago',
    size: '1.5 KB',
    type: 'practical'
  }
];

export const RecentFiles: React.FC<RecentFilesProps> = ({ isDark }) => {
  const themeClasses = {
    bgCard: isDark ? 'bg-stone-800' : 'bg-white',
    bgHover: isDark ? 'hover:bg-stone-750' : 'hover:bg-stone-50',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    border: isDark ? 'border-stone-700' : 'border-stone-200',
    borderHover: isDark ? 'hover:border-stone-600' : 'hover:border-stone-300',
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      Java: 'bg-orange-100 text-orange-800 border-orange-200',
      Python: 'bg-blue-100 text-blue-800 border-blue-200',
      JavaScript: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'C++': 'bg-purple-100 text-purple-800 border-purple-200',
      SQL: 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLanguageColorDark = (language: string) => {
    const colors: Record<string, string> = {
      Java: 'bg-orange-900 text-orange-200 border-orange-700',
      Python: 'bg-blue-900 text-blue-200 border-blue-700',
      JavaScript: 'bg-yellow-900 text-yellow-200 border-yellow-700',
      'C++': 'bg-purple-900 text-purple-200 border-purple-700',
      SQL: 'bg-green-900 text-green-200 border-green-700',
    };
    return colors[language] || 'bg-gray-900 text-gray-200 border-gray-700';
  };

  const getFileIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'java':
      case 'python':
      case 'javascript':
      case 'c++':
        return <Code className="w-4 h-4" />;
      case 'sql':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleFileClick = (file: RecentFile) => {
    // This would typically open the file in the editor
    console.log('Opening file:', file.name);
  };

  return (
    <div className={`${themeClasses.bgCard} border ${themeClasses.border} rounded-lg p-6 h-fit`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
          Recent Files
        </h2>
        <button
          className={`text-sm ${themeClasses.textMuted} hover:text-orange-500 transition-colors`}
          onClick={() => console.log('View all files')}
        >
          View all
        </button>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {mockRecentFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => handleFileClick(file)}
            className={`
              group p-3 rounded-lg border ${themeClasses.border}
              ${themeClasses.bgHover} ${themeClasses.borderHover}
              cursor-pointer transition-all duration-200
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                {/* File Icon */}
                <div className={`${themeClasses.textMuted} mt-0.5`}>
                  {getFileIcon(file.language)}
                </div>

                {/* File Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`text-sm font-medium ${themeClasses.textPrimary} truncate`}>
                      {file.name}
                    </h3>
                    <span
                      className={`
                        px-2 py-0.5 rounded text-xs font-medium border
                        ${isDark ? getLanguageColorDark(file.language) : getLanguageColor(file.language)}
                      `}
                    >
                      {file.language}
                    </span>
                  </div>

                  <div className={`flex items-center space-x-4 text-xs ${themeClasses.textMuted}`}>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{file.lastModified}</span>
                    </div>
                    <span>{file.size}</span>
                    {file.type === 'practical' && (
                      <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 px-1 py-0.5 rounded text-xs">
                        Practical
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Open Icon */}
              <ExternalLink className={`w-3 h-3 ${themeClasses.textMuted} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockRecentFiles.length === 0 && (
        <div className="text-center py-8">
          <FileText className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-3`} />
          <p className={`${themeClasses.textMuted} text-sm`}>
            No recent files found
          </p>
          <p className={`${themeClasses.textMuted} text-xs mt-1`}>
            Start coding to see your recent files here
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-opacity-20">
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`
              px-3 py-2 text-sm rounded-lg border ${themeClasses.border}
              ${themeClasses.textSecondary} hover:bg-orange-50 hover:text-orange-600
              dark:hover:bg-orange-900/20 dark:hover:text-orange-400
              transition-colors
            `}
            onClick={() => console.log('New file')}
          >
            New File
          </button>
          <button
            className={`
              px-3 py-2 text-sm rounded-lg border ${themeClasses.border}
              ${themeClasses.textSecondary} hover:bg-orange-50 hover:text-orange-600
              dark:hover:bg-orange-900/20 dark:hover:text-orange-400
              transition-colors
            `}
            onClick={() => console.log('Upload file')}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentFiles;