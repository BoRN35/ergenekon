/* Ergenekon — Ek Paket 4, 5. adım: yönetim araçları (sunucusuz kısım). Claude, 18 Kasım 2026.
   170 bakım ekranı (./bakim.json) · 173 ekonomi ayar paneli · 174 etkinlik zamanlayıcı + takvim · 177 işlem kaydı
   183 3D model kılavuzu ve .glb denetimi · 186 yazı düzenleme · 189 duyuru zamanlama
   Sunucu olmadığı için ayarlar bu cihazda (localStorage ek_ecfg, ek_ev, ek_ann, ek_txt, ek_alog) tutulur; sunucu gelince oraya taşınacak. */
(function () {
  'use strict';
  var W = window;
  if (W.__ekYon) return; W.__ekYon = true;
  function S() { return W.s; }
  function nf(x) { try { return W.nf(x); } catch (e) { return Math.floor(x); } }
  function save() { try { W.save(); } catch (e) {} }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function lj(k, d) { try { return JSON.parse(ls(k) || '') || d; } catch (e) { return d; } }
  function sj(k, v) { ls(k, JSON.stringify(v)); }
  function isAdm() { return !!ls('ek_adm'); }
  function wrap(name, mark, mk) { var o = W[name]; if (typeof o !== 'function' || o[mark]) return; var f = mk(o); for (var k in o) f[k] = o[k]; f[mark] = true; W[name] = f; }
  function popup(title, body, cls) {
    var o = document.createElement('div'); o.className = 'ek-ov yk-ov';
    o.innerHTML = '<div class="yk-card yk-small ' + (cls || '') + '"><div class="yk-head"><h2>' + title + '</h2><button type="button" class="yk-x" aria-label="Kapat">✕</button></div>' + body + '</div>';
    o.addEventListener('click', function (ev) { if (ev.target === o || ev.target.closest('.yk-x')) o.remove(); });
    document.body.appendChild(o); return o;
  }
  function dt(t) { var d = new Date(t); return d.getDate() + '.' + (d.getMonth() + 1) + ' ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); }
  function toLocalInput(t) { var d = new Date(t - new Date().getTimezoneOffset() * 60000); return d.toISOString().slice(0, 16); }

  /* ================= 177) işlem kaydı ================= */
  function alog(a) { var L = lj('ek_alog', []); L.unshift({ t: Date.now(), a: String(a).slice(0, 120) }); while (L.length > 200) L.pop(); sj('ek_alog', L); }
  W.ekAdminLog = alog;
  var ADL = { t1: '⏩ +1 sa', t8: '⏩ +8 sa', t24: '⏩ +24 sa', res: '📦 kaynak doldur', mat: '💎 malzeme ekle', hero: '🃏 kart ekle', lvl: '🔥 Ocak +1', en: '⚡ enerji doldur', ev: '🎪 etkinlikleri sıfırla' };
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('#ek-admin [data-ad],#ek-admin [data-ad-del],#ek-admin [data-rp-mute],#ek-admin [data-rp-warn],#ek-admin [data-rp-del],#ek-admin [data-adx]'); if (!b) return;
    var a = b.dataset.ad ? ADL[b.dataset.ad] || b.dataset.ad : b.dataset.adDel != null ? '🐞 hata kaydı silindi' : b.dataset.rpMute != null ? '🔇 susturma' : b.dataset.rpWarn != null ? '☾ uyarı' : b.dataset.rpDel != null ? '⚑ şikayet kapatıldı' : '🛠️ ' + (b.textContent || '').trim().slice(0, 30);
    alog(a);
  }, true);

  /* ================= 173) ekonomi ayar paneli ================= */
  var EDEF = { gather: 1, build: 1, prod: 1, drop: 1, enrg: 1, prem: 35 };
  function ecfg() { var c = lj('ek_ecfg', {}); for (var k in EDEF) if (typeof c[k] !== 'number') c[k] = EDEF[k]; return c; }
  W.ekEco = ecfg;
  var EN0 = null;
  function ecoHooks() {
    var c = ecfg(), e = evNow();
    var o = W.wosBonus; if (typeof o === 'function' && !o.__ekYon) { var f = function (l) { var v = o.apply(this, arguments); if (l === 'Gathering Speed') { var C = ecfg(), E = evNow(); v += (C.gather - 1) + (E.g || 0); if (W.__ekPrem && W.__ekPrem() && C.prem !== 35) v += (C.prem - 35) / 100; } return v; }; for (var q in o) f[q] = o[q]; f.__ekYon = true; W.wosBonus = f; }
    wrap('dur', '__ekYon', function (o) { return function () { var v = o.apply(this, arguments); var C = ecfg(); return typeof v === 'number' ? Math.max(1, Math.round(v * C.build)) : v; }; });
    wrap('pm', '__ekYon', function (o) { return function () { var C = ecfg(), E = evNow(); return o.apply(this, arguments) * C.prod + (E.p || 0); }; });
    wrap('fight', '__ekYon', function (o) { return function (m) { var s = S(), k0 = s.stat.kills, r = o.apply(this, arguments); try { var C = ecfg(), E = evNow(), mult = C.drop * (E.d || 1); if (s.stat.kills > k0 && mult > 1 && W.ergenekonDemirci) { var extra = mult - 1; while (extra > 0) { if (Math.random() < Math.min(1, extra)) W.ergenekonDemirci.rollMats((W.M[m] || [0, 0, 1])[2]); extra -= 1; } } } catch (e) {} return r; }; });
    if (EN0 == null && typeof W.EN_RG === 'number') EN0 = W.EN_RG; if (EN0 != null) { var want = Math.max(30, Math.round(EN0 / c.enrg)); if (W.EN_RG !== want) W.EN_RG = want; }
  }
  var EFIELD = [['gather', '🐎', 'Toplama hızı', '×', .5, 3, .05], ['build', '🔨', 'Yapım süresi', '×', .25, 3, .05], ['prod', '🌾', 'Üretim', '×', .5, 3, .05], ['drop', '📜', 'Malzeme düşme', '×', .5, 4, .1], ['enrg', '⚡', 'Enerji dolum hızı', '×', .5, 3, .1], ['prem', '✨', 'Premium bonusu', '%', 0, 60, 5]];
  function openEco() {
    var c = ecfg();
    var body = '<div class="ye-list">' + EFIELD.map(function (f) { return '<label class="ye-r"><i>' + f[1] + '</i><span>' + f[2] + '</span><input type="range" min="' + f[4] + '" max="' + f[5] + '" step="' + f[6] + '" value="' + c[f[0]] + '" data-ye="' + f[0] + '"><b data-yev="' + f[0] + '">' + (f[3] === '%' ? '%' + c[f[0]] : '×' + c[f[0]]) + '</b></label>'; }).join('') + '</div>' +
      '<div class="ye-acts"><button type="button" data-ye-mf="1">🏇 Müfreze oranları</button><button type="button" data-ye-reset="1">↺ Varsayılan</button></div><button type="button" class="yk-main" data-ye-save="1">✓ Kaydet</button><p class="ye-note">Bu cihazda geçerli · sunucu kurulunca tüm oyunculara</p>';
    var o = popup('Ekonomi', body, 'ye-card');
    o.addEventListener('input', function (ev) { var i = ev.target.closest('[data-ye]'); if (!i) return; var f = EFIELD.find(function (x) { return x[0] === i.dataset.ye; }); o.querySelector('[data-yev="' + f[0] + '"]').textContent = (f[3] === '%' ? '%' : '×') + i.value; });
    o.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-ye-mf]')) { o.remove(); var b = document.querySelector('#ek-admin [data-ad-rates]'); if (b) b.click(); return; }
      if (ev.target.closest('[data-ye-reset]')) { o.querySelectorAll('[data-ye]').forEach(function (i) { i.value = EDEF[i.dataset.ye]; i.dispatchEvent(new Event('input', { bubbles: true })); }); return; }
      if (!ev.target.closest('[data-ye-save]')) return;
      var n = {}, ch = []; o.querySelectorAll('[data-ye]').forEach(function (i) { n[i.dataset.ye] = +i.value; if (+i.value !== c[i.dataset.ye]) ch.push(i.dataset.ye + ' ' + c[i.dataset.ye] + '→' + i.value); });
      sj('ek_ecfg', n); if (ch.length) alog('⚖️ Ekonomi: ' + ch.join(', ')); ecoHooks(); o.remove();
    });
  }

  /* ================= 174) etkinlik zamanlayıcı · 189) duyuru zamanlama ================= */
  var EVT = { g: ['🐎', 'Toplama bayramı', '+%50 toplama', { g: .5 }], d: ['📜', 'Çift ganimet', '×2 malzeme', { d: 2 }], p: ['🌾', 'Bereket günü', '+%20 üretim', { p: .2 }] };
  function evs() { return lj('ek_ev', []); }
  function evNow() { var now = Date.now(), out = {}; evs().forEach(function (e) { if (now >= e.s && now < e.s + e.h * 3600e3) { var f = (EVT[e.k] || [])[3] || {}; for (var k in f) out[k] = Math.max(out[k] || 0, f[k]); } }); return out; }
  W.ekEvNow = evNow;
  function anns() { return lj('ek_ann', []); }
  function annTick() {
    var L = anns(), now = Date.now(), ch = false;
    L.forEach(function (a) { if (!a.done && a.t <= now) { a.done = 1; ch = true; var s = S(); s.chat = s.chat || []; s.chat.push({ u: '☾', lg: 'TR', txt: esc(a.m), tr: '', sys: 1 }); if (s.chat.length > 40) s.chat.shift(); try { W.add('📢 ' + a.m); } catch (e) {} if (W.ekNotify) W.ekNotify('📢 Ergenekon', a.m); toast('📢 ' + a.m); save(); } });
    if (ch) sj('ek_ann', L);
    var e = evs(), live = e.filter(function (x) { return now >= x.s && now < x.s + x.h * 3600e3; });
    live.forEach(function (x) { if (!x.seen) { x.seen = 1; toast(EVT[x.k][0] + ' ' + EVT[x.k][1] + ' başladı · ' + x.h + ' sa'); sj('ek_ev', e); } });
    evChip(live);
  }
  var CHIP = null;
  function evChip(live) {
    if (!CHIP) { CHIP = document.createElement('div'); CHIP.id = 'ek-evchip'; document.body.appendChild(CHIP); }
    var now = Date.now(), h = live.map(function (x) { return '<span>' + EVT[x.k][0] + ' ' + (W.ft ? W.ft((x.s + x.h * 3600e3 - now) / 1000) : '') + '</span>'; }).join('');
    if (CHIP.__ekh !== h) { CHIP.__ekh = h; CHIP.innerHTML = h; } CHIP.hidden = !h || !!document.querySelector('.ek-ov') || W.tab !== 'c' && W.tab !== 'm';
  }
  var CAL = { m: null };
  function openCal() {
    var now = new Date(); if (!CAL.m) CAL.m = new Date(now.getFullYear(), now.getMonth(), 1);
    var m = CAL.m, first = (m.getDay() + 6) % 7, days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate(), E = evs(), A = anns(), C = lj('ek_cal', {});
    var mark = function (y, mo, d) { var a = new Date(y, mo, d).getTime(), b = a + 864e5, r = ''; E.forEach(function (e) { if (e.s < b && e.s + e.h * 3600e3 > a) r += EVT[e.k][0]; }); A.forEach(function (x) { if (x.t >= a && x.t < b) r += '📢'; }); for (var k in C) { var t = Date.parse(C[k]); if (t >= a && t < b) r += '⭐'; } return r; };
    var grid = ''; for (var i = 0; i < first; i++) grid += '<span></span>'; for (var d = 1; d <= days; d++) { var mk = mark(m.getFullYear(), m.getMonth(), d), today = d === now.getDate() && m.getMonth() === now.getMonth() && m.getFullYear() === now.getFullYear(); grid += '<span class="' + (today ? 'td' : '') + (mk ? ' has' : '') + '"><b>' + d + '</b><i>' + mk.slice(0, 6) + '</i></span>'; }
    var list = E.concat(A.map(function (a) { return { ann: 1, t: a.t, m: a.m, done: a.done }; })).sort(function (a, b) { return (a.s || a.t) - (b.s || b.t); });
    var body = '<div class="yc-mh"><button type="button" data-yc-m="-1">‹</button><b>' + ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][m.getMonth()] + ' ' + m.getFullYear() + '</b><button type="button" data-yc-m="1">›</button></div>' +
      '<div class="yc-grid">' + ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(function (x) { return '<em>' + x + '</em>'; }).join('') + grid + '</div>' +
      '<div class="yc-list">' + (list.map(function (x, i) { return x.ann ? '<div class="yc-r' + (x.done ? ' done' : '') + '"><i>📢</i><span><b>' + esc(x.m) + '</b><small>' + dt(x.t) + '</small></span><button type="button" data-yc-da="' + x.t + '">✕</button></div>' : '<div class="yc-r' + (Date.now() > x.s + x.h * 3600e3 ? ' done' : '') + '"><i>' + EVT[x.k][0] + '</i><span><b>' + EVT[x.k][1] + ' · ' + x.h + ' sa</b><small>' + dt(x.s) + ' · ' + EVT[x.k][2] + '</small></span><button type="button" data-yc-de="' + x.s + '">✕</button></div>'; }).join('') || '<p class="ye-note">—</p>') + '</div>' +
      '<div class="yc-add"><select data-yc-k>' + Object.keys(EVT).map(function (k) { return '<option value="' + k + '">' + EVT[k][0] + ' ' + EVT[k][1] + '</option>'; }).join('') + '<option value="ann">📢 Duyuru</option></select><input type="datetime-local" data-yc-t value="' + toLocalInput(Date.now() + 3600e3) + '"><input type="number" min="1" max="72" value="2" data-yc-h title="saat"><input type="text" maxlength="140" placeholder="Duyuru metni" data-yc-msg><button type="button" class="yk-main" data-yc-add="1">＋ Planla</button></div>';
    var o0 = document.getElementById('ek-cal'); if (o0) o0.remove();
    var o = popup('Takvim', body, 'yc-card'); o.id = 'ek-cal';
    var sync = function () { var k = o.querySelector('[data-yc-k]').value; o.querySelector('[data-yc-h]').hidden = k === 'ann'; o.querySelector('[data-yc-msg]').hidden = k !== 'ann'; }; sync();
    o.addEventListener('change', function (ev) { if (ev.target.matches('[data-yc-k]')) sync(); });
    o.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-yc-m],[data-yc-add],[data-yc-de],[data-yc-da]'); if (!b) return;
      if (b.dataset.ycM) { CAL.m = new Date(m.getFullYear(), m.getMonth() + +b.dataset.ycM, 1); openCal(); return; }
      if (b.dataset.ycDe) { sj('ek_ev', evs().filter(function (e) { return String(e.s) !== b.dataset.ycDe; })); alog('🎪 etkinlik silindi'); openCal(); return; }
      if (b.dataset.ycDa) { sj('ek_ann', anns().filter(function (a) { return String(a.t) !== b.dataset.ycDa; })); alog('📢 duyuru silindi'); openCal(); return; }
      var k = o.querySelector('[data-yc-k]').value, t = Date.parse(o.querySelector('[data-yc-t]').value); if (!isFinite(t)) return;
      if (k === 'ann') { var msg = (o.querySelector('[data-yc-msg]').value || '').trim().slice(0, 140); if (!msg) return; var A2 = anns(); A2.push({ t: t, m: W.ekClean ? W.ekClean(msg) : msg }); sj('ek_ann', A2); alog('📢 duyuru planlandı ' + dt(t)); }
      else { var h = Math.max(1, Math.min(72, +o.querySelector('[data-yc-h]').value || 2)), E2 = evs(); E2.push({ k: k, s: t, h: h }); sj('ek_ev', E2); alog(EVT[k][0] + ' ' + EVT[k][1] + ' planlandı ' + dt(t) + ' · ' + h + ' sa'); }
      openCal();
    });
  }

  /* ================= 186) yazı düzenleme ================= */
  var TX = { map: null, obs: null };
  function txMap() { if (!TX.map) TX.map = lj('ek_txt', {}); return TX.map; }
  function txNode(n) {
    var M = txMap(); if (n.nodeType === 3) { var raw = n.nodeValue, k = raw.trim(); if (k && M[k] != null && M[k] !== k) n.nodeValue = raw.replace(k, M[k]); }
  }
  function txTree(root) { if (!Object.keys(txMap()).length || !root) return; if (root.nodeType === 3) return txNode(root); var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n; while ((n = w.nextNode())) { var p = n.parentNode; if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)) continue; txNode(n); } }
  function txStart() { if (TX.obs || !Object.keys(txMap()).length) return; txTree(document.body); TX.obs = new MutationObserver(function (ms) { ms.forEach(function (m) { if (m.type === 'characterData') txNode(m.target); else m.addedNodes.forEach(txTree); }); }); TX.obs.observe(document.body, { childList: true, subtree: true, characterData: true }); }
  function openTxt() {
    var M = txMap(), keys = Object.keys(M);
    var body = '<p class="ye-note">Ekranda görünen yazının tamamını sol kutuya yaz, sağa yenisini. Diller: Ayarlar → Dil.</p><div class="yt-list">' + keys.map(function (k, i) { return '<div class="yt-r"><input value="' + esc(k) + '" data-yt-k="' + i + '"><input value="' + esc(M[k]) + '" data-yt-v="' + i + '"><button type="button" data-yt-del="' + i + '">✕</button></div>'; }).join('') +
      '<div class="yt-r"><input placeholder="Eski yazı" data-yt-k="n"><input placeholder="Yeni yazı" data-yt-v="n"><span></span></div></div><button type="button" class="yk-main" data-yt-save="1">✓ Kaydet</button>';
    var o = popup('Yazılar', body, 'yt-card');
    o.addEventListener('click', function (ev) {
      var d = ev.target.closest('[data-yt-del]'); if (d) { d.parentNode.remove(); return; }
      if (!ev.target.closest('[data-yt-save]')) return;
      var n = {}; o.querySelectorAll('.yt-r').forEach(function (r) { var k = r.querySelector('[data-yt-k]'), v = r.querySelector('[data-yt-v]'); if (k && v && k.value.trim() && v.value.trim()) n[k.value.trim()] = v.value.trim(); });
      sj('ek_txt', n); TX.map = n; alog('✍️ Yazılar: ' + Object.keys(n).length + ' değişiklik'); o.remove(); location.reload();
    });
  }

  /* ================= 183) 3D model kılavuzu ve .glb denetimi ================= */
  var LIM = { bina: [15000, 1024, 2], npc: [8000, 1024, 1.5], canavar: [6000, 512, 1], kahraman: [12000, 1024, 2], uzak: [1500, 256, .3] };
  function inspectGlb(buf) {
    var dv = new DataView(buf); if (dv.getUint32(0, true) !== 0x46546C67) throw new Error('GLB değil');
    var len = dv.getUint32(12, true), json = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 20, len)));
    var tris = 0, verts = 0; (json.meshes || []).forEach(function (m) { (m.primitives || []).forEach(function (p) { var a = p.indices != null ? json.accessors[p.indices] : json.accessors[p.attributes.POSITION]; var n = a ? a.count : 0; tris += p.indices != null ? n / 3 : n / 3; var pa = json.accessors[p.attributes.POSITION]; verts += pa ? pa.count : 0; }); });
    var imgs = (json.images || []).length, texBytes = 0; (json.images || []).forEach(function (im) { if (im.bufferView != null) texBytes += json.bufferViews[im.bufferView].byteLength; });
    var draco = (json.extensionsUsed || []).indexOf('KHR_draco_mesh_compression') >= 0, mopt = (json.extensionsUsed || []).indexOf('EXT_meshopt_compression') >= 0;
    return { tris: Math.round(tris), verts: verts, imgs: imgs, texMB: texBytes / 1048576, mb: buf.byteLength / 1048576, comp: draco ? 'Draco' : mopt ? 'Meshopt' : '—', anims: (json.animations || []).length };
  }
  function openModel() {
    var body = '<div class="ym-tab"><table><tr><th></th><th>△</th><th>🖼 px</th><th>MB</th></tr>' + Object.keys(LIM).map(function (k) { return '<tr><td>' + { bina: '🏠 Bina', npc: '🧍 NPC', canavar: '🐺 Canavar', kahraman: '⭐ Kahraman', uzak: '🔭 Uzak sürüm' }[k] + '</td><td>' + nf(LIM[k][0]) + '</td><td>' + LIM[k][1] + '</td><td>' + LIM[k][2] + '</td></tr>'; }).join('') + '</table></div>' +
      '<div class="ym-chk"><select data-ym-k>' + Object.keys(LIM).map(function (k) { return '<option value="' + k + '">' + k + '</option>'; }).join('') + '</select><label class="ym-file">📂 .glb seç<input type="file" accept=".glb" data-ym-f hidden></label></div><div class="ym-res"></div><p class="ye-note">Tek dosya .glb · dokular 2’nin kuvveti (512/1024) · ölçek metre · yüz +Z · zemin y=0</p>';
    var o = popup('3D model', body, 'ym-card');
    o.addEventListener('change', function (ev) {
      var f = ev.target.files && ev.target.files[0]; if (!f) return; var k = o.querySelector('[data-ym-k]').value, L = LIM[k];
      f.arrayBuffer().then(function (buf) {
        var r; try { r = inspectGlb(buf); } catch (e) { o.querySelector('.ym-res').innerHTML = '<p class="ym-bad">◇ ' + esc(e.message) + '</p>'; return; }
        var row = function (ok, ic, txt) { return '<div class="ym-r ' + (ok ? 'ok' : 'bad') + '"><i>' + (ok ? '◆' : '◇') + '</i><span>' + ic + ' ' + txt + '</span></div>'; };
        o.querySelector('.ym-res').innerHTML = '<b>' + esc(f.name) + '</b>' + row(r.tris <= L[0], '△', nf(r.tris) + ' / ' + nf(L[0])) + row(r.mb <= L[2], '💾', r.mb.toFixed(2) + ' / ' + L[2] + ' MB') + row(r.imgs <= 4, '🖼', r.imgs + ' doku · ' + r.texMB.toFixed(2) + ' MB') + row(r.comp !== '—', '🗜', 'sıkıştırma: ' + r.comp) + (r.anims ? row(true, '🎞', r.anims + ' animasyon') : '');
        alog('🧊 model denetlendi: ' + f.name + ' (' + k + ', △' + r.tris + ')');
      });
    });
  }

  /* ================= 170) bakım ekranı ================= */
  var MT = { el: null, on: false };
  function checkMaint() {
    fetch('./bakim.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : { on: false }; }).then(function (j) {
      var on = !!(j && j.on) && !(isAdm() && ls('ek_mskip'));
      if (on && !MT.on) showMaint(j); else if (!on && MT.on) { MT.on = false; if (MT.el) MT.el.remove(); MT.el = null; location.reload(); }
      else if (on && MT.el) MT.el.querySelector('.mt-left').textContent = left(j);
    }).catch(function () {});
  }
  function left(j) { var t = Date.parse(j.until || ''); if (!isFinite(t)) return '…'; var s = Math.max(0, (t - Date.now()) / 1000); return W.ft ? W.ft(s) : Math.ceil(s / 60) + ' dk'; }
  function showMaint(j) {
    MT.on = true; MT.el = document.createElement('div'); MT.el.id = 'ek-maint';
    MT.el.innerHTML = '<div class="mt-in"><div class="mt-fire">🔥</div><b>Ocak tazeleniyor</b><p>' + esc(j.msg || 'Demirciler örsün başında; az sonra dönüyoruz.') + '</p><span>⏳ <i class="mt-left">' + left(j) + '</i></span>' + (isAdm() ? '<button type="button" data-mt-skip="1">🛠️ Yönetici olarak gir</button>' : '') + '</div>';
    MT.el.addEventListener('click', function (ev) { if (ev.target.closest('[data-mt-skip]')) { ls('ek_mskip', '1'); MT.el.remove(); MT.el = null; MT.on = false; } });
    document.body.appendChild(MT.el); save();
  }

  /* ================= yönetici paneline düğmeler ================= */
  function adminButtons() {
    var a = document.querySelector('#ek-admin .ad-grid'); if (!a || a.querySelector('[data-yon]')) return;
    a.insertAdjacentHTML('beforeend', [['eco', '⚖️', 'Ekonomi'], ['cal', '📅', 'Takvim'], ['txt', '✍️', 'Yazılar'], ['mdl', '🧊', '3D model'], ['log', '📜', 'İşlem kaydı'], ['mt', '🚧', 'Bakım']].map(function (b) { return '<button type="button" data-yon="' + b[0] + '"><i>' + b[1] + '</i><small>' + b[2] + '</small></button>'; }).join(''));
  }
  function openLog() { var L = lj('ek_alog', []); popup('İşlem kaydı', '<div class="gl-list">' + (L.map(function (x) { return '<div class="gl-r"><i>🛠️</i><b>' + esc(x.a) + '</b><small></small><em>' + dt(x.t) + '</em></div>'; }).join('') || '<p class="gl-none">—</p>') + '</div>', 'gl-card'); }
  function openMaint() {
    var skip = !!ls('ek_mskip');
    popup('Bakım', '<p class="ye-note">Bakımı açmak için depodaki <b>public/bakim.json</b> dosyası {"on":true,"until":"2026-11-20T22:00:00+03:00","msg":"…"} yapılır; oyuncular 2 dk içinde bakım ekranını görür, kapanınca oyun kendiliğinden açılır. Bana “bakımı aç / kapat” demen yeterli.</p><div class="ye-acts"><button type="button" data-mt-prev="1">👁 Önizle</button><button type="button" data-mt-sk="1">' + (skip ? '🔒 Bakımda beni de durdur' : '🛠️ Bakımda beni geçir') + '</button></div>', 'ye-card')
      .addEventListener('click', function (ev) {
        if (ev.target.closest('[data-mt-prev]')) { ev.currentTarget.remove(); showMaint({ on: true, until: new Date(Date.now() + 1800e3).toISOString(), msg: 'Önizleme' }); var x = document.createElement('button'); x.textContent = '✕'; x.className = 'mt-x'; x.onclick = function () { MT.el && MT.el.remove(); MT.el = null; MT.on = false; }; MT.el.appendChild(x); }
        if (ev.target.closest('[data-mt-sk]')) { ls('ek_mskip', skip ? null : '1'); alog(skip ? '🚧 bakım geçişi kapatıldı' : '🚧 bakım geçişi açıldı'); ev.currentTarget.remove(); }
      });
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('[data-yon]'); if (!b) return; ev.stopPropagation();
    var k = b.dataset.yon; if (k === 'eco') openEco(); else if (k === 'cal') openCal(); else if (k === 'txt') openTxt(); else if (k === 'mdl') openModel(); else if (k === 'log') openLog(); else openMaint();
  }, true);

  var tEl = null;
  function toast(t) { if (!tEl) { tEl = document.createElement('div'); tEl.id = 'ek-rec-t'; document.body.appendChild(tEl); } tEl.textContent = t; tEl.className = 'gold'; void tEl.offsetWidth; tEl.classList.add('on'); clearTimeout(tEl.__t); tEl.__t = setTimeout(function () { tEl.classList.remove('on'); }, 3500); }

  var l1 = 0, l2 = 0, l3 = 0;
  function frame(now) {
    requestAnimationFrame(frame); if (document.hidden) return;
    if (now - l1 > 400) { l1 = now; try { adminButtons(); } catch (e) {} }
    if (now - l2 > 5000) { l2 = now; try { ecoHooks(); annTick(); } catch (e) {} }
    if (now - l3 > 120000) { l3 = now; checkMaint(); }
  }
  function start() { if (!S() || typeof W.fight !== 'function') { setTimeout(start, 400); return; } ecoHooks(); txStart(); checkMaint(); l3 = performance.now(); requestAnimationFrame(frame); }
  start();
  W.ergenekonYonetim = { openEco: openEco, openCal: openCal, openTxt: openTxt, openModel: openModel, openLog: openLog, inspectGlb: inspectGlb };
})();
