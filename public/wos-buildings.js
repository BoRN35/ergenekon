/* Whiteout Survival Wiki yapı değerleri birebir (kullanıcı kararı "A", 26.11.2026). Veri: wos-buildings-data.js (scripts/wos-buildings.py).
   Ocak/Boy Obası/Şifahane/Kışla/Gözcü 30'dan sonra Kor 1–10: wiki'de her Kor seviyesi 4 ara aşama + ana aşama ile açılır.
   Ara aşamalar seviyeyi değiştirmez, s.ek.fcs[yapı] (0–4) içinde sayılır; ana aşama bitince seviye artar, sayaç sıfırlanır.
   Devam eden yapımlar başladıkları bedel/sürede biter (kuyruk kaydı değişmez). Bilgelik, Harp Ocağı, Kömürlük whiteout-research.js'te. */
(function (root) {
  'use strict';
  root.installWosBuildings = function () {
    var D = root.WOS_BUILDINGS || {};
    var oUp = root.buildingUpgradeAt, oReq = root.buildingRequirements, oCan = root.can, oCost = root.cost, oDur = root.dur, oMax = root.buildingMaxLevel, oTxt = root.buildingLevelText, oStart = root.start;
    function S() { return root.s; }
    function sub(k) { var e = S().ek || {}; return (e.fcs && e.fcs[k]) || 0; }
    function row(k, L, sb) { var d = D[k]; if (!d) return null; var i = d.fc && L >= 30 ? 30 + (L - 30) * 5 + (sb || 0) : L; return d.rows[i] || null; }
    function maxL(k) { return D[k] ? D[k].max || 40 : 40; }
    root.buildingUpgradeAt = function (k, level) {
      if (!D[k]) return oUp(k, level);
      if (!Number.isInteger(level) || level < 0 || level >= maxL(k)) return null;
      var sb = level === (S().l[k] || 0) ? sub(k) : 0, r = row(k, level, sb);
      return r && Number.isFinite(r.t) ? { fromLevel: level, targetLevel: r.sub ? level : level + 1, cost: Object.assign({}, r.c), seconds: r.t, sub: !!r.sub, step: sb, label: r.lb } : null;
    };
    // oyuncunun araştırdığı yapı bedeli indirimi (Taş Ustalığı, en çok %10) wiki bedelinin üstüne uygulanır: kazanılmış hak korunur
    function disc(c) { var d = 1 - Math.min(.1, .01 * ((S().rs || {}).masonry || 0)), o = {}; for (var r in c) o[r] = Math.ceil(c[r] * d); return o; }
    root.cost = function (k) { if (!D[k]) return oCost(k); var q = root.buildingUpgradeAt(k, S().l[k] || 0); return q ? disc(q.cost) : {}; };
    root.dur = function (k) { if (!D[k]) return oDur(k); var q = root.buildingUpgradeAt(k, S().l[k] || 0); return q ? q.seconds : 0; };
    root.buildingRequirements = function (k) {
      if (!D[k]) return oReq(k);
      var s = S(), r = row(k, s.l[k] || 0, sub(k)), out = []; if (!r) return out;
      for (var p in r.p) if ((s.l[p] || 0) < r.p[p]) out.push({ key: p, level: r.p[p] });
      return out;
    };
    root.can = function (k) {
      if (!D[k]) return oCan(k);
      var s = S(), q = root.buildingUpgradeAt(k, s.l[k] || 0), c = q ? disc(q.cost) : null;
      return !!q && !root.buildQueue(k) && root.buildQueues().length < root.builders() && !root.buildingRequirements(k).length &&
        Object.keys(c).every(function (r) { return Number.isFinite(s.r[r]) && s.r[r] >= c[r]; });
    };
    root.buildingMaxLevel = function (k) { return D[k] ? maxL(k) : oMax ? oMax(k) : 40; };
    root.buildingLevelText = function (k, L) {
      if (!D[k]) return oTxt ? oTxt(k, L) : 'Sv ' + L;
      if (!L) return 'İnşa edilmedi';
      var t = L > 30 && D[k].fc ? 'Kor ' + (L - 30) : 'Sv ' + L, sb = sub(k);
      return sb && L === (S().l[k] || 0) ? t + ' · ara ' + sb + '/4' : t;
    };
    root.start = function (k) {
      var r = D[k] ? row(k, S().l[k] || 0, sub(k)) : null; oStart(k);
      var q = root.buildQueue(k); if (q && r && r.sub && !q.sub) q.sub = 1;
    };
    // index.html yapım tamamlama kancaları
    root.ekFcSub = function (k) {
      var s = S(); s.ek = s.ek || {}; s.ek.fcs = s.ek.fcs || {}; s.ek.fcs[k] = Math.min(4, (s.ek.fcs[k] || 0) + 1);
      try { root.add((root.B[k] ? root.B[k].n : k) + ': Kor ' + ((s.l[k] || 0) - 29) + ' ara aşaması ' + s.ek.fcs[k] + '/4 tamamlandı.'); } catch (e) {}
    };
    root.ekFcMain = function (k) { var e = S().ek; if (e && e.fcs && e.fcs[k]) e.fcs[k] = 0; };
  };
})(typeof window !== 'undefined' ? window : globalThis);
