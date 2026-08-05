# LR Fit Method — Design System

**Version:** 1.0.0  
**Last Updated:** 2026-08-05

## Overview

The LR Fit Method design system provides a cohesive set of design tokens, components, and patterns for building the landing page. It's built on **Tailwind CSS** for rapid, consistent UI development.

---

## Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Gold** | `#D4AF37` | Primary CTA, highlights, interactive elements |
| **Gold Dark** | `#B8860B` | Hover states, active states |
| **Dark** | `#1a1a1a` | Primary text, backgrounds for contrast |

### Neutral Palette

| Shade | Hex | Usage |
|-------|-----|-------|
| **Gray 100** | `#f9fafb` | Lightest background |
| **Gray 200** | `#f3f4f6` | Light backgrounds, secondary surface |
| **Gray 300** | `#e5e7eb` | Borders, subtle dividers |
| **Gray 400** | `#d1d5db` | Secondary borders |
| **Gray 500** | `#9ca3af` | Disabled text, secondary labels |
| **Gray 600** | `#6b7280` | Secondary text |
| **Gray 700** | `#4b5563` | Body text (secondary) |
| **Gray 800** | `#1f2937` | Dark text |
| **Gray 900** | `#111827` | Darkest text |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Success** | `#10b981` | Success states, confirmations |
| **Warning** | `#f59e0b` | Warnings, alerts |
| **Error** | `#ef4444` | Errors, destructive actions |
| **Info** | `#3b82f6` | Information, help text |

---

## Typography

### Font Families

- **Headings:** Montserrat (weights: 600, 700, 800)
- **Body Text:** Inter (weights: 400, 500, 600)

### Font Sizes

| Size | Rem | Px | Usage |
|------|-----|----|----|
| **xs** | 0.75rem | 12px | Small labels, captions |
| **sm** | 0.875rem | 14px | Secondary text |
| **base** | 1rem | 16px | Body text (default) |
| **lg** | 1.125rem | 18px | Large body text |
| **xl** | 1.25rem | 20px | Subheadings |
| **2xl** | 1.5rem | 24px | Section headings |
| **3xl** | 1.875rem | 30px | Large section headings |
| **4xl** | 2.25rem | 36px | Page headings |
| **5xl** | 3rem | 48px | Hero headings |
| **6xl** | 3.75rem | 60px | Large hero headings |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| **Light** | 300 | Decorative, elegant text |
| **Normal** | 400 | Body text |
| **Medium** | 500 | Emphasis within body |
| **Semibold** | 600 | Subheadings, labels |
| **Bold** | 700 | Headings, CTAs |
| **Extrabold** | 800 | Hero headings |

### Line Heights

| Height | Value | Usage |
|--------|-------|-------|
| **Tight** | 1.2 | Headings, compact text |
| **Normal** | 1.5 | Body text (default) |
| **Relaxed** | 1.75 | Long-form content |
| **Loose** | 2 | Spaced, readable content |

---

## Spacing Scale

| Unit | Value (px) | Usage |
|------|-----------|-------|
| **0** | 0 | No spacing |
| **1** | 4px | Micro-spacing |
| **2** | 8px | Tight spacing |
| **3** | 12px | Close spacing |
| **4** | 16px | Standard spacing |
| **6** | 24px | Comfortable spacing |
| **8** | 32px | Section spacing |
| **12** | 48px | Large section spacing |
| **16** | 64px | Component spacing |
| **20** | 80px | Page section spacing |
| **24** | 96px | Large section spacing |
| **32** | 128px | Extra-large spacing |

---

## Shadows

| Shadow | CSS | Usage |
|--------|-----|-------|
| **sm** | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Subtle elevation |
| **md** | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | Standard elevation |
| **lg** | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | Prominent elevation |
| **xl** | `0 20px 25px -5px rgba(0, 0, 0, 0.1)` | Maximum elevation |

---

## Components

### Button

Used for primary and secondary actions. Supports multiple variants and sizes.

**Variants:**
- `primary` — Gold background (default CTA)
- `secondary` — Dark background (secondary action)
- `outline` — Gold border, no fill (tertiary action)
- `ghost` — No background, gold text (low-priority action)

**Sizes:**
- `sm` — 12px/14px padding
- `md` — 16px/20px padding (default)
- `lg` — 24px/30px padding
- `xl` — 32px/40px padding

**Example:**
```jsx
import { Button } from '@/components';

<Button variant="primary" size="lg">
  Comece agora
</Button>
```

---

### Card

Container component for grouped content. Supports elevation and border variants.

**Variants:**
- `elevated` — Shadow + border (default)
- `flat` — Light background + border
- `outlined` — Border only

**Padding:**
- `none` — No padding
- `sm` — 16px
- `md` — 24px (default)
- `lg` — 32px
- `xl` — 48px

**Example:**
```jsx
import { Card } from '@/components';

<Card variant="elevated" padding="lg">
  <h3>Feature Title</h3>
  <p>Feature description goes here.</p>
</Card>
```

---

### Grid

Responsive grid layout component with automatic column distribution.

**Props:**
- `cols` — Number of columns (1, 2, 3, 4, 6)
- `gap` — Spacing between items (sm, md, lg, xl)
- `responsive` — Enable responsive breakpoints (true by default)

**Example:**
```jsx
import { Grid, Card } from '@/components';

<Grid cols={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

---

## Responsive Design

### Breakpoints

| Screen | Min Width | Usage |
|--------|-----------|-------|
| **Mobile** | 0px | Default/small screens |
| **sm** | 640px | Tablets (portrait) |
| **md** | 768px | Tablets (landscape) |
| **lg** | 1024px | Desktops |
| **xl** | 1280px | Large desktops |
| **2xl** | 1536px | Extra-large screens |

**Usage in Tailwind:**
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>
```

---

## Accessibility

- All interactive elements support focus states (gold ring)
- Links and buttons have sufficient color contrast
- Form inputs support disabled states
- Skip-to-content links available (`sr-only` class)
- Semantic HTML structure maintained
- ARIA attributes used where appropriate

---

## Best Practices

### Typography
- Use heading hierarchy (h1 → h6) consistently
- Line length: 65-75 characters for optimal readability
- Minimum font size: 14px (sm) for body text

### Spacing
- Use spacing scale consistently (no arbitrary spacing)
- Maintain visual hierarchy with spacing variations
- Align components to 4px/8px grid when possible

### Components
- Use existing components before creating new ones
- Extend component props rather than overriding styles
- Keep component logic separate from styling

### Colors
- Gold (#D4AF37) for CTAs and highlights only
- Don't use color alone to convey meaning
- Maintain sufficient contrast ratios (WCAG AA minimum)

---

## File Organization

```
lrfitmethod-landing/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Grid.jsx
│   │   └── index.js
│   ├── styles/
│   │   └── theme.js
│   └── index.css
├── tailwind.config.js
└── postcss.config.js
```

---

## Tokens Used

All design decisions are based on the centralized tokens in `theme.js`. To update design system values, edit that file and they propagate across all components.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-08-05 | Initial design system with Button, Card, Grid components |

---

**Maintained by:** Dev Agent  
**Last Review:** 2026-08-05  
**Status:** Active
