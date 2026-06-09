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
          <svg viewBox="0 0 100 125" className={styles.logoIcon} fill="currentColor">
            {/* Top-Left Triangle */}
            <polygon points="18,28 49,10 49,46" />
            {/* Top-Right Parallelogram */}
            <polygon points="51,11 85,31 85,67 51,47" />
            {/* Middle Parallelogram */}
            <polygon points="18,34 85,73 85,91 18,52" />
            {/* Bottom-Left Parallelogram */}
            <polygon points="18,58 49,76 49,112 18,94" />
            {/* Bottom-Right Triangle */}
            <polygon points="85,97 51,77 51,113" />
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
