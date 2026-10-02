import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  about,
  education,
  experience,
  hero,
  languages,
  nav,
  projects,
  sections,
  site,
  skillGroups,
  socialLinks,
} from '@/data';

const PLACEHOLDER = /TODO\(|\[Placeholder|lorem ipsum|\bTBD\b/i;
const MONTH_YEAR = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}

describe('content integrity [@F-018]', () => {
  const everything = { site, hero, about, experience, projects, skillGroups, education, languages };

  it('contains no placeholder strings', () => {
    const offenders = strings(everything).filter((s) => PLACEHOLDER.test(s));
    expect(offenders).toEqual([]);
  });

  it('has a valid email and https links', () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    for (const href of Object.values(site.links)) expect(href).toMatch(/^https:\/\//);
    for (const link of socialLinks) expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    for (const p of projects) if (p.href) expect(p.href).toMatch(/^https:\/\//);
  });

  it('points the résumé link at a file in public/', () => {
    expect(site.resumeHref).toMatch(/^\/.+\.pdf$/);
    expect(existsSync(join(process.cwd(), 'public', site.resumeHref))).toBe(true);
  });

  it('describes every role completely, with exactly one current role', () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const role of experience) {
      expect(role.bullets.length, role.company).toBeGreaterThan(0);
      expect(role.stack.length, role.company).toBeGreaterThan(0);
      expect(role.start, role.company).toMatch(MONTH_YEAR);
      expect(role.end === 'Present' || MONTH_YEAR.test(role.end), `${role.company} end`).toBe(true);
    }
    expect(experience.filter((r) => r.current)).toHaveLength(1);
    expect(experience.find((r) => r.current)?.end).toBe('Present');
  });

  it('gives every project a unique slug and a stack', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of projects) {
      expect(p.stack.length, p.slug).toBeGreaterThan(0);
      expect(p.description.trim(), p.slug).not.toBe('');
    }
  });

  it('has non-empty, de-duplicated skill groups', () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const group of skillGroups) {
      expect(group.items.length, group.name).toBeGreaterThan(0);
      expect(new Set(group.items).size, group.name).toBe(group.items.length);
    }
  });

  it('cites a source for every hero stat', () => {
    expect(hero.stats.length).toBeGreaterThanOrEqual(3);
    for (const stat of hero.stats) {
      expect(stat.figure.trim()).not.toBe('');
      expect(stat.label.trim()).not.toBe('');
      expect(stat.source.trim()).not.toBe('');
    }
  });

  it('has education and languages', () => {
    expect(education.length).toBeGreaterThan(0);
    expect(languages.length).toBeGreaterThan(0);
    expect(about.focusAreas.length).toBeGreaterThan(0);
  });
});

describe('sections and navigation [@F-020] [@F-018]', () => {
  it('numbers sections sequentially from 01', () => {
    sections.forEach((section, i) => {
      expect(section.number).toBe(String(i + 1).padStart(2, '0'));
      expect(section.id).toMatch(/^[a-z-]+$/);
      expect(section.title.trim()).not.toBe('');
      expect(section.eyebrow.trim()).not.toBe('');
    });
    expect(new Set(sections.map((s) => s.id)).size).toBe(sections.length);
  });

  it('derives the nav from the sections, in order', () => {
    expect(nav.map((n) => n.href)).toEqual(sections.map((s) => `#${s.id}`));
    expect(nav.map((n) => n.label)).toEqual(sections.map((s) => s.navLabel));
  });
});
