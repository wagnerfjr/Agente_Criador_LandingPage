# Feature: LR Fit Method Landing Page
## TASKS.md - Atomic Task Breakdown

**Phase:** TASKS  
**Complexity:** Large (18 atomic tasks)  
**Estimated Duration:** 35-45 hours  
**Dependencies:** DESIGN.md (architecture locked)

**Execution Strategy:**
- Sequential (Task 1-4, then 5-10 parallel-able, then 11-18)
- Each task: <4 hours
- Git commit per task (atomic)
- Verification checklist per task

---

## Task Dependency Graph

```
0. Meta Pixel Bootstrap (pré-requisito, roda ANTES de tudo)
   └─ scripts/get_or_create_pixel.py

1. Project Setup
   ├─ Git repo + Vercel
   └─ Vite + React scaffold

1.5. Content & Assets Bootstrap
   ├─ src/content/lrfit.content.json (fonte única de verdade)
   ├─ assets/raw/ → public/images/ (pipeline de otimização)
   └─ Perguntas socráticas iniciais (ver Socratic Question Map)

2. Design System
   └─ Tailwind config + constants

3-4. Hooks & Config
   ├─ useTrainerParam hook
   ├─ useMetaPixel hook
   └─ config.js (trainers data)

5-11. Components (mostly parallel)
   ├─ Hero.jsx
   ├─ Problema.jsx
   ├─ Pilares.jsx
   ├─ QuemSomos.jsx (includes CTA button)
   ├─ Resultados.jsx
   ├─ Metodologia.jsx
   ├─ CTAFinal.jsx
   └─ Footer.jsx

12. Layout Assembly
    └─ App.jsx + routing

13-14. Meta Pixel Integration
    └─ Pixel script + event tracking

15-16. SEO & OG Tags
    └─ index.html + meta tags

17. Performance Optimization
    └─ Images, code splitting, Lighthouse tuning

18. Testing & QA
    └─ Manual validation + accessibility
```

---

## Task Breakdown

### **Task 0: Meta Pixel Bootstrap** [SEQUENTIAL, RUNS FIRST]
**ID:** TASK-000  
**Time Estimate:** 0.5h  
**Depends On:** None (roda antes de tudo, nem precisa do repo React existir)  
**Blocks:** TASK-002 (Design System usa o Pixel ID no .env), TASK-004 (useMetaPixel)  

**What:**
Criar o script `scripts/get_or_create_pixel.py` na raiz do projeto e executá-lo para obter (ou criar) o Meta Pixel ID do LR Fit Method. Este script é idempotente — pode ser rodado de novo sem duplicar Pixel.

**Where:**
```
lrfitmethod-landing/
└─ scripts/
   └─ get_or_create_pixel.py
```

**Conteúdo exato do arquivo (copiar sem alterar a lógica):**

```python
"""
get_or_create_pixel.py

Verifica se já existe um Meta Pixel com determinado nome no seu Business Manager.
Se existir, retorna o ID existente (evita duplicar Pixels por engano).
Se não existir, cria um novo Pixel com esse nome e retorna o ID recém-criado.

Por que isso é "mais profissional":
- Evita criar Pixels duplicados toda vez que você roda o script (idempotente)
- Você pode chamar isso de um pipeline maior (ex: "gerador de landing")
  e ele sempre garante que o Pixel certo existe, sem duplicar
- Serve de base pro "agente gerador de landing" do Milestone 4 do ROADMAP

-----------------------------------------------------------------------------
PRÉ-REQUISITOS (fazer uma vez, manualmente):
-----------------------------------------------------------------------------
1. Achar seu Business ID:
   Meta Business Suite > Configurações > Informações da empresa > ID da empresa

2. Gerar um Access Token com permissão 'ads_management':
   - Rápido (expira em 1-2h, bom pra testar): Graph API Explorer
     https://developers.facebook.com/tools/explorer/
   - Permanente (recomendado pra automação real): criar um "System User"
     em Business Settings > Users > System Users, gerar token lá
     (não expira enquanto você mantiver o token válido)

3. Nunca commitar o token no Git. Use variável de ambiente ou .env (git-ignored).

-----------------------------------------------------------------------------
USO:
-----------------------------------------------------------------------------
    export META_ACCESS_TOKEN="seu_token_aqui"
    export META_BUSINESS_ID="seu_business_id_aqui"

    python get_or_create_pixel.py "LR Fit Method"

Ou importando como função:

    from get_or_create_pixel import get_or_create_pixel
    pixel_id = get_or_create_pixel("LR Fit Method")

-----------------------------------------------------------------------------
NOTA IMPORTANTE:
-----------------------------------------------------------------------------
Verifiquei a versão da API em julho/2026 (v20.0-v21.0 confirmadas em uso).
A Meta atualiza versões do Graph API com frequência - se este script der erro
de "unsupported version", confira a versão atual em:
https://developers.facebook.com/docs/graph-api/changelog
e atualize a constante GRAPH_API_VERSION abaixo.
"""

import os
import sys
import requests

GRAPH_API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{GRAPH_API_VERSION}"


def get_or_create_pixel(pixel_name: str) -> str:
    """
    Verifica se existe um Pixel com `pixel_name` no Business Manager.
    Se existir, retorna o ID existente. Se não, cria um novo e retorna o ID.

    Args:
        pixel_name: Nome do Pixel (ex: "LR Fit Method")

    Returns:
        str: O ID do Pixel (existente ou recém-criado)

    Raises:
        ValueError: Se as variáveis de ambiente não estiverem configuradas
        requests.HTTPError: Se a API do Meta retornar erro
    """
    access_token = os.environ.get("META_ACCESS_TOKEN")
    business_id = os.environ.get("META_BUSINESS_ID")

    if not access_token or not business_id:
        raise ValueError(
            "Configure as variáveis de ambiente META_ACCESS_TOKEN e "
            "META_BUSINESS_ID antes de rodar este script."
        )

    existing_id = _find_existing_pixel(pixel_name, business_id, access_token)
    if existing_id:
        print(f"✅ Pixel '{pixel_name}' já existe. ID: {existing_id}")
        return existing_id

    new_id = _create_pixel(pixel_name, business_id, access_token)
    print(f"🆕 Pixel '{pixel_name}' criado com sucesso. ID: {new_id}")
    return new_id


def _find_existing_pixel(pixel_name: str, business_id: str, access_token: str) -> str | None:
    """Lista todos os Pixels do Business Manager e procura por nome exato."""
    url = f"{BASE_URL}/{business_id}/adspixels"
    params = {
        "fields": "id,name",
        "access_token": access_token,
        "limit": 100,  # ajuste se você tiver mais de 100 pixels
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    for pixel in data.get("data", []):
        if pixel.get("name", "").strip().lower() == pixel_name.strip().lower():
            return pixel["id"]

    # NOTA: se você tiver >100 pixels, precisaria paginar usando data["paging"]["next"]
    # Pouco provável pro seu caso de uso atual (poucos pixels por conta).
    return None


def _create_pixel(pixel_name: str, business_id: str, access_token: str) -> str:
    """Cria um novo Pixel com o nome dado, associado ao Business Manager."""
    url = f"{BASE_URL}/{business_id}/adspixels"
    payload = {
        "name": pixel_name,
        "access_token": access_token,
    }

    response = requests.post(url, data=payload)
    response.raise_for_status()
    data = response.json()

    return data["id"]


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python get_or_create_pixel.py \"Nome do Pixel\"")
        sys.exit(1)

    pixel_name_arg = sys.argv[1]

    try:
        pixel_id = get_or_create_pixel(pixel_name_arg)
        print(f"\nVITE_META_PIXEL_ID={pixel_id}")
        print("(copie essa linha pro seu .env.local)")
    except (ValueError, requests.HTTPError) as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)
```

**Execução:**
```bash
pip install requests
export META_ACCESS_TOKEN="seu_token"
export META_BUSINESS_ID="seu_business_id"
python scripts/get_or_create_pixel.py "LR Fit Method"
# → copiar o VITE_META_PIXEL_ID impresso pro .env.local (criado na Task 1)
```

**Done When:**
- [ ] Script criado em `scripts/get_or_create_pixel.py`
- [ ] Rodou sem erro e imprimiu um Pixel ID (novo ou existente)
- [ ] Pixel ID confirmado manualmente no Meta Events Manager (é o "LR Fit Method", não o "campanha_achadinhos")
- [ ] Pixel ID anotado pra usar no `.env.local`

**Tests:**
```bash
# Rodar 2 vezes seguidas - a segunda vez deve retornar
# "✅ Pixel já existe" com o MESMO ID, não criar um segundo
python scripts/get_or_create_pixel.py "LR Fit Method"
python scripts/get_or_create_pixel.py "LR Fit Method"
```

**Gate:** Pixel ID confirmado no Events Manager + idempotência testada (rodar 2x = mesmo ID)

---

### **Task 1: Project Setup & Git** [SEQUENTIAL]
**ID:** TASK-001  
**Time Estimate:** 1.5h  
**Depends On:** None  
**Blocks:** All other tasks  

**What:**
- Create GitHub repo: `lrfitmethod-landing`
- Initialize Vite + React 18 project
- Connect Vercel (auto-deploy from main)
- Setup .env, .gitignore

**Where:**
```
lrfitmethod-landing/
├─ .github/workflows/
├─ .env.local
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ public/
│  └─ index.html
└─ README.md
```

**Done When:**
- [ ] `npm run dev` works locally
- [ ] Vercel auto-deploys from GitHub
- [ ] URL https://lrfitmethod.vercel.app accessible
- [ ] Deploy shows Vite + React hello world

**Tests:**
```bash
npm run dev
# → http://localhost:5173 loads
npm run build
# → dist/ folder generated
```

**Gate:** Deploy success on Vercel

---

### **Task 1.5: Content & Assets Bootstrap** [SEQUENTIAL]
**ID:** TASK-001B  
**Time Estimate:** 2.5h  
**Depends On:** TASK-001  
**Blocks:** TASK-002 (Design System lê cores daqui), TASK-005 a TASK-012 (todos os componentes leem texto daqui)  

**What:**
- Ver `ASSETS.md` e `CONTENT-SCHEMA.md` (documentos completos no PRD)
- Criar `src/content/lrfit.content.json` com o schema completo (copiar de CONTENT-SCHEMA.md seção 3)
- Criar pasta `assets/raw/` pra intake de fotos
- Rodar pipeline de otimização (`scripts/process-assets.js` ou `.py`) que lê `assets/raw/` e popula `public/images/`
- **Fazer as perguntas socráticas da tabela em `AGENT-BUILD-GUIDELINES.md` seção 4**, uma de cada vez, e preencher o `content.json` com as respostas (campos ainda sem resposta ficam `"STATUS: PENDENTE"`)
- Criar `scripts/validate-content.js` (opcional mas recomendado, ver CONTENT-SCHEMA.md seção 6)

**Where:**
```
lrfitmethod-landing/
├─ assets/raw/                        (você joga as fotos brutas aqui)
├─ src/content/lrfit.content.json     (fonte única de verdade)
├─ public/images/                     (output otimizado)
└─ scripts/
   ├─ process-assets.js               (ou .py, decisão técnica do agente)
   └─ validate-content.js
```

**Done When:**
- [ ] `content.json` existe com o schema completo (mesmo que campos estejam `PENDENTE`)
- [ ] `assets/raw/` existe com naming convention documentado
- [ ] Pipeline de otimização roda sem erro em pelo menos 1 asset de teste
- [ ] Perguntas socráticas da seção 4 do AGENT-BUILD-GUIDELINES foram feitas (não necessariamente todas respondidas ainda)
- [ ] Assets faltantes registrados em `.specs/project/STATE.md` como blocker (não perdidos)

**Tests:**
```bash
# Colocar 1 foto de teste em assets/raw/
node scripts/process-assets.js
# → deve aparecer versão otimizada em public/images/

node scripts/validate-content.js
# → deve listar os campos ainda PENDENTE (esperado nesta fase)
```

**Gate:** `content.json` criado e importável, pipeline de asset roda, pendências registradas em STATE.md

---

### **Task 2: Design System & Tailwind Config** [SEQUENTIAL]
**ID:** TASK-002  
**Time Estimate:** 2h  
**Depends On:** TASK-001B (lê `brand.colors` e `brand.fonts` de `content.json`, não hardcoda de novo)  
**Blocks:** All component tasks  

**What:**
- Configure Tailwind CSS in vite.config.js
- **Importar cores de `content.json` → `brand.colors`** (não duplicar valores hex direto no tailwind.config.js — uma mudança de cor deve bastar mudar em 1 lugar só)
- Add custom animations (pulse-gold, scale, etc)
- Create styles/ folder for global CSS

**Where:**
```
src/
├─ content/
│  └─ lrfit.content.json (JÁ CRIADO na Task 1.5 - só é lido aqui, não recriado)
├─ config.js (environment vars: telefones vêm de .env, texto vem do content.json)
├─ styles/
│  ├─ index.css (Tailwind @import + @layer custom)
│  └─ animations.css (custom animations)
├─ tailwind.config.js
└─ App.jsx
```

**Nota:** `constants.js`/`TRAINERS` hardcoded (como numa versão anterior deste PRD) foi **removido**. Bios, nomes, credenciais e fotos de trainer agora vivem exclusivamente em `content.json` (Task 1.5) — ver `CONTENT-SCHEMA.md`. Isso evita ter a mesma informação duplicada em 2 arquivos que podem divergir.

**File: config.js** (só o que realmente precisa ser variável de ambiente — segredos/telefones, não texto)
```javascript
// Telefones ficam em .env por serem dados que podem mudar sem precisar
// de novo deploy de conteúdo, e por não quererem ir pro Git em texto puro
// caso o repo vire público um dia.
export const CONFIG = {
  pixelId: import.meta.env.VITE_META_PIXEL_ID,
  phones: {
    renata: import.meta.env.VITE_RENATA_PHONE,
    leandro: import.meta.env.VITE_LEANDRO_PHONE,
  },
};

// Todo o resto (bio, credencial, foto, textos) vem de:
import content from './content/lrfit.content.json';
// Ex: content.trainers.renata.bio
```

**File: tailwind.config.js**

> **Nota:** O código abaixo mostra os valores finais só pra ilustrar. Na implementação real, o agente deve importar de `src/content/lrfit.content.json` (`brand.colors`, `brand.fonts`) em vez de digitar os hex de novo — evita ter a mesma cor definida em 2 lugares que podem divergir com o tempo.

```javascript
export default {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',
        dark: '#0A0E27',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

**File: styles/index.css**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@400;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .pulse-gold {
    animation: pulse;
    color: #D4AF37;
  }
  
  .btn-primary {
    @apply bg-primary text-dark font-bold py-3 px-6 rounded-lg
           hover:shadow-lg transition-all duration-200 hover:scale-105
           font-montserrat;
  }
}
```

**Done When:**
- [ ] Tailwind builds without errors
- [ ] Custom colors available in components (bg-primary, text-dark)
- [ ] Fonts loaded (check DevTools → Fonts)
- [ ] Tailwind purging works (unused styles removed)

**Tests:**
```bash
npm run build
# → dist/index.css has Tailwind styles
# → No errors in console
```

**Gate:** Tailwind compiles, colors work in temp component

---

### **Task 3: useTrainerParam Hook** [CAN RUN PARALLEL AFTER 1]
**ID:** TASK-003  
**Time Estimate:** 1h  
**Depends On:** TASK-001  
**Blocks:** Hero, QuemSomos, CTAFinal components  

**What:**
- Create hooks/ folder
- Implement useTrainerParam.js
- Detects URL ?trainer=renata | ?trainer=leandro
- Returns trainer state or null
- Validation (safe, no invalid values)

**File: src/hooks/useTrainerParam.js**
```javascript
import { useEffect, useState } from 'react';

export function useTrainerParam() {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trainerParam = params.get('trainer');
    
    // Safe validation
    if (['renata', 'leandro'].includes(trainerParam)) {
      setTrainer(trainerParam);
    } else {
      setTrainer(null);
    }
  }, []);

  return trainer;
}
```

**Done When:**
- [ ] Hook returns 'renata' for ?trainer=renata
- [ ] Hook returns 'leandro' for ?trainer=leandro
- [ ] Hook returns null for no param or invalid param
- [ ] No console errors or warnings

**Tests:**
```javascript
// Manual test in React component
const trainer = useTrainerParam();
console.log(trainer); // renata, leandro, or null
```

**Gate:** Manual testing in browser with different URLs

---

### **Task 4: useMetaPixel Hook & Config** [CAN RUN PARALLEL AFTER 1]
**ID:** TASK-004  
**Time Estimate:** 1.5h  
**Depends On:** TASK-001  
**Blocks:** CTAFinal, integration testing  

**What:**
- Create hooks/useMetaPixel.js
- Load Meta Pixel script from CDN
- Track PageView event on load
- Export trackLead function
- Graceful fail if Pixel ID missing

**File: src/hooks/useMetaPixel.js**
```javascript
import { useEffect } from 'react';

export function useMetaPixel(pixelId) {
  useEffect(() => {
    if (!pixelId) return;

    // Load Meta Pixel script
    window.fbq = window.fbq || function() {
      window.fbq.queue = window.fbq.queue || [];
      window.fbq.queue.push(arguments);
    };
    window.fbq.push = window.fbq.queue.push;

    // Load pixel script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    // Initialize
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }, [pixelId]);

  const trackLead = (trainer) => {
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'LR Fit Method',
        trainer: trainer || 'unknown',
        timestamp: new Date().toISOString(),
      });
    }
  };

  return { trackLead };
}
```

**Done When:**
- [ ] Pixel script loads without errors (check Network tab)
- [ ] PageView event fires (check Meta Pixel → Real-Time)
- [ ] trackLead function callable
- [ ] No errors if Pixel ID is missing

**Tests:**
```javascript
// Check Meta Events Manager
// Filter: pixel events
// Look for PageView event
```

**Gate:** Manual Pixel verification in Meta Business Suite

---

### **Task 5: Hero Component** [PARALLEL, AFTER 2-3]
**ID:** TASK-005  
**Time Estimate:** 2h  
**Depends On:** TASK-002, TASK-003  
**Blocks:** App assembly  

**What:**
- Create components/Hero.jsx
- Trainer-conditional rendering (default, renata, leandro photos)
- Headline + subheadline
- CTA "Começar Agora" button
- Responsive: mobile stack → desktop grid
- Images lazy-loaded

**File: src/components/Hero.jsx**
```javascript
import content from '../content/lrfit.content.json';

export function Hero({ trainer }) {
  // Trainer-specific photo (fallback pro casal se trainer inválido/ausente)
  const photoSrc = trainer ? content.trainers[trainer].photo : content.hero.photoDefault;
  const isHighlighted = trainer ? true : false;

  const handleCtaClick = () => {
    // content.hero.ctaAction = "scroll:quem-somos" (ver CONTENT-SCHEMA.md + decisão FR-001)
    const [action, target] = content.hero.ctaAction.split(':');
    if (action === 'scroll') {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-dark text-light min-h-screen flex items-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-primary mb-4">
              {content.hero.headline}
            </h1>
            <h2 className="font-montserrat text-2xl md:text-3xl text-light mb-8">
              {content.hero.subheadline}
            </h2>
            <p className="text-base md:text-lg text-light/80 mb-8 leading-relaxed">
              {content.hero.body}
            </p>
            <button className="btn-primary w-fit" onClick={handleCtaClick}>
              {content.hero.ctaText}
            </button>
          </div>

          {/* Photo */}
          <div className={`order-1 md:order-2 ${isHighlighted ? 'border-4 border-primary rounded-lg p-2' : ''}`}>
            <img 
              src={photoSrc}
              alt={trainer ? content.trainers[trainer].name : content.brand.name}
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Done When:**
- [ ] Renders without errors
- [ ] Photo changes based on ?trainer param
- [ ] Responsive on 375px, 768px, 1024px
- [ ] Text readable (contrast > 4.5:1)
- [ ] CTA button visible and clickable

**Tests:**
```bash
# Test URLs
http://localhost:5173/
http://localhost:5173/?trainer=renata
http://localhost:5173/?trainer=leandro
# Test responsive: DevTools 375px width
```

**Gate:** Visual regression (compare default vs renata vs leandro)

---

### **Task 6: Problema Component** [PARALLEL, AFTER 2]
**ID:** TASK-006  
**Time Estimate:** 1h  
**Depends On:** TASK-002  
**Blocks:** App assembly  

**What:**
- Create components/Problema.jsx
- Headline: "Você tá cansado de plano genérico?"
- Before/after image (1 example)
- Copy text (max 100 words)
- Responsive layout

**File: src/components/Problema.jsx**
```javascript
export function Problema() {
  return (
    <section className="bg-light py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-dark mb-8">
          Você tá cansado de plano genérico?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <img src="/images/transformation-1-before.jpg" alt="Antes" className="w-full rounded-lg" />
            <p className="text-center text-sm text-gray-600 mt-2">Antes</p>
          </div>
          <div>
            <img src="/images/transformation-1-after.jpg" alt="Depois" className="w-full rounded-lg" />
            <p className="text-center text-sm text-gray-600 mt-2">Depois</p>
          </div>
        </div>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
          Na LR Fit Method, acreditamos que resultados reais vêm da consistência, não da perfeição. 
          Você treina com disciplina durante a semana, segue seu planejamento inteligente e aproveita 
          os melhores momentos da vida no final de semana, sem culpa.
        </p>

        <a href="#metodologia" className="btn-primary">
          Entender a Metodologia
        </a>
      </div>
    </section>
  );
}
```

**Done When:**
- [ ] Renders without errors
- [ ] Images load and are responsive
- [ ] Text is readable
- [ ] CTA link scroll works

**Tests:**
```bash
# Visual check: responsive on mobile
# Click CTA: should scroll to next section
```

**Gate:** Responsive visual check

---

### **Task 7: Pilares (3-Grid) Component** [PARALLEL, AFTER 2]
**ID:** TASK-007  
**Time Estimate:** 1.5h  
**Depends On:** TASK-002  
**Blocks:** App assembly  

**What:**
- Create components/Pilares.jsx
- 3 cards: Treine com Foco | Alimente-se | Viva com Liberdade
- Gold icons, hover effects
- Responsive: 3-col desktop → stack mobile

**File: src/components/Pilares.jsx**
```javascript
export function Pilares() {
  const pilares = [
    {
      icon: '💪',
      title: 'Treine com Foco',
      description: 'Planejamento inteligente baseado em seus objetivos e rotina.',
    },
    {
      icon: '🍽️',
      title: 'Alimente-se com Inteligência',
      description: 'Nutrição estratégica que funciona com seu estilo de vida.',
    },
    {
      icon: '🎉',
      title: 'Viva com Liberdade',
      description: 'Aproveite os momentos da vida sem culpa ou restrições extremas.',
    },
  ];

  return (
    <section className="bg-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary text-center mb-12">
          Os 3 Pilares
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {pilares.map((pilar, idx) => (
            <div key={idx} className="bg-dark/50 border border-primary/30 rounded-lg p-6 hover:border-primary hover:shadow-lg transition">
              <div className="text-4xl mb-4">{pilar.icon}</div>
              <h3 className="font-montserrat font-bold text-xl text-primary mb-3">
                {pilar.title}
              </h3>
              <p className="text-light/80 text-sm leading-relaxed">
                {pilar.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-light text-lg font-bold uppercase tracking-wide">
          Disciplina na rotina. Liberdade na vida.
        </p>
      </div>
    </section>
  );
}
```

**Done When:**
- [ ] 3 cards render
- [ ] Icons visible
- [ ] Responsive: 3-col → stack
- [ ] Hover effects work
- [ ] Colors correct (gold borders)

**Tests:**
```bash
# Hover on desktop
# Mobile responsive check
```

**Gate:** Visual check desktop + mobile

---

### **Task 8: QuemSomos (Trainer Cards) Component** [CRITICAL PARALLEL, AFTER 2-3]
**ID:** TASK-008  
**Time Estimate:** 2.5h  
**Depends On:** TASK-002, TASK-003  
**Blocks:** CTAFinal integration  

**What:**
- Create components/QuemSomos.jsx
- 2 trainer cards (Renata + Leandro)
- Circular photos, bio, credential
- CTA "Fale com [Name]" button (nested TrainerCTA component)
- Trainer-conditional highlighting (gold border if ?trainer matches)
- Responsive: side-by-side desktop → stack mobile

**File: src/components/QuemSomos.jsx**
```javascript
import content from '../content/lrfit.content.json';
import { TrainerCard } from './TrainerCard';

export function QuemSomos({ trainer }) {
  return (
    <section id="quem-somos" className="bg-light py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-dark text-center mb-12">
          Quem Somos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <TrainerCard 
            id="renata"
            trainer={content.trainers.renata}
            isHighlighted={trainer === 'renata'}
          />
          <TrainerCard 
            id="leandro"
            trainer={content.trainers.leandro}
            isHighlighted={trainer === 'leandro'}
          />
        </div>
      </div>
    </section>
  );
}
```

**File: src/components/TrainerCard.jsx**
```javascript
import { TrainerCTA } from './TrainerCTA';

export function TrainerCard({ trainer, isHighlighted }) {
  return (
    <div className={`bg-white rounded-lg p-8 text-center transition ${
      isHighlighted ? 'border-4 border-primary shadow-2xl' : 'border border-gray-200 shadow-md'
    }`}>
      
      <img 
        src={trainer.photo}
        alt={trainer.name}
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
        loading="lazy"
      />

      <h3 className="font-montserrat font-bold text-2xl text-dark mb-2">
        {trainer.name}
      </h3>

      <p className="text-sm text-primary font-semibold mb-4">
        {trainer.credential}
      </p>

      <p className="text-gray-700 text-sm leading-relaxed mb-8 line-clamp-3">
        {trainer.bio}
      </p>

      <TrainerCTA 
        name={trainer.name}
        phone={trainer.phone}
        highlighted={isHighlighted}
      />
    </div>
  );
}
```

**File: src/components/TrainerCTA.jsx**
```javascript
import { useMetaPixel } from '../hooks/useMetaPixel';

export function TrainerCTA({ name, phone, highlighted }) {
  const { trackLead } = useMetaPixel(import.meta.env.VITE_META_PIXEL_ID);

  const handleClick = () => {
    trackLead(name.toLowerCase());
    const waLink = `https://wa.me/${phone}?text=Oi,%20vim%20da%20LR%20Fit%20Method`;
    window.open(waLink, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className={`btn-primary w-full ${highlighted ? 'scale-105 ring-2 ring-primary' : ''}`}
    >
      Fale com {name}
    </button>
  );
}
```

**Done When:**
- [ ] 2 trainer cards render
- [ ] Photos circular and visible
- [ ] Gold border highlighting works
- [ ] CTA buttons clickable
- [ ] WhatsApp links correct (no formatting errors)
- [ ] Responsive: 2-col → 1-col

**Tests:**
```bash
# Test URLs:
/?trainer=renata  # Renata should be highlighted
/?trainer=leandro # Leandro should be highlighted
/                 # Both normal

# Test buttons: click → WhatsApp opens
# Pixel tracking: open Meta Events Manager
```

**Gate:** Manual testing (highlighting + WhatsApp links work)

---

### **Task 9: Resultados (Before/After Grid) Component** [PARALLEL, AFTER 2]
**ID:** TASK-009  
**Time Estimate:** 1.5h  
**Depends On:** TASK-002  
**Blocks:** App assembly  

**What:**
- Create components/Resultados.jsx
- Grid of before/after photos (3-6 transformations)
- Responsive: 3-col desktop → 2-col tablet → 1-col mobile
- Lazy-load images for performance

**File: src/components/Resultados.jsx**
```javascript
export function Resultados() {
  const transformacoes = [
    {
      id: 'carlos',
      name: 'Carlos',
      beforePhoto: '/images/carlos-before.jpg',
      afterPhoto: '/images/carlos-after.jpg',
      result: 'Perdeu 8kg em 12 semanas',
    },
    // ... 2-5 more
  ];

  return (
    <section className="bg-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary text-center mb-12">
          Resultados Reais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformacoes.map((t) => (
            <div key={t.id} className="bg-dark/50 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Antes</p>
                  <img src={t.beforePhoto} alt="Antes" className="w-full h-auto rounded" loading="lazy" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Depois</p>
                  <img src={t.afterPhoto} alt="Depois" className="w-full h-auto rounded" loading="lazy" />
                </div>
              </div>
              <p className="text-sm text-light font-semibold">{t.name}</p>
              <p className="text-xs text-primary">{t.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Done When:**
- [ ] Grid renders correctly
- [ ] Images lazy-load (check DevTools Network)
- [ ] Responsive: 3 → 2 → 1 col
- [ ] Text visible and readable
- [ ] No broken image placeholders

**Tests:**
```bash
# DevTools Network: images load with loading="lazy"
# Responsive check: 375px, 768px, 1024px
```

**Gate:** Visual check + lazy-load verification

---

### **Task 10: Metodologia (4-Steps) Component** [PARALLEL, AFTER 2]
**ID:** TASK-010  
**Time Estimate:** 1.5h  
**Depends On:** TASK-002  
**Blocks:** App assembly  

**What:**
- Create components/Metodologia.jsx
- 4-step methodology (Plano → Acompanhamento → Ajustes → Resultados)
- Icons + numbered steps
- Responsive: 4-col desktop → 2x2 grid tablet → stack mobile

**File: src/components/Metodologia.jsx**
```javascript
export function Metodologia() {
  const steps = [
    {
      number: '1',
      icon: '📋',
      title: 'Plano Personalizado',
      description: 'Análise completa e plano 100% customizado para você.',
    },
    {
      number: '2',
      icon: '📊',
      title: 'Acompanhamento Semanal',
      description: 'Suporte contínuo com check-ins e ajustes semanais.',
    },
    {
      number: '3',
      icon: '⚙️',
      title: 'Ajustes Individualizados',
      description: 'Adaptamos sempre que necessário, sem riscos.',
    },
    {
      number: '4',
      icon: '✅',
      title: 'Resultados Reais',
      description: 'Transformação durável baseada em consistência.',
    },
  ];

  return (
    <section id="metodologia" className="bg-light py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-dark text-center mb-12">
          Como Funciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-lg p-6 border-l-4 border-primary">
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-sm font-bold text-primary mb-2">Passo {step.number}</div>
              <h3 className="font-montserrat font-bold text-dark mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Done When:**
- [ ] 4 cards render
- [ ] Icons visible
- [ ] Responsive: 4-col → 2x2 → stack
- [ ] Border-left gold
- [ ] Text readable

**Tests:**
```bash
# Responsive check
```

**Gate:** Visual check responsive

---

### **Task 11: CTAFinal (Dual Button) Component** [CRITICAL PARALLEL, AFTER 4-8]
**ID:** TASK-011  
**Time Estimate:** 1.5h  
**Depends On:** TASK-004 (Meta Pixel), TASK-008 (TrainerCTA)  
**Blocks:** App assembly  

**What:**
- Create components/CTAFinal.jsx
- 2 buttons: "Fale com Renata" | "Fale com Leandro"
- Trainer-conditional highlighting
- Sticky footer option (mobile)
- WhatsApp routing + Pixel tracking

**File: src/components/CTAFinal.jsx**
```javascript
import { TrainerCTA } from './TrainerCTA';
import content from '../content/lrfit.content.json';
import { CONFIG } from '../config';

export function CTAFinal({ trainer }) {
  return (
    <section id="cta-final" className="bg-dark py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-light text-center mb-12">
          Pronto para Transformar Seu Corpo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TrainerCTA 
            name={content.trainers.renata.name}
            phone={CONFIG.phones.renata}
            highlighted={trainer === 'renata'}
          />
          <TrainerCTA 
            name={content.trainers.leandro.name}
            phone={CONFIG.phones.leandro}
            highlighted={trainer === 'leandro'}
          />
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Escolha seu trainer e comece hoje mesmo!
        </p>
      </div>
    </section>
  );
}
```

**Done When:**
- [ ] 2 buttons render
- [ ] Highlighted button shows correctly
- [ ] Both buttons clickable
- [ ] WhatsApp links work
- [ ] Pixel Lead events fire

**Tests:**
```bash
# Test highlighting: /?trainer=renata, /?trainer=leandro
# Test WhatsApp: click each button
# Test Pixel: Meta Events Manager
```

**Gate:** Manual testing (buttons, highlighting, Pixel events)

---

### **Task 12: Footer Component** [PARALLEL, AFTER 2]
**ID:** TASK-012  
**Time Estimate:** 0.5h  
**Depends On:** TASK-002  
**Blocks:** App assembly  

**What:**
- Create components/Footer.jsx
- Logo, Instagram links, disclaimer, copyright

**File: src/components/Footer.jsx**
```javascript
import content from '../content/lrfit.content.json';

export function Footer() {
  return (
    <footer className="bg-dark border-t border-primary/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <h4 className="font-montserrat font-bold text-primary mb-4">{content.brand.name}</h4>
            <p className="text-light/70 text-sm">Consultoria Online de Treino e Dieta</p>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-primary mb-4">Instagram</h4>
            {/* Se instagram ainda for STATUS: PENDENTE, o agente omite o link (ver Socratic Question Map) em vez de gerar link quebrado */}
            {content.trainers.renata.instagram && !content.trainers.renata.instagram.startsWith('STATUS') && (
              <a href={`https://instagram.com/${content.trainers.renata.instagram}`} target="_blank" className="text-light hover:text-primary text-sm block mb-2">
                {content.trainers.renata.instagram}
              </a>
            )}
            {content.trainers.leandro.instagram && !content.trainers.leandro.instagram.startsWith('STATUS') && (
              <a href={`https://instagram.com/${content.trainers.leandro.instagram}`} target="_blank" className="text-light hover:text-primary text-sm block">
                {content.trainers.leandro.instagram}
              </a>
            )}
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-primary mb-4">Legal</h4>
            <p className="text-light/70 text-xs">
              {content.footer.disclaimer}
            </p>
          </div>
        </div>

        <div className="border-t border-primary/30 pt-8 text-center">
          <p className="text-light/50 text-sm">
            © {new Date().getFullYear()} LR Fit Method. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Done When:**
- [ ] Footer renders
- [ ] Instagram links valid
- [ ] Disclaimer visible
- [ ] Mobile responsive

**Tests:**
```bash
# Visual check
```

**Gate:** Visual check

---

### **Task 13: App.jsx Assembly** [SEQUENTIAL AFTER 5-12]
**ID:** TASK-013  
**Time Estimate:** 1h  
**Depends On:** All component tasks (5-12), Hook tasks (3-4)  
**Blocks:** Integration testing  

**What:**
- Update src/App.jsx
- Import all components
- Setup TrainerContext
- useTrainerParam + useMetaPixel hooks
- Assemble full page layout

**File: src/App.jsx**
```javascript
import { useTrainerParam } from './hooks/useTrainerParam';
import { useMetaPixel } from './hooks/useMetaPixel';

import { Hero } from './components/Hero';
import { Problema } from './components/Problema';
import { Pilares } from './components/Pilares';
import { QuemSomos } from './components/QuemSomos';
import { Resultados } from './components/Resultados';
import { Metodologia } from './components/Metodologia';
import { CTAFinal } from './components/CTAFinal';
import { Footer } from './components/Footer';

function App() {
  const trainer = useTrainerParam();
  useMetaPixel(import.meta.env.VITE_META_PIXEL_ID);

  return (
    <div className="bg-dark text-light">
      <Hero trainer={trainer} />
      <Problema />
      <Pilares />
      <QuemSomos trainer={trainer} />
      <Resultados />
      <Metodologia />
      <CTAFinal trainer={trainer} />
      <Footer />
    </div>
  );
}

export default App;
```

**Done When:**
- [ ] App renders without errors
- [ ] No console warnings
- [ ] All sections visible on page
- [ ] Scroll smooth (no jumps)

**Tests:**
```bash
npm run dev
# → Full page loads, all sections visible
```

**Gate:** No React errors or warnings

---

### **Task 14: Meta Pixel Script Integration** [SEQUENTIAL AFTER 4, 13]
**ID:** TASK-014  
**Time Estimate:** 1h  
**Depends On:** TASK-004 (useMetaPixel), TASK-013 (App)  
**Blocks:** Testing  

**What:**
- Verify Pixel script loads in prod
- Test PageView event
- Test Lead event (CTA clicks)
- Setup in Meta Business Suite

**Done When:**
- [ ] Pixel script loads (Network tab shows fbevents.js)
- [ ] PageView event in real-time (Meta Pixel → Real-Time)
- [ ] Lead event fires on CTA click
- [ ] No console errors related to Pixel

**Tests:**
```bash
# Dev Tools Network: check fbevents.js loads
# Meta Events Manager: real-time view
# Click CTA: see Lead event fire
```

**Gate:** Meta Events Manager confirmation

---

### **Task 15: SEO & OG Tags** [SEQUENTIAL AFTER 13]
**ID:** TASK-015  
**Time Estimate:** 1h  
**Depends On:** TASK-013  
**Blocks:** Testing  

**What:**
- Update index.html with meta tags
- Add OG tags (image, title, description)
- Add canonical URL
- Add favicon

**File: public/index.html**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>LR Fit Method | Consultoria Online de Treino e Dieta</title>
    <meta name="title" content="LR Fit Method | Consultoria Online de Treino e Dieta" />
    <meta name="description" content="Transforme seu corpo com consistência. Plano personalizado, acompanhamento semanal e liberdade de viver. Consultoria fitness online com resultados reais." />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://lrfitmethod.vercel.app/" />
    <meta property="og:title" content="LR Fit Method | Consultoria Online de Treino e Dieta" />
    <meta property="og:description" content="Transforme seu corpo com consistência..." />
    <meta property="og:image" content="https://lrfitmethod.vercel.app/og-image.jpg" />
    
    <!-- Canonical -->
    <link rel="canonical" href="https://lrfitmethod.vercel.app/" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**Done When:**
- [ ] Meta tags render in source
- [ ] OG image displays (share to social media test)
- [ ] Canonical URL present
- [ ] Favicon loads

**Tests:**
```bash
# Share link on WhatsApp/Facebook
# Check preview (title, image)
```

**Gate:** Social share preview check

---

### **Task 16: Performance Optimization** [SEQUENTIAL AFTER 13]
**ID:** TASK-016  
**Time Estimate:** 2h  
**Depends On:** TASK-013  
**Blocks:** Testing  

**What:**
- Optimize images (resize, compress, WebP)
- Code splitting (React.lazy for sections if needed)
- Lighthouse audit
- Target: Performance > 75

**Done When:**
- [ ] Lighthouse Performance > 75
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

**Tests:**
```bash
npm run build
# Deploy to Vercel
# Run Lighthouse audit
# Check Core Web Vitals
```

**Gate:** Lighthouse score > 75

---

### **Task 17: Testing & QA** [SEQUENTIAL AFTER 14-16]
**ID:** TASK-017  
**Time Estimate:** 2h  
**Depends On:** All previous  
**Blocks:** Launch  

**What:**
- Manual testing checklist
- Responsiveness (375px, 768px, 1024px)
- Browser compatibility (Chrome, Safari, Firefox, Edge)
- Accessibility (WCAG 2.1 AA)
- WhatsApp links (test on mobile)
- Pixel events (verify in Meta Events Manager)

**Checklist:**
```
Functional:
- [ ] All 8 sections render
- [ ] URL params work (?trainer=renata, leandro)
- [ ] Trainers highlighting correct
- [ ] All CTA buttons clickable
- [ ] WhatsApp links open correctly
- [ ] Scroll smooth, no jumps
- [ ] Forms/inputs work (if any)

Responsive:
- [ ] Mobile 375px: 100% usable
- [ ] Tablet 768px: grid adapts
- [ ] Desktop 1024px: full layout
- [ ] No horizontal scroll

Performance:
- [ ] Lighthouse > 75
- [ ] Load time < 3s
- [ ] Images lazy-load

Accessibility:
- [ ] WCAG 2.1 AA compliant
- [ ] Alt text on images
- [ ] Keyboard nav (tab order)
- [ ] Color contrast > 4.5:1
- [ ] Focus visible

Security:
- [ ] HTTPS only
- [ ] No secrets in code
- [ ] CSP headers

Browsers:
- [ ] Chrome 90+
- [ ] Safari 14+
- [ ] Firefox 88+
- [ ] Edge 90+
- [ ] Mobile Safari iOS 14+

Meta Pixel:
- [ ] PageView fires
- [ ] Lead fires on CTA
- [ ] Events in real-time viewer
```

**Tests:**
```bash
# Manual testing on physical devices
# BrowserStack or local devices
```

**Gate:** All checklist items pass

---

### **Task 18: Production Deployment & Handoff** [SEQUENTIAL FINAL]
**ID:** TASK-018  
**Time Estimate:** 1h  
**Depends On:** TASK-017 (QA pass)  
**Blocks:** None (launch ready)  

**What:**
- Final Vercel deployment
- Environment variables set (Meta Pixel ID, phones, etc)
- Verify live URL works
- Create setup documentation
- Handoff to client

**Done When:**
- [ ] Live URL: https://lrfitmethod.vercel.app working
- [ ] All environment variables set
- [ ] Meta Pixel tracking live
- [ ] Setup guide complete
- [ ] Client can see live landing

**Tests:**
```bash
# Final live URL test
# QA checklist re-run on prod
```

**Gate:** Live URL + QA pass on production

---

## Summary

| Task | ID | Time | Depends | Status |
|------|----|----|---------|--------|
| Meta Pixel Bootstrap | 000 | 0.5h | - | SEQ |
| Project Setup | 001 | 1.5h | 000 | SEQ |
| Content & Assets Bootstrap | 001B | 2.5h | 001 | SEQ |
| Design System | 002 | 2h | 001B | SEQ |
| useTrainerParam | 003 | 1h | 001 | // |
| useMetaPixel | 004 | 1.5h | 001,000 | // |
| Hero | 005 | 2h | 002,003,001B | // |
| Problema | 006 | 1h | 002,001B | // |
| Pilares | 007 | 1.5h | 002,001B | // |
| QuemSomos | 008 | 2.5h | 002,003,001B | // |
| Resultados | 009 | 1.5h | 002,001B | // |
| Metodologia | 010 | 1.5h | 002,001B | // |
| CTAFinal | 011 | 1.5h | 004,008 | // |
| Footer | 012 | 0.5h | 002,001B | // |
| App Assembly | 013 | 1h | 005-012,003-004 | SEQ |
| Meta Pixel Integration | 014 | 1h | 004,013 | SEQ |
| SEO & OG Tags | 015 | 1h | 013 | SEQ |
| Performance Optimization | 016 | 2h | 013 | SEQ |
| Testing & QA | 017 | 2h | 014-016 | SEQ |
| Production Deploy | 018 | 1h | 017 | SEQ |
| **TOTAL** | | **~38h** | | |

**Parallelization Opportunity:**
- Tasks 3-4, 5-12 can run in parallel after 1-2
- Tasks 14-16 can overlap after 13
- Critical path: 1→2→13→17→18 (~7h sequential)
- Parallel work: 3-12 (~10h total time)

---

**Next Phase:** EXECUTE (Implement tasks 1-18 in order, verify per task)

**Ready to start?** Confirm environment setup, then begin TASK-001.
