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
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/placeholder.png"
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={false}
          />
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
            <span className={styles.price}>{formattedPrice}</span>
            <span className={styles.currency}>تومان</span>
          </div>

          <button
            className={styles.addToCartBtn}
            onClick={() => addToCart(product as any)}
            title="افزودن به سبد خرید"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
