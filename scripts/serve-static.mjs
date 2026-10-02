#!/usr/bin/env node
/**
 * Zero-dependency static server for the Next.js export in `out/`.
 * Mirrors GitHub Pages path semantics: `/foo` → `foo.html` → `foo/index.html`,
 * unknown paths → `404.html` with status 404.
 *
 *   node scripts/serve-static.mjs --dir out --port 3100
 */
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const ROOT = resolve(process.cwd(), arg('dir', 'out'));
const PORT = Number(arg('port', '3100'));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolvePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const base = join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  const candidates = clean.endsWith('/')
    ? [join(base, 'index.html')]
    : [base, `${base}.html`, join(base, 'index.html')];
  for (const candidate of candidates) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

try {
  if (!(await isFile(join(ROOT, 'index.html')))) {
    console.error(`[serve-static] ${ROOT}/index.html not found — run \`npm run build\` first.`);
    process.exit(1);
  }
} catch {
  /* handled above */
}

const server = createServer(async (req, res) => {
  const file = await resolvePath(req.url ?? '/');
  if (!file) {
    const notFound = join(ROOT, '404.html');
    const body = (await isFile(notFound)) ? await readFile(notFound) : 'Not found';
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(body);
    return;
  }
  const body = await readFile(file);
  res.writeHead(200, {
    'content-type': MIME[extname(file)] ?? 'application/octet-stream',
    'content-length': body.length,
    'cache-control': 'no-cache',
  });
  res.end(req.method === 'HEAD' ? undefined : body);
});

server.listen(PORT, () => {
  console.log(`[serve-static] serving ${ROOT} on http://localhost:${PORT}`);
});
