import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();
    const ticketsCount = await prisma.ticket.count();

    const orders = await prisma.order.findMany({
      select: { totalAmount: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return NextResponse.json({
      success: true,
      stats: {
        productsCount,
        ordersCount,
        ticketsCount,
        totalRevenue,
      }
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت آمار رخ داده است.' },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
