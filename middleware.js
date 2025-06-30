import { NextResponse } from 'next/server';
import { verify } from '@tsndr/cloudflare-worker-jwt';

const JWT_SECRET = "your-secret-key-here-must-be-at-least-32-chars";

export async function middleware(request) {
  const { pathname, hostname } = request.nextUrl;
  
  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    // Get token from cookies
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    try {
      const isValid = await verify(token, JWT_SECRET);
      if (!isValid) throw new Error('Invalid token');
      
      return NextResponse.next();
    } catch (error) {
      // Clear invalid token
      const response = NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
      response.cookies.delete('authToken');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};