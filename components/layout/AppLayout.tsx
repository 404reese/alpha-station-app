"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTheme } from '../providers/ThemeProvider';

interface AppLayoutProps {
  children: React.ReactNode;
  activePage?: string;
  showSidebar?: boolean;
  showFooter?: boolean;
  showNavbar?: boolean;
}

export default function AppLayout({ 
  children, 
  activePage = "Dashboard", 
  showSidebar = true, 
  showFooter = true,
  showNavbar = true
}: AppLayoutProps) {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // For mobile

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleSidebarVisibility = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const themeClasses = {
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
  };

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary} ${themeClasses.textPrimary} flex font-sans`}>
      {showSidebar && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-0 h-screen">
            <Sidebar 
              isDark={isDark} 
              activePage={activePage} 
              collapsed={sidebarCollapsed}
            />
          </div>
          
          {/* Mobile Sidebar Overlay */}
          {sidebarVisible && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50" 
                onClick={toggleSidebarVisibility}
              />
              
              {/* Sidebar */}
              <div className="relative w-64">
                <Sidebar 
                  isDark={isDark} 
                  activePage={activePage} 
                  collapsed={false}
                  onClose={toggleSidebarVisibility}
                />
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        {showNavbar && (
          <Navbar 
            isDark={isDark} 
            onToggleTheme={toggleTheme}
            onToggleSidebarCollapse={toggleSidebarCollapse}
            onToggleSidebarVisibility={toggleSidebarVisibility}
            sidebarCollapsed={sidebarCollapsed}
          />
        )}
        
        <main className="flex-1">
          {children}
        </main>
        
        {showFooter && (
          <Footer isDark={isDark} />
        )}
      </div>
    </div>
  );
}