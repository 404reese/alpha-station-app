import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Experiment from '@/models/Experiment';
import Subject from '@/models/Subject';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET all experiments for a subject (only visible to teacher creator and collaborators)
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

    // Get the subject to check if user is owner or collaborator
    const subject = await Subject.findById(subjectId).lean();

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

    // Check if user is teacher/owner or collaborator
    const isOwner = subject.teacherId === decoded.userId;
    const isCollaborator = subject.collaborators.includes(user.email);

    if (!isOwner && !isCollaborator) {
      return NextResponse.json(
        { error: 'Unauthorized to view experiments for this subject' },
        { status: 403 }
      );
    }

    // Get experiments for this subject
    const experiments = await Experiment.find({ subjectId })
      .sort({ createdAt: -1 })
      .lean();

    // Transform _id to id for frontend
    const transformedExperiments = experiments.map(exp => ({
      id: exp._id.toString(),
      title: exp.title,
      description: exp.description,
      language: exp.language,
      subjectId: exp.subjectId,
      teacherId: exp.teacherId,
      createdAt: exp.createdAt,
    }));

    return NextResponse.json({
      success: true,
      experiments: transformedExperiments,
    });
  } catch (error) {
    console.error('Get experiments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create a new experiment
export async function POST(request: NextRequest) {
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

    // Only teachers can create experiments
    if (decoded.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { title, description, language, subjectId, steps, pdfUrl, videoUrl } = await request.json();

    console.log('📥 Received experiment data:', { 
      title, 
      language,
      subjectId,
      stepsCount: steps?.length,
      stepsIsArray: Array.isArray(steps),
      hasSteps: !!steps
    });
    
    if (steps && steps.length > 0) {
      console.log('📋 First step structure:', {
        step_no: steps[0].step_no,
        title: steps[0].title,
        hasInstruction: !!steps[0].instruction,
        hasStarterCode: !!steps[0].starter_code,
        hasSolutionCode: !!steps[0].solution_code,
        testCasesCount: steps[0].test_cases?.length
      });
    }

    if (!title || !description || !language || !subjectId || !steps || !Array.isArray(steps) || steps.length === 0) {
      console.error('❌ Validation failed:', { title, description, language, subjectId, stepsIsArray: Array.isArray(steps), stepsLength: steps?.length });
      return NextResponse.json(
        { error: 'Title, description, language, subjectId, and at least one step are required' },
        { status: 400 }
      );
    }

    // Verify the subject exists and user has access
    const subject = await Subject.findById(subjectId).lean();
    
    if (!subject) {
      return NextResponse.json(
        { error: 'Subject not found' },
        { status: 404 }
      );
    }

    // Get user email for collaborator check
    const user = await User.findById(decoded.userId).select('email').lean();
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const isOwner = subject.teacherId === decoded.userId;
    const isCollaborator = subject.collaborators.includes(user.email);

    if (!isOwner && !isCollaborator) {
      return NextResponse.json(
        { error: 'Unauthorized to create experiments for this subject' },
        { status: 403 }
      );
    }

    // Create new experiment
    const experiment = await Experiment.create({
      title,
      description,
      language,
      subjectId,
      teacherId: decoded.userId,
      steps,
      pdfUrl,
      videoUrl,
    });

    console.log('✅ Experiment created successfully with', steps?.length || 0, 'steps');

    return NextResponse.json({
      success: true,
      experiment: {
        id: experiment._id.toString(),
        title: experiment.title,
        description: experiment.description,
        language: experiment.language,
        subjectId: experiment.subjectId,
        teacherId: experiment.teacherId,
        steps: steps,
        pdfUrl: experiment.pdfUrl,
        videoUrl: experiment.videoUrl,
        createdAt: experiment.createdAt,
      },
    });
  } catch (error) {
    console.error('Create experiment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE an experiment
export async function DELETE(request: NextRequest) {
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

    if (decoded.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const experimentId = searchParams.get('id');

    if (!experimentId) {
      return NextResponse.json(
        { error: 'Experiment ID is required' },
        { status: 400 }
      );
    }

    // Get the experiment first
    const experiment = await Experiment.findById(experimentId).lean();

    if (!experiment) {
      return NextResponse.json(
        { error: 'Experiment not found' },
        { status: 404 }
      );
    }

    // Only the creator (teacher who created it) can delete
    if (experiment.teacherId !== decoded.userId) {
      return NextResponse.json(
        { error: 'Only the experiment creator can delete it' },
        { status: 403 }
      );
    }

    // Delete experiment
    await Experiment.findByIdAndDelete(experimentId);

    return NextResponse.json({
      success: true,
      message: 'Experiment deleted successfully',
    });
  } catch (error) {
    console.error('Delete experiment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
