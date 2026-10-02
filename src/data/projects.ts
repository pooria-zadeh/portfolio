import type { Project } from './types';

/**
 * Selected work. The first three are the headline outcomes from each role in
 * the résumé; the last is this site, which doubles as a working example of
 * the AI-assisted workflow described in the résumé.
 */
export const projects: Project[] = [
  {
    slug: 'tali-platform',
    kind: 'Work · Tali.ai',
    status: 'Live',
    title: 'Clinical documentation platform',
    description:
      'Web platform for an AI assistant used by clinicians. Owned the Next.js 15 migration with no customer-facing downtime, built the observability layer for sign-in flows, and shipped AI-assisted code review into GitHub Actions.',
    outcomes: [
      '50% faster first contentful paint',
      'Sign-in failure detection cut from hours to minutes',
      '~35% faster feature turnaround with team-wide AI tooling',
    ],
    stack: ['Next.js 15', 'TypeScript', 'Nx', 'Storybook', 'Playwright', 'BigQuery'],
    href: 'https://tali.ai',
  },
  {
    slug: 'digikala-storefront',
    kind: 'Work · Digikala',
    status: 'Live',
    title: 'Storefront refactor at 10M-user scale',
    description:
      'Refactored a legacy jQuery storefront serving 10M users to React, and built the internal component library with Rollup and tree shaking — documented in Storybook and adopted across product teams.',
    outcomes: ['40% faster page load, recurring downtime removed', '~25% smaller shared bundle across products'],
    stack: ['React', 'Rollup', 'Storybook'],
    href: 'https://www.digikala.com',
  },
  {
    slug: 'apsy-codegen',
    kind: 'Work · Apsy.io',
    status: 'Live',
    title: 'Design-to-code automation',
    description:
      'A Flask service generating UI code from Adobe XD exports, the platform’s Azure CI/CD release pipeline, and the company site in Next.js with incremental static regeneration and an embedded Adobe XD preview.',
    outcomes: ['Manual releases replaced by an automated pipeline', '30% faster new-project start-up'],
    stack: ['Next.js', 'Flask', 'Azure Pipelines', 'Adobe XD'],
    href: 'https://apsy.io',
  },
  {
    slug: 'portfolio',
    kind: 'Personal project',
    status: 'In progress',
    title: 'This site — an AI-assisted static build',
    description:
      'Statically exported Next.js portfolio built with Claude Code: a feature ledger that the test suite enforces, a Playwright responsive and accessibility harness, Cursor rules and Claude skills checked into the repo.',
    outcomes: ['Every feature tied to a tagged test', 'Responsive matrix from 320px to 1920px in CI'],
    stack: ['Next.js 16', 'Tailwind CSS 4', 'Playwright', 'Vitest', 'GitHub Pages', 'Claude Code'],
  },
];
