/* Ergenekon — 2.5D oba (King of Altay tarzı). Claude, 22 Kasım 2026.
   Sabit eğik kamera (döndürme yok), dar açı ile izometrik görünüm, sınırlı kaydırma/yakınlaştırma,
   her binanın altında seviye + ad levhası, yapım süresi ve çubuğu. Yalnız görünüş; kayda ve kurallara dokunmaz.
   3D'ye dönmek: Ayarlar › Oba görünümü › 3D  (localStorage ek_oba='3d'). */
(function () {
  'use strict';
  var W = window, D = document;
  if (W.__ek25) return; W.__ek25 = true;
  function on() { try { return localStorage.getItem('ek_oba') !== '3d'; } catch (e) { return true; } }
  var FOV = 18, POL = 0.78, AZ = 0.56, base = null;
  function mobile() { return W.matchMedia && W.matchMedia('(max-width:760px)').matches; }
  function homeDist() { return mobile() ? 300 : 250; }
  function setHome() {
    var c = W.city3d, d = homeDist();
    c.controls.target.set(0, 2, 0);
    c.camera.position.set(Math.sin(POL) * Math.sin(AZ) * d, 2 + Math.cos(POL) * d, Math.sin(POL) * Math.cos(AZ) * d);
    c.controls.update();
  }
  function apply() {
    var c = W.city3d; if (!c || !c.camera || !c.controls || !c.home) return false;
    var cam = c.camera, ct = c.controls, f = c.scene && c.scene.fog;
    if (!base) {
      base = { fov: cam.fov, far: cam.far, minD: ct.minDistance, maxD: ct.maxDistance, minP: ct.minPolarAngle, maxP: ct.maxPolarAngle, minA: ct.minAzimuthAngle, maxA: ct.maxAzimuthAngle, rot: ct.enableRotate, two: ct.touches && ct.touches.TWO, fn: f && f.near, ff: f && f.far, home: c.home };
      var nh = function () { if (on()) setHome(); else base.home(); }; nh.__ek = true; nh.__ek25 = true; c.home = nh;
    }
    if (on()) {
      var k = Math.tan(base.fov * Math.PI / 360) / Math.tan(FOV * Math.PI / 360);
      cam.fov = FOV; cam.far = Math.max(base.far, 1800); cam.updateProjectionMatrix();
      ct.enableRotate = false; ct.minPolarAngle = ct.maxPolarAngle = POL; ct.minAzimuthAngle = ct.maxAzimuthAngle = AZ;
      ct.minDistance = homeDist() * .42; ct.maxDistance = homeDist() * 1.12;
      if (ct.touches) ct.touches.TWO = 2; // iki parmak: yakınlaştır + kaydır (döndürme yok)
      if (f) { f.near = base.fn * k; f.far = base.ff * k; }
      setHome();
    } else {
      cam.fov = base.fov; cam.far = base.far; cam.updateProjectionMatrix();
      ct.enableRotate = base.rot; ct.minPolarAngle = base.minP; ct.maxPolarAngle = base.maxP; ct.minAzimuthAngle = base.minA; ct.maxAzimuthAngle = base.maxA;
      ct.minDistance = base.minD; ct.maxDistance = base.maxD; if (ct.touches) ct.touches.TWO = base.two;
      if (f) { f.near = base.fn; f.far = base.ff; }
      base.home();
    }
    D.documentElement.classList.toggle('oba25', on());
    return true;
  }
  W.ekOba25 = function (v) { try { localStorage.setItem('ek_oba', v ? '25' : '3d'); } catch (e) {} apply(); };
  W.ekOba25On = on;

  /* --- bina levhaları --- */
  var P = { el: null, pool: {}, v: null };
  function nm(k) { var b = (W.B || {})[k]; if (!b) return k; var n = b.n || k; return n.length > 14 ? n.split(' ')[0] : n; }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + 'sn'; } }
  function plates() {
    var c = W.city3d, cv = D.getElementById('cityv'), s = W.s;
    if (!c || !c.camera || !cv || !s || !c.buildingSlots) return;
    if (!P.el || !P.el.isConnected) {
      P.el = D.createElement('div'); P.el.id = 'ek-plates'; P.pool = {}; cv.appendChild(P.el);
      P.el.addEventListener('click', function (ev) { var b = ev.target.closest('[data-pl]'); if (!b) return; ev.stopPropagation(); try { c.openBuilding(b.dataset.pl); } catch (e) {} });
    }
    var hide = !on() || W.tab !== 'c' || !!D.querySelector('.ek-ov');
    P.el.hidden = hide; if (hide) return;
    if (!P.v) P.v = new c.camera.position.constructor();
    var r = c.renderer.domElement.getBoundingClientRect(), bx = cv.getBoundingClientRect(), zoom = c.camera.position.distanceTo(c.controls.target) / homeDist();
    P.el.classList.toggle('far', zoom > 1.0);
    c.buildingSlots.forEach(function (g, k) {
      var L = (s.l && s.l[k]) || 0, b = P.pool[k];
      if (!b) { b = P.pool[k] = D.createElement('div'); b.className = 'pl'; b.setAttribute('role', 'button'); b.dataset.pl = k; P.el.appendChild(b); }
      if (!L || !(W.B || {})[k]) { b.hidden = true; return; }
      var q = null; try { q = W.buildQueue(k); } catch (e) {}
      var h = '<span class="pl-n"><b>' + L + '</b>' + nm(k) + '</span>' + (q && q.left > 0 ? '<span class="pl-t">⏱ ' + ft(q.left) + '</span><span class="pl-bar"><i style="width:' + Math.max(2, Math.min(100, 100 - q.left / (q.tot || 1) * 100)).toFixed(0) + '%"></i></span>' : '');
      if (b.__pl !== h) { b.__pl = h; b.innerHTML = h; }
      P.v.set(g.position.x, 0, g.position.z + 2.2).project(c.camera);
      if (P.v.z > 1 || Math.abs(P.v.x) > 1.05 || Math.abs(P.v.y) > 1.05) { b.hidden = true; return; }
      b.hidden = false;
      b.style.transform = 'translate(' + (r.left - bx.left + (P.v.x + 1) / 2 * r.width).toFixed(1) + 'px,' + (r.top - bx.top + (1 - P.v.y) / 2 * r.height).toFixed(1) + 'px) translate(-50%,0)';
    });
  }
  var ok = false, last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
  // alt menü / yan ray: simge altına kısa ad (King of Altay gibi)
  var LB = { c: 'Oba', m: 'Harita', k: 'Kale', r: 'İlim', u: 'Alpler', a: 'İttifak', p: 'Posta', e: 'Etkinlik', y: 'Arena', g: 'Ayarlar' };
  setInterval(function () {
    D.querySelectorAll('#tabs>button:not(#pfb)').forEach(function (b) {
      if (b.dataset.lb) return; var t = b.dataset.t, n = (t && LB[t]) || b.title || b.getAttribute('aria-label') || '';
      if (n === 'Şehir') n = 'Oba'; if (n === 'Etkinlikler') n = 'Etkinlik'; if (n) b.dataset.lb = n;
    });
  }, 1000);
  // üst çubuktaki kartal / düzen düğmelerine ad (sağ sütunda gösterilir)
  setInterval(function () { D.querySelectorAll('.ek-topbtns .ek-rbtn:not([data-lb])').forEach(function (b) { b.dataset.lb = b.dataset.ekPet ? 'Evcil' : b.dataset.ek === 'gear' ? 'Düzen' : b.dataset.ek === 'bag' ? 'Çanta' : ''; }); }, 1000);
  // Ayarlar › Grafik: Oba görünümü 2.5D / 3D
  setInterval(function () {
    var gfx = D.querySelector('#ek-set [data-sec="gfx"] .st-body'); if (!gfx || gfx.querySelector('#ek-oba25')) return;
    var r = D.createElement('div'); r.id = 'ek-oba25'; r.className = 'st-row';
    var paint = function () { var v = on(); r.innerHTML = '<i>🏕️</i><span>Oba görünümü</span><span class="st-seg"><button type="button" data-o25="1" class="' + (v ? 'on' : '') + '">2.5D</button><button type="button" data-o25="0" class="' + (v ? '' : 'on') + '">3D</button></span>'; };
    r.addEventListener('click', function (ev) { var b = ev.target.closest('[data-o25]'); if (!b) return; W.ekOba25(b.dataset.o25 === '1'); paint(); });
    paint(); gfx.appendChild(r);
  }, 800);
    if (!ok) { ok = apply(); return; }
    if (now - last < 66) return; last = now;
    try { plates(); } catch (e) {}
  }
  requestAnimationFrame(loop);
  W.addEventListener('resize', function () { if (ok && on()) { var c = W.city3d; c.controls.minDistance = homeDist() * .42; c.controls.maxDistance = homeDist() * 1.12; } });
})();
