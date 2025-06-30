import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Create response
        const response = NextResponse.json(
            { 
                success: true, 
                message: "Logged out successfully" 
            },
            { status: 200 }
        );
        
        // Clear the auth token cookie with proper settings
        response.cookies.set({
            name: 'authToken',
            value: '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            domain: process.env.NODE_ENV === 'production' ? '.ow-ten.vercel.app' : undefined,
            expires: new Date(0) // Set to past date to expire immediately
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}