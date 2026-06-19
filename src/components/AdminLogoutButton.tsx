'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogoutButton({ className }: { className: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      <LogOut size={18} />
      <span>خروج از حساب</span>
    </button>
  );
}
