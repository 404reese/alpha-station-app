"use client";

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Square, RotateCcw, Save, FileText, Settings } from 'lucide-react';

interface MonacoEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
  onRun: (code: string) => void;
  isRunning: boolean;
  isDark: boolean;
  practicalTitle?: string;
}

const LANGUAGE_TEMPLATES: Record<string, string> = {
  javascript: `// JavaScript Code
console.log("Hello, World!");

// Example: Simple function
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Coder"));`,

  python: `# Python Code
print("Hello, World!")

# Example: Simple function
def greet(name):
    return f"Hello, {name}!"

print(greet("Coder"))`,

  java: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Example: Simple method
        String greeting = greet("Coder");
        System.out.println(greeting);
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,

  cpp: `// C++ Code
#include <iostream>
#include <string>

using namespace std;

// Example: Simple function
string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << "Hello, World!" << endl;
    cout << greet("Coder") << endl;
    return 0;
}`,

  typescript: `// TypeScript Code
console.log("Hello, World!");

// Example: Simple function with types
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("Coder"));`,
};

const LANGUAGE_CONFIGS = {
  javascript: { extension: 'js', monacoLang: 'javascript' },
  python: { extension: 'py', monacoLang: 'python' },
  java: { extension: 'java', monacoLang: 'java' },
  cpp: { extension: 'cpp', monacoLang: 'cpp' },
  typescript: { extension: 'ts', monacoLang: 'typescript' },
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language,
  value,
  onChange,
  onRun,
  isRunning,
  isDark,
  practicalTitle
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(false);
  const editorRef = useRef<any>(null);

  const themeClasses = {
    bgPrimary: isDark ? 'bg-stone-800' : 'bg-white',
    bgSecondary: isDark ? 'bg-stone-700' : 'bg-stone-50',
    bgTertiary: isDark ? 'bg-stone-900' : 'bg-stone-100',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    border: isDark ? 'border-stone-600' : 'border-stone-300',
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Set editor theme based on dark mode
    if (isDark) {
      editor.updateOptions({ theme: 'vs-dark' });
    } else {
      editor.updateOptions({ theme: 'light' });
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    
    // Load template for new language if current code is empty or is a template
    const currentCode = editorRef.current?.getValue() || '';
    const isTemplate = Object.values(LANGUAGE_TEMPLATES).some(template => 
      currentCode.trim() === template.trim()
    );
    
    if (!currentCode.trim() || isTemplate) {
      const template = LANGUAGE_TEMPLATES[newLanguage] || '';
      onChange(template);
    }
  };

  const handleRun = () => {
    const code = editorRef.current?.getValue() || '';
    onRun(code);
  };

  const handleReset = () => {
    const template = LANGUAGE_TEMPLATES[currentLanguage] || '';
    onChange(template);
  };

  const handleSave = () => {
    const code = editorRef.current?.getValue() || '';
    const config = LANGUAGE_CONFIGS[currentLanguage as keyof typeof LANGUAGE_CONFIGS];
    const filename = `code.${config?.extension || 'txt'}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`h-full flex flex-col ${themeClasses.bgPrimary} border ${themeClasses.border} rounded-lg overflow-hidden`}>
      {/* Toolbar */}
      <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} p-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium
                ${themeClasses.bgPrimary} ${themeClasses.textPrimary}
                border ${themeClasses.border}
                focus:outline-none focus:ring-2 focus:ring-orange-500
              `}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
            </select>

            {/* File Info */}
            {practicalTitle && (
              <div className="flex items-center space-x-2">
                <FileText className={`w-4 h-4 ${themeClasses.textMuted}`} />
                <span className={`text-sm ${themeClasses.textMuted}`}>
                  {practicalTitle}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium
                ${themeClasses.textSecondary} hover:text-orange-500
                border ${themeClasses.border}
                transition-colors flex items-center space-x-1
              `}
              title="Reset to template"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleSave}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium
                ${themeClasses.textSecondary} hover:text-blue-500
                border ${themeClasses.border}
                transition-colors flex items-center space-x-1
              `}
              title="Save file"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium
                ${themeClasses.textSecondary} hover:text-gray-500
                border ${themeClasses.border}
                transition-colors flex items-center
              `}
              title="Editor settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`
                px-4 py-1.5 rounded-md text-sm font-medium
                ${isRunning 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
                }
                transition-colors flex items-center space-x-1
              `}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Run Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={`mt-3 p-3 ${themeClasses.bgTertiary} rounded-md border ${themeClasses.border}`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium ${themeClasses.textPrimary} mb-1`}>
                  Font Size
                </label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className={`text-xs ${themeClasses.textMuted}`}>{fontSize}px</span>
              </div>
              <div>
                <label className={`flex items-center space-x-2 text-xs font-medium ${themeClasses.textPrimary}`}>
                  <input
                    type="checkbox"
                    checked={wordWrap}
                    onChange={(e) => setWordWrap(e.target.checked)}
                    className="rounded"
                  />
                  <span>Word Wrap</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIGS[currentLanguage as keyof typeof LANGUAGE_CONFIGS]?.monacoLang || 'javascript'}
          value={value}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={isDark ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: fontSize,
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
            },
            automaticLayout: true,
            wordWrap: wordWrap ? 'on' : 'off',
            tabSize: 2,
            insertSpaces: true,
            renderWhitespace: 'boundary',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonacoEditor;