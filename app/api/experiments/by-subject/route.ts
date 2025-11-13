import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Experiment from '@/models/Experiment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET experiments for a subject (student view - limited data)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    // Get experiments for this subject
    const experiments = await Experiment.find({ subjectId })
      .sort({ createdAt: -1 })
      .lean();

    // Return limited data for students (no solutions)
    const transformedExperiments = experiments.map(exp => ({
      id: exp._id.toString(),
      experiment_title: exp.title,
      description: exp.description,
      language: exp.language,
      subjectId: exp.subjectId,
      total_steps: exp.steps.length,
      pdfUrl: exp.pdfUrl,
      videoUrl: exp.videoUrl,
    }));

    return NextResponse.json({
      success: true,
      experiments: transformedExperiments,
    });
  } catch (error) {
    console.error('Get experiments for subject error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
