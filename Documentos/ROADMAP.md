# LR Fit Method - ROADMAP.md

**Phase:** MVP → Product Template  
**Horizon:** 6 months  

---

## Milestone 1: MVP - Landing + Tracking (Week 1-4)

### 1.1 Core Feature: LR Fit Landing Page
**Status:** SPECIFY  
**Complexity:** Large (8 sections, conditional rendering, Pixel tracking)  
**Owner:** Wagner  
**Dependencies:** Design System, Meta Pixel ID, Fotos cliente  
**Deliverable:** React app + Vercel deploy  

**Acceptance Criteria:**
- [ ] 8 sections render corretamente (Hero → Footer)
- [ ] URL params (trainer=renata | trainer=leandro) mudam hero + botão
- [ ] Meta Pixel PageView + Lead events disparam
- [ ] Responsivo (mobile 375px - desktop 1920px)
- [ ] Performance > 75 Lighthouse
- [ ] <2s load time Vercel

**Subtasks:**
1. Design System doc + Figma colors (opcional)
2. React project setup + Vercel deploy
3. Hero section + conditional rendering
4. 3 Pilares section
5. Quem Somos cards (Renata + Leandro)
6. Resultados section (grid antes/depois)
7. Metodologia 4-steps
8. CTAs inteligentes (WhatsApp routing)
9. Meta Pixel integration
10. SEO base + OG tags

---

### 1.2 Analytics - Meta Ads Manager (Processo Manual)
**Status:** ✅ LOCKED - Opção A escolhida  
**Complexity:** N/A (sem desenvolvimento)  
**Owner:** Wagner  
**Dependencies:** Landing live + Meta Pixel data collecting  
**Deliverable:** Ritual de acompanhamento manual (ver FEATURE-DASHBOARD-SPEC.md)  

**Decisão:** Dashboard custom (React + Postgres) foi descartado pro MVP. Usa Meta Ads Manager + Events Manager nativos. Ver `FEATURE-DASHBOARD-SPEC.md` pro ritual diário/semanal.

**Gatilho pra revisitar Dashboard Custom (fase 2):**
- MVP validou (CPL < R$15, 50+ leads/30 dias)
- Casal virou cliente recorrente
- Decisão de transformar em produto pra vender a outras consultorias

---

### 1.3 Supporting: Design System Doc
**Status:** SPECIFY  
**Complexity:** Small (documentation)  
**Owner:** Wagner  
**Dependencies:** Folheto LR Fit  
**Deliverable:** Markdown doc + Tailwind config  

**Acceptance Criteria:**
- [ ] Paleta de cores (hex codes)
- [ ] Tipografia (Montserrat, Inter)
- [ ] Componentes reutilizáveis (Button, Card, Hero)
- [ ] Spacing/Padding guidelines
- [ ] Exemplos de uso
- [ ] Pronto pra agente depois

---

### 1.4 Supporting: Setup Guide
**Status:** SPECIFY  
**Complexity:** Medium (how-to doc)  
**Owner:** Wagner  
**Deliverable:** Markdown guide  

**Acceptance Criteria:**
- [ ] Como criar Meta Pixel novo
- [ ] Como conectar Vercel domain
- [ ] Como configurar Meta Ads campaigns (2 variants)
- [ ] Como ler dashboard
- [ ] Troubleshooting comuns
- [ ] Links e referências

---

## Milestone 2: Validate & Optimize (Week 5-6)

### 2.1 Launch & Monitor
**Scope:** Test campaigns, collect data, optimize  
**Success:** 1000+ impressions, 50+ leads, < R$15/lead  

**Subtasks:**
1. Create Meta Ads campaign (2 variants: trainer=renata | trainer=leandro)
2. Start test budget (R$1-2/dia)
3. Monitor Pixel events daily
4. Document learnings
5. Adjust copy/visuals based on performance
6. Scale to R$5-10/dia if good

### 2.2 Playbook Documentation
**Scope:** Document "como replicar para outra consultoria"  
**Deliverable:** `PLAYBOOK.md` + PRD reutilizável  

**Subtasks:**
1. Extract template layers (generic vs custom)
2. Create JSON schema (brand, colors, trainers, etc)
3. Write "how to adapt landing" guide
4. Document cost model
5. List technical dependencies

---

## Milestone 3: Product Validation (Week 7-8)

### 3.1 Feedback Loop
**Scope:** Coletar feedback do casal, refinar  

**Subtasks:**
1. Casal valida landing + landing page feedback
2. Testar edge cases (mobile, slow connection)
3. Refine copy baseado em leads
4. Update analytics dashboard

### 3.2 Documentação Final
**Scope:** Lock PRD, specs finais  

---

## Milestone 4: Product - Agente Gerador (Week 9+)

### 4.1 Planning: Agente Gerador de Landing
**Status:** DEFERRED (depois do MVP rodar)  
**Scope:** CLI/API que gera landing por JSON  

**Input:**
```json
{
  "brand_name": "LR Fit Method",
  "primary_color": "#D4AF37",
  "trainers": [
    { "name": "Renata", "phone": "11987...", "bio": "..." },
    { "name": "Leandro", "phone": "11987...", "bio": "..." }
  ],
  "results": [
    { "before": "url", "after": "url", "story": "..." }
  ],
  "offer": "R$X/mês",
  "niche": "fitness",
  "landing_type": "consultoria"
}
```

**Output:** Vercel repo + deployed landing

**Acceptance Criteria:**
- [ ] Generate landing em <1 minuto
- [ ] Deploy automático
- [ ] Pixel pré-configurado
- [ ] Design System aplicado
- [ ] 95% reutilização de código

---

## Feature Dependencies & Order

```
PROJECT SETUP (Day 1)
├─ Meta Pixel ID ✓
├─ GitHub repo ✓
├─ Fotos transformação cliente ✓
└─ Preço/oferta definido ⏳

DESIGN SYSTEM (Day 2-3)
├─ Paleta + tipografia
├─ Componentes base
└─ Tailwind config

LANDING PAGE (Day 4-10)
├─ Hero (depends: foto casal, design system)
├─ 3 Pilares (depends: copy)
├─ Quem Somos (depends: foto + bio)
├─ Resultados (depends: fotos cliente)
├─ Metodologia (depends: copy)
└─ CTAs (depends: Meta Pixel ID)

ANALYTICS DASHBOARD (Day 11-14)
├─ Supabase setup (depends: Pixel live)
├─ Queries (depends: data flowing)
└─ Charts (depends: queries)

TESTING & LAUNCH (Day 15-21)
├─ QA (depends: landing live)
├─ Meta Ads setup (depends: Pixel)
├─ Test campaigns (depends: landing)
└─ Monitoring (depends: dashboard)

DOCUMENTATION (Day 22+)
├─ Setup guide (depends: QA pass)
├─ Playbook (depends: data + learnings)
└─ PRD produto (depends: playbook)
```

---

## What's NOT in This Roadmap

- ❌ Checkout / Payment system
- ❌ Agendamento / Calendário
- ❌ Forum / Community
- ❌ Mobile app
- ❌ WhatsApp API avançada (integração sem humano)
- ❌ SEO / Blog strategy
- ❌ CRM integration (só WhatsApp manualmente)

---

## Known Blockers & Decisions Pending

| Item | Status | Owner | ETA |
|------|--------|-------|-----|
| Meta Pixel ID | ⏳ Pending | Wagner | Before Day 1 |
| Fotos transformação cliente | ⏳ Pending | Renata + Leandro | Before Day 4 |
| Preço consultoria (R$X/mês) | ⏳ Pending | Renata + Leandro | Before Day 15 |
| Domain (lrfitmethod.com.br) | ⏳ Deferred | Renata + Leandro | After MVP |
| Budget Meta Ads (confirm R$5-10/dia) | ✅ Locked | Wagner | Day 15 |

---

## Success Definition

**MVP is done when:**
1. Landing live em Vercel (lrfitmethod.vercel.app)
2. Meta Pixel tracking 100+ página views + 10+ leads
3. Dashboard mostrando dados claros
4. 3 dias de teste com R$1-2/dia rodando
5. Setup guide + playbook doc pronto

**Product is done when:**
1. 50+ clientes pagantes via sistema
2. ROI Meta Ads > 3:1
3. Playbook 100% reutilizável
4. 5+ consultoria usando template (pago)
