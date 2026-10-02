---
name: deploy-pages
description: Deploy the static export to GitHub Pages and keep CI green — the two workflows in .github/workflows, basePath for project pages vs user pages, custom domain, cache and Playwright browsers in CI. Use for any deployment, domain, or CI question.
---

# Deploy to GitHub Pages

Two workflows:

- `.github/workflows/ci.yml` — on PR and push: `npm ci`, lint, typecheck,
  unit tests, build, Playwright (chromium) against `out/`; uploads
  `playwright-report/` as an artifact.
- `.github/workflows/deploy-pages.yml` — on push to `main`: build, upload
  `out/` with `actions/upload-pages-artifact`, deploy with
  `actions/deploy-pages`. Requires **Settings → Pages → Source: GitHub
  Actions** once.

## User site vs project site

| Repo name | URL | `basePath` |
| --- | --- | --- |
| `<user>.github.io` | `https://<user>.github.io/` | none (current setup) |
| anything else | `https://<user>.github.io/<repo>/` | `basePath: '/<repo>'` |

For a project site set `NEXT_PUBLIC_BASE_PATH=/<repo>` in the deploy
workflow; `next.config.ts` reads it into `basePath`/`assetPrefix`, and
`src/lib/paths.ts → withBasePath()` must wrap any hand-written `/public`
URL (the résumé link does this).

## Custom domain

1. Add `public/CNAME` containing the domain (copied into `out/`).
2. Point DNS (`A`/`AAAA` to GitHub Pages IPs or `CNAME` to
   `<user>.github.io`).
3. Update `SITE_URL` in `src/data/site.ts` so metadata/robots/sitemap use it.

## Local dry run

```bash
npm run build && npm run serve      # :3100 — same path semantics as Pages
```

## CI notes

- Exact pins + `npm ci` — never `npm install` in CI.
- `npx playwright install --with-deps chromium` before e2e.
- Node version in workflows must match `engines.node` in `package.json`.
- Fonts: `next/font/google` downloads at build; if GitHub's runner can't
  reach Google Fonts the build fails — self-host as the fallback (see
  `static-export`).
