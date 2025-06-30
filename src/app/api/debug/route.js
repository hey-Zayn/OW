// app/api/debug/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const token = request.cookies.get('authToken')?.value;
  return NextResponse.json({
    cookies: request.cookies.getAll(),
    tokenExists: !!token
  });
}