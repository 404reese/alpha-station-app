import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Middleware to verify superadmin
async function verifySuperAdmin(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    if (decoded.role !== 'superadmin') {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    return null;
  }
}

// GET - List all users
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const adminId = await verifySuperAdmin(request);
    if (!adminId) {
      return NextResponse.json(
        { error: 'Unauthorized. Superadmin access required.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    const filter: any = {};
    if (role && ['teacher', 'student'].includes(role)) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const adminId = await verifySuperAdmin(request);
    if (!adminId) {
      return NextResponse.json(
        { error: 'Unauthorized. Superadmin access required.' },
        { status: 403 }
      );
    }

    const { email, password, role, firstName, lastName } = await request.json();

    // Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    if (!['teacher', 'student'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be teacher or student' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      email,
      password,
      role,
      firstName,
      lastName,
      isActive: true,
    });

    await user.save();

    // Return user without password
    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const adminId = await verifySuperAdmin(request);
    if (!adminId) {
      return NextResponse.json(
        { error: 'Unauthorized. Superadmin access required.' },
        { status: 403 }
      );
    }

    const { userId, email, firstName, lastName, isActive, password } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Don't allow modifying superadmin
    if (user.role === 'superadmin') {
      return NextResponse.json(
        { error: 'Cannot modify superadmin account' },
        { status: 403 }
      );
    }

    // Update fields
    if (email) user.email = email;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (isActive !== undefined) user.isActive = isActive;
    if (password) user.password = password;

    await user.save();

    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const adminId = await verifySuperAdmin(request);
    if (!adminId) {
      return NextResponse.json(
        { error: 'Unauthorized. Superadmin access required.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Don't allow deleting superadmin
    if (user.role === 'superadmin') {
      return NextResponse.json(
        { error: 'Cannot delete superadmin account' },
        { status: 403 }
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
