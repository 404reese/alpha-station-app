"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Code, ChevronRight, Beaker, Clock, Play, Loader2, CheckCircle } from "lucide-react";
import { AppLayout, getThemeClasses } from "../../components/layout";
import { useTheme } from "../../components/providers/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

interface Subject {
  id: string;
  name: string;
  className: string;
  icon: string;
  experimentCount: number;
}

interface Experiment {
  id: string;
  experiment_title: string;
  description: string;
  language: string;
  subjectId: string;
  total_steps: number;
  pdfUrl?: string;
  videoUrl?: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const { user, loading: authLoading } = useAuth();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<{ [key: string]: any }>({});

  // Protect route - only students can access
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (!authLoading && user && user.role !== 'student') {
      if (user.role === 'teacher') {
        router.push('/dashboard');
      } else if (user.role === 'superadmin') {
        router.push('/admin');
      }
    }
  }, [user, authLoading, router]);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects/student');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }

        const data = await response.json();
        setSubjects(data.subjects);
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load subjects');
      }
    };

    if (user && user.role === 'student') {
      fetchSubjects();
    }
  }, [user]);

  // Fetch all experiments
  useEffect(() => {
    const fetchAllExperiments = async () => {
      try {
        setLoading(true);
        const allExperiments: Experiment[] = [];

        // Fetch experiments for each subject
        for (const subject of subjects) {
          const response = await fetch(`/api/experiments/by-subject?subjectId=${subject.id}`);
          
          if (response.ok) {
            const data = await response.json();
            // Add subject name to each experiment
            const experimentsWithSubject = data.experiments.map((exp: Experiment) => ({
              ...exp,
              subject: subject.name,
            }));
            allExperiments.push(...experimentsWithSubject);
          }
        }

        setExperiments(allExperiments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching experiments:', err);
        setError(err instanceof Error ? err.message : 'Failed to load experiments');
        setLoading(false);
      }
    };

    if (subjects.length > 0) {
      fetchAllExperiments();
    } else if (subjects.length === 0 && !authLoading) {
      setLoading(false);
    }
  }, [subjects, authLoading]);

  // Fetch student progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress/all');
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.progressMap) {
            setProgressMap(data.progressMap);
          }
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };

    if (user && user.role === 'student') {
      fetchProgress();
    }
  }, [user]);

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

  // Don't render if not authenticated or not a student
  if (!user || user.role !== 'student') {
    return null;
  }

  // Recent experiments (showing last 3)
  const recentExperiments = experiments.slice(0, 3);

  const filteredExperiments = selectedSubject
    ? experiments.filter((exp: any) => exp.subject === selectedSubject)
    : experiments;

  return (
    <AppLayout activePage="Coder" showFooter={true}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-2`}>
              Student Dashboard
            </h1>
            <p className={`${themeClasses.textMuted}`}>
              Continue your learning journey with hands-on experiments
            </p>
          </div>

          {/* Recent Experiments - Single Row */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${themeClasses.textPrimary} flex items-center gap-2`}>
                <Clock className="w-5 h-5" />
                Recent Experiments
              </h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : recentExperiments.length === 0 ? (
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-8 text-center`}>
                <p className={themeClasses.textMuted}>No experiments available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentExperiments.map((experiment: any) => {
                  const progress = progressMap[experiment.id];
                  const isCompleted = progress?.isCompleted || false;
                  const completedStepsCount = progress?.completedSteps?.length || 0;
                  const progressPercentage = experiment.total_steps > 0 
                    ? Math.round((completedStepsCount / experiment.total_steps) * 100) 
                    : 0;

                  return (
                    <div
                      key={experiment.id}
                      onClick={() => router.push(`/student/experiment/${experiment.id}`)}
                      className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4 cursor-pointer transition-all hover:border-orange-500 hover:shadow-lg group relative`}
                    >
                      {isCompleted && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-medium rounded">
                          {experiment.language.toUpperCase()}
                        </span>
                        {!isCompleted && (
                          <Play className={`w-4 h-4 ${themeClasses.textMuted} group-hover:text-orange-500 transition-all`} />
                        )}
                      </div>
                      <h3 className={`text-base font-semibold ${themeClasses.textPrimary} mb-2 group-hover:text-orange-500 transition-colors line-clamp-2`}>
                        {experiment.experiment_title}
                      </h3>
                      <p className={`text-xs ${themeClasses.textMuted} mb-3`}>{experiment.subject}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${themeClasses.textMuted}`}>
                            {completedStepsCount}/{experiment.total_steps} steps
                          </span>
                          <span className={`text-xs font-medium ${isCompleted ? 'text-green-500' : 'text-orange-500'}`}>
                            {progressPercentage}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-orange-500'} transition-all duration-300`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Browse by Subject */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4 flex items-center gap-2`}>
              <BookOpen className="w-5 h-5" />
              Browse by Subject
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : subjects.length === 0 ? (
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-8 text-center`}>
                <p className={themeClasses.textMuted}>No subjects available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => {
                      if (subject.experimentCount > 0) {
                        setSelectedSubject(subject.name);
                        // Scroll to experiments section
                        setTimeout(() => {
                          document.getElementById('experiments-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-5 cursor-pointer transition-all hover:border-orange-500 hover:shadow-lg group ${subject.experimentCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <BookOpen className={`w-8 h-8 ${themeClasses.textMuted} group-hover:text-orange-500 transition-colors`} />
                      <span className={`px-2 py-1 text-xs font-medium rounded ${themeClasses.bgTertiary} ${themeClasses.textMuted}`}>
                        {subject.experimentCount}
                      </span>
                    </div>
                    <h3 className={`text-base font-semibold ${themeClasses.textPrimary} mb-1 group-hover:text-orange-500 transition-colors`}>
                      {subject.name}
                    </h3>
                    <p className={`text-xs ${themeClasses.textMuted}`}>
                      {subject.experimentCount} {subject.experimentCount === 1 ? 'experiment' : 'experiments'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experiments Section */}
          <div id="experiments-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${themeClasses.textPrimary} flex items-center gap-2`}>
                <Code className="w-5 h-5" />
                {selectedSubject ? `${selectedSubject} - Experiments` : 'All Experiments'}
              </h2>
              {selectedSubject && (
                <button
                  onClick={() => setSelectedSubject(null)}
                  className={`text-sm ${themeClasses.textMuted} hover:text-orange-500 transition-colors`}
                >
                  View All
                </button>
              )}
            </div>
            {filteredExperiments.length === 0 ? (
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-12 text-center`}>
                <Beaker className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4`} />
                <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>No experiments available</h3>
                <p className={`${themeClasses.textMuted}`}>
                  No experiments available for this subject yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredExperiments.map((experiment: any) => {
                  const progress = progressMap[experiment.id];
                  const isCompleted = progress?.isCompleted || false;
                  const completedStepsCount = progress?.completedSteps?.length || 0;
                  const progressPercentage = experiment.total_steps > 0 
                    ? Math.round((completedStepsCount / experiment.total_steps) * 100) 
                    : 0;

                  return (
                    <div
                      key={experiment.id}
                      onClick={() => router.push(`/student/experiment/${experiment.id}`)}
                      className={`${themeClasses.bgSecondary} border ${isCompleted ? 'border-green-500/30' : themeClasses.borderPrimary} rounded-lg p-4 cursor-pointer transition-all hover:border-orange-500 hover:shadow-md group`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg ${isCompleted ? 'bg-green-500/10' : 'bg-orange-500/10'} flex items-center justify-center flex-shrink-0`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <Code className="w-6 h-6 text-orange-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`text-base font-semibold ${themeClasses.textPrimary} group-hover:text-orange-500 transition-colors`}>
                                {experiment.experiment_title}
                              </h3>
                              <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-xs font-medium rounded">
                                {experiment.language.toUpperCase()}
                              </span>
                              {isCompleted && (
                                <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded">
                                  Completed
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm mb-2">
                              <span className={themeClasses.textMuted}>{experiment.subject}</span>
                              <span className={themeClasses.textMuted}>•</span>
                              <span className={themeClasses.textMuted}>{completedStepsCount}/{experiment.total_steps} steps</span>
                              <span className={themeClasses.textMuted}>•</span>
                              <span className={`text-xs font-medium ${isCompleted ? 'text-green-500' : 'text-orange-500'}`}>
                                {progressPercentage}%
                              </span>
                            </div>
                            {!isCompleted && progressPercentage > 0 && (
                              <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-500 transition-all duration-300"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/student/experiment/${experiment.id}`);
                            }}
                            className={`px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} ${themeClasses.textPrimary} rounded-lg hover:border-orange-500 transition-colors text-sm font-medium`}
                          >
                            View Exp
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/student/experiment/${experiment.id}?tab=code`);
                            }}
                            className={`px-4 py-2 ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} text-white text-sm font-medium rounded-lg transition-colors`}
                          >
                            {isCompleted ? 'Review' : 'Start Coding'}
                          </button>
                          <ChevronRight className={`w-5 h-5 ${themeClasses.textMuted} group-hover:text-orange-500 group-hover:translate-x-1 transition-all`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
