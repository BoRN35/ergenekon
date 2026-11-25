/* Ergenekon — Ek Paket 4, 2. adım: arayüz. Claude, 18 Kasım 2026.
   159 birleşik karşılama kartı · 160 pencere kuyruğu · 161 sade kaynak çubuğu (4 + ⋯) · 162 pencereler arası kısayol
   163 yazı boyutu · 164 iPad yatay/dikey · 165 oyun içi arama · 166 müzik/efekt/titreşim ayrı · 167 yumuşak pencere geçişi · 168 kamera sıfırlama
   Kalıcı: s.ek.fs ('s'|'m'|'l'), s.ek.vib (0 kapalı) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekArayuz) return; W.__ekArayuz = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }

  /* ================= 159) birleşik karşılama kartı ================= */
  function mergeWelcome() {
    var aw = document.getElementById('aw'); if (!aw || aw.__ekM) return; aw.__ekM = 1;
    var card = aw.querySelector('.awc') || aw.firstElementChild, bs = aw.querySelector('.bs'); if (!card || !bs) return;
    var add = '';
    if (W.ekChest && W.ekChest.due()) add += '<div class="card aw-row" data-aw-chest="1"><i>🎁</i><span><b>Günlük hediye</b><small>📦 · 📜 · 🔷?</small></span></div>';
    var N = W.ekNews; if (N && ek().wv !== N.ver && (S().l.ocak || 1) >= 2) { add += '<div class="card aw-row aw-new"><i>✦</i><span><b>Neler yeni</b><small>' + N.items.map(function (x) { return x[0]; }).join(' ') + '</small></span></div>'; N.seen(); }
    if (add) bs.insertAdjacentHTML('beforebegin', add);
    // tek "Topla": giriş ödülü varsa o düğmeye bağlanır; yoksa "Tamam" düğmesi Topla olur
    var main = bs.querySelector('[data-lg]') || bs.querySelector('[data-awy]');
    if (main) { main.innerHTML = '🎁 Topla'; main.classList.add('aw-main'); main.setAttribute('data-ek-topla', '1'); }
    // ikincil düğmeleri sadeleştir
    bs.querySelectorAll('button').forEach(function (b) { if (b !== main && /Sonra|Tamam/.test(b.textContent)) b.textContent = '✕'; });
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('#aw [data-ek-topla]'); if (!b) return;
    var rows = []; try { if (W.ekChest && W.ekChest.due()) rows = W.ekChest.claim(); } catch (e) {}
    if (rows.length && W.ekReport) setTimeout(function () { W.ekReport({ title: 'Günlük hediye', win: true, sub: '🎁', rows: rows }); }, 250);
  }, true);

  /* ================= 160) pencere kuyruğu ================= */
  var Q = [];
  function blocking() { return document.getElementById('aw') || document.getElementById('ek-rep') || document.getElementById('ek-chest') || document.getElementById('ek-boot'); }
  function hookReport() {
    var o = W.ekReport; if (typeof o !== 'function' || o.__ekQ) return;
    var f = function (rep) { if (blocking()) { Q.push(rep); return; } return o.apply(this, arguments); };
    for (var k in o) f[k] = o[k]; f.__ekQ = true; W.ekReport = f; W.__ekReportRaw = o;
  }
  function drain() { if (!Q.length || blocking()) return; var r = Q.shift(); try { W.__ekReportRaw(r); } catch (e) {} }

  /* ================= 161) sade kaynak çubuğu ================= */
  var MAIN = ['odun', 'et', 'demir', 'komur'], RN = { odun: '🪵 Odun', et: '🍖 Et', demir: '⛓️ Demir', komur: '🪨 Kömür', celik: '🔩 Çelik', dari: '🌾 Darı', kristal: '🔥 Kor', ud: '✨ Toz' };
  function resBar() {
    var res = document.getElementById('res'); if (!res) return;
    res.classList.add('ek-res4');
    var more = res.querySelector('[data-ek-res="more"]');
    if (!more) { more = document.createElement('div'); more.setAttribute('data-ek-res', 'more'); more.className = 'ek-more'; more.innerHTML = '<b>⋯</b>'; res.appendChild(more); }
  }
  function moreCard(anchor) {
    var o0 = document.getElementById('ek-rmore'); if (o0) { o0.remove(); return; }
    var s = S(), list = ['celik', 'dari', 'kristal'].concat(['ud']);
    var o = document.createElement('div'); o.id = 'ek-rmore';
    o.innerHTML = list.map(function (r) { var v = r === 'ud' ? s.ud || 0 : s.r[r] || 0; return '<button type="button" data-rm="' + r + '"><span>' + RN[r] + '</span><b>' + nf(v) + '</b></button>'; }).join('');
    document.body.appendChild(o); var rc = anchor.getBoundingClientRect(); o.style.top = (rc.bottom + 6) + 'px'; o.style.right = Math.max(6, innerWidth - rc.right) + 'px';
    o.addEventListener('click', function (ev) { var b = ev.target.closest('[data-rm]'); if (!b) return; o.remove(); if (b.dataset.rm === 'ud') return; var fake = document.querySelector('#res [data-ek-res="' + b.dataset.rm + '"]'); if (fake) { fake.hidden = false; fake.click(); setTimeout(function () { fake.hidden = true; }, 0); } });
    setTimeout(function () { document.addEventListener('pointerdown', function off(ev) { if (!o.contains(ev.target)) { o.remove(); document.removeEventListener('pointerdown', off, true); } }, true); }, 0);
  }
  document.addEventListener('click', function (ev) { var m = ev.target.closest && ev.target.closest('#res [data-ek-res="more"]'); if (!m) return; ev.stopPropagation(); ev.preventDefault(); moreCard(m); }, true);

  /* ================= 162) pencereler arası kısayol ================= */
  var BACK = [];
  W.ekPushBack = function (fn) { BACK.push(fn); if (BACK.length > 5) BACK.shift(); };
  W.ekPopBack = function () { var f = BACK.pop(); if (f) { try { f(); } catch (e) {} return true; } return false; };
  function profileForge() {
    var pop = document.getElementById('pop'); if (!pop || !pop.offsetParent) return;
    var grid = pop.querySelector('.pfg'); if (!grid || pop.querySelector('[data-ek-forge]')) return;
    grid.insertAdjacentHTML('afterend', '<div class="ek-pfgo"><button type="button" data-ek-forge="1">⚒️ Demirci</button><button type="button" data-ek-sets="1">🐺 Setler</button></div>');
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ek-forge],[data-ek-sets],.kh-wp');
    if (!b) return; ev.stopPropagation();
    if (b.dataset.ekSets) { if (W.ergenekonDenge) W.ergenekonDenge.openSet('bozkurt'); return; }
    var fromProfile = !!b.closest('#pop'); var c = document.querySelector('#pop [data-pcl]'); if (c) c.click();
    if (fromProfile) W.ekPushBack(function () { var p = document.getElementById('pfb'); if (p) p.click(); });
    else W.ekPushBack(function () { if (W.ergenekonNpc) W.ergenekonNpc.open('kurultay', 0); });
    if (W.ergenekonDemirci) W.ergenekonDemirci.open();
  }, true);

  /* ================= 163) yazı boyutu · 166) titreşim · ayar satırları ================= */
  function applyFs() { var f = ek().fs || 'm'; document.body.classList.toggle('ek-fs-s', f === 's'); document.body.classList.toggle('ek-fs-l', f === 'l'); }
  (function () { try { var v = navigator.vibrate && navigator.vibrate.bind(navigator); if (!v) return; navigator.vibrate = function (p) { try { if (S() && ek().vib === 0) return false; } catch (e) {} if (typeof p === 'number' && p <= 30) return false; /* 25 Kasım: dokunuş titreşimi yok (NPC/bina/menü); yalnız önemli anlar (desenli titreşim) */ return v(p); }; } catch (e) {} })();
  function setRows() {
    var gfx = document.querySelector('#ek-set [data-sec="gfx"] .st-body');
    if (gfx && !gfx.querySelector('#ek-fs')) {
      var r = document.createElement('div'); r.id = 'ek-fs'; r.className = 'st-row';
      var paint = function () { var f = ek().fs || 'm'; r.innerHTML = '<i>🔤</i><span>Yazı</span><span class="st-seg">' + [['s', 'A−'], ['m', 'A'], ['l', 'A＋']].map(function (o) { return '<button type="button" data-fs="' + o[0] + '" class="' + (f === o[0] ? 'on' : '') + '">' + o[1] + '</button>'; }).join('') + '</span>'; };
      r.addEventListener('click', function (ev) { var b = ev.target.closest('[data-fs]'); if (!b) return; ek().fs = b.dataset.fs; save(); applyFs(); paint(); });
      paint(); gfx.appendChild(r);
    }
    var snd = document.querySelector('#ek-set [data-sec="snd"] .st-body');
    if (snd && !snd.querySelector('#ek-snd2')) {
      var r2 = document.createElement('div'); r2.id = 'ek-snd2';
      var paint2 = function () { var s = S(), vm = s.vm == null ? 40 : s.vm, vb = ek().vib !== 0; r2.innerHTML = '<div class="st-row"><i>🎵</i><span>Müzik</span><span class="st-vol"><button type="button" data-vm="-1">−</button><b>' + vm + '</b><button type="button" data-vm="1">＋</button></span></div><div class="st-row"><i>📳</i><span>Titreşim</span><button type="button" data-vib="1" class="kz-tg' + (vb ? ' on' : '') + '"><u></u></button></div>'; };
      r2.addEventListener('click', function (ev) { if (ev.target.closest('[data-vib]')) { ek().vib = ek().vib === 0 ? 1 : 0; save(); paint2(); } else if (ev.target.closest('[data-vm]')) setTimeout(paint2, 60); });
      paint2(); snd.appendChild(r2);
    }
  }

  /* ================= 165) oyun içi arama ================= */
  function norm(t) { return String(t).toLocaleLowerCase('tr').replace(/[ıi̇]/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c'); }
  function index() {
    var L = [], B = W.B || {};
    (W.ergenekonNpc ? W.ergenekonNpc.NPCS : []).forEach(function (n) { L.push({ e: n.e, n: n.n, k: 'npc', id: n.id, t: 0 }); n.tabs.forEach(function (t, i) { L.push({ e: t.e, n: t.n, sub: n.n, k: 'npc', id: n.id, t: i }); }); });
    for (var b in B) if (B[b] && B[b].n) L.push({ e: B[b].i || '🏠', n: B[b].n, sub: 'Bina', k: 'bld', id: b });
    [['odun', 'Odun'], ['et', 'Et'], ['demir', 'Demir'], ['komur', 'Kömür'], ['celik', 'Çelik'], ['dari', 'Darı'], ['kristal', 'Kor']].forEach(function (r) { L.push({ e: RN[r[0]].split(' ')[0], n: r[1], sub: 'Nereden', k: 'res', id: r[0] }); });
    [['kagit', '📜', 'Yükseltme Kağıdı'], ['safir', '🔷', 'Safir'], ['opal', '🔮', 'Opal']].forEach(function (m) { L.push({ e: m[1], n: m[2], sub: 'Nereden', k: 'mat', id: m[0] }); });
    (W.HH || []).forEach(function (h, i) { L.push({ e: '⭐', n: h.n, sub: 'Kahraman', k: 'npc', id: 'kurultay', t: 0 }); });
    var seen = {}; (W.M || []).forEach(function (m) { if (m && !seen[m[0]]) { seen[m[0]] = 1; L.push({ e: m[1], n: m[0], sub: 'Canavar', k: 'mon', id: m[0] }); } });
    [['⚒️', 'Demirci', 'forge'], ['⚔', 'Arena', 'arena'], ['🗺️', 'Harita', 'map'], ['⚙️', 'Ayarlar', 'set'], ['🎒', 'Çanta', 'bag'], ['📬', 'Posta', 'mail'], ['☾', 'Kut Gücü', 'kut'], ['✨', 'Eritme', 'melt'], ['🧪', 'Enerji', 'ei'], ['⏳', 'Kum Saati', 'ks'], ['📋', 'Bonuslar', 'bo'], ['🧾', 'Ganimet', 'gl']].forEach(function (x) { L.push({ e: x[0], n: x[1], k: 'act', id: x[2] }); });
    return L;
  }
  function go(it) {
    document.querySelectorAll('.ek-ov').forEach(function (o) { o.remove(); });
    var tabTo = function (t) { var b = document.querySelector('#tabs [data-t="' + t + '"]'); if (b) b.click(); else { W.tab = t; rer(); } };
    if (it.k === 'npc') { tabTo('c'); setTimeout(function () { W.ergenekonNpc.open(it.id, it.t); }, 150); }
    else if (it.k === 'bld') { tabTo('c'); setTimeout(function () { try { W.city3d.openBuilding(it.id); } catch (e) {} }, 200); }
    else if (it.k === 'res') { var c = document.querySelector('#res [data-ek-res="' + it.id + '"]') || document.querySelector('#res > *:nth-child(' + (['odun', 'et', 'demir'].indexOf(it.id) + 1) + ')'); if (c) { var h = c.hidden; c.hidden = false; c.click(); c.hidden = h; } }
    else if (it.k === 'mat') { if (W.ekGoSource) W.ekGoSource(it.id); }
    else if (it.k === 'mon') { ek().cs = { sp: it.id, lv: 0, mat: '' }; tabTo('m'); setTimeout(function () { if (W.ekOpenFind) { W.ekOpenFind(); setTimeout(function () { var b = document.querySelector('[data-cs-tab="k"]'); if (b) b.click(); }, 60); } }, 500); }
    else if (it.k === 'act') {
      var A = { forge: function () { if (W.ergenekonDemirci) W.ergenekonDemirci.open(); }, arena: function () { if (W.ekGoArena) W.ekGoArena(); }, map: function () { W.tab = 'm'; W.SC = 'm'; rer(); }, set: function () { W.tab = 'g'; rer(); }, bag: function () { if (W.openCanta) W.openCanta(); }, mail: function () { tabTo('p'); }, kut: function () { W.ergenekonIlerleme && W.ergenekonIlerleme.openKut(); }, melt: function () { if (W.openCanta) W.openCanta(); }, ei: function () { W.ekPotion && W.ekPotion.open(); }, ks: function () { W.ergenekonFarm && W.ergenekonFarm.openKs(); }, bo: function () { W.ekOpenBonus && W.ekOpenBonus(); }, gl: function () { var b = document.createElement('button'); b.setAttribute('data-ek-gl', '1'); document.body.appendChild(b); b.click(); b.remove(); } };
      (A[it.id] || function () {})();
    }
  }
  function openSearch() {
    var L = index(), o = popup('Ara', '<div class="sr-in"><input type="search" placeholder="🔎" autocomplete="off" enterkeyhint="search"></div><div class="sr-list"></div>', 'sr-card'); o.id = 'ek-search';
    var inp = o.querySelector('input'), list = o.querySelector('.sr-list'), cur = [];
    var draw = function () { var q = norm(inp.value.trim()); cur = !q ? L.filter(function (x) { return x.k === 'npc' && !x.sub; }) : L.filter(function (x) { return norm(x.n + ' ' + (x.sub || '')).indexOf(q) >= 0; }).slice(0, 30); list.innerHTML = cur.map(function (x, i) { return '<button type="button" data-sr="' + i + '"><i>' + x.e + '</i><b>' + esc(x.n) + '</b><small>' + esc(x.sub || '') + '</small></button>'; }).join('') || '<p class="sr-none">—</p>'; };
    inp.addEventListener('input', draw); inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && cur[0]) go(cur[0]); });
    list.addEventListener('click', function (ev) { var b = ev.target.closest('[data-sr]'); if (b) go(cur[+b.dataset.sr]); });
    draw(); setTimeout(function () { inp.focus(); }, 80);
  }
  W.ekOpenSearch = openSearch;
  function searchBtn() {
    var tabs = document.getElementById('tabs'); if (!tabs || tabs.querySelector('[data-ek-srch]')) return;
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-ek-srch', '1'); b.title = 'Ara';
    b.innerHTML = '<span class="ek-nxi"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#e2b65a" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg></span>';
    b.addEventListener('click', function (ev) { ev.stopPropagation(); openSearch(); });
    var pfb = document.getElementById('pfb'); if (pfb && pfb.nextSibling) tabs.insertBefore(b, pfb.nextSibling); else tabs.appendChild(b);
  }

  /* ================= 167) yumuşak geçiş · 164) iPad yön ================= */
  function classes() {
    var low = (ek().gq === 'low') || document.body.classList.contains('ek-eco'); document.body.classList.toggle('ek-anim-fast', low);
    var w = innerWidth, h = innerHeight, tab = Math.min(w, h) >= 700 && Math.max(w, h) <= 1400;
    document.body.classList.toggle('ek-tablet', tab); document.body.classList.toggle('ek-tablet-p', tab && h > w); document.body.classList.toggle('ek-tablet-l', tab && w >= h);
  }
  addEventListener('resize', classes); addEventListener('orientationchange', function () { setTimeout(classes, 200); });

  /* ================= 168) kamera: varsayılan açı ================= */
  var CAM = null;
  function camBtn() {
    var host = W.tab === 'm' ? document.getElementById('mapv') : W.tab === 'c' ? document.getElementById('cityv') : null;
    if (!host) { if (CAM) CAM.hidden = true; return; }
    if (!CAM) { CAM = document.createElement('div'); CAM.id = 'ek-cam'; CAM.setAttribute('role', 'button'); CAM.title = 'Varsayılan açı'; CAM.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffe08a" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="1.5" fill="#ffe08a"/></svg>'; CAM.addEventListener('click', function (ev) { ev.stopPropagation(); try { if (W.tab === 'm') { W.world3d.focusPlayer ? W.world3d.focusPlayer() : W.world3d.home(); } else W.city3d.home(); } catch (e) {} try { navigator.vibrate && navigator.vibrate(10); } catch (e) {} }); }
    if (CAM.parentNode !== host) host.appendChild(CAM);
    CAM.hidden = !!document.querySelector('.ek-ov');
  }

  var l1 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 250) { l1 = now; try { mergeWelcome(); hookReport(); drain(); resBar(); profileForge(); setRows(); searchBtn(); camBtn(); classes(); applyFs(); } catch (e) {} }
  }
  function start() { if (!S()) { setTimeout(start, 300); return; } applyFs(); classes(); requestAnimationFrame(frame); }
  start();
})();
