
import connectDB from '@/lib/config/db';
import Experience from '@/lib/models/ExperienceModel';
import { NextResponse } from 'next/server';




  const loadDB = async()=>{
    await connectDB();
}
loadDB();


export async function POST(request) {
  try {
 
    
    const { company, position, duration, description } = await request.json();

    const newExperience = new Experience({
      company,
      position,
      duration,
      description
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
