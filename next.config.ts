import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
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
