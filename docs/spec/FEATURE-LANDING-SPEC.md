# Feature: LR Fit Method Landing Page
## SPEC.md - Requirements & Acceptance Criteria

**Feature ID:** FEATURE-LR-001  
**Complexity:** Large  
**Owner:** Wagner  
**Timeline:** Week 1-4  
**Status:** SPECIFY  

---

## 1. Feature Overview

Criar landing page React com 8 seções que:
- Captura leads via WhatsApp routing inteligente
- Roda fotos/trainers condicionais baseado em URL params
- Integra Meta Pixel pra tracking
- Deploy automático Vercel
- Reutilizável como template (depois pra agente)

**Core Mechanism:** 
```
Link: lrfitmethod.vercel.app?trainer=renata
→ URL param detectado em React
→ Hero + "Quem Somos" seção mostra Renata destacada
→ Botão WhatsApp aponta pra +55 11 9876-5432 (Renata)
→ Meta Pixel track evento "Lead"
```

---

## 2. Functional Requirements (FRs)

### FR-001: Hero Section (Trainer-Conditional)
**ID:** FR-001  
**Priority:** CRITICAL  
**Acceptance Criteria:**
- [ ] Exibe foto do casal (default) OU trainer específico (se ?trainer=name)
- [ ] Headline: "O Corpo que Você Deseja, A Vida Que Você Merece" (sempre)
- [ ] Subheadline breve (2-3 linhas)
- [ ] CTA "Começar Agora" → **faz scroll até `#quem-somos`** (decisão travada, ver AGENT-BUILD-GUIDELINES.md seção 2: tráfego vem do Instagram sem prova social prévia, então CTA do Hero mostra prova social antes de ir pro WhatsApp; o CTA final sim vai direto)
- [ ] Responsivo: logo reduz 40% em mobile

**Variações:**
```
/                          → Foto casal grande
/?trainer=renata           → Destaca Renata (55% viewport)
/?trainer=leandro          → Destaca Leandro (55% viewport)
/?trainer=invalid          → Fallback pra casal (safe)
```

---

### FR-002: Problema/Emoção Section
**ID:** FR-002  
**Priority:** HIGH  
**Acceptance Criteria:**
- [ ] Headline provocador: "Você tá cansado de plano genérico?"
- [ ] Subtext explicando diferencial (Consistência > Perfeição)
- [ ] Foto before/after de transformação (1 exemplo)
- [ ] Texto curto (máx 100 palavras)
- [ ] CTA discreto: "Entender a Metodologia" (scroll down)

---

### FR-003: 3 Pilares (Grid)
**ID:** FR-003  
**Priority:** HIGH  
**Acceptance Criteria:**
- [ ] 3 cards lado a lado (desktop) / stack (mobile)
- [ ] Ícones gold (#D4AF37)
- [ ] Titles: "Treine com Foco" | "Alimente-se com Inteligência" | "Viva com Liberdade"
- [ ] Cada card tem descrição curta (15 palavras max)
- [ ] Hover effect (subtle, gold border)
- [ ] Tagline base: "DISCIPLINA NA ROTINA. LIBERDADE NA VIDA."

---

### FR-004: Quem Somos (2 Trainer Cards)
**ID:** FR-004  
**Priority:** CRITICAL  
**Acceptance Criteria:**
- [ ] 2 cards (desktop: lado a lado, mobile: stack)
- [ ] Cada card: foto + nome + credencial (1 linha) + bio curta (3 linhas)
- [ ] Botão individual "Fale com [Nome]" dentro do card
- [ ] Se URL ?trainer=renata → Renata card destacada (gold border, slight shadow increase)
- [ ] Se URL ?trainer=leandro → Leandro card destacado
- [ ] Se nenhum param → ambos normal, sem destaque
- [ ] Foto circular (border-radius 50%)

**Card Structure:**
```
┌─────────────────────┐
│   [FOTO CIRCULAR]   │
│     50x50px         │
├─────────────────────┤
│  NOME               │
│  Credencial curta   │
│  "Pós-grad etc"     │
│                     │
│  Bio: 3 linhas max  │
│  Lorem ipsum...     │
│                     │
│ [Fale com NOME] ← CTA
└─────────────────────┘
```

---

### FR-005: Resultados (Transformações)
**ID:** FR-005  
**Priority:** HIGH  
**Acceptance Criteria:**
- [ ] Grid 3 colunas (desktop) / 1 coluna (mobile)
- [ ] Cada célula: antes/depois lado a lado, texto transformação abaixo
- [ ] Antes/depois com label pequeno ("Antes" / "Depois")
- [ ] Texto: "[Nome] - [Resultado em 1 linha]" (ex: "Carlos - Perdeu 8kg em 12 semanas")
- [ ] Min 3 transformações, max 6 (visual weight)
- [ ] Lazy load imagens (performance)

---

### FR-006: Metodologia (4-Steps)
**ID:** FR-006  
**Priority:** MEDIUM  
**Acceptance Criteria:**
- [ ] 4 cards horizontal (desktop) / 2x2 grid (tablet) / stack (mobile)
- [ ] Ícone + número + título + descrição
- [ ] Steps: Plano Personalizado → Acompanhamento → Ajustes → Resultados
- [ ] Setas conectando steps (desktop só)
- [ ] Cada step tem descrição 2 linhas max

---

### FR-007: CTA Final (Dual Button)
**ID:** FR-007  
**Priority:** CRITICAL  
**Acceptance Criteria:**
- [ ] 2 botões lado a lado (desktop) / stack (mobile)
- [ ] Botão 1: "Fale com Renata" → wa.me/5511987654321?text=Oi,%20vim%20da%20LR%20Fit
- [ ] Botão 2: "Fale com Leandro" → wa.me/5511987654322?text=Oi,%20vim%20da%20LR%20Fit
- [ ] Destacado com gold background + white text
- [ ] Se URL ?trainer=renata → botão Renata highlighted (maior, green checkmark)
- [ ] Se URL ?trainer=leandro → botão Leandro highlighted
- [ ] Sticky footer option (bonus): CTA segue usuário ao scroll

---

### FR-008: Footer
**ID:** FR-008  
**Priority:** LOW  
**Acceptance Criteria:**
- [ ] Logo LR Fit Method (small)
- [ ] Links Instagram (ambos trainers)
- [ ] Disclaimer: "Resultados variam por pessoa. Consulte um médico."
- [ ] Copyright footer
- [ ] Dark background (match hero)

---

### FR-009: Meta Pixel Integration
**ID:** FR-009  
**Priority:** CRITICAL  
**Acceptance Criteria:**
- [ ] Pixel script no `<head>` (library integração)
- [ ] PageView event auto-fire ao load
- [ ] Lead event dispara ao clique "Fale com [Nome]"
- [ ] Event params: `{ trainer: "renata" | "leandro", timestamp, referrer }`
- [ ] Sem quebra se Pixel ID não configurado (graceful fail)

---

### FR-010: SEO & OG Tags
**ID:** FR-010  
**Priority:** MEDIUM  
**Acceptance Criteria:**
- [ ] Title: "LR Fit Method | Consultoria Online de Treino e Dieta"
- [ ] Meta description: "Transforme seu corpo com consistência. Plano personalizado, acompanhamento semanal e liberdade de viver."
- [ ] OG image: Foto do casal (og:image)
- [ ] OG title/description (same as meta)
- [ ] Canonical URL (prevent dupes)

---

## 3. Non-Functional Requirements (NFRs)

### NFR-001: Performance
- [ ] Lighthouse score > 75 (mobile + desktop)
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3s

### NFR-002: Responsiveness
- [ ] Mobile (375px) - 100% usável
- [ ] Tablet (768px) - adaptive grid
- [ ] Desktop (1024px+) - full layout
- [ ] Touch targets > 44px (mobile)

### NFR-003: Browser Support
- [ ] Chrome 90+
- [ ] Safari 14+
- [ ] Firefox 88+
- [ ] Edge 90+
- [ ] Mobile Safari iOS 14+

### NFR-004: Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Color contrast > 4.5:1 (text)
- [ ] Alt text em todas imagens
- [ ] Keyboard navigation (tab order)
- [ ] Focus visible

### NFR-005: Security
- [ ] HTTPS only (Vercel default)
- [ ] No sensitive data in localStorage
- [ ] Meta Pixel script trusted source
- [ ] CSP headers (no inline scripts)

### NFR-006: Maintainability
- [ ] Componentes reutilizáveis (Card, Button, Hero)
- [ ] Design tokens centralizados (colors, spacing)
- [ ] Sem hardcoded strings (use constants)
- [ ] Comentários em lógica complexa
- [ ] TypeScript (optional but recommended)

---

## 4. Data Model & API Contracts

### Input: URL Parameters
```javascript
// Valid params:
?trainer=renata      // Hero + CTA destacam Renata
?trainer=leandro     // Hero + CTA destacam Leandro
?utm_source=instagram_renata
?utm_campaign=lr-fit-v1
```

### Input: Configuration (env vars)
```javascript
VITE_META_PIXEL_ID=SEU_PIXEL_ID_AQUI  # NUNCA reutilizar o Pixel do Achadinhos - criar um Pixel NOVO e separado pro LR Fit
VITE_RENATA_PHONE=5511987654321
VITE_LEANDRO_PHONE=5511987654322
VITE_RENATA_BIO="Coach fitness. Pós-grad em nutrição."
VITE_LEANDRO_BIO="Personal trainer especialista em funcional."
```

### Output: Meta Pixel Events
```javascript
fbq('track', 'PageView');
fbq('track', 'Lead', {
  content_name: "LR Fit Method CTA Click",
  content_type: "service",
  value: 0, // sem valor (lead só, não venda)
  currency: "BRL"
});
```

---

## 5. Acceptance Criteria - Full Checklist

### Funcional
- [ ] FR-001: Hero section renderiza corretamente com trainer params
- [ ] FR-002: Problema section com CTA scroll
- [ ] FR-003: 3 Pilares grid responsive
- [ ] FR-004: Quem Somos cards com foto condicional + CTA WhatsApp
- [ ] FR-005: Resultados grid antes/depois com 3-6 transformações
- [ ] FR-006: Metodologia 4-steps layout
- [ ] FR-007: CTA Final dual button com routing correto
- [ ] FR-008: Footer com links + disclaimer
- [ ] FR-009: Meta Pixel PageView + Lead events disparando
- [ ] FR-010: OG tags + SEO base

### Performance
- [ ] Lighthouse > 75
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s

### Responsiveness
- [ ] 375px mobile: 100% usável, sem horizontal scroll
- [ ] 768px tablet: grid adapts
- [ ] 1024px+ desktop: full layout

### Segurança
- [ ] HTTPS only
- [ ] No secrets in code
- [ ] CSP headers

### Acessibilidade
- [ ] WCAG 2.1 AA
- [ ] Alt text todas imagens
- [ ] Keyboard nav

---

## 6. Out of Scope (This Sprint)

- ❌ Checkout / Payment
- ❌ Login / User accounts
- ❌ Comments / Reviews (social proof manual só)
- ❌ Blog / SEO content strategy
- ❌ Integração WhatsApp API (só links wa.me)
- ❌ Analytics dashboard (separate feature)
- ❌ Internationalization (PT-BR só)

---

## 7. Open Questions / Clarifications Needed

> **Nota:** Ver `AGENT-BUILD-GUIDELINES.md` — decisões de negócio (preço, bios, fotos escolhidas) o agente pergunta socraticamente no momento certo do build, não precisam ser resolvidas agora. Decisões técnicas/UX (como o CTA do Hero) o agente resolve sozinho via pesquisa — já resolvido, ver FR-001.

**From Client (Renata + Leandro) — o agente vai perguntar durante o build, não precisa responder agora:**
- [ ] Qual é o preço mensal/pacote? (pergunta socrática na Task-005/011)
- [ ] Bios exatas (credenciais, especialidades)?
- [ ] Quais das fotos de transformação entram na seção Resultados (você já tem várias)?

**Já resolvido:**
- [x] Vocês têm 3-6 fotos de transformação prontas? → Sim, Wagner confirmou
- [x] Qual é o WhatsApp cada um? → Sim, Wagner confirmou
- [x] CTA "Começar Agora" scroll ou direto? → Scroll até #quem-somos (ver FR-001)

**Technical — resolvido:**
- [x] Meta Pixel ID: como vamos obter? → `scripts/get_or_create_pixel.py` (verifica existente ou cria novo, idempotente)
- [ ] GitHub repo: qual é o name/owner? (pra Vercel linkar) — decisão operacional simples, Wagner define ao rodar Task-001
- [ ] Domínio: buy depois? → Confirmado, fica pra depois do MVP (Vercel free domain por enquanto)

---

## 8. Success Criteria (MVP Done)

✅ Landing deploy live em Vercel  
✅ Meta Pixel events: 100+ PageView, 10+ Lead  
✅ URL params funcionando (trainer=renata, trainer=leandro)  
✅ Mobile + desktop 100% responsivo  
✅ Lighthouse > 75  
✅ Todos os 8 sections renderizando  
✅ WhatApp links working (clique → abre app)  

---

**Next:** → DESIGN.md (Architecture + Components)
