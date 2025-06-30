import { NextResponse } from 'next/server';
import { verify } from '@tsndr/cloudflare-worker-jwt';

const JWT_SECRET = "your-secret-key-here-must-be-at-least-32-chars";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin')) {
    // Get token from cookies
    const token = request.cookies.get('authToken')?.value;
    
    console.log('Middleware - Token from cookies:', token ? 'exists' : 'missing');
    
    if (!token) {
      console.log('Redirecting to login - no token');
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }

    try {
      // Verify token
      const isValid = await verify(token, JWT_SECRET);
      
      if (!isValid) {
        console.log('Redirecting to login - invalid token');
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
      }
      
      console.log('Token verified - allowing access');
      return NextResponse.next();
      
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};