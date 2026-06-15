'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    image: '/images/shop_banner.webp',
    link: '/products',
    title: 'فروشگاه آنلاین سیدی آی‌تی',
  },
  {
    id: 2,
    image: '/images/support_banner.webp',
    link: '/contact',
    title: 'پشتیبانی آنلاین تیم سیدی آی‌تی',
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(1200);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const handleStart = (clientX: number) => {
    if (containerRef.current) {
      setSliderWidth(containerRef.current.getBoundingClientRect().width);
    }
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
    
    const threshold = sliderWidth * 0.15; // 15% width threshold for transitions
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
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

  const dragOffsetPercent = (dragOffset / sliderWidth) * 100;

  const getSlideStyles = (index: number) => {
    let diff = index - current;
    
    // With exactly 2 slides, position the inactive slide based on drag direction
    if (diff !== 0) {
      if (dragOffset > 0) {
        // Dragging right -> show adjacent slide on the left
        diff = -1;
      } else {
        // Dragging left or no drag -> show adjacent slide on the right
        diff = 1;
      }
    }
    
    const slideTranslate = diff * 100 + dragOffsetPercent;
    const slideTransition = isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    
    return {
      slide: {
        transform: `translate3d(${slideTranslate}%, 0, 0)`,
        transition: slideTransition,
        zIndex: index === current ? 2 : 1,
      },
      image: {
        transform: 'none',
        transition: slideTransition,
      }
    };
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.slider} ${isDragging ? styles.sliderDragging : ''}`}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className={styles.sliderTrack}>
        {slides.map((slide, index) => {
          const isActive = index === current;
          const slideStyles = getSlideStyles(index);
          
          return (
            <Link
              key={slide.id}
              href={slide.link}
              onClick={handleLinkClick}
              className={styles.slide}
              style={slideStyles.slide}
              draggable={false}
            >
              <div 
                className={styles.imageWrapper}
                style={slideStyles.image}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={`${styles.image} ${isActive && !isDragging ? styles.imageActive : ''}`}
                  sizes="100vw"
                  draggable={false}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Sleek Autoplay Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div 
          key={current} // Triggers recreation of node to reset CSS animation keyframe
          className={`${styles.progressBar} ${!isDragging ? styles.progressBarActive : styles.progressBarPaused}`}
          onAnimationEnd={nextSlide}
        />
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

