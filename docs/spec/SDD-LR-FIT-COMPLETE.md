# Software Design Document (SDD)
## LR Fit Method - Landing Page + Analytics

**Document Status:** READY FOR EXECUTE  
**Last Updated:** 2026-08-04  
**Owner:** Wagner (Tech Lead + Marketer)  
**Project Phase:** SPECIFY ✅ | DESIGN ✅ | TASKS ✅ | **EXECUTE** ⏭️

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Definition (SPECIFY)](#project-definition-specify)
3. [System Architecture (DESIGN)](#system-architecture-design)
4. [Implementation Tasks (TASKS)](#implementation-tasks-tasks)
5. [Execution Plan (EXECUTE)](#execution-plan-execute)
6. [Risk Mitigation](#risk-mitigation)
7. [Success Criteria](#success-criteria)

---

## Executive Summary

**What:** A React landing page for LR Fit Method (fitness consultancy) that captures leads via WhatsApp with intelligent trainer routing and Meta Pixel tracking.

**Why:** To test Meta Ads ROI (R$5-10/day), measure cost-per-lead (<R$15 target), and create a reusable template for selling to other consultancies.

**Timeline:** 4-5 weeks (15-30 days)  
**Scope:** Landing (8 sections) + Design System + Setup Guide  
**Success:** 100+ page views, 10+ leads, <R$15 CPL, Dashboard operational

---

# PART 1: PROJECT DEFINITION (SPECIFY)

## 1.1 Business Context

### 1.1.1 The Client
- **Name:** LR Fit Method
- **Owners:** Renata & Leandro (couple, gym in Osasco/SP)
- **Model:** Online fitness consultancy (training + diet + supplementation)
- **Niche:** Regular people wanting fitness + healthy lifestyle (not athletes)
- **Differentiator:** "Consistency > Perfection" + "Discipline in routine, freedom in life"
- **Status:** Real paying clients + transformation photos ready

### 1.1.2 Business Objectives (Next 90 Days)
| Metric | Target | Owner | Timeline |
|--------|--------|-------|----------|
| Leads/month | 50+ | Wagner + Meta Ads | Week 4+ |
| Cost per lead | <R$15 | Wagner + Meta Ads | Week 4+ |
| Page views | 100+ | Landing (30 days) | Week 4 |
| Conversion rate (visits → WhatsApp click) | >25% | Wagner | Week 4 |
| Landing deployment | Vercel (0 downtime) | Wagner | Week 3 |
| Meta Pixel tracking | 100% PageView capture | Wagner | Week 3 |

### 1.1.3 Future Vision (Milestone 4, deferred)
- Template generator: JSON input → deployed landing output
- Replicable playbook for 5+ consultancies
- Markup 40% selling to other consultancies

---

## 1.2 Functional Scope

### 1.2.1 INCLUDED (MVP)

#### Feature: LR Fit Landing Page
**ID:** FEATURE-LR-001  
**Components:** 8 sections
| Section | ID | Purpose | Status |
|---------|----|---------| -------|
| Hero | FR-001 | Trainer-conditional photo + CTA (scroll to prova social) | ✅ Spec'd |
| Problema | FR-002 | Pain point + transformation example | ✅ Spec'd |
| 3 Pilares | FR-003 | 3 pillars grid (training, nutrition, freedom) | ✅ Spec'd |
| Quem Somos | FR-004 | 2 trainer cards with photo + bio + button | ✅ Spec'd |
| Resultados | FR-005 | Before/after grid (client transformations) | ✅ Spec'd |
| Metodologia | FR-006 | 4-step process explanation | ✅ Spec'd |
| CTA Final | FR-007 | Dual WhatsApp buttons (Renata + Leandro) | ✅ Spec'd |
| Footer | FR-008 | Links + social + copyright | ✅ Spec'd |

**Technical Features:**
| Feature | ID | Purpose | Status |
|---------|----|---------| -------|
| URL param routing | FR-009 | `?trainer=renata` or `?trainer=leandro` changes hero + button | ✅ Spec'd |
| Meta Pixel Integration | FR-010 | Track PageView + Lead events | ✅ Spec'd |
| SEO & OG Tags | FR-011 | Title, meta description, Open Graph for sharing | ✅ Spec'd |
| Responsive Design | NFR-001 | 375px (mobile) to 1920px (desktop) | ✅ Spec'd |
| Performance | NFR-002 | Lighthouse score >75, <2s load on Vercel | ✅ Spec'd |
| Accessibility | NFR-003 | WCAG 2.1 AA compliance (keyboard nav, alt text) | ✅ Spec'd |

#### Feature: Analytics (Manual Process)
**ID:** FEATURE-LR-002  
**Scope:** Ritual for reading Meta Ads Manager + Events Manager (NO custom code)  
**Decision:** Use native Meta tools for MVP (dashboard custom deferred to phase 2)

#### Supporting: Design System
**Components:** Colors, typography, spacing, reusable buttons/cards  
**Output:** Tailwind config + documentation

#### Supporting: Setup Guide
**Content:** How to create Meta Pixel, configure campaigns, deploy to Vercel, read dashboard

---

### 1.2.2 EXCLUDED (MVP)
- ❌ Payment/checkout system
- ❌ Advanced WhatsApp automation (just `wa.me` links)
- ❌ Custom analytics dashboard (using Meta's native tools)
- ❌ Blog/SEO strategy (ads-driven only)
- ❌ Mobile app
- ❌ CRM integration

---

## 1.3 Technical Stack (Locked Decisions)

| Layer | Choice | Why |
|-------|--------|-----|
| **Frontend** | React 18 + Vite | Reusable, fast dev, easy to template later |
| **Hosting** | Vercel Free | Zero-ops, auto-deploy from GitHub, free |
| **Styling** | TailwindCSS | Utility-first, component reutilization |
| **Tracking** | Meta Pixel (client-side) | Integrated with Ad Manager, simple setup |
| **Analytics DB** | Supabase PostgreSQL | Low latency, already chosen (optional MVP) |
| **Deployment** | GitHub → Vercel auto-deploy | Clean CI/CD, no manual steps |
| **Language** | Portuguese (Brazil) | Client requirement |
| **Node version** | 18+ | LTS, widely available |

### Tech Constraints
- **Bundle size target:** <100KB (gzip) for <2s page load
- **Browser support:** Last 2 versions of Chrome/Firefox/Safari + IE 11 (if clients use)
- **Image format:** WebP + JPEG fallback, <100KB per image

---

## 1.4 Data Models & Content Schema

### 1.4.1 Content Source: `lrfit.content.json`

**Location:** `src/content/lrfit.content.json`  
**Purpose:** Single source of truth — all copy, colors, trainer info, offers live here  
**Key Principle:** Components IMPORT this, never hardcode strings

**Structure (High-level):**
```json
{
  "brand": { colors, fonts, tagline, logo path },
  "hero": { headline, subheadline, CTA text, photo path },
  "problema": { headline, body, CTA },
  "pilares": [ { icon, title, description }, ... ],
  "quemSomos": [
    { name, role, bio, photo, phone, whatsappText },
    { name, role, bio, photo, phone, whatsappText }
  ],
  "resultados": [
    { beforePhoto, afterPhoto, story },
    ...
  ],
  "metodologia": [ { step, title, description }, ... ],
  "ctaFinal": { primaryText, secondaryText },
  "footer": { links, social, copyright }
}
```

**Governance:**
- Status field: `"STATUS": "PENDENTE"` = placeholder, agent/Wagner will ask before deploying
- Example: `"phone": "STATUS: PENDENTE"` = deployment blocker
- Validation script checks for PENDENTE before deploy (see Task-1.5)

### 1.4.2 Asset Pipeline

**Folder structure:**
```
assets/raw/           ← intake (photos from client)
public/images/        ← optimized output (served by landing)
```

**Process (Task-1.5):**
1. Client sends photos to Wagner (WhatsApp/Drive)
2. Move to `assets/raw/` with naming convention: `hero-casal.jpg`, `trainer-renata.jpg`, etc.
3. Script (`scripts/process-assets.js`) converts to WebP, optimizes, outputs to `public/images/`
4. Content JSON points to public paths

**Max size per image:** 150KB (optimized), 50KB for trainer headshots

---

# PART 2: SYSTEM ARCHITECTURE (DESIGN)

## 2.1 Component Architecture

### 2.1.1 Component Tree
```
App.jsx
├─ Header (logo + nav, optional)
├─ Hero (FR-001)
│  └─ useTrainerParam hook → detects ?trainer=X
├─ Problema (FR-002)
├─ Pilares (FR-003)
│  ├─ PillarCard × 3
├─ QuemSomos (FR-004)
│  ├─ TrainerCard × 2
│     └─ TrainerCTA (WhatsApp button routing)
├─ Resultados (FR-005)
│  ├─ ResultCard × N
├─ Metodologia (FR-006)
│  ├─ StepCard × 4
├─ CTAFinal (FR-007)
│  ├─ DualButton (Renata | Leandro)
├─ Footer (FR-008)
└─ useMetaPixel hook (FR-010)
   └─ Tracks PageView (on mount) + Lead (on button click)
```

### 2.1.2 Component Specifications

#### Hero Component
**Props:**
```javascript
// Auto-detected from URL, no props needed
// useTrainerParam hook handles ?trainer=name
```

**State:**
- `trainerParam`: "renata" | "leandro" | null
- `photoUrl`: computed from trainer param

**Behavior:**
- Default: shows casal photo large
- `?trainer=renata`: highlights Renata (55% viewport, gold border)
- `?trainer=leandro`: highlights Leandro (55% viewport, gold border)
- Invalid param: falls back to casal (safe)
- CTA: "Começar Agora" → scroll to `#quem-somos` (NOT direct WhatsApp)

**Styling:**
- Montserrat headline (48px desktop, 32px mobile)
- Gold (#D4AF37) accent on CTA button
- Responsive image (40% scale reduction on mobile)

---

#### TrainerCard Component (in QuemSomos)
**Props:**
```javascript
{
  name: string,           // "Renata"
  role: string,           // "Personal Trainer & Nutricionista"
  bio: string,            // "Pós-grad em..."
  photoUrl: string,       // "/images/trainer-renata.jpg"
  phoneNumber: string,    // "+55 11 98765-4321"
  isHighlighted: boolean  // from URL param
}
```

**Behavior:**
- Circular photo (border-radius: 50%)
- If `isHighlighted=true`: gold border (#D4AF37) + subtle shadow increase
- Name + role + bio rendered from content.json
- Button: "Fale com [Name]" → triggers Lead event + opens wa.me link

**Styling:**
- Card: white background, dark text
- Border: 2px transparent (no border) → 3px gold (highlighted)
- Responsive: side-by-side desktop, stack mobile

---

#### Resultados Component (Before/After Grid)
**Props:**
```javascript
{
  results: Array<{
    beforePhoto: string,
    afterPhoto: string,
    story: string          // "Lost 15kg in 12 weeks..."
  }>
}
```

**Behavior:**
- Grid: 2 columns desktop, 1 column mobile
- Each row: before photo | after photo (horizontally)
- Story text below each pair
- Lazy-load images (Intersection Observer)

---

### 2.1.3 Hooks (Custom)

#### useTrainerParam
**Purpose:** Parse URL `?trainer=X` and expose trainer selection globally

**Returns:**
```javascript
{
  trainer: "renata" | "leandro" | null,
  photoUrl: string,  // derived from trainer
  phoneNumber: string // from content.json
}
```

**Implementation:**
```javascript
// src/hooks/useTrainerParam.js
import { useSearchParams } from 'react-router-dom'; // or just window.location

export function useTrainerParam() {
  const [searchParams] = useSearchParams();
  const trainer = searchParams.get('trainer');
  
  // validate & fallback
  const validTrainers = ['renata', 'leandro'];
  const normalizedTrainer = validTrainers.includes(trainer) ? trainer : null;
  
  const trainerData = content.quemSomos.find(t => 
    t.name.toLowerCase() === normalizedTrainer
  );
  
  return {
    trainer: normalizedTrainer,
    photoUrl: trainerData?.photoUrl || content.hero.photoDefault,
    phoneNumber: trainerData?.phoneNumber || null
  };
}
```

#### useMetaPixel
**Purpose:** Initialize Meta Pixel on mount, track PageView + Lead events

**Usage:**
```javascript
// In App.jsx
const { trackEvent } = useMetaPixel('YOUR_PIXEL_ID');

// On button click
const handleWhatsAppClick = () => {
  trackEvent('Lead', {
    content_name: 'WhatsApp Lead',
    trainer: trainerParam.trainer
  });
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
};
```

**Implementation:**
```javascript
// src/hooks/useMetaPixel.js
export function useMetaPixel(pixelId) {
  useEffect(() => {
    // Load Meta Pixel script
    fbq('init', pixelId);
    fbq('track', 'PageView');
  }, [pixelId]);
  
  const trackEvent = (eventName, data) => {
    fbq('track', eventName, data);
  };
  
  return { trackEvent };
}
```

---

### 2.1.4 Data Flow & State Management

**Flow Diagram:**
```
Browser URL (?trainer=X)
    ↓
useTrainerParam (detects X)
    ↓
App context / prop drill (or Context API)
    ↓
Hero, TrainerCard, CTAFinal consume trainer
    ↓
User clicks WhatsApp button
    ↓
useMetaPixel.trackEvent('Lead')
    ↓
Meta Pixel server (collects event)
    ↓
Meta Ads Manager (reports impressions, leads, cost)
```

**State Architecture:**
- No Redux/Redux Toolkit for MVP (overkill)
- Use React Context for `trainer` + `content` if prop drilling gets deep
- Local component state for UI-only things (open/close modals, hover states)

---

## 2.2 Design System

### 2.2.1 Color Palette
```css
Primary (Headlines, CTA, Accents): #D4AF37 (Gold)
Dark (Background, Text): #0A0E27 (Navy/Preto)
Light (Text on dark): #FFFFFF (White)
Accent (Highlights): #FF69B4 (Hot Pink, optional)
Success: #10B981 (Green, for form validation)
Error: #EF4444 (Red)
```

### 2.2.2 Typography
```css
Heading Font: Montserrat (bold, 600+ weight)
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 24px (mobile)
  - H3: 28px (desktop), 20px (mobile)

Body Font: Inter (regular, 400 weight)
  - Body text: 16px (desktop), 14px (mobile)
  - Small text: 14px (desktop), 12px (mobile)

Line height: 1.6 (body), 1.2 (headings)
```

### 2.2.3 Spacing & Layout
```css
Base unit: 8px (multiples: 8, 16, 24, 32, 40, 48px)
Container max-width: 1200px
Padding (sections): 48px (desktop), 24px (mobile)
Gap between cards: 24px (desktop), 16px (mobile)
```

### 2.2.4 Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: '#D4AF37',
      dark: '#0A0E27',
      light: '#FFFFFF',
      accent: '#FF69B4'
    },
    fontFamily: {
      heading: ['Montserrat', 'sans-serif'],
      body: ['Inter', 'sans-serif']
    },
    spacing: {
      // 8px base unit already default
    }
  },
  extend: {
    // Custom utilities if needed
  }
};
```

---

### 2.2.5 Reusable Components

#### Button
```javascript
<Button
  variant="primary" | "secondary" | "outline"
  size="sm" | "md" | "lg"
  onClick={handler}
  disabled={false}
>
  Label
</Button>
```

#### Card
```javascript
<Card className="p-6 rounded-lg bg-white shadow-md">
  {children}
</Card>
```

#### Grid
```javascript
<Grid cols={3} colsMobile={1} gap="24px">
  {items.map(item => <div key={item.id}>{item}</div>)}
</Grid>
```

---

## 2.3 Meta Pixel Integration

### 2.3.1 Setup
1. **Pixel ID:** Stored in `.env.local` as `VITE_META_PIXEL_ID`
2. **Script injection:** React app loads pixel script in `useMetaPixel` hook
3. **Events tracked:**
   - **PageView:** Automatic on page load
   - **Lead:** Fired when user clicks any WhatsApp button

### 2.3.2 Event Payload
```javascript
// PageView (automatic)
fbq('track', 'PageView');

// Lead (on button click)
fbq('track', 'Lead', {
  content_name: 'LR Fit Consultoria',
  trainer: 'renata' || 'leandro' || null,
  lead_type: 'whatsapp'
});
```

### 2.3.3 Pixel Validation (in Tasks)
- Check Pixel fires in browser DevTools
- Test with ?trainer=renata, ?trainer=leandro, no params
- Verify events appear in Meta Events Manager within 30 seconds

---

## 2.4 Deployment Architecture

### 2.4.1 GitHub → Vercel Pipeline
```
GitHub repo: lrfitmethod-landing
    ↓
Branch: main (production)
Branch: dev (staging)
    ↓
On push to main:
  - Vercel auto-builds
  - Runs build check (npm run build)
  - Deploys to vercel.app domain
  - Sets env vars from Vercel project settings
```

### 2.4.2 Environment Variables (Vercel Project Settings)
```
VITE_META_PIXEL_ID = "123456789"
VITE_API_URL = "https://api.example.com" (if needed later)
```

### 2.4.3 Lighthouse Targets
```
Performance: >75
Accessibility: >90
Best Practices: >90
SEO: >90
```

---

# PART 3: IMPLEMENTATION TASKS (TASKS)

## 3.1 Task Overview & Dependencies

**Total tasks:** 16 (organized by phase)

**Legend:**
- 🟢 **Ready to start** — no dependencies
- 🟡 **Blocked** — waiting for previous task
- 🔴 **Gate check** — must verify before moving next

---

## 3.2 Task Breakdown

### Phase 0: Project Setup

#### Task 0: Meta Pixel Setup
**Estimated Time:** 30 min  
**Dependencies:** None  
**Deliverable:** `VITE_META_PIXEL_ID` confirmed in `.env.local`

**What:** 
- Confirm if Meta Pixel exists (check Meta Business Account)
- If not, create new pixel in Meta Business Suite
- Get Pixel ID, save to `.env.local`

**Where:**
- `.env.local`
- `src/config.js` (verify pixel ID imported)

**Done When:**
- ✅ `VITE_META_PIXEL_ID` has valid 16-digit ID
- ✅ Test script confirms pixel loads in browser

**Tests:**
```bash
# Manual test in browser console (after dev server runs)
window.fbq('track', 'PageView');
# Check Meta Events Manager — event appears within 30s
```

**Gate:** Pixel ID confirmed. No deploy without this.

---

#### Task 1: React Project Setup + GitHub + Vercel
**Estimated Time:** 1 hour  
**Dependencies:** Task 0  
**Deliverable:** GitHub repo + Vercel project linked + dev server running locally

**What:**
1. Create new React app: `npm create vite@latest lrfitmethod-landing -- --template react`
2. Install deps: React, TailwindCSS, react-router-dom, axios
3. Initialize Git, create GitHub repo `lrfitmethod-landing`
4. Link Vercel to GitHub repo (auto-deploy on push)
5. Test: `npm run dev` runs locally on http://localhost:5173

**Where:**
```
lrfitmethod-landing/
├─ .github/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ content/
│     └─ lrfit.content.json ← create this
├─ public/
│  └─ images/ ← will populate with assets
├─ .env.local
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
└─ vercel.json
```

**Done When:**
- ✅ `git remote -v` shows GitHub URL
- ✅ Vercel dashboard shows repo linked
- ✅ `npm run dev` launches without errors
- ✅ GitHub has initial commit (project setup)

**Tests:**
```bash
npm run dev
# Open http://localhost:5173
# Should see Vite default page
git log --oneline # verify commit
```

**Gate:** Dev environment ready. Can push to GitHub and Vercel auto-deploys.

---

#### Task 1.5: Content Schema + Asset Pipeline
**Estimated Time:** 45 min  
**Dependencies:** Task 1  
**Deliverable:** `lrfit.content.json` + asset processing script + validation gate

**What:**
1. Create `src/content/lrfit.content.json` with full schema (see 1.4.1 above)
2. Populate with brand info, all copy, trainer bios from client
3. Mark anything pending as `"STATUS": "PENDENTE"`
4. Create `scripts/process-assets.js` (converts `assets/raw/` → `public/images/`, WebP + JPEG, optimize)
5. Create `scripts/validate-content.js` (checks for PENDENTE before deploy, fails build if found)
6. Add to `package.json` scripts: `npm run optimize-assets` and `npm run validate`

**Where:**
```
src/content/lrfit.content.json
scripts/process-assets.js
scripts/validate-content.js
```

**Done When:**
- ✅ Content JSON has all 8 sections + trainer data
- ✅ Script can convert 1 image: `node scripts/process-assets.js`
- ✅ Validation catches `"STATUS": "PENDENTE"` and fails with clear error
- ✅ Pre-commit hook runs validation (optional, see Task 1.6)

**Tests:**
```bash
# Test image processing
mkdir -p assets/raw
cp ~/sample.jpg assets/raw/
node scripts/process-assets.js
# Check public/images/ for hero-sample.jpg + hero-sample.webp

# Test validation
npm run validate
# Should show: "Content is valid" or "Error: [X] fields still PENDENTE"
```

**Gate:** Content schema locked. Any build will fail if PENDENTE fields remain (safety for production).

---

#### Task 1.6: GitHub Workflow (Optional but Recommended)
**Estimated Time:** 20 min  
**Dependencies:** Task 1.5  
**Deliverable:** `.github/workflows/ci.yml`

**What:**
- Create CI pipeline that runs on every push
- Steps: install → lint → build → validate-content
- Fails build if validation finds PENDENTE

**Where:**
```
.github/workflows/ci.yml
```

**Done When:**
- ✅ Push to GitHub triggers CI
- ✅ CI runs `npm run validate`
- ✅ Can be merged only if CI passes

**Tests:**
```bash
git push origin main
# Check GitHub Actions tab — should show workflow running
```

**Gate:** Optional for MVP, but recommended to prevent accidental deployments with placeholders.

---

### Phase 1: Landing Page Components (6 tasks)

#### Task 2: Hero Section (FR-001)
**Estimated Time:** 1.5 hours  
**Dependencies:** Task 1.5  
**Deliverable:** `src/components/Hero.jsx` + tests

**What:**
1. Create `Hero.jsx` component
2. Use `useTrainerParam` hook to detect `?trainer=X`
3. Render photo (casal default, or trainer-specific)
4. Headline: "O Corpo que Você Deseja, A Vida que Você Merece"
5. Subheadline from content.json
6. CTA button: "Começar Agora" → scrolls to `#quem-somos` (smooth scroll)
7. Responsive: 40% scale reduction on mobile

**Where:**
```
src/components/Hero.jsx
src/hooks/useTrainerParam.js (create if not exists)
```

**Done When:**
- ✅ Hero renders on page load
- ✅ Photos change correctly: `/` → casal, `/?trainer=renata` → Renata photo
- ✅ Invalid param `/?trainer=invalid` → falls back to casal
- ✅ Button scroll-animates to `#quem-somos`
- ✅ Mobile responsive (40% photo scale, headline 32px)

**Tests:**
```bash
# Manual testing in browser
http://localhost:5173
http://localhost:5173?trainer=renata
http://localhost:5173?trainer=leandro
http://localhost:5173?trainer=invalid

# Check:
# - Photos change
# - CTA button scrolls on click
# - No console errors
# - Lighthouse: Performance >75
```

**Gate:** Hero displays correctly with all variants. Scroll animation works smoothly.

---

#### Task 3: Problema Section (FR-002)
**Estimated Time:** 45 min  
**Dependencies:** Task 1.5  
**Deliverable:** `src/components/Problema.jsx`

**What:**
1. Create `Problema.jsx`
2. Headline: "Você tá cansado de plano genérico?" (from content.json)
3. Body text: explain differentiator (from content.json)
4. Include 1 before/after transformation photo
5. CTA: "Entender a Metodologia" → scroll to `#metodologia`
6. Styling: Montserrat heading (28px desktop, 20px mobile), max width 600px for text

**Where:**
```
src/components/Problema.jsx
```

**Done When:**
- ✅ Section renders with headline + body + photo
- ✅ CTA scrolls to metodologia section
- ✅ Text max-width 600px (centered on wide screens)
- ✅ Responsive on mobile

**Tests:**
```bash
http://localhost:5173
# Scroll down, verify Problema visible
# Check text readability
# Mobile: verify text wraps correctly
```

**Gate:** Section displays correctly. CTA scroll works.

---

#### Task 4: 3 Pilares Section (FR-003)
**Estimated Time:** 1 hour  
**Dependencies:** Task 1.5  
**Deliverable:** `src/components/Pilares.jsx` + `src/components/PillarCard.jsx`

**What:**
1. Create `Pilares.jsx` container
2. Create `PillarCard.jsx` reusable component
3. Map over 3 pillars from content.json
4. Each card: icon + title + description
5. Grid layout: 3 columns desktop, 1 column mobile
6. Hover effect: subtle gold border (2px) on hover
7. Cards have white background, dark text, rounded corners (8px)

**Where:**
```
src/components/Pilares.jsx
src/components/PillarCard.jsx
```

**Done When:**
- ✅ 3 cards render in grid
- ✅ Desktop: 3 columns, Mobile: 1 column
- ✅ Hover effect applies (gold border)
- ✅ All text from content.json
- ✅ Responsive spacing

**Tests:**
```bash
http://localhost:5173
# Scroll to Pilares section
# Desktop: verify 3 columns
# Mobile: verify 1 column
# Hover on card: see gold border
# Lighthouse: no layout shifts
```

**Gate:** Grid responsive. Hover effects smooth. No layout shifts.

---

#### Task 5: Quem Somos Section (FR-004)
**Estimated Time:** 2 hours  
**Dependencies:** Task 1.5, Task 2 (useTrainerParam)  
**Deliverable:** `src/components/QuemSomos.jsx` + `src/components/TrainerCard.jsx`

**What:**
1. Create `QuemSomos.jsx` container (id="quem-somos")
2. Create `TrainerCard.jsx` component
3. Map over 2 trainers from content.json
4. Each card: circular photo (border-radius 50%) + name + role + bio + button
5. If `?trainer=renata` → Renata card highlighted (gold border 3px, shadow increase)
6. If `?trainer=leandro` → Leandro card highlighted
7. Button: "Fale com [Name]" → opens WhatsApp link (`wa.me/+55...`)
8. Button click triggers Meta Pixel "Lead" event (see useMetaPixel)
9. Grid: 2 columns desktop, 1 column mobile

**Where:**
```
src/components/QuemSomos.jsx
src/components/TrainerCard.jsx
src/hooks/useTrainerParam.js (reuse from Task 2)
src/hooks/useMetaPixel.js (create)
```

**Done When:**
- ✅ 2 trainer cards render
- ✅ Photos are circular, from content.json paths
- ✅ URL param highlights correct trainer (gold border)
- ✅ WhatsApp buttons open correct trainer link
- ✅ Meta Pixel "Lead" event fires on button click (verify in Meta Events Manager)
- ✅ Responsive layout

**Tests:**
```bash
http://localhost:5173?trainer=renata
# Renata card has gold border
# Click "Fale com Renata" → opens wa.me link in new tab
# Meta Events Manager shows "Lead" event within 30s

http://localhost:5173?trainer=leandro
# Leandro card highlighted
# Click button, check Meta Pixel event

http://localhost:5173 (no param)
# Both cards normal, no highlight
```

**Gate:** WhatsApp links work. Meta Pixel events fire correctly. Highlighting conditional.

---

#### Task 6: Resultados Section (FR-005)
**Estimated Time:** 1.5 hours  
**Dependencies:** Task 1.5  
**Deliverable:** `src/components/Resultados.jsx` + `src/components/ResultCard.jsx`

**What:**
1. Create `Resultados.jsx` container
2. Create `ResultCard.jsx` (before photo | after photo + story text)
3. Map over transformations from content.json
4. Before/after photos side-by-side (desktop), stacked (mobile)
5. Lazy-load images using Intersection Observer (for performance)
6. Each result includes client story (text)
7. Grid: 2 results per row (desktop), 1 per row (mobile)

**Where:**
```
src/components/Resultados.jsx
src/components/ResultCard.jsx
src/hooks/useLazyLoad.js (optional utility for lazy-load)
```

**Done When:**
- ✅ Before/after grids render correctly
- ✅ Images lazy-load (check Network tab: images don't load until scroll to section)
- ✅ Story text displays under each pair
- ✅ Responsive layout
- ✅ No layout shift on image load

**Tests:**
```bash
http://localhost:5173
# Scroll to Resultados
# Check Network tab: images load when section enters viewport
# Mobile: verify stacked layout
# Lighthouse: Cumulative Layout Shift = 0
```

**Gate:** Images lazy-load. No layout shifts. Responsive.

---

#### Task 7: Metodologia Section (FR-006)
**Estimated Time:** 1 hour  
**Dependencies:** Task 1.5  
**Deliverable:** `src/components/Metodologia.jsx` + `src/components/StepCard.jsx`

**What:**
1. Create `Metodologia.jsx` (id="metodologia")
2. Create `StepCard.jsx` (step number + title + description)
3. Map over 4 steps from content.json
4. Display as a vertical or horizontal process flow
5. Optional: add connecting lines between steps (CSS borders)
6. Each step has icon/number + title + description (max 50 words)

**Where:**
```
src/components/Metodologia.jsx
src/components/StepCard.jsx
```

**Done When:**
- ✅ 4 steps render in order
- ✅ Responsive: horizontal (desktop) or vertical (mobile)
- ✅ Clear visual hierarchy
- ✅ All copy from content.json

**Tests:**
```bash
http://localhost:5173
# Scroll to Metodologia
# Verify 4 steps in order
# Mobile: check vertical flow
# Desktop: check horizontal or vertical flow
```

**Gate:** Steps display correctly. Responsive.

---

#### Task 8: CTA Final Section (FR-007)
**Estimated Time:** 1 hour  
**Dependencies:** Task 5 (useTrainerParam, useMetaPixel)  
**Deliverable:** `src/components/CTAFinal.jsx`

**What:**
1. Create `CTAFinal.jsx`
2. Large headline: "Pronto para transformar?" (from content.json)
3. Dual buttons: "Fale com Renata" | "Fale com Leandro"
4. Buttons are large (md/lg size), side-by-side (desktop), stacked (mobile)
5. Each button → opens WhatsApp link for that trainer
6. Clicking either button → fires Meta Pixel "Lead" event
7. Background: dark (#0A0E27), text light, buttons gold

**Where:**
```
src/components/CTAFinal.jsx
```

**Done When:**
- ✅ Both buttons render
- ✅ WhatsApp links work (correct trainer phone)
- ✅ Meta Pixel events fire on click
- ✅ Responsive layout (buttons stack on mobile)
- ✅ Styling: dark background, gold buttons, good contrast (WCAG AA)

**Tests:**
```bash
http://localhost:5173
# Scroll to bottom
# Click "Fale com Renata" → opens wa.me link
# Meta Events Manager shows "Lead" event
# Mobile: buttons stack vertically
# Lighthouse: Accessibility >90
```

**Gate:** WhatsApp routing works. Meta Pixel events fire. Responsive.

---

#### Task 9: Footer Section (FR-008)
**Estimated Time:** 30 min  
**Dependencies:** Task 1.5  
**Deliverable:** `src/components/Footer.jsx`

**What:**
1. Create `Footer.jsx`
2. Content from content.json: links, social icons, copyright
3. Simple layout: logo + links + social + copyright
4. Links to: Instagram, LinkedIn (if available)
5. Copyright: "© 2026 LR Fit Method. Todos os direitos reservados."

**Where:**
```
src/components/Footer.jsx
```

**Done When:**
- ✅ Footer renders with all links
- ✅ Links open in new tab (rel="noopener noreferrer")
- ✅ Responsive on mobile
- ✅ Good contrast (WCAG AA)

**Tests:**
```bash
http://localhost:5173
# Scroll to footer
# Click links → open in new tab
# Mobile: verify layout
```

**Gate:** Links work. Responsive.

---

### Phase 2: Technical Integration (3 tasks)

#### Task 10: Meta Pixel Integration (FR-010)
**Estimated Time:** 1 hour  
**Dependencies:** Task 0, Task 5, Task 8  
**Deliverable:** `src/hooks/useMetaPixel.js` + pixel script loading + event tracking

**What:**
1. Create `useMetaPixel.js` hook (see 2.1.3 above)
2. In `App.jsx`, call hook: `const { trackEvent } = useMetaPixel(pixelId)`
3. Pixel script loads in useEffect on app mount
4. Tracks PageView automatically
5. TrainerCard + CTAFinal button clicks trigger "Lead" event
6. Test in Meta Events Manager

**Where:**
```
src/hooks/useMetaPixel.js
src/App.jsx (add hook usage)
```

**Done When:**
- ✅ Pixel script loads (check DevTools Network tab)
- ✅ PageView event fires on page load (visible in Meta Events Manager in 30s)
- ✅ Lead event fires on button click
- ✅ Events include trainer parameter (renata/leandro)
- ✅ Pixel fires on all URL param variations

**Tests:**
```bash
# Set VITE_META_PIXEL_ID in .env.local

http://localhost:5173
# DevTools > Network: fbq script loads
# DevTools > Console: no errors
# Wait 30s, check Meta Events Manager: PageView event visible

# Click WhatsApp button
# Meta Events Manager: Lead event appears
# Event payload includes: trainer="renata" (or leandro)
```

**Gate:** Pixel fires correctly. Events visible in Meta Events Manager. No errors.

---

#### Task 11: SEO & OG Tags (FR-011)
**Estimated Time:** 45 min  
**Dependencies:** Task 1.5  
**Deliverable:** Meta tags in `public/index.html` + dynamic OG tags in App.jsx

**What:**
1. Add static meta tags to `public/index.html`:
   - Title: "LR Fit Method | Consultoria Fitness Online"
   - Meta description: "Transforme seu corpo com a metodologia LR Fit Method. Treine com foco, alimente-se com inteligência, viva com liberdade."
   - OG tags: og:title, og:description, og:image, og:url
2. Optional: Use react-helmet or html-meta-tags for dynamic titles if ?trainer=X should change title

**Where:**
```
public/index.html
src/App.jsx (if using dynamic OG tags)
```

**Done When:**
- ✅ Meta tags visible in page source
- ✅ OG tags include og:image (use hero image)
- ✅ Lighthouse SEO score >90
- ✅ When shared on WhatsApp/Instagram, shows title + description + image

**Tests:**
```bash
# View page source (Ctrl+U)
# Verify meta tags present

# Use Meta Debugger: https://developers.facebook.com/tools/debug/
# Input landing URL
# Verify title, description, image preview
```

**Gate:** Meta tags complete. SEO score >90. OG preview works on social.

---

#### Task 12: Design System Documentation + Tailwind Config
**Estimated Time:** 1.5 hours  
**Dependencies:** Task 1  
**Deliverable:** `tailwind.config.js` + `DESIGN-SYSTEM.md`

**What:**
1. Create comprehensive `tailwind.config.js` (colors, fonts, spacing, custom utilities)
2. Create `DESIGN-SYSTEM.md` documenting:
   - Color palette (hex codes + usage)
   - Typography (font sizes, weights, line heights)
   - Spacing (8px base unit)
   - Component examples (Button, Card, Grid)
   - Responsive breakpoints
   - Hover/focus states
3. Add custom utilities to Tailwind if needed (e.g., `.hover-gold-border`)

**Where:**
```
tailwind.config.js
DESIGN-SYSTEM.md
```

**Done When:**
- ✅ All colors in config
- ✅ Fonts imported and configured
- ✅ Spacing system documented
- ✅ Examples for each component
- ✅ Dev guide for adding components

**Tests:**
```bash
# Check tailwind output includes all custom colors
npm run build
# No Tailwind warnings
```

**Gate:** Design system locked. Ready for reuse (future template).

---

### Phase 3: Testing & Deployment (3 tasks)

#### Task 13: Local Testing & Lighthouse Validation
**Estimated Time:** 1.5 hours  
**Dependencies:** Tasks 2-12  
**Deliverable:** Lighthouse report >75 all metrics + manual QA checklist

**What:**
1. Run `npm run build` locally
2. Use Lighthouse in Chrome DevTools to audit performance
3. Manual QA checklist:
   - [ ] All 8 sections render
   - [ ] URL params (?trainer=X) work correctly
   - [ ] All buttons functional (WhatsApp links, scroll anchors)
   - [ ] Responsive: 375px, 768px, 1920px widths
   - [ ] Images load correctly (no 404s)
   - [ ] Meta Pixel fires (PageView + Lead)
   - [ ] No console errors
   - [ ] Keyboard navigation (Tab through buttons)
   - [ ] Alt text on images (accessibility)
4. Document results in TEST-REPORT.md

**Where:**
```
TEST-REPORT.md
```

**Done When:**
- ✅ Lighthouse: Performance >75, Accessibility >90, SEO >90
- ✅ All QA checklist items pass
- ✅ No console errors
- ✅ Meta Pixel fires correctly
- ✅ Responsive on mobile/tablet/desktop

**Tests:**
```bash
npm run build
npm run preview
# Open http://localhost:4173
# Run Lighthouse audit
# Verify scores >75

# Manual testing
curl http://localhost:4173 | grep "meta name"
# Verify meta tags present

# Meta Pixel test
# Check Events Manager for PageView + Lead events
```

**Gate:** Lighthouse scores meet targets. QA checklist 100% pass. Ready for deploy.

---

#### Task 14: Deploy to Vercel
**Estimated Time:** 30 min  
**Dependencies:** Task 13  
**Deliverable:** Landing live at `lrfitmethod.vercel.app`

**What:**
1. Ensure all changes committed to GitHub (main branch)
2. Push to GitHub: `git push origin main`
3. Vercel auto-deploys (check Vercel dashboard)
4. Verify landing loads at `lrfitmethod.vercel.app`
5. Test all features on production (buttons, Pixel, scroll)
6. Create a summary: landing URL + test results

**Where:**
```
GitHub main branch → Vercel auto-deploy
```

**Done When:**
- ✅ `git log` shows latest commit on main
- ✅ Vercel dashboard shows "Production Deployment: Success"
- ✅ Landing loads at `lrfitmethod.vercel.app` without errors
- ✅ All sections render correctly on production
- ✅ Meta Pixel events fire (check Events Manager)
- ✅ WhatsApp buttons work on production

**Tests:**
```bash
# Verify GitHub
git log --oneline | head -1
# Should show latest commit on main

# Vercel dashboard
# Click "Deployment" tab
# Verify latest deployment Status: Success

# Test production URL
https://lrfitmethod.vercel.app
# Scroll through all sections
# Click buttons
# Check DevTools Network: pixel script loads
# Check Meta Events Manager: events appear
```

**Gate:** Landing live, production tests pass, Pixel fires.

---

#### Task 15: Setup Guide Documentation
**Estimated Time:** 2 hours  
**Dependencies:** Task 14  
**Deliverable:** `SETUP-GUIDE.md` (how to use dashboard, scale ads, troubleshoot)

**What:**
1. Create `SETUP-GUIDE.md` with:
   - **Meta Pixel Setup:** Step-by-step to create new pixel (if needed)
   - **Meta Ads Setup:** How to create campaigns (2 variants: trainer=renata, trainer=leandro)
   - **Campaign Structure:** 
     - Campaign 1: `?trainer=renata` → points to landing?trainer=renata
     - Campaign 2: `?trainer=leandro` → points to landing?trainer=leandro
   - **Dashboard Ritual:** Daily check in Meta Ads Manager (leads, cost, split per trainer)
   - **Scaling Strategy:** When CPL <R$15, increase budget from R$1-2/day to R$5-10/day
   - **Troubleshooting:** Common issues (Pixel 0 events, wrong phone number routing, etc.)
   - **Links:** Meta Business Suite, Events Manager, Ads Manager dashboards

**Where:**
```
SETUP-GUIDE.md
```

**Done When:**
- ✅ 10-step guide from start (create Pixel) to scaling campaigns
- ✅ Screenshots or visual examples for each step
- ✅ Troubleshooting section with solutions
- ✅ Links to all required tools
- ✅ Written for non-technical audience (Renata + Leandro)

**Tests:**
```bash
# Review guide for clarity
# Send to Wagner/client for review
# Verify all steps are actionable without technical expertise
```

**Gate:** Setup guide reviewed and approved by client. Ready for training.

---

#### Task 16: Playbook Documentation (Optional for MVP, Deferred to Phase 2)
**Estimated Time:** 2-3 hours  
**Dependencies:** Task 14 + 2+ weeks of data  
**Deliverable:** `PLAYBOOK.md` (how to replicate for other consultancies)

**What:**
1. Document "how to adapt landing for another consultancy"
2. Extract generic vs. custom layers
3. Create JSON schema template for future agente gerador
4. List cost model (time to adapt, pricing for consultancy)
5. Success metrics to replicate

**Note:** This task is deferred to Week 5-6 after MVP has been running 2+ weeks and generating data.

---

## 3.3 Task Dependencies Graph

```
Task 0 (Meta Pixel)
├─ Task 1 (Project Setup)
│  ├─ Task 1.5 (Content Schema + Assets)
│  │  ├─ Task 2 (Hero)
│  │  ├─ Task 3 (Problema)
│  │  ├─ Task 4 (Pilares)
│  │  ├─ Task 5 (Quem Somos) ← also depends Task 2
│  │  ├─ Task 6 (Resultados)
│  │  ├─ Task 7 (Metodologia)
│  │  ├─ Task 8 (CTA Final) ← also depends Task 5
│  │  ├─ Task 9 (Footer)
│  │  ├─ Task 10 (Meta Pixel Integration) ← also depends Task 5, 8
│  │  ├─ Task 11 (SEO)
│  │  └─ Task 12 (Design System)
│  └─ Task 13 (Testing) ← depends all components (2-12)
│     └─ Task 14 (Vercel Deploy)
│        └─ Task 15 (Setup Guide)
│
└─ Task 1.6 (GitHub Workflow - Optional)
```

---

# PART 4: EXECUTION PLAN (EXECUTE)

## 4.1 Timeline

### Week 1: Setup + Design System
```
Day 1-2:   Task 0 (Meta Pixel) + Task 1 (Project Setup)
Day 3-4:   Task 1.5 (Content Schema) + Task 1.6 (CI Workflow - optional)
Day 5:     Task 12 (Design System)
           ✅ Checkpoint: GitHub repo live, Vercel linked, content schema ready
```

### Week 2-3: Component Development
```
Day 6-7:   Task 2 (Hero) + Task 3 (Problema)
Day 8-9:   Task 4 (Pilares) + Task 5 (Quem Somos)
Day 10:    Task 6 (Resultados) + Task 7 (Metodologia)
Day 11-12: Task 8 (CTA Final) + Task 9 (Footer)
           ✅ Checkpoint: All 8 sections complete, responsive
```

### Week 4: Integration + Testing + Deployment
```
Day 13:    Task 10 (Meta Pixel Integration)
Day 14:    Task 11 (SEO & OG Tags)
Day 15:    Task 13 (Testing & QA)
Day 16:    Task 14 (Vercel Deploy)
Day 17-18: Task 15 (Setup Guide) + First Meta Ads campaigns
           ✅ Launch: Landing live, first ads running (R$1-2/day test)
```

### Week 5-6+: Monitor + Optimize (Phase 2)
```
Daily:     Monitor leads, CPL, trainer split in Meta Ads Manager
Weekly:    Analyze data, optimize copy/targeting
After 2w:  Task 16 (Playbook) + scale to R$5-10/day if CPL < R$15
```

---

## 4.2 Commit Strategy

**Atomic commits per task:**
```bash
# Task 2
git add src/components/Hero.jsx src/hooks/useTrainerParam.js
git commit -m "feat(components): Add Hero section with trainer routing

- Hero component detects ?trainer=X param
- Photos conditional (casal default, trainer-specific variant)
- CTA scrolls to #quem-somos section
- Responsive: 40% photo scale on mobile

Closes Task-002"

# Task 3
git add src/components/Problema.jsx
git commit -m "feat(components): Add Problema section with social proof

- Headline and body from content.json
- Before/after transformation photo
- CTA scrolls to #metodologia

Closes Task-003"

# ... continue for each task
```

**Gate checks before each commit:**
```bash
npm run lint     # Fix any style issues
npm run build    # Ensure no build errors
npm run validate # Content schema check
```

---

## 4.3 Communication Checkpoints

### Checkpoint 1: Project Setup (End of Day 2)
**Status:** Meta Pixel ID confirmed, GitHub repo created, Vercel linked  
**Actions:** Notify Wagner: "Dev environment ready, starting content schema"

### Checkpoint 2: Content Schema (End of Day 4)
**Status:** Content JSON locked, assets pipeline ready  
**Question for client (Renata + Leandro):**
- [ ] Trainer bios finalized? (bio text)
- [ ] WhatsApp numbers confirmed? (phone routing)
- [ ] Transformation photos ready? (for Resultados section, min 3)
- [ ] Price/offer decided? (for future display)
- [ ] Instagram handles for social links?

### Checkpoint 3: Components Complete (End of Day 12)
**Status:** All 8 sections built and responsive  
**Actions:** 
- Local Lighthouse audit
- Send preview link to client for review (Vercel preview deployment)
- Gather feedback on copy/design

### Checkpoint 4: Live (End of Day 16)
**Status:** Landing live on Vercel, Meta Pixel firing  
**Actions:**
- Notify client: landing live URL
- Start first test campaigns (R$1-2/day)
- Daily monitoring of Pixel events

### Checkpoint 5: Data Review (Week 5, Day 1)
**Status:** 1 week of data collected  
**Metrics to review:**
- Page views: target >100
- Leads: target >10
- CPL: target <R$15
- Trainer split: Renata vs Leandro
- CTR (click WhatsApp button): target >25%

**Decision:**
- If CPL < R$15 → scale to R$5-10/day
- If CPL > R$15 → iterate copy, targeting, or landing design
- If Pixel 0 events → debug Meta Pixel integration

---

## 4.4 Resources & References

### Tools & Accounts Needed
- [ ] GitHub account (Wagner)
- [ ] Vercel account (connected to GitHub)
- [ ] Meta Business Account (Wagner)
- [ ] Meta Ads Manager (create campaign)
- [ ] Node.js 18+ (installed locally)
- [ ] Code editor (VSCode, etc.)

### Documentation Links
- [Meta Pixel Setup](https://developers.facebook.com/docs/meta-pixel/get-started)
- [Meta Ads Manager](https://ads.facebook.com/)
- [Vercel Deployment](https://vercel.com/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/)

### Internal References
- `PROJECT.md` — Business context, constraints, assumptions
- `ROADMAP.md` — Feature dependencies, phases
- `FEATURE-LANDING-SPEC.md` — Functional + non-functional requirements
- `FEATURE-LANDING-DESIGN.md` — Component architecture
- `CONTENT-SCHEMA.md` — Content governance
- `AGENT-BUILD-GUIDELINES.md` — Decision rules for agent

---

# PART 5: RISK MITIGATION

## 5.1 Technical Risks

| Risk | Impact | Mitigation | Owner |
|------|--------|-----------|-------|
| Meta Pixel 0% conversion | Campaign flop | Task 10 includes validation; test in Meta Events Manager before scaling | Wagner + Claude |
| Leads don't route to correct trainer | 50% wasted ad spend | URL param validation in Hero, test all variants before deploy | Claude (Task 2) |
| Design doesn't match brand | Rejection | Approve design system with client (Task 12) before building | Wagner + Client |
| React new to Wagner | Delays | Clear architecture, simple components, comprehensive comments | Claude |
| Vercel deploy fails | Launch blocked | Test locally (Task 13), dry-run build process, have rollback plan (previous commit) | Wagner + Claude |
| Images missing/broken | Poor UX | Asset pipeline (Task 1.5) validates paths; content schema fails build if path missing | Claude |

## 5.2 Business Risks

| Risk | Impact | Mitigation | Owner |
|------|--------|-----------|-------|
| CPL > R$15 | Budget wasted | Iterate copy, targeting, or landing design after Week 5 data review | Wagner + Client |
| Client slow to provide data | Delays | Checkpoint 2 (Day 4) confirms trainer bios + photos ready | Wagner |
| Instagram traffic doesn't convert | Campaign flops | CTA design (Hero scroll to prova social) based on UX research (see Task 8 decision) | Claude |
| Pixel ID not created | Launch blocked | Task 0 confirms before starting Task 1 | Wagner |

## 5.3 Dependency Risks

| Dependency | Risk | Mitigation | Owner |
|------------|------|-----------|-------|
| Meta Pixel ID | Not provided | Checkpoint 0 (Day 1) confirms; create if needed | Wagner |
| Client photos | Quality/missing | Checkpoint 2 (Day 4) gathers 3-6 transformation photos | Wagner + Client |
| Client copy | Incomplete | Content schema (Task 1.5) marks `"STATUS": "PENDENTE"` for missing copy; validation fails deploy | Claude |
| Trainer phone numbers | Wrong | Checkpoint 2 confirms both numbers; test WhatsApp links before deploy | Wagner + Client |
| GitHub/Vercel access | Blocked | Checkpoint 1 (Day 2) confirms both linked | Wagner |

---

# PART 6: SUCCESS CRITERIA

## 6.1 MVP Success (Week 4)
- [ ] Landing deployed to `lrfitmethod.vercel.app`
- [ ] All 8 sections render + responsive (mobile/tablet/desktop)
- [ ] Meta Pixel PageView events fire (100+ in first week)
- [ ] WhatsApp routing works (correct trainer link per URL param)
- [ ] Lighthouse scores: Performance >75, Accessibility >90, SEO >90
- [ ] First ad campaigns running (R$1-2/day test budget)
- [ ] Setup Guide documented
- [ ] Zero critical bugs in production

## 6.2 Phase 2 Success (Week 5-6)
- [ ] 100+ page views (from ads)
- [ ] 10+ leads (WhatsApp clicks)
- [ ] CPL < R$15 (cost per lead)
- [ ] Trainer split tracked (Renata vs Leandro conversions)
- [ ] Playbook documented (replication for other consultancies)
- [ ] Decision made: scale to R$5-10/day or iterate

## 6.3 Product Success (Week 7+)
- [ ] 50+ paying customers via landing
- [ ] ROI Meta Ads > 3:1
- [ ] Template ready to replicate for 5+ consultancies
- [ ] Agente gerador MVP (JSON → landing) functional

---

## Appendix: Quick Reference

### File Structure (After Execute)
```
lrfitmethod-landing/
├─ .github/workflows/
│  └─ ci.yml (optional CI/CD)
├─ assets/raw/
│  ├─ hero-casal.jpg
│  ├─ trainer-renata.jpg
│  ├─ trainer-leandro.jpg
│  └─ transformacao-*.jpg
├─ public/
│  ├─ index.html
│  └─ images/ (optimized WebP + JPEG)
├─ src/
│  ├─ components/
│  │  ├─ Hero.jsx
│  │  ├─ Problema.jsx
│  │  ├─ Pilares.jsx / PillarCard.jsx
│  │  ├─ QuemSomos.jsx / TrainerCard.jsx
│  │  ├─ Resultados.jsx / ResultCard.jsx
│  │  ├─ Metodologia.jsx / StepCard.jsx
│  │  ├─ CTAFinal.jsx
│  │  └─ Footer.jsx
│  ├─ hooks/
│  │  ├─ useTrainerParam.js
│  │  └─ useMetaPixel.js
│  ├─ content/
│  │  └─ lrfit.content.json
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ tailwind.config.js
│  └─ index.css
├─ scripts/
│  ├─ process-assets.js
│  └─ validate-content.js
├─ .env.local
├─ package.json
├─ vite.config.js
├─ vercel.json
├─ DESIGN-SYSTEM.md
├─ SETUP-GUIDE.md
├─ PLAYBOOK.md (deferred)
└─ TEST-REPORT.md
```

### Key Commands
```bash
npm run dev              # Local dev server
npm run build            # Production build
npm run preview          # Preview prod build locally
npm run lint             # Code linting (if configured)
npm run optimize-assets  # Process images (Task 1.5)
npm run validate         # Check content schema for PENDENTE
```

### Key URLs
- **Landing (Production):** `https://lrfitmethod.vercel.app`
- **GitHub Repo:** `https://github.com/[Wagner]/lrfitmethod-landing`
- **Meta Ads Manager:** `https://ads.facebook.com/`
- **Meta Events Manager:** `https://business.facebook.com/events_manager`
- **Vercel Dashboard:** `https://vercel.com/dashboard`

---

**Document Prepared By:** Claude (Tech Lead Agent)  
**Status:** READY FOR EXECUTE  
**Next Action:** Begin Task 0 (Meta Pixel Setup)  
**Estimated Project Completion:** 4-5 weeks (by end of Week 4, MVP live)
