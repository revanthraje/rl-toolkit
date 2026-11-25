// Offline support: keeps the app, the cards and the maths renderer on the device.
const CACHE = 'rl-toolkit-v4';
const MJ = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js';
const LOCAL = ['./', './index.html', './cards.json', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(LOCAL);
    try { await c.add(new Request(MJ, { mode: 'cors' })); } catch (err) { /* cached on first page load instead */ }
  }).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'cdn.jsdelivr.net') {
    // maths library: cache first, it never changes at a pinned version
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  if (url.origin === location.origin) {
    // app files: answer from the cache instantly, refresh it in the background
    e.respondWith(caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
