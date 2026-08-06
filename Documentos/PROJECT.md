# LR Fit Method - Landing Page + Dashboard
## PROJECT.md

**Status:** SPECIFY Phase  
**Owner:** Wagner (Tech Lead + Marketer)  
**Timeline:** 15-30 days (MVP test → Product template)  
**Complexity:** Large (multi-component, new domain for React)

---

## 1. Vision

Criar um **motor reutilizável** de landing page + analytics dashboard para consultoria fitness que:
- Captura leads via WhatsApp com routing inteligente (trainer específico)
- Mede ROI de campanhas Meta Ads (R$5-10/dia test)
- Serve como template base pra vender a outras consultoria depois

**Por enquanto:** MVP pra LR Fit Method (Renata + Leandro)  
**Depois:** Agente gerador que cria landing dinamicamente por JSON

---

## 2. Business Context

### 2.1 O Cliente (LR Fit Method)
- **Modelo:** Consultoria online (treino + dieta + suplementação)
- **Trainers:** Renata + Leandro (casal, academia em Osasco/SP)
- **Nicho:** Pessoas comuns que querem corpo bonito + estilo de vida saudável (não atletas)
- **Diferencial:** "Consistência > Perfeição" + "Disciplina na rotina, liberdade na vida"
- **Status:** Já têm clientes reais + fotos de transformação prontas

### 2.2 Objetivo de Negócio
- Lotar o WhatsApp deles de leads qualificados via Instagram + Meta Ads
- Testar ad spend (R$5-10/dia) e medir ROI por trainer
- Depois replicar esse sistema pra outras consultoria (pagar consultoria premium)

### 2.3 Seu Papel
- Construir o "motor" (landing + tracking + dashboard)
- Ensinar Meta Ads + Vercel deployment pro casal
- Documentar playbook pra reutilizar

---

## 3. Scope - O Que É (e Não É)

### ✅ Incluso:
- **Landing Page React** - 8 seções (Hero, Problema, 3 Pilares, Quem Somos, Resultados, Metodologia, CTAs, Footer)
- **Foto Condicional** - URL params (trainer=renata | trainer=leandro) mudam hero + botão
- **Meta Pixel Integration** - Track Page View + Lead (clique WhatsApp)
- **Design System** - Cores, tipografia, componentes reutilizáveis (gold/dark theme do folheto)
- **Dashboard Analytics** - Leads/dia, custo/lead, trainer split, conversion rate
- **Setup Guide** - Como criar Pixel, campanhas Meta Ads, deploy Vercel
- **Documentation** - PRD reutilizável pra produto final

### ❌ Não Incluso (MVP):
- Pagamento (integração Stripe/PagSeguro)
- Sistema de agendamento/checkout
- Automação WhatsApp avançada (só link simples)
- SEO/Blog (puro ads-driven)
- Mobile app

---

## 4. Success Metrics

### 4.1 Curto Prazo (30 dias)
- [ ] Landing deploy em Vercel (0 downtime)
- [ ] Meta Pixel captando eventos (Page View 100%, Lead 1000+)
- [ ] Custo por lead < R$15 (target)
- [ ] Leads chegando WhatsApp correto (98%+ accuracy)
- [ ] CTR "Fale com [Trainer]" > 30%

### 4.2 Médio Prazo (90 dias)
- [ ] 50+ clientes pagantes via sistema
- [ ] ROI Meta Ads > 3:1
- [ ] Dashboard mostrando dados claros pro casal
- [ ] Playbook documentado pra replicar

### 4.3 Longo Prazo (6+ meses)
- [ ] Template escalável pra 5+ consultoria
- [ ] Agente gerador de landing automatizado
- [ ] Markup 40% vendendo pra outras consultoria

---

## 5. Technical Context

### 5.1 Stack Escolhida
- **Frontend:** React 18 + Vercel (deploy automático)
- **Styling:** TailwindCSS + Design System doc
- **Tracking:** Meta Pixel (lead capture)
- **Analytics:** PostgreSQL + Supabase (queries simples agora, BI depois)
- **Hosting:** Vercel Free tier (sem custo, sem domínio próprio ainda)
- **Idioma:** Português (Brasil)

### 5.2 Integrations
- **Meta Business Suite** - Pixel tracking + Ad campaigns
- **WhatsApp API** - Link simples (wa.me)
- **GitHub** - Version control + Vercel auto-deploy
- **Instagram** - Organic promotion (posts + stories)

### 5.3 Design Language
Baseado no folheto LR Fit Method:
- **Primary:** #D4AF37 (Gold) - Headlines, CTA
- **Dark:** #0A0E27 (Navy/Preto) - Fondo, texto
- **Light:** #FFFFFF - Clarity
- **Font:** Montserrat (headlines) + Inter (body)

---

## 6. Constraints & Assumptions

### Constraints
- **Budget:** R$5-10/dia apenas pra testar (não scaling agressivo agora)
- **Timeline:** 15-30 dias pra MVP funcionar
- **Knowledge:** Wagner nunca fez React, precisa aprender
- **Dependência:** Meta Pixel ID precisa estar criado (status: pending)
- **Fotos:** Transformações cliente precisa vir deles (não tem yet)

### Assumptions
- [ ] Eles vão decidir preço antes do launch (placeholder OK agora)
- [ ] Instagram deles vai linkar pra landing (organic traffic source)
- [ ] Meta Business Account de Wagner funciona pra criar campanhas
- [ ] PostgreSQL Contabo disponível pra analytics (opcional MVP)

---

## 7. Key Decisions (Locked)

| Decision | Choice | Why |
|----------|--------|-----|
| Frontend | React + Vercel | Reusável, scalável, zero ops |
| Hosting | Vercel Free | Grátis, automático, domínio depois |
| Tracking | Meta Pixel | Integrado com Ad spend, simples setup |
| WhatsApp Routing | URL params + smart button | Escalável, sem APIs complexas |
| Analytics | PostgreSQL queries + dashboard simples | Baixa latência, reutilizável |
| Design | Componentização TailwindCSS | Template pra agente depois |

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Pixel dados 0% conversão | Campaign flop | Setup guide + teste manual link |
| Leads não chegam WhatsApp correto | 50% wasted ad spend | Validação de URL params antes de ads |
| Design não segue brand | Rejeição cliente | Design system review com casal |
| React novo pra Wagner | Delays na implementação | PRD super claro + componentes simples |
| Meta Ads mal configurado | Budget queimado | Treinamento + first 2 days supervised |

---

## 9. Timeline (High-Level)

```
Week 1 (Specify + Design)
├─ PRD detalhado (spec + design + tasks) ✓ AGORA
├─ Design System documento
├─ Confirmação fotos cliente
└─ Setup Meta Pixel

Week 2-3 (Implement)
├─ Landing React completa + teste local
├─ Meta Pixel integrado
├─ Dashboard básico
└─ Deploy Vercel

Week 4 (Validate + Launch)
├─ Testes funcionais (URL params, links WhatsApp)
├─ Meta Ads configurado + test campaigns (R$1-2/dia)
├─ Treinamento casal
└─ Launch (R$5-10/dia full)

Week 5-6 (Monitor + Iterate)
├─ Coletar dados (leads, custo, conversão)
├─ Ajustes copy/design baseado em feedback
└─ Documentar playbook reutilizável
```

---

## 10. Next Steps

1. **Confirmar** Meta Pixel ID (já tem ou cria novo?)
2. **Coletar** fotos transformação cliente
3. **Decidir** preço/estrutura consultoria
4. **Comitar** no GitHubpara tracking
5. → **Entrar em ROADMAP.md**
