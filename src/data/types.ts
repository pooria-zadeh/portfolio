/** Shared content types. Data files in src/data/* conform to these; components render them. */

export type SectionId = 'about' | 'experience' | 'work' | 'skills' | 'contact';

export interface SectionMeta {
  id: SectionId;
  /** Two-digit index shown beside the title ("01"). */
  number: string;
  /** Small mono label above the title ("Profile"). */
  eyebrow: string;
  /** The h2. */
  title: string;
  /** Label used in the header nav and mobile menu. */
  navLabel: string;
}

export interface NavItem {
  href: `#${SectionId}`;
  label: string;
}

export type SocialId = 'github' | 'linkedin' | 'stackoverflow' | 'email';

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

export interface Stat {
  figure: string;
  label: string;
  /** Which résumé line the number comes from — keeps stats honest. */
  source: string;
}

export interface Cta {
  href: string;
  label: string;
  variant: 'primary' | 'secondary';
}

export interface Role {
  company: string;
  title: string;
  /** One-line description of the employer/product, from the résumé. */
  tagline: string;
  /** "Apr 2023" */
  start: string;
  /** "Apr 2023" or "Present" */
  end: string;
  current?: boolean;
  href?: string;
  bullets: string[];
  stack: string[];
}

export interface Project {
  slug: string;
  /** "Work · Tali.ai", "Personal project" */
  kind: string;
  status?: string;
  title: string;
  description: string;
  outcomes: string[];
  stack: string[];
  href?: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}
