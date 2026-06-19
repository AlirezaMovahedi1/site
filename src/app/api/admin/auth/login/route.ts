import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { verifyPassword } from '../../../../../lib/password';
import { signToken } from '../../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'نام کاربری و رمز عبور الزامی است.' },
        { status: 400 }
      );
    }

    // 1. Fetch admin user
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'نام کاربری یا رمز عبور اشتباه است.' },
        { status: 401 }
      );
    }

    // 2. Verify password
    const isPasswordValid = verifyPassword(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'نام کاربری یا رمز عبور اشتباه است.' },
        { status: 401 }
      );
    }

    // 3. Generate session payload and sign it
    const sessionLength = 2 * 60 * 60 * 1000; // 2 hours
    const expiresAt = Date.now() + sessionLength;

    const token = await signToken({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      exp: expiresAt,
    });

    // 4. Create response and set cookie
    const response = NextResponse.json({
      success: true,
      name: admin.name,
    });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60, // 2 hours in seconds
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'خطایی در سرور رخ داده است.' },
      { status: 500 }
    );
  }
}
