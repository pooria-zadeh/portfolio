# Pooria Rajabzadeh — portfolio

Responsive single-page portfolio, statically exported from Next.js and
deployed to GitHub Pages.

- **Stack:** Next.js 16 (App Router, `output: 'export'`), TypeScript,
  Tailwind CSS 4, Framer Motion, Lenis.
- **Tests:** Vitest (content + feature ledger), Playwright (responsive
  matrix, feature behaviour, axe accessibility).
- **Content:** everything in `src/data/`, mirrored from
  `public/Pooria-Rajabzadeh-Resume.pdf`.

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + unit + pins + build + e2e
```

See [CLAUDE.md](./CLAUDE.md) for the structure, the DOM contract the tests
rely on, and the feature workflow around `feature_list.json`.
