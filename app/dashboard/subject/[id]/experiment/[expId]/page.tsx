"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  Loader2,
  FileText,
  Video
} from "lucide-react";
import { AppLayout, getThemeClasses } from "@/components/layout";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

interface TestCase {
  input: string;
  expected_output: string;
}

interface ExperimentStep {
  step_no: number;
  title: string;
  instruction: string;
  starter_code: string;
  solution_code: string;
  test_cases: TestCase[];
}

interface Experiment {
  id: string;
  experiment_title: string;
  description: string;
  language: string;
  total_steps: number;
  steps: ExperimentStep[];
  pdfUrl?: string;
  videoUrl?: string;
}

export default function TeacherExperimentViewPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const { user, loading: authLoading } = useAuth();

  const subjectId = params.id as string;
  const experimentId = params.expId as string;

  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]));

  // Protect route - only teachers can access
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user && user.role !== 'teacher') {
      if (user.role === 'superadmin') {
        router.push('/admin');
      } else if (user.role === 'student') {
        router.push('/student');
      }
    }
  }, [user, authLoading, router]);

  // Fetch experiment data
  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        const response = await fetch(`/api/experiments/${experimentId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch experiment');
        }

        const data = await response.json();
        setExperiment(data.experiment);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiment:', err);
        setError(err instanceof Error ? err.message : 'Failed to load experiment');
        setLoading(false);
      }
    };

    if (experimentId && user) {
      fetchExperiment();
    }
  }, [experimentId, user]);

  const toggleStep = (stepNo: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepNo)) {
      newExpanded.delete(stepNo);
    } else {
      newExpanded.add(stepNo);
    }
    setExpandedSteps(newExpanded);
  };

  const expandAll = () => {
    if (experiment) {
      setExpandedSteps(new Set(experiment.steps.map(s => s.step_no)));
    }
  };

  const collapseAll = () => {
    setExpandedSteps(new Set());
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or not a teacher
  if (!user || user.role !== 'teacher') {
    return null;
  }

  if (loading) {
    return (
      <AppLayout activePage="Dashboard" showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </AppLayout>
    );
  }

  if (error || !experiment) {
    return (
      <AppLayout activePage="Dashboard" showFooter={false}>
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>
              {error || 'Experiment Not Found'}
            </h1>
            <p className={`${themeClasses.textMuted} mb-6`}>
              Unable to load experiment details.
            </p>
            <button
              onClick={() => router.push(`/dashboard/subject/${subjectId}`)}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Back to Subject
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout activePage="Dashboard" showFooter={false}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push(`/dashboard/subject/${subjectId}`)}
              className={`flex items-center ${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors mb-4`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Subject
            </button>
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-2`}>
                  {experiment.experiment_title}
                </h1>
                <p className={`${themeClasses.textMuted}`}>
                  Teacher View - All steps unlocked
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className={`px-3 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg hover:${themeClasses.hoverBorder} transition-colors text-sm`}
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className={`px-3 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg hover:${themeClasses.hoverBorder} transition-colors text-sm`}
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Experiment Summary */}
          <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 mb-6`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded">
                {experiment.language.toUpperCase()}
              </span>
              <span className={`text-sm ${themeClasses.textMuted}`}>
                {experiment.total_steps} Steps
              </span>
            </div>
            <p className={themeClasses.textSecondary}>{experiment.description}</p>

            {/* Resources */}
            {(experiment.pdfUrl || experiment.videoUrl) && (
              <div className="flex gap-4 mt-4">
                {experiment.pdfUrl && (
                  <a
                    href={experiment.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    View PDF
                  </a>
                )}
                {experiment.videoUrl && (
                  <a
                    href={experiment.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    Watch Video
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {experiment.steps.map((step, stepIndex) => {
              const isExpanded = expandedSteps.has(step.step_no);
              
              return (
                <div
                  key={step.step_no}
                  className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg overflow-hidden transition-all`}
                >
                  {/* Step Header */}
                  <button
                    onClick={() => toggleStep(step.step_no)}
                    className={`w-full p-4 flex items-center justify-between hover:${themeClasses.hoverBorder} transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-500/10 text-orange-500 rounded-full font-semibold text-sm">
                        {step.step_no}
                      </div>
                      <div className="text-left">
                        <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${themeClasses.textMuted}`}>
                          {step.test_cases.length} test case{step.test_cases.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className={`w-5 h-5 ${themeClasses.textMuted}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${themeClasses.textMuted}`} />
                    )}
                  </button>

                  {/* Step Content */}
                  {isExpanded && (
                    <div className={`p-6 border-t ${themeClasses.borderPrimary} space-y-6`}>
                      {/* Instruction */}
                      <div>
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2 flex items-center gap-2`}>
                          <BookOpen className="w-4 h-4" />
                          Instructions
                        </h4>
                        <p className={`${themeClasses.textSecondary} text-sm whitespace-pre-wrap`}>
                          {step.instruction}
                        </p>
                      </div>

                      {/* Starter Code */}
                      <div>
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2 flex items-center gap-2`}>
                          <Code className="w-4 h-4" />
                          Starter Code (What Students See)
                        </h4>
                        <pre className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 overflow-x-auto text-sm ${themeClasses.textSecondary}`}>
                          <code>{step.starter_code}</code>
                        </pre>
                      </div>

                      {/* Solution Code */}
                      <div>
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2 flex items-center gap-2`}>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Solution Code
                        </h4>
                        <pre className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 overflow-x-auto text-sm ${themeClasses.textSecondary}`}>
                          <code>{step.solution_code}</code>
                        </pre>
                      </div>

                      {/* Test Cases */}
                      <div>
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-3`}>
                          Test Cases ({step.test_cases.length})
                        </h4>
                        <div className="space-y-3">
                          {step.test_cases.map((testCase, testIndex) => (
                            <div
                              key={testIndex}
                              className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className={`text-xs font-medium ${themeClasses.textMuted}`}>
                                  Test Case {testIndex + 1}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className={`font-medium ${themeClasses.textMuted}`}>Input:</span>
                                  <pre className={`mt-1 ${themeClasses.textSecondary}`}>{testCase.input}</pre>
                                </div>
                                <div>
                                  <span className={`font-medium ${themeClasses.textMuted}`}>Expected Output:</span>
                                  <pre className={`mt-1 ${themeClasses.textSecondary}`}>{testCase.expected_output}</pre>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
