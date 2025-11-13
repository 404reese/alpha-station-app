"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '../../../components/layout';
import PDFViewer from '../components/PDFViewer';

export default function PDFViewerPage() {
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const title = searchParams.get('title') || 'PDF Document';
  const semester = searchParams.get('semester') || 'Unknown Semester';
  const subject = searchParams.get('subject') || 'Unknown Subject';
  const department = searchParams.get('department') || 'Unknown Department';
  const upvotes = parseInt(searchParams.get('upvotes') || '0');
  const views = parseInt(searchParams.get('views') || '0');
  const driveLink = searchParams.get('link') || '';

  if (!driveLink) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
            <p className="text-gray-600">No PDF link provided</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PDFViewer
        title={title}
        semester={semester}
        subject={subject}
        department={department}
        upvotes={upvotes}
        views={views}
        driveLink={driveLink}
      />
    </AppLayout>
  );
}