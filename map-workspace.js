/* The world remains a live 3D map. Its actual target and march controls live in a field journal. */
(function () {
  'use strict';
  window.installMapWorkspace = function () {
    if (window.mapWorkspace) return window.mapWorkspace;
    var originalRender = window.render, journal, target, marches, pane = 'target', previousTarget;
    if (typeof originalRender !== 'function') return null;
    function select(next) {
      pane = next === 'marches' ? 'marches' : 'target';
      if (!journal) return;
      target.hidden = pane !== 'target'; marches.hidden = pane !== 'marches';
      journal.querySelectorAll('[data-map-pane]').forEach(function (button) {
        var on = button.dataset.mapPane === pane;
        button.setAttribute('aria-selected', String(on)); button.tabIndex = on ? 0 : -1;
      });
    }
    function refresh() {
      if (window.tab !== 'm') return;
      var map = document.getElementById('tm'), info = document.getElementById('mapi'), routes = document.getElementById('sqv');
      if (!map || !info || !routes) return;
      if (!journal || !journal.isConnected) {
        map.classList.add('map-workspace');
        var oldSide = info.parentNode;
        journal = document.createElement('aside'); journal.className = 'map-journal';
        journal.setAttribute('aria-label', 'Dünya haritası sefer defteri');
        journal.innerHTML = '<header class="map-journal-header"><small>ERGENEKON · DIŞ DÜNYA</small><h2>Sefer Defteri</h2><p>Boyun sınırlarının ötesinde</p></header><div class="map-route-status"></div><nav class="map-journal-tabs" role="tablist" aria-label="Sefer defteri"><button type="button" id="map-target-tab" data-map-pane="target" role="tab" aria-controls="map-target-panel">Seçili hedef</button><button type="button" id="map-marches-tab" data-map-pane="marches" role="tab" aria-controls="map-marches-panel">Kafileler</button></nav><section id="map-target-panel" role="tabpanel" aria-labelledby="map-target-tab"></section><section id="map-marches-panel" role="tabpanel" aria-labelledby="map-marches-tab"></section><footer class="map-journal-legend"><span><i>➜</i> Gidiş</span><span><i>◀</i> Dönüş</span><span><i>◆</i> Toplama</span></footer>';
        target = journal.querySelector('#map-target-panel'); marches = journal.querySelector('#map-marches-panel');
        target.appendChild(info); marches.appendChild(routes); map.appendChild(journal);
        if (oldSide && oldSide.classList.contains('side')) oldSide.remove();
        journal.addEventListener('click', function (event) { var b = event.target.closest('[data-map-pane]'); if (b) select(b.dataset.mapPane); });
        journal.addEventListener('keydown', function (event) {
          if (!event.target.closest('[data-map-pane]') || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
          event.preventDefault(); select(event.key === 'Home' ? 'target' : event.key === 'End' ? 'marches' : pane === 'target' ? 'marches' : 'target');
          journal.querySelector('[data-map-pane="' + pane + '"]').focus();
        });
      }
      var queues = window.s && window.s.sq || [], outgoing = queues.filter(function (q) { return q.st === 1 || q.st === 4; }).length, incoming = queues.filter(function (q) { return q.st === 3; }).length, gathering = queues.filter(function (q) { return q.st === 2; }).length;
      var status = journal.querySelector('.map-route-status'), html = '<span><i>➜</i><b>' + outgoing + '</b><small>Gidiş</small></span><span><i>◀</i><b>' + incoming + '</b><small>Dönüş</small></span><span><i>◆</i><b>' + gathering + '</b><small>Toplama</small></span>';
      if (status.__status !== html) { status.innerHTML = html; status.__status = html; }
      var selection = String(window.sel) + ':' + String(window.selM);
      if (previousTarget !== undefined && previousTarget !== selection) pane = 'target';
      previousTarget = selection;
      select(pane);
    }
    window.render = function () { var result = originalRender.apply(this, arguments); refresh(); return result; };
    window.mapWorkspace = { refresh: refresh }; return window.mapWorkspace;
  };
}());
