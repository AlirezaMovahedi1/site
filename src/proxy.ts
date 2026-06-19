import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow login page, but redirect to /admin if already logged in
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_session')?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Protect all other /admin routes
  const token = request.cookies.get('admin_session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    // If token is invalid or expired, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_session');
    return response;
  }

  return NextResponse.next();
}

// Only match routes starting with /admin
export const config = {
  matcher: ['/admin/:path*'],
};
