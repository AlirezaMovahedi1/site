'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'ورود به پنل مدیریت | سیدی آی‌تی';
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('لطفاً نام کاربری و رمز عبور را وارد نمایید.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطایی در ورود رخ داده است.');
      }

      // Successful login
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'خطایی در اتصال به سرور رخ داده است.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background visual balls */}
      <div className={`${styles.glowBall} ${styles.glowBallLeft}`} />
      <div className={`${styles.glowBall} ${styles.glowBallRight}`} />

      <div className={styles.loginCard}>
        <div className={styles.brandHeader}>
          <svg viewBox="0 0 100 120" className={styles.logoIcon}>
            <polygon points="18,28 49,10 49,46" className={styles.logoTriangle} />
            <polygon points="82,28 51,10 51,46" className={styles.logoTriangle} />
            <polygon points="18,30 82,67 82,93 18,56" className={styles.logoDiagonal} />
            <polygon points="18,94 49,112 49,76" className={styles.logoTriangle} />
            <polygon points="82,95 51,113 51,77" className={styles.logoTriangle} />
          </svg>
          <h1 className={styles.brandName}>سیدی آی‌تی</h1>
          <p className={styles.brandSubtitle}>پنل مدیریت و نظارت بر سیستم</p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <AlertCircle size={18} className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              <User size={16} className={styles.labelIcon} />
              <span>نام کاربری</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثال: admin"
                className={styles.input}
                disabled={isLoading}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <Lock size={16} className={styles.labelIcon} />
              <span>رمز عبور</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'در حال تایید هویت...' : 'ورود به پنل مدیریت'}
          </button>
        </form>
      </div>
    </div>
  );
}
