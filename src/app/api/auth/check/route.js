import { NextResponse } from 'next/server';
import { verify } from '@tsndr/cloudflare-worker-jwt';

const JWT_SECRET = "your-secret-key-here-must-be-at-least-32-chars";

export async function GET(request) {
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
        return NextResponse.json(
            { isAuthenticated: false, message: "No token found" },
            { status: 401 }
        );
    }

    try {
        const isValid = await verify(token, JWT_SECRET);
        return NextResponse.json({
            isAuthenticated: isValid,
            message: isValid ? "Token is valid" : "Token is invalid"
        });
    } catch (error) {
        return NextResponse.json(
            { isAuthenticated: false, message: error.message },
            { status: 401 }
        );
    }
}