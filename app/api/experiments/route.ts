import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Experiment from '@/models/Experiment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET all experiments for a subject
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

    // Transform _id to id for frontend
    const transformedExperiments = experiments.map(exp => ({
      id: exp._id.toString(),
      title: exp.title,
      description: exp.description,
      language: exp.language,
      subjectId: exp.subjectId,
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

    const { title, description, language, subjectId } = await request.json();

    if (!title || !description || !language || !subjectId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new experiment
    const experiment = await Experiment.create({
      title,
      description,
      language,
      subjectId,
      teacherId: decoded.userId,
    });

    return NextResponse.json({
      success: true,
      experiment: {
        id: experiment._id.toString(),
        title: experiment.title,
        description: experiment.description,
        language: experiment.language,
        subjectId: experiment.subjectId,
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

    // Delete experiment (only if it belongs to the teacher)
    const result = await Experiment.findOneAndDelete({
      _id: experimentId,
      teacherId: decoded.userId,
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Experiment not found or unauthorized' },
        { status: 404 }
      );
    }

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
