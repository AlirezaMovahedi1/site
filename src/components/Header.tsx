'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <svg viewBox="0 0 126 160" className={styles.logoIcon}>
            <path d="M23 25L60.5 3.34937L60.5 46.6506L23 25Z" fill="currentColor" />
            <path d="M60.6506 53.5L60.6506 96.8013L23.1506 75.1506L60.6506 53.5Z" fill="currentColor" />
            <path d="M101.5 24.6506L64 46.3013V3L101.5 24.6506Z" fill="currentColor" />
            <path d="M64.6506 53.5L102.151 75.1506L64.6506 96.8013L64.6506 53.5Z" fill="currentColor" />
            <path d="M103.651 78.5L103.651 121.801L66.1506 100.151L103.651 78.5Z" fill="currentColor" />
            <path d="M60.6506 103.5L60.6506 146.801L23.1506 125.151L60.6506 103.5Z" fill="currentColor" />
            <path d="M64.6506 103.5L102.151 125.151L64.6506 146.801L64.6506 103.5Z" fill="currentColor" />
            <path d="M21.6506 28.5L59.1506 50.1506L21.6506 71.8013L21.6506 28.5Z" fill="currentColor" />
          </svg>
          <div className={styles.logoText}>
            <h1>سیدآی‌تی مارکت</h1>
            <span>سخت‌افزار و لایسنس اورجینال</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>خانه</Link>
          <Link href="/products" className={styles.navLink}>محصولات</Link>
          <Link href="/blog" className={styles.navLink}>وبلاگ آموزشی</Link>
        </nav>

        <div className={styles.actions} style={{ gap: '12px', display: 'flex', alignItems: 'center' }}>
          <ThemeToggle />
          <Link href="/cart" className={styles.cartBtn} title="سبد خرید">
            <ShoppingCart className={styles.cartIcon} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
