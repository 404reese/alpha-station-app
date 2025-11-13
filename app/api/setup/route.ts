import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if any user exists
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      return NextResponse.json(
        { error: 'Setup already completed. Superadmin already exists.' },
        { status: 409 }
      );
    }

    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create superadmin user
    const superadmin = new User({
      email,
      password,
      role: 'superadmin',
      firstName: firstName || 'Super',
      lastName: lastName || 'Admin',
      isActive: true,
    });

    await superadmin.save();

    return NextResponse.json({
      success: true,
      message: 'Superadmin created successfully! You can now login.',
      user: {
        email: superadmin.email,
        role: superadmin.role,
      },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Check if setup is needed
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userCount = await User.countDocuments();

    return NextResponse.json({
      setupNeeded: userCount === 0,
    });
  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
