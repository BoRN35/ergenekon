/* Ergenekon — Demirci (eşya basma) sistemi. Claude, 18 Kasım 2026.
   - Eşya "+" basma yalnızca Demirci'de yapılır (profil düğmeleri gizlenir).
   - Basma demirin yanında canavarlardan düşen malzeme ister: Yükseltme Kağıdı, Safir, Opal.
   - Demirci yükseltilebilir: harita toplama hızı + basma şansı; Sv 5 ve Sv 10'da düşüş koruması.
   - 3D: obada örste demir döven usta. Kalıcı veri s.ek.dm altında. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekDemirci) return; W.__ekDemirci = true;

  var MAT = {
    kagit: { n: 'Yükseltme Kağıdı', e: '📜', c: '#d9c08a' },
    safir: { n: 'Safir', e: '🔷', c: '#4f8fe0' },
    opal: { n: 'Opal', e: '🔮', c: '#c58ae0' }
  };
  var MAXLV = 15, POS = [11, 22];
  var SLOTN = { w: 'Silah', b: 'Kafa', k: 'Kol', g: 'Göğüs', l: 'Alt', f: 'Ayak', e0: 'Küpe 1', e1: 'Küpe 2', y0: 'Yüzük 1', y1: 'Yüzük 2' };
  var RCOL = ['#8a97a3', '#2f8f5b', '#7b61ff', '#e0922b', '#e0473e'];

  function S() { return W.s; }
  function dm() {
    var s = S(); if (!s) return null;
    s.ek = s.ek || {};
    var d = s.ek.dm = s.ek.dm || {};
    if (!d.mat) d.mat = { kagit: 0, safir: 0, opal: 0 };
    if (!d.lv) d.lv = 0;
    return d;
  }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function log(m) { try { W.add(m); } catch (e) {} }
  function persist() { try { W.save(); } catch (e) {} }
  function rerender() { try { W.render(); } catch (e) {} }
  function ocak() { var s = S(); return (s && s.l && s.l.ocak) || 1; }
  function lv() { var d = dm(); return d ? d.lv : 0; }

  /* ---------- kurallar ---------- */
  function maxLv() { return Math.min(MAXLV, ocak()); }
  function buildCost(l) { var g = Math.pow(1.55, l); return { odun: Math.round(600 * g), et: Math.round(350 * g), demir: Math.round(180 * g) }; }
  function buildSecs(l) { return Math.round(600 * Math.pow(1.45, l)); }
  function gatherBonus(l) { return 0.03 * l; }
  function chanceMul(l) { return 1 + 0.03 * l; }
  function protect(l) { return l >= 10 ? 1 : l >= 5 ? 0.5 : 0; }
  function matCost(p) { return { kagit: p + 1, safir: p >= 4 ? p - 3 : 0, opal: p >= 8 ? p - 7 : 0 }; }
  function haveRes(c) { var r = S().r; for (var k in c) if ((r[k] || 0) < c[k]) return false; return true; }
  function haveMat(c) { var m = dm().mat; for (var k in c) if ((m[k] || 0) < c[k]) return false; return true; }
  function rc(k, need, have) { return '<span class="dm-c ' + (have >= need ? 'ok' : 'no') + '">' + k + ' ' + nf(need) + '</span>'; }

  /* ---------- canavar ganimeti ---------- */
  function rollMats(L) {
    var got = [], d = dm(); if (!d) return got;
    if (Math.random() < 0.05) { var n = 1 + (L >= 10 ? 1 : 0) + (L >= 20 ? 1 : 0); d.mat.kagit += n; got.push(n + ' ' + MAT.kagit.n); }
    if (L >= 4 && Math.random() < 0.025) { d.mat.safir += 1; got.push('1 ' + MAT.safir.n); }
    if (L >= 8 && Math.random() < 0.025) { d.mat.opal += 1; got.push('1 ' + MAT.opal.n); }
    return got;
  }
  function hookFight() {
    if (typeof W.fight !== 'function' || W.fight.__dm) return false;
    var orig = W.fight;
    var f = function (m) {
      var s = S(), k0 = s && s.stat ? s.stat.kills : 0;
      var out = orig.apply(this, arguments);
      try {
        s = S();
        if (s && s.stat && s.stat.kills > k0 && W.M && W.M[m]) {
          var az = W.X6 && W.X6.isAz ? W.X6.isAz(m) : false;
          var got = rollMats(W.M[m][2] + (az ? 2 : 0));
          if (got.length) { s.last = (s.last || '') + ' · ⚒️ ' + got.join(', '); log('⚒️ Demirci malzemesi düştü: ' + got.join(', ') + '.'); persist(); }
        }
      } catch (e) {}
      return out;
    };
    for (var k in orig) f[k] = orig[k];
    f.__dm = true; W.fight = f; return true;
  }
  function hookBonuses() {
    if (typeof W.wosBonus === 'function' && !W.wosBonus.__dm) {
      var ob = W.wosBonus;
      var nb = function (label) { var v = ob.apply(this, arguments); if (label === 'Gathering Speed') v += gatherBonus(lv()); return v; };
      nb.__dm = true; W.wosBonus = nb;
    }
    if (typeof W.upch === 'function' && !W.upch.__dm) {
      var oc = W.upch;
      var nc = function (x) { return Math.min(0.95, oc.apply(this, arguments) * chanceMul(lv())); };
      nc.__dm = true; W.upch = nc;
    }
  }

  /* ---------- yapı inşası / yükseltme ---------- */
  function settle() {
    var d = dm(); if (!d || !d.t1) return;
    if (Date.now() >= d.t1) { d.lv += 1; d.t1 = 0; log('⚒️ Demirci Sv ' + d.lv + ' oldu. Toplama +%' + Math.round(gatherBonus(d.lv) * 100) + ', basma şansı ×' + chanceMul(d.lv).toFixed(2) + '.'); persist(); rerender(); refreshWin(); }
  }
  function startBuild() {
    var d = dm(), s = S(); if (!d || d.t1 || d.lv >= maxLv() || ocak() < 3) return;
    var c = buildCost(d.lv); if (!haveRes(c)) return;
    for (var k in c) s.r[k] -= c[k];
    d.t1 = Date.now() + buildSecs(d.lv) * 1000;
    log('⚒️ Demirci ' + (d.lv ? 'Sv ' + (d.lv + 1) + ' yükseltmesi' : 'inşası') + ' başladı (' + ft(buildSecs(d.lv)) + ').');
    persist(); rerender(); refreshWin();
  }

  /* ---------- basma ---------- */
  function itemById(id) {
    var s = S(); if (!s || !s.ch || !id) return null;
    var p = id.split(':');
    if (p[0] === 'q') return s.ch.eq[p[1]] ? { x: s.ch.eq[p[1]], worn: true } : null;
    if (p[0] === 'i') return s.ch.inv[+p[1]] ? { x: s.ch.inv[+p[1]], worn: false } : null;
    return null;
  }
  function enhance(id) {
    var s = S(), d = dm(), o = itemById(id); if (!o || !d || d.lv < 1) return;
    var x = o.x, p = x.p || 0, max = W.UPM || 12; if (p >= max) return;
    var dem = 0, ch = 0; try { dem = W.ucost(x); ch = W.upch(x); } catch (e) { return; }
    var mc = matCost(p); if ((s.r.demir || 0) < dem || !haveMat(mc)) return;
    for (var m in mc) d.mat[m] -= mc[m];
    s.r.demir -= dem;
    var res;
    if (Math.random() < ch) {
      x.p = p + 1; res = 'ok'; log('✅ ' + x.n + ' +' + x.p + ' oldu.');
      try { if (x.p >= 8) W.X6.ann('✦ ' + x.n + ' +' + x.p + ' yapıldı'); W.snd(620, .12); } catch (e) {}
      hammerHit(true);
    } else if (p >= 5) {
      if (Math.random() < protect(d.lv)) { res = 'kept'; log('🛡️ Demirci ustası düşüşü önledi: ' + x.n + ' +' + p + ' olarak kaldı.'); }
      else { x.p = p - 1; res = 'drop'; log('❌ ' + x.n + ' basması tutmadı, +' + x.p + ' seviyesine düştü.'); }
      try { W.snd(180, .15); } catch (e) {} hammerHit(false);
    } else { res = 'fail'; log('❌ ' + x.n + ' basması tutmadı (malzeme harcandı).'); try { W.snd(180, .15); } catch (e) {} hammerHit(false); }
    if (o.worn) try { s.ch.hp = Math.min(s.ch.hp, W.cs().hp); } catch (e) {}
    W.__dmLast = { id: id, res: res, p: x.p || 0 };
    persist(); rerender(); refreshWin();
  }

  /* ---------- pencere ---------- */
  var UI = { tab: 'bas', sel: null };
  function matRow() {
    var m = dm().mat;
    return '<div class="dm-mats">' + Object.keys(MAT).map(function (k) { return '<span class="dm-mat" style="--mc:' + MAT[k].c + '"><i>' + MAT[k].e + '</i><b>' + nf(m[k] || 0) + '</b><small>' + MAT[k].n + '</small></span>'; }).join('') + '</div>';
  }
  function tile(it, extra) { return W.ekTileHtml ? W.ekTileHtml(it, extra) : ''; }
  function basHtml() {
    var s = S(), d = dm();
    if (d.lv < 1) return '<div class="dm-empty">Eşya basmak için önce Demirci’yi inşa et.<br><button type="button" class="ek-btn gold" data-dm-tab="yapi">Demirci’ye git</button></div>';
    var o = itemById(UI.sel); if (!o) UI.sel = null;
    var slot = o ? tile({ id: UI.sel, cat: 'eq', x: o.x, worn: o.worn, r: o.x.r || 0 }) : '<button type="button" class="ci-tile dm-emptyslot" data-dm-pick="1"><span>+</span><small>Eşya seç</small></button>';
    var p = o ? (o.x.p || 0) : 0, mc = matCost(p), max = W.UPM || 12;
    var mats = Object.keys(MAT).map(function (k) {
      var have = d.mat[k] || 0, need = o ? mc[k] : 0, it = { id: 'm:' + k, cat: 'mat', mat: k, n: have, r: { kagit: 1, safir: 2, opal: 3 }[k] };
      return '<div class="dm-ms' + (need > 0 ? (have >= need ? ' ok' : ' no') : ' off') + '">' + tile(it, { dis: true }) + '<small>' + (need > 0 ? nf(have) + ' / ' + need : MAT[k].n) + '</small></div>';
    }).join('');
    var info = '', btn = '';
    if (!o) info = '<p class="dm-note dm-center">Örse koymak için yukarıdaki kutuya dokun; çantadaki eşyaların açılır.</p>';
    else if (p >= max) info = '<p class="dm-ok dm-center">En yüksek basma seviyesi (+' + max + ').</p>';
    else {
      var dem = 0, ch = 0; try { dem = W.ucost(o.x); ch = W.upch(o.x); } catch (e) {}
      var can = (s.r.demir || 0) >= dem && haveMat(mc);
      var risk = p >= 5 ? (protect(d.lv) >= 1 ? 'Tutmazsa seviye düşmez (Demirci Sv 10).' : protect(d.lv) > 0 ? 'Tutmazsa seviye düşebilir; usta %50 ihtimalle önler.' : 'Dikkat: tutmazsa seviye 1 düşer.') : 'Tutmazsa seviye düşmez.';
      var L = W.__dmLast && W.__dmLast.id === UI.sel ? ({ ok: '<p class="dm-res ok">✅ Başarılı! +' + W.__dmLast.p + '</p>', fail: '<p class="dm-res no">❌ Tutmadı, malzeme harcandı.</p>', drop: '<p class="dm-res no">❌ Tutmadı, +' + W.__dmLast.p + ' seviyesine düştü.</p>', kept: '<p class="dm-res ok">🛡️ Tutmadı ama usta düşüşü önledi.</p>' })[W.__dmLast.res] || '' : '';
      info = '<div class="dm-arrow"><b>+' + p + '</b><i>→</i><b class="nx">+' + (p + 1) + '</b></div>' +
        '<div class="dm-chance"><span>Başarı şansı</span><b>%' + (ch * 100).toFixed(ch < 0.01 ? 2 : 1) + '</b><i><u style="width:' + Math.min(100, ch * 100).toFixed(1) + '%"></u></i></div>' +
        '<div class="dm-costs">' + rc('⛓️ Demir', dem, s.r.demir || 0) + '</div><p class="dm-note">' + risk + '</p>' + L;
      btn = '<button type="button" class="ek-btn gold dm-go" data-dm-up="' + UI.sel + '"' + (can ? '' : ' disabled') + '>⚒️ Bas</button>';
    }
    return '<div class="dm-anvil"><div class="dm-slotwrap">' + slot + (o ? '<button type="button" class="dm-swap" data-dm-pick="1">Değiştir</button>' : '') + '</div>' +
      (o ? '<div class="dm-iname" style="color:' + (['#8a97a3', '#3fae6b', '#8b6cff', '#f0a033', '#ef4f42'][Math.min(4, o.x.r || 0)]) + '">' + esc(o.x.n) + '</div>' : '') +
      '<div class="dm-mrow">' + mats + '</div>' + info + btn + '</div>';
  }
  function yapiHtml() {
    var d = dm(), l = d.lv, nx = l + 1, s = S(), mx = maxLv();
    var cur = '<ul class="dm-bon"><li>Harita toplama hızı <b>+%' + Math.round(gatherBonus(l) * 100) + '</b></li><li>Basma şansı <b>×' + chanceMul(l).toFixed(2) + '</b></li><li>Düşüş koruması <b>' + (protect(l) >= 1 ? 'Tam' : protect(l) > 0 ? '%50' : 'Yok') + '</b></li></ul>';
    var act;
    if (d.t1) {
      var left = Math.max(0, (d.t1 - Date.now()) / 1000), tot = buildSecs(l);
      act = '<div class="dm-prog"><span>' + (l ? 'Sv ' + nx + ' yükseltiliyor' : 'İnşa ediliyor') + '</span><b data-dm-left>' + ft(left) + '</b><i><u style="width:' + (100 - left / tot * 100).toFixed(1) + '%"></u></i></div>';
    } else if (ocak() < 3) act = '<p class="dm-note">Demirci, Kutsal Ocak Sv 3’te açılır.</p>';
    else if (l >= mx) act = '<p class="dm-note">' + (l >= MAXLV ? 'En yüksek seviye.' : 'Sonraki seviye için Kutsal Ocak Sv ' + (l + 1) + ' gerekir.') + '</p>';
    else {
      var c = buildCost(l), r = s.r;
      act = '<div class="dm-next"><h4>' + (l ? 'Sv ' + nx + ' ile' : 'İnşa edince') + '</h4><ul class="dm-bon"><li>Toplama <b>+%' + Math.round(gatherBonus(nx) * 100) + '</b></li><li>Basma şansı <b>×' + chanceMul(nx).toFixed(2) + '</b></li>' + (nx === 5 ? '<li class="dm-new">Yeni: %50 düşüş koruması</li>' : nx === 10 ? '<li class="dm-new">Yeni: tam düşüş koruması</li>' : '') + '</ul>' +
        '<div class="dm-costs">' + rc('🪵 Odun', c.odun, r.odun || 0) + rc('🍖 Et', c.et, r.et || 0) + rc('⛓️ Demir', c.demir, r.demir || 0) + '<span class="dm-c">⏱ ' + ft(buildSecs(l)) + '</span></div>' +
        '<button type="button" class="ek-btn gold dm-go" data-dm-build="1"' + (haveRes(c) ? '' : ' disabled') + '>' + (l ? '⬆ Sv ' + nx + '’e yükselt' : '⚒️ Demirci’yi inşa et') + '</button></div>';
    }
    return '<div class="dm-yapi"><div class="dm-lvl"><b>Sv ' + l + '</b><small>/ ' + mx + '</small></div><p class="dm-desc">Usta, obanın eşyalarını döver ve kafileler için sağlam aletler yapar. Her seviye haritada toplamayı hızlandırır, eşya basma şansını artırır.</p>' + cur + act + '</div>';
  }
  function winHtml() {
    var l = lv();
    return '<div class="ek-modal dm-modal" role="dialog" aria-modal="true" aria-label="Demirci">' +
      '<div class="ek-mh"><span class="ek-cap">OBANIN ÖRSÜ</span><h2>Demirci <small>Sv ' + l + '</small></h2><button type="button" class="ek-x" data-dm-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="ek-tabs"><button type="button" data-dm-tab="bas" class="' + (UI.tab === 'bas' ? 'on' : '') + '">Eşya Bas</button><button type="button" data-dm-tab="yapi" class="' + (UI.tab === 'yapi' ? 'on' : '') + '">Demirci</button></div>' +
      '<div class="dm-body">' + (UI.tab === 'bas' ? basHtml() : yapiHtml()) + '</div></div>';
  }
  function refreshWin() { var o = document.getElementById('ek-forge'); if (o) o.innerHTML = winHtml(); }
  function openForge(tab, itemId) {
    if (tab) UI.tab = tab; else UI.tab = lv() < 1 ? 'yapi' : 'bas';
    if (itemId) { UI.sel = itemId; W.__dmLast = null; }
    var o = document.getElementById('ek-forge');
    if (!o) {
      o = document.createElement('div'); o.id = 'ek-forge'; o.className = 'ek-ov ek-sheet'; document.body.appendChild(o);
      o.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t === o || t.closest('[data-dm-close]')) { o.remove(); return; }
        var b;
        if ((b = t.closest('[data-dm-tab]'))) { UI.tab = b.getAttribute('data-dm-tab'); refreshWin(); return; }
        if ((b = t.closest('[data-dm-pick]'))) { if (W.ekPickItem) W.ekPickItem({ title: 'Örse koy', sel: UI.sel, filter: function (it) { return it.cat === 'eq'; } }, function (id) { UI.sel = id; W.__dmLast = null; refreshWin(); }); return; }
        if ((b = t.closest('[data-dm-up]')) && !b.disabled) { enhance(b.getAttribute('data-dm-up')); return; }
        if ((b = t.closest('[data-dm-build]')) && !b.disabled) { startBuild(); return; }
      });
    }
    o.innerHTML = winHtml();
  }
  W.openDemirci = openForge;

  // Profildeki eski "güçlendir" düğmeleri artık Demirci'ye yönlendirir.
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-u]');
    if (!b || W.__dmForge || b.closest('#ek-forge')) return;
    ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
    openForge('bas', 'q:' + b.getAttribute('data-u'));
  }, true);

  /* ---------- 3D ---------- */
  var G = { ready: false };
  function initScene() {
    var c3 = W.city3d; if (!c3 || !c3.scene) return false;
    var scene = c3.scene, C = {};
    scene.traverse(function (o) {
      if (o.isMesh && o.geometry) { C[o.geometry.type] = C[o.geometry.type] || o.geometry.constructor; if (!C.Mesh) C.Mesh = o.constructor; if (o.material && o.material.type === 'MeshStandardMaterial' && !C.Mat) C.Mat = o.material.constructor; }
      if (o.isPointLight && !C.PL) C.PL = o.constructor;
      if (o.type === 'Group' && !C.Group) C.Group = o.constructor;
    });
    if (!C.Mesh || !C.Mat || !C.Group || !C.BoxGeometry || !C.CylinderGeometry || !C.ConeGeometry || !C.SphereGeometry) return false;
    function mat(col, o) { var m = new C.Mat(Object.assign({ color: col, roughness: .85 }, o || {})); return m; }
    function put(geo, m, parent, x, y, z) { var o = new C.Mesh(geo, m); o.position.set(x || 0, y || 0, z || 0); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; }
    var B = function (w, h, d) { return new C.BoxGeometry(w, h, d); }, Cy = function (a, b, h, s) { return new C.CylinderGeometry(a, b, h, s || 8); }, Co = function (r, h, s) { return new C.ConeGeometry(r, h, s || 8); }, Sp = function (r) { return new C.SphereGeometry(r, 10, 8); };
    var root = new C.Group(), x = POS[0], z = POS[1];
    root.position.set(x, 0, z); root.rotation.y = 0.66; root.scale.setScalar(1.15);
    var wood = mat('#7a5232'), dark = mat('#4a3020'), stone = mat('#8d8a82'), felt = mat('#cdb991'), bronze = mat('#b48a3c', { metalness: .6, roughness: .4 }), iron = mat('#4b4f55', { metalness: .7, roughness: .45 });
    var hot = mat('#ff6a1a', { emissive: '#ff5a10', emissiveIntensity: 1.6 }), coal = mat('#ff8a2a', { emissive: '#ff4a00', emissiveIntensity: 1.2 });
    var skin = mat('#c08a62'), apron = mat('#5a3a22'), cloth = mat('#7b2f22'), fur = mat('#6b5440');
    // zemin ve yapı
    put(B(7.2, .45, 5.6), stone, root, 0, .22, 0);
    for (var sx = -1; sx <= 1; sx += 2) for (var sz = -1; sz <= 1; sz += 2) put(Cy(.17, .2, 3.4, 6), wood, root, sx * 3.1, 2.1, sz * 2.3);
    put(B(6.6, 2.6, .25), wood, root, 0, 1.75, -2.4);
    for (var s2 = -1; s2 <= 1; s2 += 2) { var rf = put(B(3.9, .18, 5.6), felt, root, s2 * 1.75, 4.05, 0); rf.rotation.z = s2 * -.38; }
    put(B(.25, .25, 5.8), dark, root, 0, 4.72, 0);
    // hilal amblemi
    if (C.TorusGeometry) { var cr = put(new C.TorusGeometry(.45, .09, 6, 18, Math.PI * 1.45), bronze, root, 0, 3.55, 2.45); cr.rotation.z = .9; }
    // ocak / körük
    put(B(2.2, 1.6, 1.6), stone, root, -1.9, 1.25, -1.4);
    var coals = put(B(1.6, .25, 1.1), coal, root, -1.9, 2.1, -1.4);
    put(Cy(.35, .5, 2.4, 6), stone, root, -1.9, 3.3, -1.7);
    // örs
    put(B(.8, .7, .6), stone, root, .9, .8, .9);
    put(B(1.3, .3, .5), iron, root, .9, 1.3, .9);
    put(Co(.25, .5, 4), iron, root, 1.65, 1.3, .9).rotation.z = -Math.PI / 2;
    var bar = put(B(.9, .1, .12), hot, root, .8, 1.5, .9);
    // usta (örse bakar: -x yönü)
    var smith = new C.Group(); smith.position.set(2.35, .45, .9); smith.rotation.y = -Math.PI / 2; root.add(smith);
    for (var lg = -1; lg <= 1; lg += 2) put(Cy(.17, .15, 1.1, 7), dark, smith, lg * .24, .55, 0);
    put(Cy(.45, .38, 1.25, 10), cloth, smith, 0, 1.7, 0);
    put(B(.75, 1.15, .1), apron, smith, 0, 1.55, .38);
    put(Sp(.33), skin, smith, 0, 2.6, 0);
    put(Cy(.36, .4, .38, 10), fur, smith, 0, 2.9, 0);
    put(B(.36, .08, .1), mat('#3a2a1c'), smith, 0, 2.48, .3);
    var lArm = put(Cy(.12, .1, 1, 6), skin, smith, -.55, 1.75, .2); lArm.rotation.x = -.9;
    var arm = new C.Group(); arm.position.set(.55, 2.2, 0); smith.add(arm);
    put(Cy(.13, .11, 1, 6), skin, arm, 0, -.4, .1);
    var hammer = new C.Group(); hammer.position.set(0, -.85, .25); arm.add(hammer);
    put(Cy(.05, .05, .9, 5), wood, hammer, 0, 0, .35).rotation.x = Math.PI / 2;
    put(B(.28, .28, .45), iron, hammer, 0, 0, .8);
    // ışık ve kıvılcımlar
    var light = null; if (C.PL) { light = new C.PL('#ff8a3a', 2.2, 14, 1.8); light.position.set(-.6, 2.4, 0); root.add(light); }
    var sparks = []; for (var i = 0; i < 8; i++) { var sp = put(Sp(.06), hot, root, .8, 1.6, .9); sp.visible = false; sparks.push({ m: sp, v: [0, 0, 0], t: 0 }); }
    // inşa alanı (henüz yokken)
    var plot = new C.Group(); root.add(plot);
    for (var px = -1; px <= 1; px += 2) for (var pz = -1; pz <= 1; pz += 2) put(B(.14, .5, .14), wood, plot, px * 3, .25, pz * 2.2);
    put(B(6.2, .06, 4.6), mat('#a48d63'), plot, 0, .03, 0);
    var built = new C.Group(); root.children.slice().forEach(function (o) { if (o !== plot) { root.remove(o); built.add(o); } }); root.add(built);
    scene.add(root);
    G = { ready: true, root: root, built: built, plot: plot, arm: arm, bar: bar, coals: coals, light: light, sparks: sparks, smith: smith, t0: performance.now(), hit: 0 };
    return true;
  }
  function hammerHit(big) { if (!G.ready) return; G.burst = big ? 2 : 1; }
  function animate(now) {
    if (!G.ready) return;
    var d = dm(), l = d ? d.lv : 0;
    G.built.visible = l >= 1; G.plot.visible = l < 1;
    if (l < 1) return;
    var t = (now - G.t0) / 1000, cyc = (t % 1.1) / 1.1;
    // kaldır (0-.7) – vur (.7-.8) – sek (.8-1)
    var a = cyc < .7 ? -2.3 * (cyc / .7) : cyc < .8 ? -2.3 + 2.6 * ((cyc - .7) / .1) : .3 - .3 * ((cyc - .8) / .2);
    G.arm.rotation.x = a;
    var hitNow = cyc >= .78 && cyc < .83;
    if (hitNow && !G.hit) { G.hit = 1; spark(G.burst ? 8 : 4); G.burst = 0; } else if (!hitNow) G.hit = 0;
    var fl = .85 + Math.sin(t * 11) * .08 + Math.sin(t * 23) * .05;
    if (G.light) G.light.intensity = 2.0 * fl + (hitNow ? 1.2 : 0);
    G.coals.material.emissiveIntensity = 1.1 * fl;
    G.bar.material.emissiveIntensity = 1.4 + (hitNow ? .8 : 0);
    G.sparks.forEach(function (s) {
      if (s.t <= 0) { s.m.visible = false; return; }
      s.t -= 1 / 60; s.v[1] -= .012; s.m.position.x += s.v[0]; s.m.position.y += s.v[1]; s.m.position.z += s.v[2]; s.m.visible = true;
    });
  }
  function spark(n) {
    var k = 0;
    G.sparks.forEach(function (s) { if (k >= n || s.t > 0) return; k++; s.t = .45 + Math.random() * .3; s.m.position.set(.8, 1.6, .9); s.v = [(Math.random() - .5) * .08, .05 + Math.random() * .06, (Math.random() - .5) * .08]; });
  }

  /* ---------- sahnedeki işaret ---------- */
  var MK = { el: null, v: null };
  function marker() {
    var cv = document.getElementById('cityv'), c3 = W.city3d;
    if (!cv || !c3 || !c3.camera || !G.ready || W.tab !== 'c') { if (MK.el) MK.el.hidden = true; return; }
    if (!MK.el || !MK.el.isConnected) {
      MK.el = document.createElement('button'); MK.el.type = 'button'; MK.el.id = 'ek-dmk';
      MK.el.addEventListener('click', function () { openForge(); });
    }
    if (MK.el.parentNode !== cv) cv.appendChild(MK.el);
    if (!MK.v) MK.v = new c3.camera.position.constructor();
    G.root.updateMatrixWorld();
    MK.v.set(0, 5.6, 0).applyMatrix4(G.root.matrixWorld).project(c3.camera);
    var r = c3.renderer.domElement.getBoundingClientRect(), b = cv.getBoundingClientRect();
    var off = MK.v.z > 1 || MK.v.x < -1.05 || MK.v.x > 1.05 || MK.v.y < -1.05 || MK.v.y > 1.05;
    MK.el.hidden = off; if (off) return;
    MK.el.style.transform = 'translate(' + (r.left - b.left + (MK.v.x + 1) / 2 * r.width).toFixed(1) + 'px,' + (r.top - b.top + (1 - MK.v.y) / 2 * r.height).toFixed(1) + 'px)';
    var d = dm(), html;
    if (d.t1) html = '<i>⏳</i><span>' + ft(Math.max(0, (d.t1 - Date.now()) / 1000)) + '</span>';
    else if (d.lv < 1) html = '<i>⚒️</i><span>' + (ocak() >= 3 ? 'Demirci inşa et' : 'Demirci · Ocak 3') + '</span>';
    else html = '<i>⚒️</i><span>Demirci Sv ' + d.lv + '</span>';
    if (MK.el.__h !== html) { MK.el.__h = html; MK.el.innerHTML = html; }
  }

  var lastSec = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    try { if (!G.ready) initScene(); animate(now); marker(); } catch (e) {}
    if (now - lastSec > 1000) {
      lastSec = now;
      try { settle(); hookFight(); hookBonuses(); var o = document.getElementById('ek-forge'), el = o && o.querySelector('[data-dm-left]'); if (el) { var d = dm(); el.textContent = ft(Math.max(0, (d.t1 - Date.now()) / 1000)); } } catch (e) {}
    }
  }
  function start() {
    if (!S() || typeof W.render !== 'function') { setTimeout(start, 400); return; }
    dm(); hookBonuses(); hookFight(); settle();
    requestAnimationFrame(frame);
  }
  start();
  W.ergenekonDemirci = { open: openForge, state: function () { return dm(); }, rollMats: rollMats, _g: function () { return G; } };
})();
