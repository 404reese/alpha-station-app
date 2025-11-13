"use client";

// Code execution service using OneCompiler API (mock implementation)
// In a real implementation, you would use a proper backend service

export interface ExecutionResult {
  id: string;
  timestamp: Date;
  code: string;
  language: string;
  output?: string;
  error?: string;
  executionTime?: number;
  status: 'running' | 'success' | 'error';
}

class CodeExecutionService {
  private static instance: CodeExecutionService;
  private executionHistory: ExecutionResult[] = [];

  static getInstance(): CodeExecutionService {
    if (!CodeExecutionService.instance) {
      CodeExecutionService.instance = new CodeExecutionService();
    }
    return CodeExecutionService.instance;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  async executeCode(code: string, language: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    const result: ExecutionResult = {
      id: this.generateId(),
      timestamp: new Date(),
      code,
      language,
      status: 'running'
    };

    // Add to history immediately with running status
    this.executionHistory.push(result);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Mock execution results based on language and code content
      const mockResult = this.generateMockResult(code, language);
      
      result.status = mockResult.success ? 'success' : 'error';
      result.output = mockResult.output;
      result.error = mockResult.error;
      result.executionTime = Date.now() - startTime;

      // Update the result in history
      const index = this.executionHistory.findIndex(r => r.id === result.id);
      if (index !== -1) {
        this.executionHistory[index] = { ...result };
      }

      return result;

    } catch (error) {
      result.status = 'error';
      result.error = error instanceof Error ? error.message : 'Unknown error occurred';
      result.executionTime = Date.now() - startTime;

      // Update the result in history
      const index = this.executionHistory.findIndex(r => r.id === result.id);
      if (index !== -1) {
        this.executionHistory[index] = { ...result };
      }

      return result;
    }
  }

  private generateMockResult(code: string, language: string): { success: boolean; output?: string; error?: string } {
    // Simple mock logic - in real implementation, this would be actual code execution
    
    // Check for syntax errors (very basic)
    if (code.trim().length === 0) {
      return {
        success: false,
        error: 'Error: Empty code provided'
      };
    }

    // Simulate different outcomes based on code content
    if (code.includes('console.log') || code.includes('print') || code.includes('System.out.println') || code.includes('cout')) {
      const lines = code.split('\n');
      let output = '';
      
      // Extract print statements and simulate output
      lines.forEach(line => {
        if (language === 'javascript' && line.includes('console.log')) {
          const match = line.match(/console\.log\s*\(\s*['"](.*?)['"]|console\.log\s*\(\s*([^)]+)\)/);
          if (match) {
            output += (match[1] || 'Hello, World!') + '\n';
          }
        } else if (language === 'python' && line.includes('print')) {
          const match = line.match(/print\s*\(\s*['"](.*?)['"]|print\s*\(\s*([^)]+)\)/);
          if (match) {
            output += (match[1] || 'Hello, World!') + '\n';
          }
        } else if (language === 'java' && line.includes('System.out.println')) {
          const match = line.match(/System\.out\.println\s*\(\s*['"](.*?)['"]|System\.out\.println\s*\(\s*([^)]+)\)/);
          if (match) {
            output += (match[1] || 'Hello, World!') + '\n';
          }
        } else if (language === 'cpp' && line.includes('cout')) {
          const match = line.match(/cout\s*<<\s*['"](.*?)['"]|cout\s*<<\s*([^;]+)/);
          if (match) {
            output += (match[1] || 'Hello, World!') + '\n';
          }
        }
      });

      return {
        success: true,
        output: output || 'Hello, World!\n'
      };
    }

    // Simulate compilation/runtime errors for certain patterns
    if (code.includes('undefined_function') || code.includes('undefined_variable')) {
      return {
        success: false,
        error: `${language === 'python' ? 'NameError' : 'ReferenceError'}: undefined_variable is not defined`
      };
    }

    if (code.includes('syntax_error')) {
      return {
        success: false,
        error: `SyntaxError: invalid syntax`
      };
    }

    // Default successful execution
    return {
      success: true,
      output: 'Code executed successfully!\n'
    };
  }

  getExecutionHistory(): ExecutionResult[] {
    return [...this.executionHistory];
  }

  clearHistory(): void {
    this.executionHistory = [];
  }

  // Real implementation would use OneCompiler API or similar service
  private async callOneCompilerAPI(code: string, language: string): Promise<any> {
    // This is where you would make actual API calls to OneCompiler
    // Example API endpoint: https://onecompiler.com/api/code/exec
    
    const languageMap: Record<string, string> = {
      javascript: 'nodejs',
      python: 'python',
      java: 'java',
      cpp: 'cpp',
      typescript: 'typescript'
    };

    const payload = {
      language: languageMap[language] || 'nodejs',
      stdin: '',
      files: [
        {
          name: 'main.' + this.getFileExtension(language),
          content: code
        }
      ]
    };

    // In a real implementation:
    // const response = await fetch('https://onecompiler.com/api/code/exec', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload)
    // });
    // return response.json();

    // For now, return mock data
    return {
      stdout: 'Hello, World!\n',
      stderr: '',
      exception: null
    };
  }

  private getFileExtension(language: string): string {
    const extensions: Record<string, string> = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      typescript: 'ts'
    };
    return extensions[language] || 'txt';
  }
}

export const codeExecutionService = CodeExecutionService.getInstance();