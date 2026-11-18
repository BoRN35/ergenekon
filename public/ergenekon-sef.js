/* Ergenekon — Ek Paket 2 · 90) şefin 3D görünümü (+ 97 binek, 91 set pelerini). Claude, 18 Kasım 2026.
   Profil vitrininde döndürülebilir küçük 3D şef: takılı eşyalar rengine (nadirlik) göre görünür, "+" arttıkça parıltı,
   en üstte altın aura; tam sette sete özel pelerin; seçili binek yanında durur. Oyunun kendi Three.js sınıfları kullanılır. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekSef) return; W.__ekSef = true;
  function S() { return W.s; }
  var C = null, R = null;
  function classes() {
    if (C) return C; var c3 = W.city3d; if (!c3 || !c3.scene || !c3.renderer || !c3.camera) return null;
    var o = { Scene: c3.scene.constructor, Renderer: c3.renderer.constructor, Camera: c3.camera.constructor };
    c3.scene.traverse(function (x) {
      if (x.geometry && !o[x.geometry.type]) o[x.geometry.type] = x.geometry.constructor;
      if (x.isMesh && !o.Mesh && !x.isInstancedMesh) o.Mesh = x.constructor;
      if (x.type === 'Group' && !o.Group) o.Group = x.constructor;
      if (x.material && x.material.type === 'MeshStandardMaterial' && !o.Std) o.Std = x.material.constructor;
      if (x.isLight && !o[x.type]) o[x.type] = x.constructor;
    });
    if (!o.Mesh || !o.Group || !o.Std || !o.BoxGeometry || !o.CylinderGeometry || !o.SphereGeometry || !o.ConeGeometry || !o.HemisphereLight || !o.DirectionalLight) return null;
    return (C = o);
  }
  var TINT = ['#8a8d91', '#4caf50', '#3d8fe0', '#9b5de5', '#f2c14e'];
  function eq() { return (S().ch && S().ch.eq) || {}; }
  function col(x, d) { return x ? TINT[Math.max(0, Math.min(4, x.r || 0))] : d; }
  function plus(x) { return (x && x.p) || 0; }

  // doğal malzeme tonları (nadirlik kademesine göre keçe → deri → kurt postu → pul zırh → Tengri) + ince nadirlik şeridi
  var BASEC = ['#5e4a36', '#6e4b2e', '#7d7468', '#8f979f', '#b9934a'];
  function build() {
    var K = classes(); if (!K) return null;
    var g = new K.Group(), E = eq(), maxP = 0; for (var k in E) maxP = Math.max(maxP, plus(E[k]));
    function tier(x) { return x ? Math.max(0, Math.min(4, x.r || 0)) : -1; }
    function mat(x, d) { var tr = tier(x), c = tr < 0 ? d : BASEC[tr], p = plus(x), m = new K.Std({ color: c, roughness: tr >= 3 ? .38 : .85, metalness: tr >= 3 ? .55 : .05 }); if (p >= 5) { m.emissive = new m.color.constructor(TINT[Math.max(0, tr)]); m.emissiveIntensity = Math.min(.45, .05 + p * .025); } return m; }
    function trim(x) { var tr = tier(x); return new K.Std({ color: tr < 0 ? '#3a2a1e' : TINT[tr], metalness: .6, roughness: .35, emissive: tr >= 2 ? TINT[tr] : '#000000', emissiveIntensity: tr >= 2 ? .25 : 0 }); }
    function put(geo, m, x, y, z, sx, sy, sz, par) { var o = new K.Mesh(geo, m); o.position.set(x, y, z); if (sx) o.scale.set(sx, sy, sz); (par || g).add(o); return o; }
    var CY = K.CylinderGeometry, skin = new K.Std({ color: '#b98663', roughness: .75 }), dark = new K.Std({ color: '#2b1c12', roughness: .8 });
    var sph = new K.SphereGeometry(1, 24, 18), cone = new K.ConeGeometry(1, 1, 20), ring = new CY(1, 1, 1, 24, 1, true);
    // bacaklar (konik) + çizme
    [-.2, .2].forEach(function (x) { put(new CY(.15, .12, .95, 16), mat(E.l, '#4a3424'), x, .78, 0); put(new CY(.14, .16, .42, 16), mat(E.f, '#3a2a1e'), x, .2, .03); put(new CY(.165, .165, .05, 16), trim(E.f), x, .4, .03); });
    // gövde (aşağı daralan) + kaftan eteği + kemer
    put(new CY(.46, .34, 1.0, 20), mat(E.g, '#5a3d28'), 0, 1.72, 0);
    put(new CY(.36, .48, .55, 20), mat(E.g, '#5a3d28'), 0, 1.0, 0);
    put(new CY(.37, .37, .09, 20), dark, 0, 1.24, 0); put(sph, trim(E.g), 0, 1.24, .37, .06, .06, .03);
    put(new CY(.47, .47, .06, 20, 1, true), trim(E.g), 0, 2.2, 0);
    // omuzlar + kollar (konik) + eller
    [-1, 1].forEach(function (sd) { put(sph, mat(E.k, '#5a3d28'), sd * .5, 2.12, 0, .2, .17, .2); var a = put(new CY(.12, .1, .82, 14), mat(E.k, '#5a3d28'), sd * .56, 1.68, 0); a.rotation.z = -sd * .1; put(new CY(.115, .115, .07, 14), trim(E.k), sd * .6, 1.36, 0); put(sph, skin, sd * .61, 1.2, .02, .1, .11, .1); });
    // boyun, baş, sakal
    put(new CY(.12, .14, .18, 12), skin, 0, 2.3, 0); put(sph, skin, 0, 2.55, 0, .24, .28, .25);
    var bd = put(cone, dark, 0, 2.36, .14, .14, .26, .1); bd.rotation.x = Math.PI;
    // börk / miğfer: kürk kenar + tepe
    var hm = mat(E.b, '#4a3424'); put(new CY(.29, .27, .2, 22), tier(E.b) >= 3 ? hm : new K.Std({ color: '#3b2d22', roughness: 1 }), 0, 2.7, 0);
    put(sph, hm, 0, 2.8, 0, .25, .2, .25); put(cone, hm, 0, 3.02, 0, .07, .3, .07); put(new CY(.295, .295, .04, 22, 1, true), trim(E.b), 0, 2.79, 0);
    if (E.e0 || E.e1) [-.24, .24].forEach(function (x) { put(sph, trim(E.e0 || E.e1), x, 2.46, 0, .035, .05, .035); });
    // silah (sağ el)
    var w = E.w, wn = (w && w.n) || '', wm = trim(w), wood = new K.Std({ color: '#6b4a2b', roughness: .8 }), hand = new K.Group(); hand.position.set(.62, 1.2, .1); g.add(hand);
    if (/Yay/.test(wn)) { if (K.TorusGeometry) { var b = new K.Mesh(new K.TorusGeometry(.6, .03, 8, 28, Math.PI * .95), wood); b.rotation.z = -Math.PI / 2; b.position.set(.05, .3, 0); hand.add(b); [-1, 1].forEach(function (sd) { put(sph, wm, .05, .3 + sd * .6, 0, .04, .04, .04, hand); }); } put(new CY(.006, .006, 1.18, 4), new K.Std({ color: '#e7d6b4' }), .05, .3, 0, 0, 0, 0, hand); }
    else if (/Mızra/.test(wn)) { put(new CY(.03, .03, 2.2, 10), wood, 0, .55, 0, 0, 0, 0, hand); put(cone, wm, 0, 1.75, 0, .07, .34, .07, hand); put(new CY(.05, .05, .08, 10), wm, 0, 1.55, 0, 0, 0, 0, hand); }
    else if (w) { var bl = put(new K.BoxGeometry(.07, 1.0, .02), new K.Std({ color: '#c9d0d6', metalness: .8, roughness: .25 }), 0, .66, 0, 0, 0, 0, hand); bl.rotation.z = .04; put(new K.BoxGeometry(.3, .05, .07), wm, 0, .14, 0, 0, 0, 0, hand); put(new CY(.03, .03, .2, 8), dark, 0, .02, 0, 0, 0, 0, hand); }
    // set pelerini
    var SETC = { 2: '#24557f', 3: '#4e2f86', 4: '#8f6512' }, slots = ['b', 'k', 'g', 'l', 'f', 'w'];
    [4, 3, 2].some(function (r) { if (slots.every(function (k) { return E[k] && (E[k].r || 0) === r; })) { var cp = put(new CY(.5, .62, 1.6, 20, 1, true, Math.PI * .65, Math.PI * .7), new K.Std({ color: SETC[r], roughness: .8, side: 2, emissive: SETC[r], emissiveIntensity: .1 }), 0, 1.45, -.05); cp.rotation.y = Math.PI; return true; } return false; });
    // aura: en yüksek "+" 10 ve üstü
    if (maxP >= 10) {
      var am = new K.Std({ color: '#ffd34c', emissive: '#ffd34c', emissiveIntensity: maxP >= 15 ? 1.1 : .6, transparent: true, opacity: maxP >= 15 ? .2 : .12, depthWrite: false });
      var au = put(sph, am, 0, 1.65, 0, .95, 1.65, .95); au.renderOrder = 3; g.userData.aura = au;
    }
    // binek
    var hs = W.ergenekonDenge && W.ergenekonDenge.horse();
    if (hs) {
      var hc = hs.id === 'yakut' ? '#d9d4ca' : hs.id === 'ahal' ? '#b8913f' : hs.id === 'tulpar' ? '#e6eef6' : '#6e4426', hm2 = new K.Std({ color: hc, roughness: .55, metalness: hs.id === 'ahal' ? .3 : 0 }), mane = new K.Std({ color: hs.id === 'yakut' ? '#bdb6a9' : '#24170e', roughness: .9 });
      var hg = new K.Group(); hg.position.set(-1.7, 0, -.7); hg.rotation.y = .55; g.add(hg);
      var body = put(new CY(.32, .3, 1.3, 18), hm2, 0, 1.2, 0, 0, 0, 0, hg); body.rotation.x = Math.PI / 2;
      put(sph, hm2, 0, 1.22, .62, .33, .32, .3, hg); put(sph, hm2, 0, 1.2, -.62, .32, .3, .3, hg);
      var nk = put(new CY(.14, .22, .72, 14), hm2, 0, 1.58, .78, 0, 0, 0, hg); nk.rotation.x = .6;
      var hd = put(new CY(.08, .14, .5, 14), hm2, 0, 1.8, 1.12, 0, 0, 0, hg); hd.rotation.x = 2.1;
      var mn = put(new K.BoxGeometry(.05, .6, .12), mane, 0, 1.66, .66, 0, 0, 0, hg); mn.rotation.x = .6;
      [[-.17, .5], [.17, .5], [-.17, -.5], [.17, -.5]].forEach(function (p) { put(new CY(.07, .05, .95, 10), hm2, p[0], .5, p[1], 0, 0, 0, hg); put(new CY(.06, .07, .07, 10), mane, p[0], .04, p[1], 0, 0, 0, hg); });
      var tl = put(new CY(.03, .09, .6, 10), mane, 0, 1.05, -.92, 0, 0, 0, hg); tl.rotation.x = .5;
      put(new CY(.34, .34, .3, 18, 1, true, -Math.PI / 2, Math.PI), new K.Std({ color: '#5a2a1a', roughness: .8, side: 2 }), 0, 1.48, 0, 0, 0, 0, hg).rotation.z = Math.PI / 2;
      if (hs.id === 'tulpar') [-1, 1].forEach(function (sd) { var wg = put(new K.BoxGeometry(.8, .03, .5), new K.Std({ color: '#ffffff', emissive: '#bfe8ff', emissiveIntensity: .35 }), sd * .55, 1.55, 0, 0, 0, 0, hg); wg.rotation.z = sd * .45; });
    }
    return g;
  }
  function ensure() {
    var K = classes(); if (!K) return null; if (R) return R;
    var cv = document.createElement('canvas'); cv.className = 'sef-cv';
    var r = new K.Renderer({ canvas: cv, antialias: true, alpha: true }); r.setPixelRatio(Math.min(2, W.devicePixelRatio || 1));
    var sc = new K.Scene(), cam = new K.Camera(30, 1, .1, 50); cam.position.set(0, 2.1, 7.2); cam.lookAt(0, 1.45, 0);
    sc.add(new K.HemisphereLight('#fff3dd', '#2a2017', 1.2)); var d = new K.DirectionalLight('#ffffff', 1.6); d.position.set(3, 6, 4); sc.add(d);
    R = { cv: cv, r: r, sc: sc, cam: cam, g: null, key: '', rot: .4, drag: null, on: false };
    cv.addEventListener('pointerdown', function (ev) { R.drag = ev.clientX; cv.setPointerCapture(ev.pointerId); });
    cv.addEventListener('pointermove', function (ev) { if (R.drag == null) return; R.rot += (ev.clientX - R.drag) * .012; R.drag = ev.clientX; });
    cv.addEventListener('pointerup', function () { R.drag = null; });
    return R;
  }
  function sig() { var E = eq(), s = ''; for (var k in E) s += k + (E[k] ? (E[k].n + E[k].r + plus(E[k])) : '-'); var h = W.ergenekonDenge && W.ergenekonDenge.horse(); return s + (h ? h.id : ''); }
  function disposeG(g) { g.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); }
  function mount() {
    var host = document.querySelector('.ek-vt'); if (!host) { if (R) R.on = false; return; }
    var box = host.querySelector('.sef-box');
    if (!box) { box = document.createElement('div'); box.className = 'sef-box'; host.insertBefore(box, host.firstChild); }
    var rr = ensure(); if (!rr) return; if (rr.cv.parentNode !== box) box.appendChild(rr.cv);
    var w = box.clientWidth || 300, h = box.clientHeight || 190; if (rr.cv.width !== Math.round(w * rr.r.getPixelRatio())) { rr.r.setSize(w, h, false); rr.cam.aspect = w / h; rr.cam.updateProjectionMatrix(); }
    var k = sig(); if (k !== rr.key) { if (rr.g) { rr.sc.remove(rr.g); disposeG(rr.g); } rr.g = build(); if (rr.g) rr.sc.add(rr.g); rr.key = k; }
    rr.on = true;
  }
  var last = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - last > 400) { last = now; try { mount(); } catch (e) {} }
    if (R && R.on && R.g && R.cv.isConnected) {
      if (R.drag == null) R.rot += .006; R.g.rotation.y = R.rot;
      if (R.g.userData.aura) R.g.userData.aura.material.opacity = (R.g.userData.aura.material.opacity > .18 ? .2 : .12) + Math.sin(now / 600) * .03;
      R.r.render(R.sc, R.cam);
    }
  }
  function start() {
    if (!S() || !W.city3d || !W.city3d.scene) { setTimeout(start, 500); return; }
    // profil yeniden çizildiğinde tuvali aynı karede geri tak (yanıp sönmesin)
    try { new MutationObserver(function () { var v = document.querySelector('.ek-vt'); if (v && !v.querySelector('.sef-box')) try { mount(); } catch (e) {} }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
    requestAnimationFrame(frame);
  }
  start();
})();
