"use client";

import { Terminal as TerminalIcon, X } from "lucide-react";

interface TerminalProps {
  output: string;
  isRunning: boolean;
  onClear: () => void;
}

export default function Terminal({ output, isRunning, onClear }: TerminalProps) {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-green-400">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Terminal Output</span>
        </div>
        <button
          onClick={onClear}
          className="p-1 hover:bg-slate-800 rounded transition-colors"
          title="Clear terminal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {isRunning ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Running...</span>
          </div>
        ) : output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="text-slate-500">
            Press "Run Code" to see output here...
          </div>
        )}
      </div>
    </div>
  );
}
