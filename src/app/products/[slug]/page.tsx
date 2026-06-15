import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import AddToCartSection from '../../../components/AddToCartSection';
import { Star, ShieldCheck, Truck, RefreshCw, Download, Award } from 'lucide-react';
import styles from './product-details.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: 'محصول یافت نشد | سیدی آی‌تی مارکت',
    };
  }

  return {
    title: `${product.name} | سیدی آی‌تی مارکت`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  // Parse specifications
  let specsObj: Record<string, string> = {};
  try {
    specsObj = JSON.parse(product.specs);
  } catch (e) {
    console.error('Failed to parse product specifications', e);
  }

  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.breadcrumb}>
        <a href="/">خانه</a>
        <span> / </span>
        <a href="/products">محصولات</a>
        <span> / </span>
        <a href={`/products?category=${product.category.slug}`}>{product.category.name}</a>
        <span> / </span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      <div className={styles.mainSection}>
        {/* Product Image */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          </div>
        </div>

        {/* Product Details Info */}
        <div className={styles.infoColumn}>
          <div className={styles.typeBadgeContainer}>
            {product.type === 'PHYSICAL' ? (
              <span className={`${styles.typeBadge} ${styles.typePhysical}`}>سخت‌افزار فیزیکی</span>
            ) : (
              <span className={`${styles.typeBadge} ${styles.typeDigital}`}>لایسنس دیجیتال - تحویل آنی</span>
            )}
          </div>

          <h2 className={styles.title}>{product.name}</h2>

          <div className={styles.metaRow}>
            <div className={styles.rating}>
              <Star className={styles.starIcon} size={18} />
              <span>{product.rating.toFixed(1)} از ۵</span>
            </div>
            <span className={styles.categoryName}>دسته‌بندی: {product.category.name}</span>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.price}>{formattedPrice}</span>
            <span className={styles.currency}>تومان</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <AddToCartSection product={product as any} />

          {/* Value Props List */}
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <ShieldCheck className={styles.featureIcon} />
              <div>
                <h5>ضمانت اصالت و سلامت</h5>
                <p>۱۰۰٪ اورجینال با تضمین بازگشت وجه در صورت مغایرت</p>
              </div>
            </div>
            {product.type === 'PHYSICAL' ? (
              <div className={styles.featureItem}>
                <Truck className={styles.featureIcon} />
                <div>
                  <h5>ارسال اکسپرس و بیمه کالا</h5>
                  <p>ارسال فوری با بسته‌بندی ایمن و ضربه‌گیر به سراسر کشور</p>
                </div>
              </div>
            ) : (
              <div className={styles.featureItem}>
                <Download className={styles.featureIcon} />
                <div>
                  <h5>ارسال آنی کد لایسنس</h5>
                  <p>تحویل بلافاصله پس از پرداخت به ایمیل و پنل کاربری شما</p>
                </div>
              </div>
            )}
            <div className={styles.featureItem}>
              <RefreshCw className={styles.featureIcon} />
              <div>
                <h5>پشتیبانی فنی متخصصان</h5>
                <p>پشتیبانی نصب، فعال‌سازی و راه‌اندازی توسط تیم پشتیبانی سیدی آی‌تی</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Details */}
      <section className={styles.specsSection}>
        <h3 className={styles.sectionTitle}>
          <Award size={22} className={styles.sectionIcon} />
          مشخصات فنی کالا
        </h3>
        <table className={styles.specsTable}>
          <tbody>
            {Object.entries(specsObj).map(([key, val]) => (
              <tr key={key}>
                <td className={styles.specName}>{key}</td>
                <td className={styles.specValue}>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
