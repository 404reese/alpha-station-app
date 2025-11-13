"use client";

import React from 'react';
import { Clock, Rocket } from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { useTheme } from '../../components/providers/ThemeProvider';

export default function ComingSoon() {
  const { isDark } = useTheme();

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
    borderSecondary: isDark ? 'border-stone-600' : 'border-stone-100',
  };

  return (
    <AppLayout activePage="Coming Soon" showFooter={true}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-orange-500">Coming Soon</h1>
              <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
                Something amazing is on the way
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${themeClasses.bgSecondary} rounded-lg border ${themeClasses.borderPrimary} p-12 text-center shadow-lg`}>
            <div className="max-w-2xl mx-auto">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                <Clock className="w-10 h-10 text-white" />
              </div>

              {/* Coming Soon Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-200 bg-orange-900/20 rounded-full border border-orange-500/20">
                  <Clock className="w-4 h-4 mr-2" />
                  Coming Soon
                </span>
              </div>

              {/* Heading */}
              <h2 className={`text-4xl md:text-5xl font-light ${themeClasses.textPrimary} mb-6 tracking-tight`}>
                Stay
                <br />
                <span className="font-medium bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Tuned
                </span>
              </h2>

              {/* Description */}
              <p className={`text-lg ${themeClasses.textSecondary} mb-8 leading-relaxed`}>
                We're working hard to bring you something incredible. This feature will be available soon!
              </p>

              {/* Progress indicator */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className={`${themeClasses.textMuted} text-sm`}>Development Progress</div>
                </div>
                <div className={`w-full ${themeClasses.bgTertiary} rounded-full h-2`}>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-3/4 relative">
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className={`${themeClasses.textMuted} text-sm mt-2`}>75% Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}