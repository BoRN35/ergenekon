/* Ergenekon — Ek Paket 2, 5. adım: teknik altyapı. Claude, 18 Kasım 2026.
   68 ana ekrana ekle (PWA, service worker, bildirimler) · 70 hızlı açılış (önbellek + yeni sürüm haberi)
   74 hata bildir (ekran görüntüsü + not) · 75 admin test modu (yalnız yönetici PIN'iyle, cihazda) · 77 dil altyapısı
   Kayıt verisine dokunmaz. Yönetici izni cihazda tutulur (localStorage 'ek_adm'), oyuncu kaydına girmez. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekTek) return; W.__ekTek = true;
  var ADM_HASH = '62ab5f95389fe850b3c2f5928e73f40b243987c7d93e05c664ba8b5144ad7a4b';
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }

  /* ================= 68 · 70) PWA ================= */
  var SWR = null, INSTALL = null;
  function swInit() {
    if (!('serviceWorker' in navigator) || !(location.protocol === 'https:' || location.hostname === 'localhost')) return;
    navigator.serviceWorker.register('./sw.js').then(function (r) { SWR = r; }).catch(function () {});
    navigator.serviceWorker.addEventListener('message', function (ev) { if (ev.data && ev.data.type === 'ek-update') updToast(); });
  }
  function updToast() {
    if (document.getElementById('ek-upd')) return;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'ek-upd'; b.innerHTML = '<i>✦</i><span>Yeni sürüm</span><b>↻</b>';
    b.addEventListener('click', function () { save(); setTimeout(function () { location.reload(); }, 150); });
    document.body.appendChild(b);
  }
  W.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); INSTALL = e; });
  function standalone() { return (W.matchMedia && W.matchMedia('(display-mode: standalone)').matches) || W.navigator.standalone === true; }
  function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function install() {
    if (INSTALL) { INSTALL.prompt(); INSTALL.userChoice.finally(function () { INSTALL = null; }); return; }
    popup('Ana ekrana ekle', '<div class="pw-steps">' + (isIOS() ? '<span><i>⬆️</i><small>Paylaş</small></span><b>›</b><span><i>➕</i><small>Ana Ekrana Ekle</small></span><b>›</b><span><i>☾</i><small>Ergenekon</small></span>' : '<span><i>⋮</i><small>Menü</small></span><b>›</b><span><i>📲</i><small>Uygulamayı yükle</small></span>') + '</div>', 'pw-card');
  }
  // bildirimler: ana ekran uygulamasında service worker üzerinden (iOS dahil)
  W.ekNotify = function (title, body) {
    try {
      if (!('Notification' in W) || Notification.permission !== 'granted') return false;
      var opt = { body: body, icon: './assets/app/icon-192.png', badge: './assets/app/icon-192.png', tag: title };
      if (SWR && SWR.showNotification) { SWR.showNotification(title, opt); return true; }
      new Notification(title, opt); return true;
    } catch (e) { return false; }
  };

  /* ================= 74) hata bildir ================= */
  function shot() {
    var v = W.tab === 'm' ? W.world3d : W.city3d, r = v && v.renderer;
    try { if (r && v.scene && v.camera) r.render(v.scene, v.camera); var src = r.domElement, w = Math.min(480, src.width), h = Math.round(src.height * w / src.width), c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(src, 0, 0, w, h); return c.toDataURL('image/jpeg', .6); } catch (e) { return ''; }
  }
  function bugs() { try { return JSON.parse(ls('ek_bugs') || '[]'); } catch (e) { return []; } }
  function openBug() {
    var img = shot(), s = S();
    var o = popup('Hata bildir', '<div class="bg-c">' + (img ? '<img class="bg-img" src="' + img + '" alt="">' : '<div class="bg-img bg-none">📷</div>') + '<textarea maxlength="300" rows="3" placeholder="Kısa not…"></textarea><button type="button" class="yk-main" data-bg-go="1">🐞 Gönder</button></div>', 'bg-card');
    o.addEventListener('click', function (ev) {
      if (!ev.target.closest('[data-bg-go]')) return;
      var note = o.querySelector('textarea').value.trim().slice(0, 300), rec = { t: Date.now(), tab: W.tab, oc: s.l.ocak, ua: navigator.userAgent.slice(0, 120), v: (document.querySelector('script[src*="ergenekon-teknik"]') || {}).src || '', note: note, img: img, err: (W.__ekErrs || []).slice(-3) };
      var L = bugs(); L.unshift(rec); while (L.length > 12) L.pop();
      try { ls('ek_bugs', JSON.stringify(L)); } catch (e) { L.forEach(function (x, i) { if (i > 2) x.img = ''; }); ls('ek_bugs', JSON.stringify(L)); }
      share(rec); o.remove(); toast('🐞 ✓');
    });
  }
  function share(rec) {
    try {
      if (!navigator.share || !rec.img) return;
      fetch(rec.img).then(function (r) { return r.blob(); }).then(function (b) {
        var f = new File([b], 'ergenekon-hata.jpg', { type: 'image/jpeg' }), data = { title: 'Ergenekon hata', text: '🐞 ' + rec.note + ' · Ocak ' + rec.oc + ' · ' + rec.tab };
        if (navigator.canShare && navigator.canShare({ files: [f] })) data.files = [f];
        navigator.share(data).catch(function () {});
      });
    } catch (e) {}
  }
  W.__ekErrs = W.__ekErrs || [];
  W.addEventListener('error', function (e) { try { W.__ekErrs.push(String(e.message).slice(0, 160)); if (W.__ekErrs.length > 10) W.__ekErrs.shift(); } catch (x) {} });

  /* ================= 75) admin test modu ================= */
  function isAdm() { return ls('ek_adm') === ADM_HASH; }
  function sha(t) { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)).then(function (b) { return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join(''); }); }
  function askPin() {
    var o = popup('🛠️', '<div class="ad-pin"><input type="password" inputmode="numeric" maxlength="8" autocomplete="off" placeholder="••••••"><button type="button" class="yk-main" data-ad-ok="1">✓</button></div>', 'ad-card');
    var go = function () { var v = o.querySelector('input').value.trim(); if (!v || !crypto.subtle) return; sha('ergenekon-admin:' + v).then(function (h) { if (h === ADM_HASH) { ls('ek_adm', h); o.remove(); openAdmin(); } else { o.querySelector('input').value = ''; o.querySelector('input').classList.add('bad'); } }); };
    o.addEventListener('click', function (ev) { if (ev.target.closest('[data-ad-ok]')) go(); });
    o.querySelector('input').addEventListener('keydown', function (ev) { if (ev.key === 'Enter') go(); });
    setTimeout(function () { o.querySelector('input').focus(); }, 50);
  }
  function testMark() { W.TST = true; ek().tst = 1; }
  function adv(sec) { testMark(); var step = 60, n = Math.ceil(sec / step); try { for (var i = 0; i < n; i++) W.tick(step, true); } catch (e) {} try { if (S().en) S().en.t -= sec * 1000; } catch (e) {} save(); rer(); }
  var ACT = {
    t1: function () { adv(3600); }, t8: function () { adv(8 * 3600); }, t24: function () { adv(24 * 3600); },
    res: function () { testMark(); var s = S(), c = 1e9; try { c = W.cap(); } catch (e) {} ['odun', 'et', 'demir', 'komur'].forEach(function (k) { s.r[k] = c; }); s.r.celik = (s.r.celik || 0) + 50000; },
    mat: function () { testMark(); var s = S(); s.ek.dm = s.ek.dm || {}; var m = s.ek.dm.mat = s.ek.dm.mat || { kagit: 0, safir: 0, opal: 0 }; m.kagit += 10; m.safir += 10; m.opal += 10; if (W.ekHourglass) W.ekHourglass.add(5, 5); },
    hero: function () { testMark(); var s = S(); (W.HH || []).forEach(function (h, i) { s.hc[i] = (s.hc[i] || 0) + 50; }); },
    lvl: function () { testMark(); var s = S(); if ((s.l.ocak || 1) >= 40) return; s.l.ocak++; for (var k in s.l) if (k !== 'ocak' && W.B && W.B[k] && (s.l[k] || 0) < s.l.ocak) s.l[k] = Math.max(s.l[k] || 0, s.l.ocak - 1); },
    en: function () { testMark(); var s = S(); if (s.en) s.en.v = W.EN_MAX || 200; },
    ev: function () { testMark(); var s = S(), e = ek(); if (s.nv) { s.nv.last = 0; s.nv.run = 0; } if (e.oc) e.oc.ak = {}; if (e.db) e.db.cd = 0; e.dc = 0; e.us = {}; (e.mf || []).forEach(function (x) { if (x) x.t1 = Date.now(); }); if (e.pets) { e.pets.sf = Date.now(); e.pets.tulpar.cd = 0; } }
  };
  function openAdmin() {
    if (!isAdm()) { askPin(); return; }
    var B = bugs();
    var body = '<div class="ad-tag">🧪 Test · şan tablolarına yazılmaz</div><div class="ad-grid">' +
      [['t1', '⏩', '+1 sa'], ['t8', '⏩', '+8 sa'], ['t24', '⏩', '+24 sa'], ['res', '📦', 'Kaynak'], ['mat', '💎', 'Malzeme'], ['hero', '🃏', 'Kart'], ['lvl', '🔥', 'Ocak +1'], ['en', '⚡', 'Enerji'], ['ev', '🎪', 'Etkinlik']].map(function (a) { return '<button type="button" data-ad="' + a[0] + '"><i>' + a[1] + '</i><small>' + a[2] + '</small></button>'; }).join('') + '</div>' +
      '<div class="yk-sec">🐞 ' + B.length + '</div><div class="ad-bugs">' + (B.map(function (b, i) { var d = new Date(b.t); return '<div class="ad-b">' + (b.img ? '<img src="' + b.img + '" alt="">' : '<span>📷</span>') + '<div><b>' + d.getDate() + '.' + (d.getMonth() + 1) + ' ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0') + ' · ' + esc(b.tab) + ' · O' + b.oc + '</b><small>' + esc(b.note || '—') + '</small>' + (b.err && b.err.length ? '<small class="er">' + esc(b.err.join(' | ')) + '</small>' : '') + '</div><button type="button" data-ad-del="' + i + '">✕</button></div>'; }).join('') || '<p class="ad-none">—</p>') + '</div>' +
      '<div class="ad-row"><button type="button" data-ad-rates="1">🏇 Müfreze oranları</button><button type="button" data-ad-out="1">🔒 Çıkış</button></div>';
    var o0 = document.getElementById('ek-admin'); if (o0) o0.remove();
    var o = popup('Yönetici', body, 'ad-card'); o.id = 'ek-admin';
    o.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-ad],[data-ad-del],[data-ad-rates],[data-ad-out]'); if (!b) return;
      if (b.dataset.ad) { ACT[b.dataset.ad](); save(); rer(); b.classList.add('done'); setTimeout(function () { b.classList.remove('done'); }, 500); }
      else if (b.dataset.adDel) { var L = bugs(); L.splice(+b.dataset.adDel, 1); ls('ek_bugs', JSON.stringify(L)); openAdmin(); }
      else if (b.dataset.adRates) { o.remove(); rates(); }
      else if (b.dataset.adOut) { ls('ek_adm', null); o.remove(); }
    });
  }
  function rates() {
    var cur = ek().mfr || { 1: [1, 0, 10, 0, 3, 1], 2: [1, 0, 20, 0, 6, 2], 4: [2, 0, 35, 0, 10, 4], 8: [0, 1, 60, 0, 18, 7], 12: [1, 1, 100, 20, 25, 10] };
    var o = popup('🏇 Oranlar', '<p class="ad-hint">sa: [küçük, orta, kart%, 2.kart%, kağıt%, safir/opal%]</p><textarea class="ad-ta" rows="7">' + esc(JSON.stringify(cur, null, 1)) + '</textarea><button type="button" class="yk-main" data-r-ok="1">Kaydet</button>', 'ad-card');
    o.addEventListener('click', function (ev) { if (!ev.target.closest('[data-r-ok]')) return; try { var v = JSON.parse(o.querySelector('textarea').value); ek().mfr = v; save(); o.remove(); toast('✓'); } catch (e) { o.querySelector('textarea').classList.add('bad'); } });
  }

  /* ================= 77) dil altyapısı ================= */
  var LANGS = [['tr', 'Türkçe', '🇹🇷'], ['az', 'Azərbaycan', '🇦🇿'], ['kk', 'Қазақша', '🇰🇿'], ['en', 'English', '🇬🇧'], ['ar', 'العربية', '🇸🇦']];
  var I18 = { lang: 'tr', dict: null, rev: null, obs: null };
  function lang() { return ls('ek_lang') || 'tr'; }
  function loadLang(l) {
    I18.lang = l; document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('ek-rtl', l === 'ar');
    fontsFor(l);
    if (l === 'tr') { stopObs(); if (I18.dict) { restoreAll(); I18.dict = null; } return; }
    fetch('./lang/' + l + '.json?v=1').then(function (r) { return r.json(); }).then(function (d) { I18.dict = d; startObs(); translateTree(document.body); }).catch(function () {});
  }
  function fontsFor(l) {
    var id = 'ek-font-' + l; if (document.getElementById(id)) return;
    var fam = l === 'ar' ? 'Noto+Sans+Arabic:wght@400;700' : (l === 'kk' ? 'Noto+Serif:wght@600;700&family=Noto+Sans:wght@400;700' : ''); if (!fam) return;
    var k = document.createElement('link'); k.id = id; k.rel = 'stylesheet'; k.href = 'https://fonts.googleapis.com/css2?family=' + fam + '&display=swap'; document.head.appendChild(k);
  }
  var ORIG = typeof WeakMap === 'function' ? new WeakMap() : null;
  function tr(node) {
    var d = I18.dict; if (!d) return;
    if (node.nodeType === 3) {
      var raw = node.nodeValue, key = raw.trim(); if (!key || key.length > 80) return;
      var v = d[key]; if (v == null) return;
      if (ORIG && !ORIG.has(node)) ORIG.set(node, raw);
      var out = raw.replace(key, v); if (out !== raw) node.nodeValue = out;
    } else if (node.nodeType === 1) {
      ['placeholder', 'aria-label', 'title'].forEach(function (a) { var v = node.getAttribute && node.getAttribute(a); if (v && d[v.trim()] != null) node.setAttribute(a, d[v.trim()]); });
    }
  }
  function translateTree(root) { if (!I18.dict || !root) return; if (root.nodeType === 3) { tr(root); return; } tr(root); var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), n; while ((n = w.nextNode())) { if (n.nodeType === 1 && /^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.tagName)) continue; tr(n); } }
  function startObs() { if (I18.obs) return; I18.obs = new MutationObserver(function (ms) { ms.forEach(function (m) { if (m.type === 'characterData') tr(m.target); else m.addedNodes.forEach(translateTree); }); }); I18.obs.observe(document.body, { childList: true, subtree: true, characterData: true }); }
  function stopObs() { if (I18.obs) { I18.obs.disconnect(); I18.obs = null; } }
  function restoreAll() { location.reload(); }
  W.ekT = function (k) { return (I18.dict && I18.dict[k]) || k; };

  /* ================= ayarlar satırı ================= */
  function settings() {
    var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g' || tg.querySelector('#ek-tek')) return;
    var box = document.createElement('div'); box.id = 'ek-tek'; box.className = 'card';
    var cur = lang();
    box.innerHTML = '<div class="tk-lang">' + LANGS.map(function (l) { return '<button type="button" data-lg="' + l[0] + '" class="' + (cur === l[0] ? 'on' : '') + '" title="' + l[1] + '"><i>' + l[2] + '</i><small>' + l[0].toUpperCase() + '</small></button>'; }).join('') + '</div>' +
      '<div class="tk-row">' + (standalone() ? '' : '<button type="button" data-tk="ins"><i>📲</i><small>Ana ekrana ekle</small></button>') + '<button type="button" data-tk="bug"><i>🐞</i><small>Hata bildir</small></button><button type="button" data-tk="adm" class="tk-adm" aria-label="Yönetici"><i>' + (isAdm() ? '🛠️' : '⋯') + '</i></button></div>';
    box.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-lg],[data-tk]'); if (!b) return;
      if (b.dataset.lg) { var l = b.dataset.lg; ls('ek_lang', l === 'tr' ? null : l); if (l === 'tr' && I18.lang !== 'tr') { location.reload(); return; } loadLang(l); box.querySelectorAll('[data-lg]').forEach(function (x) { x.classList.toggle('on', x.dataset.lg === l); }); }
      else if (b.dataset.tk === 'ins') install(); else if (b.dataset.tk === 'bug') openBug(); else if (b.dataset.tk === 'adm') openAdmin();
    });
    var k = tg.querySelector('#ek-kolay'); tg.insertBefore(box, k ? k.nextSibling : tg.firstChild);
  }

  var tEl = null;
  function toast(t) { if (!tEl) { tEl = document.createElement('div'); tEl.id = 'ek-rec-t'; document.body.appendChild(tEl); } tEl.textContent = t; tEl.className = ''; void tEl.offsetWidth; tEl.classList.add('on'); clearTimeout(tEl.__t); tEl.__t = setTimeout(function () { tEl.classList.remove('on'); }, 2500); }

  var l1 = 0;
  function frame(now) { requestAnimationFrame(frame); if (document.hidden) return; if (now - l1 > 400) { l1 = now; try { settings(); } catch (e) {} } }
  function start() { if (!S()) { setTimeout(start, 400); return; } if (lang() !== 'tr') loadLang(lang()); requestAnimationFrame(frame); }
  swInit(); start();
  W.ergenekonTeknik = { openBug: openBug, openAdmin: openAdmin, install: install, loadLang: loadLang };
})();
