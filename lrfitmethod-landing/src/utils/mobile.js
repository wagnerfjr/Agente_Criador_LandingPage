/**
 * Mobile Optimization Utilities
 * Touch interactions, viewport detection, mobile-specific optimizations
 */

/**
 * Detect device type
 */
export const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  if (/ipad|android/.test(userAgent)) return 'tablet';

  return 'desktop';
};

/**
 * Detect screen size
 */
export const getScreenSize = () => {
  const width = Math.min(window.innerWidth, document.documentElement.clientWidth);

  if (width < 640) return 'mobile'; // sm
  if (width < 768) return 'tablet-sm'; // md
  if (width < 1024) return 'tablet'; // lg
  if (width < 1280) return 'desktop'; // xl
  return 'desktop-lg'; // 2xl+
};

/**
 * Detect if touch is supported
 */
export const isTouchDevice = () => {
  return (
    typeof window !== 'undefined' &&
    (!!navigator.maxTouchPoints ||
      !!navigator.msMaxTouchPoints ||
      ('ontouchstart' in window) ||
      ('onmsgesturechange' in window))
  );
};

/**
 * Detect if viewport is mobile
 */
export const isMobileViewport = () => {
  return getScreenSize() === 'mobile' || getScreenSize() === 'tablet-sm';
};

/**
 * Optimize images for mobile
 */
export const optimizeImageForMobile = (imageUrl, size = 'mobile') => {
  const sizes = {
    mobile: '360x240',
    tablet: '768x512',
    desktop: '1200x800',
  };

  // Add image optimization params (if using a service like imgix)
  const optimizedUrl = new URL(imageUrl);
  optimizedUrl.searchParams.set('auto', 'format');
  optimizedUrl.searchParams.set('q', '80');

  return optimizedUrl.toString();
};

/**
 * Handle viewport orientation changes
 */
export const useViewportOrientation = (callback) => {
  if (typeof window === 'undefined') return;

  const handleOrientationChange = () => {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    callback(orientation);
  };

  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);

  return () => {
    window.removeEventListener('orientationchange', handleOrientationChange);
    window.removeEventListener('resize', handleOrientationChange);
  };
};

/**
 * Mobile-friendly touch interaction handler
 */
export class TouchHandler {
  constructor(element, options = {}) {
    this.element = element;
    this.startX = 0;
    this.startY = 0;
    this.swipeThreshold = options.swipeThreshold || 50;
    this.onSwipeLeft = options.onSwipeLeft || (() => {});
    this.onSwipeRight = options.onSwipeRight || (() => {});
    this.onTap = options.onTap || (() => {});

    this.init();
  }

  init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    // Prevent default scrolling on some elements
    const dx = e.touches[0].clientX - this.startX;
    if (Math.abs(dx) > this.swipeThreshold) {
      e.preventDefault();
    }
  }

  handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - this.startX;
    const diffY = endY - this.startY;

    // Detect swipe
    if (Math.abs(diffX) > this.swipeThreshold && Math.abs(diffY) < 50) {
      if (diffX > 0) {
        this.onSwipeRight();
      } else {
        this.onSwipeLeft();
      }
    }
    // Detect tap
    else if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
      this.onTap();
    }
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
  }
}

/**
 * Mobile viewport meta tag configuration
 */
export const getMobileMetaTags = () => {
  return {
    viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
    apple: 'mobile-web-app-capable',
    status: 'black-translucent',
  };
};

/**
 * Detect safe area insets (notch support)
 */
export const getSafeAreaInsets = () => {
  const css = getComputedStyle(document.documentElement);

  return {
    top: css.getPropertyValue('env(safe-area-inset-top)') || '0px',
    right: css.getPropertyValue('env(safe-area-inset-right)') || '0px',
    bottom: css.getPropertyValue('env(safe-area-inset-bottom)') || '0px',
    left: css.getPropertyValue('env(safe-area-inset-left)') || '0px',
  };
};

/**
 * Optimize touch target size (minimum 44x44px)
 */
export const getTouchTargetSize = () => {
  // Minimum recommended touch target size: 44x44 points (iOS), 48x48dp (Android)
  const isMobile = isMobileViewport();
  return isMobile ? '44px' : '40px';
};

/**
 * React hook for mobile detection
 */
export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState('desktop');
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(isMobileViewport());
    setDeviceType(getDeviceType());
    setIsTouch(isTouchDevice());

    const handleResize = () => {
      setIsMobile(isMobileViewport());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    deviceType,
    isTouch,
    screenSize: getScreenSize(),
  };
}

export default {
  getDeviceType,
  getScreenSize,
  isTouchDevice,
  isMobileViewport,
  optimizeImageForMobile,
  useViewportOrientation,
  TouchHandler,
  getMobileMetaTags,
  getSafeAreaInsets,
  getTouchTargetSize,
  useMobileDetection,
};
