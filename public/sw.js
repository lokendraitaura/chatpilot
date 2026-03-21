const CACHE_NAME = 'chatpilot-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache core UI to fulfill PWA requirements
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Simple network-first strategy, falling back to cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
