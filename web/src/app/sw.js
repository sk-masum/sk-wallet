import {
  CacheableResponsePlugin,
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  Serwist,
  StaleWhileRevalidate,
} from 'serwist';

const CACHE_NAMES = {
  APP_SHELL: 'sk-wallet-app-shell-v1',
  STATIC_ASSETS: 'sk-wallet-static-assets-v1',
  API_DYNAMIC: 'sk-wallet-api-dynamic-v1',
  API_VAULT: 'sk-wallet-api-vault-v1',
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      // App shell: instant cached response, then update quietly in background.
      matcher: ({ request, url }) => request.mode === 'navigate' && url.origin === self.location.origin,
      handler: new StaleWhileRevalidate({
        cacheName: CACHE_NAMES.APP_SHELL,
        plugins: [
          new CacheableResponsePlugin({ statuses: [0, 200] }),
          new ExpirationPlugin({ maxEntries: 30 }),
        ],
      }),
    },
    {
      // Static chunks and fonts: cache-first for fastest startup in installed PWA mode.
      matcher: ({ request, url }) =>
        url.origin === self.location.origin
        && ['script', 'style', 'font', 'worker'].includes(request.destination),
      handler: new CacheFirst({
        cacheName: CACHE_NAMES.STATIC_ASSETS,
        plugins: [
          new CacheableResponsePlugin({ statuses: [0, 200] }),
          new ExpirationPlugin({
            maxEntries: 120,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }),
        ],
      }),
    },
    {
      // Sensitive vault endpoints stay dynamic and only keep a tiny fallback cache.
      matcher: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/api/vault'),
      handler: new NetworkFirst({
        cacheName: CACHE_NAMES.API_VAULT,
        networkTimeoutSeconds: 4,
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({
            maxEntries: 3,
            maxAgeSeconds: 30,
          }),
        ],
      }),
    },
    {
      // All other API reads are network-first to keep user data fresh.
      matcher: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/api/'),
      handler: new NetworkFirst({
        cacheName: CACHE_NAMES.API_DYNAMIC,
        networkTimeoutSeconds: 4,
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 60,
          }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
