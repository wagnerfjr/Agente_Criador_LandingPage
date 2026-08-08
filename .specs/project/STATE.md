# STATE.md — Project Memory

**Last Updated:** 2026-08-08  
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
| Client photos (hero + trainers + 9 transformations) | ✅ RESOLVED (2026-08-06) | — | Curated via `assets/photo-review.html`, processed into `public/images/` | — |
| Trainer WhatsApp numbers | ✅ RESOLVED (2026-08-06) | — | Renata 5511957501183, Leandro 5511988980065 — in `content.json` | — |
| Trainer bios (2-3 linhas cada) | ⏳ PENDING | `QuemSomos` cards show foto+nome only, sem bio (fallback correto per spec) | Wagner → pedir pro Leandro/Renata | — |
| Meta Pixel creation | ✅ RESOLVED | Pixel ID configurado em `.env` (`VITE_META_PIXEL_ID`) | — | — |

### Not Blocking

| Item | Status | Workaround |
|------|--------|-----------|
| Domain name (lrfitmethod.com.br) | DEFERRED | Use Vercel auto domain until validated |
| Pricing/valor dos planos | ✅ DECIDIDO — não mostrar | Cliente não quer valor na página; combinado via WhatsApp por plano (Trimestral/Semestral) |
| Photo optimization (WebP/compression) | DEFERRED | Fotos funcionam mas não estão otimizadas; polish futuro |

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

- [x] Meta Pixel setup, GitHub repo, Vercel deploy
- [x] Landing rebuilt per `docs/spec/` (Hero, Problema, Pilares, QuemSomos, Resultados, Metodologia, CTAFinal, Footer)
- [x] Client photos curated and processed (9 transformações + hero + 2 trainers + 2 logos)
- [x] WhatsApp routing (`?trainer=renata|leandro`), no lead form
- [x] **2026-08-08:** Hero — implementado: eyebrow + destaque de cor + glow radial + badges + 2º botão (Design Backlog resolvido)
- [ ] Pedir bio curta (2-3 linhas) da Renata e do Leandro (campos: trainers.renata.bio, trainers.leandro.bio)
- [ ] Otimizar imagens (WebP/compressão)
- [ ] Meta Ads: campanhas de teste (Task 16-17 originais — performance + QA final)

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
