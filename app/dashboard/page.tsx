"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Code, 
  Quote,
  ChevronRight,
  Plus,
  X,
  Users,
  BookOpen,
  GraduationCap,
  Mail,
  Trash2,
  Beaker,
  Database,
  Cpu,
  Brain,
  Network,
  Loader2
} from 'lucide-react';
import { AppLayout, getThemeClasses } from '../../components/layout';
import { useTheme } from '../../components/providers/ThemeProvider';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Subject {
  id: string;
  subjectName: string;
  className: string;
  collaborators: string[];
  icon: string;
}

const icons = [
  { value: 'beaker', label: 'Beaker', Icon: Beaker },
  { value: 'code', label: 'Code', Icon: Code },
  { value: 'database', label: 'Database', Icon: Database },
  { value: 'cpu', label: 'CPU', Icon: Cpu },
  { value: 'brain', label: 'Brain', Icon: Brain },
  { value: 'network', label: 'Network', Icon: Network }
];

const iconMap: { [key: string]: any } = {
  beaker: Beaker,
  code: Code,
  database: Database,
  cpu: Cpu,
  brain: Brain,
  network: Network
};



export default function TeacherDashboard() {
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const router = useRouter();
  const { user, loading } = useAuth();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: '',
    className: '',
    collaboratorEmail: '',
    icon: 'beaker'
  });
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Protect route - only teachers can access
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && user.role !== 'teacher') {
      // Redirect non-teachers to their appropriate dashboard
      if (user.role === 'superadmin') {
        router.push('/admin');
      } else if (user.role === 'student') {
        router.push('/student');
      }
    }
  }, [user, loading, router]);

  // Fetch subjects from API
  useEffect(() => {
    if (user && user.role === 'teacher') {
      fetchSubjects();
    }
  }, [user]);

  const fetchSubjects = async () => {
    try {
      setDataLoading(true);
      const response = await fetch('/api/subjects');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data.subjects);
      } else {
        setError('Failed to load subjects');
      }
    } catch (err) {
      setError('Error loading subjects');
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

  // Don't render dashboard if not authenticated or not a teacher
  if (!user || user.role !== 'teacher') {
    return null;
  }


  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subjectName && formData.className) {
      try {
        const response = await fetch('/api/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectName: formData.subjectName,
            className: formData.className,
            collaborators: [...collaborators],
            icon: formData.icon
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSubjects([data.subject, ...subjects]);
          setFormData({ subjectName: '', className: '', collaboratorEmail: '', icon: 'beaker' });
          setCollaborators([]);
          setShowCreateForm(false);
          setError('');
        } else {
          setError('Failed to create subject');
        }
      } catch (err) {
        setError('Error creating subject');
      }
    }
  };

  const addCollaborator = () => {
    if (formData.collaboratorEmail && !collaborators.includes(formData.collaboratorEmail)) {
      setCollaborators([...collaborators, formData.collaboratorEmail]);
      setFormData({ ...formData, collaboratorEmail: '' });
    }
  };

  const removeCollaborator = (email: string) => {
    setCollaborators(collaborators.filter(c => c !== email));
  };

  const deleteSubject = async (id: string) => {
    try {
      const response = await fetch(`/api/subjects?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubjects(subjects.filter(s => s.id !== id));
        setError('');
      } else {
        setError('Failed to delete subject');
      }
    } catch (err) {
      setError('Error deleting subject');
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-2`}>Teacher Dashboard</h1>
              <p className={`${themeClasses.textMuted}`}>Manage your subjects, classes, and collaborators</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Subject
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Create Subject Form */}
              {showCreateForm && (
                <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-6 mb-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>Create New Subject</h2>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className={`p-1 ${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleCreateSubject} className="space-y-4">
                    {/* Subject Name */}
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Subject Name
                      </label>
                      <div className="relative">
                        <BookOpen className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textMuted}`} />
                        <input
                          type="text"
                          value={formData.subjectName}
                          onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                          placeholder="e.g., Data Structures & Algorithms"
                          className={`w-full pl-10 pr-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary}`}
                          required
                        />
                      </div>
                    </div>

                    {/* Class Name */}
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Class Name
                      </label>
                      <div className="relative">
                        <GraduationCap className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textMuted}`} />
                        <input
                          type="text"
                          value={formData.className}
                          onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                          placeholder="e.g., CS-2024 Section A"
                          className={`w-full pl-10 pr-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary}`}
                          required
                        />
                      </div>
                    </div>

                    {/* Collaborators */}
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Add Collaborators (Optional)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textMuted}`} />
                          <input
                            type="email"
                            value={formData.collaboratorEmail}
                            onChange={(e) => setFormData({ ...formData, collaboratorEmail: e.target.value })}
                            placeholder="colleague@example.com"
                            className={`w-full pl-10 pr-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary}`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={addCollaborator}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {/* Collaborator List */}
                      {collaborators.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {collaborators.map((email) => (
                            <div
                              key={email}
                              className={`flex items-center justify-between px-3 py-2 ${themeClasses.bgTertiary} rounded-lg`}
                            >
                              <div className="flex items-center">
                                <Users className={`w-4 h-4 ${themeClasses.textMuted} mr-2`} />
                                <span className={`text-sm ${themeClasses.textPrimary}`}>{email}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCollaborator(email)}
                                className="text-red-500 hover:text-red-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Icon Selection */}
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
                        Icon <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {icons.map(({ value, label, Icon }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setFormData({ ...formData, icon: value })}
                            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                              formData.icon === value
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                : `${themeClasses.borderPrimary} ${themeClasses.bgTertiary} hover:${themeClasses.hoverBorder}`
                            }`}
                          >
                            <Icon 
                              className={`w-6 h-6 mb-1 ${
                                formData.icon === value ? 'text-orange-500' : themeClasses.textMuted
                              }`} 
                            />
                            <span className={`text-xs ${
                              formData.icon === value ? 'text-orange-600 dark:text-orange-400 font-medium' : themeClasses.textMuted
                            }`}>
                              {label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Create Subject
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false);
                          setFormData({ subjectName: '', className: '', collaboratorEmail: '', icon: 'beaker' });
                          setCollaborators([]);
                        }}
                        className={`px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} ${themeClasses.textPrimary} rounded-lg hover:${themeClasses.hoverBorder} transition-colors font-medium`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Subjects List */}
              <div className="mb-6">
                <h2 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4`}>My Subjects</h2>
                {dataLoading ? (
                  <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-12 text-center`}>
                    <Loader2 className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4 animate-spin`} />
                    <p className={themeClasses.textMuted}>Loading subjects...</p>
                  </div>
                ) : subjects.length === 0 ? (
                  <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-12 text-center`}>
                    <BookOpen className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4`} />
                    <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>No subjects yet</h3>
                    <p className={`${themeClasses.textMuted} mb-6`}>Create your first subject to get started</p>
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Subject
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjects.map((subject) => {
                      const IconComponent = iconMap[subject.icon] || BookOpen;
                      return (
                        <div
                          key={subject.id}
                          onClick={() => router.push(`/dashboard/subject/${subject.id}`)}
                          className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-5 ${themeClasses.hoverBorder} transition-all hover:shadow-lg cursor-pointer`}
                        >
                          <div className="flex items-start gap-4 mb-3">
                            {/* Icon */}
                            <div className={`flex items-center justify-center w-12 h-12 ${themeClasses.bgTertiary} rounded-lg flex-shrink-0`}>
                              <IconComponent className="w-6 h-6 text-orange-500" />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold ${themeClasses.textPrimary} mb-1`}>{subject.subjectName}</h3>
                              <p className={`text-sm ${themeClasses.textMuted} flex items-center`}>
                                <GraduationCap className="w-4 h-4 mr-1" />
                                {subject.className}
                              </p>
                            </div>
                            
                            {/* Delete button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSubject(subject.id);
                              }}
                              className="text-red-500 hover:text-red-600 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        
                        {subject.collaborators.length > 0 && (
                          <div className={`pt-3 border-t ${themeClasses.borderPrimary}`}>
                            <div className="flex items-center mb-2">
                              <Users className={`w-4 h-4 ${themeClasses.textMuted} mr-2`} />
                              <span className={`text-xs font-medium ${themeClasses.textMuted}`}>Collaborators</span>
                            </div>
                            <div className="space-y-1">
                              {subject.collaborators.map((email) => (
                                <p key={email} className={`text-xs ${themeClasses.textSecondary} pl-6`}>{email}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Inspirational Quote */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 text-white text-center">
                <Quote className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <blockquote className="text-lg font-medium mb-4">
                  "The art of teaching is the art of assisting discovery."
                </blockquote>
                <cite className="text-orange-100">- Mark Van Doren</cite>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                <h3 className={`text-base font-medium ${themeClasses.textPrimary} mb-4`}>Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${themeClasses.textMuted}`}>Total Subjects</span>
                    <span className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{subjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${themeClasses.textMuted}`}>Total Classes</span>
                    <span className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{subjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${themeClasses.textMuted}`}>Collaborators</span>
                    <span className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
                      {subjects.reduce((acc, s) => acc + s.collaborators.length, 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                <h3 className={`text-base font-medium ${themeClasses.textPrimary} mb-4`}>Quick Actions</h3>
                <div className="space-y-2">
                  <button className={`w-full flex items-center p-3 ${themeClasses.bgTertiary} rounded-lg hover:${themeClasses.hoverBgSecondary} transition-colors`}>
                    <FileText className="w-4 h-4 text-orange-500 mr-3" />
                    <span className={`text-sm ${themeClasses.textPrimary}`}>Upload Materials</span>
                  </button>
                  <button className={`w-full flex items-center p-3 ${themeClasses.bgTertiary} rounded-lg hover:${themeClasses.hoverBgSecondary} transition-colors`}>
                    <Code className="w-4 h-4 text-orange-500 mr-3" />
                    <span className={`text-sm ${themeClasses.textPrimary}`}>Create Assignment</span>
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                <Quote className="w-4 h-4 text-orange-500 mb-3" />
                <p className={`text-sm ${themeClasses.textSecondary} italic`}>"Teaching is the one profession that creates all other professions"</p>
              </div>

              {/* Announcements */}
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                <h3 className={`text-base font-medium ${themeClasses.textPrimary} mb-4`}>Announcements</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`text-sm font-medium ${themeClasses.textPrimary}`}>New Features Coming</h4>
                      <span className={`text-xs ${themeClasses.textSubtle} ml-2 flex-shrink-0`}>Nov 13</span>
                    </div>
                    <p className={`text-xs ${themeClasses.textMuted} mb-2`}>Grade tracking and analytics tools will be available soon</p>
                  </div>
                  <button className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                    View all announcements
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}