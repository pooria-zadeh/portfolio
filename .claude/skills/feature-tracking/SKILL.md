---
name: feature-tracking
description: Maintain feature_list.json — the ledger linking product features to tagged Playwright/Vitest tests. Use when adding a feature, changing acceptance criteria, flipping a status, or when tests/unit/feature-list.test.ts fails.
---

# Feature tracking

`feature_list.json` is the single list of what the site does. Each entry:

```json
{
  "id": "F-021",
  "area": "writing",
  "title": "Articles section",
  "description": "…",
  "status": "planned | in-progress | done",
  "acceptance": ["observable, testable statements"],
  "viewports": ["mobile", "desktop"],
  "tests": ["@F-021"]
}
```

## Invariants (enforced by `tests/unit/feature-list.test.ts`)

- ids are unique, sequential `F-0NN`, and `tests` contains `@<id>`.
- Every `done` feature has ≥1 test tagged with its id somewhere under
  `tests/` (`{ tag: '@F-021' }` in Playwright, `[@F-021]` in a Vitest name).
- Every `@F-…` tag found in `tests/` refers to an existing feature.
- `viewports` only names keys of the `viewports` map.
- `status` is one of the three values.

## Lifecycle

1. **planned** — entry written before code. Acceptance lines are the spec.
2. **in-progress** — code landing; tests may be partial.
3. **done** — all acceptance lines covered by passing tagged tests, and
   `npm run check` is green.

Flip statuses with a small edit, not a rewrite:

```bash
node -e "
const fs=require('fs');const f='feature_list.json';const j=JSON.parse(fs.readFileSync(f));
for(const x of j.features) if(['F-021'].includes(x.id)) x.status='done';
fs.writeFileSync(f, JSON.stringify(j,null,2)+'\n');"
```

## Running only one feature's tests

```bash
npx playwright test --grep "@F-003"
npx vitest run -t "@F-018"
```

## Removing a feature

Delete the entry **and** its tagged tests in the same change; set a
`"removed": "<yyyy-mm-dd> reason"` note in the session log, not in the JSON.
