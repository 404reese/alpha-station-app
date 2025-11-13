"use client";

import { useState } from "react";
import { mockExperiments, subjects } from "./data/experiments";
import { useRouter } from "next/navigation";
import { BookOpen, Code, ChevronRight, Beaker, Clock, Play } from "lucide-react";
import { AppLayout, getThemeClasses } from "../../components/layout";
import { useTheme } from "../../components/providers/ThemeProvider";

export default function StudentDashboard() {
  const router = useRouter();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Recent experiments (showing last 3 for demo)
  const recentExperiments = mockExperiments.slice(0, 3);

  const filteredExperiments = selectedSubject
    ? mockExperiments.filter((exp) => exp.subject === selectedSubject)
    : mockExperiments;

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentExperiments.map((experiment) => (
                <div
                  key={experiment.id}
                  onClick={() => router.push(`/student/experiment/${experiment.id}`)}
                  className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4 cursor-pointer transition-all hover:border-orange-500 hover:shadow-lg group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-medium rounded">
                      {experiment.language.toUpperCase()}
                    </span>
                    <Play className={`w-4 h-4 ${themeClasses.textMuted} group-hover:text-orange-500 transition-all`} />
                  </div>
                  <h3 className={`text-base font-semibold ${themeClasses.textPrimary} mb-2 group-hover:text-orange-500 transition-colors line-clamp-2`}>
                    {experiment.experiment_title}
                  </h3>
                  <p className={`text-xs ${themeClasses.textMuted} mb-3`}>{experiment.subject}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${themeClasses.textMuted}`}>
                      Step 1/{experiment.total_steps}
                    </span>
                    <span className="text-orange-500 text-xs font-medium">Continue →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse by Subject */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4 flex items-center gap-2`}>
              <BookOpen className="w-5 h-5" />
              Browse by Subject
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  onClick={() => {
                    const subjectExperiments = mockExperiments.filter(exp => exp.subject === subject.name);
                    if (subjectExperiments.length > 0) {
                      setSelectedSubject(subject.name);
                      // Scroll to experiments section
                      setTimeout(() => {
                        document.getElementById('experiments-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-5 cursor-pointer transition-all hover:border-orange-500 hover:shadow-lg group`}
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
                {filteredExperiments.map((experiment) => (
                  <div
                    key={experiment.id}
                    onClick={() => router.push(`/student/experiment/${experiment.id}`)}
                    className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4 cursor-pointer transition-all hover:border-orange-500 hover:shadow-md group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0`}>
                          <Code className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-base font-semibold ${themeClasses.textPrimary} group-hover:text-orange-500 transition-colors`}>
                              {experiment.experiment_title}
                            </h3>
                            <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-xs font-medium rounded">
                              {experiment.language.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={themeClasses.textMuted}>{experiment.subject}</span>
                            <span className={themeClasses.textMuted}>•</span>
                            <span className={themeClasses.textMuted}>{experiment.total_steps} steps</span>
                          </div>
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
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Start Coding
                        </button>
                        <ChevronRight className={`w-5 h-5 ${themeClasses.textMuted} group-hover:text-orange-500 group-hover:translate-x-1 transition-all`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
