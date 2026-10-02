import type { NavItem, SectionMeta, SocialLink } from './types';

/**
 * Production origin for metadata, robots and the sitemap. Defaults to the
 * GitHub Pages user site for the GitHub account in `site.links`; override
 * with NEXT_PUBLIC_SITE_URL when a custom domain exists.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lordpooria.github.io').replace(/\/$/, '');

export const site = {
  name: 'Pooria Rajabzadeh',
  initials: 'PR',
  role: 'Senior Software Developer — Full Stack',
  shortRole: 'Senior Software Developer',
  location: 'Waterloo, ON, Canada',
  shortLocation: 'Waterloo, ON',
  email: 'p.rajabzadeh92@gmail.com',
  phone: '+1 (519) 573-0793',
  availability: 'Open to senior and lead roles',
  resumeHref: '/Pooria-Rajabzadeh-Resume.pdf',
  /** Mirrors the résumé's Professional Summary — keep the two in sync. */
  summary:
    'Senior software developer with 8+ years shipping web, mobile and platform products end to end, deep in React, Next.js and TypeScript with backend work in Nest.js, Node and Python. Owns reliability as much as features: builds the logging, dashboards and alerting that catch authentication failures before users report them, and has worked through tens of production incidents from detection to postmortem. Uses AI development tooling — Claude Code, Cursor and Codex — daily, and builds the rules and automation that make it dependable for a whole team.',
  links: {
    github: 'https://github.com/lordpooria',
    linkedin: 'https://www.linkedin.com/in/pooria-rajabzadeh/',
    stackoverflow: 'https://stackoverflow.com/users/10138279/lord-pooria',
  },
} as const;

/**
 * The page's sections, in order. Nav, scrollspy, numbering and the test
 * suite all derive from this array — register a section here first.
 */
export const sections: SectionMeta[] = [
  { id: 'about', number: '01', eyebrow: 'Profile', title: 'About', navLabel: 'About' },
  { id: 'experience', number: '02', eyebrow: 'Timeline', title: 'Experience', navLabel: 'Experience' },
  { id: 'work', number: '03', eyebrow: 'Selected work', title: 'Projects', navLabel: 'Work' },
  { id: 'skills', number: '04', eyebrow: 'Toolkit', title: 'Skills & Education', navLabel: 'Skills' },
  { id: 'contact', number: '05', eyebrow: 'Say hello', title: 'Get in touch', navLabel: 'Contact' },
];

export const nav: NavItem[] = sections.map((s) => ({ href: `#${s.id}`, label: s.navLabel }));

export function getSection(id: SectionMeta['id']): SectionMeta {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Section "${id}" is not registered in src/data/site.ts`);
  return section;
}

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: site.links.github },
  { id: 'linkedin', label: 'LinkedIn', href: site.links.linkedin },
  { id: 'stackoverflow', label: 'Stack Overflow', href: site.links.stackoverflow },
  { id: 'email', label: 'Email', href: `mailto:${site.email}` },
];
