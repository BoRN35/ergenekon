/* Ergenekon yeni — oyun motoru.
   Kurallar OYUN-KITABI.md'dedir; formüller eski oyunun index.html + ergenekon-*.js kodundan birebir alınmıştır.
   Kayıt: localStorage 'ergenekon_v2' (eski oyunla ortak). Bilinmeyen alanlar asla silinmez. */
(function (W) {
  'use strict';
  var KEY = 'ergenekon_v2', GOAL = 40;
  var E = W.E = {};
  var s = null;

  /* ---------------- yardımcılar ---------------- */
  function dayk() { return new Date().toISOString().slice(0, 10); }
  function ymd(t) { return new Date(t).toISOString().slice(0, 10); }
  function localDay() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function localDayNum() { var d = new Date(); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  var EPOCH = Date.UTC(2026, 10, 1);
  function season() { return Math.floor((Date.now() - EPOCH) / 2592e6) + 1; }
  function nvWeek() { return Math.floor((Date.now() - EPOCH) / 6048e5) + 1; }
  E.nf = function (x) { x = Math.floor(x || 0); if (x >= 1e9) return (x / 1e9).toFixed(1).replace('.0', '') + 'Mr'; if (x >= 1e6) return (x / 1e6).toFixed(1).replace('.0', '') + 'M'; if (x >= 1e4) return (x / 1e3).toFixed(1).replace('.0', '') + 'B'; return String(x); };
  E.ft = function (x) { x = Math.max(0, Math.ceil(x)); var h = Math.floor(x / 3600), m = Math.floor(x % 3600 / 60), sc = x % 60; if (x >= 86400) return Math.floor(x / 86400) + 'g ' + Math.floor(x % 86400 / 3600) + 'sa'; function p(v) { return (v < 10 ? '0' : '') + v; } return (h ? p(h) + ':' : '') + p(m) + ':' + p(sc); };

  /* ---------------- sabitler ---------------- */
  var B = E.B = {
    ocak: { n: 'Kutsal Ocak', i: '🔥', d: 'Boyların yüreği. Diğer yapılar onu geçemez.', u: 0 },
    oba: { n: 'Boy Obası', i: '🏕️', d: 'Boy merkezi. Sv 5’te ikinci usta açılır.', u: 0 },
    yurt: { n: 'Yurt', i: '🛖', d: '+5 halk.', u: 0 },
    odunluk: { n: 'Odunluk', i: '🪓', d: 'Odun üretir.', u: 0 },
    avci: { n: 'Avcı Çadırı', i: '🏹', d: 'Et üretir.', u: 0 },
    demirci: { n: 'Demirhane', i: '⚒️', d: 'Demir üretir.', u: 2 },
    sifa: { n: 'Şifahane', i: '🏥', d: 'Yaralıları iyileştirir, Alp canı hızlı dolar.', u: 3 },
    kisla: { n: 'Kışla', i: '🏯', d: 'Asker eğitir, asker kapasitesi.', u: 4 },
    sur: { n: 'Sur', i: '🧱', d: 'Akın savunması +%5/sv.', u: 3 },
    ambar: { n: 'Ambar', i: '🏚️', d: 'Yağma kaybını azaltır, kafile yükü artar.', u: 5 },
    gozcu: { n: 'Gözcü Kulesi', i: '🗼', d: 'Keşif ve harita özel yerleri.', u: 3 },
    bilgelik: { n: 'Bilgelik Ocağı', i: '📚', d: 'Araştırma merkezi.', u: 9 },
    komurluk: { n: 'Kömürlük', i: '🪨', d: 'Kömür üretir.', u: 1 },
    harpakademi: { n: 'Harp Ocağı', i: '⚔️', d: 'Kor teknolojileri, ileri talim.', u: 31 }
  };
  var WOSB = { bilgelik: 1, komurluk: 1, harpakademi: 1 };
  var RN = E.RN = { odun: 'Odun', et: 'Et', demir: 'Demir', komur: 'Kömür', celik: 'Çelik', kristal: 'Kor', dari: 'Darı' };
  var RES4 = ['odun', 'et', 'demir', 'komur'];
  var PROD = E.PROD = { odunluk: 'odun', avci: 'et', demirci: 'demir', komurluk: 'komur' };
  var EVT = E.EVT = [{ n: 'Kurultay Günü', k: 'build' }, { n: 'Odun Bayramı', k: 'odun' }, { n: 'Av Şöleni', k: 'et' }, { n: 'Demirci Günü', k: 'demir' }, { n: 'Kam Duası Günü', k: 'pray' }, { n: 'Maden Seferi', k: 'mine' }, { n: 'Büyük Toy', k: 'help' }];
  var STORY = { 2: 'Demirci Börteçine ocağa gelir: “Dağı eritecek demiri çıkaralım.”', 3: 'Kurtlar vadide uluyor. Kök Börü boyları izliyor.', 4: 'Umay Ana’nın bereketi vadiye iner, avlar çoğalır.', 5: 'Kam boylar için Tengri’ye dua eder.', 8: 'Demir Dağ’ın eteklerinde ilk çatlak sesleri duyuldu.', 10: 'Kam, Tengri’ye kurban sunar: “Gök Tanrı bizi unutmadı.”', 12: 'Erlik Han’ın gölgeleri vadiye sızmaya çalışıyor.', 15: 'Börteçine’nin körükleri gece gündüz çalışıyor.', 18: 'Kök Börü dağın tepesinde uludu, boylar umutlandı.', 20: 'Demir Dağ kızarmaya başladı. Yarı yoldasın.', 24: 'Soğuk sert vuruyor; odun ve et hiç bitmesin.', 28: 'Dağın bağrında bir yarık açıldı, ışık sızıyor.', 32: 'Umay Ana’nın bereketi vadiyi sardı.', 35: 'Dağ akkor hâlinde, demir akmaya başladı.', 38: 'Son hazırlık: tüm boylar çıkışa hazır.', 40: 'Demir Dağ eridi. Ergenekon’dan çıkış başladı.' };
  E.STORY = STORY;
  var HH = E.HH = [{ n: 'Mete Han', k: 'a', t: 'Saldırı' }, { n: 'Tomris Hatun', k: 'f', t: 'Savunma' }, { n: 'Alparslan', k: 'h', t: 'Can' }, { n: 'Fatih Sultan Mehmet', k: 'p', t: 'Üretim' }, { n: 'Kara Fatma', k: 'w', t: 'Ordu gücü' }, { n: 'Timur', k: 'w', k2: 'r', t: 'Ordu · akın savunması' }, { n: 'Cengiz Han', k: 'a', k2: 'd', t: 'Saldırı · düşme şansı' }, { n: 'Oğuz Han', k: 'p', k2: 'b', t: 'Üretim · inşaat hızı' }, { n: 'Kubilay Han', k: 'x', k2: 'm', t: 'Tecrübe · maden verimi' }];
  var HHK = E.HHK = ['mete', 'tomris', 'alparslan', 'fatih', 'karafatma', 'timur', 'cengiz', 'oguz', 'kubilay'];
  var HSC = E.HSC = [30, 75, 150, 300, 600];
  var PAIRS = E.PAIRS = [[0, 7, 'a'], [6, 8, 'x'], [5, 6, 'w'], [2, 3, 'p'], [1, 4, 'f']];
  var HR = E.HR = [{ n: 'Börteçine', k: 'demir' }, { n: 'Umay Ana', k: 'et' }, { n: 'Kam Ulu', k: 'odun' }, { n: 'Kürşad', k: 'war' }, { n: 'Tonyukuk', k: 'mine' }];
  var TL = [['a'], ['f'], ['h'], ['x'], ['d'], ['r']];
  var CP = [{ m: 0, a: 0.05 }, { m: 3, f: 0.08 }, { m: 6, a: 0.08 }, { m: 9, h: 0.1 }, { m: 10, a: 0.1, f: 0.1, h: 0.1 }];
  var TI = [{ ac: 'k10', b: { a: 0.02 } }, { ac: 'k100', b: { a: 0.04 } }, { ac: 'o10', b: { f: 0.03 } }, { ac: 'o30', b: { f: 0.05, h: 0.05 } }, { ac: 'a20', b: { x: 0.05 } }, { ac: 'ar10', b: { a: 0.03 } }, { ac: 'd10', b: { x: 0.04, h: 0.03 } }, { ac: 'r5', b: { f: 0.04 } }, { ac: 'c3', b: { a: 0.03, f: 0.03 } }, { ac: 'm1', b: { x: 0.05, a: 0.02 } }];
  var KY = [['a'], ['h'], ['f']];
  var X6BF = { ot: .03, sd: .03, am: .04, ks: .1 };
  var RR = E.RR = ['Sıradan', 'Nadir', 'Destansı', 'Efsanevi', 'Mitik'], RCOL = E.RCOL = ['#9aa5ae', '#3aa868', '#8b6cff', '#e0922b', '#e0473e'];
  var RM = [1, 1.25, 1.6, 2.1, 2.8], BW = [62, 26, 9, 2.6, 0.4], RMUL = [0.55, 0.95, 1.45, 1.9, 2.4];
  var TYP = ['w', 'b', 'k', 'g', 'l', 'f', 'e', 'y'];
  var IN = { b: ['Keçe Börk', 'Deri Miğfer', 'Kurt Başlığı', 'Tengri Miğferi', 'Börü Tacı'], k: ['Deri Bileklik', 'Demir Pazubent', 'Kurt Pençesi Kolluk', 'Pul Kolluk', 'Tengri Kolluğu'], g: ['Keçe Kaftan', 'Deri Zırh', 'Kurt Postu', 'Pul Zırh', 'Tengri Zırhı'], l: ['Keçe Pantolon', 'Deri Pantolon', 'Kurt Postu Pantolon', 'Pul Paçalık', 'Tengri Paçalığı'], f: ['Keçe Çizme', 'Deri Çizme', 'Kurt Postu Çizme', 'Demir Pabuç', 'Tengri Çizmesi'], e: ['Bakır Küpe', 'Gümüş Küpe', 'Kam Küpesi', 'Altın Hilal Küpe', 'Ay-Yıldız Küpesi'], y: ['Taş Yüzük', 'Kemik Yüzük', 'Kam Mührü', 'Gümüş Mühür', 'Tengri Mührü'], w: ['Demir Kılıç', 'Kurt Yayı', 'Kam Gürzü', 'Tengri Baltası', 'Böri Mızrağı'] };
  var ALLEQ = ['w', 'b', 'k', 'g', 'l', 'f', 'e0', 'e1', 'y0', 'y1'];
  var EN_MAX = 200, EN_C = 10, EN_RG = 240, EN_SUP = 21600, EN_SUPV = 40;
  var TRM = [1, 1.3, 1.15];
  var M = W.M;
  E.EN = { max: EN_MAX, cost: EN_C, rg: EN_RG };

  /* ---------------- kayıt ---------------- */
  var LOG = E.log = [];
  function add(m) { LOG.unshift({ t: Date.now(), m: m }); if (LOG.length > 20) LOG.pop(); if (s) { s.log = s.log || []; s.log.unshift(m); if (s.log.length > 30) s.log.pop(); } if (E.onLog) E.onLog(m); }
  E.add = add;
  function storedGame() { try { return localStorage.getItem(KEY) || localStorage.getItem(KEY + '_backup'); } catch (e) { return null; } }
  var lastWrite = 0;
  function save() {
    if (!s) return false;
    try {
      s.t = Date.now();
      var v = JSON.stringify(s); localStorage.setItem(KEY, v); lastWrite = s.t;
      if (!save.b || Date.now() - save.b > 60000) { localStorage.setItem(KEY + '_backup', v); save.b = Date.now(); }
      return true;
    } catch (e) { return false; }
  }
  function act() { s._autosave = { actionAt: Date.now(), actionId: (W.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Math.random()).slice(2) }; save(); }
  E.save = save; E.act = act;

  function fresh() {
    return { r: { odun: 200, et: 120, demir: 0 }, l: { ocak: 1, yurt: 0, odunluk: 0, avci: 0, demirci: 0 }, q: null, heat: 100, pray: 0, t: Date.now(), log: ['Ergenekon’dayız. Ateşi canlı tut.'], won: false, nodes: mkNodes(), sq: [{ st: 0, n: -1, left: 0 }], al: { pow: 0, terr: [], hq: 0, tm: 0, tc: 0, th: 0 }, chat: [], sp: 0, d: { day: dayk(), p: {}, c: {} }, raid: { t: 14400 }, ch: { lv: 1, xp: 0, hp: 105, eq: {}, inv: [], k: {} }, mk: M.map(function () { return 0; }), last: '' };
  }
  function nrate(lv) { return 120 * Math.pow(1.5, lv - 1); }
  E.nrate = nrate;
  function mkNodes() { var n = W.LV.map(function (lv, i) { var m = nrate(lv) * 80; return { t: ['odun', 'et', 'demir'][i % 3], lv: lv, res: m, max: m, rg: 0 }; });[1, 1, 3, 5, 10, 15].forEach(function (lv) { var a = nrate(lv) * 80; n.push({ t: 'komur', lv: lv, res: a, max: a, rg: 0 }); }); return n; }

  // Eski oyunun mig() varsayılanları: yalnız eksik alanları doldurur, hiçbir şeyi silmez.
  function ensure() {
    s.nodes = s.nodes || []; var dn = mkNodes(); while (s.nodes.length < dn.length) s.nodes.push(dn[s.nodes.length]);
    s.ttiers = (s.ttiers || [1, 1, 1]).map(function (v) { return Math.max(1, Math.min(11, Math.floor(Number(v) || 1))); });
    if (!Number.isInteger(s.formation) || s.formation < 0 || s.formation > 3) s.formation = 0;
    s.l.oba = s.l.oba || 0; s.q2 = s.q2 || null; if (!s.q && s.q2) { s.q = s.q2; s.q2 = null; }
    ['sifa', 'kisla', 'sur', 'ambar', 'gozcu', 'bilgelik', 'komurluk', 'harpakademi'].forEach(function (k) { s.l[k] = s.l[k] || 0; });
    ['komur', 'celik', 'kristal', 'kristalParcasi', 'aritilmisKristal'].forEach(function (k) { if (!Number.isFinite(s.r[k])) s.r[k] = 0; });
    s.ch = s.ch || { lv: 1, xp: 0, hp: 105, eq: {}, inv: [], k: {} }; var c = s.ch; c.k = c.k || {}; c.eq = c.eq || {}; c.inv = c.inv || [];
    if (c.tp === undefined) { c.tp = c.lv - 1; c.tl = {}; } c.tl = c.tl || {}; c.mt = c.mt || 0; if (c.cpn === undefined) c.cpn = -1; if (!c.cpl) c.cpl = [0, 0, 0, 0, 0];
    s.pt = s.pt || { lv: 1, xp: 0, adv: null }; s.en = s.en || { v: 100, t: Date.now(), sup: 0, it: 2, bd: { day: '', n: 0 } };
    s.rs = s.rs || {}; if (s.rq === undefined) s.rq = null; s.tr = s.tr || [0, 0, 0]; if (s.tq === undefined) s.tq = null; s.cz = s.cz || [];
    s.hr = s.hr || [0, 1, 2, 3, 4].map(function () { return { sh: 0, lv: 0 }; }); s.dg = s.dg || { day: dayk(), n: 3, best: 0 };
    s.qu = s.qu || 0; s.lg = s.lg || { d: '', n: 0 }; s.ac = s.ac || {}; s.stat = s.stat || { kills: 0, raidw: 0, mined: 0, arena: 0 }; s.stat.cay = s.stat.cay || 0;
    s.ar = s.ar || { pts: 1000, n: 5, day: dayk() }; s.kt = s.kt || [0, 0, 0]; s.poi = s.poi || {}; s.ks = s.ks || [0, 0, 0]; s.kd = s.kd || {};
    s.jb = s.jb || { odun: 0, et: 0, demir: 0 }; if (s.au === undefined) s.au = true; s.pg = s.pg || { n: 0 }; s.bk = s.bk || { a: 0, f: 0, h: 0, x: 0, d: 0, r: 0 };
    s.mb = s.mb || []; s.mk = s.mk || []; while (s.mk.length < M.length) s.mk.push(0); s.mk = s.mk.map(function (t) { return Math.min(t, 60); });
    s.wc = s.wc || []; s.ud = s.ud || 0; s.bu = s.bu || { atk: 0, def: 0, xp: 0, dr: 0 }; s.mp = s.mp || { wing: 0, glove: 0, peri: 0 };
    if (s.ti === undefined) s.ti = -1; s.nv = s.nv || { wk: 0, day: '', today: 0, total: 0, run: 0, ref: 0 };
    s.hc = s.hc || []; s.hs = s.hs || []; while (s.hc.length < HH.length) s.hc.push(0); while (s.hs.length < HH.length) s.hs.push(0);
    s.sf = s.sf || []; while (s.sf.length < HH.length) s.sf.push({ left: 0, h: 0 });
    s.fx = s.fx || 38; if (!s.fxv) { s.fxv = 1; s.fx = Math.min(100, Math.round(s.fx / .52)); }
    s.cx = s.cx || [0, 0, 0, 0, 0, 0, 0, 0]; s.bf = s.bf || 0; s.bp = s.bp || 0; if (s.mu === undefined) s.mu = 85;
    s.wd = s.wd || [0, 0, 0]; if (s.hq === undefined) s.hq = null; s.sk = s.sk || { arm: '', at: {} }; s.raid = s.raid || { t: 14400 };
    s.sq = s.sq || [{ st: 0, n: -1, left: 0 }]; s.al = s.al || { pow: 0, terr: [], hq: 0, tm: 0, tc: 0, th: 0 }; s.al.terr = s.al.terr || [];
    s.d = s.d || { day: dayk(), p: {}, c: {} }; s.d.p = s.d.p || {}; s.sp = s.sp || 0; if (s.heat === undefined) s.heat = 100; s.pray = s.pray || 0;
    if (!s.wb) newWb();
    var x = s.x6 = s.x6 || {}; x.zc = x.zc || []; x.rf = x.rf || []; x.b = x.b || { ot: 0, sd: 0, am: 0, ks: 0 }; x.v = x.v || { odun: 0, et: 0, demir: 0 }; x.pl = x.pl || 0; x.plT = x.plT || 0; x.ct = x.ct || 0; if (x.mem === undefined) x.mem = true; x.an = x.an || []; s.dg.gk = s.dg.gk || [0, 0, 0, 0]; s.al.cp = s.al.cp || 0; s.stat.rifts = s.stat.rifts || 0;
    s.ek = s.ek || {}; var e = s.ek; e.dm = e.dm || { lv: 0, t1: 0 }; e.dm.mat = e.dm.mat || { kagit: 0, safir: 0, opal: 0 }; e.bin = e.bin || {};
    if (!s.mbw) { s.mbw = 1; mail('Hoş geldin, Alp', { r: { odun: 200, et: 100, demir: 20 } }, 'Kam'); }
  }

  // İlk açılışta kayıt yoksa eski oyunun gömülü başlangıç kaydını aynen aktarır (eski oyunun yaptığı gibi).
  E.boot = function (done) {
    var x = storedGame();
    if (x) { start(x); return done(); }
    var seeded = false; try { seeded = !!localStorage.getItem('eg_seeded'); } catch (e) {}
    if (seeded) { start(null); return done(); }
    fetch('../index.html', { cache: 'no-store' }).then(function (r) { return r.text(); }).then(function (t) {
      var m = t.match(/window\.__EG_SEED__=(\{[\s\S]*?\});<\/script>/);
      if (m) { try { JSON.parse(m[1]); localStorage.setItem(KEY, m[1]); localStorage.setItem('eg_seeded', '1'); } catch (e) {} }
      start(storedGame()); done();
    }).catch(function () { start(null); done(); });
  };
  E.away = null;
  function start(raw) {
    try { if (raw) s = JSON.parse(raw); } catch (e) { s = null; }
    if (!s) { s = fresh(); }
    W.s = s; ensure();
    var d = Math.min((Date.now() - (s.t || Date.now())) / 1000, 43200);
    if (d > 5) {
      var r0 = {}; RES4.forEach(function (r) { r0[r] = s.r[r] || 0; }); var l0 = JSON.parse(JSON.stringify(s.l));
      for (var i = 0; i < Math.floor(d); i++) tick(1, true);
      E.away = { d: d, dr: {}, up: [] }; RES4.forEach(function (r) { E.away.dr[r] = Math.floor((s.r[r] || 0) - r0[r]); });
      for (var k in s.l) if (B[k] && s.l[k] > (l0[k] || 0)) E.away.up.push([k, s.l[k]]);
      if (d >= 60) add('Sen yokken boylar çalıştı (' + E.ft(d) + ').');
    }
    accrueBins(Date.now()); save();
  }
  // Başka sekmede eski oyun kaydederse yeniden oku
  W.addEventListener('storage', function (ev) { if (ev.key === KEY && ev.newValue && s) { try { var n = JSON.parse(ev.newValue); if ((n.t || 0) > (s.t || 0)) { s = W.s = n; ensure(); if (E.onChange) E.onChange(); } } catch (e) {} } });
  E.S = function () { return s; };

  /* ---------------- araştırma bonusu ---------------- */
  function wosBonus(label) { try { return W.WOS_RESEARCH ? W.WOS_RESEARCH.bonus(s.rs, label) : 0; } catch (e) { return 0; } }
  E.wosBonus = wosBonus;
  function prem() { var e = s.ek || {}, n = Date.now(); return !!(e.prem || (e.trial && e.trial > n) || (e.sub && e.sub > n)); }
  E.prem = prem;
  function ECO() { var o = Math.max(1, s.l.ocak || 1); return Math.max(0.056875, 0.30 * Math.pow(0.85, o - 1)); }

  /* ---------------- yapılar ---------------- */
  function wosBuild(k) { var b = W.WHITEOUT_RESEARCH_BUILDINGS; return b && b[k]; }
  function quote(k, level) {
    if (WOSB[k]) { var wb = wosBuild(k); if (!wb || !Number.isInteger(level) || level < 0) return null; var row = wb.levels[level]; return row && Number.isFinite(row.seconds) ? { cost: Object.assign({}, row.cost), seconds: row.seconds, pre: row.prerequisites } : null; }
    return W.ERGENEKON_UPGRADE_BALANCE ? W.ERGENEKON_UPGRADE_BALANCE.quote(k, level) : null;
  }
  function maxLevel(k) { var wb = WOSB[k] && wosBuild(k); return wb ? wb.levels.length : 40; }
  E.maxLevel = maxLevel;
  function cost(k) {
    var level = s.l[k] || 0, q = quote(k, level), o = {}; if (!q) return o;
    if (WOSB[k]) return q.cost;
    var disc = 1 - Math.min(.1, .01 * (s.rs.masonry || 0));
    for (var r in q.cost) o[r] = Math.ceil(q.cost[r] * disc);
    return o;
  }
  function dur(k) { var q = quote(k, s.l[k] || 0); if (!q) return 0; var t = q.seconds; return prem() ? Math.ceil(t / 1.35) : t; }
  E.cost = cost; E.dur = dur;
  function buildingRequirements(k) {
    var level = s.l[k] || 0; if (!B[k] || level >= maxLevel(k)) return [];
    if (WOSB[k]) { var q = quote(k, level), need = 0; if (!q) return []; (q.pre || []).forEach(function (p) { var f = String(p).match(/Furnace\s*(FC)?\s*(?:Lv\.)?\s*(\d+)/i); if (f) need = Math.max(need, Number(f[2]) + (f[1] ? 30 : 0)); }); return s.l.ocak < need ? [{ key: 'ocak', level: need }] : []; }
    var by = {}; function nd(key, lv) { by[key] = Math.max(by[key] || 0, lv); }
    if (k !== 'ocak') nd('ocak', Math.max(level + 1, B[k].u || 0));
    if (k === 'ocak' && level >= 3) ['yurt', 'odunluk', 'avci', 'demirci'].forEach(function (key) { nd(key, level - 2); });
    if (W.ERGENEKON_UPGRADE_BALANCE) W.ERGENEKON_UPGRADE_BALANCE.prerequisites(k, level).forEach(function (v) { nd(v.key, v.level); });
    var req = []; for (var key in by) if ((s.l[key] || 0) < by[key]) req.push({ key: key, level: by[key] }); return req;
  }
  E.req = buildingRequirements;
  function buildQueues() { return [s.q, s.q2].filter(Boolean); }
  function builders() { return (s.l.oba || 0) >= 5 ? 2 : 1; }
  function buildQueue(k) { return buildQueues().filter(function (q) { return q.k === k; })[0] || null; }
  E.queues = buildQueues; E.builders = builders; E.queueOf = buildQueue;
  function costOk(c) { for (var r in c) if ((s.r[r] || 0) < c[r]) return false; return true; }
  E.costOk = costOk;
  function can(k) { if (!B[k]) return false; var lv = s.l[k] || 0; if (lv >= maxLevel(k) || buildQueue(k) || buildQueues().length >= builders() || buildingRequirements(k).length) return false; return costOk(cost(k)); }
  // yalnız kaynak/usta dışındaki engellere bakar (yeşil ok için)
  E.can = can;
  E.canRes = function (k) { var lv = s.l[k] || 0; return !!B[k] && lv < maxLevel(k) && !buildQueue(k) && !buildingRequirements(k).length && costOk(cost(k)); };
  E.unlocked = function (k) { return (s.l[k] || 0) > 0 || (s.l.ocak || 1) >= (B[k].u || 0); };
  E.start = function (k) {
    if (!can(k)) return false; var c = cost(k); for (var r in c) s.r[r] -= c[r];
    var t = dur(k); s[s.q ? 'q2' : 'q'] = { k: k, left: t, tot: t, req: false, h: 0 }; s.d.p.build = 1;
    add(B[k].n + ' için çalışma başladı.'); act(); return true;
  };
  E.askHelp = function (k) { var q = buildQueue(k); if (!q || q.req) return; q.req = true; add('Boydan yardım istendi.'); act(); };
  function umLv() { return s.um || 0; }
  E.prayReady = function () { return s.pray <= 0; };
  E.pray = function (k) { var q = buildQueue(k) || s.q; if (!q || s.pray > 0) return; q.left = Math.max(1, q.left - q.tot * (0.05 + 0.01 * umLv())); s.pray = 3600 - 300 * umLv(); add('Umay Ana’nın duası inşaatı hızlandırdı.'); act(); };
  E.freeFinish = function (k) { var q = buildQueue(k); if (!q || q.left > 300) return; q.left = 0; tick(0.01); act(); };
  // Kum saati (emekle kazanılır, satılmaz)
  var KS = E.KS = { m1: 60, m5: 300, m30: 1800, h1: 3600, h8: 28800 };
  E.ks = function () { var k = s.ek.ks = s.ek.ks || {}; Object.keys(KS).forEach(function (t) { k[t] = k[t] || 0; }); return k; };
  E.useKs = function (k, t, n) { var q = buildQueue(k); var ks = E.ks(); n = Math.min(n || 1, ks[t] || 0); if (!q || n < 1) return; ks[t] -= n; q.left = Math.max(0, q.left - KS[t] * n); tick(0.01); act(); };
  E.autoKs = function (k) { var q = buildQueue(k); if (!q) return; var ks = E.ks(), ord = ['h8', 'h1', 'm30', 'm5', 'm1']; ord.forEach(function (t) { while (ks[t] > 0 && q.left >= KS[t]) { ks[t]--; q.left -= KS[t]; } }); if (q.left > 0 && q.left <= 300) q.left = 0; tick(0.01); act(); };

  /* ---------------- ekonomi ---------------- */
  function halk() { return 5 * (s.l.yurt || 0); }
  function factor() { return (0.4 + 0.6 * s.heat / 100) * (s.r.et <= 0 ? 0.5 : 1) * (0.7 + 0.3 * s.mu / 100); }
  function hb(k) { var b = 0; HH.forEach(function (x, i) { if (x.k === k) b += 0.04 * (s.hs[i] || 0); if (x.k2 === k) b += 0.03 * (s.hs[i] || 0); }); PAIRS.forEach(function (p) { if (p[2] === k && s.hs[p[0]] >= 1 && s.hs[p[1]] >= 1) b += 0.06; }); return b; }
  E.hb = hb;
  function hl(k) { var l = 0; HR.forEach(function (h, i) { if (h.k === k) l = (s.hr[i] || {}).lv || 0; }); return l; }
  function evt() { return EVT[new Date().getUTCDay()]; }
  E.evt = evt;
  function pm() { var b = 1 + s.al.terr.length * 0.03 + 0.04 * (s.rs.prod || 0) + 0.05 * s.cz.length + (s.bp > 0 ? 0.25 : 0) + 0.1 * s.pg.n + hb('p') + 0.01 * (s.mp.peri || 0);[200, 600, 1500, 3500].forEach(function (p) { if (s.sp >= p) b += 0.05; }); return b; }
  function evm(k) { return (evt().k === k ? 1.5 : 1) * (1 + 0.06 * hl(k)); }
  function jm(k) { return 1 + 0.05 * (s.jb[k] || 0); }
  function x6bonus(k) { var x = s.x6; if (!x || !x.b || x.mem === false) return 0; return (X6BF[k] || 0) * (x.b[k] || 0); }
  function cap0() { return 3 * 600 * Math.pow(1.55, s.l.ocak) * (1 + 0.1 * (s.rs.cap || 0)); }
  function cap() { return cap0() * (1 + x6bonus('am')); }
  E.cap = cap;
  function rates() { // saatlik net üretim
    var L = s.l, f = factor() * pm(), e = ECO();
    return {
      odun: 3600 * e * (0.3 * (0.5 + L.odunluk * Math.pow(1.095, L.odunluk)) * f * evm('odun') * jm('odun') * (1 + 0.05 * (s.rs.wood || 0) + wosBonus('Wood Output')) - 0.03 * Math.pow(L.ocak, 1.3) * (1 - Math.min(.2, .02 * (s.rs.fuel || 0)))),
      et: 3600 * e * (0.3 * (0.3 + 0.8 * L.avci * Math.pow(1.095, L.avci)) * f * evm('et') * jm('et') * (1 + 0.05 * (s.rs.meat || 0) + wosBonus('Meat Output')) - 0.03 * halk() * (1 - Math.min(.2, .02 * (s.rs.rations || 0)))),
      demir: 3600 * e * 0.12 * L.demirci * Math.pow(1.095, L.demirci) * f * evm('demir') * jm('demir') * (1 + 0.05 * (s.rs.iron || 0) + wosBonus('Iron Output')),
      komur: 3600 * e * 0.12 * (L.komurluk || 0) * Math.pow(1.095, L.komurluk || 0) * f * (1 + wosBonus('Coal Output'))
    };
  }
  E.rates = rates;
  function mood(dt) {
    for (var q in s.bu) if (s.bu[q] > 0) s.bu[q] = Math.max(0, s.bu[q] - dt); if (s.bf > 0) s.bf = Math.max(0, s.bf - dt); if (s.bp > 0) s.bp = Math.max(0, s.bp - dt);
    var tg = Math.max(0, Math.min(100, 30 + 0.35 * s.heat + (s.r.et > 0 ? 20 : -20) + (s.l.sifa || 0))); s.mu += (tg - s.mu) * Math.min(1, dt / 60);
    var h = halk(), a = s.jb.odun + s.jb.et + s.jb.demir; if (a > h) { s.jb = { odun: 0, et: 0, demir: 0 }; a = 0; }
    if (s.au && a < h) { var b = Math.floor(h / 3), r2 = h - 3 * b; s.jb = { odun: b + (r2 > 0 ? 1 : 0), et: b + (r2 > 1 ? 1 : 0), demir: b }; }
  }

  /* ---------------- hasat (Tümünü topla) — ergenekon-durum.js ile aynı ---------------- */
  function binRate(k) { var lv = s.l[k] || 0; if (!lv) return 0; var f = factor() * pm() * ECO(), g = Math.pow(1.095, lv); var p = k === 'odunluk' ? 0.3 * (0.5 + lv * g) : k === 'avci' ? 0.3 * (0.3 + 0.8 * lv * g) : 0.12 * lv * g; return p * f * 3600 * 0.25; }
  function accrueBins(now) { var e = s.ek; for (var k in PROD) { var b = e.bin[k] = e.bin[k] || { v: 0, t: now }, r = binRate(k); var dt = Math.min(7200, Math.max(0, (now - (b.t || now)) / 1000)); b.t = now; b.v = Math.min(r * 2, (b.v || 0) + r * dt / 3600); } }
  E.binReady = function (k) { var b = s.ek.bin[k], r = binRate(k); return !!(b && r > 0 && b.v >= Math.max(1, r / 6)); };
  E.collect = function (k) { if (!E.binReady(k)) return 0; var b = s.ek.bin[k], res = PROD[k], room = Math.max(0, cap() - (s.r[res] || 0)), g = Math.floor(Math.min(b.v, room)); if (g < 1) return 0; s.r[res] = (s.r[res] || 0) + g; b.v -= g; return g; };
  E.collectAll = function () { var out = {}; for (var k in PROD) { var g = E.collect(k); if (g) out[PROD[k]] = g; } if (Object.keys(out).length) act(); return out; };
  E.anyBin = function () { for (var k in PROD) if (E.binReady(k)) return true; return false; };

  /* ---------------- Alp ---------------- */
  function ev(x) { return Math.round(x.v * (1 + 0.1 * (x.p || 0))); }
  E.ev = ev;
  function eqSum(ks) { var e = s.ch.eq, n = 0; ks.forEach(function (k) { if (e[k]) n += ev(e[k]); }); return n; }
  function setb() { var e = s.ch.eq; if (!ALLEQ.every(function (k) { return e[k]; })) return 0; var m = Math.min.apply(null, ALLEQ.map(function (k) { return e[k].r; })); return 0.03 * (m + 1); }
  function holyB(k) { var b = 0; KY.forEach(function (y, i) { if (y[0] === k && s.ks && s.ks[i]) b += 0.05; }); return b; }
  function tib(k) { var t = TI[s.ti]; return t && s.ac[t.ac] && t.b[k] ? t.b[k] : 0; }
  function cb(k) {
    var b = 1 + (k === 'h' ? x6bonus('ot') : 0) + (k === 'f' ? x6bonus('sd') : 0) + holyB(k) + 0.05 * s.pg.n + 0.03 * (s.rs.hero || 0) + 0.04 * (s.ch.tl[k] || 0) + setb() + hb(k) + [0, 0.05, 0.12][s.mp.wing || 0] + tib(k);
    CP.forEach(function (z, zi) { if (s.ch.k[z.m] && z[k]) b += z[k] * (1 + 0.25 * ((s.ch.cpl || [])[zi] || 0)); });
    if (k === 'a' && s.ch.mt) b += [0, 0.05, 0.1, 0.2][s.ch.mt]; if (k === 'a' && s.bf > 0) b += 0.2; if (k === 'f' && s.bf > 0) b += 0.1; if (k === 'a' && s.bu.atk > 0) b += 0.25; if (k === 'f' && s.bu.def > 0) b += 0.25; return b;
  }
  function cs() { var l = s.ch.lv; return { atk: Math.round((8 + 3 * l + eqSum(['w', 'y0', 'y1'])) * cb('a')), def: Math.round((3 + 1.5 * l + eqSum(['b', 'k', 'g', 'l', 'f'])) * cb('f')), hp: Math.round((80 + 25 * l + eqSum(['e0', 'e1'])) * cb('h')) }; }
  E.cs = cs;
  function power() { var pw = 0; for (var k in s.l) pw += s.l[k] || 0; var st = cs(); return pw * 100 + s.pg.n * 5000 + s.sp + s.ch.lv * 100 + st.atk + st.def; }
  E.power = power;
  function xpn(l) { return Math.floor(40 * Math.pow(1.27, l)); }
  E.xpn = xpn;
  function addXp(x) { var c = s.ch, cp = Math.min(40, s.l.ocak); if (c.lv >= cp) return; c.xp += x * (1 + 0.05 * (c.tl.x || 0)) * (s.bu.xp > 0 ? 1.5 : 1) * (1 + tib('x') + hb('x') + 0.04 * (s.rs.xpb || 0)) * (1 + x6bonus('ks')); while (c.lv < cp && c.xp >= xpn(c.lv)) { c.xp -= xpn(c.lv); c.lv++; c.tp = (c.tp || 0) + 1; add('Alp Tonga ' + c.lv + '. seviye oldu.'); } }
  function dw(L) { var w = RMUL.map(function (m, i) { return BW[i] * Math.pow(m, L / 10); }), t = w.reduce(function (a, b) { return a + b; }, 0); return w.map(function (x) { return x / t; }); }
  function ivb(sl, L) { return sl === 'w' ? 5 * Math.pow(1.17, L) : sl === 'y' ? 1.75 * Math.pow(1.17, L) : sl === 'e' ? 20 * Math.pow(1.18, L) : 0.9 * Math.pow(1.17, L); }
  function gen(L) { var sl = TYP[rnd(TYP.length)], p = dw(L), x = Math.random(), r = 0; for (; r < 4 && x > p[r]; r++) x -= p[r]; var rl = 0.9 + Math.random() * 0.2; return { s: sl, r: r, L: L, v: Math.round(ivb(sl, L) * RM[r] * rl), n: IN[sl][r] }; }
  function invMax() { return 24 + ((s.x6 && s.x6.mem !== false) ? 2 * ((s.x6.b || {}).am || 0) : 0); }
  function dust(x) { return Math.floor((x.r + 1) * (3 + x.L * 1.5)); }

  /* ---------------- enerji ---------------- */
  function enTick() { var e = s.en, n = Date.now(); if (e.v >= EN_MAX) { e.v = EN_MAX; e.t = n; return; } var k = Math.floor((n - e.t) / (EN_RG * 1000)); if (k > 0) { e.v = Math.min(EN_MAX, e.v + k); e.t = e.v >= EN_MAX ? n : e.t + k * EN_RG * 1000; } }
  function enUse(c) { enTick(); if (s.en.v < c) return false; if (s.en.v >= EN_MAX) s.en.t = Date.now(); s.en.v -= c; return true; }
  function enAdd(a) { enTick(); s.en.v = Math.min(EN_MAX, s.en.v + a); }
  E.enNext = function () { var e = s.en; return e.v >= EN_MAX ? 0 : Math.max(0, Math.ceil((EN_RG * 1000 - (Date.now() - e.t)) / 1000)); };

  /* ---------------- savaş (av) ---------------- */
  function monsterBase(i) { return W.monsterBase(i); }
  function zn(m) { return ((s.x6 && s.x6.zc && s.x6.zc[m]) || 1); }
  function isAz(m) { return m >= 0 && m <= 10 && zn(m) % 14 === 0; }
  function cardMin() { return Math.max(11, s.l.ocak); }
  E.mon = function (m) { var d = M[m], az = isAz(m), L = d[2] + (az ? 2 : 0), b = m === 11, k = 1 + 0.35 * s.pg.n; return { n: d[0], e: d[1], az: az, L: L, boss: b, hp: 40 * Math.pow(1.18, L) * (b ? 1.5 : 1) * k * (az ? 2.5 : 1), atk: 9 * Math.pow(1.17, L) * (b ? 1.3 : 1) * k * (az ? 1.4 : 1), cd: s.mk[m] || 0, base: monsterBase(m), en: b ? EN_C * 2 : EN_C, lock: L > s.l.ocak }; };
  var CPS = null;
  function cpLv(i) { return i === 3 ? umLv() : ((s.ch.cpl || [])[i] || 0); }
  function cpA(n, d1, atk) { if (n === 1) { var i = s.ch.cpn, z = CP[i]; CPS = (i === undefined || i < 0 || !z || !s.ch.k[z.m]) ? null : { i: i, r: 0, f: 0, t: 0, heal: 0 }; } var c = CPS; if (!c) return d1; c.r += 25 * (1 + 0.1 * cpLv(c.i)); if (!c.f && c.r >= 100) { c.f = 1; c.t = c.i === 0 || c.i === 3 ? 0 : 4; if (c.i === 0) d1 += atk * 2; if (c.i === 3) c.heal = 0.3 + 0.04 * umLv(); if (c.i === 4) c.heal = 0.1; } if (c.f && c.t > 0) { if (c.i === 2) d1 *= 1.6; if (c.i === 4) d1 *= 1.2; } return d1; }
  function cpD(d2, hp, hm) { var c = CPS; if (!c) return [d2, hp]; c.r += 15 * (1 + 0.1 * cpLv(c.i)); if (c.heal) { hp = Math.min(hm, hp + hm * c.heal); c.heal = 0; } if (c.f && c.t > 0) { if (c.i === 1) d2 *= 0.45; if (c.i === 4) d2 *= 0.8; c.t--; } return [d2, hp]; }
  function dq(k, n) { // x6 günlük meydan
    var x = s.x6, d = new Date(Date.now() + 10800000).toISOString().slice(0, 10); if (!x.dq || x.dq.day !== d) return; var q = x.dq;
    q.t.forEach(function (t, i) { if (t.k !== k || q.c[i]) return; q.p[i] = Math.min(t.g, q.p[i] + n); if (q.p[i] >= t.g) { q.c[i] = 1; var g = Math.floor(cap0() * 0.03);['odun', 'et', 'demir'].forEach(function (r) { s.r[r] = Math.min(cap(), s.r[r] + g); }); s.ud += 10; s.sp += 10; add('Günlük meydan tamam: ' + t.n); } });
    if (!q.all && q.t.length >= 3 && q.c.filter(Boolean).length >= q.t.length) { q.all = 1; s.ud += 40; s.en.it += 2; var bk = ['a', 'f', 'h', 'x', 'd', 'r'][rnd(6)]; s.bk[bk] = (s.bk[bk] || 0) + 1; add('Üç meydan görevi de bitti: +40 toz, 2 Et Güveci, 1 kitap.'); }
  }
  var MATN = { kagit: 'Yükseltme Kağıdı', safir: 'Safir', opal: 'Opal' };
  E.fight = function (m) {
    if (!Number.isInteger(m) || !M[m]) return null; var d = M[m], az = isAz(m), L = d[2] + (az ? 2 : 0), c = s.ch, st = cs();
    if (L > s.l.ocak) return { err: 'ocak', L: L }; if (s.mk[m] > 0) return { err: 'cd' }; if (c.hp < st.hp * 0.3) return { err: 'hp' };
    var b = m === 11; if (!enUse(b ? EN_C * 2 : EN_C)) return { err: 'en' };
    var mA = 9 * Math.pow(1.17, L) * (b ? 1.3 : 1) * (1 + 0.35 * s.pg.n) * (az ? 1.4 : 1), mH = 40 * Math.pow(1.18, L) * (b ? 1.5 : 1) * (1 + 0.35 * s.pg.n) * (az ? 2.5 : 1), mD = 0.3 * mA, hp = c.hp, n = 0, mH0 = mH, hp0 = Math.max(1, hp), LG = [];
    while (hp > 0 && mH > 0 && n < 300) { n++; var d1 = cpA(n, Math.max(1, st.atk - mD) * (0.85 + Math.random() * 0.3), st.atk); mH -= d1; var d2 = 0; if (mH > 0) { d2 = Math.max(1, mA - st.def * 0.7) * (0.85 + Math.random() * 0.3); var cq = cpD(d2, hp, st.hp); d2 = cq[0]; hp = cq[1]; hp -= d2; } LG.push([d1, d2, Math.max(0, mH) / mH0, Math.max(0, hp) / hp0]); }
    var R = { win: mH <= 0, n: n, L: L, name: d[0], e: d[1], log: LG, loot: [] };
    if (R.win) {
      c.hp = Math.max(1, hp); s.mk[m] = 60; var sp = monsterBase(m), first = !c.k[sp]; c.k[m] = 1; if (first) c.k[sp] = 1;
      var xp = Math.floor(10 * Math.pow(1.22, L) * (b ? 2 : 1)) * (az ? 3 : 1); addXp(xp); R.loot.push(['xp', xp]);
      var rr = ['odun', 'et', 'demir'][rnd(3)], ra = Math.floor(nrate(L) * 0.1) * (az ? 3 : 1); s.r[rr] = Math.min(cap(), s.r[rr] + ra); R.loot.push([rr, ra]);
      if (Math.random() < 0.12) { s.en.it++; R.loot.push(['guvec', 1]); }
      if (az || Math.random() < (b ? 1 : (0.65 + 0.04 * (c.tl.d || 0) + hb('d')) * (s.bu.dr > 0 ? 1.5 : 1))) { var it = gen(L); if (c.inv.length >= invMax()) { var sv = dust(it); s.ud += sv; R.loot.push(['toz', sv]); } else { c.inv.push(it); R.loot.push(['esya', it]); } }
      if (d[2] >= cardMin() && Math.random() < (b ? 0.15 : 0.06 * (s.bu.dr > 0 ? 1.5 : 1))) { var ci = sp % HH.length; s.hc[ci]++; R.loot.push(['kart', ci]); }
      if (Math.random() < (b ? 0.07 : az ? 0.25 : 0.025 * (s.bu.dr > 0 ? 1.5 : 1))) { var bkT = TL[sp % 6][0]; s.bk[bkT] = (s.bk[bkT] || 0) + 1; R.loot.push(['kitap', bkT]); }
      if (Math.random() < 0.2) { var hi = rnd(HR.length); s.hr[hi].sh++; R.loot.push(['parca', hi]); }
      // Demirci malzemeleri (ergenekon-demirci.js): kağıt %5, safir %2,5 (Sv4+), opal %2,5 (Sv8+)
      var mt = s.ek.dm.mat; if (Math.random() < .05) { mt.kagit++; R.loot.push(['kagit', 1]); } if (L >= 4 && Math.random() < .025) { mt.safir++; R.loot.push(['safir', 1]); } if (L >= 8 && Math.random() < .025) { mt.opal++; R.loot.push(['opal', 1]); }
      s.d.p.hunt = (s.d.p.hunt || 0) + 1; s.stat.kills++; if (sp === 12) s.stat.cay = (s.stat.cay || 0) + 1;
      s.x6.zc[m] = zn(m) + 1; dq('kill', 1); if (az) dq('az', 1); if (sp === 12) dq('cay', 1);
      var ms = s.ek.ms = s.ek.ms || {}; ms[sp] = (ms[sp] || 0) + 1;
      add('Zafer: ' + d[0] + ' (Sv ' + L + ')');
    } else { c.hp = 0; add(d[0] + ' (Sv ' + L + ') seni yendi. Alp dinleniyor.'); }
    s.last = (R.win ? 'Zafer: ' : 'Yenilgi: ') + d[0] + ' Sv ' + L; act(); return R;
  };
  E.matName = MATN;

  /* ---------------- harita ---------------- */
  function maxLv() { return 1 + Math.floor(s.l.ocak / 2); }
  function sqn() { return 1 + Math.floor(s.l.ocak / 8) + Math.floor((s.rs.command || 0) / 5); }
  function marchCapacity() { return Math.floor(1200 * (1 + .15 * s.l.ocak + .1 * s.l.ambar) * (1 + .1 * (s.rs.camp || 0)) * (1 + .08 * (s.rs.logistics || 0))); }
  function mt(i) { var p = W.pos(i); return Math.max(1, Math.ceil((20 + Math.hypot(p[0] - 50, p[1] - 50) * 4) * (1 - 0.2 * (s.ch.mt || 0)) / (1 + .03 * (s.rs.march || 0)))); }
  function gatherRate(n) { var e = evt(); return nrate(n.lv) * (e.k === 'mine' ? 1.5 : 1) * pm() * (1 + 0.04 * (s.rs.mine || 0) + hb('m')) * (1 + 0.06 * hl('mine')) * (1 + .05 * (s.rs[{ odun: 'gatherwood', et: 'gathermeat', demir: 'gatheriron' }[n.t]] || 0) + wosBonus({ odun: 'Wood', et: 'Meat', demir: 'Iron', komur: 'Coal' }[n.t] + ' Gathering Speed') + wosBonus('Gathering Speed') + 0.03 * ((s.ek.dm && s.ek.dm.lv) || 0) + (prem() ? .35 : 0)) * 3; }
  E.maxLv = maxLv; E.sqn = sqn; E.marchCap = marchCapacity; E.mt = mt; E.gatherRate = gatherRate;
  function recall(j) { var q = s.sq[j]; if (q.st !== 1 && q.st !== 2) return; var t = mt(q.n); q.left = q.st === 1 ? Math.max(5, t - q.left) : t; q.st = 3; }
  E.recall = function (j) { recall(j); act(); };
  E.send = function (i) { var n = s.nodes[i]; if (!n || n.lv > maxLv() || n.rg > 0 || n.res <= 0) return false; var j = s.sq.findIndex(function (q) { return q.st === 0; }); if (j < 0) return false; s.sq[j] = { st: 1, n: i, left: mt(i), cargo: 0, capacity: marchCapacity(), resource: n.t }; add('Kafile ' + (j + 1) + ' yola çıktı.'); act(); return true; };
  E.idleSq = function () { return s.sq.filter(function (q) { return q.st === 0; }).length; };

  /* ---------------- ordu / yaralı ---------------- */
  function troopTier(i) { return (s.ttiers && s.ttiers[i]) || 1; }
  function troopFactor(i) { return 1 + .35 * (troopTier(i) - 1); }
  function formationFactor(i) { return !s.formation ? 1 : s.formation - 1 === i ? 1.18 : .94; }
  function trA(i) { return 1 + .03 * (s.rs[['infatk', 'cavatk', 'archatk'][i]] || 0); }
  function trD(i) { return 1 + .02 * (s.rs[['infdef', 'cavdef', 'archdef'][i]] || 0); }
  function trH(i) { return 1 + .03 * (s.rs[['infhp', 'cavhp', 'archhp'][i]] || 0); }
  function tpow() { return s.tr.reduce(function (sum, n, i) { return sum + n * TRM[i] * troopFactor(i) * formationFactor(i) * trA(i) * Math.sqrt(trD(i) * trH(i)); }, 0) * 10 * Math.pow(1.18, s.l.ocak) * (1 + 0.05 * (s.rs.war || 0)) * (1 + 0.06 * hl('war')) * (1 + hb('w')); }
  function woundArmy(lo) { var t = 0; for (var k = 0; k < 3; k++) { var o0 = s.tr[k], ratio = Math.max(0, Math.min(1, lo)) * (1 - Math.min(.2, .02 * (s.rs.triage || 0))) / (trD(k) * trH(k)), n0 = Math.floor(o0 * (1 - ratio)), ls = o0 - n0; s.tr[k] = n0; s.wd[k] += ls; t += ls; } return t; }
  E.tpow = tpow;
  function raidAtk() { return 40 * Math.pow(1.18, s.l.ocak) * (1 + s.l.ocak / 10); }
  function raidDef() { var st = cs(); return (st.atk + 1.5 * st.def + 30 * s.l.ocak + 100 * s.al.terr.length + tpow() * 0.05) * (1 + 0.05 * (s.ch.tl.r || 0)) * (1 + 0.05 * s.l.sur + hb('r') + 0.05 * (s.rs.trap || 0)); }
  E.raid = function () { return { atk: raidAtk(), def: raidDef(), t: s.raid.t }; };
  function raid() {
    var a = raidAtk(), d = raidDef(), R = s.r, w = d >= a * (0.8 + Math.random() * 0.4);
    var wr = woundArmy(w ? 0.03 + 0.12 * a / (a + d) : 0.1 + 0.3 * a / (a + d)); if (wr) add('Akında ' + wr + ' asker yaralandı (ölen yok).');
    if (w) { var g = Math.floor(cap() * 0.01); RES4.forEach(function (k) { R[k] = Math.min(cap(), (R[k] || 0) + g); }); s.sp += 10; s.stat.raidw = (s.stat.raidw || 0) + 1; add('Erlik Han’ın ordusu püskürtüldü.'); }
    else { RES4.forEach(function (k) { R[k] = Math.floor((R[k] || 0) * (1 - Math.max(0.05, 0.25 - 0.02 * s.l.ambar - .01 * (s.rs.protection || 0)))); }); add('Erlik Han’ın ordusu obayı yağmaladı. Ambar kaybı azaltır.'); }
  }

  /* ---------------- günlük sıfırlamalar ---------------- */
  function newWb() { var m = Math.floor(2000 * cs().atk); s.wb = { day: dayk(), max: m, hp: m, dmg: 0, cd: 0, cl: false, n: ['Kara Kağan’ın Gölgesi', 'Demir Dağ Devi', 'Erlik’in Ejderi', 'Buz Çağı Canavarı'][Math.floor(Date.now() / 864e5) % 4] }; }
  function chk() {
    if (s.d.day !== dayk()) s.d = { day: dayk(), p: {}, c: {} };
    if (s.dg.day !== dayk()) s.dg = { day: dayk(), n: 3, best: s.dg.best || 0, gk: s.dg.gk || [0, 0, 0, 0] };
    if (s.ar.day !== dayk()) { s.ar.day = dayk(); s.ar.n = 5; }
    if (s.cxd !== dayk()) { s.cxd = dayk(); s.cx = [0, 0, 0, 0, 0, 0, 0, 0]; }
    if (s.wb.day !== dayk()) newWb();
    // Nevruz haftası ve sezon sonu ödüllerini eski oyun verir; yeni oyun bu alanlara dokunmaz.
  }

  /* ---------------- zaman ---------------- */
  function tick(dt, quiet) {
    enTick(); var L = s.l, R = s.r, f = factor() * pm(), cp = cap(), A = s.al, e = evt(); chk();
    while (s.sq.length < sqn()) s.sq.push({ st: 0, n: -1, left: 0 });
    var o = R.odun + ECO() * (0.3 * (0.5 + L.odunluk * Math.pow(1.095, L.odunluk)) * f * evm('odun') * jm('odun') * (1 + 0.05 * (s.rs.wood || 0) + wosBonus('Wood Output')) - 0.03 * Math.pow(L.ocak, 1.3) * (1 - Math.min(.2, .02 * (s.rs.fuel || 0)))) * dt;
    R.et = Math.max(0, R.et + ECO() * (0.3 * (0.3 + 0.8 * L.avci * Math.pow(1.095, L.avci)) * f * evm('et') * jm('et') * (1 + 0.05 * (s.rs.meat || 0) + wosBonus('Meat Output')) - 0.03 * halk() * (1 - Math.min(.2, .02 * (s.rs.rations || 0)))) * dt);
    R.demir += ECO() * 0.12 * L.demirci * Math.pow(1.095, L.demirci) * f * evm('demir') * jm('demir') * (1 + 0.05 * (s.rs.iron || 0) + wosBonus('Iron Output')) * dt;
    R.komur = (R.komur || 0) + ECO() * 0.12 * (L.komurluk || 0) * Math.pow(1.095, L.komurluk || 0) * f * (1 + wosBonus('Coal Output')) * dt;
    s.nodes.forEach(function (n) { if (n.rg > 0) { n.rg -= dt; if (n.rg <= 0) { n.rg = 0; n.res = n.max; } } });
    s.sq.forEach(function (q, j) {
      var n = s.nodes[q.n];
      if (q.st === 1) { q.left -= dt; if (q.left <= 0) q.st = (n.rg > 0 || n.res <= 0) ? (q.left = mt(q.n), 3) : 2; }
      else if (q.st === 2) {
        if (!Number.isFinite(q.cargo)) q.cargo = 0; if (!q.capacity) q.capacity = marchCapacity(); q.resource = n.t; if (n.rg > 0) { recall(j); return; }
        var a = Math.min(gatherRate(n) * dt / 3600, n.res, Math.max(0, q.capacity - q.cargo)); n.res -= a; q.cargo += a; s.d.p.mine = (s.d.p.mine || 0) + a; s.stat.mined += a;
        if (q.cargo >= q.capacity - .01) recall(j);
        if (n.res <= 0.01) { n.res = 0; n.rg = 21600; s.sq.forEach(function (x, y) { if (x.n === q.n) recall(y); }); }
      } else if (q.st === 3) { q.left -= dt; if (q.left <= 0) { var cargo = Math.max(0, q.cargo || 0), kind = q.resource || (n && n.t); if (cargo && kind) { if (kind === 'odun') o += cargo; else R[kind] = (R[kind] || 0) + cargo; if (!quiet) add('Kafile ' + (j + 1) + ' döndü: +' + E.nf(cargo) + ' ' + (RN[kind] || kind)); } q.cargo = 0; q.st = 0; q.n = -1; } }
      else if (q.st === 4) { q.left -= dt; if (q.left <= 0) { q.st = 0; } }
    });
    if (o > 0) { R.odun = o; s.heat = Math.min(100, s.heat + 3 * dt); } else { R.odun = 0; s.heat = Math.max(0, s.heat - 1.5 * dt); }
    RES4.forEach(function (x) { R[x] = Math.min(R[x] || 0, cp); });
    if (s.pray > 0) s.pray = Math.max(0, s.pray - dt * (e.k === 'pray' ? 2 : 1));
    var st = cs(); s.ch.hp = Math.min(st.hp, s.ch.hp + st.hp / 1200 * (1 + 0.1 * (s.l.sifa || 0) + 0.08 * (s.rs.heal || 0) + 0.05 * umLv()) * dt);
    mood(dt);
    for (var mi = 0; mi < s.mk.length; mi++) if (s.mk[mi] > 0) s.mk[mi] = Math.max(0, s.mk[mi] - dt);
    if (s.wb.hp > 0) s.wb.hp = Math.max(0, s.wb.hp - s.wb.max * 0.6 / 86400 * dt); if (s.wb.cd > 0) s.wb.cd = Math.max(0, s.wb.cd - dt);
    if (L.ocak >= 3) { s.raid.t -= dt; if (s.raid.t <= 0) { s.raid.t = 14400; raid(); } }
    if (s.rq) { s.rq.left -= dt; if (s.rq.left <= 0) { s.rs[s.rq.k] = (s.rs[s.rq.k] || 0) + 1; add(s.rq.n + ' ' + s.rs[s.rq.k] + '. seviye oldu.'); s.rq = null; } }
    if (s.tq) { s.tq.left -= dt; if (s.tq.left <= 0) { if (s.tq.kind === 'promote') { s.ttiers[s.tq.k] = s.tq.targetTier; } else { s.tr[s.tq.k] += s.tq.n; } add('Eğitim tamamlandı.'); s.tq = null; } }
    if (s.hq) { s.hq.left -= dt; if (s.hq.left <= 0) { var hn = 0; for (var w = 0; w < 3; w++) { s.tr[w] += s.hq.n[w]; hn += s.hq.n[w]; } add(hn + ' yaralı iyileşti.'); s.hq = null; } }
    var x = s.x6; if (x.plT > 0) x.plT = Math.max(0, x.plT - dt); s.dg.gk = (s.dg.gk || [0, 0, 0, 0]).map(function (v) { return Math.max(0, v - dt); });
    x.rf.forEach(function (r, m) { if (!r || typeof r !== 'object') return; if (r.rt > 0) { r.rt -= dt; if (r.rt <= 0) { r.rt = 0; r.hp = 12 * 40 * Math.pow(1.18, M[m][2]) * (m === 11 ? 1.5 : 1) * (1 + 0.35 * s.pg.n); r.s1 = 0; r.s2 = 0; r.sol = []; } } if (r.sol && r.sol.length) r.sol = r.sol.map(function (v) { return v - dt; }).filter(function (v) { return v > 0; }); });
    A.pow += 0.4 * (1 + A.terr.length) * dt; A.tm = (A.tm || 0) + dt; if (A.tm >= 70) { A.tm = 0; if (A.hq < 5) A.hq++; }
    ['q', 'q2'].forEach(function (slot) {
      var q = s[slot]; if (!q) return;
      if (q.req && q.h < 10 + Math.floor(s.l.ocak / 4)) { q.helpTime = (q.helpTime || 0) + dt; if (q.helpTime >= 25) { q.helpTime = 0; q.h++; q.left = Math.max(1, q.left - 240 * (e.k === 'help' ? 2 : 1)); } }
      q.left -= dt * (e.k === 'build' ? 1.25 : 1) * (1 + 0.03 * (s.rs.bld || 0) + hb('b') + wosBonus('Construction Speed'));
      if (q.left <= 0) {
        var k = q.k, before = power(); L[k] = (L[k] || 0) + 1; s[slot] = null;
        if (!quiet && E.onLevel) E.onLevel(k, L[k], power() - before);
        add(B[k].n + ' ' + L[k] + '. seviye oldu.'); if (k === 'ocak' && STORY[L.ocak]) add(STORY[L.ocak]);
        if (L.ocak >= GOAL && !s.won) s.won = true; s._autosave = { actionAt: Date.now(), actionId: String(Math.random()).slice(2) };
      }
    });
    if (!s.q && s.q2) { s.q = s.q2; s.q2 = null; }
    // 3'lü yükseltme sırası (ergenekon-sistem.js): usta boşalınca sıradaki başlar
    var uq = s.ek.uq; if (uq && uq.length && buildQueues().length < builders()) { var nk = uq[0]; if (can(nk)) { uq.shift(); E.start(nk); } else if (!B[nk] || (s.l[nk] || 0) >= maxLevel(nk)) uq.shift(); }
  }
  E.tick = function (dt) { tick(dt); accrueBins(Date.now()); };

  /* ---------------- görevler ---------------- */
  // Destan (eski QU): yalnız tamamlanma koşulları ve ödülü
  var QU = E.QU = [
    ['Boylar vadide mahsur. Kam, Tengri’ye yakarır: “Ateş sönmesin.”', 'Ocağı Sv 2’ye yükselt', function () { return [s.l.ocak, 2]; }, 'b:ocak'],
    ['Dede Korkut boyları toplar: “Önce hayatta kalın.”', 'Odunluk ve Avcı Çadırı kur', function () { return [(s.l.odunluk >= 1 ? 1 : 0) + (s.l.avci >= 1 ? 1 : 0), 2]; }, 'b:odunluk'],
    ['Genç Alp Tonga kılıcını kuşanır.', 'Alp Tonga’yı Sv 3’e çıkar', function () { return [s.ch.lv, 3]; }, 'harita'],
    ['Vadinin kapısında kurtlar uluyor.', 'Bozkır Kurdu’nu yen', function () { return [s.ch.k[0] ? 1 : 0, 1]; }, 'harita'],
    ['Bilge Tonyukuk yeni bilgiler arar.', 'Bir araştırmayı tamamla', function () { return [Object.keys(s.rs).some(function (k) { return s.rs[k] > 0; }) ? 1 : 0, 1]; }, 'eski'],
    ['Ocak harlandı, dağ hâlâ sessiz.', 'Ocağı Sv 5’e çıkar', function () { return [s.l.ocak, 5]; }, 'b:ocak'],
    ['Erlik Han’ın gölgeleri yaklaşıyor.', '50 asker eğit', function () { return [s.tr[0] + s.tr[1] + s.tr[2], 50]; }, 'eski'],
    ['Yeraltında eski bir mağara bulundu.', 'Zindanda 3. kata ulaş', function () { return [s.dg.best || 0, 3]; }, 'eski'],
    ['Kadim bilgeler çağrıya cevap verir.', 'Bir bilgeyi aç', function () { return [s.hr.some(function (h) { return h.lv >= 1; }) ? 1 : 0, 1]; }, 'eski'],
    ['Karşı saldırı zamanı.', 'Karanlık Karakol’u fethet', function () { return [s.cz.length >= 1 ? 1 : 0, 1]; }, 'eski'],
    ['Dağın bağrı kızarıyor, demir yumuşuyor.', 'Ocağı Sv 20’ye çıkar', function () { return [s.l.ocak, 20]; }, 'b:ocak'],
    ['Son savaş: Erlik Han’ın tahtı.', 'Erlik Han’ı yen', function () { return [s.ch.k[11] ? 1 : 0, 1]; }, 'harita']
  ];
  E.destan = function () { var q = QU[s.qu]; if (!q) return null; var p = q[2](); return { i: s.qu, s: q[0], t: q[1], v: Math.min(p[0], p[1]), g: p[1], ok: p[0] >= p[1], go: q[3], rw: Math.floor(600 * Math.pow(1.4, s.l.ocak)) }; };
  E.destanClaim = function () { var d = E.destan(); if (!d || !d.ok) return null; var rw = Math.floor(600 * Math.pow(1.4, s.l.ocak)); RES4.forEach(function (r) { s.r[r] = Math.min(cap(), (s.r[r] || 0) + rw); }); s.sp += 15; s.hr[rnd(HR.length)].sh += 3; s.qu++; add('Destan bölümü tamamlandı.'); act(); return rw; };
  // Günlük görevler (ergenekon-cag.js)
  var GT = E.GT = [
    { k: 'kill', n: '5 canavar avla', g: function () { return 5; }, v: function () { return (s.stat && s.stat.kills) || 0; }, go: 'av' },
    { k: 'mine', n: 'Haritadan kaynak topla', g: function () { return Math.round(800 * Math.pow(1.25, s.l.ocak || 1)); }, v: function () { return (s.stat && s.stat.mined) || 0; }, go: 'harita' },
    { k: 'build', n: 'Bir yükseltme başlat', g: function () { return 1; }, v: function () { return (s.d && s.d.p && s.d.p.build) || 0; }, daily: 1, go: 'insa' },
    { k: 'help', n: '3 boydaşa yardım et', g: function () { return 3; }, v: function () { return (s.d && s.d.p && s.d.p.help) || 0; }, daily: 1, go: 'boy' },
    { k: 'arena', n: '1 arena düellosu', g: function () { return 1; }, v: function () { return (s.stat && s.stat.arena) || 0; }, go: 'eski' }
  ];
  function gg() { var e = s.ek, d = localDayNum(); if (!e.gg || e.gg.d !== d) { e.gg = { d: d, b: {}, cl: 0 }; GT.forEach(function (t) { e.gg.b[t.k] = t.daily ? 0 : t.v(); }); } return e.gg; }
  E.daily = function () { var g = gg(); return GT.map(function (t) { var v = Math.max(0, t.v() - (g.b[t.k] || 0)), goal = t.g(); return { k: t.k, n: t.n, v: Math.min(v, goal), g: goal, ok: v >= goal, go: t.go }; }); };
  E.dailyClaimed = function () { return !!gg().cl; };
  E.dailyClaim = function () { var g = gg(); if (g.cl || E.daily().filter(function (x) { return x.ok; }).length < 5) return null; g.cl = 1; var r = Math.round(1500 * Math.pow(1.25, s.l.ocak || 1));['odun', 'et', 'demir'].forEach(function (k) { s.r[k] = (s.r[k] || 0) + r; }); s.ek.dm.mat.kagit += 1; var ei = s.ek.ei = s.ek.ei || { s: 0, l: 0 }; ei.s += 1; var ks = E.ks(); ks.m5 += 1; act(); return { r: r }; };
  // Günlük meydan (x6.dq)
  E.meydan = function () { var q = s.x6.dq, d = new Date(Date.now() + 10800000).toISOString().slice(0, 10); if (!q || q.day !== d) return null; return q.t.map(function (t, i) { return { n: t.n, v: q.p[i], g: t.g, ok: !!q.c[i] }; }); };

  /* ---------------- Dilek Kuyusu (günlük hediye sandığı, ergenekon-sistem.js) ---------------- */
  E.wellDue = function () { return s.ek.dc !== localDay(); };
  E.wellPreview = function () { var o = s.l.ocak || 1, g = Math.pow(1.32, o - 1), r = [['odun', Math.round(400 * g)], ['et', Math.round(350 * g)], ['demir', Math.round(120 * g)]]; if (o >= 5) r.push(['komur', Math.round(60 * g)]); return r; };
  E.wellClaim = function () {
    if (!E.wellDue()) return null; var list = E.wellPreview(); list.push(['kagit', 1 + (Math.random() < .35 ? 1 : 0)]); if (Math.random() < .12) list.push(['safir', 1]);
    s.ek.dc = localDay(); var mt = s.ek.dm.mat, c = cap();
    list.forEach(function (it) { var k = it[0], v = it[1]; if (k === 'kagit' || k === 'safir') mt[k] = (mt[k] || 0) + v; else s.r[k] = Math.min(k === 'komur' ? Infinity : c, (s.r[k] || 0) + v); });
    act(); return list;
  };

  /* ---------------- kahramanlar ---------------- */
  E.heroUp = function (i) { var st = s.hs[i]; if (st >= 5 || s.hc[i] < HSC[st]) return false; s.hc[i] -= HSC[st]; s.hs[i]++; add(HH[i].n + ' ' + s.hs[i] + ' yıldız oldu.'); act(); return true; };
  E.cardMin = cardMin;

  /* ---------------- kurt (Bozkurt Yavrusu) ---------------- */
  var PADV = E.PADV = [{ n: 'Kısa keşif', h: 1, lv: 1, xp: 15, m: 0.08, g: 0.3, c: 0, sh: 0 }, { n: 'Av gezisi', h: 4, lv: 3, xp: 40, m: 0.25, g: 1, c: 0.4, sh: 0 }, { n: 'Uzun macera', h: 12, lv: 5, xp: 100, m: 0.6, g: 3, c: 2, sh: 2 }];
  E.petOk = function () { return s.l.ocak >= 4; };
  E.ptAmt = function () { return 60 + 10 * (s.pt.lv - 1); };
  E.ptNeed = function () { return 30 * (30 + 20 * s.pt.lv); };
  E.ptFeedC = function () { return Math.floor(80 * Math.pow(1.3, s.l.ocak)); };
  function ptXp(x) { var p = s.pt; if (p.lv >= 10) return; p.xp += x; while (p.lv < 10 && p.xp >= E.ptNeed()) { p.xp -= E.ptNeed(); p.lv++; add('Bozkurt Yavrusu ' + p.lv + '. seviye oldu.'); } }
  E.ptFeed = function () { var c = E.ptFeedC(); if (s.pt.lv >= 10 || s.r.et < c) return false; s.r.et -= c; ptXp(10); act(); return true; };
  E.ptUse = function () { var e = s.en; if (!E.petOk() || s.pt.adv || e.v >= EN_MAX || Date.now() < (e.pet || 0)) return false; enAdd(E.ptAmt()); e.pet = Date.now() + 86400000; add('Bozkurt Yavrusu seni coşturdu: +' + E.ptAmt() + ' enerji.'); act(); return true; };
  E.ptGo = function (i) { var p = s.pt, a = PADV[i]; if (p.adv || !E.petOk() || p.lv < a.lv) return false; p.adv = { k: i, end: Date.now() + a.h * 3600000 }; add('Bozkurt Yavrusu ' + a.n + ' için yola çıktı.'); act(); return true; };
  E.ptClaim = function () { var p = s.pt, v = p.adv; if (!v || Date.now() < v.end) return null; var a = PADV[v.k], rr = ['odun', 'et', 'demir'][rnd(3)], g = Math.floor(nrate(s.l.ocak) * a.m), it = Math.floor(a.g) + (Math.random() < a.g % 1 ? 1 : 0), cd2 = Math.floor(a.c) + (Math.random() < a.c % 1 ? 1 : 0), out = [[rr, g]]; s.r[rr] = Math.min(cap(), s.r[rr] + g); s.en.it += it; if (it) out.push(['guvec', it]); if (cd2) { s.hc[rnd(HH.length)] += cd2; out.push(['kart', cd2]); } if (a.sh) { s.hr[rnd(HR.length)].sh += a.sh; out.push(['parca', a.sh]); } ptXp(a.xp); p.adv = null; act(); return out; };
  E.enSup = function () { var e = s.en; if (Date.now() < e.sup || e.v >= EN_MAX) return false; enAdd(EN_SUPV); e.sup = Date.now() + EN_SUP * 1000; add('Ocak Ziyafeti: +' + EN_SUPV + ' enerji.'); act(); return true; };
  E.enItem = function () { var e = s.en; if (e.it < 1 || e.v >= EN_MAX) return false; e.it--; enAdd(10); act(); return true; };

  /* ---------------- posta ---------------- */
  function mail(t, rw, f) { s.mb.unshift({ t: t, f: f || 'Sistem', d: Date.now(), rw: rw || null }); if (s.mb.length > 50) s.mb.pop(); }
  E.mailCat = function (m) { var t = m.t; if (/akın|Akın|Nevruz|Boss|boss|avaş|kuşat|İmtihan|Arena|arena|Zafer|Simurg/.test(t)) return 'sv'; if (/Sefer|Destan|Defter|örev|dül|andık|iriş|Sezon|Başarım|puan|Rapor/.test(t)) return 'ra'; return 'si'; };
  E.mailHas = function (m) { var rw = m.rw; if (!rw) return false; if (rw.r && Object.keys(rw.r).some(function (k) { return rw.r[k] > 0; })) return true; if (rw.sp || rw.ud) return true; if ((rw.sh || []).some(function (v) { return v > 0; }) || (rw.cards || []).some(function (v) { return v > 0; })) return true; if ((rw.items || []).length) return true; if (rw.ek && (rw.ek.mat || rw.ek.ks || rw.ek.ei)) return true; return false; };
  E.mailCollect = function (i, quiet) {
    var m = s.mb[i]; if (!m) return; var rw = m.rw || {}; if (rw.r) for (var k in rw.r) s.r[k] = Math.min(RES4.indexOf(k) >= 0 ? cap() : Infinity, (s.r[k] || 0) + rw.r[k]);
    s.sp += rw.sp || 0; s.ud += rw.ud || 0; (rw.sh || []).forEach(function (v, j) { if (s.hr[j]) s.hr[j].sh += v; }); (rw.cards || []).forEach(function (v, j) { s.hc[j] = (s.hc[j] || 0) + v; });
    if (rw.ek) { var x = rw.ek; if (x.mat) for (var a in x.mat) s.ek.dm.mat[a] = (s.ek.dm.mat[a] || 0) + x.mat[a]; if (x.ks) { var ks = E.ks(); for (var b in x.ks) ks[b] = (ks[b] || 0) + x.ks[b]; } if (x.ei) { var ei = s.ek.ei = s.ek.ei || { s: 0, l: 0 }; for (var c in x.ei) ei[c] = (ei[c] || 0) + x.ei[c]; } rw.ek = null; }
    var its = rw.items || []; while (its.length && s.ch.inv.length < invMax()) s.ch.inv.push(its.shift());
    rw.r = null; rw.sp = 0; rw.ud = 0; rw.sh = null; rw.cards = null; m.rw = rw; m.rd = 1; if (!its.length) s.mb.splice(i, 1); if (!quiet) act();
  };
  E.mailRead = function (i) { var m = s.mb[i]; if (m && !m.rd) { m.rd = 1; save(); } };
  E.mailAll = function () { for (var i = s.mb.length - 1; i >= 0; i--) { if (E.mailHas(s.mb[i])) E.mailCollect(i, true); s.mb[i].rd = 1; } act(); };
  E.mailCleanRead = function () { s.mb = s.mb.filter(function (m) { return !m.rd || E.mailHas(m); }); act(); };

  /* ---------------- boy ---------------- */
  // Hepsine yardım (ergenekon-kolay.js): bekleyen istek sayısı s.al.hq (70 sn'de bir artar, en çok 5)
  E.helpN = function () { return (s.al && s.al.hq) || 0; };
  E.helpAll = function () { var n = E.helpN(); if (!n) return 0; s.al.hq = 0; s.d.p.help = (s.d.p.help || 0) + n; s.sp = (s.sp || 0) + n; s.ek.hp = (s.ek.hp || 0) + n; act(); return n; };

  // Ocak hediyesi (ergenekon-ocak.js + ocak2 seviye çarpanı): 45 dk'da 1, en çok 25
  function oc() { var e = s.ek; e.oc = e.oc || { g: 3, gt: Date.now(), feed: [], ak: {} }; return e.oc; }
  E.gifts = function () { var o = oc(), iv = 45 * 60e3, n = Math.floor((Date.now() - o.gt) / iv); if (n > 0) { o.g = Math.min(25, o.g + n); o.gt += n * iv; } return o.g; };
  E.giftLv = function () { var x = oc().gx || 0, l = Math.floor(Math.sqrt(x / 6)); return { lv: l + 1, pc: (x - 6 * l * l) / (6 * (l + 1) * (l + 1) - 6 * l * l) }; };
  E.giftClaim = function () {
    var o = oc(), n = E.gifts(); if (!n) return null; var m = s.ek.dm.mat, tot = { r: 0, k: 0, c: 0, e: 0 }, mul = 1 + (E.giftLv().lv - 1) * .1, c = cap();
    for (var i = 0; i < n; i++) { var r = Math.random(); if (r < .1) { m.kagit++; tot.k++; } else if (r < .25) { var h = rnd(HH.length); s.hc[h] = (s.hc[h] || 0) + 1; tot.c++; } else if (r < .4) { s.en.v = Math.min(EN_MAX, s.en.v + 5); tot.e += 5; } else { var g = Math.round(400 * Math.pow(1.25, s.l.ocak || 1) * mul), k = ['odun', 'et', 'demir'][rnd(3)]; s.r[k] = Math.min(c, (s.r[k] || 0) + g); tot.r += g; } }
    o.g = 0; o.gx = (o.gx || 0) + n; act(); return tot;
  };
  E.boy = function () { var e = s.ek; if (!e.boy) e.boy = { n: 'Kök Böri', tg: -1, rank: 'han', ranks: {}, pin: null, blk: {}, mute: {}, ws: { w: 0 }, seen: Date.now(), mem: null }; return e.boy; };
  E.boyMem = function () { var b = E.boy(); return b.mem || ['Tolga', 'Aigerim', 'Mehmet', 'John', 'Ayşe', 'Dmitri', 'Yusuf', 'Min']; };
  E.chatSend = function (txt) { txt = String(txt || '').trim().slice(0, 120); if (!txt) return; s.chat = s.chat || []; s.chat.push({ u: (s.ek.nm || 'Alp Tonga'), lg: 'TR', txt: txt, tr: '', me: 1 }); if (s.chat.length > 40) s.chat.shift(); act(); };
  // Çanta
  E.melt = function (i) { var c = s.ch, x = c.inv[i]; if (!x) return 0; c.inv.splice(i, 1); s.d.p.melt = (s.d.p.melt || 0) + 1; s.stat.melt = (s.stat.melt || 0) + 1; dq('melt', 1); var v = dust(x); s.ud += v; act(); return v; };
  E.equip = function (i) { var c = s.ch, x = c.inv[i]; if (!x) return; var ks = x.s === 'e' ? ['e0', 'e1'] : x.s === 'y' ? ['y0', 'y1'] : [x.s], ky = ks.filter(function (k) { return !c.eq[k]; })[0] || ks.sort(function (a, b) { return ev(c.eq[a]) - ev(c.eq[b]); })[0], o = c.eq[ky]; c.inv.splice(i, 1); c.eq[ky] = x; if (o) c.inv.push(o); c.hp = Math.min(c.hp, cs().hp); act(); };
  E.better = function (x) { var c = s.ch, ks = x.s === 'e' ? ['e0', 'e1'] : x.s === 'y' ? ['y0', 'y1'] : [x.s], w = ks.map(function (k) { return c.eq[k] ? ev(c.eq[k]) : 0; }); return ev(x) - Math.min.apply(null, w); };

  /* ---------------- dışa ---------------- */
  E.B = B; E.ALLEQ = ALLEQ; E.invMax = invMax; E.dust = dust; E.halk = halk; E.umLv = umLv;
})(window);
