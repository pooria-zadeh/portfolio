import { describe, expect, it } from 'vitest';
import { FEATURES, FEATURE_ID, VIEWPORT_NAMES, tagsInTests } from '../helpers/features';

const STATUSES = ['planned', 'in-progress', 'done'];

describe('feature_list.json ledger', () => {
  it('has unique, sequential ids and a self tag', () => {
    const ids = FEATURES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id, i) => {
      expect(id).toMatch(FEATURE_ID);
      expect(Number(id.slice(2))).toBe(i + 1);
    });
    for (const f of FEATURES) expect(f.tests).toContain(`@${f.id}`);
  });

  it('uses valid statuses, viewports and non-empty acceptance', () => {
    for (const f of FEATURES) {
      expect(STATUSES, `${f.id} status`).toContain(f.status);
      expect(f.acceptance.length, `${f.id} acceptance`).toBeGreaterThan(0);
      expect(f.title.trim()).not.toBe('');
      for (const vp of f.viewports) expect(VIEWPORT_NAMES, `${f.id} viewport ${vp}`).toContain(vp);
    }
  });

  it('every done feature is proven by at least one tagged test', () => {
    const tags = tagsInTests();
    const missing = FEATURES.filter((f) => f.status === 'done' && !tags.has(`@${f.id}`)).map(
      (f) => `${f.id} ${f.title}`,
    );
    expect(missing, 'done features without a tagged test').toEqual([]);
  });

  it('every tag used in tests refers to a declared feature', () => {
    const declared = new Set(FEATURES.map((f) => `@${f.id}`));
    const unknown = [...tagsInTests().entries()]
      .filter(([tag]) => !declared.has(tag))
      .map(([tag, files]) => `${tag} in ${files.join(', ')}`);
    expect(unknown, 'tags without a feature entry').toEqual([]);
  });
});
