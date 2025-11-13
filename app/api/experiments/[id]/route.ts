import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Experiment from '@/models/Experiment';
import Subject from '@/models/Subject';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET a single experiment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: experimentId } = await params;

    // Get the experiment
    const experiment = await Experiment.findById(experimentId).lean();

    if (!experiment) {
      return NextResponse.json(
        { error: 'Experiment not found' },
        { status: 404 }
      );
    }

    // Get the subject to check access rights
    const subject = await Subject.findById(experiment.subjectId).lean();

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject not found' },
        { status: 404 }
      );
    }

    // Get user to check email for collaborator access
    const user = await User.findById(decoded.userId).select('email').lean();
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has access (teacher/owner, collaborator, or student)
    const isOwner = subject.teacherId === decoded.userId;
    const isCollaborator = subject.collaborators.includes(user.email);
    const isStudent = decoded.role === 'student';

    // Teachers and collaborators can see all details
    // Students can only see experiments from subjects they have access to
    if (!isOwner && !isCollaborator && !isStudent) {
      return NextResponse.json(
        { error: 'Unauthorized to view this experiment' },
        { status: 403 }
      );
    }

    // Return experiment with all details
    return NextResponse.json({
      success: true,
      experiment: {
        id: experiment._id.toString(),
        experiment_title: experiment.title,
        description: experiment.description,
        language: experiment.language,
        subjectId: experiment.subjectId,
        teacherId: experiment.teacherId,
        total_steps: experiment.steps.length,
        steps: experiment.steps,
        pdfUrl: experiment.pdfUrl,
        videoUrl: experiment.videoUrl,
        createdAt: experiment.createdAt,
        updatedAt: experiment.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get experiment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
