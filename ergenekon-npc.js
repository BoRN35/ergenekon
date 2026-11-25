/* Ergenekon — Ek Paket 4, 1. adım: oba NPC'leri ve sade menü. Claude, 18 Kasım 2026.
   150 Kurultay Otağı · 151 Kutsal Ocak ateşi (+ tamga direği) · 152 Sefer Otağı · 153 Ağıl · 154 Tuğ direği · 155 Hazine Otağı
   156 Demirci, Eritme, Arena yerinde · 157 sade sol menü + ilk girişte sırayla parlama · 158 kilitli NPC bilgisi · 208 Bilge Meclisi rehberi
   Her NPC tek pencere açar; ilgili sayfalar pencerede sekmedir (telefonda üstte, geniş ekranda solda). NPC'ler sabit. Kalıcı: s.ek.npcI, s.ek.npcT */
(function () {
  'use strict';
  var W = window;
  if (W.__ekNpc) return; W.__ekNpc = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ocak() { return (S().l && S().l.ocak) || 1; }
  function now() { return Date.now(); }
  function call(path) { return function () { var o = W; path.split('.').forEach(function (p) { o = o && o[p]; }); if (typeof o === 'function') o(); }; }
  function html(fn) { return function () { try { return W[fn](); } catch (e) { return ''; } }; }

  /* ---------- sekme içerikleri ---------- */
  function pairsHtml() {
    var P = (W.ergenekonKahraman && W.ergenekonKahraman.pairs) || [], s = S();
    var pic = function (i) { try { return W.hPic(i, 52); } catch (e) { return (W.HH[i] || {}).e || '?'; } };
    var KI = { a: '⚔️', f: '🛡️', w: '🚩', p: '🌾', x: '✨', h: '❤️' };
    return '<div class="np-pairs">' + P.map(function (p) { var on = (s.hs[p.a] || 0) >= 1 && (s.hs[p.b] || 0) >= 1; return '<div class="np-pr' + (on ? ' on' : '') + '"><span class="np-pp">' + pic(p.a) + '</span><span class="np-pl"><b>' + p.e + ' ' + esc(p.n) + '</b><small>' + (KI[p.k] || '') + ' +%' + Math.round(p.v * 100) + (on ? ' ◆' : ' ◇') + '</small></span><span class="np-pp">' + pic(p.b) + '</span></div>'; }).join('') + '</div>';
  }
  var GUIDE = [
    ['🔥', 'Kutsal Ocak', 'Her şeyin sınırı Ocak seviyesidir. Diğer binalar ve canavarlar onu geçemez.', 'c:ocak'],
    ['🐎', 'Toplama', 'Haritada kaynağa dokun, Gönder. Kafile döner, Tekrar gönder açıksa yeniden gider.', 'm'],
    ['🐺', 'Av', 'Enerjiyle canavar avla. ✦ işaretliler çift ganimet, ⚔×5 seri av.', 'm'],
    ['⚒️', 'Demirci', 'Eşyaya + bas: 📜 Kağıt, 🔷 Safir, 🔮 Opal ister. Eksik taşa dokununca kaynağına götürür.', 'c:demirci'],
    ['⭐', 'Kahramanlar', 'Kartla yıldız yükselt; tarihte bağı olan ikililer ek güç verir.', 'npc:kurultay:0'],
    ['🔥', 'Boy', 'Hediye, Akıncı dalgaları, Ocak ilimleri ve yardım burada.', 'npc:ocak:0'],
    ['🧭', 'Seferler', 'Müfreze, pet seferi, kurgan ve destan seferi tek ekranda.', 'npc:sefer:0'],
    ['🚩', 'Tuğ', 'Nevruz, destan canavarı, Emek Defteri ve şan tabloları.', 'npc:tug:0'],
    ['☾', 'Kut', 'Her emek Kut puanı verir; her seviye kalıcı küçük bonus.', 'kut'],
    ['⚔', 'Arena', 'Obadaki Bahadır’a dokun; günlük düellolar ve sezon.', 'y']
  ];
  function guideHtml() { return '<div class="np-guide">' + GUIDE.map(function (g, i) { return '<button type="button" class="np-g" data-ng="' + i + '"><i>' + g[0] + '</i><span><b>' + g[1] + '</b><small>' + g[2] + '</small></span><em>›</em></button>'; }).join('') + '</div>'; }
  function goGuide(i) {
    var d = GUIDE[i][3].split(':'); closeAll();
    if (d[0] === 'c') { W.tab = 'c'; rer(); setTimeout(function () { try { W.city3d.openBuilding(d[1]); } catch (e) {} if (d[1] === 'demirci' && W.ergenekonDemirci) W.ergenekonDemirci.open(); }, 200); }
    else if (d[0] === 'm') { W.tab = 'm'; W.SC = 'm'; rer(); }
    else if (d[0] === 'y') { if (W.ekGoArena) W.ekGoArena(); }
    else if (d[0] === 'kut') { if (W.ergenekonIlerleme) W.ergenekonIlerleme.openKut(); }
    else if (d[0] === 'npc') open(d[1], +d[2]);
  }

  /* ---------- NPC tanımları ---------- */
  var NPCS = [
    { id: 'kurultay', n: 'Kurultay Otağı', e: '⭐', lv: 1, x: -9, z: -13, kind: 'tent', c: '#7a2a1c', tabs: [
      { n: 'Kahramanlar', e: '⭐', k: 'tab', t: 'u' }, { n: 'İkililer', e: '🔗', k: 'html', f: pairsHtml }, { n: 'Bilge Meclisi', e: '📜', k: 'html', f: guideHtml }] },
    { id: 'ocak', n: 'Kutsal Ocak', e: '🔥', lv: 1, x: -12, z: 8, kind: 'fire', tabs: [
      { n: 'Boy', e: '🔥', k: 'tab', t: 'a' }, { n: 'Ocak ilimleri', e: '📜', k: 'pop', f: call('ekOpenTech') }, { n: 'Ocak Obası', e: '🏕️', k: 'tab', t: 'a', after: function () { var b = document.querySelector('[data-mgmt-nav="buildings"]'); if (b) b.click(); } },
      { n: 'Akıncı', e: '🏹', k: 'tab', t: 'a', after: function () { var b = document.getElementById('ek-oc'); if (b) b.scrollIntoView({ block: 'start' }); } }, { n: 'Katkı', e: '📊', k: 'pop', f: call('ergenekonBoy.openKatki') }] },
    { id: 'sefer', n: 'Sefer Otağı', e: '🧭', lv: 1, x: 11, z: 9, kind: 'tent', c: '#2b4f6e', tabs: [
      { n: 'Ordu', e: '⚔️', k: 'tab', t: 'k' }, { n: 'Müfreze', e: '🏇', k: 'pop', f: call('ergenekonFarm.openMf') }, { n: 'Seferler', e: '🧭', k: 'pop', f: call('ekOpenHub') }, { n: 'Destan seferi', e: '📜', k: 'pop', f: call('ergenekonIlerleme.openDestanSefer') }] },
    { id: 'agil', n: 'Ağıl', e: '🐎', lv: 4, x: 21, z: 10, kind: 'pen', tabs: [
      { n: 'Evcil', e: '🦅', k: 'pop', f: call('ergenekonIlerleme.openPets') }, { n: 'Binek', e: '🐎', k: 'pop', f: call('ergenekonDenge.openHorses') }] },
    { id: 'tug', n: 'Tuğ Direği', e: '🚩', lv: 3, x: -22, z: -1, kind: 'tug', tabs: [
      { n: 'Nevruz', e: '🔥', k: 'html', f: html('rNevruz') }, { n: 'Destan canavarı', e: '👹', k: 'pop', f: call('ergenekonKahraman.openDestan') }, { n: 'Emek Defteri', e: '📒', k: 'tab', t: 'e', after: function () { var b = document.getElementById('ek-ed'); if (b) b.scrollIntoView({ block: 'start' }); } },
      { n: 'Şan tabloları', e: '🏆', k: 'tab', t: 'y', after: function () { var b = document.querySelector('[data-mgmt-nav="duels"]'); if (b) b.click(); } }, { n: 'Hasar tablosu', e: '🩸', k: 'pop', f: call('ekDmgTable') }] },
    { id: 'hazine', n: 'Hazine Otağı', e: '💎', lv: 5, x: -5, z: -25, kind: 'tent', c: '#8f6512', tabs: [
      { n: 'Koleksiyon', e: '📖', k: 'pop', f: call('ergenekonDenge.openAlbum') }, { n: 'Başarımlar', e: '🏅', k: 'html', f: html('rAch') }, { n: 'Unvanlar', e: '🎖️', k: 'html', f: html('rTitles') }] }
  ];
  function npc(id) { return NPCS.filter(function (n) { return n.id === id; })[0]; }
  function locked(n) { return ocak() < n.lv; }
  W.ekNpcOpen = function (id, t) { open(id, t || 0); };

  /* ---------- bekleyen iş işaretleri ---------- */
  function pending(id) {
    var s = S(), e = ek(), t = now();
    try {
      if (id === 'kurultay') return (s.hs || []).some(function (v, i) { var need = (W.HSC || [])[v]; return need && (s.hc[i] || 0) >= need; }) ? 'up' : '';
      if (id === 'ocak') { var oc = e.oc || {}, ak = oc.ak || {}; return (oc.g > 0 || !ak.done) ? 'hil' : ''; }
      if (id === 'sefer') { var mf = (e.mf || []).some(function (x) { return x && x.t1 <= t; }), free = (e.mf || [null, null]).some(function (x) { return !x; }); return mf ? 'hil' : free && (s.hs || []).some(function (v) { return v > 0; }) ? 'up' : ''; }
      if (id === 'agil') { var p = e.pets; return p && ((p.sf && p.sf <= t) || (p.tulpar && !(p.tulpar.cd > t) && !(p.tulpar.b > t))) ? 'hil' : ''; }
      if (id === 'tug') { var db = W.ekDestan ? W.ekDestan() : null; return db && db.hp > 0 && !(db.cd > t) && s.en && s.en.v >= 30 ? 'hil' : ''; }
      if (id === 'hazine') return (W.AC || []).some(function (a) { return !s.ac[a[0]] && a[2](); }) ? 'hil' : '';
    } catch (x) {}
    return '';
  }

  /* ---------- pencere ---------- */
  var CUR = { id: null, t: 0, bar: null };
  function strip(n, ti) {
    return '<div class="np-tabs">' + n.tabs.map(function (t, i) { return '<button type="button" class="' + (i === ti ? 'on' : '') + '" data-npt="' + i + '"><i>' + t.e + '</i><small>' + t.n + '</small></button>'; }).join('') + '</div>';
  }
  function closeAll() { document.querySelectorAll('.ek-ov.np-win').forEach(function (o) { o.remove(); }); CUR.id = null; hideBar(); }
  function hideBar() { if (CUR.bar) CUR.bar.hidden = true; CUR.barTab = null; }
  function open(id, ti) {
    var n = npc(id); if (!n) return;
    if (locked(n)) { lockInfo(n); return; }
    ti = ti == null ? ((ek().npcT || {})[id] || 0) : ti; if (!n.tabs[ti]) ti = 0;
    var e = ek(); e.npcT = e.npcT || {}; e.npcT[id] = ti; save();
    document.querySelectorAll('.ek-ov.np-win').forEach(function (o) { o.remove(); }); hideBar();
    CUR.id = id; CUR.t = ti; var tab = n.tabs[ti];
    if (tab.k === 'tab') {
      if (W.tab !== tab.t) { W.tab = tab.t; rer(); }
      showBar(n, ti); if (tab.after) setTimeout(tab.after, 120); return;
    }
    if (tab.k === 'html') {
      var o = document.createElement('div'); o.className = 'ek-ov yk-ov np-win';
      o.innerHTML = '<div class="yk-card np-card"><div class="yk-head"><h2>' + n.e + ' ' + n.n + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + strip(n, ti) + '<div class="np-body"></div></div>';
      o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) { closeAll(); return; } setTimeout(fill, 60); });
      var fill = function () { var b = o.querySelector('.np-body'); if (!b) return; var h = tab.f(); if (b.__ekh !== h) { b.__ekh = h; b.innerHTML = h; } };
      document.body.appendChild(o); fill(); o.__fill = fill; return;
    }
    // pop: modülün kendi penceresini aç, üstüne sekme şeridini ekle
    var before = document.querySelectorAll('.ek-ov').length; tab.f();
    var ovs = document.querySelectorAll('.ek-ov'), ov = ovs[ovs.length - 1]; if (!ov || ovs.length <= before && !ov) return;
    ov.classList.add('np-win');
    var card = ov.querySelector('.yk-card,.ek-modal'); if (!card) return;
    var head = card.querySelector('.yk-head,.ek-mh'); var div = document.createElement('div'); div.innerHTML = strip(n, ti); var st = div.firstChild;
    if (head) head.insertAdjacentElement('afterend', st); else card.insertBefore(st, card.firstChild);
    card.classList.add('np-card');
  }
  function lockInfo(n) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small np-lock"><div class="yk-head"><h2>' + n.e + ' ' + n.n + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="np-lk"><span class="np-tamga">' + tamgaSvg() + '</span><b>🔥 Ocak ' + n.lv + '</b><small>' + n.tabs.map(function (t) { return t.e; }).join(' ') + '</small></div></div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o);
  }
  function tamgaSvg() { return '<svg viewBox="0 0 24 32" width="30" height="40" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 4v24M5 10l7 6 7-6M7 26h10"/></svg>'; }
  function showBar(n, ti) {
    if (!CUR.bar || !CUR.bar.isConnected) { CUR.bar = document.createElement('div'); CUR.bar.id = 'ek-npcbar'; document.body.appendChild(CUR.bar); }
    CUR.bar.innerHTML = '<b class="nb-n">' + n.e + ' ' + n.n + '</b>' + strip(n, ti) + '<button type="button" class="nb-x" aria-label="Obaya dön">✕</button>';
    CUR.bar.hidden = false; document.body.classList.add('ek-npcbar-on'); CUR.barTab = n.tabs[ti].t; CUR.bar.dataset.id = n.id;
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-npt]');
    if (b && CUR.id) { ev.stopPropagation(); open(CUR.id, +b.dataset.npt); return; }
    var x = ev.target.closest && ev.target.closest('#ek-npcbar .nb-x'); if (x) { ev.stopPropagation(); closeAll(); var c = document.querySelector('#tabs [data-t="c"]'); if (c) c.click(); return; }
    var g = ev.target.closest && ev.target.closest('[data-ng]'); if (g) { ev.stopPropagation(); goGuide(+g.dataset.ng); }
  }, true);
  function barTick() { document.body.classList.toggle('ek-npcbar-on', !!(CUR.bar && !CUR.bar.hidden)); if (CUR.bar && !CUR.bar.hidden && (W.tab !== CUR.barTab)) { hideBar(); if (!document.querySelector('.ek-ov.np-win')) CUR.id = null; } var b = CUR.bar; if (b && !b.hidden) b.classList.toggle('under', !!document.querySelector('.ek-ov')); document.querySelectorAll('.ek-ov.np-win').forEach(function (o) { if (o.__fill) o.__fill(); }); }

  /* ---------- 3D ---------- */
  var K = null, G = {};
  function classes() {
    if (K) return K; var c3 = W.city3d; if (!c3 || !c3.scene) return null; var o = {};
    c3.scene.traverse(function (x) { if (x.geometry && !o[x.geometry.type]) o[x.geometry.type] = x.geometry.constructor; if (x.isMesh && !o.Mesh && !x.isInstancedMesh) o.Mesh = x.constructor; if (x.type === 'Group' && !o.Group) o.Group = x.constructor; if (x.material && x.material.type === 'MeshStandardMaterial' && !o.Std) o.Std = x.material.constructor; });
    return (K = o.Mesh && o.Group && o.Std && o.CylinderGeometry && o.ConeGeometry && o.BoxGeometry && o.SphereGeometry ? o : null);
  }
  function build(n) {
    var C = classes(); if (!C) return null; var CY = C.CylinderGeometry, g = new C.Group(); g.position.set(n.x, 0, n.z);
    function put(geo, m, x, y, z) { var o = new C.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; g.add(o); return o; }
    var felt = new C.Std({ color: '#e9dcc0', roughness: .95 }), wood = new C.Std({ color: '#5a3d24', roughness: .9 }), gold = new C.Std({ color: '#d6a640', metalness: .5, roughness: .4 });
    if (n.kind === 'tent') {
      var band = new C.Std({ color: n.c, roughness: .8 });
      put(new CY(3.2, 3.3, 2.4, 24), felt, 0, 1.2, 0); put(new C.ConeGeometry(3.6, 2.2, 24), felt, 0, 3.5, 0);
      put(new CY(3.25, 3.25, .35, 24, 1, true), band, 0, 2.15, 0); put(new CY(3.32, 3.32, .25, 24, 1, true), band, 0, .5, 0);
      put(new C.BoxGeometry(1.2, 1.7, .2), band, 0, .85, 3.2); put(new CY(.06, .06, 2.2, 6), wood, 0, 5.4, 0);
      var fl = put(new C.BoxGeometry(.9, .55, .03), band, .45, 6.15, 0); fl.userData.flag = 1; put(new C.SphereGeometry(.12, 8, 6), gold, 0, 6.5, 0);
    } else if (n.kind === 'fire') {
      var stone = new C.Std({ color: '#7d7468', roughness: 1 }), ember = new C.Std({ color: '#ff8a3a', emissive: '#ff6a1a', emissiveIntensity: 1.4 });
      for (var i = 0; i < 9; i++) { var a = i / 9 * Math.PI * 2; put(new C.SphereGeometry(.45, 8, 6), stone, Math.cos(a) * 1.4, .25, Math.sin(a) * 1.4); }
      var f1 = put(new C.ConeGeometry(.8, 2.0, 10), ember, 0, 1.1, 0); f1.userData.fire = 1; var f2 = put(new C.ConeGeometry(.5, 1.4, 8), new C.Std({ color: '#ffd34c', emissive: '#ffb000', emissiveIntensity: 1.6 }), .2, 1.0, .1); f2.userData.fire = 2;
      put(new CY(.12, .14, 6, 8), wood, 2.6, 3, 0); var tf = put(new C.BoxGeometry(1.4, 1.0, .04), new C.Std({ color: '#2b4f6e', roughness: .8 }), 3.3, 5.2, 0); tf.userData.flag = 1;
      put(new C.SphereGeometry(.16, 8, 6), gold, 2.6, 6.1, 0);
    } else if (n.kind === 'tug') {
      put(new CY(.16, .2, 8, 10), wood, 0, 4, 0); put(new C.SphereGeometry(.35, 12, 10), gold, 0, 8.2, 0);
      var hair = new C.Std({ color: '#2a1d14', roughness: 1 });
      for (var j = 0; j < 3; j++) { var h = put(new C.ConeGeometry(.45 - j * .08, 1.6, 10), hair, 0, 7.2 - j * 1.1, 0); h.rotation.x = Math.PI; h.userData.sway = j + 1; }
      put(new CY(1.2, 1.3, .3, 16), new C.Std({ color: '#7d7468', roughness: 1 }), 0, .15, 0);
      [-1, 1].forEach(function (sd) { var b = put(new C.BoxGeometry(.04, 1.6, .9), new C.Std({ color: '#8f2a1e' }), sd * .55, 5.6, 0); b.userData.flag = sd; });
    } else if (n.kind === 'pen') {
      for (var k = 0; k < 10; k++) { var aa = k / 10 * Math.PI * 2; put(new CY(.08, .1, 1.3, 6), wood, Math.cos(aa) * 3.2, .65, Math.sin(aa) * 3.2); }
      if (C.TorusGeometry) { var r = put(new C.TorusGeometry(3.2, .05, 5, 40), wood, 0, 1.0, 0); r.rotation.x = Math.PI / 2; }
      var hm = new C.Std({ color: '#7a4a26', roughness: .6 });
      var bd = put(new CY(.3, .28, 1.2, 12), hm, 0, 1.15, 0); bd.rotation.x = Math.PI / 2; var nk = put(new CY(.12, .2, .7, 10), hm, 0, 1.55, .72); nk.rotation.x = .6; var hd = put(new CY(.07, .13, .45, 10), hm, 0, 1.78, 1.05); hd.rotation.x = 2.1;
      [[-.17, .45], [.17, .45], [-.17, -.45], [.17, -.45]].forEach(function (p) { put(new CY(.06, .05, .9, 8), hm, p[0], .45, p[1]); });
      put(new CY(.06, .06, 3.2, 6), wood, 2.4, 1.6, -2.2); put(new C.BoxGeometry(1.1, .8, .8), wood, 2.4, 3.4, -2.2); put(new C.ConeGeometry(.85, .6, 4), new C.Std({ color: '#8f6512' }), 2.4, 4.1, -2.2);
    }
    W.city3d.scene.add(g); return g;
  }
  function anim(t) {
    for (var id in G) { var g = G[id]; if (!g) continue; g.children.forEach(function (o) { var u = o.userData; if (u.flag) o.rotation.y = Math.sin(t * 2 + u.flag) * .25; if (u.fire) { o.scale.y = 1 + Math.sin(t * 9 + u.fire) * .12; o.scale.x = o.scale.z = 1 + Math.sin(t * 7 + u.fire) * .06; } if (u.sway) o.rotation.z = Math.sin(t * 1.4 + u.sway) * .08; }); }
  }

  /* ---------- simge levhaları ---------- */
  var L = { el: null, pool: {}, v: null, hit: {} };
  function markers() {
    var c = W.city3d, cv = document.getElementById('cityv');
    if (!c || !c.camera || !cv || W.tab !== 'c') { if (L.el) L.el.hidden = true; return; }
    if (!L.el || !L.el.isConnected) { L.el = document.createElement('div'); L.el.id = 'ek-npcs'; L.pool = {}; cv.appendChild(L.el); L.el.addEventListener('click', function (ev) { var b = ev.target.closest('[data-npc]'); if (!b) return; ev.stopPropagation(); open(b.dataset.npc); }); }
    L.el.hidden = !!document.querySelector('.ek-ov'); if (!L.v) L.v = new c.camera.position.constructor();
    var r = c.renderer.domElement.getBoundingClientRect(), bx = cv.getBoundingClientRect();
    NPCS.forEach(function (n) {
      var b = L.pool[n.id];
      if (!b) { b = L.pool[n.id] = document.createElement('div'); b.setAttribute('role', 'button'); b.className = 'np-mk'; b.dataset.npc = n.id; L.el.appendChild(b); }
      var lk = locked(n), pd = lk ? '' : pending(n.id), key = lk + pd;
      if (b.__k !== key) { b.__k = key; b.className = 'np-mk' + (lk ? ' lk' : '') + (pd ? ' ' + pd : '') + (b.classList.contains('glow') ? ' glow' : ''); b.innerHTML = '<i>' + (lk ? tamgaSvg() : n.e) + '</i>' + (pd === 'hil' ? '<em class="np-hil"></em>' : pd === 'up' ? '<em class="np-up"></em>' : ''); b.title = n.n; }
      L.v.set(n.x, n.kind === 'tug' ? 9.5 : n.kind === 'fire' ? 7.4 : 7.6, n.z).project(c.camera);
      if (L.v.z > 1 || Math.abs(L.v.x) > 1.1 || Math.abs(L.v.y) > 1.1) { b.hidden = true; return; }
      var sx = r.left + (L.v.x + 1) / 2 * r.width, sy = r.top + (1 - L.v.y) / 2 * r.height;
      b.hidden = false; b.style.transform = 'translate(' + (sx - bx.left - 20).toFixed(1) + 'px,' + (sy - bx.top - 20).toFixed(1) + 'px)';
      L.v.set(n.x, 2, n.z).project(c.camera); L.hit[n.id] = [r.left + (L.v.x + 1) / 2 * r.width, r.top + (1 - L.v.y) / 2 * r.height];
    });
  }
  var down = null;
  document.addEventListener('pointerdown', function (ev) { if (W.tab !== 'c' || !ev.target.closest || !ev.target.closest('#cityv canvas')) return; down = { x: ev.clientX, y: ev.clientY, t: now() }; }, true);
  document.addEventListener('pointerup', function (ev) {
    if (!down || W.tab !== 'c') { down = null; return; } var mv = Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 10 || now() - down.t > 600; down = null; if (mv) return;
    var best = null, bd = 50; for (var id in L.hit) { var p = L.hit[id], d = Math.hypot(ev.clientX - p[0], ev.clientY - p[1]); if (d < bd) { bd = d; best = id; } }
    if (best) { ev.stopPropagation(); open(best); }
  }, true);
  function intro() {
    var e = ek(); if (e.npcI || W.tab !== 'c' || !L.el || document.querySelector('.ek-ov') || document.getElementById('ek-boot')) return; e.npcI = 1; save();
    var order = ['ocak', 'kurultay', 'sefer', 'tug', 'hazine', 'agil'];
    order.forEach(function (id, i) { setTimeout(function () { var b = L.pool[id]; if (!b) return; b.classList.add('glow'); setTimeout(function () { b.classList.remove('glow'); }, 1100); }, 600 + i * 700); });
  }

  /* ---------- 157) sade menü ---------- */
  function menu() {
    document.body.classList.add('ek-npcmenu');
    var tabs = document.getElementById('tabs'); if (!tabs || tabs.querySelector('[data-ek-chat]')) return;
    var mk = function (attr, ico, title, fn) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute(attr, '1'); b.title = title; b.className = 'ek-navx'; b.innerHTML = '<span class="ek-nxi">' + ico + '</span>'; b.addEventListener('click', function (ev) { ev.stopPropagation(); fn(); }); return b; };
    var p = tabs.querySelector('[data-t="p"]');
    var bag = mk('data-ek-bag2', '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#e2b65a" stroke-width="1.8" stroke-linejoin="round"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M9 13h6"/></svg>', 'Çanta', function () { if (W.openCanta) W.openCanta(); });
    var chat = mk('data-ek-chat', '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#e2b65a" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5h16v11H10l-4 4v-4H4z"/><path d="M8 10h8M8 13h5"/></svg>', 'Sohbet', function () { W.tab = 'a'; rer(); setTimeout(function () { var f = document.querySelector('.mgmt-chat-fold'); if (f) { f.open = true; f.scrollIntoView({ block: 'end' }); } }, 200); });
    if (p) { tabs.insertBefore(bag, p); p.insertAdjacentElement('afterend', chat); } else { tabs.appendChild(bag); tabs.appendChild(chat); }
  }

  var l1 = 0, t0 = 0;
  function frame(ts) {
    requestAnimationFrame(frame); if (document.hidden) return;
    var built = true; NPCS.forEach(function (n) { if (!G[n.id]) built = false; });
    if (!built && ts - t0 > 800) { t0 = ts; try { NPCS.forEach(function (n) { if (!G[n.id]) G[n.id] = build(n); }); } catch (e) {} }
    if (W.tab === 'c' && !document.documentElement.classList.contains('ao')) { anim(ts / 1000); try { markers(); } catch (e) {} } else if (L.el) L.el.hidden = true; /* 26.11: 2.5D obada eski 3D işaretler güncellenmez */
    if (ts - l1 > 300) { l1 = ts; try { barTick(); menu(); intro(); } catch (e) {} }
  }
  function start() { if (!S() || !W.city3d || !W.city3d.scene) { setTimeout(start, 500); return; } requestAnimationFrame(frame); }
  start();
  W.ergenekonNpc = { open: open, NPCS: NPCS, close: closeAll };
})();
