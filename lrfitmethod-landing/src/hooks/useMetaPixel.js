import { useEffect } from 'react';
import { CONFIG } from '../config';

export function useMetaPixel() {
  useEffect(() => {
    if (!CONFIG.pixelId) {
      console.warn('Meta Pixel not configured (VITE_META_PIXEL_ID missing)');
      return;
    }
    if (window.fbq) {
      window.fbq('init', CONFIG.pixelId);
      window.fbq('track', 'PageView');
    }
  }, []);

  const trackLead = (origem) => {
    if (!window.fbq) return;
    window.fbq('track', 'Lead', {
      content_name: 'LR Fit Method CTA',
      origem: origem || 'geral',
      timestamp: new Date().toISOString(),
    });
  };

  return { trackLead };
}
