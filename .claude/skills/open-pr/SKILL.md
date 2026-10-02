---
name: open-pr
description: Create GitHub pull requests with the gh CLI for this repo. Enforce PR titles starting with feat:, fix:, or chore: (optional scopes like feat(hero):), and fidelity-check the body against the complete live branch diff before every create or update.
---

# Open PR

Adapted from tali-central's `open-pr` skill (the Factory/runbook layers
don't exist in this repo; the conventions do).

## Steps

1. Run the `code-review` skill first — the branch must be clean.
2. Verify the branch: all intended changes committed, `npm run check`
   passes locally.
3. Title per `.cursor/rules/pull-request-conventions.md` —
   `feat:` / `fix:` / `chore:`, optional scope, imperative, ≤72 chars.
4. Body: what + why, user-visible changes vs. internal ones, which
   `feature_list.json` ids changed status, and how it was verified (which
   viewports, which test files).
5. **Description-fidelity gate**: before `gh pr create` or `gh pr edit`,
   re-read the complete branch diff and confirm the body describes it
   accurately — nothing claimed that isn't in the diff, nothing in the
   diff left unmentioned.
6. Create with `gh pr create`. This skill creates the PR and stops — CI
   (`ci.yml`) runs the gate; it does not babysit CI or review.
