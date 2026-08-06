# Feature: LR Fit Method Landing Page
## DESIGN.md - Architecture & Component Design

**Status:** DESIGN Phase  
**Dependencies:** FEATURE-LANDING-SPEC.md (requirements locked)  

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────┐
│  Vercel (Frontend Hosting)                          │
│  ┌───────────────────────────────────────────────┐  │
│  │ React App (Vite)                              │  │
│  │ ┌─────────────────────────────────────────┐   │  │
│  │ │ Components/                             │   │  │
│  │ │ ├─ Hero.jsx (trainer-conditional)      │   │  │
│  │ │ ├─ Problema.jsx                        │   │  │
│  │ │ ├─ Pilares.jsx (3-grid)                │   │  │
│  │ │ ├─ QuemSomos.jsx (dual-card + router) │   │  │
│  │ │ ├─ Resultados.jsx (before/after grid) │   │  │
│  │ │ ├─ Metodologia.jsx (4-steps)          │   │  │
│  │ │ ├─ CTAFinal.jsx (dual-button)         │   │  │
│  │ │ └─ Footer.jsx                         │   │  │
│  │ │                                         │   │  │
│  │ │ Hooks/                                 │   │  │
│  │ │ ├─ useTrainerParam.js (URL param)      │   │  │
│  │ │ ├─ useMetaPixel.js (tracking)         │   │  │
│  │ └─────────────────────────────────────────┘   │  │
│  │                                               │  │
│  │ Styles/                                       │  │
│  │ └─ design-system.js (TailwindCSS tokens)     │  │
│  │                                               │  │
│  │ Meta Pixel Script (Facebook tag)             │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Environment Variables:                            │
│  ├─ VITE_META_PIXEL_ID                            │
│  ├─ VITE_RENATA_PHONE                             │
│  ├─ VITE_LEANDRO_PHONE                            │
│  └─ VITE_ANALYTICS_URL (optional, later)          │
└─────────────────────────────────────────────────────┘
         │
         ├─ WhatsApp API (wa.me links)
         │
         └─ Meta Pixel (tracking pageview + leads)
```

---

## 2. Component Hierarchy & Design

### App Structure

```
<App>
  │
  ├─ <Meta Pixel Script Loader>
  │
  ├─ <TrainerContext Provider>  ← detects ?trainer param
  │
  └─ <MainLayout>
      ├─ <Header/Nav> (logo + social)
      ├─ <Hero trainer={trainer} />
      ├─ <Problema />
      ├─ <Pilares />
      ├─ <QuemSomos trainer={trainer} />
      ├─ <Resultados />
      ├─ <Metodologia />
      ├─ <CTAFinal trainer={trainer} />
      ├─ <Footer />
      │
      └─ Intersection Observer (lazy-load images)
```

---

### 2.1 Component Specifications

#### **Component: Hero.jsx**
```typescript
interface HeroProps {
  trainer?: 'renata' | 'leandro' | null;  // from URL param
}

interface HeroState {
  photo: string;           // default: casal, renata, leandro
  headline: string;        // "O Corpo que Você Deseja..."
  subheadline: string;
  ctaText: string;         // "Começar Agora"
  highlighted: boolean;    // true se trainer match
}

Responsive:
  - Mobile (375px): flex-col, photo 100vw, text stack
  - Tablet (768px): flex-col-reverse, photo 60%
  - Desktop (1024px): grid 2-col, photo 50%, text 50%

Data: {
  default: { photo: '/hero-casal.jpg', ... },
  renata: { photo: '/hero-renata.jpg', border: 'gold' },
  leandro: { photo: '/hero-leandro.jpg', border: 'gold' }
}

Interactions:
  - CTA "Começar Agora" → scroll to #cta-final OR direct wa.me?
  - Pixel event: PageView (auto)
```

#### **Component: QuemSomos.jsx**
```typescript
interface TrainerCard {
  id: 'renata' | 'leandro';
  name: string;
  credential: string;
  bio: string;
  photo: string;
  phone: string;
  instagramHandle: string;
}

interface QuemSomosProps {
  trainer?: 'renata' | 'leandro' | null;
}

Rendering:
  - Grid 2-col (desktop) / stack (mobile)
  - Each card:
    * Photo (circular, border-radius: 50%)
    * Name + Credential (1 line)
    * Bio (3 lines max)
    * CTA Button "Fale com [Name]"
  
Conditional Styling:
  if trainer === 'renata':
    renata_card.style = { border: '2px solid gold', shadow: elevated }
    leandro_card.style = { opacity: 0.7 }  // optional fade
  
  if trainer === 'leandro':
    leandro_card.style = { border: '2px solid gold', shadow: elevated }
    renata_card.style = { opacity: 0.7 }
  
  if trainer === null:
    both.style = { normal }

Interactions:
  - Button click → Pixel Lead event + open wa.me
```

#### **Component: QuemSomos - CTA Button (Nested)**
```typescript
interface TrainerCTAProps {
  name: string;
  phone: string;
  highlighted: boolean;
}

Implementation:
  wa_link = `https://wa.me/${phone}?text=Oi,%20vim%20da%20LR%20Fit%20Method`
  
  onClick:
    1. fbq('track', 'Lead', { trainer: name })
    2. window.open(wa_link, '_blank')
  
  Styling:
    - Base: bg-gold, text-dark, rounded-lg, py-2 px-4
    - Hover: shadow-lg, scale 1.05
    - Highlighted: extra shadow, pulsing animation (optional)

Mobile: full-width button
Desktop: inline button
```

#### **Component: Resultados.jsx**
```typescript
interface Transformation {
  id: string;
  clientName: string;
  beforePhoto: string;
  afterPhoto: string;
  result: string;  // "Perdeu 8kg em 12 semanas"
  duration: string;  // "12 semanas" or from result text
}

Data:
  transformations: Transformation[] = [
    { id: 'carlos', clientName: 'Carlos', ..., result: 'Perdeu 8kg' },
    { id: 'ana', clientName: 'Ana', ..., result: 'Ganhou músculo, perdeu gordura' },
    // ... 3-6 total
  ]

Rendering:
  - Grid 3-col (desktop) / 2-col (tablet) / 1-col (mobile)
  - Each cell:
    * Before/After photos side-by-side (50/50)
    * Labels small "Antes" / "Depois"
    * Result text below
    * Client name small gray

Performance:
  - Lazy load images (Intersection Observer)
  - Srcset for responsive image sizes
  - WebP format (with JPEG fallback)
```

#### **Component: CTAFinal.jsx**
```typescript
interface CTAFinalProps {
  trainer?: 'renata' | 'leandro' | null;
}

Rendering:
  - 2 buttons side-by-side (desktop) / stack (mobile)
  - Button 1: "Fale com Renata" → wa.me/renata_phone
  - Button 2: "Fale com Leandro" → wa.me/leandro_phone
  
Conditional:
  if trainer === 'renata':
    renata_button: { bg-gold, scale 1.1, icon: checkmark }
    leandro_button: { bg-dark-opacity }
  
  if trainer === 'leandro':
    leandro_button: { bg-gold, scale 1.1, icon: checkmark }
    renata_button: { bg-dark-opacity }
  
  if trainer === null:
    both equal sizing

Optional Feature (sticky):
  - CTA bar stays at bottom during scroll
  - Only on mobile (space constrained)

Interactions:
  - Each button click:
    1. fbq('track', 'Lead', { trainer, timestamp })
    2. window.open(wa.me link, '_blank')
    3. Analytics: log trainer click for A/B testing
```

---

## 3. Design System Integration

### Color Tokens (Tailwind CSS)
```javascript
// tailwind.config.js
const colors = {
  primary: '#D4AF37',      // Gold - headlines, CTA
  dark: '#0A0E27',         // Navy - backgrounds
  light: '#FFFFFF',        // White - clarity
  accent: '#FF69B4',       // Magenta (optional, hover)
  gray: {
    100: '#F5F5F5',
    400: '#A0A0A0',
    700: '#333333',
  }
};

// Usage in components:
// className="bg-primary text-dark" → gold bg + dark text
```

### Typography System
```javascript
const fonts = {
  primary: 'Montserrat',    // Headlines, bold
  secondary: 'Inter',       // Body, regular
};

// Font sizes (Tailwind)
h1: 'text-4xl md:text-5xl',   // 36px → 48px
h2: 'text-3xl md:text-4xl',   // 28px → 36px
h3: 'text-2xl md:text-3xl',   // 24px → 28px
body: 'text-base md:text-lg',  // 16px → 18px
small: 'text-sm',              // 14px

// Font weights
bold: 'font-bold' (700)
semibold: 'font-semibold' (600)
regular: 'font-regular' (400)
```

### Spacing System
```javascript
// Tailwind default scale (base: 4px)
xs: 2px (0.5)
sm: 4px (1)
md: 8px (2)
lg: 16px (4)
xl: 24px (6)
2xl: 32px (8)

// Usage:
p-4 → padding: 16px
mb-8 → margin-bottom: 32px
gap-6 → gap: 24px
```

### Component Styles (Tailwind Classes)

**Hero Section:**
```html
<section class="bg-dark text-light min-h-screen flex items-center">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
    <div class="flex flex-col justify-center order-2 md:order-1">
      <h1 class="font-montserrat font-bold text-4xl md:text-5xl text-primary mb-4">
        O Corpo que Você Deseja
      </h1>
      <p class="text-lg md:text-xl text-light mb-8">
        A Vida que Você Merece
      </p>
      <button class="bg-primary text-dark font-bold py-3 px-8 rounded-lg hover:shadow-lg">
        Começar Agora
      </button>
    </div>
    <img src="/hero-photo.jpg" class="w-full h-auto order-1 md:order-2" />
  </div>
</section>
```

**Card (Trainer):**
```html
<div class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition">
  <img src="/trainer.jpg" class="w-24 h-24 rounded-full mx-auto mb-4" />
  <h3 class="font-montserrat font-bold text-xl text-dark">Renata</h3>
  <p class="text-sm text-gray-400 mb-3">Pós-grad em Nutrição Funcional</p>
  <p class="text-gray-600 text-sm mb-4 line-clamp-3">
    Especialista em transformação corporal...
  </p>
  <a href="https://wa.me/..." class="bg-primary text-dark font-bold py-2 px-4 rounded">
    Fale com Renata
  </a>
</div>
```

---

## 4. Data Flow & State Management

### URL Parameter Detection
```javascript
// hooks/useTrainerParam.js
export function useTrainerParam() {
  const [trainer, setTrainer] = useState<'renata' | 'leandro' | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trainerParam = params.get('trainer');
    
    if (['renata', 'leandro'].includes(trainerParam)) {
      setTrainer(trainerParam);
    }
  }, []);

  return trainer;
}

// Usage in App.jsx:
const trainer = useTrainerParam();
<Hero trainer={trainer} />
<QuemSomos trainer={trainer} />
<CTAFinal trainer={trainer} />
```

### Meta Pixel Integration
```javascript
// hooks/useMetaPixel.js
export function useMetaPixel(pixelId) {
  useEffect(() => {
    // Load Meta Pixel script
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }, [pixelId]);

  const trackLead = (trainer) => {
    window.fbq('track', 'Lead', {
      content_name: 'LR Fit Method CTA',
      trainer: trainer,
      timestamp: new Date().toISOString()
    });
  };

  return { trackLead };
}

// Usage in CTAButton:
const { trackLead } = useMetaPixel(process.env.VITE_META_PIXEL_ID);

onClick={() => {
  trackLead(trainer);
  window.open(waLink, '_blank');
}}
```

### Configuration Management

> **Atualizado:** esta seção foi escrita antes da decisão do `CONTENT-SCHEMA.md`. A separação correta é: **`config.js`** só guarda o que é segredo/ambiente (Pixel ID, telefones — via `.env`); **tudo o resto** (nome, bio, credencial, foto, textos de copy) vive em `src/content/lrfit.content.json`, lido diretamente pelos componentes. Isso evita ter a mesma bio/nome duplicada em 2 arquivos.

```javascript
// config.js — SÓ segredos e env vars
export const CONFIG = {
  pixelId: import.meta.env.VITE_META_PIXEL_ID,
  phones: {
    renata: import.meta.env.VITE_RENATA_PHONE,
    leandro: import.meta.env.VITE_LEANDRO_PHONE,
  },
};
```

```javascript
// src/content/lrfit.content.json — TUDO o resto (ver CONTENT-SCHEMA.md pro schema completo)
{
  "trainers": {
    "renata": {
      "name": "Renata",
      "credential": "STATUS: PENDENTE",
      "bio": "STATUS: PENDENTE",
      "instagram": "STATUS: PENDENTE",
      "photo": "/images/trainer-renata.jpg"
    },
    "leandro": { "...": "..." }
  },
  "transformacoes": [
    { "id": "transformacao-01", "clientName": "STATUS: PENDENTE", "...": "..." }
  ]
}
```

**Uso nos componentes:**
```javascript
import content from '../content/lrfit.content.json';
import { CONFIG } from '../config';

// Texto/foto/bio vem do content.json:
content.trainers.renata.bio

// Telefone/Pixel ID vem do config.js (que lê do .env):
CONFIG.phones.renata
```

---

## 5. Styling Strategy

### Approach: Utility-First (Tailwind CSS)

**Why:**
- ✅ Fast prototyping (no CSS file)
- ✅ Consistency (design tokens)
- ✅ Responsive built-in
- ✅ Small bundle (tree-shake unused styles)

**Structure:**
```
components/
├─ Hero.jsx          (inline Tailwind classes)
├─ QuemSomos.jsx     (inline Tailwind classes)
└─ styles.css        (only @apply extracts + animations)
```

**Custom Animations (in styles.css):**
```css
@layer components {
  .pulse-gold {
    @apply animate-pulse;
    color: #D4AF37;
  }
  
  .btn-primary {
    @apply bg-primary text-dark font-bold py-2 px-4 rounded-lg
           hover:shadow-lg transition-all duration-200;
  }
  
  .btn-primary:hover {
    @apply scale-105;
  }
}
```

---

## 6. Performance Optimizations

### Image Optimization
```javascript
// Use Next.js Image component (if using Next.js)
// Or manual optimization:

<img 
  src="/hero-casal.jpg"
  alt="Casal de personal trainers"
  loading="lazy"
  width={800}
  height={600}
  srcSet="/hero-casal-400w.jpg 400w, /hero-casal-800w.jpg 800w"
/>

// WebP with fallback
<picture>
  <source srcSet="/hero-casal.webp" type="image/webp" />
  <img src="/hero-casal.jpg" alt="..." />
</picture>
```

### Code Splitting
```javascript
// React.lazy for sections (if needed later)
const Problema = React.lazy(() => import('./sections/Problema'));
const Resultados = React.lazy(() => import('./sections/Resultados'));

// Suspense boundary
<Suspense fallback={<div>Carregando...</div>}>
  <Resultados />
</Suspense>
```

### Lighthouse Targets
```
Performance: > 75
  - Optimize images (WebP, srcset)
  - Minimize JS bundle
  - Lazy load below-fold images

Accessibility: > 90
  - Semantic HTML
  - Alt text
  - ARIA labels if needed

Best Practices: > 90
  - HTTPS (Vercel ✓)
  - No console errors
  - Modern web standards

SEO: > 90
  - Meta tags ✓
  - Heading hierarchy
  - Mobile-friendly
```

---

## 7. Error Handling & Edge Cases

### URL Parameter Validation
```javascript
// Safe trainer detection
const validTrainers = ['renata', 'leandro'];
const trainer = validTrainers.includes(trainerParam) ? trainerParam : null;

// Fallback if invalid: show both trainers normal
```

### Meta Pixel Graceful Fail
```javascript
// If Pixel ID not set, app still works
if (process.env.VITE_META_PIXEL_ID) {
  fbq('track', 'Lead', { ... });
} else {
  console.warn('Meta Pixel not configured');
}
```

### Image Fallback
```javascript
// If trainer photo fails to load
<img 
  src={trainerPhoto}
  onError={(e) => {
    e.target.src = '/images/placeholder-trainer.jpg';
  }}
  alt={trainerName}
/>
```

---

## 8. Deployment & Environment

### Vercel Configuration
```javascript
// vercel.json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "env": {
    "VITE_META_PIXEL_ID": "@meta_pixel_id",
    "VITE_RENATA_PHONE": "@renata_phone",
    "VITE_LEANDRO_PHONE": "@leandro_phone"
  }
}
```

### Environment Variables (.env.local)
```
VITE_META_PIXEL_ID=SEU_PIXEL_ID_AQUI  # NUNCA reutilizar o Pixel do Achadinhos - criar um Pixel NOVO e separado pro LR Fit
VITE_RENATA_PHONE=5511987654321
VITE_LEANDRO_PHONE=5511987654322
VITE_RENATA_BIO="Coach fitness. Pós-grad nutrição."
VITE_LEANDRO_BIO="Personal trainer. Esp. funcional."
```

### GitHub CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 9. Accessibility Checklist

- [ ] Semantic HTML (`<section>`, `<article>`, `<nav>`)
- [ ] Heading hierarchy (h1 > h2 > h3, no skips)
- [ ] Alt text on all images
- [ ] Color contrast > 4.5:1 (gold on dark, tested)
- [ ] Keyboard navigation (tab order, focus visible)
- [ ] ARIA labels where needed (buttons, icons)
- [ ] Mobile touch targets > 44px
- [ ] No auto-playing videos/audio
- [ ] Focus trap in modals (if any)

---

**Next:** → FEATURE-LANDING-TASKS.md (Atomic task breakdown)
