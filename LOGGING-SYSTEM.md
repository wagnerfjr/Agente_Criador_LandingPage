# Complete Logging & Cost Tracking System

**Purpose:** Track all operations, token usage, costs, and user interactions  
**Initialized:** 2026-08-05

---

## Quick Start

### Basic Logging

```jsx
import { logger } from '@/utils/logger';

// Log messages
logger.info('User clicked button', { buttonId: 'cta-1' });
logger.warn('API timeout', { endpoint: '/api/lead', duration: '5000ms' });
logger.error('Form validation failed', { fields: ['email'] });

// Track user actions
logger.trackEvent('FormSubmit', { formId: 'contact-form' });

// Track API calls
logger.trackApiCall('POST', '/api/lead', 200, 150, 1500);

// Track token usage
logger.trackTokens({
  model: 'claude-haiku',
  inputTokens: 1000,
  outputTokens: 500,
});
```

### In React Components

```jsx
import { useLogger, usePageLogger, useClickTracking } from '@/hooks/useLogger';

function MyComponent() {
  // Track component lifecycle
  const logger = useLogger('MyComponent');

  // Or track page views
  usePageLogger();

  // Or track clicks
  useClickTracking();

  return <button onClick={() => logger.trackEvent('Click', {})}>Click me</button>;
}
```

---

## Logging Levels

| Level | Use Case | Example |
|-------|----------|---------|
| **DEBUG** | Detailed dev info | Variable assignments, function calls |
| **INFO** | General events | Page loads, user actions |
| **WARN** | Suspicious activity | Slow API calls, missing data |
| **ERROR** | Recoverable errors | Form validation, API failures |
| **CRITICAL** | System failures | Crashes, auth failures |

```jsx
// Set minimum log level
logger.setLevel('INFO'); // Only INFO and above will be logged
```

---

## Token Usage Tracking

### Track API Calls with Tokens

```jsx
const startTime = logger.startTimer('apiCall');

// Make API call...

const duration = logger.endTimer('apiCall', startTime);

// Track token cost
const { totalTokens, cost } = logger.trackTokens({
  model: 'claude-sonnet',
  inputTokens: 2500,
  outputTokens: 1200,
});

console.log(`Cost: $${cost}`);
```

### Supported Models & Pricing

```javascript
{
  'claude-opus': { input: $15/M, output: $45/M },
  'claude-sonnet': { input: $3/M, output: $15/M },
  'claude-haiku': { input: $0.80/M, output: $4/M },
}
```

---

## Event Tracking

### Automatic Events

```jsx
// These are tracked automatically:
logger.trackEvent('PageView', { path, title });
logger.trackEvent('ElementClick', { elementId, elementType });
logger.trackEvent('FormSubmit', { formId });
```

### Custom Events

```jsx
// Track custom business events
logger.trackEvent('LeadCapture', {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'professional',
});

logger.trackEvent('PricingView', {
  plan: 'premium',
  price: 'R$ 699',
});

logger.trackEvent('CheckoutStart', {
  total: 699,
  currency: 'BRL',
});
```

---

## Exporting & Reporting

### Generate Report

```jsx
const report = logger.generateReport();

console.log(`Total logs: ${report.summary.totalLogs}`);
console.log(`Errors: ${report.summary.byLevel['ERROR']}`);
console.log(report.errors); // Array of errors
console.log(report.performance); // Timer data
console.log(report.events); // User events
```

### Export Formats

```jsx
// JSON export
const json = logger.exportJson();
// Save to file or send to server

// CSV export
const csv = logger.exportCsv();
// Import to Excel/Sheets

// Raw logs
const logs = logger.export();
```

### Save Locally

```jsx
// Logs auto-save to localStorage (last 100)
// Manual save:
logger.logs; // View all logs
logger.clear(); // Clear all logs
```

---

## Integration with Meta Pixel

Logging automatically tracks events to Meta Pixel:

```jsx
logger.trackEvent('ViewContent', {
  content_type: 'pricing_plan',
  content_name: 'Professional',
  value: 299,
  currency: 'BRL',
});

// Sends to:
window.fbq('track', 'ViewContent', { content_type, ... });
```

---

## Real-World Examples

### Example 1: Track Lead Capture

```jsx
function ContactForm() {
  const logger = useLogger('ContactForm');

  const handleSubmit = async (e) => {
    e.preventDefault();

    logger.info('Form submission started', { timestamp: new Date() });

    const startTime = logger.startTimer('formSubmit');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone }),
      });

      logger.trackApiCall('POST', '/api/leads', response.status, Date.now() - startTime);

      if (response.ok) {
        logger.trackEvent('LeadCapture', { email, plan });
        logger.info('Lead captured successfully', { email });
      } else {
        logger.warn('Lead capture failed', { status: response.status });
      }
    } catch (error) {
      logger.error('Form submission error', { error: error.message });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Example 2: Track Pricing Decision

```jsx
function PricingComponent() {
  usePageLogger(); // Auto-track page view

  const handlePlanSelect = (plan) => {
    logger.trackEvent('PlanSelected', {
      plan: plan.name,
      price: plan.price,
      features: plan.features.length,
    });
  };

  return (
    <div>
      {plans.map((plan) => (
        <button key={plan.id} onClick={() => handlePlanSelect(plan)}>
          {plan.name} - R$ {plan.price}
        </button>
      ))}
    </div>
  );
}
```

### Example 3: Monitor Performance

```jsx
function HeroSection() {
  useLogger('HeroSection');

  useEffect(() => {
    // Track when hero images load
    const images = document.querySelectorAll('.hero img');

    images.forEach((img) => {
      img.addEventListener('load', () => {
        logger.info('Hero image loaded', {
          src: img.src,
          width: img.width,
          height: img.height,
        });
      });
    });
  }, []);

  return <section className="hero">...</section>;
}
```

---

## Debugging in Production

### View Logs in Browser Console

```javascript
// In browser DevTools console:
logger.export() // See all logs
logger.generateReport() // Get summary report
logger.exportJson() // Copy as JSON
```

### Check Storage

```javascript
// View stored logs from localStorage
JSON.parse(localStorage.getItem('logger_LRFitMethod'))
```

### Send to Server (Optional)

```jsx
async function uploadLogs() {
  const logs = logger.export();

  await fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify(logs),
    headers: { 'Content-Type': 'application/json' },
  });

  logger.clear();
}
```

---

## Cost Analysis Dashboard (Planned)

```
Next Tasks (8-10):
├─ Task 8: Automated token counter
├─ Task 9: Cost dashboard
└─ Task 10: Monthly billing reports

This will show:
├─ Token usage by task/feature
├─ Cost breakdown
├─ Comparison to budget
└─ Billing for clients
```

---

## Checklist

- [x] Logger class created
- [x] Token tracking system implemented
- [x] React hooks integrated
- [x] Event tracking (automatic + custom)
- [x] Export capabilities (JSON, CSV)
- [x] Meta Pixel integration
- [x] Error boundary coverage
- [ ] Dashboard visualization (TODO)
- [ ] Automated billing reports (TODO)
- [ ] Alert system for over-usage (TODO)

---

## API Reference

```javascript
logger.debug(message, data)      // Log debug info
logger.info(message, data)       // Log info
logger.warn(message, data)       // Log warning
logger.error(message, data)      // Log error
logger.critical(message, data)   // Log critical

logger.trackEvent(name, data)    // Track user event
logger.trackApiCall(method, url, status, duration, cost)
logger.trackTokens({ inputTokens, outputTokens, model })

logger.startTimer(label)         // Start performance timer
logger.endTimer(label, startTime)

logger.export()                  // Export all logs
logger.exportJson()              // Export as JSON
logger.exportCsv()               // Export as CSV

logger.generateReport()          // Generate analysis report
logger.clear()                   // Clear all logs

logger.setLevel(level)           // Set minimum log level
```

---

**Logging system ready for production use. All operations tracked and costed.**
