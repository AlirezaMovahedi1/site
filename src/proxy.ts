import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

function addCorsHeaders(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get('origin') || '*';
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS Preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(request, response);
  }

  // 1. Bypass auth check for public admin authentication endpoints
  if (pathname.startsWith('/api/admin/auth/')) {
    const response = NextResponse.next();
    return addCorsHeaders(request, response);
  }

  // 2. Authenticate admin request
  let token = '';

  // Try extracting token from Authorization header first
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // Fallback to cookie
  if (!token) {
    token = request.cookies.get('admin_session')?.value || '';
  }

  if (!token) {
    const response = NextResponse.json(
      { error: 'دسترسی غیرمجاز. توکن نشست یافت نشد.' },
      { status: 401 }
    );
    return addCorsHeaders(request, response);
  }

  const payload = await verifyToken(token);
  if (!payload) {
    const response = NextResponse.json(
      { error: 'نشست کاربری نامعتبر یا منقضی شده است.' },
      { status: 401 }
    );
    // Delete the cookie if it existed
    response.cookies.delete('admin_session');
    return addCorsHeaders(request, response);
  }

  // Token is valid, proceed
  const response = NextResponse.next();
  return addCorsHeaders(request, response);
}

// Intercept all admin API endpoints
export const config = {
  matcher: ['/api/admin/:path*'],
};
