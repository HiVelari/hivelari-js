import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['nextjs.hivelarijs.local'],
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
