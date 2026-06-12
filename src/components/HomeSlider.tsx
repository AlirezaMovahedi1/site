'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeSlider.module.css';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hardware_banner.png',
    title: 'سخت‌افزار صنعتی و تجهیزات تخصصی IT',
    subtitle: 'ارائه‌دهنده معتبر لپ‌تاپ‌های مهندسی ThinkPad، اسکنرهای Suprema و قطعات شبکه اورجینال',
    link: '/products?category=hardware-equipment',
    buttonText: 'مشاهده سخت‌افزارها',
  },
  {
    id: 2,
    image: '/images/software_banner.png',
    title: 'لایسنس‌های نرم‌افزاری و آنتی‌ویروس اورجینال',
    subtitle: 'تضمین اصالت ۱۰۰٪، نصب و راه‌اندازی رایگان و پشتیبانی فنی ۲۴ ساعته',
    link: '/products?category=software-licenses',
    buttonText: 'مشاهده لایسنس‌ها',
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
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
    const diff = startX - clientX;
    
    // If user dragged more than 5px, mark as dragged to prevent link click navigation
    if (Math.abs(diff) > 5) {
      setWasDragged(true);
    }

    // Swipe threshold of 60px
    if (diff > 60) {
      nextSlide();
      handleEnd();
    } else if (diff < -60) {
      prevSlide();
      handleEnd();
    }
  };

  const handleEnd = () => {
    setStartX(null);
    setIsDragging(false);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (wasDragged) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

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
      {slides.map((slide, index) => (
        <Link
          key={slide.id}
          href={slide.link}
          onClick={handleLinkClick}
          className={`${styles.slide} ${index === current ? styles.active : ''} ${styles.slideLink}`}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={styles.image}
              sizes="100vw"
            />
          </div>
        </Link>
      ))}



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
