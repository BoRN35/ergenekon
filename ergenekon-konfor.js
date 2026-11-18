/* Ergenekon — A aşaması: hızlı konfor. Claude, 18 Kasım 2026.
   22 anında bitir (<5 dk) · 37 yapım ilerleme çubuğu · 44 hepsini aç · 45 otomatik iyileştirme
   39 seri av (×5) · 36 görsel savaş raporu · 40 kale yol haritası · 54 tamga/hilal uyarı dili */
(function () {
  'use strict';
  var W = window;
  if (W.__ekKonfor) return; W.__ekKonfor = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function B() { return W.B || {}; }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  var FAST = 300;

  /* ---------- 22) anında bitir ---------- */
  function finishBuild(k) { var q = null; try { q = W.buildQueue(k); } catch (e) {} if (q && q.left <= FAST) { q.left = .05; try { W.tick(.1, true); } catch (e) {} save(); rer(); return true; } return false; }
  function finishResearch() { var s = S(); if (s && s.rq && s.rq.left <= FAST) { s.rq.left = .05; try { W.tick(.1, true); } catch (e) {} save(); rer(); return true; } return false; }
  W.ekFinish = { build: finishBuild, research: finishResearch };
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ek-fin]'); if (!b) return;
    ev.preventDefault(); ev.stopPropagation();
    var k = b.getAttribute('data-ek-fin');
    if (k === '__rs') finishResearch(); else finishBuild(k);
    try { navigator.vibrate && navigator.vibrate(15); W.snd(900, .06); } catch (e) {}
  }, true);
  // araştırma ekranında hızlı bitir rozeti
  function rsFast() {
    var s = S(), tr = document.getElementById('tr'), b = document.getElementById('ek-rsfin');
    var on = W.tab === 'r' && tr && s.rq && s.rq.left <= FAST;
    if (!on) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('button'); b.type = 'button'; b.id = 'ek-rsfin'; b.setAttribute('data-ek-fin', '__rs'); document.body.appendChild(b); }
    var h = '⚡ ' + (s.rq.n || 'Araştırma') + ' · ' + ft(s.rq.left) + ' <b>Hemen bitir</b>';
    if (b.__ekh !== h) { b.__ekh = h; b.innerHTML = h; }
  }

  /* ---------- 37) yapım ilerleme çubuğu (sahnede) ---------- */
  var PB = { el: null, pool: {}, v: null };
  function slotPos(k) {
    var c = W.city3d; if (!c) return null;
    if (k === 'ocak' || k === 'oba') return [0, .6, 6];
    if (k === 'sur') return [0, .6, 44];
    var g = c.buildingSlots && c.buildingSlots.get(k); return g ? [g.position.x, .4, g.position.z + 3.4] : null;
  }
  function bars() {
    var cv = document.getElementById('cityv'), c = W.city3d, s = S();
    if (!cv || !c || W.tab !== 'c' || !s) { if (PB.el) PB.el.hidden = true; return; }
    if (!PB.el || !PB.el.isConnected) { PB.el = document.createElement('div'); PB.el.id = 'ek-prog'; PB.pool = {}; }
    if (PB.el.parentNode !== cv) cv.appendChild(PB.el);
    PB.el.hidden = false;
    if (!PB.v) PB.v = new c.camera.position.constructor();
    var qs = []; try { qs = W.buildQueues(); } catch (e) {}
    var r = c.renderer.domElement.getBoundingClientRect(), cr = cv.getBoundingClientRect(), seen = {};
    qs.forEach(function (q) {
      var p = slotPos(q.k); if (!p) return;
      PB.v.set(p[0], p[1], p[2]).project(c.camera); if (PB.v.z > 1) return;
      var x = r.left - cr.left + (PB.v.x + 1) / 2 * r.width, y = r.top - cr.top + (1 - PB.v.y) / 2 * r.height;
      var el = PB.pool[q.k];
      if (!el) { el = PB.pool[q.k] = document.createElement('button'); el.type = 'button'; el.className = 'ek-pb'; el.innerHTML = '<i><u></u></i><small></small><b class="ek-pbfin">⚡</b>'; PB.el.appendChild(el); }
      var pc = Math.max(0, Math.min(1, 1 - q.left / q.tot)), hue = Math.round(pc * 120);
      el.querySelector('u').style.cssText = 'width:' + (pc * 100).toFixed(1) + '%;background:linear-gradient(180deg,hsl(' + hue + ',85%,62%),hsl(' + hue + ',80%,38%))';
      el.querySelector('small').textContent = ft(q.left);
      var fast = q.left <= FAST; el.classList.toggle('fast', fast);
      if (fast) el.setAttribute('data-ek-fin', q.k); else el.removeAttribute('data-ek-fin');
      el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      el.hidden = false; seen[q.k] = 1;
    });
    for (var k in PB.pool) if (!seen[k]) PB.pool[k].hidden = true;
  }

  /* ---------- 44) hepsini aç ---------- */
  function openAll() {
    var E = W.ergenekonEk, s = S(); if (!E || !s || !s.ek || !s.ek.pk) return;
    var before = {}, pk = s.ek.pk; ['et', 'odun', 'komur', 'demir', 'celik'].forEach(function (r) { before[r] = s.r[r] || 0; });
    Object.keys(pk).forEach(function (r) { ['p', 'b', 'g'].forEach(function (t) { if (pk[r] && pk[r][t] > 0) try { E.usePack(r, t, true); } catch (e) {} }); });
    var got = []; for (var r in before) { var d = (s.r[r] || 0) - before[r]; if (d > 0) got.push([r, d]); }
    report({ title: 'Paketler açıldı', rows: got.map(function (g) { return [RI[g[0]], '+' + nf(g[1])]; }), win: true });
    save(); rer();
  }
  var RI = { odun: '🪵', et: '🍖', demir: '⛓️', komur: '🪨', celik: '🔩' };
  function bagBtn() {
    var o = document.getElementById('ek-canta'); if (!o) return;
    var foot = o.querySelector('.ci-foot'); if (!foot || foot.querySelector('[data-ek-openall]')) return;
    var s = S(), n = 0, pk = s.ek && s.ek.pk || {}; Object.keys(pk).forEach(function (r) { ['p', 'b', 'g'].forEach(function (t) { n += (pk[r] && pk[r][t]) || 0; }); });
    if (!n) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'ci-forge'; b.setAttribute('data-ek-openall', '1'); b.textContent = '📦 Hepsini aç (' + n + ')';
    b.addEventListener('click', function (ev) { ev.stopPropagation(); openAll(); var c = document.getElementById('ek-canta'); if (c && W.openCanta) W.openCanta(); });
    foot.insertBefore(b, foot.lastChild);
  }

  /* ---------- 45) otomatik iyileştirme ---------- */
  function autoHeal() {
    var s = S(); if (!s || s.hq || !s.l.sifa || !s.wd) return;
    var w = (s.wd[0] || 0) + (s.wd[1] || 0) + (s.wd[2] || 0); if (!w) return;
    try { W.hQuick(); if (W.hOk()) { W.healGo(); try { W.add('🩹 Yaralılar kendiliğinden şifahaneye alındı.'); } catch (e) {} } } catch (e) {}
  }

  /* ---------- 36) görsel savaş raporu ---------- */
  function report(o) {
    var old = document.getElementById('ek-rep'); if (old) old.remove();
    var d = document.createElement('div'); d.id = 'ek-rep'; d.className = 'ek-ov yk-ov';
    d.innerHTML = '<div class="yk-card yk-small rp-card"><div class="yk-head"><h2>' + o.title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' +
      (o.win != null ? '<div class="rp-res ' + (o.win ? 'w' : 'l') + '">' + (o.win ? '🏆' : '🛡') + '<b>' + (o.sub || (o.win ? 'Zafer' : 'Geri çekildi')) + '</b></div>' : '') +
      '<div class="rp-grid">' + o.rows.map(function (r) { return '<span><i>' + r[0] + '</i><b>' + r[1] + '</b></span>'; }).join('') + '</div></div>';
    d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('.yk-x')) d.remove(); });
    document.body.appendChild(d);
  }
  W.ekReport = report;

  /* ---------- 39) seri av ---------- */
  function lootOf(txt) { // s.last metninden simgeli ganimet
    var out = {}; String(txt || '').split('·').forEach(function (p) {
      var m = p.match(/\+?\s*([\d.,]+)\s*(odun|et|demir|kömür|toz|xp|tecrübe)/i);
      if (m) { var k = m[2].toLowerCase(); out[k] = (out[k] || 0) + (+m[1].replace(/[.,]/g, '') || 0); }
      if (/kitab/i.test(p)) out.kitap = (out.kitap || 0) + 1;
      if (/kartı/i.test(p)) out.kart = (out.kart || 0) + 1;
      if (/Kağıt|Safir|Opal/.test(p)) (p.match(/(\d+)\s+(Yükseltme Kağıdı|Safir|Opal)/g) || []).forEach(function (q) { var mm = q.match(/(\d+)\s+(.*)/); out[mm[2]] = (out[mm[2]] || 0) + +mm[1]; });
      if (/paketi|Nadir ganimet/i.test(p)) out.paket = (out.paket || 0) + 1;
      if (/(Sıradan|Nadir|Destansı|Efsanevi|Mitik)\s/.test(p) && !/paket/.test(p)) out.esya = (out.esya || 0) + 1;
    });
    return out;
  }
  var LI = { odun: '🪵', et: '🍖', demir: '⛓️', 'kömür': '🪨', toz: '✨', xp: '⭐', 'tecrübe': '⭐', kitap: '📕', kart: '🃏', 'Yükseltme Kağıdı': '📜', Safir: '🔷', Opal: '🔮', paket: '📦', esya: '🗡' };
  function nearby(m) {
    var s = S(), M = W.M || [], o = s.l.ocak || 1, ref = M[m]; if (!ref) return [];
    var c = M.map(function (x, i) { return i; }).filter(function (i) {
      var x = M[i], az = W.X6 && W.X6.isAz ? W.X6.isAz(i) : false, L = x[2] + (az ? 2 : 0);
      return i !== 11 && L <= o && !(s.mk[i] > 0) && !(W.fog && W.fog(x[3], x[4]));
    });
    c.sort(function (a, b) {
      var da = Math.hypot(M[a][3] - ref[3], M[a][4] - ref[4]) + (M[a][5] === ref[5] ? 0 : 6), db = Math.hypot(M[b][3] - ref[3], M[b][4] - ref[4]) + (M[b][5] === ref[5] ? 0 : 6);
      return da - db;
    });
    if (c.indexOf(m) > 0) { c.splice(c.indexOf(m), 1); c.unshift(m); }
    return c;
  }
  function series(m, n) {
    var s = S(), list = nearby(m).slice(0, n), kills = 0, tries = 0, loot = {}, hpLow = false, wounds = 0;
    var wd0 = (s.wd || [0, 0, 0]).reduce(function (a, b) { return a + b; }, 0);
    W.__ekSeries = true;
    try {
      for (var i = 0; i < list.length; i++) {
        var k0 = s.stat.kills, e0 = s.en && s.en.v;
        if (s.en && s.en.v < (W.EN_C || 10)) break;
        try { W.selM = list[i]; W.fight(list[i]); } catch (e) {}
        tries++;
        if (s.stat.kills > k0) { kills++; var l = lootOf(s.last); for (var q in l) loot[q] = (loot[q] || 0) + l[q]; }
        else if (s.en && s.en.v === e0) { hpLow = true; break; }
      }
    } finally { W.__ekSeries = false; }
    var bt = document.getElementById('bt'); if (bt) bt.remove();
    wounds = (s.wd || [0, 0, 0]).reduce(function (a, b) { return a + b; }, 0) - wd0;
    var rows = [['⚔', kills + '/' + tries], ['⚡', nf(s.en ? s.en.v : 0)]];
    if (wounds > 0) rows.push(['🩹', '+' + nf(wounds)]);
    for (var r in loot) rows.push([LI[r] || '🎁', (loot[r] > 1 || /odun|et|demir|kömür|toz|xp|tecrübe/.test(r) ? '+' : '') + nf(loot[r])]);
    report({ title: 'Seri av', win: kills > 0, sub: kills > 0 ? kills + ' canavar' : (hpLow ? 'Alp yorgun' : 'Enerji yok'), rows: rows });
    try { W.selM = -1; } catch (e) {}
    save(); rer();
  }
  W.ekSeries = series;
  function mapButtons() {
    var mi = document.getElementById('mapi'); if (!mi || W.tab !== 'm') return;
    var m = typeof W.selM === 'number' ? W.selM : -1; if (m < 0 || m >= (W.RIFT_OFFSET || 1000)) return;
    var atk = Array.prototype.filter.call(mi.querySelectorAll('button'), function (b) { return /Saldır/.test(b.textContent); })[0];
    if (!atk || atk.parentNode.querySelector('[data-ek-x5]')) return;
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-ek-x5', m); b.className = 'ek-x5'; b.innerHTML = '⚔ ×5';
    b.disabled = atk.disabled;
    b.addEventListener('click', function (ev) { ev.stopPropagation(); series(+this.getAttribute('data-ek-x5'), 5); });
    atk.insertAdjacentElement('afterend', b);
  }
  // tek savaşta da kısa simgeli rapor (oyunun savaş sahnesinden sonra)
  if (typeof W.fight === 'function' && !W.fight.__ekRep) {
    // fight daha sonra başka katmanlarca sarılabildiğinden hook her saniye denenir
  }
  function hookFightReport() {
    if (typeof W.fight !== 'function' || W.fight.__ekRep) return;
    var o = W.fight, f = function (m) {
      var s = S(), k0 = s && s.stat ? s.stat.kills : 0, wd0 = (s.wd || [0, 0, 0]).reduce(function (a, b) { return a + b; }, 0), r0 = { odun: s.r.odun, et: s.r.et, demir: s.r.demir };
      var out = o.apply(this, arguments);
      if (!W.__ekSeries) try {
        var win = s.stat.kills > k0, w = (s.wd || [0, 0, 0]).reduce(function (a, b) { return a + b; }, 0) - wd0, l = lootOf(s.last), rows = [];
        if (!win && s.en && W.__ekNoEnergy) return out;
        if (w > 0) rows.push(['🩹', '+' + nf(w)]);
        for (var q in l) rows.push([LI[q] || '🎁', '+' + nf(l[q])]);
        if (!rows.length && !win) return out;
        W.__ekPendingRep = { title: W.M && W.M[m] ? W.M[m][0] : 'Savaş', win: win, rows: rows.length ? rows : [['⚔', win ? '1' : '0']] };
      } catch (e) {}
      return out;
    };
    for (var p in o) f[p] = o[p];
    f.__ekRep = true; W.fight = f;
  }
  function flushReport() { if (W.__ekPendingRep && !document.getElementById('bt')) { var r = W.__ekPendingRep; W.__ekPendingRep = null; report(r); } }

  /* ---------- 40) kale yol haritası ---------- */
  function roadmap() {
    var card = document.querySelector('#ek-yapi .yk-card'); if (!card || (W.BMK !== 'ocak' && W.BMK !== 'oba')) return;
    if (card.querySelector('.rm-row')) return;
    var req = []; try { req = W.buildingRequirements('ocak') || []; } catch (e) {}
    var s = S();
    var h = '<div class="rm-row"><span class="rm-t">Sv ' + ((s.l.ocak || 0) + 1) + '</span>' + (req.length ? req.map(function (r) { var d = B()[r.key] || {}; return '<button type="button" class="rm-it" data-ek-rm="' + r.key + '"><i>' + (d.i || '🏠') + '</i><b>' + (s.l[r.key] || 0) + '/' + r.level + '</b></button>'; }).join('') : '<span class="rm-ok">✓</span>') + '</div>';
    var hero = card.querySelector('.yk-hero'); if (hero) hero.insertAdjacentHTML('afterend', h);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ek-rm]'); if (!b) return;
    ev.stopPropagation(); var k = b.getAttribute('data-ek-rm');
    var o = document.getElementById('ek-yapi'); if (o) o.remove();
    var c = W.city3d, g = c && c.buildingSlots && c.buildingSlots.get(k);
    if (c && g) {
      var t = c.controls.target, sx = t.x, sz = t.z, p0 = c.camera.position.clone(), x = g.position.x * .7, z = g.position.z * .7, t0 = performance.now();
      (function step(now) { var e = Math.min(1, (now - t0) / 500), q = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, nx = sx + (x - sx) * q, nz = sz + (z - sz) * q; c.camera.position.set(p0.x + nx - sx, p0.y, p0.z + nz - sz); t.set(nx, t.y, nz); c.controls.update(); if (e < 1) requestAnimationFrame(step); else c.openBuilding(k); })(t0);
    } else if (c) c.openBuilding(k);
  }, true);
  // bina kartı yapım sürerken: 5 dk altıysa "Hemen bitir"
  function cardFast() {
    var card = document.querySelector('#ek-yapi .yk-card'); if (!card) return;
    var k = W.BMK, q = null; try { q = W.buildQueue(k); } catch (e) {}
    var b = card.querySelector('[data-ek-fin]');
    if (q && q.left <= FAST) { if (!b) { var p = card.querySelector('.yk-prog'); if (p) p.insertAdjacentHTML('afterend', '<button type="button" class="yk-main" data-ek-fin="' + k + '">⚡ Hemen bitir</button>'); } }
    else if (b) b.remove();
  }

  /* ---------- 54) tamga / hilal uyarı dili ---------- */
  function seals() {
    document.querySelectorAll('button.inf, .ek-why').forEach(function (b) { if (!b.classList.contains('ek-seal')) { b.classList.add('ek-seal'); b.setAttribute('aria-label', 'Bilgi'); } });
    document.querySelectorAll('#tabs i, .tabs i').forEach(function (i) { if (i.textContent.trim() === '!' && !i.classList.contains('ek-moon')) i.classList.add('ek-moon'); });
  }

  var last = 0, lastFast = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    try { bars(); } catch (e) {}
    if (now - lastFast > 300) { lastFast = now; try { rsFast(); bagBtn(); mapButtons(); roadmap(); cardFast(); seals(); flushReport(); } catch (e) {} }
    if (now - last > 3000) { last = now; try { autoHeal(); hookFightReport(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.render !== 'function') { setTimeout(start, 400); return; } hookFightReport(); requestAnimationFrame(frame); }
  start();
  W.ergenekonKonfor = { openAll: openAll, series: series, report: report };
})();
