import { NextResponse } from 'next/server';
import connectDB from "@/lib/config/db";
import ContactModel from "@/lib/models/ContactModel";

const loadDB = async() => {
    await connectDB();
}
loadDB();

export async function POST(request) {
    try {
        const { fullName, email, company, phone, job } = await request.json();
        
        if (!email || !fullName || !phone) {
            return NextResponse.json(
                { success: false, message: "Email, full name and phone are required fields" },
                { status: 400 }
            );
        }

        const newContact = await ContactModel.create({ 
            fullName, 
            email, 
            company, 
            phone, 
            job 
        });

        return NextResponse.json(
            { 
                success: true, 
                message: "Form submitted successfully",
                data: newContact
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Form submission failed:", error);
        return NextResponse.json(
            { success: false, message: "Failed to submit form" },
            { status: 500 }
        );
    }
}