import connectDB from '@/lib/config/db';
import Experience from '@/lib/models/ExperienceModel';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Experience ID is required' },
      { status: 400 }
    );
  }

  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: experience },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch experience' },
      { status: 500 }
    );
  }
} 