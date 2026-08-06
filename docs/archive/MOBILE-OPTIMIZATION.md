# Mobile Optimization Guide

## Overview

Over 70% of traffic is mobile. This guide ensures LR Fit Method converts visitors on all devices.

## Mobile Metrics Checklist

### Core Web Vitals
- ✅ **LCP (Largest Contentful Paint):** < 2.5s
- ✅ **FID (First Input Delay):** < 100ms
- ✅ **CLS (Cumulative Layout Shift):** < 0.1

### Mobile-Specific
- ✅ Touch targets minimum 44x44px
- ✅ Responsive images (srcset, lazy loading)
- ✅ Viewport optimization
- ✅ Font sizing (readable without zoom)
- ✅ No horizontal scrolling

## Implementation

### 1. Touch Targets

Buttons and interactive elements must be at least 44x44px (iOS) or 48x48dp (Android).

```jsx
import { getTouchTargetSize } from '@/utils/mobile';

export default function Button({ children }) {
  const size = getTouchTargetSize(); // '44px' on mobile, '40px' on desktop

  return (
    <button
      style={{
        minWidth: size,
        minHeight: size,
        padding: '12px 24px',
      }}
    >
      {children}
    </button>
  );
}
```

### 2. Responsive Images

```jsx
import { optimizeImageForMobile } from '@/utils/mobile';

export default function Image({ src, alt }) {
  const mobileSrc = optimizeImageForMobile(src, 'mobile');
  const tabletSrc = optimizeImageForMobile(src, 'tablet');

  return (
    <img
      srcSet={`${mobileSrc} 360w, ${tabletSrc} 768w, ${src} 1200w`}
      sizes="(max-width: 640px) 360px, (max-width: 1024px) 768px, 1200px"
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
}
```

### 3. Viewport Configuration

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### 4. Font Sizing

```css
/* Mobile-first approach */
body {
  font-size: 16px; /* Prevents auto-zoom on iOS */
}

@media (max-width: 640px) {
  h1 { font-size: 28px; }
  h2 { font-size: 24px; }
  p { font-size: 16px; }
}

@media (min-width: 768px) {
  h1 { font-size: 48px; }
  h2 { font-size: 36px; }
  p { font-size: 18px; }
}
```

### 5. Safe Area (Notch Support)

```jsx
import { useSafeAreaInsets } from '@/hooks/useMobileOptimization';

export default function App() {
  const insets = useSafeAreaInsets();

  return (
    <div
      style={{
        paddingTop: `${insets.top}px`,
        paddingBottom: `${insets.bottom}px`,
        paddingLeft: `${insets.left}px`,
        paddingRight: `${insets.right}px`,
      }}
    >
      Content
    </div>
  );
}
```

### 6. Touch Interactions

```jsx
import { TouchHandler } from '@/utils/mobile';
import { useEffect, useRef } from 'react';

export default function SwipeCarousel() {
  const ref = useRef(null);

  useEffect(() => {
    const handler = new TouchHandler(ref.current, {
      onSwipeLeft: () => console.log('Swiped left'),
      onSwipeRight: () => console.log('Swiped right'),
      onTap: () => console.log('Tapped'),
    });

    return () => handler.destroy();
  }, []);

  return <div ref={ref}>Swipeable content</div>;
}
```

### 7. Mobile Optimization Hook

```jsx
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

export default function OptimizedComponent() {
  const { isMobile, networkQuality, batteryLevel, fps } = useMobileOptimization();

  return (
    <div>
      <p>Device: {isMobile ? 'Mobile' : 'Desktop'}</p>
      <p>Network: {networkQuality}</p>
      <p>Battery: {batteryLevel}%</p>
      <p>FPS: {fps}</p>
    </div>
  );
}
```

## Mobile Testing

### Device Testing
- **iOS:** iPhone 12/13/14 (test notch support)
- **Android:** Pixel 4/5/6 (various screen sizes)
- **Tablet:** iPad Air, Samsung Galaxy Tab

### Tools
- **Chrome DevTools:** Device mode
- **BrowserStack:** Real device testing
- **Lighthouse:** Mobile audit
- **Mobile Radar:** Network throttling

### Checklist
- [ ] Test on iPhone (portrait + landscape)
- [ ] Test on Android (portrait + landscape)
- [ ] Test on tablet
- [ ] Test on slow 3G network
- [ ] Test with battery saver enabled
- [ ] Test with pinch-to-zoom disabled
- [ ] Test forms on mobile keyboard
- [ ] Test all CTAs with thumbs
- [ ] Verify no horizontal scroll
- [ ] Check safe area padding

## Performance Optimization

### Image Optimization
```javascript
// Lazy load images
<img loading="lazy" src="..." />

// Responsive images
<picture>
  <source media="(max-width: 640px)" srcSet="mobile.jpg" />
  <source media="(max-width: 1024px)" srcSet="tablet.jpg" />
  <img src="desktop.jpg" alt="..." />
</picture>

// WebP format
<picture>
  <source type="image/webp" srcSet="image.webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

### CSS Optimization
```css
/* Mobile-first */
.container {
  font-size: 16px;
  padding: 16px;
}

/* Larger screens */
@media (min-width: 768px) {
  .container {
    font-size: 18px;
    padding: 24px;
  }
}
```

### JavaScript Optimization
```javascript
// Defer non-critical JavaScript
<script defer src="non-critical.js"></script>

// Use requestIdleCallback for analytics
requestIdleCallback(() => {
  logger.event('PageView');
});

// Lazy load components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

## Common Mobile Issues

| Issue | Solution |
|-------|----------|
| Text too small | Use 16px minimum |
| Buttons too small | Make 44x44px minimum |
| Horizontal scroll | Fix max-width, remove overflow-x |
| Slow loading | Lazy load images, compress assets |
| CLS/jank | Add height attributes, use transform |
| Battery drain | Reduce animations, disable autoplay |
| Poor connectivity | Add fallbacks, show loading states |

## Slow Network Optimization

When `connection.effectiveType` is 'slow-2g' or '2g':

```javascript
if (navigator.connection?.effectiveType === '2g') {
  // Disable auto-play videos
  videoElement.autoplay = false;

  // Reduce image quality
  imageElement.srcSet = lowQualitySrcSet;

  // Disable animations
  document.documentElement.style.setProperty('--disable-animations', '1');

  // Preload critical resources
  fetch('/critical-data.json', { priority: 'high' });
}
```

## Low Battery Mode

Detect and optimize for low power mode:

```javascript
if (metrics.isLowPowerMode) {
  // Disable animations and transitions
  document.documentElement.classList.add('reduced-motion');

  // Stop background sync
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.controller?.postMessage({
      type: 'ENTER_LOW_POWER_MODE'
    });
  }

  // Reduce polling frequency
  const pollInterval = 60000; // 1 minute instead of 10 seconds
}
```

## Responsive Breakpoints

Use these breakpoints in CSS and JavaScript:

```
Mobile:       0px - 639px  (xs, sm)
Tablet Small: 640px - 767px (md)
Tablet:       768px - 1023px (lg)
Desktop:      1024px - 1279px (xl)
Desktop LG:   1280px+       (2xl)
```

```javascript
const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  desktopLg: 1280,
};

export const useResponsive = () => {
  const [size, setSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.mobile) setSize('mobile');
      else if (width < breakpoints.tablet) setSize('tablet');
      else if (width < breakpoints.desktop) setSize('tablet');
      else if (width < breakpoints.desktopLg) setSize('desktop');
      else setSize('desktopLg');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
```

## Form Optimization

### Input Types
```jsx
<!-- Use correct input types for mobile keyboards -->
<input type="email" autocomplete="email" />
<input type="tel" autocomplete="tel" />
<input type="url" autocomplete="url" />
<input type="number" inputMode="numeric" />
```

### Touch-Friendly Forms
```css
/* Large input fields for touch */
input, textarea, select {
  font-size: 16px; /* Prevents auto-zoom */
  padding: 12px;
  height: 44px;
}

/* Space between form fields */
.form-group {
  margin-bottom: 16px;
}

/* Large, centered submit button */
button[type="submit"] {
  width: 100%;
  min-height: 44px;
  font-size: 16px;
  margin-top: 16px;
}
```

## Testing Checklist

### Before Launch
- [ ] Test on 5+ actual devices
- [ ] Lighthouse score >90 on mobile
- [ ] All Core Web Vitals green
- [ ] Touch targets 44x44px minimum
- [ ] No horizontal scroll at any viewport
- [ ] Form fields autofocus/autocomplete working
- [ ] Tested with network throttling (3G)
- [ ] Tested with battery saver mode
- [ ] Keyboard doesn't hide inputs
- [ ] Images load with lazy loading
- [ ] No Flash/plugins required
- [ ] HTTPS enabled (required for some APIs)

## Mobile Analytics

Track mobile-specific metrics:

```javascript
// Send mobile metrics
logger.event('MobileMetrics', {
  device: deviceType,
  isMobile: isMobileViewport(),
  network: navigator.connection?.effectiveType,
  battery: batteryLevel,
  fps: metrics.fps,
});

// Monitor mobile conversions separately
fbq('track', 'Lead', {
  device_type: isMobileViewport() ? 'mobile' : 'desktop',
});
```

## Resources

- **Google Mobile Optimization:** https://developers.google.com/search/mobile-sites
- **MDN Responsive Design:** https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
- **WebAIM Mobile Accessibility:** https://webaim.org/articles/mobile/
- **Apple Human Interface Guidelines:** https://developer.apple.com/design/human-interface-guidelines/
- **Material Design Mobile:** https://material.io/design/platform-guidance/android-bars.html

---

**Mobile-first = success.** Test on real devices before launch!
