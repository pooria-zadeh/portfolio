import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), 'utf8');

describe('static export configuration [@F-001]', () => {
  it('exports statically with unoptimized images', () => {
    const config = read('next.config.ts');
    expect(config).toMatch(/output:\s*'export'/);
    expect(config).toMatch(/unoptimized:\s*true/);
  });

  it('ships a .nojekyll marker and the résumé in public/', () => {
    expect(existsSync(join(root, 'public/.nojekyll'))).toBe(true);
    expect(existsSync(join(root, 'public/Pooria-Rajabzadeh-Resume.pdf'))).toBe(true);
  });

  it('does not use server-only APIs in app/', () => {
    const forbidden = /from 'next\/headers'|cookies\(\)|headers\(\)|force-dynamic|'use server'/;
    for (const file of ['src/app/layout.tsx', 'src/app/page.tsx', 'src/app/robots.ts', 'src/app/sitemap.ts']) {
      expect(read(file), file).not.toMatch(forbidden);
    }
  });
});

describe('CI and deployment workflows [@F-019]', () => {
  it('runs the full gate on pull requests and pushes', () => {
    const ci = read('.github/workflows/ci.yml');
    expect(ci).toMatch(/pull_request:/);
    expect(ci).toMatch(/npm ci/);
    for (const step of ['npm run lint', 'npm run typecheck', 'npm run test:unit', 'npm run build', 'test:e2e']) {
      expect(ci, step).toContain(step);
    }
    expect(ci).toMatch(/upload-artifact/);
  });

  it('deploys out/ to GitHub Pages from main', () => {
    const deploy = read('.github/workflows/deploy-pages.yml');
    expect(deploy).toMatch(/branches:\s*\[main\]/);
    expect(deploy).toMatch(/npm ci/);
    expect(deploy).toMatch(/upload-pages-artifact/);
    expect(deploy).toMatch(/deploy-pages@/);
    expect(deploy).toMatch(/path:\s*out/);
  });

  it('pins every dependency exactly', () => {
    const pkg = JSON.parse(read('package.json')) as Record<string, Record<string, string>>;
    for (const field of ['dependencies', 'devDependencies']) {
      for (const [name, version] of Object.entries(pkg[field] ?? {})) {
        expect(version, `${field}.${name}`).toMatch(/^\d+\.\d+\.\d+/);
      }
    }
  });
});
