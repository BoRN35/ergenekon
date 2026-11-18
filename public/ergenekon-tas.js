/* Taş Yazıt görünümü: yalnız görünüş. Kapatmak için localStorage ek_tema='eski' veya W.ekTema(false). */
(function (W) {
  'use strict';
  var D = document, H = D.documentElement;
  function on() { try { return localStorage.getItem('ek_tema') !== 'eski'; } catch (e) { return true; } }
  W.ekTema = function (v) { try { localStorage.setItem('ek_tema', v ? 'tas' : 'eski'); } catch (e) {} H.classList.toggle('tas', !!v); };
  H.classList.toggle('tas', on());
  var P = {
    kurultay: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    ocak: '<path d="M12 3c3 4 6 6 6 10a6 6 0 0 1-12 0c0-3 2-5 3-7 1 2 2 3 3 3 0-2 0-4 0-6z"/>',
    sefer: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    agil: '<path d="M5 20l2-6-2-3 4-6 5 1 5 4-2 2-3-1-1 3 2 6"/>',
    tug: '<path d="M6 21V3M6 4c4-2 7 2 12 0v8c-5 2-8-2-12 0"/>',
    hazine: '<path d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l3 16M15 4l-3 16"/>',
    arena: '<path d="M5 19L17 7M14 5l5 5M19 19L7 7M10 5L5 10M4 20l2-2M20 20l-2-2"/>'
  };
  function svg(p) { return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  function patch() {
    if (!H.classList.contains('tas')) return;
    var ms = D.querySelectorAll('.np-mk:not(.lk) > i');
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i], id = m.parentNode.dataset.npc;
      if (P[id] && m.__tas !== m.parentNode.__k) { m.innerHTML = svg(P[id]); m.__tas = m.parentNode.__k; }
    }
    D.querySelectorAll('#tabs i').forEach(function (i) { if (i.textContent.trim() === '!' && !i.classList.contains('ek-moon')) i.classList.add('ek-moon'); });
    var a = D.querySelector('#ek-arena-npc > b');
    if (a && !a.__tas) { a.innerHTML = svg(P.arena); a.__tas = 1; }
  }
  setInterval(patch, 400);
  /* --- kalan eski renkli kutuları taşa çevir (yalnız arka plan; tıklama/mantık değişmez) --- */
  var ST = {
    p: [['background', '#222324'], ['border-color', '#1b1c1d']],
    pt: [['background', 'rgba(30,31,32,.86)'], ['border-color', '#1b1c1d']],
    b: [['background', 'linear-gradient(180deg,#36383a,#26282a)'], ['border-color', '#1b1c1d'], ['box-shadow', 'inset 0 1px 0 rgba(255,255,255,.07),0 2px 6px rgba(0,0,0,.45)'], ['color', '#e9e2d0']],
    on: [['background', 'linear-gradient(180deg,#2a2b2c,#1f2021)'], ['border-color', '#5fd0d8'], ['box-shadow', 'inset 0 -2px 0 #e8c66a,0 0 10px rgba(95,208,216,.22)'], ['color', '#e8c66a']]
  };
  var PROPS = ['background', 'border-color', 'box-shadow', 'color'];
  function clear(e) { if (!e.dataset.tas) return; PROPS.forEach(function (k) { e.style.removeProperty(k); }); delete e.dataset.tas; }
  var LA = 1;
  function hue(bg) {
    var m = bg.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?/); if (!m) return null;
    var R = +m[1], G = +m[2], B = +m[3], A = m[4] == null ? 1 : +m[4]; if (A < .12) return null; LA = A;
    var mx = Math.max(R, G, B), mn = Math.min(R, G, B); if (mx - mn < (mx < 75 ? 7 : 16)) return null; if (mx > 140) return 'gold';
    if (R > 185 && G > 135 && B < 150) return 'gold';
    if (G >= R && B >= R - 6) return (G > 85 && mx - mn > 38) ? 'hi' : 'teal';
    if (R > B) return (R > 150 && G < 90) ? 'red' : 'brown';
    return null;
  }
  var SKIP = /^(cityv|tc|mapv|bk|wx|top|tabs|res)$/;
  function fix(e) {
    if (e.__tasc === e.className && e.dataset.tas !== undefined) return;
    if (e.__tasc === e.className && e.__tasn) return;
    e.__tasc = e.className; clear(e);
    if (SKIP.test(e.id) || e.tagName === 'IMG' || e.tagName === 'CANVAS' || e.closest('svg,.world3d')) { e.__tasn = 1; return; }
    var st = e.getAttribute('style') || ''; if (/background/.test(st)) { e.__tasn = 1; return; }
    var cs = getComputedStyle(e), bi = cs.backgroundImage, bg = bi !== 'none' ? bi : cs.backgroundColor;
    if (/url\(/.test(bi)) { e.__tasn = 1; return; }
    var h = hue(bg); if (!h || h === 'gold' || h === 'red') { e.__tasn = 1; return; }
    var r = e.getBoundingClientRect(); if (r.width * r.height < 400) { e.__tasn = 1; return; }
    var btn = e.tagName === 'BUTTON' || e.getAttribute('role') === 'button';
    if (!btn && h === 'hi') { e.__tasn = 1; return; }
    var k = btn ? (h === 'hi' || /\b(on|is-selected|active|sel)\b/.test(e.className) ? 'on' : 'b') : (LA > .7 ? 'p' : 'pt');
    e.__tasn = 0; Q.push([e, k]);
  }
  var Q = [], ROOTS = '.wrap>.ovp, .ek-ov, #ek-npcbar, #cp, #aw, #tm .side, #tc .side, #qp, #pop', SEL = 'div,section,aside,article,header,nav,button,span,li,label,a,[role=button]';
  function flush() { Q.forEach(function (q) { var e = q[0], k = q[1]; e.dataset.tas = k; ST[k].forEach(function (x) { e.style.setProperty(x[0], x[1], 'important'); }); }); Q = []; }
  function scan(R) { if (!R.offsetWidth) return; if (R.matches && R.matches(SEL)) fix(R); var all = R.querySelectorAll(SEL); for (var j = 0; j < all.length; j++) if (all[j].offsetWidth) fix(all[j]); }
  function sweep() {
    if (!H.classList.contains('tas')) return;
    try { var roots = D.querySelectorAll(ROOTS); for (var i = 0; i < roots.length; i++) scan(roots[i]); } catch (e) {}
    flush();
  }
  /* boyama öncesi: yeni eklenen düğümler aynı anda taşa çevrilir, yanıp sönme olmaz */
  new MutationObserver(function (ms) {
    if (!H.classList.contains('tas')) return;
    try {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        if (m.type === 'attributes') { var t = m.target; if (t.nodeType === 1 && t.closest && t.closest(ROOTS)) scan(t); continue; }
        for (var j = 0; j < m.addedNodes.length; j++) { var n = m.addedNodes[j]; if (n.nodeType === 1 && (n.matches(ROOTS) || n.closest(ROOTS))) scan(n); }
      }
    } catch (e) {}
    flush();
  }).observe(D.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden'] });
  setInterval(sweep, 1200);
  var oldT = W.ekTema; W.ekTema = function (v) { oldT(v); if (!v) D.querySelectorAll('[data-tas]').forEach(clear); else sweep(); };

})(window);
