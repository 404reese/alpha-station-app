"use client";

import React, { useState, useRef } from 'react';
import { X, Loader2, Sparkles, Upload, File, Trash2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { getThemeClasses } from '../layout';
import { useRouter, usePathname } from 'next/navigation';

interface CreateExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experiment: {
    title: string;
    description: string;
    language: string;
  }) => void;
}

const languages = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'C++',
  'C',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'SQL',
  'HTML/CSS',
  'Other'
];

export function CreateExperimentModal({ isOpen, onClose, onSubmit }: CreateExperimentModalProps) {
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);
  const router = useRouter();
  const pathname = usePathname();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'Python',
    pdfUrl: '',
    videoUrl: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedPdf, setUploadedPdf] = useState<{ name: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('PDF file size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      const data = await response.json();
      setUploadedPdf({ name: file.name, url: data.url });
      setFormData({ ...formData, pdfUrl: data.url });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload PDF');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePdf = () => {
    setUploadedPdf(null);
    setFormData({ ...formData, pdfUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      // Call Gemini AI API
      const response = await fetch('/api/generate-experiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.title,
          description: formData.description,
          language: formData.language,
          pdfUrl: formData.pdfUrl,
          videoUrl: formData.videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate experiment');
      }

      const data = await response.json();
      
      // Navigate to review page with the generated data
      const subjectId = pathname.split('/')[3];
      const encodedData = encodeURIComponent(JSON.stringify(data));
      router.push(`/dashboard/subject/${subjectId}/review?data=${encodedData}`);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        language: 'Python',
        pdfUrl: '',
        videoUrl: ''
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      language: 'Python',
      pdfUrl: '',
      videoUrl: ''
    });
    setUploadedPdf(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className={`${themeClasses.bgSecondary} rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${themeClasses.borderPrimary}`}>
          <h2 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>
            Create New Experiment
          </h2>
          <button
            onClick={handleClose}
            className={`p-1 ${themeClasses.textMuted} hover:${themeClasses.textPrimary} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="px-4 py-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Binary Search Algorithm"
              className={`w-full px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary}`}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the experiment objectives and what students will learn..."
              rows={4}
              className={`w-full px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary} resize-none`}
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
              Programming Language <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className={`w-full px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary}`}
              required
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* PDF Upload */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
              Experiment Document (PDF)
            </label>
            
            {uploadedPdf ? (
              <div className={`${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center">
                      <File className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                        {uploadedPdf.name}
                      </p>
                      <p className={`text-xs ${themeClasses.textMuted}`}>
                        PDF uploaded successfully
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePdf}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label
                  htmlFor="pdf-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${themeClasses.borderPrimary} rounded-lg cursor-pointer hover:border-orange-500 transition-colors ${themeClasses.bgTertiary}`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-2" />
                      <p className={`text-sm ${themeClasses.textMuted}`}>Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className={`w-8 h-8 ${themeClasses.textMuted} mb-2`} />
                      <p className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                        Click to upload PDF
                      </p>
                      <p className={`text-xs ${themeClasses.textMuted} mt-1`}>
                        Max 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* YouTube Video URL */}
          <div>
            <label className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}>
              YouTube Video URL (Optional)
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${themeClasses.textPrimary}`}
            />
            <p className={`mt-1 text-xs ${themeClasses.textMuted}`}>
              Add a tutorial video to help students understand the experiment
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isGenerating || isUploading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate with AI
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isGenerating || isUploading}
              className={`px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} ${themeClasses.textPrimary} rounded-lg hover:${themeClasses.hoverBorder} transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
