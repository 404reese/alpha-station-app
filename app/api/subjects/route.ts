import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Subject from '@/models/Subject';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// GET all subjects for the logged-in teacher
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

    // Only teachers can access
    if (decoded.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get subjects for this teacher
    const subjects = await Subject.find({ teacherId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    // Transform _id to id for frontend
    const transformedSubjects = subjects.map(subject => ({
      id: subject._id.toString(),
      subjectName: subject.subjectName,
      className: subject.className,
      collaborators: subject.collaborators,
      icon: subject.icon,
      createdAt: subject.createdAt,
    }));

    return NextResponse.json({
      success: true,
      subjects: transformedSubjects,
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create a new subject
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

    // Only teachers can create subjects
    if (decoded.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { subjectName, className, collaborators, icon } = await request.json();

    if (!subjectName || !className) {
      return NextResponse.json(
        { error: 'Subject name and class name are required' },
        { status: 400 }
      );
    }

    // Create new subject
    const subject = await Subject.create({
      subjectName,
      className,
      collaborators: collaborators || [],
      icon: icon || 'beaker',
      teacherId: decoded.userId,
    });

    return NextResponse.json({
      success: true,
      subject: {
        id: subject._id.toString(),
        subjectName: subject.subjectName,
        className: subject.className,
        collaborators: subject.collaborators,
        icon: subject.icon,
        createdAt: subject.createdAt,
      },
    });
  } catch (error) {
    console.error('Create subject error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a subject
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
    const subjectId = searchParams.get('id');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    // Delete subject (only if it belongs to the teacher)
    const result = await Subject.findOneAndDelete({
      _id: subjectId,
      teacherId: decoded.userId,
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Subject not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subject deleted successfully',
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
