# TASKS.md — LR Fit Landing Page

**Feature:** LR Fit Method Landing Page  
**Complexity:** Large (18 atomic tasks)  
**Estimated Duration:** 35-45 hours  
**Execution Strategy:** Sequential (0-2), then parallel-able (3-11), then sequential (12-18)

---

## Task Dependency Graph

```
Task 0: Meta Pixel Setup (SEQUENTIAL, blocks all)
  ↓
Task 1: React Project Setup (SEQUENTIAL, creates foundation)
  ↓
Task 1.5: Content & Assets Bootstrap
  ├─ Task 2: Design System (parallel-able)
  ├─ Task 3: useTrainerParam Hook (parallel-able)
  └─ Task 4: useMetaPixel Hook (parallel-able)
  ↓
Task 5-11: Components (highly parallel-able)
  ├─ Task 5: Hero
  ├─ Task 6: Problema
  ├─ Task 7: Pilares
  ├─ Task 8: QuemSomos
  ├─ Task 9: Resultados
  ├─ Task 10: Metodologia
  ├─ Task 11: CTAFinal + Footer
  ↓
Task 12: App.jsx Layout Assembly
  ↓
Task 13-14: Meta Pixel Integration & Event Tracking
  ↓
Task 15-16: SEO & OG Tags
  ↓
Task 17: Performance Optimization
  ↓
Task 18: Testing & QA
```

---

## Task Breakdown

### **Task 0: Meta Pixel Bootstrap**

**ID:** TASK-000  
**Type:** Sequential (blocks all)  
**Time Estimate:** 30 min  
**Depends On:** None  
**Blocks:** TASK-002 (Design System), TASK-004 (useMetaPixel)

**What:**
Execute `scripts/get_or_create_pixel.py` to create (or verify existence of) Meta Pixel ID for LR Fit Method. Script is idempotent—can run multiple times safely.

**Where:**
```
lrfitmethod-landing/
└─ scripts/
   └─ get_or_create_pixel.py  ← Already in docs/spec/
```

**Done When:**
- [ ] Script copied to `lrfitmethod-landing/scripts/`
- [ ] Pixel ID created (or verified existing)
- [ ] Pixel ID saved in `.env.local` as `VITE_META_PIXEL_ID=<16-digit-id>`
- [ ] Output: `VITE_META_PIXEL_ID=123456789012345` (example format)

**Verification:**
```bash
# Confirm env var is set
echo $VITE_META_PIXEL_ID  # Should print 16-digit ID

# Verify in Meta Business Suite (optional)
# Settings → Pixels → Should see "LR Fit Method" pixel
```

**Gate Criteria:**
- ✅ Pixel ID exists (16 digits)
- ✅ .env.local has `VITE_META_PIXEL_ID` set
- ✅ No duplication (idempotent check: script returns existing if present)

**Git Commit:**
```
Initialize Meta Pixel for LR Fit Method

- Create scripts/get_or_create_pixel.py
- Execute and capture Pixel ID
- Set VITE_META_PIXEL_ID in .env.local
- Verify idempotent behavior

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 1: React Project Setup**

**ID:** TASK-001  
**Type:** Sequential  
**Time Estimate:** 1 hour  
**Depends On:** TASK-000  
**Blocks:** All other tasks

**What:**
Create React 18 + Vite + TailwindCSS scaffold, initialize GitHub repo, link to Vercel.

**Where:**
```
lrfitmethod-landing/  ← NEW REPO
├─ src/
│  └─ App.jsx
├─ public/
├─ .env.local
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

**Done When:**
- [ ] `npm create vite@latest lrfitmethod-landing -- --template react` ✓
- [ ] TailwindCSS installed & configured
- [ ] Dependencies installed (react-router-dom, axios)
- [ ] `.env.local` created with `VITE_META_PIXEL_ID` from Task 0
- [ ] Dev server runs: `npm run dev` → http://localhost:5173
- [ ] GitHub repo created: `github.com/[USER]/lrfitmethod-landing`
- [ ] Initial commit pushed
- [ ] Vercel linked to GitHub repo (auto-deploy enabled)

**Verification:**
```bash
# Dev server running
npm run dev  # Opens on http://localhost:5173

# Build succeeds
npm run build  # No errors

# Git history
git log --oneline  # Shows initial commit

# Vercel deployment
# Visit https://vercel.com → should show auto-deploy preview
```

**Gate Criteria:**
- ✅ Dev server runs without errors
- ✅ Build succeeds
- ✅ GitHub repo exists + initial commit pushed
- ✅ Vercel deployment preview active
- ✅ `.env.local` has VITE_META_PIXEL_ID (from Task 0)

**Git Commit:**
```
Initialize React + Vite + TailwindCSS scaffold

- Create Vite React 18 project
- Install TailwindCSS + utilities
- Configure PostCSS + Tailwind
- Create .env.local with VITE_META_PIXEL_ID
- Initialize Git + push to GitHub
- Link to Vercel (auto-deploy enabled)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 1.5: Content & Assets Bootstrap** [Parallel-able]

**ID:** TASK-001.5  
**Type:** Parallel (independent prep)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-001  
**Blocks:** All component tasks

**What:**
Create content single-source-of-truth JSON + prepare asset pipeline for image optimization.

**Where:**
```
lrfitmethod-landing/
├─ src/content/
│  └─ lrfit.content.json  ← ALL copy, trainer info, images
├─ assets/raw/            ← Client photos (intake)
├─ public/images/         ← Optimized output
└─ scripts/
   └─ process-assets.js   ← WebP conversion, optimization
```

**Done When:**
- [ ] `lrfit.content.json` created with full schema (see CONTENT-SCHEMA.md)
- [ ] All text sections have placeholder text (or STATUS: PENDENTE)
- [ ] Trainer data complete with WhatsApp routing
- [ ] Image paths in JSON point to `/images/` (public)
- [ ] `process-assets.js` created (converts JPEG → WebP, optimizes)
- [ ] No image >150KB (optimized)
- [ ] Validation script checks for STATUS: PENDENTE before deploy

**Verification:**
```bash
# Parse JSON
cat src/content/lrfit.content.json | jq .  # Should be valid JSON

# Check for PENDENTE
grep -r "STATUS: PENDENTE" src/content/  # Highlights what's missing

# Image optimization (after assets loaded)
# ls -lh public/images/ | Should show <150KB per file
```

**Gate Criteria:**
- ✅ JSON parses without errors
- ✅ Schema matches CONTENT-SCHEMA.md
- ✅ No hardcoded strings in components (all in JSON)
- ✅ Image pipeline ready to process files
- ✅ Deployment will block if STATUS: PENDENTE present

**Git Commit:**
```
Bootstrap content JSON and asset pipeline

- Create lrfit.content.json (single source of truth)
- Add process-assets.js for image optimization
- Schema enforces STATUS: PENDENTE for missing data
- All components to import from content.json (not hardcoded)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 2: Design System**

**ID:** TASK-002  
**Type:** Parallel (Task 1.5+)  
**Time Estimate:** 2-3 hours  
**Depends On:** TASK-001.5  
**Blocks:** All component tasks

**What:**
Define design tokens (colors, typography, spacing) and create reusable component library.

**Where:**
```
lrfitmethod-landing/
├─ tailwind.config.js      ← Color palette, fonts
├─ src/constants/
│  ├─ theme.js
│  ├─ typography.js
│  └─ spacing.js
├─ src/components/
│  └─ common/
│     ├─ Button.jsx
│     ├─ Card.jsx
│     └─ Grid.jsx
└─ docs/
   └─ DESIGN-SYSTEM.md
```

**Done When:**
- [ ] Tailwind config has all colors (gold #D4AF37, dark variants, neutrals)
- [ ] Typography configured (Montserrat headlines, Inter body)
- [ ] Spacing constants defined (4px, 8px, 16px, 24px baseline)
- [ ] Reusable Button component (text, filled, outline variants)
- [ ] Reusable Card component (with shadow, hover states)
- [ ] Grid component for sections (max-width, padding)
- [ ] DESIGN-SYSTEM.md documented with examples
- [ ] No magic numbers in component files

**Verification:**
```bash
# Check Tailwind config
npx tailwindcss --list-all-classes  # Shows color palette

# Import components in a test file
import Button from '@/components/common/Button'  # No errors

# Visual check
npm run dev  # Colors render correctly in demo
```

**Gate Criteria:**
- ✅ All colors defined in Tailwind config
- ✅ Components are reusable (accept props for variants)
- ✅ No hardcoded hex values in component files
- ✅ Design System doc complete with usage examples
- ✅ Button, Card, Grid components implemented

**Git Commit:**
```
Create Design System with tokens and components

- Define color palette (gold/dark theme from brand)
- Configure Tailwind with spacing, typography
- Create reusable Button, Card, Grid components
- Document in DESIGN-SYSTEM.md
- No magic numbers, all values from constants

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 3: useTrainerParam Hook**

**ID:** TASK-003  
**Type:** Parallel (Task 1.5+)  
**Time Estimate:** 45 min  
**Depends On:** TASK-001.5  
**Blocks:** Hero, QuemSomos, CTA components

**What:**
Create custom React hook that parses URL `?trainer=renata|leandro` parameter and returns trainer object with routing data.

**Where:**
```
lrfitmethod-landing/src/
└─ hooks/
   └─ useTrainerParam.js
```

**Done When:**
- [ ] Hook reads URL search params
- [ ] Returns trainer object: `{ name, phone, whatsappText }`
- [ ] Defaults to first trainer if param missing
- [ ] Handles invalid trainer names gracefully
- [ ] Data comes from `lrfit.content.json`

**Verification:**
```bash
# Test in browser
# URL: ?trainer=renata → returns renata object
# URL: ?trainer=leandro → returns leandro object
# URL: (no param) → returns first trainer (renata)
# URL: ?trainer=invalid → returns first trainer (renata)
```

**Gate Criteria:**
- ✅ Hook reads URL params correctly
- ✅ Returns trainer object with name, phone, whatsappText
- ✅ Graceful fallback for missing/invalid param
- ✅ Uses content.json as source of truth

**Git Commit:**
```
Create useTrainerParam hook for URL routing

- Parse ?trainer= URL parameter
- Return trainer object (name, phone, whatsappText)
- Default to first trainer if param missing
- Graceful error handling for invalid trainer

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 4: useMetaPixel Hook**

**ID:** TASK-004  
**Type:** Parallel (Task 1.5+)  
**Time Estimate:** 45 min  
**Depends On:** TASK-001.5, TASK-000  
**Blocks:** Meta Pixel integration tasks

**What:**
Create custom hook that loads Meta Pixel script and provides event tracking utilities (PageView, Lead).

**Where:**
```
lrfitmethod-landing/src/
└─ hooks/
   └─ useMetaPixel.js
```

**Done When:**
- [ ] Hook loads Meta Pixel script on mount (from VITE_META_PIXEL_ID)
- [ ] Provides `trackPageView()` function
- [ ] Provides `trackLead(trainer_name)` function
- [ ] Script loads async (doesn't block render)
- [ ] No errors in console if Pixel ID missing (graceful)

**Verification:**
```bash
# In browser DevTools console
# After page load, should see fbq.queue available
# Click CTA button → should log Lead event

# Check Meta Events Manager
# Visit Meta Business Suite → Events Manager
# Should show PageView + Lead events flowing
```

**Gate Criteria:**
- ✅ Pixel script loads from correct ID
- ✅ fbq() function available globally
- ✅ PageView event fires on mount
- ✅ Lead event fires on CTA click
- ✅ No console errors

**Git Commit:**
```
Create useMetaPixel hook for event tracking

- Load Meta Pixel script from VITE_META_PIXEL_ID
- Provide trackPageView() and trackLead() utilities
- Async script loading (doesn't block render)
- Graceful error handling if Pixel ID missing

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 5: Hero Component**

**ID:** TASK-005  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 2 hours  
**Depends On:** TASK-002, TASK-003  
**Blocks:** None (independent component)

**What:**
Create Hero section with trainer-conditional photo, headline, CTA button. Uses `useTrainerParam` hook.

**Where:**
```
lrfitmethod-landing/src/
└─ components/
   └─ Hero.jsx
```

**Done When:**
- [ ] Hero displays trainer-specific image (from URL param)
- [ ] Headline + subheadline render from content.json
- [ ] CTA button routes to correct trainer WhatsApp
- [ ] Responsive (full-width on mobile, centered on desktop)
- [ ] Image optimized, <100KB
- [ ] Accessible alt text on image

**Verification:**
- Test with `?trainer=renata` → shows renata photo
- Test with `?trainer=leandro` → shows leandro photo
- Test mobile (375px) and desktop (1920px)
- Click CTA → opens WhatsApp to correct trainer

**Gate Criteria:**
- ✅ Trainer parameter routing works
- ✅ Component uses content.json (no hardcoded strings)
- ✅ Image <100KB, has alt text
- ✅ Responsive design passes (375px→1920px)
- ✅ CTA button links to WhatsApp `wa.me/` correctly

**Git Commit:**
```
Create Hero component with trainer routing

- Trainer-conditional photo based on URL param
- Headline + subheadline from content.json
- CTA button routes to trainer WhatsApp (wa.me)
- Responsive design (mobile→desktop)
- Optimized image, accessible alt text

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 6: Problema Component**

**ID:** TASK-006  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-002  
**Blocks:** None

**What:**
Create section that showcases the pain point and transformation example.

**Where:**
```
lrfitmethod-landing/src/components/
└─ Problema.jsx
```

**Done When:**
- [ ] Section renders headline + body text from content.json
- [ ] Before/after example image displayed
- [ ] Text styled (headline gold, body readable)
- [ ] Image <100KB, optimized
- [ ] Responsive (text size adjusts for mobile)

**Verification:**
- Render Problema component
- Verify text comes from content.json
- Mobile & desktop rendering correct

**Gate Criteria:**
- ✅ Content from content.json (no hardcoding)
- ✅ Image optimized <100KB
- ✅ Typography hierarchy clear (headline > body)
- ✅ Responsive design correct

**Git Commit:**
```
Create Problema component

- Display pain point + transformation example
- Image + text layout
- Content from lrfit.content.json
- Responsive typography

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 7: Pilares (3 Pillars) Component**

**ID:** TASK-007  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-002  
**Blocks:** None

**What:**
Create 3-column grid showing the 3 pillars (Training, Nutrition, Freedom).

**Where:**
```
lrfitmethod-landing/src/components/
└─ Pilares.jsx
```

**Done When:**
- [ ] 3-column grid renders (each pillar = 1 card)
- [ ] Card has icon, title, description
- [ ] Icon + title gold color (brand)
- [ ] Grid stacks to 1 column on mobile
- [ ] Content from content.json

**Verification:**
- Desktop: 3 columns visible
- Mobile: 1 column, stacked vertically
- Hover states work (optional shadow/scale)

**Gate Criteria:**
- ✅ 3-column grid responsive (1 col on mobile)
- ✅ Icons/content from content.json
- ✅ Typography + color hierarchy correct

**Git Commit:**
```
Create Pilares (3 Pillars) component

- 3-column grid (Training, Nutrition, Freedom)
- Card layout with icon, title, description
- Responsive (3 cols → 1 col on mobile)
- Content from lrfit.content.json

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 8: QuemSomos (About Trainers) Component**

**ID:** TASK-008  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 2 hours  
**Depends On:** TASK-002, TASK-003  
**Blocks:** None

**What:**
Create trainer cards (Renata + Leandro) with photos, bios, "Fale com" buttons.

**Where:**
```
lrfitmethod-landing/src/components/
└─ QuemSomos.jsx
```

**Done When:**
- [ ] 2 cards render (1 per trainer)
- [ ] Card layout: photo + name + role + bio + button
- [ ] Button text: "Fale com [Trainer Name]"
- [ ] Button routes to correct WhatsApp (wa.me)
- [ ] Images <100KB, optimized, alt text
- [ ] Responsive (2 cols → 1 col on mobile)

**Verification:**
- Desktop: 2 columns
- Mobile: 1 column
- Click button → opens correct trainer WhatsApp

**Gate Criteria:**
- ✅ Trainer photo routing correct
- ✅ WhatsApp buttons link to correct numbers (from content.json)
- ✅ Images optimized, have alt text
- ✅ Responsive design works

**Git Commit:**
```
Create QuemSomos (Trainers) component

- 2 trainer cards (Renata + Leandro)
- Photo + bio + "Fale com" button per trainer
- Button routes to trainer WhatsApp
- Responsive layout (2 cols → 1 col)
- Content from lrfit.content.json

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 9: Resultados (Transformations) Component**

**ID:** TASK-009  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-002  
**Blocks:** None

**What:**
Create before/after transformation grid (showcase client results).

**Where:**
```
lrfitmethod-landing/src/components/
└─ Resultados.jsx
```

**Done When:**
- [ ] Grid displays 3-6 before/after pairs
- [ ] Each pair: before photo | after photo side-by-side
- [ ] Client name + story caption optional
- [ ] Images <100KB each, optimized
- [ ] Grid responsive (2 cols → 1 col on mobile)

**Verification:**
- Desktop: 2-3 columns
- Mobile: 1 column
- Images load without stretching/distorting
- No broken images

**Gate Criteria:**
- ✅ Image pairs display correctly
- ✅ Images <100KB, optimized
- ✅ Responsive grid layout
- ✅ Content from content.json

**Git Commit:**
```
Create Resultados (Transformations) component

- Grid of before/after transformation photos
- Client stories/captions optional
- Responsive grid (multiple cols → 1 col mobile)
- Images optimized <100KB

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 10: Metodologia (4-Step Process) Component**

**ID:** TASK-010  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-002  
**Blocks:** None

**What:**
Create 4-step process explanation (vertical timeline or cards).

**Where:**
```
lrfitmethod-landing/src/components/
└─ Metodologia.jsx
```

**Done When:**
- [ ] 4 steps render (each with step number, title, description)
- [ ] Visual flow (timeline, cards, or numbers)
- [ ] Gold accent color on step numbers
- [ ] Content from content.json
- [ ] Responsive layout

**Verification:**
- All 4 steps render
- Visual hierarchy clear
- Mobile layout readable

**Gate Criteria:**
- ✅ All 4 steps visible + readable
- ✅ Content from content.json
- ✅ Visual flow clear (timeline/cards)

**Git Commit:**
```
Create Metodologia (4-Step Process) component

- 4-step process visualization
- Step numbers, titles, descriptions
- Gold accent color scheme
- Responsive layout
- Content from lrfit.content.json

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 11: CTAFinal & Footer Component**

**ID:** TASK-011  
**Type:** Parallel (after Task 1.5)  
**Time Estimate:** 2 hours  
**Depends On:** TASK-002, TASK-003  
**Blocks:** None

**What:**
Create final CTA section (dual WhatsApp buttons per trainer) + Footer.

**Where:**
```
lrfitmethod-landing/src/components/
└─ CTAFinal.jsx
└─ Footer.jsx
```

**Done When (CTA):**
- [ ] 2 large buttons: "Iniciar com Renata" + "Iniciar com Leandro"
- [ ] Buttons route to correct WhatsApp (wa.me)
- [ ] Headline + supporting text from content.json
- [ ] High contrast (gold buttons, dark background)
- [ ] Responsive (stack on mobile)

**Done When (Footer):**
- [ ] Copyright + company name
- [ ] Social links (Instagram, WhatsApp, email)
- [ ] Links in footer from content.json
- [ ] Dark styling, minimal
- [ ] Responsive (stacks on mobile)

**Verification:**
- CTA buttons link to correct WhatsApp
- Footer renders all links
- Mobile layout stacks correctly

**Gate Criteria:**
- ✅ WhatsApp buttons link to correct numbers
- ✅ Content from content.json
- ✅ Responsive design
- ✅ High contrast for accessibility

**Git Commit:**
```
Create CTAFinal and Footer components

- CTA section: dual WhatsApp buttons (Renata + Leandro)
- Footer: links, social, copyright
- Content from lrfit.content.json
- Responsive, high-contrast design
- WhatsApp routing to correct trainer

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 12: App.jsx Layout Assembly**

**ID:** TASK-012  
**Type:** Sequential  
**Time Estimate:** 1 hour  
**Depends On:** Tasks 5-11 (all components)  
**Blocks:** Pixel integration, testing

**What:**
Assemble all components into App.jsx layout. Add Header (optional), structure sections, ensure smooth scrolling.

**Where:**
```
lrfitmethod-landing/src/
└─ App.jsx
```

**Done When:**
- [ ] App.jsx imports all section components
- [ ] Sections render in correct order: Hero → Problema → Pilares → QuemSomos → Resultados → Metodologia → CTA → Footer
- [ ] No console errors
- [ ] Smooth scrolling works
- [ ] Each section has proper spacing (padding)
- [ ] Content flows naturally

**Verification:**
```bash
npm run dev  # No console errors
# Visual: Page renders top to bottom with all sections
# Scroll: Smooth scrolling, no jumps
```

**Gate Criteria:**
- ✅ All components render without errors
- ✅ Sections in correct order
- ✅ Proper spacing between sections
- ✅ No broken layout

**Git Commit:**
```
Assemble App.jsx layout with all sections

- Import Hero, Problema, Pilares, QuemSomos, Resultados, Metodologia, CTA, Footer
- Arrange in correct order
- Add proper spacing between sections
- Verify smooth scrolling, no layout issues

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 13: Meta Pixel Script Integration**

**ID:** TASK-013  
**Type:** Sequential (after Task 12)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-012, TASK-004  
**Blocks:** Task 14

**What:**
Integrate Meta Pixel script into App.jsx using useMetaPixel hook. Ensure PageView fires on mount.

**Where:**
```
lrfitmethod-landing/src/
└─ App.jsx (import useMetaPixel)
```

**Done When:**
- [ ] useMetaPixel hook called in App.jsx
- [ ] Pixel script loads from VITE_META_PIXEL_ID
- [ ] PageView event fires on mount (auto)
- [ ] No console errors
- [ ] Pixel ID visible in browser Network tab (fbevents.js loads)

**Verification:**
```bash
# Browser DevTools → Network tab
# Should see fbevents.js load from Meta CDN

# Browser DevTools → Console
# Type: fbq.queue
# Should show array with PageView event

# Meta Events Manager
# Visit Meta Business Suite → Events Manager
# Should see TestEvent or PageView counting up
```

**Gate Criteria:**
- ✅ fbevents.js script loads from correct Pixel ID
- ✅ PageView event fires automatically
- ✅ No console errors
- ✅ Meta Events Manager shows incoming events

**Git Commit:**
```
Integrate Meta Pixel with PageView tracking

- Import useMetaPixel hook in App.jsx
- Load Pixel script from VITE_META_PIXEL_ID
- Fire PageView event on mount (auto)
- Verify in Meta Events Manager

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 14: Lead Event Tracking (CTA Clicks)**

**ID:** TASK-014  
**Type:** Sequential (after Task 13)  
**Time Estimate:** 1 hour  
**Depends On:** TASK-013, TASK-011  
**Blocks:** Task 17

**What:**
Add Lead event tracking to all WhatsApp CTA buttons (Hero, QuemSomos, CTAFinal).

**Where:**
```
lrfitmethod-landing/src/
└─ components/
   ├─ Hero.jsx (add onClick trackLead)
   ├─ QuemSomos.jsx (add onClick trackLead)
   └─ CTAFinal.jsx (add onClick trackLead)
```

**Done When:**
- [ ] useMetaPixel hook provides `trackLead(trainer_name)` function
- [ ] All CTA buttons have onClick handler that calls trackLead
- [ ] Lead event fires before href opens WhatsApp
- [ ] Meta Events Manager shows Lead events with trainer_name parameter
- [ ] No console errors

**Verification:**
```bash
# Click Hero CTA button
# Check Meta Events Manager → should show Lead event

# Click QuemSomos button (Renata)
# Check Meta Events Manager → should show Lead with trainer_name=renata parameter

# Repeat for Leandro button
# Should show trainer_name=leandro
```

**Gate Criteria:**
- ✅ Lead event fires on CTA click
- ✅ trainer_name parameter included in event
- ✅ Events visible in Meta Events Manager
- ✅ No delay before opening WhatsApp

**Git Commit:**
```
Add Lead event tracking to CTA buttons

- Import trackLead from useMetaPixel hook
- Add onClick handlers to Hero, QuemSomos, CTAFinal CTA buttons
- Fire Lead event with trainer_name parameter
- Verify in Meta Events Manager

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 15: SEO & Meta Tags**

**ID:** TASK-015  
**Type:** Sequential (after Task 14)  
**Time Estimate:** 1.5 hours  
**Depends On:** TASK-001  
**Blocks:** Task 16

**What:**
Add SEO meta tags and Open Graph tags to index.html for sharing, social preview, and search.

**Where:**
```
lrfitmethod-landing/
└─ index.html
```

**Done When:**
- [ ] `<title>` tag: "LR Fit Method | Consultoria Online de Fitness"
- [ ] `<meta description>`: Clear value proposition (under 160 chars)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags (optional)
- [ ] Favicon linked
- [ ] Charset & viewport set

**Verification:**
```bash
# Test with Open Graph debugger
# Visit: https://www.opengraphcheck.com
# Paste landing URL → should show preview with image + description
```

**Gate Criteria:**
- ✅ Title tag set
- ✅ Meta description (120-160 chars)
- ✅ Open Graph image (1200x630px recommended)
- ✅ Preview looks good in OG checker

**Git Commit:**
```
Add SEO and Open Graph meta tags

- Set title, meta description
- Add Open Graph tags (og:title, og:description, og:image, og:url)
- Set favicon
- Charset & viewport tags

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 16: Structured Data (JSON-LD)**

**ID:** TASK-016  
**Type:** Sequential (after Task 15)  
**Time Estimate:** 1 hour  
**Depends On:** TASK-001  
**Blocks:** Task 17

**What:**
Add JSON-LD structured data for Organization + LocalBusiness schema (optional but improves SEO).

**Where:**
```
lrfitmethod-landing/
└─ index.html (or separate component that injects <script>)
```

**Done When:**
- [ ] Organization schema in JSON-LD (name, url, logo, sameAs links)
- [ ] LocalBusiness schema (name, address optional, phone, email)
- [ ] Script tag has `type="application/ld+json"`
- [ ] Valid JSON (no syntax errors)

**Verification:**
```bash
# Test with Google's Structured Data Tester
# Visit: https://search.google.com/test/rich-results
# Paste HTML → should show no errors for Organization/LocalBusiness
```

**Gate Criteria:**
- ✅ Valid JSON-LD (parses without errors)
- ✅ Schema types correct
- ✅ Google Rich Results test passes

**Git Commit:**
```
Add JSON-LD structured data

- Organization schema (name, url, logo, social)
- LocalBusiness schema (phone, email)
- Valid JSON-LD format
- Passes Google Rich Results test

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 17: Performance Optimization**

**ID:** TASK-017  
**Type:** Sequential (after Task 16)  
**Time Estimate:** 2 hours  
**Depends On:** TASK-012  
**Blocks:** Task 18

**What:**
Optimize bundle size, image loading, and Core Web Vitals. Target: Lighthouse >75, <2s Vercel load time.

**Where:**
```
lrfitmethod-landing/
├─ vite.config.js (bundle optimization)
├─ public/images/ (image optimization)
└─ src/ (code splitting, lazy loading)
```

**Done When:**
- [ ] `npm run build` → bundle <100KB (gzip)
- [ ] Lighthouse score >75 (Performance metric)
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] All images in WebP format with JPEG fallback
- [ ] Code splitting: components loaded on-demand if >100KB
- [ ] Caching headers configured on Vercel

**Verification:**
```bash
# Local Lighthouse audit
npm run build
npx http-server dist/  # Serve build locally
# Open in Chrome → DevTools → Lighthouse → Run audit

# Or use Vercel deployment
# Visit Vercel deployment URL → run Lighthouse
# Should show scores >75 across all metrics
```

**Gate Criteria:**
- ✅ Lighthouse Performance score >75
- ✅ Bundle size <100KB (gzip)
- ✅ All Core Web Vitals green
- ✅ Images optimized (<100KB each)
- ✅ Vercel deployment <2s load time

**Git Commit:**
```
Optimize for performance (Lighthouse >75, <2s load)

- Code splitting, lazy loading
- Image optimization (WebP + JPEG fallback)
- Bundle size <100KB (gzip)
- Core Web Vitals: FCP <1.5s, LCP <2.5s, CLS <0.1
- Vercel caching headers configured

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### **Task 18: Testing & QA**

**ID:** TASK-018  
**Type:** Sequential (final)  
**Time Estimate:** 3 hours  
**Depends On:** All previous tasks  
**Blocks:** Launch

**What:**
Manual testing, accessibility checks, cross-browser validation, Meta Pixel verification.

**Where:**
```
Testing checklist (no new files, verification only)
```

**Done When:**
- [ ] **Functional Testing:**
  - [ ] All links work (WhatsApp routing correct per trainer)
  - [ ] URL params work (`?trainer=renata`, `?trainer=leandro`)
  - [ ] Images load without errors
  - [ ] No broken layout on any section

- [ ] **Browser Testing:**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Mobile (iOS Safari, Chrome Android)

- [ ] **Responsive Testing:**
  - [ ] 375px (mobile)
  - [ ] 768px (tablet)
  - [ ] 1920px (desktop)
  - [ ] No horizontal scroll

- [ ] **Meta Pixel Verification:**
  - [ ] PageView events flowing in Events Manager (100+ per day test)
  - [ ] Lead events firing (one per CTA click)
  - [ ] trainer_name parameter captured
  - [ ] No duplicate events

- [ ] **Accessibility:**
  - [ ] Keyboard navigation works
  - [ ] Alt text on all images
  - [ ] Color contrast >4.5:1 (gold on dark)
  - [ ] ARIA labels on buttons

- [ ] **Performance:**
  - [ ] Lighthouse >75 (run 3x, average)
  - [ ] <2s load on Vercel
  - [ ] No console errors
  - [ ] No Network tab warnings

**Verification Checklist:**
```bash
# Run Lighthouse 3 times, take average
npm run build
# Deploy to Vercel, run audit on production URL

# Cross-browser testing
# Test in Chrome, Firefox, Safari, Mobile Chrome/Safari

# Meta Pixel verification
# Send test traffic via Meta Events Manager → TestEvent
# Should see events flowing

# Accessibility audit
# Browser DevTools → Lighthouse → Accessibility tab
# Should pass all checks
```

**Gate Criteria (All must pass):**
- ✅ Functional: All links work, params route correctly
- ✅ Responsive: Renders correctly at 375px, 768px, 1920px
- ✅ Pixel: PageView + Lead events flowing to Meta
- ✅ Accessibility: Keyboard nav, alt text, color contrast
- ✅ Performance: Lighthouse >75, <2s load
- ✅ Cross-browser: No errors in Chrome, Firefox, Safari, Mobile

**Git Commit:**
```
Complete testing & QA — Ready for launch

- Functional testing: All links, params, images working
- Cross-browser: Chrome, Firefox, Safari, Mobile
- Responsive: 375px, 768px, 1920px layouts correct
- Meta Pixel: PageView + Lead events verified
- Accessibility: WCAG 2.1 AA compliance
- Performance: Lighthouse >75, <2s load time

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## Summary

| Task | Type | Hours | Status |
|------|------|-------|--------|
| Task 0 | Sequential | 0.5 | ⏳ READY |
| Task 1 | Sequential | 1.0 | ⏳ READY |
| Task 1.5 | Parallel | 1.5 | ⏳ READY |
| Task 2 | Parallel | 2.5 | ⏳ READY |
| Task 3 | Parallel | 0.75 | ⏳ READY |
| Task 4 | Parallel | 0.75 | ⏳ READY |
| Task 5 | Parallel | 2.0 | ⏳ READY |
| Task 6 | Parallel | 1.5 | ⏳ READY |
| Task 7 | Parallel | 1.5 | ⏳ READY |
| Task 8 | Parallel | 2.0 | ⏳ READY |
| Task 9 | Parallel | 1.5 | ⏳ READY |
| Task 10 | Parallel | 1.5 | ⏳ READY |
| Task 11 | Parallel | 2.0 | ⏳ READY |
| Task 12 | Sequential | 1.0 | ⏳ READY |
| Task 13 | Sequential | 1.5 | ⏳ READY |
| Task 14 | Sequential | 1.0 | ⏳ READY |
| Task 15 | Sequential | 1.5 | ⏳ READY |
| Task 16 | Sequential | 1.0 | ⏳ READY |
| Task 17 | Sequential | 2.0 | ⏳ READY |
| Task 18 | Sequential | 3.0 | ⏳ READY |
| **TOTAL** | - | **32 hours** | ✅ LOCKED |

**Execution Path:**
1. Tasks 0-1 (sequential, 1.5 hours)
2. Tasks 1.5-11 (parallel-able, ~10 hours)
3. Tasks 12-18 (sequential, ~11 hours)
4. **Total: 32-45 hours depending on parallelization**

---

**Ready to EXECUTE ✅**

Next: Start Task 0 (Meta Pixel setup)
