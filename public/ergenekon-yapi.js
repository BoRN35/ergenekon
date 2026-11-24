/* Ergenekon — Yapı kartı: binaya dokununca ortada sade bir kart (WOS tarzı).
   Başlık, görsel + seviye rozeti, Yapı Özeti, Bonus (şimdiki → sonraki), maliyet, Yükselt ve yapıya özel işlemler.
   Kalabalık yan panel yalnızca "Diğer Detaylar" ile açılır. Claude, 18 Kasım 2026. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekYapi) return; W.__ekYapi = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function ft(x) { try { return W.ft(x); } catch (e) { return Math.ceil(x) + ' sn'; } }
  function pct(x) { return '%' + (Math.round(x * 10) / 10).toString().replace('.', ','); }
  function G(name) { try { return W[name]; } catch (e) { return undefined; } }

  function prod(k, L) {
    var f = 1; try { f = W.factor() * W.pm() * W.ECO(); } catch (e) {}
    var g = Math.pow(1.095, L);
    if (k === 'odunluk') return 0.3 * (0.5 + L * g) * f * 3600;
    if (k === 'avci') return 0.3 * (0.3 + 0.8 * L * g) * f * 3600;
    if (k === 'demirci' || k === 'komurluk') return 0.12 * L * g * f * 3600;
    return 0;
  }
  // [etiket, şimdiki, sonraki] — sonraki boşsa yalnız şimdiki gösterilir
  function bonus(k, L) {
    var n = L + 1, r = [];
    function row(lab, a, b) { r.push([lab, a, b]); }
    switch (k) {
      case 'odunluk': row('Odun üretimi / sa', nf(prod(k, L)), '+' + nf(prod(k, n) - prod(k, L))); break;
      case 'avci': row('Et üretimi / sa', nf(prod(k, L)), '+' + nf(prod(k, n) - prod(k, L))); break;
      case 'demirci': row('Demir üretimi / sa', nf(prod(k, L)), '+' + nf(prod(k, n) - prod(k, L))); break;
      case 'komurluk': row('Kömür üretimi / sa', nf(prod(k, L)), '+' + nf(prod(k, n) - prod(k, L))); break;
      case 'yurt': row('Halk', nf(5 * L), '+5'); break;
      case 'kisla': row('Asker kapasitesi', pct(10 * L), '+%10'); row('Eğitim hızı', pct(3 * L), '+%3'); break;
      case 'sur': row('Akın savunması', pct(5 * L), '+%5'); break;
      case 'ambar': row('Akında korunan kaynak', pct(2 * L), '+%2'); break;
      case 'sifa': row('Alp can yenilenmesi', pct(10 * L), '+%10'); row('Mutluluk', '+' + L, '+1'); break;
      case 'gozcu': row('Keşif ödülü', pct(3 * L), '+%3'); break;
      case 'ocak': row('Yapı seviye sınırı', 'Sv ' + L, '+1'); try { row('Depo kapasitesi', nf(W.cap()), ''); } catch (e) {} break;
      case 'oba': try { row('Usta sayısı', W.builders() + '', L + 1 === 5 ? '+1' : ''); } catch (e) {} row('Oba görünümü', 'Sv ' + Math.floor(L / 5) * 5, ''); break;
    }
    row('Güç', nf(L * 100), '+100');
    return r;
  }
  function actions(k, L) {
    var a = [];
    if (L < 1) return a;
    if (k === 'kisla') a.push(['detail', '🪖 Asker Eğit']);
    if (k === 'sifa') a.push(['detail', '🩹 Yaralılar']);
    if (k === 'bilgelik' || k === 'harpakademi') a.push(['tab:r', '📚 Araştır']);
    if (k === 'gozcu') a.push(['tab:m', '🧭 Haritaya bak']);
    if (k === 'odunluk' || k === 'avci' || k === 'demirci') a.push(['tab:m', '🐎 Kafile gönder']);
    return a;
  }
  function sec(t) { return '<div class="ya-sec"><span>' + t + '</span></div>'; }
  function cardHtml(k) {
    var s = S(), B = G('B') || {}, def = B[k]; if (!def) return '';
    var L = (s.l && s.l[k]) || 0, max = 40, q = null, c = {}, ok = false, rq = [], req = [];
    try { q = W.buildQueue(k); c = W.cost(k); ok = W.can(k); rq = W.bmReq(k) || []; req = W.buildingRequirements(k) || []; } catch (e) {}
    var img = '', ba = W.ekBinaArt && W.ekBinaArt(k); if (ba) img = '<img src="' + ba + '" alt="" class="ya-art">'; else try { img = W.im(W.bkey(k), 190, '<div class="yk-ph">' + def.i + '</div>'); } catch (e) {}
    var bon = bonus(k, L);
    var rows = bon.map(function (r) { return '<div class="yk-row"><span>' + r[0] + '</span><b>' + r[1] + (r[2] && L < max ? '<em>' + r[2] + '</em>' : '') + '</b></div>'; }).join('');
    W.__ykInfo = '<p class="yk-desc">' + def.d + '</p><div class="yk-tab">' + rows + '</div>';
    var lvl = '<div class="ya-lv"><b>' + L + '</b><span class="ya-lvb"><i style="width:' + Math.round(L / max * 100) + '%"></i></span><span class="ya-arr">»»»</span><b>' + (L < max ? L + 1 : max) + '</b></div>';
    var body = '', bar = '';
    if (q) {
      var pc = Math.max(0, Math.min(100, 100 - q.left / q.tot * 100));
      body += '<div class="yk-prog ya-run"><span class="ya-ring" style="--p:' + pc.toFixed(1) + '"><i>' + def.i + '</i></span><span class="ya-rt"><small>Yükseltiliyor: Sv ' + (L + 1) + '</small><b>' + ft(q.left) + '</b><i class="ya-pb"><u style="width:' + pc.toFixed(1) + '%"></u></i></span><span class="ya-pc">%' + Math.floor(pc) + '</span></div>';
      var HG = W.ekHourglass;
      if (HG && HG.types) {
        var have = HG.get(), id = 'b:' + k, cmb = HG.combo ? HG.combo(q.left) : null;
        body += sec('Hızlandırmalar') + '<div class="ya-list">';
        body += '<div class="ya-ln"><i>✦</i><span>En iyi karışımla bitir</span><button type="button" class="ya-gold" data-ya-auto="' + id + '"' + (cmb ? '' : ' disabled') + '>Hepsini kullan</button></div>';
        HG.types.forEach(function (t) { body += '<div class="ya-ln' + (have[t[0]] ? '' : ' z') + '"><i>⏳</i><span>Kum saati ' + t[2] + ' <small>×' + (have[t[0]] || 0) + '</small></span><button type="button" class="ya-gold" data-ya-ks="' + id + '|' + t[0] + '"' + (have[t[0]] ? '' : ' disabled') + '>Kullan</button></div>'; });
        body += '</div>';
      }
      bar = '<div class="yk-acts">' + (q.req ? '' : '<button type="button" class="yk-btn" data-h="' + k + '">🤝 İttifaktan yardım</button>') + '<button type="button" class="yk-btn ya-pray" data-p="' + k + '"' + (s.pray > 0 ? ' disabled' : '') + '>🙏 Umay Duası' + (s.pray > 0 ? ' · ' + ft(s.pray) : '') + '</button></div>';
    } else if (L < max) {
      if (bon.length) body += sec('Sonraki seviye') + '<div class="yk-tab yk-tab-in">' + rows + '</div>';
      if (req.length || rq.length) {
        body += sec('Gereksinimler') + '<div class="ya-list">';
        if (req.length) req.forEach(function (r) { var d = B[r.key] || {}, have = (s.l[r.key] || 0) >= r.level; body += '<div class="ya-ln"><i>' + (d.i || '🏠') + '</i><span>' + (d.n || r.key) + ' Sv ' + r.level + '</span>' + (have ? '<b class="ya-ok">✔</b>' : '<button type="button" class="ya-git" data-bm="' + r.key + '">Git</button>') + '</div>'; });
        else body += '<div class="yk-req">' + rq.join('') + '</div>';
        body += '</div>';
      }
      var cs = ''; try { cs = W.crs(c); } catch (e) {}
      body += sec('Maliyet') + '<div class="yk-cost">' + cs + '</div>';
      body += sec('Ödüller') + '<div class="ya-list"><div class="ya-ln"><i>⚔</i><span>Güç</span><b class="ya-plus">+100</b></div></div>';
      var t = ft(W.dur ? W.dur(k) : 0);
      bar = (!ok && W.ekQueue && W.ekQueue.list().indexOf(k) >= 0 ? '<button type="button" class="yk-main" disabled>📋 Sırada</button>' :
         !ok && W.ekQueue && W.ekQueue.canQueue(k) ? '<button type="button" class="yk-main" data-ek-enqueue="' + k + '">📋 Sıraya ekle</button>' :
        '<button type="button" class="yk-main ya-up" data-k="' + k + '"' + (ok ? '' : ' disabled') + '><span>' + (L ? '⬆ Yükselt' : '🔨 İnşa et') + '</span><small>⏱ ' + t + '</small></button>');
    } else body = '<p class="yk-max">En yüksek seviye</p>';
    var acts = actions(k, L).map(function (a) { return '<button type="button" class="yk-ico" data-yk="' + a[0] + '" title="' + a[1].replace(/^\S+\s/, '') + '">' + a[1].split(' ')[0] + '</button>'; }).join('');
    return '<div class="yk-card ya-card" role="dialog" aria-modal="true" aria-label="' + def.n + '">' +
      '<div class="yk-head"><button type="button" class="yk-info" data-yk="info" aria-label="Açıklama">!</button><h2>' + def.n + '</h2><button type="button" class="yk-x" data-yk="close" aria-label="Kapat">✕</button></div>' +
      '<div class="ya-sv">Sv ' + L + ' / ' + max + '</div>' +
      '<div class="yk-hero">' + img + '</div>' + lvl +
      '<div class="ya-body">' + body + '<div class="yk-foot">' + acts + '<button type="button" class="yk-ico" data-yk="detail" title="Diğer detaylar">⋯</button></div></div>' +
      (bar ? '<div class="ya-bar">' + bar + '</div>' : '') + '</div>';
  }
  var INJ = '.ek-prod,.dg-burn,.rm-row,[data-ek-fin],.era-chip,[data-ek-ks],[data-ek-bag]';
  function sig(e) { var c = (e.className && typeof e.className === 'string') ? e.className.trim().split(/\s+/)[0] : ''; return e.tagName.toLowerCase() + (c ? '.' + c : ''); }
  var cur = null, detail = false;
  function close() {
    var o = document.getElementById('ek-yapi'); if (o) o.remove();
    cur = null;
    try { W.BMK = ''; } catch (e) {}
    try { W.render(); } catch (e) {}
  }
  function show(k) {
    var o = document.getElementById('ek-yapi');
    if (!o) {
      o = document.createElement('div'); o.id = 'ek-yapi'; o.className = 'ek-ov yk-ov'; document.body.appendChild(o);
      o.addEventListener('click', function (ev) {
        var t = ev.target, b = t.closest && t.closest('[data-yk]');
        if (t === o) { close(); return; }
        var hk = t.closest && t.closest('[data-ya-ks],[data-ya-auto]');
        if (hk && !hk.disabled && W.ekHourglass) { ev.stopPropagation(); if (hk.dataset.yaAuto) W.ekHourglass.auto(hk.dataset.yaAuto); else { var pp = hk.dataset.yaKs.split('|'); W.ekHourglass.use(pp[0], pp[1]); } o.__ekh = ''; show(o.dataset.k); return; }
        if (!b) return; // data-k / data-h / data-p / data-bm oyunun kendi tıklama işleyicisine gider
        var a = b.getAttribute('data-yk');
        if (a === 'close') close();
        else if (a === 'info') { var ov = document.createElement('div'); ov.className = 'ek-ov yk-ov'; ov.innerHTML = '<div class="yk-card yk-small"><div class="yk-head"><h2>Bilgi</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + (W.__ykInfo || '') + '</div>'; ov.addEventListener('click', function (e2) { if (e2.target === ov || e2.target.closest('.yk-x')) ov.remove(); }); document.body.appendChild(ov); }
        else if (a === 'detail') { detail = true; document.body.classList.add('ek-detail'); o.remove(); cur = null; }
        else if (a === 'hearth') { o.remove(); cur = null; try { W.city3d.hearthGallery.open(); } catch (e) {} }
        else if (a.indexOf('tab:') === 0) { o.remove(); cur = null; try { W.BMK = ''; } catch (e) {} var tb = document.querySelector('#tabs [data-t="' + a.slice(4) + '"]'); if (tb) tb.click(); else if (a === 'tab:m') { var w = document.getElementById('ek-world'); if (w) w.click(); } }
      });
    }
    var h = cardHtml(k);
    if (o.__ekh !== h) {
      var old = o.dataset.k === k ? o.firstElementChild : null, st = old ? old.scrollTop : 0, keep = [];
      // başka modüllerin karta eklediği satırları (üretim, kömür, yol haritası, hızlandırma…) koru: yeniden çizimde kaybolup yanıp sönmesin
      if (old) old.querySelectorAll(INJ).forEach(function (n) { var p = n.parentElement, nx = n.nextElementSibling; keep.push([n, p === old ? null : sig(p), nx && !nx.matches(INJ) ? sig(nx) : null]); });
      o.__ekh = h; o.innerHTML = h;
      var c = o.firstElementChild;
      if (old && c) {
        c.style.animation = 'none';
        keep.forEach(function (x) {
          var par = x[1] ? c.querySelector(x[1]) : c; if (!par) return;
          var ref = x[2] ? par.querySelector(':scope > ' + x[2]) : null; if (x[2] && !ref) return;
          par.insertBefore(x[0], ref);
        });
        c.scrollTop = st;
      }
    }
    cur = k; o.dataset.k = k;
  }
  function sync() {
    var k = ''; try { k = W.BMK || ''; } catch (e) {}
    var B = G('B') || {};
    if (W.tab !== 'c' || !k || !B[k]) {
      var o = document.getElementById('ek-yapi'); if (o) o.remove(); cur = null;
      if (!k && detail) { detail = false; document.body.classList.remove('ek-detail'); }
      return;
    }
    if (detail) return; // kullanıcı ayrıntı paneline geçti
    show(k);
  }
  function hook() {
    if (typeof W.render !== 'function' || W.render.__yk) return false;
    var orig = W.render;
    var f = function () { var out = orig.apply(this, arguments); try { sync(); } catch (e) {} return out; };
    for (var p in orig) f[p] = orig[p];
    f.__yk = true; W.render = f; return true;
  }
  // başka bir binaya dokununca ayrıntı modundan çık
  document.addEventListener('pointerdown', function (ev) { if (detail && ev.target && ev.target.closest && ev.target.closest('#cityv canvas')) { detail = false; document.body.classList.remove('ek-detail'); } }, true);
  var lastSec = 0;
  function tick(now) {
    requestAnimationFrame(tick);
    if (now - lastSec < 1000) return; lastSec = now;
    try { hook(); if (cur) show(cur); } catch (e) {}
  }
  function start() { if (!S() || typeof W.render !== 'function') { setTimeout(start, 400); return; } hook(); requestAnimationFrame(tick); }
  start();
  W.ergenekonYapi = { show: show, close: close };
})();
