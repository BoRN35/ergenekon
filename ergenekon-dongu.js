/* Ergenekon — 87) kaynak döngüsü düzeni (kullanıcı onayı 18 Kasım 2026: Altın yok). Claude.
   🪨 Kömür: Ocak ateşine karışır (üretim +%5, saatte az tüketim); T4+ asker eğitimi kömür ister.
   🔩 Çelik: Demir madeni Sv10+ az üretir; Akıncı ve destan canavarı ödüllerinde; Sv15+ bina yükseltmesi ve Demirci +5 üstü basma ister.
   🔥 Kor (Ateş Kristali): Ocak 25+ canavar avından nadir düşer; Kor ilimleri ve Ata Yurdu ister.
   🌾 Darı: tarlalardan gelir (Et'in bir kısmı yerine); evcil hayvan yemi ve binek beslemesi. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekDongu) return; W.__ekDongu = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }
  function cap() { try { return W.cap(); } catch (e) { return Infinity; } }
  var BURN = { on: false };
  function burnRate() { return 6 * Math.pow(1.15, S().l.ocak || 1); } // saatte kömür
  function steelRate() { var L = (S().l.demirci || 0); return L >= 10 ? 4 * (L - 9) * Math.pow(1.12, L) : 0; }
  function names() { var RN = W.RN; if (!RN) return; RN.komur = RN.komur || '🪨 Kömür'; RN.celik = RN.celik || '🔩 Çelik'; RN.dari = RN.dari || '🌾 Darı'; RN.kristal = RN.kristal || '🔥 Kor'; }
  function hooks() {
    names();
    wrap('pm', '__ekDg', function (o) { return function () { return o.apply(this, arguments) + (BURN.on ? .05 : 0); }; });
    wrap('tcost', '__ekDg', function (o) { return function (i, tier) { var c = o.apply(this, arguments); try { var t = tier || W.troopTier(i); if (t >= 4) c.komur = c.et * .5 * (1 + (t - 4) * .25); } catch (e) {} return c; }; });
    wrap('cost', '__ekDg', function (o) { return function (k) { var c = o.apply(this, arguments); try { var L = S().l[k] || 0; if (L >= 15 && c && Object.keys(c).length) c.celik = Math.round(((c.demir || c.odun || 0) * .04) * Math.pow(1.05, L - 15)); } catch (e) {} return c; }; });
    wrap('fight', '__ekDg', function (o) { return function () { var s = S(), k0 = s.stat.kills, r = o.apply(this, arguments); try { if (s.stat.kills > k0 && (s.l.ocak || 1) >= 25 && Math.random() < .03) { s.r.kristal = (s.r.kristal || 0) + 1; s.last = (s.last || '') + ' · 🔥 Kor +1'; } } catch (e) {} return r; }; });
  }
  var last = Date.now();
  function tickRes() {
    var s = S(), now = Date.now(), dt = Math.min(43200, Math.max(0, (now - last) / 1000)); last = now; if (!dt) return;
    var need = burnRate() * dt / 3600; if ((s.r.komur || 0) >= need) { s.r.komur -= need; BURN.on = true; } else BURN.on = false;
    var st = steelRate() * dt / 3600; if (st > 0) s.r.celik = Math.min(cap(), (s.r.celik || 0) + st);
  }
  /* üst çubuğa Darı ve Kor */
  function chips() {
    var res = document.getElementById('res'); if (!res) return; var ref = res.querySelector('[data-ek-res="celik"]'); if (!ref) return;
    [['dari', '🌾', 'DARI'], ['kristal', '🔥', 'KOR']].forEach(function (d, j) {
      var el = res.querySelector('[data-ek-res="' + d[0] + '"]');
      if (!el) { el = document.createElement('div'); el.className = ref.className; el.setAttribute('data-ek-res', d[0]); el.innerHTML = '<span class="ek-l">' + d[2] + '</span><i class="ek-ri">' + d[1] + '</i><b class="ek-rv"></b>'; (j ? res.querySelector('[data-ek-res="dari"]') : ref).insertAdjacentElement('afterend', el); }
      var v = nf(S().r[d[0]] || 0), b = el.querySelector('.ek-rv'); if (b && b.textContent !== v) b.textContent = v;
      el.hidden = d[0] === 'kristal' ? !(S().r.kristal > 0 || (S().l.ocak || 1) >= 25) : !((S().r.dari || 0) > 0);
    });
    var k = res.querySelector('[data-ek-res="komur"]'); if (k) k.classList.toggle('ek-burn', BURN.on);
  }
  /* Ocak kartında kömür ateşi satırı */
  function ocakRow() {
    var yk = document.getElementById('ek-yapi'); if (!yk) return; var h = yk.querySelector('h2,h3'); if (!h || !/Kutsal Ocak/.test(h.textContent)) return;
    var row = yk.querySelector('.dg-burn'), txt = '<i>🪨</i><span>' + (BURN.on ? '◆ +%5 üretim' : '◇ kömür yok') + '</span><small>−' + nf(burnRate()) + '/sa</small>';
    if (!row) { row = document.createElement('div'); row.className = 'dg-burn'; var anchor = yk.querySelector('.yk-cost,.yk-prog,.yk-acts'); if (anchor) anchor.parentNode.insertBefore(row, anchor); else return; }
    row.classList.toggle('on', BURN.on); if (row.__ekh !== txt) { row.__ekh = txt; row.innerHTML = txt; }
  }
  var l1 = 0, l2 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 2000) { l1 = now; try { hooks(); tickRes(); } catch (e) {} }
    if (now - l2 > 500) { l2 = now; try { chips(); ocakRow(); } catch (e) {} }
  }
  function start() { if (!S() || typeof W.cost !== 'function' || !W.RN) { setTimeout(start, 400); return; } hooks(); last = Date.now(); requestAnimationFrame(frame); }
  start();
  W.ergenekonDongu = { burning: function () { return BURN.on; }, steelRate: steelRate, burnRate: burnRate };
})();
