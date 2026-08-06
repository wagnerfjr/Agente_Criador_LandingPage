# PROJECT.md (tracking de execução)

> A visão/escopo canônico do produto está em [`docs/spec/PROJECT.md`](../../docs/spec/PROJECT.md).
> Este arquivo é o estado de tracking ativo da skill tlc-spec-driven (métricas, riscos, fases) —
> reconciliado em 2026-08-06 para não conflitar com a spec original.

---

**Project Name:** LR Fit Method - Landing Page + Analytics Dashboard  
**Owner:** Wagner (Tech Lead + Marketer)  
**Timeline:** 15-30 days (MVP test → Product template)  
**Status:** ✅ SPECIFY | ✅ DESIGN | ⏳ TASKS | ⏭️ EXECUTE  

---

## Vision

Build a **reusable landing page + analytics engine** for fitness consultancy that:
- Captures leads via WhatsApp with intelligent trainer routing
- Measures ROI of Meta Ads campaigns (test budget R$5-10/day)
- Serves as template foundation for selling to other consultancies

**Current Phase:** MVP for LR Fit Method (Renata + Leandro)  
**Next Phase:** Automated generator that creates landings dynamically from JSON

---

## Business Context

### Client: LR Fit Method
- **Model:** Online fitness consultancy (training + diet + supplementation)
- **Team:** Renata + Leandro (couple, gym in Osasco/SP)
- **Niche:** Regular people seeking fitness + healthy lifestyle (not athletes)
- **Differentiator:** "Consistency > Perfection" + "Discipline in routine, freedom in life"
- **Status:** Real paying clients + transformation photos ready

### Success Metrics (30 days)
| Metric | Target | Owner |
|--------|--------|-------|
| Landing live | Vercel (0 downtime) | Wagner |
| Page views | 100+ | Landing |
| Meta Pixel events | 100% PageView capture | Wagner |
| Conversion (visit → WhatsApp) | >25% | Wagner |
| Leads captured | 10+ (test phase) | Meta Ads |
| Cost per lead | <R$15 | Meta Ads |

---

## Scope

### ✅ Included (MVP)

**Landing Page (8 sections)**
- Hero (trainer-conditional photo + CTA)
- Problema (pain point + transformation story)
- 3 Pilares (training, nutrition, freedom grid)
- Quem Somos (2 trainer cards with bios)
- Resultados (before/after transformation grid)
- Metodologia (4-step process)
- CTA Final (dual WhatsApp buttons)
- Footer (links + social + copyright)

**Technical Features**
- URL param routing (`?trainer=renata` | `?trainer=leandro`)
- Meta Pixel PageView + Lead tracking
- SEO + Open Graph tags
- Responsive design (375px mobile → 1920px desktop)
- Performance: Lighthouse >75, <2s load

**Supporting**
- Design System (colors, typography, components, Tailwind config)
- Setup Guide (how to create Pixel, campaigns, deploy)
- Playbook documentation (template replication guide)

### ❌ Excluded (MVP)
- Payment/checkout system
- Advanced WhatsApp automation (just `wa.me` links)
- Custom analytics dashboard (using Meta's native tools)
- Blog/SEO strategy (ads-driven only)
- Mobile app, CRM integration

---

## Technical Stack (Locked)

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React 18 + Vite | Reusable, fast dev, easy to template |
| Hosting | Vercel Free | Zero-ops, auto-deploy, free tier |
| Styling | TailwindCSS | Utility-first, component reuse |
| Tracking | Meta Pixel | Integrated with Ad Manager |
| Analytics DB | Supabase PostgreSQL | Optional MVP, prepared for phase 2 |
| Deployment | GitHub → Vercel auto-deploy | Clean CI/CD, zero manual steps |
| Language | Portuguese (Brazil) | Client requirement |

---

## Deliverables

1. **lrfitmethod-landing/** (GitHub repo)
   - React app + Design System + Components
   - Scripts (get_or_create_pixel.py, process-assets.js)
   - Tests + Lighthouse reports

2. **.specs/** (this project)
   - PROJECT.md (vision & goals)
   - ROADMAP.md (features & milestones)
   - STATE.md (decisions & blockers)
   - features/landing/ (spec, design, tasks)

3. **Documentation**
   - SETUP-GUIDE.md (how to recreate)
   - PLAYBOOK.md (template replication)
   - PRD.md (for selling to other consultancies)

---

## Known Constraints

- **Bundle size:** <100KB gzip for <2s page load
- **Browser support:** Last 2 versions Chrome/Firefox/Safari
- **Images:** WebP + JPEG fallback, <100KB per image
- **Content:** Single JSON source of truth (`lrfit.content.json`)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Missing trainer photos | Placeholder images in content.json with STATUS: PENDENTE |
| Meta API changes | Version pinned to v21.0, documented in get_or_create_pixel.py |
| Performance regression | Lighthouse checks in gate criteria |
| Content hardcoding | Content schema enforced, failing on deploy if STATUS: PENDENTE |

---

## Phase Breakdown

| Phase | Duration | Status |
|-------|----------|--------|
| SPECIFY (Requirements) | ✅ Done | LOCKED |
| DESIGN (Architecture) | ✅ Done | LOCKED |
| TASKS (Task Generation) | ⏳ In progress | THIS PHASE |
| EXECUTE (Implementation) | ⏭️ Next | Atomic + verified |

**Next:** Generate atomic tasks → Begin Task 0 (Meta Pixel setup)
