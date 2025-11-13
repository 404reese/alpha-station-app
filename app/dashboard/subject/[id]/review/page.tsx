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
  Loader2,
  Edit2,
  Save,
  Trash2,
  Plus
} from 'lucide-react';
import { AppLayout, getThemeClasses } from '../../../../../components/layout';
import { useTheme } from '../../../../../components/providers/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, loading: authLoading } = useAuth();

  const [experimentData, setExperimentData] = useState<ExperimentData | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]));
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ExperimentData | null>(null);
  const [editingSteps, setEditingSteps] = useState<Set<number>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setExperimentData(parsed);
        setEditedData(JSON.parse(JSON.stringify(parsed))); // Deep copy
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

  const toggleStepEdit = (stepNo: number) => {
    const newEditing = new Set(editingSteps);
    if (newEditing.has(stepNo)) {
      newEditing.delete(stepNo);
    } else {
      newEditing.add(stepNo);
    }
    setEditingSteps(newEditing);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setExperimentData(editedData);
    setIsEditing(false);
    setEditingSteps(new Set());
  };

  const handleCancelEdit = () => {
    setEditedData(JSON.parse(JSON.stringify(experimentData)));
    setIsEditing(false);
    setEditingSteps(new Set());
  };

  const updateTitle = (value: string) => {
    if (editedData) {
      setEditedData({ ...editedData, experiment_title: value });
    }
  };

  const updateStepField = (stepIndex: number, field: keyof ExperimentStep, value: any) => {
    if (editedData) {
      const updatedSteps = [...editedData.steps];
      updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], [field]: value };
      setEditedData({ ...editedData, steps: updatedSteps });
    }
  };

  const updateTestCase = (stepIndex: number, testIndex: number, field: keyof TestCase, value: string) => {
    if (editedData) {
      const updatedSteps = [...editedData.steps];
      const updatedTestCases = [...updatedSteps[stepIndex].test_cases];
      updatedTestCases[testIndex] = { ...updatedTestCases[testIndex], [field]: value };
      updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], test_cases: updatedTestCases };
      setEditedData({ ...editedData, steps: updatedSteps });
    }
  };

  const addTestCase = (stepIndex: number) => {
    if (editedData) {
      const updatedSteps = [...editedData.steps];
      const newTestCase: TestCase = { input: '', expected_output: '' };
      updatedSteps[stepIndex] = {
        ...updatedSteps[stepIndex],
        test_cases: [...updatedSteps[stepIndex].test_cases, newTestCase]
      };
      setEditedData({ ...editedData, steps: updatedSteps });
    }
  };

  const deleteTestCase = (stepIndex: number, testIndex: number) => {
    if (editedData) {
      const updatedSteps = [...editedData.steps];
      const updatedTestCases = updatedSteps[stepIndex].test_cases.filter((_, idx) => idx !== testIndex);
      updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], test_cases: updatedTestCases };
      setEditedData({ ...editedData, steps: updatedSteps });
    }
  };

  const handleAccept = async () => {
    // Use edited data if available, otherwise use original
    const dataToSave = isEditing ? editedData : experimentData;
    
    if (!dataToSave) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const subjectId = window.location.pathname.split('/')[3];
      
      const experimentPayload = {
        title: dataToSave.experiment_title,
        description: `${dataToSave.experiment_title} - ${dataToSave.total_steps} steps in ${dataToSave.language}`,
        language: dataToSave.language,
        subjectId: subjectId,
        steps: dataToSave.steps,
        pdfUrl: (searchParams.get('pdfUrl') || ''),
        videoUrl: (searchParams.get('videoUrl') || ''),
      };

      console.log('💾 Saving experiment with', experimentPayload.steps?.length || 0, 'steps');
      console.log('📝 Payload structure:', {
        hasTitle: !!experimentPayload.title,
        hasDescription: !!experimentPayload.description,
        hasLanguage: !!experimentPayload.language,
        hasSubjectId: !!experimentPayload.subjectId,
        stepsIsArray: Array.isArray(experimentPayload.steps),
        stepsCount: experimentPayload.steps?.length
      });
      
      if (experimentPayload.steps && experimentPayload.steps.length > 0) {
        console.log('📝 First step preview:', {
          step_no: experimentPayload.steps[0].step_no,
          title: experimentPayload.steps[0].title,
          hasInstruction: !!experimentPayload.steps[0].instruction,
          testCasesCount: experimentPayload.steps[0].test_cases?.length
        });
      }
      
      const response = await fetch('/api/experiments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experimentPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Server error:', errorData);
        throw new Error(errorData.error || 'Failed to save experiment');
      }

      const result = await response.json();
      console.log('✅ Experiment saved successfully:', result);

      // Success - redirect to subject page
      router.push(`/dashboard/subject/${subjectId}`);
    } catch (error) {
      console.error('Error saving experiment:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save experiment');
      setIsSaving(false);
    }
  };

  const handleReject = () => {
    router.back();
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

  // Use editedData if in editing mode, otherwise use experimentData
  const displayData = isEditing && editedData ? editedData : experimentData;

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
              
              {/* Edit/Save Button */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className={`flex items-center px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} ${themeClasses.textPrimary} rounded-lg hover:${themeClasses.hoverBorder} transition-colors`}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Experiment Summary */}
          <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 mb-6`}>
            {isEditing && editedData ? (
              <input
                type="text"
                value={editedData.experiment_title}
                onChange={(e) => updateTitle(e.target.value)}
                className={`text-2xl font-bold ${themeClasses.textPrimary} mb-4 w-full bg-transparent border-b-2 ${themeClasses.borderPrimary} focus:border-orange-500 outline-none px-2 py-1`}
              />
            ) : (
              <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-4`}>
                {displayData.experiment_title}
              </h2>
            )}
            <div className="flex gap-6">
              <div>
                <span className={`text-sm ${themeClasses.textMuted}`}>Language:</span>
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                  {displayData.language}
                </span>
              </div>
              <div>
                <span className={`text-sm ${themeClasses.textMuted}`}>Total Steps:</span>
                <span className={`ml-2 font-semibold ${themeClasses.textPrimary}`}>
                  {displayData.total_steps}
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-6">
            {displayData.steps.map((step, stepIndex) => {
              const isStepEditing = isEditing && editingSteps.has(step.step_no);
              return (
                <div
                  key={step.step_no}
                  className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg overflow-hidden`}
                >
                  {/* Step Header */}
                  <div className={`flex items-center justify-between p-4`}>
                    <div 
                      onClick={() => toggleStep(step.step_no)}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full font-semibold text-sm">
                        {step.step_no}
                      </div>
                      {isStepEditing ? (
                        <input
                          type="text"
                          value={editedData?.steps[stepIndex].title}
                          onChange={(e) => updateStepField(stepIndex, 'title', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className={`font-semibold ${themeClasses.textPrimary} flex-1 bg-transparent border-b ${themeClasses.borderPrimary} focus:border-orange-500 outline-none px-2 py-1`}
                        />
                      ) : (
                        <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                          {step.title}
                        </h3>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing && (
                        <button
                          onClick={() => toggleStepEdit(step.step_no)}
                          className={`p-2 rounded ${isStepEditing ? 'bg-orange-500 text-white' : `${themeClasses.bgTertiary} ${themeClasses.textMuted}`} hover:bg-orange-500 hover:text-white transition-colors`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => toggleStep(step.step_no)}>
                        {expandedSteps.has(step.step_no) ? (
                          <ChevronUp className={`w-5 h-5 ${themeClasses.textMuted}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${themeClasses.textMuted}`} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step Content */}
                  {expandedSteps.has(step.step_no) && (
                    <div className={`p-4 border-t ${themeClasses.borderPrimary}`}>
                      {/* Instruction */}
                      <div className="mb-4">
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                          Instruction:
                        </h4>
                        {isStepEditing ? (
                          <textarea
                            value={editedData?.steps[stepIndex].instruction}
                            onChange={(e) => updateStepField(stepIndex, 'instruction', e.target.value)}
                            className={`w-full text-sm ${themeClasses.textSecondary} ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-3 focus:border-orange-500 outline-none min-h-[100px]`}
                          />
                        ) : (
                          <p className={`text-sm ${themeClasses.textSecondary}`}>
                            {step.instruction}
                          </p>
                        )}
                      </div>

                      {/* Starter Code */}
                      <div className="mb-4">
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                          Starter Code:
                        </h4>
                        {isStepEditing ? (
                          <textarea
                            value={editedData?.steps[stepIndex].starter_code}
                            onChange={(e) => updateStepField(stepIndex, 'starter_code', e.target.value)}
                            className={`w-full text-sm font-mono ${themeClasses.textPrimary} ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 focus:border-orange-500 outline-none min-h-[150px]`}
                          />
                        ) : (
                          <pre className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 overflow-x-auto`}>
                            <code className={`text-sm ${themeClasses.textPrimary}`}>
                              {step.starter_code}
                            </code>
                          </pre>
                        )}
                      </div>

                      {/* Solution Code */}
                      <div className="mb-4">
                        <h4 className={`text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                          Solution Code:
                        </h4>
                        {isStepEditing ? (
                          <textarea
                            value={editedData?.steps[stepIndex].solution_code}
                            onChange={(e) => updateStepField(stepIndex, 'solution_code', e.target.value)}
                            className={`w-full text-sm font-mono ${themeClasses.textPrimary} ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 focus:border-orange-500 outline-none min-h-[150px]`}
                          />
                        ) : (
                          <pre className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4 overflow-x-auto`}>
                            <code className={`text-sm ${themeClasses.textPrimary}`}>
                              {step.solution_code}
                            </code>
                          </pre>
                        )}
                      </div>

                      {/* Test Cases */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                            Test Cases ({step.test_cases.length}):
                          </h4>
                          {isStepEditing && (
                            <button
                              onClick={() => addTestCase(stepIndex)}
                              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              Add Test Case
                            </button>
                          )}
                        </div>
                        <div className="space-y-2">
                          {step.test_cases.map((testCase, testIndex) => (
                            <div
                              key={testIndex}
                              className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-3`}
                            >
                              {isStepEditing ? (
                                <div className="space-y-3">
                                  <div className="flex items-start gap-2">
                                    <div className="flex-1 space-y-2">
                                      <div>
                                        <label className={`text-xs font-medium ${themeClasses.textMuted} block mb-1`}>
                                          Input:
                                        </label>
                                        <textarea
                                          value={editedData?.steps[stepIndex].test_cases[testIndex].input}
                                          onChange={(e) => updateTestCase(stepIndex, testIndex, 'input', e.target.value)}
                                          className={`w-full text-sm ${themeClasses.textSecondary} bg-background border ${themeClasses.borderPrimary} rounded p-2 focus:border-orange-500 outline-none`}
                                          rows={2}
                                        />
                                      </div>
                                      <div>
                                        <label className={`text-xs font-medium ${themeClasses.textMuted} block mb-1`}>
                                          Expected Output:
                                        </label>
                                        <textarea
                                          value={editedData?.steps[stepIndex].test_cases[testIndex].expected_output}
                                          onChange={(e) => updateTestCase(stepIndex, testIndex, 'expected_output', e.target.value)}
                                          className={`w-full text-sm ${themeClasses.textSecondary} bg-background border ${themeClasses.borderPrimary} rounded p-2 focus:border-orange-500 outline-none`}
                                          rows={2}
                                        />
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => deleteTestCase(stepIndex, testIndex)}
                                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                      title="Delete test case"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
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
                              )}
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

          {/* Action Buttons */}
          <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 sticky bottom-6`}>
            {saveError && (
              <div className="mb-4 px-4 py-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-300">{saveError}</p>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={handleAccept}
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Accept & Create Experiment
                  </>
                )}
              </button>
              <button
                onClick={handleReject}
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
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
