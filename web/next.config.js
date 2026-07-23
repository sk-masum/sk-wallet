//@ts-check

const path = require('path');
/** @type {(config: import('next').NextConfig) => import('next').NextConfig} */
let withSerwist = (config) => config;

try {
  const dynamicRequire = eval('require');
  const withSerwistInit = dynamicRequire('@serwist/next').default;
  withSerwist = withSerwistInit({
    swSrc: 'src/app/sw.js',
    swDest: 'public/sw.js',
    register: false,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === 'development',
  });
} catch {
  // Serwist package is not installed yet; keep base Next config usable.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '..'),
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

module.exports = withSerwist(nextConfig);
