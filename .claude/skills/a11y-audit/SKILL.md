---
name: a11y-audit
description: Run and interpret the accessibility gate for this portfolio — axe-core via Playwright in both themes and widths, keyboard pass (skip link, menu, focus rings), reduced-motion pass, contrast of gradient text. Use before a PR, when `test:a11y` fails, or when adding interactive UI.
---

# Accessibility audit

## Automated

```bash
npm run build && npm run test:a11y        # axe at mobile+desktop × dark+light
npx playwright test -g "reduced motion"   # motion collapses correctly
```

`tests/e2e/a11y.spec.ts` fails on any **serious** or **critical** axe
violation and prints `id — help — first target`. Moderate/minor are listed
as an attachment; fix them when cheap.

## Manual keyboard pass (built-in browser, ~2 minutes)

1. Load `/`, press Tab once → "Skip to content" appears top-left; Enter
   lands in `main`.
2. Tab through the header: logo, nav links, theme toggle, résumé. Every
   stop shows a visible ring (`focus-visible` ring token).
3. At 375px: Tab to the menu toggle, Enter opens, focus moves inside, Tab
   cycles the links, Esc closes and focus returns to the toggle.
4. Theme toggle: name flips between "Switch to light theme" / "…dark theme".
5. `prefers-reduced-motion` (resize_window colorScheme + OS setting, or
   Playwright `reducedMotion: 'reduce'`): no fade-ins, no smooth scrolling.

## Common findings and fixes

| axe id | Fix |
| --- | --- |
| `color-contrast` on `text-secondary`/chips | Tune the `--color-secondary` token for the failing theme (not the component) |
| `color-contrast` on gradient `h1` | axe can't read gradients; ensure the fallback `color` is high contrast and leave `-webkit-text-fill-color` for the gradient |
| `link-name` / `button-name` | Icon-only controls need `aria-label`; decorative SVG gets `aria-hidden` |
| `region` | Content outside landmarks — keep everything in header/main/footer |
| `heading-order` | One `h1` (hero), `h2` per section, `h3` for cards |
| `landmark-unique` | Two `<nav>`s need distinct `aria-label`s (Primary / Mobile / Social) |

## Rules of thumb for new UI

- Real `<a>`/`<button>` — never `div onClick`.
- Decorative glows, grids, bracket corners: `aria-hidden`.
- Minimum 40×40px hit area on touch widths (the responsive matrix checks
  header controls).
- Anything that moves must check `useReducedMotion()` or the media query.
