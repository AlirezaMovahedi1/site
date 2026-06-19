import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyToken } from '../../lib/auth';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  MessageSquare,
  ChevronLeft
} from 'lucide-react';
import AdminLogoutButton from '../../components/AdminLogoutButton';
import styles from './admin.module.css';

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const payload = token ? await verifyToken(token) : null;
  const adminName = payload?.name || 'مدیر سیستم';
  const adminUsername = payload?.username || 'admin';

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <svg viewBox="0 0 100 120" className={styles.logoIcon}>
            <polygon points="18,28 49,10 49,46" className={styles.logoTriangle} />
            <polygon points="82,28 51,10 51,46" className={styles.logoTriangle} />
            <polygon points="18,30 82,67 82,93 18,56" className={styles.logoDiagonal} />
            <polygon points="18,94 49,112 49,76" className={styles.logoTriangle} />
            <polygon points="82,95 51,113 51,77" className={styles.logoTriangle} />
          </svg>
          <div className={styles.brandText}>
            <h2>سیدی آی‌تی</h2>
            <span>پنل مدیریت سیستم</span>
          </div>
        </div>

        <nav className={styles.sidebarMenu}>
          <Link href="/admin" className={`${styles.menuItem} ${styles.menuItemActive}`}>
            <LayoutDashboard size={18} />
            <span>داشبورد</span>
          </Link>
          <Link href="/admin/products" className={styles.menuItem}>
            <ShoppingBag size={18} />
            <span>محصولات</span>
          </Link>
          <Link href="/admin/orders" className={styles.menuItem}>
            <ClipboardList size={18} />
            <span>سفارشات</span>
          </Link>
          <Link href="/admin/tickets" className={styles.menuItem}>
            <MessageSquare size={18} />
            <span>تیکت‌ها</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <AdminLogoutButton className={styles.logoutBtn} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>داشبورد مدیریت</h1>
          </div>
          
          <div className={styles.userInfo}>
            <div className={styles.avatarDetails}>
              <h4>{adminName}</h4>
              <span>@{adminUsername}</span>
            </div>
            <div className={styles.avatar}>
              {adminName.substring(0, 1)}
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className={styles.contentBody}>
          {children}
        </main>
      </div>
    </div>
  );
}
