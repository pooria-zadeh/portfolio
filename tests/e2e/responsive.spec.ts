import { expect, test, type Page } from '@playwright/test';
import { VIEWPORTS, isMobile } from '../helpers/viewports';

/**
 * The responsive matrix. Every viewport declared in feature_list.json gets
 * the same battery of layout assertions plus a full-page screenshot attached
 * to the report for human review.
 */

async function gotoStable(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
}

/** Elements (outside decorative aria-hidden art) whose box leaves the viewport horizontally. */
async function horizontalOffenders(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const offenders: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      if (el.closest('[aria-hidden="true"]')) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const style = getComputedStyle(el);
      if (style.visibility === 'hidden' || style.display === 'none' || style.position === 'fixed') continue;
      if (rect.right > width + 1 || rect.left < -1) {
        const cls = typeof el.className === 'string' ? el.className.split(/\s+/).slice(0, 3).join('.') : '';
        offenders.push(
          `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${cls ? `.${cls}` : ''} [${Math.round(rect.left)}→${Math.round(rect.right)} of ${width}]`,
        );
      }
    }
    return offenders.slice(0, 15);
  });
}

for (const vp of VIEWPORTS) {
  test.describe(`viewport ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('page does not overflow horizontally', { tag: ['@F-013'] }, async ({ page }) => {
      await gotoStable(page);
      // Scroll through once so lazily-revealed content is laid out.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth, 'document scrollWidth').toBeLessThanOrEqual(clientWidth + 1);
      expect(await horizontalOffenders(page), 'elements past the viewport edge').toEqual([]);
    });

    test('header adapts to the breakpoint', { tag: ['@F-002', '@F-003', '@F-013'] }, async ({ page }) => {
      await gotoStable(page);
      const header = page.getByTestId('site-header');
      await expect(header).toBeVisible();
      await expect(header).toHaveCSS('position', 'fixed');

      const desktopNav = page.getByRole('navigation', { name: 'Primary' });
      const menuToggle = page.getByTestId('menu-toggle');
      if (isMobile(vp)) {
        await expect(desktopNav).toBeHidden();
        await expect(menuToggle).toBeVisible();
      } else {
        await expect(desktopNav).toBeVisible();
        await expect(menuToggle).toBeHidden();
      }
    });

    test('hero fits the viewport', { tag: ['@F-005', '@F-013'] }, async ({ page }) => {
      await gotoStable(page);
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      const box = await h1.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 1);

      const stats = page.getByTestId('hero-stats');
      await expect(stats).toBeVisible();
      const columns = await stats.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
      expect(columns).toBe(isMobile(vp) ? 2 : 4);
    });

    test('content keeps a side gutter and usable touch targets', { tag: ['@F-013'] }, async ({ page }) => {
      await gotoStable(page);
      const main = page.locator('main#main');
      const firstHeading = main.getByRole('heading', { level: 1 });
      const box = await firstHeading.boundingBox();
      expect(box!.x, 'left gutter').toBeGreaterThanOrEqual(16);

      if (isMobile(vp)) {
        const controls = page.getByTestId('site-header').locator('a:visible, button:visible');
        const count = await controls.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
          const b = await controls.nth(i).boundingBox();
          expect(b, `control ${i}`).not.toBeNull();
          expect(b!.height, `control ${i} height`).toBeGreaterThanOrEqual(40);
          expect(b!.width, `control ${i} width`).toBeGreaterThanOrEqual(40);
        }
      }
    });

    test('section grids collapse correctly', { tag: ['@F-006', '@F-008', '@F-009', '@F-010'] }, async ({ page }) => {
      await gotoStable(page);
      const cols = (selector: string) =>
        page.locator(selector).evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);

      expect(await cols('[data-testid="about-grid"]')).toBe(vp.width >= 1024 ? 2 : 1);
      expect(await cols('[data-testid="projects-grid"]')).toBe(vp.width >= 768 ? 2 : 1);
      const skillCols = await cols('[data-testid="skills-grid"]');
      expect(skillCols).toBe(vp.width >= 1024 ? 3 : vp.width >= 640 ? 2 : 1);
      const contactDirection = await page
        .locator('[data-testid="contact-card"]')
        .evaluate((el) => getComputedStyle(el).flexDirection);
      expect(contactDirection).toBe(vp.width >= 768 ? 'row' : 'column');
    });

    test.describe('screenshot', () => {
      test.use({ reducedMotion: 'reduce' });
      test('full page for visual review', { tag: ['@F-013'] }, async ({ page }, testInfo) => {
        await gotoStable(page);
        const body = await page.screenshot({ fullPage: true, animations: 'disabled' });
        await testInfo.attach(`page-${vp.name}`, { body, contentType: 'image/png' });
      });
    });
  });
}
