# STATE.md — Project Memory

**Last Updated:** 2026-08-05  
**Session Owner:** Wagner + Claude Code  

---

## Locked Decisions

| Decision | Status | Rationale |
|----------|--------|-----------|
| **INDEPENDENT QA** — Separate agent validates each task | ✅ LOCKED (NEW) | Prevents developer bias; formal gate criteria per task |
| Skip custom analytics dashboard MVP | ✅ LOCKED | Use Meta's native tools first; deferred to phase 2 |
| React 18 + Vite + TailwindCSS | ✅ LOCKED | Fast dev, reusable for template generator |
| Vercel Free tier (no custom domain MVP) | ✅ LOCKED | Zero ops, auto-deploy, free; domain after MVP validation |
| Python script for pixel (vs MCP only) | ✅ LOCKED | Idempotent, reusable for agent generator phase 4 |
| Meta Pixel v21.0 API version | ✅ LOCKED | Current as of 2026-08, document in script |
| Content single-source JSON | ✅ LOCKED | Easier to template, agent will consume this |
| Dual trainer buttons (no routing backend) | ✅ LOCKED | wa.me links route to trainer WhatsApp directly |

---

## Blockers

### Blocking MVP Launch

| Item | Status | Impact | Resolution | ETA |
|------|--------|--------|-----------|-----|
| Client photos (hero + trainers + 6 transformations) | ⏳ PENDING | Can't build UI without images | Wagner → Ask Renata + Leandro on WhatsApp | 2026-08-07 |
| Trainer WhatsApp numbers | ⏳ PENDING | CTAs need numbers | Same request | 2026-08-07 |
| Pricing/offer confirmation | ⏳ PENDING | Footer + promo copy needed | Same request | 2026-08-08 |
| Meta Pixel creation | ⏳ IN PROGRESS | Task 0 will create | Script ready, credentials loaded | 2026-08-05 (today) |

### Not Blocking

| Item | Status | Workaround |
|------|--------|-----------|
| Domain name (lrfitmethod.com.br) | DEFERRED | Use Vercel auto domain until validated |
| Instagram handle confirmation | DEFERRED | Placeholder in content.json with STATUS: PENDENTE |

---

## Infrastructure Status

| Component | Status | Notes |
|-----------|--------|-------|
| Meta Business API credentials | ✅ READY | Tokens in .env, verified |
| Vercel account | ✅ READY | Account created, ready to link GitHub |
| GitHub repo | ⏳ PENDING | Will create in Task 1 |
| Meta MCP (global) | ✅ CONNECTED | Connected yesterday, confirmed |
| Meta MCP (local) | ✅ CONFIGURED | Created in `.claude/mcp/meta-business-mcp/`, ready to test |
| Vercel MCP (local) | ✅ CONFIGURED | Created in `.claude/mcp/vercel-mcp/`, ready to test |
| .specs/ structure | ✅ READY | PROJECT.md, ROADMAP.md, STATE.md created |

---

## Lessons Learned

- **MCPs help:** Local MCP configuration saves 10+ minutes of manual Meta Pixel setup
- **Content-driven:** Keeping all copy in JSON makes templating 100x easier later
- **Single Pixel:** One pixel per brand (not per trainer) is cleaner than multi-pixel

---

## TODOs

- [ ] **Immediate (Today 2026-08-05)**
  - [ ] Complete Task 0 (Meta Pixel setup with Python script)
  - [ ] Complete Task 1 (React + Vercel scaffold)
  - [ ] Create GitHub repo `lrfitmethod-landing`

- [ ] **This Week (2026-08-05 → 2026-08-09)**
  - [ ] Get client photos from Renata + Leandro
  - [ ] Get WhatsApp numbers + pricing
  - [ ] Complete Design System (Task 2)
  - [ ] Complete 8 component tasks (3-10)

- [ ] **Next Week (2026-08-12 → 2026-08-16)**
  - [ ] Meta Pixel integration (Task 13-14)
  - [ ] Performance optimization (Task 17)
  - [ ] Launch testing
  - [ ] Document Setup Guide

---

## Deferred Ideas

- **Phase 2:** Custom analytics dashboard (after MVP validation)
- **Phase 3:** WhatsApp integration (advanced, not just wa.me)
- **Phase 4:** Template generator agent (JSON → deployed landing)
- **Future:** CRM integration, payment system, booking calendar

---

## Preferences

- Model: Haiku 4.5 (fast for lightweight tasks)
- Task execution: Atomic commits per task
- Validation: Checklist per task, gate criteria enforced
- Reports: Brief status updates, no verbose narration

---

## Context References

**Full project docs:**
- `docs/spec/SDD-LR-FIT-COMPLETE.md` — Complete requirements
- `docs/spec/FEATURE-LANDING-DESIGN.md` — Component architecture
- `docs/spec/FEATURE-LANDING-TASKS.md` — Task breakdown reference
- `docs/spec/CONTENT-SCHEMA.md` — Content structure

**Generated (this session):**
- `.specs/project/PROJECT.md` — Vision & goals
- `.specs/project/ROADMAP.md` — Features & milestones
- `.specs/project/STATE.md` — This file
- `.specs/features/landing/tasks.md` — Formal atomic tasks (NEXT)

---

**Ready for EXECUTE phase ✅**
