// Service worker : fait marcher l'appli hors ligne.
// Pages : réseau d'abord (pour recevoir tes mises à jour), cache en secours.
// Polices et icônes : cache d'abord.
// Après une modification des fichiers, incrémente VERSION pour forcer le rafraîchissement.
const VERSION = 'rituels-v3';
const SHELL = [
  './', './index.html', './shutdown.html', './sommeil.html',
  './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Pages HTML et profils JSON : réseau d'abord
  if (req.mode === 'navigate' || (url.origin === location.origin && /\.(html|json)$/.test(url.pathname))) {
    e.respondWith(
      fetch(req)
        .then(res => {
          // Page absente côté serveur (404, site en maintenance) : on garde la version en cache
          if (!res.ok) return caches.match(req, { ignoreSearch: true }).then(r => r || res);
          const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Polices Google et fichiers locaux : cache d'abord, mis en cache au premier passage
  if (url.origin === location.origin || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
