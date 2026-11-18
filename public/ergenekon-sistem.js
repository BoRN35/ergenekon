/* Ergenekon — Aşama 4: 3'lü yükseltme sırası, günlük hediye sandığı, akıllı sefer. Claude, 18 Kasım 2026.
   Kalıcı veriler s.ek.uq (sıra), s.ek.dc (son sandık günü). */
(function () {
  'use strict';
  var W = window;
  if (W.__ekSistem) return; W.__ekSistem = true;
  function S() { return W.s; }
  function ek() { var s = S(); if (!s) return null; s.ek = s.ek || {}; s.ek.uq = s.ek.uq || []; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function B() { return W.B || {}; }
  function persist() { try { W.save(); } catch (e) {} }

  /* ---------- 13) yükseltme sırası (en fazla 3) ---------- */
  function onlyBusy(k) { // tek engel ustaların dolu olması mı?
    var s = S(); if (!B()[k] || (s.l[k] || 0) >= 40) return false;
    try {
      if (W.buildQueue(k)) return false;
      if (W.buildQueues().length < W.builders()) return false;
      if ((W.buildingRequirements(k) || []).length) return false;
      var c = W.cost(k); for (var r in c) if ((s.r[r] || 0) < c[r]) return false;
      return true;
    } catch (e) { return false; }
  }
  function canQueue(k) { var e = ek(); return e && e.uq.length < 3 && e.uq.indexOf(k) < 0 && onlyBusy(k); }
  function enqueue(k) { var e = ek(); if (!canQueue(k)) return false; e.uq.push(k); persist(); try { W.add('📋 ' + B()[k].n + ' sıraya eklendi.'); } catch (x) {} return true; }
  function processQueue() {
    var e = ek(), s = S(); if (!e || !e.uq.length) return;
    e.uq = e.uq.filter(function (k) { return B()[k] && (s.l[k] || 0) < 40; });
    var k = e.uq[0]; if (!k) return;
    var busy = 0, n = 1; try { busy = W.buildQueues().length; n = W.builders(); } catch (x) { return; }
    if (busy >= n) return;
    var ok = false; try { ok = W.can(k); } catch (x) {}
    if (ok) { e.uq.shift(); try { W.start(k); } catch (x) {} }
  }
  W.ekQueue = { canQueue: canQueue, enqueue: enqueue, list: function () { var e = ek(); return e ? e.uq.slice() : []; } };
  var QS = { el: null };
  function strip() {
    var cv = document.getElementById('cityv'), s = S(), e = ek();
    if (!cv || W.tab !== 'c' || !s || !e) { if (QS.el) QS.el.hidden = true; return; }
    if (!QS.el || !QS.el.isConnected) {
      QS.el = document.createElement('div'); QS.el.id = 'ek-uq';
      QS.el.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-uq]'); if (!b) return;
        var k = b.dataset.uq;
        if (b.dataset.kind === 'q') { var i = e.uq.indexOf(k); if (i >= 0) { e.uq.splice(i, 1); persist(); } }
        else if (W.city3d) W.city3d.openBuilding(k);
        strip();
      });
    }
    if (QS.el.parentNode !== cv) cv.appendChild(QS.el);
    var act = []; try { act = W.buildQueues(); } catch (x) {}
    var n = 1; try { n = W.builders(); } catch (x) {}
    if (!act.length && !e.uq.length) { QS.el.hidden = true; return; }
    var h = '';
    act.forEach(function (q) { var pc = Math.max(0, Math.min(100, 100 - q.left / q.tot * 100)); h += '<button type="button" class="uq a" data-uq="' + q.k + '" data-kind="a" style="--p:' + pc.toFixed(0) + '"><span>' + (B()[q.k] ? B()[q.k].i : '🔨') + '</span><small>' + ft(q.left) + '</small></button>'; });
    for (var i = act.length; i < n; i++) h += '<span class="uq free" title="Boş usta">🔨</span>';
    e.uq.forEach(function (k) { h += '<button type="button" class="uq q" data-uq="' + k + '" data-kind="q" title="Sıradan çıkar"><span>' + (B()[k] ? B()[k].i : '?') + '</span><i>✕</i></button>'; });
    for (var j = e.uq.length; j < 3; j++) h += '<span class="uq slot"></span>';
    if (QS.el.__ekh !== h) { QS.el.__ekh = h; QS.el.innerHTML = h; }
    QS.el.hidden = false;
  }
  // bina kartına "Sıraya ekle" düğmesi
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ek-enqueue]'); if (!b) return;
    ev.stopPropagation(); if (enqueue(b.getAttribute('data-ek-enqueue'))) { var o = document.getElementById('ek-yapi'); if (o) o.remove(); try { W.BMK = ''; W.render(); } catch (x) {} }
  }, true);

  /* ---------- 12) günlük hediye sandığı ---------- */
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function rewards() {
    var s = S(), o = (s.l && s.l.ocak) || 1, g = Math.pow(1.32, o - 1), r = [];
    r.push(['odun', Math.round(400 * g)], ['et', Math.round(350 * g)], ['demir', Math.round(120 * g)]);
    if (o >= 5) r.push(['komur', Math.round(60 * g)]);
    r.push(['kagit', 1 + (Math.random() < .35 ? 1 : 0)]);
    if (Math.random() < .12) r.push(['safir', 1]);
    return r;
  }
  var RI = { odun: '🪵', et: '🍖', demir: '⛓️', komur: '🪨', kagit: '📜', safir: '🔷' };
  function chestDue() { var e = ek(); return e && e.dc !== today() && (S().l.ocak || 1) >= 1; }
  function openChest() {
    if (document.getElementById('ek-chest')) return;
    var o = document.createElement('div'); o.id = 'ek-chest'; o.className = 'ek-ov';
    o.innerHTML = '<div class="dc-box"><div class="dc-t">Günlük Hediye Sandığı</div><button type="button" class="dc-chest" aria-label="Sandığı aç"><span class="dc-lid"></span><span class="dc-body"></span><span class="dc-glow"></span></button><div class="dc-h">Dokun, aç</div><div class="dc-items"></div></div>';
    document.body.appendChild(o);
    var opened = false;
    o.querySelector('.dc-chest').addEventListener('click', function () {
      if (opened) return; opened = true;
      var e = ek(), s = S(), list = rewards(), cap = Infinity; try { cap = W.cap(); } catch (x) {}
      e.dc = today();
      var dm = s.ek.dm = s.ek.dm || {}; dm.mat = dm.mat || { kagit: 0, safir: 0, opal: 0 };
      list.forEach(function (it) { var k = it[0], v = it[1]; if (k === 'kagit' || k === 'safir') dm.mat[k] = (dm.mat[k] || 0) + v; else s.r[k] = Math.min(k === 'komur' ? Infinity : cap, (s.r[k] || 0) + v); });
      persist();
      o.querySelector('.dc-box').classList.add('open');
      o.querySelector('.dc-h').textContent = 'Ödüller toplandı';
      var box = o.querySelector('.dc-items');
      box.innerHTML = list.map(function (it, i) { var a = (i / list.length) * Math.PI * 2 - Math.PI / 2; return '<span class="dc-it" data-dx="' + Math.round(Math.cos(a) * 120) + '" data-dy="' + Math.round(Math.sin(a) * 90) + '"><i>' + RI[it[0]] + '</i><b>+' + nf(it[1]) + '</b></span>'; }).join('');
      box.querySelectorAll('.dc-it').forEach(function (el, i) {
        var end = 'translate(calc(-50% + ' + el.dataset.dx + 'px), calc(-50% + ' + el.dataset.dy + 'px)) scale(1)';
        el.style.transform = end; el.style.opacity = '1';
        try { el.animate([{ transform: 'translate(-50%, -50%) scale(.2)', opacity: 0 }, { transform: end, opacity: 1 }], { duration: 600, delay: i * 70, easing: 'cubic-bezier(.3,1.6,.5,1)', fill: 'backwards' }); } catch (x) {}
      });
      try { W.snd(700, .08); setTimeout(function () { W.snd(1050, .12); }, 140); } catch (x) {}
      try { navigator.vibrate && navigator.vibrate([20, 50, 40]); } catch (x) {}
      setTimeout(function () { flyAll(o, list); }, 1500);
      setTimeout(function () { o.remove(); try { W.render(); } catch (x) {} }, 2600);
    });
  }
  function flyAll(o, list) {
    var top = document.getElementById('res');
    o.querySelectorAll('.dc-it').forEach(function (el, i) {
      var k = list[i][0], chip = top && (top.querySelector('[data-ek-res="' + k + '"]') || top.children[{ odun: 0, et: 1, demir: 2 }[k]]) || document.querySelector('[data-ek="bag"]');
      if (!chip) return;
      var a = el.getBoundingClientRect(), b = chip.getBoundingClientRect();
      var to = 'translate(calc(-50% + ' + (+el.dataset.dx + b.left + b.width / 2 - a.left - a.width / 2) + 'px), calc(-50% + ' + (+el.dataset.dy + b.top + b.height / 2 - a.top - a.height / 2) + 'px)) scale(.4)';
      try { el.animate([{ transform: el.style.transform, opacity: 1 }, { transform: to, opacity: 0 }], { duration: 700, delay: i * 50, easing: 'cubic-bezier(.5,-.3,.6,1)', fill: 'forwards' }); } catch (x) { el.style.opacity = '0'; }
    });
  }

  /* ---------- 9) akıllı sefer: kaynağa dokununca tek "Gönder" ---------- */
  var SV = { last: -2 };
  var RT = { odun: 'Orman', et: 'Av sahası', demir: 'Demir madeni', komur: 'Kömür madeni' }, RICON = { odun: '🌲', et: '🦌', demir: '⛏️', komur: '🪨' };
  function sendSheet() {
    if (W.tab !== 'm') { SV.last = -2; return; }
    var i = typeof W.sel === 'number' ? W.sel : -1;
    if (i === SV.last) return; SV.last = i;
    var old = document.getElementById('ek-send'); if (old) old.remove();
    if (i < 0) return;
    var s = S(), n = s.nodes && s.nodes[i]; if (!n) return;
    var tm = document.getElementById('tm'); if (tm) tm.classList.remove('world-detail-open');
    var idle = (s.sq || []).findIndex(function (q) { return q.st === 0; }), lk = false, t = 0, cap = 0;
    try { lk = n.lv > W.maxLv(); t = W.mt(i); cap = W.marchCapacity(); } catch (x) {}
    var back = (s.sq || []).filter(function (q) { return q.st; }).map(function (q) { return q.left || 0; }).sort(function (a, b) { return a - b; })[0];
    var why = lk ? '🔒 Kutsal Ocak seviyesi yetmiyor' : n.rg > 0 ? '⏳ Yenileniyor · ' + ft(n.rg) : n.res <= 0 ? 'Tükendi' : idle < 0 ? '🐎 Boş kafile yok' + (back ? ' · ' + ft(back) : '') : '';
    var o = document.createElement('div'); o.id = 'ek-send'; o.className = 'ek-ov ek-sheet';
    o.innerHTML = '<div class="ek-modal ek-small"><div class="ek-mh"><span class="ek-cap">SEFER</span><h2>' + RICON[n.t] + ' ' + (RT[n.t] || 'Kaynak') + ' · Sv ' + n.lv + '</h2><button type="button" class="ek-x" data-ek-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="sv-stats"><span><i>📦</i><b>' + nf(n.res) + '</b></span><span><i>⏱</i><b>' + ft(t) + '</b></span><span><i>🐎</i><b>' + nf(cap) + '</b></span><span><i>⚔</i><b>Kafile ' + (idle + 1 || '—') + '</b></span></div>' +
      (why ? '<p class="sv-why">' + why + '</p>' : '') +
      '<div class="ek-acts ek-fgo"><button type="button" class="ek-btn gold" data-sv-go="' + i + '"' + (why ? ' disabled' : '') + '>Gönder</button></div></div>';
    o.addEventListener('click', function (ev) {
      var tg = ev.target;
      if (tg === o || tg.closest('[data-ek-close]')) { o.remove(); try { W.sel = -1; } catch (x) {} return; }
      var g = tg.closest('[data-sv-go]'); if (g && !g.disabled) { try { W.send(+g.dataset.svGo); W.sel = -1; } catch (x) {} o.remove(); try { navigator.vibrate && navigator.vibrate(15); } catch (x) {} }
    });
    document.body.appendChild(o);
  }

  var lastSec = 0, lastFast = 0, chestTried = false;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    if (now - lastFast > 250) { lastFast = now; try { sendSheet(); } catch (x) {} }
    if (now - lastSec < 1000) return; lastSec = now;
    try { processQueue(); strip(); } catch (x) {}
    try { if (!chestTried && chestDue() && !document.getElementById('aw') && !document.querySelector('.ek-ov') && W.tab === 'c') { chestTried = true; setTimeout(openChest, 600); } } catch (x) {}
  }
  function start() { if (!S() || typeof W.can !== 'function') { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
  W.ergenekonSistem = { openChest: openChest, enqueue: enqueue };
})();
