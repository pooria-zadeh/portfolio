import type { NextConfig } from 'next';

/**
 * Static export for GitHub Pages. Set NEXT_PUBLIC_BASE_PATH="/<repo>" when
 * deploying as a project site; leave empty for <user>.github.io or a custom
 * domain. See .claude/skills/deploy-pages.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
