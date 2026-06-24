import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, phone, department, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'نام، شماره تماس و متن پیام الزامی است.' },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.create({
      data: {
        name,
        phone,
        department: department || 'technical',
        message,
        status: 'new',
      },
    });

    return NextResponse.json(
      { success: true, ticket },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submit ticket error:', error);
    return NextResponse.json(
      { error: 'خطایی در سرور رخ داده است.' },
      { status: 500 }
    );
  }
}
