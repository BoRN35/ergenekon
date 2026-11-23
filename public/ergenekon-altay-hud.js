/* Ergenekon — Altay ön arayüzü (King of Altay düzeni). Claude, 23 Kasım 2026.
   Alt şerit: Kahramanlar · Çanta · Posta · Boy + büyük Dünya düğmesi. Obada: bölüm görevi ve sohbet şeridi,
   solda boştaki işler (usta · ilim · eğitim · oba işi), sağda Görevler/Etkinlik/Ayarlar ve Yardım et / Tümünü topla.
   Yalnız gezinme ve görünüş; oyun mantığı mevcut işlevlerle çalışır, kayıt yapısı değişmez. */
(function () {
  'use strict';
  var W = window, D = document, H = D.documentElement;
  if (W.__ekHud) return; W.__ekHud = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + 'sn'; } }
  function rer() { try { W.render(); } catch (e) {} }
  function tabGo(t) { var b = D.querySelector('#tabs [data-t="' + t + '"]'); if (b) b.click(); else { W.tab = t; rer(); } }
  function closeOv() { D.querySelectorAll('.ek-ov').forEach(function (o) { o.remove(); }); var x = D.querySelector('#ek-npcbar:not([hidden]) .nb-x'); if (x) x.click(); }
  // KoA tarzı simgeler (dolgu + altın kontur)
  var I = {
    kahraman: '<svg viewBox="0 0 48 48"><path d="M12 30c0-13 5-21 12-21s12 8 12 21l-3 8H15z" fill="#b9c2ca" stroke="#3a2a14" stroke-width="2"/><path d="M24 9c2-6 9-7 13-4-4 1-7 4-8 8" fill="#c0392b" stroke="#5a1a10" stroke-width="1.5"/><path d="M16 26h16M24 26v12" stroke="#3a2a14" stroke-width="2.4"/><path d="M15 38h18l2 4H13z" fill="#d6a640" stroke="#5a3a10" stroke-width="1.5"/></svg>',
    canta: '<svg viewBox="0 0 48 48"><path d="M9 18h30l-3 24H12z" fill="#b5652a" stroke="#4a2410" stroke-width="2"/><path d="M17 18c0-8 14-8 14 0" fill="none" stroke="#4a2410" stroke-width="3"/><path d="M9 18h30v6H9z" fill="#8a4a1c" stroke="#4a2410" stroke-width="2"/><rect x="20" y="24" width="8" height="7" rx="1.5" fill="#e8c66a" stroke="#5a3a10" stroke-width="1.5"/></svg>',
    posta: '<svg viewBox="0 0 48 48"><path d="M7 14h34v24H7z" fill="#f2e3bf" stroke="#6b4a1e" stroke-width="2"/><path d="M7 15l17 13 17-13" fill="none" stroke="#6b4a1e" stroke-width="2"/><circle cx="24" cy="28" r="5" fill="#b8281c" stroke="#5a1a10" stroke-width="1.5"/><path d="M33 6l8 2-6 14-4-2z" fill="#f4f0e6" stroke="#6b5a40" stroke-width="1.5"/></svg>',
    boy: '<svg viewBox="0 0 48 48"><path d="M24 5l16 6v12c0 11-7 17-16 20C15 40 8 34 8 23V11z" fill="#7a2a1c" stroke="#e8c66a" stroke-width="2.2"/><path d="M15 21l4-5 5 4 5-4 4 5-2 8-7 4-7-4z" fill="#d7d9dc" stroke="#3a2a14" stroke-width="1.2"/></svg>',
    dunya: '<svg viewBox="0 0 48 48"><path d="M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z" fill="#ead7a5" stroke="#6b4a1e" stroke-width="2"/><path d="M18 8v28M30 12v28" stroke="#6b4a1e" stroke-width="1.5"/><path d="M11 24c5-5 9 2 14-3s9-1 12 1" stroke="#3f7ea0" stroke-width="2.4" fill="none"/><path d="M28 29l3-3 3 3-3 3z" fill="#b8281c"/></svg>',
    oba: '<svg viewBox="0 0 48 48"><path d="M8 28l16-14 16 14v12H8z" fill="#efe0c2" stroke="#6b4a1e" stroke-width="2"/><path d="M5 29L24 11l19 18" fill="none" stroke="#8f2a1e" stroke-width="3.4" stroke-linecap="round"/><path d="M20 40v-8h8v8" fill="#6b4a1e"/><path d="M24 11V4l6 2-6 2" fill="#c0392b" stroke="#5a1a10" stroke-width="1"/></svg>',
    cekic: '<svg viewBox="0 0 48 48"><path d="M10 14l12-7 6 9-12 7z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2"/><path d="M21 20l15 21" stroke="#8a5a25" stroke-width="5" stroke-linecap="round"/></svg>',
    kitap: '<svg viewBox="0 0 48 48"><path d="M6 12c7-3 12-2 18 2v26c-6-4-11-5-18-2z" fill="#f2e3bf" stroke="#6b4a1e" stroke-width="2"/><path d="M42 12c-7-3-12-2-18 2v26c6-4 11-5 18-2z" fill="#e6cf98" stroke="#6b4a1e" stroke-width="2"/><path d="M34 6l4 2-9 16-3-2z" fill="#d6a640" stroke="#5a3a10" stroke-width="1.2"/></svg>',
    migfer: '<svg viewBox="0 0 48 48"><path d="M10 30c0-13 6-21 14-21s14 8 14 21v8H10z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2"/><path d="M24 9v29M15 26h18" stroke="#2c343c" stroke-width="2.6"/><path d="M16 30h7v6h-7zM25 30h7v6h-7z" fill="#2c343c"/></svg>',
    balta: '<svg viewBox="0 0 48 48"><path d="M27 8c8 1 13 7 13 14l-11-1-4-4z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2"/><path d="M29 16L10 40" stroke="#8a5a25" stroke-width="4.5" stroke-linecap="round"/></svg>',
    gorev: '<svg viewBox="0 0 48 48"><path d="M10 8h24a5 5 0 0 1 5 5v27H15a5 5 0 0 1-5-5z" fill="#f2e3bf" stroke="#6b4a1e" stroke-width="2"/><path d="M16 17h16M16 23h16M16 29h10" stroke="#a7834e" stroke-width="2"/><circle cx="35" cy="36" r="6" fill="#b8281c" stroke="#5a1a10" stroke-width="1.5"/></svg>',
    etkinlik: '<svg viewBox="0 0 48 48"><path d="M8 20h32v20H8z" fill="#b8281c" stroke="#5a1a10" stroke-width="2"/><path d="M6 14h36v7H6z" fill="#d23a2a" stroke="#5a1a10" stroke-width="2"/><path d="M24 14v26" stroke="#e8c66a" stroke-width="4"/><path d="M24 14c-3-8-12-7-10-1M24 14c3-8 12-7 10-1" fill="none" stroke="#e8c66a" stroke-width="2.6"/></svg>',
    ayar: '<svg viewBox="0 0 48 48"><path d="M24 6l4 5 6-2 1 6 6 2-3 6 3 5-6 2-1 6-6-2-4 5-4-5-6 2-1-6-6-2 3-5-3-6 6-2 1-6 6 2z" fill="#c9a25a" stroke="#4a3010" stroke-width="2"/><circle cx="24" cy="24" r="6" fill="#4a3010"/></svg>',
    yardim: '<svg viewBox="0 0 48 48"><path d="M4 26l10-9 9 5 9-5 12 9-12 10-8-4-7 4z" fill="#c3ccd4" stroke="#2c343c" stroke-width="2" stroke-linejoin="round"/><path d="M14 17l4 12M34 17l-4 12" stroke="#2c343c" stroke-width="1.5"/></svg>',
    topla: '<svg viewBox="0 0 48 48"><path d="M12 18c0-5 24-5 24 0l5 18c0 7-34 7-34 0z" fill="#c49a5a" stroke="#4a2a10" stroke-width="2"/><path d="M17 15c3-6 11-6 14 0" stroke="#4a2a10" stroke-width="2.6" fill="none"/><path d="M14 12l6 5M30 8l2 8M20 8l3 8" stroke="#d6a640" stroke-width="3" stroke-linecap="round"/></svg>',
    guc: '<svg viewBox="0 0 48 48"><path d="M8 40L34 12M30 8l10 10M40 40L14 12M18 8L8 18" stroke="#f3e3c0" stroke-width="4.4" stroke-linecap="round"/></svg>'
  };

  /* ---------- Görevler penceresi: Bölüm (Ocak'ın bir sonraki seviyesine giden yol) + Günlük ---------- */
  function openBld(k) { closeOv(); W.BMK = k; W.selB = k; W.tab = 'c'; rer(); }
  function bname(k) { var b = (W.B || {})[k]; return b ? b.n : k; }
  function reqs(k) { try { return W.buildingRequirements(k) || []; } catch (e) { return []; } }
  function chapter() {
    var s = S(), oc = (s.l && s.l.ocak) || 1, list = [], seen = {};
    function addT(k, lv, depth) {
      var key = k + ':' + lv; if (seen[key]) return; seen[key] = 1;
      var cur = (s.l && s.l[k]) || 0;
      if (cur < lv && depth < 2) reqs(k).forEach(function (r) { if (((s.l && s.l[r.key]) || 0) < r.level) addT(r.key, r.level, depth + 1); });
      list.push({ k: k, lv: lv, cur: Math.min(cur, lv), done: cur >= lv });
    }
    reqs('ocak').forEach(function (r) { addT(r.key, r.level, 0); });
    list.push({ k: 'ocak', lv: oc + 1, cur: oc, done: false, main: true });
    return { n: oc, list: list, done: list.filter(function (t) { return t.done; }).length };
  }
  function gorevHtml() {
    var c = chapter(), pct = Math.round(c.done / c.list.length * 100);
    return '<div class="gv-ban"><b>' + c.n + '. BÖLÜM</b><span>Ocağı ' + (c.n + 1) + '. seviyeye çıkar</span><u><i style="width:' + pct + '%"></i></u><small>' + c.done + '/' + c.list.length + '</small></div>' +
      '<div class="gv-list">' + c.list.map(function (t) {
        var img = W.ekBinaArt ? W.ekBinaArt(t.k) : null, q = null; try { q = W.buildQueue(t.k); } catch (e) {}
        return '<div class="gv-r' + (t.done ? ' ok' : '') + (t.main ? ' main' : '') + '"><span class="gv-im">' + (img ? '<img src="' + img + '" alt="">' : '') + '</span><span class="gv-t"><b>' + bname(t.k) + ' <em>Sv ' + t.lv + '</em></b><u><i style="width:' + Math.round(t.cur / t.lv * 100) + '%"></i></u></span>' +
          (t.done ? '<span class="gv-ok">✔</span>' : q && q.left > 0 ? '<span class="gv-tm">' + ft(q.left) + '</span>' : '<button type="button" class="gv-go" data-gv="' + t.k + '">GİT</button>') + '</div>';
      }).join('') + '</div>';
  }
  function gorevOpen() {
    closeOv();
    var o = D.createElement('div'); o.className = 'ek-ov yk-ov ah-gv';
    o.innerHTML = '<div class="yk-card"><div class="yk-head"><h2>Görevler</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="gv-tabs"><button type="button" class="on">Bölüm</button><button type="button" data-gvt="gunluk">Günlük</button></div><div class="gv-body"></div></div>';
    var body = o.querySelector('.gv-body'), fill = function () { var h = gorevHtml(); if (body.__ah !== h) { body.__ah = h; body.innerHTML = h; } };
    fill(); var iv = setInterval(function () { if (!o.isConnected) { clearInterval(iv); return; } fill(); }, 1000);
    o.addEventListener('click', function (ev) {
      if (ev.target === o || ev.target.closest('.yk-x')) { o.remove(); return; }
      if (ev.target.closest('[data-gvt]')) { o.remove(); if (W.ekNpcOpen) W.ekNpcOpen('tug', 0); return; }
      var g = ev.target.closest('[data-gv]'); if (g) { o.remove(); openBld(g.dataset.gv); }
    });
    D.body.appendChild(o);
  }
  W.ekGorevler = gorevOpen;
  var R = {};
  /* ---------- Ayarlar: yuvarlak simge ızgarası, dokununca tek bölüm ---------- */
  var SI = {
    ses: '<svg viewBox="0 0 48 48"><path d="M10 19h8l10-8v26l-10-8h-8z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M33 17c3 4 3 10 0 14M37 13c5 6 5 16 0 22" fill="none" stroke="#f3e3c0" stroke-width="3" stroke-linecap="round"/></svg>',
    grafik: '<svg viewBox="0 0 48 48"><path d="M24 8c9 0 17 6 17 14 0 5-4 7-8 7h-4c-2 0-3 2-2 4 2 3 0 7-4 7C14 40 7 32 7 23 7 15 15 8 24 8z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><circle cx="16" cy="21" r="3" fill="#c8341c"/><circle cx="23" cy="15" r="3" fill="#3f7ea0"/><circle cx="31" cy="17" r="3" fill="#2f7d3a"/></svg>',
    bildirim: '<svg viewBox="0 0 48 48"><path d="M24 7c-7 0-11 5-11 12v8l-4 6h30l-4-6v-8c0-7-4-12-11-12z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M19 36c1 3 3 5 5 5s4-2 5-5" fill="#e8c66a" stroke="#4a3010" stroke-width="2"/></svg>',
    hesap: '<svg viewBox="0 0 48 48"><circle cx="24" cy="17" r="8" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M9 41c1-9 7-14 15-14s14 5 15 14z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/></svg>',
    dil: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#3f7ea0" stroke="#f3e3c0" stroke-width="2.4"/><path d="M8 24h32M24 8c-6 5-6 27 0 32M24 8c6 5 6 27 0 32" fill="none" stroke="#f3e3c0" stroke-width="2"/></svg>',
    oto: '<svg viewBox="0 0 48 48"><path d="M20 6h8l1 5 4 2 5-3 5 6-3 5 1 4 5 1v8l-5 1-1 4 3 5-6 5-5-3-4 2-1 5h-8l-1-5-4-2-5 3-5-6 3-4-1-5-5-1v-8l5-1 1-4-3-5 6-5 4 3 4-2z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2" transform="scale(.82) translate(5 5)"/><circle cx="24" cy="24" r="6" fill="#4a3010"/></svg>',
    kayit: '<svg viewBox="0 0 48 48"><path d="M14 36a9 9 0 0 1-1-18 12 12 0 0 1 23 3 7.5 7.5 0 0 1-1 15z" fill="#f3e3c0" stroke="#4a3010" stroke-width="2"/><path d="M24 22v11M19 28l5 5 5-5" fill="none" stroke="#3f7ea0" stroke-width="3" stroke-linecap="round"/></svg>'
  };
  var SET = [['ses', 'Ses', 0], ['grafik', 'Grafik', 1], ['bildirim', 'Bildirim', 2], ['hesap', 'Hesap', 3], ['dil', 'Dil', 4], ['oto', 'Otomasyon', 5], ['kayit', 'Kayıt', 'mw']];
  function setUp() {
    var tg = D.getElementById('tg'), es = D.getElementById('ek-set'); if (!tg || !es) return;
    if (!R.sg || !R.sg.isConnected) {
      R.sg = el('div', '', 'ah-setg', '<div class="asg-head">Ayarlar</div><div class="asg-grid">' + SET.map(function (x) { return '<button type="button" data-asg="' + x[2] + '"><i>' + SI[x[0]] + '</i><b>' + x[1] + '</b></button>'; }).join('') + '</div><button type="button" class="asg-back" hidden>‹ Ayarlar</button>');
      es.parentNode.insertBefore(R.sg, es);
      R.sg.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-asg]'); if (b) { R.sc = b.dataset.asg; setMode(); try { tg.scrollTop = 0; } catch (e) {} if (R.sc === 'mw') { var kb = [].slice.call(tg.querySelectorAll('.mgmt-navigation button')).filter(function (x) { return /Kayıt/.test(x.textContent); })[0]; if (kb) kb.click(); } return; }
        if (ev.target.closest('.asg-back')) { R.sc = null; setMode(); }
      });
      R.sc = null;
    }
    setMode();
  }
  function setMode() {
    var tg = D.getElementById('tg'), es = D.getElementById('ek-set'); if (!tg || !es || !R.sg) return;
    var sc = R.sc, secs = es.querySelectorAll(':scope>section');
    tg.classList.add('ah-setg-on'); tg.classList.toggle('ah-setg-grid', sc == null); tg.classList.toggle('ah-setg-mw', sc === 'mw');
    secs.forEach(function (x, i) { x.classList.toggle('ah-cur', String(i) === String(sc)); });
    R.sg.querySelector('.asg-grid').hidden = sc != null; R.sg.querySelector('.asg-back').hidden = sc == null;
  }

  function el(tag, id, cls, html) { var e = D.createElement(tag); if (id) e.id = id; if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function build() {
    if (!D.body || !S()) return false;
    // alt şerit
    R.nav = el('nav', 'ah-nav', '', [['kahraman', 'Kahramanlar'], ['canta', 'Çanta'], ['posta', 'Posta'], ['boy', 'Boy']].map(function (x) { return '<button type="button" data-ah="' + x[0] + '"><i>' + I[x[0]] + '</i><b>' + x[1] + '</b><em class="ah-bd" hidden></em></button>'; }).join('') +
      '<button type="button" id="ah-world" data-ah="dunya"><i>' + I.dunya + '</i><b>Dünya</b><em class="ah-bd" hidden></em></button>');
    // obada: görev ve sohbet şeritleri
    R.strip = el('div', 'ah-strip', '', '<button type="button" id="ah-q"><i>' + I.gorev + '</i><span></span></button><button type="button" id="ah-chat"><i><svg viewBox="0 0 24 24"><path d="M3 5h18v11H9l-5 4v-4H3z" fill="#e8c66a" stroke="#5a3a10" stroke-width="1.4"/></svg></i><span></span></button>');
    // sol: boştaki işler
    R.left = el('div', 'ah-left');
    // sağ üst ve sağ alt
    R.right = el('div', 'ah-right', '', [['gorev', 'Görevler'], ['etkinlik', 'Etkinlik'], ['ayar', 'Ayarlar']].map(function (x) { return '<button type="button" data-ah="' + x[0] + '"><i>' + I[x[0]] + '</i><b>' + x[1] + '</b><em class="ah-hil" hidden></em></button>'; }).join(''));
    R.act = el('div', 'ah-act', '', '<button type="button" data-ah="yardim"><i>' + I.yardim + '</i><b>Yardım et</b><em class="ah-bd" hidden></em></button><button type="button" data-ah="topla"><i>' + I.topla + '</i><b>Tümünü topla</b></button>');
    R.pw = el('div', 'ah-pw', '', '<span class="ah-pwv"><i>' + I.guc + '</i><b></b></span><span class="ah-er"></span>');
    R.toast = el('div', 'ah-toast'); R.toast.hidden = true;
    [R.nav, R.strip, R.left, R.right, R.act, R.pw, R.toast].forEach(function (x) { D.body.appendChild(x); });
    D.body.addEventListener('click', onClick, true);
    return true;
  }
  function toast(h) { R.toast.innerHTML = h; R.toast.hidden = false; clearTimeout(R.tt); R.tt = setTimeout(function () { R.toast.hidden = true; }, 2200); }
  var RS = [['odun', 'Odun'], ['et', 'Et'], ['demir', 'Demir'], ['komur', 'Kömür']];
  function act(k) {
    var s = S();
    try { navigator.vibrate && navigator.vibrate(10); } catch (e) {}
    if (k === 'kahraman') { closeOv(); if (W.ekNpcOpen) W.ekNpcOpen('kurultay'); else tabGo('u'); }
    else if (k === 'canta') { closeOv(); var b = D.querySelector('#tabs>button[title="Çanta"]') || D.querySelector('.ek-topbtns [data-ek="bag"]'); if (b) b.click(); }
    else if (k === 'posta') { closeOv(); tabGo('p'); }
    else if (k === 'boy') { closeOv(); tabGo('a'); }
    else if (k === 'dunya') { closeOv(); if (W.tab === 'm') tabGo('c'); else if (W.tab !== 'c') tabGo('c'); else { var w = D.getElementById('ek-world'); if (w) w.click(); else tabGo('m'); } }
    else if (k === 'gorev') gorevOpen();
    else if (k === 'etkinlik') tabGo('e');
    else if (k === 'ayar') tabGo('g');
    else if (k === 'yardim') { var n = (s.al && s.al.hq) || 0, h = D.getElementById('ek-hand'); if (n && h) { h.click(); toast('🤝 ' + n + ' boydaşa yardım edildi'); } else toast('Yardım bekleyen boydaş yok'); }
    else if (k === 'topla') {
      var before = {}; RS.forEach(function (r) { before[r[0]] = s.r[r[0]] || 0; });
      var n2 = W.ekCollectAll ? W.ekCollectAll() : 0, got = RS.map(function (r) { var d = (s.r[r[0]] || 0) - before[r[0]]; return d >= 1 ? '<span>+' + nf(d) + ' ' + r[1] + '</span>' : ''; }).join('');
      toast(got || (n2 ? 'Depo dolu' : 'Toplanacak ürün yok'));
      rer();
    }
    else if (k.indexOf('job:') === 0) jobGo(k.slice(4));
  }
  function jobGo(j) {
    if (j === 'usta') { if (W.ekGo) W.ekGo('build'); }
    else if (j === 'ilim') tabGo('r');
    else if (j === 'egitim') { W.BMK = 'kisla'; W.tab = 'c'; rer(); setTimeout(function () { var b = D.querySelector('#ek-yapi [data-yk="detail"]'); if (b) b.click(); }, 150); }
    else if (j === 'is') { var L = W.ekParcelList ? W.ekParcelList() : [], p = L.filter(function (x) { return !x.t && x.kind !== 'field' && !x.dim; })[0] || L[0]; if (p && W.ekOpenParcel) W.ekOpenParcel(p.id); }
  }
  function onClick(ev) {
    var b = ev.target.closest && ev.target.closest('#ah-nav [data-ah],#ah-right [data-ah],#ah-act [data-ah],#ah-left [data-ah]'); 
    if (b) { ev.stopPropagation(); ev.preventDefault(); act(b.dataset.ah); return; }
    if (ev.target.closest && ev.target.closest('#ah-q i')) { ev.stopPropagation(); gorevOpen(); return; }
    if (ev.target.closest && ev.target.closest('#ah-q')) { ev.stopPropagation(); var g = D.getElementById('ek-goal'); if (g) g.click(); return; }
    if (ev.target.closest && ev.target.closest('#ah-chat')) { ev.stopPropagation(); var c = D.querySelector('#tabs>button[title="Sohbet"]') || D.querySelector('#cp [data-ct="x"]'); if (c) c.click(); }
  }
  function bd(e, n) { var b = e && e.querySelector('.ah-bd'); if (!b) return; var t = n ? String(n) : ''; b.hidden = !t; if (b.textContent !== t) b.textContent = t; }
  function job(id, ic, busy, left) { return '<button type="button" data-ah="job:' + id + '" class="' + (busy ? 'busy' : '') + '"><i>' + I[ic] + '</i>' + (busy ? '<small>' + ft(left) + '</small>' : '<em>Zz</em>') + '</button>'; }
  function update() {
    var s = S(), tab = W.tab, ov = !!D.querySelector('.ek-ov'), oba = tab === 'c' && !ov && !W.BMK;
    H.classList.toggle('ah-on', true); H.classList.toggle('ah-oba', tab === 'c'); H.classList.toggle('ah-map', tab === 'm');
    // alt şerit
    R.nav.querySelectorAll('[data-ah]').forEach(function (b) { var k = b.dataset.ah; b.classList.toggle('on', (k === 'posta' && tab === 'p') || (k === 'boy' && tab === 'a') || (k === 'kahraman' && tab === 'u')); });
    var w = D.getElementById('ah-world'), onMap = tab === 'm' || tab !== 'c';
    w.querySelector('b').textContent = tab === 'c' ? 'Dünya' : 'Oba'; var wi = tab === 'c' ? I.dunya : I.oba; if (w.__i !== wi) { w.__i = wi; w.querySelector('i').innerHTML = wi; }
    var pb = D.querySelector('#tabs [data-t="p"]'); bd(R.nav.querySelector('[data-ah="posta"]'), pb && (pb.querySelector('b,i,em,span:not(.ek-nxi)') || {}).textContent && /\d/.test(pb.textContent) ? pb.textContent.replace(/\D/g, '') : '');
    bd(R.nav.querySelector('[data-ah="boy"]'), (s.al && s.al.hq) || '');
    // obaya özel parçalar
    [R.strip, R.left, R.right, R.act, R.pw].forEach(function (x) { x.hidden = !(tab === 'c'); });
    if (tab === 'g') setUp(); else if (R.sc != null) R.sc = null;
    if (tab !== 'c') return;
    // görev şeridi
    var g = D.getElementById('ek-goal'), gt = g ? (g.querySelector('b') || g).textContent.trim() : '';
    var qs = R.strip.querySelector('#ah-q span'), qh = '<b>' + ((s.l && s.l.ocak) || 1) + '. Bölüm</b> ' + (gt || 'Obanı büyüt');
    if (qs.__ah !== qh) { qs.__ah = qh; qs.innerHTML = qh; }
    var cm = D.querySelector('#cpm'), last = cm && cm.lastElementChild, ct = last ? last.textContent.trim().replace(/\s+/g, ' ') : '';
    var cs = R.strip.querySelector('#ah-chat span'); if (cs.textContent !== ct) cs.textContent = ct || 'Boy sohbeti';
    // güç ve erime
    var pv = 0; try { pv = W.power(); } catch (e) {}
    var pt = nf(pv), pb2 = R.pw.querySelector('b'); if (pb2.textContent !== pt) pb2.textContent = pt;
    var me = D.getElementById('melt'), et = 'Erime ' + (me ? me.textContent.trim() : '');
    var er = R.pw.querySelector('.ah-er'); if (er.textContent !== et) er.textContent = et;
    // boştaki işler
    var bq = []; try { bq = W.buildQueues() || []; } catch (e) {}
    var nb = 1; try { nb = W.builders(); } catch (e) {}
    var bl = bq.length ? Math.min.apply(null, bq.map(function (q) { return q.left; })) : 0;
    var L = W.ekParcelList ? W.ekParcelList() : [], pj = L.filter(function (x) { return x.t; })[0], idle = L.some(function (x) { return !x.t && x.kind !== 'field' && !x.dim; });
    var h = job('usta', 'cekic', bq.length >= nb, bl) + job('ilim', 'kitap', !!(s.rq && s.rq.left > 0), s.rq ? s.rq.left : 0) + ((s.l && s.l.kisla) ? job('egitim', 'migfer', !!(s.tq && s.tq.left > 0), s.tq ? s.tq.left : 0) : '') + (pj || idle ? job('is', 'balta', !!pj && !idle, pj ? pj.left : 0) : '');
    if (R.left.__ah !== h) { R.left.__ah = h; R.left.innerHTML = h; }
    bd(R.act.querySelector('[data-ah="yardim"]'), (s.al && s.al.hq) || '');
    var tg = D.querySelector('#ek-npcs [data-npc="tug"] .np-hil'), gh = R.right.querySelector('[data-ah="gorev"] .ah-hil'); if (gh) gh.hidden = !tg;
  }
  var last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    if (!R.nav) { if (!build()) return; }
    if (now - last < 400) return; last = now;
    try { update(); } catch (e) {}
  }
  requestAnimationFrame(loop);
})();
