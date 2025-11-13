import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Subject from '@/models/Subject';
import Experiment from '@/models/Experiment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET all subjects accessible to students (all subjects for now - can add enrollment logic later)
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

    // Only students should use this endpoint
    if (decoded.role !== 'student') {
      return NextResponse.json(
        { error: 'This endpoint is for students only' },
        { status: 403 }
      );
    }

    // Get all subjects (in the future, filter by student enrollment)
    const subjects = await Subject.find({})
      .sort({ createdAt: -1 })
      .lean();

    // For each subject, get the count of experiments
    const subjectsWithCounts = await Promise.all(
      subjects.map(async (subject) => {
        const experimentCount = await Experiment.countDocuments({ 
          subjectId: subject._id.toString() 
        });

        return {
          id: subject._id.toString(),
          name: subject.subjectName,
          className: subject.className,
          icon: subject.icon,
          experimentCount,
        };
      })
    );

    // Filter out subjects with no experiments
    const activeSubjects = subjectsWithCounts.filter(s => s.experimentCount > 0);

    return NextResponse.json({
      success: true,
      subjects: activeSubjects,
    });
  } catch (error) {
    console.error('Get student subjects error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
