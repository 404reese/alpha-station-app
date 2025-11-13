"use client";

import { FileText, Video } from "lucide-react";
import { getThemeClasses } from "@/components/layout";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ExperimentInfoProps {
  title: string;
  description?: string;
  pdfUrl?: string;
  videoUrl?: string;
  language: string;
  totalSteps: number;
}

export default function ExperimentInfo({
  title,
  description,
  pdfUrl,
  videoUrl,
  language,
  totalSteps,
}: ExperimentInfoProps) {
  const { isDark } = useTheme();
  const themeClasses = getThemeClasses(isDark);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <div className="h-full overflow-y-auto">
      {/* Header Section */}
      <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.borderPrimary} p-6`}>
        <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-3`}>
          {title}
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded">
            {language.toUpperCase()}
          </span>
          <span className={`text-sm ${themeClasses.textMuted}`}>
            {totalSteps} Steps
          </span>
        </div>
        {description && (
          <p className={`mt-4 ${themeClasses.textPrimary} leading-relaxed`}>
            {description}
          </p>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* YouTube Video Section */}
        {youtubeId && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Video className="w-5 h-5 text-orange-500" />
              <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
                Video Tutorial
              </h3>
            </div>
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg overflow-hidden`}>
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* PDF Section */}
        {pdfUrl && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-orange-500" />
              <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
                Experiment Document
              </h3>
            </div>
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg overflow-hidden`}>
              <iframe
                src={pdfUrl}
                className="w-full"
                style={{ height: "600px" }}
                title="Experiment PDF"
              />
            </div>
            <div className="mt-3 flex gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Open in New Tab
              </a>
              <a
                href={pdfUrl}
                download
                className={`px-4 py-2 ${themeClasses.bgTertiary} border ${themeClasses.borderPrimary} ${themeClasses.textPrimary} rounded-lg hover:border-orange-500 transition-colors text-sm font-medium`}
              >
                Download PDF
              </a>
            </div>
          </div>
        )}

        {/* No Content Message */}
        {!pdfUrl && !videoUrl && (
          <div className={`${themeClasses.bgSecondary} border ${themeClasses.borderPrimary} rounded-lg p-12 text-center`}>
            <FileText className={`w-12 h-12 ${themeClasses.textMuted} mx-auto mb-4`} />
            <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>
              No additional resources
            </h3>
            <p className={`${themeClasses.textMuted}`}>
              No PDF or video tutorial available for this experiment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
