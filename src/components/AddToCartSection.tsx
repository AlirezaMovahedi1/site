'use client';

import React, { useState } from 'react';
import { useCart, Product } from '../context/CartContext';
import { ShoppingCart, Check, ShieldAlert } from 'lucide-react';
import styles from './AddToCartSection.module.css';

export default function AddToCartSection({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock =
    product.type === 'PHYSICAL' &&
    (product.inventory === null || product.inventory === undefined || product.inventory <= 0);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleIncrement = () => {
    if (product.type === 'PHYSICAL' && product.inventory !== null && product.inventory !== undefined) {
      if (quantity >= product.inventory) return;
    }
    setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) return;
    setQuantity((q) => q - 1);
  };

  return (
    <div className={styles.section}>
      {product.type === 'PHYSICAL' && (
        <div className={styles.inventoryStatus}>
          {isOutOfStock ? (
            <span className={`${styles.badge} ${styles.outOfStock}`}>
              <ShieldAlert size={16} /> ناموجود در انبار
            </span>
          ) : (
            <span className={`${styles.badge} ${styles.inStock}`}>
              موجودی در انبار: {product.inventory} عدد
            </span>
          )}
        </div>
      )}

      {!isOutOfStock && (
        <div className={styles.actions}>
          <div className={styles.qtyContainer}>
            <button onClick={handleIncrement} className={styles.qtyBtn}>+</button>
            <span className={styles.qtyVal}>{quantity}</span>
            <button onClick={handleDecrement} className={styles.qtyBtn}>-</button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`${styles.addBtn} ${added ? styles.successBtn : ''}`}
            disabled={added}
          >
            {added ? (
              <>
                <Check size={18} /> به سبد خرید اضافه شد
              </>
            ) : (
              <>
                <ShoppingCart size={18} /> افزودن به سبد خرید
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
