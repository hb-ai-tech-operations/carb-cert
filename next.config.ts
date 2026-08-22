import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-up',
        destination: '/sign-in',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
