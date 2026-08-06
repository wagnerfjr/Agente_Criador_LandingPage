# STATE.md — Project Memory

**Last Updated:** 2026-08-06  
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
- [ ] **Próxima sessão:** Hero — corrigir crop da foto + reduzir monotonia (ver "Design Backlog" acima)
- [ ] Pedir bio curta (2-3 linhas) da Renata e do Leandro
- [ ] Otimizar imagens (WebP/compressão)
- [ ] Meta Ads: campanhas de teste (Task 16-17 originais — performance + QA final)

---

## Design Backlog — Hero Section (feedback 2026-08-06)

**Status:** Aprovado o diagnóstico, plano definido — execução adiada pra outra sessão (Wagner pediu pra não implementar ainda).

**Contexto:** Print do Hero em produção mostrou 2 problemas:

### Problema 1 — Foto cortada errado

`foto_casal.jpg` é vertical (720×1280, 9:16). O CSS atual (`aspect-[4/5] md:aspect-square` + `object-cover`) força um crop quadrado no desktop, sobrando espaço vazio de academia ao redor do casal em vez de focar neles.

**Alternativas (escolher ao executar):**
1. **Recortar a foto de origem manualmente** antes de reprocessar — foco fechado no casal, sem depender de crop automático via CSS. Mais trabalho manual, melhor resultado.
2. **Trocar a proporção do frame** de quadrado pra vertical também no desktop (`aspect-[3/4]` ou `aspect-[4/5]` sem breakpoint pra square) — respeita a orientação natural da foto.
3. **`object-contain` num card com fundo** (gradiente/moldura dourada preenchendo o espaço sobrando) — mostra a foto inteira, sem cortar nada, mas ela fica visualmente menor.

**Recomendação:** 1 + 2 combinados (resolve a causa raiz, não só mascara com CSS).

### Problema 2 — Seção monótona, pouco texto, não chama atenção

Hoje: headline + subheadline + 1 parágrafo curto + 1 botão, fundo navy chapado. Faltam camadas visuais.

**Alternativas (escolher quantas fizerem sentido, não é all-or-nothing):**
- Selo/eyebrow acima do título (ex: "CONSULTORIA ONLINE", caps, dourado, pequeno) — dá hierarquia antes do H1
- Tira de credibilidade abaixo do botão — badges curtos sem número inventado (ex: "Treino + Nutrição", "Acompanhamento Personalizado", "100% Online")
- Segundo botão (outline/ghost) ao lado do CTA principal — ex: "Ver Resultados" rolando pra `#resultados`
- Fundo com profundidade — glow radial sutil atrás da foto ou gradiente diagonal, em vez de navy chapado
- Destacar uma palavra do H1 em outro tom de cor pra dar tensão visual (ex: "Deseja")

**Quando retomar:** ler esta seção, escolher as opções, implementar em `src/sections/Hero.jsx` + possivelmente reprocessar `public/images/hero-casal.jpg`.

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
