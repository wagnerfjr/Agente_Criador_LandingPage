# LR Fit Method - Landing Page + Analytics

![Status](https://img.shields.io/badge/status-IN%20DEVELOPMENT-blue)
![Progress](https://img.shields.io/badge/progress-0%2F18%20tasks-red)
![License](https://img.shields.io/badge/license-Private-black)

Reusable landing page + analytics engine for fitness consultancy (LR Fit Method). Built with React 18, Vercel, and Meta Pixel tracking.

---

## 🎯 Vision

Create a **template generator** for landing pages that:
- Captures leads via WhatsApp with intelligent trainer routing
- Measures ROI of Meta Ads campaigns (test budget R$5-10/day)
- Serves as foundation for selling to other consultancies

**Current Phase:** MVP for LR Fit Method (Renata + Leandro)  
**Timeline:** 4-5 weeks (35-45 hours)  
**Success:** 100+ page views, 10+ leads, <R$15 cost per lead

---

## 📦 Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18 + Vite | Fast dev, reusable for templating |
| **Styling** | TailwindCSS | Utility-first, component reuse |
| **Hosting** | Vercel Free | Zero-ops, auto-deploy from GitHub |
| **Tracking** | Meta Pixel | Integrated with Ad Manager |
| **Analytics DB** | Supabase PostgreSQL | Optional for phase 2 |
| **Deployment** | GitHub → Vercel auto-deploy | Clean CI/CD |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account
- Vercel account (linked to GitHub)
- Meta Business Account + Pixel ID

### Setup

```bash
# Clone repo
git clone https://github.com/wagnerfjr/Agente_Criador_LandingPage.git
cd Agente_Criador_LandingPage

# Install dependencies
npm install

# Create .env.local with Meta Pixel ID
echo "VITE_META_PIXEL_ID=YOUR_PIXEL_ID_HERE" > .env.local

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Build & Deploy

```bash
# Local build
npm run build

# Deploy to Vercel (auto-deploy on git push)
git push origin main
# → Automatically deploys to vercel.app
```

---

## 📋 Features

### ✅ MVP (Included)

**Landing Page (8 Sections)**
- Hero (trainer-conditional photo + CTA)
- Problema (pain point + transformation)
- 3 Pilares (training, nutrition, freedom)
- Quem Somos (2 trainer cards)
- Resultados (before/after gallery)
- Metodologia (4-step process)
- CTA Final (dual WhatsApp buttons)
- Footer (links + social)

**Technical Features**
- URL param routing (`?trainer=renata` | `?trainer=leandro`)
- Meta Pixel PageView + Lead tracking
- SEO + Open Graph tags
- Responsive (375px mobile → 1920px desktop)
- Performance: Lighthouse >75, <2s load
- WCAG 2.1 AA accessibility

### ❌ MVP (Excluded)

- Payment/checkout system
- Advanced WhatsApp automation
- Custom analytics dashboard (use Meta's native tools)
- Blog/SEO strategy
- Mobile app

---

## 📁 Project Structure

```
.
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx
│   │   ├── Problema.jsx
│   │   ├── Pilares.jsx
│   │   ├── QuemSomos.jsx
│   │   ├── Resultados.jsx
│   │   ├── Metodologia.jsx
│   │   ├── CTAFinal.jsx
│   │   ├── Footer.jsx
│   │   └── common/          # Reusable components
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Grid.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useTrainerParam.js
│   │   └── useMetaPixel.js
│   ├── content/
│   │   └── lrfit.content.json  # Single source of truth
│   ├── constants/
│   │   ├── theme.js
│   │   └── spacing.js
│   ├── App.jsx              # Main app
│   └── main.jsx             # Entry point
├── public/
│   └── images/              # Optimized images (WebP + JPEG)
├── assets/
│   └── raw/                 # Client photos (intake)
├── scripts/
│   ├── get_or_create_pixel.py  # Meta Pixel creation
│   └── process-assets.js       # Image optimization
├── .specs/                  # Specification & planning docs
│   ├── project/
│   │   ├── PROJECT.md
│   │   ├── ROADMAP.md
│   │   └── STATE.md
│   ├── features/landing/
│   │   ├── tasks.md             # 18 atomic tasks
│   │   └── VALIDATION-PLAN.md   # QA criteria
│   ├── EXECUTION-MEMORY.md      # Task tracking
│   └── EXECUTION-WORKFLOW.md    # Dev + QA workflow
├── .gitignore
├── .env.local               # Local env (never commit)
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🔧 Development Workflow

### Before Starting Each Task

1. Read `.specs/EXECUTION-MEMORY.md` (this session's progress)
2. Read `.specs/features/landing/tasks.md` (current task)
3. Read `.specs/features/landing/VALIDATION-PLAN.md` (gate criteria)
4. Check for known errors/solutions in memory
5. Start implementation

### Development Process

**One task = One atomic commit**

Each of the 18 tasks gets:
- Implementation (Dev Agent)
- Git commit (atomic, one per task)
- Independent validation (QA Agent)
- Gate criteria check (PASS/FAIL)
- Documentation update (EXECUTION-MEMORY.md)

### Testing Strategy

- **Development Agent** → Implements feature
- **QA Agent (independent)** → Validates per gate criteria
- **Gate Criteria** → Objective, measurable (no guessing)
- **No proceeding** → Without QA PASS ✅

---

## 📊 Task Progress

| Task | Status | Type | Est. Hours |
|------|--------|------|-----------|
| 0 | ⏳ NOT STARTED | Sequential | 0.5 |
| 1 | ⏳ BLOCKED | Sequential | 1.0 |
| 1.5 | ⏳ BLOCKED | Sequential | 1.5 |
| 2 | ⏳ BLOCKED | Parallel | 2.5 |
| 3-4 | ⏳ BLOCKED | Parallel | 1.5 |
| 5-11 | ⏳ BLOCKED | Parallel | 13 |
| 12 | ⏳ BLOCKED | Sequential | 1.0 |
| 13-14 | ⏳ BLOCKED | Sequential | 2.5 |
| 15-16 | ⏳ BLOCKED | Sequential | 2.5 |
| 17 | ⏳ BLOCKED | Sequential | 2.0 |
| 18 | ⏳ BLOCKED | Sequential | 3.0 |
| **TOTAL** | | | **32-45** |

See `.specs/features/landing/tasks.md` for full task breakdown.

---

## 🎯 Success Criteria

### MVP is Done When:

- [x] Landing live on Vercel (vercel.app)
- [ ] Meta Pixel tracking 100+ page views
- [ ] 10+ leads captured via WhatsApp
- [ ] Cost per lead documented
- [ ] Setup Guide + Playbook documented
- [ ] 18 atomic Git commits (one per task)
- [ ] All gate criteria PASS ✅

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `.specs/project/PROJECT.md` | Vision, goals, success metrics |
| `.specs/project/ROADMAP.md` | Features, milestones, blockers |
| `.specs/features/landing/tasks.md` | 18 atomic tasks, dependencies |
| `.specs/features/landing/VALIDATION-PLAN.md` | QA checklist per task |
| `.specs/EXECUTION-MEMORY.md` | Progress, errors, solutions |
| `.specs/EXECUTION-WORKFLOW.md` | Dev + QA workflow |
| `Documentos/SDD-LR-FIT-COMPLETE.md` | Complete requirements |

---

## 🔐 Environment Variables

### Required for Local Dev

Create `.env.local`:
```bash
VITE_META_PIXEL_ID=123456789012345  # From Meta Business Suite
```

### Never Commit

- `.env`
- `.env.local`
- Credentials, tokens, API keys

Use `.env.example` for template (with placeholders).

---

## 🚨 Known Issues

See `.specs/EXECUTION-MEMORY.md` under "Error Log & Solutions" for:
- Errors encountered during development
- Root causes
- Solutions applied
- Preventive measures

---

## 💡 Success Patterns

See `.specs/EXECUTION-MEMORY.md` under "Success Patterns & Lessons" for:
- What worked well
- Why it worked
- How to apply to other tasks

---

## 📞 Support

### Issues & Blockers

1. Check `.specs/EXECUTION-MEMORY.md` for known errors
2. Check `.specs/features/landing/VALIDATION-PLAN.md` for gate criteria
3. Read task.md for specific task requirements
4. If stuck → Document in EXECUTION-MEMORY.md for next session

---

## 🔄 CI/CD Pipeline

```
Local Development          GitHub                Vercel
     ↓                       ↓                      ↓
npm run dev  ←→  git push  →  Webhook  →  Auto-deploy  →  Live
     ↓            ↓                          ↓
(localhost:5173) (main branch)           (vercel.app)
```

### Pre-Push Checklist

```bash
# Local validation before pushing
npm run build          # Must succeed
npm run lint           # Must pass (if configured)
npm test               # Must pass (if tests exist)
git status             # Must be clean
```

---

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | >75 |
| First Contentful Paint (FCP) | <1.5s |
| Largest Contentful Paint (LCP) | <2.5s |
| Cumulative Layout Shift (CLS) | <0.1 |
| Bundle Size (gzip) | <100KB |
| Vercel Load Time | <2s |

---

## 🎓 Learning Path

1. **Week 1:** Core landing + Design System (Tasks 0-11)
2. **Week 2:** Integration + Optimization (Tasks 12-18)
3. **Week 3+:** Testing, documentation, launch

---

## 🚀 Deployment

### Development

```bash
npm run dev  # Local dev server (http://localhost:5173)
```

### Production

```bash
npm run build  # Create production build
npm run preview  # Preview production build locally

# Deploy to Vercel (automatic on git push)
git push origin main
```

Visit [Vercel Dashboard](https://vercel.com/dashboard) to see deployments.

---

## 📝 Git Workflow

```bash
# Create feature branch (for larger tasks)
git checkout -b feature/task-5-hero

# Work on task
# ... implement ...

# Commit (atomic, one per task)
git add .
git commit -m "Create Hero component with trainer routing

- Trainer-conditional photo based on URL param
- CTA button routes to correct WhatsApp
- Responsive design (mobile→desktop)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

# Push
git push origin feature/task-5-hero

# Create Pull Request (if desired)
# → Merged to main after QA validation
```

---

## 🎯 Next Steps

1. ✅ Specifications complete (SPEC → DESIGN → TASKS phases done)
2. ⏳ Implementation starts (Task 0 → Task 18)
3. ✅ Independent QA per task
4. 📈 Continuous progress tracking in `.specs/EXECUTION-MEMORY.md`

---

## 📄 License

Private repository for LR Fit Method.

---

## 👥 Contributors

- **Wagner** — Tech Lead + Marketer
- **Claude Code** — Development Agent
- **Independent QA Agent** — Validation & Testing

---

## 📞 Questions?

Refer to:
- `.specs/project/PROJECT.md` — Project context
- `.specs/features/landing/tasks.md` — Task details
- `.specs/EXECUTION-MEMORY.md` — Session progress & known issues

---

**Last Updated:** 2026-08-05  
**Status:** Ready for Task 0 🚀
