
import connectDB from '@/lib/config/db';
import Experience from '@/lib/models/ExperienceModel';
import { NextResponse } from 'next/server';




  const loadDB = async()=>{
    await connectDB();
}
loadDB();


export async function POST(request) {
  try {
    const { company, position, duration, description, skills, location } = await request.json();

    const newExperience = new Experience({
      company,
      position,
      duration,
      description, // No character limit validation needed
      location: location || '', // Initialize location with empty string if not provided
      skills: skills || [] // Initialize skills with empty array if not provided
    });

    await newExperience.save();

    return NextResponse.json(
      { message: 'Experience added successfully', experience: newExperience },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding experience:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to add experience' },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Experiences fetched successfully',
        data: experiences 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'Failed to fetch experiences' 
      },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Experience ID is required' },
        { status: 400 }
      );
    }

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Experience deleted successfully',
        data: deletedExperience 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'Failed to delete experience' 
      },
      { status: 500 }
    );
  }
}



export async function PUT(request) {
  try {
    const { id, company, position, location, duration, description, skills } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Experience ID is required' },
        { status: 400 }
      );
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { company, position, location, duration, description, skills },
      { new: true }
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Experience updated successfully',
        data: updatedExperience 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'Failed to update experience' 
      },
      { status: 500 }
    );
  }
}
