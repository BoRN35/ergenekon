/* City composition: keep the live scene and all original game controls. */
(function () {
  'use strict';

  window.installCityWorkspace = function installCityWorkspace() {
    if (window.cityWorkspace) return window.cityWorkspace;
    var originalRender = window.render;
    var originalPopup = window.rPop;
    if (typeof originalRender !== 'function') return null;

    var shell, content, overview, heading, drawer, borrowed, selected = '', rendering = 0;
    var resizeFrame = 0, resizeObserver, preservedScroll;
    var escape = function (value) {
      return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };
    function duration(value) { return typeof window.ft === 'function' ? window.ft(value) : Math.ceil(value) + ' sn'; }
    function art(key) { return typeof window.gameThemeArt === 'function' ? window.gameThemeArt(key) : ''; }
    function active() { return window.tab === 'c'; }
    function otherPopup() { return !!(window.PRF || window.PTP || window.ENP || window.AUD || window.POPK); }

    // rPop caches its HTML. Its real panel must be back in #pop before it runs.
    function restorePanel() {
      var popup = document.getElementById('pop');
      if (borrowed && popup && borrowed.parentNode !== popup) {
        var city = document.getElementById('tc');
        // The source render measures layout while the panel is temporarily away.
        // Keep both real scroll containers before that shorter layout can clamp them.
        if (!preservedScroll) preservedScroll = { key: selected, context: shell.scrollTop, city: city ? city.scrollTop : 0 };
        var focus = document.activeElement;
        var keepFocus = focus && borrowed.contains(focus);
        // Reparenting must not drop focus from an army/hospital control.
        popup.style.display = 'flex';
        popup.appendChild(borrowed);
        if (keepFocus && typeof focus.focus === 'function') focus.focus({ preventScroll: true });
      }
      if (borrowed) borrowed.classList.remove('city-building-detail');
      borrowed = null;
    }

    function sceneResize() {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(function () {
        resizeFrame = 0;
        var host = document.getElementById('cityv'), city = window.city3d;
        if (!host || !city || !host.clientWidth || !host.clientHeight) return;
        // The scene also owns a ResizeObserver; this covers the first layout pass.
        var size = city.renderer && city.renderer.getSize && city.renderer.getSize({ set: function (x, y) { this.x = x; this.y = y; return this; } });
        if (city.renderer && (!size || size.x !== host.clientWidth || size.y !== host.clientHeight)) {
          city.renderer.setSize(host.clientWidth, host.clientHeight);
          if (city.camera) { city.camera.aspect = host.clientWidth / host.clientHeight; city.camera.updateProjectionMatrix(); }
        }
      });
    }

    function ensure() {
      var city = document.getElementById('tc'), scene = document.getElementById('cityv');
      if (!city || !scene) return false;
      if (shell && shell.isConnected) return true;
      var oldSide = Array.from(city.children || []).find(function (child) { return child.classList.contains('side'); });
      if (!oldSide) return false;
      city.classList.add('city-workspace');
      shell = document.createElement('aside');
      shell.className = 'city-context';
      shell.setAttribute('aria-label', 'Oba ve yapı gelişimi');
      shell.innerHTML = '<header class="city-context-header"><span class="city-context-kicker">ERGENEKON · BOY MEYDANI</span><h2>Boy Obası</h2><span class="city-context-rule" aria-hidden="true">◆</span></header><div class="city-context-content"><section class="city-overview"></section></div><details class="city-work-drawer"><summary><span>Oba işleri</span><small>Görevler · ustalar · halk</small><i aria-hidden="true">⌄</i></summary></details>';
      content = shell.querySelector('.city-context-content');
      overview = shell.querySelector('.city-overview');
      heading = shell.querySelector('h2');
      drawer = shell.querySelector('.city-work-drawer');
      oldSide.classList.add('city-original-work');
      drawer.appendChild(oldSide);
      city.appendChild(shell);
      if (typeof ResizeObserver === 'function') {
        resizeObserver = new ResizeObserver(sceneResize);
        resizeObserver.observe(scene);
      }
      sceneResize();
      return true;
    }

    function overviewHtml() {
      var state = window.s, buildings = window.B;
      if (!state || !state.l || !buildings) return '';
      var level = Number(state.l.ocak || 0), oba = Number(state.l.oba || 0);
      var milestone = [1, 5, 10, 15, 20, 25, 30, 35, 40].filter(function (n) { return n <= Math.max(1, level); }).pop();
      var jobs = typeof window.buildQueues === 'function' ? window.buildQueues() : [];
      var count = typeof window.builders === 'function' ? window.builders() : 1;
      var h = '<div class="city-hearth-medallion"><img src="./assets/ocak-previews/ocak-sv' + milestone + '.webp" alt="Kutsal Ocak, mevcut görünüm"><span>Sv ' + level + '</span></div>';
      h += '<div class="city-overview-title"><span>BOYUN YÜREĞİ</span><h3>Kutsal Ocak</h3><p>Demir dağın ardında, bir boy yükseliyor.</p></div>';
      h += '<div class="city-domain-levels"><button data-bm="oba"><span>Boy Obası</span><b>Sv ' + oba + '</b><i>↗</i></button><button data-bm="ocak"><span>Kutsal Ocak</span><b>Sv ' + level + '</b><i>↗</i></button></div>';
      h += '<section class="city-builders"><header><h3>Ustaların çalışmaları</h3><span>' + jobs.length + ' / ' + count + '</span></header>';
      jobs.forEach(function (q) {
        var ratio = Math.max(0, Math.min(100, q.tot ? (1 - q.left / q.tot) * 100 : 0));
        var name = buildings[q.k] ? buildings[q.k].n : q.k;
        h += '<button class="city-work-order" data-bm="' + escape(q.k) + '"><span class="city-work-icon">⚒</span><span><b>' + escape(name) + '</b><small>Sv ' + (Number(state.l[q.k] || 0) + 1) + ' · ' + duration(q.left) + '</small><span class="city-work-progress"><i style="width:' + ratio.toFixed(2) + '%"></i></span></span><i>↗</i></button>';
      });
      if (jobs.length < count) h += '<button class="city-idle-builder" data-bm="oba"><span>⚒</span><span><b>' + (count - jobs.length) + ' usta hazır</b><small>Geliştirmek için meydandaki bir yapıya dokun.</small></span></button>';
      if (count < 2) h += '<button class="city-builder-unlock" data-bm="oba">İkinci usta <b>Boy Obası Sv 5</b><span>↗</span></button>';
      h += '</section>';
      if (state.rq) {
        var research = (window.RS || []).find(function (r) { return r.k === state.rq.k; });
        h += '<button class="city-research-order" data-t="r"><span class="city-secondary-emblem">' + (art('research') ? '<img src="' + escape(art('research')) + '" alt="">' : '✧') + '</span><span><small>BİLGELİK OCAĞI</small><b>' + escape(research ? research.n : 'Araştırma sürüyor') + '</b><small>' + duration(state.rq.left) + '</small></span><i>↗</i></button>';
      }
      h += '<nav class="city-context-links" aria-label="Oba bölümleri"><button data-t="m"><span>◇</span>Dünya haritası</button><button data-t="r"><span>✧</span>Araştırmalar</button></nav>';
      return h;
    }

    function compose() {
      if (!active() || !ensure()) { preservedScroll = null; return; }
      var key = window.BMK, popup = document.getElementById('pop');
      var useBuilding = key && window.B && window.B[key] && !otherPopup();
      shell.classList.toggle('has-building-detail', !!useBuilding);
      if (useBuilding && popup) {
        var panel = popup.querySelector('.pb') || borrowed;
        if (panel) {
          var focus = document.activeElement;
          var keepFocus = focus && panel.contains(focus);
          borrowed = panel;
          panel.classList.add('city-building-detail');
          content.appendChild(panel);
          overview.hidden = true;
          heading.textContent = window.B[key].n;
          popup.style.display = 'none';
          if (keepFocus && typeof focus.focus === 'function') focus.focus({ preventScroll: true });
          var city = document.getElementById('tc');
          if (selected !== key) {
            panel.scrollTop = 0;
            shell.scrollTop = 0;
            var mobile = typeof window.matchMedia === 'function' ? window.matchMedia('(max-width:700px)').matches : window.innerWidth <= 700;
            if (mobile && city) {
              var contextTop = shell.offsetTop;
              if (typeof shell.getBoundingClientRect === 'function' && typeof city.getBoundingClientRect === 'function') contextTop = shell.getBoundingClientRect().top - city.getBoundingClientRect().top + city.scrollTop;
              if (contextTop < city.scrollTop || contextTop > city.scrollTop + city.clientHeight * 0.35) city.scrollTop = Math.max(0, contextTop);
            }
          } else if (preservedScroll && preservedScroll.key === key) {
            shell.scrollTop = preservedScroll.context;
            if (city) city.scrollTop = preservedScroll.city;
          }
          preservedScroll = null;
          selected = key;
          return;
        }
      }
      overview.hidden = false;
      heading.textContent = 'Boy Obası';
      selected = '';
      preservedScroll = null;
      var html = overviewHtml();
      if (overview.__cityHtml !== html) { overview.innerHTML = html; overview.__cityHtml = html; }
    }

    if (typeof originalPopup === 'function') {
      window.rPop = function () {
        restorePanel();
        var result = originalPopup.apply(this, arguments);
        if (!rendering) compose();
        return result;
      };
    }
    window.render = function () {
      restorePanel();
      rendering++;
      try { return originalRender.apply(this, arguments); }
      finally { rendering--; if (!rendering) compose(); }
    };
    window.cityWorkspace = { refresh: function () { restorePanel(); if (typeof window.rPop === 'function') window.rPop(); else compose(); }, restorePanel: restorePanel };
    compose();
    return window.cityWorkspace;
  };
}());
