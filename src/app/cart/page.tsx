'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingBag, ArrowLeft, Cpu, Download } from 'lucide-react';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formattedTotal = new Intl.NumberFormat('fa-IR').format(cartTotal);

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyCartPage}`}>
        <div className={styles.emptyCard}>
          <ShoppingBag className={styles.emptyIcon} size={64} />
          <h2>سبد خرید شما خالی است!</h2>
          <p>شما هیچ محصولی در سبد خرید خود ندارید. برای مشاهده محصولات کلیک کنید.</p>
          <Link href="/products" className={styles.shopBtn}>
            مشاهده فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h2 className={styles.pageTitle}>سبد خرید شما</h2>

      <div className={styles.layout}>
        {/* Cart items list */}
        <div className={styles.itemsList}>
          {cart.map((item) => {
            const formattedPrice = new Intl.NumberFormat('fa-IR').format(item.product.price);
            const formattedSubtotal = new Intl.NumberFormat('fa-IR').format(item.product.price * item.quantity);

            return (
              <div key={item.product.id} className={styles.itemCard}>
                <div className={styles.itemImageWrapper}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className={styles.itemImage}
                  />
                </div>

                <div className={styles.itemInfo}>
                  <span className={`${styles.itemType} ${item.product.type === 'PHYSICAL' ? styles.typePhysical : styles.typeDigital}`}>
                    {item.product.type === 'PHYSICAL' ? <Cpu size={12} /> : <Download size={12} />}
                    {item.product.type === 'PHYSICAL' ? 'سخت‌افزار فیزیکی' : 'دانلود آنی / دیجیتال'}
                  </span>
                  <Link href={`/products/${item.product.slug}`} className={styles.itemTitleLink}>
                    <h3 className={styles.itemTitle}>{item.product.name}</h3>
                  </Link>
                  <div className={styles.itemPrice}>
                    <span>{formattedPrice}</span>
                    <span className={styles.currency}>تومان</span>
                  </div>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.qtyContainer}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className={styles.qtyBtn}
                    >
                      -
                    </button>
                  </div>

                  <div className={styles.subtotalBlock}>
                    <span className={styles.subtotalLabel}>جمع فرعی:</span>
                    <span className={styles.subtotalPrice}>{formattedSubtotal} تومان</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className={styles.removeBtn}
                    title="حذف از سبد خرید"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary side card */}
        <aside className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>خلاصه سفارش</h3>
          <div className={styles.summaryRow}>
            <span>تعداد اقلام:</span>
            <span>{cart.reduce((c, i) => c + i.quantity, 0)} عدد</span>
          </div>
          <div className={styles.summaryRow}>
            <span>جمع کل خرید:</span>
            <span className={styles.totalPrice}>{formattedTotal} تومان</span>
          </div>
          <div className={styles.summaryRow} style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <span className={styles.shippingLabel}>هزینه ارسال:</span>
            <span className={styles.shippingVal}>
              {cart.some((i) => i.product.type === 'PHYSICAL')
                ? 'محاسبه در مرحله بعد (پست)'
                : 'رایگان (تحویل دیجیتال)'}
            </span>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            ورود به مرحله تسویه حساب
          </Link>

          <Link href="/products" className={styles.continueShopping}>
            <ArrowLeft size={16} /> ادامه خرید در فروشگاه
          </Link>
        </aside>
      </div>
    </div>
  );
}
