import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  async rewrites() {
    return [
      {
        source: '/design-system',
        destination: '/',
      },
      {
        source: '/design-system/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
