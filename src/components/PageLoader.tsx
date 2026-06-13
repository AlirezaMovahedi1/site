'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './PageLoader.module.css';

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [active, setActive] = useState(true); // Controls mounting in DOM

  // Prevent transition trigger on initial mount (handled separately)
  const isFirstRender = useRef(true);

  // Handle initial hydration load
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const closeTimer = setTimeout(() => {
        setIsInitialLoad(false);
        setActive(false);
        setIsFadingOut(false);
        isFirstRender.current = false; // Initial load finished, enable transition loader
      }, 300); // match transition duration
      return () => clearTimeout(closeTimer);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Listen to pathname or search parameter changes for page transitions
  useEffect(() => {
    // Skip the very first render trigger (initial site open)
    if (isFirstRender.current) {
      return;
    }

    // Trigger loading state immediately over the target/new page
    setIsLoading(true);
    setIsFadingOut(false);
    setActive(true);

    // Let the drawing logo run and then fade out, revealing the new page
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const closeTimer = setTimeout(() => {
        setIsLoading(false);
        setActive(false);
        setIsFadingOut(false);
      }, 300); // match transition fade-out CSS duration
      return () => clearTimeout(closeTimer);
    }, 600); // display blurred transition overlay for 600ms on new page

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!mounted || !active) return null;

  const overlayClass = isInitialLoad 
    ? `${styles.overlay} ${styles.overlayInitial}` 
    : `${styles.overlay} ${styles.overlayTransition}`;

  const fadeClass = isFadingOut ? styles.fadeOut : '';

  return (
    <div className={`${overlayClass} ${fadeClass}`}>
      <svg viewBox="0 0 100 135" className={styles.loader}>
        <polygon points="16.5,27 48.5,10 48.5,44" style={{ '--i': 1 } as React.CSSProperties}></polygon>
        <polygon points="83.5,27 51.5,10 51.5,44" style={{ '--i': 0 } as React.CSSProperties}></polygon>
        <polygon points="16.5,30 16.5,64 48.5,47" style={{ '--i': 2 } as React.CSSProperties}></polygon>
        <polygon points="16.5,67 48.5,50 48.5,84" style={{ '--i': 3 } as React.CSSProperties}></polygon>
        <polygon points="83.5,67 51.5,50 51.5,84" style={{ '--i': 4 } as React.CSSProperties}></polygon>
        <polygon points="83.5,70 83.5,104 51.5,87" style={{ '--i': 5 } as React.CSSProperties}></polygon>
        <polygon points="83.5,107 51.5,90 51.5,124" style={{ '--i': 6 } as React.CSSProperties}></polygon>
        <polygon points="16.5,107 48.5,90 48.5,124" style={{ '--i': 7 } as React.CSSProperties}></polygon>
      </svg>
    </div>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <PageLoaderContent />
    </Suspense>
  );
}
