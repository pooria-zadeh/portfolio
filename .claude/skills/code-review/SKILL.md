---
name: code-review
description: Run a pre-PR code review against the repo's .cursor/BUGBOT.md guidance, fix every valid finding, and repeat until the branch is clean before creating or updating a PR.
---

# Code Review

Adapted from tali-central's `code-review` skill for this single-app repo.

Use this skill before creating or updating a pull request, and whenever the
user asks for a code review.

## What This Skill Does

1. Reviews the full branch diff against the base branch, not just the
   latest commit.
2. Loads `.cursor/BUGBOT.md` and applies its P0/P1/P2 priorities.
3. Finds all concrete issues before editing anything.
4. Fixes every valid finding that can be handled safely.
5. Repeats the review after fixes until no valid findings remain.
6. Reports what was reviewed, fixed, and verified — and what remains
   blocked if clarification is required.

## Review Checklist (this repo)

- `npm run check` passes (lint, typecheck, unit, pins, build, e2e).
- No hardcoded secrets; no floating dependency ranges
  (`scripts/check-pins.mjs`).
- Static-export safe: nothing from the `static-export` skill's
  "not available" list.
- Accessibility: labelled controls, focus states, `prefers-reduced-motion`
  respected by any animation, axe green in both themes (`a11y-audit`).
- Copy lives in `src/data/*`, not inline in components; content matches the
  résumé PDF in `public/`.
- Both themes complete: any new token exists under `[data-theme="dark"]`
  and `[data-theme="light"]`.
- `feature_list.json` updated: new behaviour has an entry and tagged tests;
  statuses honest.
- No invented data (testimonials, metrics, screenshots).

## When Not To Use

- Style-only requests — ESLint owns formatting.
- Dependency CVE triage — that belongs to `npm audit` / Dependabot.
