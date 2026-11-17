/* Ergenekon ek paketi — Claude, 17 Kasım 2026.
   Ana oyun koduna dokunmadan yüklenir (index.html sonunda tek <script>).
   1) Üst barda Kömür ve Çelik + Çanta / Ayarlar / Açıklama düğmeleri
   2) Sol menü 7 simgeye iner; Harita için "Dünya" düğmesi, Arena Sefer Otağı içinden açılır
   3) Canavarlardan düşük ihtimalle kaynak paketi düşer; Çanta penceresinde açılır
   4) Obanın çevresindeki ormanda parsel kesme → kütük → tarla; tarlalar Et üretir
   Kalıcı veriler s.ek altında tutulur ve oyunun kendi kaydıyla saklanır. */
(function () {
  'use strict';
  var W = window;
  if (W.__ergenekonEk) return;
  W.__ergenekonEk = true;

  /* ---------- 0) Dünya haritası sunucusuz da çalışsın ----------
     /api/world yoksa (GitHub Pages) haritayı kendi obanla yerel kur:
     oba, kaynaklar, canavarlar ve kafileler oyunun kendi verisinden çizilir. */
  (function () {
    var nf0 = W.fetch && W.fetch.bind(W);
    if (!nf0) return;
    function local() {
      var s = W.s || {}, l = s.l || {};
      var body = { self: 'yerel', serverTime: Date.now(), players: [{ id: 'yerel', name: s.boyName || 'Boyun', level: l.ocak || 1, obaLevel: l.oba || 0, wallLevel: l.sur || 0, x: 0, z: 0, updatedAt: Date.now() }] };
      return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    W.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      if (!/\/api\/world(\?|$)/.test(url)) return nf0(input, init);
      return nf0(input, init).then(function (r) { return r.ok ? r : local(); }, function (e) { if (e && e.name === 'AbortError') throw e; return local(); });
    };
  })();

  var RES = ['et', 'odun', 'komur', 'demir', 'celik'];
  var RNAME = { et: 'Et', odun: 'Odun', komur: 'Kömür', demir: 'Demir', celik: 'Çelik' };
  var TIER = {
    g: { n: 'Yeşil', size: 1000, celik: 100, p: 0.06, min: 1 },
    b: { n: 'Mavi', size: 5000, celik: 500, p: 0.02, min: 6 },
    p: { n: 'Mor', size: 10000, celik: 1000, p: 0.005, min: 15 }
  };
  var CUT_MIN = 20, PLOW_MIN = 15, STEP = 1.25;

  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function capOf(r) { if (r === 'celik') return Infinity; try { return W.cap(); } catch (e) { return Infinity; } }
  function ek() {
    var s = S(); if (!s) return null;
    if (!s.ek || typeof s.ek !== 'object') s.ek = {};
    var e = s.ek;
    e.v = 1;
    e.pk = e.pk || {};
    RES.forEach(function (r) { e.pk[r] = e.pk[r] || { g: 0, b: 0, p: 0 }; });
    e.ps = e.ps || {};
    if (!e.lt) e.lt = Date.now();
    return e;
  }
  function persist() { try { W.save && W.save(); } catch (e) {} }
  function log(m) { try { W.add && W.add(m); } catch (e) {} }
  function rerender() { try { W.render && W.render(); } catch (e) {} }
  function ocak() { var s = S(); return (s && s.l && s.l.ocak) || 1; }
  function fmtT(sec) {
    sec = Math.max(0, Math.ceil(sec));
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), x = sec % 60;
    if (h) return h + 'sa ' + m + 'dk';
    if (m) return m + 'dk ' + (x < 10 ? '0' : '') + x + 'sn';
    return x + 'sn';
  }

  /* ---------- simgeler (kabartma altın) ---------- */
  var GOLD = '<defs><linearGradient id="ekg" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#fff3c9"/><stop offset=".25" stop-color="#f2c771"/><stop offset=".55" stop-color="#b37c2d"/><stop offset=".72" stop-color="#e6b964"/><stop offset="1" stop-color="#7a4e17"/></linearGradient></defs>';
  function gsvg(body, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 48 48" aria-hidden="true" style="filter:drop-shadow(0 -.5px 0 rgba(255,240,200,.35)) drop-shadow(0 1.6px .6px rgba(0,0,0,.85))">' + GOLD + body + '</svg>';
  }
  var P = 'fill="url(#ekg)" stroke="#2a1606" stroke-width=".7"';
  var ICON = {
    bag: '<path ' + P + ' d="M17 13c0-5 3-8 7-8s7 3 7 8h-3c0-3-1.6-5-4-5s-4 2-4 5z"/><path ' + P + ' d="M9 15h30l3 26a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M14 24h20M24 24v9" stroke="#2a1606" stroke-width="1.6" fill="none"/><circle cx="24" cy="33" r="3" fill="#9c2219" stroke="#2a1606" stroke-width=".7"/>',
    gear: '<path ' + P + ' fill-rule="evenodd" d="M21 3h6l1 5 4 2 4-3 4 4-3 4 2 4 5 1v6l-5 1-2 4 3 4-4 4-4-3-4 2-1 5h-6l-1-5-4-2-4 3-4-4 3-4-2-4-5-1v-6l5-1 2-4-3-4 4-4 4 3 4-2zM24 17a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>',
    book: '<path ' + P + ' d="M5 10c6-2 13-1 18 3v28c-5-4-12-5-18-3z"/><path ' + P + ' d="M43 10c-6-2-13-1-18 3v28c5-4 12-5 18-3z"/><path d="M9 17c4-1 8-.5 11 1.5M9 23c4-1 8-.5 11 1.5M28 18.5c3-2 7-2.5 11-1.5M28 24.5c3-2 7-2.5 11-1.5" stroke="#2a1606" stroke-width="1.1" fill="none"/>',
    globe: '<circle ' + P + ' cx="24" cy="24" r="19"/><path d="M5.5 24h37M24 5c6 6 6 32 0 38M24 5c-6 6-6 32 0 38M9 14h30M9 34h30" stroke="#2a1606" stroke-width="1.2" fill="none"/>',
    yurt: '<path ' + P + ' d="M4 30 24 12l20 18v4H4z"/><path ' + P + ' d="M8 33h32v10H8z"/><path d="M20 43v-7a4 4 0 0 1 8 0v7" fill="#1e1006"/><path d="M24 12V6" stroke="#2a1606" stroke-width="1.4"/>',
    axe: '<path ' + P + ' d="M27 6l4-2 2 2-2 4 11 4c-1 8-7 13-14 13l-2-6-17 17-3-3 17-17-4-3z"/>',
    plow: '<path ' + P + ' d="M6 30h22l8-14h4l-8 16H6z"/><path ' + P + ' d="M10 32l-4 10h6l4-10zM24 32l-3 8h6l3-8z"/><path ' + P + ' d="M34 12l6-8 2 2-6 8z"/>',
    wheat: '<path d="M24 44V12" stroke="#2a1606" stroke-width="1.6"/><path ' + P + ' d="M24 8c-3 2-3 6 0 8 3-2 3-6 0-8zM18 14c0 4 3 6 6 6 0-4-3-6-6-6zM30 14c0 4-3 6-6 6 0-4 3-6 6-6zM17 21c0 4 3 6 7 6 0-4-3-6-7-6zM31 21c0 4-3 6-7 6 0-4 3-6 7-6zM17 28c0 4 3 6 7 6 0-4-3-6-7-6zM31 28c0 4-3 6-7 6 0-4 3-6 7-6z"/>',
    swords: '<g transform="rotate(38 24 27)"><path ' + P + ' d="M21.8 30C21 19 22.6 9.5 29.6 1.6 27.4 11 26.3 20 26.3 30zM15.5 29.6h17v3.4h-17zM22.4 33h3.2v8.6h-3.2z"/></g><g transform="rotate(-38 24 27)"><path ' + P + ' d="M21.8 30C21 19 22.6 9.5 29.6 1.6 27.4 11 26.3 20 26.3 30zM15.5 29.6h17v3.4h-17zM22.4 33h3.2v8.6h-3.2z"/></g>'
  };
  var RICON = {
    et: '<path d="M30 6c9 0 14 7 14 16 0 11-13 18-22 18l-8 6-5-5 6-8C15 21 19 6 30 6z" fill="#c4553f" stroke="#3a0c08" stroke-width="1"/><path d="M30 12c5 0 8 4 8 9" stroke="#f0a090" stroke-width="2" fill="none"/><circle cx="11" cy="40" r="4" fill="#efe1c6" stroke="#5a4a30"/>',
    odun: '<rect x="5" y="17" width="38" height="18" rx="9" fill="#8a5a2e" stroke="#3a220c"/><circle cx="14" cy="26" r="7" fill="#d6a565" stroke="#3a220c"/><circle cx="14" cy="26" r="3" fill="none" stroke="#8a5a2e" stroke-width="1.5"/>',
    komur: '<path d="M7 33l6-15 12-6 15 8 2 13-10 8H16z" fill="#2f3338" stroke="#9aa2a8" stroke-width="1.4"/><path d="M14 22l9-4 9 5" stroke="#6d757c" stroke-width="1.2" fill="none"/><circle cx="21" cy="30" r="2" fill="#5d646a"/>',
    demir: '<path d="M5 30l8-12h22l8 12z" fill="#a9b4bd" stroke="#4a5560"/><path d="M5 30h38v6H5z" fill="#6b7580" stroke="#4a5560"/>',
    celik: '<path d="M4 34l6-10h28l6 10z" fill="#7f9bb4" stroke="#2e3e4e"/><path d="M4 34h40v6H4z" fill="#465a6e" stroke="#2e3e4e"/><path d="M12 24l4-8h16l4 8z" fill="#b9cfe2" stroke="#2e3e4e"/><path d="M17 18h14" stroke="#eef6ff" stroke-width="1.5"/>'
  };
  function rsvg(r, size) { return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 48 48" aria-hidden="true">' + RICON[r] + '</svg>'; }
  function dataUri(svg) { return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')); }

  /* ---------- 1) üst bar ---------- */
  function enhanceTop() {
    var s = S(), res = document.getElementById('res');
    if (!s || !res || !res.firstElementChild) return;
    var kids = Array.prototype.slice.call(res.children);
    var labels = ['odun', 'et', 'demir'];
    for (var i = 0; i < 3 && i < kids.length; i++) {
      if (!kids[i].querySelector('.ek-l')) kids[i].insertAdjacentHTML('afterbegin', '<span class="ek-l">' + RNAME[labels[i]] + '</span>');
      kids[i].classList.add('ek-res');
    }
    ['komur', 'celik'].forEach(function (r, j) {
      var el = res.querySelector('[data-ek-res="' + r + '"]');
      if (!el) {
        el = kids[0].cloneNode(true);
        el.setAttribute('data-ek-res', r);
        el.title = RNAME[r];
        var art = el.querySelector('.painted-game-icon');
        if (art) {
          art.setAttribute('data-painted-kind', r === 'komur' ? 'coal' : 'steel');
          art.style.backgroundPosition = r === 'komur' ? '66.666667% 66.666667%' : '33.333333% 66.666667%';
        } else {
          var img = el.querySelector('img'), icon = '<img src="' + dataUri(rsvg(r, 48)) + '" alt="" style="height:22px;width:auto;vertical-align:middle">';
          if (img) img.outerHTML = icon; else el.insertAdjacentHTML('afterbegin', icon);
        }
        var l = el.querySelector('.ek-l'); if (l) l.textContent = RNAME[r];
        var anchor = res.querySelector(j === 0 ? '[data-ek-res="komur"]' : null) || res.children[2 + j];
        anchor.insertAdjacentElement('afterend', el);
      }
      var b = el.querySelector('b'); var v = nf((s.r && s.r[r]) || 0);
      if (b && b.textContent !== String(v)) b.textContent = v;
    });
    var top = document.getElementById('top');
    if (top && !top.querySelector('.ek-topbtns')) {
      var box = document.createElement('div');
      box.className = 'ek-topbtns';
      box.innerHTML =
        '<button type="button" class="ek-rbtn" data-ek="bag" aria-label="Çanta" title="Çanta">' + gsvg(ICON.bag, 26) + '<i class="ek-badge" hidden></i></button>' +
        '<button type="button" class="ek-rbtn" data-ek="gear" aria-label="Oba Düzeni – ayarlar" title="Oba Düzeni">' + gsvg(ICON.gear, 26) + '</button>';
      var inf = top.querySelector('.infb');
      if (inf) top.insertBefore(box, inf); else top.appendChild(box);
    }
    var e = ek(), n = 0;
    RES.forEach(function (r) { n += e.pk[r].g + e.pk[r].b + e.pk[r].p; });
    var badge = top && top.querySelector('[data-ek="bag"] .ek-badge');
    if (badge) { badge.hidden = !n; badge.textContent = n > 99 ? '99+' : n; }
  }

  /* ---------- 2) sol menü ---------- */
  function tabBtn(t) { return document.querySelector('#tabs [data-t="' + t + '"]'); }
  function goTab(t) { var b = tabBtn(t); if (b) b.click(); }
  function enhanceNav() {
    document.body.classList.add('ek-nav7');
    var tab = W.tab;
    var dock = document.getElementById('ek-world');
    if (!dock) {
      dock = document.createElement('button');
      dock.id = 'ek-world'; dock.type = 'button';
      dock.addEventListener('click', function () { goTab(W.tab === 'm' ? 'c' : 'm'); });
    }
    var host = document.getElementById(tab === 'm' ? 'mapv' : 'cityv');
    if (host && dock.parentNode !== host) host.appendChild(dock);
    var toMap = tab !== 'm';
    var want = toMap ? 'world' : 'oba';
    if (dock.dataset.mode !== want) {
      dock.dataset.mode = want;
      dock.innerHTML = gsvg(toMap ? ICON.globe : ICON.yurt, 34) + '<span>' + (toMap ? 'DÜNYA' : 'OBA') + '</span>';
      dock.setAttribute('aria-label', toMap ? 'Dünya haritasına geç' : 'Obaya dön');
    }
    var find = document.getElementById('ek-find'), mapv = document.getElementById('mapv');
    if (tab === 'm' && mapv) {
      if (!find) {
        find = document.createElement('button'); find.id = 'ek-find'; find.type = 'button'; find.setAttribute('aria-label', 'Kaynak ara');
        find.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg><span>ARA</span>';
        find.addEventListener('click', openFind);
      }
      if (find.parentNode !== mapv) mapv.appendChild(find);
      find.hidden = false;
    } else if (find) find.hidden = true;
    var mBtn = tabBtn('m');
    dock.hidden = !(tab === 'c' || tab === 'm') || !mBtn;
    // Arena: Sefer Otağı'nın "Yolunu seç" listesinde bir sekme olarak
    var y = tabBtn('y'), tk = document.getElementById('tk');
    if (tk && tab === 'k' && y && !tk.querySelector('[data-ek-arena]')) {
      var zin = Array.prototype.filter.call(tk.querySelectorAll('button'), function (b) { return (b.textContent || '').replace(/[›\s]+$/, '').trim() === 'Zindan'; })[0];
      if (zin) {
        var a = zin.cloneNode(true);
        Array.prototype.slice.call(a.attributes).forEach(function (at) { if (/^data-|^aria-pressed|^aria-selected/.test(at.name)) a.removeAttribute(at.name); });
        a.classList.remove('on', 'active', 'sel', 'selected');
        a.setAttribute('data-ek-arena', '1'); a.type = 'button';
        var label = Array.prototype.filter.call(a.querySelectorAll('*'), function (n) { return n.childElementCount === 0 && (n.textContent || '').trim() === 'Zindan'; })[0];
        if (label) label.textContent = 'Bahadır Meydanı';
        else a.lastChild && a.lastChild.nodeType === 3 ? (a.lastChild.textContent = ' Bahadır Meydanı') : a.appendChild(document.createTextNode('Bahadır Meydanı'));
        var pic = a.querySelector('img, svg, .painted-game-icon');
        if (pic) { var w = document.createElement('span'); w.className = 'ek-tabico'; w.innerHTML = gsvg(ICON.swords, 30); pic.replaceWith(w); }
        a.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); goTab('y'); }, true);
        zin.insertAdjacentElement('afterend', a);
      } else {
        var a2 = document.createElement('button');
        a2.type = 'button'; a2.className = 'ek-arena'; a2.setAttribute('data-ek-arena', '1');
        a2.innerHTML = gsvg(ICON.swords, 30) + '<span><b>Bahadır Meydanı</b><small>1’e 1 arena ve sıralama</small></span><em>›</em>';
        a2.addEventListener('click', function () { goTab('y'); });
        tk.insertBefore(a2, tk.firstChild);
      }
    }
    var tg = document.getElementById('tg');
    if (tg && tab === 'g' && !tg.querySelector('[data-ek-helptab]')) {
      var ref = Array.prototype.filter.call(tg.querySelectorAll('button'), function (x) { return /^(Rehber|Kayıt ve bulut|Görünüm)$/.test((x.textContent || '').replace(/[›\s]+$/, '').trim()); }).pop();
      if (ref) {
        var hb = ref.cloneNode(true);
        Array.prototype.slice.call(hb.attributes).forEach(function (at) { if (/^data-|^aria-pressed|^aria-selected/.test(at.name)) hb.removeAttribute(at.name); });
        hb.classList.remove('on', 'active', 'sel', 'selected');
        hb.setAttribute('data-ek-helptab', '1'); hb.setAttribute('data-ek', 'help'); hb.type = 'button';
        var lb = Array.prototype.filter.call(hb.querySelectorAll('*'), function (n) { return n.childElementCount === 0 && /^(Rehber|Kayıt ve bulut|Görünüm)$/.test((n.textContent || '').trim()); })[0];
        if (lb) lb.textContent = 'Açıklamalar';
        var pc = hb.querySelector('img, svg, .painted-game-icon');
        if (pc) { var sp = document.createElement('span'); sp.className = 'ek-tabico'; sp.innerHTML = gsvg(ICON.book, 30); pc.replaceWith(sp); }
        ref.insertAdjacentElement('afterend', hb);
      }
    }
    var ty = document.getElementById('ty');
    if (ty && tab === 'y' && !ty.querySelector('.ek-back')) {
      var bk = document.createElement('button');
      bk.type = 'button'; bk.className = 'ek-back';
      bk.innerHTML = '‹ Sefer Otağı';
      bk.addEventListener('click', function () { goTab('k'); });
      ty.insertBefore(bk, ty.firstChild);
    }
  }
  // Bahadır Meydanı açıkken Sefer simgesi seçili görünsün
  function navActive() {
    var k = tabBtn('k');
    if (k) k.classList.toggle('ek-on', W.tab === 'y');
  }

  /* ---------- 3) canavar ganimet paketleri ---------- */
  function rollPack(level) {
    var e = ek(); if (!e) return null;
    var x = Math.random(), tier = null;
    if (level >= TIER.p.min && x < TIER.p.p) tier = 'p';
    else if (level >= TIER.b.min && x < TIER.p.p + TIER.b.p) tier = 'b';
    else if (x < TIER.p.p + TIER.b.p + TIER.g.p) tier = 'g';
    if (!tier) return null;
    var w = Math.random() * 4.5, r = w < 1 ? 'et' : w < 2 ? 'odun' : w < 3 ? 'komur' : w < 4 ? 'demir' : 'celik';
    e.pk[r][tier]++;
    return { r: r, t: tier };
  }
  function packAmount(r, t) { return r === 'celik' ? TIER[t].celik : TIER[t].size; }
  function packName(r, t) { return TIER[t].n + ' ' + RNAME[r] + ' paketi (' + nf(packAmount(r, t)) + ')'; }
  function hookFight() {
    if (typeof W.fight !== 'function' || W.fight.__ek) return;
    var orig = W.fight;
    var wrapped = function (m) {
      var s = S(), k0 = s && s.stat ? s.stat.kills : 0;
      var out = orig.apply(this, arguments);
      try {
        s = S();
        if (s && s.stat && s.stat.kills > k0 && W.M && W.M[m]) {
          var az = W.X6 && W.X6.isAz ? W.X6.isAz(m) : false;
          var got = rollPack(W.M[m][2] + (az ? 2 : 0));
          if (got) {
            var msg = '🎁 Nadir ganimet! ' + packName(got.r, got.t) + ' çantana kondu.';
            s.last = (s.last || '') + ' · 🎁 ' + packName(got.r, got.t);
            log(msg); persist(); rerender();
          }
        }
      } catch (e) {}
      return out;
    };
    wrapped.__ek = true;
    W.fight = wrapped;
  }

  /* ---------- Çanta ---------- */
  var bagSel = null;
  function bagHtml() {
    var e = ek(), s = S(), tiles = '', total = 0;
    ['p', 'b', 'g'].forEach(function (t) {
      RES.forEach(function (r) {
        var n = e.pk[r][t]; if (!n) return; total += n;
        var on = bagSel && bagSel.r === r && bagSel.t === t;
        tiles += '<button type="button" class="ek-tile ek-t' + t + (on ? ' on' : '') + '" data-ek-pk="' + r + ':' + t + '" aria-label="' + esc(packName(r, t)) + ', ' + n + ' adet">' +
          '<b class="ek-amt">' + nf(packAmount(r, t)) + '</b>' + rsvg(r, 46) + '<i class="ek-chest"></i><span class="ek-n">' + n + '</span></button>';
      });
    });
    var detail = '';
    if (bagSel && e.pk[bagSel.r][bagSel.t] > 0) {
      var r = bagSel.r, t = bagSel.t, n = e.pk[r][t], amt = packAmount(r, t), have = (s.r && s.r[r]) || 0, room = capOf(r) - have;
      var canAll = Math.max(0, Math.min(n, Math.floor(room / amt)));
      detail = '<div class="ek-detail"><div class="ek-dt">' + rsvg(r, 40) + '<span><b>' + esc(packName(r, t)) + '</b><small>Elinde ' + n + ' adet · açınca +' + nf(amt) + ' ' + RNAME[r] + '</small></span></div>' +
        (room < amt ? '<p class="ek-warn">Depo dolu. Önce kaynak harca ya da Ambar’ı geliştir.</p>' : '') +
        '<div class="ek-acts"><button type="button" class="ek-btn" data-ek-use="1"' + (room < amt ? ' disabled' : '') + '>Kullan</button>' +
        '<button type="button" class="ek-btn gold" data-ek-use="all"' + (canAll < 1 ? ' disabled' : '') + '>Hepsini kullan' + (canAll > 1 ? ' (' + canAll + ')' : '') + '</button></div></div>';
    } else {
      detail = '<div class="ek-detail ek-empty-d"><p>' + (total ? 'Açmak istediğin paketi seç.' : 'Henüz paket yok. Haritadaki canavarları yendikçe düşük ihtimalle kaynak paketi düşer: yeşil %6, mavi %2 (Sv 6+), mor %0,5 (Sv 15+).') + '</p></div>';
    }
    return '<div class="ek-modal" role="dialog" aria-modal="true" aria-label="Çanta">' +
      '<div class="ek-mh"><span class="ek-cap">ALPİN HEYBESİ</span><h2>Çanta</h2><button type="button" class="ek-x" data-ek-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="ek-tabs"><button type="button" class="on">Kaynaklar</button><button type="button" data-ek-items="1">Eşyalar</button></div>' +
      '<div class="ek-grid">' + (tiles || '<div class="ek-empty">Çanta boş</div>') + '</div>' + detail + '</div>';
  }
  function openBag() {
    var o = document.getElementById('ek-bag');
    if (!o) {
      o = document.createElement('div'); o.id = 'ek-bag'; o.className = 'ek-ov';
      document.body.appendChild(o);
      o.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t === o || t.closest('[data-ek-close]')) { o.remove(); return; }
        var pk = t.closest('[data-ek-pk]');
        if (pk) { var p = pk.getAttribute('data-ek-pk').split(':'); bagSel = { r: p[0], t: p[1] }; o.innerHTML = bagHtml(); return; }
        var use = t.closest('[data-ek-use]');
        if (use && bagSel) { usePack(bagSel.r, bagSel.t, use.getAttribute('data-ek-use') === 'all'); o.innerHTML = bagHtml(); return; }
        if (t.closest('[data-ek-items]')) { o.remove(); try { W.PRF = true; rerender(); } catch (e) {} }
      });
    }
    o.innerHTML = bagHtml();
  }
  function usePack(r, t, all) {
    var e = ek(), s = S(), amt = packAmount(r, t), n = e.pk[r][t];
    var room = capOf(r) - ((s.r && s.r[r]) || 0), k = Math.min(all ? n : 1, Math.floor(room / amt));
    if (k < 1) return;
    e.pk[r][t] -= k;
    s.r[r] = ((s.r && s.r[r]) || 0) + k * amt;
    log('🎁 ' + k + ' × ' + packName(r, t) + ' açıldı: +' + nf(k * amt) + ' ' + RNAME[r] + '.');
    if (!e.pk[r][t]) bagSel = null;
    persist(); rerender();
  }

  /* ---------- 3b) haritada kaynak arama (WOS: tür + seviye + sadece dolu) ---------- */
  var FS = { t: 'odun', lv: 1, full: true, hit: null, msg: '' };
  var FIND_T = [['et', 'Et'], ['odun', 'Odun'], ['komur', 'Kömür'], ['demir', 'Demir']];
  function maxL() { try { return Math.max(1, W.maxLv()); } catch (e) { return 10; } }
  function nodeLevels(t) { var s = S(), m = maxL(), out = {}; (s.nodes || []).forEach(function (n) { if (n && n.t === t && n.lv <= m) out[n.lv] = 1; }); return Object.keys(out).map(Number).sort(function (a, b) { return a - b; }); }
  function freeQueue() { var s = S(); return (s.sq || []).some(function (q) { return q.st === 0; }); }
  function search() {
    var s = S(), busy = {}, best = null, bestT = Infinity;
    (s.sq || []).forEach(function (q) { if (q.st && q.n >= 0) busy[q.n] = 1; });
    (s.nodes || []).forEach(function (n, i) {
      if (!n || n.t !== FS.t || n.lv !== FS.lv || n.rg > 0 || n.res <= 0 || busy[i]) return;
      if (FS.full && n.res < n.max * 0.999) return;
      var t = 0; try { t = W.mt(i); } catch (e) {}
      if (t < bestT) { bestT = t; best = i; }
    });
    FS.hit = best; FS.msg = best === null ? 'Bu seviyede ' + (FS.full ? 'dolu ' : '') + 'kaynak bulunamadı.' : '';
  }
  function findHtml() {
    var lv = nodeLevels(FS.t); if (lv.length && lv.indexOf(FS.lv) < 0) FS.lv = lv.reduce(function (a, b) { return Math.abs(b - FS.lv) < Math.abs(a - FS.lv) ? b : a; });
    var chips = FIND_T.map(function (x) { return '<button type="button" class="ek-fchip' + (FS.t === x[0] ? ' on' : '') + '" data-ek-ft="' + x[0] + '">' + rsvg(x[0], 34) + '<span>' + x[1] + '</span></button>'; }).join('');
    var res = '';
    if (FS.hit !== null && FS.hit !== undefined) {
      var n = S().nodes[FS.hit], t = 0, cap = 0; try { t = W.mt(FS.hit); cap = W.marchCapacity(); } catch (e) {}
      res = '<div class="ek-detail"><div class="ek-dt">' + rsvg(n.t, 40) + '<span><b>' + RNAME[n.t] + ' · Sv ' + n.lv + '</b><small>Kalan ' + nf(n.res) + ' · yol ' + W.ft(t) + ' · kafile yükü ' + nf(cap) + '</small></span></div>' +
        '<div class="ek-acts"><button type="button" class="ek-btn gold" data-ek-send="' + FS.hit + '"' + (freeQueue() ? '' : ' disabled') + '>' + (freeQueue() ? 'Kafile gönder' : 'Boş kafile yok') + '</button></div></div>';
    } else if (FS.msg) res = '<div class="ek-detail ek-empty-d"><p>' + esc(FS.msg) + '</p></div>';
    var range = lv.length ? '<input type="range" min="0" max="' + (lv.length - 1) + '" step="1" value="' + Math.max(0, lv.indexOf(FS.lv)) + '" data-ek-flv="' + lv.join(',') + '" aria-label="Seviye">' : '';
    return '<div class="ek-modal ek-small" role="dialog" aria-modal="true" aria-label="Kaynak ara">' +
      '<div class="ek-mh"><span class="ek-cap">BOZKIRI TARA</span><h2>Kaynak Ara</h2><button type="button" class="ek-x" data-ek-close="1" aria-label="Kapat">✕</button></div>' +
      '<div class="ek-fchips">' + chips + '</div>' +
      '<div class="ek-flv"><b>Sv ' + FS.lv + '</b>' + range + '</div>' +
      '<label class="ek-fchk"><input type="checkbox" data-ek-ffull="1"' + (FS.full ? ' checked' : '') + '> Sadece dolu kaynakları ara</label>' +
      '<div class="ek-acts ek-fgo"><button type="button" class="ek-btn" data-ek-fsearch="1">Ara</button></div>' + res + '</div>';
  }
  function openFind() {
    var o = document.getElementById('ek-findov');
    if (!o) {
      o = document.createElement('div'); o.id = 'ek-findov'; o.className = 'ek-ov ek-sheet'; document.body.appendChild(o);
      o.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t === o || t.closest('[data-ek-close]')) { o.remove(); return; }
        var c = t.closest('[data-ek-ft]'); if (c) { FS.t = c.getAttribute('data-ek-ft'); FS.hit = null; FS.msg = ''; o.innerHTML = findHtml(); return; }
        if (t.closest('[data-ek-fsearch]')) { search(); o.innerHTML = findHtml(); return; }
        var sd = t.closest('[data-ek-send]');
        if (sd && !sd.disabled) { try { W.send(+sd.getAttribute('data-ek-send')); } catch (e) {} o.remove(); try { persist(); rerender(); } catch (e) {} }
      });
      o.addEventListener('input', function (ev) {
        var t = ev.target;
        if (t.hasAttribute('data-ek-flv')) { var l = t.getAttribute('data-ek-flv').split(',').map(Number); FS.lv = l[+t.value]; FS.hit = null; FS.msg = ''; var b = o.querySelector('.ek-flv b'); if (b) b.textContent = 'Sv ' + FS.lv; var r = o.querySelector('.ek-modal > .ek-detail'); if (r) r.remove(); }
        if (t.hasAttribute('data-ek-ffull')) { FS.full = t.checked; FS.hit = null; FS.msg = ''; }
      });
    }
    o.innerHTML = findHtml();
  }

  /* ---------- 4) orman → kütük → tarla ---------- */
  var F = { ready: false };
  function tarlaRate() { try { return W.nrate(ocak()) * 1.5; } catch (e) { return 2000; } } // Et / saat, tarla başına
  function parcelLimit() { return 2 + Math.floor(ocak() / 2); }
  function slotsLimit() { var s = S(); return 1 + ((s && s.l && s.l.odunluk >= 10) ? 1 : 0); }

  function initForest() {
    var c3 = W.city3d; if (!c3 || !c3.landscape || !c3.landscape.group || !c3.camera) return false;
    var g = c3.landscape.group, inst = g.children.filter(function (o) { return o.isInstancedMesh; });
    var trunks = inst.filter(function (o) { return o.geometry && o.geometry.type === 'CylinderGeometry'; })[0];
    if (!trunks) return false;
    var idx = g.children.indexOf(trunks), crowns = g.children[idx + 1], pines = g.children[idx + 2];
    if (!crowns || !pines || !crowns.isInstancedMesh || !pines.isInstancedMesh) return false;
    var grass = inst.filter(function (o) { return o !== pines && o.geometry && o.geometry.type === 'BufferGeometry' && o.count > 1000; })[0];
    var plain = g.children.filter(function (o) { return o.isMesh && !o.isInstancedMesh; })[0];
    if (!grass || !plain) return false;
    var M4 = trunks.matrix.constructor, V3 = trunks.position.constructor, Q = trunks.quaternion.constructor;
    var tmp = new M4(), pos = new V3(), q = new Q(), sc = new V3();
    function read(mesh, i) { mesh.getMatrixAt(i, tmp); tmp.decompose(pos, q, sc); return { x: pos.x, y: pos.y, z: pos.z, q: q.clone(), s: sc.clone(), m: tmp.clone() }; }
    var trees = [];
    for (var i = 0; i < trunks.count; i++) { var t = read(trunks, i); t.i = i; t.parts = []; trees.push(t); }
    function attach(mesh) {
      for (var k = 0; k < mesh.count; k++) {
        var p = read(mesh, k), best = null, bd = 9;
        for (var j = 0; j < trees.length; j++) { var d = Math.hypot(trees[j].x - p.x, trees[j].z - p.z); if (d < bd) { bd = d; best = trees[j]; } }
        if (best) best.parts.push({ mesh: mesh, i: k, m: p.m });
      }
    }
    attach(crowns); attach(pines);
    // parseller: açı dilimi × halka
    var groups = {};
    trees.forEach(function (t) {
      var r = Math.hypot(t.x, t.z); if (r < 55 || r > 118) return;
      var band = r < 74 ? 0 : r < 95 ? 1 : 2, nsec = band === 0 ? 20 : band === 1 ? 26 : 32;
      var a = Math.atan2(t.z, t.x), sec = Math.floor(((a + Math.PI) / (Math.PI * 2)) * nsec) % nsec;
      var key = band + '-' + sec; (groups[key] = groups[key] || []).push(t);
    });
    var parcels = Object.keys(groups).map(function (k) {
      var ts = groups[k], cx = 0, cz = 0;
      ts.forEach(function (t) { cx += t.x; cz += t.z; }); cx /= ts.length; cz /= ts.length;
      var rad = 0; ts.forEach(function (t) { rad = Math.max(rad, Math.hypot(t.x - cx, t.z - cz)); });
      return { id: k, trees: ts, x: cx, z: cz, r: Math.min(7.5, rad + 1.2), d: Math.hypot(cx, cz) };
    }).filter(function (p) { return p.trees.length >= 4; });
    // önce obanın varsayılan bakış açısında görünen parseller açılsın
    var cam = c3.camera.clone(), wide = window.matchMedia && matchMedia('(max-width:700px)').matches;
    cam.position.set.apply(cam.position, wide ? [78, 79, 104] : [62, 55, 80]); cam.lookAt(new V3(0, 0, 0));
    cam.updateMatrixWorld(true); cam.matrixWorldInverse.copy(cam.matrixWorld).invert();
    parcels.forEach(function (p) {
      var v = new V3(p.x, 4, p.z).project(cam);
      p.vis = (v.z < 1 && Math.abs(v.x) < .85 && v.y > -.6 && v.y < .9) ? 0 : 1;
    });
    parcels.sort(function (a, b) { return a.vis - b.vis || a.d - b.d || a.id.localeCompare(b.id); });
    parcels.forEach(function (p, n) { p.n = n; });
    F = {
      ready: true, c3: c3, g: g, trunks: trunks, trees: trees, parcels: parcels, M4: M4, V3: V3, Q: Q,
      Mesh: plain.constructor, IM: trunks.constructor, BG: grass.geometry.constructor,
      Attr: grass.geometry.attributes.position.constructor, grassGeo: grass.geometry,
      baseMat: plain.material, Color: plain.material.color.constructor, fields: {}, zero: new M4().makeScale(0, 0, 0)
    };
    return true;
  }
  function pstate(p) { var e = ek(); return (e && e.ps[p.id]) || null; }
  function unlocked(p) { return p.n < parcelLimit(); }
  function activeJobs() { var e = ek(), n = 0; for (var k in e.ps) { var x = e.ps[k]; if (x.st === 'cut' || x.st === 'plow') n++; } return n; }
  function cutSecs(p) { return CUT_MIN * 60 * Math.pow(STEP, p.n); }
  function plowSecs(p) { return PLOW_MIN * 60 * Math.pow(STEP, p.n); }
  function woodGain(p) { try { return Math.floor(p.trees.length * W.nrate(ocak()) * 0.4); } catch (e) { return p.trees.length * 300; } }

  function setTree(t, mode, frac) {
    var tr = F.trunks;
    if (mode === 'tree') { tr.setMatrixAt(t.i, t.m); t.parts.forEach(function (pt) { pt.mesh.setMatrixAt(pt.i, pt.m); }); }
    else {
      t.parts.forEach(function (pt) { pt.mesh.setMatrixAt(pt.i, F.zero); });
      if (mode === 'stump') {
        var hgt = F.c3.landscape.heightAt(t.x, t.z), s = t.s.clone(); s.y = Math.max(.25, s.y * .09);
        var p = new F.V3(t.x, hgt + s.y * .5, t.z);
        tr.setMatrixAt(t.i, new F.M4().compose(p, t.q, s));
      } else tr.setMatrixAt(t.i, F.zero);
    }
  }
  function field(p) {
    if (F.fields[p.id]) return F.fields[p.id];
    var seg = 48, rings = 14, posA = [], col = [], idx = [], hAt = F.c3.landscape.heightAt, dir = Math.atan2(p.z, p.x);
    var cd = Math.cos(dir), sd = Math.sin(dir);
    posA.push(p.x, hAt(p.x, p.z) + .09, p.z); col.push(.15, .07, .025);
    for (var j = 1; j <= rings; j++) for (var i = 0; i < seg; i++) {
      var a = i / seg * Math.PI * 2, rr = p.r * j / rings * (1 + .07 * Math.sin(a * 3 + p.n)), x = p.x + Math.cos(a) * rr, z = p.z + Math.sin(a) * rr;
      posA.push(x, hAt(x, z) + .09, z);
      var along = (x - p.x) * -sd + (z - p.z) * cd, stripe = .5 + .5 * Math.sin(along * 3.2), edge = j === rings ? .82 : 1;
      col.push((.11 + .08 * stripe) * edge, (.05 + .035 * stripe) * edge, (.018 + .012 * stripe) * edge);
    }
    for (var j2 = 1; j2 <= rings; j2++) for (var i2 = 0; i2 < seg; i2++) {
      var a0 = j2 === 1 ? 0 : 1 + (j2 - 2) * seg + i2, a1 = j2 === 1 ? 0 : 1 + (j2 - 2) * seg + (i2 + 1) % seg;
      var b0 = 1 + (j2 - 1) * seg + i2, b1 = 1 + (j2 - 1) * seg + (i2 + 1) % seg;
      if (j2 === 1) idx.push(0, b1, b0); else idx.push(a0, a1, b0, a1, b1, b0);
    }
    var geo = new F.BG(); geo.setAttribute('position', new F.Attr(posA, 3)); geo.setAttribute('color', new F.Attr(col, 3)); geo.setIndex(idx); geo.computeVertexNormals();
    var mat = F.baseMat.clone(); mat.vertexColors = true; mat.color = new F.Color('#ffffff'); mat.transparent = true; mat.opacity = 0; mat.roughness = 1; mat.map = null; mat.needsUpdate = true;
    var soil = new F.Mesh(geo, mat); soil.receiveShadow = true; F.g.add(soil);
    // ekin: çim geometrisi ile sıra sıra başaklar
    var pts = [];
    for (var k = 0; k < 520; k++) {
      var a2 = Math.random() * Math.PI * 2, r2 = Math.sqrt(Math.random()) * (p.r - .9), x2 = p.x + Math.cos(a2) * r2, z2 = p.z + Math.sin(a2) * r2;
      var along2 = (x2 - p.x) * -sd + (z2 - p.z) * cd; if (Math.sin(along2 * 3.2) < .1) continue; pts.push([x2, z2]);
    }
    var cmat = F.baseMat.clone(); cmat.vertexColors = false; cmat.map = null; cmat.color = new F.Color('#ffffff'); cmat.side = 2; cmat.needsUpdate = true;
    var crop = new F.IM(F.grassGeo, cmat, Math.max(1, pts.length)), q = new F.Q();
    pts.forEach(function (pp, n) {
      q.setFromAxisAngle(new F.V3(0, 1, 0), Math.random() * 6.28);
      crop.setMatrixAt(n, new F.M4().compose(new F.V3(pp[0], hAt(pp[0], pp[1]) + .08, pp[1]), q, new F.V3(1.5, 1.5 + Math.random() * .7, 1.5)));
      crop.setColorAt(n, new F.Color('#6f9a3c'));
    });
    crop.visible = false; F.g.add(crop);
    F.fields[p.id] = { soil: soil, crop: crop, n: pts.length };
    return F.fields[p.id];
  }
  function cropTint(f, t) {
    // filiz → yeşil → sarı (40 dakikalık görsel döngü)
    var q = (t / 2400) % 1, c = new F.Color(), a = new F.Color('#7fb04a'), b = new F.Color('#d6b54a');
    for (var i = 0; i < f.n; i++) { c.copy(a).lerp(b, Math.min(1, Math.max(0, q * 1.3 + (i % 7) * .02))); f.crop.setColorAt(i, c); }
    if (f.crop.instanceColor) f.crop.instanceColor.needsUpdate = true;
    f.crop.scale.set(1, .55 + q * .7, 1);
  }
  function applyVisuals(now) {
    if (!F.ready) return;
    var e = ek(); if (!e) return;
    F.parcels.forEach(function (p) {
      var st = e.ps[p.id], n = p.trees.length;
      if (!st) { if (p.__v !== 'tree') { p.trees.forEach(function (t) { setTree(t, 'tree'); }); p.__v = 'tree'; if (F.fields[p.id]) { F.fields[p.id].soil.visible = false; F.fields[p.id].crop.visible = false; } } return; }
      var f;
      if (st.st === 'cut') {
        var fr = Math.min(1, (now - st.t0) / (st.t1 - st.t0)), down = Math.floor(fr * n + 1e-6), key = 'cut' + down;
        if (p.__v !== key) { p.trees.forEach(function (t, i) { setTree(t, i < down ? 'stump' : 'tree'); }); p.__v = key; }
      } else if (st.st === 'stump') {
        if (p.__v !== 'stump') { p.trees.forEach(function (t) { setTree(t, 'stump'); }); p.__v = 'stump'; }
      } else if (st.st === 'plow') {
        var fr2 = Math.min(1, (now - st.t0) / (st.t1 - st.t0)), gone = Math.floor(fr2 * n + 1e-6), key2 = 'plow' + gone;
        f = field(p); f.soil.visible = true; f.soil.material.opacity = Math.min(1, .15 + fr2);
        if (p.__v !== key2) { p.trees.forEach(function (t, i) { setTree(t, i < gone ? 'none' : 'stump'); }); p.__v = key2; }
      } else if (st.st === 'field') {
        f = field(p);
        if (p.__v !== 'field') { p.trees.forEach(function (t) { setTree(t, 'none'); }); f.soil.visible = true; f.soil.material.opacity = 1; f.crop.visible = true; p.__v = 'field'; }
        cropTint(f, (now - st.t1) / 1000 + p.n * 300);
      }
    });
    F.trunks.instanceMatrix.needsUpdate = true;
    F.trunks.parent.children.forEach(function (o) { if (o.isInstancedMesh && o.instanceMatrix) o.instanceMatrix.needsUpdate = true; });
  }
  function settleJobs(now) {
    var e = ek(); if (!e) return;
    F.parcels && F.parcels.forEach(function (p) {
      var st = e.ps[p.id]; if (!st || now < st.t1) return;
      if (st.st === 'cut') {
        var s = S(), gain = Math.min(woodGain(p), Math.max(0, capOf('odun') - s.r.odun));
        s.r.odun += gain; e.ps[p.id] = { st: 'stump', t0: st.t1, t1: st.t1 };
        log('🪓 Oduncular ' + p.trees.length + ' ağacı kesti: +' + nf(gain) + ' Odun. Kütükleri sökersen burası tarla olur.'); persist();
      } else if (st.st === 'plow') {
        e.ps[p.id] = { st: 'field', t0: st.t1, t1: st.t1 };
        log('🌾 Yeni tarla açıldı! Saatte +' + nf(tarlaRate()) + ' Et üretecek.'); persist();
      }
    });
  }
  function fieldCount() { var e = ek(), n = 0; for (var k in e.ps) if (e.ps[k].st === 'field') n++; return n; }

  // Et üretimi: oyunun tick() döngüsüne eklenir; çevrim dışı süre açılışta hesaplanır.
  function produce(dt) {
    var s = S(), e = ek(); if (!s || !e) return 0;
    var n = fieldCount(); e.lt = Date.now(); if (!n || dt <= 0) return 0;
    var add = n * tarlaRate() / 3600 * dt, room = Math.max(0, capOf('et') - s.r.et), g = Math.min(add, room);
    s.r.et += g; return g;
  }
  function hookTick() {
    if (typeof W.tick !== 'function' || W.tick.__ek) return;
    var orig = W.tick;
    var wrapped = function (dt) { var out = orig.apply(this, arguments); try { produce(Number(dt) || 0); } catch (e) {} return out; };
    wrapped.__ek = true; W.tick = wrapped;
  }
  function offlineCatchUp() {
    var e = ek(); if (!e) return;
    var dt = Math.min(Math.max(0, (Date.now() - (e.lt || Date.now())) / 1000), 43200);
    if (dt > 60) { var g = produce(dt); if (g >= 1) log('🌾 Tarlalar sen yokken +' + nf(g) + ' Et verdi.'); }
    e.lt = Date.now();
  }

  /* işaretler (DOM katmanı) */
  function markerLayer() {
    var host = document.getElementById('cityv'); if (!host) return null;
    var l = document.getElementById('ek-marks');
    if (!l) { l = document.createElement('div'); l.id = 'ek-marks'; host.appendChild(l); l.addEventListener('click', onMark); }
    return l;
  }
  function placeMarks(now) {
    var l = markerLayer(); if (!l || !F.ready) return;
    var vis = W.tab === 'c'; l.hidden = !vis; if (!vis) return;
    var cv = F.c3.renderer.domElement, rect = cv.getBoundingClientRect(), hr = l.getBoundingClientRect();
    var e = ek(), jobs = activeJobs(), html = [], seen = {};
    F.parcels.forEach(function (p) {
      var st = e.ps[p.id], ok = unlocked(p);
      if (!st && !ok) return;
      var y = F.c3.landscape.heightAt(p.x, p.z) + (st && st.st === 'field' ? 2 : 7);
      var v = new F.V3(p.x, y, p.z).project(F.c3.camera);
      if (v.z > 1 || v.x < -1.05 || v.x > 1.05 || v.y < -1.05 || v.y > 1.05) return;
      var x = (v.x + 1) / 2 * rect.width + rect.left - hr.left, yy = (1 - v.y) / 2 * rect.height + rect.top - hr.top;
      var kind, label, extra = '';
      if (!st) { kind = 'cut'; label = 'Ağaçları kes'; if (jobs >= slotsLimit()) extra = ' ek-dim'; }
      else if (st.st === 'cut' || st.st === 'plow') { kind = st.st; var fr = Math.min(1, (now - st.t0) / (st.t1 - st.t0)); label = (st.st === 'cut' ? 'Kesiliyor' : 'Sürülüyor') + ' · ' + fmtT((st.t1 - now) / 1000); extra = '" style="--p:' + Math.round(fr * 100); }
      else if (st.st === 'stump') { kind = 'stump'; label = 'Tarla aç'; if (jobs >= slotsLimit()) extra = ' ek-dim'; }
      else { kind = 'field'; label = 'Tarla · saatte +' + nf(tarlaRate()) + ' Et'; }
      seen[p.id] = 1;
      html.push('<button type="button" class="ek-mk ek-' + kind + extra + '" data-ek-p="' + p.id + '" style="left:' + x.toFixed(1) + 'px;top:' + yy.toFixed(1) + 'px" aria-label="' + esc(label) + '" title="' + esc(label) + '">' +
        gsvg(kind === 'stump' || kind === 'plow' ? ICON.plow : kind === 'field' ? ICON.wheat : ICON.axe, kind === 'field' ? 22 : 26) +
        ((kind === 'cut' && st) || kind === 'plow' ? '<i class="ek-ring"></i><small>' + esc(fmtT((st.t1 - now) / 1000)) + '</small>' : '') + '</button>');
    });
    var out = html.join('');
    if (l.__h !== out) { l.innerHTML = out; l.__h = out; }
  }
  function onMark(ev) {
    var b = ev.target.closest('[data-ek-p]'); if (!b) return;
    var p = F.parcels.filter(function (x) { return x.id === b.getAttribute('data-ek-p'); })[0]; if (p) openParcel(p);
  }
  function parcelHtml(p) {
    var e = ek(), st = e.ps[p.id], jobs = activeJobs(), now = Date.now(), full = jobs >= slotsLimit();
    var head = '<div class="ek-mh"><span class="ek-cap">OBANIN ÇEVRESİ · PARSEL ' + (p.n + 1) + '</span><h2>' + (!st ? 'Orman' : st.st === 'field' ? 'Tarla' : st.st === 'stump' ? 'Kütüklü açıklık' : st.st === 'cut' ? 'Kesim sürüyor' : 'Toprak sürülüyor') + '</h2><button type="button" class="ek-x" data-ek-close="1" aria-label="Kapat">✕</button></div>';
    var body = '';
    if (!st) {
      body = '<p class="ek-lead">' + p.trees.length + ' ağaç. Oduncular keser, kütükler kalır; sonra burayı tarlaya çevirebilirsin.</p>' +
        '<div class="ek-facts"><span>' + gsvg(ICON.axe, 22) + '<b>' + fmtT(cutSecs(p)) + '</b><small>kesim süresi</small></span><span>' + rsvg('odun', 24) + '<b>+' + nf(woodGain(p)) + '</b><small>odun</small></span><span>' + gsvg(ICON.wheat, 22) + '<b>+' + nf(tarlaRate()) + '/sa</b><small>tarla olunca Et</small></span></div>' +
        (full ? '<p class="ek-warn">Oduncular şu an başka bir parselde. Aynı anda ' + slotsLimit() + ' iş yapılabilir' + (slotsLimit() < 2 ? ' (Odunluk Sv 10’da 2 olur)' : '') + '.</p>' : '') +
        '<button type="button" class="ek-btn gold wide" data-ek-act="cut"' + (full ? ' disabled' : '') + '>AĞAÇLARI KES</button>';
    } else if (st.st === 'cut' || st.st === 'plow') {
      var fr = Math.min(1, (now - st.t0) / (st.t1 - st.t0));
      body = '<p class="ek-lead">' + (st.st === 'cut' ? 'Oduncular ağaçları deviriyor.' : 'Halk kütükleri söküp toprağı sürüyor.') + '</p><div class="ek-bar"><i style="width:' + (fr * 100).toFixed(1) + '%"></i><span>' + fmtT((st.t1 - now) / 1000) + '</span></div>';
    } else if (st.st === 'stump') {
      body = '<p class="ek-lead">Ağaçlar kesildi, kütükler duruyor. Söküp sürersen burası tarla olur ve sürekli Et üretir.</p>' +
        '<div class="ek-facts"><span>' + gsvg(ICON.plow, 22) + '<b>' + fmtT(plowSecs(p)) + '</b><small>sürme süresi</small></span><span>' + gsvg(ICON.wheat, 22) + '<b>+' + nf(tarlaRate()) + '/sa</b><small>Et</small></span></div>' +
        (full ? '<p class="ek-warn">Halk şu an başka bir parselde çalışıyor.</p>' : '') +
        '<button type="button" class="ek-btn gold wide" data-ek-act="plow"' + (full ? ' disabled' : '') + '>TARLA AÇ</button>';
    } else {
      body = '<p class="ek-lead">Bu tarla saatte <b>+' + nf(tarlaRate()) + ' Et</b> üretiyor. Toplam ' + fieldCount() + ' tarla: saatte +' + nf(fieldCount() * tarlaRate()) + ' Et. Kutsal Ocak büyüdükçe verim artar.</p>';
    }
    return '<div class="ek-modal ek-small" role="dialog" aria-modal="true">' + head + body + '</div>';
  }
  function openParcel(p) {
    var o = document.getElementById('ek-parcel');
    if (!o) {
      o = document.createElement('div'); o.id = 'ek-parcel'; o.className = 'ek-ov';
      document.body.appendChild(o);
      o.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t === o || t.closest('[data-ek-close]')) { o.remove(); return; }
        var a = t.closest('[data-ek-act]'); if (!a || a.disabled) return;
        var pp = F.parcels.filter(function (x) { return x.id === o.dataset.p; })[0]; if (!pp) return;
        var e = ek(), now = Date.now();
        if (activeJobs() >= slotsLimit()) return;
        if (a.getAttribute('data-ek-act') === 'cut' && !e.ps[pp.id] && unlocked(pp)) { e.ps[pp.id] = { st: 'cut', t0: now, t1: now + cutSecs(pp) * 1000 }; log('🪓 Oduncular parsel ' + (pp.n + 1) + '’e yola çıktı.'); }
        if (a.getAttribute('data-ek-act') === 'plow' && e.ps[pp.id] && e.ps[pp.id].st === 'stump') { e.ps[pp.id] = { st: 'plow', t0: now, t1: now + plowSecs(pp) * 1000 }; log('🌱 Halk kütükleri sökmeye başladı.'); }
        persist(); o.innerHTML = parcelHtml(pp); tickVisual();
      });
    }
    o.dataset.p = p.id; o.innerHTML = parcelHtml(p);
  }

  /* ---------- döngüler ---------- */
  function afterRender() {
    try { enhanceTop(); } catch (e) {}
    try { enhanceNav(); navActive(); } catch (e) {}
  }
  function hookRender() {
    if (typeof W.render !== 'function' || W.render.__ek) return;
    var orig = W.render;
    var wrapped = function () { var out = orig.apply(this, arguments); afterRender(); return out; };
    wrapped.__ek = true; W.render = wrapped;
  }
  var lastSettle = 0;
  function tickVisual() {
    var now = Date.now();
    if (!F.ready) { try { initForest(); } catch (e) { F.ready = false; } }
    if (!F.ready) return;
    if (now - lastSettle > 1000) { lastSettle = now; settleJobs(now); }
    applyVisuals(now);
    var op = document.getElementById('ek-parcel');
    if (op && op.dataset.p && now % 1000 < 40) { var p = F.parcels.filter(function (x) { return x.id === op.dataset.p; })[0]; if (p) op.innerHTML = parcelHtml(p); }
  }
  // Mobilde bir pencere (.ovp) açıkken üst bar gizlenir, pencere tam ekran olur.
  var lastWin = null;
  function winMode() {
    var open = false, list = document.querySelectorAll('.ovp');
    for (var i = 0; i < list.length; i++) { var o = list[i]; if (o.offsetWidth > 0 && o.offsetHeight > 0 && getComputedStyle(o).display !== 'none') { open = true; break; } }
    if (open !== lastWin) { lastWin = open; document.body.classList.toggle('ek-win', open); }
  }
  /* ---------- 3c) harita kamerası: WOS gibi sabit açı, sınırlı kaydırma/yakınlaşma ---------- */
  var camDone = false;
  function tuneWorld() {
    var w = W.world3d; if (!w || !w.controls || !w.camera) return;
    var c = w.controls, cam = w.camera;
    if (!camDone) {
      camDone = true;
      c.enableRotate = false;                 // döndürme ve yatırma kapalı
      c.minPolarAngle = c.maxPolarAngle = 0.95;
      c.touches = { ONE: 1, TWO: 2 };         // tek parmak kaydır, iki parmak yakınlaş + kaydır
      c.mouseButtons = { LEFT: 2, MIDDLE: 1, RIGHT: 2 };  // fare: sürükle = kaydır, tekerlek = yakınlaş
      c.minZoom = 0.3; c.maxZoom = 3;
      c.dampingFactor = 0.14;
      try { if (W.innerWidth <= 760 && w.renderer) w.renderer.setPixelRatio(Math.min(W.devicePixelRatio || 1, 1.25)); } catch (e) {}
    }
    var j = document.querySelector('#tm .map-journal');
    if (j && !j.querySelector('#ek-jclose')) {
      var x = document.createElement('button'); x.id = 'ek-jclose'; x.type = 'button'; x.textContent = '✕'; x.setAttribute('aria-label', 'Hedef bilgisini kapat');
      x.addEventListener('click', function () { var tm = document.getElementById('tm'); if (tm) tm.classList.remove('world-detail-open'); var b = document.querySelector('[data-world-action="details"]'); if (b) b.textContent = 'Hedef bilgisi'; });
      j.appendChild(x);
    }
    // kaydırmayı obanın çevresiyle sınırla
    var home = w.selfPosition; if (!home) return;
    var R = 260, t = c.target, dx = t.x - home.x, dz = t.z - home.z, d = Math.hypot(dx, dz);
    if (d > R) { var k = R / d, nx = home.x + dx * k, nz = home.z + dz * k, ox = nx - t.x, oz = nz - t.z; t.x = nx; t.z = nz; cam.position.x += ox; cam.position.z += oz; }
    if (cam.zoom < c.minZoom || cam.zoom > c.maxZoom) { cam.zoom = Math.min(c.maxZoom, Math.max(c.minZoom, cam.zoom)); cam.updateProjectionMatrix(); }
  }
  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    try { winMode(); } catch (e) {}
    try { if (W.tab === 'm') tuneWorld(); } catch (e) {}
    try { tickVisual(); placeMarks(Date.now()); } catch (e) {}
  }
  function start() {
    if (!S() || typeof W.render !== 'function') { setTimeout(start, 400); return; }
    ek(); hookRender(); hookFight(); hookTick(); offlineCatchUp();
    document.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-ek]'); if (!b) return;
      var k = b.getAttribute('data-ek');
      if (k === 'bag') openBag();
      if (k === 'gear') goTab('g');
      if (k === 'help') { ev.preventDefault(); ev.stopPropagation(); var x = document.querySelector('#tabs [data-ex]'); if (x) x.click(); }
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') return;
      ['ek-bag', 'ek-parcel', 'ek-findov'].forEach(function (id) { var o = document.getElementById(id); if (o) o.remove(); });
    });
    afterRender();
    requestAnimationFrame(frame);
    W.ergenekonEk = { openBag: openBag, rollPack: rollPack, _dbg: function () { tickVisual(); placeMarks(Date.now()); return F.parcels.slice(0,3).map(function (p) { var v = new F.V3(p.x, 8, p.z).project(F.c3.camera); return [p.id, p.n, Math.round(p.x), Math.round(p.z), v.x.toFixed(2), v.y.toFixed(2), v.z.toFixed(3)]; }); }, state: function () { return { forest: F.ready, parcels: F.parcels ? F.parcels.length : 0, ek: ek() }; } };
  }
  start();
})();
