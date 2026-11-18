/* Ergenekon — Kurultay Meydanı (deneme). Claude, 18 Kasım 2026.
   Obanın düz alanına güneş motifli taş meydan, balballar, tuğlar, fenerler, pazar tezgâhları
   ve arka planda damarları parlayan Demir Dağ ekler. Ayarlar'dan kapatılabilir (s.ek.meydanOff). */
(function () {
  'use strict';
  var W = window;
  if (W.__ekMeydan) return; W.__ekMeydan = true;
  var RX = 44, RZ = 39;
  var M = { ready: false, group: null, hidden: [] };
  function S() { return W.s; }
  function off() { var s = S(); return !!(s && s.ek && s.ek.meydanOff); }

  function paveTexture(Tex) {
    var c = document.createElement('canvas'); c.width = c.height = 1024;
    var g = c.getContext('2d'), C = 512;
    g.fillStyle = '#c9b089'; g.fillRect(0, 0, 1024, 1024);
    // taş döşeme: halkalar halinde
    for (var ring = 0; ring < 22; ring++) {
      var r0 = 40 + ring * 21, r1 = r0 + 21, n = Math.max(8, Math.round(2 * Math.PI * (r0 + 10) / 34));
      for (var i = 0; i < n; i++) {
        var a0 = i / n * Math.PI * 2 + (ring % 2) * Math.PI / n, a1 = (i + 1) / n * Math.PI * 2 + (ring % 2) * Math.PI / n;
        var shade = 188 + ((i * 37 + ring * 53) % 29) - 14;
        g.fillStyle = 'rgb(' + shade + ',' + (shade - 22) + ',' + (shade - 58) + ')';
        g.beginPath(); g.arc(C, C, r1 - 1.5, a0 + .012, a1 - .012); g.arc(C, C, r0 + 1.5, a1 - .012, a0 + .012, true); g.closePath(); g.fill();
      }
    }
    // güneş ışınları (kurultay motifi)
    g.save(); g.translate(C, C);
    for (var k = 0; k < 16; k++) {
      g.rotate(Math.PI / 8);
      g.fillStyle = k % 2 ? 'rgba(160,112,52,.55)' : 'rgba(120,150,120,.38)';
      g.beginPath(); g.moveTo(-26, 120); g.lineTo(0, k % 2 ? 470 : 380); g.lineTo(26, 120); g.closePath(); g.fill();
    }
    g.restore();
    [[118, 10, '#8a6a3a'], [250, 6, '#9a7a48'], [300, 3, '#7a5a30'], [470, 9, '#8a6a3a']].forEach(function (r) { g.strokeStyle = r[2]; g.lineWidth = r[1]; g.beginPath(); g.arc(C, C, r[0], 0, Math.PI * 2); g.stroke(); });
    // dış halkada damga motifleri
    g.fillStyle = '#7a5a30'; g.font = 'bold 30px serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    var tamga = 'ᚠᛉᛏᛟᛞᛊᚱᛗᛇᛒᚾᛃ';
    for (var t = 0; t < 24; t++) { var ta = t / 24 * Math.PI * 2; g.save(); g.translate(C + Math.cos(ta) * 275, C + Math.sin(ta) * 275); g.rotate(ta + Math.PI / 2); g.fillText(tamga[t % tamga.length], 0, 0); g.restore(); }
    var tex = new Tex(c); tex.anisotropy = 4; if ('colorSpace' in tex) tex.colorSpace = 'srgb';
    return tex;
  }

  function build() {
    var c3 = W.city3d; if (!c3 || !c3.scene) return false;
    var scene = c3.scene, C = {};
    scene.traverse(function (o) {
      if (o.isMesh && o.geometry) { C[o.geometry.type] = C[o.geometry.type] || o.geometry.constructor; if (!C.Mesh) C.Mesh = o.constructor; if (o.material && o.material.type === 'MeshStandardMaterial' && !C.Mat) C.Mat = o.material.constructor; }
      if (o.isPointLight && !C.PL) C.PL = o.constructor;
      if (o.type === 'Group' && !C.Group) C.Group = o.constructor;
      if (o.isInstancedMesh && !C.IM) C.IM = o.constructor;
      if (o.isSprite && o.material && o.material.map && !C.Tex) C.Tex = o.material.map.constructor;
    });
    if (!C.Mesh || !C.Mat || !C.Group || !C.CylinderGeometry || !C.BoxGeometry || !C.ConeGeometry || !C.SphereGeometry) return false;
    function mat(col, o) { return new C.Mat(Object.assign({ color: col, roughness: .88 }, o || {})); }
    function put(geo, m, parent, x, y, z) { var o = new C.Mesh(geo, m); o.position.set(x || 0, y || 0, z || 0); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; }
    var B = function (w, h, d) { return new C.BoxGeometry(w, h, d); }, Cy = function (a, b, h, s) { return new C.CylinderGeometry(a, b, h, s || 8); }, Co = function (r, h, s) { return new C.ConeGeometry(r, h, s || 8); }, Sp = function (r) { return new C.SphereGeometry(r, 10, 8); };
    var root = new C.Group(); root.name = 'ekMeydan';

    // 1) taş meydan
    var paveMat = C.Tex ? mat('#ffffff', { map: paveTexture(C.Tex), roughness: .95 }) : mat('#c9b089');
    var pave = put(Cy(1, 1, .1, 72), paveMat, root, 0, .06, 0); pave.scale.set(RX, 1, RZ); pave.castShadow = false;
    var curb = mat('#8f7a58');
    if (C.TorusGeometry) { var rim = put(new C.TorusGeometry(1, .012, 4, 96), curb, root, 0, .12, 0); rim.rotation.x = Math.PI / 2; rim.scale.set(RX, RZ, 1); }
    // 2) balballar (çapraz köşelerde)
    var stoneM = mat('#8d8a82'), stoneD = mat('#6f6b64');
    [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [0, -1]].forEach(function (q, i) {
      var a = Math.atan2(q[1], q[0] || 0.0001), x = Math.cos(a) * RX * .7, z = Math.sin(a) * RZ * .7;
      if (q[0] === 0) { x = (i === 4 ? 9 : -9); z = q[1] * RZ * .62; }
      var g = new C.Group(); g.position.set(x, 0, z); g.rotation.y = -a + Math.PI / 2; root.add(g);
      put(B(1.4, .4, 1.1), stoneD, g, 0, .2, 0);
      put(B(.9, 2.2, .6), stoneM, g, 0, 1.5, 0);
      put(Sp(.5), stoneM, g, 0, 2.95, 0).scale.set(1, 1.15, .9);
      put(B(.62, .08, .05), stoneD, g, 0, 2.95, .45);
    });
    // 3) tuğ sancakları
    var pole = mat('#5a4630'), red = mat('#a8322a'), blue = mat('#2e6db5'), gold = mat('#e3b54f', { metalness: .5, roughness: .4 }), hair = mat('#2a2018');
    var flags = [];
    for (var f = 0; f < 8; f++) {
      var fa = f / 8 * Math.PI * 2 + Math.PI / 8, fx = Math.cos(fa) * RX * .93, fz = Math.sin(fa) * RZ * .93;
      if (Math.abs(fa - Math.PI / 2) < .3) continue;
      var fg = new C.Group(); fg.position.set(fx, 0, fz); root.add(fg);
      put(Cy(.09, .12, 7, 6), pole, fg, 0, 3.5, 0);
      put(Co(.18, .7, 6), gold, fg, 0, 7.3, 0);
      put(Cy(.35, .15, .9, 8), hair, fg, 0, 6.6, 0);
      var flag = put(B(1.8, 1.1, .05), f % 2 ? red : blue, fg, .95, 5.5, 0);
      flags.push(flag);
    }
    // 4) fenerler (meydan çevresi)
    var lampMat = mat('#ffd27a', { emissive: '#ffb347', emissiveIntensity: 1.4 }), iron = mat('#2f2a26', { metalness: .5 });
    var lamps = [];
    for (var l = 0; l < 12; l++) {
      var la = l / 12 * Math.PI * 2, lx = Math.cos(la) * RX * .82, lz = Math.sin(la) * RZ * .82;
      if (Math.abs(lz) < 18 && Math.abs(lx) < 20) continue;
      put(Cy(.08, .1, 3.2, 6), iron, root, lx, 1.6, lz);
      put(B(.42, .5, .42), lampMat, root, lx, 3.35, lz);
      put(Co(.38, .35, 4), iron, root, lx, 3.78, lz).rotation.y = Math.PI / 4;
      lamps.push([lx, lz]);
    }
    // 5) pazar tezgâhları (batı yakası)
    var wood = mat('#8a5a33'), cloth = [mat('#c0392b'), mat('#2e6db5'), mat('#d9a441')], goods = [mat('#d07a2a'), mat('#9b2d2d'), mat('#e8d4a0'), mat('#5f8f3a')];
    [[-25, -3, .1], [-24.5, 5, -.15], [-21, 13.5, -.5]].forEach(function (p, i) {
      var g = new C.Group(); g.position.set(p[0], 0, p[1]); g.rotation.y = Math.PI / 2 + p[2]; root.add(g);
      put(B(3, .9, 1.4), wood, g, 0, .45, 0);
      for (var sx = -1; sx <= 1; sx += 2) for (var sz = -1; sz <= 1; sz += 2) put(Cy(.06, .06, 2.5, 5), wood, g, sx * 1.4, 1.25, sz * .65);
      var aw = put(B(3.4, .08, 1.9), cloth[i % 3], g, 0, 2.55, .1); aw.rotation.x = .18;
      for (var k = 0; k < 4; k++) put(B(.5, .35, .5), goods[(k + i) % 4], g, -1.05 + k * .7, 1.08, 0);
    });
    // 6) Demir Dağ (arka planda, damarları parlayan)
    var mount = new C.Group(); mount.position.set(-70, -6, -118); mount.scale.setScalar(.62); root.add(mount);
    var rock = mat('#4b4f59', { roughness: 1 }), rock2 = mat('#5d6470', { roughness: 1 }), snow = mat('#eef1f3'), vein = mat('#ff6a2a', { emissive: '#ff4a10', emissiveIntensity: 1.6 });
    var peak = put(Co(70, 150, 7), rock, mount, 0, 75, 0); peak.rotation.y = .3;
    put(Co(46, 92, 6), rock2, mount, 62, 46, 26).rotation.y = 1.1;
    put(Co(40, 80, 6), rock2, mount, -60, 40, 30).rotation.y = .6;
    put(Co(22, 34, 7), snow, mount, 0, 136, 0).rotation.y = .3;
    var veins = [];
    // kızıl damarlar: yamaçtan inen ince ışık hatları
    [[0, 95, 1], [-.55, 80, .8], [.5, 70, .85], [.2, 112, .55]].forEach(function (v) {
      var ang = v[0], y = v[1], L = 46 * v[2], r = 70 * (1 - y / 150) + .8;
      var m = put(B(1.3, L, 1.3), vein, mount, Math.sin(ang) * r, y, Math.cos(ang) * r);
      m.rotation.order = 'YXZ'; m.rotation.y = ang; m.rotation.x = .435; m.castShadow = false; veins.push(m);
    });
    var glow = null; if (C.PL) { glow = new C.PL('#ff7a3a', 2.5, 260, 1.4); glow.position.set(0, 70, 60); mount.add(glow); }
    scene.add(root);
    M.C = C; M.mat = mat; M.put = put; M.B = B; M.Cy = Cy; M.Co = Co;
    M = Object.assign(M, { ready: true, group: root, flags: flags, veins: veins, vein: vein, glow: glow, lamp: lampMat, t0: performance.now(), hidden: M.hidden || [] });
    buildWall();
    hideGrass(true);
    apply();
    return true;
  }
  /* ---------- taş sur ve kuleler (Sur seviyesine göre büyür) ---------- */
  var WX = 46, WZ = 41, GATE = Math.PI / 2;
  function surLv() { var s = S(); return (s && s.l && s.l.sur) || 0; }
  function buildWall() {
    var C = M.C; if (!C || !C.IM) return;
    var lv = surLv(), key = lv;
    if (M.wallKey === key && M.wall) return;
    if (M.wall) { M.group.remove(M.wall); M.wall.traverse(function (o) { if (o.geometry) o.geometry.dispose(); }); }
    M.wallKey = key;
    var g = new C.Group(); M.wall = g; M.group.add(g);
    var h = 2.6 + Math.min(40, lv) * .12, stone = M.mat('#b9ab8c'), stone2 = M.mat('#a39478'), roof = M.mat('#7a3b2a'), wood = M.mat('#5a4630'), gold = M.mat('#e3b54f', { metalness: .5, roughness: .4 });
    var N = 150, segs = [], dummy = new C.Group();
    for (var i = 0; i < N; i++) { var a = i / N * Math.PI * 2; if (Math.abs(a - GATE) < .12) continue; segs.push(a); }
    var segLen = 2 * Math.PI * Math.sqrt((WX * WX + WZ * WZ) / 2) / N + .15;
    var body = new C.IM(new C.BoxGeometry(segLen, h, 1.3), stone, segs.length), mer = new C.IM(new C.BoxGeometry(segLen * .45, .6, 1.4), stone2, segs.length);
    segs.forEach(function (a, i) {
      var x = Math.cos(a) * WX, z = Math.sin(a) * WZ, ang = Math.atan2(WZ * Math.cos(a), -WX * Math.sin(a));
      dummy.position.set(x, h / 2, z); dummy.rotation.set(0, -ang, 0); dummy.updateMatrix(); body.setMatrixAt(i, dummy.matrix);
      dummy.position.set(x, h + .3, z); dummy.updateMatrix(); mer.setMatrixAt(i, dummy.matrix);
    });
    body.castShadow = body.receiveShadow = true; mer.castShadow = true; g.add(body); g.add(mer);
    // kapı kulesi
    var gz = WZ + .2;
    [-4.3, 4.3].forEach(function (x) {
      M.put(M.B(3, h + 3, 3), stone, g, x, (h + 3) / 2, gz);
      M.put(M.Co(2.4, 2.4, 4), roof, g, x, h + 4.2, gz).rotation.y = Math.PI / 4;
      M.put(M.Cy(.06, .06, 2.2, 5), wood, g, x, h + 6.4, gz);
    });
    M.put(M.B(5.6, 1.4, 2.2), stone2, g, 0, h + 1.2, gz);
    var arch = M.put(M.B(5.6, .5, 2.4), wood, g, 0, h + .3, gz);
    if (C.TorusGeometry) { var cr = M.put(new C.TorusGeometry(.55, .12, 6, 18, Math.PI * 1.45), gold, g, 0, h + 1.3, gz + 1.15); cr.rotation.z = .9; }
    // kuleler: sur seviyesine göre 4 / 6 / 8 / 10
    var nt = lv >= 20 ? 10 : lv >= 12 ? 8 : lv >= 6 ? 6 : 4;
    for (var t = 0; t < nt; t++) {
      var ta = t / nt * Math.PI * 2 - Math.PI / 2 + Math.PI / nt; if (Math.abs(((ta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - GATE) < .35) ta += .4;
      var tx = Math.cos(ta) * WX, tz = Math.sin(ta) * WZ, th = h + 3.4;
      M.put(M.Cy(2, 2.3, th, 10), stone, g, tx, th / 2, tz);
      M.put(M.Cy(2.35, 2.35, .6, 10), stone2, g, tx, th + .3, tz);
      M.put(M.Co(2.6, 3, 10), roof, g, tx, th + 2.1, tz);
      M.put(M.Cy(.05, .05, 2, 5), wood, g, tx, th + 4.4, tz);
      var fl = M.put(M.B(1.1, .65, .04), t % 2 ? M.mat('#a8322a') : M.mat('#2e6db5'), g, tx + .58, th + 4.95, tz); M.flags.push(fl);
    }
    syncCastle();
  }
  function syncCastle() { var c = W.city3d && W.city3d.castle; if (c) c.visible = !(M.ready && M.group.visible); }

  // meydanın içindeki çimleri gizle (döşemeyi delmesin)
  var GR = null;
  function hideGrass(on) {
    var c3 = W.city3d; if (!c3) return;
    if (!GR) {
      GR = [];
      c3.scene.traverse(function (o) {
        if (!o.isInstancedMesh || o.count < 200 || (o.parent && o.parent.name === 'ekMeydan')) return;
        var ty = o.geometry && o.geometry.type; if (ty !== 'BufferGeometry' && ty !== 'PlaneGeometry') return; // yalnızca çim/çiçek
        var mtx = o.instanceMatrix, list = [];
        for (var i = 0; i < o.count; i++) {
          var x = mtx.array[i * 16 + 12], z = mtx.array[i * 16 + 14];
          if ((x * x) / (RX * RX) + (z * z) / (RZ * RZ) < 1.02) list.push([i, mtx.array.slice(i * 16, i * 16 + 16)]);
        }
        if (list.length) GR.push({ o: o, list: list });
      });
    }
    GR.forEach(function (g) {
      var a = g.o.instanceMatrix.array;
      g.list.forEach(function (e) { var b = e[0] * 16; if (on) { for (var k = 0; k < 16; k++) a[b + k] = k === 15 ? 1 : 0; } else for (var j = 0; j < 16; j++) a[b + j] = e[1][j]; });
      g.o.instanceMatrix.needsUpdate = true;
    });
  }
  function apply() {
    if (!M.ready) return;
    var o = off();
    M.group.visible = !o; hideGrass(!o); syncCastle();
  }
  function animate(now) {
    if (!M.ready || !M.group.visible) return;
    var t = (now - M.t0) / 1000;
    M.flags.forEach(function (f, i) { f.rotation.y = Math.sin(t * 1.7 + i) * .18; f.scale.x = 1 + Math.sin(t * 2.3 + i * .7) * .05; });
    M.vein.emissiveIntensity = 1.3 + Math.sin(t * .9) * .5;
    if (M.glow) M.glow.intensity = 2.2 + Math.sin(t * .9) * .6;
    M.lamp.emissiveIntensity = 1.25 + Math.sin(t * 7) * .06 + Math.sin(t * 13) * .04;
  }
  // Ayarlar'da aç/kapa
  function settingsRow() {
    var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g' || tg.querySelector('#ek-meydan-opt')) return;
    var row = document.createElement('div'); row.id = 'ek-meydan-opt'; row.className = 'card ek-optrow';
    row.innerHTML = '<div><b>Kurultay Meydanı</b><small>Taş meydan, sur ve kuleler, tuğlar, pazar ve Demir Dağ (deneme)</small></div><button type="button" data-ek-meydan="1"></button>';
    tg.insertBefore(row, tg.firstChild);
    row.querySelector('button').addEventListener('click', function () { var s = S(); s.ek = s.ek || {}; s.ek.meydanOff = !s.ek.meydanOff; try { W.save(); } catch (e) {} apply(); label(); });
    label();
  }
  function label() { var b = document.querySelector('[data-ek-meydan]'); if (b) b.textContent = off() ? 'Kapalı · Aç' : 'Açık · Kapat'; }
  var last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    try { if (!M.ready) build(); if (W.tab === 'c') animate(now); } catch (e) {}
    if (now - last > 800) { last = now; try { settingsRow(); if (M.ready && M.group.visible === off()) apply(); if (M.ready) { buildWall(); syncCastle(); } } catch (e) {} }
  }
  function start() { if (!S() || !W.city3d) { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
  W.ergenekonMeydan = { toggle: function () { var s = S(); s.ek = s.ek || {}; s.ek.meydanOff = !s.ek.meydanOff; apply(); return !s.ek.meydanOff; }, _m: function () { return M; } };
})();
