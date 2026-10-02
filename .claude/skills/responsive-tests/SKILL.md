---
name: responsive-tests
description: Write, run and debug the Playwright responsive test matrix (320–1920px) for this static Next.js portfolio — overflow checks, breakpoint behaviour, touch targets, per-viewport screenshots, reduced-motion pass. Use when a layout changes, a viewport test fails, or before a PR that touches CSS/markup.
---

# Responsive tests

The matrix lives in `feature_list.json → viewports` and is read by
`tests/helpers/viewports.ts`. `tests/e2e/responsive.spec.ts` runs every
check at every viewport; `tests/e2e/features.spec.ts` holds behaviour tests
that pick specific viewports.

## Run

```bash
npm run test:responsive            # builds out/ first? no — run build once:
npm run build && npm run test:responsive
E2E_BASE_URL=http://localhost:3000 npx playwright test tests/e2e/responsive.spec.ts   # against dev server
npx playwright test --ui           # interactive
npx playwright show-report         # last HTML report (screenshots attached per viewport)
```

## What the matrix asserts (per viewport)

1. **No horizontal overflow** — `scrollWidth <= clientWidth` and no visible
   element's right edge beyond the viewport (+1px tolerance). The failure
   message lists the offending selectors; fix the widest one first.
2. **Breakpoint behaviour** — desktop nav visible and menu toggle hidden at
   ≥768px; the reverse below.
3. **Hero fits** — the `h1` bounding box is inside the viewport.
4. **Touch targets** — on mobile widths every header `a`/`button` is ≥40×40.
5. **Gutter** — `main` content starts ≥16px from the left edge on mobile.
6. **Full-page screenshot** attached to the report (taken with reduced
   motion so all reveals are visible). Review these by eye after any
   layout change — the assertions catch overflow, not ugliness.

## Writing a new viewport test

```ts
import { test, expect } from '@playwright/test';
import { VIEWPORTS, isMobile } from '../helpers/viewports';

for (const vp of VIEWPORTS) {
  test(`chips wrap @ ${vp.name}`, { tag: ['@F-007'] }, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('/');
    // …
  });
}
```

- Tag every test with the feature id(s) it proves (`@F-0NN`). The unit test
  `feature-list.test.ts` cross-checks tags against `feature_list.json`.
- Prefer `page.setViewportSize` inside the test over Playwright projects —
  one Chromium project keeps CI fast.
- Use `toBeVisible()` / `toBeHidden()` for breakpoint checks, not CSS class
  assertions.
- Avoid pixel snapshots (`toHaveScreenshot`) — they are font/OS dependent.
  Attach screenshots for humans instead: `testInfo.attach(name, { body, contentType: 'image/png' })`.

## Debugging an overflow failure

1. Read the offenders list in the failure message.
2. Reproduce in the built-in browser at that width (`resize_window` with
   `width`/`height`), inspect the element.
3. Usual culprits: long unbroken strings (add `break-words`/`min-w-0`),
   fixed widths in px, flex children without `min-w-0`, `100vw` (use `100%`),
   grids without `minmax(0, 1fr)`, decorative absolutely-positioned glows
   (clip them with `overflow-hidden` on the section).
4. Re-run just that viewport: `npx playwright test -g "mobile-s"`.

## Adding a viewport

Add it to `feature_list.json → viewports`; the helper picks it up. Keep the
widest at 1920 and the narrowest at 320 — those are the two that break.
