/* Painted artwork is presentation only: original records, action nodes and 3D canvases stay live. */
(function (root) {
  'use strict';
  root.installReferenceRooms = function () {
    if (root.referenceRooms) return root.referenceRooms;
    var original = root.render;
    if (typeof original !== 'function') return null;
    var pages = {a:'command',k:'training',y:'training',p:'research',g:'toolbox',u:'command',e:'coins',z:'research',h:'command'};
    var oldArt = {growth:'encampment',sacred:'encampment',scroll:'research',hammer:'toolbox',medicaltent:'medical',military:'training',command:'command',economy:'coins',heroes:'command',mail:'research',chronicle:'research',attack:'bow',events:'coins',world:'encampment',wartech:'crystal',wood:'wood'};
    function painted(node, key, cls) {
      if (!node || typeof root.paintedGameIconHtml !== 'function') return;
      if (node.dataset.paintedRoom === key) return;
      var html = root.paintedGameIconHtml(key, cls || 'room-painted-art');
      if (!html) return;
      node.innerHTML = html;
      node.dataset.paintedRoom = key;
    }
    function resources(panel) {
      var keys = {'🪵':'wood','🍖':'food','⛓️':'ore','🪨':'ore','💎':'crystal','🪙':'coins'};
      Array.from(panel.querySelectorAll('.city-building-detail>p,.roster-live-card p,.mgmt-mail-detail .md,.mgmt-pane>.card p')).forEach(function (host) {
        function visit(parent) {
          Array.from(parent.childNodes || []).forEach(function (node) {
            if (node.nodeType === 1) { if (!node.matches('button,input,textarea,select,.painted-game-icon')) visit(node); return; }
            if (node.nodeType !== 3 || !/[🪵🍖⛓🪨💎🪙]/u.test(node.textContent || '')) return;
            var value = node.textContent, regex = /(🪵|🍖|⛓️|🪨|💎|🪙)/gu, match, cursor = 0, fragment = root.document.createDocumentFragment();
            while ((match = regex.exec(value))) {
              if (match.index > cursor) fragment.appendChild(root.document.createTextNode(value.slice(cursor,match.index)));
              var holder = root.document.createElement('span'); holder.className = 'room-resource-icon';
              holder.innerHTML = root.paintedGameIconHtml(keys[match[0]],'room-painted-art');
              holder.setAttribute('role','img'); holder.setAttribute('aria-label', {wood:'Odun',food:'Et',ore:'Demir',crystal:'Kristal',coins:'Altın'}[keys[match[0]]]);
              fragment.appendChild(holder); cursor = regex.lastIndex;
            }
            if (!cursor) return;
            if (cursor < value.length) fragment.appendChild(root.document.createTextNode(value.slice(cursor)));
            node.replaceWith(fragment);
          });
        }
        visit(host);
      });
    }
    function refresh() {
      var doc = root.document, page = root.tab, panel = doc.getElementById('t' + page);
      if (!panel || typeof root.paintedGameIconHtml !== 'function') return;
      if (pages[page]) {
        var emblem = panel.querySelector('.game-page-emblem');
        if (emblem) painted(emblem, pages[page]);
      }
      Array.from(panel.querySelectorAll('.mgmt-medallion,.roster-section-icon,.roster-army-art,.roster-small-medallion')).forEach(function (node) {
        if (node.classList.contains('roster-section-icon')) {
          var source = node.getAttribute('src') || '', match = source.match(/\/interface\/icons\/([a-z]+)\.webp/);
          if (!match || !oldArt[match[1]]) return;
          var holder = doc.createElement('span'); holder.className = node.className;
          painted(holder, oldArt[match[1]]); node.replaceWith(holder); return;
        }
        var img = node.querySelector('img'), src = img && img.getAttribute('src') || '', found = src.match(/\/interface\/icons\/([a-z]+)\.webp/);
        if (found && oldArt[found[1]]) painted(node, oldArt[found[1]]);
      });
      var city = doc.querySelector('#tc .city-secondary-emblem');
      if (city) painted(city, 'research');
      resources(panel);
    }
    function render() { var result = original.apply(this, arguments); refresh(); return result; }
    root.render = render;
    var api = {refresh: refresh}; root.referenceRooms = api; return api;
  };
})(typeof window !== 'undefined' ? window : globalThis);
