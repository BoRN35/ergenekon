/* Ergenekon — Bahadır Meydanı obanın içinde: kum meydan + bekleyen Bahadır (NPC). Claude, 18 Kasım 2026.
   NPC'ye ya da üstündeki simgeye dokununca arena (sekme 'y') açılır. Sefer Otağı'ndaki eski arena sekmesi kaldırıldı (ergenekon-ek.js). */
(function () {
  'use strict';
  var W = window;
  if (W.__ekArena) return; W.__ekArena = true;
  var POS = { x: 19, z: -11 };
  var A = { g: null, npc: null, el: null, v: null };
  function classes() {
    var c3 = W.city3d; if (!c3 || !c3.scene) return null; var o = {};
    c3.scene.traverse(function (x) {
      if (x.geometry && !o[x.geometry.type]) o[x.geometry.type] = x.geometry.constructor;
      if (x.isMesh && !o.Mesh && !x.isInstancedMesh) o.Mesh = x.constructor;
      if (x.type === 'Group' && !o.Group) o.Group = x.constructor;
      if (x.material && x.material.type === 'MeshStandardMaterial' && !o.Std) o.Std = x.material.constructor;
    });
    return o.Mesh && o.Group && o.Std && o.CylinderGeometry && o.SphereGeometry && o.ConeGeometry && o.BoxGeometry ? o : null;
  }
  function goArena() {
    var b = document.querySelector('#tabs [data-t="y"]'); if (b) b.click(); else { W.tab = 'y'; try { W.render(); } catch (e) {} }
    try { navigator.vibrate && navigator.vibrate(15); W.snd(520, .08); } catch (e) {}
  }
  W.ekGoArena = goArena;
  function build() {
    var K = classes(); if (!K) return false;
    var CY = K.CylinderGeometry, g = new K.Group(); g.position.set(POS.x, 0, POS.z);
    function put(geo, m, x, y, z, par) { var o = new K.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; (par || g).add(o); return o; }
    var sand = new K.Std({ color: '#c9ad7a', roughness: 1 }), wood = new K.Std({ color: '#5a3d24', roughness: .9 }), rope = new K.Std({ color: '#b08a55', roughness: 1 });
    var red = new K.Std({ color: '#8f2a1e', roughness: .8 }), gold = new K.Std({ color: '#d6a640', metalness: .5, roughness: .4 });
    // kum meydan + kazık çit + iki sancak
    put(new CY(5.2, 5.4, .12, 40), sand, 0, .06, 0);
    for (var i = 0; i < 14; i++) { var a = i / 14 * Math.PI * 2; put(new CY(.12, .14, 1.3, 8), wood, Math.cos(a) * 5.4, .65, Math.sin(a) * 5.4); }
    if (K.TorusGeometry) { var rp = put(new K.TorusGeometry(5.4, .05, 6, 56), rope, 0, 1.05, 0); rp.rotation.x = Math.PI / 2; }
    [-1, 1].forEach(function (sd) {
      put(new CY(.09, .09, 4.2, 8), wood, sd * 3.2, 2.1, -4.6);
      var fl = put(new K.BoxGeometry(1.1, 1.5, .04), red, sd * 3.2 + .58, 3.4, -4.6); fl.userData.flag = sd;
      put(new K.SphereGeometry(.12, 10, 8), gold, sd * 3.2, 4.25, -4.6);
    });
    // Bahadır (pehlivan kılıklı alp): kaftan, kuşak, börk, kalkan ve mızrak
    var n = new K.Group(); n.position.set(0, .12, 0); n.scale.setScalar(1.6); g.add(n);
    var skin = new K.Std({ color: '#b98663', roughness: .75 }), kaftan = new K.Std({ color: '#7a2a1c', roughness: .8 }), dark = new K.Std({ color: '#2b1c12', roughness: .9 }), steel = new K.Std({ color: '#a9b1b8', metalness: .7, roughness: .3 });
    [-.24, .24].forEach(function (x) { put(new CY(.17, .13, 1.0, 12), dark, x, .62, 0, n); });
    put(new CY(.5, .38, 1.1, 16), kaftan, 0, 1.65, 0, n); put(new CY(.4, .56, .7, 16), kaftan, 0, .95, 0, n);
    put(new CY(.42, .42, .14, 16), gold, 0, 1.22, 0, n);
    [-1, 1].forEach(function (sd) { var ar = put(new CY(.13, .11, .9, 10), kaftan, sd * .62, 1.68, 0, n); ar.rotation.z = -sd * .15; put(new K.SphereGeometry(.12, 10, 8), skin, sd * .68, 1.2, 0, n); });
    put(new K.SphereGeometry(.28, 16, 12), skin, 0, 2.5, 0, n);
    var bd = put(new K.ConeGeometry(.15, .3, 10), dark, 0, 2.3, .15, n); bd.rotation.x = Math.PI;
    put(new CY(.3, .28, .22, 16), dark, 0, 2.68, 0, n); put(new K.ConeGeometry(.24, .4, 16), steel, 0, 2.95, 0, n);
    var sh = put(new CY(.55, .55, .08, 24), red, -.78, 1.55, .25, n); sh.rotation.z = Math.PI / 2; sh.rotation.y = .3;
    put(new K.SphereGeometry(.12, 10, 8), gold, -.84, 1.55, .27, n);
    put(new CY(.035, .035, 3.0, 8), wood, .72, 1.6, .05, n); put(new K.ConeGeometry(.08, .35, 10), steel, .72, 3.25, .05, n);
    n.rotation.y = -.6;
    W.city3d.scene.add(g); A.g = g; A.npc = n;
    return true;
  }
  // üstündeki simge (DOM) + 3D'ye dokunma
  function marker() {
    var c = W.city3d, cv = document.getElementById('cityv');
    if (!c || !c.camera || !cv || W.tab !== 'c' || !A.g) { if (A.el) A.el.hidden = true; return; }
    if (!A.el || !A.el.isConnected) {
      A.el = document.createElement('div'); A.el.setAttribute('role', 'button'); A.el.tabIndex = 0; A.el.id = 'ek-arena-npc'; A.el.title = 'Bahadır Meydanı';
      A.el.innerHTML = '<b>⚔</b>';
      A.el.addEventListener('click', function (ev) { ev.stopPropagation(); goArena(); });
      cv.appendChild(A.el);
    }
    if (!A.v) A.v = new c.camera.position.constructor();
    A.v.set(POS.x, 6.4, POS.z).project(c.camera);
    var r = c.renderer.domElement.getBoundingClientRect(), b = cv.getBoundingClientRect();
    if (A.v.z > 1 || A.v.x < -1.1 || A.v.x > 1.1 || A.v.y < -1.1 || A.v.y > 1.1) { A.el.hidden = true; return; }
    A.sx = r.left + (A.v.x + 1) / 2 * r.width; A.sy = r.top + (1 - A.v.y) / 2 * r.height;
    A.el.hidden = false; A.el.style.transform = 'translate(' + (A.sx - b.left - 20).toFixed(1) + 'px,' + (A.sy - b.top - 20).toFixed(1) + 'px)';
    // NPC gövdesinin ekran konumu (dokunma alanı)
    A.v.set(POS.x, 2.4, POS.z).project(c.camera); A.bx = r.left + (A.v.x + 1) / 2 * r.width; A.by = r.top + (1 - A.v.y) / 2 * r.height;
  }
  var down = null;
  document.addEventListener('pointerdown', function (ev) { if (W.tab !== 'c' || !ev.target.closest || !ev.target.closest('#cityv canvas')) return; down = { x: ev.clientX, y: ev.clientY, t: Date.now() }; }, true);
  document.addEventListener('pointerup', function (ev) {
    if (!down || W.tab !== 'c' || A.bx == null) { down = null; return; }
    var moved = Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 10 || Date.now() - down.t > 600; down = null; if (moved) return;
    var sc = 46;
    if (Math.hypot(ev.clientX - A.bx, ev.clientY - A.by) < sc) { ev.stopPropagation(); goArena(); }
  }, true);
  var t0 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (!A.g) { if (now - t0 > 800) { t0 = now; try { build(); } catch (e) {} } return; }
    if (W.tab === 'c') {
      var t = now / 1000; A.npc.position.y = .12 + Math.sin(t * 1.6) * .03; A.npc.rotation.y = -.6 + Math.sin(t * .4) * .25;
      A.g.children.forEach(function (o) { if (o.userData.flag) o.rotation.y = Math.sin(t * 2 + o.userData.flag) * .25; });
      try { marker(); } catch (e) {}
    } else if (A.el) A.el.hidden = true;
  }
  requestAnimationFrame(frame);
})();
