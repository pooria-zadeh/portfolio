# Bugbot review guidance — portfolio (root)

Public personal portfolio site (Next.js App Router). This file applies to
every PR. Adapted from tali-central's BUGBOT.md; the PHI/tenancy sections
don't apply here — this repo has no user data at all.

## Priorities

- P0 (blocking): hardcoded secrets or tokens, XSS via
  `dangerouslySetInnerHTML` or unescaped user-controlled strings, broken
  production build, dependency added with a floating version range.
- P1 (blocking): accessibility regressions (missing alt text, unlabeled
  interactive elements, focus traps, animation ignoring
  `prefers-reduced-motion`), broken links to the résumé PDF or social
  profiles, client components that could be server components for no reason,
  layout shift introduced by unsized media.
- P2 (non-blocking): copy drift between `src/data/site.ts` and the résumé,
  missing `rel="noreferrer"` on external links, unused exports, TODO
  placeholders accidentally removed instead of resolved.
- Style, formatting, and naming are not Bugbot's job — ESLint owns those.

## Repo-specific checks

- All copy changes go through `src/data/site.ts`, never inline in
  components.
- `TODO(pooria)` markers are contract: placeholder content (testimonials,
  project screenshots, the production domain) must either stay clearly
  marked or be replaced with real data — never silently "improved" into
  invented data.
- Any new animation must collapse gracefully under
  `prefers-reduced-motion` (follow `Reveal.tsx`).
