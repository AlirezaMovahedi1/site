'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronDown } from 'lucide-react';
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
          <div className={styles.navDropdownContainer}>
            <Link href="/products" className={styles.dropdownToggle}>
              <span>فروشگاه</span>
              <ChevronDown size={14} className={styles.chevronIcon} />
            </Link>
            <div className={styles.dropdownMenuGrid}>
              <Link href="/products?category=fingerprint-scanner" className={styles.dropdownItem}>اسکنر اثر انگشت</Link>
              <Link href="/products?category=signature-pad" className={styles.dropdownItem}>پد امضای دیجیتال</Link>
              <Link href="/products?category=printer-scanner" className={styles.dropdownItem}>پرینتر و اسکنر</Link>
              <Link href="/products?category=notary-office-equipment" className={styles.dropdownItem}>تجهیزات دفترخانه</Link>
              <Link href="/products?category=security-token" className={styles.dropdownItem}>توکن امنیتی</Link>
              <Link href="/products?category=copier-machine" className={styles.dropdownItem}>دستگاه کپی</Link>
              <Link href="/products?category=digital-goods" className={styles.dropdownItem}>کالای دیجیتال</Link>
              <Link href="/products?category=computer" className={styles.dropdownItem}>کامپیوتر</Link>
              <Link href="/products?category=laptop" className={styles.dropdownItem}>لپ‌تاپ</Link>
              <Link href="/products?category=network-cable" className={styles.dropdownItem}>کابل شبکه</Link>
              <Link href="/products?category=hub" className={styles.dropdownItem}>هاب و سوئیچ</Link>
              <Link href="/products?category=modem" className={styles.dropdownItem}>مودم و روتر</Link>
              <Link href="/products?category=keyboard-mouse" className={styles.dropdownItem}>کیبورد و ماوس</Link>
              <Link href="/products?category=webcam" className={styles.dropdownItem}>وبکم</Link>
              <Link href="/products?category=software-licenses" className={styles.dropdownItem}>لایسنس نرم‌افزار</Link>
              <Link href="/products?category=exam-samples" className={styles.dropdownItem}>نمونه سوالات</Link>
            </div>
          </div>
          <Link href="/tax-tools" className={styles.navLink}>ابزارهای مالیاتی</Link>
          <div className={styles.navDropdownContainer}>
            <button className={styles.dropdownToggle}>
              <span>آموزش</span>
              <ChevronDown size={14} className={styles.chevronIcon} />
            </button>
            <div className={styles.dropdownMenu}>
              <Link href="/training/activation-guide" className={styles.dropdownItem}>راهنمای نصب و فعال‌سازی</Link>
              <Link href="/training/hardware-guides" className={styles.dropdownItem}>آموزش‌های تخصصی سخت‌افزار</Link>
              <Link href="/training/tax-regulations" className={styles.dropdownItem}>مقالات و قوانین مالیاتی</Link>
            </div>
          </div>
          <div className={styles.navDropdownContainer}>
            <button className={styles.dropdownToggle}>
              <span>خدمات سازمانی</span>
              <ChevronDown size={14} className={styles.chevronIcon} />
            </button>
            <div className={styles.dropdownMenu}>
              <Link href="/services/server-rack" className={styles.dropdownItem}>خدمات سرور و رک</Link>
              <Link href="/services/web-design" className={styles.dropdownItem}>طراحی سایت</Link>
              <Link href="/services/it-support" className={styles.dropdownItem}>پشتیبانی آی تی</Link>
            </div>
          </div>
          <Link href="/blog" className={styles.navLink}>وبلاگ</Link>
          <Link href="/contact" className={styles.navLink}>تماس با ما</Link>
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
