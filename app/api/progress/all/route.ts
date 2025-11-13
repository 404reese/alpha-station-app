import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import StudentProgress from '@/models/StudentProgress';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET all progress for current student
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

    // Get all progress records for this student
    const progressRecords = await StudentProgress.find({
      userId: decoded.userId,
    }).lean();

    // Create a map of experimentId -> progress
    const progressMap: { [key: string]: any } = {};
    
    progressRecords.forEach((record) => {
      progressMap[record.experimentId] = {
        completedSteps: record.completedSteps,
        isCompleted: record.isCompleted,
        lastAccessedStep: record.lastAccessedStep,
        updatedAt: record.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      progressMap,
    });
  } catch (error) {
    console.error('Get all progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
