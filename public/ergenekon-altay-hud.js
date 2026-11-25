/* Ergenekon — Altay ön arayüzü (King of Altay düzeni). Claude, 23 Kasım 2026.
   Alt şerit: Kahramanlar · Çanta · Posta · Boy + büyük Dünya düğmesi. Obada: bölüm görevi ve sohbet şeridi,
   solda boştaki işler (usta · ilim · eğitim · oba işi), sağda Görevler/Etkinlik/Ayarlar ve Yardım et / Tümünü topla.
   Yalnız gezinme ve görünüş; oyun mantığı mevcut işlevlerle çalışır, kayıt yapısı değişmez. */
(function () {
  'use strict';
  var W = window, D = document, H = D.documentElement;
  if (W.__ekHud) return; W.__ekHud = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + 'sn'; } }
  function rer() { try { W.render(); } catch (e) {} }
  function tabGo(t) { var b = D.querySelector('#tabs [data-t="' + t + '"]'); if (b) b.click(); else { W.tab = t; rer(); } }
  function closeOv() { D.querySelectorAll('.ek-ov').forEach(function (o) { o.remove(); }); var x = D.querySelector('#ek-npcbar:not([hidden]) .nb-x'); if (x) x.click(); }
  // KoA tarzı simgeler (dolgu + altın kontur)
  var I = {
    kahraman: '<svg viewBox="0 0 48 48"><path d="M12 30c0-13 5-21 12-21s12 8 12 21l-3 8H15z" fill="#b9c2ca" stroke="#3a2a14" stroke-width="2"/><path d="M24 9c2-6 9-7 13-4-4 1-7 4-8 8" fill="#c0392b" stroke="#5a1a10" stroke-width="1.5"/><path d="M16 26h16M24 26v12" stroke="#3a2a14" stroke-width="2.4"/><path d="M15 38h18l2 4H13z" fill="#d6a640" stroke="#5a3a10" stroke-width="1.5"/></svg>',
    canta: '<svg viewBox="0 0 48 48"><path d="M9 18h30l-3 24H12z" fill="#b5652a" stroke="#4a2410" stroke-width="2"/><path d="M17 18c0-8 14-8 14 0" fill="none" stroke="#4a2410" stroke-width="3"/><path d="M9 18h30v6H9z" fill="#8a4a1c" stroke="#4a2410" stroke-width="2"/><rect x="20" y="24" width="8" height="7" rx="1.5" fill="#e8c66a" stroke="#5a3a10" stroke-width="1.5"/></svg>',
    posta: '<svg viewBox="0 0 48 48"><path d="M7 14h34v24H7z" fill="#f2e3bf" stroke="#6b4a1e" stroke-width="2"/><path d="M7 15l17 13 17-13" fill="none" stroke="#6b4a1e" stroke-width="2"/><circle cx="24" cy="28" r="5" fill="#b8281c" stroke="#5a1a10" stroke-width="1.5"/><path d="M33 6l8 2-6 14-4-2z" fill="#f4f0e6" stroke="#6b5a40" stroke-width="1.5"/></svg>',
    boy: '<svg viewBox="0 0 48 48"><path d="M24 5l16 6v12c0 11-7 17-16 20C15 40 8 34 8 23V11z" fill="#7a2a1c" stroke="#e8c66a" stroke-width="2.2"/><path d="M15 21l4-5 5 4 5-4 4 5-2 8-7 4-7-4z" fill="#d7d9dc" stroke="#3a2a14" stroke-width="1.2"/></svg>',
    dunya: '<svg viewBox="0 0 48 48"><path d="M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z" fill="#ead7a5" stroke="#6b4a1e" stroke-width="2"/><path d="M18 8v28M30 12v28" stroke="#6b4a1e" stroke-width="1.5"/><path d="M11 24c5-5 9 2 14-3s9-1 12 1" stroke="#3f7ea0" stroke-width="2.4" fill="none"/><path d="M28 29l3-3 3 3-3 3z" fill="#b8281c"/></svg>',
    oba: '<svg viewBox="0 0 48 48"><path d="M8 28l16-14 16 14v12H8z" fill="#efe0c2" stroke="#6b4a1e" stroke-width="2"/><path d="M5 29L24 11l19 18" fill="none" stroke="#8f2a1e" stroke-width="3.4" stroke-linecap="round"/><path d="M20 40v-8h8v8" fill="#6b4a1e"/><path d="M24 11V4l6 2-6 2" fill="#c0392b" stroke="#5a1a10" stroke-width="1"/></svg>',
    cekic: '<svg viewBox="0 0 48 48"><path d="M10 14l12-7 6 9-12 7z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2"/><path d="M21 20l15 21" stroke="#8a5a25" stroke-width="5" stroke-linecap="round"/></svg>',
    kitap: '<svg viewBox="0 0 48 48"><path d="M6 12c7-3 12-2 18 2v26c-6-4-11-5-18-2z" fill="#f2e3bf" stroke="#6b4a1e" stroke-width="2"/><path d="M42 12c-7-3-12-2-18 2v26c6-4 11-5 18-2z" fill="#e6cf98" stroke="#6b4a1e" stroke-width="2"/><path d="M34 6l4 2-9 16-3-2z" fill="#d6a640" stroke="#5a3a10" stroke-width="1.2"/></svg>',
    migfer: '<svg viewBox="0 0 48 48"><path d="M10 30c0-13 6-21 14-21s14 8 14 21v8H10z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2"/><path d="M24 9v29M15 26h18" stroke="#2c343c" stroke-width="2.6"/><path d="M16 30h7v6h-7zM25 30h7v6h-7z" fill="#2c343c"/></svg>',
    balta: '<svg viewBox="0 0 48 48"><path d="M27 8c8 1 13 7 13 14l-11-1-4-4z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2"/><path d="M29 16L10 40" stroke="#8a5a25" stroke-width="4.5" stroke-linecap="round"/></svg>',
    gorev: '<svg viewBox="0 0 48 48"><path d="M10 8h24a5 5 0 0 1 5 5v27H15a5 5 0 0 1-5-5z" fill="#f2e3bf" stroke="#6b4a1e" stroke-width="2"/><path d="M16 17h16M16 23h16M16 29h10" stroke="#a7834e" stroke-width="2"/><circle cx="35" cy="36" r="6" fill="#b8281c" stroke="#5a1a10" stroke-width="1.5"/></svg>',
    etkinlik: '<svg viewBox="0 0 48 48"><path d="M8 20h32v20H8z" fill="#b8281c" stroke="#5a1a10" stroke-width="2"/><path d="M6 14h36v7H6z" fill="#d23a2a" stroke="#5a1a10" stroke-width="2"/><path d="M24 14v26" stroke="#e8c66a" stroke-width="4"/><path d="M24 14c-3-8-12-7-10-1M24 14c3-8 12-7 10-1" fill="none" stroke="#e8c66a" stroke-width="2.6"/></svg>',
    ayar: '<svg viewBox="0 0 48 48"><path d="M24 6l4 5 6-2 1 6 6 2-3 6 3 5-6 2-1 6-6-2-4 5-4-5-6 2-1-6-6-2 3-5-3-6 6-2 1-6 6 2z" fill="#c9a25a" stroke="#4a3010" stroke-width="2"/><circle cx="24" cy="24" r="6" fill="#4a3010"/></svg>',
    yardim: '<svg viewBox="0 0 48 48"><path d="M4 26l10-9 9 5 9-5 12 9-12 10-8-4-7 4z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2" stroke-linejoin="round"/><path d="M14 17l4 12M34 17l-4 12" stroke="#2c343c" stroke-width="1.5"/></svg>',
    topla: '<svg viewBox="0 0 48 48"><path d="M12 18c0-5 24-5 24 0l5 18c0 7-34 7-34 0z" fill="#c49a5a" stroke="#4a2a10" stroke-width="2"/><path d="M17 15c3-6 11-6 14 0" stroke="#4a2a10" stroke-width="2.6" fill="none"/><path d="M14 12l6 5M30 8l2 8M20 8l3 8" stroke="#d6a640" stroke-width="3" stroke-linecap="round"/></svg>',
    guc: '<svg viewBox="0 0 48 48"><path d="M8 40L34 12M30 8l10 10M40 40L14 12M18 8L8 18" stroke="#f3e3c0" stroke-width="4.4" stroke-linecap="round"/></svg>'
  };

  /* ---------- Görevler penceresi: Bölüm (Ocak'ın bir sonraki seviyesine giden yol) + Günlük ---------- */
  function openBld(k) { closeOv(); W.BMK = k; W.selB = k; W.tab = 'c'; rer(); }
  function bname(k) { var b = (W.B || {})[k]; return b ? b.n : k; }
  function reqs(k) { try { return W.buildingRequirements(k) || []; } catch (e) { return []; } }
  function chapter() {
    var s = S(), oc = (s.l && s.l.ocak) || 1, list = [], seen = {};
    function addT(k, lv, depth) {
      var key = k + ':' + lv; if (seen[key]) return; seen[key] = 1;
      var cur = (s.l && s.l[k]) || 0;
      if (cur < lv && depth < 2) reqs(k).forEach(function (r) { if (((s.l && s.l[r.key]) || 0) < r.level) addT(r.key, r.level, depth + 1); });
      list.push({ k: k, lv: lv, cur: Math.min(cur, lv), done: cur >= lv });
    }
    reqs('ocak').forEach(function (r) { addT(r.key, r.level, 0); });
    list.push({ k: 'ocak', lv: oc + 1, cur: oc, done: false, main: true });
    return { n: oc, list: list, done: list.filter(function (t) { return t.done; }).length };
  }
  function gorevHtml() {
    var c = chapter(), pct = Math.round(c.done / c.list.length * 100);
    return '<div class="gv-ban"><b>' + c.n + '. BÖLÜM</b><span>Ocağı ' + (c.n + 1) + '. seviyeye çıkar</span><u><i style="width:' + pct + '%"></i></u><small>' + c.done + '/' + c.list.length + '</small></div>' +
      '<div class="gv-list">' + c.list.map(function (t) {
        var img = W.ekBinaArt ? W.ekBinaArt(t.k) : null, q = null; try { q = W.buildQueue(t.k); } catch (e) {}
        return '<div class="gv-r' + (t.done ? ' ok' : '') + (t.main ? ' main' : '') + '"><span class="gv-im">' + (img ? '<img src="' + img + '" alt="">' : '') + '</span><span class="gv-t"><b>' + bname(t.k) + ' <em>Sv ' + t.lv + '</em></b><u><i style="width:' + Math.round(t.cur / t.lv * 100) + '%"></i></u></span>' +
          (t.done ? '<span class="gv-ok">✔</span>' : q && q.left > 0 ? '<span class="gv-tm">' + ft(q.left) + '</span>' : '<button type="button" class="gv-go" data-gv="' + t.k + '">GİT</button>') + '</div>';
      }).join('') + '</div>';
  }
  function gorevOpen() {
    closeOv();
    var o = D.createElement('div'); o.className = 'ek-ov yk-ov ah-gv';
    o.innerHTML = '<div class="yk-card"><div class="yk-head"><h2>Görevler</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="gv-tabs"><button type="button" class="on">Bölüm</button><button type="button" data-gvt="gunluk">Günlük</button></div><div class="gv-body"></div></div>';
    var body = o.querySelector('.gv-body'), fill = function () { var h = gorevHtml(); if (body.__ah !== h) { body.__ah = h; body.innerHTML = h; } };
    fill(); var iv = setInterval(function () { if (!o.isConnected) { clearInterval(iv); return; } fill(); }, 1000);
    o.addEventListener('click', function (ev) {
      if (ev.target === o || ev.target.closest('.yk-x')) { o.remove(); return; }
      if (ev.target.closest('[data-gvt]')) { o.remove(); if (W.ekNpcOpen) W.ekNpcOpen('tug', 0); return; }
      var g = ev.target.closest('[data-gv]'); if (g) { o.remove(); openBld(g.dataset.gv); }
    });
    D.body.appendChild(o);
  }
  W.ekGorevler = gorevOpen;
  /* eski 3B galeri (Ocak görünümü / yapı modelleri) yok: her çağrı yapı penceresini açar */
  (function galleryRedirect() {
    var c = W.city3d; if (!c) { setTimeout(galleryRedirect, 500); return; }
    try { if (c.hearthGallery) { c.hearthGallery.open = function () { openBld('ocak'); }; } if (c.buildingModels) { c.buildingModels.show = function () { openBld(W.selB || 'ocak'); }; } } catch (e) {}
  })();


  /* ---------- yanıp sönme yok: oyun genelinde sonsuz döngülü CSS/JS animasyonları durdurulur ---------- */
  function stopLoops() {
    try { D.getAnimations().forEach(function (a) { var t = a.effect && a.effect.getTiming && a.effect.getTiming(); if (t && t.iterations === Infinity && a.playState !== 'idle') a.cancel(); }); } catch (e) {}
  }
  var slq = 0;
  D.addEventListener('animationstart', function () { if (slq) return; slq = requestAnimationFrame(function () { slq = 0; stopLoops(); }); }, true);
  setInterval(stopLoops, 1500);
  var R = {};
  /* ---------- Kışla (asker eğit) ve Şifahane (yaralılar): kendi penceresi; eski yapı ayrıntı paneli yok ---------- */

  function ordHtml() {
    var s = S(), tot = (s.tr || []).reduce(function (a, b) { return a + b; }, 0), cap = W.tcap(), n = W.tb(), FI = ['⚖️', '🗡️', '🐎', '🏹'];
    var h = '<div class="or-top"><span>🪖 <b>' + nf(tot) + '</b>/' + nf(cap) + '</span><span>⚔ <b>' + nf(W.tpow()) + '</b></span></div>';
    if (s.tq) h += '<div class="or-q"><span>' + W.TRN[s.tq.k][1] + ' ' + (s.tq.kind === 'promote' ? 'T' + s.tq.targetTier : '+' + nf(s.tq.n)) + '</span><u><i style="width:' + Math.round(100 - s.tq.left / s.tq.tot * 100) + '%"></i></u><b>' + ft(s.tq.left) + '</b></div>';
    h += '<div class="or-f">' + W.FORMATIONS.map(function (nm, i) { return '<button type="button" data-formation="' + i + '"' + (s.formation === i ? ' class="on" disabled' : '') + '><i>' + FI[i] + '</i><small>' + nm.split(' ')[0] + '</small></button>'; }).join('') + '</div>';
    h += W.TRN.map(function (t, i) {
      var c0 = W.tcost(i), c = { et: c0.et * n / 10, odun: c0.odun * n / 10, demir: c0.demir * n / 10 }, ok = !!s.l.kisla && !s.tq && tot + n <= cap && s.r.et >= c.et && s.r.odun >= c.odun && s.r.demir >= c.demir, p = W.promotion(i), cp = p && !s.tq && Object.keys(p.cost).every(function (r) { return s.r[r] >= p.cost[r]; });
      return '<div class="or-r"><span class="or-i">' + t[1] + '</span><span class="or-t"><b>' + t[0] + ' <em>T' + W.troopTier(i) + '</em></b><small>🪖 ' + nf(s.tr[i] || 0) + '</small></span><span class="or-b"><button type="button" data-tn="' + i + '"' + (ok ? '' : ' disabled') + '>+' + nf(n) + ' · ⏱ ' + ft(W.ttime(i)) + '</button><small>' + W.crs(c) + '</small>' + (p ? '<button type="button" class="or-p" data-promote="' + i + '"' + (cp ? '' : ' disabled') + '>⬆ T' + p.to + ' · ⏱ ' + ft(p.time) + '</button>' : '') + '</span></div>';
    }).join('');
    return h;
  }

  function yarHtml() {
    var s = S(), HV = W.HV; for (var i = 0; i < 3; i++) HV[i] = Math.min(HV[i], s.wd[i]);
    var h = '<div class="or-top"><span>🏥 <b>' + nf(W.wsum()) + '</b>/' + nf(W.wcap()) + '</span></div>';
    if (s.hq) return h + '<div class="or-q"><span>🩹 ' + nf(s.hq.n[0] + s.hq.n[1] + s.hq.n[2]) + '</span><u><i style="width:' + Math.round(100 - s.hq.left / s.hq.tot * 100) + '%"></i></u><b>' + ft(s.hq.left) + '</b></div>';
    if (!W.wsum()) return h + '<div class="yr-none">🛡️<small>Yaralı yok</small></div>';
    h += W.TRN.map(function (t, j) { return '<div class="or-r"><span class="or-i">' + t[1] + '</span><span class="or-t"><b>' + t[0] + '</b><small>🩹 ' + nf(s.wd[j]) + '</small></span><span class="yr-c"><button type="button" data-hvx="' + j + ':-10">−10</button><button type="button" data-hvx="' + j + ':-1">−</button><b>' + HV[j] + '</b><button type="button" data-hvx="' + j + ':1">+</button><button type="button" data-hvx="' + j + ':10">+10</button></span></div>'; }).join('');
    var sum = W.hsum();
    h += '<div class="yr-f"><small>' + (sum ? W.crs(W.hcost()) + ' · ⏱ ' + ft(W.htime()) : '—') + '</small><span><button type="button" data-hqk="1">Hızlı seç</button><button type="button" class="go" data-hlx="1"' + (W.hOk() ? '' : ' disabled') + '>🩹 İyileştir</button></span></div>';
    return h;
  }
  function yapiPanel(k) {
    var f = k === 'kisla' ? ordHtml : k === 'sifa' ? yarHtml : null; if (typeof f !== 'function') return;
    D.querySelectorAll('.ah-yp').forEach(function (x) { x.remove(); });
    var o = D.createElement('div'); o.className = 'ek-ov yk-ov ah-yp';
    o.innerHTML = '<div class="yk-card"><div class="yk-head"><h2>' + (k === 'kisla' ? 'Asker Eğit' : 'Yaralılar') + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="np-body"></div></div>';
    var body = o.querySelector('.np-body'), fill = function () { var h = ''; try { h = f(); } catch (e) {} if (body.__ah !== h) { var st = body.scrollTop; body.__ah = h; body.innerHTML = h; body.scrollTop = st; } };
    fill(); var iv = setInterval(function () { if (!o.isConnected) { clearInterval(iv); return; } fill(); }, 700);
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) { o.remove(); return; } setTimeout(fill, 50); });
    D.body.appendChild(o);
  }
  W.ekYapiPanel = yapiPanel;

  /* ---------- Akın Tuğu: savaş etkinlikleri tek pencerede (Nevruz akını · Destan canavarı · Dünya canavarı) ---------- */
  function akRows() {
    var s = S(), now = Date.now(), out = [];
    try { var n = s.nv || {}, wait = 1728e5 - (now - (n.last || 0)), run = n.run > 0, done = wait > 0 && !run;
      out.push({ k: 'nv', e: '🔥', n: 'Nevruz · Simurg', p: null, st: run ? 'Akında · ' + ft(n.run) : done ? 'Sonraki ' + ft(wait / 1000) : 'Hazır', sub: '⚔ ' + nf(n.total || 0) + ' bu hafta', ok: !run && !done, bt: run ? 'Akında' : done ? 'Bekle' : 'Akına çık' }); } catch (e) {}
    try { var d = W.ekDestan(), x = W.ekDestanName(), cd = d.cd > now, en = s.en ? s.en.v : 0;
      out.push({ k: 'db', e: x.e, n: x.n, p: d.hp / d.max, st: d.hp <= 0 ? 'Yenildi' : cd ? ft((d.cd - now) / 1000) : en < 30 ? '⚡ 30 gerekli' : 'Hazır', sub: '⚔ ' + nf(d.dmg), ok: d.hp > 0 && !cd && en >= 30, bt: d.hp <= 0 ? 'Bitti' : 'Saldır ⚡30' }); } catch (e) {}
    try { var b = s.wb; if (b && b.max) out.push({ k: b.hp > 0 ? 'wb' : 'wc', e: '🐲', n: b.n, p: b.hp / b.max, st: b.hp <= 0 ? (b.cl ? 'Ganimet alındı' : 'Yenildi') : b.cd > 0 ? ft(b.cd) : 'Hazır', sub: '⚔ ' + nf(b.dmg), ok: b.hp > 0 ? !(b.cd > 0) : !b.cl && b.dmg > 0, bt: b.hp > 0 ? 'Saldır' : b.cl ? 'Alındı' : 'Ganimet' }); } catch (e) {}
    return out;
  }
  function akHtml() {
    return '<div class="ak-l">' + akRows().map(function (r) {
      return '<div class="ak-r' + (r.ok ? ' on' : '') + '"><span class="ak-i">' + r.e + '</span><span class="ak-t"><b>' + r.n + '</b>' + (r.p != null ? '<u><i style="width:' + Math.max(0, Math.round(r.p * 100)) + '%"></i></u>' : '') + '<small><em>' + r.st + '</em> · ' + r.sub + '</small></span><button type="button" data-ak="' + r.k + '"' + (r.ok ? '' : ' disabled') + '>' + r.bt + '</button></div>';
    }).join('') + '</div><button type="button" class="ak-dmg" data-ak="dmg">🩸 Hasar tablosu</button>';
  }
  function akOpen() {
    closeOv();
    var o = D.createElement('div'); o.className = 'ek-ov yk-ov ah-ak';
    o.innerHTML = '<div class="yk-card"><div class="yk-head"><h2>Akın Tuğu</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="np-body"></div></div>';
    var body = o.querySelector('.np-body'), fill = function () { var h = akHtml(); if (body.__ah !== h) { body.__ah = h; body.innerHTML = h; } };
    fill(); var iv = setInterval(function () { if (!o.isConnected) { clearInterval(iv); return; } fill(); }, 1000);
    o.addEventListener('click', function (ev) {
      if (ev.target === o || ev.target.closest('.yk-x')) { o.remove(); return; }
      var b = ev.target.closest('[data-ak]'); if (!b || b.disabled) return; var k = b.dataset.ak;
      if (k === 'dmg') { o.remove(); if (W.ekDmgTable) W.ekDmgTable(); return; }
      try { if (k === 'nv') W.nvStart(); else if (k === 'db') { o.remove(); W.ekHitDestan(); return; } else if (k === 'wb') W.wbHit(); else if (k === 'wc') W.wbClaim(); } catch (e) {}
      try { W.save(); } catch (e) {} rer(); body.__ah = ''; fill();
    });
    D.body.appendChild(o);
  }
  W.ekAkinTugu = akOpen;

  /* ---------- Usta sırası: çekice dokununca sağa açılan şerit (sürenler + sıradakiler) ---------- */
  function uqHtml() {
    var s = S(), B = W.B || {}, act = [], n = 1, q = (s.ek && s.ek.uq) || [];
    try { act = W.buildQueues() || []; } catch (e) {} try { n = W.builders(); } catch (e) {}
    var art = function (k) { var a = W.ekBinaArt ? W.ekBinaArt(k) : null; return a ? '<img src="' + a + '" alt="">' : '<span>' + ((B[k] && B[k].i) || '🔨') + '</span>'; };
    var h = act.map(function (x) { var pc = Math.max(3, Math.min(100, 100 - x.left / (x.tot || 1) * 100)); return '<button type="button" class="uqf a" data-uqa="' + x.k + '">' + art(x.k) + '<small>' + ft(x.left) + '</small><u><i style="width:' + pc.toFixed(0) + '%"></i></u></button>'; }).join('');
    for (var i = act.length; i < n; i++) h += '<button type="button" class="uqf free" data-uqb="1"><span>＋</span><small>Boş</small></button>';
    h += '<b class="uqf-sep"></b>';
    q.forEach(function (k) { h += '<button type="button" class="uqf q" data-uqq="' + k + '">' + art(k) + '<small>Sırada</small><i>✕</i></button>'; });
    for (var j = q.length; j < 3; j++) h += '<span class="uqf slot"></span>';
    return h;
  }
  function uqToggle(force) {
    if (!R.uq) {
      R.uq = el('div', 'ah-uq'); (D.querySelector('.wrap') || D.body).appendChild(R.uq); R.uq.hidden = true;
      R.uq.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var a = ev.target.closest('[data-uqa]'), q = ev.target.closest('[data-uqq]'), b = ev.target.closest('[data-uqb]');
        if (a) { R.uq.hidden = true; openBld(a.dataset.uqa); }
        else if (q) { var e = S().ek; if (ev.target.closest('i')) { var ix = e.uq.indexOf(q.dataset.uqq); if (ix >= 0) e.uq.splice(ix, 1); try { W.save(); } catch (x) {} } else { R.uq.hidden = true; openBld(q.dataset.uqq); } }
        else if (b) { R.uq.hidden = true; if (W.ekGo) W.ekGo('build'); }
      }, true);
    }
    R.uq.hidden = force === false ? true : !R.uq.hidden;
    if (!R.uq.hidden) uqFill();
  }
  function uqFill() { if (!R.uq || R.uq.hidden) return; var b = D.querySelector('#ah-left [data-ah="job:usta"]'); if (b) { var r = b.getBoundingClientRect(); R.uq.style.setProperty('top', r.top + 'px', 'important'); R.uq.style.setProperty('left', (r.right + 6) + 'px', 'important'); R.uq.style.setProperty('right', 'auto', 'important'); } var h = uqHtml(); if (R.uq.__ah !== h) { R.uq.__ah = h; R.uq.innerHTML = h; } }
  D.addEventListener('pointerdown', function (ev) { if (R.uq && !R.uq.hidden && !ev.target.closest('#ah-uq,#ah-left')) R.uq.hidden = true; }, true);

  /* ---------- Başarımlar: Alp profili Genel'den ---------- */
  function achOpen() {
    var o = D.createElement('div'); o.className = 'ek-ov yk-ov ah-achw';
    o.innerHTML = '<div class="yk-card"><div class="yk-head"><h2>Başarımlar</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="np-body"></div></div>';
    var body = o.querySelector('.np-body'), fill = function () { var h = ''; try { h = W.rAch(); } catch (e) {} if (body.__ah !== h) { body.__ah = h; body.innerHTML = h; } };
    fill(); var iv = setInterval(function () { if (!o.isConnected) { clearInterval(iv); return; } fill(); }, 800);
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    D.body.appendChild(o);
  }
  D.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-ah-ach]'); if (b) { ev.stopPropagation(); achOpen(); } }, true);

  /* ---------- Kahraman sözü: yıldızların altında sabit kart (kahraman değişince ya da sayfa açılınca seçilir) ---------- */
  function heroQuote() {
    var det = D.querySelector('#ek-kh .kh-det'); if (!det) return;
    var on = D.querySelector('#ek-kh .kh-t.on'), i = on ? +on.dataset.kh : 0, hh = W.HH && W.HH[i];
    var HI = W.ergenekonProfil && W.ergenekonProfil.HIST, d = hh && HI && HI[hh.n];
    R.hq = R.hq || {}; if (R.hqTab !== R.uOpen) { R.hq = {}; R.hqTab = R.uOpen; }
    if (d && d.q && d.q.length && R.hq[i] == null) R.hq[i] = Math.floor(Math.random() * d.q.length);
    var txt = d && d.q ? d.q[R.hq[i] || 0] : '', box = det.querySelector(':scope>.kh-quote');
    if (!txt) { if (box) box.remove(); return; }
    var m = txt.match(/^(.*?)\s*\(([^)]+)\)\s*$/), body = m ? m[1] : txt, src = m ? m[2] : '';
    var h = '<div class="kh-qt">' + body.replace(/[<>&]/g, '') + '</div>' + (src ? '<small>— ' + src.replace(/[<>&]/g, '') + '</small>' : '');
    if (!box) { box = D.createElement('div'); box.className = 'kh-quote'; var st = det.querySelector(':scope>.kh-st'); if (st && st.nextSibling) det.insertBefore(box, st.nextSibling); else det.appendChild(box); }
    if (box.__ah !== h) { box.__ah = h; box.innerHTML = h; }
  }

  /* ---------- Kahramanlar: ileri / geri ---------- */
  function heroNav() {
    var det = D.querySelector('#ek-kh .kh-det'); if (!det) return;
    var ts = [].slice.call(D.querySelectorAll('#ek-kh .kh-grid .kh-t')); if (!ts.length) return;
    var i = ts.findIndex(function (t) { return t.classList.contains('on'); }); if (i < 0) i = 0;
    if (!det.querySelector(':scope>.kh-nav')) {
      det.insertAdjacentHTML('afterbegin', '<button type="button" class="kh-nav pv" aria-label="Önceki">‹</button><button type="button" class="kh-nav nx" aria-label="Sonraki">›</button><span class="kh-cnt"></span>');
    }
    var c = det.querySelector(':scope>.kh-cnt'), ct = (i + 1) + '/' + ts.length; if (c && c.textContent !== ct) c.textContent = ct;
  }
  D.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('#ek-kh .kh-nav'); if (!b) return;
    ev.stopPropagation(); ev.preventDefault();
    var ts = [].slice.call(D.querySelectorAll('#ek-kh .kh-grid .kh-t')), i = ts.findIndex(function (t) { return t.classList.contains('on'); }); if (i < 0) i = 0;
    var n = ts[(i + (b.classList.contains('nx') ? 1 : -1) + ts.length) % ts.length]; if (n) n.click();
    setTimeout(heroNav, 30);
  }, true);

  /* ---------- Alp profili: sekmeye göre sade görünüm ---------- */
  function profTidy() {
    var pop = D.getElementById('pop'); if (!pop || pop.style.display === 'none') return;
    var pb = pop.querySelector('.pb'); if (!pb || !pb.querySelector(':scope>.ptb')) { if (pb) pb.classList.remove('ah-pf'); return; }
    var on = pb.querySelector(':scope>.ptb button.on'), k = on ? on.dataset.ptb : 'gen';
    var va = pb.querySelector('.ek-vt .vt-acts'); if (va && !va.querySelector('[data-ah-ach]')) va.insertAdjacentHTML('afterbegin', '<button type="button" data-ah-ach="1" aria-label="Başarımlar">🏆</button>');
    pb.classList.add('ah-pf'); ['gen', 'esy', 'gel', 'yol', 'paz'].forEach(function (x) { pb.classList.toggle('ah-pf-' + x, x === k); });
    pb.classList.toggle('ah-pf-oth', k !== 'gen' && k !== 'esy');
    var hs = pb.querySelectorAll(':scope>h4'); hs.forEach(function (h) { var t = h.textContent; var v = /Vitrin|Son savaş/.test(t); h.classList.toggle('ah-pfx', v && k === 'gen'); var n = h.nextElementSibling; if (n) n.classList.toggle('ah-pfx', v && k === 'gen'); });
  }

  /* ---------- Sayfa bölücü: uzun sayfaların ana blokları sekmelere ayrılır, kaydırma yerine sekme ---------- */
  var PGL = { 'ek-army': 'Ordu', 'ek-ed': 'Emek', 'ek-oc': 'Akıncı', 'ek-kh': 'Kahramanlar', 'ek-em': 'Emek' };
  var PGC = [['roster-workspace--army', 'Kuşatma'], ['management-workspace--e', 'Takvim'], ['management-workspace--y', 'Arena'], ['management-workspace--a', 'Boy'], ['roster-workspace', 'Liste']];
  R.pg = {};
  function pgLabel(b, i) {
    if (b.id && PGL[b.id]) return PGL[b.id];
    for (var j = 0; j < PGC.length; j++) if (b.classList.contains(PGC[j][0])) return PGC[j][1];
    var h = b.querySelector('h2,h3,h4,b'); var t = h ? h.textContent.replace(/[^\wçğıöşüÇĞİÖŞÜ ]/g, '').trim().split(' ').slice(0, 2).join(' ') : '';
    return t || ('Bölüm ' + (i + 1));
  }
  function pager() {
    var t = W.tab; if (t === 'c' || t === 'm' || t === 'g' || t === 'r' || t === 'p') return;
    if (t === 'u') { var tu = D.getElementById('tu'); if (tu && D.getElementById('ek-kh')) [].slice.call(tu.children).forEach(function (x) { if (x.id !== 'ek-kh' && !x.matches('.game-page-header')) x.remove(); }); return; }
    var P = D.getElementById('t' + t); if (!P) return;
    if (PGV[t]) { vpager(t, P); return; }
    var bl = [].filter.call(P.children, function (x) { return /^(DIV|SECTION|ASIDE|ARTICLE)$/.test(x.tagName) && !x.matches('.reference-frame-corners,.ek-ver,#ah-pg') && !x.hidden && x.style.display !== 'none' && (x.childNodes.length > 0); });
    var bar = P.querySelector(':scope>#ah-pg');
    if (bl.length < 2) { if (bar) bar.remove(); P.classList.remove('ah-pgon'); bl.forEach(function (x) { x.classList.remove('ah-pgb', 'ah-pgsel'); }); return; }
    var sel = Math.min(R.pg[t] || 0, bl.length - 1);
    var labels = bl.map(pgLabel), key = labels.join('|') + ':' + sel;
    if (!bar) { bar = D.createElement('div'); bar.id = 'ah-pg'; bar.addEventListener('click', function (ev) { var b = ev.target.closest('[data-pg]'); if (!b) return; R.pg[W.tab] = +b.dataset.pg; bar.__k = ''; pager(); try { P.scrollTop = 0; } catch (e) {} }); }
    var hd = P.querySelector(':scope>header'); if (bar.parentNode !== P || bar.previousElementSibling !== hd) P.insertBefore(bar, hd ? hd.nextSibling : P.firstChild);
    if (bar.__k !== key) { bar.__k = key; bar.innerHTML = labels.map(function (l, i) { return '<button type="button" data-pg="' + i + '" class="' + (i === sel ? 'on' : '') + '">' + l + '</button>'; }).join(''); }
    P.classList.add('ah-pgon');
    bl.forEach(function (x, i) { x.classList.add('ah-pgb'); x.classList.toggle('ah-pgsel', i === sel); });
  }

  /* sayfa içinden seçilmiş bölümlerle sekmeler (iç içe yapılarda) */
  var PGV = { a: [['Boy', '#ek-oc'], ['Fetih', '.mgmt-council-hall'], ['Dayanışma', '.mgmt-council-support'], ['Yapılar', '#management-a-buildings'], ['Sohbet', '.mgmt-chat-fold']] };
  function vpager(t, P) {
    var L = PGV[t].map(function (x) { return [x[0], P.querySelector(x[1])]; }).filter(function (x) { return x[1]; });
    var sel = Math.min(R.pg[t] || 0, L.length - 1);
    var bar = P.querySelector(':scope>#ah-pg');
    if (!bar) { bar = D.createElement('div'); bar.id = 'ah-pg'; bar.addEventListener('click', function (ev) { var b = ev.target.closest('[data-pg]'); if (!b) return; R.pg[W.tab] = +b.dataset.pg; bar.__k = ''; pager(); try { P.scrollTop = 0; } catch (e) {} }); }
    var hd = P.querySelector(':scope>header'); if (bar.parentNode !== P || bar.previousElementSibling !== hd) P.insertBefore(bar, hd ? hd.nextSibling : P.firstChild);
    var key = L.map(function (x) { return x[0]; }).join('|') + ':' + sel;
    if (bar.__k !== key) { bar.__k = key; bar.innerHTML = L.map(function (x, i) { return '<button type="button" data-pg="' + i + '" class="' + (i === sel ? 'on' : '') + '">' + x[0] + '</button>'; }).join(''); }
    P.classList.add('ah-pv');
    L.forEach(function (x, i) { var on = i === sel; x[1].classList.toggle('ah-pv-on', on); x[1].classList.toggle('ah-pv-off', !on); if (on && x[1].tagName === 'DETAILS' && !x[1].open) x[1].open = true; });
  }
  function pgWatch() {
    var t = W.tab, P = D.getElementById('t' + t); if (!P || P.__ahpg) return; P.__ahpg = 1;
    new MutationObserver(function () { if (W.tab === t) pager(); }).observe(P, { childList: true, subtree: !!PGV[t] });
  }

  /* ---------- Haritada hedef (canavar) kartı: tek ekran, taktikler ayrı görünümde ---------- */
  function monMark() {
    var m = D.getElementById('mapi'); if (!m) return;
    var card = null; for (var i = 0; i < m.children.length; i++) { var c = m.children[i]; if (c.classList.contains('card') && c.querySelector('.tt-row')) { card = c; break; } }
    m.classList.toggle('ah-mon', !!card); m.classList.toggle('ah-tak', !!card && !!R.tak);
    if (!card) return;
    if (!card.classList.contains('ah-mc')) card.classList.add('ah-mc');
    for (var j = 0; j < card.children.length; j++) {
      var x = card.children[j], t = (x.textContent || '').trim(), k = '';
      if (j === 0 && x.tagName === 'DIV' && x.querySelector('img')) k = 'ah-mimg';
      else if (x.tagName === 'P' && /^Can:/.test(t)) { k = 'ah-mst'; var mm = t.match(/Can:\s*([\d.,BKM]+)\s*·\s*Saldırı:\s*([\d.,BKM]+)(?:\s*·\s*XP:\s*([\d.,BKM]+))?/); if (mm) { var nh = '<span>❤️ ' + mm[1] + '</span><span>⚔️ ' + mm[2] + '</span>' + (mm[3] ? '<span>✨ ' + mm[3] + '</span>' : ''); if (x.innerHTML !== nh) x.innerHTML = nh; } }
      else if (x.tagName === 'P' && x.classList.contains('ah-mst')) k = 'ah-mst';
      else if (x.tagName === 'BUTTON' && !x.classList.contains('ek-x5') && /Saldır/.test(t)) k = 'ah-matk';
      if (k && !x.classList.contains(k)) x.classList.add(k);
    }
    var tb = card.querySelector(':scope>.ah-takb');
    if (!tb) { tb = D.createElement('button'); tb.type = 'button'; tb.className = 'ah-takb'; tb.addEventListener('click', function (ev) { ev.stopPropagation(); R.tak = !R.tak; monMark(); }); var at = card.querySelector(':scope>.ah-matk'); card.insertBefore(tb, at || null); }
    var lbl = R.tak ? '‹ Geri' : '☾ Taktik'; if (tb.textContent !== lbl) tb.textContent = lbl;
  }
  function monWatch() {
    var m = D.getElementById('mapi'); if (!m || m.__ahmo) return; m.__ahmo = 1;
    new MutationObserver(function () { monMark(); }).observe(m, { childList: true, subtree: true });
    monMark();
  }

  /* ---------- Ayarlar: yuvarlak simge ızgarası, dokununca tek bölüm ---------- */
  var SI = {
    ses: '<svg viewBox="0 0 48 48"><path d="M10 19h8l10-8v26l-10-8h-8z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M33 17c3 4 3 10 0 14M37 13c5 6 5 16 0 22" fill="none" stroke="#f3e3c0" stroke-width="3" stroke-linecap="round"/></svg>',
    grafik: '<svg viewBox="0 0 48 48"><path d="M24 8c9 0 17 6 17 14 0 5-4 7-8 7h-4c-2 0-3 2-2 4 2 3 0 7-4 7C14 40 7 32 7 23 7 15 15 8 24 8z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><circle cx="16" cy="21" r="3" fill="#c8341c"/><circle cx="23" cy="15" r="3" fill="#3f7ea0"/><circle cx="31" cy="17" r="3" fill="#2f7d3a"/></svg>',
    bildirim: '<svg viewBox="0 0 48 48"><path d="M24 7c-7 0-11 5-11 12v8l-4 6h30l-4-6v-8c0-7-4-12-11-12z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M19 36c1 3 3 5 5 5s4-2 5-5" fill="#e8c66a" stroke="#4a3010" stroke-width="2"/></svg>',
    hesap: '<svg viewBox="0 0 48 48"><circle cx="24" cy="17" r="8" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M9 41c1-9 7-14 15-14s14 5 15 14z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/></svg>',
    dil: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#3f7ea0" stroke="#f3e3c0" stroke-width="2.4"/><path d="M8 24h32M24 8c-6 5-6 27 0 32M24 8c6 5 6 27 0 32" fill="none" stroke="#f3e3c0" stroke-width="2"/></svg>',
    oto: '<svg viewBox="0 0 48 48"><path d="M20 6h8l1 5 4 2 5-3 5 6-3 5 1 4 5 1v8l-5 1-1 4 3 5-6 5-5-3-4 2-1 5h-8l-1-5-4-2-5 3-5-6 3-4-1-5-5-1v-8l5-1 1-4-3-5 6-5 4 3 4-2z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2" transform="scale(.82) translate(5 5)"/><circle cx="24" cy="24" r="6" fill="#4a3010"/></svg>',
    kayit: '<svg viewBox="0 0 48 48"><path d="M14 36a9 9 0 0 1-1-18 12 12 0 0 1 23 3 7.5 7.5 0 0 1-1 15z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M24 22v11M19 28l5 5 5-5" fill="none" stroke="#3f7ea0" stroke-width="3" stroke-linecap="round"/></svg>'
  };
  var SET = [['ses', 'Ses', 0], ['grafik', 'Grafik', 1], ['bildirim', 'Bildirim', 2], ['hesap', 'Hesap', 3], ['dil', 'Dil', 4], ['oto', 'Otomasyon', 5], ['kayit', 'Kayıt', 'mw']];
  function setUp() {
    var tg = D.getElementById('tg'), es = D.getElementById('ek-set'); if (!tg) return;
    if (!R.sg || !R.sg.isConnected) {
      R.sg = el('div', '', 'ah-setg', '<div class="asg-head">Ayarlar</div><div class="asg-grid">' + SET.map(function (x) { return '<button type="button" data-asg="' + x[2] + '"><i>' + SI[x[0]] + '</i><b>' + x[1] + '</b></button>'; }).join('') + '</div><button type="button" class="asg-back" hidden>‹ Ayarlar</button>');
      tg.insertBefore(R.sg, tg.firstChild);
      R.sg.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-asg]'); if (b) { R.sc = b.dataset.asg; setMode(); try { tg.scrollTop = 0; } catch (e) {} if (R.sc === 'mw') { var kb = [].slice.call(tg.querySelectorAll('.mgmt-navigation button')).filter(function (x) { return /Kayıt/.test(x.textContent); })[0]; if (kb) kb.click(); } return; }
        if (ev.target.closest('.asg-back')) { R.sc = null; setMode(); }
      });
      R.sc = null;
    }
    if (tg.firstChild !== R.sg) tg.insertBefore(R.sg, tg.firstChild);
    setMode();
  }
  (function tgWatch() { var tg = D.getElementById('tg'); if (!tg) { setTimeout(tgWatch, 500); return; } new MutationObserver(function () { if (W.tab === 'g' && (!R.sg || !R.sg.isConnected || !tg.classList.contains('ah-setg-on'))) setUp(); }).observe(tg, { childList: true, subtree: true }); })();
  function setMode() {
    var tg = D.getElementById('tg'), es = D.getElementById('ek-set'); if (!tg || !R.sg) return;
    var sc = R.sc, secs = es ? es.querySelectorAll(':scope>section') : [];
    tg.classList.add('ah-setg-on'); tg.classList.toggle('ah-setg-grid', sc == null); tg.classList.toggle('ah-setg-mw', sc === 'mw');
    secs.forEach(function (x, i) { x.classList.toggle('ah-cur', String(i) === String(sc)); });
    R.sg.querySelector('.asg-grid').hidden = sc != null; R.sg.querySelector('.asg-back').hidden = sc == null;
  }

  function el(tag, id, cls, html) { var e = D.createElement(tag); if (id) e.id = id; if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function build() {
    if (!D.body || !S()) return false;
    // alt şerit
    R.nav = el('nav', 'ah-nav', '', [['kahraman', 'Kahramanlar'], ['canta', 'Çanta'], ['posta', 'Posta'], ['boy', 'Boy']].map(function (x) { return '<button type="button" data-ah="' + x[0] + '"><i>' + I[x[0]] + '</i><b>' + x[1] + '</b><em class="ah-bd" hidden></em></button>'; }).join('') +
      '<button type="button" id="ah-world" data-ah="dunya"><i>' + I.dunya + '</i><b>Dünya</b><em class="ah-bd" hidden></em></button>');
    // obada: görev ve sohbet şeritleri
    R.strip = el('div', 'ah-strip', '', '<button type="button" id="ah-q"><i>' + I.gorev + '</i><span></span></button><button type="button" id="ah-chat"><i><svg viewBox="0 0 24 24"><path d="M3 5h18v11H9l-5 4v-4H3z" fill="#e8c66a" stroke="#5a3a10" stroke-width="1.4"/></svg></i><span></span></button>');
    // sol: boştaki işler
    R.left = el('div', 'ah-left');
    // sağ üst ve sağ alt
    R.right = el('div', 'ah-right', '', [['gorev', 'Görevler'], ['etkinlik', 'Etkinlik'], ['ayar', 'Ayarlar']].map(function (x) { return '<button type="button" data-ah="' + x[0] + '"><i>' + I[x[0]] + '</i><b>' + x[1] + '</b><em class="ah-hil" hidden></em></button>'; }).join(''));
    R.act = el('div', 'ah-act', '', '<button type="button" data-ah="yardim"><i>' + I.yardim + '</i><b>Yardım et</b><em class="ah-bd" hidden></em></button><button type="button" data-ah="topla"><i>' + I.topla + '</i><b>Tümünü topla</b></button>');
    R.pw = el('div', 'ah-pw', '', '<span class="ah-pwv"><i>' + I.guc + '</i><b></b></span><span class="ah-er"><img src="./assets/img/ikon_erime.webp" alt=""><em></em></span>');
    R.toast = el('div', 'ah-toast'); R.toast.hidden = true;
    var host = D.querySelector('.wrap') || D.body; [R.nav, R.strip, R.left, R.right, R.act].forEach(function (x) { host.appendChild(x); }); var top = D.getElementById('top'), rs = D.getElementById('res'); if (top && rs) top.insertBefore(R.pw, rs); else host.appendChild(R.pw); D.body.appendChild(R.toast);
    D.body.addEventListener('click', onClick, true);
    return true;
  }
  function toast(h) { R.toast.innerHTML = h; R.toast.hidden = false; clearTimeout(R.tt); R.tt = setTimeout(function () { R.toast.hidden = true; }, 2200); }
  var RS = [['odun', 'Odun'], ['et', 'Et'], ['demir', 'Demir'], ['komur', 'Kömür']];
  function act(k) {
    var s = S();
    try { navigator.vibrate && navigator.vibrate(10); } catch (e) {}
    if (k === 'kahraman') { closeOv(); if (W.ekNpcOpen) W.ekNpcOpen('kurultay'); else tabGo('u'); }
    else if (k === 'canta') { closeOv(); var b = D.querySelector('#tabs>button[title="Çanta"]') || D.querySelector('.ek-topbtns [data-ek="bag"]'); if (b) b.click(); }
    else if (k === 'posta') { closeOv(); tabGo('p'); }
    else if (k === 'boy') { closeOv(); tabGo('a'); }
    else if (k === 'dunya') { closeOv(); if (W.tab === 'm') tabGo('c'); else if (W.tab !== 'c') tabGo('c'); else { var w = D.getElementById('ek-world'); if (w) w.click(); else tabGo('m'); } }
    else if (k === 'gorev') gorevOpen();
    else if (k === 'etkinlik') tabGo('e');
    else if (k === 'ayar') tabGo('g');
    else if (k === 'yardim') { var n = (s.al && s.al.hq) || 0, h = D.getElementById('ek-hand'); if (n && h) { h.click(); toast('🤝 ' + n + ' boydaşa yardım edildi'); } else toast('Yardım bekleyen boydaş yok'); }
    else if (k === 'topla') {
      var before = {}; RS.forEach(function (r) { before[r[0]] = s.r[r[0]] || 0; });
      var n2 = W.ekCollectAll ? W.ekCollectAll() : 0, got = RS.map(function (r) { var d = (s.r[r[0]] || 0) - before[r[0]]; return d >= 1 ? '<span>+' + nf(d) + ' ' + r[1] + '</span>' : ''; }).join('');
      toast(got || (n2 ? 'Depo dolu' : 'Toplanacak ürün yok'));
      rer();
    }
    else if (k.indexOf('job:') === 0) jobGo(k.slice(4));
  }
  function jobGo(j) {
    if (j === 'usta') uqToggle();
    else if (j === 'ilim') tabGo('r');
    else if (j === 'egitim') yapiPanel('kisla');
    else if (j === 'is') { var L = W.ekParcelList ? W.ekParcelList() : [], p = L.filter(function (x) { return !x.t && x.kind !== 'field' && !x.dim; })[0] || L[0]; if (p && W.ekOpenParcel) W.ekOpenParcel(p.id); }
  }
  function onClick(ev) {
    var b = ev.target.closest && ev.target.closest('#ah-nav [data-ah],#ah-right [data-ah],#ah-act [data-ah],#ah-left [data-ah]'); 
    if (b) { ev.stopPropagation(); ev.preventDefault(); act(b.dataset.ah); return; }
    if (ev.target.closest && ev.target.closest('#ah-q i')) { ev.stopPropagation(); gorevOpen(); return; }
    if (ev.target.closest && ev.target.closest('#ah-q')) { ev.stopPropagation(); gorevOpen(); return; }
    if (ev.target.closest && ev.target.closest('#ah-chat')) { ev.stopPropagation(); var c = D.querySelector('#tabs>button[title="Sohbet"]') || D.querySelector('#cp [data-ct="x"]'); if (c) c.click(); }
  }
  function bd(e, n) { var b = e && e.querySelector('.ah-bd'); if (!b) return; var t = n ? String(n) : ''; b.hidden = !t; if (b.textContent !== t) b.textContent = t; }
  function job(id, ic, busy, left) { return '<button type="button" data-ah="job:' + id + '" class="' + (busy ? 'busy' : '') + '"><i>' + I[ic] + '</i>' + (busy ? '<small>' + ft(left) + '</small>' : '<em>Zz</em>') + '</button>'; }
  function update() {
    var s = S(), tab = W.tab, ov = !!D.querySelector('.ek-ov'), oba = tab === 'c' && !ov && !W.BMK;
    H.classList.toggle('ah-on', true); H.classList.toggle('ah-oba', tab === 'c'); H.classList.toggle('ah-map', tab === 'm');
    // alt şerit
    R.nav.querySelectorAll('[data-ah]').forEach(function (b) { var k = b.dataset.ah; b.classList.toggle('on', (k === 'posta' && tab === 'p') || (k === 'boy' && tab === 'a') || (k === 'kahraman' && tab === 'u')); });
    var w = D.getElementById('ah-world'), onMap = tab === 'm' || tab !== 'c';
    var wl = tab === 'c' ? 'Dünya' : 'Oba', wb = w.querySelector('b'); if (wb.textContent !== wl) wb.textContent = wl; var wi = tab === 'c' ? I.dunya : I.oba; if (w.__i !== wi) { w.__i = wi; w.querySelector('i').innerHTML = wi; }
    var pb = D.querySelector('#tabs [data-t="p"]'); bd(R.nav.querySelector('[data-ah="posta"]'), pb && (pb.querySelector('b,i,em,span:not(.ek-nxi)') || {}).textContent && /\d/.test(pb.textContent) ? pb.textContent.replace(/\D/g, '') : '');
    bd(R.nav.querySelector('[data-ah="boy"]'), (s.al && s.al.hq) || '');
    // obaya özel parçalar
    // obanın ana görünümü dışında yan sütunlar yok; Yardım et yalnız istek varken ve pencere açık değilken
    var pop = D.getElementById('pop'), modal = ov || (pop && pop.style.display && pop.style.display !== 'none') || !!D.querySelector('.hearth-gallery:not([hidden]),.building-gallery:not([hidden]),#aw') || (tab === 'c' && !!W.BMK);
    var main = tab === 'c' && !modal, hq = (s.al && s.al.hq) || 0;
    [R.strip, R.left, R.right].forEach(function (x) { x.hidden = !main; }); R.pw.hidden = false;
    R.act.hidden = !(main || (hq > 0 && !modal));
    var tb = R.act.querySelector('[data-ah="topla"]'), yb = R.act.querySelector('[data-ah="yardim"]'); tb.hidden = !main; yb.hidden = !hq;
    H.classList.toggle('ah-main', main);
    if (tab === 'm') { monWatch(); if (D.getElementById('mapi') && !D.getElementById('mapi').classList.contains('ah-mon')) R.tak = false; }
    if (tab !== 'c' && tab !== 'm') { pgWatch(); pager(); }
    profTidy();
    if (tab === 'u') { if (!R.uOpen) R.uOpen = Date.now(); heroNav(); heroQuote(); } else R.uOpen = 0;
    uqFill(); if (R.uq && !R.uq.hidden && !main) R.uq.hidden = true;
    if (tab === 'g') setUp(); else if (R.sc != null) R.sc = null;
    // güç ve erime
    var pv = R.pwv || 0, nw = Date.now(); if (!R.pwt || nw - R.pwt > 1500) { try { pv = W.power(); } catch (e) {} R.pwv = pv; R.pwt = nw; }
    var pt = nf(pv), pb2 = R.pw.querySelector('b'); if (pb2.textContent !== pt) pb2.textContent = pt;
    var me = D.getElementById('melt'), et = me ? me.textContent.trim() : '';
    var er = R.pw.querySelector('.ah-er em'); if (er.textContent !== et) er.textContent = et;
    if (tab !== 'c') return;
    // görev şeridi
    var ch = chapter(), nx = ch.list.filter(function (t) { return !t.done; })[0]; R.qk = nx ? nx.k : 'ocak';
    var qs = R.strip.querySelector('#ah-q span'), qh = '<b>' + ch.n + '. Bölüm</b> ' + (nx ? bname(nx.k) + ' Sv ' + nx.lv : 'Ocağı yükselt');
    if (qs.__ah !== qh) { qs.__ah = qh; qs.innerHTML = qh; }
    var cm = D.querySelector('#cpm'), last = cm && cm.lastElementChild, ct = last ? last.textContent.trim().replace(/\s+/g, ' ') : '';
    var cs = R.strip.querySelector('#ah-chat span'); if (cs.textContent !== ct) cs.textContent = ct || 'Boy sohbeti';
    // boştaki işler
    var bq = []; try { bq = W.buildQueues() || []; } catch (e) {}
    var nb = 1; try { nb = W.builders(); } catch (e) {}
    var bl = bq.length ? Math.min.apply(null, bq.map(function (q) { return q.left; })) : 0;
    var L = W.ekParcelList ? W.ekParcelList() : [], pj = L.filter(function (x) { return x.t; })[0], idle = L.some(function (x) { return !x.t && x.kind !== 'field' && !x.dim; });
    var h = job('usta', 'cekic', bq.length >= nb, bl) + job('ilim', 'kitap', !!(s.rq && s.rq.left > 0), s.rq ? s.rq.left : 0) + ((s.l && s.l.kisla) ? job('egitim', 'migfer', !!(s.tq && s.tq.left > 0), s.tq ? s.tq.left : 0) : '') + (pj || idle ? job('is', 'balta', !!pj && !idle, pj ? pj.left : 0) : '');
    if (R.left.__ah !== h) { R.left.__ah = h; R.left.innerHTML = h; }
    bd(R.act.querySelector('[data-ah="yardim"]'), (s.al && s.al.hq) || '');
    var tg = D.querySelector('#ek-npcs [data-npc="tug"] .np-hil'), gh = R.right.querySelector('[data-ah="gorev"] .ah-hil'); if (gh) gh.hidden = !tg;
  }
  /* 25 Kasım: TEK EKRAN — pencerelerde kaydırma yok.
     1) Taşan pencere gövdesi ekrana sığana dek küçülür (zoom, en az %72).
     2) Uzun listeler (arena sırası, koleksiyon, çanta…) kaydırılmaz; ‹ 1/3 › sayfa düğmeleriyle gezilir.
     MutationObserver mikro görevinde çalışır: boyamadan önce, yanıp sönme olmaz. */
  var FIT = '#aw>.tf,.ek-ov>.tf,.wrap>.ovp,#ek-yapi .ya-body,.np-win .np-body,.ek-ov .yk-card:not(.ya-card):not(.np-card),.ek-ov .np-card,.ek-ov .ek-modal';
  var LIST = '.ar-list,.ab-grid,.kt-list,.rk-list,.tg-grid,.ci-grid,.bf-list,.ach-list,.ah-gv-list';
  var PG = {};
  function fitZoom(el) {
    if (!el.offsetHeight) return;
    var k = el.textContent.length + '|' + el.childElementCount + '|' + el.clientHeight + '|' + innerHeight;
    if (el.__fz === k) return;
    // zoom kabın kendisine değil çocuklarına: kabın yüksekliği (max-height) zoom ile birlikte küçülmesin
    var kids = [].filter.call(el.children, function (c) { return !c.classList.contains('yk-head') && !c.classList.contains('np-tabs'); });
    kids.forEach(function (c) { if (c.style.zoom) c.style.zoom = ''; }); var z = 1;
    for (var i = 0; i < 5; i++) { var sh = el.scrollHeight, ch = el.clientHeight; if (sh <= ch + 2 || z <= .66) break; z = Math.max(.66, z * (ch / sh) - .01); kids.forEach(function (c) { c.style.zoom = z.toFixed(3); }); }
    el.__fz = el.textContent.length + '|' + el.childElementCount + '|' + el.clientHeight + '|' + innerHeight;
  }
  function pageList(el, sel) {
    if (!el.offsetHeight) return;
    var items = [].filter.call(el.children, function (c) { return !c.classList.contains('ah-pgr'); });
    var host = el.closest('.ek-ov,#ty,#tu,#tp,#ta,#tg,#tk,#te,#tr,#tc') || D.body, key = (host.id || host.className.split(' ')[0]) + sel + items.length;
    var bar0 = el.nextElementSibling && el.nextElementSibling.classList.contains('ah-pgr'), sig = key + '|' + el.textContent.length + '|' + el.clientHeight + '|' + (PG[key] || 0) + '|' + innerHeight;
    if (el.__pgs === sig && (bar0 || el.__pgn === 1)) return; // değişiklik yoksa yeniden ölçme
    items.forEach(function (c) { if (c.style.display === 'none') c.style.display = ''; });
    el.style.overflowY = 'hidden'; el.scrollTop = 0;
    var bar = el.nextElementSibling && el.nextElementSibling.classList.contains('ah-pgr') ? el.nextElementSibling : null;
    var ch = el.clientHeight;
    if (items.length < 2 || el.scrollHeight <= ch + 4) { if (bar) bar.remove(); el.__pgs = sig; el.__pgn = 1; return; }
    var er = el.getBoundingClientRect(), zs = el.offsetHeight ? er.height / el.offsetHeight : 1; ch = ch * zs; // zoom altındaysa ekran pikseline çevir
    var top0 = er.top, starts = [0], pt = items[0].getBoundingClientRect().top - top0, base = pt;
    items.forEach(function (c, i) { var r = c.getBoundingClientRect(); if (!i || !r.height) return; if (r.bottom - top0 - pt + base > ch - 2 && r.top - top0 > pt) { starts.push(i); pt = r.top - top0; } });
    var n = starts.length, pg = Math.min(n - 1, PG[key] || 0); PG[key] = pg;
    var a = starts[pg], b = pg + 1 < n ? starts[pg + 1] : items.length;
    items.forEach(function (c, i) { if (i < a || i >= b) c.style.display = 'none'; });
    if (!bar) { bar = D.createElement('div'); bar.className = 'ah-pgr'; el.insertAdjacentElement('afterend', bar); }
    var h = '<button type="button" data-pg="-1"' + (pg ? '' : ' disabled') + '>‹</button><b>' + (pg + 1) + ' / ' + n + '</b><button type="button" data-pg="1"' + (pg < n - 1 ? '' : ' disabled') + '>›</button>';
    if (bar.__ah !== h) { bar.__ah = h; bar.innerHTML = h; }
    bar.__key = key; bar.__n = n; bar.__el = el; bar.__sel = sel;
    el.__pgs = key + '|' + el.textContent.length + '|' + el.clientHeight + '|' + pg + '|' + innerHeight; el.__pgn = n;
  }
  function fitAll() {
    try {
      D.querySelectorAll(LIST).forEach(function (el) { var m = LIST.split(',').filter(function (q) { return el.matches(q); })[0]; pageList(el, m); });
      D.querySelectorAll(FIT).forEach(fitZoom);
      D.querySelectorAll(LIST).forEach(function (el) { var m = LIST.split(',').filter(function (q) { return el.matches(q); })[0]; pageList(el, m); });
    } catch (e) {}
  }
  var fitQ = false;
  function fitSoon() { if (fitQ) return; fitQ = true; Promise.resolve().then(function () { fitQ = false; fitAll(); }); }
  new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) { var t = ms[i].target; if (t.closest && (t.closest('#ek-ao') || t.closest('.ah-pgr'))) continue; fitSoon(); return; }
  }).observe(D.documentElement, { childList: true, subtree: true });
  W.addEventListener('resize', function () { D.querySelectorAll(FIT).forEach(function (e) { e.__fz = ''; }); fitSoon(); });
  D.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('.ah-pgr [data-pg]'); if (!b) return; ev.stopPropagation(); ev.preventDefault();
    var bar = b.parentNode; PG[bar.__key] = Math.max(0, Math.min(bar.__n - 1, (PG[bar.__key] || 0) + +b.dataset.pg));
    pageList(bar.__el, bar.__sel); fitAll();
  }, true);
  /* render() sonrası arayüz düzeni aynı karede uygulanır: eski görünüm bir an bile görünmesin */
  var myRender = null;
  function hookRender() {
    if (typeof W.render !== 'function' || W.render === myRender) return;
    var orig = W.render;
    // 25 Kasım: diğer modüllerin işaretleri (__ekBoy, __yk, __ekOc, __ek…) kopyalanır; yoksa onlar her saniye yeniden sarıp
    // zincir sonsuz uzuyordu (her çizimde aynı iş onlarca kez). Eski katmanlar artık iş yapmaz, yalnız en dıştaki.
    var self = function () { var r = orig.apply(this, arguments); if (self === myRender) { try { if (W.tab === 'u' && W.ekHeroView) W.ekHeroView(); if (R.nav) { update(); R.upd = performance.now(); } } catch (e) {} } return r; };
    for (var p in orig) self[p] = orig[p]; self.__ah = true;
    myRender = self; W.render = myRender;
  }
  var last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (!R.nav) { if (!build()) return; }
    hookRender();
    if (now - last < 400 || now - (R.upd || 0) < 350) return; last = now;
    try { update(); } catch (e) {}
  }
  requestAnimationFrame(loop);
})();
