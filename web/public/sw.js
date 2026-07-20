const CACHE_VERSION = 'v4';
const STATIC_CACHE = `sk-wallet-static-${CACHE_VERSION}`;
const PAGE_CACHE = `sk-wallet-pages-${CACHE_VERSION}`;
const RUNTIME_CACHE = `sk-wallet-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';
const ASSETS_TO_CACHE = ['/', OFFLINE_URL, '/manifest.webmanifest', '/favicon.ico'];

function isCacheableResponse(response) {
  return response && response.ok && (response.type === 'basic' || response.type === 'opaque');
}

async function putInCache(cacheName, request, response) {
  if (!isCacheableResponse(response)) return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then(async (response) => {
      await putInCache(cacheName, request, response.clone());
      return response;
    })
    .catch(() => cached);

  return cached || networkFetch;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  await putInCache(cacheName, request, response.clone());
  return response;
}

async function navigationHandler(event) {
  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      await putInCache(PAGE_CACHE, event.request, preloadResponse.clone());
      return preloadResponse;
    }

    const networkResponse = await fetch(event.request);
    await putInCache(PAGE_CACHE, event.request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cache = await caches.open(PAGE_CACHE);
    const cachedPage = await cache.match(event.request);
    if (cachedPage) return cachedPage;

    const offlinePage = await caches.match(OFFLINE_URL);
    if (offlinePage) return offlinePage;

    return new Response('Offline', {
      status: 503,
      statusText: 'Offline',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, PAGE_CACHE, RUNTIME_CACHE].includes(key))
          .map((key) => caches.delete(key))
      );

      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      await self.clients.claim();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const destination = event.request.destination;

  if (!isSameOrigin) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(navigationHandler(event));
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          putInCache(RUNTIME_CACHE, event.request, response.clone());
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  if (destination === 'style' || destination === 'script' || destination === 'worker' || destination === 'font') {
    event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
    return;
  }

  if (destination === 'image') {
    event.respondWith(cacheFirst(event.request, RUNTIME_CACHE));
    return;
  }

  event.respondWith(staleWhileRevalidate(event.request, RUNTIME_CACHE));
});
