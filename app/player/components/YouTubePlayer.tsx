import React from 'react';
import { Clock, BookOpen, ExternalLink } from 'lucide-react';
import type { Topic } from '../page';

interface YouTubePlayerProps {
  topic: Topic;
  isDark: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ topic, isDark }) => {
  const themeClasses = {
    // Background colors
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    
    // Text colors
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    
    // Border colors
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
  };

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${topic.videoId}?autoplay=1&rel=0&modestbranding=1`;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${topic.videoId}`;

  return (
    <div className={`flex-1 ${themeClasses.bgPrimary}`}>
      {/* Video Container */}
      <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.borderPrimary}`}>
        <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            src={youtubeEmbedUrl}
            title={topic.title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Video Information */}
      <div className={`${themeClasses.bgSecondary} px-6 py-4 border-b ${themeClasses.borderPrimary}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-2 leading-tight`}>
              {topic.title}
            </h1>
            
            {topic.description && (
              <p className={`${themeClasses.textSecondary} text-sm mb-3 leading-relaxed`}>
                {topic.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-sm">
              {topic.duration && (
                <div className={`flex items-center space-x-1 ${themeClasses.textMuted}`}>
                  <Clock className="w-4 h-4" />
                  <span>{topic.duration}</span>
                </div>
              )}
              
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-1 ${themeClasses.textMuted} hover:text-orange-500 transition-colors`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content Area */}
      <div className={`${themeClasses.bgPrimary} p-6`}>
        <div className="max-w-4xl">
          {/* Study Notes Section - Placeholder for future database integration */}
          <div className={`${themeClasses.bgSecondary} rounded-lg border ${themeClasses.borderPrimary} p-4 mb-6`}>
            <div className="flex items-center space-x-2 mb-3">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <h3 className={`font-medium ${themeClasses.textPrimary}`}>Study Notes</h3>
            </div>
            <div className={`${themeClasses.textMuted} text-sm`}>
              <p className="mb-3">
                Key points and notes for this topic will be available here once connected to the database.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Interactive notes and highlights</li>
                <li>Downloadable study materials</li>
                <li>Practice questions related to this topic</li>
                <li>Additional resources and references</li>
              </ul>
            </div>
          </div>

          {/* Discussion Section - Placeholder for future features */}
          <div className={`${themeClasses.bgSecondary} rounded-lg border ${themeClasses.borderPrimary} p-4`}>
            <h3 className={`font-medium ${themeClasses.textPrimary} mb-3`}>Discussion & Q&A</h3>
            <div className={`${themeClasses.textMuted} text-sm text-center py-8`}>
              <p>Discussion forum and Q&A section will be available here.</p>
              <p className="mt-2">Ask questions, share insights, and collaborate with fellow students.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;