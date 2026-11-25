/* Ergenekon — Ek Paket 3, 4. adım: harita ve sefer. Claude, 18 Kasım 2026.
   101 birlik durum şeridi (+105 hepsini geri çağır) · 127 seferler merkezi (müfreze, pet seferi, kurgan; hepsini topla)
   132 bölgeye göre ganimet · 137 yer imine yeniden isim · 110 toplayıcı kahraman · 121 Atlı Okçu yolu */
(function () {
  'use strict';
  var W = window;
  if (W.__ekSefer) return; W.__ekSefer = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  var RI = { odun: '🪵', et: '🍖', demir: '⛓️', komur: '🪨' };

  /* ---------- kamera ---------- */
  function flyTo(wx, wz) {
    var w = W.world3d; if (!w || !w.controls) return; var c = w.controls, cam = w.camera, sx = c.target.x, sz = c.target.z, p0 = cam.position.clone(), t0 = performance.now();
    (function step(now) { var e = Math.min(1, (now - t0) / 600), q = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, nx = sx + (wx - sx) * q, nz = sz + (wz - sz) * q; cam.position.set(p0.x + nx - sx, p0.y, p0.z + nz - sz); c.target.set(nx, c.target.y, nz); c.update(); if (e < 1) requestAnimationFrame(step); })(t0);
  }
  function nodeWorld(n) { var w = W.world3d, t = w && w.pveTargets && w.pveTargets.filter(function (x) { return x.kind === 'node' && x.index === n; })[0]; return t ? [t.worldX, t.worldZ] : null; }

  /* ---------- 101 · 105) birlik durum şeridi ---------- */
  var ST = { el: null };
  function stLabel(q) { return q.st === 1 ? '➜' : q.st === 2 ? '⛏️' : q.st === 3 ? '↩' : q.st === 4 ? '🧭' : '·'; }
  function strip() {
    var mapv = document.getElementById('mapv'), s = S();
    if (!mapv || W.tab !== 'm') { if (ST.el) ST.el.hidden = true; return; }
    if (!ST.el || !ST.el.isConnected) {
      ST.el = document.createElement('div'); ST.el.id = 'ek-strip'; document.body.appendChild(ST.el);
      ST.el.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-sq],[data-st-fold],[data-st-all],[data-st-hub]'); if (!b) return; ev.stopPropagation();
        if (b.dataset.stFold) { ek().stf = ek().stf ? 0 : 1; save(); ST.el.__ekh = ''; return; }
        if (b.dataset.stHub) { openHub(); return; }
        if (b.dataset.stAll) { if (b.dataset.ok !== '1') { b.dataset.ok = '1'; b.classList.add('ask'); b.innerHTML = '↩ ?'; setTimeout(function () { if (b.isConnected) { b.dataset.ok = ''; b.classList.remove('ask'); b.innerHTML = '↩ Tümü'; } }, 2500); return; }
          (S().sq || []).forEach(function (q, j) { if (q.st === 1 || q.st === 2) try { W.recall(j); } catch (e) {} }); save(); rer(); ST.el.__ekh = ''; return; }
        var q = S().sq[+b.dataset.sq]; if (!q) return; var p = q.n >= 0 ? nodeWorld(q.n) : null; if (p) flyTo(p[0], p[1]); else if (W.world3d && W.world3d.selfPosition) flyTo(W.world3d.selfPosition.x, W.world3d.selfPosition.z);
      });
    }
    var act = (s.sq || []).map(function (q, j) { return { q: q, j: j }; }).filter(function (x) { return x.q.st > 0; }), fold = !!ek().stf;
    var h = '<button type="button" class="sp-fold" data-st-fold="1">' + (fold ? '🐎 ' + act.length + ' ›' : '‹') + '</button>';
    if (!fold) {
      h += act.map(function (x) { var q = x.q, n = q.n >= 0 && s.nodes[q.n], left = q.st === 2 ? Math.max(0, (q.capacity - q.cargo) / Math.max(1, gatherRate(n)) * 3600) : q.left; return '<button type="button" class="sp" data-sq="' + x.j + '"><i>' + (n ? RI[n.t] || '📦' : '🧭') + '</i><span>' + stLabel(q) + ' ' + ft(Math.max(0, left || 0)) + '</span></button>'; }).join('');
      if (act.some(function (x) { return x.q.st === 1 || x.q.st === 2; })) h += '<button type="button" class="sp sp-all" data-st-all="1">↩ Tümü</button>';
      h += '<button type="button" class="sp sp-hub" data-st-hub="1">🧭 Seferler</button>';
    }
    if (ST.el.__ekh !== h) { ST.el.__ekh = h; ST.el.innerHTML = h; }
    ST.el.hidden = !!document.querySelector('.ek-ov') || !act.length && fold; ST.el.classList.toggle('fold', fold); var mr = mapv.getBoundingClientRect(); ST.el.style.left = (mr.left + 6) + 'px'; ST.el.style.top = (mr.top + mr.height * .42) + 'px';
  }
  function gatherRate(n) { if (!n) return 1; try { return W.nrate(n.lv) * (1 + W.wosBonus('Gathering Speed')) * 3; } catch (e) { return 1; } }

  /* ---------- 127) seferler merkezi ---------- */
  function hubRows() {
    var e = ek(), now = Date.now(), rows = [];
    (e.mf || []).forEach(function (x, j) { if (x) rows.push({ k: 'mf' + j, e: '🏇', n: (W.HH[x.h] || {}).n || 'Müfreze', left: (x.t1 - now) / 1000, ready: x.t1 <= now, go: function () { W.ergenekonFarm && W.ergenekonFarm.claimMf(j); } }); });
    var p = e.pets; if (p && p.sf) rows.push({ k: 'pet', e: '🐾', n: 'Yem seferi', left: (p.sf - now) / 1000, ready: p.sf <= now, go: function () { /* petTick otomatik toplar */ p.sf = Math.min(p.sf, now); } });
    var kg = e.kg || {}; if (W.ergenekonAv) W.ergenekonAv.kurgans().forEach(function (k) { var st = kg[k.id]; if (st && st.t1 && !st.done) rows.push({ k: 'kg' + k.id, e: '⛰', n: 'Kurgan Sv ' + k.lv, left: (st.t1 - now) / 1000, ready: st.t1 <= now, go: function () { W.ergenekonAv.openKurgan(k.id); } }); });
    return rows;
  }
  function openHub() {
    var o0 = document.getElementById('ek-hub'); if (o0) o0.remove();
    var R = hubRows(), ready = R.filter(function (r) { return r.ready; });
    var body = '<div class="hb-list">' + (R.map(function (r) { return '<div class="hb-r' + (r.ready ? ' rd' : '') + '"><i>' + r.e + '</i><span><b>' + esc(r.n) + '</b><small>' + (r.ready ? '✓' : ft(Math.max(0, r.left))) + '</small></span>' + (r.ready ? '<button type="button" data-hb="' + r.k + '">🎁</button>' : '') + '</div>'; }).join('') || '<p class="hb-none">🧭 —</p>') + '</div>' +
      '<div class="hb-new"><button type="button" data-hb-new="mf">🏇 Müfreze</button><button type="button" data-hb-new="pet">🐾 Pet</button><button type="button" data-hb-new="kg">⛰ Kurgan</button></div>' +
      (ready.length ? '<button type="button" class="yk-main" data-hb-all="1">🎁 Hepsini topla (' + ready.length + ')</button>' : '');
    var o = popup('Seferler', body, 'hb-card'); o.id = 'ek-hub';
    o.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-hb],[data-hb-all],[data-hb-new]'); if (!b) return;
      if (b.dataset.hbNew) { o.remove(); if (b.dataset.hbNew === 'mf' && W.ergenekonFarm) W.ergenekonFarm.openMf(); else if (b.dataset.hbNew === 'pet' && W.ergenekonIlerleme) W.ergenekonIlerleme.openPets(); else { W.tab = 'm'; rer(); } return; }
      var list = b.dataset.hbAll ? hubRows().filter(function (r) { return r.ready && r.k.indexOf('kg') !== 0; }) : hubRows().filter(function (r) { return r.k === b.dataset.hb; });
      o.remove(); list.forEach(function (r) { try { r.go(); } catch (e) {} });
      if (b.dataset.hbAll) { var kgs = hubRows().filter(function (r) { return r.ready && r.k.indexOf('kg') === 0; }); kgs.forEach(function (r, i) { setTimeout(function () { try { r.go(); } catch (e) {} }, 400 * (i + 1)); }); }
      save(); rer();
    });
  }
  W.ekOpenHub = openHub;
  function hubChip() {
    var bar = document.getElementById('ek-army'); if (!bar) return; var b = bar.querySelector('[data-ek-hub]'), R = hubRows(), rd = R.filter(function (r) { return r.ready; }).length;
    if (!b) { b = document.createElement('button'); b.type = 'button'; b.className = 'db-chip'; b.setAttribute('data-ek-hub', '1'); b.addEventListener('click', function (ev) { ev.stopPropagation(); openHub(); }); bar.appendChild(b); }
    var h = '<i>🧭</i><span><b>Seferler</b><small>' + (rd ? '🎁 ' + rd : R.length + ' yolda') + '</small></span>'; b.classList.toggle('on', !!rd); if (b.__ekh !== h) { b.__ekh = h; b.innerHTML = h; }
  }

  /* ---------- 132) bölgeye göre ganimet ---------- */
  var ZN = { el: null };
  function camLogical() { var w = W.world3d, h = w && w.selfPosition; if (!w || !w.controls || !h) return null; var t = w.controls.target; return { x: (t.x - h.x) / 4 + 50, y: (t.z - h.z) / 4 + 50 }; }
  function zone() {
    var mapv = document.getElementById('mapv'), coord = document.getElementById('ek-coord');
    if (!mapv || W.tab !== 'm' || !coord || coord.hidden) { if (ZN.el) ZN.el.hidden = true; return; }
    if (!ZN.el || !ZN.el.isConnected) { ZN.el = document.createElement('div'); ZN.el.id = 'ek-zone'; document.body.appendChild(ZN.el); }
    var cr = coord.getBoundingClientRect(); ZN.el.style.left = cr.left + 'px'; ZN.el.style.top = (cr.bottom + 4) + 'px';
    var p = camLogical(); if (!p) return; var s = S(), M = W.M || [], lvs = [], types = {}, R = 14, cm = 11; try { cm = W.cardMin(); } catch (e) {}
    M.forEach(function (m, i) { if (!m || i === 11) return; if (Math.hypot(m[3] - p.x, m[4] - p.y) < R) lvs.push(m[2]); });
    (s.nodes || []).forEach(function (n, i) { try { var q = W.pos(i); if (Math.hypot(q[0] - p.x, q[1] - p.y) < R) types[n.t] = 1; } catch (e) {} });
    var mx = lvs.length ? Math.max.apply(null, lvs) : 0, h = '';
    if (lvs.length) h += '<span>📜</span>' + (mx >= 4 ? '<span>🔷</span>' : '') + (mx >= 8 ? '<span>🔮</span>' : '') + (mx >= cm ? '<span>🃏</span>' : '') + ((S().l.ocak || 1) >= 25 ? '<span>🔥</span>' : '');
    Object.keys(types).forEach(function (t) { h += '<span>' + (RI[t] || '') + '</span>'; });
    h = h ? '<small>Sv ' + (lvs.length ? Math.min.apply(null, lvs) + '–' + mx : '—') + '</small>' + h : '';
    if (ZN.el.__ekh !== h) { ZN.el.__ekh = h; ZN.el.innerHTML = h; } ZN.el.hidden = !h || !!document.querySelector('.ek-ov');
  }

  /* ---------- 137) yer imine yeni isim ---------- */
  function bmRename() {
    var o = document.getElementById('ek-coordov'); if (!o) return;
    o.querySelectorAll('[data-co-bm]').forEach(function (b) { var row = b.parentNode; if (row.querySelector('.bm-ren')) return; var r = document.createElement('button'); r.type = 'button'; r.className = 'bm-ren'; r.dataset.ren = b.dataset.coBm; r.textContent = '✎'; row.insertBefore(r, b.nextSibling); });
  }
  document.addEventListener('click', function (ev) {
    var r = ev.target.closest && ev.target.closest('.bm-ren'); if (!r) return; ev.stopPropagation();
    var l = ek().bm || [], m = l[+r.dataset.ren]; if (!m) return; var n = W.prompt ? W.prompt('Yer imi adı:', m.n) : null; if (n === null) return;
    m.n = String(n || m.n).slice(0, 24); save(); var b = r.parentNode.querySelector('[data-co-bm] b'); if (b) b.textContent = '★ ' + m.n;
  }, true);

  /* ---------- 110) toplayıcı kahraman ---------- */
  var GH = { 'Oğuz Han': ['odun', 'Wood'], 'Fatih Sultan Mehmet': ['et', 'Meat'], 'Kubilay Han': ['demir', 'Iron'], 'Timur': ['komur', 'Coal'] };
  function gBonus(t) { var s = S(), best = 0; (W.HH || []).forEach(function (h, i) { var g = GH[h.n]; if (g && g[0] === t && (s.hs[i] || 0) > 0) best = Math.max(best, .025 * (s.hs[i] || 0) + .025); }); return Math.min(.15, best); }
  function hookGather() {
    var o = W.wosBonus; if (typeof o !== 'function' || o.__ekSf) return;
    var f = function (label) { var v = o.apply(this, arguments); try { for (var k in GH) { if (label === GH[k][1] + ' Gathering Speed') { v += gBonus(GH[k][0]); break; } } } catch (e) {} return v; };
    for (var k in o) f[k] = o[k]; f.__ekSf = true; W.wosBonus = f;
  }
  function heroGatherIcon() {
    var kh = document.getElementById('ek-kh'); if (!kh || W.tab !== 'u') return;
    kh.querySelectorAll('.kh-t[data-kh]').forEach(function (t) { var h = W.HH[+t.dataset.kh], g = h && GH[h.n]; if (!g || t.querySelector('.kh-g')) return; t.insertAdjacentHTML('beforeend', '<i class="kh-g" title="Toplama uzmanı">' + RI[g[0]] + '</i>'); });
    var on = kh.querySelector('.kh-t.on'), det = kh.querySelector('.kh-det'); if (!on || !det) return; var h = W.HH[+on.dataset.kh], g = h && GH[h.n]; var ex = det.querySelector('.kh-gx');
    var txt = g ? RI[g[0]] + ' +%' + Math.round(gBonus(g[0]) * 100 || 5) : '';
    if (!g) { if (ex) ex.remove(); return; } if (ex && ex.textContent === txt) return; if (ex) ex.remove();
    var h3 = det.querySelector('h3'); if (h3) h3.insertAdjacentHTML('afterend', '<div class="kh-gx">' + txt + '</div>');
  }
  function sendHint() { // "Gönder" akıllı seçiminde uzman kahraman görünür
    var sh = document.getElementById('ek-send'); if (!sh) return; var n = S().nodes[W.sel]; if (!n) return; var b = gBonus(n.t); if (!b || sh.querySelector('.sd-hero')) return;
    var who = Object.keys(GH).filter(function (k) { return GH[k][0] === n.t; })[0]; var card = sh.querySelector('.ek-modal,.yk-card') || sh;
    card.insertAdjacentHTML('beforeend', '<div class="sd-hero">🦸 ' + esc(who) + ' · ' + RI[n.t] + ' +%' + Math.round(b * 100) + '</div>');
  }

  /* ---------- 121) Atlı Okçu yolu ---------- */
  var AO = [['kisla', 35, '🏕️'], ['ocak', 35, '🔥'], ['harpakademi', 10, '🎖️']];
  function openAO() {
    var s = S(), B = W.B || {};
    var body = '<div class="ao-path">' + AO.map(function (a, i) { var L = s.l[a[0]] || 0, ok = L >= a[1]; return (i ? '<b class="ao-ar">›</b>' : '') + '<button type="button" class="ao-st' + (ok ? ' ok' : '') + '" data-ao="' + a[0] + '"><i>' + a[2] + '</i><small>' + esc((B[a[0]] || {}).n || a[0]) + '</small><b>' + L + '/' + a[1] + '</b><u><em style="width:' + Math.min(100, L / a[1] * 100).toFixed(0) + '%"></em></u></button>'; }).join('') + '</div><div class="ao-goal">🏹🐎 T10</div>';
    var o = popup('Atlı Okçu yolu', body, 'ao-card');
    o.addEventListener('click', function (ev) { var b = ev.target.closest('[data-ao]'); if (!b) return; o.remove(); W.tab = 'c'; rer(); setTimeout(function () { try { W.city3d.openBuilding(b.dataset.ao); } catch (e) {} }, 250); });
  }
  document.addEventListener('click', function (ev) { var a = ev.target.closest && ev.target.closest('#ek-army .ao'); if (!a) return; ev.stopPropagation(); openAO(); }, true);

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 500) { l1 = now; try { strip(); zone(); bmRename(); hubChip(); heroGatherIcon(); sendHint(); } catch (e) {} }
    if (now - l2 > 3000) { l2 = now; try { hookGather(); } catch (e) {} }
  }
  function start() { if (!S() || !W.M) { setTimeout(start, 400); return; } hookGather(); requestAnimationFrame(frame); }
  start();
})();
