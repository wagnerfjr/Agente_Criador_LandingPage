import { useEffect, useState } from 'react';
import { logger } from '@/utils/logger';
import { isMobileViewport, isTouchDevice, getDeviceType } from '@/utils/mobile';

/**
 * Mobile-specific optimization hook
 * Tracks performance, battery usage, network quality, etc.
 */
export function useMobileOptimization() {
  const [metrics, setMetrics] = useState({
    isMobile: false,
    isTouch: false,
    deviceType: 'desktop',
    networkQuality: 'unknown',
    batteryLevel: 100,
    isLowPowerMode: false,
    fps: 60,
  });

  useEffect(() => {
    // Detect mobile viewport
    const isMobile = isMobileViewport();
    const isTouch = isTouchDevice();
    const deviceType = getDeviceType();

    setMetrics((prev) => ({
      ...prev,
      isMobile,
      isTouch,
      deviceType,
    }));

    // Battery status API
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        setMetrics((prev) => ({
          ...prev,
          batteryLevel: Math.round(battery.level * 100),
          isLowPowerMode: !battery.charging && battery.level < 0.2,
        }));

        battery.addEventListener('levelchange', () => {
          setMetrics((prev) => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
          }));
        });

        battery.addEventListener('chargingtimechange', () => {
          setMetrics((prev) => ({
            ...prev,
            isLowPowerMode: !battery.charging && battery.level < 0.2,
          }));
        });
      });
    }

    // Network information API
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const updateNetworkQuality = () => {
        let quality = 'slow';
        const effectiveType = connection.effectiveType;

        if (effectiveType === '4g') quality = 'fast';
        else if (effectiveType === '3g') quality = 'moderate';
        else if (effectiveType === '2g' || effectiveType === 'slow-2g') quality = 'slow';

        setMetrics((prev) => ({
          ...prev,
          networkQuality: quality,
        }));

        logger.info('Network Quality', { quality, effectiveType });
      };

      updateNetworkQuality();
      connection.addEventListener('change', updateNetworkQuality);

      return () => {
        connection.removeEventListener('change', updateNetworkQuality);
      };
    }
  }, []);

  // Monitor FPS drop on mobile
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId;

    const checkFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setMetrics((prev) => ({
          ...prev,
          fps: frameCount,
        }));

        if (frameCount < 30) {
          logger.warn('Low FPS detected on mobile', {
            fps: frameCount,
            device: metrics.deviceType,
          });
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(checkFPS);
    };

    animationFrameId = requestAnimationFrame(checkFPS);

    return () => cancelAnimationFrame(animationFrameId);
  }, [metrics.deviceType]);

  // Optimize based on metrics
  useEffect(() => {
    if (metrics.isLowPowerMode) {
      // Disable animations
      document.documentElement.style.setProperty('--disable-animations', '1');
      logger.info('Low power mode detected - disabling animations');
    }

    if (metrics.networkQuality === 'slow') {
      // Reduce image quality
      document.documentElement.style.setProperty('--image-quality', '0.6');
      logger.info('Slow network detected - reducing image quality');
    }

    if (metrics.fps < 30) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-complexity', 'reduced');
    }
  }, [metrics]);

  return metrics;
}

/**
 * Hook to detect viewport changes
 */
export function useViewportChange() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return viewport;
}

/**
 * Hook to handle safe area (notch support)
 */
export function useSafeAreaInsets() {
  const [insets, setInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateInsets = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: parseFloat(style.getPropertyValue('env(safe-area-inset-top)')) || 0,
        right: parseFloat(style.getPropertyValue('env(safe-area-inset-right)')) || 0,
        bottom: parseFloat(style.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
        left: parseFloat(style.getPropertyValue('env(safe-area-inset-left)')) || 0,
      });
    };

    updateInsets();
    window.addEventListener('orientationchange', updateInsets);

    return () => {
      window.removeEventListener('orientationchange', updateInsets);
    };
  }, []);

  return insets;
}

/**
 * Hook to prevent horizontal scroll on mobile
 */
export function usePreventHorizontalScroll() {
  useEffect(() => {
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const startX = touch.clientX;

      window.addEventListener(
        'touchmove',
        (moveEvent) => {
          const moveX = moveEvent.touches[0].clientX;
          if (Math.abs(moveX - startX) > 10) {
            // Allow swipe, but prevent scroll overflow
            if (document.documentElement.scrollWidth === document.documentElement.clientWidth) {
              moveEvent.preventDefault();
            }
          }
        },
        { passive: false }
      );
    };

    document.addEventListener('touchstart', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchMove);
    };
  }, []);
}

export default {
  useMobileOptimization,
  useViewportChange,
  useSafeAreaInsets,
  usePreventHorizontalScroll,
};
