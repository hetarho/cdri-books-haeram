import 'reflect-metadata';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'search1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'search2.kakaocdn.net',
      },
    ],
  },
};
