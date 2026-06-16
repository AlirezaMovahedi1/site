import React from 'react';
import { BookOpen } from 'lucide-react';
import styles from './blog.module.css';

export const metadata = {
  title: 'وبلاگ آموزشی و مقالات | سیدی آی‌تی',
  description: 'آخرین مقالات آموزشی، راهنمای خرید و بررسی‌های تخصصی سخت‌افزار، امنیت شبکه و بیومتریک در وبلاگ سیدی آی‌تی.',
};

export default function BlogPage() {
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>وبلاگ آموزشی سیدی آی‌تی</h2>
        <p className={styles.pageSubtitle}>بروزترین مقالات تخصصی، راهنمای خرید سخت‌افزار و مطالب امنیت شبکه</p>
      </header>

      <div className={styles.noPosts}>
        <BookOpen size={48} className={styles.noPostsIcon} />
        <h3>وبلاگ به زودی راه‌اندازی می‌شود.</h3>
        <p>به زودی مقالات جدیدی در این بخش قرار خواهد گرفت.</p>
      </div>
    </div>
  );
}
