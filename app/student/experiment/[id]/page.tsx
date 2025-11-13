"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Experiment } from "@/app/student/data/experiments";
import { StepsList, CodeEditor, Terminal, ExperimentInfo } from "@/components/student";
import { ArrowLeft, BookOpen, FileText, Code2, Loader2 } from "lucide-react";
import { getThemeClasses } from "@/components/layout";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ExperimentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const experimentId = params.id as string;

  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [code, setCode] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalCode, setShowFinalCode] = useState(false);
  const [viewingFinalSolution, setViewingFinalSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "code">("info");
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Fetch experiment data
  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/experiments/${experimentId}`);
        
        if (!response.ok) {
          throw new Error('Failed to load experiment');
        }

        const data = await response.json();
        
        if (data.success && data.experiment) {
          // Transform the experiment data to match expected format
          const transformedExp: Experiment = {
            id: data.experiment.id,
            experiment_title: data.experiment.experiment_title,
            subject: '', // Will be populated if needed
            language: data.experiment.language,
            total_steps: data.experiment.total_steps,
            steps: data.experiment.steps,
            pdfUrl: data.experiment.pdfUrl,
            videoUrl: data.experiment.videoUrl,
            description: data.experiment.description,
          };
          setExperiment(transformedExp);
        } else {
          throw new Error('Invalid experiment data');
        }
      } catch (err) {
        console.error('Error fetching experiment:', err);
        setError(err instanceof Error ? err.message : 'Failed to load experiment');
      } finally {
        setLoading(false);
      }
    };

    if (experimentId) {
      fetchExperiment();
    }
  }, [experimentId]);

  // Fetch student progress for this experiment
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress?experimentId=${experimentId}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.progress) {
            setCompletedSteps(data.progress.completedSteps || []);
            setCurrentStep(data.progress.lastAccessedStep || 1);
          }
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };

    if (experimentId) {
      fetchProgress();
    }
  }, [experimentId]);

  // Save progress whenever completedSteps or currentStep changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            experimentId,
            completedSteps,
            lastAccessedStep: currentStep,
          }),
        });
      } catch (err) {
        console.error('Error saving progress:', err);
      }
    };

    if (experimentId && experiment) {
      // Debounce to avoid too many requests
      const timeoutId = setTimeout(saveProgress, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [experimentId, completedSteps, currentStep, experiment]);

  // Set initial tab from URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'code') {
      setActiveTab('code');
    }
  }, [searchParams]);

  // Check if all steps are completed
  const allStepsCompleted = completedSteps.length === experiment?.total_steps;

  // Get complete solution code
  const completeSolutionCode = useMemo(() => {
    if (!experiment) return "";
    return experiment.steps
      .map((step, index) => {
        return `# Step ${step.step_no}: ${step.title}\n${step.solution_code}`;
      })
      .join("\n\n");
  }, [experiment]);

  // Initialize code when experiment or step changes
  useEffect(() => {
    if (experiment) {
      if (viewingFinalSolution) {
        setCode(completeSolutionCode);
      } else {
        const step = experiment.steps.find((s) => s.step_no === currentStep);
        if (step) {
          setCode(step.starter_code);
        }
      }
    }
  }, [experiment, currentStep, viewingFinalSolution, completeSolutionCode]);

  if (!experiment) {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Loading experiment...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {error || 'Experiment Not Found'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            The requested experiment could not be found.
          </p>
          <button
            onClick={() => router.push("/student")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = experiment.steps.find((s) => s.step_no === currentStep);

  const handleRunCode = (code: string) => {
    setIsRunning(true);
    setTerminalOutput(""); // Clear previous output
    
    // Simulate code execution (dummy for now)
    setTimeout(() => {
      setTerminalOutput(
        `$ Running ${experiment.language} code...\n\n` +
        `[DUMMY OUTPUT]\n` +
        `Code execution is simulated for now.\n` +
        `Your code:\n${code}\n\n` +
        `Exit code: 0\n` +
        `Execution completed successfully!`
      );
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    if (currentStepData) {
      setCode(currentStepData.starter_code);
      setTerminalOutput("");
    }
  };

  const handleClearTerminal = () => {
    setTerminalOutput("");
  };

  const handleStepChange = (stepNo: number) => {
    // Only allow changing to completed steps, current step, or next unlocked step
    const isStepUnlocked = stepNo === 1 || completedSteps.includes(stepNo - 1);
    if (isStepUnlocked || stepNo <= currentStep) {
      setCurrentStep(stepNo);
      setTerminalOutput(""); // Clear terminal when changing steps
      setViewingFinalSolution(false); // Exit final solution view when changing steps
    }
  };

  return (
    <div className={`h-screen flex flex-col ${themeClasses.bgPrimary}`}>
      {/* Top Header */}
      <div className={`flex items-center justify-between px-6 py-4 ${themeClasses.bgPrimary} border-b ${themeClasses.borderPrimary} shadow-sm`}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/student")}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium ${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-orange-500" />
            <div>
              <h1 className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                {experiment.experiment_title}
              </h1>
              <p className={`text-xs ${themeClasses.textMuted}`}>
                {experiment.subject}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded">
            {experiment.language.toUpperCase()}
          </span>
          {activeTab === "code" && (
            <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded">
              Step {currentStep} of {experiment.total_steps}
            </span>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex items-center gap-1 px-6 ${themeClasses.bgPrimary} border-b ${themeClasses.borderPrimary}`}>
        <button
          onClick={() => setActiveTab("info")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "info"
              ? "border-orange-500 text-orange-500"
              : `border-transparent ${themeClasses.textMuted} hover:${themeClasses.textPrimary}`
          }`}
        >
          <FileText className="w-4 h-4" />
          View Experiment
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "code"
              ? "border-orange-500 text-orange-500"
              : `border-transparent ${themeClasses.textMuted} hover:${themeClasses.textPrimary}`
          }`}
        >
          <Code2 className="w-4 h-4" />
          Start Coding
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "info" ? (
          <ExperimentInfo
            title={experiment.experiment_title}
            description={experiment.description}
            pdfUrl={experiment.pdfUrl}
            videoUrl={experiment.videoUrl}
            language={experiment.language}
            totalSteps={experiment.total_steps}
          />
        ) : (
          <div className="flex h-full">
            {/* Left Side - Steps (30%) */}
            <div className="w-[30%] h-full">
          {viewingFinalSolution ? (
            <div className={`h-full overflow-y-auto p-4 ${themeClasses.bgSecondary} border-r ${themeClasses.borderPrimary}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                  Complete Solution
                </h2>
                <button
                  onClick={() => setViewingFinalSolution(false)}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  Back to Steps
                </button>
              </div>
              <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className={`font-semibold ${themeClasses.textPrimary}`}>
                    All Steps Combined
                  </span>
                </div>
                <p className={`text-sm ${themeClasses.textMuted} mb-4`}>
                  This is the complete working solution combining all {experiment.total_steps} steps. You can run this code to see the final result.
                </p>
                <div className="space-y-2">
                  {experiment.steps.map((step) => (
                    <div key={step.step_no} className="flex items-center gap-2 text-xs">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={themeClasses.textPrimary}>{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <StepsList
              steps={experiment.steps}
              currentStep={currentStep}
              onStepChange={handleStepChange}
              completedSteps={completedSteps}
            />
          )}
        </div>

        {/* Right Side - Code Editor and Terminal (70%) */}
        <div className="w-[70%] h-full flex flex-col">
          {/* Code Editor (60% of right side) */}
          <div className="h-[60%] flex flex-col">
            {/* Complete Solution Card - Only shown on last step when all completed */}
            {currentStep === experiment.total_steps && allStepsCompleted && !viewingFinalSolution && (
              <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.borderPrimary} px-4 py-3`}>
                <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                          🎉 Experiment Completed!
                        </h3>
                        <p className={`text-xs ${themeClasses.textMuted}`}>
                          View and run the complete solution
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewingFinalSolution(true)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      View Complete Code
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex-1">
              <CodeEditor
                language={experiment.language}
                initialCode={code}
                onRun={handleRunCode}
                onReset={handleReset}
              />
            </div>
            {/* Step Actions Bar */}
            <div className={`flex items-center justify-between px-4 py-3 ${themeClasses.bgSecondary} border-t ${themeClasses.borderPrimary}`}>
              <div className="flex items-center gap-2">
                {viewingFinalSolution ? (
                  <span className="flex items-center gap-2 text-sm text-green-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Viewing Complete Solution
                  </span>
                ) : completedSteps.includes(currentStep) ? (
                  <span className="flex items-center gap-2 text-sm text-green-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Step Completed
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                {viewingFinalSolution ? (
                  <button
                    onClick={() => router.push("/student")}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Finish Experiment
                  </button>
                ) : (
                  <>
                    {currentStep > 1 && (
                      <button
                        onClick={() => handleStepChange(currentStep - 1)}
                        className={`px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} ${themeClasses.textPrimary} rounded-lg hover:border-orange-500 transition-colors text-sm font-medium`}
                      >
                        ← Previous Step
                      </button>
                    )}
                    {!completedSteps.includes(currentStep) ? (
                      <button
                        onClick={() => {
                          setCompletedSteps([...completedSteps, currentStep]);
                          // Auto-advance to next step if available
                          if (currentStep < experiment.total_steps) {
                            setTimeout(() => setCurrentStep(currentStep + 1), 500);
                          }
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        Mark Complete & Continue
                      </button>
                    ) : currentStep < experiment.total_steps ? (
                      <button
                        onClick={() => handleStepChange(currentStep + 1)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        Next Step →
                      </button>
                    ) : allStepsCompleted ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowFinalCode(!showFinalCode)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          {showFinalCode ? "Hide" : "View"} Complete Solution
                        </button>
                        <button
                          onClick={() => router.push("/student")}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          Finish Experiment
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStepChange(currentStep + 1)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        Next Step →
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Terminal (40% of right side) */}
          <div className="h-[40%] border-t">
            {showFinalCode && allStepsCompleted ? (
              <div className={`h-full overflow-y-auto ${themeClasses.bgSecondary}`}>
                <div className={`flex items-center justify-between px-4 py-2 ${themeClasses.bgPrimary} border-b ${themeClasses.borderPrimary}`}>
                  <h3 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                    Complete Solution - All Steps Combined
                  </h3>
                  <button
                    onClick={() => {
                      const fullCode = experiment.steps.map(s => s.solution_code).join('\n\n');
                      navigator.clipboard.writeText(fullCode);
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
                  >
                    Copy All Code
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {experiment.steps.map((step) => (
                    <div key={step.step_no} className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-medium rounded">
                          Step {step.step_no}
                        </span>
                        <h4 className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                          {step.title}
                        </h4>
                      </div>
                      <pre className={`text-xs ${themeClasses.textPrimary} bg-slate-900 dark:bg-slate-950 p-3 rounded overflow-x-auto`}>
                        <code>{step.solution_code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Terminal
                output={terminalOutput}
                isRunning={isRunning}
                onClear={handleClearTerminal}
              />
            )}
          </div>
        </div>
      </div>
        )}
      </div>
    </div>
  );
}
