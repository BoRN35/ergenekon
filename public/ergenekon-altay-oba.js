/* Ergenekon — Altay görünümü: 2.5D oba (King of Altay mantığı). Claude, 22 Kasım 2026.
   3D oba sahnesinin yerine: boyalı zemin + elle çizilmiş bina görselleri (assets/img/bina_*_t1..t4) sabit yuvalarda,
   NPC otağları, seviye levhaları, yapım süresi, yükseltilebilir oku, hilal; sol sütunda oba işleri; kaydır/yakınlaştır.
   Oyun mantığı, kayıt ve kurallar aynen: binaya dokununca oyunun kendi yapı penceresi açılır (window.BMK).
   3D oba ve modelleri 22 Kasım'da kaldırıldı; 3D sahne yalnız parsel/arka plan hesapları için yüklenir, çizilmez. */
(function () {
  'use strict';
  var W = window, D = document, H = D.documentElement;
  if (W.__ekAO) return; W.__ekAO = true;
  function on() { return true; } // 3D oba kaldırıldı (22 Kasım)
  var IMGP = './assets/img/';
  var WW = 2400, WH = 2700, CX = 1100, CY = 1080, OX = 100, OY = 260;
  // bina yuvaları: [x, y, genişlik, görsel anahtarı]
  var SL = {
    oba: [1100, 560, 320, 'kale'], komurluk: [790, 340, 180, 'bina_odunluk'], harpakademi: [1410, 340, 190, 'bina_kisla'],
    yurt: [740, 840, 200, 'bina_yurt'], ocak: [1100, 860, 260, 'bina_ocak'], sifa: [1460, 840, 200, 'bina_sifa'],
    odunluk: [730, 1080, 210, 'bina_odunluk'], ambar: [1100, 1110, 210, 'bina_ambar'], avci: [1470, 1080, 210, 'bina_avci'],
    kisla: [740, 1330, 220, 'bina_kisla'], demirci: [1460, 1330, 220, 'bina_demirci'],
    gozcu: [720, 1570, 160, 'bina_gozcu'], sur: [1100, 1600, 240, 'bina_sur'], bilgelik: [1480, 1570, 200, 'bina_yurt']
  };
  // NPC otağları: [x, y, genişlik, görsel, ad, simge]
  var NP = {
    kurultay: [740, 610, 210, 'bina_yurt', 'Kurultay', 'crown'], ocak: [1460, 610, 180, 'dekor_cadir', 'Boy Meclisi', 'fire'],
    tug: [1100, 1330, 105, 'dekor_bayrak_kirmizi', 'Tuğ', 'flag'], sefer: [760, 1800, 190, 'kafile', 'Sefer', 'compass'],
    agil: [1440, 1800, 150, 'npc_atli', 'Ağıl', 'horse'], hazine: [920, 1350, 100, 'sandik', 'Hazine', 'gem'], arena: [1100, 1820, 120, 'npc_alper', 'Arena', 'swords']
  };
  // dikey (telefon) yerleşim; dünya genişletildi, tüm yuvalar kaydırılır
  (function () { var k; for (k in SL) { SL[k][0] += OX; SL[k][1] += OY; } for (k in NP) { NP[k][0] += OX; NP[k][1] += OY; } CX += OX; CY += OY; })();
  var ICON = {
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>', fire: '<path d="M12 3c3 4 6 6 6 10a6 6 0 0 1-12 0c0-3 2-5 3-7 1 2 2 3 3 3 0-2 0-4 0-6z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>', horse: '<path d="M5 20l2-6-2-3 4-6 5 1 5 4-2 2-3-1-1 3 2 6"/>',
    flag: '<path d="M6 21V3M6 4c4-2 7 2 12 0v8c-5 2-8-2-12 0"/>', gem: '<path d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l3 16M15 4l-3 16"/>',
    swords: '<path d="M5 19L17 7M14 5l5 5M19 19L7 7M10 5L5 10M4 20l2-2M20 20l-2-2"/>', up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    axe: '<path d="M14 4l6 6-3 3-6-6zM11 7L3 21"/>', wheat: '<path d="M12 21V8M12 8c-3 0-4-3-4-5 3 0 4 2 4 5zm0 0c3 0 4-3 4-5-3 0-4 2-4 5zM12 13c-3 0-4-3-4-5 3 0 4 2 4 5zm0 0c3 0 4-3 4-5-3 0-4 2-4 5z"/>'
  };
  function svg(n, sz) { return '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[n] || '') + '</svg>'; }
  function S() { return W.s; }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + 'sn'; } }
  function tier(L) { return L < 10 ? 1 : L < 20 ? 2 : L < 30 ? 3 : 4; }
  function art(k, L) {
    var a = SL[k][3];
    if (a === 'kale') return IMGP + 'kale_' + Math.max(1, Math.min(5, Math.ceil(Math.max(1, L) / 8))) + '.webp';
    if (k === 'bilgelik' || k === 'komurluk' || k === 'harpakademi') return IMGP + a + '.webp';
    return IMGP + a + '_t' + tier(L) + '.webp';
  }

  /* ---------- boyalı zemin ---------- */
  function rnd(a) { var x = Math.sin(a * 9301 + 49297) * 233280; return x - Math.floor(x); }
  function paintGround(cv) {
    cv.width = WW / 2; cv.height = WH / 2; var g = cv.getContext('2d'), w = cv.width, h = cv.height, cx = CX / 2, cy = CY / 2;
    g.scale(1, 1);
    var px = SL.ocak[0] / 2, py = SL.ocak[1] / 2 + 10; var gr = g.createRadialGradient(cx, cy, 50, cx, cy, w * .8); gr.addColorStop(0, '#8fb34f'); gr.addColorStop(.55, '#6f9a3f'); gr.addColorStop(1, '#4a7330');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    // dağlar ve Demir Dağ
    var mg = g.createLinearGradient(0, 0, 0, 150); mg.addColorStop(0, '#5f6f86'); mg.addColorStop(1, '#7f8a6a');
    g.fillStyle = mg; g.beginPath(); g.moveTo(0, 140);
    for (var i = 0; i <= 24; i++) { var x = i / 24 * w, y = 60 + Math.sin(i * 1.7) * 26 + rnd(i) * 40; g.lineTo(x, y); }
    g.lineTo(w, 160); g.lineTo(0, 170); g.closePath(); g.fill();
    g.fillStyle = '#4a4a58'; g.beginPath(); g.moveTo(w * .62, 150); g.lineTo(w * .74, 18); g.lineTo(w * .8, 40); g.lineTo(w * .88, 10); g.lineTo(w * .98, 150); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(255,120,40,.85)'; g.lineWidth = 2.2; g.shadowColor = '#ff6a1a'; g.shadowBlur = 8;
    [[.74, 22, .7, 70, .73, 110], [.88, 14, .9, 60, .86, 120], [.8, 42, .82, 90, .79, 130]].forEach(function (p) { g.beginPath(); g.moveTo(w * p[0], p[1]); g.quadraticCurveTo(w * p[2], p[3], w * p[4], p[5]); g.stroke(); });
    g.shadowBlur = 0;
    var fg = g.createLinearGradient(0, 120, 0, 190); fg.addColorStop(0, 'rgba(111,154,63,0)'); fg.addColorStop(1, 'rgba(111,154,63,1)'); g.fillStyle = fg; g.fillRect(0, 120, w, 70);
    // çim dokusu
    for (i = 0; i < 9000; i++) { var px = rnd(i * 3.1) * w, py = 150 + rnd(i * 7.7) * (h - 150), l = rnd(i * 1.3); g.fillStyle = l < .5 ? 'rgba(40,80,20,.16)' : 'rgba(190,220,120,.16)'; g.fillRect(px, py, 1 + rnd(i) * 2, 1); }
    for (i = 0; i < 70; i++) { var bx = rnd(i * 5.3) * w, by = 170 + rnd(i * 2.9) * (h - 170), br = 20 + rnd(i * 8.1) * 60; var bg = g.createRadialGradient(bx, by, 1, bx, by, br); bg.addColorStop(0, rnd(i) < .5 ? 'rgba(160,190,80,.25)' : 'rgba(50,90,30,.22)'); bg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = bg; g.beginPath(); g.ellipse(bx, by, br * 1.6, br, 0, 0, 7); g.fill(); }
    // nehir
    g.lineCap = 'round'; g.strokeStyle = '#3f7ea0'; g.lineWidth = 34; g.beginPath(); g.moveTo(-20, 330); g.bezierCurveTo(140, 380, 160, 560, 70, 720); g.bezierCurveTo(10, 840, 60, 980, -20, 1150); g.stroke();
    g.strokeStyle = '#6fb2d0'; g.lineWidth = 16; g.stroke(); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 3; g.setLineDash([12, 18]); g.stroke(); g.setLineDash([]);
    // yollar
    var road = function (x1, y1, x2, y2, wd) { g.strokeStyle = 'rgba(120,90,50,.35)'; g.lineWidth = wd + 8; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.strokeStyle = '#c4a56f'; g.lineWidth = wd; g.stroke(); g.strokeStyle = 'rgba(230,205,150,.6)'; g.lineWidth = wd * .35; g.stroke(); };
    road(px, py, px, h + 10, 30); road(px, py, px, 160, 26); road(px, py, -10, py + 120, 22); road(px, py, w + 10, py + 120, 22); road(cx, (SL.ambar[1] + 110) / 2, -10, (SL.ambar[1] + 260) / 2, 18); road(cx, (SL.ambar[1] + 110) / 2, w + 10, (SL.ambar[1] + 260) / 2, 18);
    // meydan
    var pg = g.createRadialGradient(px, py, 10, px, py, 230); pg.addColorStop(0, '#d8bd85'); pg.addColorStop(.8, '#c4a56f'); pg.addColorStop(1, 'rgba(196,165,111,0)');
    g.fillStyle = pg; g.beginPath(); g.ellipse(px, py, 230, 240, 0, 0, 7); g.fill();
    // taş çember
    g.strokeStyle = 'rgba(110,90,60,.55)'; g.lineWidth = 3; g.setLineDash([6, 8]); g.beginPath(); g.ellipse(px, py, 150, 120, 0, 0, 7); g.stroke(); g.setLineDash([]);
    // çit (kazık sırası)
    var rx = 440, ry = 560, n = 230, posts = [];
    for (i = 0; i < n; i++) { var a = i / n * Math.PI * 2; if (Math.abs(a - Math.PI / 2) < .09) continue; posts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
    posts.sort(function (p, q) { return p[1] - q[1]; }).forEach(function (p) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(p[0] + 2, p[1] - 2, 4, 6); g.fillStyle = '#7a5230'; g.fillRect(p[0] - 2, p[1] - 16, 5, 17); g.fillStyle = '#a3753f'; g.fillRect(p[0] - 2, p[1] - 16, 2, 17); g.fillStyle = '#5a3a1e'; g.beginPath(); g.moveTo(p[0] - 2, p[1] - 16); g.lineTo(p[0] + .5, p[1] - 20); g.lineTo(p[0] + 3, p[1] - 16); g.fill(); });
    // yapı zeminleri (toprak)
    var plots = [];
    for (var k in SL) plots.push([SL[k][0] / 2, SL[k][1] / 2 - 4, SL[k][2] / 2 * .9]);
    for (k in NP) plots.push([NP[k][0] / 2, NP[k][1] / 2 - 4, NP[k][2] / 2 * .8]);
    plots.forEach(function (p) { var dg = g.createRadialGradient(p[0], p[1], 2, p[0], p[1], p[2] * .6); dg.addColorStop(0, 'rgba(170,135,80,.75)'); dg.addColorStop(.8, 'rgba(170,135,80,.35)'); dg.addColorStop(1, 'rgba(170,135,80,0)'); g.fillStyle = dg; g.beginPath(); g.ellipse(p[0], p[1], p[2] * .62, p[2] * .3, 0, 0, 7); g.fill(); });
    // arena kum çemberi
    var ax = NP.arena[0] / 2, ay = NP.arena[1] / 2 - 6; g.fillStyle = '#d9c08a'; g.beginPath(); g.ellipse(ax, ay, 70, 38, 0, 0, 7); g.fill(); g.strokeStyle = '#7a5230'; g.lineWidth = 3; g.stroke();
    // ağıl çiti
    var gx = NP.agil[0] / 2, gy = NP.agil[1] / 2 - 4; g.strokeStyle = '#7a5230'; g.lineWidth = 3; g.beginPath(); g.ellipse(gx, gy, 62, 32, 0, 0, 7); g.stroke(); g.fillStyle = 'rgba(200,170,100,.5)'; g.fill();
  }

  /* ---------- sahne ---------- */
  var R = { el: null, world: null, s: .5, x: 0, y: 0, items: {}, built: false };
  function fit() {
    var host = R.el; if (!host) return; var w = host.clientWidth, h = host.clientHeight;
    var mob = w < 700, s = mob ? w / 1080 : Math.min(1, Math.max(.4, Math.min(w / 1900, h / 1300)));
    R.min = mob ? .26 : .3; R.max = 1.1; R.s = Math.max(R.min, s);
    R.x = w / 2 - CX * R.s; R.y = h / 2 - (CY - (mob ? 300 : 40)) * R.s; clamp(); apply();
  }
  function clamp() { var w = R.el.clientWidth, h = R.el.clientHeight; R.s = Math.max(R.min || .3, Math.min(R.max || 1.1, R.s)); var ww = WW * R.s, wh = WH * R.s; R.x = ww <= w ? (w - ww) / 2 : Math.min(0, Math.max(w - ww, R.x)); R.y = wh <= h ? (h - wh) / 2 : Math.min(0, Math.max(h - wh, R.y)); }
  function apply() { R.world.style.transform = 'translate(' + R.x.toFixed(1) + 'px,' + R.y.toFixed(1) + 'px) scale(' + R.s.toFixed(4) + ')'; R.world.style.setProperty('--s', R.s.toFixed(4)); }
  function sprite(src, x, y, w, cls) {
    var im = D.createElement('img'); im.src = src; im.alt = ''; im.draggable = false; im.className = 'ao-sp' + (cls ? ' ' + cls : '');
    im.style.cssText = 'left:' + (x - w / 2) + 'px;top:' + (y - w * .86) + 'px;width:' + w + 'px;height:' + w + 'px;z-index:' + Math.round(y);
    R.world.appendChild(im); return im;
  }
  function build() {
    var cv = D.getElementById('cityv'); if (!cv || !S()) return false;
    R.el = D.createElement('div'); R.el.id = 'ek-ao';
    R.world = D.createElement('div'); R.world.className = 'ao-world'; R.world.style.width = WW + 'px'; R.world.style.height = WH + 'px';
    var c = D.createElement('canvas'); c.className = 'ao-ground'; paintGround(c); R.world.appendChild(c);
    R.el.appendChild(R.world); cv.insertBefore(R.el, cv.firstChild);
    // süs: ağaçlar, bayraklar, saman, köylüler
    var tr = [];
    for (var i = 0; i < 80; i++) {
      var a = rnd(i * 4.4) * Math.PI * 2, rr = 1.12 + rnd(i * 2.2) * .9, x = CX + Math.cos(a) * 900 * rr, y = CY + Math.sin(a) * 1130 * rr;
      if (x < 60 || x > WW - 60 || y < 420 || y > WH - 20) continue; if (x < 330 && y < 1500) continue; tr.push([x, y, 110 + rnd(i) * 70]);
    }
    tr.forEach(function (t) { sprite(IMGP + 'dekor_agac_yaz.webp', t[0], t[1], t[2], 'ao-dec'); });
    [[960, 470, 'dekor_bayrak_mavi', 80], [1240, 470, 'dekor_bayrak_mavi', 80], [980, 1700, 'dekor_bayrak_kirmizi', 75], [1220, 1700, 'dekor_bayrak_kirmizi', 75], [1600, 1180, 'dekor_saman_fici', 85], [600, 1200, 'dekor_cit_odun', 100], [600, 1440, 'dekor_saman_fici', 80], [1600, 1440, 'dekor_cit_odun', 95]].forEach(function (d) { sprite(IMGP + d[2] + '.webp', d[0] + OX, d[1] + OY, d[3], 'ao-dec'); });
    [[950, 980, 'npc_koylu_erkek', 70], [1260, 980, 'npc_koylu_kadin', 66], [610, 1000, 'npc_oduncu', 70], [1590, 1000, 'npc_avci', 70], [1300, 1240, 'npc_demirci', 70], [900, 700, 'npc_kam', 70], [1260, 1480, 'npc_okcu', 66]].forEach(function (d, j) { var im = sprite(IMGP + d[2] + '.webp', d[0] + OX, d[1] + OY, d[3], 'ao-dec ao-walk'); im.style.animationDelay = (j * .7) + 's'; });
    // NPC otağları
    for (var id in NP) (function (id) {
      var n = NP[id], im = sprite(IMGP + n[3] + '.webp', n[0], n[1], n[2], 'ao-npc'); im.dataset.npc = id;
      var md = D.createElement('div'); md.className = 'ao-md'; md.dataset.npc = id; md.innerHTML = '<span class="ao-mdi">' + svg(n[5], 20) + '</span><b>' + n[4] + '</b><em class="ao-hil"></em>';
      md.style.cssText = 'left:' + n[0] + 'px;top:' + (n[1] - n[2] * .9) + 'px;z-index:' + (3000 + Math.round(n[1]));
      R.world.appendChild(md); R.items['npc:' + id] = { im: im, md: md };
    })(id);
    // binalar
    for (var k in SL) (function (k) {
      var b = SL[k], im = sprite(art(k, 1), b[0], b[1], b[2], 'ao-b'); im.dataset.b = k;
      var pl = D.createElement('div'); pl.className = 'ao-pl'; pl.dataset.b = k; pl.style.cssText = 'left:' + b[0] + 'px;top:' + (b[1] + 6) + 'px;z-index:' + (3000 + Math.round(b[1]));
      var up = D.createElement('div'); up.className = 'ao-up'; up.dataset.b = k; up.innerHTML = svg('up', 20); up.style.cssText = 'left:' + (b[0] + b[2] * .28) + 'px;top:' + (b[1] - b[2] * .78) + 'px;z-index:' + (3001 + Math.round(b[1]));
      R.world.appendChild(pl); R.world.appendChild(up); R.items[k] = { im: im, pl: pl, up: up, src: '' };
    })(k);
    // oba işleri (sol sütun)
    R.jobs = D.createElement('div'); R.jobs.id = 'ao-jobs'; cv.appendChild(R.jobs);
    R.jobs.addEventListener('click', function (ev) { var b = ev.target.closest('[data-jp]'); if (!b) return; if (W.ekOpenParcel) W.ekOpenParcel(b.dataset.jp); });
    input(); fit(); R.built = true; return true;
  }

  /* ---------- dokunma: kaydır / yakınlaştır / seç ---------- */
  function input() {
    var P = {}, start = null, moved = false, pinch = null;
    R.el.addEventListener('pointerdown', function (e) { R.el.setPointerCapture && R.el.setPointerCapture(e.pointerId); P[e.pointerId] = [e.clientX, e.clientY]; var ks = Object.keys(P); if (ks.length === 1) { start = { x: e.clientX, y: e.clientY, ox: R.x, oy: R.y, t: Date.now(), target: e.target }; moved = false; } else if (ks.length === 2) { var a = P[ks[0]], b = P[ks[1]]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: R.s, mx: (a[0] + b[0]) / 2, my: (a[1] + b[1]) / 2, ox: R.x, oy: R.y }; moved = true; } });
    R.el.addEventListener('pointermove', function (e) {
      if (!P[e.pointerId]) return; P[e.pointerId] = [e.clientX, e.clientY]; var ks = Object.keys(P);
      if (ks.length === 2 && pinch) { var a = P[ks[0]], b = P[ks[1]], d = Math.hypot(a[0] - b[0], a[1] - b[1]), r = R.el.getBoundingClientRect(), mx = pinch.mx - r.left, my = pinch.my - r.top, ns = Math.max(R.min, Math.min(R.max, pinch.s * d / pinch.d)); R.x = mx - (mx - pinch.ox) * ns / pinch.s; R.y = my - (my - pinch.oy) * ns / pinch.s; R.s = ns; clamp(); apply(); return; }
      if (start && ks.length === 1) { var dx = e.clientX - start.x, dy = e.clientY - start.y; if (!moved && Math.hypot(dx, dy) > 8) moved = true; if (moved) { R.x = start.ox + dx; R.y = start.oy + dy; clamp(); apply(); } }
    });
    function up(e) { var had = !!P[e.pointerId]; delete P[e.pointerId]; if (Object.keys(P).length < 2) pinch = null; if (!had || Object.keys(P).length) return; if (start && !moved) tap(D.elementFromPoint(e.clientX, e.clientY) || start.target); start = null; }
    R.el.addEventListener('pointerup', up); R.el.addEventListener('pointercancel', function (e) { delete P[e.pointerId]; pinch = null; start = null; });
    R.el.addEventListener('wheel', function (e) { e.preventDefault(); var r = R.el.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top, ns = Math.max(R.min, Math.min(R.max, R.s * (e.deltaY < 0 ? 1.12 : 1 / 1.12))); R.x = mx - (mx - R.x) * ns / R.s; R.y = my - (my - R.y) * ns / R.s; R.s = ns; clamp(); apply(); }, { passive: false });
  }
  function tap(t) {
    if (!t || !t.closest) return; var b = t.closest('[data-b]'), n = t.closest('[data-npc]');
    try { navigator.vibrate && navigator.vibrate(8); } catch (e) {}
    if (b) { var k = b.dataset.b; W.BMK = k; W.selB = k; W.tab = 'c'; try { W.render(); } catch (e) {} return; }
    if (n) { var id = n.dataset.npc; if (id === 'arena') { if (W.ekGoArena) W.ekGoArena(); } else if (W.ekNpcOpen) W.ekNpcOpen(id); }
  }

  /* ---------- her an güncellenen durum ---------- */
  function reqOk(k) { var s = S(); try { return (W.buildingRequirements(k) || []).every(function (r) { return (s.l[r.key] || 0) >= r.level; }); } catch (e) { return false; } }
  function update() {
    var s = S(), B = W.B || {};
    for (var k in SL) {
      var it = R.items[k]; if (!it) continue; var L = (s.l && s.l[k]) || 0, def = B[k];
      var show = !!def && (L > 0 || reqOk(k)); it.im.hidden = it.pl.hidden = !show; if (!show) { it.up.hidden = true; continue; }
      var src = L > 0 ? art(k, L) : IMGP + 'dekor_cit_odun.webp'; if (it.src !== src) { it.src = src; it.im.src = src; it.im.classList.toggle('ao-plot', !L); }
      var q = null, can = false; try { q = W.buildQueue(k); can = !q && L > 0 && W.can(k); } catch (e) {}
      var nm = def.n.length > 14 ? def.n.split(' ')[0] : def.n;
      var h = L > 0 ? '<span class="ao-n"><b>' + L + '</b>' + nm + '</span>' : '<span class="ao-n ao-new">🔨 ' + nm + '</span>';
      if (q && q.left > 0) h += '<span class="ao-t">⏱ ' + ft(q.left) + '</span><span class="ao-bar"><i style="width:' + Math.max(3, Math.min(100, 100 - q.left / (q.tot || 1) * 100)).toFixed(0) + '%"></i></span>';
      if (it.pl.__aoh !== h) { it.pl.__aoh = h; it.pl.innerHTML = h; }
      it.up.hidden = !can;
    }
    for (var id in NP) {
      var x = R.items['npc:' + id]; if (!x) continue; var src2 = D.querySelector('#ek-npcs [data-npc="' + id + '"]');
      var hil = !!(src2 && src2.querySelector('.np-hil')), lk = !!(src2 && src2.classList.contains('lk'));
      x.md.classList.toggle('hil', hil); x.md.classList.toggle('lk', lk); x.im.classList.toggle('lk', lk);
    }
    // oba işleri: 3D katmanındaki parsel düğmelerinden
    var L2 = W.ekParcelList ? W.ekParcelList() : [], jh = '';
    // önce sürenler, sonra yapılabilecek işler; en çok 5
    L2.sort(function (a, b) { var r = function (x) { return x.t ? 0 : x.kind === 'field' ? 2 : 1; }; return r(a) - r(b); });
    var shown = 0, fields = 0;
    L2.forEach(function (j) { if (j.kind === 'field') { fields++; return; } if (shown >= (W.innerWidth < 700 ? 3 : 4)) return; shown++; jh += '<button type="button" class="ao-job ao-' + j.kind + (j.dim ? ' dim' : '') + '" data-jp="' + j.id + '" title="' + (j.kind === 'cut' ? 'Ağaçları kes' : j.kind === 'stump' ? 'Tarla aç' : '') + '">' + svg(j.kind === 'cut' ? 'axe' : 'wheat', 20) + (j.t ? '<small>' + j.t + '</small>' : '<i>zZ</i>') + '</button>'; });
    if (fields) { var f0 = L2.filter(function (j) { return j.kind === 'field'; })[0]; jh += '<button type="button" class="ao-job ao-field" data-jp="' + f0.id + '" title="Tarlalar">' + svg('wheat', 20) + '<small>' + fields + ' tarla</small></button>'; }
    if (R.jobs.__aoh !== jh) { R.jobs.__aoh = jh; R.jobs.innerHTML = jh; }
  }

  /* ---------- açma / kapama, 3D'yi susturma ---------- */
  var muted = false;
  function mute3D() {
    var c = W.city3d; if (!c || !c.renderer || muted) return; muted = true;
    var r = c.renderer, orig = r.render.bind(r);
    try { r.setPixelRatio(.2); r.shadowMap.enabled = false; } catch (e) {} // oba 3D çizimi yok: bellek ve pil tasarrufu
    r.render = function () { if (on() && W.tab === 'c' && !D.querySelector('.hearth-gallery:not([hidden]),.building-gallery:not([hidden])')) return; return orig.apply(null, arguments); };
  }
  var last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    var o = on(); H.classList.toggle('ao', o);
    if (!o) { if (R.el) R.el.hidden = true; if (R.jobs) R.jobs.hidden = true; return; }
    if (!R.built) { if (!build()) return; }
    mute3D();
    var vis = W.tab === 'c'; R.el.hidden = !vis; R.jobs.hidden = !vis || !R.jobs.innerHTML; if (!vis) return;
    if (R.el.parentNode !== D.getElementById('cityv')) { var cv = D.getElementById('cityv'); if (cv) { cv.insertBefore(R.el, cv.firstChild); cv.appendChild(R.jobs); } }
    if (now - last < 500) return; last = now;
    try { update(); } catch (e) {}
  }
  requestAnimationFrame(loop);
  var lw = 0; W.addEventListener('resize', function () { if (R.built && R.el.clientWidth !== lw) { lw = R.el.clientWidth; fit(); } });
  W.ekBinaArt = function (k) { if (!SL[k]) return null; var L = (S() && S().l && S().l[k]) || 1; return art(k, Math.max(1, L)); };
  W.ekAO = { fit: fit, state: R, update: update };
})();
