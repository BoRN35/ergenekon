/* Ergenekon yeni — Posta, Boy, Dilek Kuyusu, Çanta. */
(function (W) {
  'use strict';
  var nf = E.nf, ft = E.ft, ico = G.ico, esc = UI.esc;
  function S() { return E.S(); }
  function tarih(t) { var d = new Date(t); return d.getDate() + '.' + (d.getMonth() + 1) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  function hilal() { return '<span class="hilal">' + ico('hilal', 18) + '</span>'; }
  function cerceve(host, html) { if (host.__h !== html) { host.__h = html; host.innerHTML = html; } }

  /* =================== POSTA =================== */
  var MK = [['hep', 'Tümü'], ['sv', 'Savaş'], ['ra', 'Ödül'], ['si', 'Sistem']];
  function rwList(rw) {
    if (!rw) return []; var o = []; if (rw.r) for (var k in rw.r) if (rw.r[k] > 0) o.push([k, rw.r[k]]);
    if (rw.sp) o.push(['tamga', rw.sp]); if (rw.ud) o.push(['toz', rw.ud]);
    var c = (rw.cards || []).reduce(function (a, b) { return a + (b || 0); }, 0); if (c) o.push(['kart', c]);
    var p = (rw.sh || []).reduce(function (a, b) { return a + (b || 0); }, 0); if (p) o.push(['parca', p]);
    if ((rw.items || []).length) o.push(['canta', rw.items.length]);
    if (rw.ek) { if (rw.ek.mat) for (var m in rw.ek.mat) o.push([m, rw.ek.mat[m]]); if (rw.ek.ks) o.push(['kumsaati', Object.keys(rw.ek.ks).reduce(function (a, b) { return a + rw.ek.ks[b]; }, 0)]); if (rw.ek.ei) o.push(['iksir', (rw.ek.ei.s || 0) + (rw.ek.ei.l || 0)]); }
    return o;
  }
  UI.ac.posta = function () {
    var tab = 'hep', pg = 0, open = -1;
    var d = UI.pen('Posta', ''), host = d.querySelector('.pi'); host.style.background = 'linear-gradient(#e9d5aa,#d9bf8c)';
    function ciz() {
      var s = S(), mb = s.mb || [], L = mb.map(function (m, i) { return { m: m, i: i }; }).filter(function (o) { return tab === 'hep' || E.mailCat(o.m) === tab; }), per = Math.max(4, Math.floor((innerHeight - 240) / 64)), pc = Math.max(1, Math.ceil(L.length / per)); pg = Math.min(pg, pc - 1);
      var h = '<div class="sek">' + MK.map(function (x) { var un = mb.filter(function (m) { return (x[0] === 'hep' || E.mailCat(m) === x[0]) && (!m.rd || E.mailHas(m)); }).length; return '<button data-sk="' + x[0] + '" class="' + (tab === x[0] ? 'on' : '') + '">' + x[1] + (un ? '<i class="mrz">' + un + '</i>' : '') + '</button>'; }).join('') + '</div>', a;
      if (open >= 0 && mb[open]) {
        var m = mb[open], rl = rwList(m.rw);
        h += '<div class="gl"><div class="mkart"><div class="mb-u"><span class="gi">' + ico(m.f === 'Kam' ? 'tamga' : { sv: 'boy', ra: 'sandik', si: 'posta' }[E.mailCat(m)], 34) + '</span><div><b>' + esc(m.t) + '</b><small>' + esc(m.f || 'Sistem') + ' · ' + tarih(m.d) + '</small></div></div>' + (m.body ? '<p>' + esc(m.body) + '</p>' : '') + (rl.length ? '<div class="bas">Ekler</div><div class="mal">' + rl.map(function (x) { return '<span class="cip">' + ico(x[0], 22) + '+' + nf(x[1]) + '</span>'; }).join('') + '</div>' : '') + '</div></div>';
        a = '<button class="dug mavi" data-lst="1">‹ Liste</button>' + (rl.length ? '<button class="dug" data-al="' + open + '">Al</button>' : '<button class="dug" data-sil="' + open + '">Sil</button>');
      } else {
        var sl = L.slice(pg * per, pg * per + per);
        h += '<div class="gl">' + (sl.length ? sl.map(function (o) { var m = o.m, has = E.mailHas(m); return '<button class="gs mrow' + (m.rd ? ' rd' : '') + '" data-mo="' + o.i + '"><span class="gi">' + ico({ sv: 'boy', ra: 'sandik', si: 'posta' }[E.mailCat(m)], 30) + '</span><div class="ad">' + esc(m.t) + '<small>' + esc(m.f || 'Sistem') + ' · ' + tarih(m.d) + '</small></div>' + (has ? ico('sandik', 26) : '') + (!m.rd ? '<i class="nok"></i>' : '') + '</button>'; }).join('') : '<div class="gs"><span class="gi">' + ico('posta', 30) + '</span><div class="ad">Posta kutusu boş</div></div>') + '</div>';
        if (pc > 1) h += '<div class="odl" style="color:#5a3a1a"><button class="git" data-pg="-1"' + (pg ? '' : ' disabled') + '>‹</button> ' + (pg + 1) + ' / ' + pc + ' <button class="git" data-pg="1"' + (pg < pc - 1 ? '' : ' disabled') + '>›</button></div>';
        var any = mb.some(function (m) { return !m.rd || E.mailHas(m); }), del = mb.some(function (m) { return m.rd && !E.mailHas(m); });
        a = '<button class="dug mavi" data-ds="1"' + (del ? '' : ' disabled') + '>Okunanları sil</button><button class="dug" data-ta="1"' + (any ? '' : ' disabled') + '>Tümünü oku ve al</button>';
      }
      cerceve(host, '<div style="flex:1;min-height:0;display:flex;flex-direction:column">' + h + '</div><div class="alts">' + a + '</div>');
    }
    ciz();
    host.onclick = function (ev) {
      var t = ev.target.closest('button'); if (!t || t.disabled) return; var dd = t.dataset;
      if (dd.sk) { tab = dd.sk; pg = 0; open = -1; } else if (dd.pg) pg += +dd.pg;
      else if (dd.mo) { open = +dd.mo; E.mailRead(open); } else if (dd.lst) open = -1;
      else if (dd.al) { E.mailCollect(+dd.al); UI.toast('Ekler alındı'); open = -1; }
      else if (dd.sil) { S().mb.splice(+dd.sil, 1); E.act(); open = -1; }
      else if (dd.ta) { E.mailAll(); UI.toast('Tüm posta alındı'); } else if (dd.ds) E.mailCleanRead();
      ciz();
    };
  };

  /* =================== BOY =================== */
  var TAMGA = ['M20 6v28M12 12c4 4 12 4 16 0M13 30h14', 'M8 20h24M20 8v24M12 12l16 16', 'M20 6l12 14-12 14L8 20z', 'M10 10h20v20H10zM20 10v20', 'M8 30L20 8l12 22M14 22h12'];
  function tamga(i, sz) { return '<svg viewBox="0 0 40 40" width="' + sz + '" height="' + sz + '"><circle cx="20" cy="20" r="18" fill="#7a2a1c" stroke="#e8c66a" stroke-width="2"/><path d="' + TAMGA[(i < 0 ? 0 : i) % TAMGA.length] + '" stroke="#f3e6c8" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  var RUT = { han: 'Han', bey: 'Bey', alp: 'Alp', er: 'Er' };
  UI.ac.boy = function () {
    var tab = 'ana', yaz = '';
    var d = UI.pen('Boy', '', { tick: function () { if (tab !== 'soh') ciz(); } }), host = d.querySelector('.pi'); host.style.background = 'linear-gradient(#e9d5aa,#d9bf8c)';
    function ciz() {
      var s = S(), b = E.boy(), mem = E.boyMem(), g = E.gifts(), gl = E.giftLv(), hn = E.helpN(), a = '<button class="dug" data-kapat="1">Tamam</button>';
      var h = '<div class="sek">' + [['ana', 'Boy', g > 0 || hn > 0], ['uye', 'Üyeler', false], ['soh', 'Sohbet', false]].map(function (x) { return '<button data-sk="' + x[0] + '" class="' + (tab === x[0] ? 'on' : '') + '">' + x[1] + (x[2] ? hilal() : '') + '</button>'; }).join('') + '</div>';
      if (tab === 'ana') {
        h += '<div class="bkart">' + tamga(b.tg, 70) + '<div><b>' + esc(b.n || 'Kök Böri') + '</b><small>' + RUT[b.rank || 'han'] + ' · ' + esc(s.ek.nm || 'Alp Tonga') + '</small><div class="cipler"><span class="cip">' + ico('guc', 16) + nf(s.al.pow || 0) + '</span><span class="cip">' + ico('kahraman', 16) + (mem.length + 1) + '</span><span class="cip">' + ico('tamga', 16) + 'Bölge ' + s.al.terr.length + '</span></div></div></div>';
        h += '<div class="bgrid">' +
          '<button class="bk" data-yrd="1"' + (hn ? '' : ' disabled') + '>' + ico('yardim', 40) + '<b>Yardım et</b><small>' + (hn ? hn + ' istek' : 'İstek yok') + '</small>' + (hn ? hilal() : '') + '</button>' +
          '<button class="bk" data-hd="1"' + (g ? '' : ' disabled') + '>' + ico('sandik', 40) + '<b>Ocak hediyesi</b><small>' + g + '/25 · Sv ' + gl.lv + '</small>' + (g ? hilal() : '') + '</button>' +
          '<button class="bk" data-sk="uye">' + ico('kahraman', 40) + '<b>Üyeler</b><small>' + (mem.length + 1) + ' kişi</small></button>' +
          '<button class="bk" data-sk="soh">' + ico('posta', 40) + '<b>Sohbet</b><small>' + ((s.chat || []).length) + ' mesaj</small></button>' +
          '<button class="bk" data-esk="1">' + ico('ilim', 40) + '<b>Ocak ilimleri</b><small>Eski ekranda</small></button>' +
          '<button class="bk" data-esk="1">' + ico('boy', 40) + '<b>Akıncı</b><small>Eski ekranda</small></button></div>';
        h += '<div class="odl" style="color:#5a3a1a">' + ico('tamga', 18) + 'Boy üyeleri şimdilik yapay; gerçek oyuncular sunucu bağlanınca gelir.</div>';
      } else if (tab === 'uye') {
        var L = [{ n: s.ek.nm || 'Alp Tonga', r: b.rank || 'han', me: 1 }].concat(mem.map(function (n) { return { n: n, r: (b.ranks || {})[n] || 'er' }; }));
        h += '<div class="gl">' + L.slice(0, 9).map(function (x, i) { return '<div class="gs' + (x.me ? ' ok' : '') + '"><span class="gi">' + (x.me ? '<img src="' + G.alp() + '" style="width:40px;height:40px;object-fit:cover;border-radius:6px">' : ico('kahraman', 30)) + '</span><div class="ad">' + esc(x.n) + '<small>' + RUT[x.r] + '</small></div><span class="sy">' + (x.me ? 'Sen' : '') + '</span></div>'; }).join('') + '</div>';
      } else {
        var C = (s.chat || []).slice(-9);
        h += '<div class="gl sohl">' + C.map(function (m) { return '<div class="msj' + (m.me ? ' ben' : '') + '"><b>' + esc(m.u) + '</b> ' + esc(m.txt) + (m.tr ? '<small>' + esc(m.tr) + '</small>' : '') + '</div>'; }).join('') + '</div>';
        a = '<input class="yaz" maxlength="120" placeholder="Boya yaz" value="' + esc(yaz) + '"><button class="dug" data-gnd="1">Gönder</button>';
      }
      cerceve(host, '<div style="flex:1;min-height:0;display:flex;flex-direction:column">' + h + '</div><div class="alts">' + a + '</div>');
    }
    ciz();
    host.oninput = function (ev) { if (ev.target.classList.contains('yaz')) yaz = ev.target.value; };
    host.onclick = function (ev) {
      var t = ev.target.closest('button'); if (!t || t.disabled) return; var dd = t.dataset;
      if (dd.sk) tab = dd.sk;
      else if (dd.yrd) { var n = E.helpAll(); if (n) UI.toast(n + ' boydaşa yardım edildi'); }
      else if (dd.hd) { var r = E.giftClaim(); if (r) UI.toast('Hediye: ' + (r.r ? '+' + nf(r.r) + ' kaynak ' : '') + (r.k ? '+' + r.k + ' kağıt ' : '') + (r.c ? '+' + r.c + ' kart ' : '') + (r.e ? '+' + r.e + ' enerji' : '')); }
      else if (dd.gnd) { E.chatSend(yaz); yaz = ''; host.__h = ''; }
      else if (dd.esk) { location.href = '../'; return; }
      ciz();
    };
  };

  /* =================== DİLEK KUYUSU =================== */
  UI.ac.kuyu = function () {
    var son = null;
    var d = UI.pen('Dilek Kuyusu', '', { tick: function () { ciz(); } }), host = d.querySelector('.pi'); host.style.background = '#13202a';
    function ciz() {
      var due = E.wellDue(), now = new Date(), gece = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1), kalan = (gece - now) / 1000;
      var img = G.yeni('arka_kuyu'), pv = E.wellPreview();
      var h = '<div class="svp">Günde bir dilek</div><div class="kuyu" style="' + (img ? 'background-image:url(' + img + ')' : '') + '"><div class="kuyu-r">' + UI.pImg('kuyu') + (due ? '<span class="parilti"></span>' : '') + '</div></div>';
      h += '<div class="par">';
      if (son) h += '<div class="bas">Dileğin kabul oldu</div><div class="mal">' + son.map(function (x) { return '<span class="cip">' + ico(x[0], 22) + '+' + nf(x[1]) + '</span>'; }).join('') + '</div>';
      else if (due) h += '<div class="bas">Bugünün dileği</div><div class="mal">' + pv.map(function (x) { return '<span class="cip">' + ico(x[0], 22) + '+' + nf(x[1]) + '</span>'; }).join('') + '<span class="cip">' + ico('kagit', 22) + '+1–2</span><span class="cip">' + ico('safir', 22) + 'şans</span></div>';
      else h += '<div class="bas">Yarın yeniden</div><div style="text-align:center;font:800 26px Alegreya Sans;color:#2b1a0c">' + ft(kalan) + '</div>';
      h += '<div class="odl" style="color:#5a3a1a">' + ico('tamga', 18) + 'Ödül Kutsal Ocak seviyesiyle büyür. Hak birikmez.</div></div>';
      var a = due ? '<button class="dug" data-dl="1">Dilek dile</button>' : '<button class="dug" data-kapat="1">Tamam</button>';
      cerceve(host, '<div style="flex:1;min-height:0;display:flex;flex-direction:column">' + h + '</div><div class="alts">' + a + '</div>');
    }
    ciz();
    host.onclick = function (ev) { var t = ev.target.closest('button'); if (!t || t.disabled) return; if (t.dataset.dl) { son = E.wellClaim(); if (son) { UI.buzz([20, 40, 20]); son.forEach(function (x) { if (['odun', 'et', 'demir', 'komur'].indexOf(x[0]) >= 0) UI.fly(t, x[0], x[1]); }); } ciz(); } };
  };

  /* =================== ÇANTA =================== */
  UI.ac.canta = function () {
    var tab = 'esya', pick = -1;
    var d = UI.pen('Çanta', ''), host = d.querySelector('.pi'); host.style.background = 'radial-gradient(ellipse at 50% 20%,#3a2414,#160c06 70%)';
    function ciz() {
      var s = S(), c = s.ch, h = '<div class="sek">' + [['esya', 'Eşya'], ['mal', 'Malzeme']].map(function (x) { return '<button data-sk="' + x[0] + '" class="' + (tab === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>', a = '<button class="dug" data-kapat="1">Tamam</button>';
      if (tab === 'esya') {
        h += '<div class="ciz">' + c.inv.map(function (x, i) { var b = E.better(x) > 0; return '<button class="cz' + (pick === i ? ' sec' : '') + '" data-i="' + i + '" style="--rc:' + E.RCOL[x.r] + '"><img src="' + G.esya(x.s) + '" alt="">' + (x.p ? '<span class="pp">+' + x.p + '</span>' : '') + '<span class="sl">' + x.L + '</span>' + (b ? '<span class="yesil-ok"></span>' : '') + '</button>'; }).join('') + Array(Math.max(0, E.invMax() - c.inv.length) + 1).join('<span class="cz bos"></span>') + '</div>';
        h += '<div class="odl">' + c.inv.length + '/' + E.invMax() + ' · ' + ico('toz', 18) + nf(s.ud) + '</div>';
        if (pick >= 0 && c.inv[pick]) { var x = c.inv[pick], df = E.better(x); h += '<div class="sat" style="margin:0 10px"><img src="' + G.esya(x.s) + '" width="34" height="34"><span class="ad" style="color:' + E.RCOL[x.r] + '">' + esc(x.n) + ' · Sv ' + x.L + '<small>' + E.RR[x.r] + ' · ' + nf(E.ev(x)) + ' · ' + (df > 0 ? '<span class="cg">▲ ' + nf(df) + '</span>' : '<span class="cr">▼ ' + nf(-df) + '</span>') + '</small></span></div>'; a = '<button class="dug mavi" data-er="' + pick + '">Erit +' + E.dust(x) + '</button><button class="dug" data-gy="' + pick + '">Kuşan</button>'; }
      } else {
        var m = s.ek.dm.mat, ks = E.ks(), ei = s.ek.ei || {};
        var L = [['kagit', 'Yükseltme Kağıdı', m.kagit], ['safir', 'Safir', m.safir], ['opal', 'Opal', m.opal], ['toz', 'Ustalık Tozu', s.ud], ['guvec', 'Et Güveci', s.en.it], ['iksir', 'Enerji iksiri', (ei.s || 0) + (ei.l || 0)], ['kart', 'Kahraman kartı', s.hc.reduce(function (a, b) { return a + b; }, 0)], ['kitap', 'Yetenek kitabı', Object.keys(s.bk).reduce(function (a, k) { return a + (s.bk[k] || 0); }, 0)], ['kumsaati', 'Kum saati', Object.keys(ks).reduce(function (a, k) { return a + ks[k]; }, 0)], ['celik', 'Çelik', s.r.celik], ['kor', 'Kor', s.r.kristal], ['parca', 'Bilge parçası', s.hr.reduce(function (a, h) { return a + h.sh; }, 0)]];
        h += '<div class="ciz mal3">' + L.map(function (x) { return '<div class="cz" style="--rc:#8a6026">' + ico(x[0], 44) + '<span class="sl">' + nf(x[2] || 0) + '</span><small>' + x[1] + '</small></div>'; }).join('') + '</div>';
      }
      cerceve(host, '<div style="flex:1;min-height:0;display:flex;flex-direction:column">' + h + '</div><div class="alts">' + a + '</div>');
    }
    ciz();
    host.onclick = function (ev) { var t = ev.target.closest('button'); if (!t || t.disabled) return; var dd = t.dataset; if (dd.sk) { tab = dd.sk; pick = -1; } else if (dd.i) pick = +dd.i; else if (dd.er) { var v = E.melt(+dd.er); UI.toast('+' + v + ' Ustalık Tozu'); pick = -1; } else if (dd.gy) { E.equip(+dd.gy); UI.toast('Kuşanıldı'); pick = -1; } ciz(); };
  };
  UI.ac.profil = function () { UI.ac.canta(); };
})(window);
