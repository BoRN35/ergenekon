/* Ergenekon — D aşaması: kahraman ve savaş. Claude, 18 Kasım 2026.
   46 kahraman ekranı · 24 kahraman ikilileri · 43 en iyi düzen · 33 Turan taktiği
   34 haftalık destan canavarı · 35 Atlı Okçu. Kalıcı: s.ek.tt (taktik), s.ek.db (destan canavarı). */
(function () {
  'use strict';
  var W = window;
  if (W.__ekKah) return; W.__ekKah = true;
  function S() { return W.s; }
  function ek() { var s = S(); if (!s) return null; s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function HH() { return W.HH || []; }
  var KI = { a: '⚔️', f: '🛡️', h: '❤️', p: '🌾', w: '🚩', x: '⭐', d: '🎁', r: '🏯', b: '🔨', m: '⛏️' };
  var KN = { a: 'Saldırı', f: 'Savunma', h: 'Can', p: 'Üretim', w: 'Ordu gücü', x: 'Tecrübe', d: 'Eşya düşme', r: 'Akın savunması', b: 'İnşaat hızı', m: 'Maden verimi' };

  /* ---------- 24) ikililer ---------- */
  var PAIRS = [
    { a: 0, b: 7, n: 'Hun ve Oğuz', k: 'a', v: .06, e: '🐺' },
    { a: 6, b: 8, n: 'Han Soyu', k: 'x', v: .06, e: '👑' },
    { a: 5, b: 6, n: 'Cihangirler', k: 'w', v: .06, e: '🐎' },
    { a: 2, b: 3, n: 'Anadolu Kapısı', k: 'p', v: .06, e: '🏰' },
    { a: 1, b: 4, n: 'Bozkırın Kızları', k: 'f', v: .06, e: '🗡️' }
  ];
  function pairOn(p) { var s = S(); return (s.hs[p.a] || 0) >= 1 && (s.hs[p.b] || 0) >= 1; }
  function pairsOf(i) { return PAIRS.filter(function (p) { return p.a === i || p.b === i; }); }
  function hookHb() {
    if (typeof W.hb !== 'function' || W.hb.__ek) return;
    var o = W.hb, f = function (k) { var b = o(k); PAIRS.forEach(function (p) { if (p.k === k && pairOn(p)) b += p.v; }); return b; };
    f.__ek = true; W.hb = f;
  }

  /* ---------- 46) kahraman ekranı ---------- */
  var UI = { sel: 0 };
  function canStar(i) { var s = S(), st = s.hs[i] || 0, HSC = W.HSC || [30, 75, 150, 300, 600]; return st < 5 && (s.hc[i] || 0) >= HSC[st]; }
  function pic(i, w) { try { return W.hPic(i, w, false); } catch (e) { return HH()[i].e; } }
  function stars(n) { var h = ''; for (var i = 0; i < 5; i++) h += '<i class="' + (i < n ? 'on' : '') + '">★</i>'; return h; }
  function heroHtml() {
    var s = S(), H = HH(), HSC = W.HSC || [30, 75, 150, 300, 600], sel = UI.sel, h = H[sel], st = s.hs[sel] || 0, need = HSC[Math.min(4, st)], have = s.hc[sel] || 0;
    var grid = H.map(function (x, i) {
      return '<button type="button" class="kh-t' + (i === sel ? ' on' : '') + ((s.hs[i] || 0) ? '' : ' lk') + '" data-kh="' + i + '"><span class="kh-p">' + pic(i, 96) + '</span><span class="kh-st">' + stars(s.hs[i] || 0) + '</span>' + (canStar(i) ? '<i class="ci-upbar"></i>' : '') + '</button>';
    }).join('');
    var pw = [h.k].concat(h.k2 ? [h.k2] : []).map(function (k, j) { var per = j ? 3 : 4; return '<span class="kh-pw"><i>' + (KI[k] || '✦') + '</i><b>+%' + per * st + '</b><small>' + (KN[k] || '') + '</small></span>'; }).join('');
    var pr = pairsOf(sel).map(function (p) { var o = p.a === sel ? p.b : p.a, on = pairOn(p); return '<span class="kh-pair' + (on ? ' on' : '') + '" title="' + p.n + '"><i>' + p.e + '</i>' + pic(o, 34) + '<b>' + (KI[p.k] || '') + ' +%' + Math.round(p.v * 100) + '</b></span>'; }).join('');
    var pc = st >= 5 ? 100 : Math.min(100, have / need * 100);
    return '<div class="kh-wrap"><div class="kh-grid" id="kh-grid">' + grid + '<svg class="kh-links" id="kh-links"></svg></div>' +
      '<div class="kh-det"><div class="kh-big">' + pic(sel, 220) + '</div><h3>' + h.n + '</h3><div class="kh-st big">' + stars(st) + '</div>' +
      '<div class="kh-pws">' + pw + '</div>' + (pr ? '<div class="kh-prs">' + pr + '</div>' : '') +
      '<div class="kh-card"><span>🃏</span><i><u style="width:' + pc.toFixed(0) + '%"></u></i><b>' + (st >= 5 ? 'Kadim Zirve' : nf(have) + '/' + need) + '</b></div>' +
      '<button type="button" class="yk-main kh-up" data-kh-up="' + sel + '"' + (canStar(sel) ? '' : ' disabled') + '>⭐ Yıldız Yükselt</button></div></div>';
  }
  function links() {
    var g = document.getElementById('kh-grid'), svg = document.getElementById('kh-links'); if (!g || !svg) return;
    var gr = g.getBoundingClientRect(), d = '';
    PAIRS.forEach(function (p) {
      var a = g.querySelector('[data-kh="' + p.a + '"]'), b = g.querySelector('[data-kh="' + p.b + '"]'); if (!a || !b) return;
      var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      var x1 = ra.left + ra.width / 2 - gr.left, y1 = ra.top + ra.height / 2 - gr.top, x2 = rb.left + rb.width / 2 - gr.left, y2 = rb.top + rb.height / 2 - gr.top;
      d += '<path d="M' + x1 + ' ' + y1 + ' Q' + ((x1 + x2) / 2) + ' ' + (Math.min(y1, y2) - 30) + ' ' + x2 + ' ' + y2 + '" class="' + (pairOn(p) ? 'on' : '') + '"/>';
    });
    svg.setAttribute('width', gr.width); svg.setAttribute('height', gr.height); svg.innerHTML = d;
  }
  function heroView() {
    var tu = document.getElementById('tu');
    if (!tu || W.tab !== 'u') return;
    var box = tu.querySelector('#ek-kh');
    if (!box) {
      box = document.createElement('div'); box.id = 'ek-kh';
      box.addEventListener('click', function (ev) {
        var t = ev.target, b;
        if ((b = t.closest('[data-kh]'))) { UI.sel = +b.dataset.kh; draw(true); return; }
        if ((b = t.closest('[data-kh-up]')) && !b.disabled) { try { W.hsUp(+b.dataset.khUp); W.snd(700, .12); navigator.vibrate && navigator.vibrate([20, 40, 30]); } catch (e) {} box.classList.add('kh-flash'); setTimeout(function () { box.classList.remove('kh-flash'); }, 700); save(); draw(true); }
      });
      var hdr = tu.querySelector('.game-page-header');
      if (hdr && hdr.nextSibling) tu.insertBefore(box, hdr.nextSibling); else tu.insertBefore(box, tu.firstChild);
    }
    draw(false);
  }
  function draw(force) { var box = document.getElementById('ek-kh'); if (!box) return; var h = heroHtml(); if (force || box.__ekh !== h) { box.__ekh = h; box.innerHTML = h; requestAnimationFrame(links); } }

  /* ---------- 33) Turan taktiği ---------- */
  var TAC = [
    { id: 'hilal', n: 'Hilal', e: '☾', good: [0, 12, 29, 32, 15, 24], t: 'Sürülere ve kurtlara karşı' },
    { id: 'ricat', n: 'Sahte Ricat', e: '↩', good: [1, 4, 14, 18, 22, 31, 20, 25], t: 'İri ve hızlı hayvanlara karşı' },
    { id: 'kusatma', n: 'Kuşatma', e: '◎', good: [3, 5, 6, 7, 9, 10, 2, 33, 8], t: 'Devlere ve ruhlara karşı' },
    { id: 'okyagmuru', n: 'Ok Yağmuru', e: '➶', good: [13, 17, 19, 21, 23, 26, 27, 28, 30], t: 'Kaçan ve uçan avlara karşı' }
  ];
  function tac() { var e = ek(); return TAC.filter(function (t) { return t.id === e.tt; })[0] || null; }
  function bestTac(base) { return TAC.filter(function (t) { return t.good.indexOf(base) >= 0; })[0] || null; }
  function tacFactor(base) { var t = tac(); if (!t) return 1; return t.good.indexOf(base) >= 0 ? 1.15 : .97; }
  W.ergenekonKahramanTac = function (base) { return tacFactor(base) > 1; };
  function hookCs() {
    if (typeof W.cs !== 'function' || W.cs.__ek) return;
    var o = W.cs, f = function () { var r = o.apply(this, arguments); if (W.__ekFightBase != null) { var k = tacFactor(W.__ekFightBase); r = { atk: Math.round(r.atk * k), def: Math.round(r.def * (k > 1 ? 1.05 : 1)), hp: r.hp }; } return r; };
    f.__ek = true; W.cs = f;
    if (typeof W.fight === 'function' && !W.fight.__ekTac) {
      var fo = W.fight, ff = function (m) { var b = null; try { b = W.monsterBase(m); } catch (e) {} W.__ekFightBase = b; try { return fo.apply(this, arguments); } finally { W.__ekFightBase = null; } };
      for (var p in fo) ff[p] = fo[p]; ff.__ekTac = true; W.fight = ff;
    }
  }
  function tacPanel() {
    var mi = document.getElementById('mapi'); if (!mi || W.tab !== 'm') return;
    var m = typeof W.selM === 'number' ? W.selM : -1; if (m < 0 || m >= (W.RIFT_OFFSET || 1000) || !W.M[m]) return;
    var b = W.monsterBase(m), cur = tac(), key = m + ':' + (cur ? cur.id : '');
    var ex = mi.querySelector('.tt-row'); if (ex && ex.dataset.k === key) return; if (ex) ex.remove();
    var best = bestTac(b);
    var h = '<div class="tt-row" data-k="' + key + '">' + TAC.map(function (t) { return '<button type="button" class="tt' + (cur && cur.id === t.id ? ' on' : '') + (best && best.id === t.id ? ' best' : '') + '" data-tt="' + t.id + '" title="' + t.n + ' · ' + t.t + '"><i>' + t.e + '</i><small>' + t.n + '</small></button>'; }).join('') + '</div>';
    var anchor = mi.querySelector('.av-ms') || mi.querySelector('h3');
    if (anchor) anchor.insertAdjacentHTML('afterend', h);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-tt]'); if (!b) return;
    ev.stopPropagation(); var e = ek(); e.tt = e.tt === b.dataset.tt ? null : b.dataset.tt; save();
    var r = document.querySelector('.tt-row'); if (r) r.remove(); tacPanel();
  }, true);

  /* ---------- 43) en iyi düzen ---------- */
  function powerOf(f) { var s = S(), keep = s.formation, t = 0; s.formation = f; try { for (var e = 0; e < 3; e++) t += W.tpowv(e); } catch (x) {} s.formation = keep; return t; }
  function bestFormation() { var best = 0, bp = -1; for (var f = 0; f < 4; f++) { var p = powerOf(f); if (p > bp + 1e-6) { bp = p; best = f; } } return { f: best, p: bp }; }
  var FN = ['Dengeli', 'Alp Öncü', 'Atlı Öncü', 'Okçu Öncü'];
  function armyBar() {
    var tk = document.getElementById('tk'); if (!tk || W.tab !== 'k') return;
    var bar = tk.querySelector('#ek-army');
    if (!bar) {
      bar = document.createElement('div'); bar.id = 'ek-army';
      bar.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t.closest('[data-ek-best]')) { var b = bestFormation(); try { W.setFormation(b.f); } catch (e) { S().formation = b.f; } pairsAuto(); try { navigator.vibrate && navigator.vibrate(15); } catch (e) {} bar.__ekh = ''; armyBar(); return; }
        if (t.closest('[data-ek-db]')) { openDestan(); }
      });
      var hdr = tk.querySelector('.game-page-header'); if (hdr && hdr.nextSibling) tk.insertBefore(bar, hdr.nextSibling); else tk.insertBefore(bar, tk.firstChild);
    }
    var s = S(), b = bestFormation(), cur = s.formation || 0, on = PAIRS.filter(pairOn);
    var h = '<button type="button" class="ar-best' + (cur === b.f ? ' ok' : '') + '" data-ek-best="1"><i>⚔</i><span><b>En iyi düzen</b><small>' + FN[b.f] + (cur === b.f ? ' ✓' : ' · ' + nf(b.p) + ' güç') + '</small></span></button>' +
      '<div class="ar-pairs">' + (on.length ? on.map(function (p) { return '<span title="' + p.n + '">' + p.e + ' ' + (KI[p.k] || '') + '+%' + Math.round(p.v * 100) + '</span>'; }).join('') : '<span class="off">🔗 İkili yok</span>') + '</div>' +
      atliOkcuHtml() + destanChip();
    if (bar.__ekh !== h) { bar.__ekh = h; bar.innerHTML = h; }
  }
  function pairsAuto() { /* ikili bonuslar yıldızlı kahramanlarda kendiliğinden etkin; düzen önerisine dahil edildi */ }

  /* ---------- 35) Atlı Okçu ---------- */
  var AO = { kisla: 35, ocak: 35, harpakademi: 10 };
  function aoReady() { var l = S().l; return (l.kisla || 0) >= AO.kisla && (l.ocak || 0) >= AO.ocak && (l.harpakademi || 0) >= AO.harpakademi; }
  function hookTier() {
    if (typeof W.unlockedTroopTier !== 'function' || W.unlockedTroopTier.__ek) return;
    var o = W.unlockedTroopTier, f = function () { var t = o.apply(this, arguments); return aoReady() ? Math.max(t, 10) : t; };
    for (var p in o) f[p] = o[p]; f.__ek = true; W.unlockedTroopTier = f;
  }
  function atliOkcuHtml() {
    var l = S().l, ok = aoReady();
    var req = Object.keys(AO).map(function (k) { var have = l[k] || 0, d = (W.B && W.B[k]) || {}; return '<span class="' + (have >= AO[k] ? 'ok' : '') + '">' + (d.i || '🏠') + ' ' + have + '/' + AO[k] + '</span>'; }).join('');
    return '<div class="ao' + (ok ? ' on' : '') + '"><b>🏹🐎 Atlı Okçu</b>' + (ok ? '<small>T10 açık · ordu gücü ×4</small>' : '<div class="ao-req">' + req + '</div>') + '</div>';
  }

  /* ---------- 34) destan canavarı (haftalık) ---------- */
  var DB = [{ n: 'Tepegöz', e: '👁️' }, { n: 'Ak Ejder', e: '🐉' }, { n: 'Yelbegen', e: '👹' }];
  function wk() { var d = new Date(), j = new Date(d.getFullYear(), 0, 1); return d.getFullYear() * 100 + Math.ceil(((d - j) / 864e5 + j.getDay() + 1) / 7); }
  function destan() {
    var e = ek(), w = wk();
    if (!e.db || e.db.w !== w) { var o = S().l.ocak || 1, mx = Math.round(60000 * Math.pow(1.22, o)); e.db = { w: w, i: w % 3, hp: mx, max: mx, dmg: 0, cd: 0, cl: [] }; }
    return e.db;
  }
  var DBT = [.1, .3, .6, 1];
  function destanChip() { var d = destan(), x = DB[d.i]; return '<button type="button" class="db-chip" data-ek-db="1"><i>' + x.e + '</i><span><b>' + x.n + '</b><small>' + (d.hp > 0 ? Math.round(d.hp / d.max * 100) + '% can' : 'Yenildi') + '</small></span></button>'; }
  function hitDestan(rally) {
    var s = S(), d = destan(), now = Date.now(), en = 30;
    if (d.hp <= 0 || (!rally && d.cd > now) || !s.en || s.en.v < en) return;
    s.en.v -= en;
    var st = W.cs(), troops = 0; try { troops = W.tpowv(0); } catch (e) {}
    var my = Math.round((st.atk * 40 + troops * .5) * (.85 + Math.random() * .3) * (rally ? 1.3 : 1)), clan = Math.round(my * (rally ? 3 + Math.random() : 1.5 + Math.random()));
    d.hp = Math.max(0, d.hp - my - clan); d.dmg += my; d.cd = now + 30 * 60 * 1000;
    try { var w = W.woundArmy ? W.woundArmy(.04) : 0; } catch (e) {}
    var rows = [['⚔', '+' + nf(my)], ['🛡️👥', '+' + nf(clan)]];
    DBT.forEach(function (t, i) { if (1 - d.hp / d.max >= t && d.cl.indexOf(i) < 0) { d.cl.push(i); rows = rows.concat(dbReward(i)); } });
    save(); rer();
    if (W.ekReport) W.ekReport({ title: DB[d.i].n, win: d.hp <= 0, sub: d.hp <= 0 ? 'Destan canavarı düştü' : Math.round(d.hp / d.max * 100) + '% can kaldı', rows: rows });
  }
  W.ekHitDestan = hitDestan; W.ekDestan = function () { return destan(); }; W.ekDestanName = function () { return DB[destan().i]; };
  W.ekBestFormation = function () { try { var b = bestFormation(); W.setFormation(b.f); pairsAuto(); } catch (e) {} };
  function dbReward(i) {
    var s = S(), dm = (s.ek.dm = s.ek.dm || {}); dm.mat = dm.mat || { kagit: 0, safir: 0, opal: 0 }; var out = [];
    dm.mat.kagit += 2 + i * 2; out.push(['📜', '+' + (2 + i * 2)]);
    if (i >= 1) { dm.mat.safir += i; out.push(['🔷', '+' + i]); }
    if (i >= 2) { dm.mat.opal += i - 1; out.push(['🔮', '+' + (i - 1)]); }
    var h = Math.floor(Math.random() * HH().length); s.hc[h] = (s.hc[h] || 0) + 2 + i * 3; out.push(['🃏', HH()[h].n + ' +' + (2 + i * 3)]);
    if (W.ekHourglass) out = out.concat(W.ekHourglass.add(i + 1, i >= 3 ? 1 : 0));
    if (W.ekPotion) out = out.concat(W.ekPotion.add(1, i >= 2 ? 1 : 0));
    var stl = Math.round((i + 1) * 120 * ((s.l && s.l.ocak) || 1)); s.r.celik = (s.r.celik || 0) + stl; out.push(['🔩', '+' + stl]);
    return out;
  }
  function openDestan() {
    var d = destan(), x = DB[d.i], now = Date.now(), s = S();
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small"><div class="yk-head"><h2>' + x.n + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' +
      '<div class="db-hero">' + x.e + '</div><div class="yk-prog" style="margin:0 14px 10px"><span>❤️ ' + nf(d.hp) + '</span><b>' + Math.round(d.hp / d.max * 100) + '%</b><i><u style="width:' + (d.hp / d.max * 100).toFixed(1) + '%;background:linear-gradient(90deg,#a8322a,#e0663a)"></u></i></div>' +
      '<div class="rp-grid">' + DBT.map(function (t, i) { return '<span class="' + (d.cl.indexOf(i) >= 0 ? 'got' : '') + '"><i>' + ['📜', '🔷', '🔮', '🃏'][i] + '</i><b>%' + Math.round(t * 100) + '</b></span>'; }).join('') + '</div>' +
      '<div class="sv-stats" style="grid-template-columns:repeat(3,1fr)"><span><i>⚔</i><b>' + nf(d.dmg) + '</b></span><span><i>⚡</i><b>30</b></span><span><i>⏱</i><b>' + (d.cd > now ? ft((d.cd - now) / 1000) : 'Hazır') + '</b></span></div>' +
      '<button type="button" class="yk-main" data-db-hit="1"' + (d.hp <= 0 || d.cd > now || (s.en && s.en.v < 30) ? ' disabled' : '') + '>⚔ Saldır</button></div>';
    o.addEventListener('click', function (ev) { var t = ev.target; if (t === o || t.closest('.yk-x')) { o.remove(); return; } if (t.closest('[data-db-hit]') && !t.closest('[data-db-hit]').disabled) { o.remove(); hitDestan(); } });
    document.body.appendChild(o);
  }

  var lastSec = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden || now - lastSec < 500) return; lastSec = now;
    try { hookHb(); hookCs(); hookTier(); } catch (e) {}
    try { heroView(); armyBar(); tacPanel(); } catch (e) {}
  }
  function start() { if (!S() || typeof W.hsUp !== 'function') { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
  W.ergenekonKahraman = { pairs: PAIRS, best: bestFormation, destan: destan, openDestan: openDestan };
  W.ekHeroView = function () { try { heroView(); } catch (e) {} };
})();
