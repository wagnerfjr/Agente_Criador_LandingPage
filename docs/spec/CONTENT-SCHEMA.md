# Content Schema
## CONTENT-SCHEMA.md - Fonte Única de Verdade (cores, textos, bios, logo)

**Status:** SPECIFY  
**Resolve a pergunta:** "Onde ele guarda as definições de cores, textos, logos?"

---

## 1. Problema que isso resolve

No DESIGN.md original, cores/fontes viviam em `tailwind.config.js`, bios de trainer viviam em `constants.js`, e texto de copy vivia espalhado direto dentro de cada componente (`Hero.jsx`, `Pilares.jsx`, etc). Isso tem 2 problemas sérios:

1. **Pra mudar um texto, você precisa mexer em código React** — não é sustentável pro casal pedir ajuste sem passar por você/Claude Code de novo
2. **Não é reutilizável.** O ROADMAP (Milestone 4) já prevê um "agente gerador" que recebe um JSON e cospe uma landing pronta — mas se o texto está espalhado em 8 componentes, não tem JSON nenhum pra alimentar esse agente futuro

**Solução:** Um único arquivo `content.json` é a fonte de verdade. Componentes React **leem** dele, nunca têm texto hardcoded.

---

## 2. Onde Vive

```
lrfitmethod-landing/
└─ src/
   └─ content/
      └─ lrfit.content.json   ← FONTE ÚNICA DE VERDADE
```

Componentes importam isso, nunca escrevem string direto:

```javascript
// ❌ ERRADO (hardcoded, como no DESIGN.md original)
<h1>O Corpo que Você Deseja</h1>

// ✅ CORRETO
import content from '../content/lrfit.content.json';
<h1>{content.hero.headline}</h1>
```

---

## 3. Schema Completo

```json
{
  "brand": {
    "name": "LR Fit Method",
    "tagline": "Disciplina na rotina. Liberdade na vida.",
    "logo": "/images/logo-lr-fit.png",
    "colors": {
      "primary": "#D4AF37",
      "dark": "#0A0E27",
      "light": "#FFFFFF",
      "accent": "#FF69B4"
    },
    "fonts": {
      "primary": "Montserrat",
      "secondary": "Inter"
    }
  },

  "hero": {
    "headline": "O Corpo que Você Deseja",
    "subheadline": "A Vida que Você Merece",
    "body": "Na LR Fit Method, acreditamos que resultados reais vêm da consistência, não da perfeição.",
    "ctaText": "Começar Agora",
    "ctaAction": "scroll:quem-somos",
    "photoDefault": "/images/hero-casal.jpg"
  },

  "problema": {
    "headline": "Você tá cansado de plano genérico?",
    "body": "Treine com disciplina durante a semana, siga seu planejamento inteligente e aproveite os melhores momentos da vida no final de semana, sem culpa.",
    "ctaText": "Entender a Metodologia",
    "ctaAction": "scroll:metodologia"
  },

  "pilares": [
    { "icon": "💪", "title": "Treine com Foco", "description": "Planejamento inteligente baseado em seus objetivos e rotina." },
    { "icon": "🍽️", "title": "Alimente-se com Inteligência", "description": "Nutrição estratégica que funciona com seu estilo de vida." },
    { "icon": "🎉", "title": "Viva com Liberdade", "description": "Aproveite os momentos da vida sem culpa ou restrições extremas." }
  ],

  "trainers": {
    "renata": {
      "name": "Renata",
      "credential": "STATUS: PENDENTE - ver Socratic Question Map, Task 005",
      "bio": "STATUS: PENDENTE",
      "phone": "STATUS: PENDENTE - Wagner confirmou que tem, precisa preencher aqui",
      "instagram": "STATUS: PENDENTE",
      "photo": "/images/trainer-renata.jpg"
    },
    "leandro": {
      "name": "Leandro",
      "credential": "STATUS: PENDENTE",
      "bio": "STATUS: PENDENTE",
      "phone": "STATUS: PENDENTE",
      "instagram": "STATUS: PENDENTE",
      "photo": "/images/trainer-leandro.jpg"
    }
  },

  "transformacoes": [
    {
      "id": "transformacao-01",
      "clientName": "STATUS: PENDENTE - perguntar autorização de uso do nome",
      "result": "STATUS: PENDENTE - texto curto do resultado",
      "beforePhoto": "/images/transformacao-01-antes.jpg",
      "afterPhoto": "/images/transformacao-01-depois.jpg"
    }
  ],

  "metodologia": [
    { "number": "1", "icon": "📋", "title": "Plano Personalizado", "description": "Análise completa e plano 100% customizado para você." },
    { "number": "2", "icon": "📊", "title": "Acompanhamento Semanal", "description": "Suporte contínuo com check-ins e ajustes semanais." },
    { "number": "3", "icon": "⚙️", "title": "Ajustes Individualizados", "description": "Adaptamos sempre que necessário, sem riscos." },
    { "number": "4", "icon": "✅", "title": "Resultados Reais", "description": "Transformação durável baseada em consistência." }
  ],

  "oferta": {
    "modelo": "STATUS: PENDENTE - mensal ou pacote? ver Socratic Question Map",
    "valor": "STATUS: PENDENTE",
    "textoExibicao": "[VALOR]"
  },

  "footer": {
    "disclaimer": "Resultados variam por pessoa. Consulte um médico antes de iniciar qualquer programa de treino ou dieta."
  },

  "seo": {
    "title": "LR Fit Method | Consultoria Online de Treino e Dieta",
    "description": "Transforme seu corpo com consistência. Plano personalizado, acompanhamento semanal e liberdade de viver.",
    "ogImage": "/images/hero-casal.jpg"
  }
}
```

---

## 4. Regra de Ouro

**Qualquer campo marcado `"STATUS: PENDENTE"` é um sinal explícito pro agente: aqui é onde ele PARA e faz a pergunta socrática certa** (ver `AGENT-BUILD-GUIDELINES.md` → Socratic Question Map). O agente nunca inventa um valor pra esses campos — nem preço, nem nome de cliente, nem bio.

Campos SEM esse marcador (cores, ícones, textos de metodologia) já estão decididos neste PRD — o agente usa como está, não pergunta de novo.

---

## 5. Por Que Isso Importa pro Milestone 4 (Agente Gerador)

Esse `content.json` **é literalmente o rascunho do schema de input** que o ROADMAP.md já promete no Milestone 4 (agente gerador de landing). Construir isso agora, do jeito certo, significa que depois — quando você quiser vender esse sistema pra outra consultoria — o trabalho já é 80% feito: é só trocar os valores do JSON, não reescrever componente nenhum.

---

## 6. Validação Automática (Opcional, mas Recomendado)

Task 1.5 pode incluir um pequeno script `validate-content.js` que roda antes do build e falha (com mensagem clara) se algum campo `"STATUS: PENDENTE"` ainda estiver presente na hora do deploy final:

```javascript
// scripts/validate-content.js
import content from '../src/content/lrfit.content.json' assert { type: 'json' };

function findPending(obj, path = '') {
  const pending = [];
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === 'string' && value.startsWith('STATUS: PENDENTE')) {
      pending.push(currentPath);
    } else if (typeof value === 'object' && value !== null) {
      pending.push(...findPending(value, currentPath));
    }
  }
  return pending;
}

const pending = findPending(content);
if (pending.length > 0) {
  console.error('❌ Campos pendentes antes do deploy final:');
  pending.forEach(p => console.error(`   - ${p}`));
  process.exit(1);
}
console.log('✅ Content.json completo, pronto pra deploy.');
```

Isso é o "trava de qualidade": impede deploy em produção com placeholder ainda visível pro cliente final (ex: `[VALOR]` aparecendo pro visitante real da landing).
