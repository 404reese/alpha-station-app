"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Plus,
  Beaker,
  X,
  Loader2
} from 'lucide-react';
import { AppLayout, getThemeClasses } from '../../../../components/layout';
import { useTheme } from '../../../../components/providers/ThemeProvider';
import { CreateExperimentModal } from '../../../../components/dashboard/CreateExperimentModal';
import { useAuth } from '@/contexts/AuthContext';

interface Experiment {
  id: string;
  title: string;
  description: string;
  language: string;
}



export default function SubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const { user, loading } = useAuth();
  
  const subjectId = params.id as string;
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Protect route - only teachers can access
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && user.role !== 'teacher') {
      if (user.role === 'superadmin') {
        router.push('/admin');
      } else if (user.role === 'student') {
        router.push('/student');
      }
    }
  }, [user, loading, router]);

  // Fetch experiments from API
  useEffect(() => {
    if (user && user.role === 'teacher' && subjectId) {
      fetchExperiments();
    }
  }, [user, subjectId]);

  const fetchExperiments = async () => {
    try {
      setDataLoading(true);
      const response = await fetch(`/api/experiments?subjectId=${subjectId}`);
      if (response.ok) {
        const data = await response.json();
        setExperiments(data.experiments);
      } else {
        setError('Failed to load experiments');
      }
    } catch (err) {
      setError('Error loading experiments');
    } finally {
      setDataLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
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

  const handleCreateExperiment = async (experiment: Omit<Experiment, 'id'>) => {
    try {
      const response = await fetch('/api/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...experiment,
          subjectId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setExperiments([data.experiment, ...experiments]);
        setShowCreateModal(false);
        setError('');
      } else {
        setError('Failed to create experiment');
      }
    } catch (err) {
      setError('Error creating experiment');
    }
  };

  const handleDeleteExperiment = async (id: string) => {
    try {
      const response = await fetch(`/api/experiments?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExperiments(experiments.filter(exp => exp.id !== id));
        setError('');
      } else {
        setError('Failed to delete experiment');
      }
    } catch (err) {
      setError('Error deleting experiment');
    }
  };

  return (
    <AppLayout activePage="Dashboard" showFooter={true}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className={`flex items-center ${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors mb-4`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-2`}>
                  Subject Details
                </h1>
                <p className={`${themeClasses.textMuted}`}>
                  Manage experiments and assignments for this subject
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Experiment
              </button>
            </div>
          </div>

          {/* Experiments Grid */}
          {dataLoading ? (
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-12 text-center`}>
              <Loader2 className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4 animate-spin`} />
              <p className={themeClasses.textMuted}>Loading experiments...</p>
            </div>
          ) : experiments.length === 0 ? (
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-12 text-center`}>
              <Beaker className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4`} />
              <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>No experiments yet</h3>
              <p className={`${themeClasses.textMuted} mb-6`}>Create your first experiment to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Experiment
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {experiments.map((experiment, index) => (
                <div
                  key={experiment.id}
                  className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4 ${themeClasses.hoverBorder} transition-all hover:shadow-md group`}
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <div className={`flex items-center justify-center w-10 h-10 ${themeClasses.bgTertiary} rounded-lg flex-shrink-0`}>
                      <span className={`font-semibold ${themeClasses.textPrimary}`}>
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${themeClasses.textPrimary} mb-1`}>
                        {experiment.title}
                      </h3>
                      <p className={`text-sm ${themeClasses.textMuted} line-clamp-1`}>
                        {experiment.description}
                      </p>
                    </div>
                    
                    {/* Language Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 flex-shrink-0">
                      {experiment.language}
                    </span>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button 
                        onClick={() => router.push(`/dashboard/subject/${subjectId}/experiment/${experiment.id}`)}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium px-3 py-1"
                      >
                        Open →
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteExperiment(experiment.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-all p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Experiment Modal */}
      <CreateExperimentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateExperiment}
      />
    </AppLayout>
  );
}
