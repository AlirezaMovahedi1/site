import React from 'react';
import prisma from '../../lib/prisma';
import { ShoppingBag, ClipboardList, TrendingUp } from 'lucide-react';
import styles from './admin.module.css';

export default async function AdminDashboardPage() {
  // Query database statistics live
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  
  const revenueAggregate = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
  });
  const totalRevenue = revenueAggregate._sum.totalAmount || 0;

  return (
    <div>
      {/* Welcome Banner */}
      <div className={styles.welcomeGrid}>
        <h2>خوش آمدید!</h2>
        <p>
          به پنل مدیریت سیستم سیدی آی‌تی خوش آمدید. از طریق این پنل می‌توانید بر سفارش‌های ورودی نظارت داشته باشید، محصولات و دسته‌بندی‌ها را مدیریت کنید و پیام‌ها و تیکت‌های پشتیبانی کاربران را بررسی نمایید.
        </p>
      </div>

      {/* Statistics Section */}
      <div className={styles.statsGrid}>
        {/* Products Stat */}
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.statDetails}>
            <span className={styles.statValue}>{productCount}</span>
            <span className={styles.statLabel}>تعداد محصولات فعال</span>
          </div>
        </div>

        {/* Orders Stat */}
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <ClipboardList size={24} />
          </div>
          <div className={styles.statDetails}>
            <span className={styles.statValue}>{orderCount}</span>
            <span className={styles.statLabel}>تعداد کل سفارشات</span>
          </div>
        </div>

        {/* Revenue Stat */}
        <div className={styles.statCard}>
          <div className={styles.statIconBox}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statDetails}>
            <span className={styles.statValue}>
              {totalRevenue.toLocaleString('fa-IR')}
            </span>
            <span className={styles.statLabel}>درآمد کل (تومان)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
