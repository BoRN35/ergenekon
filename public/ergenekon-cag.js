/* Ergenekon — Ek Paket 4, 3. adım: ilerleme ve klan. Claude, 18 Kasım 2026.
   212 çağ isimleri (Oba · Boy · Bodun · Kağanlık) · 213 günlük 5 görev + sandık · 214 kahraman uyanışı (dönüşümle seçmeli)
   215 klan seviyesi · 216 klan bayrağı · 217 yeni üye karşılaması · 218 pasif üye uyarısı
   169 isim değiştirme (ilki ücretsiz, sonra Ad Tılsımı) · 171 sürüm numarası · 182 FPS/bellek göstergesi (yönetici)
   Kalıcı: s.ek.era, s.ek.gg (günlük görev), s.ek.aw (uyanış), s.ek.boy.cx (klan xp), s.ek.nm/nmc/at (isim) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekCag) return; W.__ekCag = true;
  var VERSION = '2026.11.18-p4';
  W.EK_VER = VERSION;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hsh(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000003; return h; }
  function day() { var d = new Date(); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function rep(t, rows, sub) { if (W.ekReport) W.ekReport({ title: t, win: true, sub: sub, rows: rows }); }
  function mats() { var s = S(); s.ek.dm = s.ek.dm || {}; s.ek.dm.mat = s.ek.dm.mat || { kagit: 0, safir: 0, opal: 0 }; return s.ek.dm.mat; }

  /* ================= 212) çağ isimleri ================= */
  var ERAS = [[1, 'Oba', '🏕️'], [11, 'Boy', '🐺'], [21, 'Bodun', '🏯'], [31, 'Kağanlık', '👑']];
  function eraIdx(o) { var i = 0; ERAS.forEach(function (e, j) { if (o >= e[0]) i = j; }); return i; }
  function era() { return ERAS[eraIdx(S().l.ocak || 1)]; }
  W.ekEra = era;
  function eraTick() {
    var e = ek(), i = eraIdx(S().l.ocak || 1); if (e.era == null) { e.era = i; save(); return; } if (i <= e.era) return;
    e.era = i; var s = S(), m = mats(), g = Math.round(5000 * Math.pow(1.3, S().l.ocak || 1));
    ['odun', 'et', 'demir'].forEach(function (k) { s.r[k] = (s.r[k] || 0) + g; }); m.kagit += 3 + i * 2; m.safir += i;
    save(); document.body.classList.add('ek-era-fx'); setTimeout(function () { document.body.classList.remove('ek-era-fx'); }, 2600);
    rep(ERAS[i][2] + ' ' + ERAS[i][1] + ' Çağı', [['📦', '+' + nf(g * 3)], ['📜', '+' + (3 + i * 2)], ['🔷', '+' + i]], 'Yeni çağ');
  }
  function eraUI() {
    var v = document.querySelector('.ek-vt .vt-ti'); var er = era();
    if (v && !v.querySelector('.era')) v.insertAdjacentHTML('afterbegin', '<span class="era">' + er[2] + ' ' + er[1] + ' · </span>');
    var yk = document.getElementById('ek-yapi'); if (yk && yk.dataset.k === 'ocak' && !yk.querySelector('.era-chip')) { var hero = yk.querySelector('.yk-hero'); if (hero) hero.insertAdjacentHTML('beforeend', '<span class="era-chip">' + er[2] + ' ' + er[1] + ' Çağı</span>'); }
  }


  (window.__ykInj = window.__ykInj || []).push(eraUI);
  /* ================= 213) günlük görevler ================= */
  var GT = [
    { k: 'kill', e: '🐺', n: '5 canavar avla', g: 5, v: function (s) { return (s.stat && s.stat.kills) || 0; } },
    { k: 'mine', e: '🐎', n: 'Haritadan kaynak topla', g: function () { return Math.round(800 * Math.pow(1.25, S().l.ocak || 1)); }, v: function (s) { return (s.stat && s.stat.mined) || 0; } },
    { k: 'build', e: '🔨', n: 'Bir yükseltme başlat', g: 1, v: function (s) { return (s.d && s.d.p && s.d.p.build) || 0; }, daily: 1 },
    { k: 'help', e: '🤝', n: '3 boydaşa yardım et', g: 3, v: function (s) { return ((s.d && s.d.p && s.d.p.help) || 0); }, daily: 1 },
    { k: 'arena', e: '⚔', n: '1 arena düellosu', g: 1, v: function (s) { return (s.stat && s.stat.arena) || 0; } }
  ];
  function gg() { var e = ek(), d = day(), s = S(); if (!e.gg || e.gg.d !== d) { e.gg = { d: d, b: {}, cl: 0 }; GT.forEach(function (t) { e.gg.b[t.k] = t.daily ? 0 : t.v(s); }); save(); } return e.gg; }
  function goal(t) { return typeof t.g === 'function' ? t.g() : t.g; }
  function prog() { var g = gg(), s = S(); return GT.map(function (t) { var v = Math.max(0, t.v(s) - (g.b[t.k] || 0)); return { t: t, v: v, g: goal(t), ok: v >= goal(t) }; }); }
  function ggHtml() {
    var P = prog(), done = P.filter(function (x) { return x.ok; }).length, g = gg();
    return '<div class="gg-list">' + P.map(function (x) { return '<div class="gg-r' + (x.ok ? ' ok' : '') + '"><i>' + x.t.e + '</i><span><small>' + x.t.n + '</small><u><em style="width:' + Math.min(100, x.v / x.g * 100).toFixed(0) + '%"></em></u></span><b>' + (x.ok ? '◆' : nf(x.v) + '/' + nf(x.g)) + '</b></div>'; }).join('') + '</div>' +
      '<button type="button" class="gg-chest' + (done >= 5 && !g.cl ? ' can' : '') + '" data-gg-cl="1"' + (done >= 5 && !g.cl ? '' : ' disabled') + '><i>' + (g.cl ? '✓' : '🎁') + '</i><b>' + done + '/5</b></button>';
  }
  W.ekDailyHtml = ggHtml;
  function ggClaim() {
    var g = gg(); if (g.cl || prog().filter(function (x) { return x.ok; }).length < 5) return; g.cl = 1;
    var s = S(), r = Math.round(1500 * Math.pow(1.25, s.l.ocak || 1)), rows = []; ['odun', 'et', 'demir'].forEach(function (k) { s.r[k] = (s.r[k] || 0) + r; }); rows.push(['📦', '+' + nf(r * 3)]);
    mats().kagit += 1; rows.push(['📜', '+1']); if (W.ekPotion) rows = rows.concat(W.ekPotion.add(1, 0)); if (W.ekHourglass) rows = rows.concat(W.ekHourglass.add(1, 0));
    save(); rep('Günlük görevler', rows, '5/5');
  }
  document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-gg-cl]'); if (!b || b.disabled) return; ev.stopPropagation(); ggClaim(); }, true);
  function addTugTab() { // Tuğ direği NPC'sine "Günlük" sekmesi
    var N = W.ergenekonNpc && W.ergenekonNpc.NPCS; if (!N) return; var t = N.filter(function (n) { return n.id === 'tug'; })[0]; if (!t || t.tabs.some(function (x) { return x.n === 'Günlük'; })) return;
    t.tabs.unshift({ n: 'Günlük', e: '☀', k: 'html', f: ggHtml });
  }

  /* ================= 214) kahraman uyanışı ================= */
  var AWC = 120, AWV = .05;
  function aw() { var e = ek(); e.aw = e.aw || {}; return e.aw; }
  function hooksAw() {
    wrap('hb', '__ekAw', function (o) { return function (k) { var b = o.apply(this, arguments); try { var A = aw(); (W.HH || []).forEach(function (h, i) { if (A[i] && (h.k === k || h.k2 === k)) b += AWV; }); } catch (e) {} return b; }; });
  }
  function awUI() {
    var kh = document.getElementById('ek-kh'); if (!kh || W.tab !== 'u') return;
    var on = kh.querySelector('.kh-t.on'), det = kh.querySelector('.kh-det'); if (!on || !det) return;
    var i = +on.dataset.kh, s = S(), st = s.hs[i] || 0, n = s.hc[i] || 0, A = aw(), key = i + ':' + st + ':' + n + ':' + !!A[i];
    var ex = det.querySelector('.kh-aw'); if (ex && ex.dataset.k === key) return; if (ex) ex.remove();
    if (st < 5) return;
    var h = A[i] ? '<div class="kh-aw on" data-k="' + key + '"><i>☀</i><b>Uyanmış</b><small>+%' + AWV * 100 + '</small></div>' : '<div class="kh-aw" data-k="' + key + '"><i>☀</i><b>Uyanış</b><small>🃏 ' + n + '/' + AWC + '</small><button type="button" data-kaw="' + i + '"' + (n >= AWC ? '' : ' disabled') + '>☀ Uyandır</button></div>';
    var exb = det.querySelector('.kh-ex'); if (exb) exb.insertAdjacentHTML('beforebegin', h); else det.insertAdjacentHTML('beforeend', h);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-kaw]'); if (!b || b.disabled) return; ev.stopPropagation();
    var i = +b.dataset.kaw, s = S(); if ((s.hs[i] || 0) < 5 || (s.hc[i] || 0) < AWC || aw()[i]) return;
    if (b.dataset.ok !== '1') { b.dataset.ok = '1'; b.textContent = '☀ ?'; return; }
    s.hc[i] -= AWC; aw()[i] = 1; save(); rer(); try { navigator.vibrate && navigator.vibrate([30, 60, 30]); W.snd(880, .2); } catch (e) {}
    rep('☀ ' + W.HH[i].n, [['☀', '+%' + AWV * 100]], 'Uyandı');
  }, true);

  /* ================= 215 · 216 · 217 · 218) klan ================= */
  function boy() { return ek().boy || {}; }
  function cxTick() {
    var b = ek().boy; if (!b) return; var s = S(), e = ek(), snap = b.cs || {};
    var pow = (s.al && s.al.pow) || 0, help = ((s.d && s.d.p && s.d.p.help) || 0) + (e.hp || 0), gx = (e.oc && e.oc.gx) || 0, now = Date.now();
    var dx = 0; if (snap.pow != null) dx += Math.max(0, pow - snap.pow) * 2 + Math.max(0, help - snap.help) * 5 + Math.max(0, gx - snap.gx) * 3;
    var mem = (W.ekBoy && W.ekBoy.members().length) || 8; if (snap.t) dx += mem * 20 * Math.min(2, (now - snap.t) / 864e5);
    b.cx = (b.cx || 0) + dx; b.cs = { pow: pow, help: help, gx: gx, t: now };
  }
  function clanLv() { var x = boy().cx || 0; return Math.min(20, 1 + Math.floor(Math.sqrt(x / 150))); }
  function clanPc() { var l = clanLv(), x = boy().cx || 0, a = 150 * (l - 1) * (l - 1), c = 150 * l * l; return Math.min(1, (x - a) / (c - a)); }
  W.ekClanLv = clanLv; W.ekClanCap = function () { return 10 + clanLv() * 2; };
  function clanUI() {
    var h = document.querySelector('#ek-oc .by-h'); if (!h) return; var l = clanLv(), key = l + ':' + Math.round(clanPc() * 20);
    var el = h.querySelector('.cl-lv'); if (el && el.dataset.k === key) return; if (el) el.remove();
    var n = h.querySelector('.by-n'); if (n) n.insertAdjacentHTML('beforeend', '<span class="cl-lv" data-k="' + key + '"><b>Sv ' + l + '</b><u><em style="width:' + Math.round(clanPc() * 100) + '%"></em></u><small>👥 ' + ((W.ekBoy && W.ekBoy.members().length + 1) || 9) + '/' + W.ekClanCap() + '</small></span>');
  }
  function lastSeen(name) { var h = hsh(name + 'ls'); return h % 9 === 0 ? 7 + h % 12 : h % 5 === 0 ? 2 + h % 4 : 0; } // gün
  function passiveUI() {
    var L = document.querySelector('#ek-ranks .rk-list'); if (!L) return; var lead = W.ekBoy && W.ekBoy.canLead();
    L.querySelectorAll('.rk-r').forEach(function (r) { if (r.__ekP) return; r.__ekP = 1; var nm = (r.querySelector('b') || {}).textContent || ''; if (nm === 'Sen') return; var d = lastSeen(nm); if (d >= 7) { r.classList.add('pasif'); if (lead) r.insertAdjacentHTML('beforeend', '<em class="rk-ls">☾ ' + d + 'g</em>'); } else if (d) r.insertAdjacentHTML('beforeend', '<em class="rk-ls sm">' + d + 'g</em>'); });
  }
  // klan bayrağı: kendi obanın yanındaki tamga levhasını bayrak yap, dokununca klan profili
  function flagUI() {
    var t = document.getElementById('ek-boytg'); if (!t || t.__ekF) return; t.__ekF = 1; t.classList.add('cl-flag'); t.style.pointerEvents = 'auto'; t.style.cursor = 'pointer';
    t.addEventListener('click', function (ev) { ev.stopPropagation(); clanProfile(); });
  }
  function clanProfile() {
    var b = boy(), tg = W.ekBoy ? W.ekBoy.tamga(34) : '', mem = (W.ekBoy && W.ekBoy.members()) || [];
    popup(esc(b.n || 'Boy'), '<div class="cp-h"><span class="cp-tg">' + tg + '</span><span><b>Sv ' + clanLv() + '</b><small>👥 ' + (mem.length + 1) + '/' + W.ekClanCap() + '</small></span></div><div class="cp-m">' + ['Sen'].concat(mem).map(function (n) { return '<span>' + (W.ekBoy ? W.ekBoy.rankIcon(n) : '') + ' ' + esc(n) + '</span>'; }).join('') + '</div><button type="button" class="yk-main" data-cp-go="1">🔥 Kutsal Ocak</button>', 'cp-card');
  }
  document.addEventListener('click', function (ev) { if (!(ev.target.closest && ev.target.closest('[data-cp-go]'))) return; document.querySelectorAll('.ek-ov').forEach(function (o) { o.remove(); }); W.tab = 'c'; rer(); setTimeout(function () { W.ergenekonNpc && W.ergenekonNpc.open('ocak', 0); }, 200); }, true);
  // yeni üye karşılaması: üye listesi büyüyünce sohbete hoş geldin; oyuncu yeni boya katılınca posta hediyesi
  var lastMem = null, lastBoy = null;
  function welcomeTick() {
    var b = ek().boy; if (!b || !W.ekBoy) return; var mem = W.ekBoy.members(), s = S();
    if (lastBoy && b.n !== lastBoy) { try { W.mail('🔥 ' + b.n + '’na hoş geldin', { r: { odun: 2000, et: 2000, demir: 800 }, sp: 5 }, 'Han'); } catch (e) {} chat((mem[0] || 'Han'), 'Hoş geldin Alp, ocağımız seninle büyüsün 🔥'); }
    if (lastMem && lastBoy === b.n) mem.forEach(function (n) { if (lastMem.indexOf(n) < 0) chat(W.ekBoy.rankOf('Sen') === 'han' ? 'Sen' : (mem[0] || 'Han'), '🔥 Hoş geldin ' + n + '! 🎁'); });
    lastMem = mem.slice(); lastBoy = b.n;
    // üye sınırı
    var cap = W.ekClanCap(); if (b.mem && b.mem.length + 1 > cap) b.mem.length = cap - 1;
  }
  function chat(u, t) { var s = S(); s.chat = s.chat || []; s.chat.push({ u: u, lg: 'TR', txt: t, tr: '' }); if (s.chat.length > 40) s.chat.shift(); save(); }
  // Ocak ilimleri dalları klan seviyesiyle açılır (ilk iki dal Sv 1)
  function techGate() {
    var tree = document.querySelector('#ek-ot .ot-tree'); if (!tree) return; var l = clanLv();
    tree.querySelectorAll('[data-ot]').forEach(function (b, i) { var need = i < 2 ? 1 : i * 2; if (l < need && !b.__lk) { b.__lk = 1; b.classList.add('lk'); b.insertAdjacentHTML('beforeend', '<em class="ot-lk">🔒 Sv ' + need + '</em>'); } });
    var sel = tree.querySelector('.ot-n.on'); var don = document.querySelectorAll('#ek-ot [data-otd]'); if (sel && sel.classList.contains('lk')) don.forEach(function (d) { d.disabled = true; });
  }

  /* ================= 169) isim değiştirme ================= */
  function nameNow() { var e = ek(); return e.nm || (W.NET && W.NET.name !== 'Oyuncu' ? W.NET.name : 'Alp Tonga'); }
  function applyName() { var e = ek(); if (e.nm && W.NET) W.NET.name = e.nm; }
  function openName() {
    var e = ek(), free = !e.nmc, at = e.at || 0;
    var o = popup('Ad', '<div class="nm-c"><input maxlength="16" value="' + esc(nameNow()) + '" autocomplete="off"><small>' + (free ? '✓ ilk değişiklik ücretsiz' : '🪪 Ad Tılsımı: ' + at) + '</small><button type="button" class="yk-main" data-nm-ok="1"' + (free || at ? '' : ' disabled') + '>✓ Kaydet</button></div>', 'nm-card');
    o.addEventListener('click', function (ev) {
      if (!ev.target.closest('[data-nm-ok]')) return; var v = o.querySelector('input').value.trim().replace(/\s+/g, ' ');
      var bad = W.ekClean ? W.ekClean(v) !== v : false; if (v.length < 3 || bad) { o.querySelector('input').classList.add('bad'); return; }
      if (!free) { if (!at) return; e.at = at - 1; } e.nm = v; e.nmc = (e.nmc || 0) + 1; applyName(); save(); o.remove(); rer();
    });
  }
  function nameBtn() { var h = document.querySelector('#pop .card h3'); if (!h || h.querySelector('[data-ek-nm]')) return; if (!/☪/.test(h.textContent)) return; h.insertAdjacentHTML('beforeend', ' <button type="button" class="nm-btn" data-ek-nm="1" aria-label="Adı değiştir">✎</button>'); }
  document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-ek-nm]'); if (!b) return; ev.stopPropagation(); openName(); }, true);

  /* ================= 171) sürüm numarası ================= */
  function verRow() { var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g' || tg.querySelector('.ek-ver')) return; tg.insertAdjacentHTML('beforeend', '<p class="ek-ver">Ergenekon · v' + VERSION + '</p>'); }

  /* ================= 182) FPS / bellek (yönetici) ================= */
  var FP = { el: null, n: 0, t: 0, fps: 0 };
  function fpsTick(now) {
    var on = !!(S() && ek().fps) && localStorage.getItem('ek_adm'); if (!on) { if (FP.el) FP.el.hidden = true; return; }
    if (!FP.el) { FP.el = document.createElement('div'); FP.el.id = 'ek-fps'; document.body.appendChild(FP.el); }
    FP.n++; if (now - FP.t >= 1000) { FP.fps = Math.round(FP.n * 1000 / (now - FP.t)); FP.n = 0; FP.t = now; var mem = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB' : '—'; var r = W.city3d && W.city3d.renderer && W.city3d.renderer.info; FP.el.textContent = FP.fps + ' fps · ' + mem + (r ? ' · ' + r.render.calls + ' çizim' : ''); FP.el.className = FP.fps < 25 ? 'lo' : ''; }
    FP.el.hidden = false;
  }
  function adminFps() { var a = document.querySelector('#ek-admin .ad-grid'); if (!a || a.querySelector('[data-fps]')) return; a.insertAdjacentHTML('beforeend', '<button type="button" data-fps="1"><i>📈</i><small>FPS ' + (ek().fps ? '◆' : '◇') + '</small></button>'); }
  document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-fps]'); if (!b) return; ev.stopPropagation(); ek().fps = ek().fps ? 0 : 1; save(); b.querySelector('small').textContent = 'FPS ' + (ek().fps ? '◆' : '◇'); }, true);

  /* Ad Tılsımı: Emek Defteri 6/6 kademesi ve çağ geçişi verir */
  function talisman() { var e = ek(), d = e.ed; if (d && d.cl && d.cl.indexOf(2) >= 0 && e.atw !== d.w) { e.atw = d.w; e.at = (e.at || 0) + 1; save(); } }

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return; fpsTick(now);
    if (now - l1 > 400) { l1 = now; try { eraUI(); awUI(); clanUI(); passiveUI(); flagUI(); techGate(); nameBtn(); verRow(); adminFps(); addTugTab(); applyName(); } catch (e) {} }
    if (now - l2 > 4000) { l2 = now; try { eraTick(); hooksAw(); cxTick(); welcomeTick(); talisman(); gg(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.hb !== 'function') { setTimeout(start, 400); return; } hooksAw(); applyName(); requestAnimationFrame(frame); }
  start();
  W.ergenekonCag = { era: era, clanLv: clanLv, openName: openName, clanProfile: clanProfile, daily: ggHtml };
})();
