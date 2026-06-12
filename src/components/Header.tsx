'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const { cartCount } = useCart();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <svg viewBox="0 0 100 120" className={styles.logoIcon} fill="currentColor">
            {/* Top-Left Triangle */}
            <polygon points="18,28 49,10 49,46" />
            {/* Top-Right Triangle */}
            <polygon points="82,28 51,10 51,46" />
            {/* Middle Parallelogram (Thicker, smaller gaps) */}
            <polygon points="18,30 82,67 82,93 18,56" />
            {/* Bottom-Left Triangle */}
            <polygon points="18,94 49,112 49,76" />
            {/* Bottom-Right Triangle */}
            <polygon points="82,95 51,113 51,77" />
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
