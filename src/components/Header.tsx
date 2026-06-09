'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Laptop } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <Laptop className={styles.logoIcon} />
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
