/* Ergenekon yeni — görsel çözücü.
   ChatGPT'den gelen yeni görseller img/ altına GORSEL-LISTESI.md'deki adla (.webp) konur ve YENI listesine eklenir.
   Yeni görsel yoksa eski oyunun görseli, o da yoksa çizim yer tutucusu kullanılır. */
(function (W) {
  'use strict';
  var YENI = []; // ör. 'bina_ocak_1', 'sehir_zemin'
  var has = {}; YENI.forEach(function (n) { has[n] = 1; });
  var OLD = '../assets/img/';
  var G = W.G = {};
  G.yeni = function (n) { return has[n] ? 'img/' + n + '.webp' : null; };
  var TIERS = [1, 5, 10, 15, 20, 25, 30, 35, 40];
  function tierOf(lv) { var t = 1; TIERS.forEach(function (x) { if (lv >= x) t = x; }); return t; }
  G.tierOf = tierOf;
  var OLDB = { ocak: 1, yurt: 1, odunluk: 1, avci: 1, demirci: 1, sifa: 1, kisla: 1, sur: 1, ambar: 1, gozcu: 1 };
  G.bina = function (k, lv) {
    lv = Math.max(1, lv || 1);
    for (var i = TIERS.indexOf(tierOf(lv)); i >= 0; i--) { var y = G.yeni('bina_' + k + '_' + TIERS[i]); if (y) return y; }
    // Geçici: gerçekçi 3D önizlemeler (eski Tripo çıktıları)
    if (k === 'ocak') return '../assets/ocak-previews/ocak-sv' + tierOf(lv) + '.webp';
    if (OLDB[k]) return '../assets/building-previews/' + k + '-sv' + (lv >= 5 ? 5 : 1) + '.webp';
    if (k === 'oba') return OLD + 'kale_' + Math.min(5, 1 + Math.floor(lv / 8)) + '.webp';
    return null;
  };
  var PLACE_OLD = { kurultay: 'dekor_cadir', tug: 'dekor_bayrak_kirmizi', agil: 'pet_bozkurt_yavrusu', hazine: 'sandik', arena: 'npc_alper' };
  G.yer = function (k) { return G.yeni('yer_' + k) || (PLACE_OLD[k] ? OLD + PLACE_OLD[k] + '.webp' : null); };
  G.canavar = function (base) { var n = 'canavar_' + (base < 9 ? '0' : '') + (base + 1); return G.yeni(n) || (base <= 12 ? OLD + n + '.webp' : null); };
  G.kahraman = function (k) { return G.yeni('kahraman_' + k) || OLD + 'kahraman_' + k + '.webp'; };
  G.kurt = function (lv) { var st = lv >= 10 ? 4 : lv >= 7 ? 3 : lv >= 4 ? 2 : 1; for (var i = st; i >= 1; i--) { var y = G.yeni('kurt_' + i); if (y) return y; } return OLD + 'pet_bozkurt_yavrusu.webp'; };
  G.alp = function () { return OLD + 'alp.webp'; };
  G.zemin = function () { return G.yeni('sehir_zemin'); };
  G.maden = function (t) { return G.yeni('maden_' + t) || (t !== 'komur' ? OLD + 'maden_' + t + '.webp' : null); };
  G.oba = function (lv) { var i = Math.min(5, 1 + Math.floor(lv / 8)); return G.yeni('harita_oba_' + i) || OLD + 'kale_' + i + '.webp'; };
  G.esya = function (s) { var m = { w: 'silah', b: 'kafa', k: 'kol', g: 'govde', l: 'alt', f: 'ayak', e: 'kupe', y: 'yuzuk' }[s]; return G.yeni('esya_' + m) || OLD + 'esya_' + m + '.webp'; };

  /* ---- simgeler: yeni görsel > eski görsel > çizim ---- */
  var ICO_OLD = { odun: 'ikon_odun', et: 'ikon_et', demir: 'ikon_demir', enerji: 'ikon_enerji', guc: 'ikon_guc', toz: 'tuketim_toz', kitap: 'tuketim_kitap', guvec: 'tuketim_guvec' };
  var SVG = {
    komur: '<svg viewBox="0 0 40 40"><path d="M6 30l6-12 7 4 5-9 10 17z" fill="#2b2b30" stroke="#8d8a85" stroke-width="1.5"/><path d="M12 18l3 6M24 13l2 9" stroke="#55555c" stroke-width="2"/></svg>',
    celik: '<svg viewBox="0 0 40 40"><path d="M5 26l15-7 15 7-15 7z" fill="#b9c3cc" stroke="#5d6973" stroke-width="1.5"/><path d="M5 20l15-7 15 7-15 7z" fill="#d6dee5" stroke="#5d6973" stroke-width="1.5"/></svg>',
    kor: '<svg viewBox="0 0 40 40"><path d="M20 4l9 14-9 18-9-18z" fill="#ff9a3c" stroke="#a5480e" stroke-width="1.5"/><path d="M20 4v32M11 18h18" stroke="#ffd58a" stroke-width="1"/></svg>',
    kagit: '<svg viewBox="0 0 40 40"><rect x="9" y="6" width="22" height="28" rx="3" fill="#f2e3bf" stroke="#8a6330" stroke-width="1.5"/><path d="M13 13h14M13 18h14M13 23h9" stroke="#a7834e" stroke-width="1.5"/><circle cx="27" cy="29" r="5" fill="#b3261e"/></svg>',
    safir: '<svg viewBox="0 0 40 40"><path d="M8 15l6-7h12l6 7-12 18z" fill="#3a78e0" stroke="#173f86" stroke-width="1.5"/><path d="M8 15h24M14 8l6 25 6-25" stroke="#9cc3ff" stroke-width="1"/></svg>',
    opal: '<svg viewBox="0 0 40 40"><ellipse cx="20" cy="21" rx="12" ry="14" fill="#d9f2ee" stroke="#6f8c99" stroke-width="1.5"/><path d="M12 18c5-5 11 3 16-3M13 26c6-4 9 2 14-2" stroke="#e892d8" stroke-width="2" fill="none"/></svg>',
    kart: '<svg viewBox="0 0 40 40"><rect x="9" y="5" width="22" height="30" rx="3" fill="#7a2a1c" stroke="#e8c66a" stroke-width="2"/><path d="M20 12l5 8-5 8-5-8z" fill="#e8c66a"/></svg>',
    xp: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="#3b2a57" stroke="#c9a2ff" stroke-width="2"/><path d="M13 20h14M20 13v14" stroke="#e9d7ff" stroke-width="3"/></svg>',
    parca: '<svg viewBox="0 0 40 40"><path d="M10 8h20v24l-10-6-10 6z" fill="#2f5d73" stroke="#9fd8e8" stroke-width="1.5"/></svg>',
    tamga: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#6b5a45" stroke="#e8c66a" stroke-width="2"/><path d="M20 9v22M12 15c4 3 12 3 16 0M14 27h12" stroke="#f3e6c8" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
    hilal: '<svg viewBox="0 0 40 40"><path d="M27 6a15 15 0 1 0 0 28a12 12 0 1 1 0-28z" fill="#f2c94c" stroke="#9a6b12" stroke-width="1.5"/></svg>',
    kilit: '<svg viewBox="0 0 40 40"><path d="M13 18v-5a7 7 0 0 1 14 0v5" stroke="#c8a25a" stroke-width="3.4" fill="none"/><rect x="9" y="17" width="22" height="17" rx="3" fill="#8a5a25" stroke="#e8c66a" stroke-width="1.6"/><path d="M22 23a3 3 0 1 0 0 5a2.4 2.4 0 1 1 0-5z" fill="#2b1704"/></svg>',
    cekic: '<svg viewBox="0 0 40 40"><path d="M9 12l9-5 4 7-9 5z" fill="#b8c1c9" stroke="#3b444d" stroke-width="1.5"/><path d="M17 16l12 17" stroke="#8a5a25" stroke-width="4" stroke-linecap="round"/></svg>',
    ilim: '<svg viewBox="0 0 40 40"><path d="M6 11c6-3 10-2 14 1v21c-4-3-8-4-14-1z" fill="#f2e3bf" stroke="#8a6330" stroke-width="1.5"/><path d="M34 11c-6-3-10-2-14 1v21c4-3 8-4 14-1z" fill="#e6d0a0" stroke="#8a6330" stroke-width="1.5"/><path d="M30 4l-6 14" stroke="#3b2a1a" stroke-width="2"/></svg>',
    migfer: '<svg viewBox="0 0 40 40"><path d="M8 24c0-10 5-17 12-17s12 7 12 17v6H8z" fill="#aab3bb" stroke="#3b444d" stroke-width="1.5"/><path d="M20 7v-3M13 22h14M20 22v8" stroke="#3b444d" stroke-width="2"/></svg>',
    gorev: '<svg viewBox="0 0 40 40"><path d="M9 7h18a4 4 0 0 1 4 4v22H13a4 4 0 0 1-4-4z" fill="#f2e3bf" stroke="#8a6330" stroke-width="1.6"/><path d="M14 14h12M14 19h12M14 24h8" stroke="#a7834e" stroke-width="1.6"/><path d="M28 4l4 4-10 10-5 1 1-5z" fill="#c0392b"/></svg>',
    yardim: '<svg viewBox="0 0 40 40"><path d="M5 22l8-7 7 4 7-4 8 7-9 8-6-3-6 3z" fill="#c9a25a" stroke="#5d3c12" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    topla: '<svg viewBox="0 0 40 40"><path d="M10 15c0-4 20-4 20 0l4 15c0 5-28 5-28 0z" fill="#b5864a" stroke="#5d3c12" stroke-width="1.6"/><path d="M14 13c2-6 10-6 12 0" stroke="#5d3c12" stroke-width="2" fill="none"/><path d="M15 9l3-5 3 5M22 9l4-4 1 5" stroke="#7aa63f" stroke-width="2" fill="none"/></svg>',
    kahraman: '<svg viewBox="0 0 40 40"><path d="M10 26c0-11 4-18 10-18s10 7 10 18l-3 6H13z" fill="#aab3bb" stroke="#3b444d" stroke-width="1.5"/><path d="M20 8c1-4 6-5 9-3-3 1-5 3-6 6" fill="#c0392b"/><path d="M14 22h12" stroke="#3b444d" stroke-width="2"/></svg>',
    canta: '<svg viewBox="0 0 40 40"><path d="M8 15h24l-2 18H10z" fill="#9a5a2a" stroke="#4a2a10" stroke-width="1.6"/><path d="M14 15c0-6 12-6 12 0" stroke="#4a2a10" stroke-width="2.4" fill="none"/><rect x="17" y="19" width="6" height="5" fill="#e8c66a"/></svg>',
    posta: '<svg viewBox="0 0 40 40"><rect x="6" y="10" width="28" height="20" rx="2" fill="#f2e3bf" stroke="#8a6330" stroke-width="1.6"/><path d="M6 11l14 11 14-11" stroke="#8a6330" stroke-width="1.6" fill="none"/><circle cx="20" cy="24" r="4" fill="#b3261e"/></svg>',
    boy: '<svg viewBox="0 0 40 40"><path d="M20 4l13 5v10c0 9-6 14-13 17C13 33 7 28 7 19V9z" fill="#7a2a1c" stroke="#e8c66a" stroke-width="1.8"/><path d="M13 17l3-4 4 3 4-3 3 4-2 6-5 3-5-3z" fill="#d7d9dc"/></svg>',
    dunya: '<svg viewBox="0 0 40 40"><path d="M6 9l9-3 10 3 9-3v25l-9 3-10-3-9 3z" fill="#e9d6a8" stroke="#6b4a1e" stroke-width="1.6"/><path d="M15 6v25M25 9v25" stroke="#6b4a1e" stroke-width="1.2"/><path d="M10 20c4-4 8 4 12-1s6 1 8 0" stroke="#3f8a5a" stroke-width="2" fill="none"/></svg>',
    sehir: '<svg viewBox="0 0 40 40"><path d="M6 24c2-8 8-12 14-12s12 4 14 12z" fill="#efe6d2" stroke="#6b4a1e" stroke-width="1.6"/><rect x="6" y="24" width="28" height="9" fill="#d9cdb2" stroke="#6b4a1e" stroke-width="1.6"/><rect x="17" y="25" width="6" height="8" fill="#9a3a22"/><path d="M20 12V5" stroke="#6b4a1e" stroke-width="2"/></svg>',
    kurt: '<svg viewBox="0 0 40 40"><path d="M8 8l6 7h12l6-7-1 12-3 10-8 5-8-5-3-10z" fill="#7f8a94" stroke="#2c3238" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16" cy="20" r="1.8" fill="#9fe3ff"/><circle cx="24" cy="20" r="1.8" fill="#9fe3ff"/><path d="M18 27h4l-2 2z" fill="#2c3238"/></svg>',
    kuyu: '<svg viewBox="0 0 40 40"><path d="M8 14l12-8 12 8" stroke="#6b4a1e" stroke-width="3" fill="none"/><path d="M11 14v8M29 14v8" stroke="#6b4a1e" stroke-width="2.4"/><rect x="8" y="22" width="24" height="12" rx="2" fill="#9aa1a6" stroke="#4a4f53" stroke-width="1.6"/><path d="M8 27h24" stroke="#4a4f53"/></svg>',
    tug: '<svg viewBox="0 0 40 40"><path d="M20 10v26" stroke="#6b4a1e" stroke-width="3"/><path d="M25 4a7 7 0 1 0 0 10a5.5 5.5 0 1 1 0-10z" fill="#f2c94c"/><path d="M20 13c-3 4-4 10-2 15M20 13c3 4 4 10 2 15" stroke="#1f1a17" stroke-width="3" fill="none"/></svg>',
    ayar: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="7" fill="none" stroke="#c9a25a" stroke-width="4"/><path d="M20 5v6M20 29v6M5 20h6M29 20h6M9 9l4 4M27 27l4 4M9 31l4-4M27 13l4-4" stroke="#c9a25a" stroke-width="4" stroke-linecap="round"/></svg>',
    sandik: '<svg viewBox="0 0 40 40"><path d="M6 17c0-6 28-6 28 0v15H6z" fill="#8a5a25" stroke="#3b2410" stroke-width="1.6"/><path d="M6 19h28M14 15v17M26 15v17" stroke="#e8c66a" stroke-width="2.2"/><rect x="17" y="20" width="6" height="6" fill="#e8c66a"/></svg>',
    kumsaati: '<svg viewBox="0 0 40 40"><path d="M11 5h18M11 35h18" stroke="#8a5a25" stroke-width="3"/><path d="M13 6c0 9 14 9 14 14S13 25 13 34h14c0-9-14-9-14-14s14-5 14-14z" fill="#f2e3bf" stroke="#8a5a25" stroke-width="1.6"/><path d="M15 31h10l-5-6z" fill="#d9a74a"/></svg>',
    iksir: '<svg viewBox="0 0 40 40"><path d="M16 5h8v8l7 14a5 5 0 0 1-4 7H13a5 5 0 0 1-4-7l7-14z" fill="#5fd0d8" stroke="#1e5a60" stroke-width="1.6"/><path d="M14 5h12" stroke="#1e5a60" stroke-width="3"/></svg>'
  };
  G.ico = function (k, size) {
    size = size || 24; var y = G.yeni('ikon_' + k) || G.yeni('menu_' + k);
    if (y) return '<img class="ik" src="' + y + '" width="' + size + '" height="' + size + '" alt="">';
    if (ICO_OLD[k]) return '<img class="ik" src="' + OLD + ICO_OLD[k] + '.webp" width="' + size + '" height="' + size + '" alt="">';
    if (SVG[k]) return '<span class="ik" style="width:' + size + 'px;height:' + size + 'px">' + SVG[k] + '</span>';
    return '<span class="ik">·</span>';
  };
})(window);
