# Feature: Asset Pipeline
## ASSETS.md - De onde vêm fotos/logo e como entram no projeto

**Status:** SPECIFY  
**Resolve a pergunta:** "Onde ele pega as fotos?"

---

## 1. Problema que isso resolve

Todo o SPEC/DESIGN até agora referenciava `/images/renata.jpg`, `/images/carlos-before.jpg`, etc, **como se já existissem**. Isso é uma lacuna real: ninguém definiu quem sobe o quê, em que formato, com que nome, nem o que o agente faz se a foto não existir ainda quando ele chegar naquela task.

---

## 2. Fluxo de Origem → Repositório

```
ORIGEM (fora do repo)              INTAKE (você/casal)         REPO (processado)
┌──────────────────┐              ┌──────────────────┐        ┌─────────────────────┐
│ WhatsApp/Drive/   │   Wagner     │ assets/raw/       │  Task  │ public/images/       │
│ Instagram do      │ ──copia──►   │ (pasta de intake, │ ──►    │ (otimizado, nome     │
│ casal             │              │  sem otimização)  │ 1.5    │  final, WebP+JPEG)   │
└──────────────────┘              └──────────────────┘        └─────────────────────┘
```

**Você (Wagner) é o único ponto de entrada.** O agente não busca fotos sozinho no Instagram/WhatsApp do casal — ele não tem acesso a essas contas, e não deveria: são fotos de clientes reais, dado sensível de terceiros.

---

## 3. Convenção de Nomes (Intake)

Antes de rodar a Task 1.5, você joga os arquivos brutos em `assets/raw/` com este naming:

```
assets/raw/
├─ hero-casal.jpg              (foto do casal juntos, usada na home sem ?trainer)
├─ trainer-renata.jpg          (foto individual da Renata)
├─ trainer-leandro.jpg         (foto individual do Leandro)
├─ logo-lr-fit.png             (logo do folheto, fundo transparente se possível)
│
├─ transformacao-01-antes.jpg
├─ transformacao-01-depois.jpg
├─ transformacao-02-antes.jpg
├─ transformacao-02-depois.jpg
├─ transformacao-03-antes.jpg
├─ transformacao-03-depois.jpg
└─ ... (até transformacao-06, se tiver)
```

**Regra:** número sequencial (`01`, `02`...) na ordem que você quer que apareçam na seção Resultados. Sem número = o agente pergunta a ordem (ver Task 1.5 abaixo).

---

## 4. O Que o Agente Faz na Task 1.5

1. Lê `assets/raw/`
2. Para cada arquivo esperado (ver lista acima): confere se existe
3. Se existir: otimiza (resize, comprime, gera WebP + fallback JPEG), move pra `public/images/` com nome final
4. Se **não existir**: **não trava o build**. Usa um placeholder visual (cinza com ícone, ou o holder padrão do design system) e registra no `STATE.md` (ver seção 6 abaixo) como pendência
5. Ao final, gera um relatório: "X de Y assets encontrados, faltando: [lista]"

---

## 5. Especificação Técnica de Otimização

| Asset | Tamanho Alvo | Formato | Max KB |
|---|---|---|---|
| hero-casal / trainer-* | 1200x1200px (crop centralizado) | WebP + JPEG fallback | 200KB |
| logo | Original (SVG se possível, senão PNG transparente) | PNG/SVG | 50KB |
| transformação (antes/depois) | 600x800px | WebP + JPEG fallback | 150KB |

**Ferramenta:** `sharp` (Node.js) ou script Python com `Pillow` — o agente escolhe conforme o stack (já é React/Vite, então `sharp` via script Node é mais natural, mas ele decide sozinho, é decisão técnica, não de negócio — ver AGENT-BUILD-GUIDELINES.md).

---

## 6. Pendências Ficam Documentadas, Não Perdidas

Se faltar asset, o agente escreve em `.specs/project/STATE.md` (padrão do TLC spec-driven, seção "Blockers"):

```markdown
## Blockers
- [ ] Faltam fotos: trainer-leandro.jpg, transformacao-04-*.jpg
      Placeholder ativo em produção. Wagner precisa subir em assets/raw/
      e rodar novamente: npm run process-assets
```

Isso garante que a lacuna não vira "esquecemos e ninguém percebeu" — fica registrado e rastreável.

---

## 7. Reprocessamento

Se você adicionar fotos depois (ex: casal manda mais 2 transformações na semana 3), não precisa reabrir todo o Claude Code — só rodar:

```bash
npm run process-assets
```

Esse script (criado na Task 1.5) reprocessa `assets/raw/` → `public/images/` de novo, sem duplicar trabalho já feito (idempotente, mesmo princípio do script de Pixel).
