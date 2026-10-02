---
name: static-export
description: Build, serve and troubleshoot the Next.js static export (output export → out/) for this portfolio. Use when `npm run build` fails, when adding anything that might need a server (images, metadata routes, dynamic segments), or before deploying to GitHub Pages.
---

# Static export

`next.config.ts` sets `output: 'export'` and `images.unoptimized: true`.
`npm run build` writes `out/`; `npm run serve` serves it on :3100 with
`scripts/serve-static.mjs` (zero dependencies, mimics GitHub Pages:
`/foo` → `foo.html` → `foo/index.html`, 404 → `404.html`).

## Checklist before adding a feature

Read `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`
("Unsupported Features") first. In short, **not available**:

- Route handlers that read the request, `headers()`, `cookies()`,
  `redirect()`/`rewrites` in config, middleware/proxy, ISR, Server Actions,
  `draftMode`.
- Dynamic routes without `generateStaticParams`.
- `next/image` default loader (we set `unoptimized`; use plain sized
  `<img>` or `next/image` with explicit width/height).

**Available**: Server Components (run at build), `metadata`, `robots.ts`,
`sitemap.ts`, `opengraph-image.tsx` (generated at build), `next/font`,
client components, Tailwind.

## Verify an export

```bash
npm run build
ls out/                      # index.html robots.txt sitemap.xml _next/ Pooria-Rajabzadeh-Resume.pdf .nojekyll
npm run serve &              # :3100
curl -sI localhost:3100/ | head -1
curl -sI localhost:3100/Pooria-Rajabzadeh-Resume.pdf | grep -i content-type
```

`tests/e2e/features.spec.ts` (`@F-001`) checks the same things; run
`npm run test:e2e:quick` after a build.

## Common failures

| Symptom | Cause / fix |
| --- | --- |
| `Page "/x" is missing "generateStaticParams()"` | Dynamic segment — add it or make the route static |
| `export const dynamic = "force-dynamic"` error | Remove it; nothing may be dynamic |
| Fonts fail to download at build | `next/font/google` needs network; retry, or self-host under `public/fonts` with `next/font/local` |
| `_next/` 404 on GitHub Pages | Missing `public/.nojekyll` |
| Assets 404 on a project-pages URL | Set `basePath`/`assetPrefix` — see `deploy-pages` skill |
