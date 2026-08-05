# ROADMAP.md — LR Fit Method

**Horizon:** 6 months (MVP → Product)  
**Current Phase:** EXECUTE (Week 1-2: Landing page)  

---

## Milestone 1: MVP - Landing + Tracking (Week 1-2)

### Feature: LR Fit Landing Page
**ID:** FEATURE-LR-001  
**Status:** EXECUTE  
**Complexity:** Large (18 atomic tasks)  
**Timeline:** 35-45 hours

**Acceptance Criteria:**
- [ ] React app deployed to Vercel
- [ ] 8 sections render correctly (Hero → Footer)
- [ ] URL params work (`?trainer=renata` | `?trainer=leandro`)
- [ ] Meta Pixel tracks PageView + Lead events
- [ ] Responsive (mobile 375px → desktop 1920px)
- [ ] Lighthouse >75, <2s load time
- [ ] All images optimized (<100KB)
- [ ] No STATUS: PENDENTE in content.json
- [ ] Git: 18 atomic commits (1 per task)

**Tasks:** See `features/landing/tasks.md`

---

### Feature: Analytics Ritual (Manual)
**ID:** FEATURE-LR-002  
**Status:** SPECIFY  
**Complexity:** Small (documentation)  
**Timeline:** 2 hours

**Acceptance Criteria:**
- [ ] Setup Guide: Create Meta Pixel, configure campaigns
- [ ] Daily checklist: Monitor Meta Ads Manager + Events Manager
- [ ] Weekly report template
- [ ] Cost calculation example (CPL < R$15)

**Deliverable:** `SETUP-GUIDE.md`

---

### Supporting: Design System
**ID:** SUPPORT-DS-001  
**Status:** EXECUTE (Task 2)  
**Complexity:** Medium  
**Timeline:** 2-3 hours

**Deliverable:**
- Tailwind config (`tailwind.config.js`)
- Design tokens (colors, fonts, spacing)
- Component library doc

---

## Milestone 2: Validate & Optimize (Week 3-4)

### Feature: Meta Ads Testing
**Status:** SPECIFY  
**Timeline:** 2-3 weeks

**Acceptance Criteria:**
- [ ] 2 campaigns running (trainer=renata | trainer=leandro)
- [ ] Test budget R$1-2/day
- [ ] Pixel collecting 100+ events/day
- [ ] Cost per lead documented
- [ ] Learnings documented in PLAYBOOK.md

---

### Feature: Dashboard (Deferred)
**Status:** DEFERRED  
**Reason:** Use Meta's native tools for MVP

**Triggered when:**
- MVP validated (CPL < R$15, 50+ leads/30 days)
- Casal becomes recurring client
- Decision to transform into product for other consultancies

---

## Milestone 3: Product Validation (Week 5-6)

### Feedback Loop
- [ ] Casal validates landing + campaign performance
- [ ] Edge cases tested (mobile, slow connection)
- [ ] Copy refined based on lead feedback
- [ ] Analytics dashboard operational (if phase 2 starts)

### Documentation Final
- [ ] Lock PRD, final specs
- [ ] Playbook complete and tested
- [ ] Ready for replication

---

## Milestone 4: Product - Template Generator (Week 7+)

### Feature: Landing Generator Agent
**Status:** DEFERRED (after MVP runs)  
**Complexity:** Very High

**Input:**
```json
{
  "brand_name": "LR Fit Method",
  "primary_color": "#D4AF37",
  "trainers": [...],
  "results": [...],
  "offer": "R$X/mês"
}
```

**Output:** Vercel repo + deployed landing

**Acceptance Criteria:**
- [ ] Generate landing < 1 min
- [ ] Auto-deploy via Vercel
- [ ] Pixel pre-configured
- [ ] Design System applied
- [ ] 95% code reuse

---

## Feature Dependencies

```
PROJECT SETUP (Day 1)
├─ Meta Pixel ID ✓
├─ GitHub repo ✓
├─ Client photos ⏳ (pending Renata + Leandro)
└─ Offer/pricing ⏳ (pending)

DESIGN SYSTEM (Day 2-3)
├─ Colors, typography ← See Documentos/FEATURE-LANDING-DESIGN.md
├─ Components base
└─ Tailwind config

LANDING PAGE (Day 4-10) [18 Tasks]
├─ Hero ← depends: photo + design system
├─ 3 Pilares ← depends: copy
├─ Quem Somos ← depends: trainer photo + bio
├─ Resultados ← depends: client photos
├─ Metodologia ← depends: copy
└─ CTAs ← depends: Meta Pixel ID

TESTING & LAUNCH (Day 11-14)
├─ QA ← depends: landing live
├─ Meta Ads setup ← depends: Pixel
├─ Test campaigns ← depends: landing
└─ Monitoring ← depends: dashboard (if MVP)

DOCUMENTATION (Day 15+)
├─ Setup Guide ← depends: QA pass
├─ Playbook ← depends: data + learnings
└─ PRD produto ← depends: playbook
```

---

## Blockers & Decisions

| Item | Status | Owner | ETA |
|------|--------|-------|-----|
| Client photos (hero + trainers + transformations) | ⏳ Pending | Renata + Leandro | Before Day 4 |
| Pricing/offer to display | ⏳ Pending | Renata + Leandro | Before Day 15 |
| Meta Pixel ID | ⏳ Pending creation | Wagner | Task 0 |
| Trainer WhatsApp numbers | ⏳ Pending | Renata + Leandro | Before Day 1 |
| Domain (lrfitmethod.com.br) | ✅ Deferred to phase 2 | - | After MVP |

---

## Success Definition

**MVP is done when:**
1. ✅ Landing live at vercel.app (or custom domain)
2. ✅ Meta Pixel tracking 100+ page views + 10+ test leads
3. ✅ 3 days of testing with R$1-2/day budget
4. ✅ Setup Guide + Playbook documented
5. ✅ CPL measured and <R$15 (or documented with learnings)

**Product is done when:**
1. 50+ paying customers
2. ROI Meta Ads > 3:1
3. Playbook 100% reusable
4. 5+ consultancies using template (paid model)

---

## Next Steps

→ **Begin EXECUTE phase**  
→ **Generate atomic tasks** (see `features/landing/tasks.md`)  
→ **Start Task 0:** Meta Pixel setup (30 min)
