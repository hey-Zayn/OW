import { NextResponse } from "next/server";
import EmailModel from "../../../lib/models/EmailModel";
import connectDB from "../../../lib/config/db";


const loadDB = async()=>{
    await connectDB();
}
loadDB();

export async function POST(request) {
    try {
        
        
        const { email } = await request.json();
        
        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingEmail = await EmailModel.findOne({ email });
        if (existingEmail) {
            return NextResponse.json(
                { success: false, message: "Email already subscribed" },
                { status: 400 }
            );
        }

        // Create new email subscription
        const newEmail = await EmailModel.create({ email });

        return NextResponse.json(
            { 
                success: true, 
                message: "Email subscribed successfully",
                data: newEmail
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error subscribing email:", error);
        return NextResponse.json(
            { success: false, message: "Failed to subscribe email" },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        const emails = await EmailModel.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json(
            { 
                success: true, 
                emails 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch subscriptions" },
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Email ID is required" },
                { status: 400 }
            );
        }

        const deletedEmail = await EmailModel.findByIdAndDelete(id);

        if (!deletedEmail) {
            return NextResponse.json(
                { success: false, message: "Subscription not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: "Subscription removed successfully" 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting subscription:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete subscription" },
            { status: 500 }
        );
    }
}
