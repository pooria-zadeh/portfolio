---
description: PR title format and body expectations
alwaysApply: false
---

# Pull Request Conventions

Adapted from tali-central's PR conventions.

## Titles

- Start with `feat:`, `fix:`, or `chore:` — optional scope allowed:
  `feat(hero):`, `fix(a11y):`.
- Imperative mood, under 72 characters, no trailing period.

## Bodies

- **What** changed and **why**, written so someone outside the project can
  follow it.
- List user-visible changes separately from internal refactors.
- Name how the change was verified (build, lint, manual check at which
  viewport sizes).
- The body must match the actual diff — re-read the full branch diff before
  opening or updating the PR (the description-fidelity gate).

## Branches

- `main` is protected in spirit: work on feature branches, integrate via PR.
