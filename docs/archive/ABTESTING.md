# A/B Testing Guide

## Overview

Optimize your landing page with split testing. Test different headlines, CTAs, colors, and messaging to find what converts best.

## Quick Start

### 1. Create an A/B Test

```javascript
import { ABTest } from '@/utils/abtest';

const test = new ABTest('hero_headline', {
  control: {
    headline: 'Original Headline',
    cta: 'Click Here',
  },
  variation: {
    headline: 'Test Headline',
    cta: 'Learn More',
  },
});

// Get assigned variant
console.log(test.variant); // 'control' or 'variation'

// Get variant data
const data = test.getVariantData();
console.log(data.headline);
```

### 2. Track Events

```javascript
// Track page view
test.trackEvent('PageView');

// Track clicks
test.trackEvent('CTAClick', { buttonId: 'hero-cta' });

// Track conversion
test.trackConversion(1); // value parameter is optional
```

### 3. View Results

```javascript
import { ABTestAnalytics } from '@/utils/abtest';

// Get results for an experiment
const results = ABTestAnalytics.getResults('hero_headline');
console.log(results);
// Output:
// [
//   {
//     variant: 'control',
//     total: 100,
//     conversions: 15,
//     conversionRate: 15.0,
//     totalValue: 150,
//   },
//   { ... }
// ]

// Find winner
const winner = ABTestAnalytics.getWinner(results);
console.log(winner);
// Output:
// {
//   winner: 'variation',
//   conversionRate: '18.50',
//   conversions: 37,
//   confidence: 'High'
// }

// Export to CSV
ABTestAnalytics.exportToCSV('hero_headline');
```

## React Hook

```javascript
import { useABTest } from '@/utils/abtest';

export default function MyComponent() {
  const { variant, data, trackEvent, trackConversion } = useABTest(
    'button_color',
    {
      control: { color: 'blue', label: 'Click Me' },
      variation: { color: 'red', label: 'Learn More' },
    }
  );

  return (
    <button
      style={{ backgroundColor: data.color }}
      onClick={() => trackConversion(1)}
    >
      {data.label}
    </button>
  );
}
```

## Common A/B Tests

### 1. Headlines

**Test different value propositions:**
- "Save Time" vs "Save Money" vs "Look Better"
- Emotional vs Logical
- Short vs Long

```javascript
new ABTest('headline_variant', {
  emotional: { headline: 'Transform Your Life in 90 Days' },
  logical: { headline: 'Scientific Method Proven by Data' },
});
```

### 2. Call-to-Action

**Test CTA text and design:**
- Button text: "Sign Up" vs "Get Started" vs "Claim Offer"
- Color: Red vs Green vs Gold
- Urgency: "Start Now" vs "Learn More"

```javascript
new ABTest('cta_text', {
  neutral: { cta: 'Learn More', color: 'gray' },
  urgent: { cta: 'Claim Your Spot Now', color: 'red' },
  enticing: { cta: '✨ Transform Today', color: 'gold' },
});
```

### 3. Pricing

**Test price points and presentation:**
- $99 vs $199 vs $299
- "One-time" vs "Monthly"
- "60-day guarantee" vs "90-day guarantee"

```javascript
new ABTest('pricing_strategy', {
  standard: { price: '$99', guarantee: '60 days' },
  premium: { price: '$149', guarantee: '90 days' },
  deluxe: { price: '$199', guarantee: 'Lifetime' },
});
```

### 4. Form Fields

**Test form complexity:**
- Minimal: Name, Email
- Standard: Name, Email, Phone
- Detailed: Name, Email, Phone, Goal, Experience

```javascript
new ABTest('form_length', {
  minimal: { fields: ['name', 'email'] },
  standard: { fields: ['name', 'email', 'phone'] },
});
```

### 5. Hero Image

**Test different hero images:**
- Product photo vs Lifestyle photo vs Results photo
- Text overlay vs No overlay
- Video vs Static image

```javascript
new ABTest('hero_image', {
  product: { image: '/hero-product.jpg', overlay: false },
  lifestyle: { image: '/hero-lifestyle.jpg', overlay: false },
  results: { image: '/hero-results.jpg', overlay: true },
});
```

## Statistical Significance

A/B test results are only reliable with sufficient data:

| Sample Size | Confidence |
|---|---|
| < 30 | Too small ⚠️ |
| 30-100 | Low (~80%) |
| 100-300 | Moderate (~90%) |
| 300+ | High (~95%) |
| 500+ | Very High (99%+) |

**Chi-square Test:**
The framework automatically calculates statistical significance using the chi-square test. Look for:
- "High Confidence" = Reliable result
- "Low Confidence" = Need more data

## Best Practices

### 1. Test One Thing at a Time
❌ Don't: Change headline AND button color AND image
✅ Do: Change only the headline, run for 1 week, then test button

### 2. Run for Long Enough
- Minimum: 100 conversions per variant
- Recommended: 1-2 weeks of data
- Avoid: Stopping too early

### 3. Monitor Bounce Rate
- High bounce rate? Test a different headline
- Low engagement? Test the CTA
- Poor conversion? Test pricing or guarantee

### 4. Test Emotional Triggers
- **Loss aversion:** "Don't miss out"
- **FOMO:** "Only 5 spots left"
- **Reciprocity:** "Free consultation"
- **Social proof:** "500+ satisfied clients"

### 5. Analyze Qualitatively Too
Don't just look at numbers:
- Collect user feedback
- Read form abandonment data
- Check scroll depth
- Review session recordings

## Tracking Conversions

### Pixel-Based (Meta, Google)
```javascript
// Track in component
if (window.fbq) {
  window.fbq('track', 'Lead', {
    experiment: 'hero_headline',
    variant: test.variant,
  });
}
```

### API-Based (Server-side)
```javascript
// Track in backend
POST /api/conversions {
  experiment: 'hero_headline',
  variant: 'variation',
  userId: '...',
  timestamp: '2026-08-05T...'
}
```

### Event-Based (Analytics)
```javascript
// Track in Google Analytics
gtag('event', 'conversion', {
  'experiment_id': 'hero_headline',
  'variant': test.variant,
});
```

## Implementation Checklist

- [ ] Assign variants randomly (50/50 split)
- [ ] Store variant assignment for consistency
- [ ] Track all relevant events
- [ ] Monitor for at least 100 conversions
- [ ] Check statistical significance
- [ ] Implement winner (remove loser variant)
- [ ] Document results for future reference
- [ ] Plan next test based on learnings

## Common Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| Too many concurrent tests | Results are noisy | Only 1 test active at a time |
| Changing test mid-way | Invalid results | Lock variant assignment |
| Not tracking enough data | Low confidence | Minimum 100 conversions |
| Testing too many variants | Underpowered | Maximum 2-3 variants |
| Ignoring external factors | Confounded results | Note holidays, campaigns, etc. |

## A/B Test Roadmap

### Phase 1: Headlines (Week 1-2)
Test different value propositions and emotional triggers

### Phase 2: CTA (Week 3-4)
Test button text, color, and placement

### Phase 3: Images (Week 5-6)
Test hero image, product photos, lifestyle shots

### Phase 4: Pricing (Week 7-8)
Test price points and guarantee messaging

### Phase 5: Forms (Week 9-10)
Test form complexity and field types

## Exporting & Reporting

### CSV Export
```javascript
ABTestAnalytics.exportToCSV('hero_headline');
// Downloads: abtest-hero_headline-2026-08-05.csv
```

**CSV Format:**
```
Variant,Total,Conversions,Rate (%),Avg Value
control,1000,150,15.00,100.00
variation,1020,189,18.53,105.50
```

### Monthly Report
Include in your dashboard:
- Active experiments
- Recent winners
- Planned tests
- Learnings and insights

## Advanced Usage

### Multivariate Testing
Test multiple variables simultaneously:
```javascript
new ABTest('multivariate', {
  v1: { headline: 'A', cta: 'Button 1' },
  v2: { headline: 'A', cta: 'Button 2' },
  v3: { headline: 'B', cta: 'Button 1' },
  v4: { headline: 'B', cta: 'Button 2' },
});
```

### Sequential Testing
Stop test early if winner is clear:
```javascript
const results = ABTestAnalytics.getResults('exp');
if (ABTestAnalytics.isSignificant(results)) {
  // Declare winner and stop test
}
```

### Segment Analysis
Split results by traffic source:
```javascript
const events = JSON.parse(localStorage.getItem('lrfit_abtest_events'));
const paidTraffic = events.filter((e) => e.source === 'google_ads');
// Analyze separately
```

## Tools & Integrations

### Built-in
- ✅ localStorage for variant assignment
- ✅ Chi-square statistical test
- ✅ CSV export

### Integrate with
- Google Analytics (gtag)
- Meta Pixel (fbq)
- Mixpanel
- Amplitude
- Segment

### External A/B Testing Platforms
- Optimizely
- VWO (Visual Website Optimizer)
- Unbounce
- Instapage

---

**Ready to experiment?** Start with your most important page element and run your first test this week!
