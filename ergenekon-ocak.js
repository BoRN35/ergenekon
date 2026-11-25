/* Ergenekon — F aşaması: Kutsal Ocak (boy) canlılığı. Claude, 18 Kasım 2026.
   16 Ocak hediyesi + üye listesi · 17 Akıncı dalgaları · 50 canlılık akışı · 51 sohbet yanıtları/emojiler
   30 Kut Bereketi anahtarı (+%35 toplama, ödeme yok) · 21 ışık ayarı.  Sunucu yok: üyeler yerel yapay zekâ ile yaşar.
   Kalıcı: s.ek.oc {g,gt,feed,ak}, s.ek.prem */
(function () {
  'use strict';
  var W = window;
  if (W.__ekOc) return; W.__ekOc = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function oc() { var e = ek(); e.oc = e.oc || { g: 3, gt: Date.now(), feed: [], ak: {} }; return e.oc; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function dm() { var s = S(); s.ek.dm = s.ek.dm || {}; s.ek.dm.mat = s.ek.dm.mat || { kagit: 0, safir: 0, opal: 0 }; return s.ek.dm; }
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  function hsh(str) { var h = 7; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000003; return h; }

  /* ---------- üyeler ---------- */
  var ROLE = ['👑', '🛡️', '🛡️', '⚔️', '⚔️', '🏹', '🏹', '🌾'];
  function members() {
    var M = W.MEM || [], o = (S().l.ocak || 1), hr = new Date().getHours();
    return M.map(function (m, i) {
      var h = hsh(m[0]), lv = Math.max(1, Math.min(40, o + (h % 9) - 3)), on = ((h >> 3) + hr * 7 + i) % 5 < 3;
      return { n: m[0], lg: m[1], lv: lv, r: W.ekBoy ? W.ekBoy.rankIcon(m[0]) : ROLE[i % ROLE.length], on: on, p: Math.round(lv * lv * 1800 * (1 + (h % 50) / 100)) };
    }).sort(function (a, b) { return b.p - a.p; });
  }
  var ACT = [
    ['🐺', function (m) { return m.n + ' Sv' + (m.lv + 2) + ' kurt sürüsünü dağıttı'; }],
    ['⛰', function (m) { return m.n + ' bir kurgan açtı'; }],
    ['🔨', function (m) { return m.n + ' Ocak Sv' + m.lv + ' oldu'; }],
    ['⚒️', function (m) { return m.n + ' Sihirli Örs’te +' + (2 + m.lv % 7) + ' yaptı'; }],
    ['🎁', function (m) { return m.n + ' Ocak’a hediye bıraktı'; }],
    ['🤝', function (m) { return m.n + ' yapımına yardım etti'; }],
    ['🏹', function (m) { return m.n + ' akıncı dalgası ' + (3 + m.lv % 8) + '’i geçti'; }],
    ['📜', function (m) { return m.n + ' Destan Seferi ' + (1 + m.lv % 9) + '. bölümde'; }]
  ];
  function feedTick() {
    var o = oc(), ms = members().filter(function (m) { return m.on; }); if (!ms.length) return;
    var m = rnd(ms), a = rnd(ACT); o.feed.unshift({ e: a[0], t: a[1](m), at: Date.now() }); if (o.feed.length > 14) o.feed.length = 14;
    if (a[0] === '🎁') o.g = Math.min(25, o.g + 1);
    if (W.tab !== 'a' && Math.random() < .35) toast(a[0] + ' ' + o.feed[0].t);
  }
  var tEl = null;
  function toast(t) {
    return; /* 26.11: ekranın üstünde beliren/kaybolan canlı haber balonu kapatıldı (yanıp sönme); haberler Boy sayfası ve sohbet şeridinde */
    if (document.hidden || document.querySelector('.ek-ov')) return;
    if (!tEl) { tEl = document.createElement('div'); tEl.id = 'ek-live'; document.body.appendChild(tEl); }
    tEl.textContent = t; tEl.classList.remove('on'); void tEl.offsetWidth; tEl.classList.add('on');
  }

  /* ---------- Ocak hediyesi ---------- */
  function giftAccrue() { var o = oc(), iv = 45 * 60e3, n = Math.floor((Date.now() - o.gt) / iv); if (n > 0) { o.g = Math.min(25, o.g + n); o.gt += n * iv; } }
  function claimGifts() {
    var o = oc(), s = S(), m = dm().mat, n = o.g, tot = { r: 0, k: 0, c: 0, e: 0 }, oc0 = s.l.ocak || 1, cap = Infinity; if (!n) return;
    try { cap = W.cap(); } catch (x) {}
    for (var i = 0; i < n; i++) {
      var r = Math.random();
      if (r < .1) { m.kagit++; tot.k++; }
      else if (r < .25) { var h = Math.floor(Math.random() * W.HH.length); s.hc[h] = (s.hc[h] || 0) + 1; tot.c++; }
      else if (r < .4 && s.en) { s.en.v = Math.min(W.EN_MAX, s.en.v + 5); tot.e += 5; }
      else { var g = Math.round(400 * Math.pow(1.25, oc0)), k = rnd(['odun', 'et', 'demir']); s.r[k] = Math.min(cap, (s.r[k] || 0) + g); tot.r += g; }
    }
    o.g = 0; save();
    var rows = []; if (tot.r) rows.push(['📦', '+' + nf(tot.r)]); if (tot.k) rows.push(['📜', '+' + tot.k]); if (tot.c) rows.push(['🃏', '+' + tot.c]); if (tot.e) rows.push(['⚡', '+' + tot.e]);
    if (W.ekReport) W.ekReport({ title: 'Ocak Hediyesi', win: true, sub: n + ' 🎁', rows: rows });
  }

  /* ---------- Akıncı dalgaları (3 günde bir) ---------- */
  function period() { return Math.floor(Date.now() / (3 * 864e5)); }
  function akState() { var o = oc(); if (o.ak.p !== period()) o.ak = { p: period(), w: 0, done: 0 }; return o.ak; }
  function wavePow(w) { return Math.round(120 * Math.pow(1.28, w) * (1 + (S().l.ocak || 1) * .05)); }
  function myPow() { var c = W.cs(), t = 0; try { t = W.tpowv(0); } catch (e) {} return Math.round(c.atk * 3 + c.def * 2 + c.hp * .3 + t * .05); }
  var FN = ['⚖', '🗡️', '🐎', '🏹'];
  function powF(f) { var s = S(), keep = s.formation; s.formation = f; try { return myPow(); } finally { s.formation = keep; } }
  function akPow() { var f = S().ek.akf; return (f == null ? myPow() : powF(f)) * (W.ekAkinciBonus ? W.ekAkinciBonus() : 1); }
  function akBest() { var b = 0, bp = -1; for (var f = 0; f < 4; f++) { var p = powF(f); if (p > bp) { bp = p; b = f; } } return b; }
  function runWaves() {
    var a = akState(); if (a.done) return; var mp = akPow(), w = 0, s = S(), m = dm().mat, res = 0, rows = [], cap = Infinity;
    try { cap = W.cap(); } catch (x) {}
    while (w < 10 && mp * (.9 + Math.random() * .2) >= wavePow(w)) w++;
    for (var i = 0; i < w; i++) res += Math.round(600 * Math.pow(1.3, s.l.ocak || 1) * (1 + i * .15));
    ['odun', 'et', 'demir'].forEach(function (k) { s.r[k] = Math.min(cap, (s.r[k] || 0) + Math.round(res / 3)); });
    if (res) rows.push(['📦', '+' + nf(res)]);
    if (w > 0) { var stl = Math.round(w * 60 * (s.l.ocak || 1)); s.r.celik = (s.r.celik || 0) + stl; rows.push(['🔩', '+' + nf(stl)]); }
    if (w >= 5) { m.kagit += 2; rows.push(['📜', '+2']); }
    if (w >= 8) { m.safir += 1; rows.push(['🔷', '+1']); }
    if (w >= 10) { m.opal += 1; rows.push(['🔮', '+1']); }
    if (W.ekHourglass) { if (w >= 3) rows = rows.concat(W.ekHourglass.add(2, 0)); if (w >= 6) rows = rows.concat(W.ekHourglass.add(0, 1)); }
    if (W.ekPotion && w >= 5) rows = rows.concat(W.ekPotion.add(w >= 8 ? 2 : 1, 0));
    try { var wd = W.woundArmy(.02 * (w + 1)); if (wd) rows.push(['🩹', '+' + nf(wd)]); } catch (e) {}
    a.w = w; a.done = 1; save(); try { W.render(); } catch (e) {}
    var me = w * 10, clan = me; members().forEach(function (m) { clan += (hsh(m.n + a.p) % 9) * 10; });
    rows.unshift(['🔥', nf(clan)]); rows.unshift(['🏅', nf(me)]); rows.unshift(['🌊', w + '/10']);
    if (W.ekReport) W.ekReport({ title: 'Akıncı Dalgaları', win: w > 0, sub: '🏅 ' + me + ' · 🔥 Boy ' + nf(clan), rows: rows });
  }

  /* ---------- İttifak sekmesi paneli ---------- */
  var BOX = null;
  function attach() {
    var ta = document.getElementById('ta'); if (!ta || W.tab !== 'a' || !BOX) return;
    var host = ta.querySelector('[data-mgmt-pane="council"]'); if (!host) return;
    if (BOX.parentNode !== host || host.firstChild !== BOX) host.insertBefore(BOX, host.firstChild);
  }
  function hookRender() {
    if (typeof W.render !== 'function' || W.render.__ekOc) return;
    var o = W.render, f = function () { var r = o.apply(this, arguments); try { attach(); } catch (e) {} return r; };
    for (var k in o) f[k] = o[k]; f.__ekOc = true; W.render = f;
  }
  function panel() {
    var ta = document.getElementById('ta'); if (!ta || W.tab !== 'a') return;
    if (!BOX) {
      BOX = document.createElement('div'); BOX.id = 'ek-oc';
      BOX.addEventListener('click', function (ev) {
        if (ev.target.closest('[data-oc-gift]')) claimGifts();
        else if (ev.target.closest('[data-oc-ak]')) runWaves();
        else if (ev.target.closest('[data-akf-best]')) { S().ek.akf = akBest(); save(); BOX.__ekh = ''; panel(); }
        else if (ev.target.closest('[data-akf]')) { S().ek.akf = +ev.target.closest('[data-akf]').dataset.akf; save(); BOX.__ekh = ''; panel(); }
      });
    }
    var box = BOX; attach(); hookRender();
    giftAccrue();
    var o = oc(), a = akState(), ms = members(), on = ms.filter(function (m) { return m.on; }).length, left = (period() + 1) * 3 * 864e5 - Date.now();
    var h = '<div class="oc-top"><button type="button" class="oc-gift' + (o.g ? ' has' : '') + '" data-oc-gift="1"' + (o.g ? '' : ' disabled') + '><i>🎁</i><b>' + o.g + '</b><small>Ocak hediyesi</small></button>' +
      '<button type="button" class="oc-ak' + (a.done ? ' done' : '') + '" data-oc-ak="1"' + (a.done ? ' disabled' : '') + '><i>🏹</i><b>' + (a.done ? a.w + '/10' : '⚔') + '</b><small>' + (a.done ? '⏳ ' + ft(left / 1000) : 'Akıncı dalgaları') + '</small></button></div>' +
      '<div class="oc-akf"><small>🛡 Akıncı düzeni</small>' + FN.map(function (e, f) { var cur = S().ek.akf == null ? (S().formation || 0) : S().ek.akf; return '<button type="button" data-akf="' + f + '" class="' + (cur === f ? 'on' : '') + '">' + e + '</button>'; }).join('') + '<button type="button" data-akf-best="1">✦</button></div>' +
      '<div class="oc-mem"><div class="oc-h"><b>👥 ' + (ms.length + 1) + '</b><span><em class="dot"></em>' + (on + 1) + '</span></div><div class="oc-list">' +
      '<div class="oc-m me"><span>' + (W.ekBoy ? W.ekBoy.rankIcon('Sen') : '⭐') + '</span><b>Sen</b><small>Sv' + (S().l.ocak || 1) + '</small><em class="dot"></em></div>' +
      ms.map(function (m) { return '<div class="oc-m"><span>' + m.r + '</span><b>' + m.n + '</b><small>Sv' + m.lv + '</small><em class="dot' + (m.on ? '' : ' off') + '"></em></div>'; }).join('') + '</div></div>' +
      '<div class="oc-feed">' + (o.feed.slice(0, 5).map(function (f) { var ago = Math.max(1, Math.round((Date.now() - f.at) / 60e3)); return '<div><i>' + f.e + '</i><span>' + f.t + '</span><small>' + ago + 'dk</small></div>'; }).join('') || '<div><i>🔥</i><span>Ocak sakin</span></div>') + '</div>';
    if (box.__ekh !== h) { box.__ekh = h; box.innerHTML = h; }
    emotes(ta);
  }

  /* ---------- 51) sohbet: emojiler + yanıt ---------- */
  var REP = [
    [/selam|merhaba|sa\b|günaydın|iyi akşam/i, ['Aleyküm selam! 🐺', 'Selam boydaş!', 'Hoş geldin 🔥', 'Günaydın, kut olsun!']],
    [/yardım|yardim|destek|help/i, ['Geliyorum 🐺', 'Yardım bastım 🤝', 'Sırada bekle, geliyorum!']],
    [/akın|akıncı|dalga|savaş/i, ['Akıncılar gelsin, hazırız ⚔️', 'Ben 7. dalgada kaldım 😅', 'Okçuları öne al!']],
    [/teşekkür|sağ ol|sağol|eyv/i, ['Ne demek 🤝', 'Boy için 🐺', 'Her zaman!']],
    [/örs|demirci|safir|opal|kağıt/i, ['Opal Sv8 canavarlardan düşüyor', 'Ben dün +6 yaptım 🔥', 'Kağıdı damgalı avdan topla']],
    [/./, ['🐺🐺', 'Kut olsun!', 'Bozkır seninle 🌾', '👍', 'Aynen öyle', 'Ocak sıcak 🔥']]
  ];
  function reply(txt) {
    var ms = members().filter(function (m) { return m.on; }); if (!ms.length) return;
    var pool = REP.find(function (r) { return r[0].test(txt); })[1], m = rnd(ms);
    setTimeout(function () { var s = S(); s.chat.push({ u: m.n, lg: 'TR', txt: rnd(pool), tr: '' }); if (s.chat.length > 40) s.chat.shift(); try { W.render(); } catch (e) {} }, 2500 + Math.random() * 4000);
  }
  var EM = ['👍', '🐺', '🔥', '⚔️', '🤝', '🎁'];
  function emotes(ta) {
    if (ta.querySelector('#ek-em')) return; var ci = document.getElementById('ci'); if (!ci) return;
    var r = document.createElement('div'); r.id = 'ek-em';
    r.innerHTML = EM.map(function (e) { return '<button type="button" data-em="' + e + '">' + e + '</button>'; }).join('');
    r.addEventListener('click', function (ev) { var b = ev.target.closest('[data-em]'); if (!b) return; ci.value = b.dataset.em; var cs = document.getElementById('cs'); if (cs) cs.click(); });
    ci.parentNode.parentNode.insertBefore(r, ci.parentNode);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('#cs'); if (!b) return;
    var v = (document.getElementById('ci') || {}).value || ''; if (v.trim()) reply(v);
  }, true);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && ev.target && ev.target.id === 'ci' && ev.target.value.trim()) reply(ev.target.value); }, true);

  /* ---------- 30) Kut Bereketi anahtarı ---------- */
  W.__ekPrem = function () { var s = S(), e = s && s.ek; if (!e) return false; var now = Date.now(); return !!(e.prem || (e.trial && e.trial > now) || (e.sub && e.sub > now)); };
  function premRow() {
    var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g' || tg.querySelector('#ek-prem')) return;
    var row = document.createElement('div'); row.id = 'ek-prem'; row.className = 'card ek-optrow';
    row.innerHTML = '<div><b>✨ Kut Bereketi</b><small>Toplama +%35 · ödeme yok</small></div><button type="button"></button>';
    var btn = row.querySelector('button'), lab = function () { btn.textContent = ek().prem ? 'Açık' : 'Kapalı'; btn.classList.toggle('on', !!ek().prem); };
    btn.addEventListener('click', function () { ek().prem = ek().prem ? 0 : 1; save(); lab(); });
    lab(); var nt = tg.querySelector('#ek-nt-opt'); tg.insertBefore(row, nt ? nt.nextSibling : tg.firstChild);
  }

  /* ---------- 21) ışık ---------- */
  function light() {
    [W.city3d, W.world3d].forEach(function (v) {
      var r = v && v.renderer; if (!r || r.__ekLit) return; r.__ekLit = 1;
      if (r.toneMapping === 0) r.toneMapping = 4; r.toneMappingExposure = 1.12;
      if (r.shadowMap && r.shadowMap.enabled) { r.shadowMap.type = 2; r.shadowMap.needsUpdate = true; }
    });
  }

  var lf = 0, ls = 0, nextFeed = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - ls > 500) { ls = now; try { panel(); light(); } catch (e) {} }
    if (now > nextFeed) { nextFeed = now + 40000 + Math.random() * 50000; if (lf) try { feedTick(); save(); } catch (e) {} lf = 1; }
  }
  function start() { if (!S() || !W.MEM || typeof W.cs !== 'function') { setTimeout(start, 400); return; } giftAccrue(); requestAnimationFrame(frame); }
  start();
  W.ergenekonOcak = { panel: panel, members: members, claimGifts: claimGifts, runWaves: runWaves, feedTick: feedTick };
})();
