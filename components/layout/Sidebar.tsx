"use client";
import React from 'react';
import { 
  BarChart3, 
  FileText, 
  MessageCircle, 
  Calculator, 
  Code, 
  Users, 
  ArrowUpRight, 
  Smartphone,
  Sun,
  Cloud,
  Moon,
  Star,
  Sunrise,
  SunMoon,
  X,
  HandHeart
} from 'lucide-react';

interface SidebarProps {
  isDark: boolean;
  activePage?: string;
  collapsed?: boolean;
  onClose?: () => void;
}

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export default function Sidebar({ isDark, activePage = "Study Resources", collapsed = false, onClose }: SidebarProps) {
  const themeClasses = {
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    borderSecondary: isDark ? 'border-stone-600' : 'border-stone-100',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    textSubtle: isDark ? 'text-stone-500' : 'text-stone-500',
    hoverBg: isDark ? 'hover:bg-stone-700' : 'hover:bg-stone-50',
    hoverText: isDark ? 'hover:text-stone-200' : 'hover:text-stone-900',
  };

  const navigationItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
      current: activePage === 'Dashboard'
    },
    {
      name: 'Study Resources',
      href: '/study',
      icon: FileText,
      current: activePage === 'Study Resources'
    },
    {
      name: 'Chat with PDFs',
      href: '/coming-soon',
      icon: MessageCircle,
      current: activePage === 'Chat with PDFs'
    },
    {
      name: 'AI Calculator',
      href: '/calculator',
      icon: Calculator,
      current: activePage === 'AI Calculator'
    },
    {
      name: 'Class Coder',
      href: '/coder',
      icon: Code,
      current: activePage === 'Class Coder'
    },
    {
      name: 'Join Community',
      href: '/community',
      icon: Users,
      current: activePage === 'Join Community'
    }
  ];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} h-screen ${themeClasses.bgSecondary} border-r ${themeClasses.borderPrimary} flex flex-col transition-all duration-300`}>
      {/* Mobile Close Button */}
      {onClose && (
        <div className="lg:hidden p-4 flex justify-end">
          <button
            onClick={onClose}
            className={`p-2 rounded-md ${themeClasses.hoverBg}`}
          >
            <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
          </button>
        </div>
      )}

      {/* Logo */}
      <div className={`${collapsed ? 'p-3' : 'p-6'} border-b ${themeClasses.borderSecondary}`}>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className={`w-4 h-4 rounded-sm ${themeClasses.bgSecondary}`}></div>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>OfCampus</h1>
            </div>
          )}
        </div>
      </div>

      {/* Greeting */}
      {!collapsed && (
        <div className={`px-6 py-4 border-b ${themeClasses.borderSecondary}`}>
          <h3 className={`text-sm font-medium ${themeClasses.textMuted} mb-1 flex items-center`}>
            {(() => {
              const hour = new Date().getHours();
              if (hour >= 20 || hour < 4) {
                return (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    It's night
                  </>
                );
              } else if (hour >= 4 && hour < 12) {
                return (
                  <>
                    <Sunrise className="w-4 h-4 mr-2" />
                    Good Morning
                  </>
                );
              } else if (hour >= 12 && hour < 17) {
                return (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Good Afternoon
                  </>
                );
              } else {
                return (
                  <>
                    <SunMoon className="w-4 h-4 mr-2" />
                    Good evening
                  </>
                );
              }
            })()}
          </h3>
          <div className="w-8 h-0.5 bg-orange-500 rounded-full"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? `${themeClasses.bgTertiary} ${themeClasses.textPrimary}`
                    : `${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText}`
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={`w-4 h-4 ${collapsed ? '' : 'mr-3'} ${item.current ? themeClasses.textMuted : themeClasses.textSubtle}`} />
                {!collapsed && item.name}
              </a>
            );
          })}
        </div>
        
        <div className={`mt-6 pt-6 border-t ${themeClasses.borderPrimary}`}>
          <a 
            href="/contribute" 
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors`}
            title={collapsed ? "Contribute" : undefined}
          >
            <HandHeart className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && "Contribute"}
          </a>
          <a 
            href="/coming-soon" 
            className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors mt-1`}
            title={collapsed ? "Get App" : undefined}
          >
            <Smartphone className={`w-4 h-4 ${collapsed ? '' : 'mr-3'} ${themeClasses.textSubtle}`} />
            {!collapsed && "Get App"}
          </a>
        </div>
      </nav>
    </div>
  );
}