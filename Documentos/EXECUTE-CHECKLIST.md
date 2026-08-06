# EXECUTE Checklist
## LR Fit Method - Landing Page Implementation

**Document:** Quick-start guide to begin EXECUTE phase  
**Status:** READY  
**First Action:** Complete Pre-Flight Checklist

---

## Pre-Flight Checklist (Before Task 0)

### Setup on Your Machine
- [ ] Node.js 18+ installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] GitHub account created + SSH key configured
- [ ] Vercel account created + ready to link to GitHub
- [ ] VSCode (or editor of choice) installed

### Client Information (Get from Renata + Leandro)
- [ ] Trainer 1 full name (Renata)
- [ ] Trainer 2 full name (Leandro)
- [ ] Trainer 1 phone number (WhatsApp): +55 11 ____
- [ ] Trainer 2 phone number (WhatsApp): +55 11 ____
- [ ] Trainer 1 bio/credentials (3 lines max)
- [ ] Trainer 2 bio/credentials (3 lines max)
- [ ] 3-6 before/after transformation photos (high quality, min 1920px wide)
- [ ] Instagram handles (for footer links)
- [ ] Brand tagline (default: "Disciplina na rotina. Liberdade na vida.")
- [ ] Price/offer to display (if ready, placeholder OK for now)

### Meta Setup
- [ ] Meta Business Account accessible (ask Wagner if not sure)
- [ ] Check if Meta Pixel already exists (ask Wagner)
- [ ] If pixel exists: note the Pixel ID (16 digits)
- [ ] If pixel doesn't exist: plan to create in Task 0

### GitHub Prep
- [ ] Decide repo name: `lrfitmethod-landing`
- [ ] Create new repo on GitHub (or ask Wagner to create)
- [ ] Add your GitHub SSH key locally

---

## Phase 0: Project Setup (Days 1-2)

### Task 0: Meta Pixel Setup (30 min)
**Checklist:**
- [ ] Check if Meta Pixel exists in Meta Business Suite
- [ ] If yes: copy Pixel ID (format: 123456789012345)
- [ ] If no: create new pixel in Meta Business Suite
- [ ] Save Pixel ID somewhere safe (you'll need it in Task 1)
- [ ] Test: pixel script loads in browser console (later in Task 10)

**Outcome:** Have `VITE_META_PIXEL_ID` ready for `.env.local`

---

### Task 1: React Project Setup (1 hour)
**Checklist:**
- [ ] Open terminal in development folder
- [ ] Run: `npm create vite@latest lrfitmethod-landing -- --template react`
- [ ] Run: `cd lrfitmethod-landing`
- [ ] Run: `npm install`
- [ ] Run: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Run: `npx tailwindcss init -p`
- [ ] Run: `npm install react-router-dom axios`
- [ ] Test: `npm run dev` opens http://localhost:5173
- [ ] Create `.env.local` file:
  ```
  VITE_META_PIXEL_ID=123456789012345
  ```
- [ ] Initialize Git: `git init`
- [ ] Add GitHub remote: `git remote add origin https://github.com/[YOUR_USER]/lrfitmethod-landing.git`
- [ ] First commit: `git add . && git commit -m "Initial project setup"`
- [ ] Push: `git push -u origin main`
- [ ] Link to Vercel: Go to vercel.com, import GitHub repo

**Outcome:** Dev server runs locally, GitHub repo exists, Vercel linked

---

### Task 1.5: Content Schema + Assets (45 min)
**Checklist:**

1. **Create Content File:**
   - [ ] Create `src/content/lrfit.content.json`
   - [ ] Fill in all fields from `SDD-LR-FIT-COMPLETE.md` section 1.4.1
   - [ ] Mark incomplete fields as: `"STATUS": "PENDENTE"`
   - [ ] Example incomplete phone: `"phone": "STATUS: PENDENTE"` (you'll fill before deploy)

2. **Asset Pipeline:**
   - [ ] Create `assets/raw/` folder
   - [ ] Create `scripts/process-assets.js` (see SDD for template)
   - [ ] Create `scripts/validate-content.js` (see SDD for template)
   - [ ] Add to `package.json` scripts:
     ```json
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "optimize-assets": "node scripts/process-assets.js",
       "validate": "node scripts/validate-content.js"
     }
     ```
   - [ ] Test: `npm run validate` → should output "Content is valid" or list PENDENTE fields

3. **GitHub Workflow (Optional but Recommended):**
   - [ ] Create `.github/workflows/ci.yml` (see SDD for template)
   - [ ] Commit: `git add . && git commit -m "Add content schema and CI pipeline"`
   - [ ] Push: `git push`
   - [ ] Check GitHub Actions tab: workflow runs

**Outcome:** Content schema locked, asset pipeline ready, validation gate in place

---

### Checkpoint 1: Setup Complete ✅
**Verify:**
- [ ] GitHub repo has 2-3 commits (setup + content schema)
- [ ] Vercel dashboard shows repo linked
- [ ] `.env.local` has Meta Pixel ID
- [ ] `npm run dev` works locally
- [ ] `npm run validate` passes

**Next:** Begin Phase 1 (component development)

---

## Phase 1: Component Development (Days 3-12)

### Quick Reference: Component Tasks
```
Task 2  → Hero (1.5 hours)
Task 3  → Problema (45 min)
Task 4  → Pilares (1 hour)
Task 5  → Quem Somos (2 hours) ⭐ Most complex
Task 6  → Resultados (1.5 hours)
Task 7  → Metodologia (1 hour)
Task 8  → CTA Final (1 hour)
Task 9  → Footer (30 min)
```

### For Each Task:
1. Read the task spec in `SDD-LR-FIT-COMPLETE.md`
2. Create component file(s) in `src/components/`
3. Import component in `App.jsx`
4. Test in browser: `http://localhost:5173`
5. Commit: `git add . && git commit -m "feat(components): [Task Name]"`
6. Check: No console errors, responsive on mobile

### Example (Task 2: Hero)
```bash
# 1. Create component file
# vim src/components/Hero.jsx

# 2. Edit App.jsx
# Add: import Hero from './components/Hero'
# Add: <Hero /> in component tree

# 3. Test
npm run dev
# Open http://localhost:5173
# Verify Hero shows with photo
# Test URL params:
#   http://localhost:5173?trainer=renata
#   http://localhost:5173?trainer=leandro

# 4. Commit
git add src/components/Hero.jsx src/App.jsx
git commit -m "feat(components): Add Hero section with trainer routing

- Hero detects ?trainer=X param
- Photos conditional (casal default, trainer-specific variant)
- CTA scrolls to #quem-somos

Closes Task-002"
git push
```

### Checkpoint 2: Components Complete (End of Day 12)
- [ ] All 8 sections visible on landing
- [ ] Responsive on mobile/tablet/desktop
- [ ] All components imported in `App.jsx`
- [ ] No console errors
- [ ] GitHub has commits for each component task

---

## Phase 2: Technical Integration (Days 13-15)

### Task 10: Meta Pixel Integration (1 hour)
**Checklist:**
- [ ] Create `src/hooks/useMetaPixel.js`
- [ ] In `App.jsx`: call `useMetaPixel(VITE_META_PIXEL_ID)`
- [ ] WhatsApp buttons trigger `trackEvent('Lead')`
- [ ] Test: Click button, check Meta Events Manager for "Lead" event
- [ ] Commit: `git add . && git commit -m "feat(tracking): Add Meta Pixel integration"`

**Outcome:** Pixel fires PageView + Lead events

---

### Task 11: SEO & OG Tags (45 min)
**Checklist:**
- [ ] Edit `public/index.html`
- [ ] Add meta tags (title, description, og:image, etc.)
- [ ] Test: Open page source (Ctrl+U), verify tags present
- [ ] Commit: `git add . && git commit -m "feat(seo): Add meta tags and OG tags"`

**Outcome:** SEO score >90, social sharing works

---

### Task 12: Design System (1.5 hours)
**Checklist:**
- [ ] Create `tailwind.config.js` with colors, fonts, spacing
- [ ] Create `DESIGN-SYSTEM.md` with documentation
- [ ] Commit: `git add . && git commit -m "docs: Add design system documentation"`

**Outcome:** Design system locked, reusable for future template

---

## Phase 3: Testing & Deployment (Days 16-18)

### Task 13: Local Testing (1.5 hours)
**Checklist:**

1. **Build & Test:**
   - [ ] Run: `npm run build`
   - [ ] Run: `npm run preview` (preview production build)
   - [ ] Open: `http://localhost:4173`

2. **QA Checklist:**
   - [ ] All 8 sections visible
   - [ ] URL params work (?trainer=X)
   - [ ] All buttons functional (scroll, WhatsApp)
   - [ ] Mobile responsive (375px width)
   - [ ] No console errors
   - [ ] Images load correctly

3. **Lighthouse Audit:**
   - [ ] Chrome DevTools → Lighthouse
   - [ ] Performance: >75
   - [ ] Accessibility: >90
   - [ ] SEO: >90

4. **Meta Pixel Test:**
   - [ ] Check Meta Events Manager
   - [ ] Should show PageView events
   - [ ] Click WhatsApp button, verify "Lead" event appears

**Outcome:** Create `TEST-REPORT.md` with all results

---

### Task 14: Deploy to Vercel (30 min)
**Checklist:**
- [ ] Commit all changes: `git add . && git commit -m "..."`
- [ ] Push to GitHub: `git push origin main`
- [ ] Wait 2 min, check Vercel dashboard
- [ ] Deployment Status: ✅ Success
- [ ] Visit: `https://lrfitmethod.vercel.app`
- [ ] Test all sections, buttons, Meta Pixel
- [ ] Success! Landing is live

**Outcome:** Landing live at `lrfitmethod.vercel.app`

---

### Task 15: Setup Guide (2 hours)
**Checklist:**
- [ ] Create `SETUP-GUIDE.md`
- [ ] Include: Meta Pixel setup, Ads Manager, campaigns, troubleshooting
- [ ] Write for non-technical audience (Renata + Leandro can follow)
- [ ] Add screenshots/links
- [ ] Commit: `git add . && git commit -m "docs: Add setup guide for campaigns"`

**Outcome:** Setup guide ready, ready to train client

---

## Checkpoint 3: MVP Complete ✅ (End of Week 4)

**Verify:**
```bash
# GitHub
git log --oneline | head -10
# Should see commits for: setup, components, integration, testing, deploy

# Vercel
# Visit dashboard, click latest deployment
# Status: Success
# Domain: lrfitmethod.vercel.app

# Test Landing
https://lrfitmethod.vercel.app
# All sections load
# Click buttons (no errors)
# Meta Events Manager shows events

# Files
ls -la documentos/
# Should see: SDD-LR-FIT-COMPLETE.md, EXECUTE-CHECKLIST.md (this file), SETUP-GUIDE.md, TEST-REPORT.md
```

---

## Phase 4: Launch & Monitor (Week 5+)

### After Landing is Live:
1. **Notify Client:** "Landing is live at lrfitmethod.vercel.app"
2. **Setup Campaigns:** Follow `SETUP-GUIDE.md` to create 2 Meta Ads campaigns
3. **Start Test Budget:** R$1-2/day for 3 days
4. **Monitor Daily:** Check Meta Ads Manager for leads, CPL, events
5. **After 1 Week:** Review data, decide: scale (CPL <R$15) or iterate

### Success Metrics (Week 5):
- [ ] 100+ page views (from ads)
- [ ] 10+ leads (WhatsApp clicks)
- [ ] CPL < R$15
- [ ] Trainer split visible (Renata vs Leandro conversions)

---

## Key Files to Keep Handy

| File | Purpose | When Needed |
|------|---------|------------|
| `SDD-LR-FIT-COMPLETE.md` | Full technical spec | Before/during each task |
| `EXECUTE-CHECKLIST.md` | This file (quick reference) | Throughout EXECUTE phase |
| `SETUP-GUIDE.md` | How to use dashboard | After deployment |
| `TEST-REPORT.md` | QA results | After Task 13 |
| `content/lrfit.content.json` | Content source of truth | When updating text/copy |
| `.env.local` | Secret config | Meta Pixel ID |

---

## Common Troubleshooting

### "npm run dev fails"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Vercel deployment fails"
**Solution:**
- Check GitHub Actions tab for errors
- Common: `.env.local` not in Vercel (add in Project Settings → Environment Variables)
- Check: `npm run build` works locally

### "Meta Pixel not firing"
**Solution:**
- Check `.env.local` has correct `VITE_META_PIXEL_ID`
- DevTools → Network tab: search "fbq" (pixel script should load)
- DevTools → Console: run `window.fbq('track', 'PageView')` manually
- Check: Meta Events Manager shows the event within 30 sec

### "URL params not working"
**Solution:**
- Check: `useTrainerParam` hook reads from `window.location.search`
- Test in browser: `console.log(useTrainerParam())` in component
- Verify: trainer names in content.json match URL params (lowercase)

### "Images not loading"
**Solution:**
- Check: Image paths in content.json point to `/images/` folder
- Verify: Run `npm run optimize-assets` to move from `assets/raw/` to `public/images/`
- Check: File exists: `public/images/hero-casal.jpg` (or `.webp`)

---

## Time Estimates Summary

| Phase | Tasks | Duration | Notes |
|-------|-------|----------|-------|
| Setup | 0, 1, 1.5 | 2.5 hours | Tasks 0-1.5 |
| Components | 2-9 | 10 hours | 8 sections |
| Integration | 10-12 | 3 hours | Pixel, SEO, Design System |
| Testing | 13-15 | 4 hours | QA, Deploy, Docs |
| **Total** | | **19.5 hours** | Spread over 4 weeks (10-15h/week) |

**Realistic Timeline:** 4-5 weeks (accounting for questions, client feedback, learning curve)

---

## Questions Before You Start?

If anything is unclear:
1. **Check:** `SDD-LR-FIT-COMPLETE.md` (full spec)
2. **Ask:** Wagner or the client (Renata + Leandro)
3. **Don't guess:** "Não sei" is better than inventing data

---

**Ready to Begin?** Start with **Task 0** (Meta Pixel Setup)

**Current Status:** ✅ READY FOR EXECUTE

**Good luck! 🚀**
