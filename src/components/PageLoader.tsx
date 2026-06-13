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

  // Intercept all routing navigations globally via click event delegation
  useEffect(() => {
    if (isInitialLoad) return;

    const handleDocumentClick = (event: MouseEvent) => {
      // Find closest anchor tag
      const anchor = (event.target as Element).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external domains
      if (href.startsWith('http') && !href.startsWith(window.location.origin)) return;
      
      // Ignore anchor hashes
      if (href.startsWith('#') || href.includes('#' + window.location.pathname)) return;
      
      // Ignore mailto, tel, javascript protocols
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

      // Ignore target="_blank" links
      if (anchor.target === '_blank') return;
      
      // Ignore click modifications (CMD, CTRL, Shift, Alt)
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      
      // Ignore standard browser download anchors
      if (anchor.hasAttribute('download')) return;

      try {
        const targetUrl = new URL(anchor.href);
        const currentUrl = new URL(window.location.href);
        // If they click the link of the exact page they are currently on, don't show loading overlay
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
          return;
        }
      } catch (err) {
        if (href === window.location.pathname + window.location.search) {
          return;
        }
      }

      // Transition is starting -> display blurred loader immediately on the current page
      setIsLoading(true);
      setIsFadingOut(false);
      setActive(true);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isInitialLoad]);

  // Turn off loading once pathname or search parameter transitions complete
  useEffect(() => {
    if (isInitialLoad || !isLoading) return;

    // We have arrived at the target page!
    // Keep the blur visible over the target page for 400ms to let it settle
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const closeTimer = setTimeout(() => {
        setIsLoading(false);
        setActive(false);
        setIsFadingOut(false);
      }, 300); // match transition fade-out CSS duration
      return () => clearTimeout(closeTimer);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, isInitialLoad, isLoading]);

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
