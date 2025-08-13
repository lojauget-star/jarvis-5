const STATIC_CACHE_NAME = 'jarvis-static-v1';
const DYNAMIC_CACHE_NAME = 'jarvis-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/hooks/useJarvis.ts',
  '/services/geminiService.ts',
  '/components/JarvisOrb.tsx',
  '/components/ChatLog.tsx',
  '/components/MicButton.tsx',
  '/icon.svg',
  '/manifest.json'
];

// INSTALL: Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// ACTIVATE: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// FETCH: Serve from cache, fallback to network, and cache dynamically
self.addEventListener('fetch', event => {
  // Only handle GET requests for http/https URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // Return from cache if found
      }

      // Not in cache, fetch from network and cache the response
      return fetch(event.request).then(networkResponse => {
        // Check if we received a valid response to cache
        // We cache successful responses and opaque responses (for cross-origin CDNs)
        if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
          return networkResponse;
        }

        // Clone the response because it's a stream and can only be consumed once.
        const responseToCache = networkResponse.clone();

        // Use DYNAMIC_CACHE for everything not in the initial STATIC_ASSETS
        caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          cache.put(event.request.url, responseToCache);
        });

        return networkResponse;
      }).catch(error => {
        console.error("Service Worker fetch failed:", error);
        // Optional: Return a fallback offline page here if one was cached
      })
    })
  );
});
