import { NextResponse } from 'next/server';
import connectDB from "@/lib/config/db";
import ContactModel from "@/lib/models/ContactModel";

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { fullName, email, company, phone, job, source } = body;
        
        // Check if request body exists
        if (!body) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Request body is required" 
                },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!email || !fullName || !phone) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Email, full name and phone are required fields" 
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Please enter a valid email address" 
                },
                { status: 400 }
            );
        }

        // Create new contact using ContactModel
        const newContact = new ContactModel({ 
            fullName, 
            email, 
            company: company || undefined, 
            phone, 
            job,
            source
        });
        await newContact.save();

        return NextResponse.json(
            { 
                success: true, 
                message: "Contact form submitted successfully",
                data: newContact
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form submission failed:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: "Failed to submit contact form",
                error: error.message 
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const contacts = await ContactModel.find().sort({ createdAt: -1 });
        return NextResponse.json(
            { 
                success: true, 
                data: contacts
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: "Failed to fetch contacts",
                error: error.message 
            },
            { status: 500 }
        );
    }
}
