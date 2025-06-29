import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        
        // Validate input
        if (!email || !password) {
            return Response.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // In a real app, you would fetch user from database here
        const hardcodedUser = {
            email: "zaynobusiness@gmail.com",
            passwordHash: "$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq1LxH5XhWX7JYz7JYz7JYz7JYz7JY" // hash for "zain123456"
        };

        // Check if user exists
        if (email !== hardcodedUser.email) {
            return Response.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, hardcodedUser.passwordHash);
        if (!isPasswordValid) {
            return Response.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET || "sadfasdfojasdfhkajsdhlfaslflkj",
            { expiresIn: '1d' }
        );

        // Set cookie
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return new Response(JSON.stringify({ 
            success: true,
            token 
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ 
            success: false, 
            error: "Invalid credentials" 
        }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
