import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import featureList from '../../feature_list.json';

export type FeatureStatus = 'planned' | 'in-progress' | 'done';

export interface Feature {
  id: string;
  area: string;
  title: string;
  description: string;
  status: FeatureStatus;
  acceptance: string[];
  viewports: string[];
  tests: string[];
}

export const FEATURES = featureList.features as Feature[];
export const VIEWPORT_NAMES = Object.keys(featureList.viewports);
export const FEATURE_ID = /^F-\d{3}$/;
export const TAG = /@F-\d{3}/g;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(spec|test)\.ts$/.test(entry)) out.push(path);
  }
  return out;
}

/** Every `@F-NNN` tag that appears in a spec/test file under tests/, with the files it appears in. */
export function tagsInTests(root = join(process.cwd(), 'tests')): Map<string, string[]> {
  const tags = new Map<string, string[]>();
  for (const file of walk(root)) {
    const source = readFileSync(file, 'utf8');
    for (const tag of new Set(source.match(TAG) ?? [])) {
      tags.set(tag, [...(tags.get(tag) ?? []), file]);
    }
  }
  return tags;
}
