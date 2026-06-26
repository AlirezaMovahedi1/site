import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      products,
      categories,
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت محصولات رخ داده است.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      specs,
      price,
      image,
      type,
      categoryId,
      downloadUrl,
      inventory,
      isSpecialOffer,
      specialPrice,
      specialOfferEnd,
    } = body;

    if (!name || !slug || !description || !price || !image || !type || !categoryId) {
      return NextResponse.json(
        { error: 'تمامی فیلدهای الزامی را تکمیل کنید.' },
        { status: 400 }
      );
    }

    // Verify category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      return NextResponse.json(
        { error: 'دسته‌بندی نامعتبر است.' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        specs: specs || '{}',
        price: parseFloat(price),
        image,
        type,
        categoryId,
        downloadUrl: downloadUrl || null,
        inventory: inventory !== undefined && inventory !== null ? parseInt(inventory) : null,
        isSpecialOffer: !!isSpecialOffer,
        specialPrice: specialPrice !== undefined && specialPrice !== null ? parseFloat(specialPrice) : null,
        specialOfferEnd: specialOfferEnd !== undefined && specialOfferEnd !== null ? new Date(specialOfferEnd) : null,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error('Product POST error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'محصولی با این نامک (Slug) از قبل وجود دارد.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'خطایی در ایجاد محصول رخ داده است.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      slug,
      description,
      specs,
      price,
      image,
      type,
      categoryId,
      downloadUrl,
      inventory,
      isSpecialOffer,
      specialPrice,
      specialOfferEnd,
    } = body;

    if (!id || !name || !slug || !description || !price || !image || !type || !categoryId) {
      return NextResponse.json(
        { error: 'تمامی فیلدهای الزامی را تکمیل کنید.' },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        specs: specs || '{}',
        price: parseFloat(price),
        image,
        type,
        categoryId,
        downloadUrl: downloadUrl || null,
        inventory: inventory !== undefined && inventory !== null ? parseInt(inventory) : null,
        isSpecialOffer: isSpecialOffer !== undefined ? !!isSpecialOffer : undefined,
        specialPrice: specialPrice !== undefined && specialPrice !== null ? parseFloat(specialPrice) : null,
        specialOfferEnd: specialOfferEnd !== undefined && specialOfferEnd !== null ? new Date(specialOfferEnd) : null,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Product PUT error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'محصولی با این نامک (Slug) از قبل وجود دارد.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'خطایی در بروزرسانی محصول رخ داده است.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'شناسه محصول الزامی است.' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'محصول با موفقیت حذف شد.' });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return NextResponse.json(
      { error: 'خطایی در حذف محصول رخ داده است.' },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
