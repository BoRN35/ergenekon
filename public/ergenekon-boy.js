/* Ergenekon — Ek Paket 2, 6. adım: Kutsal Ocak (boy) düzeni. Claude, 18 Kasım 2026.
   78 rütbeler (Han, Bey, Alp, Er) · 79 24 Oğuz boyu tamgası · 80 sabit mesaj · 81 ocak bulma · 82 liderlik devri
   84 sohbet güvenliği (filtre, engelle, şikayet) · 85 sohbette çeviri · 95 haftalık katkı tablosu
   Sunucu yok: üyeler yerel yapay zekâdır; gerçek oyuncular sunucu kurulunca gelir. Kalıcı: s.ek.boy */
(function () {
  'use strict';
  var W = window;
  if (W.__ekBoy) return; W.__ekBoy = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hsh(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000003; return h; }
  function week() { var d = new Date(), j = new Date(d.getFullYear(), 0, 1); return d.getFullYear() * 100 + Math.ceil(((d - j) / 864e5 + j.getDay() + 1) / 7); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }

  /* ---------- 79) 24 Oğuz boyu ve tamgaları ----------
     Boy adları Reşîdüddin ve Kâşgarlı Mahmud’daki 24 boy listesinden. Tamga çizimleri sade, stilize işaretlerdir;
     her boyun tarihî tamgasının birebir kopyası değildir. */
  var BOYS = ['Kayı', 'Bayat', 'Alkaevli', 'Karaevli', 'Yazır', 'Döğer', 'Dodurga', 'Yaparlı', 'Avşar', 'Kızık', 'Beğdili', 'Karkın', 'Bayındır', 'Peçenek', 'Çavuldur', 'Çepni', 'Salur', 'Eymür', 'Alayuntlu', 'Yüreğir', 'İğdir', 'Büğdüz', 'Yıva', 'Kınık'];
  var PARTS = {
    v: 'M12 6v24', y: 'M6 6l6 10 6-10', a: 'M6 30l6-12 6 12', o: 'M12 18m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0', h: 'M5 18h14', c: 'M18 8a9 9 0 1 0 0 20',
    t: 'M6 6h12', b: 'M6 30h12', x: 'M7 9l10 18M17 9L7 27', k: 'M12 18l7-9M12 18l7 9', l: 'M6 6v24', r: 'M18 6v24', w: 'M5 8l3.5 10L12 8l3.5 10L19 8', s: 'M17 7q-10 4 0 11t-10 11', d: 'M12 26m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0'
  };
  var COMBO = ['yv', 'ov', 'yh', 'ah', 'vtb', 'xo', 'ck', 'wv', 'yd', 'lrh', 'kv', 'oh', 'ya', 'sv', 'vt', 'cy', 'xh', 'av', 'oy', 'wb', 'ka', 'lr', 'sd', 'cv'];
  function tamga(i, sz) { var c = COMBO[i % 24], p = ''; for (var j = 0; j < c.length; j++) p += '<path d="' + PARTS[c[j]] + '"/>'; return '<svg class="tamga" viewBox="0 0 24 36" width="' + (sz || 18) + '" height="' + Math.round((sz || 18) * 1.5) + '" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }

  /* ---------- durum ---------- */
  var RK = { han: { n: 'Han', e: '👑', p: 3 }, bey: { n: 'Bey', e: '🛡️', p: 2 }, alp: { n: 'Alp', e: '⚔️', p: 1 }, er: { n: 'Er', e: '🌾', p: 0 } };
  function boy() {
    var e = ek();
    if (!e.boy) e.boy = { n: 'Kök Böri', tg: -1, rank: 'han', ranks: {}, pin: null, blk: {}, mute: {}, ws: { w: 0 }, seen: Date.now(), mem: null };
    var b = e.boy; b.ranks = b.ranks || {}; b.blk = b.blk || {}; b.mute = b.mute || {};
    return b;
  }
  function memNames() { var b = boy(); return b.mem || (W.MEM || []).map(function (m) { return m[0]; }); }
  function rankOf(name) {
    var b = boy(); if (name === 'Sen') return b.rank;
    if (b.ranks[name]) return b.ranks[name];
    var L = memNames(), i = L.indexOf(name), h = hsh(name);
    if (b.rank !== 'han' && i === 0) return 'han';
    return i <= 2 ? 'bey' : h % 3 === 0 ? 'alp' : 'er';
  }
  function syncMem() {
    var b = boy(); if (!b.mem || !W.MEM) return; var LG = ['TR', 'AZ', 'KK', 'TR', 'EN', 'TR', 'RU', 'AR'];
    var old = {}; W.MEM.forEach(function (m) { old[m[0]] = m[1]; });
    var nw = b.mem.map(function (n) { return [n, old[n] || LG[hsh(n) % LG.length]]; });
    W.MEM.length = 0; nw.forEach(function (m) { W.MEM.push(m); });
  }
  function canLead() { var r = boy().rank; return r === 'han' || r === 'bey'; }
  W.ekBoy = { members: memNames, mute: function (u, ms) { boy().mute[u] = Date.now() + ms; save(); }, warn: function (u) { sys('☾ ' + u + ' uyarıldı: boy sohbetinde saygı.'); save(); }, rankOf: rankOf, rankIcon: function (n) { return RK[rankOf(n)].e; }, canLead: canLead, tamga: function (sz) { var b = boy(); return b.tg >= 0 ? tamga(b.tg, sz) : ''; }, name: function () { return boy().n; } };

  /* ---------- 82) liderlik devri: Han 7 gün girmezse en etkin Bey'e ---------- */
  function leadership() {
    var b = boy(), now = Date.now(), away = now - (b.seen || now); b.seen = now;
    if (b.rank === 'han' && away >= 7 * 864e5) {
      var beys = memNames().filter(function (n) { return rankOf(n) === 'bey'; }), nh = beys[0] || memNames()[0];
      if (nh) { b.ranks[nh] = 'han'; b.rank = 'bey'; sys('👑 ' + nh + ' boyun yeni Hanı oldu (Han 7 gündür yoktu).'); save(); }
    }
  }
  function sys(t) { var s = S(); s.chat = s.chat || []; s.chat.push({ u: '☾', lg: 'TR', txt: esc(t), tr: '', sys: 1 }); if (s.chat.length > 40) s.chat.shift(); }

  /* ---------- 81) ocak bulma ---------- */
  var LGF = { TR: '🇹🇷', AZ: '🇦🇿', KK: '🇰🇿', EN: '🇬🇧', AR: '🇸🇦', RU: '🇷🇺', KO: '🇰🇷' };
  function suggest() {
    var o = S().l.ocak || 1, seed = week(), out = [];
    for (var i = 0; i < 5; i++) {
      var h = hsh(seed + ':' + i), ti = h % 24, lg = ['TR', 'AZ', 'KK', 'TR', 'EN'][i];
      out.push({ i: i, n: BOYS[ti] + ' Ocağı', tg: ti, lg: lg, act: 55 + h % 45, pow: Math.round(o * o * 9000 * (0.7 + (h % 60) / 100)), mem: 12 + h % 18 });
    }
    return out.sort(function (a, b) { return b.act - a.act; });
  }
  function openFind() {
    var L = suggest(), b = boy();
    var body = '<div class="bf-list">' + L.map(function (x) { return '<div class="bf-r"><span class="bf-t">' + tamga(x.tg, 20) + '</span><span><b>' + esc(x.n) + '</b><small>' + LGF[x.lg] + ' · 👥' + x.mem + ' · ⚡%' + x.act + ' · 💪' + nf(x.pow) + '</small></span><button type="button" data-bf="' + x.i + '"' + (b.n === x.n ? ' disabled' : '') + '>' + (b.n === x.n ? '✓' : 'Katıl') + '</button></div>'; }).join('') + '</div>';
    var o = popup('Ocak bul', body, 'bf-card');
    o.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-bf]'); if (!t || t.disabled) return; var x = L.find(function (y) { return y.i === +t.dataset.bf; }); if (!x) return;
      if (t.dataset.ok !== '1') { t.dataset.ok = '1'; t.textContent = '✓ ?'; return; }
      var bb = boy(); bb.n = x.n; bb.tg = x.tg; bb.rank = 'er'; bb.ranks = {}; bb.pin = null;
      var pool = ['Aybars', 'Tolga', 'Aigerim', 'Nurlan', 'Elvin', 'Gökay', 'Sevda', 'Arman', 'Leyla', 'Yusuf', 'Dmitri', 'Min', 'Aruzhan', 'Kaan'], h = hsh(x.n);
      bb.mem = pool.filter(function (n, k) { return (h + k * 7) % 3 !== 0; }).slice(0, 8);
      syncMem(); sys('🔥 ' + x.n + '’na katıldın.'); save(); o.remove(); rer();
    });
  }

  /* ---------- 79) tamga seçimi ---------- */
  function openTamga() {
    var b = boy();
    var body = '<div class="tg-grid">' + BOYS.map(function (n, i) { return '<button type="button" class="' + (b.tg === i ? 'on' : '') + '" data-tg="' + i + '">' + tamga(i, 22) + '<small>' + n + '</small></button>'; }).join('') + '</div><p class="tg-note">Stilize tamga çizimleri</p>';
    var o = popup('Boy tamgası', body, 'tg-card');
    o.addEventListener('click', function (ev) { var t = ev.target.closest('[data-tg]'); if (!t) return; if (!canLead() && b.tg >= 0) return; b.tg = +t.dataset.tg; if (b.n === 'Kök Böri' || /Ocağı$/.test(b.n) && b.rank === 'han') b.n = b.n; save(); o.remove(); rer(); });
  }

  /* ---------- 78) rütbe yönetimi ---------- */
  function openRanks() {
    var b = boy(), L = memNames(), lead = canLead();
    var row = function (n, me) { var r = rankOf(n); return '<div class="rk-r"><span>' + RK[r].e + '</span><b>' + esc(me ? 'Sen' : n) + '</b><small>' + RK[r].n + '</small>' + (lead && !me && r !== 'han' ? '<span class="rk-a"><button type="button" data-rk-up="' + esc(n) + '">▲</button><button type="button" data-rk-dn="' + esc(n) + '">▼</button><button type="button" data-rk-kick="' + esc(n) + '">✕</button></span>' : '') + '</div>'; };
    var body = '<div class="rk-list">' + row('Sen', true) + L.map(function (n) { return row(n); }).join('') + '</div>' + (lead ? '<button type="button" class="yk-main" data-rk-add="1">➕ Üye al</button>' : '<p class="rk-note">👑🛡️</p>');
    var o0 = document.getElementById('ek-ranks'); if (o0) o0.remove();
    var o = popup('Rütbeler', body, 'rk-card2'); o.id = 'ek-ranks';
    o.addEventListener('click', function (ev) {
      var t = ev.target, x; if (!canLead()) return;
      var order = ['er', 'alp', 'bey'];
      if ((x = t.closest('[data-rk-up]'))) { var n = x.dataset.rkUp, r = rankOf(n), i = order.indexOf(r); if (i >= 0 && i < 2 && !(b.rank === 'bey' && i >= 1)) b.ranks[n] = order[i + 1]; }
      else if ((x = t.closest('[data-rk-dn]'))) { var n2 = x.dataset.rkDn, r2 = rankOf(n2), i2 = order.indexOf(r2); if (i2 > 0 && !(b.rank === 'bey' && r2 === 'bey')) b.ranks[n2] = order[i2 - 1]; }
      else if ((x = t.closest('[data-rk-kick]'))) { var n3 = x.dataset.rkKick; if (b.rank === 'bey' && rankOf(n3) === 'bey') return; b.mem = memNames().filter(function (m) { return m !== n3; }); syncMem(); sys('🚪 ' + n3 + ' boydan ayrıldı.'); }
      else if (t.closest('[data-rk-add]')) { var pool = ['Aybars', 'Gökay', 'Nurlan', 'Elvin', 'Aruzhan', 'Kaan', 'Leyla', 'Arman', 'Sevda', 'Ilyas'], cur = memNames(), nn = pool.find(function (p) { return cur.indexOf(p) < 0; }); if (nn && cur.length < 20) { b.mem = cur.concat([nn]); b.ranks[nn] = 'er'; syncMem(); sys('🤝 ' + nn + ' boya katıldı.'); } }
      else return;
      save(); openRanks();
    });
  }

  /* ---------- 84 · 85 · 80) sohbet: filtre, engelle, şikayet, çeviri, sabit mesaj ---------- */
  var BAD = ['amk', 'aq', 'amına', 'amina', 'ananı', 'anani', 'orospu', 'piç', 'siktir', 'sikerim', 'sikeyim', 'yarrak', 'yarak', 'göt', 'pezevenk', 'yavşak', 'kahpe', 'ibne', 'şerefsiz', 'gerizekalı', 'oç', 'fuck', 'shit', 'bitch'];
  var BADRE = new RegExp('(^|[^a-zçğıöşü])(' + BAD.join('|') + ')(?=$|[^a-zçğıöşü])', 'gi');
  function clean(t) { return String(t).replace(BADRE, function (m, a, w) { return a + w[0] + '***'; }); }
  W.ekClean = clean;
  function myLang() { var l = (localStorage.getItem('ek_lang') || 'tr').toUpperCase(); return l; }
  var OPEN = {};
  function chatRender() {
    var box = document.getElementById('msgs'); if (!box || W.tab !== 'a') return;
    var s = S(), b = boy(), L = (s.chat || []).slice(-25), me = myLang(), tg = b.tg >= 0 ? tamga(b.tg, 12) : '';
    var mute = b.mute, now = Date.now();
    var h = (b.pin ? '<div class="ch-pin"><i>📌</i><span><b>' + esc(b.pin.u) + '</b> ' + clean(b.pin.txt) + '</span>' + (canLead() ? '<button type="button" data-ch-unpin="1">✕</button>' : '') + '</div>' : '') +
      L.map(function (m, i) {
        if (b.blk[m.u] || (mute[m.u] && mute[m.u] > now)) return '';
        var idx = (s.chat.length - L.length) + i, foreign = m.lg && m.lg !== me && m.lg !== '🌍' && m.u !== 'Sen' && !m.sys, rk = m.sys ? '' : RK[rankOf(m.u)].e;
        return '<div class="ch-m' + (m.sys ? ' sys' : '') + (m.u === 'Sen' ? ' me' : '') + '" data-ch="' + idx + '"><b>' + (m.sys ? '' : tg + rk + ' ') + esc(m.u) + '</b> <span>' + clean(m.txt) + '</span>' +
          (foreign && m.tr ? (OPEN[idx] ? '<small class="ch-tr">🌐 ' + clean(m.tr) + '</small>' : '<button type="button" class="ch-tb" data-ch-tr="' + idx + '" aria-label="Çevir">🌐</button>') : '') + '</div>';
      }).join('');
    if (box.__ekh !== h || !box.querySelector('.ch-m,.ch-pin,.ch-none')) { box.__ekh = h; box.innerHTML = h || '<div class="ch-none">—</div>'; box.scrollTop = box.scrollHeight; }
    var trc = document.getElementById('trc'); if (trc && trc.parentNode) trc.parentNode.style.display = 'none';
    var note = box.parentNode && [].slice.call(box.parentNode.querySelectorAll('p')).find(function (p) { return /NPC üyeler/.test(p.textContent); }); if (note) note.style.display = 'none';
  }
  function hookRender() {
    var o = W.render; if (typeof o !== 'function' || o.__ekBoy) return;
    var f = function () { var r = o.apply(this, arguments); try { chatRender(); } catch (e) {} return r; };
    for (var k in o) f[k] = o[k]; f.__ekBoy = true; W.render = f;
  }
  // gönderilen mesajı filtrele (kendi mesajın da)
  document.addEventListener('click', function (ev) { if (!(ev.target.closest && ev.target.closest('#cs'))) return; var ci = document.getElementById('ci'); if (ci) ci.value = clean(ci.value); }, true);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && ev.target && ev.target.id === 'ci') ev.target.value = clean(ev.target.value); }, true);
  // dokun: çeviri; uzun bas: şikayet / engelle / sabitle
  var press = null;
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest && ev.target.closest('[data-ch-tr],[data-ch-unpin]'); if (!t) return; ev.stopPropagation();
    if (t.dataset.chTr) { OPEN[t.dataset.chTr] = 1; } else { boy().pin = null; save(); }
    var bx = document.getElementById('msgs'); if (bx) bx.__ekh = ''; chatRender();
  }, true);
  document.addEventListener('pointerdown', function (ev) {
    var m = ev.target.closest && ev.target.closest('#msgs .ch-m:not(.sys)'); if (!m) return;
    clearTimeout(press); press = setTimeout(function () { msgMenu(+m.dataset.ch); }, 550);
  }, true);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (n) { document.addEventListener(n, function () { clearTimeout(press); }, true); });
  document.addEventListener('contextmenu', function (ev) { var m = ev.target.closest && ev.target.closest('#msgs .ch-m:not(.sys)'); if (!m) return; ev.preventDefault(); msgMenu(+m.dataset.ch); }, true);
  function msgMenu(idx) {
    var s = S(), m = s.chat[idx]; if (!m) return; var mine = m.u === 'Sen', b = boy();
    var body = '<div class="mm-q">' + esc(m.u) + ': ' + clean(m.txt) + '</div><div class="mm-acts">' + (canLead() ? '<button type="button" data-mm="pin">📌 Sabitle</button>' : '') + (mine ? '' : '<button type="button" data-mm="rep">⚑ Şikayet et</button><button type="button" data-mm="blk">⛔ Engelle</button>') + '</div>';
    var o = popup('Mesaj', body, 'mm-card');
    o.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-mm]'); if (!t) return; var a = t.dataset.mm;
      if (a === 'pin') b.pin = { u: m.u, txt: m.txt };
      else if (a === 'blk') b.blk[m.u] = 1;
      else if (a === 'rep') { var R = []; try { R = JSON.parse(localStorage.getItem('ek_reports') || '[]'); } catch (e) {} R.unshift({ t: Date.now(), u: m.u, txt: m.txt, boy: b.n }); while (R.length > 30) R.pop(); try { localStorage.setItem('ek_reports', JSON.stringify(R)); } catch (e) {} }
      save(); o.remove(); var bx = document.getElementById('msgs'); if (bx) bx.__ekh = ''; chatRender();
    });
  }
  // yapay zekâ Bey ara sıra önemli bir mesajı sabitler
  function aiPin() { var b = boy(); if (b.pin || Math.random() > .15) return; var beys = memNames().filter(function (n) { return rankOf(n) === 'bey' || rankOf(n) === 'han'; }); if (!beys.length) return; var pinT = ['Akıncı dalgaları açık, herkes katılsın ⚔️', 'Hafta sonu bağış hedefi: herkes biraz odun 🪵', 'Yardım isteklerine basmayı unutmayın 🤝']; b.pin = { u: beys[0], txt: pinT[Math.floor(Math.random() * pinT.length)] }; save(); }

  /* ---------- 95) haftalık katkı tablosu ---------- */
  function wsTick() {
    var b = boy(), s = S(), w = week(), ws = b.ws;
    var pow = (s.al && s.al.pow) || 0, help = (s.d && s.d.p && s.d.p.help) || 0, hp = ek().hp || 0, ak = ((ek().oc || {}).ak || {}).w || 0;
    if (ws.w !== w) { b.ws = ws = { w: w, don: 0, help: 0, ak: 0, p0: pow, h0: help + hp, akP: ((ek().oc || {}).ak || {}).p }; }
    if (pow > ws.p0) { ws.don += Math.round((pow - ws.p0) * 20); } ws.p0 = pow;
    var hh = help + hp; if (hh > ws.h0) ws.help += hh - ws.h0; ws.h0 = hh;
    var akp = ((ek().oc || {}).ak || {}).p; if (akp != null && ((ek().oc || {}).ak || {}).done) { ws.akDone = ws.akDone || {}; if (!ws.akDone[akp]) { ws.akDone[akp] = 1; ws.ak += ak * 10; } }
  }
  function openKatki() {
    var b = boy(), ws = b.ws || {}, w = week(), el = (Date.now() % (7 * 864e5)) / (7 * 864e5);
    var rows = [{ n: 'Sen', don: ws.don || 0, help: ws.help || 0, ak: ws.ak || 0, me: 1 }].concat(memNames().map(function (n) { var h = hsh(n + w), f = .25 + el * .75; return { n: n, don: Math.round((h % 900 + 100) * (S().l.ocak || 1) * 18 * f), help: Math.round((h % 40 + 5) * f), ak: Math.round((h % 9) * 10 * Math.min(1, f * 1.4)) }; }));
    rows.forEach(function (r) { r.sc = r.don / 1000 + r.help * 5 + r.ak * 3; }); rows.sort(function (a, b) { return b.sc - a.sc; });
    var body = '<div class="kt-h"><span></span><span>🎁</span><span>🤝</span><span>🏹</span></div><div class="kt-list">' + rows.map(function (r, i) { return '<div class="kt-r' + (r.me ? ' me' : '') + '"><span><i>' + (i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1) + '</i> ' + RK[rankOf(r.n)].e + ' ' + esc(r.n) + '</span><b>' + nf(r.don) + '</b><b>' + r.help + '</b><b>' + r.ak + '</b></div>'; }).join('') + '</div><p class="kt-note">↻ ' + Math.ceil((1 - el) * 7) + ' g</p>';
    popup('Haftalık katkı', body, 'kt-card');
  }

  /* ---------- panel: boy başlığı (ocak panelinin üstüne) ---------- */
  function header() {
    var box = document.getElementById('ek-oc'); if (!box || W.tab !== 'a') return;
    var b = boy(), hd = box.querySelector('.by-h'), key = b.n + b.tg + b.rank;
    if (hd && hd.dataset.k === key) return; if (hd) hd.remove();
    var h = '<div class="by-h" data-k="' + esc(key) + '"><button type="button" class="by-tg" data-by="tg">' + (b.tg >= 0 ? tamga(b.tg, 22) : '<i>＋</i>') + '</button><span class="by-n"><b>' + esc(b.n) + '</b><small>' + RK[b.rank].e + ' ' + RK[b.rank].n + '</small></span>' +
      '<button type="button" data-by="rk" aria-label="Rütbeler">👑</button><button type="button" data-by="kt" aria-label="Katkı">📊</button><button type="button" data-by="find" aria-label="Ocak bul">🔎</button></div>';
    box.insertAdjacentHTML('afterbegin', h);
  }
  document.addEventListener('click', function (ev) { var t = ev.target.closest && ev.target.closest('[data-by]'); if (!t) return; ev.stopPropagation(); var a = t.dataset.by; if (a === 'tg') openTamga(); else if (a === 'rk') openRanks(); else if (a === 'kt') openKatki(); else openFind(); }, true);
  /* Akıncı dalgasını Han/Bey başlatır */
  function akGate() {
    var btn = document.querySelector('#ek-oc [data-oc-ak]'); if (!btn) return;
    if (!canLead() && !btn.disabled) { var ak = (ek().oc || {}).ak || {}; var open = Date.now() - Math.floor(Date.now() / (3 * 864e5)) * 3 * 864e5 > 2 * 3600e3; if (!open && !ak.done) { btn.disabled = true; var sm = btn.querySelector('small'); if (sm) sm.textContent = '🛡️ Bey başlatır'; } }
  }
  /* haritada kendi obanın üstünde tamga */
  var TG = { el: null, v: null };
  function mapTamga() {
    var w = W.world3d, mapv = document.getElementById('mapv'), b = boy();
    if (!w || !w.camera || !mapv || W.tab !== 'm' || b.tg < 0 || !w.selfPosition) { if (TG.el) TG.el.hidden = true; return; }
    if (!TG.el || !TG.el.isConnected) { TG.el = document.createElement('div'); TG.el.id = 'ek-boytg'; mapv.appendChild(TG.el); TG.k = ''; }
    if (TG.k !== b.tg) { TG.el.innerHTML = tamga(b.tg, 16); TG.k = b.tg; }
    if (!TG.v) TG.v = new w.camera.position.constructor();
    TG.v.set(w.selfPosition.x, 9, w.selfPosition.z).project(w.camera);
    var cv = w.renderer.domElement.getBoundingClientRect(), mb = mapv.getBoundingClientRect();
    if (TG.v.z > 1) { TG.el.hidden = true; return; }
    TG.el.hidden = false; TG.el.style.transform = 'translate(' + (cv.left - mb.left + (TG.v.x + 1) / 2 * cv.width - 12).toFixed(1) + 'px,' + (cv.top - mb.top + (1 - TG.v.y) / 2 * cv.height - 40).toFixed(1) + 'px)';
  }

  var l1 = 0, l2 = 0, l3 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l3 > 100) { l3 = now; try { mapTamga(); } catch (e) {} }
    if (now - l1 > 400) { l1 = now; try { header(); chatRender(); akGate(); hookRender(); } catch (e) {} }
    if (now - l2 > 5000) { l2 = now; try { wsTick(); boy().seen = Date.now(); if (Math.random() < .02) aiPin(); } catch (e) {} }
  }
  function start() { if (!S() || !W.MEM) { setTimeout(start, 400); return; } boy(); syncMem(); leadership(); hookRender(); wsTick(); requestAnimationFrame(frame); }
  start();
  W.ergenekonBoy = { openFind: openFind, openRanks: openRanks, openKatki: openKatki, openTamga: openTamga, clean: clean, tamga: tamga, BOYS: BOYS };
})();
