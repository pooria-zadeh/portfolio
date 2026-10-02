const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/** Prefix a `/public` URL with the configured basePath (project GitHub Pages sites). */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
