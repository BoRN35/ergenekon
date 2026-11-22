/* Ergenekon — Ek Paket 2, 3. adım: farm döngüsü. Claude, 18 Kasım 2026.
   66 harita arama "Canavar" sekmesi · 61 Kum Saati hızlandırmaları (satılmaz) · 86 Alp Müfrezeleri (pasif sefer)
   Kalıcı: s.ek.ks {m1,m5,m30,h1,h8} kum saatleri · s.ek.cs canavar arama son seçimi · s.ek.mf müfrezeler · s.ek.mfr oran ayarı (admin) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekFarm) return; W.__ekFarm = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function dmMat() { var s = S(); s.ek.dm = s.ek.dm || {}; s.ek.dm.mat = s.ek.dm.mat || { kagit: 0, safir: 0, opal: 0 }; return s.ek.dm.mat; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }

  /* ================= 61) Kum Saati ================= */
  /* 5 tür kum saati: 1 dk · 5 dk · 30 dk · 1 sa · 8 sa. Eski kayıtlardaki m5/h1 sayıları olduğu gibi korunur. */
  var KT = [['m1', 60, '1 dk'], ['m5', 300, '5 dk'], ['m30', 1800, '30 dk'], ['h1', 3600, '1 sa'], ['h8', 28800, '8 sa']];
  var KD = {}; KT.forEach(function (t) { KD[t[0]] = t; });
  // küçük ödül (⏳) ve büyük ödül (⌛) türlere düşer; süre uzadıkça düşme oranı azalır
  var DROP_S = [['m1', 55], ['m5', 33], ['m30', 10], ['h1', 2]], DROP_B = [['m30', 50], ['h1', 42], ['h8', 8]];
  function ks() { var e = ek(); e.ks = e.ks || {}; KT.forEach(function (t) { if (typeof e.ks[t[0]] !== 'number') e.ks[t[0]] = 0; }); return e.ks; }
  function ksTotal() { var k = ks(), n = 0; KT.forEach(function (t) { n += k[t[0]]; }); return n; }
  function roll(T) { var t = 0; T.forEach(function (x) { t += x[1]; }); var r = Math.random() * t; for (var i = 0; i < T.length; i++) { r -= T[i][1]; if (r < 0) return T[i][0]; } return T[0][0]; }
  function addT(got) { var k = ks(), r = []; KT.forEach(function (t) { var n = got[t[0]] || 0; if (n > 0) { k[t[0]] += n; r.push(['⏳', t[2] + ' ×' + n]); } }); save(); return r; }
  function addKs(m5, h1) { var got = {}, i; for (i = 0; i < (m5 || 0); i++) { var a = roll(DROP_S); got[a] = (got[a] || 0) + 1; } for (i = 0; i < (h1 || 0); i++) { var b = roll(DROP_B); got[b] = (got[b] || 0) + 1; } return addT(got); }
  W.ekHourglass = { add: addKs, addT: addT, get: ks, total: ksTotal, types: KT, open: function () { openKs(); } };
  function timers() {
    var s = S(), B = W.B || {}, out = [];
    try { (W.buildQueues() || []).forEach(function (q) { if (q.left > 0) out.push({ id: 'b:' + q.k, e: (B[q.k] || {}).i || '🔨', n: (B[q.k] || {}).n || 'Yapı', q: q }); }); } catch (e) {}
    if (s.rq && s.rq.left > 0) out.push({ id: 'r', e: '📜', n: s.rq.n || 'İlim', q: s.rq });
    if (s.hq && s.hq.left > 0) out.push({ id: 'h', e: '🩹', n: 'İyileştirme', q: s.hq });
    return out;
  }
  function openKs(focus) {
    var o = document.getElementById('ek-ks'); if (o) o.remove();
    var k = ks(), T = timers();
    var body = '<div class="ks-have">' + KT.map(function (t) { return '<span class="' + (k[t[0]] ? '' : 'z') + '"><i>⏳</i><b>' + k[t[0]] + '</b><small>' + t[2] + '</small></span>'; }).join('') + '</div>' +
      (T.length ? T.map(function (t) {
        return '<div class="ks-row' + (focus === t.id ? ' on' : '') + '"><i>' + t.e + '</i><span><b>' + esc(t.n) + '</b><small>' + ft(t.q.left) + '</small></span>' +
          '<div class="ks-use">' + KT.map(function (x) { return '<button type="button" data-ks="' + t.id + '|' + x[0] + '"' + (k[x[0]] ? '' : ' disabled') + '>' + x[2] + '</button>'; }).join('') + '</div>' + smartBtn(t, k) + '</div>';
      }).join('') : '<p class="ks-empty">⏳ —</p>');
    o = popup('Kum Saati', body, 'ks-card'); o.id = 'ek-ks';
    o.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-ks]'); if (!b || b.disabled) return;
      var p = b.dataset.ks.split('|'), t = timers().find(function (x) { return x.id === p[0]; }), kk = ks(); if (!t || !kk[p[1]]) return;
      if (!KD[p[1]]) return; kk[p[1]]--; t.q.left = Math.max(1, t.q.left - KD[p[1]][1]);
      try { navigator.vibrate && navigator.vibrate(15); W.snd(880, .05); } catch (e) {}
      save(); rer(); openKs(p[0]);
    });
  }
  // 113) akıllı hızlandırma: en çok süreyi en az israfla kapatan kombinasyon
  function combo(L, k) {
    var use = {}, rem = L, any = false, i, t;
    for (i = KT.length - 1; i >= 0; i--) { t = KT[i]; var n = Math.min(k[t[0]], Math.floor(rem / t[1])); if (n > 0) { use[t[0]] = n; rem -= n * t[1]; any = true; } }
    if (rem > 0) { // kalan süreyi en az israfla kapat
      for (i = 0; i < KT.length; i++) { t = KT[i]; if (t[1] >= rem && k[t[0]] - (use[t[0]] || 0) > 0) { use[t[0]] = (use[t[0]] || 0) + 1; rem = 0; any = true; break; } }
      for (i = 0; rem > 0 && i < KT.length; i++) { t = KT[i]; while (rem > 0 && k[t[0]] - (use[t[0]] || 0) > 0) { use[t[0]] = (use[t[0]] || 0) + 1; rem -= t[1]; any = true; } }
    }
    return any ? use : null;
  }
  function smartBtn(t, k) { var c = combo(t.q.left, k); if (!c) return ''; return '<button type="button" class="ks-smart" data-ks-auto="' + t.id + '">✦ ' + KT.filter(function (x) { return c[x[0]]; }).map(function (x) { return c[x[0]] + '×' + x[2]; }).join(' + ') + '</button>'; }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ks-auto]'); if (!b) return; ev.stopPropagation();
    var t = timers().find(function (x) { return x.id === b.dataset.ksAuto; }), k = ks(); if (!t) return; var c = combo(t.q.left, k); if (!c) return;
    var sec = 0; KT.forEach(function (x) { var n = c[x[0]] || 0; k[x[0]] -= n; sec += n * x[1]; }); t.q.left = Math.max(1, t.q.left - sec); save(); rer(); openKs(t.id);
  }, true);
  function ksButtons() {
    var yk = document.getElementById('ek-yapi'), acts = yk && yk.querySelector('.yk-prog') && yk.querySelector('.yk-acts');
    if (acts && !acts.querySelector('[data-ek-ks]')) { var b = document.createElement('button'); b.type = 'button'; b.className = 'yk-btn'; b.setAttribute('data-ek-ks', '1'); b.textContent = '⏳ ' + ksTotal(); b.addEventListener('click', function (ev) { ev.stopPropagation(); openKs(); }); acts.appendChild(b); }
    var tr = document.getElementById('tr'), s = S();
    if (tr && W.tab === 'r' && s.rq) {
      var det = tr.querySelector('.research-detail'), sel = tr.querySelector('[data-research-selected]');
      if (det && sel && sel.getAttribute('data-research-selected') === s.rq.k && !det.querySelector('[data-ek-ks]')) { var r = document.createElement('button'); r.type = 'button'; r.className = 'ks-rbtn'; r.setAttribute('data-ek-ks', '1'); r.textContent = '⏳ Hızlandır'; r.addEventListener('click', function (ev) { ev.stopPropagation(); openKs('r'); }); det.appendChild(r); }
    }
  }

  /* ================= 66) Canavar arama ================= */
  var CS = { tab: 'k', sp: '', lv: 0, mat: '', list: [], pos: -1 };
  function maxAtk() { return S().l.ocak || 1; }
  function lvOf(i) { var m = W.M[i], az = W.X6 && W.X6.isAz ? W.X6.isAz(i) : false; return m[2] + (az ? 2 : 0); }
  function alive(i) { var s = S(), m = W.M[i]; if (!m || i === 11 || s.mk[i] > 0) return false; try { if (W.fog(m[3], m[4])) return false; } catch (e) {} return true; }
  function species() { var o = {}, M = W.M || []; M.forEach(function (m, i) { if (!alive(i)) return; var k = m[0]; if (!o[k]) o[k] = { n: m[0], e: m[1], lv: {} }; o[k].lv[lvOf(i)] = 1; }); return Object.keys(o).map(function (k) { return o[k]; }).filter(function (x) { return Object.keys(x.lv).some(function (l) { return +l <= maxAtk(); }); }); }
  var MATS = [['kagit', '📜', 1], ['safir', '🔷', 4], ['opal', '🔮', 8], ['kart', '🃏', 0]];
  function matMin(k) { if (k === 'kart') { try { return W.cardMin(); } catch (e) { return 11; } } var m = MATS.find(function (x) { return x[0] === k; }); return m ? m[2] : 1; }
  function matches(i) {
    var L = lvOf(i); if (L > maxAtk()) return false;
    if (CS.mat) return L >= matMin(CS.mat);
    if (CS.sp && W.M[i][0] !== CS.sp) return false;
    return !CS.lv || L === CS.lv;
  }
  function dist(i) { var m = W.M[i]; return Math.hypot(m[3] - 50, m[4] - 50); }
  function build() {
    var M = W.M || [], L = []; M.forEach(function (m, i) { if (alive(i) && matches(i)) L.push(i); });
    var mk = function (i) { return W.ekIsMarked && W.ekIsMarked(i) ? 0 : 1; };
    L.sort(function (a, b) { return mk(a) - mk(b) || (CS.mat ? lvOf(b) - lvOf(a) : 0) || dist(a) - dist(b); });
    CS.list = L;
  }
  function goMonster(i) {
    var tries = 0, go = function () {
      var w = W.world3d, t = w && w.pveTargets && w.pveTargets.filter(function (x) { return x.kind === 'monster' && x.index === i; })[0];
      if (!w || !t || !w.controls || W.tab !== 'm') { if (++tries < 30) setTimeout(go, 200); return; }
      var c = w.controls, cam = w.camera, sx = c.target.x, sz = c.target.z, p0 = cam.position.clone(), t0 = performance.now();
      (function step(now) { var e = Math.min(1, (now - t0) / 600), q = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, nx = sx + (t.worldX - sx) * q, nz = sz + (t.worldZ - sz) * q; cam.position.set(p0.x + nx - sx, p0.y, p0.z + nz - sz); c.target.set(nx, c.target.y, nz); c.update(); if (e < 1) requestAnimationFrame(step); else try { w.activate({ kind: 'monster', index: i }); } catch (x) {} })(t0);
    };
    if (W.tab !== 'm') { W.tab = 'm'; rer(); setTimeout(go, 700); } else go();
  }
  function remember() { ek().cs = { sp: CS.sp, lv: CS.lv, mat: CS.mat }; save(); }
  function monHtml() {
    var sp = species(), mx = maxAtk(), cur = sp.find(function (x) { return x.n === CS.sp; });
    var lvs = []; (W.M || []).forEach(function (m, i) { if (alive(i) && (!CS.sp || m[0] === CS.sp)) { var l = lvOf(i); if (l <= mx) lvs.push(l); } });
    lvs = lvs.filter(function (l, i) { return lvs.indexOf(l) === i; }).sort(function (a, b) { return a - b; });
    if (!CS.lv || lvs.indexOf(CS.lv) < 0) CS.lv = lvs.length ? lvs[lvs.length - 1] : 0;
    var marked = (W.M || []).map(function (m, i) { return i; }).filter(function (i) { return W.ekIsMarked && W.ekIsMarked(i) && alive(i); });
    var hit = CS.pos >= 0 ? CS.list[CS.pos] : null, res = '';
    if (hit != null) {
      var m = W.M[hit], en = (S().en && S().en.v) || 0;
      res = '<div class="cs-hit"><span class="cs-e">' + m[1] + '</span><span><b>' + esc(m[0]) + ' · Sv ' + lvOf(hit) + (W.ekIsMarked && W.ekIsMarked(hit) ? ' · ✦' : '') + '</b><small>' + (CS.pos + 1) + '/' + CS.list.length + ' · ⚡' + Math.floor(en) + '</small></span></div>' +
        '<div class="cs-go"><button type="button" class="ek-btn" data-cs-act="go">📍</button><button type="button" class="ek-btn gold" data-cs-act="1">⚔ ×1</button><button type="button" class="ek-btn gold" data-cs-act="5">⚔ ×5</button></div>';
    } else if (CS.pos === -2) res = '<div class="cs-hit cs-none">🐾 —</div>';
    return '<div class="ek-modal ek-small" role="dialog" aria-modal="true" aria-label="Canavar ara">' +
      '<div class="ek-mh"><span class="ek-cap">BOZKIRI TARA</span><h2>Canavar Ara</h2><button type="button" class="ek-x" data-ek-close="1" aria-label="Kapat">✕</button></div>' + tabs('k') +
      (marked.length ? '<div class="cs-mk">' + marked.slice(0, 3).map(function (i) { return '<button type="button" data-cs-mk="' + i + '"><span>' + W.M[i][1] + '</span><small>✦ Sv ' + lvOf(i) + '</small></button>'; }).join('') + '</div>' : '') +
      '<div class="cs-sp">' + sp.map(function (x) { return '<button type="button" class="' + (CS.sp === x.n && !CS.mat ? 'on' : '') + '" data-cs-sp="' + esc(x.n) + '" title="' + esc(x.n) + '"><span>' + x.e + '</span><small>' + esc(x.n) + '</small></button>'; }).join('') + '</div>' +
      '<div class="cs-mat">' + MATS.map(function (x) { return '<button type="button" class="' + (CS.mat === x[0] ? 'on' : '') + '" data-cs-mat="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      (CS.mat ? '' : '<div class="ek-flv"><b>Sv ' + CS.lv + '</b>' + (lvs.length > 1 ? '<input type="range" min="0" max="' + (lvs.length - 1) + '" step="1" value="' + Math.max(0, lvs.indexOf(CS.lv)) + '" data-cs-lv="' + lvs.join(',') + '" aria-label="Seviye">' : '') + '</div>') +
      '<div class="ek-acts ek-fgo"><button type="button" class="ek-btn" data-cs-find="1">' + (CS.pos >= 0 ? 'Sıradaki ›' : 'Ara') + '</button></div>' + res + '</div>';
  }
  function tabs(on) { return '<div class="cs-tabs"><button type="button" class="' + (on === 'r' ? 'on' : '') + '" data-cs-tab="r">🪵 Kaynak</button><button type="button" class="' + (on === 'k' ? 'on' : '') + '" data-cs-tab="k">🐺 Canavar</button></div>'; }
  function openMon(o) {
    var c = ek().cs || {}; if (!CS.inited) { CS.sp = c.sp || ''; CS.lv = c.lv || 0; CS.mat = c.mat || ''; CS.inited = 1; }
    o.classList.add('cs-mode'); CS.pos = -1; o.innerHTML = monHtml();
    if (o.__csBound) return; o.__csBound = 1;
    o.addEventListener('click', function (ev) {
      if (!o.classList.contains('cs-mode')) return;
      var t = ev.target, b;
      if ((b = t.closest('[data-cs-sp]'))) { CS.sp = CS.sp === b.dataset.csSp && !CS.mat ? '' : b.dataset.csSp; CS.mat = ''; CS.lv = 0; CS.pos = -1; remember(); o.innerHTML = monHtml(); }
      else if ((b = t.closest('[data-cs-mat]'))) { CS.mat = CS.mat === b.dataset.csMat ? '' : b.dataset.csMat; CS.pos = -1; remember(); o.innerHTML = monHtml(); }
      else if ((b = t.closest('[data-cs-mk]'))) { CS.list = [+b.dataset.csMk]; CS.pos = 0; o.innerHTML = monHtml(); goMonster(CS.list[0]); }
      else if (t.closest('[data-cs-find]')) { if (CS.pos < 0) { build(); CS.pos = CS.list.length ? 0 : -2; } else { CS.pos = (CS.pos + 1) % Math.max(1, CS.list.length); } o.innerHTML = monHtml(); if (CS.pos >= 0) goMonster(CS.list[CS.pos]); }
      else if ((b = t.closest('[data-cs-act]'))) {
        var i = CS.list[CS.pos]; if (i == null) return;
        if (b.dataset.csAct === 'go') { o.remove(); goMonster(i); return; }
        o.remove(); var n = +b.dataset.csAct;
        if (W.ekSeries) W.ekSeries(i, n); else { try { W.fight(i); } catch (e) {} }
      }
    });
    o.addEventListener('input', function (ev) { if (!o.classList.contains('cs-mode')) return; var t = ev.target; if (t.hasAttribute('data-cs-lv')) { var l = t.getAttribute('data-cs-lv').split(',').map(Number); CS.lv = l[+t.value]; CS.pos = -1; remember(); var bb = o.querySelector('.ek-flv b'); if (bb) bb.textContent = 'Sv ' + CS.lv; var r = o.querySelector('.cs-hit'); if (r) { r.remove(); var g = o.querySelector('.cs-go'); if (g) g.remove(); } var f = o.querySelector('[data-cs-find]'); if (f) f.textContent = 'Ara'; } });
  }
  function findTabs() {
    var o = document.getElementById('ek-findov'); if (!o) return;
    if (o.classList.contains('cs-mode')) return;
    var mh = o.querySelector('.ek-mh'); if (!mh || o.querySelector('.cs-tabs')) return;
    mh.insertAdjacentHTML('afterend', tabs('r'));
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-cs-tab]'); if (!b) return;
    var o = document.getElementById('ek-findov'); if (!o) return; ev.stopPropagation();
    if (b.dataset.csTab === 'k') openMon(o);
    else { o.remove(); if (W.ekOpenFind) W.ekOpenFind(); }
  }, true);

  /* ================= 86) Alp Müfrezeleri ================= */
  var DUR = [1, 2, 4, 8, 12];
  var RATE0 = { // [küçük paket, orta paket, kart %, ikinci kart %, kağıt %, safir/opal %]
    1: [1, 0, 10, 0, 3, 1], 2: [1, 0, 20, 0, 6, 2], 4: [2, 0, 35, 0, 10, 4], 8: [0, 1, 60, 0, 18, 7], 12: [1, 1, 100, 20, 25, 10]
  };
  function rates() { var o = ek().mfr; return o && typeof o === 'object' ? o : RATE0; }
  function mf() { var e = ek(); e.mf = e.mf || [null, null]; return e.mf; }
  function smallPack() { return Math.round(500 * Math.pow(1.25, S().l.ocak || 1)); }
  function owned() { return (S().hs || []).map(function (v, i) { return v > 0 ? i : -1; }).filter(function (i) { return i >= 0; }); }
  function busyHeroes(skip) { return mf().filter(function (x, j) { return x && j !== skip; }).map(function (x) { return x.h; }); }
  function heroPic(i, w) { try { return W.hPic(i, w); } catch (e) { return (W.HH[i] || {}).e || '?'; } }
  var MFS = { slot: -1, h: -1, d: 1 };
  function openMf() {
    var o = document.getElementById('ek-mf'); if (o) o.remove();
    var M = mf(), now = Date.now();
    var body = '<div class="mf-slots">' + [0, 1].map(function (j) {
      var x = M[j];
      if (x) { var left = (x.t1 - now) / 1000, done = left <= 0; return '<div class="mf-s' + (done ? ' done' : '') + '"><span class="mf-p">' + heroPic(x.h, 56) + '</span><span><b>' + esc(W.HH[x.h].n) + '</b><small>' + x.d + ' sa · ' + (done ? '✓' : ft(left)) + '</small><u><em style="width:' + Math.min(100, (1 - left / (x.d * 3600)) * 100).toFixed(0) + '%"></em></u></span>' + (done ? '<button type="button" class="yk-main" data-mf-cl="' + j + '">🎁</button>' : '') + '</div>'; }
      return '<button type="button" class="mf-s mf-empty" data-mf-new="' + j + '"><i>＋</i><small>Boş müfreze</small></button>';
    }).join('') + '</div>';
    if (MFS.slot >= 0) {
      var free = owned().filter(function (i) { return busyHeroes(MFS.slot).indexOf(i) < 0; });
      if (MFS.h < 0 || free.indexOf(MFS.h) < 0) MFS.h = free.length ? free[0] : -1;
      body += '<div class="mf-pick">' + (free.length ? free.map(function (i) { return '<button type="button" class="' + (MFS.h === i ? 'on' : '') + '" data-mf-h="' + i + '">' + heroPic(i, 48) + '</button>'; }).join('') : '<p class="mf-none">⭐ —</p>') + '</div>' +
        '<div class="mf-dur">' + DUR.map(function (d) { return '<button type="button" class="' + (MFS.d === d ? 'on' : '') + '" data-mf-d="' + d + '">' + d + ' sa</button>'; }).join('') + '</div>' + odds(MFS.d) +
        '<button type="button" class="yk-main" data-mf-go="1"' + (MFS.h >= 0 ? '' : ' disabled') + '>🏇 Yola çıkar</button>';
    }
    o = popup('Alp Müfrezeleri', body, 'mf-card'); o.id = 'ek-mf';
    o.addEventListener('click', function (ev) {
      var t = ev.target, b;
      if ((b = t.closest('[data-mf-new]'))) { MFS.slot = +b.dataset.mfNew; openMf(); }
      else if ((b = t.closest('[data-mf-h]'))) { MFS.h = +b.dataset.mfH; openMf(); }
      else if ((b = t.closest('[data-mf-d]'))) { MFS.d = +b.dataset.mfD; openMf(); }
      else if ((b = t.closest('[data-mf-go]')) && !b.disabled) { mf()[MFS.slot] = { h: MFS.h, d: MFS.d, t1: Date.now() + MFS.d * 3600e3 }; MFS.slot = -1; save(); try { W.ergenekonProfil && W.ergenekonProfil.bubble(mf().filter(Boolean).slice(-1)[0].h); } catch (e) {} openMf(); }
      else if ((b = t.closest('[data-mf-cl]'))) { claim(+b.dataset.mfCl); }
    });
  }
  function odds(d) { var r = rates()[d] || RATE0[d]; return '<div class="mf-odds">' + (r[0] ? '<span>📦×' + r[0] + '</span>' : '') + (r[1] ? '<span>🎁×' + r[1] + '</span>' : '') + '<span>🃏 %' + r[2] + (r[3] ? '+' + r[3] : '') + '</span><span>📜 %' + r[4] + '</span><span>🔷🔮 %' + r[5] + '</span></div>'; }
  function claim(j) {
    var M = mf(), x = M[j]; if (!x || x.t1 > Date.now()) return;
    var r = rates()[x.d] || RATE0[x.d], s = S(), m = dmMat(), rows = [], cap = Infinity, prem = W.__ekPrem && W.__ekPrem();
    try { cap = W.cap(); } catch (e) {}
    var amt = (r[0] * smallPack() + r[1] * smallPack() * 3) * (prem ? 1.35 : 1);
    if (amt) { var per = Math.round(amt / 3); ['odun', 'et', 'demir'].forEach(function (k) { s.r[k] = Math.min(cap, (s.r[k] || 0) + per); }); rows.push(['📦', '+' + nf(per * 3)]); }
    var cards = 0; if (Math.random() * 100 < r[2]) cards++; if (r[3] && Math.random() * 100 < r[3]) cards++;
    if (cards) { var hi = Math.random() < .5 ? x.h : Math.floor(Math.random() * W.HH.length); s.hc[hi] = (s.hc[hi] || 0) + cards; rows.push(['🃏', W.HH[hi].n + ' +' + cards]); }
    if (Math.random() * 100 < r[4]) { m.kagit++; rows.push(['📜', '+1']); }
    if (Math.random() * 100 < r[5]) { if (Math.random() < .5) { m.safir++; rows.push(['🔷', '+1']); } else { m.opal++; rows.push(['🔮', '+1']); } }
    M[j] = null; save(); rer();
    var o = document.getElementById('ek-mf'); if (o) o.remove();
    if (W.ekReport) W.ekReport({ title: 'Alp Müfrezesi', win: true, sub: W.HH[x.h].n + ' · ' + x.d + ' sa', rows: rows });
  }
  function mfChip() {
    var bar = document.getElementById('ek-army'); if (!bar) return;
    var b = bar.querySelector('[data-ek-mf]'), M = mf(), now = Date.now(), ready = M.filter(function (x) { return x && x.t1 <= now; }).length, busy = M.filter(Boolean).length;
    if (!b) { b = document.createElement('button'); b.type = 'button'; b.className = 'db-chip'; b.setAttribute('data-ek-mf', '1'); b.addEventListener('click', function (ev) { ev.stopPropagation(); MFS.slot = -1; openMf(); }); bar.appendChild(b); }
    var h = '<i>🏇</i><span><b>Alp Müfrezeleri</b><small>' + (ready ? '🎁 ' + ready : busy + '/2') + '</small></span>';
    b.classList.toggle('on', !!ready); if (b.__ekh !== h) { b.__ekh = h; b.innerHTML = h; }
  }
  /* admin: oran ayarı (yalnız yönetici sekmesinde) */
  function adminRates() {
    var tz = document.getElementById('tz'); if (!tz || W.tab !== 'z' || tz.querySelector('#ek-mfr')) return;
    var c = document.createElement('div'); c.id = 'ek-mfr'; c.className = 'card';
    c.innerHTML = '<b>🏇 Müfreze oranları</b><small> [küçük, orta, kart%, 2.kart%, kağıt%, safir/opal%]</small><textarea rows="6" style="width:100%;font:12px monospace"></textarea><button type="button">Kaydet</button>';
    var ta = c.querySelector('textarea'); ta.value = JSON.stringify(rates());
    c.querySelector('button').addEventListener('click', function () { try { var v = JSON.parse(ta.value); if (v && typeof v === 'object') { ek().mfr = v; save(); c.querySelector('button').textContent = '✓'; } } catch (e) { c.querySelector('button').textContent = '✗'; } });
    tz.insertBefore(c, tz.firstChild);
  }

  var l1 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 300) { l1 = now; try { findTabs(); ksButtons(); mfChip(); adminRates(); } catch (e) {} }
  }
  function start() { if (!S() || !W.M || typeof W.fight !== 'function') { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
  function nearestMonster() { var M = W.M || [], best = -1, bd = 1e9; M.forEach(function (m, i) { if (!alive(i) || lvOf(i) > maxAtk()) return; var d = dist(i); if (d < bd) { bd = d; best = i; } }); return best; }
  function useKs(id, type) { var t = timers().find(function (x) { return x.id === id; }), k = ks(); if (!t || !KD[type] || !k[type]) return false; k[type]--; t.q.left = Math.max(1, t.q.left - KD[type][1]); try { navigator.vibrate && navigator.vibrate(15); W.snd(880, .05); } catch (e) {} save(); rer(); return true; }
  function autoKs(id) { var t = timers().find(function (x) { return x.id === id; }), k = ks(); if (!t) return false; var c = combo(t.q.left, k); if (!c) return false; var sec = 0; KT.forEach(function (x) { var n = c[x[0]] || 0; k[x[0]] -= n; sec += n * x[1]; }); t.q.left = Math.max(1, t.q.left - sec); save(); rer(); return true; }
  W.ekHourglass.use = useKs; W.ekHourglass.auto = autoKs; W.ekHourglass.combo = function (L) { return combo(L, ks()); };
  W.ergenekonFarm = { nearestMonster: nearestMonster, openKs: openKs, openMf: openMf, addKs: addKs, goMonster: goMonster, claimMf: claim };
})();
