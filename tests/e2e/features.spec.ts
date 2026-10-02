import { expect, test } from '@playwright/test';
import { about } from '../../src/data/about';
import { education, languages } from '../../src/data/education';
import { experience } from '../../src/data/experience';
import { hero } from '../../src/data/hero';
import { projects } from '../../src/data/projects';
import { sections, site, socialLinks } from '../../src/data/site';
import { skillGroups } from '../../src/data/skills';
import { viewport } from '../helpers/viewports';

const MOBILE = viewport('mobile');
const LAPTOP = viewport('laptop');

test.describe('static export artifacts', () => {
  test('serves the pages the export must contain', { tag: ['@F-001', '@F-015'] }, async ({ request }) => {
    for (const path of ['/', '/robots.txt', '/sitemap.xml', '/.nojekyll']) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toMatch(/sitemap:\s*\S+\/sitemap\.xml/i);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('<urlset');
  });

  test('résumé PDF downloads', { tag: ['@F-001', '@F-017'] }, async ({ page, request }) => {
    await page.goto('/');
    const link = page.getByTestId('site-header').getByTestId('resume-link');
    await expect(link).toHaveAttribute('href', /Pooria-Rajabzadeh-Resume\.pdf$/);
    await expect(link).toHaveAccessibleName(/r[ée]sum[ée]/i);
    const res = await request.get((await link.getAttribute('href'))!);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
  });
});

test.describe('header & navigation', () => {
  test.use({ viewport: LAPTOP });

  test('nav links target declared sections', { tag: ['@F-002'] }, async ({ page }) => {
    await page.goto('/');
    const links = page.getByRole('navigation', { name: 'Primary' }).locator('a[data-nav-link]');
    await expect(links).toHaveCount(sections.length);
    const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    expect(hrefs).toEqual(sections.map((s) => `#${s.id}`));
    const missing = await page.evaluate(
      (ids) => ids.filter((id) => !document.getElementById(id)),
      sections.map((s) => s.id),
    );
    expect(missing).toEqual([]);
  });

  test('header gains a backdrop once scrolled', { tag: ['@F-002'] }, async ({ page }) => {
    await page.goto('/');
    const header = page.getByTestId('site-header');
    await expect(header).toHaveAttribute('data-scrolled', 'false');
    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveAttribute('data-scrolled', 'true');
  });

  test('scrollspy marks the section in view', { tag: ['@F-016'] }, async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.getElementById('skills')!.scrollIntoView());
    const active = page.locator('a[data-nav-link][aria-current="true"]');
    await expect(active).toHaveCount(1);
    await expect(active).toHaveAttribute('href', '#skills');

    await page.evaluate(() => document.getElementById('experience')!.scrollIntoView());
    await expect(page.locator('a[data-nav-link][aria-current="true"]')).toHaveAttribute('href', '#experience');
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: MOBILE });

  test('opens, navigates and closes', { tag: ['@F-003'] }, async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTestId('menu-toggle');
    const menu = page.locator('#mobile-menu');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();
    await expect(menu.locator('a[data-nav-link]')).toHaveCount(sections.length);
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');

    await menu.getByRole('link', { name: sections[3].navLabel, exact: true }).click();
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(new RegExp(`#${sections[3].id}$`));
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden');
  });

  test('Escape closes and restores focus', { tag: ['@F-003'] }, async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTestId('menu-toggle');
    await toggle.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await expect(toggle).toBeFocused();
  });
});

test.describe('theme', () => {
  test('defaults to dark and toggles to light persistently', { tag: ['@F-004'] }, async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    const toggle = page.getByTestId('theme-toggle');
    await expect(toggle).toHaveAccessibleName(/light/i);
    await toggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAccessibleName(/dark/i);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('light');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).not.toBe('rgb(11, 11, 16)');
  });

  test.describe('system preference', () => {
    test.use({ colorScheme: 'light' });
    test('follows a light OS preference on first visit', { tag: ['@F-004'] }, async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });
  });
});

test.describe('hero', () => {
  test('renders name, pitch, CTAs and stats', { tag: ['@F-005'] }, async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.name);
    const top = page.locator('#top');
    await expect(top.getByRole('link', { name: hero.ctas[0].label })).toHaveAttribute('href', hero.ctas[0].href);
    await expect(top.getByRole('link', { name: hero.ctas[1].label })).toHaveAttribute('href', hero.ctas[1].href);
    const stats = page.getByTestId('hero-stats');
    for (const stat of hero.stats) {
      await expect(stats.getByText(stat.figure, { exact: true })).toBeVisible();
      await expect(stats.getByText(stat.label)).toBeVisible();
    }
  });
});

test.describe('section content', () => {
  test('section chrome: eyebrow, index and title', { tag: ['@F-020'] }, async ({ page }) => {
    await page.goto('/');
    for (const section of sections) {
      const el = page.locator(`section#${section.id}`);
      await expect(el.getByRole('heading', { level: 2 })).toHaveText(section.title);
      await expect(el.locator('[data-section-index]')).toHaveText(section.number);
      await expect(el.locator('[data-section-eyebrow]')).toContainText(section.eyebrow, { ignoreCase: true });
    }
  });

  test('about: summary and focus areas', { tag: ['@F-006'] }, async ({ page }) => {
    await page.goto('/');
    const el = page.locator('#about');
    await expect(el.getByRole('heading', { level: 3, name: about.headline })).toBeVisible();
    for (const area of about.focusAreas) await expect(el.getByText(area, { exact: true })).toBeVisible();
  });

  test('experience: every role, bullet and chip; one Current badge', { tag: ['@F-007'] }, async ({ page }) => {
    await page.goto('/');
    const el = page.locator('#experience');
    const roles = el.locator('[data-role]');
    await expect(roles).toHaveCount(experience.length);
    for (const [i, role] of experience.entries()) {
      const card = roles.nth(i);
      await expect(card.getByRole('heading', { level: 3 })).toContainText(role.title);
      await expect(card).toContainText(role.company);
      await expect(card.locator('li[data-bullet]')).toHaveCount(role.bullets.length);
      await expect(card.locator('[data-chip]')).toHaveCount(role.stack.length);
    }
    await expect(el.getByText('Current', { exact: true })).toHaveCount(1);
  });

  test('projects: every card, external links safe', { tag: ['@F-008'] }, async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#work [data-project]');
    await expect(cards).toHaveCount(projects.length);
    for (const [i, project] of projects.entries()) {
      await expect(cards.nth(i).getByRole('heading', { level: 3 })).toContainText(project.title);
    }
    const external = page.locator('#work a[href^="http"]');
    const count = await external.count();
    expect(count).toBe(projects.filter((p) => p.href).length);
    for (let i = 0; i < count; i++) {
      await expect(external.nth(i)).toHaveAttribute('target', '_blank');
      await expect(external.nth(i)).toHaveAttribute('rel', /noreferrer/);
    }
  });

  test('skills & education: every group, chip, degree and language', { tag: ['@F-009'] }, async ({ page }) => {
    await page.goto('/');
    const el = page.locator('#skills');
    for (const group of skillGroups) {
      const card = el.locator(`[data-skill-group="${group.name}"]`);
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(group.name);
      await expect(card.locator('[data-chip]')).toHaveCount(group.items.length);
    }
    for (const entry of education) await expect(el.getByText(entry.degree, { exact: true })).toBeVisible();
    for (const lang of languages) await expect(el.getByText(lang.name, { exact: true })).toBeVisible();
  });

  test('contact: mailto links and social names', { tag: ['@F-010'] }, async ({ page }) => {
    await page.goto('/');
    const el = page.locator('#contact');
    const mailto = el.locator(`a[href="mailto:${site.email}"]`);
    await expect(mailto).toHaveCount(2);
    for (const link of socialLinks.filter((l) => l.id !== 'email')) {
      await expect(el.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
  });

  test('footer: year, name and social links', { tag: ['@F-011'] }, async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer).toContainText(String(new Date().getFullYear()));
    await expect(footer).toContainText(site.name);
    const social = footer.getByRole('navigation', { name: 'Social' }).locator('a[href^="http"]');
    const count = await social.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) await expect(social.nth(i)).toHaveAttribute('rel', /noreferrer/);
  });
});

test.describe('motion', () => {
  test('reveals animate in and Lenis is active', { tag: ['@F-012'] }, async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveClass(/lenis/);
    const reveals = page.locator('[data-reveal]');
    const count = await reveals.count();
    expect(count).toBeGreaterThan(5);
    const last = reveals.nth(count - 1);
    await last.scrollIntoViewIfNeeded();
    await expect(last).toHaveCSS('opacity', '1');
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('everything is visible immediately and smooth scroll is off', { tag: ['@F-012'] }, async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await expect(page.locator('html')).not.toHaveClass(/lenis/);
      const opacities = await page
        .locator('[data-reveal]')
        .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
      expect(opacities.every((o) => o === '1')).toBe(true);
    });
  });
});

test.describe('accessibility structure', () => {
  test('skip link is first and landmarks are present', { tag: ['@F-014'] }, async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveAttribute('href', '#main');
    await expect(focused).toBeVisible();
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});

test.describe('metadata', () => {
  test('title, description, social cards and JSON-LD', { tag: ['@F-015'] }, async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(new RegExp(site.name));
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.trim().length ?? 0).toBeGreaterThan(40);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', new RegExp(site.name));
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', /.+/);

    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    const person = JSON.parse(jsonLd ?? '{}') as { '@type'?: string; name?: string; sameAs?: string[] };
    expect(person['@type']).toBe('Person');
    expect(person.name).toBe(site.name);
    expect(person.sameAs).toEqual(expect.arrayContaining(Object.values(site.links)));
  });
});
