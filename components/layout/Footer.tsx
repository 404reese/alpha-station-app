"use client";
import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const themeClasses = {
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    textSubtle: isDark ? 'text-stone-500' : 'text-stone-500',
    hoverText: isDark ? 'hover:text-stone-200' : 'hover:text-stone-900',
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${themeClasses.bgSecondary} border-t ${themeClasses.borderPrimary} mt-auto`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <div className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-lg mr-2 sm:mr-3 flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm"></div>
              </div>
              <h2 className={`text-base sm:text-lg font-semibold ${themeClasses.textPrimary}`}>Class Connect</h2>
            </div>
            <p className={`text-xs sm:text-sm ${themeClasses.textMuted} leading-relaxed`}>
              Empowering students with collaborative learning resources, study materials, and academic tools.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className={`${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className={`${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className={`${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className={`${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className={`text-xs sm:text-sm font-semibold ${themeClasses.textPrimary} uppercase tracking-wider`}>
              Tools
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              <a href="#" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                AI Calculator
              </a>
              <a href="#" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Class Coder
              </a>
              <a href="#" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                PDF Chat
              </a>
              <a href="#" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Mobile App
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className={`text-xs sm:text-sm font-semibold ${themeClasses.textPrimary} uppercase tracking-wider`}>
              Support
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              <a href="#" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Help Center
              </a>
              <a href="#" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Contact Us
              </a>
              <a href="/about" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                About Us
              </a>
              <a href="/contribute" className={`block text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Contribute
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 border-t ${themeClasses.borderPrimary} flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0`}>
          <div className={`text-xs sm:text-sm ${themeClasses.textMuted} text-center md:text-left`}>
            © {currentYear} Class Connect. All rights reserved.
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a href="#" className={`text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-xs sm:text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
                Terms of Service
              </a>
            </div>
            <div className={`flex items-center text-xs sm:text-sm ${themeClasses.textMuted}`}>
              Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-red-500" /> for students
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}