/* Ergenekon — Ek Paket 3, 1. adım: işaretler ve bilgi. Claude, 18 Kasım 2026.
   107 boştaki inşaatçı · 108 boştaki araştırma (sahnede altın hilal) · 109 boştaki birlik (Sefer simgesinde sayı)
   104 yaralı kapasitesi · 139 pet yeteneği hazır · 125 yeni bina parlaması · 149 Kut ödül önizlemesi
   145 kaynak simgesi bilgisi · 146 saatlik üretim · 111 sefer bilgisi · 112 taşıma kapasitesi · 102 zorluk göstergesi
   133 kaynak noktası rezerv çubuğu · 130 tarla hasat göstergesi */
(function () {
  'use strict';
  var W = window;
  if (W.__ekIsaret) return; W.__ekIsaret = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function sum(a) { return (a || []).reduce(function (x, y) { return x + (y || 0); }, 0); }

  /* ---------- ortak: sahnedeki noktayı ekrana çevir ---------- */
  var V = null;
  function scr(view, x, y, z, host) {
    var c = view && view.camera; if (!c || !host) return null;
    if (!V) V = new c.position.constructor(); V.set(x, y, z).project(c);
    if (V.z > 1 || V.x < -1.15 || V.x > 1.15 || V.y < -1.15 || V.y > 1.15) return null;
    var r = view.renderer.domElement.getBoundingClientRect(), b = host.getBoundingClientRect();
    return { x: r.left - b.left + (V.x + 1) / 2 * r.width, y: r.top - b.top + (1 - V.y) / 2 * r.height };
  }
  function slotPos(k) { var c = W.city3d; if (k === 'ocak') return [0, 0]; var g = c && c.buildingSlots && c.buildingSlots.get(k); return g ? [g.position.x, g.position.z] : null; }

  /* ---------- 107 · 108 · 104 · 125: oba sahnesinde hilal ve parıltı ---------- */
  var L = { el: null, pool: {} };
  function idleBuild() { try { return W.buildQueues().length < W.builders(); } catch (e) { return false; } }
  function idleResearch() { var s = S(); return !s.rq && (s.l.bilgelik || 0) > 0; }
  function woundRatio() { var s = S(), c = 1; try { c = W.wcap(); } catch (e) {} return c > 0 ? sum(s.wd) / c : 0; }
  function newBuildings() {
    var e = ek(), seen = e.nb = e.nb || {}, s = S(), out = [], B = W.B || {}, first = !e.nb0;
    for (var k in B) { var L0 = s.l[k] || 0, req = []; try { req = W.buildingRequirements(k) || []; } catch (x) {} var open = L0 > 0 || !req.length; if (open && !seen[k]) { if (first) seen[k] = 1; else out.push(k); } }
    if (first) { e.nb0 = 1; }
    return out;
  }
  function cityLayer() {
    var cv = document.getElementById('cityv');
    if (!cv || W.tab !== 'c' || !W.city3d) { if (L.el) L.el.hidden = true; return; }
    if (!L.el || !L.el.isConnected) {
      L.el = document.createElement('div'); L.el.id = 'ek-hil'; L.pool = {}; cv.appendChild(L.el);
      L.el.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-hk]'); if (!b) return; ev.stopPropagation(); var k = b.dataset.hk, kind = b.dataset.kind;
        if (kind === 'new') { ek().nb[k] = 1; }
        if (kind === 'wd') { try { W.city3d.openBuilding('sifa'); } catch (e) {} return; }
        if (kind === 'rs') { var t = document.querySelector('#tabs [data-t="r"]'); if (t) t.click(); return; }
        try { W.city3d.openBuilding(k); } catch (e) {}
      });
    }
    L.el.hidden = false;
    var items = [];
    if (idleBuild()) items.push(['ocak', 'ib', '']);
    if (idleResearch()) items.push(['bilgelik', 'rs', '']);
    if (woundRatio() >= .8 && (S().l.sifa || 0) > 0) items.push(['sifa', 'wd', '']);
    newBuildings().forEach(function (k) { items.push([k, 'new', '']); });
    var seen = {};
    items.forEach(function (it) {
      var p = slotPos(it[0]); if (!p) return; var sp = scr(W.city3d, p[0], it[0] === 'ocak' ? 9.5 : 8.2, p[1], cv); if (!sp) return;
      var id = it[0] + ':' + it[1], b = L.pool[id];
      if (!b) { b = L.pool[id] = document.createElement('div'); b.setAttribute('role', 'button'); b.className = 'ek-hl ek-hl-' + it[1]; b.dataset.hk = it[0]; b.dataset.kind = it[1]; b.innerHTML = it[1] === 'new' ? '<i>✦</i>' : '<i></i>'; L.el.appendChild(b); }
      b.style.transform = 'translate(' + (sp.x - 14).toFixed(1) + 'px,' + (sp.y - 40).toFixed(1) + 'px)'; b.hidden = false; seen[id] = 1;
    });
    for (var id in L.pool) if (!seen[id]) L.pool[id].hidden = true;
  }

  /* ---------- 109 boştaki birlik · 139 pet hazır ---------- */
  function badge(btn, n, cls) {
    if (!btn) return; var b = btn.querySelector('.' + cls);
    if (!n) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('i'); b.className = cls; btn.appendChild(b); }
    var t = cls === 'ek-idle' ? String(n) : ''; if (b.textContent !== t) b.textContent = t;
  }
  function navBadges() {
    var s = S(), idle = (s.sq || []).filter(function (q) { return q.st === 0; }).length;
    badge(document.querySelector('#tabs [data-t="k"]'), idle, 'ek-idle');
    var w = document.getElementById('ek-world') || document.querySelector('.ek-dock [data-ek-world]'); if (w) badge(w, idle, 'ek-idle');
    var p = (ek().pets) || null, ready = false, now = Date.now();
    if (p) ready = (p.tulpar && !(p.tulpar.cd > now) && !(p.tulpar.b > now)) || (p.sf && p.sf <= now);
    badge(document.querySelector('[data-ek-pet]'), ready ? 1 : 0, 'ek-hl-dot');
  }

  /* ---------- 149) Kut ödül önizlemesi ---------- */
  function kutPreview() {
    var big = document.querySelector('.kut-big'); if (!big || big.parentNode.querySelector('.kut-nx')) return;
    var k = 0; try { k = W.ergenekonIlerleme.kut().lv; } catch (e) {}
    var n = k + 1, d = '<div class="kut-nx"><small>Sv ' + n + '</small><span>🐎 +%1</span><span>⚡ +1</span>' + (n * .005 <= .15 ? '<span>🔨 +%0.5</span>' : '') + '</div>';
    big.insertAdjacentHTML('afterend', d);
  }

  /* ---------- 145) kaynak simgesi bilgisi · 146) saatlik üretim ---------- */
  var PB = { odun: 'odunluk', et: 'avci', demir: 'demirci', komur: 'komurluk' };
  var RN = { odun: '🪵 Odun', et: '🍖 Et', demir: '⛓️ Demir', komur: '🪨 Kömür', celik: '🔩 Çelik', dari: '🌾 Darı', kristal: '🔥 Kor' };
  function perHour(b) {
    var s = S(), lv = (s.l && s.l[b]) || 0; if (!lv) return 0; var f = 1; try { f = W.factor() * W.pm() * W.ECO(); } catch (e) {}
    var g = Math.pow(1.095, lv), p = b === 'odunluk' ? 0.3 * (0.5 + lv * g) : b === 'avci' ? 0.3 * (0.3 + 0.8 * lv * g) : 0.12 * lv * g;
    return p * f * 3600;
  }
  function rateOf(r) {
    if (PB[r]) return perHour(PB[r]) + (r === 'et' && W.ekFields ? W.ekFields().length * (W.ekTarlaRate ? W.ekTarlaRate() : 0) * .65 : 0);
    if (r === 'celik') return W.ergenekonDongu ? W.ergenekonDongu.steelRate() : 0;
    if (r === 'dari') return W.ekFields ? W.ekFields().length * (W.ekTarlaRate ? W.ekTarlaRate() : 0) * .35 : 0;
    return 0;
  }
  var SRC = { odun: [['b', 'odunluk', '🏠'], ['m', '', '🗺️']], et: [['b', 'avci', '🏠'], ['m', '', '🗺️'], ['f', '', '🌾']], demir: [['b', 'demirci', '🏠'], ['m', '', '🗺️']], komur: [['b', 'komurluk', '🏠'], ['m', '', '🗺️']], celik: [['b', 'demirci', '⛓️ Sv10+'], ['k', '', '🏹 Akıncı / 👹']], dari: [['f', '', '🌾 Tarla']], kristal: [['m2', '', '🐺 Ocak 25+']] };
  function resInfo(r, anchor) {
    var o0 = document.getElementById('ek-rinfo'); if (o0) { var same = o0.dataset.r === r; o0.remove(); if (same) return; }
    var s = S(), cap = 0; try { cap = W.cap(); } catch (e) {}
    var have = s.r[r] || 0, ph = rateOf(r), fill = cap && /odun|et|demir|komur/.test(r) ? Math.min(1, have / cap) : null;
    var o = document.createElement('div'); o.id = 'ek-rinfo'; o.dataset.r = r;
    o.innerHTML = '<b>' + (RN[r] || r) + '</b><div class="ri-n"><span>' + nf(have) + '</span>' + (ph ? '<small>+' + nf(ph) + '/sa</small>' : '') + '</div>' + (fill != null ? '<u><em style="width:' + Math.round(fill * 100) + '%" class="' + (fill > .9 ? 'hi' : '') + '"></em></u>' : '') +
      '<div class="ri-go">' + (SRC[r] || []).map(function (x, i) { return '<button type="button" data-ri="' + i + '">' + x[2] + '</button>'; }).join('') + '</div>';
    document.body.appendChild(o);
    var rc = anchor.getBoundingClientRect(); o.style.left = Math.max(6, Math.min(innerWidth - 206, rc.left)) + 'px'; o.style.top = (rc.bottom + 6) + 'px';
    o.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-ri]'); if (!b) return; var x = SRC[r][+b.dataset.ri]; o.remove();
      if (x[0] === 'b') { W.tab = 'c'; try { W.render(); W.city3d.openBuilding(x[1]); } catch (e) {} }
      else if (x[0] === 'm' || x[0] === 'm2') { W.tab = 'm'; try { W.render(); } catch (e) {} setTimeout(function () { if (W.ekOpenFind) { W.ekOpenFind(); if (x[0] === 'm2') setTimeout(function () { var t = document.querySelector('[data-cs-tab="k"]'); if (t) t.click(); }, 60); } }, 500); }
      else if (x[0] === 'k') { var t = document.querySelector('#tabs [data-t="a"]'); if (t) t.click(); }
      else if (x[0] === 'f') { W.tab = 'c'; try { W.render(); } catch (e) {} }
    });
    setTimeout(function () { document.addEventListener('pointerdown', function off(ev) { if (!o.contains(ev.target)) { o.remove(); document.removeEventListener('pointerdown', off, true); } }, true); }, 0);
  }
  document.addEventListener('click', function (ev) {
    var res = document.getElementById('res'); if (!res || !ev.target.closest) return; var ch = ev.target.closest('#res > *'); if (!ch || !res.contains(ch)) return;
    var r = ch.getAttribute('data-ek-res'); if (!r) { var i = Array.prototype.indexOf.call(res.children, ch); r = ['odun', 'et', 'demir'][i]; }
    if (!r) return; ev.stopPropagation(); ev.preventDefault(); resInfo(r, ch);
  }, true);
  function prodCard() {
    var yk = document.getElementById('ek-yapi'), k = yk && yk.dataset.k; if (!k) return;
    var r = null; for (var x in PB) if (PB[x] === k) r = x; if (!r) return;
    var cap = 0; try { cap = W.cap(); } catch (e) {} var have = S().r[r] || 0, fill = cap ? Math.min(1, have / cap) : 0, ph = perHour(k);
    var h = '<i>' + RN[r].split(' ')[0] + '</i><span><b>+' + nf(ph) + '/sa</b><u><em style="width:' + Math.round(fill * 100) + '%" class="' + (fill > .9 ? 'hi' : '') + '"></em></u></span><small>' + Math.round(fill * 100) + '%</small>';
    var row = yk.querySelector('.ek-prod');
    if (!row) { var anchor = yk.querySelector('.yk-cost,.yk-prog,.yk-foot'); if (!anchor) return; row = document.createElement('div'); row.className = 'ek-prod'; anchor.parentNode.insertBefore(row, anchor); }
    if (row.__ekh !== h) { row.__ekh = h; row.innerHTML = h; }
  }

  /* ---------- 102 · 111 · 112: harita hedef kartı ---------- */
  function difficulty(m) {
    var M = W.M[m]; if (!M) return null; var s = S(), az = W.X6 && W.X6.isAz ? W.X6.isAz(m) : false, Lv = M[2] + (az ? 2 : 0), pg = (s.pg && s.pg.n) || 0, b = m === 11;
    var mA = 9 * Math.pow(1.17, Lv) * (b ? 1.3 : 1) * (1 + .35 * pg) * (az ? 1.4 : 1), mH = 40 * Math.pow(1.18, Lv) * (b ? 1.5 : 1) * (1 + .35 * pg) * (az ? 2.5 : 1), mD = .3 * mA;
    var st = W.cs(), kill = mH / Math.max(1, st.atk - mD), live = Math.max(1, s.ch.hp || st.hp) / Math.max(1, mA - st.def * .7), r = live / kill;
    return r >= 2 ? 'ok' : r >= 1 ? 'mid' : 'hard';
  }
  function gatherPerHour(n) { var g = 0; try { g = W.nrate(n.lv) * (1 + W.wosBonus('Gathering Speed')) * 3; } catch (e) {} return g; }
  function mapCard() {
    var mi = document.getElementById('mapi'); if (!mi || W.tab !== 'm') return;
    var m = typeof W.selM === 'number' ? W.selM : -1, ni = typeof W.sel === 'number' ? W.sel : -1, s = S(), key, h;
    if (m >= 0 && m < (W.RIFT_OFFSET || 1000) && W.M[m]) {
      var d = difficulty(m), en = (W.EN_C || 10) * (m === 11 ? 2 : 1);
      key = 'm' + m + d + Math.floor((s.en && s.en.v) || 0);
      h = '<div class="ek-ti ek-d-' + d + '"><span class="dfc"><i></i><b>' + { ok: 'Kolay', mid: 'Denk', hard: 'Zor' }[d] + '</b></span><span>⚡ ' + en + ' <small>/' + Math.floor((s.en && s.en.v) || 0) + '</small></span><span>⏱ anında</span></div>';
    } else if (ni >= 0 && s.nodes && s.nodes[ni]) {
      var n = s.nodes[ni], t = 0, cap = 0; try { t = W.mt(ni); cap = W.marchCapacity(); } catch (e) {}
      var load = Math.min(cap, n.res), gh = gatherPerHour(n), gt = gh ? load / gh * 3600 : 0;
      key = 'n' + ni + Math.round(n.res);
      h = '<div class="ek-ti"><span>⏱ ' + ft(t) + '</span><span>📦 ' + nf(load) + '</span><span>⛏️ ' + ft(gt) + '</span><span>↩ ' + ft(t * 2 + gt) + '</span></div>';
    } else return;
    var ex = mi.querySelector('.ek-ti'); if (ex && ex.dataset.k === key) return; if (ex) ex.remove();
    var card = mi.querySelector('.card') || mi, h3 = card.querySelector('h3');
    if (h3) h3.insertAdjacentHTML('afterend', h.replace('class="ek-ti', 'data-k="' + key + '" class="ek-ti')); else card.insertAdjacentHTML('afterbegin', h.replace('class="ek-ti', 'data-k="' + key + '" class="ek-ti'));
  }

  /* ---------- 133) rezerv çubuğu (yakın görünüm) · 130) tarla hasadı ---------- */
  var RV = { el: null, pool: {} }, TF = { el: null, pool: {} };
  function reserveLayer() {
    var w = W.world3d, mapv = document.getElementById('mapv'), s = S();
    var far = W.ekFar ? W.ekFar() : true;
    if (!w || !w.pveTargets || !mapv || W.tab !== 'm' || far || (w.camera && w.camera.zoom < .7)) { if (RV.el) RV.el.hidden = true; return; }
    if (!RV.el || !RV.el.isConnected) { RV.el = document.createElement('div'); RV.el.id = 'ek-rsv'; RV.pool = {}; mapv.appendChild(RV.el); }
    RV.el.hidden = false; var seen = {};
    w.pveTargets.forEach(function (t) {
      if (t.kind !== 'node' || !t.visible) return; var n = s.nodes[t.index]; if (!n || n.rg > 0 || !n.max) return;
      var sp = scr(w, t.worldX, 4.2, t.worldZ, mapv); if (!sp) return;
      var b = RV.pool[t.id]; if (!b) { b = RV.pool[t.id] = document.createElement('i'); RV.el.appendChild(b); b.innerHTML = '<em></em>'; }
      var q = Math.max(0, Math.min(1, n.res / n.max)); b.firstChild.style.width = (q * 100).toFixed(0) + '%'; b.className = q < .25 ? 'lo' : '';
      b.style.transform = 'translate(' + (sp.x - 16).toFixed(1) + 'px,' + sp.y.toFixed(1) + 'px)'; b.hidden = false; seen[t.id] = 1;
    });
    for (var id in RV.pool) if (!seen[id]) RV.pool[id].hidden = true;
  }
  function fieldLayer() {
    var cv = document.getElementById('cityv'); if (!cv || W.tab !== 'c' || !W.ekFields) { if (TF.el) TF.el.hidden = true; return; }
    if (!TF.el || !TF.el.isConnected) { TF.el = document.createElement('div'); TF.el.id = 'ek-tarla'; TF.pool = {}; cv.appendChild(TF.el); }
    TF.el.hidden = false; var seen = {};
    W.ekFields().forEach(function (f) {
      var sp = scr(W.city3d, f.x, 2.5, f.z, cv); if (!sp) return;
      var b = TF.pool[f.id]; if (!b) { b = TF.pool[f.id] = document.createElement('i'); b.innerHTML = '<em></em><b>🌾</b>'; TF.el.appendChild(b); }
      var ready = f.q > .93; b.className = ready ? 'rd' : ''; b.firstChild.style.width = (f.q * 100).toFixed(0) + '%';
      b.style.transform = 'translate(' + (sp.x - 15).toFixed(1) + 'px,' + sp.y.toFixed(1) + 'px)'; b.hidden = false; seen[f.id] = 1;
    });
    for (var id in TF.pool) if (!seen[id]) TF.pool[id].hidden = true;
  }

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 90) { l1 = now; try { cityLayer(); reserveLayer(); fieldLayer(); } catch (e) {} }
    if (now - l2 > 500) { l2 = now; try { navBadges(); kutPreview(); prodCard(); mapCard(); } catch (e) {} }
  }
  function start() { if (!S() || !W.city3d || typeof W.cs !== 'function') { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
})();
