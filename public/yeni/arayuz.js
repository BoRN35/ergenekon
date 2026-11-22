/* Ergenekon yeni — arayüz. King of Altay'ın düzen ve akışı örnek alınmıştır; resim, simge ve yazıları kullanılmaz. */
(function (W) {
  'use strict';
  var UI = W.UI = {}, $ = function (q, r) { return (r || document).querySelector(q); }, nf = E.nf, ft = E.ft, ico = G.ico;
  function S() { return E.S(); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  UI.esc = esc;
  var root;

  /* ---------- yer tutucu çizimler (yeni görseller gelene kadar) ---------- */
  var HUE = { ocak: 18, oba: 32, yurt: 40, odunluk: 28, avci: 22, demirci: 210, sifa: 150, kisla: 0, sur: 30, ambar: 36, gozcu: 26, bilgelik: 190, komurluk: 220, harpakademi: 350, kurultay: 8, tug: 45, agil: 100, kuyu: 185 };
  function yerTutucu(k, lv) {
    var h = HUE[k] || 30, big = lv >= 20, ic = { kuyu: 'kuyu', tug: 'tug', agil: 'kurt', kurultay: 'kahraman', bilgelik: 'ilim', komurluk: 'komur', harpakademi: 'kor' }[k];
    return '<svg class="yt" viewBox="0 0 100 100"><defs><linearGradient id="r' + k + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(' + h + ',45%,62%)"/><stop offset="1" stop-color="hsl(' + h + ',40%,34%)"/></linearGradient></defs>' +
      '<path d="M50 62L90 78 50 96 10 78z" fill="#8a6a3e"/><path d="M50 60L88 76 50 93 12 76z" fill="#b89462"/>' +
      '<path d="M24 72V52h52v20L50 84z" fill="hsl(' + h + ',25%,80%)" stroke="#5a3c1c" stroke-width="1.2"/>' +
      '<path d="M20 54C26 30 40 22 50 20 60 22 74 30 80 54L50 66z" fill="url(#r' + k + ')" stroke="#3a2410" stroke-width="1.4"/>' +
      '<path d="M50 20V10" stroke="#3a2410" stroke-width="2"/><path d="M54 6a5 5 0 1 0 0 7a4 4 0 1 1 0-7z" fill="#f2c94c"/>' +
      '<rect x="44" y="68" width="12" height="14" fill="#6b2a16"/>' + (big ? '<path d="M14 60l6-14 6 14M74 60l6-14 6 14" fill="#a3271a"/>' : '') +
      (ic ? '<foreignObject x="35" y="32" width="30" height="30"><div xmlns="http://www.w3.org/1999/xhtml" style="width:30px;height:30px">' + ico(ic, 30) + '</div></foreignObject>' : '') + '</svg>';
  }
  function kilitTabela() {
    return '<svg class="yt" viewBox="0 0 100 100"><path d="M50 70L86 84 50 98 14 84z" fill="#7d6a4a" opacity=".85"/><path d="M50 68L82 81 50 94 18 81z" fill="#a99068"/>' +
      '<rect x="46" y="34" width="8" height="52" fill="#5a3a1a" stroke="#2a170a"/><circle cx="50" cy="36" r="20" fill="#6e6658" stroke="#2f2a22" stroke-width="2"/><circle cx="50" cy="36" r="15" fill="#8d8473" stroke="#c9a25a" stroke-width="1.5"/>' +
      '<path d="M50 26v20M43 31c4 3 10 3 14 0M45 43h10" stroke="#f0e2c0" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M30 52c8 6 32 6 40 0" stroke="#3b3b3b" stroke-width="2.4" stroke-dasharray="4 3" fill="none"/></svg>';
  }
  UI.bImg = function (k, lv) { var u = G.bina(k, lv); return u ? '<img src="' + u + '" alt="" draggable="false">' : yerTutucu(k, lv || 1); };
  UI.pImg = function (k) { var u = G.yer(k); return u ? '<img src="' + u + '" alt="" draggable="false">' : yerTutucu(k, 1); };
  function zeminSVG() {
    var z = G.zemin(); if (z) return '<div class="zemin"><img src="' + z + '" alt=""></div>';
    return '<svg class="zemin" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice"><defs>' +
      '<linearGradient id="gk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ec0d8"/><stop offset="1" stop-color="#d8d2b4"/></linearGradient>' +
      '<radialGradient id="ot" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#8fae55"/><stop offset=".6" stop-color="#6e8f3d"/><stop offset="1" stop-color="#4a6a2b"/></radialGradient>' +
      '<filter id="nz"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.25  0 0 0 0 0.1  0 0 0 .35 0"/></filter></defs>' +
      '<rect width="390" height="844" fill="url(#ot)"/><rect width="390" height="844" filter="url(#nz)"/>' +
      '<path d="M0 0H390V150C340 132 300 150 250 138 200 126 150 148 100 136 60 128 20 140 0 134z" fill="url(#gk)"/>' +
      '<path d="M-10 150L60 70 110 112 170 30 235 104 290 58 400 150z" fill="#3a3a40"/><path d="M170 30L200 64 186 80 210 102M290 58l-8 30 14 22" stroke="#ff8a2a" stroke-width="2.2" fill="none" opacity=".85"/>' +
      '<path d="M-10 150C60 170 120 150 200 165S330 150 400 160V200H-10z" fill="#5d7c37"/>' +
      '<path d="M344 140C352 260 330 380 356 520S350 760 372 844H404V140z" fill="#4f8fb5"/><path d="M350 140C356 250 338 380 362 520S356 760 378 844" stroke="#bfe6f5" stroke-width="3" fill="none" opacity=".6"/>' +
      '<path d="M190 844C186 780 210 730 196 690S170 600 192 540 200 420 196 370" stroke="#b29466" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M190 844C186 780 210 730 196 690S170 600 192 540 200 420 196 370" stroke="#c9ab7b" stroke-width="14" fill="none" stroke-linecap="round"/>' +
      '<path d="M-10 520C60 530 120 512 175 528M215 528C270 512 320 530 340 522" stroke="#8c8a7a" stroke-width="16" fill="none"/><path d="M-10 520C60 530 120 512 175 528M215 528C270 512 320 530 340 522" stroke="#aaa797" stroke-width="9" fill="none"/>' +
      [[20, 220], [372, 230], [16, 440], [26, 700], [366, 470], [12, 610], [380, 640], [140, 150], [250, 152]].map(function (p) { return '<path d="M' + p[0] + ' ' + (p[1] - 34) + 'l-12 34h24z" fill="#2f5a2a"/><path d="M' + p[0] + ' ' + (p[1] - 22) + 'l-14 26h28z" fill="#386b31"/>'; }).join('') + '</svg>';
  }

  /* ---------- şehir yerleşimi (390x844 tasarım alanı; telefon dikey) ---------- */
  var SLOT = [
    ['harpakademi', 104, 200, 60], ['oba', 200, 190, 100], ['gozcu', 296, 200, 60],
    ['bilgelik', 100, 304, 66], ['ocak', 200, 322, 116], ['ambar', 302, 304, 64],
    ['kisla', 96, 414, 74], ['yer:kurultay', 200, 444, 72], ['sifa', 304, 414, 68],
    ['yurt', 124, 502, 66], ['komurluk', 280, 502, 62],
    ['odunluk', 66, 552, 66], ['demirci', 236, 568, 66], ['avci', 142, 606, 64], ['yer:agil', 326, 582, 60],
    ['yer:tug', 64, 656, 56], ['sur', 210, 664, 76], ['yer:kuyu', 330, 662, 56]
  ];
  var YER = { kurultay: { n: 'Kurultay', ac: 'kahramanlar' }, agil: { n: 'Ağıl', ac: 'kurt', u: 4 }, tug: { n: 'Tuğ', ac: 'gorevler' }, kuyu: { n: 'Dilek Kuyusu', ac: 'kuyu' } };
  UI.YER = YER;

  function scale() { var k = Math.min(innerWidth / 390, innerHeight / 844); k = Math.max(.82, Math.min(k, 1.35)); document.documentElement.style.setProperty('--k', k.toFixed(3)); }

  function cityHTML() {
    var h = '<div id="sahne">' + zeminSVG();
    SLOT.forEach(function (sl) {
      var id = sl[0], x = sl[1] / 390 * 100, y = sl[2] / 844 * 100;
      h += '<button class="obj" data-o="' + id + '" style="left:' + x + '%;top:' + y + '%;--s:' + sl[3] + ';z-index:' + sl[2] + '"><div class="gv"></div><span class="lev"></span></button>';
    });
    h += '</div>';
    h += '<div id="ust"><div class="uc">' + ['odun', 'et', 'demir', 'komur'].map(function (r) { return '<span class="kay" data-r="' + r + '">' + ico(r, 24) + '<b>0</b></span>'; }).join('') + '</div>' +
      '<button class="por" data-ac="profil"><img src="' + G.alp() + '" alt=""><span class="sv">1</span></button>' +
      '<div class="uc2"><span class="pil" data-p="guc">' + ico('guc', 20) + '<b>0</b></span><span class="pil en" data-p="en">' + ico('enerji', 20) + '<b>0</b></span><span class="pil cag" data-p="cag"></span></div></div>';
    h += '<div class="yan sol"><button class="yb" data-q="insa">' + ico('cekic', 30) + '<span class="zm"></span><span class="hilal">' + ico('hilal', 18) + '</span></button>' +
      '<button class="yb" data-q="insa2" hidden>' + ico('cekic', 30) + '<span class="zm"></span><span class="hilal">' + ico('hilal', 18) + '</span></button>' +
      '<button class="yb" data-q="ilim">' + ico('ilim', 30) + '<span class="zm"></span><span class="hilal">' + ico('hilal', 18) + '</span></button>' +
      '<button class="yb" data-q="ordu">' + ico('migfer', 30) + '<span class="zm"></span><span class="hilal">' + ico('hilal', 18) + '</span></button></div>';
    h += '<div class="yan sag sag-a"><button class="yb" data-ac="gorevler">' + ico('gorev', 32) + '<span class="ad">Görevler</span><span class="hilal">' + ico('hilal', 18) + '</span></button></div>';
    h += '<div class="yan sag sag-b"><button class="yb" data-ac="yardim" hidden>' + ico('yardim', 32) + '<span class="ad">Yardım et</span></button><button class="yb" data-ac="topla" hidden>' + ico('topla', 32) + '<span class="ad">Tümünü topla</span></button></div>';
    h += '<div id="alt"><button class="gorev" data-ac="destan"><span class="gi">' + ico('gorev', 40) + '</span><span class="gt"></span><span class="gb"></span></button>' +
      '<div class="sohbet"></div><nav class="ac">' +
      [['kahramanlar', 'kahraman', 'Kahramanlar'], ['canta', 'canta', 'Çanta'], ['posta', 'posta', 'Posta'], ['boy', 'boy', 'Boy']].map(function (b) { return '<button data-ac="' + b[0] + '">' + ico(b[1], 32) + '<span>' + b[2] + '</span><i class="rz" hidden></i></button>'; }).join('') +
      '</nav></div><button class="dunya" data-ac="dunya">' + ico('dunya', 42) + '<span>Dünya</span></button><div id="bil"></div>';
    return h;
  }

  /* ---------- canlı güncelleme (her saniye, yeniden çizmeden) ---------- */
  var cache = {};
  function set(el, key, html) { if (!el) return; if (cache[key] !== html) { cache[key] = html; el.innerHTML = html; } }
  function cls(el, c, on) { if (el) el.classList.toggle(c, !!on); }
  var ERA = [[10, 'Oba'], [20, 'Boy'], [30, 'Bodun'], [40, 'Kağanlık']];
  function era(o) { for (var i = 0; i < ERA.length; i++) if (o <= ERA[i][0]) return ERA[i][1]; return 'Kağanlık'; }

  function refreshCity() {
    var s = S(), o = s.l.ocak;
    // kaynaklar
    var cap = E.cap();
    document.querySelectorAll('.kay').forEach(function (el) { var r = el.dataset.r; set(el.querySelector('b'), 'r' + r, nf(s.r[r] || 0)); cls(el, 'az', (s.r[r] || 0) >= cap * .98); });
    set($('.por .sv'), 'alp', String(s.ch.lv));
    set($('[data-p=guc] b'), 'guc', nf(E.power())); set($('[data-p=en] b'), 'en', Math.floor(s.en.v) + '/' + E.EN.max); set($('[data-p=cag]'), 'cag', era(o) + ' Çağı · ' + Math.round(o / 40 * 100) + '%');
    // yapılar
    SLOT.forEach(function (sl) {
      var id = sl[0], el = document.querySelector('[data-o="' + id + '"]'); if (!el) return;
      var gv = el.querySelector('.gv'), lev = el.querySelector('.lev');
      if (id.indexOf('yer:') === 0) {
        var k = id.slice(4), Y = YER[k], lk = Y.u && o < Y.u;
        set(gv, 'g' + id, (lk ? kilitTabela() : UI.pImg(k)) + extraYer(k));
        set(lev, 'l' + id, '<b>' + (lk ? ico('kilit', 14) : '◆') + '</b>' + Y.n); lev.classList.add('yer'); cls(el, 'kilit', lk);
        return;
      }
      var lv = s.l[id] || 0, unl = E.unlocked(id), q = E.queueOf(id), b = E.B[id];
      var art = lv > 0 ? UI.bImg(id, lv) : (unl ? UI.bImg(id, 1) : kilitTabela());
      var top = '';
      if (q) { var p = Math.max(0, Math.min(1, 1 - q.left / q.tot)); top = '<span class="sur" style="--p:' + (p * 100).toFixed(1) + '%;--h:' + Math.round(p * 120) + '">' + ft(q.left) + '<i></i></span>'; }
      else if (E.PROD[id] && E.binReady(id)) top = '<span class="hsat">' + ico(E.PROD[id], 22) + '</span>';
      var up = !q && lv > 0 && E.canRes(id) ? '<span class="ok-up"></span>' : (!q && lv === 0 && unl && E.canRes(id) ? '<span class="ok-up"></span>' : '');
      set(gv, 'g' + id, art + (!unl ? '<span class="kbad">Ocak ' + b.u + '</span>' : '') + top);
      set(lev, 'l' + id, '<b>' + (lv || (unl ? '+' : ico('kilit', 14))) + '</b>' + b.n + up);
      cls(el, 'kilit', !unl && !lv); cls(el, 'bos', lv === 0);
    });
    // sıralar
    var qs = E.queues(), bl = E.builders();
    [['insa', 0], ['insa2', 1]].forEach(function (x) {
      var el = document.querySelector('[data-q=' + x[0] + ']'); if (x[1] === 1) el.hidden = bl < 2;
      var q = qs[x[1]]; set(el.querySelector('.zm'), 'q' + x[0], q ? ft(q.left) : ''); cls(el, 'bos', !q);
    });
    var ri = document.querySelector('[data-q=ilim]'); set(ri.querySelector('.zm'), 'qi', s.rq ? ft(s.rq.left) : ''); cls(ri, 'bos', !s.rq && (s.l.bilgelik || 0) > 0); ri.hidden = !(s.l.bilgelik || s.rq);
    var ro = document.querySelector('[data-q=ordu]'), oq = s.tq || s.hq; set(ro.querySelector('.zm'), 'qo', oq ? ft(oq.left) : ''); cls(ro, 'bos', !oq && (s.l.kisla || 0) > 0); ro.hidden = !(s.l.kisla || oq);
    // sağ düğmeler
    var gReady = E.daily().some(function (x) { return x.ok; }) && !E.dailyClaimed() || (E.destan() && E.destan().ok);
    cls($('[data-ac=gorevler]'), 'hazir', gReady);
    var hy = $('[data-ac=yardim]'); hy.hidden = !E.helpN(); var tp = $('[data-ac=topla]'); tp.hidden = !E.anyBin();
    // görev şeridi
    var d = E.destan(), gt = $('.gorev .gt');
    if (d) set(gt, 'gd', '<em>' + (d.i + 1) + '. Bölüm</em>' + esc(d.t) + ' (' + d.v + '/' + d.g + ')');
    else { var dl = E.daily().filter(function (x) { return !x.ok; })[0]; set(gt, 'gd', dl ? '<em>Günlük</em>' + esc(dl.n) + ' (' + nf(dl.v) + '/' + nf(dl.g) + ')' : '<em>Günlük</em>Bugünün görevleri tamam'); }
    set($('.gorev .gb'), 'gb', d && d.ok ? ico('sandik', 26) : ico('tamga', 26));
    // sohbet
    var wc = (s.wc || [])[s.wc.length - 1]; set($('.sohbet'), 'ch', wc ? '<b>' + esc(wc.u) + ':</b> ' + esc(wc.txt) : '');
    // rozetler
    var unread = (s.mb || []).filter(function (m) { return !m.rd || E.mailHas(m); }).length; var rz = $('[data-ac=posta] .rz'); rz.hidden = !unread; set(rz, 'rzp', String(unread));
    var hc = E.HH.some(function (x, i) { return s.hs[i] < 5 && s.hc[i] >= E.HSC[s.hs[i]]; }); var rk = $('[data-ac=kahramanlar] .rz'); rk.hidden = !hc; set(rk, 'rzk', '◆');
    if (UI.onTick) UI.onTick();
  }
  function extraYer(k) {
    var s = S();
    if (k === 'kuyu' && E.wellDue()) return '<span class="hilal">' + ico('hilal', 20) + '</span>';
    if (k === 'agil' && E.petOk() && ((s.pt.adv && Date.now() >= s.pt.adv.end) || (!s.pt.adv && Date.now() >= (s.en.pet || 0) && s.en.v < E.EN.max))) return '<span class="hilal">' + ico('hilal', 20) + '</span>';
    if (k === 'kurultay' && E.HH.some(function (x, i) { return s.hs[i] < 5 && s.hc[i] >= E.HSC[s.hs[i]]; })) return '<span class="hilal">' + ico('hilal', 20) + '</span>';
    return '';
  }

  /* ---------- bildirim ve uçan kaynak ---------- */
  UI.toast = function (t) { var b = $('#bil'); if (!b) return; var d = document.createElement('div'); d.className = 'bl'; d.textContent = t; b.appendChild(d); setTimeout(function () { d.remove(); }, 2700); while (b.children.length > 3) b.firstChild.remove(); };
  UI.fly = function (fromEl, r, n) {
    var to = document.querySelector('.kay[data-r="' + r + '"]'); if (!fromEl || !to) return; var a = fromEl.getBoundingClientRect(), b = to.getBoundingClientRect();
    var d = document.createElement('div'); d.className = 'ucan'; d.innerHTML = ico(r, 22) + '+' + nf(n); d.style.left = (a.left + a.width / 2 - 20) + 'px'; d.style.top = (a.top) + 'px'; document.body.appendChild(d);
    requestAnimationFrame(function () { requestAnimationFrame(function () { d.style.transform = 'translate(' + (b.left - a.left - a.width / 2 + 30) + 'px,' + (b.top - a.top) + 'px) scale(.7)'; d.style.opacity = '.2'; }); });
    setTimeout(function () { d.remove(); }, 800);
  };
  function buzz(p) { try { if (navigator.vibrate && (S().ek.vib !== 0)) navigator.vibrate(p); } catch (e) {} }
  UI.buzz = buzz;

  /* ---------- pencere çerçevesi ---------- */
  var KURT = '<svg class="kurt l" viewBox="0 0 40 52"><path d="M6 50l2-20-6-14 10 6 4-14 6 12 8-2-4 10 10 8-12 4-6 10z" fill="#e8c66a" stroke="#6b3d08" stroke-width="1.6" stroke-linejoin="round"/><circle cx="20" cy="26" r="2" fill="#6b3d08"/></svg>';
  UI.pen = function (title, body, opt) {
    UI.kapat(true); opt = opt || {};
    var d = document.createElement('div'); d.className = 'pen'; d.id = 'pen';
    d.innerHTML = '<div class="pb">' + KURT + KURT.replace('kurt l', 'kurt r') + '<div class="bi">' + esc(title) + '</div><button class="geri" data-kapat="1" aria-label="Geri">‹</button></div><div class="pi">' + body + '</div>';
    root.appendChild(d); UI.cur = opt; return d;
  };
  UI.kapat = function (q) { var p = $('#pen'); if (p) p.remove(); UI.cur = null; if (!q) refreshCity(); };

  /* ---------- kutlama ---------- */
  var kq = [];
  E.onLevel = function (k, lv, dp) { kq.push([k, lv, dp]); if (kq.length === 1) setTimeout(kutla, 50); };
  function yeniAcilan(k, lv) { if (k !== 'ocak') return []; var out = []; for (var b in E.B) if (E.B[b].u === lv) out.push(b); for (var y in YER) if (YER[y].u === lv) out.push('yer:' + y); return out; }
  function kutla() {
    var x = kq[0]; if (!x) return; var k = x[0], lv = x[1], b = E.B[k], yn = yeniAcilan(k, lv);
    var d = document.createElement('div'); d.className = 'kut';
    d.innerHTML = '<h2>' + esc(b.n) + ' yükseldi</h2><div class="r">' + UI.bImg(k, lv) + '</div><div class="sv">Seviye ' + lv + '</div><div class="gc">Güç ▲ +' + nf(x[2]) + '</div>' +
      (yn.length ? '<div class="yeni">' + yn.map(function (z) { var y = z.indexOf('yer:') === 0; return '<div class="yk">' + (y ? UI.pImg(z.slice(4)) : UI.bImg(z, 1)) + (y ? YER[z.slice(4)].n : E.B[z].n) + '</div>'; }).join('') + '</div>' : '') +
      (k === 'ocak' && E.STORY[lv] ? '<p style="max-width:300px;text-align:center;font:600 14px Alegreya Sans;color:#dfe9ff;margin:0">' + esc(E.STORY[lv]) + '</p>' : '') +
      '<button class="dug" data-kut="1">Harika</button>';
    root.appendChild(d); buzz([20, 40, 20]);
    d.querySelector('[data-kut]').onclick = function () { d.remove(); kq.shift(); if (kq.length) setTimeout(kutla, 120); };
  }

  /* ---------- eylemler ---------- */
  UI.ac = {};
  function act(a, el) {
    if (a === 'topla') { var got = E.collectAll(); Object.keys(got).forEach(function (r) { var k = Object.keys(E.PROD).filter(function (b) { return E.PROD[b] === r; })[0], be = document.querySelector('[data-o="' + k + '"]'); UI.fly(be || el, r, got[r]); }); buzz(15); refreshCity(); return; }
    if (a === 'yardim') { var n = E.helpAll(); if (n) UI.toast(n + ' boydaşa yardım edildi'); buzz(15); refreshCity(); return; }
    if (UI.ac[a]) return UI.ac[a](el);
    UI.toast('Bu ekran sıradaki adımda kuruluyor');
  }
  UI.act = act;

  /* ---------- başlat ---------- */
  UI.start = function () {
    root = $('#oyun'); scale(); addEventListener('resize', function () { scale(); });
    root.innerHTML = cityHTML(); refreshCity();
    root.addEventListener('click', function (ev) {
      var t = ev.target.closest('button,[data-ac],[data-o]'); if (!t) return;
      if (t.dataset.kapat) return UI.kapat();
      if (t.dataset.o) { var id = t.dataset.o; if (id.indexOf('yer:') === 0) { var y = YER[id.slice(4)]; if (y.u && S().l.ocak < y.u) return UI.toast('Kutsal Ocak Sv ' + y.u + ' gerekli'); return act(y.ac, t); } if (E.PROD[id] && E.binReady(id) && !E.queueOf(id)) { var g = E.collect(id); if (g) { UI.fly(t, E.PROD[id], g); E.act(); buzz(10); refreshCity(); return; } } return UI.ac.yapi ? UI.ac.yapi(id) : act('yapi'); }
      if (t.dataset.q) { var q = t.dataset.q; if (q === 'insa' || q === 'insa2') { var qq = E.queues()[q === 'insa' ? 0 : 1]; return UI.ac.yapi ? UI.ac.yapi(qq ? qq.k : enIyiYapi()) : 0; } return act(q); }
      if (t.dataset.ac) return act(t.dataset.ac, t);
      if (UI.onClick) UI.onClick(t, ev);
    });
    var last = Date.now();
    setInterval(function () { var n = Date.now(), dt = Math.min(5, (n - last) / 1000); last = n; E.tick(dt); if (!$('#pen')) refreshCity(); else if (UI.cur && UI.cur.tick) UI.cur.tick(); if (++UI.sec % 5 === 0) E.save(); }, 1000);
    E.onLog = function (m) { if (/seviye oldu|yola çıktı|döndü|iyileşti|tamamlandı|yağmaladı|püskürtüldü/.test(m)) UI.toast(m); };
    E.onChange = function () { refreshCity(); };
    addEventListener('visibilitychange', function () { if (document.hidden) E.save(); });
    addEventListener('pagehide', function () { E.save(); });
    if (E.away && E.away.d >= 60 && UI.ac.hosgeldin) UI.ac.hosgeldin();
  };
  UI.sec = 0;
  function enIyiYapi() { var s = S(), best = 'ocak'; for (var k in E.B) if (E.canRes(k)) { best = k; break; } return best; }
  UI.enIyiYapi = enIyiYapi;
  UI.refresh = refreshCity;
})(window);
