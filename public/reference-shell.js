/* Decorative shell only: source action nodes, resource values and save data stay owned by the game. */
(function (root) {
  'use strict';
  var paths = {
    c: 'M12 1C10 6 7 7 8 12l-4-2c-2 7 2 13 8 13s10-5 8-11l-3 3C18 8 13 7 12 1zm0 11c4 4 4 7 0 9-4-1-4-5 0-9z',
    m: 'M2 5l6-3 8 3 6-3v18l-6 3-8-3-6 3V5zm7-1v14l6 3V7L9 4z',
    k: 'M2 3h3v4h2V3h3v7h4V3h3v4h2V3h3v20H2V3zm8 20h4v-7c0-3-4-3-4 0v7z',
    r: 'M12 1L1 7v2h22V7L12 1zM3 11h4v9H3v-9zm7 0h4v9h-4v-9zm7 0h4v9h-4v-9zM1 21h22v3H1z',
    u: 'M12 1C4 1 2 7 2 16v6l6-2 1-6 3 1 3-1 1 6 6 2v-6C22 7 20 1 12 1zM5 9l6 3v-1L7 7 5 9zm14 0l-2-2-4 4v1l6-3zM11 3h2v7h-2V3z',
    y: 'M7 1h10v4h5v4c0 5-3 7-7 7l-1 2v3h5v3H5v-3h5v-3l-1-2c-4 0-7-2-7-7V5h5V1zm0 6H4v2c0 3 2 4 4 4L7 7zm10 0l-1 6c2 0 4-1 4-4V7h-3z',
    p: 'M1 4h22v17H1V4zm2 2l9 7 9-7H3zm0 13h18v-9l-9 7-9-7v9z',
    a: 'M1 9l5-5 5 2 3-2 9 6-7 12-6-2-5-5-2 1L1 9zm9 0l-3 4 6 5 4-6-4-3-3 3-2-1 2-2z',
    e: 'M1 9h22v5h-9v10h-4V14H1V9zm1 7h6v8H2v-8zm14 0h6v8h-6v-8zM10 7C1 8 1 0 6 1c4 0 6 4 6 5 0-1 2-5 6-5 5-1 5 7-4 6h-4zM9 5C5 0 2 5 9 5zm6 0c7 0 4-5 0 0z',
    g: 'M9 1h6l1 4 4 2 4 5-3 4v5l-5 3-4-3-4 2-5-4 1-5-3-3 3-5 5-1 0-4zm3 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
    book: 'M1 3c4-1 8 0 11 2 3-2 7-3 11-2v19c-4-1-8 0-11 2-3-2-7-3-11-2V3zm10 4C8 5 5 5 3 5v14c3 0 5 0 8 2V7zm2 0v14c3-2 5-2 8-2V5c-2 0-5 0-8 2z',
    power: 'M2 1l9 8-3 3L1 3l1-2zm20 0l1 2-7 9-3-3 9-8zM9 13l2 2-7 8-3-3 8-7zm6 0l8 7-3 3-7-8 2-2zM6 10l8 8-2 2-8-8 2-2zm12 0l2 2-8 8-2-2 8-8z',
    storage: 'M2 8l5-6h10l5 6v14H2V8zm3 0h14l-3-4H8L5 8zm-1 4v7h6v-4h4v4h6v-7H4z',
    people: 'M8 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM2 22v-6c0-7 12-7 12 0v6H2zm14 0v-6c0-2-1-3-1-4 4-1 7 1 7 5v5h-6z',
    energy: 'M14 0L3 14h7L9 24l12-15h-8l1-9z'
  };
  function glyph(key) {
    var id = 'reference-gold-' + key;
    return '<svg class="reference-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="' + id + '" x2="0" y2="1"><stop stop-color="#fff0bb"/><stop offset=".43" stop-color="#e8bd62"/><stop offset=".68" stop-color="#ac6f27"/><stop offset="1" stop-color="#e4b45b"/></linearGradient></defs><path d="' + (paths[key] || paths.r) + '" fill="url(#' + id + ')" fill-rule="evenodd" stroke="#342111" stroke-width=".45" stroke-linejoin="round"/></svg>';
  }
  root.installReferenceShell = function () {
    if (root.referenceShell) return root.referenceShell;
    var doc = root.document, original = root.render;
    if (!doc || typeof original !== 'function') return null;
    if (doc.body && doc.body.classList) doc.body.classList.add('reference-shell');
    function sprite(key, cls) {
      var html = typeof root.paintedGameIconHtml === 'function' ? root.paintedGameIconHtml(key, cls) : '';
      return html || glyph(key);
    }
    function leadingArt(parent, key, cls) {
      if (!parent || parent.querySelector('.reference-resource-art')) return;
      var amount = parent.querySelector('b');
      if (!amount) return;
      var first = parent.firstChild;
      while (first && first !== amount) {
        var next = first.nextSibling;
        if (first.nodeType === 3 || first.nodeType === 1 && !first.matches('button,input,textarea,select')) first.remove();
        first = next;
      }
      var frame = doc.createElement('span'); frame.className = 'reference-resource-art ' + (cls || ''); frame.setAttribute('aria-hidden', 'true'); frame.innerHTML = sprite(key, 'reference-hud-painted');
      parent.insertBefore(frame, amount);
    }
    function hud() {
      var res = doc.getElementById('res');
      Array.from(res && res.children || []).forEach(function (cell, index) {
        if (index < 3) leadingArt(cell, ['wood', 'food', 'ore'][index]);
        else if (cell.title === 'Depo kapasitesi') leadingArt(cell, 'storage');
        else if (cell.title === 'Halk') leadingArt(cell, 'people');
      });
      var power = doc.getElementById('pwr');
      if (power && !power.querySelector('.reference-power-art')) {
        var small = power.querySelector('small');
        Array.from(power.children || []).forEach(function (node) { if (node !== small && node.tagName === 'IMG') node.remove(); });
        if (small) { var emblem = doc.createElement('span'); emblem.className = 'reference-power-art'; emblem.setAttribute('aria-hidden', 'true'); emblem.innerHTML = glyph('power'); power.insertBefore(emblem, small); }
      }
      var heat = doc.getElementById('erIc'); if (heat && !heat.querySelector('.reference-nav-icon')) heat.innerHTML = glyph('c');
    }
    function navigation() {
      var nav = doc.getElementById('tabs');
      Array.from(nav && nav.children || []).forEach(function (button) {
        var key = button.dataset && (button.dataset.t || (button.dataset.ex ? 'book' : ''));
        if (!key || button.querySelector('.reference-nav-icon')) return;
        var badge = button.querySelector('i'); if (badge) badge.remove();
        button.innerHTML = glyph(key); if (badge) button.appendChild(badge);
      });
    }
    function ornament(frame) {
      if (!frame || frame.querySelector(':scope > .reference-frame-corners')) return;
      var corners = doc.createElement('div'); corners.className = 'reference-frame-corners'; corners.setAttribute('aria-hidden', 'true');
      corners.innerHTML = '<span></span><span></span><span></span><span></span>'; frame.appendChild(corners);
    }
    function headers() {
      Array.from(doc.querySelectorAll('.game-page-header,.research-header,.kurultay header') || []).forEach(function (header) {
        if (header.querySelector(':scope > .reference-header-wolf')) return;
        var left = doc.createElement('span'); left.className = 'reference-header-wolf reference-header-wolf--left'; left.setAttribute('aria-hidden', 'true');
        var right = left.cloneNode(); right.className = 'reference-header-wolf reference-header-wolf--right'; header.appendChild(left); header.appendChild(right);
      });
    }
    function refresh() {
      if (doc.body && doc.body.classList) doc.body.classList.add('reference-shell');
      hud(); navigation(); headers();
      Array.from(doc.querySelectorAll('.ovp:not(#tr),.research-screen,#pop .pb,.kurultay-box,.arena-dialog') || []).forEach(ornament);
    }
    root.render = function () { var result = original.apply(this, arguments); refresh(); return result; };
    root.referenceShell = { refresh: refresh, glyph: glyph }; refresh(); return root.referenceShell;
  };
}(typeof window !== 'undefined' ? window : globalThis));
