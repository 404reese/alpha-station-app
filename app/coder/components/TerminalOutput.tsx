"use client";

import React, { useEffect, useRef } from 'react';
import { Terminal, Trash2, Copy, Download } from 'lucide-react';

interface ExecutionResult {
  id: string;
  timestamp: Date;
  code: string;
  language: string;
  output?: string;
  error?: string;
  executionTime?: number;
  status: 'running' | 'success' | 'error';
}

interface TerminalOutputProps {
  results: ExecutionResult[];
  isRunning: boolean;
  onClear: () => void;
  isDark: boolean;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({
  results,
  isRunning,
  onClear,
  isDark
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  const themeClasses = {
    bgPrimary: isDark ? 'bg-stone-900' : 'bg-white',
    bgSecondary: isDark ? 'bg-stone-800' : 'bg-stone-50',
    bgTerminal: isDark ? 'bg-black' : 'bg-gray-900',
    textPrimary: isDark ? 'text-stone-100' : 'text-stone-900',
    textSecondary: isDark ? 'text-stone-300' : 'text-stone-700',
    textMuted: isDark ? 'text-stone-400' : 'text-stone-600',
    textTerminal: 'text-green-400',
    textError: 'text-red-400',
    textWarning: 'text-yellow-400',
    border: isDark ? 'border-stone-600' : 'border-stone-300',
  };

  // Auto-scroll to bottom when new results are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [results]);

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copyOutput = (result: ExecutionResult) => {
    const text = result.output || result.error || 'No output';
    navigator.clipboard.writeText(text);
  };

  const downloadOutput = (result: ExecutionResult) => {
    const text = result.output || result.error || 'No output';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output_${result.timestamp.getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return themeClasses.textWarning;
      case 'success':
        return themeClasses.textTerminal;
      case 'error':
        return themeClasses.textError;
      default:
        return themeClasses.textMuted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'RUNNING';
      case 'success':
        return 'SUCCESS';
      case 'error':
        return 'ERROR';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <div className={`h-full flex flex-col ${themeClasses.bgPrimary} border ${themeClasses.border} rounded-lg overflow-hidden`}>
      {/* Terminal Header */}
      <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} p-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className={`w-4 h-4 ${themeClasses.textPrimary}`} />
            <h3 className={`text-sm font-medium ${themeClasses.textPrimary}`}>
              Terminal Output
            </h3>
            {isRunning && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className={`text-xs ${themeClasses.textWarning}`}>
                  Executing...
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-xs ${themeClasses.textMuted}`}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={onClear}
              className={`
                p-1.5 rounded-md
                ${themeClasses.textMuted} hover:text-red-500
                hover:bg-red-50 dark:hover:bg-red-900/20
                transition-colors
              `}
              title="Clear output"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className={`flex-1 ${themeClasses.bgTerminal} text-sm font-mono overflow-y-auto`}
      >
        {results.length === 0 ? (
          <div className="p-6 text-center">
            <Terminal className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-3 opacity-50`} />
            <p className={`${themeClasses.textMuted} text-sm`}>
              No output yet
            </p>
            <p className={`${themeClasses.textMuted} text-xs mt-1`}>
              Run your code to see the output here
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border-l-2 border-gray-600 pl-4">
                {/* Execution Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(result.status)} bg-opacity-20`}>
                      {getStatusText(result.status)}
                    </span>
                    <span className="text-blue-400 text-xs">
                      {result.language.toUpperCase()}
                    </span>
                    <span className={`${themeClasses.textMuted} text-xs`}>
                      {formatTimestamp(result.timestamp)}
                    </span>
                    {result.executionTime && (
                      <span className={`${themeClasses.textMuted} text-xs`}>
                        ({result.executionTime}ms)
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => copyOutput(result)}
                      className={`p-1 rounded hover:bg-gray-700 ${themeClasses.textMuted} hover:text-white`}
                      title="Copy output"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => downloadOutput(result)}
                      className={`p-1 rounded hover:bg-gray-700 ${themeClasses.textMuted} hover:text-white`}
                      title="Download output"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Output Content */}
                {result.status === 'running' && (
                  <div className={`${themeClasses.textWarning} text-sm`}>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Executing code...</span>
                    </div>
                  </div>
                )}

                {result.output && (
                  <div className="mb-2">
                    <div className={`${themeClasses.textTerminal} text-xs mb-1`}>
                      OUTPUT:
                    </div>
                    <pre className={`${themeClasses.textTerminal} whitespace-pre-wrap text-sm`}>
                      {result.output}
                    </pre>
                  </div>
                )}

                {result.error && (
                  <div className="mb-2">
                    <div className={`${themeClasses.textError} text-xs mb-1`}>
                      ERROR:
                    </div>
                    <pre className={`${themeClasses.textError} whitespace-pre-wrap text-sm`}>
                      {result.error}
                    </pre>
                  </div>
                )}

                {/* Execution Command */}
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <div className={`${themeClasses.textMuted} text-xs mb-1`}>
                    $ Running {result.language} code
                  </div>
                  <pre className={`${themeClasses.textMuted} text-xs whitespace-pre-wrap opacity-60 max-h-20 overflow-y-auto`}>
                    {result.code.length > 200 
                      ? result.code.substring(0, 200) + '...' 
                      : result.code
                    }
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className={`${themeClasses.bgSecondary} border-t ${themeClasses.border} p-2`}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <span className={themeClasses.textMuted}>
              Ready
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {results.length > 0 && (
              <span className={themeClasses.textMuted}>
                Last run: {formatTimestamp(results[results.length - 1]?.timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalOutput;