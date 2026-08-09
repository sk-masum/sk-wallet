import {
  CacheableResponsePlugin,
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  Serwist,
  StaleWhileRevalidate,
} from 'serwist';

const DAY_IN_SECONDS = 60 * 60 * 24;

const CACHE_NAMES = {
  APP_SHELL: 'sk-wallet-app-shell-v1',
  STATIC_ASSETS: 'sk-wallet-static-assets-v1',
  APP_ROUTE_DATA: 'sk-wallet-app-route-data-v1',
  API_DYNAMIC: 'sk-wallet-api-dynamic-v1',
  API_READONLY: 'sk-wallet-api-readonly-v1',
  API_VAULT: 'sk-wallet-api-vault-v1',
};

const ORIGIN = self.location.origin;

const OFFLINE_READ_API_PATTERNS = [
  /^\/api\/dashboard(?:\/(?:alerts|favorite))?$/,
  /^\/api\/card(?:\/[^/]+)?$/,
  /^\/api\/credential(?:\/[^/]+)?$/,
  /^\/api\/document(?:\/[^/]+)?$/,
];

function isSameOrigin(url) {
  return url.origin === ORIGIN;
}

function isGetRequest(request) {
  return request.method === 'GET';
}

function isApiPath(pathname) {
  return pathname.startsWith('/api/');
}

function isSensitiveApiBypass(pathname) {
  return /^\/api\/credential\/[^/]+\/secret$/.test(pathname);
}

function isOfflineReadApi(pathname) {
  return OFFLINE_READ_API_PATTERNS.some((pattern) => pattern.test(pathname));
}

function isNextRouteDataRequest(request, url) {
  const acceptHeader = request.headers.get('accept') || '';
  return (
    url.searchParams.has('_rsc') ||
    request.headers.has('rsc') ||
    acceptHeader.includes('text/x-component')
  );
}

const runtimeMatchers = {
  appShell: ({ request, url }) => request.mode === 'navigate' && isSameOrigin(url),
  staticAssets: ({ request, url }) =>
    isSameOrigin(url) && ['script', 'style', 'font', 'worker'].includes(request.destination),
  appRouteData: ({ request, url }) =>
    isGetRequest(request) && isSameOrigin(url) && isNextRouteDataRequest(request, url),
  apiVault: ({ request, url }) =>
    isGetRequest(request) &&
    isSameOrigin(url) &&
    url.pathname.startsWith('/api/vault') &&
    !isSensitiveApiBypass(url.pathname),
  apiReadonly: ({ request, url }) =>
    isGetRequest(request) &&
    isSameOrigin(url) &&
    isApiPath(url.pathname) &&
    isOfflineReadApi(url.pathname) &&
    !isSensitiveApiBypass(url.pathname),
  apiDynamic: ({ request, url }) =>
    isGetRequest(request) &&
    isSameOrigin(url) &&
    isApiPath(url.pathname) &&
    !isOfflineReadApi(url.pathname) &&
    !isSensitiveApiBypass(url.pathname),
};

const runtimeHandlers = {
  appShell: new StaleWhileRevalidate({
    cacheName: CACHE_NAMES.APP_SHELL,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 30 }),
    ],
  }),
  staticAssets: new CacheFirst({
    cacheName: CACHE_NAMES.STATIC_ASSETS,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 120,
        maxAgeSeconds: DAY_IN_SECONDS * 30,
      }),
    ],
  }),
  appRouteData: new NetworkFirst({
    cacheName: CACHE_NAMES.APP_ROUTE_DATA,
    networkTimeoutSeconds: 4,
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 120,
        maxAgeSeconds: DAY_IN_SECONDS * 3,
      }),
    ],
  }),
  apiVault: new NetworkFirst({
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
  apiReadonly: new StaleWhileRevalidate({
    cacheName: CACHE_NAMES.API_READONLY,
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: DAY_IN_SECONDS * 7,
      }),
    ],
  }),
  apiDynamic: new NetworkFirst({
    cacheName: CACHE_NAMES.API_DYNAMIC,
    networkTimeoutSeconds: 4,
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 5,
      }),
    ],
  }),
};

const runtimeCaching = [
  {
    // App shell: instant cached response, then update quietly in background.
    matcher: runtimeMatchers.appShell,
    handler: runtimeHandlers.appShell,
  },
  {
    // Static chunks and fonts: cache-first for fastest startup in installed PWA mode.
    matcher: runtimeMatchers.staticAssets,
    handler: runtimeHandlers.staticAssets,
  },
  {
    // Next.js app-router flight data keeps route transitions usable while offline.
    matcher: runtimeMatchers.appRouteData,
    handler: runtimeHandlers.appRouteData,
  },
  {
    // Sensitive vault endpoints stay dynamic and only keep a tiny fallback cache.
    matcher: runtimeMatchers.apiVault,
    handler: runtimeHandlers.apiVault,
  },
  {
    // Core wallet reads get a durable cache for reliable offline access.
    matcher: runtimeMatchers.apiReadonly,
    handler: runtimeHandlers.apiReadonly,
  },
  {
    // All other API reads are network-first to keep user data fresh.
    matcher: runtimeMatchers.apiDynamic,
    handler: runtimeHandlers.apiDynamic,
  },
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
});

serwist.addEventListeners();

function handleMessage(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}

async function focusOrOpenWindow(targetUrl) {
  const clientList = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  for (const client of clientList) {
    if (!('focus' in client)) continue;

    const currentUrl = new URL(client.url);
    if (currentUrl.origin === ORIGIN) {
      if ('navigate' in client) {
        await client.navigate(targetUrl);
      }
      await client.focus();
      return;
    }
  }

  await self.clients.openWindow(targetUrl);
}

function handleNotificationClick(event) {
  event.notification.close();

  const relativeUrl = event.notification?.data?.url || '/card';
  const targetUrl = new URL(relativeUrl, ORIGIN).href;

  event.waitUntil(
    (async () => {
      await focusOrOpenWindow(targetUrl);
    })(),
  );
}

self.addEventListener('message', handleMessage);
self.addEventListener('notificationclick', handleNotificationClick);
