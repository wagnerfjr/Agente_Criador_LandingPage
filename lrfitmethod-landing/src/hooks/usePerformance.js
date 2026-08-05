import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    // Report Web Vitals
    if ('web-vital' in window) {
      const { onCLS, onFID, onFCP, onLCP, onTTFB } = window['web-vital'];

      onCLS((metric) => {
        console.log('[Performance] CLS:', metric.value);
        window.fbq?.('track', 'PageView', { metric: 'CLS', value: metric.value });
      });

      onFID((metric) => {
        console.log('[Performance] FID:', metric.value);
        window.fbq?.('track', 'PageView', { metric: 'FID', value: metric.value });
      });

      onFCP((metric) => {
        console.log('[Performance] FCP:', metric.value);
        window.fbq?.('track', 'PageView', { metric: 'FCP', value: metric.value });
      });

      onLCP((metric) => {
        console.log('[Performance] LCP:', metric.value);
        window.fbq?.('track', 'PageView', { metric: 'LCP', value: metric.value });
      });

      onTTFB((metric) => {
        console.log('[Performance] TTFB:', metric.value);
        window.fbq?.('track', 'PageView', { metric: 'TTFB', value: metric.value });
      });
    }

    // Navigation Timing API
    if (window.performance?.timing) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const navigation = window.performance.navigation;

        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        const connectTime = timing.responseEnd - timing.requestStart;
        const renderTime = timing.domComplete - timing.domLoading;

        console.log('[Performance Metrics]', {
          pageLoadTime,
          connectTime,
          renderTime,
          navigationStart: navigation.type,
        });

        // Track to analytics
        if (window.fbq) {
          window.fbq('track', 'ViewContent', {
            content_type: 'performance_metrics',
            value: pageLoadTime,
          });
        }
      });
    }
  }, []);
}

export function useScrollPerformance() {
  useEffect(() => {
    let ticking = false;
    let lastScrollTime = 0;
    const scrollThrottle = 1000; // ms

    const handleScroll = () => {
      const now = Date.now();

      if (!ticking && now - lastScrollTime > scrollThrottle) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

          // Track scroll depth to Meta Pixel
          if (scrollPercent > 25 && scrollPercent < 50) {
            window.fbq?.('track', 'ViewContent', { scroll_depth: '25%' });
          } else if (scrollPercent > 50 && scrollPercent < 75) {
            window.fbq?.('track', 'ViewContent', { scroll_depth: '50%' });
          } else if (scrollPercent > 75) {
            window.fbq?.('track', 'ViewContent', { scroll_depth: '75%' });
          }

          lastScrollTime = now;
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
