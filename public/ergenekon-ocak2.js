/* Ergenekon — Ek Paket 3, 6. adım: Kutsal Ocak ve paylaşım. Claude, 18 Kasım 2026.
   116 Ocak teknolojileri (bağışla ortak ilim, tüm üyelere küçük bonus) · 138 Ocak hediyesi seviyesi
   148 destan canavarı boy hasar tablosu · 135 ralliye katıl · 136 konum paylaş · 141 oyuncu kartı paylaş (PNG + davet kodu)
   Sunucu yok: üyeler yerel yapay zekâ. Kalıcı: s.ek.ot (ocak ilimleri), s.ek.oc.gx (hediye xp), s.ek.rl (ralli) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekOcak2) return; W.__ekOcak2 = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hsh(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000003; return h; }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function members() { return (W.ekBoy && W.ekBoy.members()) || (W.MEM || []).map(function (m) { return m[0]; }); }

  /* ================= 116) Ocak teknolojileri ================= */
  var OT = [
    { k: 'top', e: '🐎', n: 'Ortak Yol', t: 'Toplama', v: .01, u: '%' },
    { k: 'ure', e: '🌾', n: 'Bereket Ateşi', t: 'Üretim', v: .01, u: '%' },
    { k: 'yap', e: '🔨', n: 'Usta Eli', t: 'Yapım hızı', v: .005, u: '%' },
    { k: 'sal', e: '⚔️', n: 'Börü Dişi', t: 'Saldırı', v: .01, u: '%' },
    { k: 'sav', e: '🛡️', n: 'Kalkan Duvarı', t: 'Savunma', v: .01, u: '%' },
    { k: 'aki', e: '🏹', n: 'Akın Yolu', t: 'Akıncı gücü', v: .02, u: '%' }
  ];
  var MAXL = 10;
  function ot() { var e = ek(); e.ot = e.ot || { f: 'top', t: Date.now() }; OT.forEach(function (x) { e.ot[x.k] = e.ot[x.k] || { lv: 0, xp: 0 }; }); return e.ot; }
  function need(lv) { return Math.round(4000 * Math.pow(1.7, lv) * Math.pow(1.15, S().l.ocak || 1)); }
  function lv(k) { return (ot()[k] || {}).lv || 0; }
  function val(k) { var x = OT.find(function (o) { return o.k === k; }); return x ? x.v * lv(k) : 0; }
  function addXp(k, n) { var o = ot(), t = o[k]; if (!t || t.lv >= MAXL) return; t.xp += n; while (t.lv < MAXL && t.xp >= need(t.lv)) { t.xp -= need(t.lv); t.lv++; try { W.add('🔥 Ocak ilmi ' + OT.find(function (x) { return x.k === k; }).n + ' Sv ' + t.lv); } catch (e) {} } }
  function aiTick() { var o = ot(), now = Date.now(), dt = Math.min(48 * 3600, (now - o.t) / 1000); o.t = now; var rate = members().length * 18 * Math.pow(1.15, S().l.ocak || 1); addXp(o.f, rate * dt / 3600); }
  W.ekOcakTech = function () { return OT.filter(function (x) { return lv(x.k); }).map(function (x) { return [x.n + ' Sv ' + lv(x.k), x.e + ' +%' + Math.round(val(x.k) * 1000) / 10]; }); };
  function hooks() {
    var o = W.wosBonus; if (typeof o === 'function' && !o.__ekOt) { var f = function (l) { var v = o.apply(this, arguments); if (l === 'Gathering Speed') v += val('top'); return v; }; for (var q in o) f[q] = o[q]; f.__ekOt = true; W.wosBonus = f; }
    wrap('pm', '__ekOt', function (o) { return function () { return o.apply(this, arguments) + val('ure'); }; });
    wrap('cb', '__ekOt', function (o) { return function (k) { var b = o.apply(this, arguments); return b + (k === 'a' ? val('sal') : k === 'f' ? val('sav') : 0); }; });
    wrap('dur', '__ekOt', function (o) { return function () { var v = o.apply(this, arguments); return typeof v === 'number' ? Math.max(1, Math.round(v * (1 - val('yap')))) : v; }; });
  }
  W.ekAkinciBonus = function () { return 1 + val('aki'); };
  var OS = { sel: 'top' };
  function openTech() {
    var o0 = document.getElementById('ek-ot'); if (o0) o0.remove();
    var o = ot(), sel = OT.find(function (x) { return x.k === OS.sel; }) || OT[0], st = o[sel.k], lead = W.ekBoy ? W.ekBoy.canLead() : true;
    var tree = '<div class="ot-tree">' + OT.map(function (x) { var t = o[x.k], pc = t.lv >= MAXL ? 1 : t.xp / need(t.lv); return '<button type="button" class="ot-n' + (x.k === sel.k ? ' on' : '') + (o.f === x.k ? ' fo' : '') + (t.lv >= MAXL ? ' mx' : '') + '" data-ot="' + x.k + '" style="--p:' + Math.round(pc * 100) + '"><span class="ot-m"><i>' + x.e + '</i></span><b>' + x.n + '</b><small>' + t.lv + '/' + MAXL + '</small></button>'; }).join('') + '</div>';
    var nx = st.lv < MAXL, cost = need(st.lv), s = S(), don = Math.round(cost * .1);
    var det = '<div class="ot-det"><div class="ot-h"><i>' + sel.e + '</i><span><b>' + sel.n + '</b><small>' + sel.t + '</small></span></div>' +
      '<div class="ek-prev"><span><small>' + sel.t + '</small><b>+%' + Math.round(sel.v * st.lv * 1000) / 10 + '</b><i>→</i><b class="nx">' + (nx ? '+%' + Math.round(sel.v * (st.lv + 1) * 1000) / 10 : '—') + '</b></span></div>' +
      (nx ? '<div class="ot-bar"><u><em style="width:' + Math.min(100, st.xp / cost * 100).toFixed(0) + '%"></em></u><small>' + nf(st.xp) + '/' + nf(cost) + '</small></div><div class="ot-don">' + ['odun', 'et', 'demir'].map(function (r) { return '<button type="button" data-otd="' + r + '"' + ((s.r[r] || 0) >= don ? '' : ' disabled') + '>' + { odun: '🪵', et: '🍖', demir: '⛓️' }[r] + ' ' + nf(don) + '</button>'; }).join('') + '</div>' : '<p class="yk-max">✓</p>') +
      (lead ? '<button type="button" class="ot-focus' + (o.f === sel.k ? ' on' : '') + '" data-otf="1">' + (o.f === sel.k ? '🔥 Boyun odağı' : '🔥 Boyun odağı yap') + '</button>' : '<p class="ot-note">🔥 ' + esc((OT.find(function (x) { return x.k === o.f; }) || {}).n || '') + '</p>') + '</div>';
    var w = popup('Ocak İlimleri', tree + det, 'ot-card'); w.id = 'ek-ot';
    w.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-ot],[data-otd],[data-otf]'); if (!b || b.disabled) return;
      if (b.dataset.ot) OS.sel = b.dataset.ot;
      else if (b.dataset.otd) { var r = b.dataset.otd; if ((S().r[r] || 0) >= don) { S().r[r] -= don; addXp(sel.k, don); var ws = ek().boy && ek().boy.ws; if (ws) ws.don = (ws.don || 0) + don; } }
      else if (b.dataset.otf) ot().f = sel.k;
      save(); openTech();
    });
  }

  /* ================= 138) Ocak hediyesi seviyesi · 148) hasar tablosu · 135) ralli ================= */
  function giftLv() { var oc = ek().oc || {}, x = oc.gx || 0, l = Math.floor(Math.sqrt(x / 6)); return { lv: l + 1, pc: (x - 6 * l * l) / (6 * (l + 1) * (l + 1) - 6 * l * l), x: x }; }
  function hookGift() { // her açılan hediye gx'i artırır; seviye hediye içeriğini %10 büyütür
    if (!W.ergenekonOcak || W.ergenekonOcak.__g) return; var o = W.ergenekonOcak.claimGifts; if (!o) return;
    W.ergenekonOcak.claimGifts = function () { var oc = ek().oc || {}, n = oc.g || 0, s = S(), r0 = { odun: s.r.odun, et: s.r.et, demir: s.r.demir }; o.apply(this, arguments); var m = 1 + (giftLv().lv - 1) * .1; for (var k in r0) { var d = (s.r[k] || 0) - r0[k]; if (d > 0) s.r[k] += Math.round(d * (m - 1)); } oc.gx = (oc.gx || 0) + n; save(); };
    W.ergenekonOcak.__g = 1;
  }
  document.addEventListener('click', function (ev) { if (ev.target.closest && ev.target.closest('[data-oc-gift]') && W.ergenekonOcak && W.ergenekonOcak.__g) { ev.stopPropagation(); W.ergenekonOcak.claimGifts(); } }, true);
  function dmgTable() {
    var d = W.ekDestan ? W.ekDestan() : null; if (!d) return;
    var x = W.ekDestanName ? W.ekDestanName() : { n: 'Destan canavarı', e: '👹' }, wk = d.w || 0, dealt = Math.max(0, d.max - d.hp - d.dmg);
    var L = members(), shares = L.map(function (n) { return (hsh(n + wk) % 100) + 20; }), tot = shares.reduce(function (a, b) { return a + b; }, 0) || 1;
    var rows = [{ n: 'Sen', d: d.dmg, me: 1 }].concat(L.map(function (n, i) { return { n: n, d: Math.round(dealt * shares[i] / tot) }; })).sort(function (a, b) { return b.d - a.d; });
    var top = rows[0] ? rows[0].d || 1 : 1;
    popup(x.e + ' ' + esc(x.n), '<div class="dt-hp"><u><em style="width:' + Math.round(d.hp / d.max * 100) + '%"></em></u><small>❤️ ' + nf(d.hp) + '</small></div><div class="dt-list">' + rows.map(function (r, i) { return '<div class="dt-r' + (r.me ? ' me' : '') + '"><i>' + (i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1) + '</i><span class="dt-av">' + (W.ekBoy ? W.ekBoy.rankIcon(r.n) : '') + '</span><b>' + esc(r.n) + '</b><span class="dt-bar"><em style="width:' + Math.round(r.d / top * 100) + '%"></em></span><small>' + nf(r.d) + '</small></div>'; }).join('') + '</div>', 'dt-card');
  }
  function rl() { var e = ek(); e.rl = e.rl || { t: 0, by: '', until: 0, joined: 0 }; return e.rl; }
  function rallyTick() {
    var r = rl(), now = Date.now(), d = W.ekDestan ? W.ekDestan() : null; if (!d || d.hp <= 0) return;
    if (r.until > now) return;
    if (now - r.t > 3 * 3600e3 && Math.random() < .25) { var L = members().filter(function (n) { var k = W.ekBoy ? W.ekBoy.rankOf(n) : 'bey'; return k === 'han' || k === 'bey'; }); if (!L.length) return; r.t = now; r.by = L[Math.floor(Math.random() * L.length)]; r.until = now + 10 * 60e3; r.joined = 0; save(); }
  }
  var RB = null;
  function rallyBtn() {
    var r = rl(), now = Date.now(), show = r.until > now && !r.joined && !document.querySelector('.ek-ov,#aw,#ek-boot') && (W.tab === 'c' || (W.tab === 'm' && !((typeof W.selM === 'number' && W.selM >= 0) || (typeof W.sel === 'number' && W.sel >= 0))));
    if (!RB) { RB = document.createElement('button'); RB.type = 'button'; RB.id = 'ek-rally'; RB.addEventListener('click', joinRally); document.body.appendChild(RB); }
    RB.hidden = !show; if (!show) return;
    var x = W.ekDestanName ? W.ekDestanName() : { e: '👹' }, h = '<i>' + x.e + '</i><span><b>⚔ Katıl</b><small>' + esc(r.by) + ' · ' + ft((r.until - now) / 1000) + '</small></span>';
    if (RB.__ekh !== h) { RB.__ekh = h; RB.innerHTML = h; }
  }
  function joinRally() { var r = rl(), s = S(); if (!s.en || s.en.v < 30) { if (W.ekPotion) W.ekPotion.open(); return; } r.joined = 1; save(); if (W.ekBestFormation) W.ekBestFormation(); if (W.ekHitDestan) W.ekHitDestan(true); }

  /* ================= 136) konum paylaş ================= */
  function locShare() {
    var o = document.getElementById('ek-coordov'); if (!o || o.querySelector('[data-loc-share]')) return;
    var row = o.querySelector('.ek-acts.ek-fgo'); if (!row) return;
    row.insertAdjacentHTML('beforeend', '<button type="button" class="ek-btn" data-loc-share="1">📍 Sohbete</button>');
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-loc-share],[data-loc]'); if (!b) return; ev.stopPropagation();
    if (b.dataset.locShare) {
      var o = document.getElementById('ek-coordov'), x = +(o.querySelector('[data-co-x]') || {}).value, y = +(o.querySelector('[data-co-y]') || {}).value; if (!isFinite(x) || !isFinite(y)) return;
      var s = S(); s.chat = s.chat || []; s.chat.push({ u: 'Sen', lg: 'TR', txt: '📍X ' + x + ' · Y ' + y, tr: '' }); if (s.chat.length > 40) s.chat.shift(); save(); o.remove();
      try { W.add('📍 Konum boy sohbetine gönderildi.'); } catch (e) {} return;
    }
    var p = b.dataset.loc.split(','); W.tab = 'm'; rer(); setTimeout(function () { if (W.ekGoLogical) W.ekGoLogical(+p[0], +p[1]); }, 600);
  }, true);
  function chatLinks() {
    var box = document.getElementById('msgs'); if (!box || W.tab !== 'a') return;
    box.querySelectorAll('.ch-m span').forEach(function (sp) { if (sp.__ekLoc) return; sp.__ekLoc = 1; var m = sp.textContent.match(/📍X (\d+) · Y (\d+)/); if (!m) return; sp.innerHTML = sp.innerHTML.replace(/📍X (\d+) · Y (\d+)/, '<button type="button" class="ch-loc" data-loc="' + m[1] + ',' + m[2] + '">📍 X ' + m[1] + ' · Y ' + m[2] + '</button>'); });
  }

  /* ================= 141) oyuncu kartı paylaş (PNG + davet kodu) ================= */
  function code() { var e = ek(); if (!e.inv) { var c = '', a = 'ABCDEFGHJKLMNPRSTUVYZ23456789'; for (var i = 0; i < 6; i++) c += a[Math.floor(Math.random() * a.length)]; e.inv = 'ERG-' + c; save(); } return e.inv; }
  function loadImg(src) { return new Promise(function (res) { if (!src) return res(null); var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = src; }); }
  function heroSrc(i) { try { var m = String(W.hPic(i, 80)).match(/src="([^"]+)"/); return m ? m[1] : ''; } catch (e) { return ''; } }
  function shareCard() {
    var s = S(), c = document.createElement('canvas'), Wd = 720, Hd = 1000; c.width = Wd; c.height = Hd; var g = c.getContext('2d');
    var top = (s.hs || []).map(function (v, i) { return [v, i]; }).filter(function (x) { return x[0] > 0; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 3);
    var av = document.querySelector('#pfb img'), pw = 0, kut = 0; try { pw = W.power(); kut = W.ergenekonIlerleme.kut().lv; } catch (e) {}
    Promise.all([loadImg(av && av.src)].concat(top.map(function (h) { return loadImg(heroSrc(h[1])); }))).then(function (imgs) {
      var grd = g.createRadialGradient(Wd / 2, 360, 40, Wd / 2, 420, 700); grd.addColorStop(0, '#3a2a18'); grd.addColorStop(1, '#0d0906'); g.fillStyle = grd; g.fillRect(0, 0, Wd, Hd);
      g.strokeStyle = '#c9921a'; g.lineWidth = 6; g.strokeRect(18, 18, Wd - 36, Hd - 36); g.lineWidth = 2; g.strokeRect(32, 32, Wd - 64, Hd - 64);
      g.fillStyle = '#f2c14e'; g.beginPath(); g.arc(Wd - 96, 96, 34, 0, Math.PI * 2); g.fill(); g.fillStyle = '#1a120b'; g.beginPath(); g.arc(Wd - 82, 90, 30, 0, Math.PI * 2); g.fill();
      g.textAlign = 'center'; g.fillStyle = '#ffe08a'; g.font = '800 46px Cinzel, serif'; g.fillText('ERGENEKON', Wd / 2, 110);
      if (imgs[0]) { g.save(); g.beginPath(); g.arc(Wd / 2, 290, 120, 0, Math.PI * 2); g.clip(); g.drawImage(imgs[0], Wd / 2 - 120, 170, 240, 240); g.restore(); }
      g.strokeStyle = '#f2c14e'; g.lineWidth = 6; g.beginPath(); g.arc(Wd / 2, 290, 124, 0, Math.PI * 2); g.stroke();
      var ti = W.TI && W.TI[s.ti]; g.fillStyle = '#f3e3c0'; g.font = '700 34px Cinzel, serif'; g.fillText((ti ? ti.n : 'Alp') + ' · Ocak ' + (s.l.ocak || 1), Wd / 2, 470);
      g.font = '800 40px "Alegreya Sans", sans-serif'; g.fillStyle = '#ffe08a'; g.fillText('💪 ' + nf(pw) + '    ☾ Kut ' + kut, Wd / 2, 540);
      top.forEach(function (h, i) { var x = Wd / 2 - 210 + i * 150, y = 600; g.fillStyle = '#1a130d'; g.fillRect(x, y, 120, 120); if (imgs[i + 1]) g.drawImage(imgs[i + 1], x, y, 120, 120); g.strokeStyle = '#5a4630'; g.lineWidth = 3; g.strokeRect(x, y, 120, 120); g.fillStyle = '#ffe08a'; g.font = '700 22px sans-serif'; g.fillText('★'.repeat(h[0]), x + 60, y + 150); });
      var bi = 0, eq = (s.ch && s.ch.eq) || {}; for (var k in eq) if (eq[k]) bi = Math.max(bi, eq[k].p || 0);
      g.fillStyle = '#f3e3c0'; g.font = '600 30px "Alegreya Sans", sans-serif'; g.fillText('⚒️ +' + bi + '   🐺 ' + nf((s.stat && s.stat.kills) || 0) + ' av', Wd / 2, 830);
      g.fillStyle = '#5fe3d6'; g.font = '800 36px monospace'; g.fillText(code(), Wd / 2, 910); g.fillStyle = '#c9b48a'; g.font = '20px sans-serif'; g.fillText('davet kodu', Wd / 2, 940);
      c.toBlob(function (b) {
        var f = new File([b], 'ergenekon-' + code() + '.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: 'Ergenekon', text: 'Ergenekon’da bana katıl: ' + code() }).catch(function () {});
        else { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = f.name; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); }
      }, 'image/png');
    });
  }
  W.ekShareCard = shareCard; W.ekOpenTech = function () { openTech(); }; W.ekDmgTable = function () { dmgTable(); };
  function vitrinBtn() { var v = document.querySelector('.ek-vt .vt-acts'); if (v && !v.querySelector('[data-ek-share]')) v.insertAdjacentHTML('beforeend', '<button type="button" data-ek-share="1" aria-label="Paylaş">📤</button>'); }
  document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-ek-share]'); if (!b) return; ev.stopPropagation(); ev.preventDefault(); shareCard(); }, true);

  /* ================= boy başlığına düğmeler ================= */
  function ocakButtons() {
    var box = document.getElementById('ek-oc'); if (!box || W.tab !== 'a') return;
    var row = box.querySelector('.oc2'); var gl = giftLv(), key = gl.lv + ':' + Math.round(gl.pc * 20);
    if (row && row.dataset.k === key) return; if (row) row.remove();
    var h = '<div class="oc2" data-k="' + key + '"><button type="button" data-oc2="ot"><i>🔥</i><small>Ocak ilimleri</small></button><button type="button" data-oc2="dt"><i>👹</i><small>Hasar tablosu</small></button><span class="gl-lv"><i>🎁</i><b>Sv ' + gl.lv + '</b><u><em style="width:' + Math.round(gl.pc * 100) + '%"></em></u></span></div>';
    var top = box.querySelector('.oc-top'); if (top) top.insertAdjacentHTML('afterend', h);
  }
  document.addEventListener('click', function (ev) { var b = ev.target.closest && ev.target.closest('[data-oc2]'); if (!b) return; ev.stopPropagation(); if (b.dataset.oc2 === 'ot') openTech(); else dmgTable(); }, true);

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 400) { l1 = now; try { ocakButtons(); rallyBtn(); locShare(); chatLinks(); vitrinBtn(); } catch (e) {} }
    if (now - l2 > 5000) { l2 = now; try { hooks(); hookGift(); aiTick(); rallyTick(); } catch (e) {} }
  }
  function start() { if (!S() || !W.MEM || typeof W.cb !== 'function') { setTimeout(start, 400); return; } hooks(); hookGift(); requestAnimationFrame(frame); }
  start();
})();
