import { site } from './site';
import type { Cta, Stat } from './types';

export const hero = {
  eyebrow: `${site.shortRole} · ${site.shortLocation}`,
  /** Tightened from the résumé's Professional Summary. */
  pitch:
    'I ship web, mobile and platform products end to end — and build the logging, dashboards and AI tooling that keep them reliable.',
  availability: site.availability,
  ctas: [
    { href: '#work', label: 'View work', variant: 'primary' },
    { href: '#contact', label: 'Get in touch', variant: 'secondary' },
  ] satisfies Cta[],
  stats: [
    {
      figure: '8+',
      label: 'years shipping production software',
      source: 'Professional Summary — "8+ years shipping web, mobile and platform products"',
    },
    {
      figure: '70%',
      label: 'fewer repeat authentication failures',
      source: 'Tali.ai — "cutting repeat authentication failures by roughly 70%"',
    },
    {
      figure: '50%',
      label: 'faster first contentful paint',
      source: 'Tali.ai — "Migrated the platform to Next.js 15 … cutting first contentful paint by 50%"',
    },
    {
      figure: '10M',
      label: 'users on the storefront moved from jQuery to React',
      source: 'Digikala — "Refactored a legacy jQuery product serving 10M users to React"',
    },
  ] satisfies Stat[],
  scrollCue: { href: '#about', label: 'Scroll to About' },
} as const;
