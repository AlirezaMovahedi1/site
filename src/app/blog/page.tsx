import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '../../lib/prisma';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import styles from './blog.module.css';

export const metadata = {
  title: 'وبلاگ آموزشی و مقالات | سیدی آی‌تی',
  description: 'آخرین مقالات آموزشی، راهنمای خرید و بررسی‌های تخصصی سخت‌افزار، امنیت شبکه و بیومتریک در وبلاگ سیدی آی‌تی.',
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>وبلاگ آموزشی سیدی آی‌تی</h2>
        <p className={styles.pageSubtitle}>بروزترین مقالات تخصصی، راهنمای خرید سخت‌افزار و مطالب امنیت شبکه</p>
      </header>

      {posts.length === 0 ? (
        <div className={styles.noPosts}>
          <BookOpen size={48} className={styles.noPostsIcon} />
          <h3>هنوز مقاله‌ای منتشر نشده است.</h3>
          <p>به زودی مقالات جدیدی در این بخش قرار خواهد گرفت.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => {
            const formattedDate = new Intl.DateTimeFormat('fa-IR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(post.createdAt);

            return (
              <article key={post.id} className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.image}
                    />
                  </div>
                </Link>

                <div className={styles.content}>
                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      <Calendar size={14} />
                      <span>{formattedDate}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{post.title}</h3>
                  </Link>

                  <p className={styles.summary}>{post.summary}</p>

                  <Link href={`/blog/${post.slug}`} className={styles.readMoreBtn}>
                    ادامه مطلب و مطالعه
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
