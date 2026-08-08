# Photo Management Workflow

**Last Updated:** 2026-08-08

## Overview

`assets/raw/` is the **single source of truth** for all photos. Subdirectories organize photos by section. Claude syncs to `public/images/` automatically when instructed.

---

## Folder Structure

```
assets/raw/
├── antes_depois/
│   └── [before/after transformation photos]
│
├── dose_dupla/
│   └── [couple/friends training photos]
│
└── [root level]
    ├── Casal_Leandro_Renata.jpeg    → casal-leandro-renata.jpg (Hero)
    ├── foto_leandro.jpeg            → trainer-leandro.jpg
    ├── foto_renata.jpeg             → trainer-renata.jpg
    ├── logo_leandro.jpeg            → logo-leandro.jpg
    └── logo_renata.jpeg             → logo-renata.jpg
```

---

## Sections & Photo Counts

| Section | Folder | Max Photos | Current |
|---------|--------|------------|---------|
| Resultados (gallery) | `antes_depois/` | — | 14 |
| Dose Dupla | `dose_dupla/` | — | 2 (expandable) |
| Hero | `assets/raw/` root | 1 | 1 |
| Trainers | `assets/raw/` root | 2 | 2 |
| Logos | `assets/raw/` root | 2 | 2 |

---

## Adding Photos: Quick Start

### Add to Antes/Depois (Resultados section)

```bash
1. Add photos to: assets/raw/antes_depois/
2. Tell Claude: "Inclua fotos no antes e depois"
3. Claude syncs to public/images/transformacao-01, 02, ...
```

### Add to Dose Dupla

```bash
1. Add photos to: assets/raw/dose_dupla/
2. Tell Claude: "Adicione fotos pra Dose Dupla"
3. Claude syncs to public/images/dose-dupla-01, 02, ...
```

### Add Hero or Trainer Photos

```bash
1. Add to: assets/raw/ (root)
2. Name them: Casal_Leandro_Renata.jpeg, foto_leandro.jpeg, etc.
3. Tell Claude, he syncs
```

---

## File Naming in public/images/

Claude auto-renames files when syncing:
- `WhatsApp Image 2026-07-30 at 11.47.40 (1).jpeg` → `transformacao-01.jpg`
- `arthur_jenifer1.jpeg` → `dose-dupla-praia.jpg`
- etc.

See `lrfit.content.json` for exact references.

---

## What Claude Does (Automatic)

1. **List** all photos in target folder (antes_depois/, dose_dupla/, etc.)
2. **Copy** to `public/images/` with standardized names
3. **Update** `lrfit.content.json` to reference them
4. **Build & commit** with one atomic commit

---

## Notes

- Photos NOT in `.gitignore`, so they're not versioned (won't bloat repo)
- Folder structure persists across sessions
- Always use dedicated folder for new sections
- One folder = one section = one query to Claude
