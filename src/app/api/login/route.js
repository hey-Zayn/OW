import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sign } from '@tsndr/cloudflare-worker-jwt';
import UserModel from "@/lib/models/UserModel";
import connectDB from "@/lib/config/db";

connectDB();

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        
        // Input validation
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", success: false },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials", success: false },
                { status: 401 }
            );
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Invalid credentials", success: false },
                { status: 401 }
            );
        }
        const JWT_SECRET = "your-secret-key-here-must-be-at-least-32-chars";
        // Create token
        const token = await sign(
            { id: user._id.toString(), email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Create response
        const response = NextResponse.json(
            { message: "Login successful", success: true, user: { id: user._id, email: user.email } },
            { status: 200 }
        );

        // Set cookie with proper domain for Vercel
        const isProduction = process.env.NODE_ENV === 'production';
        response.cookies.set({
            name: "authToken",
            value: token,
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
            domain: isProduction ? 'ow-ten.vercel.app' : undefined
        });

        console.log('Login successful - cookie set');
        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}