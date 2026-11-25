/* Ergenekon — Ek Paket 3, 2. adım: sade ayarlar ve otomasyon. Claude, 18 Kasım 2026.
   140 tek sayfa simgeli ayarlar (Ses · Grafik · Bildirim · Hesap · Dil · Otomasyon) — eski bölümler altta kalır
   99 otomatik eritme (giyili ve set parçaları asla) · 100 5★ kahramanın fazla kartları → Ustalık Tozu / Kut puanı
   134 otomatik yardım isteği · 115 akıllı eğitim miktarı · 114 yaralı önceliği (yüksek kademe önce) · 106 çantadan tamamla
   Kalıcı: s.ek.ae (eritme eşiği), s.ek.ah (oto yardım, varsayılan açık), s.ek.kutx (karttan Kut puanı) */
(function () {
  'use strict';
  var W = window;
  if (W.__ekAyar) return; W.__ekAyar = true;
  function S() { return W.s; }
  function ek() { var s = S(); s.ek = s.ek || {}; return s.ek; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function rer() { try { W.render(); } catch (e) {} }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }

  /* ================= 140) tek sayfa ayarlar ================= */
  function settings() {
    var tg = document.getElementById('tg'); if (!tg || W.tab !== 'g') return;
    var box = tg.querySelector('#ek-set');
    if (!box) {
      box = document.createElement('div'); box.id = 'ek-set';
      box.innerHTML = ['snd:🔊:Ses', 'gfx:🎨:Grafik', 'ntf:🔔:Bildirim', 'acc:👤:Hesap', 'lng:🌐:Dil', 'aut:⚙️:Otomasyon'].map(function (x) { var p = x.split(':'); return '<section class="st-sec" data-sec="' + p[0] + '"><h4><i>' + p[1] + '</i>' + p[2] + '</h4><div class="st-body"></div></section>'; }).join('');
      tg.insertBefore(box, tg.firstChild);
      box.addEventListener('click', function (ev) {
        var b = ev.target.closest('[data-st]'); if (!b) return; var e = ek(), k = b.dataset.st;
        if (k === 'ah') e.ah = e.ah === 0 ? 1 : 0; else if (k.indexOf('ae') === 0) e.ae = +k.slice(2);
        save(); paintAuto();
      });
    }
    var sec = function (n) { return box.querySelector('[data-sec="' + n + '"] .st-body'); };
    // ses
    var sb = sec('snd'), s = S(), v = s.vs == null ? 100 : s.vs, key = (s.snd ? 1 : 0) + ':' + (s.mus === false ? 0 : 1) + ':' + v;
    if (sb.__ekh !== key) { sb.__ekh = key; sb.innerHTML = '<div class="st-row"><button type="button" data-sn="1" class="st-tg' + (s.snd ? ' on' : '') + '">🔔 Efekt</button><button type="button" data-mu="1" class="st-tg' + (s.mus === false ? '' : ' on') + '">🎵 Müzik</button><span class="st-vol"><button type="button" data-vs="-1">−</button><b>' + v + '</b><button type="button" data-vs="1">＋</button></span></div>'; }
    // modüllerin satırlarını bölümlere taşı
    [['#ek-kolay', 'gfx'], ['#ek-nt-opt', 'ntf'], ['#ek-prem', 'acc'], ['#ek-tek', 'lng']].forEach(function (m) { var el = tg.querySelector(m[0]); if (el && el.parentNode !== sec(m[1])) sec(m[1]).appendChild(el); });
    // hesap bölümüne eski "Kayıt ve bulut" bölmesine kısayol
    var ab = sec('acc'); if (!ab.querySelector('[data-st-cloud]')) { var c = document.createElement('button'); c.type = 'button'; c.className = 'st-link'; c.setAttribute('data-st-cloud', '1'); c.innerHTML = '☁️ Kayıt ve bulut ›'; c.addEventListener('click', function () { var t = Array.prototype.find.call(tg.querySelectorAll('button'), function (x) { return /Kayıt ve bulut/.test(x.textContent) && !x.hasAttribute('data-st-cloud'); }); if (t) { t.click(); t.scrollIntoView({ block: 'center' }); } }); ab.appendChild(c); }
    paintAuto();
  }
  function paintAuto() {
    var box = document.getElementById('ek-set'); if (!box) return; var ab = box.querySelector('[data-sec="aut"] .st-body'), e = ek();
    // ⚙️ otomasyon: sürekli eğitim / tekrar gönder kolay modülünden; ayrıca eritme ve yardım
    var key = (e.ae || 0) + ':' + (e.ah === 0 ? 0 : 1) + ':' + (e.ct ? 1 : 0) + ':' + (e.rg ? 1 : 0);
    if (ab.__ekh === key) return; ab.__ekh = key;
    ab.innerHTML = '<div class="st-row st-melt"><i>🔥</i><span>Oto eritme</span><span class="st-seg">' + [[0, 'Kapalı'], [1, '◯'], [2, '◯◯']].map(function (o) { return '<button type="button" data-st="ae' + o[0] + '" class="' + ((e.ae || 0) === o[0] ? 'on' : '') + '">' + o[1] + '</button>'; }).join('') + '</span></div>' +
      '<div class="st-row"><i>🤝</i><span>Oto yardım iste</span><button type="button" data-st="ah" class="kz-tg' + (e.ah === 0 ? '' : ' on') + '"><u></u></button></div>' +
      '<p class="st-note">◯ sıradan · ◯◯ sıradan + yeşil · giyili ve set parçaları erimez</p>';
    // sürekli eğitim / tekrar gönder satırlarını buraya taşı
    var k = document.getElementById('ek-kolay'); if (k) [].slice.call(k.querySelectorAll('.kz-row')).forEach(function (r) { var t = r.querySelector('[data-kt="ct"],[data-kt="rg"]'); if (t) ab.appendChild(r); });
  }

  /* ================= 99) otomatik eritme ================= */
  function autoMelt() {
    var e = ek(), th = e.ae || 0; if (!th) return; var s = S(), inv = (s.ch && s.ch.inv) || [], got = 0, n = 0;
    for (var i = inv.length - 1; i >= 0; i--) { var x = inv[i]; if (!x || x.lk || (x.r || 0) >= th || (x.r || 0) >= 2 || (x.p || 0) > 0) continue; var d = 0; try { d = W.dust(x); } catch (er) { d = 3; } got += d; n++; inv.splice(i, 1); }
    if (n) { s.ud = (s.ud || 0) + got; try { W.add('🔥 ' + n + ' eşya kendiliğinden eritildi (+' + got + ' toz).'); } catch (er) {} save(); }
  }

  /* ================= 100) fazla kahraman kartı ================= */
  function heroExtra() {
    var kh = document.getElementById('ek-kh'); if (!kh || W.tab !== 'u') return;
    var on = kh.querySelector('.kh-t.on'), det = kh.querySelector('.kh-det'); if (!on || !det) return;
    var i = +on.dataset.kh, s = S(), st = s.hs[i] || 0, n = s.hc[i] || 0, key = i + ':' + st + ':' + n;
    var ex = det.querySelector('.kh-ex'); if (ex && ex.dataset.k === key) return; if (ex) ex.remove();
    if (st < 5 || n < 1) return;
    det.insertAdjacentHTML('beforeend', '<div class="kh-ex" data-k="' + key + '"><span>🃏 ' + n + '</span><button type="button" data-kx="ud">→ ✨ ' + nf(n * 20) + ' toz</button><button type="button" data-kx="kut">→ ☾ ' + n * 4 + ' Kut</button></div>');
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-kx]'); if (!b) return; ev.stopPropagation();
    var kh = document.getElementById('ek-kh'), on = kh && kh.querySelector('.kh-t.on'); if (!on) return; var i = +on.dataset.kh, s = S(), n = s.hc[i] || 0; if ((s.hs[i] || 0) < 5 || n < 1) return;
    if (b.dataset.kxOk !== '1') { b.dataset.kxOk = '1'; b.classList.add('ask'); b.textContent += ' ?'; return; }
    s.hc[i] = 0; if (b.dataset.kx === 'ud') s.ud = (s.ud || 0) + n * 20; else ek().kutx = (ek().kutx || 0) + n * 4;
    save(); rer(); var ex = document.querySelector('.kh-ex'); if (ex) ex.remove();
  }, true);

  /* ================= 134) otomatik yardım isteği ================= */
  function autoHelp() { if (ek().ah === 0) return; var s = S(); ['q', 'q2'].forEach(function (k) { var q = s[k]; if (q && !q.req && q.left > 60) { q.req = true; q.h = q.h || 0; } }); }

  /* ================= 115) akıllı eğitim miktarı ================= */
  function hooksTrain() {
    wrap('train', '__ekAy', function (o) { return function (k) { W.__ekTk = k; try { return o.apply(this, arguments); } finally { W.__ekTk = null; W.__ekTB = null; } }; });
    wrap('tb', '__ekAy', function (o) {
      return function () {
        var base = o.apply(this, arguments), s = S(), k = W.__ekTk != null ? W.__ekTk : 0, c = null;
        try { c = W.tcost(k); } catch (e) { return base; }
        var tot = s.tr[0] + s.tr[1] + s.tr[2], room = 1e9; try { room = W.tcap() - tot; } catch (e) {}
        var aff = 1e9; for (var r in c) if (c[r] > 0) aff = Math.min(aff, Math.floor((s.r[r] || 0) / (c[r] / 10)));
        var B = Math.max(1, Math.min(room, aff, base * 10)); if (W.__ekTk != null) W.__ekTB = B / base; return B;
      };
    });
    wrap('ttime', '__ekAy', function (o) { return function () { var t = o.apply(this, arguments); return W.__ekTB ? Math.ceil(t * W.__ekTB) : t; }; });
  }

  /* ================= 114) yaralı önceliği ================= */
  function hooksHeal() {
    wrap('hQuick', '__ekAy', function () {
      return function () {
        var s = S(); W.HV = s.wd.slice(); var tier = function (i) { try { return W.troopTier(i); } catch (e) { return 1; } };
        var order = [0, 1, 2].sort(function (a, b) { return tier(a) - tier(b); }); // en düşük kademe önce bırakılır
        var g = 99999; while (g-- > 0 && W.hsum() > 0) { var c = W.hcost(); if (s.r.et >= c.et && s.r.odun >= c.odun && s.r.demir >= c.demir) break; for (var j = 0; j < 3; j++) { var i = order[j]; if (W.HV[i] > 0) { W.HV[i] = Math.max(0, W.HV[i] - Math.max(1, Math.ceil(W.HV[i] * .05))); break; } } }
      };
    });
  }

  /* ================= 106) çantadan tamamla ================= */
  var SIZE = { g: 1000, b: 5000, p: 10000 }, CSZ = { g: 100, b: 500, p: 1000 };
  function fromBag(cost) {
    var s = S(), e = ek(), pk = e.pk || {}, opened = 0, cap = 1e15; try { cap = W.cap(); } catch (x) {}
    for (var r in cost) {
      var need = cost[r] - (s.r[r] || 0); if (need <= 0 || !pk[r]) continue;
      var sz = r === 'celik' ? CSZ : SIZE;
      ['p', 'b', 'g'].forEach(function (t) { while (need > 0 && (pk[r][t] || 0) > 0 && (need >= sz[t] || !['b', 'g'].some(function (u) { return (pk[r][u] || 0) > 0 && sz[u] < sz[t]; }))) { pk[r][t]--; s.r[r] = Math.min(cap, (s.r[r] || 0) + sz[t]); need -= sz[t]; opened++; } });
      ['g', 'b', 'p'].forEach(function (t) { while (need > 0 && (pk[r][t] || 0) > 0) { pk[r][t]--; s.r[r] = Math.min(cap, (s.r[r] || 0) + sz[t]); need -= sz[t]; opened++; } });
    }
    return opened;
  }
  function bagHas(cost) { var s = S(), pk = ek().pk || {}; for (var r in cost) { var need = cost[r] - (s.r[r] || 0); if (need > 0 && pk[r] && ((pk[r].g || 0) + (pk[r].b || 0) + (pk[r].p || 0)) > 0) return true; } return false; }
  function bagButton() {
    var yk = document.getElementById('ek-yapi'), k = yk && yk.dataset.k; if (!k) return;
    var cost = {}; try { cost = W.cost(k) || {}; } catch (e) {} var s = S(), short = Object.keys(cost).filter(function (r) { return (s.r[r] || 0) < cost[r]; });
    var cb = yk.querySelector('.yk-cost'), btn = yk.querySelector('[data-ek-bag]');
    if (!cb || !short.length || yk.querySelector('.yk-prog')) { if (btn) btn.remove(); return; }
    var has = bagHas(cost), key = short.join() + has;
    if (btn && btn.dataset.k === key) return; if (btn) btn.remove();
    cb.insertAdjacentHTML('beforeend', '<button type="button" class="yk-bag" data-ek-bag="' + (has ? 1 : 0) + '" data-k="' + key + '">' + (has ? '🎒 Tamamla' : '🐾 Nereden') + '</button>');
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-ek-bag]'); if (!b) return; ev.stopPropagation();
    var yk = document.getElementById('ek-yapi'), k = yk && yk.dataset.k, cost = {}; try { cost = W.cost(k) || {}; } catch (e) {}
    if (b.dataset.ekBag === '1') { var n = fromBag(cost); try { W.add('🎒 ' + n + ' paket açıldı.'); } catch (e) {} save(); rer(); try { W.city3d.openBuilding(k); } catch (e) {} }
    var s = S(), miss = Object.keys(cost).filter(function (r) { return (s.r[r] || 0) < cost[r]; })[0];
    if (miss) { var chip = document.querySelector('#res [data-ek-res="' + miss + '"]') || document.querySelector('#res > *:nth-child(' + (['odun', 'et', 'demir'].indexOf(miss) + 1) + ')'); if (chip) setTimeout(function () { chip.click(); }, 60); }
  }, true);


  (window.__ykInj = window.__ykInj || []).push(bagButton);
  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 400) { l1 = now; try { settings(); heroExtra(); bagButton(); } catch (e) {} }
    if (now - l2 > 3000) { l2 = now; try { autoMelt(); autoHelp(); hooksTrain(); hooksHeal(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.train !== 'function') { setTimeout(start, 400); return; } hooksTrain(); hooksHeal(); requestAnimationFrame(frame); }
  start();
})();
