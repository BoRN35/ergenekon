/* Ergenekon yeni — ekranlar: yapı penceresi, görevler, kahramanlar ve kurt, hoş geldin. */
(function (W) {
  'use strict';
  var nf = E.nf, ft = E.ft, ico = G.ico, esc = UI.esc;
  function S() { return E.S(); }
  var RI = { odun: 'odun', et: 'et', demir: 'demir', komur: 'komur', celik: 'celik', kristal: 'kor', kagit: 'kagit', safir: 'safir', opal: 'opal' };
  function cost(c) { var s = S(); return Object.keys(c).filter(function (r) { return c[r] > 0; }).map(function (r) { var ok = (s.r[r] || 0) >= c[r]; return '<span>' + ico(RI[r] || r, 22) + '<b class="' + (ok ? 'cg' : 'cr') + '">' + nf(s.r[r] || 0) + '</b>/' + nf(c[r]) + '</span>'; }).join(''); }
  W.UIcost = cost;
  function bar(p, c) { return '<div class="bar ' + (c || '') + '"><i style="width:' + Math.max(0, Math.min(100, p * 100)).toFixed(1) + '%"></i></div>'; }
  UI.bar = bar;
  function hilal() { return '<span class="hilal">' + ico('hilal', 18) + '</span>'; }

  /* =================== YAPI PENCERESİ =================== */
  var EFEKT = {
    odunluk: function (lv) { return ['odun', 'Odun/sa']; }, avci: function () { return ['et', 'Et/sa']; }, demirci: function () { return ['demir', 'Demir/sa']; }, komurluk: function () { return ['komur', 'Kömür/sa']; }
  };
  function sonraki(k) {
    var s = S(), lv = s.l[k] || 0, out = [['guc', 'Güç +100']];
    if (EFEKT[k]) { var r = EFEKT[k](lv)[0], a = E.rates()[r]; s.l[k] = lv + 1; var b = E.rates()[r]; s.l[k] = lv; out.push([r, nf(a) + ' → ' + nf(b) + '/sa']); }
    if (k === 'yurt') out.push(['kahraman', 'Halk ' + E.halk() + ' → ' + (E.halk() + 5)]);
    if (k === 'ocak') { var c0 = E.cap(); s.l.ocak = lv + 1; var c1 = E.cap(); s.l.ocak = lv; out.push(['sandik', 'Depo ' + nf(c0) + ' → ' + nf(c1)]); }
    if (k === 'oba' && lv + 1 === 5) out.push(['cekic', 'İkinci usta']);
    if (k === 'sur') out.push(['boy', 'Akın savunması +%5']);
    if (k === 'sifa') out.push(['iksir', 'Can yenilenmesi +%10']);
    if (k === 'kisla') out.push(['migfer', 'Asker kapasitesi +%10']);
    if (k === 'ambar') out.push(['sandik', 'Yağma kaybı −%2']);
    return out.slice(0, 2);
  }
  UI.ac.yapi = function (k) {
    var b = E.B[k]; if (!b) return;
    var d = UI.pen(b.n, '<div class="yp"></div>', { tick: function () { ciz(); } }), host = d.querySelector('.pi');
    host.style.background = '#1b0f07';
    function ciz() {
      var s = S(), lv = s.l[k] || 0, mx = E.maxLevel(k), q = E.queueOf(k), req = E.req(k), c = E.cost(k), full = lv >= mx;
      var t1 = G.tierOf(Math.max(1, lv)), t2 = G.tierOf(lv + 1), yeni = !full && (lv === 0 || t1 !== t2);
      var h = '<div class="svp">Sv ' + lv + '/' + mx + '</div>';
      if (req.length && !q) h += '<div class="ipucu uy">' + ico('hilal', 22) + 'Önce ' + req.map(function (r) { return E.B[r.key].n + ' Sv ' + r.level; }).join(', ') + ' gerekli.</div>';
      else h += '<div class="ipucu">' + ico('tamga', 22) + esc(b.d) + '</div>';
      h += '<div class="yg">' + (yeni && lv > 0 ? '<div class="iki">' + UI.bImg(k, lv) + '</div><span class="ok">»</span><div class="iki yeni"><span class="serit">YENİ GÖRÜNÜM</span>' + UI.bImg(k, lv + 1) + '</div>' : '<div class="tek">' + UI.bImg(k, Math.max(1, full ? lv : lv + (lv ? 0 : 1))) + '</div>') + '</div>';
      h += '<div class="sva"><span class="yu">' + lv + '</span><div class="orta"><div class="ok3">› › ›</div>' + bar(lv / mx, 'alt') + '</div><span class="yu n">' + (full ? 'MAX' : lv + 1) + '</span></div>';
      h += '<div class="par">';
      if (q) {
        var p = 1 - q.left / q.tot, ks = E.ks();
        h += '<div class="sure">' + ico('kumsaati', 34) + '<div style="flex:1"><small>Yükseltiliyor: Sv ' + (lv + 1) + '</small><div class="zz">' + ft(q.left) + '</div>' + bar(p) + '</div></div>';
        h += '<div class="bas">Hızlandırmalar</div><div class="hz">' + [['m1', '1 dk'], ['m5', '5 dk'], ['m30', '30 dk'], ['h1', '1 sa'], ['h8', '8 sa']].map(function (x) { return '<div class="sat">' + ico('kumsaati', 24) + '<span class="ad">' + x[1] + '<small>×' + (ks[x[0]] || 0) + '</small></span><button class="git al" data-ks="' + x[0] + '"' + (ks[x[0]] ? '' : ' disabled') + '>Kullan</button></div>'; }).join('') +
          '<div class="sat">' + ico('tamga', 24) + '<span class="ad">En iyi karışım</span><button class="git al" data-ksa="1"' + (Object.keys(ks).some(function (t) { return ks[t] > 0; }) ? '' : ' disabled') + '>Hepsi</button></div></div>';
      } else if (full) {
        h += '<div class="bas">En üst seviye</div><div class="sat">' + ico('tamga', 26) + '<span class="ad">' + esc(b.n) + ' tamamlandı.</span></div>';
      } else {
        h += '<div class="bas">Gereksinimler</div>';
        var all = []; if (k !== 'ocak') all.push({ key: 'ocak', level: Math.max(lv + 1, b.u || 0) });
        req.forEach(function (r) { if (!all.some(function (a) { return a.key === r.key; })) all.push(r); });
        if (!all.length) all.push({ key: 'ocak', level: s.l.ocak, ok: 1 });
        all.slice(0, 3).forEach(function (r) { var ok = (s.l[r.key] || 0) >= r.level; h += '<div class="sat"><span style="width:28px;height:28px;flex:none">' + UI.bImg(r.key, r.level).replace('<img', '<img style="width:28px;height:28px;object-fit:contain"') + '</span><span class="ad">' + E.B[r.key].n + ' Sv ' + r.level + '</span>' + (ok ? '<span class="tik">✓</span>' : '<button class="git" data-git="' + r.key + '">Git</button>') + '</div>'; });
        h += '<div class="bas">Maliyet</div><div class="sat mal">' + cost(c) + '</div>';
        h += '<div class="bas">Ödüller</div><div class="mal">' + sonraki(k).map(function (x) { return '<span class="cip">' + ico(x[0], 20) + x[1] + '</span>'; }).join('') + '</div>';
        if (!E.can(k) && !req.length && E.costOk(c) && E.queues().length >= E.builders()) h += '<div style="text-align:center;font:700 12.5px Alegreya Sans;color:#7a2416">Tüm ustalar meşgul</div>';
      }
      h += '</div>';
      // alt düğmeler
      var a = '';
      if (q) {
        a = '<button class="dug mavi" data-yr="1"' + (q.req ? ' disabled' : '') + '>' + (q.req ? 'Yardım istendi · ' + (q.h || 0) : 'Boydan yardım iste') + '</button>';
        a += q.left <= 300 ? '<button class="dug" data-bit="1">Ücretsiz bitir</button>' : '<button class="dug" data-dua="1"' + (E.prayReady() ? '' : ' disabled') + '>Umay Duası' + (E.prayReady() ? '' : '<small>' + ft(s.pray) + '</small>') + '</button>';
      } else if (!full) {
        var can = E.can(k), qok = !can && !req.length && E.costOk(c) && E.queues().length >= E.builders() && (s.ek.uq || []).length < 3 && (s.ek.uq || []).indexOf(k) < 0;
        a = qok ? '<button class="dug mavi" data-sira="1">Sıraya ekle<small>' + (s.ek.uq || []).length + '/3</small></button>' : '<button class="dug" data-up="1"' + (can ? '' : ' disabled') + '>' + (lv ? 'Yükselt' : 'İnşa et') + '<small>' + ft(E.dur(k)) + '</small></button>';
      } else a = '<button class="dug" data-kapat="1">Tamam</button>';
      var html = '<div style="flex:1;display:flex;flex-direction:column;min-height:0">' + h + '</div><div class="alts">' + a + '</div>';
      if (host.__h !== html) { host.__h = html; host.innerHTML = html; }
    }
    ciz();
    host.onclick = function (ev) {
      var t = ev.target.closest('button'); if (!t || t.disabled) return;
      if (t.dataset.up) { if (E.start(k)) { UI.buzz(15); UI.toast(E.B[k].n + ' yükseltmesi başladı'); } }
      else if (t.dataset.sira) { var uq = S().ek.uq = S().ek.uq || []; uq.push(k); E.act(); UI.toast('Sıraya eklendi'); }
      else if (t.dataset.yr) E.askHelp(k);
      else if (t.dataset.dua) E.pray(k);
      else if (t.dataset.bit) E.freeFinish(k);
      else if (t.dataset.ks) E.useKs(k, t.dataset.ks, 1);
      else if (t.dataset.ksa) E.autoKs(k);
      else if (t.dataset.git) return UI.ac.yapi(t.dataset.git);
      ciz();
    };
  };

  /* =================== GÖREVLER =================== */
  var GOICO = { kill: 'kurt', mine: 'topla', build: 'cekic', help: 'yardim', arena: 'boy' };
  function git(go) {
    if (!go) return; if (go.indexOf('b:') === 0) return UI.ac.yapi(go.slice(2));
    if (go === 'insa') return UI.ac.yapi(UI.enIyiYapi());
    if (go === 'eski') { location.href = '../'; return; }
    UI.act(go === 'av' ? 'dunya' : go === 'harita' ? 'dunya' : go);
  }
  UI.git = git;
  UI.ac.gorevler = function (tab) {
    tab = typeof tab === 'string' ? tab : (E.destan() && E.destan().ok ? 'bolum' : (E.daily().some(function (x) { return x.ok; }) && !E.dailyClaimed() ? 'gunluk' : 'bolum'));
    var d = UI.pen('Görevler', '', { tick: function () { ciz(); } }), host = d.querySelector('.pi');
    host.style.background = 'linear-gradient(#e9d5aa,#d9bf8c)';
    function ciz() {
      var s = S(), ds = E.destan(), dl = E.daily(), my = E.meydan(), dOk = dl.filter(function (x) { return x.ok; }).length;
      var h = '<div class="sek">' + [['bolum', 'Bölüm', ds && ds.ok], ['gunluk', 'Günlük', dOk >= 5 && !E.dailyClaimed()], ['meydan', 'Meydan', false]].map(function (x) { return '<button data-sk="' + x[0] + '" class="' + (tab === x[0] ? 'on' : '') + '">' + x[1] + (x[2] ? hilal() : '') + '</button>'; }).join('') + '</div>';
      var a = '';
      if (tab === 'bolum') {
        if (!ds) h += '<div class="bol"><small>DESTAN</small><h3>Destan tamamlandı</h3><p>Tüm bölümleri bitirdin.</p></div>';
        else {
          h += '<div class="bol"><small>' + (ds.i + 1) + '. BÖLÜM</small><h3>' + ['Ateş Sönmesin', 'Hayatta Kal', 'Kılıç Kuşanılır', 'Kurt Kapanı', 'Bilgenin İzi', 'Ocak Harlanır', 'Gölgeler', 'Eski Mağara', 'Bilgeler Meclisi', 'Karşı Saldırı', 'Demir Yumuşar', 'Erlik’in Tahtı'][ds.i] + '</h3><p>' + esc(ds.s) + '</p><div class="noktalar">' + E.QU.map(function (q, i) { return '<i class="' + (i < ds.i ? 'ok' : i === ds.i ? 'su' : '') + '">' + (i < ds.i ? '✓' : '') + '</i>'; }).join('') + '</div></div>';
          h += '<div class="gl"><div class="gs' + (ds.ok ? ' ok' : '') + '"><span class="gi">' + ico('gorev', 32) + '</span><div class="ad">' + esc(ds.t) + bar(ds.v / ds.g) + '</div><span class="sy">' + nf(ds.v) + '/' + nf(ds.g) + '</span>' + (ds.ok ? '<span class="tik">✓</span>' : '<button class="git" data-go="' + ds.go + '">Git</button>') + '</div></div>';
          h += '<div style="padding:0 8px"><div class="bas">Bölüm ödülü</div><div class="mal" style="margin-top:6px">' + ['odun', 'et', 'demir', 'komur'].map(function (r) { return '<span class="cip">' + ico(r, 20) + '+' + nf(ds.rw) + '</span>'; }).join('') + '<span class="cip">' + ico('parca', 20) + '+3</span></div></div>';
          a = '<button class="dug yesil" data-dc="1"' + (ds.ok ? '' : ' disabled') + '>' + (ds.ok ? 'Ödülü al' : 'Görev sürüyor') + '</button>';
        }
      } else if (tab === 'gunluk') {
        h += '<div class="gl">' + dl.map(function (x) { return '<div class="gs' + (x.ok ? ' ok' : '') + '"><span class="gi">' + ico(GOICO[x.k], 32) + '</span><div class="ad">' + esc(x.n) + bar(x.v / x.g) + '</div><span class="sy">' + nf(x.v) + '/' + nf(x.g) + '</span>' + (x.ok ? '<span class="tik">✓</span>' : '<button class="git" data-go="' + x.go + '">Git</button>') + '</div>'; }).join('') + '</div>';
        var r = Math.round(1500 * Math.pow(1.25, s.l.ocak || 1));
        h += '<div style="padding:0 8px"><div class="bas">5/5 sandığı</div><div class="mal" style="margin-top:6px">' + ['odun', 'et', 'demir'].map(function (k) { return '<span class="cip">' + ico(k, 20) + '+' + nf(r) + '</span>'; }).join('') + '<span class="cip">' + ico('kagit', 20) + '+1</span><span class="cip">' + ico('iksir', 20) + '+1</span><span class="cip">' + ico('kumsaati', 20) + '+1</span></div></div>';
        a = '<button class="dug yesil" data-gc="1"' + (dOk >= 5 && !E.dailyClaimed() ? '' : ' disabled') + '>' + ico('sandik', 24) + (E.dailyClaimed() ? 'Sandık alındı' : dOk + '/5 görev tamamlandı') + '</button>';
      } else {
        if (!my) h += '<div class="gl"><div class="gs"><span class="gi">' + ico('tamga', 32) + '</span><div class="ad">Bugünün meydan görevleri eski oyunda açılır.</div><button class="git" data-go="eski">Aç</button></div></div>';
        else h += '<div class="gl">' + my.map(function (x) { return '<div class="gs' + (x.ok ? ' ok' : '') + '"><span class="gi">' + ico('kurt', 32) + '</span><div class="ad">' + esc(x.n) + bar(x.v / x.g) + '</div><span class="sy">' + x.v + '/' + x.g + '</span>' + (x.ok ? '<span class="tik">✓</span>' : '<button class="git" data-go="harita">Git</button>') + '</div>'; }).join('') + '</div><div class="odl" style="color:#5a3a1a">Görev biter bitmez ödül gelir. Üçü bitince ek sandık.</div>';
        a = '<button class="dug" data-kapat="1">Tamam</button>';
      }
      var html = '<div style="flex:1;min-height:0;display:flex;flex-direction:column">' + h + '</div><div class="alts">' + a + '</div>';
      if (host.__h !== html) { host.__h = html; host.innerHTML = html; }
    }
    ciz();
    host.onclick = function (ev) {
      var t = ev.target.closest('button'); if (!t || t.disabled) return;
      if (t.dataset.sk) { tab = t.dataset.sk; ciz(); }
      else if (t.dataset.go) git(t.dataset.go);
      else if (t.dataset.dc) { var r = E.destanClaim(); if (r) { UI.toast('Bölüm ödülü alındı'); ['odun', 'et', 'demir'].forEach(function (k) { UI.fly(t, k, r); }); } ciz(); }
      else if (t.dataset.gc) { var x = E.dailyClaim(); if (x) { UI.toast('Günlük sandık açıldı'); ['odun', 'et', 'demir'].forEach(function (k) { UI.fly(t, k, x.r); }); } ciz(); }
    };
  };
  UI.ac.destan = function () { var d = E.destan(); if (d && !d.ok) return git(d.go); UI.ac.gorevler(d ? 'bolum' : 'gunluk'); };

  /* =================== KAHRAMANLAR ve KURT =================== */
  var TARIH = ['Hun hükümdarı (MÖ 209–174). Onlu ordu düzenini kurdu.', 'Saka (Massaget) kraliçesi. MÖ 530’da Pers kralı Kiros’u yendi.', 'Büyük Selçuklu sultanı. 1071’de Malazgirt’te Bizans’ı yendi.', 'Osmanlı padişahı. 1453’te İstanbul’u fethetti.', 'Millî Mücadele kahramanı, kadın müfreze komutanı.', 'Timurlu Devleti’nin kurucusu (1336–1405).', 'Moğol İmparatorluğu’nun kurucusu (1162–1227).', 'Oğuz Kağan Destanı’nın efsanevi hükümdarı.', 'Yuan Hanedanı’nın kurucusu (1215–1294).'];
  UI.ac.kahramanlar = function (opt) {
    var tab = opt === 'kurt' ? 'kurt' : 'kah', sel = -1;
    var d = UI.pen('Kahramanlar', '', { tick: function () { ciz(); } }), host = d.querySelector('.pi');
    host.style.background = 'radial-gradient(ellipse at 50% 20%,#4a2414,#1c0e07 70%)';
    function ciz() {
      var s = S(), h = '<div class="sek">' + [['kah', 'Kahramanlar', E.HH.some(function (x, i) { return s.hs[i] < 5 && s.hc[i] >= E.HSC[s.hs[i]]; })], ['kurt', 'Kurt', petHazir()]].map(function (x) { return '<button data-sk="' + x[0] + '" class="' + (tab === x[0] ? 'on' : '') + '">' + x[1] + (x[2] ? hilal() : '') + '</button>'; }).join('') + '</div>', a = '';
      if (tab === 'kah' && sel < 0) {
        h += '<div class="hiz">' + E.HH.map(function (x, i) { var st = s.hs[i], nx = E.HSC[st], can = st < 5 && s.hc[i] >= nx; return '<button class="hk' + (st ? ' r' + Math.min(5, st) : ' yok') + '" data-h="' + i + '">' + (can ? '<span class="yeso"></span>' : '') + '<img src="' + G.kahraman(E.HHK[i]) + '" alt=""><span class="hn">' + esc(x.n) + '<span class="yz">' + '★'.repeat(st) + '<span style="opacity:.3">' + '★'.repeat(5 - st) + '</span></span></span><span class="kb">' + bar(st >= 5 ? 1 : s.hc[i] / nx, can ? '' : 'alt') + '</span></button>'; }).join('') + '</div>';
        h += '<div class="odl">' + ico('kart', 20) + 'Kartlar Sv ' + E.cardMin() + '+ canavarlardan ve Nevruz’dan düşer.</div>';
        a = '<button class="dug" data-kapat="1">Tamam</button>';
      } else if (tab === 'kah') {
        var i = sel, x = E.HH[i], st = s.hs[i], nx = E.HSC[st], can = st < 5 && s.hc[i] >= nx;
        var es = E.PAIRS.filter(function (p) { return p[0] === i || p[1] === i; }).map(function (p) { var o = p[0] === i ? p[1] : p[0], on = s.hs[i] >= 1 && s.hs[o] >= 1; return '<span class="' + (on ? 'on' : '') + '">' + esc(E.HH[o].n) + ' +%6</span>'; }).join('');
        h += '<div class="hd"><div class="bp"><img src="' + G.kahraman(E.HHK[i]) + '" alt=""></div><h3>' + esc(x.n) + '</h3><div class="yz">' + '★'.repeat(st) + '<span style="opacity:.3">' + '★'.repeat(5 - st) + '</span></div>' +
          '<div class="cip">' + ico('tamga', 20) + esc(x.t) + ' +%' + (4 * st) + '</div><div class="ikili">' + es + '</div>' +
          '<div style="width:min(80vw,300px)"><div style="display:flex;justify-content:space-between;font:700 12px Alegreya Sans;color:#e9d7b0"><span>' + ico('kart', 16) + ' Kart</span><span>' + (st >= 5 ? 'Kadim Zirve' : s.hc[i] + '/' + nx) + '</span></div>' + bar(st >= 5 ? 1 : s.hc[i] / nx, can ? '' : 'alt') + '</div>' +
          '<div style="font:600 12.5px Alegreya Sans;color:#cdb98e;text-align:center;max-width:320px">' + esc(TARIH[i]) + '</div></div>';
        a = '<button class="dug mavi" data-gerih="1">‹ Liste</button><button class="dug" data-hu="' + i + '"' + (can ? '' : ' disabled') + '>' + (st >= 5 ? 'En üst' : (st ? 'Yıldız yükselt' : 'Yücelt')) + '<small>' + (st >= 5 ? '' : nx + ' kart') + '</small></button>';
      } else {
        var p = s.pt, ok = E.petOk(), v = p.adv, pet = Math.max(0, ((s.en.pet || 0) - Date.now()) / 1000), fc = E.ptFeedC();
        h += '<div class="kz"><img class="kr" src="' + G.kurt(p.lv) + '" alt=""><h3>Bozkurt Yavrusu · Sv ' + p.lv + '/10</h3>';
        if (!ok) h += '<div class="ipucu uy">' + ico('kilit', 22) + 'Kutsal Ocak Sv 4’te boya katılır.</div>';
        else {
          h += '<div class="xb">' + (p.lv < 10 ? bar(p.xp / E.ptNeed(), 'mavi') + '<div style="text-align:center;font:700 11px Alegreya Sans;color:#b9c9e6">' + nf(p.xp) + '/' + nf(E.ptNeed()) + '</div>' : '') + '</div>';
          h += '<div class="sat">' + ico('et', 26) + '<span class="ad">Besle<small>+10 tecrübe</small></span><span class="' + (s.r.et >= fc ? 'cg' : 'cr') + '" style="font-weight:800">' + nf(fc) + '</span><button class="git al" data-pf="1"' + (p.lv >= 10 || s.r.et < fc ? ' disabled' : '') + '>Besle</button></div>';
          h += '<div class="sat">' + ico('enerji', 26) + '<span class="ad">Uluma<small>+' + E.ptAmt() + ' enerji · günde 1</small></span><button class="git ye" data-pu="1"' + (v || pet > 0 || s.en.v >= E.EN.max ? ' disabled' : '') + '>' + (pet > 0 ? ft(pet) : 'Kullan') + '</button></div>';
          if (v) { var left = Math.max(0, (v.end - Date.now()) / 1000), A = E.PADV[v.k]; h += '<div class="sat">' + ico('dunya', 26) + '<span class="ad">' + A.n + '<small>' + (left > 0 ? 'Dönüşe ' + ft(left) : 'Döndü') + '</small>' + bar(1 - left / (A.h * 3600), 'mavi') + '</span><button class="git al" data-pc="1"' + (left > 0 ? ' disabled' : '') + '>Al</button></div>'; }
          else h += E.PADV.map(function (A, j) { var lk = p.lv < A.lv; return '<div class="sat">' + ico('dunya', 26) + '<span class="ad">' + A.n + ' · ' + A.h + ' sa<small>' + (A.c ? 'Kaynak, güveç, kart' : 'Kaynak, güveç') + '</small></span><button class="git" data-pg="' + j + '"' + (lk ? ' disabled' : '') + '>' + (lk ? 'Sv ' + A.lv : 'Gönder') + '</button></div>'; }).join('');
        }
        var sup = Math.max(0, (s.en.sup - Date.now()) / 1000);
        h += '<div class="sat">' + ico('guvec', 26) + '<span class="ad">Ocak Ziyafeti · Et Güveci ×' + (s.en.it || 0) + '<small>+40 enerji / 6 sa · güveç +10</small></span><button class="git ye" data-zf="1"' + (sup > 0 || s.en.v >= E.EN.max ? ' disabled' : '') + '>' + (sup > 0 ? ft(sup) : 'Ziyafet') + '</button><button class="git" data-gv="1"' + (!s.en.it || s.en.v >= E.EN.max ? ' disabled' : '') + '>Güveç</button></div></div>';
        a = '<span class="pil en" style="align-self:center">' + ico('enerji', 20) + '<b>' + Math.floor(s.en.v) + '/' + E.EN.max + '</b></span><button class="dug" data-kapat="1">Tamam</button>';
      }
      var html = '<div style="flex:1;min-height:0;display:flex;flex-direction:column">' + h + '</div><div class="alts">' + a + '</div>';
      if (host.__h !== html) { host.__h = html; host.innerHTML = html; }
    }
    ciz();
    host.onclick = function (ev) {
      var t = ev.target.closest('button'); if (!t || t.disabled) return; var dd = t.dataset;
      if (dd.sk) { tab = dd.sk; sel = -1; } else if (dd.h) sel = +dd.h; else if (dd.gerih) sel = -1;
      else if (dd.hu) { if (E.heroUp(+dd.hu)) { UI.buzz([20, 30, 20]); UI.toast(E.HH[+dd.hu].n + ' yıldız kazandı'); } }
      else if (dd.pf) E.ptFeed(); else if (dd.pu) { if (E.ptUse()) UI.toast('+' + E.ptAmt() + ' enerji'); }
      else if (dd.pg) E.ptGo(+dd.pg); else if (dd.pc) { var r = E.ptClaim(); if (r) UI.toast('Kurt ganimetle döndü'); }
      else if (dd.zf) E.enSup(); else if (dd.gv) E.enItem();
      ciz();
    };
  };
  function petHazir() { var s = S(); return E.petOk() && ((s.pt.adv && Date.now() >= s.pt.adv.end) || (!s.pt.adv && Date.now() >= (s.en.pet || 0) && s.en.v < E.EN.max)); }
  UI.ac.kurt = function () { UI.ac.kahramanlar('kurt'); };

  /* =================== HOŞ GELDİN (çevrim dışı gelir) =================== */
  UI.ac.hosgeldin = function () {
    var a = E.away; if (!a) return; var d = document.createElement('div'); d.className = 'kut'; d.style.background = 'rgba(10,6,3,.8)';
    d.innerHTML = '<div style="width:min(92vw,360px);border-radius:12px;overflow:hidden;border:2px solid var(--rim);background:#e9d5aa;color:var(--ink);box-shadow:0 10px 30px #000"><div class="pb" style="padding-top:0"><div class="bi" style="font-size:18px">Tekrar hoş geldin</div></div><div class="par"><div class="bas">Çevrim dışı süre</div><div style="text-align:center;font:800 18px Alegreya Sans">' + ft(a.d) + ' <small style="font-weight:600">/ en çok 12 sa</small></div>' + bar(a.d / 43200, 'alt') + '<div class="bas">Çevrim dışı gelir</div><div class="mal">' + ['odun', 'et', 'demir', 'komur'].filter(function (r) { return a.dr[r]; }).map(function (r) { return '<span class="cip">' + ico(r, 22) + (a.dr[r] >= 0 ? '+' : '') + nf(a.dr[r]) + '</span>'; }).join('') + '</div>' + (a.up.length ? '<div class="bas">Biten yapılar</div><div class="mal">' + a.up.map(function (u) { return '<span class="cip">' + E.B[u[0]].n + ' Sv ' + u[1] + '</span>'; }).join('') + '</div>' : '') + '</div><div class="alts" style="padding-bottom:10px"><button class="dug yesil" data-tm="1">Tamam</button></div></div>';
    document.getElementById('oyun').appendChild(d); d.querySelector('[data-tm]').onclick = function () { d.remove(); };
  };
})(window);
