/* Ergenekon — Altay görünümü: 2.5D oba (King of Altay mantığı). Claude, 22 Kasım 2026.
   3D oba sahnesinin yerine: boyalı zemin + elle çizilmiş bina görselleri (assets/img/bina_*_t1..t4) sabit yuvalarda,
   NPC otağları, seviye levhaları, yapım süresi, yükseltilebilir oku, hilal; sol sütunda oba işleri; kaydır/yakınlaştır.
   Oyun mantığı, kayıt ve kurallar aynen: binaya dokununca oyunun kendi yapı penceresi açılır (window.BMK).
   3D oba ve modelleri 22 Kasım'da kaldırıldı; 3D sahne yalnız parsel/arka plan hesapları için yüklenir, çizilmez. */
(function () {
  'use strict';
  var W = window, D = document, H = D.documentElement;
  if (W.__ekAO) return; W.__ekAO = true;
  function on() { return true; } // 3D oba kaldırıldı (22 Kasım)
  var IMGP = './assets/img/';
  /* King of Altay düzeni: telefon genişliğinde dikey şehir, basamaklı yaylalar (kaya duvarlarıyla ayrılır), yalnız yukarı-aşağı kaydırma */
  /* 25 Kasım: King of Altay şehir düzeni — saray (Boy Obası) en üst yaylada, iki yanında Kurultay ve Boy Meclisi;
     aşağı indikçe her yaylada sol·orta·sağ sıkı 3'lü sıralar; sur en altta, dışında Sefer/Arena/Ağıl. Boş çayır yok. */
  /* 26 Kasım: King of Altay ekran görüntülerine göre (kullanıcının gönderdiği 20 görüntü):
     tepe: maden (Kömürlük) + ana yapı Kutsal Ocak ("Kale") + Gözcü · 2. yayla: Akın Tuğu ("Duyuru Tahtası"), Boy Obası, Kurultay ("Kahraman Salonu")
     · 3. yayla: Boy Meclisi ("Elçilik"), Bilgelik ("Akademi"), Harp Ocağı, Demirci/Ambar ("Demirhane/Depo") · 4. yayla: Kışla, Arena ("Eğitim Alanı"),
     Ağıl/Sefer, Yurt/Şifahane · Sur ("Şehir Duvarı") · sur dışı: Odunluk ("Kereste", nehir kıyısı) ve Avcı Çadırı ("Çiftlik", tarlalar). */
  var WW = 1700, WH = 5400, CX = 850, CY = 1000;
  var CLIFF = [1330, 2420, 3520];
  var WALLY = 4700; // sur (şehir duvarı) çizgisi
  // bina yuvaları: [x, y(taban), genişlik, görsel] — ekran ~1000 birim gösterir (x 350..1350)
  var SL = {
    komurluk: [470, 860, 300, 'maden_demir'], ocak: [850, 1180, 470, 'bina_ocak'], gozcu: [1240, 880, 230, 'bina_gozcu'],
    oba: [860, 1820, 440, 'kale'],
    yurt: [470, 2270, 280, 'bina_yurt'], sifa: [1230, 2270, 300, 'bina_sifa'],
    bilgelik: [470, 2780, 300, 'bina_yurt'], harpakademi: [1230, 2780, 320, 'bina_kisla'],
    demirci: [480, 3320, 340, 'bina_demirci'], ambar: [1220, 3320, 310, 'bina_ambar'],
    kisla: [480, 3880, 340, 'bina_kisla'],
    sur: [850, 4740, 520, 'bina_sur'],
    odunluk: [470, 5170, 340, 'bina_odunluk'], avci: [1240, 5170, 330, 'bina_avci']
  };
  // NPC yerleri: [x, y, genişlik, görsel, ad, simge]
  var NP = {
    tug: [470, 1760, 170, 'dekor_bayrak_kirmizi', 'Akın Tuğu', 'flag'], kurultay: [1240, 1800, 300, 'bina_yurt', 'Kurultay', 'crown'],
    kurt: [1230, 1250, 140, 'pet_bozkurt_yavrusu', 'Kurt İni', 'paw'], kam: [640, 2240, 115, 'npc_kam', 'Kam', 'book'],
    ocak: [850, 2900, 300, 'dekor_cadir', 'Boy Meclisi', 'fire'],
    arena: [1230, 3860, 210, 'npc_alper', 'Arena', 'swords'],
    agil: [480, 4400, 230, 'npc_atli', 'Ağıl', 'horse'], sefer: [1230, 4400, 270, 'kafile', 'Sefer', 'compass']
  };
  function roadX(y) { return 850 + 70 * Math.sin(y / 520); }
  var ICON = {
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>', fire: '<path d="M12 3c3 4 6 6 6 10a6 6 0 0 1-12 0c0-3 2-5 3-7 1 2 2 3 3 3 0-2 0-4 0-6z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>', horse: '<path d="M5 20l2-6-2-3 4-6 5 1 5 4-2 2-3-1-1 3 2 6"/>',
    flag: '<path d="M6 21V3M6 4c4-2 7 2 12 0v8c-5 2-8-2-12 0"/>', gem: '<path d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l3 16M15 4l-3 16"/>',
    book: '<path d="M4 5c3-1 6-1 8 1v14c-2-2-5-2-8-1zM20 5c-3-1-6-1-8 1v14c2-2 5-2 8-1z"/>', info: '<path d="M12 10v7M12 7h.01"/><circle cx="12" cy="12" r="9"/>', swords: '<path d="M5 19L17 7M14 5l5 5M19 19L7 7M10 5L5 10M4 20l2-2M20 20l-2-2"/>', lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    paw: '<circle cx="7" cy="9" r="2"/><circle cx="12" cy="6.5" r="2"/><circle cx="17" cy="9" r="2"/><path d="M7.5 17c0-3 2-5.5 4.5-5.5s4.5 2.5 4.5 5.5c0 2-2 2.5-4.5 2.5S7.5 19 7.5 17z"/>', check: '<path d="M5 12l5 5 9-10"/>', helm: '<path d="M4 15c0-5 3.5-9 8-9s8 4 8 9v3H4zM12 6V3M9 18v3h6v-3"/>', heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    axe: '<path d="M14 4l6 6-3 3-6-6zM11 7L3 21"/>', wheat: '<path d="M12 21V8M12 8c-3 0-4-3-4-5 3 0 4 2 4 5zm0 0c3 0 4-3 4-5-3 0-4 2-4 5zM12 13c-3 0-4-3-4-5 3 0 4 2 4 5zm0 0c3 0 4-3 4-5-3 0-4 2-4 5z"/>'
  };
  function svg(n, sz) { return '<svg viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[n] || '') + '</svg>'; }
  function S() { return W.s; }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + 'sn'; } }
  function tier(L) { return L < 10 ? 1 : L < 20 ? 2 : L < 30 ? 3 : 4; }
  function art(k, L) {
    var a = SL[k][3];
    if (a === 'kale') return IMGP + 'kale_' + Math.max(1, Math.min(5, Math.ceil(Math.max(1, L) / 8))) + '.webp';
    if (k === 'bilgelik' || k === 'komurluk' || k === 'harpakademi') return IMGP + a + '.webp';
    return IMGP + a + '_t' + tier(L) + '.webp';
  }

  /* ---------- boyalı zemin ---------- */
  function rnd(a) { var x = Math.sin(a * 9301 + 49297) * 233280; return x - Math.floor(x); }
  function paintGround(cv) {
    var K = .5; cv.width = WW * K; cv.height = WH * K; var g = cv.getContext('2d'); g.scale(K, K);
    // çimen
    var gr = g.createLinearGradient(0, 0, 0, WH); gr.addColorStop(0, '#7fa646'); gr.addColorStop(.5, '#6f9a3f'); gr.addColorStop(1, '#5f8a36');
    g.fillStyle = gr; g.fillRect(0, 0, WW, WH);
    var i, x, y, r;
    for (i = 0; i < 36000; i++) { x = rnd(i * 3.1) * WW; y = rnd(i * 7.7) * WH; g.fillStyle = rnd(i * 1.3) < .5 ? 'rgba(40,80,20,.18)' : 'rgba(200,225,130,.16)'; g.fillRect(x, y, 2 + rnd(i) * 3, 2); }
    for (i = 0; i < 220; i++) { x = rnd(i * 5.3) * WW; y = rnd(i * 2.9) * WH; r = 40 + rnd(i * 8.1) * 110; var bg = g.createRadialGradient(x, y, 1, x, y, r); bg.addColorStop(0, rnd(i) < .5 ? 'rgba(170,200,90,.28)' : 'rgba(50,90,30,.25)'); bg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = bg; g.beginPath(); g.ellipse(x, y, r * 1.5, r, 0, 0, 7); g.fill(); }
    // dağlar ve Demir Dağ (en üst)
    var mg = g.createLinearGradient(0, 0, 0, 420); mg.addColorStop(0, '#7d8aa0'); mg.addColorStop(1, '#8c9474');
    g.fillStyle = mg; g.beginPath(); g.moveTo(0, 430); for (i = 0; i <= 12; i++) g.lineTo(i / 12 * WW, 120 + Math.sin(i * 1.9) * 50 + rnd(i) * 90); g.lineTo(WW, 470); g.closePath(); g.fill();
    g.save(); g.translate(WW / 2 - 555, 0); g.fillStyle = '#45434f'; g.beginPath(); g.moveTo(330, 420); g.lineTo(470, 40); g.lineTo(560, 110); g.lineTo(640, 20); g.lineTo(780, 420); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(255,120,40,.9)'; g.lineWidth = 5; g.shadowColor = '#ff6a1a'; g.shadowBlur = 18;
    [[470, 50, 455, 200, 480, 340], [640, 30, 655, 180, 620, 330], [560, 115, 575, 220, 550, 380]].forEach(function (q) { g.beginPath(); g.moveTo(q[0], q[1]); g.quadraticCurveTo(q[2], q[3], q[4], q[5]); g.stroke(); });
    g.shadowBlur = 0; g.restore(); var fg = g.createLinearGradient(0, 360, 0, 520); fg.addColorStop(0, 'rgba(127,166,70,0)'); fg.addColorStop(1, '#7fa646'); g.fillStyle = fg; g.fillRect(0, 360, WW, 160);
    // nehir (sol kenar) ve şelaleler
    g.lineCap = 'round'; g.lineJoin = 'round';
    var riv = function (w, c) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(60, 380); for (y = 380; y <= WH; y += 60) g.lineTo(55 + 22 * Math.sin(y / 300), y); g.stroke(); };
    riv(78, '#3d6f8c'); riv(56, '#4f8fb0'); riv(22, 'rgba(160,210,235,.55)');
    // ana yol
    var road = function (pts, w) { g.strokeStyle = 'rgba(110,80,45,.35)'; g.lineWidth = w + 14; g.beginPath(); pts.forEach(function (p, j) { j ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }); g.stroke(); g.strokeStyle = '#c7a670'; g.lineWidth = w; g.stroke(); g.strokeStyle = 'rgba(235,210,160,.55)'; g.lineWidth = w * .35; g.stroke(); };
    var main = []; for (y = 460; y <= WH; y += 40) main.push([roadX(y), y]); road(main, 70);
    // yapı yerlerine kollar
    var all = []; for (var k in SL) all.push(SL[k]); for (k in NP) all.push(NP[k]);
    all.forEach(function (b) { var by = b[1] - b[2] * .05; road([[roadX(by), by], [(roadX(by) + b[0]) / 2, by + 10], [b[0], by]], 38); });
    // yapı zeminleri: çitli toprak alanlar
    all.forEach(function (b) {
      var w = b[2] * 1.02, h = b[2] * .42, cx = b[0], cy = b[1] - b[2] * .1;
      var dg = g.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); dg.addColorStop(0, '#c9a874'); dg.addColorStop(1, '#a88552');
      g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.ellipse(cx + 8, cy + 10, w / 2, h / 2, 0, 0, 7); g.fill();
      g.fillStyle = dg; g.beginPath(); g.moveTo(cx - w * .46, cy - h * .5); g.lineTo(cx + w * .46, cy - h * .5); g.lineTo(cx + w * .5, cy + h * .5); g.lineTo(cx - w * .5, cy + h * .5); g.closePath(); g.fill();
      g.strokeStyle = '#7a5230'; g.lineWidth = 4; g.stroke();
      for (var t = 0; t <= 1.001; t += .1) { [[cx - w * .46 + t * w * .92, cy - h * .5], [cx - w * .5 + t * w, cy + h * .5]].forEach(function (p) { g.fillStyle = '#6a4526'; g.fillRect(p[0] - 3, p[1] - 14, 6, 15); g.fillStyle = '#a3753f'; g.fillRect(p[0] - 3, p[1] - 14, 2, 15); }); }
    });
    // yayla kaya duvarları + merdiven
    CLIFF.forEach(function (cy, ci) {
      var top = cy - 40, bot = cy + 90;
      g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, bot - 10, WW, 40);
      var rg = g.createLinearGradient(0, top, 0, bot); rg.addColorStop(0, '#9a9b90'); rg.addColorStop(1, '#5f6158'); g.fillStyle = rg; g.fillRect(0, top, WW, bot - top);
      for (i = 0; i < 360; i++) { x = rnd(ci * 991 + i * 1.7) * WW; y = top + 10 + rnd(ci * 557 + i * 2.3) * (bot - top - 20); r = 14 + rnd(i * 4.1 + ci) * 26; var sg = g.createRadialGradient(x - r * .3, y - r * .35, 2, x, y, r); sg.addColorStop(0, '#c7c8bc'); sg.addColorStop(.6, '#8a8c82'); sg.addColorStop(1, '#55574f'); g.fillStyle = sg; g.beginPath(); g.ellipse(x, y, r * 1.25, r, 0, 0, 7); g.fill(); }
      g.fillStyle = '#6f9a3f'; g.beginPath(); g.moveTo(0, top); for (x = 0; x <= WW; x += 40) g.lineTo(x, top + 6 + rnd(x + ci) * 10); g.lineTo(WW, top - 20); g.lineTo(0, top - 20); g.closePath(); g.fill();
      // merdiven (yol üstünde)
      var sx = roadX(cy); for (y = top; y < bot; y += 16) { g.fillStyle = '#b9b6a6'; g.fillRect(sx - 50, y, 100, 12); g.fillStyle = '#7b786c'; g.fillRect(sx - 50, y + 10, 100, 4); }
      // şelale
      var wx = 55 + 22 * Math.sin(cy / 300);
        var wg = g.createLinearGradient(0, top, 0, bot); wg.addColorStop(0, '#cfeaf5'); wg.addColorStop(1, '#6fb2d0'); g.fillStyle = wg; g.fillRect(wx - 30, top, 60, bot - top);
      g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.ellipse(wx, bot + 4, 46, 14, 0, 0, 7); g.fill();
    });
    // dış çit (sur önü)
    // şehir duvarı: kapının iki yanında kazık çit (KoA "Şehir Duvarı")
    var wy = WALLY - 40;
    g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(0, wy + 6, WW, 26);
    g.fillStyle = '#8a8478'; g.fillRect(0, wy - 8, WW, 22);
    for (x = 0; x < WW; x += 26) { if (Math.abs(x - SL.sur[0]) < 210) continue; var hh = 74 + rnd(x) * 10; g.fillStyle = '#6a4526'; g.fillRect(x, wy - hh, 22, hh); g.fillStyle = '#9a6a3a'; g.fillRect(x + 3, wy - hh, 6, hh); g.fillStyle = '#4a2e16'; g.beginPath(); g.moveTo(x, wy - hh); g.lineTo(x + 11, wy - hh - 16); g.lineTo(x + 22, wy - hh); g.fill(); }
    // çiftlik tarlaları (Avcı Çadırı çevresi) ve sebze bahçesi
    [[1240, 5440, 380, 120], [960, 5330, 200, 150]].forEach(function (f, j) {
      g.save(); g.translate(f[0], f[1]); g.fillStyle = j ? '#6f8f3a' : '#d9b24a'; g.beginPath(); g.ellipse(0, 0, f[2] / 2, f[3] / 2, 0, 0, 7); g.fill();
      g.strokeStyle = 'rgba(120,90,30,.45)'; g.lineWidth = 3; for (var t2 = -f[2] / 2; t2 < f[2] / 2; t2 += 14) { g.beginPath(); g.moveTo(t2, -f[3] / 2 + 8); g.lineTo(t2 + 20, f[3] / 2 - 8); g.stroke(); }
      g.strokeStyle = '#8a8478'; g.lineWidth = 6; g.beginPath(); g.ellipse(0, 0, f[2] / 2, f[3] / 2, 0, 0, 7); g.stroke(); g.restore();
    });
    // arena kum çemberi, ağıl
    var A = NP.arena; g.fillStyle = '#dcc48c'; g.beginPath(); g.ellipse(A[0], A[1] - 30, 150, 64, 0, 0, 7); g.fill(); g.strokeStyle = '#7a5230'; g.lineWidth = 5; g.stroke();
  }

  /* yamaç duvarı görseli (Tripo modelinden çevrilen tekrar eden şerit, 25 Kasım): yüklenince çizilmiş kaya bandının üstüne serilir; merdiven ve şelale yeniden üstte */
  function paintWalls(cv) {
    var im = new Image(), st = new Image(), wf = new Image(), left = 3;
    function done() { if (--left) return;
      var g = cv.getContext('2d'), K = cv.width / WW; g.setTransform(K, 0, 0, K, 0, 0);
      var okW = im.naturalWidth > 0, okS = st.naturalWidth > 0, okF = wf.naturalWidth > 0; if (!okW && !okS && !okF) return;
      var h = 168, w = okW ? h * im.naturalWidth / im.naturalHeight : 0;
      CLIFF.forEach(function (cy) {
        var top = cy - 40, bot = cy + 90, y0 = top - h * .1, x, y;
        if (okW) for (x = 0; x < WW; x += w - 1) g.drawImage(im, x, y0, w, h);
        var sx = roadX(cy);
        if (okS) { var sh = 240, sw = sh * st.naturalWidth / st.naturalHeight; g.drawImage(st, sx - sw / 2, top - 50, sw, sh); }
        else for (y = top; y < bot; y += 16) { g.fillStyle = '#b9b6a6'; g.fillRect(sx - 50, y, 100, 12); g.fillStyle = '#7b786c'; g.fillRect(sx - 50, y + 10, 100, 4); }
        var wx = 55 + 22 * Math.sin(cy / 300);
        if (okF) { var fh = 300, fw = fh * wf.naturalWidth / wf.naturalHeight; g.drawImage(wf, Math.max(wx - fw / 2, -fw * .18), top - 95, fw, fh); return; }
        var wg = g.createLinearGradient(0, top, 0, bot); wg.addColorStop(0, '#cfeaf5'); wg.addColorStop(1, '#6fb2d0'); g.fillStyle = wg; g.fillRect(wx - 30, top, 60, bot - top);
        g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.ellipse(wx, bot + 4, 46, 14, 0, 0, 7); g.fill();
      });
    }
    im.onload = im.onerror = st.onload = st.onerror = wf.onload = wf.onerror = done;
    im.src = IMGP + 'yamac_duvar.webp'; st.src = IMGP + 'yamac_merdiven.webp'; wf.src = IMGP + 'yamac_selale.webp';
  }

  /* ---------- sahne ---------- */
  var R = { el: null, world: null, s: .5, x: 0, y: 0, items: {}, built: false };
  function fit(keep) {
    var host = R.el; if (!host) return; var w = host.clientWidth, h = host.clientHeight, ox = R.x, oy = R.y;
    R.s = w < 700 ? w / 1000 : Math.max(w / WW, Math.min(.68, Math.max(.5, (w - 160) / 1000)));
    if (keep && R.built) { R.x = ox; R.y = oy; } else { R.x = w / 2 - CX * R.s; R.y = -(SL.ocak[1] - SL.ocak[2] * .9 - 170) * R.s + 60; }
    clamp(); apply();
  }
  function clamp() { var w0 = R.el.clientWidth; if (w0 && WW * R.s < w0) R.s = w0 / WW; var w = R.el.clientWidth, h = R.el.clientHeight, ww = WW * R.s, wh = WH * R.s; R.x = ww <= w ? (w - ww) / 2 : Math.min(0, Math.max(w - ww, R.x)); R.y = Math.min(62, Math.max(h - wh - 96, R.y)); }
  function apply() { R.world.style.transform = 'translate(' + R.x.toFixed(1) + 'px,' + R.y.toFixed(1) + 'px) scale(' + R.s.toFixed(4) + ')'; R.world.style.setProperty('--s', R.s.toFixed(4)); }
  function sprite(src, x, y, w, cls) {
    var im = D.createElement('img'); im.src = src; im.alt = ''; im.draggable = false; im.className = 'ao-sp' + (cls ? ' ' + cls : '');
    im.style.cssText = 'left:' + (x - w / 2) + 'px;top:' + (y - w * .86) + 'px;width:' + w + 'px;height:' + w + 'px;z-index:' + Math.round(y);
    R.world.appendChild(im); return im;
  }
  function build() {
    var cv = D.getElementById('cityv'); if (!cv || !S()) return false;
    R.el = D.createElement('div'); R.el.id = 'ek-ao';
    R.world = D.createElement('div'); R.world.className = 'ao-world'; R.world.style.width = WW + 'px'; R.world.style.height = WH + 'px';
    var c = D.createElement('canvas'); c.className = 'ao-ground'; paintGround(c); paintWalls(c); R.world.appendChild(c);
    R.el.appendChild(R.world); cv.insertBefore(R.el, cv.firstChild);
    // süs: kenarlarda ağaçlar, yollarda köylüler
    var occ = []; for (var q in SL) occ.push(SL[q]); for (q in NP) occ.push(NP[q]);
    function free(x, y, r) { if (Math.abs(x - roadX(y)) < 90) return false; if (Math.abs(y - WALLY + 60) < 120) return false; if (y > 5230 && x > 800) return false; if (x < 130) return false; for (var j = 0; j < occ.length; j++) { var o = occ[j]; if (Math.abs(x - o[0]) < o[2] * .55 + r && y > o[1] - o[2] * .9 - r * .5 && y < o[1] + 60 + r * .3) return false; } for (j = 0; j < CLIFF.length; j++) if (y > CLIFF[j] - 70 && y < CLIFF[j] + 140) return false; return y > 470; }
    for (var i = 0; i < 380; i++) { var x = 120 + rnd(i * 4.4) * (WW - 140), y = 480 + rnd(i * 2.2) * (WH - 520), sz = 110 + rnd(i) * 80; if (free(x, y, sz * .4)) sprite(IMGP + 'dekor_agac_yaz.webp', x, y, sz, 'ao-dec'); }
    // kaya kümeleri (Tripo modelinden, 25 Kasım)
    for (i = 0; i < 90; i++) { x = 140 + rnd(i * 6.7 + 11) * (WW - 180); y = 500 + rnd(i * 3.9 + 5) * (WH - 560); sz = 70 + rnd(i * 1.9 + 3) * 60; if (free(x, y, sz * .5)) { var kim = sprite(IMGP + 'dekor_kaya_' + (1 + (i % 2)) + '.webp', x, y, sz, 'ao-dec'); if (rnd(i * 2.3) < .5) kim.style.transform = 'scaleX(-1)'; } }
    [[300, 760, 'dekor_kaya_1', 150], [630, 720, 'dekor_kaya_2', 130], [250, 960, 'dekor_kaya_2', 120], [660, 960, 'dekor_kaya_1', 110], [380, 640, 'dekor_kaya_2', 100], [700, 1260, 'dekor_bayrak_mavi', 100], [1000, 1260, 'dekor_bayrak_mavi', 100], [640, 4790, 'dekor_bayrak_kirmizi', 100], [1060, 4790, 'dekor_bayrak_kirmizi', 100], [660, 2330, 'dekor_saman_fici', 85], [1040, 3420, 'dekor_saman_fici', 90], [1560, 2330, 'dekor_cit_odun', 110], [680, 5250, 'dekor_cit_odun', 120], [1010, 5440, 'dekor_saman_fici', 95], [1060, 4000, 'dekor_saman_fici', 90]].forEach(function (d) { sprite(IMGP + d[2] + '.webp', d[0], d[1], d[3], 'ao-dec'); });
    [[960, 1990, 'npc_koylu_erkek', 82], [760, 2120, 'npc_koylu_kadin', 80], [660, 5300, 'npc_oduncu', 85], [1080, 5260, 'npc_avci', 85], [660, 3420, 'npc_demirci', 82], [780, 3020, 'npc_koylu_erkek', 82], [700, 4040, 'npc_okcu', 82], [1500, 1400, 'npc_koylu_erkek', 82], [880, 4560, 'npc_koylu_kadin', 80], [820, 4950, 'npc_koylu_erkek', 80]].forEach(function (d, j) { var im = sprite(IMGP + d[2] + '.webp', d[0], d[1], d[3], 'ao-dec ao-walk'); im.style.animationDelay = (j * .7) + 's'; });
    // NPC otağları
    for (var id in NP) (function (id) {
      var n = NP[id], im = sprite(IMGP + n[3] + '.webp', n[0], n[1], n[2], 'ao-npc'); im.dataset.npc = id;
      var md = D.createElement('div'); md.className = 'ao-md'; md.dataset.npc = id; md.innerHTML = '<span class="ao-mdi">' + svg(n[5], 20) + '</span><b>' + n[4] + '</b><em class="ao-hil"></em>';
      md.style.cssText = 'left:' + n[0] + 'px;top:' + (n[1] - n[2] * .9) + 'px;z-index:' + (3000 + Math.round(n[1]));
      R.world.appendChild(md); R.items['npc:' + id] = { im: im, md: md };
    })(id);
    // binalar
    for (var k in SL) (function (k) {
      var b = SL[k], im = sprite(art(k, 1), b[0], b[1], b[2], 'ao-b'); im.dataset.b = k;
      var pl = D.createElement('div'); pl.className = 'ao-pl'; pl.dataset.b = k; pl.style.cssText = 'left:' + b[0] + 'px;top:' + (b[1] + 6) + 'px;z-index:' + (3000 + Math.round(b[1]));
      var up = D.createElement('div'); up.className = 'ao-up'; up.dataset.b = k; up.innerHTML = svg('up', 20); up.style.cssText = 'left:' + (b[0] + b[2] * .28) + 'px;top:' + (b[1] - b[2] * .78) + 'px;z-index:' + (3001 + Math.round(b[1]));
      var bb = D.createElement('button'); bb.type = 'button'; bb.className = 'ao-bb'; bb.dataset.bb = k; bb.hidden = true; bb.style.cssText = 'left:' + b[0] + 'px;top:' + (b[1] - b[2] * .52) + 'px;z-index:' + (3002 + Math.round(b[1]));
      R.world.appendChild(pl); R.world.appendChild(up); R.world.appendChild(bb); R.items[k] = { im: im, pl: pl, up: up, bb: bb, src: '' };
    })(k);
    // oba işleri (sol sütun)
    R.jobs = D.createElement('div'); R.jobs.id = 'ao-jobs'; cv.appendChild(R.jobs);
    R.jobs.addEventListener('click', function (ev) { var b = ev.target.closest('[data-jp]'); if (!b) return; if (W.ekOpenParcel) W.ekOpenParcel(b.dataset.jp); });
    input(); fit(); R.built = true; return true;
  }

  /* ---------- dokunma: kaydır / yakınlaştır / seç ---------- */
  function input() {
    var st = null, moved = false, vx = 0, vy = 0, lt = 0, lx = 0, ly = 0, raf = 0;
    function glide() { if (Math.abs(vx) + Math.abs(vy) < .03) return; R.x += vx * 16; R.y += vy * 16; vx *= .93; vy *= .93; clamp(); apply(); raf = requestAnimationFrame(glide); }
    R.el.addEventListener('pointerdown', function (e) { if (st && st.id === e.pointerId) st = null; if (st && performance.now() - lt > 1500) st = null; if (st) return; cancelAnimationFrame(raf); vx = vy = 0; st = { x: e.clientX, y: e.clientY, ox: R.x, oy: R.y, id: e.pointerId, t: e.target }; moved = false; lx = e.clientX; ly = e.clientY; lt = performance.now(); try { R.el.setPointerCapture(e.pointerId); } catch (x) {} });
    R.el.addEventListener('pointermove', function (e) {
      if (!st || e.pointerId !== st.id) return; var dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (!moved && Math.hypot(dx, dy) > 8) moved = true; if (!moved) return;
      var now = performance.now(), dt = Math.max(1, now - lt); vx = (e.clientX - lx) / dt; vy = (e.clientY - ly) / dt; lx = e.clientX; ly = e.clientY; lt = now;
      R.x = st.ox + dx; R.y = st.oy + dy; clamp(); apply();
    });
    function up(e) { if (!st || e.pointerId !== st.id) return; var was = st; st = null; if (!moved) tap(D.elementFromPoint(e.clientX, e.clientY) || was.t); else if (performance.now() - lt < 80) glide(); }
    R.el.addEventListener('pointerup', up); R.el.addEventListener('pointercancel', function () { st = null; }); R.el.addEventListener('lostpointercapture', function (e) { if (st && e.pointerId === st.id) st = null; });
    R.el.addEventListener('wheel', function (e) { e.preventDefault(); R.x -= e.deltaX; R.y -= e.deltaY; clamp(); apply(); }, { passive: false });
  }
  /* seçim: ad şeridi + yuvarlak işlem düğmeleri (King of Altay gibi) */
  var SPEC = { bilgelik: ['Araştır', 'book', function () { var t = D.querySelector('#tabs [data-t="r"]'); if (t) t.click(); else { W.tab = 'r'; W.render(); } }], kisla: ['Eğit', 'swords', function () { if (W.ekYapiPanel) W.ekYapiPanel('kisla'); }], sifa: ['Yaralı', 'swords', function () { if (W.ekYapiPanel) W.ekYapiPanel('sifa'); }] };
  function openB(k, then) { W.BMK = k; W.selB = k; W.tab = 'c'; try { W.render(); } catch (e) {} if (then) setTimeout(function () { var b = D.querySelector('#ek-yapi [data-yk="' + then + '"]'); if (b) b.click(); }, 120); }
  function select(k) {
    if (!R.sel) { R.sel = D.createElement('div'); R.sel.className = 'ao-sel'; R.world.appendChild(R.sel); R.sel.addEventListener('pointerup', function (e) { e.stopPropagation(); }); R.sel.addEventListener('pointerdown', function (e) { e.stopPropagation(); }); R.sel.addEventListener('click', function (e) { var b = e.target.closest('[data-act]'); if (!b) return; e.stopPropagation(); var a = b.dataset.act, kk = R.sel.dataset.k; deselect(); if (a === 'npt') { npcAct(kk, b.dataset.nt); return; } if (a === 'up') openB(kk); else if (a === 'info') openB(kk, 'info'); else if (SPEC[kk]) SPEC[kk][2](kk); }); }
    if (k === '__npc') { R.sel.hidden = false; R.world.classList.add('sel'); R.world.querySelectorAll('.ao-b.on').forEach(function (x) { x.classList.remove('on'); }); return; }
    var b = SL[k], def = (W.B || {})[k] || {}, L = (S().l && S().l[k]) || 0;
    R.sel.dataset.k = k;
    R.sel.innerHTML = '<div class="ao-ban" style="left:' + b[0] + 'px;top:' + (b[1] - b[2] * .95) + 'px">' + (def.n || k).toLocaleUpperCase('tr') + ' <em>SV. ' + L + '</em></div>' +
      '<div class="ao-acts" style="left:' + b[0] + 'px;top:' + (b[1] + 34) + 'px">' +
      '<button type="button" data-act="info"><i>' + svg('info', 22) + '</i><small>Bilgi</small></button>' +
      '<button type="button" data-act="up" class="big"><i>' + svg('up', 26) + '</i><small>Geliştir</small></button>' +
      (SPEC[k] ? '<button type="button" data-act="sp"><i>' + svg(SPEC[k][1], 22) + '</i><small>' + SPEC[k][0] + '</small></button>' : '') + '</div>';
    R.sel.hidden = false; R.world.classList.add('sel');
    var w = R.el.clientWidth, sx = R.x + b[0] * R.s, m = 190 * (w / 390);
    if (sx < m || sx > w - m) { var tx = w / 2 - b[0] * R.s, x0 = R.x, t0 = performance.now(); (function an(now) { var e = Math.min(1, (now - t0) / 260); R.x = x0 + (tx - x0) * (1 - Math.pow(1 - e, 3)); clamp(); apply(); if (e < 1) requestAnimationFrame(an); })(t0); }
    R.world.querySelectorAll('.ao-b.on').forEach(function (x) { x.classList.remove('on'); }); var im = R.items[k] && R.items[k].im; if (im) im.classList.add('on');
  }
  /* NPC: ad şeridi + her işlev için yuvarlak düğme; dokununca doğrudan o sayfa */
  function npcTabs(id) { var N = (W.ergenekonNpc && W.ergenekonNpc.NPCS) || [], n = N.filter(function (x) { return x.id === id; })[0]; return n; }
  function npcAct(id, nt) { if (nt === 'gorev') { if (W.ekGorevler) W.ekGorevler(); return; } if (W.ekNpcOpen) W.ekNpcOpen(id, +nt); }
  function selectNpc(id) {
    var n = npcTabs(id), p = NP[id]; if (!n || !p) { if (W.ekNpcOpen) W.ekNpcOpen(id); return; }
    if (((S().l && S().l.ocak) || 1) < (n.lv || 1)) { if (W.ekNpcOpen) W.ekNpcOpen(id); return; }
    select('__npc'); // kabı kur
    var bt = [];
    n.tabs.forEach(function (t, i) { if (id === 'tug' && /^(Günlük|Açılış|Emek|Şan)/.test(t.n)) return; bt.push([String(i), t.e, t.n.split(' ')[0]]); });
    R.sel.dataset.k = id;
    R.sel.innerHTML = '<div class="ao-ban" style="left:' + p[0] + 'px;top:' + (p[1] - p[2] * .95) + 'px">' + n.n.toLocaleUpperCase('tr') + '</div>' +
      '<div class="ao-acts ao-npa" style="left:' + p[0] + 'px;top:' + (p[1] + 30) + 'px">' + bt.map(function (x) { return '<button type="button" data-act="npt" data-nt="' + x[0] + '"><i>' + x[1] + '</i><small>' + x[2] + '</small></button>'; }).join('') + '</div>';
    var w = R.el.clientWidth, h = R.el.clientHeight, tx = w / 2 - p[0] * R.s, ty = h * .38 - p[1] * R.s, x0 = R.x, y0 = R.y, t0 = performance.now();
    (function an(now) { var e = Math.min(1, (now - t0) / 280), q = 1 - Math.pow(1 - e, 3); R.x = x0 + (tx - x0) * q; R.y = y0 + (ty - y0) * q; clamp(); apply(); if (e < 1) requestAnimationFrame(an); })(t0);
  }
  function deselect() { if (R.sel) R.sel.hidden = true; if (R.world) { R.world.classList.remove('sel'); R.world.querySelectorAll('.ao-b.on').forEach(function (x) { x.classList.remove('on'); }); } }
  function tap(t) {
    if (!t || !t.closest) return; var b = t.closest('[data-b]'), n = t.closest('[data-npc]');
    try { navigator.vibrate && navigator.vibrate(8); } catch (e) {}
    if (t.closest('.ao-sel')) return;
    var bub = t.closest('[data-bb]'); if (bub) { deselect(); bubbleTap(bub.dataset.bb, bub.dataset.kind); return; }
    if (b) { var k = b.dataset.b; if (!(S().l[k] > 0)) { openB(k); return; } if (R.sel && !R.sel.hidden && R.sel.dataset.k === k) { deselect(); openB(k); } else select(k); return; }
    deselect();
    if (n) { var id = n.dataset.npc; deselect(); if (id === 'arena') { if (W.ekGoArena) W.ekGoArena(); } else if (id === 'kurt') openWolf(); else if (id === 'kam') { if (W.ekGorevler) W.ekGorevler(); } else if (id === 'tug' && W.ekAkinTugu) W.ekAkinTugu(); else if (R.sel && !R.sel.hidden && R.sel.dataset.k === id) { deselect(); if (W.ekNpcOpen) W.ekNpcOpen(id); } else selectNpc(id); }
  }

  /* ---------- her an güncellenen durum ---------- */
  /* 25 Kasım: King of Altay gibi bina üstü baloncuklar (yanıp sönmez): hasat, ücretsiz bitir, boşta kışla/şifahane/bilgelik */
  var RESI = { odunluk: 'ikon_odun', avci: 'ikon_et', demirci: 'ikon_demir', komurluk: '' };
  function unlockAt(k) { try { var r = (W.buildingRequirements(k) || []).filter(function (x) { return x.key === 'ocak'; })[0]; return r ? r.level : 0; } catch (e) { return 0; } }
  function wolfReady() { var s = S(), p = s.pt || {}, e = s.en || {}; try { if (p.adv) return p.adv.end <= Date.now(); return Date.now() >= (e.pet || 0) && (e.v || 0) < (W.EN_MAX || 200); } catch (x) { return false; } }
  function bubbleFor(k, L, q) {
    var s = S(), F = W.ekFinish, D2 = W.ergenekonDurum;
    if (q && q.left > 0 && q.left <= 300 && F) return ['fin', '<i>' + svg('check', 26) + '</i>', 'Bitir'];
    if (q) return null;
    if (D2 && D2.ready && RESI[k] != null) { try { if (D2.ready(k)) return ['bin', RESI[k] ? '<img src="' + IMGP + RESI[k] + '.webp" alt="">' : '<img src="./assets/interface/painted/t/coal.webp" alt="">', 'Topla']; } catch (e) {} }
    if (k === 'kisla' && !s.tq) return ['idle', '<i>' + svg('swords', 24) + '</i>', 'Eğit'];
    if (k === 'sifa' && !s.hq && s.wd && (s.wd[0] + s.wd[1] + s.wd[2]) > 0) return ['idle', '<i>' + svg('heart', 24) + '</i>', 'İyileştir'];
    if (k === 'bilgelik') { if (s.rq && s.rq.left > 0 && s.rq.left <= 300 && F) return ['fin', '<i>' + svg('check', 26) + '</i>', 'Bitir']; if (!s.rq) return ['idle', '<i>' + svg('book', 24) + '</i>', 'Araştır']; }
    return null;
  }
  function bubble(it, b) {
    var bb = it.bb; if (!bb) return;
    if (!b) { if (!bb.hidden) bb.hidden = true; return; }
    var h = b[0] === 'idle' ? '<span class="ao-zz">Zz</span>' : '<span class="ao-bbi ao-bb-' + b[0] + '">' + b[1] + '</span>';
    if (bb.__aoh !== h) { bb.__aoh = h; bb.innerHTML = h; bb.dataset.kind = b[0]; bb.setAttribute('aria-label', b[2]); }
    if (bb.hidden) bb.hidden = false;
  }
  function bubbleTap(k, kind) {
    try { navigator.vibrate && navigator.vibrate(12); } catch (e) {}
    if (kind === 'bin') { if (W.ergenekonDurum && W.ergenekonDurum.collect) W.ergenekonDurum.collect(k); }
    else if (kind === 'fin') { if (k === 'bilgelik') W.ekFinish.research(); else W.ekFinish.build(k); }
    else if (k === 'kisla' || k === 'sifa') { if (W.ekYapiPanel) W.ekYapiPanel(k); }
    else if (k === 'bilgelik') { var t = D.querySelector('#tabs [data-t="r"]'); if (t) t.click(); else { W.tab = 'r'; W.render(); } }
    try { W.save(); } catch (e) {}
    update();
  }
  function openWolf() { var s = S(); if (((s.l && s.l.ocak) || 0) < 4) { try { W.add('🐺 Bozkurt Yavrusu Kutsal Ocak Sv 4’te boya katılır.'); } catch (e) {} return; } W.PTP = true; try { W.render(); } catch (e) {} }
  W.ekObaPos = function (k) { var b = SL[k]; if (!b || !R.el || W.tab !== 'c') return null; var r = R.el.getBoundingClientRect(); return { x: r.left + R.x + b[0] * R.s, y: r.top + R.y + (b[1] - b[2] * .7) * R.s, off: false }; };
  function reqOk(k) { var s = S(); try { return (W.buildingRequirements(k) || []).every(function (r) { return (s.l[r.key] || 0) >= r.level; }); } catch (e) { return false; } }
  function update() {
    var s = S(), B = W.B || {};
    for (var k in SL) {
      var it = R.items[k]; if (!it) continue; var L = (s.l && s.l[k]) || 0, def = B[k];
      var show = !!def && (L > 0 || reqOk(k)), lock = !!def && !show;
      it.im.hidden = !show; it.pl.hidden = !(show || lock); // değer aynıysa DOM'a dokunulmaz (index.html koruması)
      it.im.classList.toggle('ao-lock', lock);
      if (lock) { var ol = unlockAt(k), lh = '<span class="ao-lks"><b class="ao-lkc">' + svg('crown', 12) + (ol || '') + '</b><span class="ao-lkb">' + svg('lock', 30) + '</span><small>' + (def.n.length > 14 ? def.n.split(' ')[0] : def.n) + '</small></span>'; if (it.pl.__aoh !== lh) { it.pl.__aoh = lh; it.pl.innerHTML = lh; } var lt = (SL[k][1] - SL[k][2] * .42) + 'px'; if (it.pl.style.top !== lt) it.pl.style.top = lt; bubble(it, null); if (!it.up.hidden) it.up.hidden = true; continue; }
      var nt = (SL[k][1] + 6) + 'px'; if (it.pl.style.top !== nt) it.pl.style.top = nt;
      if (!show) { if (!it.up.hidden) it.up.hidden = true; bubble(it, null); continue; }
      var src = L > 0 ? art(k, L) : IMGP + 'dekor_cit_odun.webp'; if (it.src !== src) { it.src = src; it.im.src = src; it.im.classList.toggle('ao-plot', !L); }
      var q = null, can = false; try { q = W.buildQueue(k); can = !q && L > 0 && W.can(k); } catch (e) {}
      var nm = def.n.length > 14 ? def.n.split(' ')[0] : def.n;
      var h = L > 0 ? '<span class="ao-n"><b>' + L + '</b>' + nm + (can ? '<i class="ao-ar">' + svg('up', 13) + '</i>' : '') + '</span>' : '<span class="ao-n ao-new">🔨 ' + nm + '</span>';
      if (q && q.left > 0) h += '<span class="ao-t">⏱ ' + ft(q.left) + '</span><span class="ao-bar"><i style="width:' + Math.max(3, Math.min(100, 100 - q.left / (q.tot || 1) * 100)).toFixed(0) + '%"></i></span>';
      if (it.pl.__aoh !== h) { it.pl.__aoh = h; it.pl.innerHTML = h; }
      if (!it.up.hidden) it.up.hidden = true;
      bubble(it, L > 0 ? bubbleFor(k, L, q) : null);
    }
    for (var id in NP) {
      var x = R.items['npc:' + id]; if (!x) continue; var src2 = D.querySelector('#ek-npcs [data-npc="' + id + '"]');
      var hil = !!(src2 && src2.querySelector('.np-hil')), lk = !!(src2 && src2.classList.contains('lk'));
      if (id === 'kurt') { lk = ((s.l && s.l.ocak) || 0) < 4; hil = !lk && wolfReady(); }
      if (id === 'ocak') { var hq = (s.al && s.al.hq) || 0, hb = x.md.querySelector('.ao-help'); if (hq && !hb) { hb = D.createElement('i'); hb.className = 'ao-help'; x.md.insertBefore(hb, x.md.firstChild); } if (hb) { if (!hq) hb.remove(); else { var ht = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l5-5 4 3 4-3 7 6-6 5-4-2-4 2z"/></svg><em>' + hq + '</em>'; if (hb.__h !== ht) { hb.__h = ht; hb.innerHTML = ht; } } } }
      if (id === 'kam') { var tg = D.querySelector('#ek-npcs [data-npc="tug"] .np-hil'); hil = !!tg; lk = false; }
      x.md.classList.toggle('hil', hil); x.md.classList.toggle('lk', lk); x.im.classList.toggle('lk', lk);
    }
    if (H.classList.contains('ah-on')) return; // yeni arayüzde iş sütunu altay-hud.js'te
    // oba işleri: 3D katmanındaki parsel düğmelerinden
    var L2 = W.ekParcelList ? W.ekParcelList() : [], jh = '';
    // önce sürenler, sonra yapılabilecek işler; en çok 5
    L2.sort(function (a, b) { var r = function (x) { return x.t ? 0 : x.kind === 'field' ? 2 : 1; }; return r(a) - r(b); });
    var shown = 0, fields = 0;
    L2.forEach(function (j) { if (j.kind === 'field') { fields++; return; } if (shown >= (W.innerWidth < 700 ? 3 : 4)) return; shown++; jh += '<button type="button" class="ao-job ao-' + j.kind + (j.dim ? ' dim' : '') + '" data-jp="' + j.id + '" title="' + (j.kind === 'cut' ? 'Ağaçları kes' : j.kind === 'stump' ? 'Tarla aç' : '') + '">' + svg(j.kind === 'cut' ? 'axe' : 'wheat', 20) + (j.t ? '<small>' + j.t + '</small>' : '<i>zZ</i>') + '</button>'; });
    if (fields) { var f0 = L2.filter(function (j) { return j.kind === 'field'; })[0]; jh += '<button type="button" class="ao-job ao-field" data-jp="' + f0.id + '" title="Tarlalar">' + svg('wheat', 20) + '<small>' + fields + ' tarla</small></button>'; }
    if (R.jobs.__aoh !== jh) { R.jobs.__aoh = jh; R.jobs.innerHTML = jh; }
  }

  /* ---------- açma / kapama, 3D'yi susturma ---------- */
  var muted = false;
  function mute3D() {
    var c = W.city3d; if (!c || !c.renderer || muted) return; muted = true;
    var r = c.renderer, orig = r.render.bind(r);
    try { r.setPixelRatio(.2); r.shadowMap.enabled = false; } catch (e) {} // oba 3D çizimi yok: bellek ve pil tasarrufu
    r.render = function () { if (on() && W.tab === 'c' && !D.querySelector('.hearth-gallery:not([hidden]),.building-gallery:not([hidden])')) return; return orig.apply(null, arguments); };
  }
  var last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    var o = on(); H.classList.toggle('ao', o);
    if (!o) { if (R.el) R.el.hidden = true; if (R.jobs) R.jobs.hidden = true; return; }
    if (!R.built) { if (!build()) return; }
    mute3D();
    var vis = W.tab === 'c'; R.el.hidden = !vis; R.jobs.hidden = !vis || !R.jobs.innerHTML; if (!vis) return;
    if (R.el.parentNode !== D.getElementById('cityv')) { var cv = D.getElementById('cityv'); if (cv) { cv.insertBefore(R.el, cv.firstChild); cv.appendChild(R.jobs); } }
    if (now - last < 500) return; last = now;
    var cw = R.el.clientWidth; if (cw && cw !== R.lw) { var first = !R.lw; R.lw = cw; if (!first) fit(); else { clamp(); apply(); } }
    try { update(); } catch (e) {}
  }
  requestAnimationFrame(loop);
  var lw = 0; W.addEventListener('resize', function () { if (R.built && R.el.clientWidth !== lw) { lw = R.el.clientWidth; fit(true); } });
  W.ekBinaArt = function (k) { if (!SL[k]) return null; var L = (S() && S().l && S().l[k]) || 1; return art(k, Math.max(1, L)); };
  W.ekAO = { fit: fit, state: R, update: update };
})();
