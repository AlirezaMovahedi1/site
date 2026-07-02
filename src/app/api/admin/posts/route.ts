import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    return NextResponse.json({ error: 'خطایی در دریافت مقالات رخ داد.' }, { status: 500 });
  }
}
