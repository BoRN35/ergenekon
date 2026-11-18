/* Ergenekon — Ek Paket 4, 4. adım: içerik ve premium arayüzü. Claude, 18 Kasım 2026.
   206 yeni kahraman takvimi · 207 bölge genişlemesi · 210 sezon setleri · 211 destan bölümü ekleme (veri hazır, tarihler yönetici panelinden)
   209 kahraman ses replikleri (dosya yoksa sessiz) · 191 oyun içi anket · 196 açılış etkinliği (7 gün) · 197 topluluk bağlantısı
   198 yol haritası · 199 sinematik kamera (yönetici) · 202–205 premium ekranı, 3 günlük deneme, iptal, rozet (ödeme sunucuyla gelecek)
   Yönetici ayarları cihazda: localStorage ek_cal (tarihler), ek_comm (topluluk linki), ek_road (yol haritası), ek_price */
(function () {
  'use strict';
  var W = window;
  if (W.__ekIcerik) return; W.__ekIcerik = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function lsj(k, d) { try { return JSON.parse(ls(k) || 'null') || d; } catch (e) { return d; } }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function isAdm() { return !!ls('ek_adm'); }
  function cal() { return lsj('ek_cal', {}); }
  function due(id, def) { var c = cal(), d = c[id] || def; return d && Date.parse(d) <= Date.now(); }

  /* ================= 206) yeni kahraman takvimi ================= */
  var ROSTER = [
    { id: 'bilge', n: 'Bilge Kağan', e: '📜', k: 'p', k2: 'x', t: '+%4/★ üretim, +%3/★ tecrübe', w: 'kilic', date: '2026-12-15',
      h: 'Göktürk kağanı Bilge (Mogilian) 716’da tahta çıktı; kardeşi Kül Tigin ve veziri Tonyukuk ile devleti yeniden güçlendirdi. 734’te öldü; adına dikilen Orhun Yazıtı onun ağzından yazılmıştır.', k_: 'Kaynak: Bilge Kağan Yazıtı (735); Jiu Tangshu',
      q: ['Yazıtta: “Türk milleti, üstte gök çökmedikçe, altta yer delinmedikçe ilini, töreni kim bozabilir?”', 'Ölümünden sonra yazıtını yeğeni Yollug Tigin yazdı.'] },
    { id: 'kul', n: 'Kül Tigin', e: '🗡️', k: 'a', k2: 'h', t: '+%4/★ saldırı, +%3/★ can', w: 'kilic', date: '2027-01-15',
      h: 'Bilge Kağan’ın kardeşi Kül Tigin, Göktürklerin en ünlü komutanıydı. 731’de öldü; 732’de adına dikilen yazıt, savaşlarını tek tek anlatır.', k_: 'Kaynak: Kül Tigin Yazıtı (732)',
      q: ['Yazıtta savaşlarda bindiği atların adları ve renkleri tek tek sayılır.', 'Kardeşi Bilge Kağan’ı tahta oturtmada belirleyici oldu.'] },
    { id: 'attila', n: 'Attila', e: '🏹', k: 'w', k2: 'a', t: '+%4/★ ordu gücü, +%3/★ saldırı', w: 'yay', date: '2027-02-15',
      h: 'Avrupa Hun hükümdarı Attila 434–453 arasında hüküm sürdü. Doğu ve Batı Roma’yı haraca bağladı; 451’de Katalaunum Ovası’nda savaştı.', k_: 'Kaynak: Priskos; Jordanes, Getica',
      q: ['Elçi Priskos, Attila’nın sofrasında ahşap tabaktan yediğini ve sade giyindiğini yazar.', '452’de İtalya seferine çıktı.'] },
    { id: 'nene', n: 'Nene Hatun', e: '🛡️', k: 'f', k2: 'h', t: '+%4/★ savunma, +%3/★ can', w: 'kilic', date: '2027-03-15',
      h: 'Erzurumlu Nene Hatun, 1877 Osmanlı-Rus Savaşı’nda Rusların ele geçirdiği Aziziye Tabyası’nın geri alınmasında halkla birlikte savaştı.', k_: 'Kaynak: 1877–78 Harbi kayıtları; Erzurum yerel kayıtları',
      q: ['Aziziye Tabyası savunmasına halkla birlikte katıldı.', '1955’te vefat etti; Erzurum’da şehitlikte yatar.'] },
    { id: 'babur', n: 'Babür', e: '🐎', k: 'p', k2: 'w', t: '+%4/★ üretim, +%3/★ ordu gücü', w: 'kilic', date: '2027-04-15',
      h: 'Timur ve Cengiz soyundan Babür, 1526’da Panipat’ta kazandı ve Hindistan’da Babür Devleti’ni kurdu. Anılarını Çağatay Türkçesiyle Vekâyi (Baburnâme) adıyla yazdı.', k_: 'Kaynak: Baburnâme',
      q: ['Baburnâme’yi kendi dili Çağatay Türkçesiyle yazdı.', '1526 Panipat’ta topçu ve tüfekçiyi bozkır süvarisiyle birlikte kullandı.'] }
  ];
  function heroTick() {
    if (!W.HH || !W.ergenekonProfil) return; var s = S(), added = false;
    ROSTER.forEach(function (r) {
      if (!due('h_' + r.id, r.date) || W.HH.some(function (h) { return h.n === r.n; })) return;
      W.HH.push({ n: r.n, e: r.e, k: r.k, k2: r.k2, t: r.t }); if (W.HHK) W.HHK.push(r.id);
      while (s.hs.length < W.HH.length) s.hs.push(0); while (s.hc.length < W.HH.length) s.hc.push(0); while (s.sf && s.sf.length < W.HH.length) s.sf.push({ left: 0, h: 0 });
      W.ergenekonProfil.HIST[r.n] = { h: r.h, k: r.k_, q: r.q }; added = true;
      if (!(ek().hnew || {})[r.id]) { ek().hnew = ek().hnew || {}; ek().hnew[r.id] = 1; try { W.mail('⭐ Yeni kahraman: ' + r.n, { cards: (function () { var c = W.HH.map(function () { return 0; }); c[W.HH.length - 1] = 5; return c; })() }, 'Kurultay'); } catch (e) {} }
    });
    if (added) { save(); rer(); }
  }

  /* ================= 207) bölge genişlemesi ================= */
  var REGIONS = [
    { id: 'otuken', n: 'Ötüken Ormanları', date: '2027-01-01', mons: [['Ötüken Ayısı', '🐻', 18, 8, 88, 22], ['Kara Kurt Sürüsü', '🐺', 22, 12, 92, 29], ['Ala Geyik', '🦌', 16, 5, 82, 23]] },
    { id: 'tanri', n: 'Tanrı Dağları', date: '2027-03-01', mons: [['Kar Parsı', '🐆', 26, 92, 8, 19], ['Dağ Keçisi Sürüsü', '🐐', 24, 88, 12, 27], ['Ak Geyik', '🦌', 32, 95, 14, 30]] }
  ];
  function regionTick() {
    var M = W.M, s = S(); if (!M || !s.mk) return; var e = ek(); e.rg = e.rg || {}; var ch = false;
    REGIONS.forEach(function (r) { if (!due('r_' + r.id, r.date) || e.rg[r.id] === M.length) return; if (M.__ekReg && M.__ekReg[r.id]) return; M.__ekReg = M.__ekReg || {}; M.__ekReg[r.id] = 1; r.mons.forEach(function (m) { M.push(m.slice()); s.mk.push(0); }); e.rg[r.id] = M.length; ch = true; });
    if (ch) { save(); try { W.world3d && W.world3d.refresh && W.world3d.refresh(); } catch (x) {} }
  }

  /* ================= 210) sezon setleri · 211) destan bölümü ================= */
  var SEASON_SETS = [
    { id: 's1', date: '2026-11-01', sets: [['Bozkurt Seti', '🐺', '#8fd0ff'], ['Tulpar Seti', '🐎', '#c79bff'], ['Hakan Seti', '👑', '#ffd34c']] },
    { id: 's2', date: '2027-02-01', sets: [['Ötüken Seti', '🌲', '#7be0a2'], ['Börteçine Seti', '⚒️', '#ffb347'], ['Gök Tengri Seti', '☀️', '#ffe08a']] }
  ];
  function setTick() { var D = W.ergenekonDenge; if (!D || !D.SETS) return; var cur = null; SEASON_SETS.forEach(function (x) { if (due('s_' + x.id, x.date)) cur = x; }); if (!cur || D.SETS.__ss === cur.id) return; D.SETS.forEach(function (st, i) { var v = cur.sets[i]; if (v) { st.n = v[0]; st.e = v[1]; st.c = v[2]; } }); D.SETS.__ss = cur.id; }
  var EXTRA_CH = [{ id: 'c11', n: 'Ötüken’e Dönüş', e: '🌲', date: '2027-01-01' }, { id: 'c12', n: 'Kurultay', e: '🏕️', date: '2027-02-01' }, { id: 'c13', n: 'Tanrı Dağı', e: '⛰️', date: '2027-03-01' }];
  function chTick() { var CH = W.ekDestanCH; if (!CH) return; EXTRA_CH.forEach(function (c) { if (due('c_' + c.id, c.date) && !CH.some(function (x) { return x.n === c.n; })) CH.push({ n: c.n, e: c.e }); }); }

  /* ================= 209) ses replikleri ================= */
  var AU = null;
  function voice(i) {
    if (ek().vo === 0) return; var h = W.HH && W.HH[i]; if (!h) return;
    var key = (W.HHK && W.HHK[i]) || ('h' + i), n = 1 + Math.floor(Math.random() * 3), src = './assets/ses/' + key + '_' + n + '.mp3';
    try { if (AU) AU.pause(); AU = new Audio(src); AU.volume = Math.min(1, (W.SVV ? W.SVV() : 1) * .9); AU.addEventListener('error', function () {}); var p = AU.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }
  function hookVoice() { var P = W.ergenekonProfil; if (!P || P.__vo) return; var o = P.bubble; P.bubble = function (i) { voice(i); return o.apply(this, arguments); }; P.__vo = 1; }

  /* ================= 191) oyun içi anket ================= */
  var SURVEY = [['🎮', 'Oyun keyifli mi?', ['😀', '🙂', '😐', '🙁']], ['📱', 'Ekranlar rahat mı?', ['👍', '👌', '👎']], ['⏱', 'İlerleme hızı?', ['🐢', '⚖️', '🐇']]];
  function surveyTick() {
    var e = ek(); e.first = e.first || Date.now(); e.svd = e.svd || {};
    var key = !e.svd.d3 && Date.now() - e.first > 3 * 864e5 ? 'd3' : !e.svd.o10 && (S().l.ocak || 1) >= 10 ? 'o10' : null;
    if (!key || document.querySelector('.ek-ov,#aw,#ek-boot') || W.tab !== 'c') return; e.svd[key] = 1; save(); survey(key);
  }
  function survey(key) {
    var ans = [];
    var o = popup('☾ 3 soru', '<div class="sv-q">' + SURVEY.map(function (q, i) { return '<div class="sv-r"><span><i>' + q[0] + '</i>' + q[1] + '</span><div>' + q[2].map(function (a, j) { return '<button type="button" data-sv="' + i + ':' + j + '">' + a + '</button>'; }).join('') + '</div></div>'; }).join('') + '</div><button type="button" class="yk-main" data-sv-ok="1">✓</button>', 'sv-card');
    o.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-sv]'); if (b) { var p = b.dataset.sv.split(':'); ans[+p[0]] = +p[1]; b.parentNode.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); }); return; }
      if (ev.target.closest('[data-sv-ok]')) { var L = lsj('ek_survey', []); L.unshift({ t: Date.now(), k: key, a: ans, oc: S().l.ocak }); ls('ek_survey', JSON.stringify(L.slice(0, 100))); o.remove(); try { W.ekPotion && W.ekPotion.add(1, 0); } catch (e) {} }
    });
  }

  /* ================= 196) açılış etkinliği (ilk 7 gün) ================= */
  var LAUNCH_DEF = '2026-11-18';
  var OPEN7 = [['🔨', 'Bir yükseltme başlat', ['⏳', 2]], ['🐺', '10 canavar avla', ['📜', 2]], ['🐎', 'Kafileyle kaynak topla', ['🧪', 2]], ['⭐', 'Kahramana yıldız ver', ['🃏', 5]], ['🏹', 'Akıncı dalgalarına katıl', ['🔷', 1]], ['⚒️', 'Demirci’de basma yap', ['📜', 3]], ['🔥', 'Ocak hediyesi aç', ['🔮', 1]]];
  function o7ok(i) {
    var s = S(), e = ek(), g = e.gg || { b: {} };
    try { return [function () { return !!(s.d && s.d.p && s.d.p.build); }, function () { return (s.stat.kills || 0) - (g.b.kill || 0) >= 10; }, function () { return (s.stat.mined || 0) - (g.b.mine || 0) > 0; }, function () { return (s.hs || []).some(function (v) { return v > 0; }); }, function () { return !!((e.oc || {}).ak || {}).done; }, function () { return !!W.__dmLast; }, function () { return ((e.oc || {}).gx || 0) > 0; }][i](); } catch (x) { return false; }
  }
  function openDay() { var c = cal(), d = Date.parse(c.launch || LAUNCH_DEF); var n = Math.floor((Date.now() - d) / 864e5); return n >= 0 && n < 7 ? n : -1; }
  function o7Html() {
    var n = openDay(), cl = ek().o7 || {}; if (n < 0) return '<p class="o7-none">☾ —</p>';
    return '<div class="o7">' + OPEN7.map(function (x, i) { var st = i < n ? (cl[i] ? 'got' : 'miss') : i === n ? (cl[i] ? 'got' : 'now') : 'lk'; return '<div class="o7-d ' + st + '"><b>' + (i + 1) + '</b><i>' + x[0] + '</i><small>' + x[1] + '</small><span>' + x[2][0] + ' ' + x[2][1] + '</span>' + (st === 'now' ? '<button type="button" data-o7="' + i + '"' + (o7ok(i) ? '' : ' disabled') + '>' + (o7ok(i) ? '🎁' : '◇') + '</button>' : st === 'got' ? '<em>◆</em>' : '') + '</div>'; }).join('') + '</div>';
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-o7]'); if (!b) return; ev.stopPropagation(); var i = +b.dataset.o7, e = ek(); e.o7 = e.o7 || {}; if (e.o7[i] || i !== openDay() || !o7ok(i)) return;
    e.o7[i] = 1; var r = OPEN7[i][2], s = S(), m = (s.ek.dm = s.ek.dm || {}); m.mat = m.mat || { kagit: 0, safir: 0, opal: 0 };
    if (r[0] === '⏳') W.ekHourglass && W.ekHourglass.add(r[1], 0); else if (r[0] === '🧪') W.ekPotion && W.ekPotion.add(r[1], 0); else if (r[0] === '📜') m.mat.kagit += r[1]; else if (r[0] === '🔷') m.mat.safir += r[1]; else if (r[0] === '🔮') m.mat.opal += r[1]; else if (r[0] === '🃏') { var h = Math.floor(Math.random() * W.HH.length); s.hc[h] += r[1]; }
    save(); if (W.ekReport) W.ekReport({ title: 'Açılış · ' + (i + 1) + '. gün', win: true, sub: OPEN7[i][1], rows: [[r[0], '+' + r[1]]] }); setTimeout(function () { document.querySelectorAll('.np-win').forEach(function (o) { o.__fill && o.__fill(); }); }, 100);
  }, true);

  /* ================= 198) yol haritası · 197) topluluk ================= */
  var ROAD = { gel: ['☁️ Bulut kayıt ve hesap', '👥 Gerçek oyuncularla boylar', '💳 Premium abonelik', '📲 Google Play'], yap: ['🌐 Tüm yazıların çevirisi', '🧍 Gerçekçi 3D şef ve atlar'], ekl: ['🏕️ Oba NPC’leri', '☀ Günlük görevler ve uyanış', '🔥 Ocak ilimleri ve klan seviyesi', '🔎 Oyun içi arama'] };
  function road() { return lsj('ek_road', ROAD); }
  function roadHtml() { var r = road(); return '<div class="rd">' + [['yap', '🔨 Yapılıyor'], ['gel', '☾ Geliyor'], ['ekl', '◆ Eklendi']].map(function (c) { return '<div class="rd-c rd-' + c[0] + '"><b>' + c[1] + '</b>' + (r[c[0]] || []).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>'; }).join('') + '</div>'; }
  function addTabs() {
    var N = W.ergenekonNpc && W.ergenekonNpc.NPCS; if (!N) return;
    var k = N.filter(function (n) { return n.id === 'kurultay'; })[0]; if (k && !k.tabs.some(function (t) { return t.n === 'Yol haritası'; })) k.tabs.push({ n: 'Yol haritası', e: '🗺️', k: 'html', f: roadHtml });
    var t = N.filter(function (n) { return n.id === 'tug'; })[0]; if (t && openDay() >= 0 && !t.tabs.some(function (x) { return x.n === 'Açılış'; })) t.tabs.splice(1, 0, { n: 'Açılış', e: '🎉', k: 'html', f: o7Html });
  }

  /* ================= 202–205) premium ================= */
  function premOn() { return W.__ekPrem && W.__ekPrem(); }
  function premCard() {
    var e = ek(), now = Date.now(), tr = e.trial && e.trial > now, sub = e.sub && e.sub > now, price = ls('ek_price') || '—';
    var st = sub ? '◆ ' + (e.subc ? 'İptal edildi · ' : '') + Math.ceil((e.sub - now) / 864e5) + ' g' : tr ? '◆ Deneme · ' + Math.ceil((e.trial - now) / 3600e3) + ' sa' : e.prem ? '◆ Yönetici' : '◇';
    return '<div class="pr-card"><div class="pr-h"><i>✨</i><b>Kut Bereketi</b><span>' + st + '</span></div><div class="pr-b"><span><i>🐎</i><b>+%35</b><small>Toplama</small></span><span><i>⏱</i><b>+%35</b><small>Süre</small></span><span><i>🌙</i><b>+%35</b><small>Çevrim dışı</small></span></div>' +
      '<div class="pr-p"><b>' + esc(price) + '</b><small>/ ay</small></div>' +
      (sub ? (e.subc ? '' : '<button type="button" class="pr-x" data-pr="cancel">İptal</button>') : '<button type="button" class="yk-main" data-pr="sub" disabled>Abone ol · ☾ yakında</button>' + (e.trialUsed ? '' : '<button type="button" class="pr-t" data-pr="trial">3 gün ücretsiz dene</button>')) + '</div>';
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-pr]'); if (!b || b.disabled) return; ev.stopPropagation(); var e = ek();
    if (b.dataset.pr === 'trial' && !e.trialUsed) { e.trialUsed = 1; e.trial = Date.now() + 3 * 864e5; }
    else if (b.dataset.pr === 'cancel') { if (b.dataset.ok !== '1') { b.dataset.ok = '1'; b.textContent = 'İptal ?'; return; } e.subc = 1; }
    save(); var h = document.getElementById('ek-prm'); if (h) h.innerHTML = premCard();
  }, true);
  function premSettings() { var a = document.querySelector('#ek-set [data-sec="acc"] .st-body'); if (!a || a.querySelector('#ek-prm')) return; var d = document.createElement('div'); d.id = 'ek-prm'; d.innerHTML = premCard(); a.insertBefore(d, a.firstChild); var old = a.querySelector('#ek-prem'); if (old) old.remove(); }
  function premBadge() { var v = document.querySelector('.ek-vt .vt-mid'); if (!v) return; var b = v.querySelector('.pr-badge'); if (premOn()) { if (!b) v.insertAdjacentHTML('afterbegin', '<span class="pr-badge" title="Kut Bereketi">✨</span>'); } else if (b) b.remove(); }
  // süre: yapım ve ilim hızı +%35 → süre ÷1.35 ; çevrim dışı gelir +%35 açılış özetine eklenir
  function hookPrem() {
    var o = W.dur; if (typeof o === 'function' && !o.__ekPr) { var f = function () { var v = o.apply(this, arguments); return typeof v === 'number' && premOn() ? Math.max(1, Math.round(v / 1.35)) : v; }; for (var k in o) f[k] = o[k]; f.__ekPr = true; W.dur = f; }
  }
  var offDone = false;
  function offlineBonus() {
    if (offDone) return; var aw = document.getElementById('aw'); if (!aw) { if (performance.now() > 20000) offDone = true; return; } offDone = true; if (!premOn() || !W.AW || !W.AW.dr) return;
    var s = S(), cap = Infinity; try { cap = W.cap(); } catch (e) {} var rows = [];
    ['odun', 'et', 'demir', 'komur'].forEach(function (r) { var v = Math.max(0, W.AW.dr[r] || 0) * .35; if (v > 0) { s.r[r] = Math.min(cap, (s.r[r] || 0) + v); rows.push(r); } });
    if (rows.length) { save(); var c = aw.querySelector('.card'); if (c) c.insertAdjacentHTML('beforeend', '<div class="pr-off">✨ +%35</div>'); }
  }

  /* ================= 199) sinematik kamera (yönetici) ================= */
  var CINE = null;
  function cinema() {
    if (CINE) return stopCine(); var c = W.tab === 'm' ? W.world3d : W.city3d; if (!c || !c.controls) return;
    document.querySelectorAll('.ek-ov').forEach(function (o) { o.remove(); }); document.body.classList.add('ek-cine');
    var ctl = c.controls, cam = c.camera, t0 = performance.now(), tg = ctl.target.clone(), off = cam.position.clone().sub(tg), r = Math.hypot(off.x, off.z), h = off.y, a0 = Math.atan2(off.z, off.x);
    CINE = { stop: false };
    (function step(now) { if (!CINE || CINE.stop) return; var t = (now - t0) / 1000, a = a0 + t * .08, rr = r * (1 - .18 * Math.sin(t * .15)), hh = h * (1 - .25 * Math.sin(t * .11)); cam.position.set(tg.x + Math.cos(a) * rr, tg.y + hh, tg.z + Math.sin(a) * rr); cam.lookAt(tg); ctl.update && ctl.update(); requestAnimationFrame(step); })(t0);
    setTimeout(function () { document.addEventListener('pointerdown', stopCine, { once: true, capture: true }); }, 400);
  }
  function stopCine() { if (CINE) CINE.stop = true; CINE = null; document.body.classList.remove('ek-cine'); }
  W.ekCinema = cinema;

  /* ================= yönetici paneli ekleri ================= */
  function adminExtra() {
    var a = document.querySelector('#ek-admin .ad-grid'); if (!a || a.querySelector('[data-adx]')) return;
    a.insertAdjacentHTML('beforeend', [['cine', '🎬', 'Sinema'], ['cal', '📅', 'Takvim'], ['sv', '📝', 'Anket'], ['road', '🗺️', 'Yol h.'], ['comm', '💬', 'Topluluk'], ['prem', '✨', 'Premium']].map(function (x) { return '<button type="button" data-adx="' + x[0] + '"><i>' + x[1] + '</i><small>' + x[2] + '</small></button>'; }).join(''));
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-adx]'); if (!b) return; ev.stopPropagation(); var k = b.dataset.adx, e = ek();
    if (k === 'cine') { cinema(); return; }
    if (k === 'prem') { e.prem = e.prem ? 0 : 1; save(); b.querySelector('small').textContent = 'Premium ' + (e.prem ? '◆' : '◇'); return; }
    if (k === 'sv') { var L = lsj('ek_survey', []), sum = SURVEY.map(function (q, i) { var c = q[2].map(function () { return 0; }); L.forEach(function (x) { if (x.a && x.a[i] != null) c[x.a[i]]++; }); return '<div class="sv-r"><span><i>' + q[0] + '</i>' + q[1] + '</span><div>' + q[2].map(function (a, j) { return '<b>' + a + ' ' + c[j] + '</b>'; }).join(' ') + '</div></div>'; }).join(''); popup('📝 ' + L.length, '<div class="sv-q">' + sum + '</div>', 'sv-card'); return; }
    var edit = function (title, key, def) { var o = popup(title, '<textarea class="ad-ta" rows="9">' + esc(typeof def === 'string' ? def : JSON.stringify(def, null, 1)) + '</textarea><button type="button" class="yk-main" data-ok="1">Kaydet</button>', 'ad-card'); o.addEventListener('click', function (e2) { if (!e2.target.closest('[data-ok]')) return; var v = o.querySelector('textarea').value; if (typeof def !== 'string') { try { JSON.parse(v); } catch (x) { o.querySelector('textarea').classList.add('bad'); return; } } ls(key, v); o.remove(); }); };
    if (k === 'cal') edit('📅 Tarihler', 'ek_cal', Object.assign({ launch: LAUNCH_DEF }, ROSTER.reduce(function (a, r) { a['h_' + r.id] = r.date; return a; }, {}), REGIONS.reduce(function (a, r) { a['r_' + r.id] = r.date; return a; }, {}), SEASON_SETS.reduce(function (a, r) { a['s_' + r.id] = r.date; return a; }, {}), EXTRA_CH.reduce(function (a, r) { a['c_' + r.id] = r.date; return a; }, {}), cal()));
    else if (k === 'road') edit('🗺️ Yol haritası', 'ek_road', road());
    else if (k === 'comm') { edit('💬 Topluluk linki', 'ek_comm', ls('ek_comm') || 'https://'); setTimeout(function () { var t = document.querySelector('.ad-card textarea'); if (t) t.insertAdjacentHTML('afterend', '<p class="ad-hint">Fiyat (ör. ₺99): ek_price</p>'); }, 0); }
  }, true);
  function commBtn() {
    var a = document.querySelector('#ek-set [data-sec="acc"] .st-body'); if (!a || a.querySelector('[data-ek-comm]')) return; var u = ls('ek_comm');
    a.insertAdjacentHTML('beforeend', '<button type="button" class="st-link" data-ek-comm="1"' + (u && /^https:\/\//.test(u) && u.length > 10 ? '' : ' disabled') + '>💬 Topluluk' + (u && u.length > 10 ? '' : ' · ☾ yakında') + '</button><button type="button" class="st-link" data-ek-road="1">🗺️ Yol haritası</button><button type="button" class="st-link" data-ek-vo="1">🔊 Kahraman sesi ' + (ek().vo === 0 ? '◇' : '◆') + '</button>');
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ek-comm],[data-ek-road],[data-ek-vo]'); if (!b || b.disabled) return; ev.stopPropagation();
    if (b.dataset.ekComm) { var u = ls('ek_comm'); if (u) W.open(u, '_blank', 'noopener'); }
    else if (b.dataset.ekRoad) popup('🗺️ Yol haritası', '<div class="np-body">' + roadHtml() + '</div>', 'rd-card');
    else { ek().vo = ek().vo === 0 ? 1 : 0; save(); b.textContent = '🔊 Kahraman sesi ' + (ek().vo === 0 ? '◇' : '◆'); }
  }, true);

  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 500) { l1 = now; try { addTabs(); premSettings(); premBadge(); adminExtra(); commBtn(); hookVoice(); offlineBonus(); } catch (e) {} }
    if (now - l2 > 5000) { l2 = now; try { heroTick(); regionTick(); setTick(); chTick(); hookPrem(); surveyTick(); } catch (e) {} }
  }
  function start() { if (!S() || !W.HH) { setTimeout(start, 400); return; } setTick(); chTick(); hookPrem(); requestAnimationFrame(frame); }
  start();
  W.ergenekonIcerik = { ROSTER: ROSTER, REGIONS: REGIONS, SEASON_SETS: SEASON_SETS, EXTRA_CH: EXTRA_CH, survey: survey, premCard: premCard };
})();
