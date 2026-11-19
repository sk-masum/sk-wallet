//@ts-check

const path = require('path');

/** @type {import('next').NextConfig} */
const baseConfig = {
  turbopack: {
    root: path.resolve(__dirname, '..'),
  },
  async redirects() {
    return [{ source: '/docs', destination: '/doc', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },
};

// Apply @serwist/turbopack wrapper for native Turbopack support (experimental)
let nextConfig = baseConfig;
try {
  const { withSerwist } = require('@serwist/turbopack');
  nextConfig = withSerwist(baseConfig);
} catch (error) {
  console.warn('[@serwist/turbopack] Warning: Failed to initialize, using base config');
  if (error instanceof Error) {
    console.warn('Error:', error.message);
  }
}

module.exports = nextConfig;
