---
name: add-section
description: Add a new page section to the portfolio end to end — data file, section component, registration in sections[], nav/scrollspy, feature_list.json entry and tagged tests. Use when asked to add a section such as talks, writing, testimonials, or open source.
---

# Add a section

Sections are data-driven: registering one in `src/data/site.ts → sections`
gives it a nav link, scrollspy, a numbered heading and test coverage.

## Steps

1. **Feature first.** Append an entry to `feature_list.json` (`F-0NN`,
   status `planned`, acceptance lines, viewports). See `feature-tracking`.
2. **Data.** Create `src/data/<section>.ts` exporting a typed array/object
   (types in `src/data/types.ts`), and re-export from `src/data/index.ts`.
   Real content only — no placeholders.
3. **Register.** Add `{ id: '<id>', number: '06', eyebrow: 'Writing', title: 'Articles', navLabel: 'Writing' }`
   to `sections` in `src/data/site.ts` at the position it should appear.
   Keep numbers sequential; `tests/unit/content.test.ts` checks that.
4. **Component.** `src/components/sections/<Name>.tsx` (Server Component
   unless it needs state):
   ```tsx
   import { Section } from '@/components/ui/Section';
   import { SectionHeading } from '@/components/ui/SectionHeading';
   import { Reveal } from '@/components/ui/Reveal';
   import { getSection } from '@/data';

   export function Articles() {
     const section = getSection('articles');
     return (
       <Section id={section.id}>
         <Reveal><SectionHeading section={section} /></Reveal>
         …
       </Section>
     );
   }
   ```
   Use `Chip`, `Card`, `Button` from `components/ui` — don't restyle.
   Wrap animated blocks in `Reveal` (adds `data-reveal`).
5. **Mount** it in `src/app/page.tsx` in section order.
6. **Tests.** Add a tagged test in `tests/e2e/features.spec.ts` (renders
   every data item; layout at mobile + desktop) and, if the section has
   links, assert `rel="noreferrer"`. The responsive matrix and axe cover
   the section automatically.
7. `npm run check`, then flip the feature to `done`.
8. If the section introduces a new colour or token, add it to **both**
   themes in `globals.css` and to `@theme inline`.

## Don'ts

- Don't hardcode the section number or title in the component.
- Don't add a nav link by hand — it derives from `sections`.
- Don't use `next/image` optimisation (static export) — plain `<img>` with
  width/height, or `next/image` with `unoptimized`.
