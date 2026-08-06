# Feature: Analytics Dashboard
## SPEC.md - Requirements & Acceptance Criteria

**Feature ID:** FEATURE-LR-002  
**Complexity:** Medium  
**Owner:** Wagner  
**Timeline:** Week 3-4 (depois da Landing estar coletando dados)  
**Status:** SPECIFY  

> **Nota de escopo:** Este documento estava faltando na primeira versão do PRD — o ROADMAP.md prometia essa feature mas ela não tinha spec própria. Corrigido aqui.

---

## 1. Feature Overview

Dashboard simples que responde 4 perguntas pro casal (Renata + Leandro):
1. Quantos leads chegaram por dia?
2. Quanto custou cada lead (R$)?
3. Qual trainer converteu mais (Renata vs Leandro)?
4. Quantos cliques viraram conversa no WhatsApp?

**Importante:** Este NÃO é um dashboard de BI complexo. É um painel de leitura rápida, MVP mesmo — pense em "3-4 números grandes + 1 gráfico", não Tableau.

---

## 2. Functional Requirements

### FR-D01: Leads por Dia (Line Chart)
- [ ] Gráfico de linha, últimos 30 dias
- [ ] Eixo X: data, Eixo Y: número de eventos "Lead"
- [ ] Fonte de dado: Meta Pixel events armazenados

### FR-D02: Custo por Lead (Metric Card)
- [ ] Número grande: R$ gasto ÷ leads gerados
- [ ] Comparação com dia anterior (↑↓ %)
- [ ] Fonte: Meta Ads Manager (spend) + Pixel (leads)

### FR-D03: Split por Trainer
- [ ] Gráfico de pizza ou barras: Renata % vs Leandro %
- [ ] Baseado no parâmetro `trainer` enviado no evento Lead

### FR-D04: Taxa de Conversão
- [ ] PageView → Lead (%)
- [ ] Por trainer separadamente

### FR-D05: Acesso Seguro
- [ ] Login simples (senha compartilhada ou Supabase Auth)
- [ ] Sem necessidade de conta Google/Meta pro casal acessar

---

## 3. Fonte de Dados - Decisão em Aberto

**Esta é a maior questão não resolvida do PRD original.** Existem 2 caminhos, e preciso que você escolha antes de especificar o resto:

### Opção A: Meta Ads Manager + Events Manager (SEM CÓDIGO)
- Você usa os relatórios nativos do Meta (Ads Manager já mostra custo/lead, Events Manager mostra eventos)
- **Prós:** Zero desenvolvimento, já existe, sempre atualizado
- **Contras:** Não fica "bonito" pra mostrar ao cliente, precisa acesso à sua conta Meta

### Opção B: Pipeline Custom (Pixel → Webhook → PostgreSQL → Dashboard React)
- Captura eventos via webhook, salva no Postgres (Supabase), você builda um dashboard React
- **Prós:** Visual customizado, você controla 100%, vira parte do produto/template
- **Contras:** +15-20h de desenvolvimento, mais um componente pra manter, requer Conversions API (não só Pixel client-side)

**Minha recomendação honesta para o MVP:** Opção A agora (usa o que já existe), Opção B só se isso virar produto de verdade pra vender depois. Fazer B agora seria over-engineering pro momento "aprendendo Meta Ads" que você descreveu.

---

## 4. Acceptance Criteria (assumindo Opção A - MVP)

- [ ] Wagner sabe onde no Meta Ads Manager ver: leads/dia, custo/lead, split de campanha
- [ ] Documentado um "ritual" de check diário (print de tela ou export CSV)
- [ ] Casal recebe resumo semanal (WhatsApp ou print) com os 4 números
- [ ] Nenhum código novo necessário

## 4B. Acceptance Criteria (se Opção B - Dashboard Custom)

- [ ] Webhook recebe eventos do Meta Conversions API
- [ ] Dados salvos em tabela Postgres (Supabase)
- [ ] Dashboard React lê e mostra os 4 FRs acima
- [ ] Login simples protege o acesso
- [ ] Atualiza no máximo a cada 1h (não precisa real-time)

---

## 5. Decisão Lockada ✅

**Escolhido: Opção A — Meta Ads Manager + Events Manager nativo (sem código).**

Justificativa: MVP de teste (15-30 dias, R$5-10/dia) não justifica pipeline custom. Reavaliar Opção B só se o produto validar e vocês decidirem escalar pra vender template a outras consultorias.

### O que isso significa na prática:
- **Nenhuma task de desenvolvimento nesta feature** (não entra no FEATURE-LANDING-TASKS.md)
- Wagner acompanha direto no Meta Ads Manager + Events Manager (mesma tela do print que você já mandou)
- Ritual sugerido: check diário (2 min) + resumo semanal pro casal

### Ritual de Acompanhamento (Setup)

**Diário (Wagner, 2 min):**
1. Meta Ads Manager → campanha "LR Fit Method" → ver "Custo por resultado" (= custo por lead)
2. Events Manager → Pixel LR Fit → conferir se eventos Lead estão chegando com o parâmetro `trainer` correto

**Semanal (Wagner → Casal, resumo simples):**
```
📊 Resumo da Semana - LR Fit Method

Leads totais: X
Custo por lead: R$ X
Renata: X leads (X%)
Leandro: X leads (X%)
Investido total: R$ X
```
Envia por WhatsApp ou print de tela mesmo — sem necessidade de dashboard visual agora.

### Gatilho pra reconsiderar Opção B (Dashboard Custom)
- [ ] MVP validou (CPL < R$15, 50+ leads em 30 dias)
- [ ] Casal decidiu virar cliente pagante recorrente
- [ ] Você decidiu transformar isso em produto pra vender a outras consultorias

---

**Status:** ✅ Fechado. Sem tasks técnicas associadas nesta fase — feature "Dashboard" removida do escopo de desenvolvimento do MVP e substituída por processo manual.
