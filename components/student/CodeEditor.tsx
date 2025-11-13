"use client";

import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  language: string;
  initialCode: string;
  onRun: (code: string) => void;
  onReset: () => void;
}

export default function CodeEditor({ language, initialCode, onRun, onReset }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const editorRef = useRef<any>(null);

  // Update code when initialCode prop changes (when step changes)
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const getMonacoLanguage = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      python: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      js: "javascript",
      javascript: "javascript",
    };
    return languageMap[lang.toLowerCase()] || "python";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Code Editor
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ({language})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-md transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={() => onRun(code)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
          >
            <Play className="w-4 h-4" />
            Run Code
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
