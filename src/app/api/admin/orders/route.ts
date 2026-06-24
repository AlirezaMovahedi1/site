import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت سفارشات رخ داده است.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, isPaid, customerName, customerPhone, shippingAddress } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'شناسه سفارش الزامی است.' },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        isPaid: isPaid !== undefined ? isPaid : undefined,
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        shippingAddress: shippingAddress !== undefined ? shippingAddress : undefined,
      }
    });

    return NextResponse.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Order PUT error:', error);
    return NextResponse.json(
      { error: 'خطایی در بروزرسانی سفارش رخ داده است.' },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
