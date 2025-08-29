import type { NextConfig } from 'next';

const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
        unoptimized: true,
    },
    output: 'export',
});


const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
