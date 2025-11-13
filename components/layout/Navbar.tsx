"use client";
import React, { useState, useEffect } from 'react';
import { Quote, Moon, Sun, Menu, ChevronLeft, ChevronRight, User } from 'lucide-react';
import UserProfileCard from '../auth/UserProfileCard';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleSidebarCollapse?: () => void;
  onToggleSidebarVisibility?: () => void;
  sidebarCollapsed?: boolean;
}

interface User {
  name: string;
  email: string;
  image: string;
  joinedDate: string;
}

export default function Navbar({ 
  isDark, 
  onToggleTheme, 
  onToggleSidebarCollapse, 
  onToggleSidebarVisibility, 
  sidebarCollapsed = false 
}: NavbarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [showProfileCard, setShowProfileCard] = useState(false);

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('userChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userChanged', handleStorageChange);
    };
  }, []);

  const handleLoginClick = () => {
    if (user) {
      setShowProfileCard(true);
    } else {
      window.location.href = '/auth';
    }
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
        <button onClick={handleLoginClick} className={`px-3 py-1.5 text-sm border ${themeClasses.borderPrimary} rounded-md ${themeClasses.hoverBg} transition-colors`}>
          {user ? (
            <div className="flex items-center space-x-2">
              <img
                src={user.image}
                alt={user.name}
                className="w-5 h-5 rounded-full"
              />
              <span>{user.name.split(' ')[0]}</span>
            </div>
          ) : (
            'Login'
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