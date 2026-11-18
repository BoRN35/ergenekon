/* Ergenekon — yönlendirme: tek görev oku, Bilge Meclisi danışmanı, açıklamaları ❗ arkasına alma. Claude, 18 Kasım 2026. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekRehber) return; W.__ekRehber = true;
  function S() { return W.s; }
  function B() { return W.B || {}; }
  function name(k) { return (B()[k] && B()[k].n) || k; }

  /* ---------- 6) tek görev oku ---------- */
  var ORDER = ['ocak', 'oba', 'odunluk', 'avci', 'demirci', 'yurt', 'kisla', 'komurluk', 'bilgelik', 'sur', 'ambar', 'sifa', 'gozcu', 'harpakademi'];
  function suggestion() {
    var s = S(); if (!s) return null;
    var D = W.ergenekonDurum;
    if (D) for (var pk of ['odunluk', 'avci', 'demirci', 'komurluk']) if (D.ready(pk)) return { ic: '🧺', t: 'Hasadı topla', go: { b: pk } };
    var busy = 0, slots = 1; try { busy = W.buildQueues().length; slots = W.builders(); } catch (e) {}
    if (busy < slots) {
      var best = null;
      ORDER.forEach(function (k) { var ok = false; try { ok = W.can(k); } catch (e) {} if (ok && !best) best = k; });
      if (best) return { ic: '⬆', t: name(best) + (s.l[best] ? '’i yükselt' : '’i kur'), go: { b: best }, green: 1 };
    }
    if (!s.rq && (s.l.bilgelik || 0) > 0) {
      var rk = (W.WOS_RESEARCH && W.WOS_RESEARCH.catalog || []).filter(function (z) { try { return W.canResearch(z.k); } catch (e) { return false; } })[0];
      if (rk) return { ic: '📜', t: 'Araştırma başlat', go: { tab: 'r' } };
    }
    var idle = (s.sq || []).some(function (q) { return q.st === 0; });
    if (idle) return { ic: '🐎', t: 'Kafile gönder', go: { map: 'find' } };
    if (s.en && s.en.v >= 30) return { ic: '⚔', t: 'Canavar avla', go: { map: 1 } };
    var need = null; try { var c = W.cost('ocak'); for (var r in c) if ((s.r[r] || 0) < c[r]) { need = r; break; } } catch (e) {}
    return { ic: '🪵', t: (need ? ({ odun: 'Odun', et: 'Et', demir: 'Demir' }[need] || 'Kaynak') : 'Kaynak') + ' topla', go: { map: 'find' } };
  }
  function panTo(x, z, done) {
    var c = W.city3d; if (!c || !c.controls) { if (done) done(); return; }
    var t = c.controls.target, sx = t.x, sz = t.z, p0 = c.camera.position.clone(), t0 = performance.now();
    function step(now) {
      var k = Math.min(1, (now - t0) / 520), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      var nx = sx + (x - sx) * e, nz = sz + (z - sz) * e;
      c.camera.position.set(p0.x + nx - sx, p0.y, p0.z + nz - sz); t.set(nx, t.y, nz); c.controls.update();
      if (k < 1) requestAnimationFrame(step); else if (done) done();
    }
    requestAnimationFrame(step);
  }
  function go(sg) {
    if (!sg) return;
    var g = sg.go;
    if (g.b) {
      if (W.tab !== 'c') { var tb = document.querySelector('#tabs [data-t="c"]'); if (tb) tb.click(); }
      var slot = W.city3d && W.city3d.buildingSlots && W.city3d.buildingSlots.get(g.b), x = 0, z = 0;
      if (slot) { x = slot.position.x; z = slot.position.z; } else if (g.b === 'sur') z = 41;
      panTo(x * .7, z * .7, function () { if (W.city3d && W.city3d.openBuilding) W.city3d.openBuilding(g.b); });
    } else if (g.tab) { var b = document.querySelector('#tabs [data-t="' + g.tab + '"]'); if (b) b.click(); }
    else if (g.map) {
      var to = function () { if (W.tab !== 'm') { var w = document.getElementById('ek-world'); if (w) w.click(); } setTimeout(function () { if (g.map === 'find') { var f = document.getElementById('ek-find'); if (f) f.click(); } }, 700); };
      to();
    }
  }
  var GA = { el: null, sg: null, key: '' };
  function arrow() {
    var host = document.getElementById(W.tab === 'm' ? 'mapv' : 'cityv');
    if (!host || (W.tab !== 'c' && W.tab !== 'm')) { if (GA.el) GA.el.hidden = true; return; }
    if (!GA.el || !GA.el.isConnected) {
      GA.el = document.createElement('button'); GA.el.type = 'button'; GA.el.id = 'ek-goal';
      GA.el.addEventListener('click', function () { go(GA.sg); });
    }
    if (GA.el.parentNode !== host) host.appendChild(GA.el);
    var sg = suggestion(); GA.sg = sg; GA.el.hidden = !sg; if (!sg) return;
    var key = sg.ic + sg.t + (sg.green ? 1 : 0);
    if (GA.key !== key) { GA.key = key; GA.el.className = sg.green ? 'ok' : ''; GA.el.innerHTML = '<i>' + sg.ic + '</i><b>' + sg.t + '</b><em>➜</em>'; }
  }

  /* ---------- 14) Bilge Meclisi danışmanı ---------- */
  var SAGES = [{ n: 'Börteçine', e: '⚒️' }, { n: 'Umay Ana', e: '🕊️' }, { n: 'Kam Ulu', e: '🔮' }, { n: 'Tonyukuk', e: '📜' }, { n: 'Kürşad', e: '🗡️' }];
  function tip() {
    var s = S(), out = []; if (!s) return null;
    var cap = 0; try { cap = W.cap(); } catch (e) {}
    if (cap && ['odun', 'et', 'demir'].some(function (r) { return (s.r[r] || 0) >= cap * .97; })) out.push([3, 'Ambarlar taşıyor; Ambar’ı yükselt ya da kaynak harca.']);
    if ((s.r.et || 0) < 50) out.push([1, 'Halk aç kalmasın; Avcı Çadırı’na bak, ava çık.']);
    try { if (W.buildQueues().length < W.builders()) out.push([0, 'Ustalar boşta duruyor; bir yapıyı yükselt.']); } catch (e) {}
    if (W.ergenekonDurum && ['odunluk', 'avci', 'demirci', 'komurluk'].some(function (k) { return W.ergenekonDurum.ready(k); })) out.push([1, 'Hasat hazır; parmağını balonların üstünden geçir.']);
    if (s.en && s.en.v >= 180) out.push([4, 'Enerjin dolmak üzere; haritada canavar avla.']);
    if (!s.rq && (s.l.bilgelik || 0) > 0) out.push([2, 'Bilgelik Ocağı boş; yeni bir araştırma başlat.']);
    if ((s.sq || []).some(function (q) { return q.st === 0; })) out.push([4, 'Boşta kafile var; haritada kaynak topla.']);
    if (!out.length) out.push([3, 'Demir Dağ’ı eritmek sabır ister; Ocak’ı büyütmeye devam et.']);
    return out[Math.floor(Math.random() * out.length)];
  }
  var SG = { el: null, next: Date.now() + 20000, shown: 0 };
  function sage(now) {
    if (W.tab !== 'c' || document.querySelector('.ek-ov') || document.getElementById('aw')) return;
    if (SG.el && SG.el.isConnected) { if (now - SG.shown > 9000) closeSage(); return; }
    if (now < SG.next) return;
    var t = tip(); if (!t) return;
    var f = SAGES[t[0]];
    SG.el = document.createElement('button'); SG.el.type = 'button'; SG.el.id = 'ek-sage';
    SG.el.innerHTML = '<span class="sg-av">' + f.e + '</span><span class="sg-tx"><b>' + f.n + '</b>' + t[1] + '</span>';
    SG.el.addEventListener('click', closeSage);
    document.body.appendChild(SG.el); SG.shown = now;
    requestAnimationFrame(function () { if (SG.el) SG.el.classList.add('on'); });
  }
  function closeSage() { var e = SG.el; SG.el = null; SG.next = Date.now() + 180000; if (e) { e.classList.remove('on'); setTimeout(function () { e.remove(); }, 350); } }

  /* ---------- 7) açıklamalar yalnızca ❗ ile ---------- */
  var PANES = ['tk', 'tr', 'tu', 'tp', 'ta', 'te', 'ty', 'tg', 'tc', 'tm'];
  function isDesc(p) {
    if (p.__ekD || p.closest('#ek-arena,.ek-ov,.yk-card,.ci-det,.dm-forge,button')) return false;
    if (p.querySelector('button,input,select,img,svg,b,progress,.bar')) return false;
    var t = (p.textContent || '').trim();
    if (t.length < 50) return false;
    if (/\d/.test(t) && t.length < 110) return false; // kısa ve sayılı: büyük ihtimalle bilgi satırı
    return true;
  }
  function hideDescs() {
    PANES.forEach(function (id) {
      var root = document.getElementById(id); if (!root || !root.offsetWidth) return;
      root.querySelectorAll('p, .game-page-header small, .research-header p, header > p').forEach(function (p) {
        if (p.__ekD || !isDesc(p)) return;
        p.__ekD = 1;
        var b = document.createElement('button'); b.type = 'button'; b.className = 'ek-why'; b.textContent = '!'; b.setAttribute('aria-label', 'Açıklamayı göster');
        var txt = p.innerHTML;
        b.addEventListener('click', function (ev) { ev.stopPropagation(); popup(txt); });
        p.style.display = 'none';
        p.parentNode.insertBefore(b, p);
      });
    });
  }
  function popup(html) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small"><div class="yk-head"><h2>Bilgi</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div><div class="yk-desc" style="margin:14px">' + html + '</div></div>';
    o.addEventListener('click', function (e) { if (e.target === o || e.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o);
  }

  var lastSec = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden || now - lastSec < 700) return; lastSec = now;
    try { arrow(); } catch (e) {}
    try { sage(Date.now()); } catch (e) {}
    try { hideDescs(); } catch (e) {}
  }
  function start() { if (!S() || typeof W.can !== 'function') { setTimeout(start, 400); return; } requestAnimationFrame(frame); }
  start();
  W.ergenekonRehber = { suggestion: suggestion, go: function () { go(suggestion()); }, sage: function () { SG.next = 0; } };
})();
