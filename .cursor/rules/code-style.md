---
description: Code style and TypeScript conventions for the Next.js app
alwaysApply: true
---

# Code Style Guidelines

Adapted from tali-central's `code-style.md` for a frontend-only Next.js
App Router project.

## TypeScript / React

### Naming Conventions
- **Components**: PascalCase (`ProjectCard`, `SectionHeading`)
- **Interfaces/Types**: PascalCase, no `I` prefix (`Project`, `RevealProps`)
- **Functions/Hooks**: camelCase (`formatDate`, `useScrollState`)
- **Variables**: camelCase (`isScrolled`, `projectCount`)
- **Constants**: SCREAMING_SNAKE_CASE (`NAV`, `SITE_URL`, `PLACEHOLDER_HUES`)
- **Files**: components PascalCase (`Hero.tsx`), everything else kebab-case or lowercase (`site.ts`, `globals.css`)

### Component Rules
- Server Components by default; add `'use client'` only when the component
  needs state, effects, or browser APIs.
- One exported component per file; small private helpers may live beside it.
- Props are typed with an explicit `interface`, never inline anonymous types
  on the function signature for anything with more than two props.
- All content/copy lives in `src/data/site.ts` — components render data,
  they don't own copy.

### File Organization
```typescript
// 1. React / Next.js imports
import { useEffect, useState } from 'react';
import type { Metadata } from 'next';

// 2. External library imports
import { motion } from 'framer-motion';

// 3. Internal imports (via @/ alias)
import { site } from '@/data/site';
import { Reveal } from '@/components/Reveal';
```

### Type Annotations
- Explicit types on exported function parameters and return values.
- No `any`. Use `unknown` plus narrowing when a type genuinely isn't known.

### Accessibility & Motion
- Every animation must respect `prefers-reduced-motion` (see `Reveal.tsx`
  and `SmoothScroll.tsx` for the pattern).
- Interactive elements are real `<a>`/`<button>` elements with visible
  focus states; decorative elements get `aria-hidden`.
- Landmark structure: one `<main>`, `<nav>` with `aria-label`, skip link
  first in the tab order.
