"use client";
import React, { useState } from 'react';
import { 
  Search,
  ChevronDown,
  Play,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { useTheme } from '../../components/providers/ThemeProvider';
import FileCard from './components/FileCard';
import { useRouter } from 'next/navigation';
import { notesData, questionBankData, pyqData, videosData, FileData, VideoData } from './data';

export default function ClassConnectDashboard() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Notes');
  const [selectedDepartment, setSelectedDepartment] = useState('Department Name');
  const [selectedSemester, setSelectedSemester] = useState('Semester');
  const [selectedSubject, setSelectedSubject] = useState('Subjects');

  // Handle video topic click to navigate to player page
  const handleVideoTopicClick = (subjectId: string, topicId: string) => {
    router.push(`/player?subject=${subjectId}&topic=${topicId}`);
  };

  const handleFileCardClick = (fileId: number, tabType: string) => {
    console.log(`Clicked file ${fileId} in ${tabType} tab`);
    
    // Get the current tab data to find the clicked file
    const currentData = getCurrentTabData();
    const clickedFile = currentData.find(file => file.id === fileId);
    
    if (clickedFile && clickedFile.link) {
      // Navigate to PDF viewer if file has a link
      const queryParams = new URLSearchParams({
        title: clickedFile.title,
        semester: clickedFile.semester,
        subject: clickedFile.subject,
        department: clickedFile.department,
        upvotes: clickedFile.upvotes.toString(),
        views: (clickedFile.views || 0).toString(),
        link: clickedFile.link
      });
      
      router.push(`/study/pdf-viewer?${queryParams.toString()}`);
    } else {
      console.log('No link available for this file');
      // Could show a toast notification here later
    }
  };

  const getCurrentTabData = (): FileData[] => {
    switch (activeTab) {
      case 'Notes':
        return notesData;
      case 'Question Bank':
        return questionBankData;
      case 'PYQ':
        return pyqData;
      default:
        return [];
    }
  };

  const themeClasses = {
    // Background colors - always dark
    bgPrimary: 'bg-stone-900',
    bgSecondary: 'bg-stone-800',
    bgTertiary: 'bg-stone-700',
    bgQuaternary: 'bg-stone-600',
    
    // Text colors - always dark theme
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-300',
    textMuted: 'text-stone-400',
    textSubtle: 'text-stone-500',
    
    // Border colors - always dark theme
    borderPrimary: 'border-stone-700',
    borderSecondary: 'border-stone-600',
    borderHover: 'border-stone-600',
    
    // Hover states - always dark theme
    hoverBg: 'hover:bg-stone-700',
    hoverBgSecondary: 'hover:bg-stone-600',
    hoverText: 'hover:text-stone-200',
    hoverBorder: 'hover:border-stone-600'
  };

  const tabs = ['Notes', 'Videos', 'Question Bank', 'PYQ'];

  return (
    <AppLayout activePage="Study Resources" showFooter={false}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-orange-500 mb-8">Study Resources</h1>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted}`} />
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2 text-sm font-medium ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.textPrimary}`}
              />
            </div>

            {/* Department Dropdown */}
            <div className="relative">
              <select 
                value={selectedDepartment} 
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`w-full px-4 py-2 text-sm font-medium ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${themeClasses.textPrimary}`}
              >
                <option value="Department Name">Department Name</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
              <ChevronDown className={`w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} pointer-events-none`} />
            </div>

            {/* Semester Dropdown */}
            <div className="relative">
              <select 
                value={selectedSemester} 
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={`w-full px-4 py-2 text-sm font-medium ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${themeClasses.textPrimary}`}
              >
                <option value="Semester">Semester</option>
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
              </select>
              <ChevronDown className={`w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} pointer-events-none`} />
            </div>

            {/* Subjects Dropdown */}
            <div className="relative">
              <select 
                value={selectedSubject} 
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full px-4 py-2 text-sm font-medium ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${themeClasses.textPrimary}`}
              >
                <option value="Subjects">Subjects</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Algorithms">Algorithms</option>
                <option value="Database Systems">Database Systems</option>
                <option value="Operating Systems">Operating Systems</option>
              </select>
              <ChevronDown className={`w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} pointer-events-none`} />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`flex space-x-0 mb-6 ${themeClasses.bgSecondary} rounded-lg p-1 border ${themeClasses.borderPrimary}`}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const getTabIcon = (tabName: string) => {
                switch (tabName) {
                  case 'Notes': return <BookOpen className="w-4 h-4 mr-2" />;
                  case 'Videos': return <Play className="w-4 h-4 mr-2" />;
                  case 'Question Bank': return <HelpCircle className="w-4 h-4 mr-2" />;
                  case 'PYQ': return <BookOpen className="w-4 h-4 mr-2" />;
                  default: return null;
                }
              };
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-colors font-semibold text-sm ${
                    isActive 
                      ? 'bg-orange-500 text-white shadow-sm' 
                      : `${themeClasses.textSecondary} ${themeClasses.hoverBg}`
                  }`}
                >
                  {getTabIcon(tab)}
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'Videos' ? (
              // Videos Layout
              <div className="space-y-8">
                {/* Operating Systems */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">Operating Systems</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Module 1 */}
                    <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                      <h4 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Module 1: Fundamentals</h4>
                      <div className="space-y-2">
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-1-1')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 1: Introduction to OS</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-1-2')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 2: Process Management</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-1-3')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 3: Memory Management</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-1-4')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 4: File Systems</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Module 2 */}
                    <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                      <h4 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Module 2: Concurrency & Scheduling</h4>
                      <div className="space-y-2">
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-2-1')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 1: Process Scheduling</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-2-2')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 2: Concurrency</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-2-3')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 3: Mutual Exclusion</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Module 3 */}
                    <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                      <h4 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Module 3: Advanced Topics</h4>
                      <div className="space-y-2">
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-3-1')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 1: Distributed Systems</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('os', 'os-3-2')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 2: Security & Protection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Structures & Algorithms */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-4">Data Structures & Algorithms</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Module 1 */}
                    <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                      <h4 className={`font-semibold ${themeClasses.textPrimary} mb-3`}>Module 1: Basic Data Structures</h4>
                      <div className="space-y-2">
                        <div 
                          onClick={() => handleVideoTopicClick('dsa', 'dsa-1-1')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 1: Arrays & Strings</span>
                        </div>
                        <div 
                          onClick={() => handleVideoTopicClick('dsa', 'dsa-1-2')}
                          className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}
                        >
                          <Play className="w-4 h-4 text-orange-500 mr-3" />
                          <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Topic 2: Linked Lists</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Notes, Question Bank, PYQ Layout
              <div className="space-y-4">
                {getCurrentTabData().map((file) => (
                  <FileCard
                    key={file.id}
                    title={file.title}
                    semester={file.semester}
                    subject={file.subject}
                    department={file.department}
                    upvotes={file.upvotes}
                    onClick={() => handleFileCardClick(file.id, activeTab)}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}