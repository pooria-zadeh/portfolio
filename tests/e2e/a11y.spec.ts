import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { viewport } from '../helpers/viewports';

/**
 * axe-core gate: zero serious/critical WCAG 2.x A/AA violations at a mobile
 * and a desktop width, in both themes, plus the open mobile menu.
 */
const THEMES = ['dark', 'light'] as const;
const WIDTHS = [viewport('mobile'), viewport('laptop')];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

for (const theme of THEMES) {
  for (const vp of WIDTHS) {
    test.describe(`${theme} theme @ ${vp.name}`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height }, colorScheme: theme });

      test('has no serious or critical axe violations', { tag: ['@F-014'] }, async ({ page }, testInfo) => {
        await page.goto('/', { waitUntil: 'networkidle' });
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);

        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        const minor = results.violations.filter((v) => !blocking.includes(v));
        if (minor.length) {
          await testInfo.attach('axe-minor-violations', {
            body: JSON.stringify(minor, null, 2),
            contentType: 'application/json',
          });
        }
        expect(
          blocking.map((v) => `${v.id} (${v.impact}) — ${v.help} — ${v.nodes[0]?.target.join(' ')}`),
        ).toEqual([]);
      });

      if (vp.width < 768) {
        test('open mobile menu has no serious or critical axe violations', { tag: ['@F-014', '@F-003'] }, async ({ page }) => {
          await page.goto('/', { waitUntil: 'networkidle' });
          await page.getByTestId('menu-toggle').click();
          await expect(page.locator('#mobile-menu')).toBeVisible();
          const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
          const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
          expect(blocking.map((v) => `${v.id} — ${v.help} — ${v.nodes[0]?.target.join(' ')}`)).toEqual([]);
        });
      }
    });
  }
}
