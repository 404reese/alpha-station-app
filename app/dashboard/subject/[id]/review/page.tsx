"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Code,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { AppLayout, getThemeClasses } from '../../../../../components/layout';
import { useTheme } from '../../../../../components/providers/ThemeProvider';

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

interface ExperimentData {
  experiment_title: string;
  language: string;
  total_steps: number;
  steps: ExperimentStep[];
}

export default function ReviewExperimentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);

  const [experimentData, setExperimentData] = useState<ExperimentData | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setExperimentData(parsed);
        setLoading(false);
      } catch (error) {
        console.error('Failed to parse experiment data:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const toggleStep = (stepNo: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepNo)) {
      newExpanded.delete(stepNo);
    } else {
      newExpanded.add(stepNo);
    }
    setExpandedSteps(newExpanded);
  };

  const handleAccept = () => {
    // TODO: Save experiment to database/state
    const subjectId = window.location.pathname.split('/')[3];
    router.push(`/dashboard/subject/${subjectId}`);
  };

  const handleReject = () => {
    router.back();
  };

  if (loading) {
    return (
      <AppLayout activePage="Dashboard" showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </AppLayout>
    );
  }

  if (!experimentData) {
    return (
      <AppLayout activePage="Dashboard" showFooter={false}>
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center">
            <XCircle className={`w-16 h-16 ${themeClasses.textMuted} mx-auto mb-4`} />
            <h1 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>No Experiment Data</h1>
            <p className={`${themeClasses.textMuted} mb-6`}>Unable to load experiment data.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Go Back
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
              onClick={() => router.back()}
              className={`flex items-center ${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors mb-4`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-2`}>
                  Review AI-Generated Experiment
                </h1>
                <p className={`${themeClasses.textMuted}`}>
                  Review the generated steps and accept or reject the experiment
                </p>
              </div>
            </div>
          </div>

          {/* Experiment Summary */}
          <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 mb-6`}>
            <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-4`}>
              {experimentData.experiment_title}
            </h2>
            <div className="flex gap-6">
              <div>
                <span className={`text-sm ${themeClasses.textMuted}`}>Language:</span>
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                  {experimentData.language}
                </span>
              </div>
              <div>
                <span className={`text-sm ${themeClasses.textMuted}`}>Total Steps:</span>
                <span className={`ml-2 font-semibold ${themeClasses.textPrimary}`}>
                  {experimentData.total_steps}
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-6">
            {experimentData.steps.map((step) => (
              <div
                key={step.step_no}
                className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg overflow-hidden`}
              >
                {/* Step Header */}
                <div
                  onClick={() => toggleStep(step.step_no)}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:${themeClasses.hoverBgSecondary} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-semibold text-sm">
                      {step.step_no}
                    </div>
                    <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                      {step.title}
                    </h3>
                  </div>
                  {expandedSteps.has(step.step_no) ? (
                    <ChevronUp className={`w-5 h-5 ${themeClasses.textMuted}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${themeClasses.textMuted}`} />
                  )}
                </div>

                {/* Step Content */}
                {expandedSteps.has(step.step_no) && (
                  <div className={`p-4 border-t ${themeClasses.borderPrimary}`}>
                    {/* Instruction */}
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Instruction:
                      </h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        {step.instruction}
                      </p>
                    </div>

                    {/* Starter Code */}
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Starter Code:
                      </h4>
                      <pre className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 overflow-x-auto`}>
                        <code className={`text-sm ${themeClasses.textPrimary}`}>
                          {step.starter_code}
                        </code>
                      </pre>
                    </div>

                    {/* Solution Code */}
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Solution Code:
                      </h4>
                      <pre className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 overflow-x-auto`}>
                        <code className={`text-sm ${themeClasses.textPrimary}`}>
                          {step.solution_code}
                        </code>
                      </pre>
                    </div>

                    {/* Test Cases */}
                    <div>
                      <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Test Cases ({step.test_cases.length}):
                      </h4>
                      <div className="space-y-2">
                        {step.test_cases.map((testCase, idx) => (
                          <div
                            key={idx}
                            className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-3`}
                          >
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
            ))}
          </div>

          {/* Action Buttons */}
          <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 sticky bottom-6`}>
            <div className="flex gap-4">
              <button
                onClick={handleAccept}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                Accept & Create Experiment
              </button>
              <button
                onClick={handleReject}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                <XCircle className="w-5 h-5" />
                Reject & Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
