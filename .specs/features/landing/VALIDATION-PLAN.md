# VALIDATION-PLAN.md — Independent QA & Testing Strategy

**Document Purpose:** Define independent validation workflow for LR Fit landing project  
**Ownership:** QA Agent (independent from development agent)  
**Status:** ✅ READY FOR DELEGATION  

---

## Overview

**Principle:** Code written by Development Agent → Tested by Independent QA Agent

**Why Separate Agents?**
- Prevents developer bias (developer tends to test "happy path" only)
- Independent perspective catches edge cases
- Formal gate criteria before moving to next task
- Traceability & auditability for critical features

**Workflow per Task:**
```
Dev Agent: IMPLEMENT Task X ✓
    ↓
QA Agent: VALIDATE Task X (independent checklist)
    ↓
Gate Criteria: PASS/FAIL
    ├─ PASS → Dev Agent proceeds to Task X+1
    └─ FAIL → Dev Agent fixes → QA Agent re-validates
    ↓
QA Agent: DOCUMENT findings in VALIDATION-REPORT.md
```

---

## QA Agent Charter

**Authority:** Full power to block/reject tasks that don't meet gate criteria  
**Scope:** Functional, responsive, accessibility, performance, integration testing  
**Not Scope:** Code review/refactoring (that's for another phase)  
**Reporting:** Direct to user + validation report per task

---

## Validation Gates per Task

### Task 0: Meta Pixel Bootstrap

**QA Checklist:**
- [ ] Pixel ID is 16 digits (numeric only)
- [ ] Pixel ID is in `.env.local` as `VITE_META_PIXEL_ID`
- [ ] Script doesn't error when run again (idempotent test)
- [ ] Meta Business Suite shows pixel exists with correct name
- [ ] No "STATUS: PENDENTE" or placeholder values in pixel ID

**Validation Methods:**
```bash
# Check env var
echo $VITE_META_PIXEL_ID  # Must be 16 digits

# Verify idempotent
python scripts/get_or_create_pixel.py "LR Fit Method"  # Must return same ID twice

# Check Meta Suite
# Visit business.facebook.com → Pixels → Should see "LR Fit Method"
```

**Gate Criteria (All must pass):**
- ✅ Pixel ID: 16 digits, numeric
- ✅ Env var set correctly
- ✅ Idempotent (no duplicates on re-run)
- ✅ Pixel visible in Meta Business Suite

**Report Template:**
```markdown
## Task 0 Validation Report

**Status:** PASS ✅ / FAIL ❌

**Pixel ID:** [value]
**Format Check:** PASS ✅
**Idempotent Check:** PASS ✅
**Meta Suite Verification:** PASS ✅

**Issues Found:** None / [list]
**Recommendation:** Ready for Task 1 ✅
```

---

### Task 1: React Project Setup

**QA Checklist:**
- [ ] Dev server runs without errors: `npm run dev`
- [ ] Dev server listens on http://localhost:5173 (or correct port)
- [ ] Build succeeds: `npm run build` (no errors)
- [ ] Git repo exists on GitHub with at least 1 commit
- [ ] Vercel deployment preview active (auto-deploy working)
- [ ] .env.local exists with `VITE_META_PIXEL_ID` from Task 0
- [ ] package.json has required dependencies (react, tailwind, react-router-dom, axios)

**Validation Methods:**
```bash
# Dev server test
npm run dev  # Should start without errors

# Build test
npm run build  # Should create dist/ folder

# Git test
git log --oneline  # Should show at least 1 commit
git remote -v  # Should show GitHub origin

# Env test
cat .env.local | grep VITE_META_PIXEL_ID  # Must be set
```

**Gate Criteria (All must pass):**
- ✅ Dev server runs on localhost:5173
- ✅ `npm run build` succeeds (no errors)
- ✅ Git: 1+ commits, GitHub remote configured
- ✅ Vercel: Preview deployment active
- ✅ .env.local has VITE_META_PIXEL_ID (from Task 0)
- ✅ Dependencies installed (react, tailwind, router, axios)

**Report Template:**
```markdown
## Task 1 Validation Report

**Status:** PASS ✅ / FAIL ❌

### Dev Server
- [ ] Starts without errors
- [ ] Listens on localhost:5173

### Build
- [ ] `npm run build` succeeds
- [ ] No console errors/warnings

### Git & Deployment
- [ ] GitHub repo created + initial commit
- [ ] Vercel preview deployment active
- [ ] Auto-deploy link works

### Configuration
- [ ] .env.local has VITE_META_PIXEL_ID
- [ ] All dependencies installed

**Issues Found:** [list]
**Recommendation:** Ready for Task 1.5 ✅ / BLOCKED ❌
```

---

### Task 1.5: Content & Assets Bootstrap

**QA Checklist:**
- [ ] `src/content/lrfit.content.json` exists and is valid JSON
- [ ] JSON schema matches CONTENT-SCHEMA.md structure
- [ ] All required fields present (trainer names, WhatsApp numbers, text sections)
- [ ] No hardcoded strings in component imports (content.json is source of truth)
- [ ] Validation script detects STATUS: PENDENTE fields
- [ ] `scripts/process-assets.js` exists (can convert images)
- [ ] No console errors when importing content.json in App

**Validation Methods:**
```bash
# JSON validity
cat src/content/lrfit.content.json | jq .  # Must parse without errors

# Schema validation
# Manually check against CONTENT-SCHEMA.md (compare structure)

# Check for PENDENTE
grep -r "STATUS: PENDENTE" src/content/ | wc -l  # Count missing fields

# Test import
node -e "const c = require('./src/content/lrfit.content.json'); console.log(Object.keys(c))"
# Should list all sections
```

**Gate Criteria (All must pass):**
- ✅ JSON parses without errors
- ✅ Schema structure matches CONTENT-SCHEMA.md
- ✅ All required trainer fields present (name, phone, bio)
- ✅ No hardcoded copy in components (must come from JSON)
- ✅ Image paths exist in JSON (pointing to /images/)
- ✅ process-assets.js ready for image pipeline

**Report Template:**
```markdown
## Task 1.5 Validation Report

**Status:** PASS ✅ / FAIL ❌

### Content JSON
- [ ] Valid JSON (parses without errors)
- [ ] Schema matches CONTENT-SCHEMA.md
- [ ] Trainer data complete (names, phones, bios)

### Missing Data (STATUS: PENDENTE)
- Count: [number] fields
- List: [which sections]

### Components
- [ ] No hardcoded strings in components
- [ ] All content imported from lrfit.content.json

### Asset Pipeline
- [ ] process-assets.js exists
- [ ] Can be executed for image optimization

**Issues Found:** [list]
**Recommendation:** Ready for Task 2+ ✅ / BLOCKED ❌
```

---

### Task 2: Design System

**QA Checklist:**
- [ ] Tailwind config has all brand colors defined
- [ ] Typography (Montserrat, Inter) configured
- [ ] Reusable Button component exists (text, filled, outline variants)
- [ ] Reusable Card component exists (shadow, hover states)
- [ ] Reusable Grid component exists (responsive)
- [ ] No hardcoded hex colors in component files (all from theme)
- [ ] DESIGN-SYSTEM.md exists with usage examples
- [ ] Colors render correctly in browser (visual inspection)

**Validation Methods:**
```bash
# Tailwind config check
npx tailwindcss --list-all-classes | grep "bg-gold"  # Should find brand color

# Component import test
node -e "import('./src/components/common/Button.jsx')"  # No errors

# Visual test
npm run dev
# Browser: Inspect elements → colors should use Tailwind classes, not hex values
```

**Gate Criteria (All must pass):**
- ✅ All brand colors in Tailwind config
- ✅ Typography configured (fonts importable)
- ✅ Button, Card, Grid components implemented
- ✅ No magic numbers/hex values in components
- ✅ Design System doc complete with examples
- ✅ Colors render correctly (visual inspection)

**Report Template:**
```markdown
## Task 2 Validation Report

**Status:** PASS ✅ / FAIL ❌

### Tailwind Configuration
- [ ] Colors defined (gold, dark variants, neutrals)
- [ ] Typography configured (Montserrat, Inter)
- [ ] Spacing baseline set (4px, 8px, 16px, 24px)

### Components
- [ ] Button component (text, filled, outline variants)
- [ ] Card component (shadow, hover effects)
- [ ] Grid component (responsive max-width)

### Code Quality
- [ ] No hardcoded hex values in files
- [ ] All colors from theme/constants
- [ ] No magic numbers

### Documentation
- [ ] DESIGN-SYSTEM.md exists
- [ ] Usage examples provided

**Visual Inspection:**
- [ ] Gold color displays correctly
- [ ] Typography hierarchy clear
- [ ] Components render without layout issues

**Issues Found:** [list]
**Recommendation:** Ready for parallel Tasks 3-11 ✅ / BLOCKED ❌
```

---

### Task 3-11: Components (Hero, Problema, Pilares, etc.)

**Generic QA Checklist per Component:**
- [ ] Component file exists in `src/components/`
- [ ] Component renders without console errors
- [ ] Content comes from `lrfit.content.json` (no hardcoding)
- [ ] Images exist and load correctly
- [ ] Images <100KB each (optimized)
- [ ] Component responsive: renders at 375px, 768px, 1920px
- [ ] No layout breaks on mobile
- [ ] Accessible alt text on images
- [ ] Button text/links functional
- [ ] Uses Design System tokens (no hex colors)

**Task-Specific Gate Criteria:**

**Task 5 (Hero):**
- ✅ Trainer param routing: `?trainer=renata` → shows renata photo
- ✅ CTA button routes to correct WhatsApp (wa.me link)
- ✅ Image <100KB, has alt text
- ✅ Responsive (hero text size adjusts for mobile)

**Task 6 (Problema):**
- ✅ Before/after example image displays
- ✅ Text readable on mobile (font size ≥16px)
- ✅ No text overlap on images

**Task 7 (Pilares):**
- ✅ 3 columns on desktop (1920px)
- ✅ Stacks to 1 column on mobile (375px)
- ✅ Cards have equal height (no layout shifts)

**Task 8 (QuemSomos):**
- ✅ Both trainer photos display
- ✅ WhatsApp buttons route to correct trainer
- ✅ Buttons have trainer name in text

**Task 9 (Resultados):**
- ✅ Before/after pairs aligned (side-by-side)
- ✅ All images load without errors
- ✅ Grid responsive (2+ cols → 1 col mobile)

**Task 10 (Metodologia):**
- ✅ All 4 steps visible + readable
- ✅ Visual flow clear (timeline/cards)
- ✅ Step numbers prominent (gold color)

**Task 11 (CTA + Footer):**
- ✅ Dual buttons for both trainers
- ✅ WhatsApp links correct (wa.me)
- ✅ Footer links/social render
- ✅ Copyright text present

**Validation Methods:**
```bash
# Render component test
npm run dev
# Open browser → navigate to section
# Visual: Component displays correctly
# No console errors

# Responsive test (browser DevTools)
# Set viewport to 375px → component stacks/flows correctly
# Set viewport to 1920px → component spreads correctly

# Link test
# Click buttons → verify WhatsApp/links work
# trainer=renata param → check photo changes
```

**Report Template (per component):**
```markdown
## Task X: [Component Name] Validation Report

**Status:** PASS ✅ / FAIL ❌

### Rendering
- [ ] Component renders without console errors
- [ ] All content from lrfit.content.json
- [ ] No hardcoded strings

### Content & Links
- [ ] Text displays correctly
- [ ] Links/buttons functional
- [ ] WhatsApp routing correct (if applicable)

### Images
- [ ] Images load without 404s
- [ ] Image size <100KB each
- [ ] Alt text present on all images

### Responsive Design
- [ ] 375px (mobile): [description of layout]
- [ ] 768px (tablet): [description of layout]
- [ ] 1920px (desktop): [description of layout]
- [ ] No horizontal scroll
- [ ] No text overlap

### Design System Compliance
- [ ] Uses Tailwind classes (no hex values)
- [ ] Colors from design system
- [ ] Typography consistent with design system

**Component-Specific Tests:**
[Task-specific gate criteria results]

**Issues Found:** [list]
**Recommendation:** Ready for next task ✅ / BLOCKED ❌
```

---

### Task 12: App.jsx Layout Assembly

**QA Checklist:**
- [ ] App.jsx imports all 8 section components
- [ ] Sections render in correct order (Hero → Footer)
- [ ] No console errors
- [ ] Smooth scrolling works (no layout shifts)
- [ ] Spacing between sections consistent
- [ ] Page flows naturally (no visual gaps)
- [ ] Build succeeds without errors

**Gate Criteria:**
- ✅ All sections render in correct order
- ✅ No console errors
- ✅ Proper spacing between sections
- ✅ Build succeeds

---

### Task 13-14: Meta Pixel Integration

**QA Checklist:**
- [ ] fbq() function available globally
- [ ] PageView event fires on page load
- [ ] Lead events fire on CTA button clicks
- [ ] trainer_name parameter included in Lead events
- [ ] Meta Events Manager shows incoming events
- [ ] No console errors related to Pixel
- [ ] Pixel script (fbevents.js) loads from Meta CDN

**Gate Criteria:**
- ✅ fbevents.js loads from correct Pixel ID
- ✅ PageView event fires on mount
- ✅ Lead event fires on CTA clicks
- ✅ Events visible in Meta Events Manager

---

### Task 15-16: SEO & Structured Data

**QA Checklist:**
- [ ] `<title>` tag set in index.html
- [ ] Meta description present (120-160 chars)
- [ ] Open Graph image valid (1200x630px)
- [ ] Open Graph preview looks good (test with OG debugger)
- [ ] JSON-LD parses without errors
- [ ] Google Rich Results test passes

**Gate Criteria:**
- ✅ Title & meta description set
- ✅ OG tags valid (image exists, correct dimensions)
- ✅ JSON-LD schema valid
- ✅ Google Rich Results test: no errors

---

### Task 17: Performance Optimization

**QA Checklist:**
- [ ] `npm run build` produces bundle <100KB (gzip)
- [ ] Lighthouse audit run 3 times, average score >75
- [ ] First Contentful Paint (FCP) <1.5s
- [ ] Largest Contentful Paint (LCP) <2.5s
- [ ] Cumulative Layout Shift (CLS) <0.1
- [ ] Vercel deployment loads <2s
- [ ] No console errors or warnings
- [ ] All images in WebP format with JPEG fallback

**Gate Criteria (All must pass):**
- ✅ Bundle size <100KB (gzip)
- ✅ Lighthouse >75 (average of 3 runs)
- ✅ FCP <1.5s, LCP <2.5s, CLS <0.1
- ✅ Vercel deployment <2s load time

**Report Template:**
```markdown
## Task 17 Validation Report — Performance

**Status:** PASS ✅ / FAIL ❌

### Bundle Size
- Gzip size: [X KB] (target: <100KB)
- Status: PASS ✅ / FAIL ❌

### Lighthouse Scores (3 runs)
| Run | Performance | Accessibility | Best Practices | SEO |
|-----|-------------|----------------|-----------------|-----|
| 1 | [X] | [X] | [X] | [X] |
| 2 | [X] | [X] | [X] | [X] |
| 3 | [X] | [X] | [X] | [X] |
| **Avg** | **[X]** | **[X]** | **[X]** | **[X]** |

**Performance Metrics:**
- FCP: [X]s (target: <1.5s)
- LCP: [X]s (target: <2.5s)
- CLS: [X] (target: <0.1)
- Vercel load: [X]s (target: <2s)

**Status per Metric:**
- Bundle size: PASS ✅ / FAIL ❌
- Lighthouse avg: PASS ✅ / FAIL ❌
- Core Web Vitals: PASS ✅ / FAIL ❌
- Vercel load: PASS ✅ / FAIL ❌

**Issues Found:** [list]
**Recommendation:** Ready for Task 18 ✅ / OPTIMIZE ❌
```

---

### Task 18: Testing & QA (Final)

**QA Checklist:**
- [ ] **Functional:** All links work, params route correctly, images load
- [ ] **Cross-browser:** Tested in Chrome, Firefox, Safari (+ mobile)
- [ ] **Responsive:** 375px, 768px, 1920px layouts correct
- [ ] **Meta Pixel:** PageView + Lead events verified in Events Manager
- [ ] **Accessibility:** WCAG 2.1 AA (keyboard nav, alt text, contrast)
- [ ] **Performance:** Lighthouse >75, Core Web Vitals green
- [ ] **No console errors** across all devices/browsers

**Gate Criteria (All must pass):**
- ✅ Functional test: PASS
- ✅ Cross-browser test: PASS
- ✅ Responsive test: PASS
- ✅ Pixel test: PASS
- ✅ Accessibility test: PASS
- ✅ Performance test: PASS

---

## Validation Report Template (Master)

```markdown
# VALIDATION-REPORT.md

**Date:** [Date]
**QA Agent:** [Agent Name]
**Development Agent:** Claude Code

---

## Summary

| Task | Status | Issues | Recommendation |
|------|--------|--------|-----------------|
| Task 0 | ✅ PASS | None | PROCEED |
| Task 1 | ✅ PASS | None | PROCEED |
| Task 1.5 | ⚠️ FAIL | [Issue list] | FIX & RE-TEST |
| ... | ... | ... | ... |

---

## Task-by-Task Reports

[Detailed report for each task]

---

## Overall Status

**Launch Readiness:** READY ✅ / BLOCKED ❌

**Critical Issues:** [List any blockers]

**Sign-Off:** QA Agent confirms ready for production ✅
```

---

## Escalation Process

**If QA finds FAIL:**
1. QA documents issue with reproducible steps
2. QA notifies Development Agent
3. Development Agent fixes
4. QA re-validates (Task doesn't move forward until PASS)
5. If multiple re-tests fail → escalate to project owner (Wagner)

**Example:**
```
Task 5 (Hero): FAIL ❌
Issue: Trainer photo doesn't load on mobile (404 error)
Root cause: Image path incorrect in content.json
Reproduction: Visit landing on iPhone, Hero section, no image
Fix: Update path from /images/hero.jpg to /images/hero-renata.jpg
Re-test: PASS ✅ → Proceed to Task 6
```

---

## Deliverables per QA Pass

For each task that passes QA, the report includes:

1. **Validation Report** — detailed test results
2. **Sign-off** — "Ready for next task"
3. **Git History** — confirms atomic commit per task
4. **Evidence** — screenshots, console logs, Lighthouse reports

---

## Communication

**QA Agent → User (after each task validation):**
```
## Task X: [Component/Feature] 

**Status:** ✅ PASS / ⚠️ FAIL

**Summary:** [1-2 sentence finding]

**Details:** See VALIDATION-REPORT.md

**Recommendation:** Ready for Task X+1 ✅ / Blocked ❌
```

---

**This plan ensures:**
- ✅ Independent QA (separate agent, no bias)
- ✅ Traceable validation (documented per task)
- ✅ Gate criteria enforced (no "it looks good enough")
- ✅ Escalation path (clear process for failures)
- ✅ Audit trail (evidence for each task pass)

**Ready for EXECUTE phase with independent QA ✅**
