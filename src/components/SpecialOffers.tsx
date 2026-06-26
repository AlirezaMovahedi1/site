'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './SpecialOffers.module.css';

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

interface SpecialOffersProps {
  products: Product[];
}

export default function SpecialOffers({ products }: SpecialOffersProps) {
  const { addToCart } = useCart();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Title and Header Area */}
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <h3 className={styles.sectionTitle}>پیشنهاد ویژه</h3>
          </div>
          
          <Link href="/products" className={styles.seeAllLink}>
            <span>مشاهده همه</span>
            <ArrowLeft size={16} />
          </Link>
        </div>

        {/* Products Scrollable Row */}
        <div
          ref={scrollContainerRef}
          className={`${styles.productsRowContainer} ${isDown ? styles.isDragging : ''}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.productsRow}>
            {products.map((product) => {
              const hasSpecialOffer = !!(product.isSpecialOffer && product.specialPrice);
              const activePrice = hasSpecialOffer ? product.specialPrice! : product.price;

              const formattedPrice = new Intl.NumberFormat('fa-IR').format(activePrice);
              const formattedOriginalPrice = new Intl.NumberFormat('fa-IR').format(product.price);
              const discountPercent = hasSpecialOffer 
                ? Math.round((1 - (product.specialPrice! / product.price)) * 100) 
                : 0;

              return (
                <div key={product.id} className={styles.productCard} draggable="false">
                  <Link href={`/products/${product.slug}`} className={styles.imageLink} draggable="false">
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.image || "/images/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 250px"
                        className={styles.image}
                        priority={false}
                        draggable="false"
                      />
                      {discountPercent > 0 && (
                        <div className={styles.discountBadge}>
                          {discountPercent}٪
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className={styles.cardContent}>
                    <Link href={`/products/${product.slug}`} className={styles.titleLink} draggable="false">
                      <h4 className={styles.productTitle}>{product.name}</h4>
                    </Link>

                    <div className={styles.priceSection}>
                      <div className={styles.priceRow}>
                        <span className={styles.activePrice}>{formattedPrice}</span>
                        <span className={styles.currency}>تومان</span>
                      </div>
                      <span className={styles.originalPrice}>{formattedOriginalPrice} تومان</span>
                    </div>

                    <button
                      className={styles.addToCartBtn}
                      onClick={() => addToCart({ ...product, price: activePrice } as any)}
                      title="افزودن به سبد خرید"
                    >
                      <ShoppingCart size={16} />
                      <span>افزودن به سبد</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
