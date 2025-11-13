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
import FileCard from './components/FileCard';

export default function ClassConnectDashboard() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('Notes');
  const [selectedDepartment, setSelectedDepartment] = useState('Department Name');
  const [selectedSemester, setSelectedSemester] = useState('Semester');
  const [selectedSubject, setSelectedSubject] = useState('Subjects');

  // Sample data for different tabs
  const notesData = [
    {
      id: 1,
      title: "Operating Systems Complete Notes",
      semester: "Semester 5",
      subject: "Operating Systems",
      department: "Computer Science",
      upvotes: 15
    },
    {
      id: 2,
      title: "Data Structures and Algorithms Handbook",
      semester: "Semester 3",
      subject: "DSA",
      department: "Computer Science",
      upvotes: 23
    },
    {
      id: 3,
      title: "Database Management Systems Guide",
      semester: "Semester 4",
      subject: "DBMS",
      department: "Computer Science",
      upvotes: 8
    },
    {
      id: 4,
      title: "Computer Networks Fundamentals",
      semester: "Semester 6",
      subject: "Computer Networks",
      department: "Computer Science",
      upvotes: 12
    }
  ];

  const questionBankData = [
    {
      id: 1,
      title: "Operating Systems Question Bank 2024",
      semester: "Semester 5",
      subject: "Operating Systems",
      department: "Computer Science",
      upvotes: 18
    },
    {
      id: 2,
      title: "DSA Problem Set with Solutions",
      semester: "Semester 3",
      subject: "DSA",
      department: "Computer Science",
      upvotes: 31
    },
    {
      id: 3,
      title: "DBMS Practice Questions",
      semester: "Semester 4",
      subject: "DBMS",
      department: "Computer Science",
      upvotes: 14
    },
    {
      id: 4,
      title: "Network Security Question Bank",
      semester: "Semester 6",
      subject: "Computer Networks",
      department: "Computer Science",
      upvotes: 9
    }
  ];

  const pyqData = [
    {
      id: 1,
      title: "Operating Systems PYQ 2020-2023",
      semester: "Semester 5",
      subject: "Operating Systems",
      department: "Computer Science",
      upvotes: 27
    },
    {
      id: 2,
      title: "Data Structures PYQ Collection",
      semester: "Semester 3",
      subject: "DSA",
      department: "Computer Science",
      upvotes: 19
    },
    {
      id: 3,
      title: "DBMS Previous Year Papers",
      semester: "Semester 4",
      subject: "DBMS",
      department: "Computer Science",
      upvotes: 11
    },
    {
      id: 4,
      title: "Computer Networks PYQ 2019-2023",
      semester: "Semester 6",
      subject: "Computer Networks",
      department: "Computer Science",
      upvotes: 16
    }
  ];

  const handleFileCardClick = (fileId: number, tabType: string) => {
    console.log(`Clicked file ${fileId} in ${tabType} tab`);
    // This will be connected to database later
  };

  const getCurrentTabData = () => {
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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeClasses = {
    // Background colors
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-stone-50',
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-white',
    bgTertiary: isDark ? 'bg-stone-700' : 'bg-stone-100',
    bgQuaternary: isDark ? 'bg-stone-600' : 'bg-stone-50',
    
    // Text colors
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    textSubtle: isDark ? 'text-stone-500' : 'text-stone-500',
    
    // Border colors
    borderPrimary: isDark ? 'border-stone-700' : 'border-stone-200',
    borderSecondary: isDark ? 'border-stone-600' : 'border-stone-100',
    borderHover: isDark ? 'border-stone-600' : 'border-stone-300',
    
    // Hover states
    hoverBg: isDark ? 'hover:bg-stone-700' : 'hover:bg-stone-50',
    hoverBgSecondary: isDark ? 'hover:bg-stone-600' : 'hover:bg-stone-200',
    hoverText: isDark ? 'hover:text-stone-200' : 'hover:text-stone-900',
    hoverBorder: isDark ? 'hover:border-stone-600' : 'hover:border-stone-300'
  };

  const tabs = ['Notes', 'Videos', 'Question Bank', 'PYQ'];

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary} ${themeClasses.textPrimary} flex font-sans`}>
      {/* Sidebar */}
      <div className={`w-64 ${themeClasses.bgSecondary} border-r ${themeClasses.borderPrimary} flex flex-col`}>
        {/* Logo */}
        <div className={`p-6 border-b ${themeClasses.borderSecondary}`}>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-lg mr-3 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Class Connect</h1>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className={`px-6 py-4 border-b ${themeClasses.borderSecondary}`}>
          <h3 className={`text-sm font-medium ${themeClasses.textMuted} mb-1`}>Good Evening</h3>
          <div className="w-8 h-0.5 bg-orange-500 rounded-full"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors`}>
              <BarChart3 className={`w-4 h-4 mr-3 ${themeClasses.textSubtle}`} />
              Dashboard
            </a>
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.bgTertiary} ${themeClasses.textPrimary}`}>
              <FileText className={`w-4 h-4 mr-3 ${themeClasses.textMuted}`} />
              Study Resources
            </a>
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors`}>
              <MessageCircle className={`w-4 h-4 mr-3 ${themeClasses.textSubtle}`} />
              Chat with PDFs
            </a>
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors`}>
              <Calculator className={`w-4 h-4 mr-3 ${themeClasses.textSubtle}`} />
              AI Calculator
            </a>
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors`}>
              <Code className={`w-4 h-4 mr-3 ${themeClasses.textSubtle}`} />
              Class Coder
            </a>
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors`}>
              <Users className={`w-4 h-4 mr-3 ${themeClasses.textSubtle}`} />
              Join Community
            </a>
          </div>
          
          <div className={`mt-6 pt-6 border-t ${themeClasses.borderPrimary}`}>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
              <ArrowUpRight className="w-4 h-4 mr-3" />
              Upgrade
            </a>
            <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText} transition-colors mt-1`}>
              <Smartphone className={`w-4 h-4 mr-3 ${themeClasses.textSubtle}`} />
              Get App
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`flex items-center justify-between px-6 py-4 ${themeClasses.bgSecondary} border-b ${themeClasses.borderPrimary}`}>
          <div className="flex items-center">
            <Moon className={`w-4 h-4 mr-2 ${themeClasses.textSubtle}`} />
            <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>It's Night</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className={`text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>Contribute</a>
            <a href="#" className={`text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>About Us</a>
            <a href="#" className={`text-sm ${themeClasses.textMuted} ${themeClasses.hoverText} transition-colors`}>FAQs</a>
            <button className={`px-3 py-1.5 text-sm border ${themeClasses.borderPrimary} rounded-md ${themeClasses.hoverBg} transition-colors`}>
              Login
            </button>
            <button 
              onClick={toggleTheme}
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
        </header>

        {/* Study Resources Content */}
        <main className="flex-1 p-6">
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
                  className={`w-full pl-10 pr-4 py-2 text-sm ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.textPrimary}`}
                />
              </div>

              {/* Department Dropdown */}
              <div className="relative">
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`w-full px-4 py-2 text-sm ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${themeClasses.textPrimary}`}
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
                  className={`w-full px-4 py-2 text-sm ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${themeClasses.textPrimary}`}
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
                  className={`w-full px-4 py-2 text-sm ${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none ${themeClasses.textPrimary}`}
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
                    case 'PYQ': return <FileText className="w-4 h-4 mr-2" />;
                    default: return null;
                  }
                };
                
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? `${themeClasses.bgTertiary} ${themeClasses.textPrimary}` 
                        : `${themeClasses.textSecondary} ${themeClasses.hoverBg} ${themeClasses.hoverText}`
                    }`}
                  >
                    {getTabIcon(tab)}
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6`}>
              {activeTab === 'Videos' ? (
                // Videos Layout
                <div className="space-y-6">
                  {/* Operating Systems */}
                  <div>
                    <h3 className="text-lg font-medium text-orange-500 mb-4">Operating Systems</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                      {/* Module 1 */}
                      <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                        <h4 className={`font-medium ${themeClasses.textPrimary} mb-3`}>Module 1: Introduction to OS</h4>
                        <div className="space-y-2">
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 1: OS Overview</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 2: Process Management</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 3: Memory Management</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 4: File Systems</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Module 2 */}
                      <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                        <h4 className={`font-medium ${themeClasses.textPrimary} mb-3`}>Module 2: Concurrency & Scheduling</h4>
                        <div className="space-y-2">
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 1: Process Scheduling</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 2: Concurrency</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 3: Mutual Exclusion</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Module 3 */}
                      <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                        <h4 className={`font-medium ${themeClasses.textPrimary} mb-3`}>Module 3: Advanced Topics</h4>
                        <div className="space-y-2">
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 1: Distributed Systems</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 2: Security & Protection</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Structures & Algorithms */}
                  <div>
                    <h3 className="text-lg font-medium text-orange-500 mb-4">Data Structures & Algorithms</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Module 1 */}
                      <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                        <h4 className={`font-medium ${themeClasses.textPrimary} mb-3`}>Module 1: Basic Data Structures</h4>
                        <div className="space-y-2">
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 1: Arrays & Strings</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 ${themeClasses.bgQuaternary} rounded-md ${themeClasses.hoverBg} cursor-pointer transition-colors`}>
                            <Play className="w-4 h-4 text-orange-500 mr-3" />
                            <span className={`text-sm ${themeClasses.textSecondary}`}>Topic 2: Linked Lists</span>
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
        </main>
      </div>
    </div>
  );
}