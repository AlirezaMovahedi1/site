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

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    image: '/images/shop_banner_v3.png',
    link: '/products',
    title: 'فروشگاه آنلاین سیدی آی‌تی',
  },
  {
    id: 2,
    image: '/images/support_banner_v3.png',
    link: '/contact',
    title: 'پشتیبانی آنلاین تیم سیدی آی‌تی',
  },
];

const TRANSITION_DURATION = 600; // ms
const TRANSITION_CSS = `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)`;

export default function HomeSlider({ slides = DEFAULT_SLIDES }: { slides?: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevIndexRef = useRef(0);
  const directionRef = useRef<'forward' | 'backward'>('forward');

  const [startX, setStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(1200);

  const goToSlide = useCallback((nextIndex: number, direction: 'forward' | 'backward' = 'forward') => {
    if (isAnimating && !isDragging) return;
    prevIndexRef.current = current;
    directionRef.current = direction;
    setIsAnimating(true);
    setCurrent(nextIndex);
  }, [current, isAnimating, isDragging]);

  const nextSlide = useCallback(() => {
    goToSlide(current === slides.length - 1 ? 0 : current + 1, 'forward');
  }, [current, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide(current === 0 ? slides.length - 1 : current - 1, 'backward');
  }, [current, goToSlide, slides.length]);

  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  // After transition finishes, clear animation flag so inactive slide snaps to waiting position
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION + 50);
    return () => clearTimeout(timer);
  }, [isAnimating, current]);

  // Intercept native click events in capture phase to completely bypass PageLoader and router on drag
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeClick = (e: MouseEvent) => {
      if (wasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener('click', handleNativeClick, true);
    return () => {
      container.removeEventListener('click', handleNativeClick, true);
    };
  }, [wasDragged]);

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

    const threshold = sliderWidth * 0.15;
    if (dragOffset < -threshold) {
      // Dragged left → go to previous slide (slide enters from right)
      prevSlide();
    } else if (dragOffset > threshold) {
      // Dragged right → go to next slide (slide enters from left)
      nextSlide();
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

  const getSlideStyles = (index: number): { slide: React.CSSProperties; image: React.CSSProperties } => {
    const isActive = index === current;
    const wasActive = index === prevIndexRef.current;

    // --- DRAGGING MODE ---
    if (isDragging) {
      let diff = index - current;
      if (diff !== 0) {
        // Position inactive slide based on drag direction
        diff = dragOffset > 0 ? -1 : 1;
      }
      return {
        slide: {
          transform: `translate3d(${diff * 100.5 + dragOffsetPercent}%, 0, 0)`,
          transition: 'none',
          zIndex: isActive ? 2 : 1,
        },
        image: { transform: 'none', transition: 'none' },
      };
    }

    // --- ACTIVE SLIDE ---
    if (isActive) {
      return {
        slide: {
          transform: 'translate3d(0%, 0, 0)',
          transition: TRANSITION_CSS,
          zIndex: 2,
        },
        image: { transform: 'none', transition: 'none' },
      };
    }

    // --- INACTIVE SLIDE DURING ANIMATION (leaving slide) ---
    if (isAnimating && wasActive) {
      // Forward: leaving slide exits RIGHT / Backward: leaving slide exits LEFT
      const exitTranslate = directionRef.current === 'forward' ? '100.5%' : '-100.5%';
      return {
        slide: {
          transform: `translate3d(${exitTranslate}, 0, 0)`,
          transition: TRANSITION_CSS,
          zIndex: 1,
        },
        image: { transform: 'none', transition: 'none' },
      };
    }

    // --- INACTIVE SLIDE DEFAULT (waiting position: LEFT, no transition) ---
    return {
      slide: {
        transform: 'translate3d(-100.5%, 0, 0)',
        transition: 'none',
        zIndex: 1,
      },
      image: { transform: 'none', transition: 'none' },
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
                  priority
                  className={`${styles.image} ${isActive && !isDragging ? styles.imageActive : ''}`}
                  sizes="100vw"
                  draggable={false}
                  unoptimized
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Hidden Autoplay Timer (visual bar removed, autoplay logic preserved) */}
      <div className={styles.progressBarContainer}>
        <div
          key={current}
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
            onClick={() => goToSlide(index)}
            aria-label={`رفتن به اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
