/* Ergenekon — Ek Paket 3, 5. adım: ödül ve kayıt. Claude, 18 Kasım 2026.
   126 ganimet kaydı (son 50) · 124 aktif bonuslar listesi · 103 enerji iksiri (+10/+30; satılmaz)
   122 haftalık ödül postası (Emek Defteri, şan, Ocak) · 131 toplu posta (okundu / ödülsüzleri sil) · 128 Nevruz hasar sayıları
   Kalıcı: s.ek.gl (ganimet), s.ek.ei {s,l} (iksir), s.ek.wkm (haftalık posta haftası) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekOdul) return; W.__ekOdul = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function week() { var d = new Date(), j = new Date(d.getFullYear(), 0, 1); return d.getFullYear() * 100 + Math.ceil(((d - j) / 864e5 + j.getDay() + 1) / 7); }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }

  /* ================= 126) ganimet kaydı ================= */
  function gl() { var e = ek(); e.gl = e.gl || []; return e.gl; }
  function logLoot(e, n, src) { var L = gl(), now = Date.now(); n = String(n); for (var i = 0; i < Math.min(6, L.length); i++) if (L[i].e === e && L[i].n === n.slice(0, 40) && now - L[i].t < 3000) return; L.unshift({ t: Date.now(), e: e, n: String(n).slice(0, 40), s: String(src || '').slice(0, 30) }); if (L.length > 50) L.length = 50; }
  var WI = { xp: '✨', et: '🍖', odun: '🪵', demir: '⛓️', kömür: '🪨', komur: '🪨', toz: '✨', çelik: '🔩' };
  function parseFight(txt, m) {
    var src = (W.M && W.M[m] && W.M[m][0]) || 'Av', out = 0;
    String(txt || '').replace(/<[^>]*>/g, '').split('·').forEach(function (p) {
      p = p.trim(); var mm;
      if ((mm = p.match(/^\+(\d[\d.,]*)\s*(et|odun|demir|kömür|toz|çelik)/i))) { logLoot(WI[mm[2].toLowerCase()] || '📦', '+' + mm[1], src); out++; }
      else if ((mm = p.match(/^Düştü:\s*(.+)/))) { logLoot('⚒️', mm[1], src); out++; }
      else if (/🎴|kartı/.test(p)) { logLoot('🃏', p.replace(/🎴/g, '').trim(), src); out++; }
      else if (/🎁|📜|🔷|🔮|🔥 Kor/.test(p)) { logLoot(p.match(/🎁|📜|🔷|🔮|🔥/)[0], p.replace(/[🎁📜🔷🔮🔥]/g, '').trim(), src); out++; }
    });
    return out;
  }
  function hooks() {
    wrap('fight', '__ekOd', function (o) { return function (m) { var s = S(), k0 = s.stat.kills, r = o.apply(this, arguments); try { if (s.stat.kills > k0) { parseFight(s.last, m); save(); } } catch (e) {} return r; }; });
    wrap('ekReport', '__ekOd', function (o) { return function (rep) { try { if (/^(Seri av|Av)$/.test(rep.title || '')) return o.apply(this, arguments); (rep.rows || []).forEach(function (r) { if (/^[+]/.test(String(r[1])) || /\+\d/.test(String(r[1]))) logLoot(r[0], r[1], rep.title); }); } catch (e) {} return o.apply(this, arguments); }; });
    wrap('mcol', '__ekOd', function (o) { return function (i) { try { var m = S().mb[i], x = m && m.rw && m.rw.ek; if (x) { claimEk(x, m.t); m.rw.ek = null; } } catch (e) {} return o.apply(this, arguments); }; });
    wrap('nvDone', '__ekOd', function (o) { return function () { var r = o.apply(this, arguments); try { var d = S().nv.today || 0; if (d && !document.hidden) setTimeout(function () { nevruzFx(d); }, 300); logLoot('🔥', nf(d) + ' hasar', 'Nevruz'); } catch (e) {} return r; }; });
  }
  function openLoot() {
    var L = gl(), now = Date.now();
    var ago = function (t) { var m = Math.round((now - t) / 60e3); return m < 60 ? m + 'dk' : m < 1440 ? Math.round(m / 60) + 'sa' : Math.round(m / 1440) + 'g'; };
    popup('Ganimet', '<div class="gl-list">' + (L.map(function (x) { return '<div class="gl-r"><i>' + x.e + '</i><b>' + esc(x.n) + '</b><small>' + esc(x.s) + '</small><em>' + ago(x.t) + '</em></div>'; }).join('') || '<p class="gl-none">—</p>') + '</div>', 'gl-card');
  }

  /* ================= 103) enerji iksiri ================= */
  function ei() { var e = ek(); e.ei = e.ei || { s: 0, l: 0 }; return e.ei; }
  function addEi(sm, lg) { var p = ei(); p.s += sm || 0; p.l += lg || 0; save(); var r = []; if (sm) r.push(['🧪', '+' + sm]); if (lg) r.push(['⚗️', '+' + lg]); return r; }
  W.ekPotion = { add: addEi, get: ei, open: function () { openEi(); } };
  function openEi() {
    var p = ei(), s = S(), v = Math.floor((s.en && s.en.v) || 0), mx = W.EN_MAX || 200;
    var o0 = document.getElementById('ek-ei'); if (o0) o0.remove();
    var o = popup('Enerji', '<div class="ei-now"><i>⚡</i><b>' + v + '</b><small>/' + mx + '</small></div><div class="ei-row"><button type="button" data-ei="s"' + (p.s && v < mx ? '' : ' disabled') + '><i>🧪</i><b>+10</b><small>×' + p.s + '</small></button><button type="button" data-ei="l"' + (p.l && v < mx ? '' : ' disabled') + '><i>⚗️</i><b>+30</b><small>×' + p.l + '</small></button></div>', 'ei-card'); o.id = 'ek-ei';
    o.addEventListener('click', function (ev) { var b = ev.target.closest('[data-ei]'); if (!b || b.disabled) return; var k = b.dataset.ei, pp = ei(); if (!pp[k]) return; pp[k]--; s.en.v = Math.min(mx, (s.en.v || 0) + (k === 's' ? 10 : 30)); save(); rer(); try { W.snd(700, .08); } catch (e) {} openEi(); });
  }
  document.addEventListener('click', function (ev) { var c = ev.target.closest && ev.target.closest('.ek-ti span'); if (!c || !/⚡/.test(c.textContent)) return; ev.stopPropagation(); openEi(); }, true);

  /* ================= 124) aktif bonuslar ================= */
  function pct(v) { return (v >= 0 ? '+' : '') + '%' + (Math.round(v * 1000) / 10); }
  function openBonus() {
    var s = S(), e = ek(), rows = [], k = 0; try { k = W.ergenekonIlerleme.kut().lv; } catch (x) {}
    if (e.prem) rows.push(['✨', 'Kut Bereketi', '🐎 +%35']);
    var ti = W.TI && W.TI[s.ti]; if (ti) rows.push(['🎖️', ti.n, ti.t]);
    if (k) rows.push(['☾', 'Kut Sv ' + k, '🐎 +%' + k + ' · ⚡ +' + k + ' · 🔨 +%' + Math.min(15, k * .5)]);
    var sp = W.ergenekonDenge ? W.ergenekonDenge.setPct() : 0; if (sp) rows.push(['🐺', 'Eşya seti', '⚔️🛡️❤️ ' + pct(sp)]);
    var wf = W.ergenekonDenge && W.ergenekonDenge.weaponFit(); if (wf && wf.on) rows.push(['🏹', 'Silah uyumu', '⚔️ +%3']);
    var hs = W.ergenekonDenge && W.ergenekonDenge.horse(); if (hs) rows.push([hs.e, hs.n, '🐾 −%' + Math.round(hs.b * 100) + ' sefer süresi']);
    if (W.ergenekonDongu && W.ergenekonDongu.burning()) rows.push(['🪨', 'Kömür ateşi', '🌾 +%5 üretim']);
    if (e.us && e.us.t1 > Date.now()) rows.push(['☀', 'Uğurlu Saat', '🐎 +%50']);
    if (e.pets && e.pets.tulpar && e.pets.tulpar.b > Date.now()) rows.push(['🐎', 'Tulpar', '⚔️🛡️ +%10']);
    if (e.ay) Object.keys(e.ay).forEach(function (a) { if (e.ay[a]) rows.push(['🏔️', 'Ata Yurdu · ' + a, 'Sv ' + e.ay[a]]); });
    if (W.ekOcakTech) W.ekOcakTech().forEach(function (t) { rows.push(['🔥', t[0], t[1]]); });
    var tot = []; try { tot = [['🐎', 'Toplama', W.wosBonus('Gathering Speed')], ['🌾', 'Üretim', W.pm() - 1], ['⚔️', 'Saldırı', W.cb('a') - 1], ['🛡️', 'Savunma', W.cb('f') - 1], ['❤️', 'Can', W.cb('h') - 1]]; } catch (x) {}
    popup('Bonuslar', '<div class="bo-tot">' + tot.map(function (t) { return '<span><i>' + t[0] + '</i><b>' + pct(t[2]) + '</b><small>' + t[1] + '</small></span>'; }).join('') + '</div><div class="bo-list">' + (rows.map(function (r) { return '<div class="bo-r"><i>' + r[0] + '</i><b>' + esc(r[1]) + '</b><small>' + esc(r[2]) + '</small></div>'; }).join('') || '<p class="gl-none">—</p>') + '</div>', 'bo-card');
  }
  W.ekOpenBonus = openBonus;
  function guButtons() {
    var g = document.querySelector('.gc-card'); if (g && !g.querySelector('[data-ek-bo]')) g.insertAdjacentHTML('beforeend', '<div class="gc-more"><button type="button" data-ek-bo="1">📋 Bonuslar</button><button type="button" data-ek-gl="1">🧾 Ganimet</button></div>');
    var v = document.querySelector('.ek-vt .vt-acts'); if (v && !v.querySelector('[data-ek-gl]')) v.insertAdjacentHTML('beforeend', '<button type="button" data-ek-bo="1" aria-label="Bonuslar">📋</button><button type="button" data-ek-gl="1" aria-label="Ganimet">🧾</button>');
  }
  document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-ek-bo],[data-ek-gl]'); if (!b) return; ev.stopPropagation(); ev.preventDefault(); if (b.dataset.ekBo) openBonus(); else openLoot(); }, true);

  /* ================= 122) haftalık ödül postası ================= */
  var EDsnap = null;
  function edSnap() { try { var p = W.ergenekonIlerleme.ed(), d = ek().ed; if (d) EDsnap = { w: d.w, done: p.filter(function (x) { return x.done; }).length, cl: (d.cl || []).slice() }; } catch (e) {} }
  function weekly() {
    var e = ek(), w = week(); if (!e.wkm) { e.wkm = w; return; } if (e.wkm === w) return;
    var rw = { ud: 0, sp: 0, ek: { mat: {}, ks: {}, ei: {} } }, lines = [];
    var T = [[2, 'kagit', 3], [4, 'safir', 1], [6, 'opal', 1]];
    if (EDsnap && EDsnap.w === e.wkm) T.forEach(function (t, i) { if (EDsnap.done >= t[0] && EDsnap.cl.indexOf(i) < 0) { rw.ek.mat[t[1]] = (rw.ek.mat[t[1]] || 0) + t[2]; rw.ek.ks.h1 = (rw.ek.ks.h1 || 0) + 1; lines.push('📒'); } });
    var ap = (S().ar && S().ar.pts) || 1000; rw.ud += ap >= 1400 ? 60 : ap >= 1200 ? 40 : 20; rw.sp += 10; lines.push('🏟️');
    var ws = e.boy && e.boy.ws; if (ws && (ws.don || ws.help || ws.ak)) { rw.ud += 20 + Math.min(40, Math.round((ws.help || 0) + (ws.ak || 0) / 10)); rw.ek.ei.s = 2; lines.push('🔥'); }
    try { W.mail('📦 Haftanın emeği ' + lines.join(''), rw, 'Bilge Meclisi'); } catch (x) {}
    e.wkm = w; save();
  }
  function claimEk(x, title) {
    var m = (ek().dm = ek().dm || {}); m.mat = m.mat || { kagit: 0, safir: 0, opal: 0 };
    for (var k in (x.mat || {})) { m.mat[k] = (m.mat[k] || 0) + x.mat[k]; logLoot({ kagit: '📜', safir: '🔷', opal: '🔮' }[k] || '💎', '+' + x.mat[k], title); }
    if (x.ks && W.ekHourglass) W.ekHourglass.add(x.ks.m5 || 0, x.ks.h1 || 0);
    if (x.ei) addEi(x.ei.s || 0, x.ei.l || 0);
  }

  /* ================= 131) toplu posta ================= */
  function hasReward(m) { var rw = m.rw; if (!rw) return false; if (rw.ek) return true; var t = ''; try { t = W.rwTxt(rw); } catch (e) { t = rw.r || rw.sp || rw.ud ? 'x' : ''; } return !!String(t).trim(); }
  function mailBar() {
    var tp = document.getElementById('tp'); if (!tp || W.tab !== 'p') return;
    var bar = document.getElementById('ek-mbar'), s = S(), un = s.mb.filter(function (m) { return !m.rd; }).length, del = s.mb.filter(function (m) { return m.rd && !hasReward(m); }).length;
    if (!bar || !bar.isConnected) { bar = document.createElement('div'); bar.id = 'ek-mbar'; document.body.appendChild(bar);
      bar.addEventListener('click', function (ev) { var b = ev.target.closest('[data-mb]'); if (!b || b.disabled) return; var s2 = S(); if (b.dataset.mb === 'rd') s2.mb.forEach(function (m) { m.rd = 1; }); else s2.mb = s2.mb.filter(function (m) { return !m.rd || hasReward(m); }); save(); rer(); bar.__ekh = ''; }); }
    var h = '<button type="button" data-mb="rd"' + (un ? '' : ' disabled') + '>✓ ' + un + '</button><button type="button" data-mb="del"' + (del ? '' : ' disabled') + '>🗑 ' + del + '</button>';
    if (bar.__ekh !== h) { bar.__ekh = h; bar.innerHTML = h; }
    bar.hidden = !!document.querySelector('.ek-ov');
  }
  function mailBarHide() { var b = document.getElementById('ek-mbar'); if (b && W.tab !== 'p') b.hidden = true; }

  /* ================= 128) Nevruz hasar sayıları ================= */
  function nevruzFx(total) {
    var o = document.createElement('div'); o.id = 'ek-nvfx'; o.innerHTML = '<div class="nv-bird">🔥🦅</div><div class="nv-total"><small>Simurg</small><b>0</b></div>'; document.body.appendChild(o);
    var hits = 9 + Math.floor(Math.random() * 5), parts = [], sum = 0;
    for (var i = 0; i < hits; i++) { var v = Math.random() + (i % 4 === 3 ? 1.6 : 0); parts.push(v); sum += v; }
    var acc = 0, tb = o.querySelector('.nv-total b');
    parts.forEach(function (v, i) {
      setTimeout(function () {
        var d = Math.round(total * v / sum); acc += d; if (i === hits - 1) acc = total; tb.textContent = nf(acc);
        var n = document.createElement('span'), big = v > 1.3; n.className = 'nv-n' + (big ? ' big' : ''); n.textContent = nf(d);
        n.style.left = (35 + Math.random() * 30) + '%'; n.style.top = (32 + Math.random() * 18) + '%'; o.appendChild(n);
        try { navigator.vibrate && big && navigator.vibrate(18); W.snd(big ? 880 : 520, .05); } catch (e) {}
        setTimeout(function () { n.remove(); }, 1200);
      }, 250 + i * 260);
    });
    setTimeout(function () { o.classList.add('out'); setTimeout(function () { o.remove(); }, 600); }, 600 + hits * 260 + 1400);
    o.addEventListener('click', function () { o.remove(); });
  }
  W.ekNevruzFx = nevruzFx;

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 400) { l1 = now; try { guButtons(); mailBar(); mailBarHide(); } catch (e) {} }
    if (now - l2 > 4000) { l2 = now; try { hooks(); edSnap(); weekly(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.fight !== 'function' || typeof W.mcol !== 'function') { setTimeout(start, 400); return; } hooks(); edSnap(); requestAnimationFrame(frame); }
  start();
})();
