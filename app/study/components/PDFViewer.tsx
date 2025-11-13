"use client";
import React from 'react';
import { ChevronLeft, Download, Eye, ThumbsUp } from 'lucide-react';
import { useTheme } from '../../../components/providers/ThemeProvider';
import { useRouter } from 'next/navigation';

interface PDFViewerProps {
  title: string;
  semester: string;
  subject: string;
  department: string;
  upvotes: number;
  driveLink: string;
  views?: number;
}

interface ThemeClasses {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgQuaternary: string;
  borderPrimary: string;
  textPrimary: string;
  textSecondary: string;
  hoverBorder: string;
}

export default function PDFViewer({ 
  title, 
  semester, 
  subject, 
  department, 
  upvotes, 
  driveLink,
  views = 0
}: PDFViewerProps) {
  const { isDark } = useTheme();
  const router = useRouter();

  const themeClasses: ThemeClasses = {
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    bgQuaternary: isDark ? 'bg-stone-600' : 'bg-stone-50',
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-600',
    hoverBorder: isDark ? 'hover:border-stone-600' : 'hover:border-stone-300'
  };

  // Transform Google Drive link to embeddable format
  const getEmbedUrl = (driveLink: string): string => {
    try {
      // Extract file ID from Google Drive link
      const fileIdMatch = driveLink.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        // Add parameters to hide toolbar, download options, and other popups
        return `https://drive.google.com/file/d/${fileId}/preview?embedded=true&toolbar=0&navpanes=0&scrollbar=0`;
      }
      return driveLink;
    } catch (error) {
      console.error('Error parsing Google Drive link:', error);
      return driveLink;
    }
  };



  // Navigate back to study page
  const goBack = () => {
    router.back();
  };

  // Handle download (you can implement your own download logic here)
  const handleDownload = () => {
    // For now, we'll show an alert. In a real app, you might:
    // 1. Track the download in analytics
    // 2. Require user login
    // 3. Implement your own file serving
    alert('Download feature coming soon! Stay tuned for offline access.');
  };

  // Handle upvote
  const handleUpvote = () => {
    // This would connect to your backend to update upvotes
    alert('Thanks for your upvote! Feature coming soon.');
  };

  const embedUrl = getEmbedUrl(driveLink);

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      {/* Header with back button */}
      <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.borderPrimary} p-4`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={goBack}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${themeClasses.bgTertiary} ${themeClasses.textPrimary} hover:${themeClasses.hoverBorder} transition-colors`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Study</span>
          </button>
          <h1 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>PDF Viewer</h1>
        </div>
      </div>

      {/* Content Card - Same as FileCard but with additional info */}
      <div className="p-6">
        <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-3`}>{title}</h2>
              <div className="flex items-center space-x-4 text-sm mb-2">
                <span className="px-3 py-1 bg-orange-200/40 rounded-full">{semester}</span>
                <span className="px-3 py-1 bg-orange-200/40 rounded-full">{subject}</span>
                <span className="px-3 py-1 bg-orange-200/40 rounded-full">{department}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className={`flex items-center space-x-1 ${themeClasses.textSecondary}`}>
                  <Eye className="w-4 h-4" />
                  <span>{views} views</span>
                </div>
                <div className={`${themeClasses.textSecondary}`}>
                  <span>•</span>
                </div>
                <div className={`${themeClasses.textSecondary}`}>
                  <span>Available for study</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex flex-col items-center justify-center w-16 h-16 ${themeClasses.bgTertiary} rounded-lg`}>
                <span className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{upvotes}</span>
                <span className={`text-xs ${themeClasses.textSecondary}`}>upvotes</span>
              </div>
              <button
                onClick={handleUpvote}
                className={`flex items-center space-x-2 px-4 py-2 ${themeClasses.bgTertiary} ${themeClasses.textPrimary} rounded-lg hover:bg-orange-500 hover:text-white transition-colors`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Upvote</span>
              </button>
              <button
                onClick={handleDownload}
                className={`flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors`}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* PDF Embed Container with Click Prevention Overlay */}
        <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg overflow-hidden`}>
          <div className="aspect-[3/4] w-full relative">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              title={title}
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              loading="lazy"
              scrolling="no"
            />
            {/* Overlay to prevent clicking on Google Drive interface */}
            <div 
              className="absolute top-0 right-0 w-20 h-20 bg-transparent cursor-default"
              style={{ 
                pointerEvents: 'auto',
                zIndex: 10
              }}
              onClick={(e) => e.preventDefault()}
            >
              {/* ClassConnect logo overlay */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <img 
                    src="/ofcampus-square.png" 
                    alt="ClassConnect"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}