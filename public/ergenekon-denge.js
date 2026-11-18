/* Ergenekon — Ek Paket 2, 4. adım: denge ve koleksiyon. Claude, 18 Kasım 2026.
   88 birlik üçgeni (Piyade > Süvari > Okçu > Piyade; canavarlara zayıf/güçlü tür) · 98 kahraman silah uyumu
   91 eşya setleri · 92 koleksiyon albümü · 97 binek atlar
   Kalıcı: s.ek.al (albüm: görülen eşyalar), s.ek.bn (seçili binek) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekDenge) return; W.__ekDenge = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }

  /* ================= 88) birlik üçgeni ================= */
  var TT = ['🗡️', '🐎', '🏹'], TN = ['Piyade', 'Süvari', 'Okçu'];
  // canavarın "savaş biçimi": hızlı/sürü = süvari gibi (piyade yener), ağır/iri = piyade gibi (okçu yener), uçan/ruh/uzak = okçu gibi (süvari yener)
  function styleOf(name) {
    if (/Kurt|Tilki|Geyik|Karaca|At |Atı|Vaşak|Pars|Keçi|Börü/.test(name)) return 1;
    if (/Ayı|Boğa|Öküz|Domuz|Mamut|Dev|Tepegöz|Karakoncolos/.test(name)) return 0;
    return 2; // Kartal, Yılan Ruhu, Albastı, Ejder, Erlik’in Gölgesi …
  }
  function weakTo(style) { return (style + 2) % 3; } // piyade(0) süvariyi(1) yener → süvari biçimliye karşı piyade; okçu(2) piyadeyi(0) yener; süvari(1) okçuyu(2) yener
  function beats(st) { return (st + 1) % 3; } // piyade(0)→süvari(1), süvari(1)→okçu(2), okçu(2)→piyade(0)
  function triOf(m) { var M = W.M && W.M[m]; if (!M) return null; var st = styleOf(M[0]); return { st: st, weak: weakTo(st) }; }
  var BASEN = {};
  function baseNames() { (W.M || []).forEach(function (m, i) { try { BASEN[W.monsterBase(i)] = m[0]; } catch (e) {} }); }
  function triFactor(name) {
    var s = S(), f = s.formation || 0; if (!f || !name) return 1;
    var st = styleOf(name), lead = f - 1, k = 1;
    if (lead === weakTo(st)) { k = 1.2; try { var T = W.ergenekonKahramanTac; if (T && W.__ekFightBase != null && T(W.__ekFightBase)) k += .05; } catch (e) {} } // Turan Taktiği üçgeni güçlendirir
    else if (lead === beats(st)) k = .9;
    return k;
  }
  function bestFor(m) { var t = triOf(m); return t ? t.weak + 1 : 0; }

  /* ================= 98) silah uyumu ================= */
  var HW = { 'Mete Han': 'yay', 'Oğuz Han': 'yay', 'Cengiz Han': 'yay', 'Tomris Hatun': 'yay', 'Alparslan': 'kilic', 'Fatih Sultan Mehmet': 'kilic', 'Timur': 'kilic', 'Kara Fatma': 'kilic', 'Kubilay Han': 'mizrak' };
  var WI = { yay: '🏹', kilic: '⚔️', mizrak: '🔱', gurz: '🔨', balta: '🪓' };
  var WN = { kilic: ['Demir Kılıç', 'Çelik Kılıç', 'Kurt Kılıcı', 'Tengri Kılıcı', 'Börü Kılıcı'], yay: ['Ağaç Yay', 'Boynuz Yay', 'Kurt Yayı', 'Tengri Yayı', 'Börü Yayı'], mizrak: ['Demir Mızrak', 'Kargı Mızrak', 'Kurt Mızrağı', 'Tengri Mızrağı', 'Böri Mızrağı'] };
  function wtype(x) { var n = (x && x.n) || ''; return /Yay/.test(n) ? 'yay' : /Mızra/.test(n) ? 'mizrak' : /Gürz/.test(n) ? 'gurz' : /Balta/.test(n) ? 'balta' : 'kilic'; }
  function weaponFit() {
    var s = S(), w = s.ch && s.ch.eq && s.ch.eq.w; if (!w) return null; var t = wtype(w);
    var heroes = (W.HH || []).map(function (h, i) { return (s.hs[i] || 0) > 0 && HW[h.n] === t ? i : -1; }).filter(function (i) { return i >= 0; });
    return { t: t, heroes: heroes, on: heroes.length > 0 };
  }
  function hookGen() { // yeni düşen silahlar üç türden birine dağılır (kılıç, yay, mızrak)
    wrap('gen', '__ekDg', function (o) { return function () { var x = o.apply(this, arguments); try { if (x && x.s === 'w') { var r = Math.random(), t = r < .4 ? 'kilic' : r < .75 ? 'yay' : 'mizrak'; x.n = WN[t][Math.max(0, Math.min(4, x.r || 0))]; } } catch (e) {} return x; }; });
  }

  /* ================= 91) eşya setleri ================= */
  var SETS = [{ r: 2, id: 'bozkurt', n: 'Bozkurt Seti', e: '🐺', c: '#8fd0ff' }, { r: 3, id: 'tulpar', n: 'Tulpar Seti', e: '🐎', c: '#c79bff' }, { r: 4, id: 'hakan', n: 'Hakan Seti', e: '👑', c: '#ffd34c' }];
  var SLOTS = ['b', 'k', 'g', 'l', 'f', 'w'], SLN = { b: 'Kafa', k: 'Kol', g: 'Göğüs', l: 'Alt', f: 'Ayak', w: 'Silah' };
  function setCount(r) { var eq = (S().ch && S().ch.eq) || {}; return SLOTS.filter(function (k) { return eq[k] && (eq[k].r || 0) === r; }).length; }
  function setPct() { var p = 0; SETS.forEach(function (st) { var n = setCount(st.r); p += n >= 6 ? .03 : n >= 4 ? .02 : n >= 2 ? .01 : 0; }); return p; }
  function srcLv(r) { return [1, 3, 8, 15, 24][r] || 1; }
  function openSet(id) {
    var st = SETS.find(function (x) { return x.id === id; }) || SETS[0], eq = (S().ch && S().ch.eq) || {}, n = setCount(st.r);
    var body = '<div class="st-head" style="--sc:' + st.c + '"><i>' + st.e + '</i><b>' + n + '/6</b><span>' + [2, 4, 6].map(function (k) { return '<em class="' + (n >= k ? 'on' : '') + '">' + k + ' · +%' + (k / 2) + '</em>'; }).join('') + '</span></div><div class="st-grid">' +
      SLOTS.map(function (k) { var x = eq[k], ok = x && (x.r || 0) === st.r; return '<button type="button" class="st-p' + (ok ? ' ok' : '') + '" data-st-src="' + st.r + '"><small>' + SLN[k] + '</small><b>' + (ok ? esc(x.n) : '◇') + '</b>' + (ok ? '' : '<u>Sv ' + srcLv(st.r) + '+ 🐾</u>') + '</button>'; }).join('') + '</div>';
    var o = popup(st.n, body, 'st-card');
    o.addEventListener('click', function (ev) { var b = ev.target.closest('[data-st-src]'); if (!b || b.classList.contains('ok')) return; o.remove(); searchLv(srcLv(+b.dataset.stSrc)); });
  }
  function searchLv(lv) { // canavar aramasını o seviye bandıyla aç
    var e = ek(); e.cs = { sp: '', lv: Math.min(S().l.ocak || 1, Math.max(lv, 1)), mat: '' };
    if (W.tab !== 'm') { W.tab = 'm'; rer(); }
    setTimeout(function () { if (W.ekOpenFind) { W.ekOpenFind(); setTimeout(function () { var b = document.querySelector('[data-cs-tab="k"]'); if (b) b.click(); }, 60); } }, 400);
  }

  /* ================= 97) binek atlar ================= */
  var HORSES = [
    { id: 'kazak', n: 'Kazak atı', e: '🐎', b: .02, c: '#b98a56', t: 'Ocak 5', ok: function () { return (S().l.ocak || 0) >= 5; } },
    { id: 'yakut', n: 'Yakut atı', e: '🐴', b: .03, c: '#e9e6df', t: '500 av', ok: function () { return ((S().stat || {}).kills || 0) >= 500; } },
    { id: 'ahal', n: 'Ahal-Teke', e: '🐎', b: .04, c: '#f2c14e', t: 'Ocak 15', ok: function () { return (S().l.ocak || 0) >= 15; } },
    { id: 'tulpar', n: 'Tulpar', e: '🪽', b: .06, c: '#8fd0ff', t: 'Ergenekon’dan çıkış', ok: function () { return ((ek().ds || {}).s || 0) >= 30; } }
  ];
  function horse() { var id = ek().bn, h = HORSES.find(function (x) { return x.id === id; }); return h && h.ok() && fed() ? h : null; }
  function owned() { var id = ek().bn, h = HORSES.find(function (x) { return x.id === id; }); return h && h.ok() ? h : null; }
  function fed() { return (ek().bnf || 0) > Date.now(); }
  function feedCost() { return 30 * (S().l.ocak || 1); }
  function feed() { var s = S(), c = feedCost(); if ((s.r.dari || 0) < c) return false; s.r.dari -= c; ek().bnf = Math.max(Date.now(), ek().bnf || 0) + 864e5; save(); return true; }
  function openHorses() {
    var cur = ek().bn;
    var fd = fed(), left = Math.max(0, ((ek().bnf || 0) - Date.now()) / 1000), fc = feedCost(), dr = S().r.dari || 0;
    var body = '<div class="bn-feed' + (fd ? ' on' : '') + '"><i>🌾</i><span><b>' + (fd ? '◆ ' + (W.ft ? W.ft(left) : Math.ceil(left / 3600) + ' sa') : '◇ Aç') + '</b><small>' + nf(dr) + '</small></span><button type="button" data-bn-feed="1"' + (dr >= fc ? '' : ' disabled') + '>🌾' + nf(fc) + ' · +24 sa</button></div>' + '<div class="bn-grid">' + HORSES.map(function (h) { var ok = h.ok(); return '<button type="button" class="bn' + (cur === h.id && ok ? ' on' : '') + (ok ? '' : ' lk') + '" data-bn="' + h.id + '"' + (ok ? '' : ' disabled') + ' style="--hc:' + h.c + '"><i>' + h.e + '</i><b>' + h.n + '</b><small>' + (ok ? '🐾 +%' + Math.round(h.b * 100) : '🔒 ' + h.t) + '</small></button>'; }).join('') + '</div>';
    var o = popup('Binek', body, 'bn-card');
    o.addEventListener('click', function (ev) { if (ev.target.closest('[data-bn-feed]')) { if (feed()) { o.remove(); openHorses(); rer(); } return; } var b = ev.target.closest('[data-bn]'); if (!b || b.disabled) return; ek().bn = b.dataset.bn; save(); o.remove(); rer(); try { navigator.vibrate && navigator.vibrate(20); } catch (e) {} });
  }

  /* ================= 92) koleksiyon albümü ================= */
  function al() { var e = ek(); e.al = e.al || { it: {} }; return e.al; }
  function alScan() { var s = S(), a = al(), ch = false; var add = function (x) { if (x && x.n && !a.it[x.n]) { a.it[x.n] = 1; ch = true; } }; var eq = (s.ch && s.ch.eq) || {}; for (var k in eq) add(eq[k]); ((s.ch && s.ch.inv) || []).forEach(add); if (ch) save(); }
  function monList() { var o = {}, ms = ek().ms || {}; (W.M || []).forEach(function (m, i) { if (!m || i === 11) return; var b = 0; try { b = W.monsterBase(i); } catch (e) {} var k = m[0]; o[k] = o[k] || { n: k, e: m[1], lv: m[2], seen: false }; o[k].lv = Math.min(o[k].lv, m[2]); if ((ms[b] || 0) > 0) o[k].seen = true; }); return Object.keys(o).map(function (k) { return o[k]; }).sort(function (a, b) { return a.lv - b.lv; }); }
  function itemList() { var IN = W.IN || {}, a = al().it, out = [], seen = {}; ['b', 'k', 'g', 'l', 'f', 'w', 'e', 'y'].forEach(function (k) { (IN[k] || []).forEach(function (n, r) { if (seen[n]) return; seen[n] = 1; out.push({ n: n, r: r, s: k, have: !!a[n] }); }); if (k === 'w') ['yay', 'mizrak', 'kilic'].forEach(function (t) { WN[t].forEach(function (n, r) { if (seen[n]) return; seen[n] = 1; out.push({ n: n, r: r, s: 'w', have: !!a[n] }); }); }); }); return out; }
  function pages() {
    var mons = monList(), hs = S().hs || [], items = itemList();
    return [
      { id: 'm', e: '🐾', n: 'Canavarlar', got: mons.filter(function (x) { return x.seen; }).length, tot: mons.length, b: 'a' },
      { id: 'h', e: '⭐', n: 'Kahramanlar', got: hs.filter(function (v) { return v > 0; }).length, tot: (W.HH || []).length, b: 'f' },
      { id: 'i', e: '⚒️', n: 'Eşyalar', got: items.filter(function (x) { return x.have; }).length, tot: items.length, b: 'h' }
    ];
  }
  function albumBonus(k) { var p = 0; pages().forEach(function (pg) { if (pg.b === k && pg.got >= pg.tot && pg.tot > 0) p += .005; }); return p; }
  var AP = { tab: 'm' };
  function openAlbum() {
    var o0 = document.getElementById('ek-album'); if (o0) o0.remove();
    var P = pages(), pg = P.find(function (x) { return x.id === AP.tab; }), grid = '';
    if (AP.tab === 'm') grid = monList().map(function (x) { return '<button type="button" class="ab' + (x.seen ? ' ok' : '') + '" data-ab-m="' + esc(x.n) + '" data-lv="' + x.lv + '"><i>' + x.e + '</i><small>' + (x.seen ? esc(x.n) : 'Sv ' + x.lv + '+') + '</small></button>'; }).join('');
    else if (AP.tab === 'h') grid = (W.HH || []).map(function (h, i) { var ok = (S().hs[i] || 0) > 0, pic = ''; try { pic = W.hPic(i, 56); } catch (e) { pic = h.e; } return '<button type="button" class="ab ab-h' + (ok ? ' ok' : '') + '" data-ab-h="' + i + '"><i>' + pic + '</i><small>' + (ok ? esc(h.n) : '🃏') + '</small></button>'; }).join('');
    else grid = itemList().map(function (x) { return '<button type="button" class="ab' + (x.have ? ' ok' : '') + '" data-ab-i="' + x.r + '"><i>' + (x.s === 'w' ? WI[wtype(x)] : ({ b: '⛑️', k: '🧤', g: '🥋', l: '👖', f: '👢', e: '💠', y: '💍' })[x.s]) + '</i><small>' + (x.have ? esc(x.n) : 'Sv ' + srcLv(x.r) + '+') + '</small></button>'; }).join('');
    var body = '<div class="ab-tabs">' + P.map(function (p) { return '<button type="button" class="' + (p.id === AP.tab ? 'on' : '') + (p.got >= p.tot ? ' full' : '') + '" data-ab-tab="' + p.id + '"><i>' + p.e + '</i><b>' + p.got + '/' + p.tot + '</b></button>'; }).join('') + '</div>' +
      '<div class="ab-bonus">' + (pg.got >= pg.tot ? '✓ ' : '◇ ') + { a: '⚔️ +%0.5', f: '🛡️ +%0.5', h: '❤️ +%0.5' }[pg.b] + '</div><div class="ab-grid">' + grid + '</div>';
    var o = popup('Koleksiyon', body, 'ab-card'); o.id = 'ek-album';
    o.addEventListener('click', function (ev) {
      var b;
      if ((b = ev.target.closest('[data-ab-tab]'))) { AP.tab = b.dataset.abTab; openAlbum(); }
      else if ((b = ev.target.closest('[data-ab-m]')) && !b.classList.contains('ok')) { o.remove(); var e = ek(); e.cs = { sp: b.dataset.abM, lv: 0, mat: '' }; searchLv(+b.dataset.lv); }
      else if ((b = ev.target.closest('[data-ab-i]')) && !b.classList.contains('ok')) { o.remove(); searchLv(srcLv(+b.dataset.abI)); }
      else if ((b = ev.target.closest('[data-ab-h]'))) { if (b.classList.contains('ok') && W.ergenekonProfil) W.ergenekonProfil.openTarih(+b.dataset.abH); else { o.remove(); var e2 = ek(); e2.cs = { sp: '', lv: 0, mat: 'kart' }; searchLv(11); } }
    });
  }

  /* ================= bağlantılar: güç, sefer süresi, arayüz ================= */
  function hooks() {
    baseNames();
    wrap('cb', '__ekDn', function (o) { return function (k) { var b = o.apply(this, arguments); try { b += setPct() + albumBonus(k); if (k === 'a') { var f = weaponFit(); if (f && f.on) b += .03; } } catch (e) {} return b; }; });
    wrap('cs', '__ekDn', function (o) { return function () { var r = o.apply(this, arguments); try { var b = W.__ekFightBase; if (b != null) { var k = triFactor(BASEN[b]); if (k !== 1) r = { atk: Math.round(r.atk * k), def: r.def, hp: r.hp }; } } catch (e) {} return r; }; });
    wrap('mt', '__ekDn', function (o) { return function () { var t = o.apply(this, arguments); var h = horse(); return h && typeof t === 'number' ? Math.max(1, Math.ceil(t * (1 - h.b))) : t; }; });
    hookGen();
  }
  function triPanel() {
    var mi = document.getElementById('mapi'); if (!mi || W.tab !== 'm') return;
    var m = typeof W.selM === 'number' ? W.selM : -1; if (m < 0 || m >= (W.RIFT_OFFSET || 1000) || !W.M[m]) return;
    var t = triOf(m); if (!t) return; var f = S().formation || 0, good = f - 1 === t.weak, bad = f && f - 1 === beats(t.st);
    var key = m + ':' + f, ex = mi.querySelector('.tri-row'); if (ex && ex.dataset.k === key) return; if (ex) ex.remove();
    var h = '<div class="tri-row' + (good ? ' good' : bad ? ' bad' : '') + '" data-k="' + key + '"><span><small>Zayıf</small><b>' + TT[t.weak] + '</b></span><span><small>Güçlü</small><b>' + TT[beats(t.st)] + '</b></span>' +
      '<button type="button" data-tri-set="' + (t.weak + 1) + '">' + (good ? '◆ ' + TT[t.weak] + ' öncü +%20' : '◇ ' + TT[t.weak] + ' öncü yap') + '</button></div>';
    var anchor = mi.querySelector('.tt-row') || mi.querySelector('.av-ms') || mi.querySelector('h3'); if (anchor) anchor.insertAdjacentHTML('afterend', h);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-tri-set]'); if (!b) return; ev.stopPropagation();
    try { W.setFormation(+b.dataset.triSet); } catch (e) { S().formation = +b.dataset.triSet; }
    var r = document.querySelector('.tri-row'); if (r) r.remove(); triPanel();
  }, true);
  function armyChips() {
    var bar = document.getElementById('ek-army'); if (!bar) return;
    var b = bar.querySelector('[data-ek-wf]'), f = weaponFit();
    if (!b) { b = document.createElement('div'); b.className = 'dn-chips'; b.setAttribute('data-ek-wf', '1'); bar.appendChild(b); }
    var hs = owned(), hf = fed(), h = '<span class="' + (f && f.on ? 'on' : '') + '" title="Silah uyumu">' + (f ? WI[f.t] : '⚔️') + (f && f.on ? ' ◆ +%3' : ' ◇') + '</span>' +
      SETS.map(function (st) { var n = setCount(st.r); return n ? '<button type="button" data-set="' + st.id + '" class="' + (n >= 2 ? 'on' : '') + '">' + st.e + ' ' + n + '/6</button>' : ''; }).join('') +
      '<button type="button" data-bn-open="1" class="' + (hs && hf ? 'on' : '') + '">' + (hs ? hs.e + (hf ? ' +%' + Math.round(hs.b * 100) : ' 🌾◇') : '🐎 ◇') + '</button>';
    if (b.__ekh !== h) { b.__ekh = h; b.innerHTML = h; }
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest && ev.target.closest('[data-set],[data-bn-open],[data-ekp="al"],[data-ekp="bn"]'); if (!t) return; ev.stopPropagation(); ev.preventDefault();
    if (t.dataset.set) openSet(t.dataset.set); else if (t.dataset.bnOpen || t.dataset.ekp === 'bn') openHorses(); else openAlbum();
  }, true);
  function heroWeapon() { // kahraman ekranında silah tamgası
    var kh = document.getElementById('ek-kh'); if (!kh || W.tab !== 'u') return;
    var det = kh.querySelector('.kh-det'), on = kh.querySelector('.kh-t.on'); if (!det || !on) return;
    var i = +on.dataset.kh, h = W.HH[i], t = h && HW[h.n]; if (!t) return;
    var w = S().ch && S().ch.eq && S().ch.eq.w, fit = w && wtype(w) === t, key = i + ':' + fit;
    var el = det.querySelector('.kh-wp'); if (el && el.dataset.k === key) return; if (el) el.remove();
    det.querySelector('h3').insertAdjacentHTML('afterend', '<div class="kh-wp' + (fit ? ' on' : '') + '" data-k="' + key + '">' + WI[t] + (fit ? ' ◆ +%3' : ' ◇') + '</div>');
  }

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 300) { l1 = now; try { triPanel(); armyChips(); heroWeapon(); } catch (e) {} }
    if (now - l2 > 3000) { l2 = now; try { hooks(); alScan(); } catch (e) {} }
  }
  function start() { if (!S() || !W.M || typeof W.cb !== 'function' || typeof W.mt !== 'function') { setTimeout(start, 400); return; } hooks(); alScan(); requestAnimationFrame(frame); }
  start();
  W.ergenekonDenge = { openAlbum: openAlbum, openHorses: openHorses, openSet: openSet, triOf: triOf, weaponFit: weaponFit, setPct: setPct, horse: horse, owned: owned, fed: fed, bestFor: bestFor };
})();
