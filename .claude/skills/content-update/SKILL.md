---
name: content-update
description: Update the portfolio's content from a new résumé PDF or a copy change — extract the PDF, map it onto src/data/*.ts, keep hero stats and metadata in sync, run the content tests. Use when the user shares a new résumé or asks to change wording, roles, skills, projects or links.
---

# Content update

All copy lives in `src/data/`. Components render data; they never own text.

| File | Holds |
| --- | --- |
| `site.ts` | name, role, location, email, phone, availability, links, `SITE_URL`, `sections` (id/number/eyebrow/title) |
| `hero.ts` | eyebrow, pitch, CTAs, stats |
| `about.ts` | headline, summary paragraphs, focus areas |
| `experience.ts` | roles: company, title, tagline, dates, location, current, bullets, stack |
| `projects.ts` | projects: kind, status, title, description, outcomes, stack, href |
| `skills.ts` | skill groups (mirror the résumé's CORE SKILLS boxes) |
| `education.ts` | degrees, languages |

## Steps

1. **Extract the PDF** (no system poppler needed):
   ```bash
   python3 -m pip install --quiet --target /tmp/pylib pypdf
   PYTHONPATH=/tmp/pylib python3 -c "import pypdf,sys;r=pypdf.PdfReader(sys.argv[1]);print('\n'.join(p.extract_text() for p in r.pages))" "<resume.pdf>"
   ```
   Multi-column PDFs extract out of order — re-assemble bullets under the
   right employer by date before mapping.
2. **Copy the PDF** to `public/Pooria-Rajabzadeh-Resume.pdf` (keep the
   filename; the header link and tests depend on it).
3. **Map onto data files.** Rules:
   - Mirror the résumé's wording; tighten for the web but never add claims,
     metrics or technologies that aren't in the résumé.
   - Roles the résumé dropped are dropped from the site. Say so in the recap.
   - `hero.stats` are headline numbers that appear verbatim in the résumé
     (years, %, user counts). Each stat gets a short label and a `source`
     comment naming the bullet it comes from.
   - `skills.ts` groups follow the résumé's skill boxes one-to-one.
   - Dates: `Mon YYYY — Mon YYYY` or `Mon YYYY — Present`; set
     `current: true` on exactly one role.
4. **Metadata** derives from `site.ts` (`name`, `role`, `summary`) — nothing
   to edit elsewhere. Update `SITE_URL` if the domain changed.
5. **Run the gate**: `npm run test:unit` (placeholders, link validity,
   nav/sections) then `npm run test:e2e` (rendered content). Fix data, not
   tests, unless the DOM contract genuinely changed.
6. **Feature list**: content-only changes don't need a new entry. A new
   *kind* of content (e.g. talks, testimonials) does — use `add-section`.
7. Update the session log: what changed, and anything dropped or ambiguous
   that the operator should confirm.

## Never

- Invent testimonials, screenshots, metrics or employer descriptions.
- Put copy in a component or a className.
- Leave `TODO(` / `[Placeholder` strings in `src/data` — the unit test fails.
