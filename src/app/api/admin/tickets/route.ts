import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      tickets
    });
  } catch (error) {
    console.error('Tickets GET error:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت تیکت‌ها رخ داده است.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'شناسه تیکت و وضعیت الزامی است.' },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      ticket
    });
  } catch (error) {
    console.error('Ticket PUT error:', error);
    return NextResponse.json(
      { error: 'خطایی در بروزرسانی تیکت رخ داده است.' },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
