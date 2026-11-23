/* Ergenekon — sahnede durum simgeleri, yeşil çubuk, hasat toplama ve geri bildirim. Claude, 18 Kasım 2026.
   - Yeşil çubuk: bina yükseltilebiliyorsa (kaynak + usta + koşul) binanın üstünde; değilse hiçbir şey.
   - Hasat: üretim binaları normal üretime ek olarak küçük bir "hasat" biriktirir (saatlik üretimin %25'i, en fazla 2 sa);
     hazır olunca ürün simgesi çıkar, dokunarak / parmağı üstünden geçirerek / "Hepsini topla" ile alınır.
   - Geri bildirim: yükseltme bitince bina parlar, ses + titreşim; toplanan kaynak üst çubuğa uçar; biten araştırma Bilgelik'te parlar. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekDurum) return; W.__ekDurum = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  var POS = { ocak: [0, 7.5, 0], oba: [-9, 5, 5], sur: [0, 6, 41] };
  var PROD = { odunluk: 'odun', avci: 'et', demirci: 'demir', komurluk: 'komur' };
  var ICON = { odun: '🪵', et: '🍖', demir: '⛓️', komur: '🪨' };
  var L = { el: null, pool: {}, v: null, slots: null };

  function ek() { var s = S(); if (!s) return null; s.ek = s.ek || {}; s.ek.bin = s.ek.bin || {}; s.ek.fx = s.ek.fx || {}; return s.ek; }
  function slots() {
    if (L.slots) return L.slots;
    var c = W.city3d; if (!c || !c.buildingSlots) return null;
    var o = {};
    c.buildingSlots.forEach(function (g, k) { o[k] = [g.position.x, 5.6, g.position.z]; });
    for (var k in POS) o[k] = POS[k];
    return (L.slots = o);
  }
  function full() { var s = S(), c = 0; try { c = W.cap(); } catch (x) { return false; } return ['odun', 'et', 'demir', 'komur'].some(function (r) { return (s.r[r] || 0) >= c * .9; }); }
  function rate(k) { // hasat: saatlik üretimin %25'i
    var s = S(), lv = (s.l && s.l[k]) || 0; if (!lv) return 0;
    var f = 1; try { f = W.factor() * W.pm() * W.ECO(); } catch (e) {}
    var g = Math.pow(1.095, lv);
    var p = k === 'odunluk' ? 0.3 * (0.5 + lv * g) : k === 'avci' ? 0.3 * (0.3 + 0.8 * lv * g) : 0.12 * lv * g;
    return p * f * 3600 * 0.25;
  }
  function accrue(now) {
    var e = ek(); if (!e) return;
    for (var k in PROD) {
      var b = e.bin[k] = e.bin[k] || { v: 0, t: now }, r = rate(k);
      var dt = Math.min(7200, Math.max(0, (now - (b.t || now)) / 1000)); b.t = now;
      b.v = Math.min(r * 2, (b.v || 0) + r * dt / 3600);
    }
  }
  function ready(k) { var e = ek(), b = e && e.bin[k], r = rate(k); return b && r > 0 && b.v >= Math.max(1, r / 6); }
  function collect(k, quiet) {
    var e = ek(), s = S(), b = e && e.bin[k]; if (!b || !ready(k)) return 0;
    var res = PROD[k], cap = res === 'komur' || res === 'odun' || res === 'et' || res === 'demir' ? (W.cap ? W.cap() : Infinity) : Infinity;
    var room = Math.max(0, cap - (s.r[res] || 0)), g = Math.floor(Math.min(b.v, room));
    if (g < 1) { toast('Depo dolu'); return 0; }
    s.r[res] = (s.r[res] || 0) + g; b.v -= g;
    fly(k, res, g);
    if (!quiet) { beep(880, .05); buzz(15); }
    return g;
  }
  function collectAll() {
    var any = 0; for (var k in PROD) if (ready(k)) any += collect(k, true) > 0 ? 1 : 0;
    if (any) { beep(880, .06); setTimeout(function () { beep(1100, .05); }, 90); buzz([15, 40, 15]); try { W.save(); } catch (e) {} }
    draw(performance.now(), true);
  }

  W.ekCollectAll = function () { var n = 0; for (var k in PROD) if (ready(k)) n++; collectAll(); return n; };
  /* --- geri bildirim --- */
  function beep(f, d) { try { var s = S(); if (s && s.snd === false) return; W.snd ? W.snd(f, d) : null; } catch (e) {} }
  function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
  function toast(t) { try { W.add(t); } catch (e) {} }
  function chipFor(res) {
    var top = document.getElementById('res'); if (!top) return null;
    var c = top.querySelector('[data-ek-res="' + res + '"]'); if (c) return c;
    var n = { odun: 0, et: 1, demir: 2 }[res]; return n != null ? top.children[n] : null;
  }
  function fly(k, res, amount) {
    var sp = screenPos(k), chip = chipFor(res); if (!sp) return;
    var tr = chip ? chip.getBoundingClientRect() : { left: innerWidth / 2, top: 10, width: 0, height: 0 };
    var tx = tr.left + tr.width / 2, ty = tr.top + tr.height / 2;
    for (var i = 0; i < 6; i++) (function (i) {
      var d = document.createElement('span'); d.className = 'ek-fly'; d.textContent = ICON[res];
      var sx = sp.x + (Math.random() - .5) * 40, sy = sp.y + (Math.random() - .5) * 26;
      d.style.left = sx + 'px'; d.style.top = sy + 'px'; document.body.appendChild(d);
      setTimeout(function () { d.style.transform = 'translate(' + (tx - sx) + 'px,' + (ty - sy) + 'px) scale(.6)'; d.style.opacity = '.2'; }, 30 + i * 55);
      setTimeout(function () { d.remove(); if (i === 5 && chip) { chip.classList.add('ek-bump'); setTimeout(function () { chip.classList.remove('ek-bump'); }, 400); } }, 760 + i * 55);
    })(i);
    var t = document.createElement('span'); t.className = 'ek-gain'; t.textContent = '+' + nf(amount); t.style.left = sp.x + 'px'; t.style.top = sp.y + 'px'; document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 1100);
  }
  var prevL = null, prevRq = null;
  function watch(now) {
    var s = S(), e = ek(); if (!s || !e) return;
    if (prevL) for (var k in s.l) if ((s.l[k] || 0) > (prevL[k] || 0)) { e.fx[k] = Date.now() + 5000; beep(660, .08); setTimeout(function () { beep(990, .1); }, 120); buzz([20, 60, 30]); }
    prevL = JSON.parse(JSON.stringify(s.l));
    var rq = s.rq ? s.rq.k : null;
    if (prevRq && !rq) { e.rsGlow = 1; beep(1200, .1); buzz(25); }
    prevRq = rq;
    if (W.tab === 'r' && e.rsGlow) e.rsGlow = 0;
  }

  /* --- işaret katmanı --- */
  function screenPos(k) {
    var c = W.city3d, cv = document.getElementById('cityv'), p = slots() && slots()[k]; if (!c || !cv || !p) return null;
    if (!L.v) L.v = new c.camera.position.constructor();
    L.v.set(p[0], p[1], p[2]).project(c.camera);
    if (L.v.z > 1) return null;
    var r = c.renderer.domElement.getBoundingClientRect();
    return { x: r.left + (L.v.x + 1) / 2 * r.width, y: r.top + (1 - L.v.y) / 2 * r.height, off: L.v.x < -1.05 || L.v.x > 1.05 || L.v.y < -1.05 || L.v.y > 1.05 };
  }
  var swiping = false;
  function layer() {
    var cv = document.getElementById('cityv'); if (!cv) return null;
    if (!L.el || !L.el.isConnected) {
      L.el = document.createElement('div'); L.el.id = 'ek-stat'; L.pool = {};
      L.el.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-st]'); if (!b) return;
        var k = b.dataset.st, kind = b.dataset.kind;
        if (kind === 'bin') collect(k); else if (W.city3d && W.city3d.openBuilding) W.city3d.openBuilding(k);
        draw(performance.now(), true);
      });
      L.el.addEventListener('pointerover', function (ev) { if (!swiping) return; var b = ev.target.closest('[data-kind="bin"]'); if (b) { collect(b.dataset.st); draw(performance.now(), true); } });
    }
    if (L.el.parentNode !== cv) cv.appendChild(L.el);
    return L.el;
  }
  document.addEventListener('pointerdown', function (ev) { if (ev.target.closest && ev.target.closest('#cityv')) swiping = true; }, true);
  document.addEventListener('pointerup', function () { swiping = false; }, true);
  document.addEventListener('pointercancel', function () { swiping = false; }, true);
  // dokunmatik sürüklemede pointerover gelmez: elemanı koordinattan bul
  document.addEventListener('touchmove', function (ev) {
    if (!swiping || !ev.touches || ev.touches.length !== 1) return;
    var t = ev.touches[0], el = document.elementFromPoint(t.clientX, t.clientY), b = el && el.closest && el.closest('#ek-stat [data-kind="bin"]');
    if (b) { collect(b.dataset.st); draw(performance.now(), true); }
  }, { passive: true });

  var lastDraw = 0;
  function draw(now, force) {
    var el = layer(); if (!el) return;
    var s = S(), e = ek(), sl = slots();
    if (W.tab !== 'c' || !sl || !s) { el.hidden = true; allBtn(false); return; }
    el.hidden = false;
    if (!force && now - lastDraw < 50) return; lastDraw = now;
    var cv = document.getElementById('cityv').getBoundingClientRect(), seen = {}, anyBin = false, t = Date.now();
    var B = W.B || {};
    Object.keys(sl).forEach(function (k) {
      if (!B[k]) return;
      var sp = screenPos(k); if (!sp || sp.off) return;
      var q = null, can = false; try { q = W.buildQueue(k); can = !q && W.can(k); } catch (x) {}
      var items = [];
      if (PROD[k] && ready(k)) { items.push(['bin', ICON[PROD[k]]]); anyBin = true; }
      if (can) items.push(['up', '']);
      if (e.fx[k] > t) items.push(['fx', '']);
      if (k === 'bilgelik' && e.rsGlow) items.push(['rs', '📜']);
      if (k === 'ambar' && full()) items.push(['amb', '']);
      items.forEach(function (it, i) {
        var id = k + ':' + it[0], b = L.pool[id];
        if (!b) { b = L.pool[id] = document.createElement('button'); b.type = 'button'; b.className = 'ek-st ek-st-' + it[0]; b.dataset.st = k; b.dataset.kind = it[0]; el.appendChild(b); }
        var html = it[0] === 'up' ? '<i></i>' : it[0] === 'bin' ? '<span>' + it[1] + '</span>' : it[0] === 'rs' ? '<span>' + it[1] + '</span>' : '';
        if (b.__ekh !== html) { b.__ekh = html; b.innerHTML = html; }
        var dy = it[0] === 'up' ? 0 : it[0] === 'bin' || it[0] === 'rs' || it[0] === 'amb' ? -30 : 26;
        b.style.transform = 'translate(' + (sp.x - cv.left).toFixed(1) + 'px,' + (sp.y - cv.top + dy).toFixed(1) + 'px)';
        b.hidden = false; seen[id] = 1;
      });
    });
    for (var id in L.pool) if (!seen[id] && !L.pool[id].hidden) L.pool[id].hidden = true;
    for (var pk in PROD) if (ready(pk)) anyBin = true;
    allBtn(Object.keys(PROD).some(function (k) { try { return ready(k); } catch (x) { return false; } }));
  }
  var AB = null;
  function allBtn(on) {
    var cv = document.getElementById('cityv'); if (!cv) return;
    if (!AB || !AB.isConnected) {
      AB = document.createElement('button'); AB.type = 'button'; AB.id = 'ek-all'; AB.setAttribute('aria-label', 'Hepsini topla');
      AB.innerHTML = '<span>🧺</span><small>TOPLA</small>';
      AB.addEventListener('click', collectAll);
    }
    if (AB.parentNode !== cv) cv.appendChild(AB);
    AB.hidden = !on || W.tab !== 'c';
  }

  var lastSec = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    if (now - lastSec > 1000) { lastSec = now; try { accrue(Date.now()); watch(now); } catch (x) {} }
    try { draw(now); } catch (x) {}
  }
  function start() { if (!S() || !W.city3d || typeof W.can !== 'function') { setTimeout(start, 400); return; } accrue(Date.now()); requestAnimationFrame(frame); }
  start();
  W.ergenekonDurum = { collectAll: collectAll, ready: ready, rate: rate };
})();
