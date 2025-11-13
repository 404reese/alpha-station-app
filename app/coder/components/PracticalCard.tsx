"use client";

import React from 'react';
import { Clock, BookOpen, ExternalLink } from 'lucide-react';
import { Practical } from '../data/practicals';

interface PracticalCardProps {
  practical: Practical;
  onStartPractical: (practical: Practical) => void;
  isDark: boolean;
}

export const PracticalCard: React.FC<PracticalCardProps> = ({
  practical,
  onStartPractical,
  isDark
}) => {
  const themeClasses = {
    bgCard: isDark ? 'bg-stone-800' : 'bg-white',
    bgHover: isDark ? 'hover:bg-stone-750' : 'hover:bg-stone-50',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    border: isDark ? 'border-stone-700' : 'border-stone-200',
    borderHover: isDark ? 'hover:border-stone-600' : 'hover:border-stone-300',
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColorDark = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-900 text-green-200 border-green-700';
      case 'Intermediate':
        return 'bg-yellow-900 text-yellow-200 border-yellow-700';
      case 'Advanced':
        return 'bg-red-900 text-red-200 border-red-700';
      default:
        return 'bg-gray-900 text-gray-200 border-gray-700';
    }
  };

  return (
    <div
      className={`
        ${themeClasses.bgCard} ${themeClasses.bgHover}
        border ${themeClasses.border} ${themeClasses.borderHover}
        rounded-lg p-6 transition-all duration-200 cursor-pointer
        shadow-sm hover:shadow-md
      `}
      onClick={() => onStartPractical(practical)}
    >
      {/* Header with practical number and difficulty */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            {practical.practicalNumber}
          </div>
          <span
            className={`
              px-2 py-1 rounded-full text-xs font-medium border
              ${isDark ? getDifficultyColorDark(practical.difficulty) : getDifficultyColor(practical.difficulty)}
            `}
          >
            {practical.difficulty}
          </span>
        </div>
        <ExternalLink className={`w-4 h-4 ${themeClasses.textMuted}`} />
      </div>

      {/* Title */}
      <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 line-clamp-2`}>
        {practical.title}
      </h3>

      {/* Description */}
      <p className={`${themeClasses.textSecondary} text-sm leading-relaxed mb-4 line-clamp-3`}>
        {practical.description}
      </p>

      {/* Footer with time and book icon */}
      <div className="flex items-center justify-between pt-3 border-t border-opacity-20">
        <div className={`flex items-center space-x-1 ${themeClasses.textMuted}`}>
          <Clock className="w-4 h-4" />
          <span className="text-xs">{practical.estimatedTime}</span>
        </div>
        <div className={`flex items-center space-x-1 ${themeClasses.textMuted}`}>
          <BookOpen className="w-4 h-4" />
          <span className="text-xs">Practical</span>
        </div>
      </div>
    </div>
  );
};

export default PracticalCard;