"use client";

import React, { useState, useCallback } from 'react';
import { Code, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { useTheme } from '../../components/providers/ThemeProvider';
import { DepartmentSubjectDropdown, PracticalCard, RecentFiles, MonacoEditor, TerminalOutput } from './components';
import { departments, getPracticalsBySubject, Practical } from './data/practicals';
import { codeExecutionService, ExecutionResult } from './services/codeExecution';

export default function CoderPage() {
  const { isDark } = useTheme();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedPractical, setSelectedPractical] = useState<Practical | null>(null);
  
  // Monaco Editor state
  const [code, setCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [executionResults, setExecutionResults] = useState<ExecutionResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

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

  const practicals = getPracticalsBySubject(selectedDepartment, selectedSubject);

  const handleStartPractical = useCallback((practical: Practical) => {
    setSelectedPractical(practical);
    setShowEditor(true);
    
    // Set initial code template based on practical or language
    const templates: Record<string, string> = {
      javascript: `// ${practical.title}
// ${practical.description}

console.log("Starting practical: ${practical.title}");

// Your code here
`,
      python: `# ${practical.title}
# ${practical.description}

print("Starting practical: ${practical.title}")

# Your code here
`,
      java: `// ${practical.title}
// ${practical.description}

public class Practical${practical.practicalNumber} {
    public static void main(String[] args) {
        System.out.println("Starting practical: ${practical.title}");
        
        // Your code here
    }
}`,
    };
    
    setCode(templates[currentLanguage] || templates.javascript);
  }, [currentLanguage]);

  const handleBackToPracticals = useCallback(() => {
    setShowEditor(false);
    setSelectedPractical(null);
    setExecutionResults([]);
    setCode('');
  }, []);

  const handleCodeChange = useCallback((value: string | undefined) => {
    setCode(value || '');
  }, []);

  const handleRunCode = useCallback(async (codeToRun: string) => {
    if (!codeToRun.trim()) {
      return;
    }

    setIsExecuting(true);
    
    try {
      const result = await codeExecutionService.executeCode(codeToRun, currentLanguage);
      setExecutionResults(prev => [...prev, result]);
    } catch (error) {
      console.error('Code execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  }, [currentLanguage]);

  const handleClearTerminal = useCallback(() => {
    setExecutionResults([]);
    codeExecutionService.clearHistory();
  }, []);

  if (showEditor && selectedPractical) {
    return (
      <AppLayout activePage="AI Coder" showFooter={false}>
        <div className="h-screen flex flex-col">
          {/* Editor Header */}
          <div className="p-4 pb-2 flex-shrink-0">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={handleBackToPracticals}
                    className={`
                      mr-4 px-3 py-2 rounded-lg border ${themeClasses.borderPrimary} 
                      ${themeClasses.textSecondary} hover:bg-orange-50 hover:text-orange-600 
                      dark:hover:bg-orange-900/20 dark:hover:text-orange-400 
                      transition-colors text-sm flex items-center space-x-2
                    `}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Practicals</span>
                  </button>
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-orange-500">
                      Practical {selectedPractical.practicalNumber}: {selectedPractical.title}
                    </h1>
                    <p className={`text-xs ${themeClasses.textMuted} mt-0.5`}>
                      {selectedPractical.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`text-xs ${themeClasses.textMuted}`}>
                    Difficulty: <span className="text-orange-500">{selectedPractical.difficulty}</span>
                  </div>
                  <div className={`text-xs ${themeClasses.textMuted}`}>
                    Time: <span className="text-blue-500">{selectedPractical.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Layout */}
          <div className="flex-1 px-4 pb-4 min-h-0">
            <div className="max-w-7xl mx-auto h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                
                {/* Monaco Editor */}
                <div className="h-full">
                  <MonacoEditor
                    language={currentLanguage}
                    value={code}
                    onChange={handleCodeChange}
                    onRun={handleRunCode}
                    isRunning={isExecuting}
                    isDark={isDark}
                    practicalTitle={selectedPractical.title}
                  />
                </div>

                {/* Terminal Output */}
                <div className="h-full">
                  <TerminalOutput
                    results={executionResults}
                    isRunning={isExecuting}
                    onClear={handleClearTerminal}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout activePage="AI Coder" showFooter={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-orange-500">Coder</h1>
                  <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
                    Practice coding with Monaco Editor and real-time execution
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`text-xs ${themeClasses.textMuted} mr-2`}>Powered by</span>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500 text-sm">Monaco Editor</span>
                  <span className={`text-xs ${themeClasses.textMuted}`}>•</span>
                  <a 
                    href="https://onecompiler.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:text-blue-400 transition-colors text-sm"
                  >
                    OneCompiler
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Side - Practicals */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Dropdown Section */}
                <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6`}>
                  <h2 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-4`}>
                    Select Practice Area
                  </h2>
                  <DepartmentSubjectDropdown
                    selectedDepartment={selectedDepartment}
                    selectedSubject={selectedSubject}
                    onDepartmentChange={setSelectedDepartment}
                    onSubjectChange={setSelectedSubject}
                    departments={departments}
                    isDark={isDark}
                  />
                </div>

                {/* Practicals Grid */}
                {practicals.length > 0 ? (
                  <div>
                    <div className="flex items-center mb-4">
                      <BookOpen className={`w-5 h-5 ${themeClasses.textPrimary} mr-2`} />
                      <h2 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
                        Available Practicals
                      </h2>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${themeClasses.bgTertiary} ${themeClasses.textMuted}`}>
                        {practicals.length} practicals
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {practicals.map((practical) => (
                        <PracticalCard
                          key={practical.id}
                          practical={practical}
                          onStartPractical={handleStartPractical}
                          isDark={isDark}
                        />
                      ))}
                    </div>
                  </div>
                ) : selectedDepartment && selectedSubject ? (
                  <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-8 text-center`}>
                    <BookOpen className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-3`} />
                    <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>
                      No Practicals Available
                    </h3>
                    <p className={`${themeClasses.textMuted}`}>
                      There are no practicals available for the selected subject yet.
                    </p>
                  </div>
                ) : (
                  <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-8 text-center`}>
                    <BookOpen className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-3`} />
                    <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>
                      Get Started with Practicals
                    </h3>
                    <p className={`${themeClasses.textMuted}`}>
                      Select a department and subject to view available coding practicals.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Side - Recent Files */}
              <div className="lg:col-span-1">
                <RecentFiles isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
