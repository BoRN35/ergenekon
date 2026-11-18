/* Ergenekon — sahne temeli: geniş/eğik kamera, akıcı şehir↔harita geçişi, gerçek saate göre gece/gündüz.
   Yalnızca görsel; oynanışa ve kayda dokunmaz. Claude, 18 Kasım 2026. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekSahne) return; W.__ekSahne = true;

  /* --- kamera: obanın tamamını gösteren geniş ve eğik açı --- */
  function homePos() { var m = W.matchMedia && W.matchMedia('(max-width:760px)').matches; return m ? [62, 78, 96] : [60, 56, 86]; }
  var camDone = false;
  function camera() {
    var c = W.city3d; if (!c || !c.camera || !c.controls) return false;
    if (!c.home.__ek) {
      var nh = function () { c.controls.target.set(0, 2, 0); var p = homePos(); c.camera.position.set(p[0], p[1], p[2]); c.controls.update(); };
      nh.__ek = true; c.home = nh;
    }
    if (!camDone) { camDone = true; c.home(); }
    return true;
  }

  /* --- akıcı geçiş --- */
  W.ekFade = function (mid) {
    var f = document.getElementById('ek-fade');
    if (!f) { f = document.createElement('div'); f.id = 'ek-fade'; document.body.appendChild(f); }
    f.className = 'in';
    setTimeout(function () { try { mid(); } catch (e) {} requestAnimationFrame(function () { f.className = 'out'; }); }, 230);
    setTimeout(function () { f.className = ''; }, 700);
  };

  /* --- gece / gündüz (yerel saat) --- */
  var DN = null;
  function lerp(a, b, t) { return a + (b - a) * t; }
  function dayFactor(d) {
    var h = d.getHours() + d.getMinutes() / 60;
    if (h < 5.5 || h >= 20.5) return 0;
    if (h < 7.5) return (h - 5.5) / 2;
    if (h >= 18.5) return 1 - (h - 18.5) / 2;
    return 1;
  }
  function initDN() {
    var c = W.city3d; if (!c || !c.scene) return false;
    var hemi = null, sun = null, pts = [], torch = [];
    c.scene.traverse(function (o) {
      if (o.isHemisphereLight) hemi = o; else if (o.isDirectionalLight) sun = o; else if (o.isPointLight) pts.push(o);
      if (o.material && o.material.emissive && o.material.emissive.getHexString() === 'e6812f' && torch.indexOf(o.material) < 0) torch.push(o.material);
    });
    if (!hemi || !sun) return false;
    var C = sun.color.constructor;
    DN = { hemi: hemi, sun: sun, pts: pts.map(function (p) { return { o: p, i: p.intensity }; }), torch: torch.map(function (m) { return { m: m, i: m.emissiveIntensity }; }),
      h0: hemi.intensity, s0: sun.intensity, sc0: sun.color.clone(), hc0: hemi.color.clone(), bg0: c.scene.background && c.scene.background.clone ? c.scene.background.clone() : null,
      night: new C('#a9b8e8'), dusk: new C('#ff9a5a'), skyN: new C('#3a4a68'), skyD: new C('#e8b48a'), last: -1, C: C };
    return true;
  }
  function applyDN(force) {
    if (!DN && !initDN()) return;
    var c = W.city3d, now = new Date(), f = W.__ekHour != null ? dayFactor(new Date(2026, 0, 1, W.__ekHour, 0)) : dayFactor(now);
    if (!force && Math.abs(f - DN.last) < .01) return; DN.last = f;
    var dusk = Math.max(0, 1 - Math.abs(f - .5) * 2.4) * (f > 0 && f < 1 ? 1 : 0);
    DN.hemi.intensity = lerp(.85, DN.h0, f);
    DN.sun.intensity = lerp(1.05, DN.s0, f);
    DN.sun.color.copy(DN.night).lerp(DN.sc0, f).lerp(DN.dusk, dusk * .55);
    DN.hemi.color.copy(DN.night).lerp(DN.hc0, f);
    if (DN.bg0) {
      var sky = DN.skyN.clone().lerp(DN.bg0, f).lerp(DN.skyD, dusk * .5);
      c.scene.background.copy(sky); if (c.scene.fog) c.scene.fog.color.copy(sky);
    }
    var nightK = 1 - f;
    DN.torch.forEach(function (t) { t.m.emissiveIntensity = t.i * (1 + nightK * 2.2); });
    DN.pts.forEach(function (p) { p.o.intensity = p.i * (1 + nightK * .9); });
    document.body.classList.toggle('ek-night', f < .35);
  }
  W.ergenekonSahne = { setHour: function (h) { W.__ekHour = h; applyDN(true); }, real: function () { W.__ekHour = null; applyDN(true); } };

  var last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    try { camera(); } catch (e) {}
    if (now - last > 30000 || last === 0) { last = now || 1; try { applyDN(true); } catch (e) {} }
  }
  function start() { if (!W.s || !W.city3d) { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
})();
