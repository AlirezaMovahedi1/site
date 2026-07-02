import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '../lib/prisma';
import ProductCard from '../components/ProductCard';
import HomeSlider from '../components/HomeSlider';
import SpecialOffers from '../components/SpecialOffers';
import { ArrowLeft, ShieldCheck, Zap, Award, Calendar, Clock } from 'lucide-react';
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'settings.json');
const defaultSettings = {
  showBanners: true,
  showFeatures: true,
  showCategories: true,
  showProducts: true,
  showBlog: true,
  banners: []
};

function getSettings() {
  try {
    if (!fs.existsSync(settingsFilePath)) {
      return defaultSettings;
    }
    const data = fs.readFileSync(settingsFilePath, 'utf-8');
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (e) {
    return defaultSettings;
  }
}

export default async function Home() {
  const settings = getSettings();
  
  // Notary Office Products query
  let products;
  if (settings.notaryProductIds && settings.notaryProductIds.length > 0) {
    products = await prisma.product.findMany({
      where: {
        id: { in: settings.notaryProductIds }
      },
      include: {
        category: true,
      }
    });
    // Preserve manual sorting order from settings
    const notaryOrder = settings.notaryProductIds || [];
    products.sort((a, b) => notaryOrder.indexOf(a.id) - notaryOrder.indexOf(b.id));
  } else {
    products = await prisma.product.findMany({
      where: {
        category: {
          slug: {
            in: ['notary-office-equipment', 'fingerprint-scanner', 'signature-pad', 'security-token']
          }
        }
      },
      take: 3,
      orderBy: { rating: 'desc' },
    });
  }

  let posts;
  if (settings.blogPostsAuto !== false) {
    posts = await prisma.post.findMany({
      take: 2,
      orderBy: { createdAt: 'desc' },
    });
  } else {
    const selectedPostIds = settings.blogPostIds || [];
    posts = await prisma.post.findMany({
      where: {
        id: { in: selectedPostIds }
      }
    });
    // Keep manual selection order
    posts.sort((a, b) => selectedPostIds.indexOf(a.id) - selectedPostIds.indexOf(b.id));
  }

  const sharedOfferEnd = new Date();
  sharedOfferEnd.setDate(sharedOfferEnd.getDate() + 1);
  sharedOfferEnd.setHours(sharedOfferEnd.getHours() + 2);
  sharedOfferEnd.setMinutes(sharedOfferEnd.getMinutes() + 6);
  sharedOfferEnd.setSeconds(sharedOfferEnd.getSeconds() + 11);

  // Special Offers logic
  let dbProductsForOffers;
  let isMocked = false;

  if (settings.specialOffersAuto !== false) {
    // Auto mode: fetch products marked as special offer
    const realSpecialCount = await prisma.product.count({
      where: { isSpecialOffer: true }
    });

    if (realSpecialCount > 0) {
      dbProductsForOffers = await prisma.product.findMany({
        where: { isSpecialOffer: true },
        include: {
          category: true,
        }
      });
      // Sort by discount percentage descending: (price - specialPrice) / price
      dbProductsForOffers.sort((a, b) => {
        const discountA = (a.price - (a.specialPrice || a.price)) / a.price;
        const discountB = (b.price - (b.specialPrice || b.price)) / b.price;
        return discountB - discountA;
      });
    } else {
      isMocked = true;
      dbProductsForOffers = await prisma.product.findMany({
        take: 5,
        include: {
          category: true,
        },
        orderBy: { rating: 'desc' },
      });
    }
  } else {
    // Manual mode: fetch only specified products
    const selectedIds = settings.specialOffersProductIds || [];
    dbProductsForOffers = await prisma.product.findMany({
      where: {
        id: { in: selectedIds }
      },
      include: {
        category: true,
      }
    });
    // Preserve manual sorting order from settings
    dbProductsForOffers.sort((a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id));
  }

  const specialOffers = dbProductsForOffers.map((prod, idx) => {
    return {
      ...prod,
      isSpecialOffer: true,
      specialPrice: isMocked 
        ? Math.round(prod.price * (0.8 + (idx * 0.03))) 
        : (prod.specialPrice || prod.price),
      specialOfferEnd: prod.specialOfferEnd || sharedOfferEnd,
    };
  });

  return (
    <div className={styles.home}>
      {/* Home Image Slideshow */}
      {settings.showBanners && (
        <div className="container" style={{ marginTop: '24px', marginBottom: '8px' }}>
          <HomeSlider slides={settings.banners && settings.banners.length > 0 ? settings.banners : undefined} />
        </div>
      )}

      {/* Special Offers Section */}
      {settings.showSpecialOffers && (
        <SpecialOffers products={specialOffers} />
      )}

      {/* About Seyedi IT Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContent}>
            <h3 className={styles.sectionTitle}>{settings.aboutTitle || 'درباره سیدی آی‌تی'}</h3>
            <p className={styles.aboutParagraph}>
              {settings.aboutText || 'مجموعه سیدی آی‌تی به عنوان مرجع تخصصی ارائه خدمات فناوری و سخت‌افزاری به دفاتر اسناد رسمی و ازدواج در سراسر کشور فعالیت می‌کند. ما تلاش می‌کنیم تا با تکیه بر دانش فنی و شناخت دقیق نیازهای این حوزه، بستری یکپارچه برای رفع تمام نیازهای رایانه‌ای و اداری شما فراهم سازیم. از مشاوره و تأمین پیشرفته‌ترین تجهیزات سخت‌افزاری بیومتریک تا ارائه لایسنس‌های نرم‌افزاری معتبر و آموزش‌های کاربردی، همگی با ضمانت کیفیت و پشتیبانی دائم در سیدی آی‌تی ارائه شوند. در همین راستا، شما می‌توانید خدماتی همچون تأمین و راه‌اندازی تجهیزات مدرن و سخت‌افزارهای تخصصی اداری، ارائه لایسنس‌های اورجینال و نرم‌افزارهای کاربردی دفاتر، آموزش‌های تخصصی و کاربردی ویژه سردفتران و کارکنان، و همچنین پشتیبانی فنی و شبکه‌ای مستمر و سریع را از ما دریافت کنید.'}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      {settings.showFeatures && (
        <section className={styles.features}>
          <div className={`container ${styles.featuresContainer}`}>
            <div className={styles.featureCard}>
              <Award className={styles.featureIcon} />
              <h4>ضمانت ۱۰۰٪ اصالت</h4>
              <p>تمامی لایسنس‌ها و قطعات سخت‌افزاری به صورت اورجینال ارائه می‌شوند.</p>
            </div>
            <div className={styles.featureCard}>
              <ShieldCheck className={styles.featureIcon} />
              <h4>پشتیبانی فنی تخصصی</h4>
              <p>تیم متخصصان ما در مراحل نصب، راه‌اندازی و کانفیگ در کنار شما هستند.</p>
            </div>
            <div className={styles.featureCard}>
              <Zap className={styles.featureIcon} />
              <h4>ارسال فوری و ایمن</h4>
              <p>تحویل آنی لایسنس‌های دیجیتال و ارسال سریع سخت‌افزارها با پست پیشتاز.</p>
            </div>
          </div>
        </section>
      )}



      {/* Notary Office Products */}
      {settings.showProducts && (
        <section className={`${styles.section} ${styles.bgSecondary}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>محصولات دفترخانه‌ای</h3>
              <Link href="/products?category=notary-office-equipment" className={styles.seeAllLink}>
                مشاهده همه محصولات دفترخانه‌ای <ArrowLeft size={16} />
              </Link>
            </div>
            <div className={styles.productsGrid}>
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Blog Posts */}
      {settings.showBlog && (
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>آخرین مطالب وبلاگ آموزشی</h3>
              <Link href="/blog" className={styles.seeAllLink}>
                مشاهده همه مقالات <ArrowLeft size={16} />
              </Link>
            </div>
            <div className={styles.blogGrid}>
              {posts.map((post) => {
                const formattedDate = new Intl.DateTimeFormat('fa-IR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(post.createdAt);

                return (
                  <article key={post.id} className={styles.blogCard}>
                    <div className={styles.blogImageWrapper}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.blogImage}
                      />
                    </div>
                    <div className={styles.blogContent}>
                      <div className={styles.blogMeta}>
                        <span className={styles.blogMetaItem}>
                          <Calendar size={14} /> {formattedDate}
                        </span>
                        <span className={styles.blogMetaItem}>
                          <Clock size={14} /> {post.readTime}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h4 className={styles.blogTitle}>{post.title}</h4>
                      </Link>
                      <p className={styles.blogSummary}>{post.summary}</p>
                      <Link href={`/blog/${post.slug}`} className={styles.blogLink}>
                        ادامه مطلب <ArrowLeft size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
