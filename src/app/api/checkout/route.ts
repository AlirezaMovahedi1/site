import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items } = body;

    if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      return NextResponse.json({ error: 'اطلاعات ارسالی ناقص است.' }, { status: 400 });
    }

    // Process order in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the Order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: shippingAddress || null,
          totalAmount: items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
          isPaid: true, // Simulate payment successful
        },
      });

      // 2. Create Order Items and update inventory
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
        });

        // Get product to check if it's physical and has inventory
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (product && product.type === 'PHYSICAL' && product.inventory !== null) {
          const newInventory = product.inventory - item.quantity;
          if (newInventory < 0) {
            throw new Error(`موجودی کالا ${product.name} کافی نیست.`);
          }
          await tx.product.update({
            where: { id: product.id },
            data: { inventory: newInventory },
          });
        }
      }

      return newOrder;
    });

    return NextResponse.json({ success: true, orderId: order.id, totalAmount: order.totalAmount });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'خطا در ثبت سفارش.' }, { status: 500 });
  }
}
