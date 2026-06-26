'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import styles from './ProductCard.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  type: string;
  rating: number;
  isSpecialOffer?: boolean;
  specialPrice?: number | null;
  specialOfferEnd?: string | Date | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const hasSpecialOffer = !!(product.isSpecialOffer && product.specialPrice && (!product.specialOfferEnd || new Date(product.specialOfferEnd) > new Date()));
  const activePrice = hasSpecialOffer ? product.specialPrice! : product.price;

  const formattedPrice = new Intl.NumberFormat('fa-IR').format(activePrice);
  const formattedOriginalPrice = new Intl.NumberFormat('fa-IR').format(product.price);

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={false}
          />
          {hasSpecialOffer && (
            <div className={styles.discountBadge}>
              {Math.round((1 - (product.specialPrice! / product.price)) * 100)}٪
            </div>
          )}
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.rating}>
          <Star className={styles.starIcon} size={16} />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        <Link href={`/products/${product.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <p className={styles.description}>
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </p>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            {hasSpecialOffer ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className={styles.originalPrice} style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formattedOriginalPrice} تومان</span>
                <div>
                  <span className={styles.price} style={{ color: 'var(--error)', fontWeight: 'bold' }}>{formattedPrice}</span>
                  <span className={styles.currency} style={{ color: 'var(--error)', fontSize: '0.8rem', marginRight: '4px' }}>تومان</span>
                </div>
              </div>
            ) : (
              <div>
                <span className={styles.price}>{formattedPrice}</span>
                <span className={styles.currency} style={{ fontSize: '0.8rem', marginRight: '4px' }}>تومان</span>
              </div>
            )}
          </div>

          <button
            className={styles.addToCartBtn}
            onClick={() => addToCart({ ...product, price: activePrice } as any)}
            title="افزودن به سبد خرید"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
