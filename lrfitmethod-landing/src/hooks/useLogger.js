import { useEffect } from 'react';
import { logger } from '@/utils/logger';

export function useLogger(componentName = 'Component') {
  useEffect(() => {
    logger.info(`${componentName} mounted`);

    return () => {
      logger.info(`${componentName} unmounted`);
    };
  }, [componentName]);

  return logger;
}

export function usePageLogger() {
  useEffect(() => {
    logger.info('Page view', {
      url: window.location.href,
      title: document.title,
      userAgent: navigator.userAgent,
    });

    logger.trackEvent('PageView', {
      path: window.location.pathname,
      title: document.title,
    });

    // Cleanup on unload
    const handleBeforeUnload = () => {
      const report = logger.generateReport();
      logger.info('Page unload', report.summary);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return logger;
}

export function useClickTracking() {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      const label = target.textContent || target.id || target.className;

      logger.trackEvent('ElementClick', {
        elementType: target.tagName,
        elementId: target.id,
        elementClass: target.className,
        label: label.slice(0, 50), // Limit to 50 chars
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}

export function useFormTracking(formId) {
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const handleSubmit = (e) => {
      logger.trackEvent('FormSubmit', {
        formId,
        timestamp: new Date().toISOString(),
      });
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [formId]);
}

export function useErrorBoundary() {
  useEffect(() => {
    const handleError = (error) => {
      logger.error('Component Error', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return logger;
}
