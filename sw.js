const CACHE_NAME = 'laxmi-chit-fund-v1';
// Temporarily removed "./icon.png" to pass Chrome's installation checklist layout
const assets = ["./", "./index.html", "./manifest.json"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assets))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => { if(k !== CACHE_NAME) return caches.delete(k); })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((res) => {
        if(!res || res.status !== 200 || res.type !== 'basic') return res;
        const resCache = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(event.request, resCache));
        return res;
      }).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
