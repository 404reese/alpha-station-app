import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import StudentProgress from '@/models/StudentProgress';
import Experiment from '@/models/Experiment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET progress for an experiment
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    const { searchParams } = new URL(request.url);
    const experimentId = searchParams.get('experimentId');

    if (!experimentId) {
      return NextResponse.json(
        { error: 'Experiment ID is required' },
        { status: 400 }
      );
    }

    // Get or create progress
    let progress = await StudentProgress.findOne({
      userId: decoded.userId,
      experimentId,
    }).lean();

    if (!progress) {
      // Create initial progress record
      progress = await StudentProgress.create({
        userId: decoded.userId,
        experimentId,
        completedSteps: [],
        isCompleted: false,
        lastAccessedStep: 1,
      });
    }

    return NextResponse.json({
      success: true,
      progress: {
        completedSteps: progress.completedSteps,
        isCompleted: progress.isCompleted,
        lastAccessedStep: progress.lastAccessedStep,
      },
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST/PUT update progress
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    const { experimentId, completedSteps, lastAccessedStep } = await request.json();

    if (!experimentId) {
      return NextResponse.json(
        { error: 'Experiment ID is required' },
        { status: 400 }
      );
    }

    // Get the experiment to check total steps
    const experiment = await Experiment.findById(experimentId).lean();
    
    if (!experiment) {
      return NextResponse.json(
        { error: 'Experiment not found' },
        { status: 404 }
      );
    }

    const totalSteps = experiment.steps.length;
    const isCompleted = completedSteps.length === totalSteps;

    // Update or create progress
    const progress = await StudentProgress.findOneAndUpdate(
      {
        userId: decoded.userId,
        experimentId,
      },
      {
        completedSteps,
        lastAccessedStep: lastAccessedStep || 1,
        isCompleted,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      progress: {
        completedSteps: progress.completedSteps,
        isCompleted: progress.isCompleted,
        lastAccessedStep: progress.lastAccessedStep,
      },
    });
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
