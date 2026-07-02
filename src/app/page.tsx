import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '../lib/prisma';
import ProductCard from '../components/ProductCard';
import HomeSlider from '../components/HomeSlider';
import SpecialOffers from '../components/SpecialOffers';
import { ArrowLeft, ShieldCheck, Zap, Award, Calendar, Clock, Monitor, FileCode2, GraduationCap, Briefcase, LifeBuoy } from 'lucide-react';
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
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { rating: 'desc' },
  });

  const posts = await prisma.post.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' },
  });

  const sharedOfferEnd = new Date();
  sharedOfferEnd.setDate(sharedOfferEnd.getDate() + 1);
  sharedOfferEnd.setHours(sharedOfferEnd.getHours() + 2);
  sharedOfferEnd.setMinutes(sharedOfferEnd.getMinutes() + 6);
  sharedOfferEnd.setSeconds(sharedOfferEnd.getSeconds() + 11);

  const dbProductsForOffers = await prisma.product.findMany({
    take: 5,
    include: {
      category: true,
    },
    orderBy: { rating: 'desc' },
  });

  const specialOffers = dbProductsForOffers.map((prod, idx) => {
    return {
      ...prod,
      isSpecialOffer: true,
      specialPrice: Math.round(prod.price * (0.8 + (idx * 0.03))), // varying discounts (e.g. 20%, 17%, 14%...)
      specialOfferEnd: sharedOfferEnd,
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
      <SpecialOffers products={specialOffers} />

      {/* About Seyedi IT Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutTextSection}>
              <h3 className={styles.sectionTitle}>درباره سیدی آی‌تی</h3>
              <p className={styles.aboutParagraph}>
                سیدی آی‌تی خدمات دفترخانه اسناد رسمی کشور، با هدف ارائه خدمات جامع و تخصصی به دفاتر اسناد رسمی و ازدواج، پا به عرصه گذاشته است. ما با بهره‌گیری از تیمی متخصص و مجرب، در تلاشیم تا تمامی نیازهای شما عزیزان را در این حوزه برآورده سازیم. از تجهیزات مدرن و باکیفیت گرفته تا نرم‌افزارهای کاربردی و آموزش‌های تخصصی، همه چیز در ثبت رایانه برای شما فراهم است.
              </p>
              
              <h4 className={styles.aboutServicesTitle}>در سیدی آی‌تی، شما می‌توانید خدمات زیر را دریافت کنید:</h4>
              
              <div className={styles.servicesGrid}>
                <div className={styles.serviceItem}>
                  <Monitor className={styles.serviceIcon} />
                  <span className={styles.serviceLabel}>تجهیزات مدرن و باکیفیت</span>
                </div>
                <div className={styles.serviceItem}>
                  <FileCode2 className={styles.serviceIcon} />
                  <span className={styles.serviceLabel}>نرم‌افزارهای تخصصی</span>
                </div>
                <div className={styles.serviceItem}>
                  <GraduationCap className={styles.serviceIcon} />
                  <span className={styles.serviceLabel}>آموزش‌های تخصصی</span>
                </div>
                <div className={styles.serviceItem}>
                  <Briefcase className={styles.serviceIcon} />
                  <span className={styles.serviceLabel}>خدمات کاریابی</span>
                </div>
                <div className={styles.serviceItem} style={{ gridColumn: 'span 2' }}>
                  <LifeBuoy className={styles.serviceIcon} />
                  <span className={styles.serviceLabel}>پشتیبانی فنی</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutVisualSection}>
              <div className={styles.aboutImageWrapper}>
                <Image
                  src="/images/support_banner_v3.png"
                  alt="درباره سیدی آی‌تی"
                  fill
                  className={styles.aboutImage}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
            </div>
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

      {/* Categories Grid */}
      {settings.showCategories && (
        <section className={styles.section}>
          <div className="container">
            <h3 className={styles.sectionTitle}>دسته‌بندی‌های اصلی</h3>
            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIconWrapper}>💻</div>
                <h4>سخت‌افزار و تجهیزات اداری</h4>
                <p>لپ‌تاپ‌های مقاوم، اسکنرهای بیومتریک و قطعات شبکه</p>
                <Link href="/products?category=hardware-equipment" className={styles.categoryLink}>
                  مشاهده محصولات سخت‌افزاری <ArrowLeft size={16} />
                </Link>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIconWrapper}>🔑</div>
                <h4>نرم‌افزار و لایسنس‌های قانونی</h4>
                <p>آنتی‌ویروس، سیستم‌عامل و ابزارهای امنیتی اورجینال</p>
                <Link href="/products?category=software-licenses" className={styles.categoryLink}>
                  مشاهده لایسنس‌ها <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {settings.showProducts && (
        <section className={`${styles.section} ${styles.bgSecondary}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>محصولات برگزیده</h3>
              <Link href="/products" className={styles.seeAllLink}>
                مشاهده همه محصولات <ArrowLeft size={16} />
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
