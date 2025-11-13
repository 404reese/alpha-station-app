"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Plus,
  Beaker,
  X
} from 'lucide-react';
import { AppLayout, getThemeClasses } from '../../../../components/layout';
import { useTheme } from '../../../../components/providers/ThemeProvider';
import { CreateExperimentModal } from '../../../../components/dashboard/CreateExperimentModal';

interface Experiment {
  id: string;
  title: string;
  description: string;
  language: string;
}

const dummyExperiments: { [key: string]: Experiment[] } = {
  '1': [
    {
      id: '1',
      title: 'Linked List Implementation',
      description: 'Implement singly and doubly linked lists with basic operations',
      language: 'Python'
    },
    {
      id: '2',
      title: 'Binary Search Tree',
      description: 'Create a BST with insertion, deletion, and traversal methods',
      language: 'C++'
    },
    {
      id: '3',
      title: 'Graph Algorithms',
      description: 'Implement DFS, BFS, and shortest path algorithms',
      language: 'Java'
    }
  ],
  '2': [
    {
      id: '4',
      title: 'Todo App with React',
      description: 'Build a full-featured todo application using React hooks',
      language: 'JavaScript'
    },
    {
      id: '5',
      title: 'REST API Development',
      description: 'Create a RESTful API with Express.js and MongoDB',
      language: 'JavaScript'
    }
  ],
  '3': [
    {
      id: '6',
      title: 'SQL Query Practice',
      description: 'Practice complex SQL queries with joins and subqueries',
      language: 'SQL'
    },
    {
      id: '7',
      title: 'Database Normalization',
      description: 'Normalize a database schema to 3NF',
      language: 'SQL'
    }
  ]
};

const subjectNames: { [key: string]: string } = {
  '1': 'Data Structures & Algorithms',
  '2': 'Web Development',
  '3': 'Database Management Systems'
};

export default function SubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  
  const subjectId = params.id as string;
  const [experiments, setExperiments] = useState<Experiment[]>(dummyExperiments[subjectId] || []);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateExperiment = (experiment: Omit<Experiment, 'id'>) => {
    const newExperiment: Experiment = {
      id: Date.now().toString(),
      ...experiment
    };
    setExperiments([...experiments, newExperiment]);
    setShowCreateModal(false);
  };

  const handleDeleteExperiment = (id: string) => {
    setExperiments(experiments.filter(exp => exp.id !== id));
  };

  return (
    <AppLayout activePage="Dashboard" showFooter={true}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
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
                  {subjectNames[subjectId] || 'Subject'}
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
          {experiments.length === 0 ? (
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
                      <button className="text-sm text-orange-600 hover:text-orange-700 font-medium px-3 py-1">
                        Open →
                      </button>
                      <button
                        onClick={() => handleDeleteExperiment(experiment.id)}
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
