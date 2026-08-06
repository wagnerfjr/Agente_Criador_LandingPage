# LR Fit Method - PRD Completo
## Consultoria Online + Landing Page + Analytics Dashboard

**Projeto:** MVP Landing Page + Analytics para consultoria fitness  
**Owner:** Wagner (Tech Lead + Marketer)  
**Timeline:** 15-30 dias (4-5 semanas)  
**Objetivo Final:** Template reutilizável pra vender a outras consultoria (produto)

---

## 📖 Documentação Completa

### **1. PROJECT.md** - Visão & Contexto
Leia primeiro. Define:
- O que é o projeto (visão)
- Por quê (business context)
- Scope (o que tá dentro/fora)
- Success metrics
- Technical stack
- Riscos & mitigações
- Timeline high-level

👉 **Quando ler:** Onboarding, antes de qualquer decisão técnica

---

### **2. ROADMAP.md** - Features & Milestones
Define o que vai ser buildado em cada milestone:
- **Milestone 1:** MVP - Landing + Tracking (Week 1-4)
  - Feature: LR Fit Landing Page
  - Feature: Analytics Dashboard
  - Support: Design System + Setup Guide
  
- **Milestone 2:** Validate & Optimize (Week 5-6)
- **Milestone 3:** Product Validation (Week 7-8)
- **Milestone 4:** Agente Gerador (Week 9+) [deferred]

👉 **Quando ler:** Para entender o roadmap, dependências entre features

---

### **3. FEATURE-LANDING-SPEC.md** - Requirements & Acceptance Criteria
Especificação completa do Landing Page:
- 10 Functional Requirements (FR-001 até FR-010)
  - FR-001: Hero Section (trainer-conditional)
  - FR-002: Problema section
  - FR-003: 3 Pilares
  - FR-004: Quem Somos (trainer cards)
  - FR-005: Resultados (before/after grid)
  - FR-006: Metodologia (4-steps)
  - FR-007: CTA Final (dual button)
  - FR-008: Footer
  - FR-009: Meta Pixel Integration
  - FR-010: SEO & OG Tags

- 6 Non-Functional Requirements (NFR)
  - Performance, Responsiveness, Browser Support, Accessibility, Security, Maintainability

- Data models & API contracts
- Acceptance criteria checklist
- Open questions

👉 **Quando ler:** Antes de começar qualquer componente, pra validar requisitos

---

### **4. FEATURE-LANDING-DESIGN.md** - Architecture & Components
Especificação técnica da solução:
- System architecture (diagram)
- Component hierarchy
- Component specifications (Props, State, Interactions)
  - Hero.jsx
  - QuemSomos.jsx + TrainerCard + TrainerCTA
  - Resultados.jsx
  - CTAFinal.jsx
  - (+ Footer, Pilares, Problema, Metodologia)

- Design System integration (colors, typography, spacing)
- Data flow & state management
  - useTrainerParam hook
  - useMetaPixel hook
  - config.js

- Styling strategy (Tailwind CSS)
- Performance optimizations
- Error handling
- Deployment & environment
- Accessibility checklist

👉 **Quando ler:** Ao começar a buildar, guia técnico para implementação

---

### **5. FEATURE-LANDING-TASKS.md** - Atomic Task Breakdown
19 tarefas atômicas (incluindo Task 0 e Task 1.5) com:
- Task ID + Time Estimate
- Dependencies
- What (o que fazer)
- Where (quais arquivos)
- Done When (acceptance criteria)
- Tests (como validar)
- Gate (o que bloqueia próxima tarefa)

👉 **Quando ler:** Ao começar EXECUTE phase, guia passo-a-passo

---

### **6. FEATURE-LANDING-ASSETS.md** - Pipeline de Fotos/Logo
Resolve "de onde vêm as fotos":
- Fluxo Origem (WhatsApp/Drive do casal) → Intake (`assets/raw/`) → Repo (`public/images/`)
- Convenção de nomes exata
- O que o agente faz se faltar asset (não trava, registra pendência)
- Especificação de otimização (tamanho, formato, KB máximo)

👉 **Quando ler:** Antes da Task 1.5, ou quando o casal mandar fotos novas depois

---

### **7. CONTENT-SCHEMA.md** - Fonte Única de Verdade
Resolve "onde ficam cores, textos, bios, logo":
- Schema completo de `content.json` (cores, fontes, textos de cada seção, bios, ofertas)
- Regra: campos `STATUS: PENDENTE` = sinal pro agente perguntar, nunca inventar
- Por que isso vira a base do agente gerador (Milestone 4 do ROADMAP)
- Script de validação que impede deploy com placeholder visível

👉 **Quando ler:** Antes da Task 1.5, e sempre que for editar texto/cor da landing (edita o JSON, não o componente)

---

### **8. AGENT-BUILD-GUIDELINES.md** - Como o Agente Deve se Comportar
- Socratic Question Map: tabela exata de qual pergunta, em qual task, com fallback
- Research Trigger Map: quando o agente pesquisa sozinho (e o que buscar)
- Skills & Tooling Map: qual skill do Claude Code usar em cada task
- Orquestração: quais tasks rodam como sub-agente isolado vs no orquestrador principal

👉 **Quando ler:** Antes de abrir o Claude Code — é o "manual de operação" do agente

---

## 🚀 Quick Start

### **Fase 1: SPECIFY (Hoje)**
✅ Você está aqui
- PRD completo definido
- Requisitos locked
- Arquitetura decided
- Tasks quebradas

### **Fase 2: DESIGN (Already done)**
✅ Feito neste PRD
- Componentes designed
- Data flow defined
- Styling strategy set

### **Fase 3: TASKS (Already done)**
✅ Feito neste PRD
- 18 atomic tasks
- Dependências mapped
- Estimates por task

### **Fase 4: EXECUTE (Próxima)**
⏳ Wagner vai fazer
- Abrir Claude Code
- Seguir FEATURE-LANDING-TASKS.md
- 1 task por vez, commit por task
- Gate check antes de proximar

---

## 📋 Checklist Antes de Começar EXECUTE

**Setup:**
- [ ] Meta Pixel ID confirmado (achar ou criar novo?)
- [ ] GitHub repo criado (`lrfitmethod-landing`)
- [ ] Fotos cliente coletadas (3-6 transformações)
- [ ] WhatsApp números Renata + Leandro confirmados
- [ ] Preço consultoria definido (pra landing)
- [ ] Instagram handles Renata + Leandro

**Ambiente:**
- [ ] Node.js 18+ instalado
- [ ] GitHub account linked
- [ ] Vercel account criado + linked
- [ ] Code editor aberto (VSCode, etc)

**Conhecimento:**
- [ ] Leu PROJECT.md
- [ ] Leu ROADMAP.md
- [ ] Entendeu arquitetura (DESIGN.md)
- [ ] Pronto pra começar Task-001

---

## 🎯 Decision Log

**Decisões Lockadas:**

| Decision | Choice | Why |
|----------|--------|-----|
| Frontend | React + Vercel | Reutilizável, serverless |
| Styling | Tailwind CSS | Rápido, consistente |
| Tracking | Meta Pixel | Integrado com ads |
| WhatsApp | wa.me links | Simples, escalável |
| Analytics | PostgreSQL queries | Baixa latência |
| Git workflow | Feature branches | Clean history |
| Testing | Manual + Lighthouse | MVP scope |

**Questões Abertas (Apontar para cliente):**

- [ ] Meta Pixel ID: já existe ou criar novo?
- [ ] Fotos transformação: quantas tenho pronto?
- [ ] Preço: quanto cobra mensalmente?
- [ ] Domínio: quando vai comprar?

---

## 📞 Communication Points

**Com Client (Renata + Leandro):**
- PRD apresentado? Validado?
- Fotos coletadas?
- Preço definido?
- Instagram handles confirmados?

**Com Meta (Ads Account):**
- Pixel ID anotado?
- Business Account de Wagner usado?
- Primeira campanha pronata?

**Com Vercel:**
- Account criado?
- GitHub linked?
- Domain settings (quando comprar)?

---

## 🔧 Technical Dependencies

**Required:**
- Node.js 18+
- npm ou yarn
- GitHub account
- Vercel account
- Meta Business Account

**Optional (Later):**
- PostgreSQL (Supabase, para analytics)
- Figma (design refinement)
- Google Analytics (vs Meta Pixel)

---

## 📈 Success Criteria

**MVP is done when:**
1. ✅ Landing live em Vercel (lrfitmethod.vercel.app)
2. ✅ Meta Pixel tracking 100+ página views + 10+ leads
3. ✅ Dashboard mostrando dados claros
4. ✅ 3 dias de teste com R$1-2/dia rodando
5. ✅ Setup guide + playbook doc pronto

**Go/No-Go Decision:**
- CPL (Cost Per Lead) < R$15? → Scale to R$5-10/dia
- CPL > R$15? → Iterate copy/targeting
- CTA CTR < 20%? → Redesign section
- Pixel 0 events? → Debug Meta Pixel

---

## 🎓 Learning Outcomes for Wagner

**React:**
- Hooks (useState, useEffect, useContext)
- Component composition
- Props drilling
- Conditional rendering

**Vercel/Deployment:**
- Git → Vercel auto-deploy
- Environment variables
- Custom domains (later)
- Preview deployments

**Meta Ads:**
- Pixel events (PageView, Lead)
- Campaign setup
- A/B testing (trainer variants)
- ROI measurement

**Design System:**
- Utility-first CSS (Tailwind)
- Component reusability
- Theming strategy
- Responsive design

---

## 📂 File Structure (After EXECUTE)

```
lrfitmethod-landing/
│
├─ .github/workflows/
│  └─ deploy.yml (CI/CD)
│
├─ assets/raw/                    (intake de fotos brutas, você joga aqui)
│  ├─ hero-casal.jpg
│  ├─ trainer-renata.jpg
│  ├─ trainer-leandro.jpg
│  ├─ logo-lr-fit.png
│  └─ transformacao-01-antes.jpg (etc)
│
├─ src/
│  ├─ content/
│  │  └─ lrfit.content.json    (FONTE ÚNICA DE VERDADE - cores, textos, bios)
│  │
│  ├─ components/
│  │  ├─ Hero.jsx
│  │  ├─ Problema.jsx
│  │  ├─ Pilares.jsx
│  │  ├─ QuemSomos.jsx
│  │  ├─ TrainerCard.jsx
│  │  ├─ TrainerCTA.jsx
│  │  ├─ Resultados.jsx
│  │  ├─ Metodologia.jsx
│  │  ├─ CTAFinal.jsx
│  │  └─ Footer.jsx
│  │
│  ├─ hooks/
│  │  ├─ useTrainerParam.js
│  │  └─ useMetaPixel.js
│  │
│  ├─ styles/
│  │  ├─ index.css
│  │  └─ animations.css
│  │
│  ├─ config.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ tailwind.config.js
│
├─ public/
│  ├─ index.html
│  ├─ favicon.svg
│  └─ images/                     (output otimizado do pipeline de assets)
│     ├─ hero-casal.jpg / .webp
│     ├─ trainer-renata.jpg / .webp
│     ├─ trainer-leandro.jpg / .webp
│     └─ transformacao-*.jpg / .webp
│
├─ scripts/
│  ├─ get_or_create_pixel.py     (Task 0 - roda antes de tudo)
│  ├─ process-assets.js          (Task 1.5 - otimiza assets/raw → public/images)
│  └─ validate-content.js        (Task 1.5 - impede deploy com placeholder visível)
│
├─ .env.local
├─ .gitignore
├─ package.json
├─ vite.config.js
├─ vercel.json
├─ README.md
│
└─ .specs/  (THIS DOCUMENTATION)
   ├─ PROJECT.md
   ├─ ROADMAP.md
   ├─ FEATURE-LANDING-SPEC.md
   ├─ FEATURE-LANDING-DESIGN.md
   ├─ FEATURE-LANDING-TASKS.md
   ├─ FEATURE-LANDING-ASSETS.md
   ├─ CONTENT-SCHEMA.md
   ├─ AGENT-BUILD-GUIDELINES.md
   ├─ FEATURE-DASHBOARD-SPEC.md
   └─ README.md (you are here)
```

---

## 🆘 Help & References

**React Learning:**
- [React Docs](https://react.dev) - Official docs
- [Hooks Guide](https://react.dev/reference/react/hooks) - useState, useEffect, etc

**Tailwind CSS:**
- [Tailwind Docs](https://tailwindcss.com/docs) - Official docs
- [Tailwind UI](https://tailwindui.com) - Components

**Meta Pixel:**
- [Meta Pixel Guide](https://developers.facebook.com/docs/meta-pixel) - Official
- [Pixel Events](https://developers.facebook.com/docs/meta-pixel/reference) - Event types

**Vercel:**
- [Vercel Docs](https://vercel.com/docs) - Deployment guide
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs) - Best practices

**Design System:**
- [Ant Design System](https://ant.design/docs/spec/introduce) - Example
- [Material Design](https://material.io/design) - Guidelines

---

## 📝 Notes & Deferred Ideas

**MVP Only:**
- ✅ Landing page
- ✅ Meta Pixel tracking
- ✅ Trainer routing
- ✅ Design system doc
- ✅ Setup guide

**Later (Phase 2):**
- Analytics dashboard
- Agente gerador
- Payment integration
- Booking system
- CRM integration
- Email sequences

---

## 🎬 Next Steps

1. **Review** this entire README + all 5 docs
2. **Confirm** checklist items (Meta Pixel, fotos, etc)
3. **Criar** GitHub repo: `lrfitmethod-landing`
4. **Open** Claude Code
5. **Follow** FEATURE-LANDING-TASKS.md Task-001
6. **Commit** atomically per task
7. **Verify** each gate before moving forward

---

**Ready to build?** Let's go. 🚀

---

**Last Updated:** July 30, 2026  
**Status:** SPECIFY phase complete ✅  
**Next:** EXECUTE phase (Wagner + Claude Code)
