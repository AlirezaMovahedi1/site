import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.section}>
          <h3 className={styles.title}>درباره سیدی آی‌تی مارکت</h3>
          <p className={styles.desc}>
            مرجع تخصصی تهیه و ارائه سخت‌افزارهای صنعتی مقاوم، تجهیزات پیشرفته احراز هویت بیومتریک و لایسنس‌های اورجینال نرم‌افزاری. هدف ما تضمین کیفیت، امنیت و اصالت کالا برای سازمان‌ها و توسعه‌دهندگان است.
          </p>
          <div className={styles.trustBadges}>
            <div className={styles.badge} title="تضمین اصالت کالا">
              <ShieldCheck className={styles.badgeIcon} />
              <span>تضمین اصالت</span>
            </div>
            <div className={styles.badge} title="پشتیبانی فنی ۲۴ ساعته">
              <CheckCircle className={styles.badgeIcon} />
              <span>پشتیبانی فنی</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>دسترسی سریع</h3>
          <ul className={styles.links}>
            <li><Link href="/">صفحه اصلی</Link></li>
            <li><Link href="/products">لیست محصولات</Link></li>
            <li><Link href="/blog">وبلاگ و مقالات</Link></li>
            <li><Link href="/cart">سبد خرید شما</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>ارتباط با ما</h3>
          <ul className={styles.contacts}>
            <li>
              <Phone className={styles.contactIcon} />
              <span>۰۲۱-۸۸۸۸XXXX (خط ویژه)</span>
            </li>
            <li>
              <Mail className={styles.contactIcon} />
              <span>info@seyediit.com</span>
            </li>
            <li>
              <MapPin className={styles.contactIcon} />
              <span>تهران، خیابان ولیعصر، تقاطع میرداماد، مجتمع کامپیوتر پایتخت</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className="container">
          <p>© {new Date().getFullYear()} سیدی آی‌تی مارکت. تمامی حقوق مادی و معنوی محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
