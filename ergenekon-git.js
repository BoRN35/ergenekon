/* Ergenekon — görevden doğrudan ilgili ekrana gitme. Claude, 22 Kasım 2026.
   Günlük görevler (Tuğ Direği), Açılış 7 gün ve Emek Defteri satırlarına dokununca ilgili komut açılır.
   Yalnız gezinme yapar; kayda yazmaz. */
(function () {
  'use strict';
  var W = window, D = document;
  if (W.__ekGit) return; W.__ekGit = true;
  function S() { return W.s; }
  function rer() { try { W.render(); } catch (e) {} }
  function closeAll() {
    D.querySelectorAll('.ek-ov').forEach(function (o) { o.remove(); });
    var x = D.querySelector('#ek-npcbar:not([hidden]) .nb-x'); if (x) x.click();
    var pop = D.getElementById('pop'); if (pop && pop.style.display !== 'none') { var c = pop.querySelector('[data-close],.close,.x'); if (c) c.click(); }
  }
  function tabGo(t) { var b = D.querySelector('#tabs [data-t="' + t + '"]'); if (b && b.offsetWidth) b.click(); else { W.tab = t; rer(); } }
  // haritada bir hedefe kaydır ve kartını aç
  function mapTarget(pick) {
    if (W.tab !== 'm') { var wb = D.getElementById('ek-world'); if (wb && wb.offsetWidth) wb.click(); else tabGo('m'); }
    var tries = 0;
    (function go() {
      var w = W.world3d, T = w && w.pveTargets, t = T && pick(T, w);
      if (!w || !t || !w.controls || W.tab !== 'm') { if (++tries < 30) setTimeout(go, 200); return; }
      var c = w.controls, cam = w.camera, sx = c.target.x, sz = c.target.z, p0 = cam.position.clone(), t0 = performance.now();
      (function step(now) {
        var e = Math.min(1, (now - t0) / 600), q = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, nx = sx + (t.worldX - sx) * q, nz = sz + (t.worldZ - sz) * q;
        cam.position.set(p0.x + nx - sx, p0.y, p0.z + nz - sz); c.target.set(nx, c.target.y, nz); c.update();
        if (e < 1) requestAnimationFrame(step); else try { w.activate({ kind: t.kind, index: t.index }); } catch (x) {}
      })(t0);
    })();
  }
  function goMonster() {
    var i = W.ergenekonFarm && W.ergenekonFarm.nearestMonster ? W.ergenekonFarm.nearestMonster() : -1;
    if (i < 0) { mapTarget(function () { return null; }); return; }
    mapTarget(function (T) { return T.filter(function (x) { return x.kind === 'monster' && x.index === i; })[0]; });
  }
  function goNode() {
    mapTarget(function (T, w) {
      var c = w.controls.target, best = null, bd = 1e9;
      T.forEach(function (x) { if (x.kind !== 'node') return; var d = Math.hypot(x.worldX - c.x, x.worldZ - c.z); if (d < bd) { bd = d; best = x; } });
      return best;
    });
  }
  // yükseltilebilecek yapıyı aç: önce şimdi yapılabilir olanların en hızlısı, yoksa en düşük seviyeli
  function goBuild() {
    if (W.tab !== 'c') tabGo('c');
    var s = S(), B = W.B || {}, ks = Object.keys(B).filter(function (k) { return (s.l[k] || 0) > 0 && (s.l[k] || 0) < 40; }), q = [];
    try { q = (W.buildQueues() || []).map(function (x) { return x.k; }); } catch (e) {}
    ks = ks.filter(function (k) { return q.indexOf(k) < 0; });
    var ok = ks.filter(function (k) { try { return W.can(k); } catch (e) { return false; } });
    var dur = function (k) { try { return W.dur(k); } catch (e) { return 0; } };
    var pick = (ok.length ? ok : ks).sort(function (a, b) { return ok.length ? dur(a) - dur(b) : (s.l[a] || 0) - (s.l[b] || 0); })[0] || 'ocak';
    setTimeout(function () { try { W.city3d.openBuilding(pick); } catch (e) { try { W.BMK = pick; rer(); } catch (x) {} } }, 120);
  }
  var ACT = {
    kill: goMonster, mine: goNode, build: goBuild,
    help: function () { var h = D.getElementById('ek-hand'); tabGo('a'); if (h && !h.hidden) setTimeout(function () { var hh = D.getElementById('ek-hand'); if (hh && !hh.hidden) hh.click(); }, 200); },
    arena: function () { if (W.ekGoArena) W.ekGoArena(); else tabGo('y'); },
    research: function () { tabGo('r'); },
    kurgan: function () { if (W.ekOpenHub) W.ekOpenHub(); },
    hero: function () { if (W.ekNpcOpen) W.ekNpcOpen('kurultay'); },
    ocak: function () { if (W.ekNpcOpen) W.ekNpcOpen('ocak'); },
    forge: function () { if (W.openDemirci) W.openDemirci(); }
  };
  W.ekGo = function (k) { var f = ACT[k]; if (!f) return false; closeAll(); setTimeout(function () { try { f(); } catch (e) {} }, 60); return true; };
  var ED = { av: 'kill', top: 'mine', yap: 'build', arz: 'research', kg: 'kurgan', ars: 'arena' };
  var O7 = ['build', 'kill', 'mine', 'hero', 'ocak', 'forge', 'ocak'];
  // satırlara gidiş anahtarını iliştir (tıklanabilir görünsün)
  function mark() {
    D.querySelectorAll('.gg-list .gg-r:not([data-go])').forEach(function (r, i) { var k = ['kill', 'mine', 'build', 'help', 'arena'][i]; if (k) { r.setAttribute('data-go', k); r.setAttribute('role', 'button'); } });
    D.querySelectorAll('.ed-goals .ed-g:not([data-go])').forEach(function (r, i) { var k = ED[['av', 'top', 'yap', 'arz', 'kg', 'ars'][i]]; if (k) { r.setAttribute('data-go', k); r.setAttribute('role', 'button'); } });
    D.querySelectorAll('.o7 .o7-d:not([data-go])').forEach(function (r, i) { if (O7[i]) { r.setAttribute('data-go', O7[i]); r.setAttribute('role', 'button'); } });
  }
  new MutationObserver(mark).observe(D.documentElement, { childList: true, subtree: true });
  D.addEventListener('click', function (ev) {
    var r = ev.target.closest && ev.target.closest('[data-go]'); if (!r) return;
    if (ev.target.closest('button') && ev.target.closest('button') !== r) return; // ödül düğmesi kendi işini yapar
    if (r.classList.contains('ok') || r.classList.contains('got') || r.classList.contains('lk') || r.classList.contains('miss')) return;
    ev.stopPropagation(); ev.preventDefault();
    try { navigator.vibrate && navigator.vibrate(10); } catch (e) {}
    W.ekGo(r.getAttribute('data-go'));
  }, true);
})();
