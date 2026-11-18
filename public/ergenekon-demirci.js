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
      for (var q0 in ob) nb[q0] = ob[q0]; nb.__dm = true; W.wosBonus = nb;
    }
    if (typeof W.upch === 'function' && !W.upch.__dm) {
      var oc = W.upch;
      var nc = function (x) { return Math.min(0.95, oc.apply(this, arguments) * chanceMul(lv())); };
      for (var q1 in oc) nc[q1] = oc[q1]; nc.__dm = true; W.upch = nc;
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
  var RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
  function anvilSvg() {
    var ring = '', n = 22;
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2, x = 160 + Math.cos(a) * 112, y = 112 + Math.sin(a) * 46; ring += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" class="dm-rune" style="animation-delay:' + (i * .09).toFixed(2) + 's">' + RUNES[i % RUNES.length] + '</text>'; }
    return '<svg viewBox="0 0 320 230" class="dm-anvsvg" aria-hidden="true"><defs>' +
      '<linearGradient id="dmSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d6f8c"/><stop offset=".5" stop-color="#2c3850"/><stop offset="1" stop-color="#151b28"/></linearGradient>' +
      '<linearGradient id="dmStone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d96a6"/><stop offset="1" stop-color="#3b4250"/></linearGradient>' +
      '<radialGradient id="dmGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#7fe6ff" stop-opacity=".55"/><stop offset="1" stop-color="#7fe6ff" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse cx="160" cy="112" rx="132" ry="58" fill="url(#dmGlow)" class="dm-halo"/>' +
      '<ellipse cx="160" cy="112" rx="124" ry="54" fill="none" stroke="#6fd8ff" stroke-opacity=".55" stroke-width="2"/><ellipse cx="160" cy="112" rx="100" ry="40" fill="none" stroke="#6fd8ff" stroke-opacity=".35" stroke-width="1.4"/>' + ring +
      '<path d="M108 214h104l-10-22H118z" fill="url(#dmStone)" stroke="#11151c" stroke-width="2"/><path d="M118 192h84l-6-40h-72z" fill="url(#dmStone)" stroke="#11151c" stroke-width="2"/>' +
      '<path d="M132 176h56M128 164h64" stroke="#7fe6ff" stroke-width="2.4" class="dm-glowline"/>' +
      '<path d="M64 112c18 0 30-4 46-12h118c16 0 30 4 40 10l18 4c-10 4-28 8-44 8l-8 8H116c-10 0-14-6-24-10-10-3-18-4-28-8z" fill="url(#dmSteel)" stroke="#0b0f17" stroke-width="2.4"/>' +
      '<path d="M112 100h116v12H112z" fill="#3d4d6a" stroke="#0b0f17" stroke-width="1.6"/>' +
      '<g class="dm-glowline" font-size="13" fill="#9ff0ff" font-family="serif"><text x="122" y="111">ᛏᛖᛗᛁᚱ</text><text x="182" y="111">ᛞᚨᚷ</text></g>' +
      '<path d="M120 124h80l-6 28h-68z" fill="#222b3c" stroke="#0b0f17" stroke-width="2"/><path d="M156 128l4-8 4 8-4 10z" fill="#9ff0ff" class="dm-gem"/>' +
      '<g class="dm-hammer"><path d="M36 196L84 128" stroke="#7a5232" stroke-width="7" stroke-linecap="round"/><path d="M36 196L84 128" stroke="#1b1108" stroke-width="1" opacity=".5"/>' +
      '<path d="M66 118l30 20 10-14-30-20z" fill="url(#dmSteel)" stroke="#0b0f17" stroke-width="2"/><path d="M74 120l20 13" stroke="#9ff0ff" stroke-width="1.6" class="dm-glowline"/></g>' +
      '<g class="dm-burst"><circle cx="160" cy="70" r="20" fill="none" stroke="var(--fx,#ffd76a)" stroke-width="5"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i / 8 * Math.PI * 2; return '<path d="M' + (160 + Math.cos(a) * 26).toFixed(1) + ' ' + (70 + Math.sin(a) * 26).toFixed(1) + 'L' + (160 + Math.cos(a) * 70).toFixed(1) + ' ' + (70 + Math.sin(a) * 70).toFixed(1) + '" stroke="var(--fx,#ffd76a)" stroke-width="3" stroke-linecap="round"/>'; }).join('') + '</g></svg>';
  }
  var GATE = { kagit: 1, safir: 4, opal: 8 }, MDESC = { kagit: 'Her basmada gerekir. Canavarlardan %5 ihtimalle düşer.', safir: '+5 ve üstü basmada gerekir. Sv 4+ canavarlardan %2,5 ihtimalle düşer.', opal: '+9 ve üstü basmada gerekir. Sv 8+ canavarlardan %2,5 ihtimalle düşer.' };
  function bestTarget(k) { // seviyeye uygun, en yakın canavar
    var s = S(), M = W.M || [], o = ocak(), g = GATE[k] || 1, best = -1, bd = 1e9;
    M.forEach(function (x, i) {
      if (!x || i === 11) return;
      var az = W.X6 && W.X6.isAz ? W.X6.isAz(i) : false, L = x[2] + (az ? 2 : 0);
      if (L < g || L > o || s.mk[i] > 0 || (W.fog && W.fog(x[3], x[4]))) return;
      var dd = Math.hypot(x[3] - 50, x[4] - 50) - L * .4; if (dd < bd) { bd = dd; best = i; }
    });
    return best;
  }
  function abl(w) { var t = w.toLocaleLowerCase('tr'), v = (t.match(/[aıoueiöü]/g) || ['a']).pop(), back = 'aıou'.indexOf(v) >= 0, last = t.slice(-1), vow = 'aıoueiöü'.indexOf(last) >= 0, hard = 'çfhkpsşt'.indexOf(last) >= 0; return w + '’' + (vow ? 'n' : '') + (hard ? 't' : 'd') + (back ? 'an' : 'en'); }
  function sourceName(k) { var i = bestTarget(k), M = W.M || []; return i >= 0 ? abl(M[i][0]) + ' düşer' : 'Sv ' + GATE[k] + '+ canavardan'; }
  function goSource(k) {
    var i = bestTarget(k); if (i < 0) return false;
    var o = document.getElementById('ek-forge'); if (o) o.remove();
    var tries = 0, go = function () {
      var w = W.world3d, t = w && w.pveTargets && w.pveTargets.filter(function (x) { return x.kind === 'monster' && x.index === i; })[0];
      if (!w || !t || !w.controls || W.tab !== 'm') { if (++tries < 30) setTimeout(go, 200); return; }
      var c = w.controls, cam = w.camera, sx = c.target.x, sz = c.target.z, p0 = cam.position.clone(), t0 = performance.now();
      (function step(now) { var e = Math.min(1, (now - t0) / 600), q = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, nx = sx + (t.worldX - sx) * q, nz = sz + (t.worldZ - sz) * q; cam.position.set(p0.x + nx - sx, p0.y, p0.z + nz - sz); c.target.set(nx, c.target.y, nz); c.update(); if (e < 1) requestAnimationFrame(step); else try { w.activate({ kind: 'monster', index: i }); } catch (x) {} })(t0);
    };
    if (W.tab !== 'm') { var b = document.getElementById('ek-world'); if (b) b.click(); else { var tb = document.querySelector('#tabs [data-t="m"]'); if (tb) tb.click(); } setTimeout(go, 900); } else go();
    return true;
  }
  W.ekGoSource = goSource;
  function matInfo(k) {
    var d = dm(), need = 0, o = itemById(UI.sel); if (o && (o.x.p || 0) < (W.UPM || 12)) need = matCost(o.x.p || 0)[k];
    if (need > 0 && (d.mat[k] || 0) < need && goSource(k)) return;
    var ov = document.createElement('div'); ov.className = 'ek-ov yk-ov';
    ov.innerHTML = '<div class="yk-card yk-small"><div class="yk-head"><h2>' + MAT[k].n + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="dm-minfo">' + (W.ekIcon ? W.ekIcon.mat(k) : MAT[k].e) + '<b>' + nf(d.mat[k] || 0) + '</b></div><p class="yk-desc" style="margin:0 14px 14px">' + MDESC[k] + '</p></div>';
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target.closest('.yk-x')) ov.remove(); });
    document.body.appendChild(ov);
  }
  function swapGem(from) {
    var d = dm(), to = from === 'safir' ? 'opal' : 'safir'; if ((d.mat[from] || 0) < 1) return;
    d.mat[from] -= 1; d.mat[to] = (d.mat[to] || 0) + 1; persist(); refreshWin();
    try { W.snd(760, .05); } catch (e) {}
  }
  function basHtml() {
    var s = S(), d = dm();
    if (d.lv < 1) return '<div class="dm-empty">Eşya basmak için önce Demirci’yi inşa et.<br><button type="button" class="ek-btn gold" data-dm-tab="yapi">Demirci’ye git</button></div>';
    var o = itemById(UI.sel); if (!o) UI.sel = null;
    var p = o ? (o.x.p || 0) : 0, mc = matCost(p), max = W.UPM || 12, r = o ? Math.min(4, o.x.r || 0) : 0;
    var cur = o ? tile({ id: UI.sel, cat: 'eq', x: o.x, worn: o.worn, r: o.x.r || 0 }, { dis: true }) : '<div class="ci-tile ci-slot dm-ph"><svg viewBox="0 0 64 64" class="ci-svg"><path d="M32 8l18 8v14c0 12-8 20-18 26-10-6-18-14-18-26V16z" fill="none" stroke="#6b5636" stroke-width="3"/><path d="M22 40l20-20" stroke="#6b5636" stroke-width="3"/></svg></div>';
    var nxt = o && p < max ? tile({ id: 'nx', cat: 'eq', x: Object.assign({}, o.x, { p: p + 1 }), r: o.x.r || 0 }, { dis: true }) : '<div class="ci-tile ci-slot"></div>';
    var mats = Object.keys(MAT).map(function (k) {
      var have = d.mat[k] || 0, need = o && p < max ? mc[k] : 0, it = { id: 'm:' + k, cat: 'mat', mat: k, n: have, r: { kagit: 1, safir: 2, opal: 3 }[k] };
      var miss = need > 0 && have < need, src = miss ? sourceName(k) : '';
      return '<button type="button" class="dm-ms dm-msb' + (need > 0 ? (have >= need ? ' ok' : ' no') : ' off') + '" data-dm-mat="' + k + '">' + tile(it, { dis: true }) +
        '<b class="dm-cnt">' + nf(have) + (need > 0 ? '<i>/' + need + '</i>' : '') + '</b>' + (miss ? '<small class="dm-src">' + src + '</small>' : '') + '</button>';
    }).join('');
    var dem = 0, ch = 0, can = false, info;
    if (o && p < max) { try { dem = W.ucost(o.x); ch = W.upch(o.x); } catch (e) {} can = (s.r.demir || 0) >= dem && haveMat(mc); }
    if (!o) info = 'Çantandaki bir parçaya dokun, sonra Yükselt.';
    else if (p >= max) info = '<span class="dm-ok">En yüksek basma seviyesi (+' + max + ').</span>';
    else info = '<b style="color:' + ['#c9d2da', '#7be0a2', '#a8b8ff', '#ffc070', '#ff8a7a'][r] + '">' + esc(o.x.n) + '</b> · şans <b>%' + (ch * 100).toFixed(ch < 0.01 ? 2 : 1) + '</b> · ' + (p >= 5 ? (protect(d.lv) >= 1 ? 'düşmez' : protect(d.lv) > 0 ? 'düşebilir (usta %50 korur)' : '<span class="dm-warn">tutmazsa −1</span>') : 'düşmez');
    var L = W.__dmLast && W.__dmLast.id === UI.sel ? W.__dmLast : null;
    var fx = L ? ' fx-' + L.res : '';
    var res = L ? ({ ok: '<p class="dm-res ok">✅ Başarılı! +' + L.p + '</p>', fail: '<p class="dm-res no">❌ Tutmadı, malzeme harcandı.</p>', drop: '<p class="dm-res no">❌ Tutmadı, +' + L.p + ' seviyesine düştü.</p>', kept: '<p class="dm-res ok">🛡️ Tutmadı ama usta düşüşü önledi.</p>' })[L.res] || '' : '';
    var bag = (W.ekItems ? W.ekItems() : []).filter(function (it) { return it.cat === 'eq'; });
    var grid = bag.map(function (it) { return tile(it, { on: it.id === UI.sel }); }), slots = Math.max(24, Math.ceil(bag.length / 6) * 6);
    for (var i = bag.length; i < slots; i++) grid.push('<div class="ci-tile ci-slot"></div>');
    return '<div class="dm-forge">' +
      '<div class="dm-stage' + fx + '" style="--fx:' + ['#cfe3f0', '#7bf0a8', '#9db4ff', '#ffc45a', '#ff7a6a'][r] + '">' +
        '<div class="dm-scene">' + anvilSvg() + '<div class="dm-on">' + cur + '</div><div class="dm-nx">' + nxt + '<i>➜</i></div></div>' +
        '<p class="dm-cap">' + info + '</p>' + res + '</div>' +
      '<div class="dm-side"><div class="dm-sec">MALZEMELER</div><div class="dm-mcol">' + mats + '</div>' +
        '<div class="dm-fee"><span>ÜCRET</span>' + (o && p < max ? rc('⛓️', dem, s.r.demir || 0) : '<b>—</b>') + '</div>' +
        '<button type="button" class="ek-btn gold dm-go" data-dm-up="' + (UI.sel || '') + '"' + (can ? '' : ' disabled') + '>YÜKSELT</button>' +
        '<button type="button" class="ek-btn dm-clear" data-dm-clear="1"' + (o ? '' : ' disabled') + '>BOŞALT</button>' +
        '<div class="dm-swaprow"><button type="button" class="dm-sw" data-dm-sw="safir"' + ((d.mat.safir || 0) < 1 ? ' disabled' : '') + '>🔷<i>➜</i>🔮</button><button type="button" class="dm-sw" data-dm-sw="opal"' + ((d.mat.opal || 0) < 1 ? ' disabled' : '') + '>🔮<i>➜</i>🔷</button></div></div>' +
      '<div class="dm-bag"><div class="dm-sec">ÇANTA · EKİPMAN</div><div class="ci-grid dm-grid6">' + grid.join('') + '</div></div></div>';
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
    return '<div class="ek-modal dm-modal ci-kadim" role="dialog" aria-modal="true" aria-label="Demirci">' +
      '<div class="ek-mh"><span class="ek-cap">OBANIN ÖRSÜ</span><h2>Demirci <small>Sv ' + l + '</small></h2><button type="button" class="ek-x" data-dm-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="ek-tabs"><button type="button" data-dm-tab="bas" class="' + (UI.tab === 'bas' ? 'on' : '') + '">⚒️ Yükseltme</button><button type="button" data-dm-tab="yapi" class="' + (UI.tab === 'yapi' ? 'on' : '') + '">🏛️ Demirci</button></div>' +
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
        if ((b = t.closest('[data-ci]')) && o.contains(b)) { UI.sel = b.getAttribute('data-ci'); W.__dmLast = null; refreshWin(); return; }
        var mb = t.closest('[data-dm-mat]'); if (mb) { matInfo(mb.getAttribute('data-dm-mat')); return; }
        var sw = t.closest('[data-dm-sw]'); if (sw && !sw.disabled) { swapGem(sw.getAttribute('data-dm-sw')); return; }
        if (t.closest('[data-dm-clear]')) { UI.sel = null; W.__dmLast = null; refreshWin(); return; }
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
    // Sihirli Örs platformu: sekizgen taş, rün çemberi, kristalli dört dikme
    var rune = mat('#7fe6ff', { emissive: '#3fd0ff', emissiveIntensity: 1.4 }), steel = mat('#46597e', { metalness: .45, roughness: .38 }), capm = mat('#c99a4e', { metalness: .6, roughness: .35 }), pillar = mat('#2a2622');
    put(Cy(5.4, 5.8, .5, 8), stone, root, 0, .25, 0);
    put(Cy(4.7, 4.9, .3, 8), mat('#6f6a62'), root, 0, .62, 0);
    put(Cy(4.1, 4.1, .06, 40), mat('#1f2a3a'), root, 0, .79, 0);
    if (C.TorusGeometry) {
      var r1 = put(new C.TorusGeometry(3.95, .06, 4, 64), capm, root, 0, .84, 0); r1.rotation.x = Math.PI / 2;
      var r2 = put(new C.TorusGeometry(2.6, .05, 4, 64), rune, root, 0, .84, 0); r2.rotation.x = Math.PI / 2;
      var r3 = put(new C.TorusGeometry(3.45, .04, 4, 64), rune, root, 0, .84, 0); r3.rotation.x = Math.PI / 2;
    }
    var runes = [];
    for (var ri = 0; ri < 24; ri++) { var ra = ri / 24 * Math.PI * 2, rb = put(B(.32, .04, ri % 3 ? .12 : .22), rune, root, Math.cos(ra) * 3.03, .84, Math.sin(ra) * 3.03); rb.rotation.y = -ra + (ri % 2 ? .6 : -.4); runes.push(rb); }
    var crystals = [];
    [[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(function (q) {
      var px = q[0] * 3.55, pz = q[1] * 3.55;
      put(B(.55, 2.3, .55), pillar, root, px, 1.9, pz);
      put(B(.75, .22, .75), capm, root, px, 3.1, pz);
      var cg = new C.Group(); cg.position.set(px, 3.85, pz); root.add(cg);
      put(Co(.28, .45, 4), rune, cg, 0, .22, 0); var lo = put(Co(.28, .45, 4), rune, cg, 0, -.22, 0); lo.rotation.x = Math.PI;
      crystals.push(cg);
    });
    // örs (kaidesi ve rünlü gövdesi)
    var anv = new C.Group(); anv.scale.setScalar(1.35); anv.position.set(0, -.28, 0); root.add(anv);
    put(B(1.6, .5, 1.3), steel, anv, 0, 1.05, 0);
    put(B(1.0, .9, .8), steel, anv, 0, 1.75, 0);
    put(B(2.6, .5, 1.1), steel, anv, 0, 2.45, 0);
    put(Co(.42, 1.1, 4), steel, anv, 1.75, 2.45, 0).rotation.z = -Math.PI / 2;
    put(B(.6, .45, 1.0), steel, anv, -1.45, 2.45, 0);
    put(B(2.3, .06, .08), rune, anv, 0, 2.47, .56); put(B(.7, .06, .06), rune, anv, 0, 1.75, .41);
    put(B(.18, .3, .06), rune, anv, 0, 1.75, .42).rotation.z = Math.PI / 4;
    var bar = put(B(.9, .1, .14), hot, anv, -.1, 2.76, 0);
    // küçük kor mangalı (ustanın ışığı)
    put(Cy(.45, .3, .5, 8), iron, root, -3.0, 1.05, 1.9);
    var coals = put(Cy(.38, .38, .12, 8), coal, root, -3.0, 1.33, 1.9);
    // usta (örse bakar: -x yönü)
    var smith = new C.Group(); smith.position.set(2.75, .8, .25); smith.rotation.y = -Math.PI / 2; root.add(smith); smith.visible = false;
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
    var light = null, cyan = null; if (C.PL) { light = new C.PL('#ff9a4a', 1.6, 12, 1.8); light.position.set(-.2, 3.2, .8); root.add(light); cyan = new C.PL('#5fd8ff', 2.2, 16, 1.6); cyan.position.set(0, 2.2, 0); root.add(cyan); }
    var sparks = []; for (var i = 0; i < 8; i++) { var sp = put(Sp(.06), hot, root, -.1, 3.5, 0); sp.visible = false; sparks.push({ m: sp, v: [0, 0, 0], t: 0 }); }
    // inşa alanı (henüz yokken)
    var plot = new C.Group(); root.add(plot);
    for (var px = -1; px <= 1; px += 2) for (var pz = -1; pz <= 1; pz += 2) put(B(.14, .5, .14), wood, plot, px * 3, .25, pz * 2.2);
    put(B(6.2, .06, 4.6), mat('#a48d63'), plot, 0, .03, 0);
    var built = new C.Group(); root.children.slice().forEach(function (o) { if (o !== plot) { root.remove(o); built.add(o); } }); root.add(built);
    scene.add(root);
    G = { ready: true, root: root, built: built, plot: plot, arm: arm, bar: bar, coals: coals, light: light, cyan: cyan, crystals: crystals, runes: runes, rune: rune, sparks: sparks, smith: smith, t0: performance.now(), hit: 0 };
    return true;
  }
  function hammerHit(big) { if (!G.ready) return; G.burst = big ? 2 : 1; if (big) G.flash = 1.6; }
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
    if (hitNow && !G.hit) { G.hit = 1; if (G.burst) { spark(8); G.burst = 0; } } else if (!hitNow) G.hit = 0;
    var fl = .85 + Math.sin(t * 11) * .08 + Math.sin(t * 23) * .05;
    if (G.light) G.light.intensity = 1.4 * fl;
    G.coals.material.emissiveIntensity = 1.1 * fl;
    G.crystals.forEach(function (c, i) { c.rotation.y = t * 1.2 + i; c.position.y = 3.85 + Math.sin(t * 1.6 + i * 1.3) * .14; });
    G.rune.emissiveIntensity = 1.1 + Math.sin(t * 2.2) * .45 + (G.flash || 0);
    if (G.cyan) G.cyan.intensity = 2.0 + Math.sin(t * 2.2) * .5 + (G.flash || 0) * 3;
    if (G.flash) G.flash = Math.max(0, G.flash - 1 / 50);
    G.bar.material.emissiveIntensity = 1.3 + Math.sin(t * 3) * .2;
    G.sparks.forEach(function (s) {
      if (s.t <= 0) { s.m.visible = false; return; }
      s.t -= 1 / 60; s.v[1] -= .012; s.m.position.x += s.v[0]; s.m.position.y += s.v[1]; s.m.position.z += s.v[2]; s.m.visible = true;
    });
  }
  function spark(n) {
    var k = 0;
    G.sparks.forEach(function (s) { if (k >= n || s.t > 0) return; k++; s.t = .45 + Math.random() * .3; s.m.position.set(-.1, 3.5, 0); s.v = [(Math.random() - .5) * .08, .05 + Math.random() * .06, (Math.random() - .5) * .08]; });
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
    if (MK.el.__ekh !== html) { MK.el.__ekh = html; MK.el.innerHTML = html; }
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
  function canEnhance(id) {
    var s = S(), d = dm(), o = itemById(id); if (!o || !d || d.lv < 1) return false;
    var p = o.x.p || 0; if (p >= (W.UPM || 12)) return false;
    var dem = 0; try { dem = W.ucost(o.x); } catch (e) { return false; }
    return (s.r.demir || 0) >= dem && haveMat(matCost(p));
  }
  W.ergenekonDemirci = { canEnhance: canEnhance, open: openForge, state: function () { return dm(); }, rollMats: rollMats, _g: function () { return G; } };
})();
