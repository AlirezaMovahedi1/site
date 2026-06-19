import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Delete the admin session cookie by setting its expiry to path past
  response.cookies.set('admin_session', '', {
    path: '/',
    maxAge: 0,
  });
  
  return response;
}
