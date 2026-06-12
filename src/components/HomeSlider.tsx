'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeSlider.module.css';

interface Slide {
  id: number;
  image: string;
  link: string;
  title: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hardware_banner.png',
    link: '/products?category=hardware-equipment',
    title: 'سخت‌افزار صنعتی و تجهیزات تخصصی IT',
  },
  {
    id: 2,
    image: '/images/software_banner.png',
    link: '/products?category=software-licenses',
    title: 'لایسنس‌های نرم‌افزاری و آنتی‌ویروس اورجینال',
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
    setWasDragged(false);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || startX === null) return;
    const diff = clientX - startX;
    setDragOffset(diff);
    
    if (Math.abs(diff) > 8) {
      setWasDragged(true);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    // Swipe threshold of 100px
    if (dragOffset < -100) {
      nextSlide();
    } else if (dragOffset > 100) {
      prevSlide();
    }
    
    setDragOffset(0);
    setIsDragging(false);
    setStartX(null);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasDragged) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isDragging) return; // Pause autoplay when dragging
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isDragging]);

  // Flex percentage shift (for 2 slides, each takes 50% width of the 200% track)
  const trackTransform = `translate3d(calc(-${current * 50}% + ${dragOffset}px), 0, 0)`;
  const trackTransition = isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

  return (
    <div 
      className={`${styles.slider} ${isDragging ? styles.sliderDragging : ''}`}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div 
        className={styles.sliderTrack} 
        style={{ transform: trackTransform, transition: trackTransition }}
      >
        {slides.map((slide) => (
          <Link
            key={slide.id}
            href={slide.link}
            onClick={handleLinkClick}
            className={styles.slide}
            draggable={false}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className={styles.image}
                sizes="100vw"
                draggable={false}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`رفتن به اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
