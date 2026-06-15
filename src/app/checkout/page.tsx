'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CreditCard, CheckCircle, ArrowRight, ShieldCheck, Mail, Phone, User, MapPin } from 'lucide-react';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
  });

  const hasPhysicalProduct = cart.some((item) => item.product.type === 'PHYSICAL');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setErrorMsg('');

    const payload = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      shippingAddress: hasPhysicalProduct ? formData.shippingAddress : null,
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ثبت سفارش.');
      }

      setOrderId(data.orderId);
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'خطا در ثبت سفارش. لطفاً مجدداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  const formattedTotal = new Intl.NumberFormat('fa-IR').format(cartTotal);

  if (success) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <div className={styles.successCard}>
          <CheckCircle className={styles.successIcon} size={64} />
          <h2>پرداخت و ثبت سفارش با موفقیت انجام شد!</h2>
          <p className={styles.successSub}>سفارش شما در سیستم ثبت گردید و در حال پردازش است.</p>
          
          <div className={styles.receipt}>
            <div className={styles.receiptRow}>
              <span>کد پیگیری سفارش:</span>
              <strong className={styles.orderId}>{orderId}</strong>
            </div>
            <div className={styles.receiptRow}>
              <span>مبلغ پرداخت شده:</span>
              <strong>{formattedTotal} تومان</strong>
            </div>
            <div className={styles.receiptRow} style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span>نوع تحویل:</span>
              <strong>
                {hasPhysicalProduct ? 'ارسال با پست پیشتاز (۳ الی ۵ روز کاری)' : 'ارسال آنی کد لایسنس به ایمیل شما'}
              </strong>
            </div>
          </div>

          <p className={styles.emailNotification}>
            جزئیات خرید و رسید پرداخت به ایمیل <strong>{formData.customerEmail}</strong> ارسال شد.
          </p>

          <Link href="/products" className={styles.backBtn}>
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyContainer}`}>
        <div className={styles.emptyCard}>
          <h2>سبد خرید شما خالی است!</h2>
          <p>برای انجام تسویه حساب باید حداقل یک محصول در سبد خرید خود داشته باشید.</p>
          <Link href="/products" className={styles.shopBtn}>
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h2 className={styles.pageTitle}>تسویه حساب و پرداخت</h2>

      <div className={styles.layout}>
        {/* Form Column */}
        <form onSubmit={handleSubmit} className={styles.formSection}>
          <h3 className={styles.sectionTitle}>مشخصات خریدار</h3>

          {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <User size={16} /> نام و نام خانوادگی
            </label>
            <input
              type="text"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="مثال: علی حسینی"
              className={styles.input}
            />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Mail size={16} /> ایمیل (جهت ارسال لایسنس/رسید)
              </label>
              <input
                type="email"
                name="customerEmail"
                required
                value={formData.customerEmail}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Phone size={16} /> شماره موبایل
              </label>
              <input
                type="tel"
                name="customerPhone"
                required
                value={formData.customerPhone}
                onChange={handleInputChange}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className={styles.input}
              />
            </div>
          </div>

          {hasPhysicalProduct && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MapPin size={16} /> آدرس دقیق پستی (جهت ارسال سخت‌افزار)
              </label>
              <textarea
                name="shippingAddress"
                required
                rows={3}
                value={formData.shippingAddress}
                onChange={handleInputChange}
                placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد و کد پستی..."
                className={styles.textarea}
              />
            </div>
          )}

          <div className={styles.paymentInfo}>
            <h4 className={styles.paymentTitle}>
              <CreditCard size={18} /> شبیه‌ساز درگاه پرداخت ایمن
            </h4>
            <p>پس از کلیک بر روی دکمه پرداخت، تراکنش شبیه‌سازی شده و سفارش شما ثبت می‌شود.</p>
            <div className={styles.secureBadge}>
              <ShieldCheck className={styles.secureIcon} />
              <span>اتصال امن SSL - سیدی آی‌تی</span>
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.payBtn}>
            {loading ? 'در حال ارتباط با بانک...' : `پرداخت و ثبت سفارش (${formattedTotal} تومان)`}
          </button>
        </form>

        {/* Invoice Column */}
        <aside className={styles.invoiceSection}>
          <h3 className={styles.invoiceTitle}>پیش‌فاکتور خرید</h3>
          <div className={styles.invoiceItems}>
            {cart.map((item) => (
              <div key={item.product.id} className={styles.invoiceItem}>
                <div className={styles.invoiceItemInfo}>
                  <span className={styles.invoiceItemName}>{item.product.name}</span>
                  <span className={styles.invoiceItemQty}>{item.quantity} عدد</span>
                </div>
                <span className={styles.invoiceItemPrice}>
                  {new Intl.NumberFormat('fa-IR').format(item.product.price * item.quantity)} تومان
                </span>
              </div>
            ))}
          </div>

          <div className={styles.invoiceTotals}>
            <div className={styles.invoiceRow}>
              <span>جمع اقلام:</span>
              <span>{formattedTotal} تومان</span>
            </div>
            <div className={styles.invoiceRow}>
              <span>هزینه ارسال:</span>
              <span>{hasPhysicalProduct ? 'رایگان (تخفیف ویژه)' : '۰ تومان (دیجیتال)'}</span>
            </div>
            <div className={`${styles.invoiceRow} ${styles.invoiceRowTotal}`}>
              <span>مبلغ قابل پرداخت:</span>
              <span>{formattedTotal} تومان</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
