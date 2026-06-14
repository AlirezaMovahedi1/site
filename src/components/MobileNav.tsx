'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import styles from './MobileNav.module.css';

export default function MobileNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <div className={styles.mobileNav}>
      <Link 
        href="/" 
        className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
      >
        <Home size={20} className={styles.icon} />
        <span className={styles.label}>خانه</span>
      </Link>

      <Link 
        href="/products?focus=search" 
        className={`${styles.navItem} ${pathname === '/products' && typeof window !== 'undefined' && window.location.search.includes('focus') ? styles.active : ''}`}
      >
        <Search size={20} className={styles.icon} />
        <span className={styles.label}>جستجو</span>
      </Link>

      <Link 
        href="/cart" 
        className={`${styles.navItem} ${pathname === '/cart' ? styles.active : ''}`}
      >
        <div className={styles.cartIconWrapper}>
          <ShoppingCart size={20} className={styles.icon} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </div>
        <span className={styles.label}>سبد خرید</span>
      </Link>

      <Link 
        href="/checkout" 
        className={`${styles.navItem} ${pathname === '/checkout' ? styles.active : ''}`}
      >
        <User size={20} className={styles.icon} />
        <span className={styles.label}>پروفایل</span>
      </Link>
    </div>
  );
}
