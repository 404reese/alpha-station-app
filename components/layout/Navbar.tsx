"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Quote, Moon, Sun, Menu, ChevronLeft, ChevronRight, User, ChevronDown } from 'lucide-react';
import UserProfileCard from '../auth/UserProfileCard';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleSidebarCollapse?: () => void;
  onToggleSidebarVisibility?: () => void;
  sidebarCollapsed?: boolean;
}

export default function Navbar({ 
  isDark, 
  onToggleTheme, 
  onToggleSidebarCollapse, 
  onToggleSidebarVisibility, 
  sidebarCollapsed = false 
}: NavbarProps) {
  const { user } = useAuth();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileCard && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        // Check if click is not on the profile card itself
        const profileCard = document.querySelector('[data-profile-card]');
        if (profileCard && !profileCard.contains(event.target as Node)) {
          setShowProfileCard(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileCard]);

  const handleLoginClick = () => {
    if (user) {
      setShowProfileCard(!showProfileCard);
    } else {
      window.location.href = '/login';
    }
  };

  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split('@')[0] || 'User';
  };
  const themeClasses = {
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    textSubtle: isDark ? 'text-stone-500' : 'text-stone-500',
    hoverBg: isDark ? 'hover:bg-stone-700' : 'hover:bg-stone-50',
    hoverText: isDark ? 'hover:text-stone-200' : 'hover:text-stone-900',
  };

  return (
    <header className={`flex items-center justify-between px-6 py-4 ${themeClasses.bgSecondary} border-b ${themeClasses.borderPrimary}`}>
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebarVisibility}
          className={`lg:hidden p-1.5 mr-3 ${themeClasses.hoverBg} rounded-md transition-colors`}
          title="Toggle sidebar"
        >
          <Menu className={`w-5 h-5 ${themeClasses.textSubtle}`} />
        </button>

        {/* Desktop collapse button */}
        <button
          onClick={onToggleSidebarCollapse}
          className={`hidden lg:block p-1.5 mr-3 ${themeClasses.hoverBg} rounded-md transition-colors`}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className={`w-5 h-5 ${themeClasses.textSubtle}`} />
          ) : (
            <ChevronLeft className={`w-5 h-5 ${themeClasses.textSubtle}`} />
          )}
        </button>

        <Quote className={`w-4 h-4 mr-2 ${themeClasses.textSubtle}`} />
        <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>We double-tap strangers but leave our friends on read</span>
      </div>
      <div className="flex items-center space-x-6">
        {/* <a href="/contribute" className={`text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
          Contribute
        </a>
        <a href="/about" className={`text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
          About Us
        </a>
        <a href="#" className={`text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>
          FAQs
        </a> */}
        <button onClick={handleLoginClick} ref={buttonRef} className={`px-3 py-1.5 text-sm border ${themeClasses.borderPrimary} rounded-md ${themeClasses.hoverBg} transition-colors`}>
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                {getUserDisplayName().charAt(0).toUpperCase()}
              </div>
              <span className={themeClasses.textPrimary}>Welcome, {getUserDisplayName()}</span>
              <ChevronDown className={`w-4 h-4 ${themeClasses.textMuted}`} />
            </div>
          ) : (
            <span className={themeClasses.textPrimary}>Login</span>
          )}
        </button>
        <button 
          onClick={onToggleTheme}
          className={`p-1.5 ${themeClasses.hoverBg} rounded-md transition-colors`}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className={`w-4 h-4 ${themeClasses.textSubtle}`} />
          ) : (
            <Moon className={`w-4 h-4 ${themeClasses.textSubtle}`} />
          )}
        </button>
      </div>

      {/* User Profile Card */}
      <UserProfileCard
        isOpen={showProfileCard}
        onClose={() => setShowProfileCard(false)}
        isDark={isDark}
      />
    </header>
  );
}