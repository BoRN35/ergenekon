/* Ergenekon — E aşaması: ilerleme ve emek. Claude, 18 Kasım 2026.
   25 Kut Gücü · 29 Emek Defteri · 28 Uğurlu Saat · 19 Şahin & Tulpar · 23 Destan Seferi · 32 Ata Yurdu
   20 geri dönüş sandığı + bildirimler · 42 bozkır sesleri.  Kalıcı: s.ek.kut, s.ek.ed, s.ek.us, s.ek.pets, s.ek.ds, s.ek.ay, s.ek.seen */
(function () {
  'use strict';
  var W = window;
  if (W.__ekIl) return; W.__ekIl = true;
  function S() { return W.s; }
  function ek() { var s = S(); if (!s) return null; s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function dm() { var s = S(); s.ek.dm = s.ek.dm || {}; s.ek.dm.mat = s.ek.dm.mat || { kagit: 0, safir: 0, opal: 0 }; return s.ek.dm; }
  function sum(a) { return (a || []).reduce(function (x, y) { return x + (y || 0); }, 0); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (e) { if (e.target === o || e.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function rep(t, rows, sub) { if (W.ekReport) W.ekReport({ title: t, win: true, sub: sub, rows: rows }); }
  function week() { var d = new Date(), j = new Date(d.getFullYear(), 0, 1); return d.getFullYear() * 100 + Math.ceil(((d - j) / 864e5 + j.getDay() + 1) / 7); }
  function day() { var d = new Date(); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); }

  /* ---------- 25) Kut Gücü ---------- */
  function kutPoints() {
    var s = S(), e = ek(), p = 0;
    p += sum(s.hs) * 25;
    for (var k in s.l) p += (s.l[k] || 0) * 3;
    p += Object.keys(s.ac || {}).length * 12;
    var eq = (s.ch && s.ch.eq) || {}; for (var q in eq) if (eq[q]) p += (eq[q].p || 0) * 6;
    var ms = e.ms || {}; for (var m in ms) p += Math.min(60, Math.floor(ms[m] / 10));
    p += Object.keys(e.kg || {}).filter(function (k) { return e.kg[k].done; }).length * 10;
    p += Object.keys(s.rs || {}).reduce(function (a, k) { return a + (s.rs[k] || 0); }, 0) * 2;
    p += e.kutx || 0;
    return Math.round(p * (1 + ((e.ay || {}).kut || 0) * .05));
  }
  function kutLevel() { var p = kutPoints(), lv = Math.floor(Math.sqrt(p / 12)), cur = 12 * lv * lv, nx = 12 * (lv + 1) * (lv + 1); return { lv: lv, p: p, pc: (p - cur) / (nx - cur), nx: nx }; }
  function kutBonus(lv) { return { gather: .01 * lv, energy: lv, build: Math.min(.15, .005 * lv) }; }
  function kutBadge() {
    var pf = document.getElementById('pfb'); if (!pf) return;
    var k = kutLevel(), el = pf.querySelector('.kut-ring');
    if (!el) { el = document.createElement('span'); el.className = 'kut-ring'; pf.appendChild(el); el.addEventListener('click', function (ev) { ev.stopPropagation(); ev.preventDefault(); openKut(); }, true); }
    var h = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" class="bg"/><circle cx="20" cy="20" r="17" class="fg" style="stroke-dasharray:' + (107 * k.pc).toFixed(1) + ' 107"/></svg><b>' + k.lv + '</b>';
    if (el.__ekh !== h) { el.__ekh = h; el.innerHTML = h; }
  }
  function openKut() {
    var k = kutLevel(), b = kutBonus(k.lv), s = S(), ay = (ek().ay = ek().ay || {});
    var body = '<div class="kut-big"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" style="stroke-dasharray:' + (327 * k.pc).toFixed(0) + ' 327"/></svg><b>' + k.lv + '</b><small>' + nf(k.p) + '/' + nf(k.nx) + '</small></div>' +
      '<div class="rp-grid"><span><i>🐎</i><b>+%' + Math.round(b.gather * 100) + '</b></span><span><i>⚡</i><b>+' + b.energy + '</b></span><span><i>🔨</i><b>+%' + (b.build * 100).toFixed(1).replace('.0', '') + '</b></span></div>' +
      '<div class="kut-src"><span>⭐</span><span>🏠</span><span>🏆</span><span>⚒️</span><span>🏹</span><span>⛰</span><span>📜</span></div>';
    var ata = (s.l.ocak || 0) >= 40;
    body += '<div class="yk-sec" style="margin-top:10px">Ata Yurdu</div><div class="ay-row' + (ata ? '' : ' lk') + '">' + AY.map(function (a) { var l = ay[a.id] || 0; return '<button type="button" class="ay" data-ay="' + a.id + '"' + (ata && l < 10 ? '' : ' disabled') + '><i>' + a.e + '</i><b>' + l + '/10</b><small>' + a.t + '</small></button>'; }).join('') + '</div>' + (ata ? '' : '<p class="ay-lock">🔒 Kutsal Ocak 40</p>');
    var o = popup('Kut Gücü', body, 'kut-card');
    o.addEventListener('click', function (ev) { var bt = ev.target.closest('[data-ay]'); if (!bt || bt.disabled) return; ayUp(bt.dataset.ay); o.remove(); openKut(); });
  }
  /* ---------- 32) Ata Yurdu ---------- */
  var AY = [{ id: 'bereket', e: '🌾', t: 'Üretim +%2' }, { id: 'ordu', e: '🚩', t: 'Ordu +%2' }, { id: 'yol', e: '🐎', t: 'Toplama +%3' }, { id: 'can', e: '⚡', t: 'Enerji +5' }, { id: 'kut', e: '✨', t: 'Kut +%5' }];
  function ayCost(l) { var g = Math.pow(1.6, l); return { odun: Math.round(2e6 * g), et: Math.round(1.5e6 * g), demir: Math.round(6e5 * g), kristal: 3 + l * 2 }; }
  function ayUp(id) {
    var s = S(), ay = ek().ay = ek().ay || {}, l = ay[id] || 0, c = ayCost(l); if (l >= 10 || (s.l.ocak || 0) < 40) return;
    for (var r in c) if ((s.r[r] || 0) < c[r]) { try { W.add('Ata Yurdu için kaynak yetmiyor.'); } catch (e) {} return; }
    for (var r2 in c) s.r[r2] -= c[r2]; ay[id] = l + 1; save(); rer();
  }

  /* bonusları oyuna bağla */
  function hookBonus() {
    if (typeof W.wosBonus === 'function' && !W.wosBonus.__ekIl) {
      var o = W.wosBonus, f = function (label) { var v = o.apply(this, arguments); if (label === 'Gathering Speed') { var k = kutLevel(); v += kutBonus(k.lv).gather + ((ek().ay || {}).yol || 0) * .03; var us = ek().us; if (us && us.t1 > Date.now()) v += .5; if (W.__ekPrem && W.__ekPrem()) v += .35; } return v; };
      for (var q0 in o) f[q0] = o[q0]; f.__ekIl = true; W.wosBonus = f;
    }
    if (typeof W.dur === 'function' && !W.dur.__ekIl) { var du = W.dur, df = function () { var v = du.apply(this, arguments); return typeof v === 'number' ? Math.max(1, Math.round(v * (1 - kutBonus(kutLevel().lv).build))) : v; }; for (var q in du) df[q] = du[q]; df.__ekIl = true; W.dur = df; }
    var want = 200 + kutBonus(kutLevel().lv).energy + ((ek().ay || {}).can || 0) * 5; if (W.EN_MAX !== want) W.EN_MAX = want;
    if (typeof W.pm === 'function' && !W.pm.__ekIl) { var po = W.pm, pf = function () { return po.apply(this, arguments) + ((ek().ay || {}).bereket || 0) * .02; }; for (var q1 in po) pf[q1] = po[q1]; pf.__ekIl = true; W.pm = pf; }
  }

  /* ---------- 28) Uğurlu Saat ---------- */
  var US = { el: null };
  function usBtn() {
    var mapv = document.getElementById('mapv'), e = ek();
    if (!mapv || W.tab !== 'm') { if (US.el) US.el.hidden = true; return; }
    if (!US.el || !US.el.isConnected) { US.el = document.createElement('button'); US.el.type = 'button'; US.el.id = 'ek-us'; US.el.addEventListener('click', useUs); }
    if (US.el.parentNode !== mapv) mapv.appendChild(US.el);
    var us = e.us || {}, now = Date.now(), on = us.t1 > now, used = us.d === day(), h;
    h = on ? '<i>☀</i><small>' + ft((us.t1 - now) / 1000) + '</small>' : used ? '<i>☾</i>' : '<i>☀</i><small>+%50</small>';
    US.el.className = on ? 'on' : used ? 'used' : 'ready';
    if (US.el.__ekh !== h) { US.el.__ekh = h; US.el.innerHTML = h; }
    US.el.hidden = false;
  }
  function useUs() { var e = ek(), us = e.us || {}; if (us.d === day()) return; e.us = { d: day(), t1: Date.now() + 3600e3 }; save(); try { navigator.vibrate && navigator.vibrate([20, 40, 20]); W.snd(880, .1); } catch (x) {} }

  /* ---------- 29) Emek Defteri ---------- */
  var ED = [
    { id: 'av', e: '🐺', t: 'Canavar avla', n: 60, v: function (s) { return s.stat.kills || 0; } },
    { id: 'top', e: '🐎', t: 'Haritadan topla', n: 150000, v: function (s) { return s.stat.mined || 0; } },
    { id: 'yap', e: '🔨', t: 'Yapı seviyesi', n: 6, v: function (s) { var t = 0; for (var k in s.l) t += s.l[k] || 0; return t; } },
    { id: 'arz', e: '📜', t: 'Araştırma seviyesi', n: 4, v: function (s) { var t = 0; for (var k in s.rs) t += s.rs[k] || 0; return t; } },
    { id: 'kg', e: '⛰', t: 'Kurgan keşfi', n: 2, v: function () { var kg = ek().kg || {}; return Object.keys(kg).filter(function (k) { return kg[k].done; }).length; } },
    { id: 'ars', e: '🏟️', t: 'Arena mücadelesi', n: 10, v: function (s) { return s.stat.arena || 0; } }
  ];
  var EDT = [[2, [['📜', 3], ['odun', 1], ['⏳', 3], ['🧪', 2]]], [4, [['🔷', 1], ['📜', 5], ['⌛', 1], ['🧪', 2]]], [6, [['🔮', 1], ['🃏', 5], ['⌛', 2], ['⚗️', 1]]]];
  function ed() {
    var e = ek(), s = S(), w = week();
    if (!e.ed || e.ed.w !== w) { e.ed = { w: w, b: {}, cl: [] }; ED.forEach(function (g) { e.ed.b[g.id] = g.v(s); }); }
    return e.ed;
  }
  function edProg() { var d = ed(), s = S(); return ED.map(function (g) { var v = Math.max(0, g.v(s) - (d.b[g.id] || 0)); return { g: g, v: v, done: v >= g.n }; }); }
  function edView() {
    var te = document.getElementById('te'); if (!te || W.tab !== 'e') return;
    var box = te.querySelector('#ek-ed');
    if (!box) {
      box = document.createElement('div'); box.id = 'ek-ed';
      box.addEventListener('click', function (ev) { var b = ev.target.closest('[data-ed-cl]'); if (b && !b.disabled) edClaim(+b.dataset.edCl); });
      var hdr = te.querySelector('.game-page-header'); if (hdr && hdr.nextSibling) te.insertBefore(box, hdr.nextSibling); else te.insertBefore(box, te.firstChild);
    }
    var pr = edProg(), dn = pr.filter(function (x) { return x.done; }).length, d = ed();
    var h = '<div class="ed-h"><b>📒 Emek Defteri</b><span>' + dn + '/' + ED.length + '</span></div><div class="ed-goals">' + pr.map(function (x) {
      return '<div class="ed-g' + (x.done ? ' ok' : '') + '"><i>' + x.g.e + '</i><span><small>' + x.g.t + '</small><u><em style="width:' + Math.min(100, x.v / x.g.n * 100).toFixed(0) + '%"></em></u></span><b>' + (x.done ? '✓' : nf(x.v) + '/' + nf(x.g.n)) + '</b></div>';
    }).join('') + '</div><div class="ed-tiers">' + EDT.map(function (t, i) { var got = d.cl.indexOf(i) >= 0, can = dn >= t[0] && !got; return '<button type="button" class="ed-t' + (got ? ' got' : can ? ' can' : '') + '" data-ed-cl="' + i + '"' + (can ? '' : ' disabled') + '><b>' + t[0] + '</b><span>' + t[1].map(function (r) { return (r[0] === 'odun' ? '📦' : r[0]) + (r[1] > 1 ? r[1] : ''); }).join(' ') + '</span></button>'; }).join('') + '</div>';
    if (box.__ekh !== h) { box.__ekh = h; box.innerHTML = h; }
  }
  function edClaim(i) {
    var d = ed(), t = EDT[i], s = S(), m = dm().mat, rows = []; if (d.cl.indexOf(i) >= 0) return;
    t[1].forEach(function (r) {
      if (r[0] === '📜') m.kagit += r[1]; else if (r[0] === '🔷') m.safir += r[1]; else if (r[0] === '🔮') m.opal += r[1];
      else if (r[0] === '🃏') { var h = Math.floor(Math.random() * (W.HH || []).length); s.hc[h] = (s.hc[h] || 0) + r[1]; }
      else if (r[0] === '🧪' || r[0] === '⚗️') { if (W.ekPotion) W.ekPotion.add(r[0] === '🧪' ? r[1] : 0, r[0] === '⚗️' ? r[1] : 0); }
      else if (r[0] === '⏳' || r[0] === '⌛') { if (W.ekHourglass) W.ekHourglass.add(r[0] === '⏳' ? r[1] : 0, r[0] === '⌛' ? r[1] : 0); }
      else if (r[0] === 'odun') { var pk = s.ek.pk = s.ek.pk || {}; pk.odun = pk.odun || { g: 0, b: 0, p: 0 }; pk.odun.b += 1; }
      rows.push([r[0] === 'odun' ? '📦' : r[0], '+' + r[1]]);
    });
    d.cl.push(i); save(); rep('Emek Defteri', rows, t[0] + ' hedef'); var b = document.getElementById('ek-ed'); if (b) b.__ekh = '';
  }

  /* ---------- 19) Şahin ve Tulpar ---------- */
  var PETS = [{ id: 'sahin', n: 'Şahin', e: '🦅', t: 'Her 8 saatte Kağıt, Safir ya da Opal bulur' }, { id: 'tulpar', n: 'Tulpar', e: '🐎', t: '1 saat saldırı/savunma +%10 (12 sa bekleme)' }];
  function pets() { var e = ek(); e.pets = e.pets || { yem: 0, sahin: { lv: 1, t: Date.now() }, tulpar: { lv: 1, cd: 0, b: 0 }, sf: 0 }; return e.pets; }
  function petMax() { return S().l.ocak || 1; }
  function sahinTick() {
    var p = pets(), sh = p.sahin, iv = Math.max(4, 8 - sh.lv * .1) * 3600e3;
    while (Date.now() - sh.t >= iv) {
      sh.t += iv; var m = dm().mat, r = Math.random();
      if (r < .55) m.kagit += 1 + Math.floor(sh.lv / 10); else if (r < .8) m.safir += 1; else m.opal += 1;
      sh.found = (sh.found || 0) + 1;
    }
  }
  function hookCb() {
    if (typeof W.cb !== 'function' || W.cb.__ekIl) return;
    var o = W.cb, f = function (k) { var b = o(k), t = pets().tulpar; if (t.b > Date.now() && (k === 'a' || k === 'f')) b += .1 + t.lv * .002; if ((ek().ay || {}).ordu && k === 'a') b += ek().ay.ordu * .02; return b; };
    for (var q2 in o) f[q2] = o[q2]; f.__ekIl = true; W.cb = f;
  }
  function openPets() {
    var p = pets(), now = Date.now(), mx = petMax(), sfLeft = p.sf > now ? (p.sf - now) / 1000 : 0;
    var dari = S().r.dari || 0, dc = 40 * (S().l.ocak || 1);
    var body = '<div class="pet-yem"><i>🥩</i><b>' + nf(p.yem) + '</b><button type="button" class="yk-btn" data-pet-dari="1"' + (dari >= dc ? '' : ' disabled') + '>🌾' + nf(dc) + ' → 🥩5</button><button type="button" class="yk-btn" data-pet-sf="1"' + (sfLeft ? ' disabled' : '') + '>' + (sfLeft ? '⏳ ' + ft(sfLeft) : '🐾 Yem seferi (2 sa)') + '</button></div>' +
      PETS.map(function (d) {
        var st = p[d.id], cost = 5 + st.lv * 3, extra = '';
        if (d.id === 'sahin') extra = '<small>⏱ ' + ft(Math.max(0, (Math.max(4, 8 - st.lv * .1) * 3600e3 - (now - st.t)) / 1000)) + ' · 🔎 ' + (st.found || 0) + '</small>';
        else extra = st.b > now ? '<small class="on">⚔️🛡️ ' + ft((st.b - now) / 1000) + '</small>' : st.cd > now ? '<small>⏳ ' + ft((st.cd - now) / 1000) + '</small>' : '<button type="button" class="yk-btn" data-pet-use="1">⚔️ Kükre</button>';
        return '<div class="pet"><span class="pet-e">' + d.e + '</span><div><b>' + d.n + ' · Sv ' + st.lv + '/' + mx + '</b><p>' + d.t + '</p>' + extra + '</div><button type="button" class="yk-btn pet-up" data-pet-up="' + d.id + '"' + (st.lv >= mx || p.yem < cost ? ' disabled' : '') + '>⬆ 🥩' + cost + '</button></div>';
      }).join('');
    var o = popup('Evcil Hayvanlar', body, 'pet-card');
    o.addEventListener('click', function (ev) {
      var t = ev.target, b;
      if ((b = t.closest('[data-pet-up]')) && !b.disabled) { var st = p[b.dataset.petUp], c = 5 + st.lv * 3; if (p.yem >= c && st.lv < petMax()) { p.yem -= c; st.lv++; save(); } o.remove(); openPets(); }
      else if ((b = t.closest('[data-pet-dari]')) && !b.disabled) { var dcc = 40 * (S().l.ocak || 1); if ((S().r.dari || 0) >= dcc) { S().r.dari -= dcc; p.yem += 5; save(); } o.remove(); openPets(); }
      else if ((b = t.closest('[data-pet-sf]')) && !b.disabled) { p.sf = Date.now() + 2 * 3600e3; p.sfy = 6 + Math.floor((S().l.ocak || 1) / 2); save(); o.remove(); openPets(); }
      else if (t.closest('[data-pet-use]')) { p.tulpar.b = Date.now() + 3600e3; p.tulpar.cd = Date.now() + 12 * 3600e3; save(); o.remove(); try { W.snd(300, .2); navigator.vibrate && navigator.vibrate(40); } catch (x) {} openPets(); }
    });
  }
  function petTick() { var p = pets(); if (p.sf && p.sf <= Date.now() && p.sfy) { p.yem += p.sfy; p.sfy = 0; p.sf = 0; try { W.add('🐾 Yem seferi döndü.'); } catch (e) {} save(); } sahinTick(); }
  function petBtn() {
    var tb = document.querySelector('.ek-topbtns'); if (!tb || tb.querySelector('[data-ek-pet]')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'ek-rbtn'; b.setAttribute('data-ek-pet', '1'); b.setAttribute('aria-label', 'Evcil hayvanlar'); b.innerHTML = '<span style="font-size:20px">🦅</span>';
    b.addEventListener('click', openPets); tb.insertBefore(b, tb.firstChild);
  }

  /* ---------- 23) Ergenekon Destanı Seferi ---------- */
  var CH = [
    { n: 'Kıyım', e: '⚔️' }, { n: 'Dağlara Sığınış', e: '⛰' }, { n: 'Ergenekon Vadisi', e: '🌲' }, { n: 'Çoğalan Boylar', e: '🏕️' }, { n: 'Kök Börü', e: '🐺' },
    { n: 'Demirci Börteçine', e: '⚒️' }, { n: 'Körükler', e: '🔥' }, { n: 'Demir Dağ Kızarır', e: '🌋' }, { n: 'Dağ Erir', e: '💧' }, { n: 'Çıkış', e: '☀️' }
  ];
  W.ekDestanCH = CH;
  function dsState() { var e = ek(); e.ds = e.ds || { s: 0 }; return e.ds; }
  function stagePow(i) { return Math.round(250 * Math.pow(1.38, i)); }
  function myPow() { var c = W.cs(), t = 0; try { t = W.tpowv(0); } catch (e) {} return Math.round(c.atk * 3 + c.def * 2 + c.hp * .3 + t * .05); }
  function openDestanSefer() {
    var d = dsState(), mp = myPow(), cur = d.s, chi = Math.floor(cur / 3);
    var path = CH.map(function (c, i) {
      var done = cur >= (i + 1) * 3, on = chi === i;
      return '<div class="ds-ch' + (done ? ' done' : on ? ' on' : ' lk') + '"' + (done ? ' data-ds-sw="' + i + '"' : '') + '><i>' + c.e + '</i><small>' + (i + 1) + '. ' + c.n + '</small><span>' + [0, 1, 2].map(function (j) { var k = i * 3 + j; return '<em class="' + (k < cur ? 'ok' : k === cur ? 'cur' : '') + '"></em>'; }).join('') + '</span></div>';
    }).join('');
    var done = cur >= CH.length * 3, need = stagePow(cur);
    var body = '<div class="ds-path">' + path + '</div>' + (done ? '<p class="yk-max">☀️ Ergenekon’dan çıkıldı</p>' :
      '<div class="sv-stats" style="grid-template-columns:repeat(3,1fr)"><span><i>📍</i><b>' + (chi + 1) + '-' + (cur % 3 + 1) + '</b></span><span><i>👹</i><b>' + nf(need) + '</b></span><span><i>⚔</i><b class="' + (mp >= need ? 'ok' : 'no') + '">' + nf(mp) + '</b></span></div>' +
      '<button type="button" class="yk-main" data-ds-go="1">⚔ Savaş</button>');
    var o = popup('Ergenekon Destanı', body, 'ds-card');
    o.addEventListener('click', function (ev) { var sw = ev.target.closest('[data-ds-sw]'); if (sw) { o.remove(); dsSweep(+sw.dataset.dsSw); return; } if (!ev.target.closest('[data-ds-go]')) return; o.remove(); dsFight(); });
    setTimeout(function () { var c = o.querySelector('.ds-ch.on'); if (c) c.scrollIntoView({ block: 'nearest', inline: 'center' }); }, 30);
  }
  // 123) bölüm tarama: geçilmiş bölüm tek tuşla tekrar, ganimet hemen (günde 5)
  function dsSweep(ch) {
    var d = dsState(), s = S(), m = dm().mat, today = day(); d.sw = d.sw && d.sw.d === today ? d.sw : { d: today, n: 0 };
    if (d.sw.n >= 5) { if (W.ekReport) W.ekReport({ title: 'Bölüm tarama', win: false, sub: '5/5', rows: [['⟳', '0']] }); return; }
    d.sw.n++; var rows = [], kg = Math.random() < .4 + ch * .04 ? 1 : 0, st = Math.round((ch + 1) * 40 * (s.l.ocak || 1));
    if (kg) { m.kagit += kg; rows.push(['📜', '+' + kg]); } s.r.celik = (s.r.celik || 0) + st; rows.push(['🔩', '+' + nf(st)]);
    var res = Math.round(300 * Math.pow(1.25, s.l.ocak || 1) * (1 + ch * .2)); ['odun', 'et', 'demir'].forEach(function (k) { s.r[k] = (s.r[k] || 0) + Math.round(res / 3); }); rows.push(['📦', '+' + nf(res)]);
    if (Math.random() < .15) { var h = Math.floor(Math.random() * W.HH.length); s.hc[h] = (s.hc[h] || 0) + 1; rows.push(['🃏', W.HH[h].n + ' +1']); }
    save(); if (W.ekReport) W.ekReport({ title: 'Bölüm tarama', win: true, sub: CH[ch].n + ' · ⟳ ' + d.sw.n + '/5', rows: rows });
  }
  function dsFight() {
    var d = dsState(), need = stagePow(d.s), mp = myPow(), win = mp * (.85 + Math.random() * .3) >= need, s = S(), rows = [];
    var lo = win ? .03 : .12; try { var w = W.woundArmy(lo); if (w) rows.push(['🩹', '+' + nf(w)]); } catch (e) {}
    if (win) {
      var m = dm().mat, last = d.s % 3 === 2; d.s++;
      m.kagit += 1 + Math.floor(d.s / 6); rows.push(['📜', '+' + (1 + Math.floor(d.s / 6))]);
      if (last) { var h = Math.floor(Math.random() * (W.HH || []).length); s.hc[h] = (s.hc[h] || 0) + 5; rows.push(['🃏', W.HH[h].n + ' +5']); if (d.s >= 9) { m.safir += 1; rows.push(['🔷', '+1']); } if (d.s >= 18) { m.opal += 1; rows.push(['🔮', '+1']); } }
    }
    save(); rer(); if (W.ekReport) W.ekReport({ title: 'Destan Seferi', win: win, sub: win ? CH[Math.floor((d.s - 1) / 3)].n : 'Daha güçlen', rows: rows.length ? rows : [['⚔', nf(mp) + '/' + nf(need)]] });
  }
  function dsChip() {
    var bar = document.getElementById('ek-army'); if (!bar || bar.querySelector('[data-ek-ds]')) return;
    var d = dsState(), b = document.createElement('button'); b.type = 'button'; b.className = 'db-chip'; b.setAttribute('data-ek-ds', '1');
    b.innerHTML = '<i>📜</i><span><b>Destan Seferi</b><small>' + (d.s >= CH.length * 3 ? 'Tamamlandı' : (Math.floor(d.s / 3) + 1) + '-' + (d.s % 3 + 1) + ' · ' + CH[Math.min(CH.length - 1, Math.floor(d.s / 3))].n) + '</small></span>';
    b.addEventListener('click', function (ev) { ev.stopPropagation(); openDestanSefer(); }); bar.appendChild(b);
  }

  /* ---------- 20) geri dönüş sandığı + bildirimler ---------- */
  var away = 0;
  function backChest() {
    var e = ek(), now = Date.now(); away = e.seen ? now - e.seen : 0; e.seen = now;
    if (away < 3 * 864e5 || e.bk === day()) return;
    e.bk = day();
    setTimeout(function () {
      var s = S(), m = dm().mat, o = s.l.ocak || 1, g = Math.round(3000 * Math.pow(1.3, o)), cap = Infinity; try { cap = W.cap(); } catch (x) {}
      ['odun', 'et', 'demir'].forEach(function (r) { s.r[r] = Math.min(cap, (s.r[r] || 0) + g); });
      m.kagit += 3; m.safir += 1; var h = Math.floor(Math.random() * (W.HH || []).length); s.hc[h] = (s.hc[h] || 0) + 5;
      save(); rep('Hoş geldin, Alp', [['🪵', '+' + nf(g)], ['🍖', '+' + nf(g)], ['⛓️', '+' + nf(g)], ['📜', '+3'], ['🔷', '+1'], ['🃏', W.HH[h].n + ' +5']], Math.floor(away / 864e5) + ' gün sonra dönüş sandığı');
    }, 3500);
  }
  var NT = { timers: [] };
  function notifOn() { return ek().nt && 'Notification' in W && Notification.permission === 'granted'; }
  function notify(t, b) { try { if (!notifOn()) return; if (W.ekNotify) W.ekNotify(t, b); else new Notification(t, { body: b, icon: './assets/app/icon-192.png', tag: t }); } catch (e) {} }
  function schedule() {
    NT.timers.forEach(clearTimeout); NT.timers = [];
    if (!notifOn()) return; var s = S();
    var add = function (sec, t, b) { if (sec > 0 && sec < 864e3) NT.timers.push(setTimeout(function () { notify(t, b); }, sec * 1000)); };
    try { W.buildQueues().forEach(function (q) { add(q.left, '🔨 Yapı tamamlandı', ((W.B[q.k] || {}).n || '') + ' hazır'); }); } catch (e) {}
    if (s.rq) add(s.rq.left, '📜 Araştırma bitti', s.rq.n || '');
    if (s.en) add((W.EN_MAX - s.en.v) * (W.EN_RG || 240), '⚡ Enerji doldu', 'Avlanma vakti');
    add(12 * 3600, '🌾 Çevrim dışı gelir doldu', '12 saatlik birikim hazır');
    var nv = s.nv; if (nv && nv.run > 0) add(nv.run, '🔥 Nevruz hakkı hazır', 'Anka akını seni bekliyor');
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) schedule(); else { NT.timers.forEach(clearTimeout); NT.timers = []; } });
  function settingsRow() {
    var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g' || tg.querySelector('#ek-nt-opt')) return;
    var row = document.createElement('div'); row.id = 'ek-nt-opt'; row.className = 'card ek-optrow';
    row.innerHTML = '<div><b>🔔 Bildirimler</b><small>Yapım, araştırma, enerji, Nevruz, çevrim dışı gelir</small></div><button type="button"></button>';
    var btn = row.querySelector('button'), lab = function () { btn.textContent = notifOn() ? 'Açık · Kapat' : 'Kapalı · Aç'; };
    btn.addEventListener('click', function () {
      var e = ek();
      if (notifOn()) { e.nt = 0; save(); lab(); return; }
      if (!('Notification' in W)) { btn.textContent = 'Desteklenmiyor'; return; }
      Notification.requestPermission().then(function (p) { e.nt = p === 'granted' ? 1 : 0; save(); lab(); });
    });
    lab(); tg.insertBefore(row, tg.firstChild);
  }

  /* ---------- 42) bozkır sesleri (kopuz/davul · rüzgâr/at) ---------- */
  var AU = { ctx: null, nodes: null, mode: '', next: 0 };
  function sndOn() { var s = S(); return s && s.snd !== false && !document.hidden; }
  function vol() { try { return W.SVV(); } catch (e) { return 1; } }
  function ctx() { if (AU.ctx) return AU.ctx; try { AU.ctx = W._ac || (W._ac = new (W.AudioContext || W.webkitAudioContext)()); } catch (e) {} return AU.ctx; }
  function noiseBuf(c) { var b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; }
  function wind(on) {
    var c = ctx(); if (!c) return;
    if (on && !AU.wind) { var src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); src.buffer = noiseBuf(c); src.loop = true; f.type = 'lowpass'; f.frequency.value = 420; g.gain.value = 0; src.connect(f); f.connect(g); g.connect(c.destination); src.start(); AU.wind = { src: src, f: f, g: g }; }
    if (AU.wind) AU.wind.g.gain.setTargetAtTime(on ? .035 * vol() : 0, c.currentTime, .8);
  }
  function drum(t, f, a) { var c = ctx(), o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .5, t + .25); g.gain.setValueAtTime(a * vol(), t); g.gain.exponentialRampToValueAtTime(.001, t + .35); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .4); }
  function kopuz(t, f) { var c = ctx(), o = c.createOscillator(), g = c.createGain(), fl = c.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.setValueAtTime(2200, t); fl.frequency.exponentialRampToValueAtTime(300, t + .6); g.gain.setValueAtTime(.025 * vol(), t); g.gain.exponentialRampToValueAtTime(.001, t + .9); o.connect(fl); fl.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 1); }
  function hoof(t) { [0, .12, .26].forEach(function (d, i) { drum(t + d, 180 - i * 20, .02); }); }
  var SC = [146.8, 164.8, 196, 220, 246.9, 293.7];
  function ambient() {
    var c = AU.ctx; if (!c || c.state !== 'running') return;
    var mode = !sndOn() ? '' : W.tab === 'c' ? 'c' : W.tab === 'm' ? 'm' : '';
    wind(mode === 'm');
    var now = c.currentTime; if (!mode || now < AU.next) return;
    if (mode === 'c') { drum(now, 90, .05); drum(now + .45, 70, .035); if (Math.random() < .7) kopuz(now + .2 + Math.random() * .4, SC[Math.floor(Math.random() * SC.length)]); AU.next = now + 1.8 + Math.random() * 1.6; }
    else { if (Math.random() < .35) hoof(now); AU.next = now + 3 + Math.random() * 4; }
  }
  document.addEventListener('pointerdown', function () { var c = ctx(); if (c && c.state === 'suspended') c.resume(); }, { passive: true });

  var lastSec = 0, lastMid = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    if (now - lastMid > 400) { lastMid = now; try { kutBadge(); usBtn(); edView(); petBtn(); dsChip(); settingsRow(); ambient(); } catch (e) {} }
    if (now - lastSec > 5000) { lastSec = now; try { hookBonus(); hookCb(); petTick(); ek().seen = Date.now(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.cs !== 'function') { setTimeout(start, 400); return; } hookBonus(); hookCb(); backChest(); requestAnimationFrame(frame); }
  start();
  W.ergenekonIlerleme = { kut: kutLevel, openKut: openKut, openPets: openPets, openDestanSefer: openDestanSefer, ed: edProg };
})();
