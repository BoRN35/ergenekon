/* Ergenekon — Çanta: tüm değerli eşyalar tek yerde, her birinin kendi görseli. Claude, 18 Kasım 2026.
   Ekipman (kuşanılmış + çantadaki), Demirci malzemeleri, kaynak paketleri, yetenek kitapları,
   kahraman kartları ve Ustalık Tozu. Demirci aynı kutu/ızgarayı eşya seçici olarak kullanır. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekCanta) return; W.__ekCanta = true;

  var RCOL = ['#8a97a3', '#3fae6b', '#8b6cff', '#f0a033', '#ef4f42'];
  var RNAME = ['Sıradan', 'Nadir', 'Destansı', 'Efsanevi', 'Mitik'];
  var SLOTN = { w: 'Silah', b: 'Kafa', k: 'Kol', g: 'Göğüs', l: 'Alt', f: 'Ayak', e: 'Küpe', y: 'Yüzük', a: 'Kıyafet', t: 'Takı' };
  var EQK = { w: 'Silah', b: 'Kafa', k: 'Kol', g: 'Göğüs', l: 'Alt', f: 'Ayak', e0: 'Küpe 1', e1: 'Küpe 2', y0: 'Yüzük 1', y1: 'Yüzük 2' };
  // malzeme kademesi: Keçe/Taş/Bakır, Deri/Kemik/Gümüş, Kurt/Kam, Pul/Demir/Altın, Tengri/Börü/Ay-Yıldız
  var TINT = [
    { a: '#d8c49a', b: '#9c8458', m: '#b9a77f' },
    { a: '#b07a4a', b: '#6e4426', m: '#8c5a33' },
    { a: '#b8b4ad', b: '#6f6b66', m: '#8e8a84' },
    { a: '#c9d3dc', b: '#6f7c88', m: '#9eabb6' },
    { a: '#ffe08a', b: '#b8862a', m: '#e3b54f' }
  ];
  var n0 = 0;
  function uid() { return 'ci' + (n0++); }
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tierOf(x) { try { var l = W.IN && W.IN[x.s]; var i = l ? l.indexOf(x.n) : -1; return i < 0 ? Math.min(4, x.r || 0) : i; } catch (e) { return 0; } }

  /* ---------- ikonlar (SVG, 64×64) ---------- */
  function wrap(inner, defs) { return '<svg viewBox="0 0 64 64" aria-hidden="true" class="ci-svg"><defs>' + (defs || '') + '</defs>' + inner + '</svg>'; }
  function lg(id, a, b, x2, y2) { return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + (x2 == null ? 0 : x2) + '" y2="' + (y2 == null ? 1 : y2) + '"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient>'; }
  var OUT = ' stroke="#1b1108" stroke-width="1.6" stroke-linejoin="round"';
  function metal(id) { return lg(id, '#f4f7fa', '#7d8892', 1, 1); }
  function gold(id) { return lg(id, '#fff1b5', '#b8862a', 1, 1); }
  var EQ_ICON = {
    sword: function (t) { var a = uid(), g = uid(); return wrap('<path d="M45 8l7 0 0 7-24 24-7-7z" fill="url(#' + a + ')"' + OUT + '/><path d="M47 10L25 32" stroke="#fff" stroke-opacity=".7" stroke-width="1.2"/><path d="M15 34l15 15-4 4-15-15z" fill="url(#' + g + ')"' + OUT + '/><path d="M19 45l-8 8" stroke="#5a3a1e" stroke-width="5" stroke-linecap="round"/><circle cx="9" cy="55" r="3.6" fill="url(#' + g + ')"' + OUT + '/>', metal(a) + gold(g)); },
    bow: function (t) { var a = uid(); return wrap('<path d="M14 6c26 6 40 22 44 46" fill="none" stroke="url(#' + a + ')" stroke-width="6.5" stroke-linecap="round"/><path d="M14 6c26 6 40 22 44 46" fill="none" stroke="#1b1108" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="0" opacity=".55"/><path d="M14 6L58 52" stroke="#efe6cf" stroke-width="1.4"/><path d="M8 40L42 18" stroke="#7a5232" stroke-width="2.6" stroke-linecap="round"/><path d="M42 18l7-3-3 7z" fill="#cfd6dc"' + OUT + '/><path d="M8 40l-3 5 6-1z" fill="#c0392b"/>', lg(a, t.a, t.b, 1, 1)); },
    mace: function (t) { var a = uid(); return wrap('<path d="M14 54l20-20" stroke="#5a3a1e" stroke-width="5.5" stroke-linecap="round"/><circle cx="40" cy="24" r="12" fill="url(#' + a + ')"' + OUT + '/><path d="M40 8v6M54 24h-6M40 40v-6M26 24h6M50 14l-4 4M50 34l-4-4M30 14l4 4" stroke="#3a3f45" stroke-width="3.2" stroke-linecap="round"/>', metal(a)); },
    axe: function (t) { var a = uid(); return wrap('<path d="M14 56L40 14" stroke="#6b4626" stroke-width="5" stroke-linecap="round"/><path d="M34 10c10-4 22 2 24 14-8-2-14 2-17 8l-9-5c3-6 3-11 2-17z" fill="url(#' + a + ')"' + OUT + '/><path d="M38 12c6 0 12 4 15 9" stroke="#fff" stroke-opacity=".6" stroke-width="1.4" fill="none"/>', metal(a)); },
    spear: function (t) { var a = uid(); return wrap('<path d="M10 58L46 18" stroke="#6b4626" stroke-width="4.5" stroke-linecap="round"/><path d="M44 20l12-14-4 17-6 3z" fill="url(#' + a + ')"' + OUT + '/><path d="M41 22l5 5" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>', metal(a)); },
    b: function (t) { var a = uid(), f = uid(); return wrap('<path d="M12 40c0-17 9-28 20-28s20 11 20 28z" fill="url(#' + a + ')"' + OUT + '/><path d="M32 4l3 9h-6z" fill="url(#' + a + ')"' + OUT + '/><path d="M8 40h48v8c-8 4-40 4-48 0z" fill="url(#' + f + ')"' + OUT + '/><path d="M18 30c4-8 9-12 14-13" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M26 48v8M38 48v8" stroke="#1b1108" stroke-width="1.4"/>', lg(a, t.a, t.b) + lg(f, '#8a6a46', '#4a321c')); },
    k: function (t) { var a = uid(); return wrap('<path d="M16 14h32l4 36H12z" fill="url(#' + a + ')"' + OUT + '/><path d="M14 24h36M13 38h38" stroke="#4a321c" stroke-width="4"/><path d="M14 24h36M13 38h38" stroke="#d8b46a" stroke-width="1.4"/><circle cx="32" cy="31" r="3.4" fill="#e3b54f"' + OUT + '/><path d="M20 18l2 28" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>', lg(a, t.a, t.b, 1, 0)); },
    g: function (t) { var a = uid(); return wrap('<path d="M18 8l8 4h12l8-4 12 10-6 12-4-2v28H16V28l-4 2-6-12z" fill="url(#' + a + ')"' + OUT + '/><path d="M26 12c2 6 10 6 12 0" fill="none" stroke="#1b1108" stroke-width="1.6"/><path d="M20 30h24M20 39h24M20 48h24" stroke="#1b1108" stroke-opacity=".45" stroke-width="1.4"/><path d="M32 16v40" stroke="#e3b54f" stroke-width="2.2"/>', lg(a, t.a, t.b)); },
    l: function (t) { var a = uid(); return wrap('<path d="M16 8h32l2 46h-12l-6-30-6 30H14z" fill="url(#' + a + ')"' + OUT + '/><path d="M16 15h32" stroke="#4a321c" stroke-width="5"/><path d="M16 15h32" stroke="#d8b46a" stroke-width="1.5"/><path d="M20 22l-1 28M44 22l1 28" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>', lg(a, t.a, t.b)); },
    f: function (t) { var a = uid(); return wrap('<path d="M20 6h18v30l14 6c4 2 6 6 6 10v4H14l2-20z" fill="url(#' + a + ')"' + OUT + '/><path d="M14 56h44v4H14z" fill="#3a2614"' + OUT + '/><path d="M20 14h18" stroke="#4a321c" stroke-width="4"/><path d="M38 36l-4 6M44 39l-4 6" stroke="#1b1108" stroke-width="1.4"/>', lg(a, t.a, t.b)); },
    e: function (t) { var a = uid(), gm = uid(); return wrap('<path d="M32 6c-7 0-9 9-3 12" fill="none" stroke="url(#' + a + ')" stroke-width="3.2" stroke-linecap="round"/><circle cx="32" cy="22" r="4" fill="url(#' + a + ')"' + OUT + '/><path d="M32 26c-10 8-12 18-6 26 3 4 9 4 12 0 6-8 4-18-6-26z" fill="url(#' + gm + ')"' + OUT + '/><path d="M28 36c-2 4-2 8 0 11" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M40 12a8 8 0 1 0 4 10 6 6 0 1 1-4-10z" fill="url(#' + a + ')"' + OUT + '/>', gold(a) + lg(gm, '#ff9b8a', '#a11d2d', 1, 1)); },
    y: function (t) { var a = uid(), gm = uid(); return wrap('<ellipse cx="32" cy="40" rx="18" ry="16" fill="none" stroke="#1b1108" stroke-width="9"/><ellipse cx="32" cy="40" rx="18" ry="16" fill="none" stroke="url(#' + a + ')" stroke-width="6"/><path d="M22 20l10-12 10 12-10 8z" fill="url(#' + gm + ')"' + OUT + '/><path d="M26 19l6-7" stroke="#fff" stroke-opacity=".75" stroke-width="1.6"/>', lg(a, t.a, t.b, 1, 1) + lg(gm, '#9be7ff', '#1f6fb5', 1, 1)); }
  };
  function weaponKind(n) { n = n || ''; return /Yay/.test(n) ? 'bow' : /Gürz/.test(n) ? 'mace' : /Balta/.test(n) ? 'axe' : /Mızrak/.test(n) ? 'spear' : 'sword'; }
  function eqIcon(x) {
    var t = TINT[tierOf(x)] || TINT[0], s = x.s === 'a' ? 'g' : x.s === 't' ? 'e' : x.s;
    if (s === 'w') return EQ_ICON[weaponKind(x.n)](t);
    return (EQ_ICON[s] || EQ_ICON.g)(t);
  }
  var MAT_ICON = {
    kagit: function () { var a = uid(); return wrap('<path d="M14 14h34c4 0 6 3 6 6v26c0 3-2 6-6 6H18" fill="url(#' + a + ')"' + OUT + '/><rect x="8" y="10" width="12" height="44" rx="6" fill="#c9a96a"' + OUT + '/><rect x="44" y="10" width="12" height="44" rx="6" fill="#c9a96a"' + OUT + ' opacity=".0"/><path d="M24 22h22M24 29h22M24 36h16" stroke="#7a5a2e" stroke-width="2" stroke-linecap="round"/><path d="M40 42l4 8 4-8z" fill="#c0392b"' + OUT + '/><circle cx="44" cy="40" r="5" fill="#c0392b"' + OUT + '/><path d="M42 40h4M44 38v4" stroke="#ffd2c8" stroke-width="1.2"/>', lg(a, '#fff4d6', '#d8bf86')); },
    safir: function () { var a = uid(), b = uid(); return wrap('<path d="M32 6l20 14-6 30-14 8-14-8-6-30z" fill="url(#' + a + ')"' + OUT + '/><path d="M12 20h40M32 6l-8 14 8 38 8-38z" fill="none" stroke="#bfe6ff" stroke-opacity=".7" stroke-width="1.3"/><path d="M24 20l8 38" stroke="#0d2f66" stroke-opacity=".5" stroke-width="1.2"/><path d="M18 22l4 18" stroke="#fff" stroke-opacity=".8" stroke-width="2.4" stroke-linecap="round"/>', lg(a, '#7cc8ff', '#123f9a', 1, 1)); },
    opal: function () { var a = uid(), b = uid(); return wrap('<ellipse cx="32" cy="34" rx="20" ry="24" fill="url(#' + a + ')"' + OUT + '/><ellipse cx="32" cy="34" rx="20" ry="24" fill="url(#' + b + ')" opacity=".55"/><path d="M22 20c4-6 10-8 16-6" stroke="#fff" stroke-opacity=".85" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="38" cy="40" r="4" fill="#9ff0d8" opacity=".7"/><circle cx="26" cy="44" r="3" fill="#ffd27a" opacity=".7"/>', lg(a, '#f3e6ff', '#9a62d8', 1, 1) + lg(b, '#7ff0e0', '#ff7ac8', 0, 1)); }
  };
  var BOOKC = { a: '#c0392b', f: '#2d6db5', h: '#c2185b', x: '#1f8f7a', d: '#d68a1a', r: '#6d6e75' };
  function bookIcon(k) { var c = BOOKC[k] || '#8a5a2e', a = uid(); return wrap('<path d="M12 12h30c6 0 10 4 10 10v30H22c-6 0-10-4-10-10z" fill="url(#' + a + ')"' + OUT + '/><path d="M12 42c0-6 4-8 10-8h30" fill="none" stroke="#1b1108" stroke-width="1.6"/><path d="M14 46c0-3 3-5 8-5h28v8H22c-5 0-8-1-8-3z" fill="#f2e6c8"' + OUT + '/><circle cx="34" cy="22" r="6" fill="none" stroke="#f2d58e" stroke-width="2"/><path d="M34 16v12M28 22h12" stroke="#f2d58e" stroke-width="1.4"/>', lg(a, c, '#2a1406', 1, 1)); }
  function cardIcon(e) { var a = uid(); return wrap('<rect x="12" y="6" width="40" height="52" rx="5" fill="url(#' + a + ')"' + OUT + '/><rect x="16" y="10" width="32" height="44" rx="3" fill="none" stroke="#f2d58e" stroke-width="1.4"/><text x="32" y="40" font-size="22" text-anchor="middle">' + e + '</text><path d="M24 50a6 6 0 1 0 8 0 5 5 0 1 1-8 0z" fill="#f2d58e"/>', lg(a, '#7b2f22', '#2a0f0a', 1, 1)); }
  function dustIcon() { var a = uid(); return wrap('<path d="M10 50c6-10 14-14 22-14s16 4 22 14z" fill="url(#' + a + ')"' + OUT + '/><circle cx="22" cy="24" r="3" fill="#ffe08a"/><circle cx="36" cy="16" r="2.4" fill="#fff4c8"/><circle cx="44" cy="28" r="2" fill="#ffe08a"/><path d="M30 26l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#fff4c8"/>', lg(a, '#ffd36a', '#9a5a10', 1, 1)); }
  function packIcon(r, t) {
    var col = { g: ['#5fbf5a', '#2c7a34'], b: ['#5aa6e0', '#2a5f9c'], p: ['#a77be0', '#5b3796'] }[t] || ['#888', '#444'], a = uid();
    var rs = ''; try { rs = W.ergenekonEk.rsvg(r, 30).replace('<svg ', '<svg x="17" y="4" '); } catch (e) {}
    return wrap('<path d="M8 30h48v24H8z" fill="url(#' + a + ')"' + OUT + '/><path d="M8 30c0-8 6-12 12-12h24c6 0 12 4 12 12z" fill="url(#' + a + ')"' + OUT + ' opacity=".85"/><path d="M8 34h48" stroke="#1b1108" stroke-width="1.6"/><rect x="28" y="30" width="8" height="10" rx="1.5" fill="#f2d58e"' + OUT + '/>' + rs, lg(a, col[0], col[1]));
  }
  W.ekIcon = { eq: eqIcon, mat: function (k) { return MAT_ICON[k](); }, book: bookIcon, card: cardIcon, dust: dustIcon, pack: packIcon };

  /* ---------- eşya listesi ---------- */
  var MATN = { kagit: 'Yükseltme Kağıdı', safir: 'Safir', opal: 'Opal' }, MATR = { kagit: 1, safir: 2, opal: 3 };
  function items() {
    var s = S(), out = []; if (!s) return out;
    var eq = (s.ch && s.ch.eq) || {};
    Object.keys(EQK).forEach(function (k) { var x = eq[k]; if (x) out.push({ id: 'q:' + k, cat: 'eq', x: x, slot: k, worn: true, r: x.r || 0 }); });
    ((s.ch && s.ch.inv) || []).forEach(function (x, i) { out.push({ id: 'i:' + i, cat: 'eq', x: x, inv: i, r: x.r || 0 }); });
    var dm = s.ek && s.ek.dm && s.ek.dm.mat || {};
    Object.keys(MATN).forEach(function (k) { if (dm[k] > 0) out.push({ id: 'm:' + k, cat: 'mat', mat: k, n: dm[k], r: MATR[k] }); });
    var pk = s.ek && s.ek.pk;
    if (pk) ['p', 'b', 'g'].forEach(function (t) { Object.keys(pk).forEach(function (r) { var n = pk[r] && pk[r][t]; if (n > 0) out.push({ id: 'p:' + r + ':' + t, cat: 'res', res: r, tier: t, n: n, r: { g: 1, b: 2, p: 3 }[t] }); }); });
    var bk = s.bk || {};
    (W.TL || []).forEach(function (tl) { if (bk[tl[0]] > 0) out.push({ id: 'b:' + tl[0], cat: 'oth', book: tl[0], name: tl[1], desc: tl[2], n: bk[tl[0]], r: 2 }); });
    (s.hc || []).forEach(function (n, i) { var h = W.HH && W.HH[i]; if (n > 0 && h) out.push({ id: 'h:' + i, cat: 'oth', hero: i, h: h, n: n, r: 3 }); });
    if (s.ud > 0) out.push({ id: 'd', cat: 'oth', dust: true, n: s.ud, r: 1 });
    return out;
  }
  function iconOf(it) {
    if (it.cat === 'eq') return eqIcon(it.x);
    if (it.cat === 'mat') return MAT_ICON[it.mat]();
    if (it.cat === 'res') return packIcon(it.res, it.tier);
    if (it.book) return bookIcon(it.book);
    if (it.h) return cardIcon(it.h.e);
    return dustIcon();
  }
  function glowClass(it) {
    if (it.cat !== 'eq') return it.r >= 3 ? ' gl1' : '';
    var p = it.x.p || 0, r = it.x.r || 0, g = p >= 11 ? 3 : p >= 8 ? 2 : p >= 5 ? 1 : 0;
    if (r >= 3) g = Math.max(g, 1); if (r >= 4 && p >= 5) g = Math.max(g, 2);
    return g ? ' gl' + g : '';
  }
  function tileHtml(it, opts) {
    opts = opts || {};
    var col = RCOL[Math.min(4, it.r || 0)], badge = '';
    if (it.cat === 'eq') badge = ((it.x.p || 0) > 0 ? '<b class="ci-plus' + ((it.x.p || 0) >= 8 ? ' hi' : '') + '">+' + it.x.p + '</b>' : '') + (it.worn && !opts.doll ? '<i class="ci-worn" title="Kuşanılmış">✓</i>' : '');
    else if (it.cat === 'res') badge = '<b class="ci-amt">' + nf(W.ergenekonEk ? W.ergenekonEk.packAmount(it.res, it.tier) : 0) + '</b><span class="ci-n">' + nf(it.n) + '</span>';
    else badge = '<span class="ci-n">' + nf(it.n) + '</span>';
    var cls = 'ci-tile r' + Math.min(4, it.r || 0) + glowClass(it) + (opts.on ? ' on' : '');
    if (it.cat === 'eq' && it.id !== 'nx' && W.ergenekonDemirci && W.ergenekonDemirci.canEnhance(it.id)) { cls += ' ci-up'; badge += '<i class="ci-upbar"></i>'; }
    if (opts.dis) return '<div class="' + cls + ' ci-static" style="--rc:' + col + '">' + iconOf(it) + badge + '</div>';
    return '<button type="button" class="' + cls + '" data-ci="' + it.id + '" style="--rc:' + col + '">' + iconOf(it) + badge + '</button>';
  }
  // boş kuşanma yuvası silueti
  function ghost(slot) {
    var s = slot.replace(/\d/, ''), base = { s: s === 'w' ? 'w' : s, n: s === 'w' ? 'Demir Kılıç' : '', r: 0 };
    return '<div class="ci-tile ci-ghost" title="' + EQK[slot] + '">' + eqIcon(base) + '</div>';
  }
  var DOLL = [['e0', 'b', 'e1'], ['y0', 'g', 'k'], ['w', 'l', 'y1'], [null, 'f', null]];
  function dollHtml(selId) {
    var eq = (S() && S().ch && S().ch.eq) || {};
    return '<div class="ci-doll">' + DOLL.map(function (row) {
      return row.map(function (k) {
        if (!k) return '<div class="ci-dempty"></div>';
        var x = eq[k];
        return x ? tileHtml({ id: 'q:' + k, cat: 'eq', x: x, worn: true, r: x.r || 0 }, { on: selId === 'q:' + k, doll: true }) : ghost(k);
      }).join('');
    }).join('') + '</div>';
  }
  W.ekDollHtml = dollHtml;
  W.ekTileHtml = tileHtml; W.ekItems = items;

  /* ---------- Çanta penceresi ---------- */
  var UI = { tab: 'all', sel: null };
  var TABS = [['all', 'Tümü'], ['eq', 'Ekipman'], ['mat', 'Malzeme'], ['res', 'Kaynak'], ['oth', 'Diğer']];
  function statLine(x) { try { var sl = W.SL[x.s]; return (sl ? sl[1] : '') + ' <b>+' + nf(W.ev(x)) + '</b>'; } catch (e) { return ''; } }
  function detailHtml(it) {
    if (!it) return '<div class="ci-det ci-empty">Bir eşyaya dokun.</div>';
    var h = '<div class="ci-det"><div class="ci-dhead"><span class="ci-big" style="--rc:' + RCOL[Math.min(4, it.r || 0)] + '">' + iconOf(it) + (it.cat === 'eq' ? '<b class="ci-plus' + ((it.x.p || 0) >= 8 ? ' hi' : '') + '">+' + (it.x.p || 0) + '</b>' : '') + '</span><div>';
    var acts = '';
    if (it.cat === 'eq') {
      var x = it.x;
      h += '<h3 style="color:' + RCOL[Math.min(4, x.r || 0)] + '">' + esc(x.n) + ' +' + (x.p || 0) + '</h3><p>' + (RNAME[x.r || 0] || '') + ' · ' + (SLOTN[x.s] || '') + ' · Sv ' + (x.L || 1) + (it.worn ? ' · <em>Kuşanılmış</em>' : '') + '</p><p>' + statLine(x) + '</p>';
      if (!it.worn) acts += '<button type="button" class="ek-btn" data-ci-act="eq">Kuşan</button><button type="button" class="ek-btn" data-ci-act="melt">Erit</button>';
      acts += '<button type="button" class="ek-btn gold" data-ci-act="forge">⚒️ Bas</button>';
    } else if (it.cat === 'mat') {
      h += '<h3>' + MATN[it.mat] + '</h3><p>Elinde <b>' + nf(it.n) + '</b></p><p class="ci-hint">Demirci’de eşya basmak için kullanılır. Canavarlardan düşer.</p>';
      acts += '<button type="button" class="ek-btn gold" data-ci-act="forge">⚒️ Demirci’ye git</button>';
    } else if (it.cat === 'res') {
      var amt = W.ergenekonEk.packAmount(it.res, it.tier), s = S(), room = W.ergenekonEk.capOf(it.res) - ((s.r && s.r[it.res]) || 0), all = Math.max(0, Math.min(it.n, Math.floor(room / amt)));
      h += '<h3>' + esc(W.ergenekonEk.packName(it.res, it.tier)) + '</h3><p>Elinde <b>' + nf(it.n) + '</b> · açınca +' + nf(amt) + '</p>' + (room < amt ? '<p class="ci-warn">Depo dolu.</p>' : '');
      acts += '<button type="button" class="ek-btn" data-ci-act="use1"' + (room < amt ? ' disabled' : '') + '>Kullan</button><button type="button" class="ek-btn gold" data-ci-act="useall"' + (all < 1 ? ' disabled' : '') + '>Hepsini kullan' + (all > 1 ? ' (' + all + ')' : '') + '</button>';
    } else if (it.book) {
      h += '<h3>' + esc(it.name) + ' kitabı</h3><p>Elinde <b>' + nf(it.n) + '</b></p><p class="ci-hint">' + esc(it.desc) + ' yeteneğini yükseltir.</p>';
    } else if (it.h) {
      h += '<h3>' + esc(it.h.n) + ' kartı</h3><p>Elinde <b>' + nf(it.n) + '</b></p><p class="ci-hint">' + esc(it.h.t) + ' · Kahramanlar sayfasında yıldız yüceltmede kullanılır.</p>';
    } else {
      h += '<h3>Ustalık Tozu</h3><p>Elinde <b>' + nf(it.n) + '</b></p><p class="ci-hint">Eşya eritince kazanılır; Puan Marketi’nde harcanır.</p>';
    }
    return h + '</div></div>' + (acts ? '<div class="ci-acts">' + acts + '</div>' : '') + '</div>';
  }
  var SORT = 0;
  function sortList(l) {
    if (!SORT) return l;
    return l.slice().sort(function (a, b) { return (b.r || 0) - (a.r || 0) || ((b.x && b.x.p) || 0) - ((a.x && a.x.p) || 0); });
  }
  function cantaHtml() {
    var all = items(), bag = all.filter(function (it) { return !it.worn; });
    var list = sortList(UI.tab === 'all' ? bag : bag.filter(function (it) { return it.cat === UI.tab; }));
    var sel = all.filter(function (it) { return it.id === UI.sel; })[0] || null;
    var tabs = TABS.map(function (t) { return '<button type="button" data-ci-tab="' + t[0] + '" class="' + (UI.tab === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('');
    var slots = Math.max(40, Math.ceil((list.length + 4) / 8) * 8), cells = list.map(function (it) { return tileHtml(it, { on: sel && sel.id === it.id }); });
    for (var i = list.length; i < slots; i++) cells.push('<div class="ci-tile ci-slot"></div>');
    return '<div class="ek-modal ci-modal ci-kadim" role="dialog" aria-modal="true" aria-label="Çanta">' +
      '<div class="ek-mh"><span class="ek-cap">ALPİN HEYBESİ</span><h2>Çanta</h2><button type="button" class="ek-x" data-ci-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="ci-body"><div class="ci-left"><div class="ci-sec">KUŞANILMIŞ</div>' + dollHtml(UI.sel) + '<div class="ci-detwrap">' + detailHtml(sel) + '</div></div>' +
      '<div class="ci-right"><div class="ci-bar"><div class="ek-tabs ci-tabs">' + tabs + '</div><button type="button" class="ci-sort' + (SORT ? ' on' : '') + '" data-ci-sort="1">⇅ Sırala</button></div>' +
      '<div class="ci-grid ci-g8">' + cells.join('') + '</div><div class="ci-foot"><span>' + bag.length + ' eşya</span><button type="button" class="ci-forge" data-ci-act="forge">⚒️ Demirci</button></div></div></div></div>';
  }
  function find(id) { return items().filter(function (it) { return it.id === id; })[0]; }
  function refresh() { var o = document.getElementById('ek-canta'); if (o) o.innerHTML = cantaHtml(); }
  function act(a) {
    var it = find(UI.sel); if (!it && a === 'forge') { var o0 = document.getElementById('ek-canta'); if (o0) o0.remove(); if (W.openDemirci) W.openDemirci('bas'); return; } if (!it) return;
    try {
      if (a === 'eq' && it.cat === 'eq' && !it.worn) { W.eq(it.inv); UI.sel = null; }
      else if (a === 'melt' && it.cat === 'eq' && !it.worn) { W.sell(it.inv); UI.sel = null; }
      else if (a === 'forge') { var o = document.getElementById('ek-canta'); if (o) o.remove(); if (W.openDemirci) W.openDemirci('bas', it.cat === 'eq' ? it.id : null); return; }
      else if ((a === 'use1' || a === 'useall') && it.cat === 'res') { W.ergenekonEk.usePack(it.res, it.tier, a === 'useall'); }
    } catch (e) {}
    try { W.save(); } catch (e) {}
    refresh();
  }
  function openCanta(tab) {
    if (tab) UI.tab = tab;
    var o = document.getElementById('ek-canta');
    if (!o) {
      o = document.createElement('div'); o.id = 'ek-canta'; o.className = 'ek-ov ek-sheet'; document.body.appendChild(o);
      o.addEventListener('click', function (ev) {
        var t = ev.target, b;
        if (t === o || t.closest('[data-ci-close]')) { o.remove(); return; }
        if ((b = t.closest('[data-ci-tab]'))) { UI.tab = b.getAttribute('data-ci-tab'); refresh(); return; }
        if (t.closest('[data-ci-sort]')) { SORT = SORT ? 0 : 1; refresh(); return; }
        if ((b = t.closest('[data-ci]'))) { UI.sel = b.getAttribute('data-ci'); refresh(); return; }
        if ((b = t.closest('[data-ci-act]')) && !b.disabled) act(b.getAttribute('data-ci-act'));
      });
    }
    o.innerHTML = cantaHtml();
  }
  W.openCanta = openCanta;

  /* ---------- seçici (Demirci için aynı ızgara) ---------- */
  W.ekPickItem = function (opts, cb) {
    var list = items().filter(opts.filter || function () { return true; });
    var o = document.createElement('div'); o.id = 'ek-pick'; o.className = 'ek-ov ek-sheet';
    o.innerHTML = '<div class="ek-modal ci-modal" role="dialog" aria-modal="true" aria-label="Eşya seç"><div class="ek-mh"><span class="ek-cap">ÇANTA</span><h2>' + esc(opts.title || 'Eşya seç') + '</h2><button type="button" class="ek-x" data-ci-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="ci-grid">' + (list.length ? list.map(function (it) { return tileHtml(it, { on: it.id === opts.sel }); }).join('') : '<div class="ci-none">Uygun eşya yok.</div>') + '</div></div>';
    document.body.appendChild(o);
    o.addEventListener('click', function (ev) {
      var t = ev.target, b;
      if (t === o || t.closest('[data-ci-close]')) { o.remove(); return; }
      if ((b = t.closest('[data-ci]'))) { o.remove(); cb(b.getAttribute('data-ci')); }
    });
  };
})();
