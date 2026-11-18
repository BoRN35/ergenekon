/* Ergenekon — Ek Paket 3, 3. adım: mobil rahatlık. Claude, 18 Kasım 2026.
   117 başparmak düzeni (telefonda pencereler alttan açılır, kapat ve ana tuşlar alt bölgede) · 118 aşağı kaydırıp kapat
   119 geri tuşu önce pencereyi/sayfayı kapatır · 120 pil tasarrufu (arka planda/pil düşükken/uzun süre dokunulmazken kare hızı düşer)
   147 yükleme ekranı index.html başında (#ek-boot). Kalıcı: s.ek.eco ('auto' | 'on' | 'off') */
(function () {
  'use strict';
  var W = window;
  if (W.__ekMobil) return; W.__ekMobil = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function save() { try { W.save(); } catch (e) {} }
  function phone() { return Math.min(innerWidth, innerHeight) < 600 || (innerWidth < 760 && innerHeight > innerWidth); }

  /* ---------- 117) başparmak düzeni ---------- */
  function layout() { document.body.classList.toggle('ek-thumb', phone() && innerHeight > innerWidth); }
  addEventListener('resize', layout); layout();

  /* ---------- 118) aşağı kaydırıp kapat ---------- */
  function topOverlay() { var L = document.querySelectorAll('.ek-ov'); return L.length ? L[L.length - 1] : null; }
  function closeOv(o) {
    if (!o) return false;
    var x = o.querySelector('.yk-x,[data-yk="close"],.ek-x,[data-ek-close]');
    if (x) x.click(); if (o.isConnected) o.remove(); return true;
  }
  var DR = null;
  document.addEventListener('touchstart', function (ev) {
    if (!document.body.classList.contains('ek-thumb') || ev.touches.length !== 1) return;
    var card = ev.target.closest && ev.target.closest('.ek-ov .yk-card, .ek-ov .ek-modal'); if (!card) return;
    var sc = ev.target.closest('.dd-line,.ab-grid,.kt-list,.rk-list,.tg-grid,.ad-bugs,.ci-grid,.bf-list,.ds-path,textarea,input,[data-ek-flv],input[type=range]');
    if (sc && sc.scrollTop > 0) return; if (ev.target.matches && ev.target.matches('input[type=range]')) return;
    if (card.scrollTop > 2) return;
    DR = { card: card, y: ev.touches[0].clientY, x: ev.touches[0].clientX, dy: 0, t: Date.now() };
  }, { passive: true, capture: true });
  document.addEventListener('touchmove', function (ev) {
    if (!DR) return; var dy = ev.touches[0].clientY - DR.y, dx = Math.abs(ev.touches[0].clientX - DR.x);
    if (dx > 40 && dx > dy) { DR.card.style.transform = ''; DR = null; return; }
    DR.dy = Math.max(0, dy); DR.card.style.transition = 'none'; DR.card.style.transform = 'translateY(' + DR.dy + 'px)';
  }, { passive: true, capture: true });
  document.addEventListener('touchend', function () {
    if (!DR) return; var d = DR; DR = null; d.card.style.transition = 'transform .2s';
    var fast = d.dy > 50 && Date.now() - d.t < 250;
    if (d.dy > 110 || fast) { d.card.style.transform = 'translateY(100%)'; setTimeout(function () { closeOv(d.card.closest('.ek-ov')); }, 160); }
    else d.card.style.transform = '';
  }, { capture: true });

  /* ---------- 119) geri tuşu ---------- */
  var lastBack = 0;
  function guard() { try { history.pushState({ ek: 1 }, ''); } catch (e) {} }
  function goCity() { var b = document.querySelector('#tabs [data-t="c"]'); if (b) b.click(); else { W.tab = 'c'; try { W.render(); } catch (e) {} } }
  addEventListener('popstate', function () {
    var o = topOverlay(), pop = document.getElementById('pop'), handled = false;
    if (o) handled = closeOv(o);
    else if (pop && pop.offsetParent) { var c = pop.querySelector('[data-pcl]'); if (c) { c.click(); handled = true; } }
    else if (W.tab && W.tab !== 'c') { goCity(); handled = true; }
    if (handled) { guard(); return; }
    var now = Date.now();
    if (now - lastBack < 2200) { history.back(); return; } // ikinci kez: gerçekten çık
    lastBack = now; guard(); toast('↩ ×2');
  });
  var tEl = null;
  function toast(t) { if (!tEl) { tEl = document.createElement('div'); tEl.id = 'ek-rec-t'; document.body.appendChild(tEl); } tEl.textContent = t; tEl.className = ''; void tEl.offsetWidth; tEl.classList.add('on'); clearTimeout(tEl.__t); tEl.__t = setTimeout(function () { tEl.classList.remove('on'); }, 1800); }

  /* ---------- 120) pil tasarrufu ---------- */
  var ECO = { on: false, low: false, idle: false, n: 0, last: Date.now() };
  try { if (navigator.getBattery) navigator.getBattery().then(function (b) { var u = function () { ECO.low = !b.charging && b.level <= .2; }; u(); b.addEventListener('levelchange', u); b.addEventListener('chargingchange', u); }); } catch (e) {}
  ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach(function (n) { addEventListener(n, function () { ECO.last = Date.now(); if (ECO.idle) { ECO.idle = false; apply(); } }, { passive: true, capture: true }); });
  function mode() { var e = S() && ek().eco; return e || 'auto'; }
  function apply() {
    var m = mode(), on = m === 'on' || (m === 'auto' && (ECO.low || ECO.idle));
    if (on !== ECO.on) { ECO.on = on; document.body.classList.toggle('ek-eco', on); }
  }
  function hookRenderers() {
    [W.city3d, W.world3d].forEach(function (v) {
      var r = v && v.renderer; if (!r || r.__ekEco) return; r.__ekEco = 1;
      var o = r.render.bind(r), lastR = 0, pend = 0;
      r.render = function (sc, cam) {
        if (ECO.on && cam === v.camera) { var now = performance.now(), iv = ECO.idle ? 120 : 33; if (now - lastR < iv) { if (!pend) pend = setTimeout(function () { pend = 0; lastR = performance.now(); o(sc, cam); }, iv); return; } lastR = now; }
        return o(sc, cam);
      };
    });
  }
  function ecoTick() { ECO.idle = Date.now() - ECO.last > 60000; apply(); hookRenderers(); }
  function ecoRow() {
    var box = document.querySelector('#ek-set [data-sec="gfx"] .st-body'); if (!box || box.querySelector('#ek-eco')) return;
    var r = document.createElement('div'); r.id = 'ek-eco'; r.className = 'st-row';
    var paint = function () { var m = mode(); r.innerHTML = '<i>🔋</i><span>Pil tasarrufu</span><span class="st-seg">' + [['auto', 'Oto'], ['on', 'Açık'], ['off', 'Kapalı']].map(function (o) { return '<button type="button" data-eco="' + o[0] + '" class="' + (m === o[0] ? 'on' : '') + '">' + o[1] + '</button>'; }).join('') + '</span>'; };
    r.addEventListener('click', function (ev) { var b = ev.target.closest('[data-eco]'); if (!b) return; ek().eco = b.dataset.eco; save(); paint(); apply(); });
    paint(); box.appendChild(r);
  }

  var l1 = 0;
  function frame(now) { requestAnimationFrame(frame); if (document.hidden) return; if (now - l1 > 1000) { l1 = now; try { ecoTick(); ecoRow(); layout(); } catch (e) {} } }
  function start() { if (!S()) { setTimeout(start, 400); return; } guard(); requestAnimationFrame(frame); }
  start();
})();
