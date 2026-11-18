/* Ergenekon — C aşaması: harita ve av. Claude, 18 Kasım 2026.
   47 okunurluk (uzakta yalnız büyük hedefler) · 48 hafif hareket · 49 efsane aurası
   27 günlük işaretli av (çift ganimet) · 26 av ustalığı · 31 kurgan hazineleri (sis kalkar)
   Kalıcı: s.ek.ms (ustalık sayaçları), s.ek.mk (işaretli av günü/kesilenler), s.ek.kg (kurganlar) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekAv) return; W.__ekAv = true;
  function S() { return W.s; }
  function ek() { var s = S(); if (!s) return null; s.ek = s.ek || {}; s.ek.ms = s.ek.ms || {}; s.ek.kg = s.ek.kg || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function today() { var d = new Date(); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function rnd(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function base(i) { try { return W.monsterBase(i); } catch (e) { return i; } }
  function lvOf(i) { var M = W.M || [], az = W.X6 && W.X6.isAz ? W.X6.isAz(i) : false; return M[i] ? M[i][2] + (az ? 2 : 0) : 0; }

  /* ---------- 26) av ustalığı ---------- */
  var TIERS = [[25, .02], [100, .05], [250, .08], [500, .12], [1000, .18]];
  function mastery(b) { var n = (ek().ms[b] || 0), bonus = 0, next = TIERS[0][0], tier = 0; TIERS.forEach(function (t, i) { if (n >= t[0]) { bonus = t[1]; tier = i + 1; next = TIERS[i + 1] ? TIERS[i + 1][0] : null; } }); return { n: n, bonus: bonus, next: next, tier: tier }; }

  /* ---------- 27) günlük işaretli av ---------- */
  function marked() {
    var e = ek(), s = S(), d = today();
    if (!e.mk || e.mk.d !== d) {
      var M = W.M || [], o = s.l.ocak || 1, pool = [];
      M.forEach(function (x, i) { if (x && i >= 13 && lvOf(i) <= o && !(W.fog && W.fog(x[3], x[4]))) pool.push(i); });
      var pick = [];
      for (var k = 0; pick.length < 3 && k < 60 && pool.length; k++) { var j = pool[Math.floor(rnd(d + k * 13) * pool.length)]; if (pick.indexOf(j) < 0) pick.push(j); }
      e.mk = { d: d, ids: pick, done: [] };
    }
    return e.mk;
  }
  function isMarked(i) { var m = marked(); return m.ids.indexOf(i) >= 0 && m.done.indexOf(i) < 0; }
  W.ekIsMarked = isMarked;

  /* ganimet çarpanı: öldürmeden sonra kaynak/toz farkını oranla ekle */
  function hookFight() {
    if (typeof W.fight !== 'function' || W.fight.__ekAv) return;
    var o = W.fight, f = function (m) {
      var s = S(), k0 = s.stat.kills, r0 = { odun: s.r.odun, et: s.r.et, demir: s.r.demir }, ud0 = s.ud || 0, mk = isMarked(m), b = base(m);
      var out = o.apply(this, arguments);
      try {
        if (s.stat.kills > k0) {
          var e = ek(); e.ms[b] = (e.ms[b] || 0) + 1;
          var ms = mastery(b), mult = (mk ? 1 : 0) + ms.bonus, cap = Infinity; try { cap = W.cap(); } catch (x) {}
          if (mult > 0) {
            ['odun', 'et', 'demir'].forEach(function (r) { var d = (s.r[r] || 0) - (r0[r] || 0); if (d > 0) s.r[r] = Math.min(cap, s.r[r] + Math.round(d * mult)); });
            var du = (s.ud || 0) - ud0; if (du > 0) s.ud += Math.round(du * mult);
          }
          if (mk) {
            e.mk.done.push(m);
            if (W.ergenekonDemirci && W.ergenekonDemirci.rollMats) { var g = W.ergenekonDemirci.rollMats(lvOf(m)); if (g.length) s.last = (s.last || '') + ' · ⚒️ ' + g.join(', '); }
            s.last = (s.last || '') + ' · ✦ İşaretli av: çift ganimet';
          }
          var before = TIERS.filter(function (t) { return ms.n - 1 >= t[0]; }).length;
          if (ms.tier > before) try { W.add('🏹 ' + (W.M[m] ? W.M[m][0] : 'Av') + ' ustalığı ' + ms.tier + '. kademe: ganimet +%' + Math.round(ms.bonus * 100)); } catch (x) {}
          save();
        }
      } catch (x) {}
      return out;
    };
    for (var p in o) f[p] = o[p];
    f.__ekAv = true; W.fight = f;
  }

  /* hedef panelinde ustalık çubuğu + işaret */
  function panel() {
    var mi = document.getElementById('mapi'); if (!mi || W.tab !== 'm') return;
    var m = typeof W.selM === 'number' ? W.selM : -1; if (m < 0 || m >= (W.RIFT_OFFSET || 1000) || !W.M[m]) return;
    var key = m + ':' + (ek().ms[base(m)] || 0) + ':' + isMarked(m);
    var ex = mi.querySelector('.av-ms'); if (ex && ex.dataset.k === key) return; if (ex) ex.remove();
    var ms = mastery(base(m)), pc = ms.next ? Math.min(100, ms.n / ms.next * 100) : 100;
    var h = '<div class="av-ms" data-k="' + key + '">' + (isMarked(m) ? '<span class="av-mk">✦ İşaretli av · ×2</span>' : '') +
      '<div class="av-bar"><span>🏹 ' + ms.tier + '</span><i><u style="width:' + pc.toFixed(0) + '%"></u></i><b>' + nf(ms.n) + (ms.next ? '/' + ms.next : '') + '</b>' + (ms.bonus ? '<em>+%' + Math.round(ms.bonus * 100) + '</em>' : '') + '</div></div>';
    var card = mi.querySelector('.card') || mi; var h3 = card.querySelector('h3');
    if (h3) h3.insertAdjacentHTML('afterend', h); else card.insertAdjacentHTML('afterbegin', h);
  }

  /* ---------- 47/48/49) harita: okunurluk, hareket, aura, işaret parıltısı ---------- */
  var FX = { auras: {}, C: null, marks: {} };
  function classes() {
    if (FX.C) return FX.C;
    var w = W.world3d; if (!w || !w.scene) return null; var C = {};
    w.scene.traverse(function (o) { if (o.isMesh && o.geometry) { C[o.geometry.type] = C[o.geometry.type] || o.geometry.constructor; if (!C.Mesh) C.Mesh = o.constructor; if (o.material && o.material.type === 'MeshStandardMaterial' && !C.Mat) C.Mat = o.material.constructor; if (o.material && o.material.type === 'MeshBasicMaterial' && !C.Basic) C.Basic = o.material.constructor; } });
    if (!C.Mesh || !C.SphereGeometry || !C.Mat) return null; return (FX.C = C);
  }
  function mapFx(now) {
    var w = W.world3d; if (!w || !w.pveGroup || W.tab !== 'm') return;
    var far = w.camera && w.camera.zoom < .42, t = now / 1000, s = S(), o = s.l.ocak || 1, L = W.ekFaunaLegend || {};
    var C = classes();
    w.pveGroup.children.forEach(function (g) {
      var a = g.userData && g.userData.worldAction; if (!a) return;
      if (a.kind === 'monster' || a.kind === 'node') {
        if (g.__ekVis === undefined) g.__ekVis = g.visible;
        if (far && g.visible) { g.visible = false; g.__ekFar = true; } else if (!far && g.__ekFar) { g.visible = true; g.__ekFar = false; }
      }
      if (a.kind === 'monster' && g.visible) {
        var i = a.index, ph = (i * 1.7) % 6.28;
        if (g.__ekRy === undefined) g.__ekRy = g.rotation.y;
        g.rotation.y = g.__ekRy + Math.sin(t * .35 + ph) * .45;           // yavaş dönüp etrafa bakma
        var sc = g.userData.worldVisualScale || 1; g.scale.y = (g.__ekSy || (g.__ekSy = g.scale.y)) * (1 + Math.sin(t * 1.6 + ph) * .018); // nefes
        // efsane aurası
        if (C && L[base(i)] && !FX.auras[i]) {
          var m = new C.Mat({ color: '#bfe8ff', emissive: '#bfe8ff', emissiveIntensity: 1.1, transparent: true, opacity: .2, depthWrite: false });
          var au = new C.Mesh(new C.SphereGeometry(1, 16, 12), m); au.scale.set(2.6, 1.8, 2.6); au.position.y = 1.4; au.renderOrder = 3; g.add(au); FX.auras[i] = au;
        }
        if (FX.auras[i]) FX.auras[i].material.opacity = .14 + Math.sin(t * 2 + ph) * .07;
      }
    });
  }

  /* ---------- 31) kurgan hazineleri ---------- */
  function week() { var d = new Date(), j = new Date(d.getFullYear(), 0, 1); return d.getFullYear() * 100 + Math.ceil(((d - j) / 864e5 + j.getDay() + 1) / 7); }
  function kurgans() {
    var wk = week(), list = [];
    for (var i = 0; i < 6; i++) { var a = rnd(wk * 7 + i) * Math.PI * 2, r = 22 + rnd(wk * 3 + i * 5) * 22; list.push({ id: wk + '-' + i, x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r, lv: Math.max(1, Math.round((r - 18) / 1.3)) }); }
    return list;
  }
  var KG = { el: null, pool: {}, v: null };
  function kgState(k) { return ek().kg[k.id]; }
  function kurganLayer() {
    var w = W.world3d, mapv = document.getElementById('mapv');
    if (!w || !w.camera || !mapv || W.tab !== 'm' || !w.selfPosition) { if (KG.el) KG.el.hidden = true; return; }
    if (!KG.el || !KG.el.isConnected) { KG.el = document.createElement('div'); KG.el.id = 'ek-kg'; KG.pool = {}; KG.el.addEventListener('click', function (ev) { var b = ev.target.closest('[data-kg]'); if (b) openKurgan(b.dataset.kg); }); }
    if (KG.el.parentNode !== mapv) mapv.appendChild(KG.el);
    KG.el.hidden = false;
    if (!KG.v) KG.v = new w.camera.position.constructor();
    var h = w.selfPosition, r = w.renderer.domElement.getBoundingClientRect(), mb = mapv.getBoundingClientRect(), now = Date.now();
    kurgans().forEach(function (k) {
      var st = kgState(k), b = KG.pool[k.id];
      if (st && st.done) { if (b) b.hidden = true; return; }
      KG.v.set(h.x + (k.x - 50) * 4, 2, h.z + (k.y - 50) * 4).project(w.camera);
      var off = KG.v.z > 1 || Math.abs(KG.v.x) > 1.05 || Math.abs(KG.v.y) > 1.05;
      if (!b) { b = KG.pool[k.id] = document.createElement('button'); b.type = 'button'; b.className = 'ek-kgm'; b.dataset.kg = k.id; KG.el.appendChild(b); }
      if (off) { b.hidden = true; return; }
      var html = st && st.t1 ? (st.t1 <= now ? '<i>🎁</i>' : '<i>⏳</i><small>' + ft((st.t1 - now) / 1000) + '</small>') : '<i>⛰</i>';
      if (b.__ekh !== html) { b.__ekh = html; b.innerHTML = html; }
      b.classList.toggle('fog', !!(W.fog && W.fog(k.x, k.y))); b.classList.toggle('ready', !!(st && st.t1 && st.t1 <= now));
      b.style.transform = 'translate(' + (r.left - mb.left + (KG.v.x + 1) / 2 * r.width).toFixed(1) + 'px,' + (r.top - mb.top + (1 - KG.v.y) / 2 * r.height).toFixed(1) + 'px)';
      b.hidden = false;
    });
  }
  function kgReward(k) {
    var s = S(), out = [], dm = (s.ek.dm = s.ek.dm || {}); dm.mat = dm.mat || { kagit: 0, safir: 0, opal: 0 };
    var n = 1 + Math.floor(k.lv / 8); dm.mat.kagit += n; out.push(['📜', '+' + n]);
    if (rnd(k.lv * 31 + Date.now() % 997) < .45) { dm.mat.safir += 1; out.push(['🔷', '+1']); }
    if (rnd(k.lv * 17 + Date.now() % 991) < .3) { dm.mat.opal += 1; out.push(['🔮', '+1']); }
    if (W.HH && s.hc) { var h = Math.floor(rnd(Date.now() % 9973) * W.HH.length); s.hc[h] = (s.hc[h] || 0) + 1; out.push(['🃏', W.HH[h].n]); }
    return out;
  }
  function hookFog() {
    if (typeof W.fog !== 'function' || W.fog.__ekAv) return;
    var o = W.fog, f = function (x, y) { if (!o(x, y)) return false; var rv = (ek() && ek().rv) || []; for (var i = 0; i < rv.length; i++) if (Math.hypot(x - rv[i][0], y - rv[i][1]) < 9) return false; return true; };
    f.__ekAv = true; W.fog = f;
  }
  function openKurgan(id) {
    var k = kurgans().filter(function (x) { return x.id === id; })[0]; if (!k) return;
    var e = ek(), st = e.kg[id], now = Date.now(), dist = Math.hypot(k.x - 50, k.y - 50), secs = Math.round(120 + dist * 18);
    if (st && st.t1 && st.t1 <= now && !st.done) {
      var rw = kgReward(k); st.done = 1;
      var e2 = ek(); e2.rv = e2.rv || []; e2.rv.push([Math.round(k.x * 10) / 10, Math.round(k.y * 10) / 10]); if (e2.rv.length > 60) e2.rv.shift(); hookFog(); // yalnız o bölgenin sisi kalkar
      save(); try { W.render(); } catch (x) {}
      if (W.ekReport) W.ekReport({ title: 'Kurgan Hazinesi', win: true, sub: 'Sis kalktı', rows: rw });
      return;
    }
    var o = document.createElement('div'); o.className = 'ek-ov ek-sheet'; o.id = 'ek-kgov';
    var going = st && st.t1;
    o.innerHTML = '<div class="ek-modal ek-small"><div class="ek-mh"><span class="ek-cap">KEŞİF</span><h2>⛰ Kurgan · Sv ' + k.lv + '</h2><button type="button" class="ek-x" data-ek-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="sv-stats"><span><i>📜</i><b>' + (1 + Math.floor(k.lv / 8)) + '</b></span><span><i>🔷🔮</i><b>?</b></span><span><i>🃏</i><b>1</b></span><span><i>⏱</i><b>' + ft(going ? Math.max(0, (st.t1 - now) / 1000) : secs) + '</b></span></div>' +
      '<div class="ek-acts ek-fgo"><button type="button" class="ek-btn gold" data-kg-go="1"' + (going ? ' disabled' : '') + '>' + (going ? '⏳ Keşif yolda' : '🧭 Keşif birliği gönder') + '</button></div></div>';
    o.addEventListener('click', function (ev) {
      var t = ev.target;
      if (t === o || t.closest('[data-ek-close]')) { o.remove(); return; }
      if (t.closest('[data-kg-go]') && !going) { e.kg[id] = { t1: Date.now() + secs * 1000 }; save(); o.remove(); try { navigator.vibrate && navigator.vibrate(15); } catch (x) {} }
    });
    document.body.appendChild(o);
  }

  var lastSec = 0, lastMid = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    try { mapFx(now); } catch (e) {}
    if (now - lastMid > 120) { lastMid = now; try { kurganLayer(); } catch (e) {} }
    if (now - lastSec > 700) { lastSec = now; try { hookFight(); panel(); marked(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.fight !== 'function') { setTimeout(start, 400); return; } hookFight(); hookFog(); requestAnimationFrame(frame); }
  start();
  W.ergenekonAv = { mastery: mastery, marked: marked, kurgans: kurgans, openKurgan: openKurgan };
})();
