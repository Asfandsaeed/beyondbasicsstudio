/**
 * Beyond Basics Studio — Service Worker
 *
 * Caches content-hashed assets (JS, CSS, fonts, images) indefinitely.
 * GitHub Pages forces Cache-Control: max-age=600 on all assets, so this SW
 * is the only way to achieve long-lived caching for return visitors.
 *
 * Strategy: Cache-first for hashed assets, network-only for everything else.
 * Content-hashed filenames (Vite default) guarantee freshness — a changed file
 * always gets a new hash, so stale-cache is impossible.
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `bbs-assets-${CACHE_VERSION}`;

// Match Vite-hashed static assets: /assets/*.js, /assets/*.css, /fonts/*.woff2, OG images
const CACHEABLE = /\.(js|css|woff2|jpg|jpeg|svg|png|webp|ico)$/;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  if (!CACHEABLE.test(url.pathname)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((response) => {
          if (response.ok) cache.put(req, response.clone());
          return response;
        });
      })
    )
  );
});
