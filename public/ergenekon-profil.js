/* Ergenekon — Ek Paket 2, 2. adım: profil ve emek görünürlüğü. Claude, 18 Kasım 2026.
   58 vitrin · 59 başarım çerçeveleri · 60 Destan Defteri · 94 kişisel rekorlar · 71 güç dökümü
   57 kahraman tarih kartı · 93 kahraman sözleri/olayları (yalnızca kaynağı belli olanlar)
   Kalıcı: s.ek.fr (seçili çerçeve), s.ek.dd (defter), s.ek.ddk, s.ek.rk (rekorlar) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekPrf) return; W.__ekPrf = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function kut() { try { return W.ergenekonIlerleme.kut().lv; } catch (e) { return 0; } }
  function plusOf(x) { return (x && (x.p || 0)) || 0; }
  function bestItem() { var eq = (S().ch && S().ch.eq) || {}, b = null; for (var k in eq) if (eq[k] && (!b || plusOf(eq[k]) > plusOf(b.x))) b = { k: k, x: eq[k] }; return b; }
  function heroPic(i, w) { try { return W.hPic(i, w); } catch (e) { return (W.HH[i] || {}).e || '?'; } }
  function avatar() { var im = document.querySelector('#pfb img'); return im ? '<img src="' + im.src + '" alt="">' : '<span>☪</span>'; }

  /* ---------- 59) çerçeveler ---------- */
  var FR = [
    { id: '', n: 'Sade', e: '◯', ok: function () { return true; } },
    { id: 'o10', n: 'Ocak 10', e: '🔥', ok: function () { return (S().l.ocak || 0) >= 10; } },
    { id: 'o20', n: 'Ocak 20', e: '🔥', ok: function () { return (S().l.ocak || 0) >= 20; } },
    { id: 'o30', n: 'Ocak 30', e: '🔥', ok: function () { return (S().l.ocak || 0) >= 30; } },
    { id: 'o40', n: 'Ocak 40', e: '👑', ok: function () { return (S().l.ocak || 0) >= 40; } },
    { id: 'yz', n: 'İlk 5 yıldız', e: '⭐', ok: function () { return (S().hs || []).some(function (v) { return v >= 5; }); } },
    { id: 'tg', n: 'İlk destan canavarı', e: '👹', ok: function () { return !!ek().ddk && !!ek().ddk.db1; } },
    { id: 'op', n: 'İlk Opal', e: '🔮', ok: function () { return !!ek().ddk && !!ek().ddk.op1; } },
    { id: 'ds', n: 'Ergenekon’dan çıkış', e: '☀️', ok: function () { return ((ek().ds || {}).s || 0) >= 30; } },
    { id: 'kg', n: 'Kurgan avcısı', e: '⛰', ok: function () { var kg = ek().kg || {}; return Object.keys(kg).filter(function (k) { return kg[k].done; }).length >= 6; } }
  ];
  function frameCls() { var f = ek().fr || ''; var d = FR.find(function (x) { return x.id === f; }); return d && d.id && d.ok() ? 'ek-fr-' + d.id : ''; }
  function applyFrame() {
    var pf = document.getElementById('pfb'); if (!pf) return;
    var c = frameCls(); FR.forEach(function (f) { if (f.id) pf.classList.toggle('ek-fr-' + f.id, c === 'ek-fr-' + f.id); });
  }
  function openFrames() {
    var cur = ek().fr || '';
    var body = '<div class="fr-grid">' + FR.map(function (f) { var ok = f.ok(); return '<button type="button" class="fr-b' + (cur === f.id ? ' on' : '') + (ok ? '' : ' lk') + '" data-fr="' + f.id + '"' + (ok ? '' : ' disabled') + '><span class="fr-av ' + (f.id ? 'ek-fr-' + f.id : '') + '">' + avatar() + '</span><small>' + (ok ? '' : '🔒 ') + f.n + '</small></button>'; }).join('') + '</div>';
    var o = popup('Çerçeve', body, 'fr-card');
    o.addEventListener('click', function (ev) { var b = ev.target.closest('[data-fr]'); if (!b || b.disabled) return; ek().fr = b.dataset.fr; save(); applyFrame(); o.remove(); rePf(); });
  }

  /* ---------- 60) Destan Defteri ---------- */
  function note(key, e, txt, first) {
    var x = ek(); x.ddk = x.ddk || {}; x.dd = x.dd || [];
    if (x.ddk[key]) return; x.ddk[key] = 1; x.dd.unshift({ t: first ? 0 : Date.now(), e: e, x: txt }); if (x.dd.length > 60) x.dd.length = 60;
    if (!first) toast(e + ' ' + txt);
  }
  var firstScan = true;
  function scan() {
    var s = S(), x = ek(), f = firstScan && !(x.dd && x.dd.length), o = s.l.ocak || 1, m = (x.dm && x.dm.mat) || {};
    [5, 10, 15, 20, 25, 30, 35, 40].forEach(function (n) { if (o >= n) note('oc' + n, '🔥', 'Kutsal Ocak Sv ' + n, f); });
    (s.hs || []).forEach(function (v, i) { var h = W.HH[i]; if (!h) return; if (v >= 1) note('h1', '⭐', 'İlk kahraman: ' + h.n, f); if (v >= 5) note('h5', '🌟', 'İlk 5 yıldız: ' + h.n, f); });
    if (m.safir > 0) note('sf1', '🔷', 'İlk Safir', f);
    if (m.opal > 0) note('op1', '🔮', 'İlk Opal', f);
    var db = x.db; if (db && db.max && db.dmg >= db.max) note('db1', '👹', 'İlk destan canavarı yenildi', f);
    var kg = x.kg || {}, kn = Object.keys(kg).filter(function (k) { return kg[k].done; }).length; if (kn >= 1) note('kg1', '⛰', 'İlk kurgan açıldı', f);
    var bi = bestItem(), bp = bi ? plusOf(bi.x) : 0; [5, 10, 15].forEach(function (n) { if (bp >= n) note('p' + n, '⚒️', 'İlk +' + n + ' eşya', f); });
    var k = kut(); [5, 10, 20, 30].forEach(function (n) { if (k >= n) note('k' + n, '✨', 'Kut Sv ' + n, f); });
    var ds = (x.ds || {}).s || 0; for (var c = 3; c <= ds; c += 3) note('ds' + c, '📜', 'Destan: ' + (c / 3) + '. bölüm', f);
    var kl = (s.stat && s.stat.kills) || 0; [100, 1000, 10000].forEach(function (n) { if (kl >= n) note('kl' + n, '🐺', nf(n) + '. av', f); });
    if (f) save(); firstScan = false;
  }
  function when(t) { if (!t) return 'önce'; var d = new Date(t); return d.getDate() + '.' + (d.getMonth() + 1) + '.' + String(d.getFullYear()).slice(2); }
  function openDefter() {
    var dd = ek().dd || [];
    popup('Destan Defteri', '<div class="dd-line">' + (dd.map(function (r) { return '<div class="dd-r"><i>' + r.e + '</i><span>' + esc(r.x) + '</span><small>' + when(r.t) + '</small></div>'; }).join('') || '<p class="dd-empty">📜</p>') + '</div>', 'dd-card');
  }

  /* ---------- 94) kişisel rekorlar ---------- */
  var RK = [['nv', '🔥', 'Nevruz hasarı'], ['dk', '🐺', 'Günde av'], ['dm', '🐎', 'Günde toplama'], ['ar', '🏟️', 'Arena puanı'], ['pl', '⚒️', 'En yüksek +'], ['ds', '📜', 'Destan aşaması']];
  function rkTick() {
    var s = S(), x = ek(), r = x.rk = x.rk || {}, yd = x.yd, cur = {
      nv: (s.nv && s.nv.total) || 0,
      dk: yd ? Math.max(0, ((s.stat && s.stat.kills) || 0) - yd.k) : 0,
      dm: yd ? Math.max(0, ((s.stat && s.stat.mined) || 0) - yd.m) : 0,
      ar: (s.ar && s.ar.pts) || 0, pl: plusOf((bestItem() || {}).x), ds: (x.ds || {}).s || 0
    };
    var first = !x.rk0; x.rk0 = 1; var ch = false;
    RK.forEach(function (d) { var v = Math.floor(cur[d[0]] || 0); if (v > (r[d[0]] || 0)) { var had = r[d[0]] > 0; r[d[0]] = v; ch = true; if (had && !first && (d[0] === 'nv' || d[0] === 'dk' || d[0] === 'dm' ? v % 1 === 0 : true)) spark(d, v); } });
    if (ch) save();
  }
  var lastSpark = {};
  function spark(d, v) { var t = Date.now(); if (t - (lastSpark[d[0]] || 0) < 120000) return; lastSpark[d[0]] = t; toast('🏅 ' + d[1] + ' ' + nf(v), true); }
  function openRekor() {
    var r = ek().rk || {};
    popup('Rekorlar', '<div class="rk-grid">' + RK.map(function (d) { return '<span><i>' + d[1] + '</i><b>' + (d[0] === 'pl' ? '+' : '') + nf(r[d[0]] || 0) + '</b><small>' + d[2] + '</small></span>'; }).join('') + '</div>', 'rk-card');
  }

  /* ---------- 71) güç dökümü ---------- */
  function parts() {
    var s = S(), o = s.l.ocak || 1, B = W.B || {}, bl = 0, bn = 0;
    for (var k in s.l) if (B[k] && k !== 'ocak') { bl += s.l[k] || 0; bn++; }
    var hs = (s.hs || []).reduce(function (a, b) { return a + b; }, 0), eq = (s.ch && s.ch.eq) || {}, ip = 0, inn = 0; for (var q in eq) if (eq[q]) { ip += plusOf(eq[q]); inn++; }
    var exp = { b: o * Math.max(1, bn) * .9, h: Math.max(1, Math.min(45, o / 8 * 9)), i: Math.max(1, Math.min(10, inn) * Math.min(15, o / 3)), k: Math.max(1, o * .8) };
    return [
      { id: 'b', e: '🏠', n: 'Binalar', v: bl, p: Math.min(1, bl / exp.b), go: function () { W.tab = 'c'; } },
      { id: 'h', e: '⭐', n: 'Kahramanlar', v: hs, p: Math.min(1, hs / exp.h), go: function () { W.tab = 'u'; } },
      { id: 'i', e: '⚒️', n: 'Eşyalar', v: ip, p: Math.min(1, ip / exp.i), go: function () { try { W.ergenekonDemirci.open(); } catch (e) {} } },
      { id: 'k', e: '✨', n: 'Kut', v: kut(), p: Math.min(1, kut() / exp.k), go: function () { try { W.ergenekonIlerleme.openKut(); } catch (e) {} } }
    ];
  }
  function openGuc() {
    var P = parts(), low = P.reduce(function (a, b) { return b.p < a.p ? b : a; }), pw = 0; try { pw = W.power(); } catch (e) {}
    var body = '<div class="gc-top"><i>💪</i><b>' + nf(pw) + '</b></div><div class="gc-bars">' + P.map(function (p) {
      return '<button type="button" class="gc-b' + (p === low ? ' low' : '') + '" data-gc="' + p.id + '"><i>' + p.e + '</i><span><small>' + p.n + '</small><u><em style="width:' + Math.round(p.p * 100) + '%"></em></u></span><b>' + nf(p.v) + '</b>' + (p === low ? '<span class="ek-hilal" aria-label="En geride"></span>' : '') + '</button>';
    }).join('') + '</div>';
    var o = popup('Güç', body, 'gc-card');
    o.addEventListener('click', function (ev) { var b = ev.target.closest('[data-gc]'); if (!b) return; var p = P.find(function (x) { return x.id === b.dataset.gc; }); document.querySelectorAll('.ek-ov').forEach(function (n) { n.remove(); }); closePf(); p.go(); try { W.render(); } catch (e) {} });
  }
  function closePf() { var c = document.querySelector('[data-pcl]'); if (c) c.click(); }
  function rePf() { try { W.render(); } catch (e) {} }

  /* ---------- 58) vitrin: profil üretimine eklenir ---------- */
  function vitrin() {
    var s = S(), top = (s.hs || []).map(function (v, i) { return [v, i]; }).filter(function (x) { return x[0] > 0; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 3);
    var ti = W.TI && W.TI[s.ti], bi = bestItem(), pw = 0; try { pw = W.power(); } catch (e) {}
    var item = '<span class="vt-pl">⚒️<b>+' + (bi ? plusOf(bi.x) : 0) + '</b></span>';
    return '<div class="ek-vt"><button type="button" class="vt-av ' + frameCls() + '" data-ekp="fr">' + avatar() + '</button>' +
      '<div class="vt-mid"><b class="vt-ti">' + (ti ? esc(ti.n) : '—') + '</b><div class="vt-chips"><button type="button" data-ekp="guc"><i>💪</i>' + nf(pw) + '</button><button type="button" data-ekp="kut"><i>✨</i>' + kut() + '</button></div>' +
      '<div class="vt-heroes">' + [0, 1, 2].map(function (j) { var h = top[j]; return '<span class="vt-h">' + (h ? heroPic(h[1], 44) + '<em>' + h[0] + '★</em>' : '') + '</span>'; }).join('') + '<span class="vt-it">' + item + '</span></div></div>' +
      '<div class="vt-acts"><button type="button" data-ekp="dd" aria-label="Destan Defteri">📜</button><button type="button" data-ekp="rk" aria-label="Rekorlar">🏅</button><button type="button" data-ekp="fr" aria-label="Çerçeve">🖼️</button></div></div>';
  }
  function hookPrf() {
    if (typeof W.prfGen !== 'function' || W.prfGen.__ekP) return;
    var o = W.prfGen, f = function () { var h = o.apply(this, arguments); try { return vitrin() + h; } catch (e) { return h; } };
    for (var k in o) f[k] = o[k]; f.__ekP = true; W.prfGen = f;
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ekp]'); if (!b) return;
    ev.preventDefault(); ev.stopPropagation();
    var a = b.dataset.ekp; if (a === 'fr') openFrames(); else if (a === 'guc') openGuc(); else if (a === 'kut') { try { W.ergenekonIlerleme.openKut(); } catch (e) {} } else if (a === 'dd') openDefter(); else if (a === 'rk') openRekor();
  }, true);

  /* ---------- 57 · 93) tarih kartı ve tarihi sözler ---------- */
  var HIST = {
    'Mete Han': { h: 'Büyük Hun hükümdarı Mete, MÖ 209’da babası Tuman’ın yerine geçti. Orduyu onlu düzene göre örgütledi ve MÖ 200’de Han imparatoru Gaozu’yu Baideng’de kuşattı; ardından yapılan antlaşmayla Han sarayı Hunlara her yıl hediye göndermeyi kabul etti.', k: 'Kaynak: Sima Qian, Shiji (Hunlar bölümü)',
      q: ['Doğu Hu’lar toprak isteyince: “Toprak devletin temelidir, nasıl verilir?” deyip sefere çıktı. (Shiji)', 'Askerlerine ıslıklı okunun hedefini vurmalarını buyurdu; uymayanları cezalandırarak kayıtsız şartsız itaat kurdu. (Shiji)', 'MÖ 200’de Baideng’de Han ordusunu yedi gün kuşatma altında tuttu. (Shiji)'] },
    'Tomris Hatun': { h: 'Herodot’a göre Tomris, Hazar’ın doğusundaki Massagetlerin kraliçesiydi. MÖ 530’da Pers kralı II. Kiros ülkesine girdi; Tomris’in ordusu Persleri yendi ve Kiros bu savaşta öldü.', k: 'Kaynak: Herodot, Tarih I. kitap 205–214',
      q: ['Kiros’a mesajı: “Kana doymamışsan, Güneş’e yemin ederim ki seni kana doyuracağım.” (Herodot I.212)', 'Oğlu Spargapises Perslerin hilesiyle esir düşünce Kiros’tan ülkeyi terk etmesini istedi. (Herodot I.212)', 'Herodot, Massagetlerle Persler arasındaki bu savaşı gördüğü en çetin savaş diye anlatır. (Herodot I.214)'] },
    'Alparslan': { h: 'Büyük Selçuklu sultanı Alparslan 1064’te Ani’yi aldı. 1071’de Malazgirt’te Bizans imparatoru Romanos Diogenes’i yenip esir aldı; onu fidye ve antlaşmayla serbest bıraktı. Bu zafer Anadolu’nun kapılarını Türklere açtı.', k: 'Kaynak: İbnü’l-Esir, el-Kâmil; Mikhail Attaleiates',
      q: ['Malazgirt sabahı beyazlar giyip ordusuna “Şehit olursam bu kefenim olsun” dedi. (İbnü’l-Esir)', 'Esir imparatora “Ben senin elinde olsaydım ne yapardın?” diye sordu; sonra onu bağışlayıp serbest bıraktı. (İbnü’l-Esir)', '1064’te Gürcistan sınırındaki güçlü Ani kalesini aldı. (İbnü’l-Esir)'] },
    'Fatih Sultan Mehmet': { h: 'Osmanlı padişahı II. Mehmed 1452’de Rumeli Hisarı’nı yaptırdı. 29 Mayıs 1453’te, 21 yaşındayken İstanbul’u fethetti ve şehri devletin başkenti yaptı.', k: 'Kaynak: Tursun Bey, Târîh-i Ebü’l-Feth; Kritovulos',
      q: ['Nisan 1453’te gemileri karadan yürütüp Haliç’e indirtti. (Tursun Bey, Kritovulos)', 'Boğaz’ı denetlemek için Rumeli Hisarı’nı 1452’de birkaç ayda yaptırdı. (Kritovulos)', '“Avnî” mahlasıyla şiirler yazdı; divanı bugüne ulaştı.'] },
    'Kara Fatma': { h: 'Erzurumlu Fatma Seher Erden, Kurtuluş Savaşı’nda kurduğu milis müfrezesiyle cephede savaştı. Gösterdiği yararlıklarla teğmenliğe yükseldi ve İstiklal Madalyası aldı. 1955’te İstanbul’da vefat etti.', k: 'Kaynak: İstiklal Harbi kayıtları ve dönem basını',
      q: ['Milli mücadeleye katılmak için Mustafa Kemal Paşa ile görüştü ve milis birliği kurdu.', 'Kurtuluş Savaşı’nda üstün hizmetleri için İstiklal Madalyası aldı.', 'Rütbesi teğmen olarak kayıtlara geçti; halk ona “Kara Fatma” dedi.'] },
    'Timur': { h: 'Timur 1370’te Semerkant’ta iktidarı aldı ve Orta Asya’dan Anadolu’ya uzanan bir devlet kurdu. 1402 Ankara Savaşı’nda Yıldırım Bayezid’i yendi. 1405’te Çin seferine giderken Otrar’da öldü.', k: 'Kaynak: Şerefeddin Ali Yezdî, Zafername; Clavijo’nun seyahatnamesi',
      q: ['1402’de Ankara Savaşı’nda Osmanlı ordusunu yendi; Bayezid esir düştü. (Zafername)', '1404’te Kastilya elçisi Clavijo’yu Semerkant’ta kabul etti; elçi şehrin görkemini anlattı. (Clavijo)', 'Semerkant’a her ülkeden usta getirtip şehri imar ettirdi. (Clavijo)'] },
    'Cengiz Han': { h: 'Temuçin 1206’daki kurultayda “Cengiz Han” unvanıyla bütün bozkır boylarının hanı seçildi. Orduyu onlu düzene göre kurdu, Yasa’yı koydu; 1219–1221’de Harezmşahlar Devleti’ni yıktı ve 1227’de öldü.', k: 'Kaynak: Moğolların Gizli Tarihi; Cüveynî, Târîh-i Cihângüşâ',
      q: ['1206 kurultayında bozkır boylarının hanı ilan edildi. (Gizli Tarih)', 'Harezmşah’a gönderdiği tüccar kervanı Otrar’da öldürülünce 1219’da sefere çıktı. (Cüveynî)', 'Ordusunu onluk, yüzlük, binlik ve tümenlere ayırdı. (Gizli Tarih)'] },
    'Oğuz Han': { h: 'Oğuz Kağan, Türklerin destani atasıdır. Uygur harfli Oğuz Kağan Destanı’nda ve Reşîdüddin’in Câmiu’t-Tevârîh’inde anlatılır; oğulları Gün, Ay, Yıldız, Gök, Dağ ve Deniz’den 24 Oğuz boyu türer.', k: 'Kaynak: Uygur harfli Oğuz Kağan Destanı; Reşîdüddin; Kâşgarlı Mahmud',
      q: ['Destanda ordusunun önünde gök tüylü, gök yeleli bir erkek kurt yol gösterir. (Oğuz Kağan Destanı)', 'Oğullarına bir altın yay ile üç gümüş ok paylaştırıp Bozok ve Üçok kollarını kurdu. (Reşîdüddin)', 'Divânu Lugâti’t-Türk 22 Oğuz boyunu tamgalarıyla sayar. (Kâşgarlı Mahmud)'] },
    'Kubilay Han': { h: 'Cengiz Han’ın torunu Kubilay 1260’ta kağan oldu, 1271’de Yuan Hanedanı’nı kurdu ve başkenti Hanbalık’a (bugünkü Pekin) taşıdı. 1274 ve 1281’deki Japonya seferleri fırtınalar yüzünden başarısız oldu; 1294’te öldü.', k: 'Kaynak: Yuan Shi; Marco Polo’nun seyahatnamesi',
      q: ['1271’de devletine Yuan adını verdi. (Yuan Shi)', 'Marco Polo, yıllarca Kubilay’ın hizmetinde bulunduğunu yazar. (Marco Polo)', '1281’deki büyük Japonya donanması tayfunda dağıldı. (Yuan Shi)'] }
  };
  function H(i) { var h = W.HH && W.HH[i]; return h && HIST[h.n]; }
  function openTarih(i) {
    var h = W.HH[i], d = H(i); if (!d) return;
    popup(esc(h.n), '<div class="th-c"><div class="th-p">' + heroPic(i, 120) + '</div><p>' + esc(d.h) + '</p><small>' + esc(d.k) + '</small></div>', 'th-card');
  }
  var BUB = { el: null, t: 0, last: -1, lastFight: 0 };
  function bubble(i) {
    var d = H(i); if (!d) return; var h = W.HH[i];
    if (!BUB.el) { BUB.el = document.createElement('div'); BUB.el.id = 'ek-bub'; document.body.appendChild(BUB.el); }
    var q = d.q[Math.floor(Math.random() * d.q.length)];
    BUB.el.innerHTML = '<span class="bb-p">' + heroPic(i, 40) + '</span><span><b>' + esc(h.n) + '</b><small>' + esc(q) + '</small></span>';
    BUB.el.classList.remove('on'); void BUB.el.offsetWidth; BUB.el.classList.add('on');
    clearTimeout(BUB.t); BUB.t = setTimeout(function () { BUB.el.classList.remove('on'); }, 3000);
  }
  function heroUI() {
    var kh = document.getElementById('ek-kh'); if (!kh || W.tab !== 'u') { BUB.last = -1; return; }
    var on = kh.querySelector('.kh-t.on'), i = on ? +on.dataset.kh : -1;
    var det = kh.querySelector('.kh-det');
    if (det && i >= 0 && H(i) && !det.querySelector('.kh-tamga')) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'kh-tamga'; b.setAttribute('aria-label', 'Tarih'); b.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3v18M6 7c0 4 12 4 12 0M7 14l5 3 5-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
      b.addEventListener('click', function (ev) { ev.stopPropagation(); var on2 = kh.querySelector('.kh-t.on'); openTarih(on2 ? +on2.dataset.kh : i); });
      var big = det.querySelector('.kh-big'); (big || det).appendChild(b);
    }
    if (i !== BUB.last) { if (BUB.last !== -1 && i >= 0) bubble(i); BUB.last = i; }
  }
  function hookFight() {
    if (typeof W.fight !== 'function' || W.fight.__ekPrf) return;
    var o = W.fight, f = function () {
      var r = o.apply(this, arguments);
      try { var now = Date.now(); if (now - BUB.lastFight > 90000 && Math.random() < .3) { var own = (S().hs || []).map(function (v, i) { return v > 0 ? i : -1; }).filter(function (i) { return i >= 0 && H(i); }); if (own.length) { BUB.lastFight = now; bubble(own[Math.floor(Math.random() * own.length)]); } } } catch (e) {}
      return r;
    };
    for (var k in o) f[k] = o[k]; f.__ekPrf = true; W.fight = f;
  }

  var tEl = null;
  function toast(t, gold) {
    if (!tEl) { tEl = document.createElement('div'); tEl.id = 'ek-rec-t'; document.body.appendChild(tEl); }
    tEl.textContent = t; tEl.className = gold ? 'gold' : ''; void tEl.offsetWidth; tEl.classList.add('on');
    clearTimeout(tEl.__t); tEl.__t = setTimeout(function () { tEl.classList.remove('on'); }, 3200);
  }

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 300) { l1 = now; try { heroUI(); applyFrame(); hookPrf(); } catch (e) {} }
    if (now - l2 > 2000) { l2 = now; try { scan(); rkTick(); hookFight(); } catch (e) {} }
  }
  function start() { if (!S() || !W.HH || typeof W.prfGen !== 'function') { setTimeout(start, 400); return; } hookPrf(); hookFight(); scan(); requestAnimationFrame(frame); }
  start();
  W.ergenekonProfil = { openGuc: openGuc, openDefter: openDefter, openRekor: openRekor, openFrames: openFrames, openTarih: openTarih, bubble: bubble, HIST: HIST };
})();
