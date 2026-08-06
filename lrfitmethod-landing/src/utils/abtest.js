/**
 * A/B Testing Framework
 * Manage variants, track conversions, analyze results
 */

const STORAGE_KEY = 'lrfit_abtest_variant';
const EVENTS_KEY = 'lrfit_abtest_events';

/**
 * A/B Test Experiment
 */
export class ABTest {
  constructor(experimentId, variants = {}, options = {}) {
    this.experimentId = experimentId;
    this.variants = variants;
    this.options = {
      storage: true,
      tracking: true,
      ...options,
    };
    this.variant = this.getOrAssignVariant();
  }

  /**
   * Get or assign variant (sticky assignment)
   */
  getOrAssignVariant() {
    if (this.options.storage) {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${this.experimentId}`);
      if (stored) return stored;
    }

    const variantKeys = Object.keys(this.variants);
    const randomVariant = variantKeys[Math.floor(Math.random() * variantKeys.length)];

    if (this.options.storage) {
      localStorage.setItem(`${STORAGE_KEY}_${this.experimentId}`, randomVariant);
    }

    return randomVariant;
  }

  /**
   * Get variant data
   */
  getVariantData() {
    return this.variants[this.variant];
  }

  /**
   * Track event for this variant
   */
  trackEvent(eventName, data = {}) {
    if (!this.options.tracking) return;

    const event = {
      experimentId: this.experimentId,
      variant: this.variant,
      eventName,
      timestamp: new Date().toISOString(),
      ...data,
    };

    if (this.options.storage) {
      const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
      events.push(event);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    }

    // Also send to analytics
    if (window.fbq) {
      window.fbq('track', 'ABTest', {
        experiment_id: this.experimentId,
        variant: this.variant,
        event: eventName,
      });
    }
  }

  /**
   * Track conversion
   */
  trackConversion(value = 1) {
    this.trackEvent('Conversion', { value });
  }

  /**
   * Reset variant assignment
   */
  reset() {
    localStorage.removeItem(`${STORAGE_KEY}_${this.experimentId}`);
    this.variant = this.getOrAssignVariant();
  }
}

/**
 * A/B Test Analysis
 */
export class ABTestAnalytics {
  static getResults(experimentId) {
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    const expEvents = events.filter((e) => e.experimentId === experimentId);

    const results = {};

    // Group by variant
    expEvents.forEach((event) => {
      if (!results[event.variant]) {
        results[event.variant] = {
          variant: event.variant,
          total: 0,
          conversions: 0,
          conversionRate: 0,
          totalValue: 0,
          events: [],
        };
      }

      results[event.variant].total++;
      results[event.variant].events.push(event);

      if (event.eventName === 'Conversion') {
        results[event.variant].conversions++;
        results[event.variant].totalValue += event.value || 0;
      }
    });

    // Calculate metrics
    Object.values(results).forEach((result) => {
      result.conversionRate = result.total > 0 ? (result.conversions / result.total) * 100 : 0;
      result.avgValue = result.conversions > 0 ? result.totalValue / result.conversions : 0;
    });

    return Object.values(results);
  }

  /**
   * Calculate statistical significance (Chi-square test)
   */
  static isSignificant(results) {
    if (results.length < 2) return false;

    const totalEvents = results.reduce((sum, r) => sum + r.total, 0);
    const expectedRate = results.reduce((sum, r) => sum + r.conversions, 0) / totalEvents;

    let chiSquare = 0;
    results.forEach((result) => {
      const expected = result.total * expectedRate;
      const observed = result.conversions;
      chiSquare += Math.pow(observed - expected, 2) / expected;
    });

    // Critical value for 95% confidence, 1 degree of freedom ≈ 3.841
    return chiSquare > 3.841;
  }

  /**
   * Get winner (highest conversion rate with statistical significance)
   */
  static getWinner(results) {
    if (!this.isSignificant(results)) {
      return { winner: null, confidence: 'Low' };
    }

    const winner = results.reduce((prev, curr) =>
      curr.conversionRate > prev.conversionRate ? curr : prev
    );

    return {
      winner: winner.variant,
      conversionRate: winner.conversionRate.toFixed(2),
      conversions: winner.conversions,
      confidence: 'High',
    };
  }

  /**
   * Export results to CSV
   */
  static exportToCSV(experimentId) {
    const results = this.getResults(experimentId);

    const headers = ['Variant', 'Total', 'Conversions', 'Rate (%)', 'Avg Value'];
    const rows = results.map((r) => [
      r.variant,
      r.total,
      r.conversions,
      r.conversionRate.toFixed(2),
      r.avgValue.toFixed(2),
    ]);

    const csv = [
      `A/B Test Results: ${experimentId}`,
      '',
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abtest-${experimentId}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }
}

/**
 * React Hook for A/B Testing
 */
export function useABTest(experimentId, variants, options) {
  const [test] = React.useState(() => new ABTest(experimentId, variants, options));
  const [variant, setVariant] = React.useState(test.variant);

  React.useEffect(() => {
    test.trackEvent('PageView');
  }, [test]);

  return {
    variant,
    data: test.getVariantData(),
    trackEvent: test.trackEvent.bind(test),
    trackConversion: test.trackConversion.bind(test),
  };
}

export default {
  ABTest,
  ABTestAnalytics,
  useABTest,
};
