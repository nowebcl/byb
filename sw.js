const CACHE_NAME = 'byb-genset-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/logo-bb-genset.png',
  '/assets/logo-bb-genset.webp',
  '/assets/Recurso-2-scaled.webp',
  '/assets/Recurso-1-scaled.webp',
  '/assets/Recurso-18-scaled.webp',
  '/assets/0abed4cb-7997-4606-b936-0aea99eb9607.jpg',
  '/assets/Captura-de-pantalla-2025-03-29-013512.png',
  '/assets/Genie-GS3246-04.jpg',
  '/assets/descarga.jpeg',
  '/assets/hero-bg-poster.webp',
  '/assets/mision-bg-poster.webp'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => {
        if (k !== CACHE_NAME) return caches.delete(k);
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
