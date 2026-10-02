# Portfolio — Pooria Rajabzadeh

Personal portfolio: a single-page, **statically exported** Next.js site
(App Router, TypeScript, Tailwind CSS 4, Framer Motion, Lenis), modelled on
the layout of https://omidbadkoubeh.github.io/ and deployed to GitHub Pages.
Dark theme by default with a light toggle.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Static export → `out/` (must pass before any PR) |
| `npm run serve` | Serve `out/` on http://localhost:3100 (what e2e tests hit) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` (also type-checks tests) |
| `npm run test:unit` | Vitest: content integrity + feature-list ledger |
| `npm run test:e2e` | Build, then Playwright (responsive, features, a11y) |
| `npm run test:e2e:quick` | Playwright against an existing `out/` |
| `npm run test:responsive` | Only the viewport matrix (`tests/e2e/responsive.spec.ts`) |
| `npm run test:a11y` | Only axe (`tests/e2e/a11y.spec.ts`) |
| `npm run check` | lint + typecheck + unit + pins + e2e — the full gate |

Set `E2E_BASE_URL=http://localhost:3000` to point Playwright at the dev
server instead of the export (skips the webServer step).

## Where things live

```
src/
  app/            layout.tsx (fonts, theme bootstrap, metadata), page.tsx, globals.css, robots.ts, sitemap.ts
  components/
    layout/       Header, MobileMenu, ThemeToggle, Footer, SkipLink
    sections/     Hero, About, Experience, Projects, Skills, Contact  (one per section id)
    ui/           SectionHeading, Chip, Card, Button, Reveal, SmoothScroll, Stat
    icons/        inline SVG icon components
  data/           ALL copy. site.ts (identity, links, sections, nav), hero.ts, about.ts,
                  experience.ts, projects.ts, skills.ts, education.ts, types.ts, index.ts
  lib/            theme.ts (storage key + bootstrap script), cn.ts, json-ld.ts
tests/
  e2e/            responsive.spec.ts, features.spec.ts, a11y.spec.ts  (Playwright)
  unit/           content.test.ts, feature-list.test.ts               (Vitest)
  helpers/        viewports.ts (reads feature_list.json), features.ts
scripts/          serve-static.mjs (zero-dep static server), check-pins.mjs
feature_list.json The feature ledger — see "Feature workflow"
```

Rules of the structure:

- **Components never own copy.** Text, links, dates, chips: `src/data/*`.
  A component that needs new copy gets a new field in data, not a string.
- **Server Components by default.** `'use client'` only for state/effects:
  `Header`, `MobileMenu`, `ThemeToggle`, `Reveal`, `SmoothScroll`.
- **Sections are registered once** in `src/data/site.ts` (`sections`). Nav,
  scrollspy, section numbering and the tests all derive from that array.
- **Every color is a CSS custom property** defined in `globals.css` for both
  `[data-theme="dark"]` and `[data-theme="light"]`, mapped into Tailwind via
  `@theme inline`. No raw hex in components.
- **Every animation respects `prefers-reduced-motion`** (see `Reveal.tsx`,
  `SmoothScroll.tsx`). Tests run a reduced-motion pass.
- **Static export constraints:** no `headers()`, `cookies()`, route handlers,
  `next/image` optimisation (`images.unoptimized` is on), or dynamic routes
  without `generateStaticParams`. Read
  `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` before
  reaching for anything server-side — this Next.js is newer than your
  training data (see `AGENTS.md`).

## Feature workflow

`feature_list.json` is the contract between product intent and tests.

1. Add or edit the feature entry first (id, acceptance lines, viewports).
   Status `planned`.
2. Implement. Flip to `in-progress`.
3. Write/extend a test tagged with the id — `{ tag: '@F-0NN' }` in Playwright
   or `[@F-0NN]` in a Vitest test name — covering each acceptance line.
4. Run `npm run check`. Flip to `done`.

`tests/unit/feature-list.test.ts` fails if a `done` feature has no tagged
test, if ids are duplicated, or if a tag in a test has no feature. Use the
`feature-tracking` skill for the exact steps.

## DOM contract used by the tests

Keep these stable (or update the tests and feature list in the same change):

- `header[data-testid="site-header"]`, `nav[aria-label="Primary"]`,
  `a[data-nav-link]` with `aria-current="true"` on the active section
- `button[data-testid="menu-toggle"]` + `#mobile-menu`
- `button[data-testid="theme-toggle"]`, `html[data-theme]`
- `a[data-testid="resume-link"]` → `/Pooria-Rajabzadeh-Resume.pdf`
- `main#main`, sections `#top #about #experience #work #skills #contact`
- `[data-reveal]` on every animated wrapper, `[data-testid="hero-stats"]`

## Skills (`.claude/skills/`)

| Skill | Use it when |
| --- | --- |
| `responsive-tests` | Writing or debugging viewport tests; reviewing screenshots |
| `static-export` | Build fails, or you're about to add something server-ish |
| `content-update` | A new résumé or any copy change |
| `add-section` | Adding a page section end to end |
| `a11y-audit` | Before a PR, or when axe fails |
| `deploy-pages` | GitHub Pages / basePath / CI questions |
| `feature-tracking` | Maintaining `feature_list.json` |
| `code-review` | Before every PR (applies `.cursor/BUGBOT.md`) |
| `open-pr` | Creating the PR |

## Working conventions

- `.cursor/rules/` — code style, **exact version pinning** (no `^`/`~`),
  PR conventions. `scripts/check-pins.mjs` enforces the pins; a
  `PostToolUse` hook in `.claude/settings.json` runs it after any
  `package.json` edit.
- `.cursor/BUGBOT.md` — review priorities.
- Content must match the résumé in `public/Pooria-Rajabzadeh-Resume.pdf`.
  When the résumé changes, run the `content-update` skill — don't edit copy
  ad hoc.
- Do not invent data. If something is unknown (a date, a metric, a URL),
  leave it out or ask — never fabricate. There are intentionally no
  testimonials or project screenshots until real ones exist.
- `SITE_URL` in `src/data/site.ts` is the production origin used for
  metadata, robots and sitemap. Update it when the domain changes.
