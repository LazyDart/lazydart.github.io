// next.config.ts
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const isProd = process.env.NODE_ENV === 'production';

// If you prefer env, you can keep PAGES_BASE_PATH,
// but for GitHub Pages it’s often just `/your-repo-name`
const basePath = process.env.PAGES_BASE_PATH ?? (isProd ? '/lazydart.github.io' : '');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages static hosting
  output: 'export',

  // Required when deploying to username.github.io/<repo>
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
});

export default nextConfig;
