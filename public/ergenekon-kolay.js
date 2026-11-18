/* Ergenekon — Ek Paket 2, 1. adım: hızlı konfor. Claude, 18 Kasım 2026.
   76 Neler yeni · 96 Dünün emeği · 65 ambar ışığı (ergenekon-durum.js) · 64 önerilen araştırma · 89 araştırma/Kut önizleme
   63 sürekli eğitim · 62 tekrar gönder · 83 hepsine yardım · 72 renk körlüğü · 69 grafik kalitesi
   Kalıcı: s.ek.wv, s.ek.yd/yl, s.ek.ct, s.ek.rg, s.ek.cbm, s.ek.gq, s.ek.hp */
(function () {
  'use strict';
  var W = window;
  if (W.__ekKolay) return; W.__ekKolay = true;
  var VER = 'p2-1';
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function day() { var d = new Date(); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function overlayOpen() { return document.querySelector('.ek-ov,#aw,#ek-chest'); }

  /* ---------- 76) Neler yeni ---------- */
  var NEW = [['🔁', 'Sürekli eğitim'], ['🐎', 'Tekrar gönder'], ['🤝', 'Hepsine yardım'], ['📜', 'Önerilen ilim'], ['🌾', 'Ambar ışığı'], ['🎨', 'Grafik ve renk ayarı']];
  function whatsNew() {
    var e = ek(); if (e.wv === VER || overlayOpen()) return;
    if ((S().l.ocak || 1) < 2) { e.wv = VER; save(); return; } // yeni başlayana gösterme
    e.wv = VER; save();
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small nw-card"><div class="yk-head"><h2>Neler yeni</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="nw-grid">' +
      NEW.map(function (n) { return '<span><i>' + n[0] + '</i><small>' + n[1] + '</small></span>'; }).join('') + '</div><button type="button" class="yk-main" data-nw-ok="1">Tamam</button></div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x,[data-nw-ok]')) o.remove(); });
    document.body.appendChild(o);
  }

  /* ---------- 96) Dünün emeği ---------- */
  function kutLv() { try { return W.ergenekonIlerleme.kut().lv; } catch (e) { return 0; } }
  function snap() { var s = S(), st = s.stat || {}; return { d: day(), k: st.kills || 0, m: st.mined || 0, u: kutLv() }; }
  function ydTick() {
    var e = ek(), now = snap();
    if (!e.yd) { e.yd = now; return; }
    if (e.yd.d === now.d) return;
    e.yl = { d: now.d, k: Math.max(0, now.k - e.yd.k), m: Math.max(0, now.m - e.yd.m), u: Math.max(0, now.u - e.yd.u) };
    e.yd = now; save();
  }
  function ydLine() {
    var e = ek(), y = e.yl; if (!y || y.d !== day() || e.ys === day()) return;
    if (!y.k && !y.m && !y.u) { e.ys = day(); return; }
    var h = '<b>Dün</b><span>🐺 ' + nf(y.k) + '</span><span>🐎 ' + nf(y.m) + '</span>' + (y.u ? '<span>✨ +' + y.u + '</span>' : '');
    var aw = document.getElementById('aw');
    if (aw) {
      var card = aw.querySelector('.card,.popup,div') || aw;
      if (!aw.querySelector('.ek-yday')) { var d = document.createElement('div'); d.className = 'ek-yday'; d.innerHTML = h; var btn = aw.querySelector('button'), row = btn && btn.parentNode; if (row && row.parentNode) row.parentNode.insertBefore(d, row); else card.appendChild(d); }
      e.ys = day(); save(); return;
    }
    if (overlayOpen()) return;
    var t = document.createElement('div'); t.className = 'ek-yday ek-yday-float'; t.innerHTML = h; document.body.appendChild(t);
    setTimeout(function () { t.classList.add('out'); }, 6000); setTimeout(function () { t.remove(); }, 6800);
    e.ys = day(); save();
  }

  /* ---------- 63) sürekli eğitim · 62) tekrar gönder ---------- */
  var prevTq = null, prevSq = [];
  function autoTick() {
    var s = S(), e = ek();
    var tq = s.tq ? { k: s.tq.k, kind: s.tq.kind } : null;
    if (prevTq && !tq && prevTq.kind !== 'promote' && e.ct) { try { W.train(prevTq.k); } catch (x) {} }
    prevTq = tq;
    var sq = (s.sq || []).map(function (q) { return { st: q.st, r: q.resource || (s.nodes[q.n] && s.nodes[q.n].t) }; });
    if (e.rg) sq.forEach(function (q, j) {
      var p = prevSq[j]; if (!p || p.st !== 3 || q.st !== 0 || !p.r) return;
      var i = nearest(p.r); if (i >= 0) { try { W.send(i); } catch (x) {} }
    });
    prevSq = (s.sq || []).map(function (q) { return { st: q.st, r: q.resource || (s.nodes[q.n] && s.nodes[q.n].t) }; });
  }
  function nearest(t) {
    var s = S(), mx = 1, busy = {}, best = -1, bd = 1e9; try { mx = W.maxLv(); } catch (e) {}
    (s.sq || []).forEach(function (q) { if (q.st > 0 && q.n >= 0) busy[q.n] = 1; });
    (s.nodes || []).forEach(function (n, i) {
      if (n.t !== t || n.lv > mx || n.rg > 0 || n.res <= 0 || busy[i]) return;
      try { if (W.fog(W.pos(i)[0], W.pos(i)[1])) return; } catch (e) {}
      var p = W.pos(i), d = Math.hypot(p[0] - 50, p[1] - 50) - n.lv * .01; if (d < bd) { bd = d; best = i; }
    });
    return best;
  }

  /* ---------- 83) hepsine yardım ---------- */
  var HAND = null;
  function hand() {
    var s = S(), n = (s.al && s.al.hq) || 0;
    if (!HAND) {
      HAND = document.createElement('button'); HAND.type = 'button'; HAND.id = 'ek-hand'; HAND.setAttribute('aria-label', 'Hepsine yardım et');
      HAND.addEventListener('click', helpAll); document.body.appendChild(HAND);
    }
    var show = n > 0 && !overlayOpen();
    HAND.hidden = !show; if (!show) return;
    var h = '<i>🤝</i><b>' + n + '</b>'; if (HAND.__ekh !== h) { HAND.__ekh = h; HAND.innerHTML = h; }
  }
  function helpAll() {
    var s = S(), n = (s.al && s.al.hq) || 0; if (!n) return;
    s.al.hq = 0; s.d.p.help = (s.d.p.help || 0) + n; s.sp = (s.sp || 0) + n; ek().hp = (ek().hp || 0) + n;
    try { navigator.vibrate && navigator.vibrate(20); W.snd(990, .06); } catch (e) {}
    HAND.classList.add('done'); setTimeout(function () { HAND.classList.remove('done'); }, 600);
    save(); try { W.render(); } catch (e) {}
  }

  /* ---------- 64) önerilen araştırma · 89) önizleme ---------- */
  function score(k) {
    var R = W.WOS_RESEARCH, lv = (S().rs[k] || 0), row = R && R.by[k] && R.by[k].levels[lv]; if (!row) return 0;
    var sc = 1; Object.keys(row.effects || {}).forEach(function (l) {
      sc = Math.max(sc, /Gathering/.test(l) ? 10 : /Construction/.test(l) ? 9 : /Research Speed|March Queue/.test(l) ? 8 : /Output/.test(l) ? 7 : /Training Capacity|Deployment/.test(l) ? 6 : /Training Speed/.test(l) ? 5 : /Healing|Infirmary/.test(l) ? 4 : /Troops/.test(l) ? 4 : 2);
    });
    if (row.unlock) sc = Math.max(sc, 6);
    return sc - lv * .01;
  }
  var recKey = null, recAt = 0;
  function recommend() {
    var R = W.WOS_RESEARCH; if (!R) return null; if (Date.now() - recAt < 3000) return recKey; recAt = Date.now();
    var best = null, bs = -1, best2 = null, bs2 = -1;
    R.catalog.forEach(function (z) {
      var k = z.k, lv = S().rs[k] || 0; if (lv >= z.max) return;
      var miss = []; try { miss = W.researchRequirements(k) || []; } catch (e) {} if (miss.length) return;
      var sc = score(k), can = false; try { can = W.canResearch(k); } catch (e) {}
      if (can && sc > bs) { bs = sc; best = k; } else if (!can && sc > bs2) { bs2 = sc; best2 = k; }
    });
    return (recKey = best || best2);
  }
  function total(k, n) {
    var R = W.WOS_RESEARCH, d = R.by[k]; if (!d) return null; var t = {};
    for (var i = 0; i < Math.min(n, d.levels.length); i++) { var ef = d.levels[i].effects || {}; for (var l in ef) t[l] = d.effectMode === 'incremental' ? (t[l] || 0) + ef[l] : ef[l]; }
    return t;
  }
  function fmt(l, v) { return '+' + (Math.round(v * 100) / 100) + (/Capacity|Queue/.test(l) ? '' : '%'); }
  function researchUI() {
    var tr = document.getElementById('tr'); if (!tr || W.tab !== 'r') return;
    var k = recommend();
    tr.querySelectorAll('.ek-rec').forEach(function (n) { if (n.dataset.wosNode !== k) n.classList.remove('ek-rec'); });
    if (k) { var nd = tr.querySelector('[data-wos-node="' + k + '"]'); if (nd) nd.classList.add('ek-rec'); }
    var br = null; if (k) W.WOS_RESEARCH.catalog.some(function (z) { if (z.k === k) { br = z.branch; return true; } });
    tr.querySelectorAll('[data-rtb]').forEach(function (b) { b.classList.toggle('ek-rec-tab', b.dataset.rtb === br); });
    var sc = tr.querySelector('[data-research-selected]'), det = tr.querySelector('.research-detail'); if (!sc || !det) return;
    var key = sc.getAttribute('data-research-selected'), lv = S().rs[key] || 0, ben = det.querySelector('.research-benefit'); if (!ben || !W.WOS_RESEARCH.by[key]) return;
    var a = total(key, lv), b = total(key, lv + 1), h = '';
    if (b && lv < W.WOS_RESEARCH.by[key].levels.length) Object.keys(b).forEach(function (l) { h += '<span><small>' + W.WOS_RESEARCH.translate(l) + '</small><b>' + (a[l] ? fmt(l, a[l]) : '0') + '</b><i>→</i><b class="nx">' + fmt(l, b[l]) + '</b></span>'; });
    var pv = det.querySelector('.ek-prev'); if (!h) { if (pv) pv.remove(); return; }
    if (!pv) { pv = document.createElement('div'); pv.className = 'ek-prev'; ben.parentNode.insertBefore(pv, ben.nextSibling); ben.classList.add('ek-hide'); }
    if (pv.__ekh !== h) { pv.__ekh = h; pv.innerHTML = h; }
  }

  /* ---------- 72) renk körlüğü · 69) grafik kalitesi · ayar satırları ---------- */
  function applyCb() { document.body.classList.toggle('ek-cb', !!ek().cbm); }
  var GQ = { cur: '', fps: [], last: 0 };
  function gq() { return ek().gq || 'auto'; }
  function applyGq(level) {
    var dpr = W.devicePixelRatio || 1, pr = level === 'low' ? 1 : level === 'mid' ? Math.min(dpr, 1.5) : Math.min(dpr, 2);
    [W.city3d, W.world3d].forEach(function (v) {
      var r = v && v.renderer; if (!r) return;
      if (Math.abs(r.getPixelRatio() - pr) > .01) r.setPixelRatio(pr);
      if (r.shadowMap) { r.shadowMap.autoUpdate = level !== 'low'; if (level === 'low') r.shadowMap.needsUpdate = true; }
    });
    GQ.cur = level;
  }
  function gqTick(now) {
    var want = gq();
    if (want !== 'auto') { if (GQ.cur !== want) applyGq(want); return; }
    if (!GQ.cur) applyGq('mid');
    if (GQ.last) GQ.fps.push(1000 / Math.max(1, now - GQ.last)); GQ.last = now;
    if (GQ.fps.length >= 240) {
      var avg = GQ.fps.reduce(function (a, b) { return a + b; }, 0) / GQ.fps.length; GQ.fps = [];
      if (avg < 28 && GQ.cur !== 'low') applyGq(GQ.cur === 'high' ? 'mid' : 'low');
      else if (avg > 56 && GQ.cur === 'mid' && (W.devicePixelRatio || 1) > 1.5) applyGq('high');
    }
  }
  function settings() {
    var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g' || tg.querySelector('#ek-kolay')) return;
    var box = document.createElement('div'); box.id = 'ek-kolay'; box.className = 'card';
    box.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-kq],[data-kt]'); if (!b) return; var e = ek();
      if (b.dataset.kq) { e.gq = b.dataset.kq; GQ.fps = []; GQ.cur = ''; }
      else { e[b.dataset.kt] = e[b.dataset.kt] ? 0 : 1; if (b.dataset.kt === 'cbm') applyCb(); }
      save(); paint();
    });
    function paint() {
      var e = ek(), q = gq();
      box.innerHTML = '<div class="kz-row"><i>🎨</i><div class="kz-seg">' + [['auto', 'Oto'], ['low', 'Düşük'], ['mid', 'Orta'], ['high', 'Yüksek']].map(function (o) { return '<button type="button" data-kq="' + o[0] + '" class="' + (q === o[0] ? 'on' : '') + '">' + o[1] + '</button>'; }).join('') + '</div></div>' +
        [['cbm', '👁️', 'Renk körlüğü'], ['ct', '🔁', 'Sürekli eğitim'], ['rg', '🐎', 'Tekrar gönder']].map(function (o) { return '<div class="kz-row"><i>' + o[1] + '</i><span>' + o[2] + '</span><button type="button" class="kz-tg' + (e[o[0]] ? ' on' : '') + '" data-kt="' + o[0] + '" aria-pressed="' + !!e[o[0]] + '"><u></u></button></div>'; }).join('');
    }
    paint(); tg.insertBefore(box, tg.firstChild);
  }
  /* ordu ekranında sürekli eğitim çipi */
  function armyChip() {
    var bar = document.getElementById('ek-army'); if (!bar) return;
    var b = bar.querySelector('[data-ek-ct]');
    if (!b) { b = document.createElement('button'); b.type = 'button'; b.className = 'db-chip'; b.setAttribute('data-ek-ct', '1'); b.addEventListener('click', function (ev) { ev.stopPropagation(); ek().ct = ek().ct ? 0 : 1; save(); b.__ekh = ''; armyChip(); }); bar.appendChild(b); }
    var on = !!ek().ct, h = '<i>🔁</i><span><b>Sürekli eğitim</b><small>' + (on ? 'Açık' : 'Kapalı') + '</small></span>';
    b.classList.toggle('on', on); if (b.__ekh !== h) { b.__ekh = h; b.innerHTML = h; }
  }

  var l1 = 0, l2 = 0, wnT = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    try { gqTick(now); } catch (e) {}
    if (now - l1 > 300) { l1 = now; try { researchUI(); hand(); settings(); armyChip(); } catch (e) {} }
    if (now - l2 > 1000) { l2 = now; try { autoTick(); ydTick(); ydLine(); applyCb(); } catch (e) {} if (!wnT) wnT = now; if (now - wnT > 5000) try { whatsNew(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.train !== 'function') { setTimeout(start, 400); return; } ydTick(); applyCb(); requestAnimationFrame(frame); }
  start();
  W.ergenekonKolay = { recommend: recommend, nearest: nearest, helpAll: helpAll, applyGq: applyGq };
})();
