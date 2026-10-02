#!/usr/bin/env node
/**
 * Enforces .cursor/rules/exact-version-pinning.mdc: every dependency in
 * package.json must be an exact version (no ^ ~ > < * latest, tags, or
 * git/URL refs).
 *
 *   node scripts/check-pins.mjs          # exit 1 on any floating range
 *   node scripts/check-pins.mjs --hook   # Claude Code PostToolUse hook mode:
 *                                        # reads the tool payload on stdin and
 *                                        # only checks when package.json was edited
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const EXACT = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;
const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'overrides'];

function check(manifestPath) {
  const pkg = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const bad = [];
  for (const field of FIELDS) {
    for (const [name, version] of Object.entries(pkg[field] ?? {})) {
      if (typeof version === 'string' && !EXACT.test(version)) bad.push(`${field}.${name}: "${version}"`);
    }
  }
  return bad;
}

const hookMode = process.argv.includes('--hook');
let manifest = resolve(process.cwd(), 'package.json');

if (hookMode) {
  let payload = '';
  try {
    payload = readFileSync(0, 'utf8');
  } catch {
    process.exit(0);
  }
  let filePath = '';
  try {
    filePath = JSON.parse(payload)?.tool_input?.file_path ?? '';
  } catch {
    process.exit(0);
  }
  if (!filePath.endsWith('package.json')) process.exit(0);
  manifest = filePath;
}

const bad = check(manifest);
if (bad.length) {
  const msg = `Floating dependency ranges found in ${manifest} (pin exact versions):\n  ${bad.join('\n  ')}`;
  if (hookMode) {
    // Exit 2 surfaces the message to Claude as feedback.
    console.error(msg);
    process.exit(2);
  }
  console.error(msg);
  process.exit(1);
}
if (!hookMode) console.log('check-pins: all dependencies pinned exactly.');
