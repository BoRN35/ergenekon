/* Ergenekon — hızlı açılış ve ana ekran uygulaması için service worker. Claude, 18 Kasım 2026.
   Sayfa: önbellekten anında açılır, arka planda yenisi indirilir; yeni sürüm varsa oyuna "yenile" haberi gider.
   Sürüm etiketli (?v=) dosyalar önbellekten; diğerleri önbellekten verilip arka planda tazelenir. Kayıt verisine dokunmaz. */
var CACHE = 'ergenekon-v1';
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
function notifyUpdate() { self.clients.matchAll({ type: 'window' }).then(function (cs) { cs.forEach(function (c) { c.postMessage({ type: 'ek-update' }); }); }); }
self.addEventListener('fetch', function (e) {
  var req = e.request; if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.pathname.indexOf('/api/') >= 0 || req.cache === 'no-store' || !/^https?:/.test(url.protocol)) return;
  if (url.origin !== location.origin && !/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return;
  var isPage = req.mode === 'navigate' || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname));
  if (isPage) {
    e.respondWith(caches.open(CACHE).then(function (c) {
      return c.match('page').then(function (hit) {
        var net = fetch(req, { cache: 'no-cache' }).then(function (res) {
          if (res && res.ok) {
            var cl = res.clone();
            cl.text().then(function (txt) {
              var sig = txt.length + ':' + txt.slice(-4000).replace(/\s+/g, '').length;
              c.match('page-sig').then(function (old) { (old ? old.text() : Promise.resolve('')).then(function (o) { if (hit && o && o !== sig) notifyUpdate(); }); });
              c.put('page', new Response(txt, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })); c.put('page-sig', new Response(sig));
            });
          }
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }
  var versioned = /[?&]v=/.test(url.search);
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(function () { return hit; });
      return versioned && hit ? hit : (hit || net);
    });
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(function (cs) { if (cs.length) return cs[0].focus(); return self.clients.openWindow('./'); }));
});
