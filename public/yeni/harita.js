/* Ergenekon yeni — dünya haritası ve av. Canavar ve kaynak indeksleri eski oyunla aynıdır (dunya.js). */
(function (W) {
  'use strict';
  var nf = E.nf, ft = E.ft, ico = G.ico, esc = UI.esc, U = 16, MAP = 100 * U;
  function S() { return E.S(); }
  function fog(x, y) { return Math.hypot(x - 50, y - 50) > S().fx * .52; }
  var on = false, el = null, layer = null, panel = null, vx = 0, vy = 0, sel = null;

  function zorluk(m) { var s = S(), st = E.cs(), mo = E.mon(m), mD = .3 * mo.atk, tk = mo.hp / Math.max(1, st.atk - mD), td = s.ch.hp / Math.max(1, mo.atk - .7 * st.def); return td > tk * 2 ? ['Kolay', '#3fae4f'] : td > tk ? ['Denk', '#e0a12a'] : ['Zor', '#e0473e']; }
  function mk() {
    var s = S(), h = '<div class="hz-zemin"></div>';
    h += '<div class="hz-sis" style="--r:' + (s.fx * .52 * U) + 'px"></div>';
    W.M.forEach(function (d, m) { h += '<button class="hm can" data-m="' + m + '" style="left:' + (d[3] * U) + 'px;top:' + (d[4] * U) + 'px"></button>'; });
    s.nodes.forEach(function (n, i) { var p = W.pos(i); h += '<button class="hm kay" data-n="' + i + '" style="left:' + (p[0] * U) + 'px;top:' + (p[1] * U) + 'px"></button>'; });
    h += '<button class="hm oba" data-oba="1" style="left:' + (50 * U) + 'px;top:' + (50 * U) + 'px"><img src="' + G.oba(s.l.ocak) + '" alt=""><span class="hl">' + esc(s.ek.nm || 'Alp Tonga') + '</span></button>';
    return h;
  }
  function guncelle() {
    var s = S(), o = s.l.ocak;
    layer.querySelectorAll('.hm.can').forEach(function (b) {
      var m = +b.dataset.m, d = W.M[m], f = fog(d[3], d[4]), cd = s.mk[m] > 0, mo = E.mon(m), key = (f ? 'f' : cd ? 'c' : mo.lock ? 'l' : 'a') + mo.L + (mo.az ? 'z' : '');
      if (b.__k === key) return; b.__k = key; b.hidden = f || cd; if (f || cd) return;
      var img = G.canavar(mo.base); b.className = 'hm can' + (mo.lock ? ' soluk' : '') + (mo.az ? ' azman' : '') + (mo.boss ? ' boss' : '');
      b.innerHTML = (img ? '<img src="' + img + '" alt="">' : '<span class="em">' + d[1] + '</span>') + '<span class="lv">' + mo.L + '</span>';
    });
    layer.querySelectorAll('.hm.kay').forEach(function (b) {
      var i = +b.dataset.n, n = s.nodes[i], p = W.pos(i), f = fog(p[0], p[1]), hid = f || n.rg > 0 || n.res <= 0, lk = n.lv > E.maxLv(), busy = s.sq.some(function (q) { return q.n === i && q.st > 0; }), key = (hid ? 'h' : '') + (lk ? 'l' : '') + (busy ? 'b' : '') + n.t + n.lv + Math.round(n.res / n.max * 10);
      if (b.__k === key) return; b.__k = key; b.hidden = hid; if (hid) return;
      var img = G.maden(n.t); b.className = 'hm kay' + (lk ? ' soluk' : '') + (busy ? ' mesgul' : '');
      b.innerHTML = (img ? '<img src="' + img + '" alt="">' : '<span class="em">' + ico(n.t, 30) + '</span>') + '<span class="lv k">' + n.lv + '</span><i class="rz" style="width:' + Math.round(n.res / n.max * 100) + '%"></i>';
    });
    seritCiz(); if (sel) panelCiz();
  }
  function konum() { layer.style.transform = 'translate(' + Math.round(vx) + 'px,' + Math.round(vy) + 'px)'; var c = $('.hz-koor'); if (c) { var cx = (-vx + innerWidth / 2) / U, cy = (-vy + innerHeight / 2) / U; c.textContent = 'X ' + Math.round(cx) + ' · Y ' + Math.round(cy) + ' · ' + Math.round(Math.hypot(cx - 50, cy - 50) * 2) + ' km'; } }
  function $(q) { return el.querySelector(q); }
  function ortala(x, y) { vx = innerWidth / 2 - x * U; vy = innerHeight * .44 - y * U; var mn = Math.min(0, innerWidth - MAP), mnY = Math.min(0, innerHeight - MAP); vx = Math.max(mn - 60, Math.min(60, vx)); vy = Math.max(mnY - 160, Math.min(120, vy)); konum(); }
  UI.haritaGit = function (x, y) { if (!on) ac(); ortala(x, y); };

  /* ---------- kafile şeridi ---------- */
  var STN = ['Boşta', 'Yolda', 'Topluyor', 'Dönüyor', 'Keşifte'];
  function seritCiz() {
    var s = S(), h = s.sq.map(function (q, j) { var n = s.nodes[q.n]; var t = q.st === 2 ? Math.ceil(Math.max(0, (q.capacity - q.cargo)) / Math.max(1e-6, E.gatherRate(n) / 3600)) : q.left; return '<button class="ks' + (q.st ? '' : ' bos') + '" data-sq="' + j + '">' + ico(q.st && n ? n.t : 'dunya', 20) + '<span>' + (q.st ? ft(t) : STN[0]) + '</span>' + (q.st === 2 ? '<i style="width:' + Math.round(q.cargo / q.capacity * 100) + '%"></i>' : '') + '</button>'; }).join('');
    var b = $('.hz-serit'); if (b.__h !== h) { b.__h = h; b.innerHTML = h; }
  }

  /* ---------- seçim paneli ---------- */
  function panelCiz() {
    var s = S(), h = '';
    if (sel.m !== undefined) {
      var m = sel.m, mo = E.mon(m), z = zorluk(m), st = E.cs(), img = G.canavar(mo.base), hpOk = s.ch.hp >= st.hp * .3;
      h = '<div class="hp-ust">' + (img ? '<img src="' + img + '" alt="">' : '<span class="em">' + mo.e + '</span>') + '<div><b>' + esc(mo.n) + (mo.az ? ' · Azman' : '') + '</b><div class="cipler"><span class="cip">Sv ' + mo.L + '</span><span class="cip" style="color:' + z[1] + '">◆ ' + z[0] + '</span><span class="cip">' + ico('enerji', 16) + mo.en + '</span></div><div class="ci2">❤ ' + nf(mo.hp) + ' · ⚔ ' + nf(mo.atk) + '</div></div><button class="hp-x" data-hx="1">✕</button></div>';
      h += '<div class="hp-ganimet">' + ['xp', 'odun', 'esya', 'kagit', 'kart'].map(function (k) { return '<span>' + (k === 'esya' ? '<img src="' + G.esya('w') + '" width="22" height="22">' : ico(k, 22)) + '</span>'; }).join('') + '</div>';
      var dis = mo.lock ? 'Ocak Sv ' + mo.L + ' gerekli' : mo.cd > 0 ? 'Yeniden doğuyor' : !hpOk ? 'Alp dinleniyor' : s.en.v < mo.en ? 'Enerji yetmez' : '';
      h += '<div class="hp-d"><span class="pil en">' + ico('enerji', 18) + '<b>' + Math.floor(s.en.v) + '</b></span><span class="hpb">' + UI.bar(s.ch.hp / st.hp) + '<small>Alp canı</small></span><button class="dug mavi" data-seri="1"' + (dis ? ' disabled' : '') + '>×5</button><button class="dug" data-sal="1"' + (dis ? ' disabled' : '') + '>' + (dis || 'Saldır') + '</button></div>';
    } else if (sel.n !== undefined) {
      var i = sel.n, n = s.nodes[i], rate = E.gatherRate(n), cap = E.marchCap(), idle = E.idleSq(), lk = n.lv > E.maxLv(), yol = E.mt(i), top = Math.min(cap, n.res) / Math.max(1e-6, rate / 3600), img = G.maden(n.t);
      h = '<div class="hp-ust">' + (img ? '<img src="' + img + '" alt="">' : '<span class="em">' + ico(n.t, 50) + '</span>') + '<div><b>' + E.RN[n.t] + ' · Sv ' + n.lv + '</b><div class="cipler"><span class="cip">' + ico(n.t, 16) + nf(n.res) + '/' + nf(n.max) + '</span><span class="cip">' + nf(rate) + '/sa</span></div><div class="ci2">Yol ' + ft(yol) + ' · Yük ' + nf(cap) + ' · Toplama ' + ft(top) + '</div></div><button class="hp-x" data-hx="1">✕</button></div>';
      h += '<div class="hp-d"><span class="pil">' + ico('dunya', 18) + '<b>' + idle + '/' + s.sq.length + '</b></span><span style="flex:1"></span><button class="dug" data-gon="1"' + (lk || !idle ? ' disabled' : '') + '>' + (lk ? 'Ocak Sv ' + (2 * n.lv - 2) + ' gerekli' : !idle ? 'Boş kafile yok' : 'Gönder') + '</button></div>';
    } else if (sel.sq !== undefined) {
      var q = s.sq[sel.sq], nn = s.nodes[q.n]; if (!q || !q.st) { sel = null; panel.hidden = true; return; }
      h = '<div class="hp-ust"><span class="em">' + ico(nn ? nn.t : 'dunya', 44) + '</span><div><b>Kafile ' + (sel.sq + 1) + ' · ' + STN[q.st] + '</b><div class="ci2">' + (nn ? E.RN[nn.t] + ' Sv ' + nn.lv : '') + ' · Yük ' + nf(q.cargo || 0) + '/' + nf(q.capacity || 0) + '</div></div><button class="hp-x" data-hx="1">✕</button></div><div class="hp-d"><span style="flex:1"></span><button class="dug mavi" data-bak="1">Konuma git</button><button class="dug" data-geri="1"' + (q.st === 1 || q.st === 2 ? '' : ' disabled') + '>Geri çağır</button></div>';
    }
    if (panel.__h !== h) { panel.__h = h; panel.innerHTML = h; } panel.hidden = false;
  }

  /* ---------- savaş sonucu ---------- */
  var LN = { xp: 'XP', odun: 'Odun', et: 'Et', demir: 'Demir', guvec: 'Güveç', toz: 'Toz', kagit: 'Kağıt', safir: 'Safir', opal: 'Opal', kart: 'Kart', kitap: 'Kitap', parca: 'Parça' };
  function sonuc(list) {
    var R = list[list.length - 1], win = list.filter(function (r) { return r.win; }).length, loot = {};
    list.forEach(function (r) { (r.loot || []).forEach(function (l) { var k = l[0]; if (k === 'esya') { loot.esya = (loot.esya || []).concat([l[1]]); return; } loot[k] = (loot[k] || 0) + (typeof l[1] === 'number' && ['kart', 'kitap', 'parca'].indexOf(k) < 0 ? l[1] : 1); }); });
    var d = document.createElement('div'); d.className = 'zafer' + (win ? '' : ' yen');
    d.innerHTML = '<div class="zb">' + (win ? 'ZAFER' : 'GERİ ÇEKİLDİN') + '</div><div class="zs">' + (list.length > 1 ? win + '/' + list.length + ' av' : esc(R.name) + ' · Sv ' + R.L) + '</div><div class="zl">' +
      Object.keys(loot).filter(function (k) { return k !== 'esya'; }).map(function (k) { return '<span class="cip">' + ico(k === 'guvec' ? 'guvec' : k, 22) + '+' + nf(loot[k]) + '</span>'; }).join('') +
      (loot.esya || []).map(function (x) { return '<span class="cip" style="border-color:' + E.RCOL[x.r] + ';color:' + E.RCOL[x.r] + '"><img src="' + G.esya(x.s) + '" width="22" height="22">' + esc(x.n) + '</span>'; }).join('') + '</div><small>Dokun, kapat</small>';
    document.getElementById('oyun').appendChild(d); UI.buzz(win ? [15, 30, 15] : 40);
    d.onclick = function () { d.remove(); }; setTimeout(function () { if (d.isConnected) d.remove(); }, 4000);
  }
  function seri(m0) {
    var s = S(), d0 = W.M[m0], cand = W.M.map(function (d, m) { return { m: m, d: Math.hypot(d[3] - d0[3], d[4] - d0[4]) }; }).filter(function (o) { var mo = E.mon(o.m), d = W.M[o.m]; return !mo.lock && mo.cd <= 0 && !fog(d[3], d[4]) && o.m !== 11; }).sort(function (a, b) { return a.d - b.d; }).slice(0, 5), out = [];
    for (var i = 0; i < cand.length; i++) { var r = E.fight(cand[i].m); if (!r || r.err) break; out.push(r); if (!r.win) break; }
    return out;
  }

  /* ---------- arama ---------- */
  function ara() {
    var s = S(), tur = ara.t || 'can', lv = ara.lv || Math.min(s.l.ocak, 10);
    var d = document.createElement('div'); d.className = 'ara';
    function ciz() {
      var mx = tur === 'can' ? s.l.ocak : E.maxLv(); lv = Math.max(1, Math.min(mx, lv));
      d.innerHTML = '<div class="ara-k"><div class="bas" style="color:#f3c14b">Ara</div><div class="ara-t">' + [['can', 'kurt', 'Canavar'], ['odun', 'odun', 'Odun'], ['et', 'et', 'Et'], ['demir', 'demir', 'Demir'], ['komur', 'komur', 'Kömür']].map(function (x) { return '<button data-tt="' + x[0] + '" class="' + (tur === x[0] ? 'on' : '') + '">' + ico(x[1], 30) + '<span>' + x[2] + '</span></button>'; }).join('') + '</div>' +
        '<div class="ara-s"><button data-lv="-1">−</button><b>Sv ' + lv + '</b><button data-lv="1">+</button></div><input type="range" min="1" max="' + mx + '" value="' + lv + '" data-rg="1"><div class="alts" style="background:none;border:0;padding:6px 0 0"><button class="dug mavi" data-ak="1">Vazgeç</button><button class="dug" data-ag="1">Ara</button></div></div>';
    }
    ciz(); document.getElementById('oyun').appendChild(d);
    d.addEventListener('input', function (ev) { if (ev.target.dataset.rg) { lv = +ev.target.value; ara.lv = lv; d.querySelector('.ara-s b').textContent = 'Sv ' + lv; } });
    d.onclick = function (ev) {
      var t = ev.target.closest('button'); if (!t) { if (ev.target === d) d.remove(); return; }
      if (t.dataset.tt) { tur = ara.t = t.dataset.tt; ciz(); } else if (t.dataset.lv) { lv += +t.dataset.lv; ara.lv = lv; ciz(); } else if (t.dataset.ak) d.remove();
      else if (t.dataset.ag) {
        var best = null, bd = 1e9;
        if (tur === 'can') W.M.forEach(function (x, m) { var mo = E.mon(m); if (mo.L !== lv || mo.cd > 0 || fog(x[3], x[4])) return; var dd = Math.hypot(x[3] - 50, x[4] - 50); if (dd < bd) { bd = dd; best = { m: m, x: x[3], y: x[4] }; } });
        else s.nodes.forEach(function (n, i) { if (n.t !== tur || n.lv !== lv || n.rg > 0 || n.res <= 0) return; var p = W.pos(i); if (fog(p[0], p[1])) return; var dd = Math.hypot(p[0] - 50, p[1] - 50); if (dd < bd) { bd = dd; best = { n: i, x: p[0], y: p[1] }; } });
        if (!best) { UI.toast('Yakında bulunamadı'); return; }
        d.remove(); ortala(best.x, best.y); sel = best.m !== undefined ? { m: best.m } : { n: best.n }; panelCiz();
      }
    };
  }

  /* ---------- aç / kapat ---------- */
  function ac() {
    var root = document.getElementById('oyun'); on = true; root.classList.add('harita-acik');
    if (!el) {
      el = document.createElement('div'); el.id = 'harita';
      el.innerHTML = '<div class="hz-katman"></div><div class="hz-koor"></div><div class="hz-sol"><button class="yb" data-ara="1">' + ico('dunya', 28) + '<span class="ad">Ara</span></button><button class="yb" data-ev="1">' + ico('sehir', 28) + '<span class="ad">Obam</span></button></div><div class="hz-serit"></div><div class="hz-panel" hidden></div>';
      root.insertBefore(el, root.querySelector('#ust'));
      layer = $('.hz-katman'); panel = $('.hz-panel'); layer.innerHTML = mk(); surukle();
      el.addEventListener('click', tik);
    }
    el.hidden = false; guncelle(); ortala(50, 50);
    var d = document.querySelector('.dunya'); d.innerHTML = ico('sehir', 42) + '<span>Şehir</span>'; d.dataset.ac = 'sehir';
  }
  function kapat() { on = false; if (el) el.hidden = true; document.getElementById('oyun').classList.remove('harita-acik'); var d = document.querySelector('.dunya'); d.innerHTML = ico('dunya', 42) + '<span>Dünya</span>'; d.dataset.ac = 'dunya'; sel = null; if (panel) panel.hidden = true; UI.refresh(); }
  UI.ac.dunya = ac; UI.ac.sehir = kapat; UI.ac.harita = ac;
  var moved = 0;
  function surukle() {
    var sx, sy, ox, oy, down = false;
    el.addEventListener('pointerdown', function (e) { if (e.target.closest('.hz-panel,.hz-sol,.hz-serit')) return; down = true; moved = 0; sx = e.clientX; sy = e.clientY; ox = vx; oy = vy; });
    addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx, dy = e.clientY - sy; moved = Math.max(moved, Math.abs(dx) + Math.abs(dy)); vx = ox + dx; vy = oy + dy; var mn = Math.min(0, innerWidth - MAP), mnY = Math.min(0, innerHeight - MAP); vx = Math.max(mn - 60, Math.min(60, vx)); vy = Math.max(mnY - 160, Math.min(120, vy)); konum(); });
    addEventListener('pointerup', function () { down = false; });
  }
  function tik(ev) {
    var t = ev.target.closest('button'); if (!t || t.disabled) return; if (moved > 8 && t.closest('.hz-katman')) return; var d = t.dataset;
    if (d.m) { sel = { m: +d.m }; panelCiz(); }
    else if (d.n) { sel = { n: +d.n }; panelCiz(); }
    else if (d.sq) { var q = S().sq[+d.sq]; if (!q.st) { UI.toast('Bir kaynağa dokun, gönder'); return; } var p = W.pos(q.n); ortala(p[0], p[1]); sel = { sq: +d.sq }; panelCiz(); }
    else if (d.hx) { sel = null; panel.hidden = true; }
    else if (d.sal) { var r = E.fight(sel.m); if (r && !r.err) { sonuc([r]); sel = null; panel.hidden = true; } guncelle(); }
    else if (d.seri) { var L = seri(sel.m); if (L.length) { sonuc(L); sel = null; panel.hidden = true; } guncelle(); }
    else if (d.gon) { if (E.send(sel.n)) { UI.toast('Kafile yola çıktı'); sel = null; panel.hidden = true; } guncelle(); }
    else if (d.geri) { E.recall(sel.sq); guncelle(); }
    else if (d.bak) { var qq = S().sq[sel.sq], pp = W.pos(qq.n); ortala(pp[0], pp[1]); }
    else if (d.ara) ara();
    else if (d.ev) ortala(50, 50);
    else if (d.oba) UI.toast('Obanın yeri: X 50 · Y 50');
    ev.stopPropagation();
  }
  var otick = UI.onTick; UI.onTick = function () { if (otick) otick(); };
  setInterval(function () { if (on && !document.getElementById('pen')) guncelle(); }, 1000);
})(window);
