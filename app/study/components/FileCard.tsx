import React from 'react';
import { ChevronRight } from 'lucide-react';

interface FileCardProps {
  title: string;
  semester: string;
  subject: string;
  department: string;
  upvotes: number;
  onClick?: () => void;
  isDark?: boolean;
}

interface ThemeClasses {
  bgTertiary: string;
  bgQuaternary: string;
  borderPrimary: string;
  textPrimary: string;
  hoverBorder: string;
}

export default function FileCard({ 
  title, 
  semester, 
  subject, 
  department, 
  upvotes, 
  onClick,
  isDark = true 
}: FileCardProps) {
  const themeClasses: ThemeClasses = {
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    bgQuaternary: isDark ? 'bg-stone-600' : 'bg-stone-50',
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    hoverBorder: isDark ? 'hover:border-stone-600' : 'hover:border-stone-300'
  };

  return (
    <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 ${themeClasses.hoverBorder} transition-colors cursor-pointer`} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-1`}>{title}</h3>
            <div className="flex items-center space-x-4 text-xs">
              <span className="px-2 py-1 bg-orange-200/40 rounded">{semester}</span>
              <span className="px-2 py-1 bg-orange-200/40 rounded">{subject}</span>
              <span className="px-2 py-1 bg-orange-200/40 rounded">{department}</span>
            </div>
          </div>
        </div>
        <button className={`flex flex-col items-center justify-center w-12 h-12 ${themeClasses.bgQuaternary} rounded-lg hover:bg-orange-500 hover:text-white transition-colors group`}>
          <ChevronRight className="w-4 h-4 transform -rotate-90 group-hover:scale-110 transition-transform" />
          <span className="text-xs mt-1">{upvotes}</span>
        </button>
      </div>
    </div>
  );
}
