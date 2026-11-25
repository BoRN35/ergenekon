/* Ergenekon bozkır faunası — Claude, 17 Kasım 2026.
   Haritadaki sıradan canavarlara tür çeşitliliği ve seviye dağılımı verir,
   yeni türlerin 3D modellerini çizer (city3d paketi window.ekMonsterModel kancasını çağırır). */
(function (W) {
  'use strict';
  if (W.__ekFauna) return; W.__ekFauna = true;
  // [ad, emoji, en düşük sv, en yüksek sv, model/base no, ağırlık]
  // 0-12 oyunun kendi türleri; 13+ yeni türler
  var SP = [
    ['Çayır Kurdu', '🐺', 1, 6, 12, 5],
    ['Karaca', '🦌', 1, 8, 21, 5],
    ['Kızıl Tilki', '🦊', 1, 7, 15, 4],
    ['Yaban Domuzu', '🐗', 2, 10, 14, 5],
    ['Ala Geyik', '🦌', 3, 12, 13, 3],
    ['Bozkır Kurdu', '🐺', 4, 12, 0, 4],
    ['Kara Ayı', '🐻', 5, 14, 1, 3],
    ['Börü Kartalı', '🦅', 6, 16, 17, 3],
    ['Yılan Ruhu', '🐍', 7, 16, 2, 2],
    ['Bozayı', '🐻', 11, 20, 22, 5],
    ['Alageyik', '🦌', 11, 20, 23, 5],
    ['Vaşak', '🐈', 11, 20, 24, 4],
    ['Yaban Atı Sürüsü', '🐎', 12, 20, 25, 4],
    ['Yaban Öküzü', '🐃', 9, 18, 18, 3],
    ['Albastı', '👺', 10, 19, 3, 2],
    ['Kar Parsı', '🐆', 12, 22, 19, 3],
    ['Kızıl Boğa', '🐂', 13, 23, 4, 2],
    ['Anadolu Parsı', '🐆', 21, 30, 26, 5],
    ['Dağ Keçisi Sürüsü', '🐐', 21, 30, 27, 5],
    ['Kartal', '🦅', 21, 30, 28, 4],
    ['Kara Kurt Sürüsü', '🐺', 22, 30, 29, 5],
    ['Buz Devi', '🧊', 18, 27, 5, 2],
    ['Bozkır Mamutu', '🦣', 20, 29, 20, 3],
    ['Tepegöz', '👁️', 22, 31, 6, 2],
    ['Karakoncolos', '👹', 24, 33, 7, 2],
    ['Ak Geyik', '🦌', 31, 40, 30, 5],
    ['Kara Boğa', '🐂', 31, 40, 31, 5],
    ['Börü Ana’nın Yavruları', '🐺', 31, 40, 32, 4],
    ['Ejder Yavrusu', '🐉', 32, 40, 33, 4],
    ['Evren Ejderi', '🐉', 30, 39, 8, 2],
    ['Demir Dev', '🗿', 33, 39, 9, 2],
    ['Erlik’in Gölgesi', '👻', 35, 39, 10, 2]
  ];
  var HERD = { 25: 1, 27: 1, 29: 1, 32: 1 }, PACK = { 0: 1, 12: 1, 29: 1, 32: 1, 25: 1, 27: 1 }, LEGEND = { 30: 1, 32: 1, 33: 1 };
  W.ekFaunaLegend = LEGEND;
  function rnd(i) { var x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function reassign() {
    var M = W.M; if (!M || M.length < 14 || M.__ekFauna) return;
    for (var i = 13; i < M.length; i++) {
      var m = M[i]; if (!m) continue;
      var lv = Math.max(1, Math.min(39, m[2] + Math.round((rnd(i) - 0.35) * 3)));
      var pool = SP.filter(function (sp) { return lv >= sp[2] && lv <= sp[3]; });
      if (!pool.length) continue;
      var tot = pool.reduce(function (a, sp) { return a + sp[5]; }, 0), r = rnd(i + 999) * tot, pick = pool[0];
      for (var k = 0; k < pool.length; k++) { r -= pool[k][5]; if (r <= 0) { pick = pool[k]; break; } }
      var x = m[3] + (rnd(i + 7) - .5) * 2.4, y = m[4] + (rnd(i + 11) - .5) * 2.4;
      M[i] = [pick[0], pick[1], lv, x, y, pick[4]];
    }
    // sürü/kurt grupları: aynı türden yakın komşular 2–3'lü öbek olur
    for (var j = 14; j < M.length; j++) {
      var a = M[j], b0 = a && PACK[a[5]] ? a : null; if (!b0 || rnd(j + 5) < .35) continue;
      for (var q = 13; q < j; q++) { var c = M[q]; if (!c || c[5] !== a[5] || Math.abs(c[2] - a[2]) > 4) continue; var dd = Math.hypot(c[3] - a[3], c[4] - a[4]); if (dd < 9 && dd > 2.2) { var ang = rnd(j * 3) * Math.PI * 2; a[3] = c[3] + Math.cos(ang) * 2.4; a[4] = c[4] + Math.sin(ang) * 2.4; break; } }
    }
    M.__ekFauna = true;
  }
  reassign();

  /* ---------- 3D modeller ---------- */
  var BASES = { 13: 'geyik', 14: 'domuz', 15: 'tilki', 17: 'kartal', 18: 'okuz', 19: 'pars', 20: 'mamut', 21: 'karaca', 22: 'bozayi', 23: 'alageyik', 24: 'vasak', 25: 'atsurusu', 26: 'anadoluparsi', 27: 'keci', 28: 'kartal2', 29: 'karakurt', 30: 'akgeyik', 31: 'karaboga', 32: 'boruyavru', 33: 'ejderyavru' };
  function quad(T, g, o) {
    // gövde +x yönüne bakar; o: renkler ve oranlar
    var body = T.mat(o.c, true), dark = T.mat(o.d || '#3a3430', true), eye = T.mat('#e0a35a', true, { emissive: '#b5521f', emissiveIntensity: .4 });
    var L = o.leg || 1.1, bh = L + (o.bh || .6);
    T.put(new T.Sphere(1, 10, 7), body, g, 0, bh, 0).scale.set(o.len || 1.5, o.h || .75, o.w || .65);
    for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2)
      T.put(new T.Cyl(o.lt || .12, o.lt ? o.lt * 1.2 : .15, L, 6), o.legc ? T.mat(o.legc, true) : dark, g, a * (o.lx || .9), L / 2, b * (o.lz || .4));
    var hx = (o.len || 1.5) * .9, hy = bh + (o.hy || .45);
    T.put(new T.Sphere(o.hr || .5, 8, 6), body, g, hx, hy, 0).scale.set(o.hsx || 1.2, 1, .9);
    T.put(new T.Cone(o.sr || .28, o.sl || .6, 6), o.snc ? T.mat(o.snc, true) : body, g, hx + (o.hr || .5) * 1.1, hy - .08, 0).rotation.z = -Math.PI / 2;
    for (var e = -1; e <= 1; e += 2) T.put(new T.Sphere(.06, 6, 4), eye, g, hx + (o.hr || .5) * .7, hy + .15, e * .26);
    return { body: body, dark: dark, hx: hx, hy: hy, bh: bh };
  }
  var MODELS = {
    geyik: function (T, g) {
      var q = quad(T, g, { c: '#a8774a', d: '#5a3d24', leg: 1.55, lt: .08, len: 1.25, h: .6, w: .5, hr: .38, sr: .2, sl: .5, hy: .9, snc: '#3b2a1c' });
      var ant = T.mat('#d9c7a4', true);
      for (var s = -1; s <= 1; s += 2) {
        T.put(new T.Cyl(.05, .07, 1.1, 5), ant, g, q.hx - .1, q.hy + .75, s * .25).rotation.x = s * .35;
        T.put(new T.Cyl(.04, .05, .55, 5), ant, g, q.hx + .15, q.hy + 1.05, s * .45).rotation.z = -.7;
        T.put(new T.Cyl(.04, .05, .5, 5), ant, g, q.hx - .25, q.hy + 1.2, s * .4).rotation.z = .6;
      }
      T.put(new T.Sphere(.22, 6, 5), T.mat('#f2e6d0', true), g, -1.25, q.bh + .25, 0);
      T.put(new T.Sphere(.6, 8, 6), T.mat('#e8d6b8', true), g, .3, q.bh - .35, 0).scale.set(1.6, .45, .8);
    },
    domuz: function (T, g) {
      var q = quad(T, g, { c: '#4a3a30', d: '#2a221d', leg: .7, lt: .13, len: 1.55, h: .85, w: .8, hr: .58, sr: .34, sl: .55, hy: .1, bh: .55, snc: '#8a6a5a' });
      var tusk = T.mat('#efe6d1', true);
      for (var s = -1; s <= 1; s += 2) T.put(new T.Cone(.07, .45, 5), tusk, g, q.hx + .75, q.hy + .1, s * .22).rotation.z = -.5;
      for (var i = 0; i < 5; i++) T.put(new T.Cone(.12, .45, 4), q.dark, g, -.6 + i * .35, q.bh + .85, 0);
      for (var s2 = -1; s2 <= 1; s2 += 2) T.put(new T.Cone(.16, .35, 4), q.body, g, q.hx - .1, q.hy + .55, s2 * .3);
    },
    tilki: function (T, g) {
      var q = quad(T, g, { c: '#c8622a', d: '#2e2119', leg: .7, lt: .07, len: 1.1, h: .55, w: .45, hr: .38, sr: .2, sl: .6, hy: .4, bh: .45, snc: '#f2e6d6' });
      for (var s = -1; s <= 1; s += 2) T.put(new T.Cone(.15, .45, 4), q.body, g, q.hx - .05, q.hy + .45, s * .2);
      var tail = T.put(new T.Sphere(.35, 8, 6), q.body, g, -1.45, q.bh + .15, 0); tail.scale.set(2.1, .9, .9); tail.rotation.z = .35;
      T.put(new T.Sphere(.2, 6, 5), T.mat('#f6eee2', true), g, -2.1, q.bh + .38, 0);
    },
    kartal: function (T, g) {
      var b = T.mat('#5b4331', true), w = T.mat('#f1ead9', true), y = T.mat('#e4b13c', true), dk = T.mat('#2d241d', true);
      T.put(new T.Sphere(.75, 9, 7), b, g, 0, 1.6, 0).scale.set(1.1, 1.35, .9);
      T.put(new T.Sphere(.45, 8, 6), w, g, .35, 2.75, 0);
      T.put(new T.Cone(.15, .45, 5), y, g, .85, 2.7, 0).rotation.z = -Math.PI / 2 - .4;
      for (var s = -1; s <= 1; s += 2) {
        var wing = T.put(new T.Box(1.9, .12, 1), b, g, -.1, 2.15, s * 1.25); wing.rotation.x = s * .45; wing.rotation.z = .25;
        T.put(new T.Box(.6, .1, .9), dk, g, -.95, 2.4, s * 2.0).rotation.x = s * .6;
        T.put(new T.Cyl(.06, .06, .6, 5), y, g, .05, .55, s * .25);
      }
      T.put(new T.Cone(.4, .9, 5), dk, g, -.85, 1.35, 0).rotation.z = 1.9;
      T.put(new T.Cyl(.08, .14, 1.2, 6), T.mat('#6b5236', true), g, 0, .25, 0).rotation.z = Math.PI / 2;
    },
    okuz: function (T, g) {
      var q = quad(T, g, { c: '#3d2f26', d: '#1f1814', leg: .95, lt: .17, len: 1.75, h: 1.0, w: .9, hr: .62, sr: .38, sl: .45, hy: .15, bh: .8 });
      var horn = T.mat('#e2d6bd', true);
      for (var s = -1; s <= 1; s += 2) { var h = T.put(new T.Cone(.13, .9, 6), horn, g, q.hx - .05, q.hy + .55, s * .55); h.rotation.x = s * -1.1; }
      var fur = T.put(new T.Sphere(1, 8, 6), q.body, g, -.1, q.bh - .45, 0); fur.scale.set(1.6, .55, .95);
      T.put(new T.Sphere(.7, 8, 6), q.body, g, .7, q.bh + .65, 0).scale.set(.9, .8, .8);
    },
    pars: function (T, g) {
      var q = quad(T, g, { c: '#d9d3c2', d: '#3a3631', leg: .85, lt: .1, len: 1.55, h: .55, w: .5, hr: .45, sr: .22, sl: .35, hy: .35, bh: .5 });
      var spot = T.mat('#4a4640', true);
      for (var i = 0; i < 9; i++) T.put(new T.Sphere(.13, 5, 4), spot, g, -1 + (i % 5) * .45, q.bh + .5 - (i > 4 ? .2 : 0), (i % 2 ? .3 : -.3));
      var tail = T.put(new T.Cyl(.1, .15, 1.7, 6), q.body, g, -1.9, q.bh - .1, 0); tail.rotation.z = -2.3;
      for (var s = -1; s <= 1; s += 2) T.put(new T.Sphere(.12, 5, 4), q.body, g, q.hx - .05, q.hy + .45, s * .25);
    },
    mamut: function (T, g) {
      var q = quad(T, g, { c: '#6e4a30', d: '#3b2718', leg: 1.6, lt: .3, len: 1.9, h: 1.3, w: 1.15, hr: .95, sr: .3, sl: .1, hy: .5, bh: 1.1, lx: 1.0, lz: .55 });
      var tusk = T.mat('#f1e8d2', true);
      for (var s = -1; s <= 1; s += 2) { var t = T.put(new T.Cyl(.1, .16, 2.2, 6), tusk, g, q.hx + 1.0, q.hy - .7, s * .45); t.rotation.z = -1.1; t.rotation.x = s * .25; }
      var trunk = T.put(new T.Cyl(.16, .28, 1.9, 7), q.body, g, q.hx + .95, q.hy - 1.05, 0); trunk.rotation.z = .3;
      for (var s2 = -1; s2 <= 1; s2 += 2) T.put(new T.Sphere(.55, 7, 5), q.dark, g, q.hx - .2, q.hy + .1, s2 * .85).scale.set(.5, 1, .2);
      T.put(new T.Sphere(.8, 8, 6), q.body, g, .5, q.bh + 1.2, 0).scale.set(1.1, .7, .8);
      g.scale.setScalar(1.25);
    }
  };
  function wolfLike(T, g, col, sc) {
    var q = quad(T, g, { c: col, d: '#2a2622', leg: .9, lt: .09, len: 1.35, h: .6, w: .5, hr: .42, sr: .22, sl: .55, hy: .45, bh: .5 });
    for (var e = -1; e <= 1; e += 2) T.put(new T.Cone(.14, .4, 4), q.body, g, q.hx - .05, q.hy + .45, e * .2);
    var tl = T.put(new T.Cyl(.1, .16, 1.2, 6), q.body, g, -1.6, q.bh + .1, 0); tl.rotation.z = -2.2;
    if (sc) g.scale.setScalar(sc);
  }
  function herd(T, g, fn, n) { for (var i = 0; i < n; i++) { var s = new T.Group(); fn(T, s); s.position.set((i - (n - 1) / 2) * 2.3, 0, (i % 2) * 1.6 - .8); s.rotation.y = (i - 1) * .35; s.scale.multiplyScalar(.72); g.add(s); } }
  MODELS.karaca = function (T, g) { MODELS.geyik(T, g); g.scale.setScalar(.8); };
  MODELS.bozayi = function (T, g) { var q = quad(T, g, { c: '#6b4a2e', d: '#3b2718', leg: 1.0, lt: .24, len: 1.7, h: 1.05, w: .95, hr: .62, sr: .3, sl: .45, hy: .3, bh: .8 }); for (var e = -1; e <= 1; e += 2) T.put(new T.Sphere(.18, 6, 5), q.body, g, q.hx - .1, q.hy + .55, e * .32); g.scale.setScalar(1.2); };
  MODELS.alageyik = function (T, g) { MODELS.geyik(T, g); g.scale.setScalar(1.1); };
  MODELS.vasak = function (T, g) { var q = quad(T, g, { c: '#b9925e', d: '#3a2f25', leg: .8, lt: .09, len: 1.3, h: .55, w: .48, hr: .42, sr: .2, sl: .3, hy: .35, bh: .45 }); for (var e = -1; e <= 1; e += 2) { T.put(new T.Cone(.12, .5, 4), q.body, g, q.hx - .05, q.hy + .48, e * .22); T.put(new T.Cyl(.02, .02, .25, 4), q.dark, g, q.hx - .05, q.hy + .85, e * .22); } };
  function horse(T, g, col) { var q = quad(T, g, { c: col, d: '#2a1d14', leg: 1.5, lt: .1, len: 1.55, h: .7, w: .55, hr: .35, sr: .26, sl: .9, hy: 1.1, bh: .6 }); T.put(new T.Box(.12, 1.0, .2), q.dark, g, q.hx - .3, q.hy - .1, 0).rotation.z = -.5; var tl = T.put(new T.Cyl(.08, .2, 1.2, 6), q.dark, g, -1.6, q.bh + .3, 0); tl.rotation.z = -2.6; }
  MODELS.atsurusu = function (T, g) { herd(T, g, function (T2, s) { horse(T2, s, ['#7a4a26', '#b98a56', '#3a2a1e'][Math.floor(Math.random() * 3)]); }, 3); };
  MODELS.anadoluparsi = function (T, g) { MODELS.pars(T, g); g.children.forEach(function (c) { if (c.material && c.material.color && c.material.color.getHexString() === 'd9d3c2') c.material = T.mat('#d6a85a', true); }); g.scale.setScalar(1.1); };
  function goat(T, g) { var q = quad(T, g, { c: '#cfc6b4', d: '#4a3f33', leg: .8, lt: .08, len: 1.1, h: .55, w: .45, hr: .34, sr: .18, sl: .4, hy: .55, bh: .45 }); var hn = T.mat('#5a4a38', true); for (var e = -1; e <= 1; e += 2) { var h = T.put(new T.Cone(.08, .8, 5), hn, g, q.hx - .2, q.hy + .55, e * .14); h.rotation.z = .9; } T.put(new T.Cone(.06, .3, 4), q.dark, g, q.hx + .3, q.hy - .4, 0).rotation.z = Math.PI; }
  MODELS.keci = function (T, g) { herd(T, g, goat, 3); };
  MODELS.kartal2 = function (T, g) { MODELS.kartal(T, g); g.scale.setScalar(1.25); };
  MODELS.karakurt = function (T, g) { herd(T, g, function (T2, s) { wolfLike(T2, s, '#2e2a28'); }, 3); };
  MODELS.akgeyik = function (T, g) { MODELS.geyik(T, g); g.traverse(function (o) { if (o.isMesh && o.material && o.material.color) { var h = o.material.color.getHexString(); if (h === 'a8774a' || h === 'e8d6b8') o.material = T.mat('#f4f1ea', true, { emissive: '#bfe8ff', emissiveIntensity: .25 }); } }); g.scale.setScalar(1.25); };
  MODELS.karaboga = function (T, g) { MODELS.okuz(T, g); g.traverse(function (o) { if (o.isMesh && o.material && o.material.color && o.material.color.getHexString() === '3d2f26') o.material = T.mat('#141212', true); }); g.scale.setScalar(1.2); };
  MODELS.boruyavru = function (T, g) { herd(T, g, function (T2, s) { wolfLike(T2, s, '#e9e6df'); }, 3); g.scale.setScalar(1.1); };
  MODELS.ejderyavru = function (T, g) {
    var q = quad(T, g, { c: '#3f6a52', d: '#1d3328', leg: .8, lt: .14, len: 1.5, h: .7, w: .6, hr: .5, sr: .3, sl: .6, hy: .7, bh: .55 });
    var wm = T.mat('#2c4a3a', true); for (var e = -1; e <= 1; e += 2) { var w = T.put(new T.Cone(1.1, 1.8, 3), wm, g, -.1, q.bh + 1.1, e * .9); w.rotation.x = e * 1.2; }
    var tl = T.put(new T.Cone(.25, 1.8, 6), q.body, g, -2.0, q.bh + .1, 0); tl.rotation.z = Math.PI / 2;
    for (var k = 0; k < 4; k++) T.put(new T.Cone(.12, .35, 4), T.mat('#c9a24a', true), g, -.8 + k * .5, q.bh + .75, 0);
  };
  function aura(T, g, col) { var m = T.mat(col, true, { emissive: col, emissiveIntensity: 1.2, transparent: true, opacity: .22 }); var a = T.put(new T.Sphere(1.6, 14, 10), m, g, 0, 1.5, 0); a.castShadow = false; a.scale.set(1.6, 1.2, 1.6); a.name = 'Aura'; }
  W.ekMonsterModel = function (D, T) {
    try {
      var base = W.monsterBase ? W.monsterBase(D.index) : -1, kind = BASES[base];
      if (!kind || !MODELS[kind]) return null;
      var g = new T.Group(); MODELS[kind](T, g);
      if (D.az) g.scale.multiplyScalar(1.35);
      T.ring(g, D.az ? '#efd27a' : '#cc745e', kind === 'mamut' ? 3.4 : kind === 'kartal' ? 2.6 : 2.8);
      return g;
    } catch (e) { return null; }
  };
  // Yeni türler için bilgi panelinde ve savaş ekranında madalyon görsel
  function medallion(emoji, a, b) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="g" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></radialGradient></defs>' +
      '<circle cx="100" cy="100" r="92" fill="url(#g)" stroke="#c99a4e" stroke-width="7"/><circle cx="100" cy="100" r="81" fill="none" stroke="#f2d58e" stroke-opacity=".45" stroke-width="2"/>' +
      '<text x="100" y="128" font-size="96" text-anchor="middle">' + emoji + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function addImages() {
    if (!W.IMG) return false;
    var col = { 13: ['#6f8a4f', '#2a3a1e'], 14: ['#5d4a3c', '#241a14'], 15: ['#a5552b', '#3a1a0c'], 17: ['#5a7a9a', '#1c2a3a'], 18: ['#5b4a3a', '#1d1610'], 19: ['#8a9aa8', '#2b3640'], 20: ['#7a5a40', '#2a1c12'] }; for (var cb = 21; cb <= 33; cb++) col[cb] = LEGEND[cb] ? ['#8ab6c8', '#1c2f3a'] : ['#6a7a50', '#24301a'];
    SP.forEach(function (sp) { var b = sp[4]; if (b < 13) return; var k = 'canavar_' + (b + 1); if (!W.IMG[k]) W.IMG[k] = medallion(sp[1], col[b][0], col[b][1]); });
    return true;
  }
  if (!addImages()) var iv = setInterval(function () { if (addImages()) clearInterval(iv); }, 300);
  W.ekFaunaSpecies = SP;
})(window);
