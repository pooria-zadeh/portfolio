import type { SkillGroup } from './types';

/** One group per CORE SKILLS box in the résumé. */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Storybook', 'Tiptap', 'Rollup'],
  },
  {
    name: 'Backend & Data',
    items: ['Nest.js', 'Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'BigQuery', 'AWS', 'Flask'],
  },
  {
    name: 'Reliability & Observability',
    items: [
      'BigQuery dashboards',
      'Structured logging',
      'Threshold alerting',
      'Slack alert pipelines',
      'Incident response',
    ],
  },
  {
    name: 'AI Tooling',
    items: ['Claude Code', 'Cursor', 'Codex', 'AI-assisted review', 'Test generation', 'CI review agents', 'Team-wide rules'],
  },
  {
    name: 'Testing & Delivery',
    items: ['Playwright', 'Nx monorepo', 'CI/CD', 'GitHub Actions', 'Azure Pipelines'],
  },
  {
    name: 'Performance',
    items: ['Core Web Vitals', 'Server-side rendering', 'SEO', 'Segment', 'Mixpanel'],
  },
];
