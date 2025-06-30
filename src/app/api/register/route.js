import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import connectDB from "@/lib/config/db";

connectDB();

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "Username, email and password are required", success: false },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Please enter a valid email address", success: false },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters", success: false },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return NextResponse.json(
                { 
                    message: existingUser.email === email 
                        ? "User with this email already exists" 
                        : "Username is already taken",
                    success: false 
                },
                { status: 409 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return NextResponse.json(
            { 
                message: "User registered successfully!",
                success: true,
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }
            },
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { 
                message: error.message || "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
}