import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '../lib/prisma';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, ShieldCheck, Zap, Award, Calendar, Clock } from 'lucide-react';
import styles from './page.module.css';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { rating: 'desc' },
  });

  const posts = await prisma.post.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>تجهیزات و لایسنس‌های تخصصی IT</span>
            <h2 className={styles.heroTitle}>سخت‌افزار صنعتی و لایسنس‌های اورجینال با سیدآی‌تی</h2>
            <p className={styles.heroSubtitle}>
              ارائه‌دهنده معتبر لپ‌تاپ‌های مهندسی ThinkPad، اسکنرهای بیومتریک اثر انگشت Suprema و لایسنس‌های قانونی ESET با ضمانت اصالت و پشتیبانی فنی ۲۴ ساعته.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products" className={styles.heroPrimaryBtn}>
                مشاهده کاتالوگ محصولات
              </Link>
              <Link href="/blog" className={styles.heroSecondaryBtn}>
                مقالات و وبلاگ آموزشی
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      {/* Trust Badges */}
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

      {/* Categories Grid */}
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

      {/* Featured Products */}
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

      {/* Recent Blog Posts */}
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
    </div>
  );
}
