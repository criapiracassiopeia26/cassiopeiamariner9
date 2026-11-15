/* ==========================================================================
   CASSIOPEIA · MARINER 9 MISSION — SCRIPT
   Vanilla JS, no build step. Everything editable lives in config.js.

   Contents
     1. Helpers (storage, i18n lookup, placeholders)
     2. YouTube URL → privacy-friendly embed
     3. Pixel sprites (SVG from assets/js/sprites.js, or your own images)
     4. Pixel Mars (animated canvas)
     5. Starfield (twinkle + parallax)
     6. Components built from config (videos, game, characters, team…)
     7. Language switching (EN default, ES secondary)
     8. Header nav, arcade menu, scroll spy
     9. Intro, typewriter, toast, Konami easter egg
    10. Boot
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. HELPERS ---------- */
  var CFG = window.CONFIG || {};
  var SPRITES = window.SPRITES || {};
  var I18N = CFG.i18n || { en: {} };
  var OPTS = CFG.options || {};
  var ASSETS = CFG.assets || {};
  var LANGS = ['en', 'es'];
  var LANG_KEY = 'm9-lang';

  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduceMotion = !!(motionQuery && motionQuery.matches);

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // localStorage / sessionStorage can throw (private mode, blocked cookies…)
  function safeStore(type) {
    return {
      get: function (k) { try { return window[type].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window[type].setItem(k, v); } catch (e) { /* ignore */ } }
    };
  }
  var store = safeStore('localStorage');
  var session = safeStore('sessionStorage');

  var lang = pickInitialLanguage();

  function pickInitialLanguage() {
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch (e) { /* old browser */ }
    if (LANGS.indexOf(fromUrl) > -1) return fromUrl;
    var saved = store.get(LANG_KEY);
    if (LANGS.indexOf(saved) > -1) return saved;
    return LANGS.indexOf(CFG.defaultLanguage) > -1 ? CFG.defaultLanguage : 'en';
  }

  function getPath(obj, path) {
    return String(path).split('.').reduce(function (o, k) {
      return (o !== undefined && o !== null && o[k] !== undefined) ? o[k] : undefined;
    }, obj);
  }

  /** Translate a dictionary key. Falls back to English, then to the key itself. */
  function t(key, vars) {
    var s = getPath(I18N[lang], key);
    if (s === undefined) s = getPath(I18N.en, key);
    if (s === undefined) return key;
    if (vars) s = String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    return s;
  }

  /** Read a { en, es } config value (or a plain string). */
  function L(v) {
    if (v === undefined || v === null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.en || '';
  }

  /** True when a config value is empty or still a "PASTE_..." placeholder. */
  function isPlaceholder(v) {
    return typeof v !== 'string' || !v.trim() || /PASTE_/i.test(v);
  }

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) return;
      if (k === 'class') node.className = attrs[k];
      else node.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Functions that refresh config-driven text when the language changes
  var langUpdaters = [];
  function onLang(fn) { langUpdaters.push(fn); }

  /* ---------- 2. YOUTUBE ---------- */

  /**
   * Accepts any normal YouTube link (watch, youtu.be, shorts, live, embed,
   * nocookie, mobile) or a bare 11-character ID. Returns { id, start } or null.
   */
  function parseYouTube(url) {
    if (isPlaceholder(url)) return null;
    url = url.trim();
    if (/^[\w-]{11}$/.test(url)) return { id: url, start: 0 };
    var u;
    try { u = new URL(url.indexOf('//') === -1 ? 'https://' + url : url); } catch (e) { return null; }
    var host = u.hostname.replace(/^(www|m|music)\./, '');
    var id = null;
    if (host === 'youtu.be') {
      id = u.pathname.slice(1).split('/')[0];
    } else if (/(^|\.)youtube(-nocookie)?\.com$/.test(host)) {
      if (u.pathname === '/watch') id = u.searchParams.get('v');
      else {
        var m = u.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{11})/);
        if (m) id = m[2];
      }
    }
    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    return { id: id, start: parseStart(u.searchParams.get('t') || u.searchParams.get('start')) };
  }

  function parseStart(s) {
    if (!s) return 0;
    if (/^\d+$/.test(s)) return +s;
    var m = s.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
    return m ? (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0) : 0;
  }

  /*
   * YouTube "Error 153" = the player didn't receive a referrer (the address of
   * the page embedding it). That happens when the page is opened as a file
   * (file:///…, double-clicking index.html), inside some sandboxed previews, or
   * with extensions that strip referrers. On a real web address (GitHub Pages,
   * Netlify, localhost) we send the referrer + origin and the player works.
   * Where embedding can't work, Play opens the video on YouTube instead.
   */
  var CAN_EMBED = /^https?:$/.test(location.protocol) && location.origin && location.origin !== 'null';

  function embedUrl(v) {
    var p = 'autoplay=1&rel=0&playsinline=1&hl=' + lang + '&cc_lang_pref=' + lang +
      '&enablejsapi=0&origin=' + encodeURIComponent(location.origin) +
      '&widget_referrer=' + encodeURIComponent(location.href.split('#')[0]);
    if (v.start) p += '&start=' + v.start;
    return 'https://www.youtube-nocookie.com/embed/' + v.id + '?' + p;
  }
  function watchUrl(v) { return 'https://www.youtube.com/watch?v=' + v.id + (v.start ? '&t=' + v.start + 's' : ''); }

  /**
   * Fills a .video-slot with either a click-to-load player (no YouTube
   * request until the visitor presses play) or a friendly "Coming soon".
   */
  function buildVideoSlot(slot, video, soonKeys) {
    var v = parseYouTube(video && L(video.url));
    slot.innerHTML = '';
    if (!v) {
      var soon = el('div', { class: 'video-soon' },
        '<span class="sprite" data-sprite="mariner9" data-asset="mariner9" aria-hidden="true"></span>' +
        '<p class="video-soon__title" data-i18n="' + soonKeys[0] + '"></p>' +
        '<p class="video-soon__text" data-i18n="' + soonKeys[1] + '"></p>');
      slot.appendChild(soon);
      return null;
    }
    var poster = OPTS.youtubeThumbnails === false
      ? '<span class="video-facade__poster"><span class="sprite" data-sprite="mariner9" data-asset="mariner9" aria-hidden="true"></span></span>'
      : '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">';
    var btn = el('button', { type: 'button', class: 'video-facade' },
      poster + '<span class="video-facade__play" aria-hidden="true"><span data-i18n="video.play"></span></span>');
    slot.appendChild(btn);
    // If the thumbnail can't load (offline, blocked), fall back to the pixel poster
    var thumb = btn.querySelector('img');
    if (thumb) thumb.addEventListener('error', function () {
      var p = el('span', { class: 'video-facade__poster' }, '<span class="sprite" data-sprite="mariner9" data-asset="mariner9" aria-hidden="true"></span>');
      btn.replaceChild(p, thumb);
      renderSprites(p);
    });

    btn.setAttribute('aria-label', t('a11y.playVideo', { title: L(video.title) }));

    btn.addEventListener('click', function () {
      if (!CAN_EMBED) { // opened as a local file: YouTube would show Error 153, so open it on YouTube
        window.open(watchUrl(v), '_blank', 'noopener');
        return;
      }
      var iframe = el('iframe', {
        src: embedUrl(v),
        title: L(video.title) + ' (YouTube)',
        loading: 'lazy',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        referrerpolicy: 'strict-origin-when-cross-origin',
        allowfullscreen: true
      });
      slot.replaceChild(iframe, btn);
      iframe.focus();
    });
    return v;
  }

  /**
   * Keeps a video slot in sync with the current language: each language can
   * have its own YouTube link (url: { en: "...", es: "..." }).
   */
  function mountVideo(slot, actions, video, soonKeys, linkClass) {
    video = video || {};
    var shown = null; // the link currently rendered
    onLang(function () {
      var url = L(video.url);
      if (url !== shown) {
        shown = url;
        var v = buildVideoSlot(slot, video, soonKeys);
        if (actions) {
          actions.innerHTML = '';
          if (v) actions.appendChild(youTubeLink(v, linkClass));
          translateTree(actions);
        }
        translateTree(slot);
      } else {
        var title = L(video.title);
        var iframe = slot.querySelector('iframe');
        if (iframe) iframe.title = title + ' (YouTube)';
        var btn = slot.querySelector('.video-facade');
        if (btn) btn.setAttribute('aria-label', t('a11y.playVideo', { title: title }));
      }
    });
  }

  function youTubeLink(v, className) {
    return el('a', { class: className, href: watchUrl(v), target: '_blank', rel: 'noopener noreferrer' },
      '<span data-i18n="video.open"></span> <span class="sr-only" data-i18n="a11y.newTab"></span>');
  }

  /* ---------- 3. PIXEL SPRITES ---------- */

  // Characters & their built-in sprites (palette swaps make twins distinct).
  // 🎨 To use your own PNG for a character, DON'T edit this list:
  //    set config.js → assets.<id> (e.g. assets.viking1 = "assets/img/characters/viking1.png").
  var CHARACTERS = [
    { id: 'cass',        sprite: 'cass',      hero: true },
    { id: 'mariner9',    sprite: 'mariner9',  hero: true },
    { id: 'viking1',     sprite: 'viking',    pal: { a: '#ff9a3c' } },
    { id: 'viking2',     sprite: 'viking',    pal: { a: '#4fe3ff', y: '#b48cff' } },
    { id: 'spirit',      sprite: 'rover',     pal: { a: '#4fe3ff' } },
    { id: 'opportunity', sprite: 'rover',     pal: { a: '#ff9a3c', b: '#3b3fa6', B: '#8a8ff0' } },
    { id: 'maven',       sprite: 'maven' },
    { id: 'sojourner',   sprite: 'sojourner' }
  ];

  /** Build a crisp SVG from a sprite map (horizontal runs merged into rects). */
  function spriteSVG(name, palOverride) {
    var s = SPRITES[name];
    if (!s) return '';
    var pal = Object.assign({}, s.pal, palOverride || {});
    var w = s.rows[0].length, h = s.rows.length, out = '';
    for (var y = 0; y < h; y++) {
      var row = s.rows[y], x = 0;
      while (x < w) {
        var ch = row[x], x2 = x + 1;
        while (x2 < w && row[x2] === ch) x2++;
        if (ch !== '.') out += '<rect x="' + x + '" y="' + y + '" width="' + (x2 - x) + '" height="1.02" fill="' + pal[ch] + '"/>';
        x = x2;
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h +
      '" shape-rendering="crispEdges" focusable="false" aria-hidden="true">' + out + '</svg>';
  }

  function spriteSize(name) {
    var s = SPRITES[name];
    return s ? { w: s.rows[0].length, h: s.rows.length } : { w: 16, h: 16 };
  }

  /** Render every [data-sprite] element: your own image if set in config, otherwise built-in pixel art. */
  function renderSprites(root) {
    $$('[data-sprite]', root).forEach(function (node) {
      if (node.dataset.rendered) return;
      var custom = node.dataset.asset && ASSETS[node.dataset.asset];
      if (custom && !isPlaceholder(custom)) {
        node.innerHTML = '<img src="' + escapeHtml(custom) + '" alt="" decoding="async">';
        node.classList.add('is-custom');
        // Once loaded, scale your PNG by a whole number so pixels stay square and crisp
        (function (n, img) {
          function size() {
            n.style.setProperty('--native-w', img.naturalWidth);
            if (n.dataset.fit) {
              var box = n.dataset.fit.split('x').map(Number);
              var px = Math.max(1, Math.min(6, Math.floor(Math.min(box[0] / img.naturalWidth, box[1] / img.naturalHeight))));
              n.style.width = (img.naturalWidth * px) + 'px';
            }
          }
          if (img.complete && img.naturalWidth) size(); else img.addEventListener('load', size);
        })(node, node.firstChild);
        node.dataset.rendered = '1';
        return;
      } else {
        var pal = node.dataset.pal ? JSON.parse(node.dataset.pal) : null;
        node.innerHTML = spriteSVG(node.dataset.sprite, pal);
      }
      // optional integer pixel scale that fits a box: data-fit="160x132"
      if (node.dataset.fit) {
        var box = node.dataset.fit.split('x').map(Number);
        var sz = spriteSize(node.dataset.sprite);
        var px = Math.max(1, Math.min(6, Math.floor(Math.min(box[0] / sz.w, box[1] / sz.h))));
        node.style.width = (sz.w * px) + 'px';
      }
      node.dataset.rendered = '1';
    });
  }

  function constellationSVG() {
    // Team logo: the five coloured stars of Cassiopeia, joined by a dashed line
    var pts = [[12, 14, '#33ccff'], [38, 54, '#ff4a4a'], [70, 54, '#ff8a3d'], [86, 88, '#9b7bff'], [114, 68, '#5cff3a']];
    function star(cx, cy, r, fill) {
      var p = [];
      for (var i = 0; i < 10; i++) {
        var a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
        p.push((cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr).toFixed(1));
      }
      return '<polygon points="' + p.join(' ') + '" fill="' + fill + '"/>';
    }
    var line = pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
    return '<svg viewBox="0 0 128 100" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">' +
      '<polyline points="' + line + '" fill="none" stroke="#cfd8f5" stroke-width="3" stroke-dasharray="5 5" opacity=".75"/>' +
      pts.map(function (p) { return star(p[0], p[1], 12, p[2]); }).join('') + '</svg>';
  }

  /* ---------- 4. PIXEL MARS ---------- */
  var marsList = [];

  function createMars(container) {
    var custom = ASSETS.mars;
    if (custom && !isPlaceholder(custom)) {
      container.innerHTML = '<img src="' + escapeHtml(custom) + '" alt="" decoding="async">';
      return;
    }
    var N = container.dataset.mars === 'small' ? 40 : 64;
    var canvas = el('canvas', { width: N, height: N, 'aria-hidden': 'true' });
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var img = ctx.createImageData(N, N);
    var R = N / 2 - 1.5, c = (N - 1) / 2;
    // Fixed craters: [longitude, latitude, radius] in radians
    var craters = [[0.3, 0.4, 0.28], [1.6, -0.2, 0.36], [2.7, 0.55, 0.22], [3.6, -0.5, 0.3], [4.6, 0.1, 0.42], [5.5, -0.75, 0.2], [1.0, -0.8, 0.18], [4.0, 0.9, 0.16]];
    var tones = ['#3b1619', '#5e2420', '#8a3527', '#b04c2e', '#d26b3c', '#ec9563', '#f7c39a'].map(hexToRgb);
    var cap = [[226, 200, 196], [246, 232, 226]];
    var bayer = [[-0.05, 0.02], [0.04, -0.02]];

    function draw(rot) {
      var d = img.data;
      for (var y = 0; y < N; y++) {
        for (var x = 0; x < N; x++) {
          var i = (y * N + x) * 4;
          var dx = (x - c) / R, dy = (y - c) / R, d2 = dx * dx + dy * dy;
          if (d2 > 1) { d[i + 3] = 0; continue; }
          var nz = Math.sqrt(1 - d2);
          var lat = Math.asin(-dy);
          var lon = Math.atan2(dx, nz) + rot;
          // light from upper-left, posterised with 2x2 dithering
          var light = (-dx * 0.55 + -dy * 0.35 + nz * 0.76) + bayer[y % 2][x % 2];
          var tone = light > 0.78 ? 4 : light > 0.5 ? 3 : light > 0.22 ? 2 : light > -0.05 ? 1 : 0;
          // darker "maria" regions
          var band = Math.sin(lat * 4 + Math.sin(lon * 2) * 1.1) + 0.7 * Math.sin(lon * 3 + lat * 2);
          if (band > 0.9) tone -= 1;
          // craters: dark floor + bright rim
          for (var k = 0; k < craters.length; k++) {
            var cr = craters[k];
            var cosd = Math.sin(lat) * Math.sin(cr[1]) + Math.cos(lat) * Math.cos(cr[1]) * Math.cos(lon - cr[0]);
            var dist = Math.acos(Math.max(-1, Math.min(1, cosd)));
            if (dist < cr[2] * 0.62) { tone -= 1; break; }
            if (dist < cr[2]) { tone += 1; break; }
          }
          var col;
          if (Math.abs(lat) > 1.22) col = cap[light > 0.3 ? 1 : 0];
          else col = tones[Math.max(0, Math.min(tones.length - 1, tone + 1))];
          // dark rim outline
          if (d2 > 0.93) col = tones[0];
          d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    }

    var mars = { rot: 0, draw: draw, visible: true };
    draw(0);
    marsList.push(mars);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { mars.visible = entries[0].isIntersecting; }).observe(container);
    }
  }

  function hexToRgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }

  var marsTimer = null;
  function startMarsSpin() {
    clearInterval(marsTimer);
    if (reduceMotion || !marsList.length) return;
    marsTimer = setInterval(function () {
      if (document.hidden) return;
      marsList.forEach(function (m) { if (m.visible) { m.rot += 0.025; m.draw(m.rot); } });
    }, 110); // ~9 fps: deliberately "pixel-animation" choppy and very cheap
  }

  /* ---------- 5. STARFIELD ---------- */
  var starfield = (function () {
    var canvas = $('#starfield');
    var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    var W = 0, H = 0, layers = [], raf = null, last = 0, shooting = null, nextShoot = 0;
    var COLORS = ['#ffffff', '#d5ecff', '#ffe7b8', '#cdbbff', '#9ff0ff'];

    function rand(a, b) { return a + Math.random() * (b - a); }

    function build() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      var area = W * H, total = Math.min(260, Math.round(area / 5200));
      var defs = [{ share: .6, speed: .04, size: 1 }, { share: .3, speed: .1, size: 2 }, { share: .1, speed: .2, size: 3 }];
      layers = defs.map(function (d) {
        var stars = [];
        for (var i = 0; i < Math.round(total * d.share); i++) {
          stars.push({ x: Math.floor(rand(0, W)), y: rand(0, H), c: COLORS[Math.floor(rand(0, COLORS.length))], f: rand(.6, 2.2), p: rand(0, 6.28) });
        }
        return { speed: d.speed, size: d.size, stars: stars };
      });
    }

    function draw(time) {
      ctx.clearRect(0, 0, W, H);
      var sy = window.scrollY || 0, ts = time / 1000;
      layers.forEach(function (layer) {
        layer.stars.forEach(function (s) {
          var y = Math.floor(((s.y - sy * (reduceMotion ? 0 : layer.speed)) % H + H) % H);
          ctx.globalAlpha = reduceMotion ? .85 : .45 + .55 * Math.abs(Math.sin(ts * s.f + s.p));
          ctx.fillStyle = s.c;
          if (layer.size === 3) { // little "plus" sparkle
            ctx.fillRect(s.x - 1, y, 3, 1); ctx.fillRect(s.x, y - 1, 1, 3);
          } else {
            ctx.fillRect(s.x, y, layer.size, layer.size);
          }
        });
      });
      // occasional pixel shooting star
      if (!reduceMotion) {
        if (!shooting && time > nextShoot) {
          shooting = { x: rand(W * .2, W), y: rand(0, H * .4), life: 0 };
          nextShoot = time + rand(6000, 14000);
        }
        if (shooting) {
          shooting.life += 1;
          for (var i = 0; i < 10; i++) {
            ctx.globalAlpha = (1 - i / 10) * (1 - shooting.life / 40);
            ctx.fillStyle = i < 2 ? '#ffffff' : '#9ff0ff';
            ctx.fillRect(Math.floor(shooting.x - shooting.life * 6 + i * 4), Math.floor(shooting.y + shooting.life * 3 - i * 2), 2, 2);
          }
          if (shooting.life > 40) shooting = null;
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(time) {
      raf = requestAnimationFrame(loop);
      if (time - last < 33) return; // ~30 fps is plenty for twinkling
      last = time;
      draw(time);
    }

    function start() {
      if (!ctx) return;
      cancelAnimationFrame(raf);
      build();
      if (reduceMotion) { draw(0); return; }
      nextShoot = performance.now() + 4000;
      raf = requestAnimationFrame(loop);
    }

    var resizeTimer;
    window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(start, 200); });
    document.addEventListener('visibilitychange', function () {
      if (!ctx || reduceMotion) return;
      if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop);
    });
    return { start: start };
  })();

  /* ---------- 6. COMPONENTS FROM CONFIG ---------- */

  function buildStoryVideo() {
    var slot = $('[data-video="story"]');
    var actions = $('[data-video-actions="story"]');
    if (!slot) return;
    mountVideo(slot, actions, CFG.storyVideo, ['video.soonTitle', 'video.soonText'], 'pixel-btn pixel-btn--cyan');
  }

  function buildGame() {
    var cta = $('[data-game-cta]');
    if (!cta) return;
    var url = CFG.gameUrl;
    var ok = !isPlaceholder(url) && /^https?:\/\//i.test(url.trim());
    if (ok) {
      cta.innerHTML = '';
      cta.appendChild(el('a', { class: 'play-btn', href: url.trim(), target: '_blank', rel: 'noopener noreferrer' },
        '<span data-i18n="game.play"></span><span class="sr-only"> <span data-i18n="a11y.newTab"></span></span>'));
      cta.appendChild(el('p', { class: 'game-card__note', 'data-i18n': 'game.note' }));
    } else {
      cta.innerHTML = '<span class="play-btn" aria-disabled="true"><span data-i18n="game.soon"></span></span>' +
        '<p class="game-card__note" data-i18n="game.soonNote"></p>';
    }
    // Gameplay video (YouTube) inside the game card
    var slot = $('[data-video="game"]');
    var actions = $('[data-video-actions="game"]');
    if (slot) mountVideo(slot, actions, CFG.gameVideo, ['game.videoSoonTitle', 'game.videoSoonText'], 'pixel-btn pixel-btn--cyan');
  }

  /** Accessibility section: card 1 = sign-language video (YouTube), card 2 = braille (PDF).
      Each language has its own video and its own PDF (url: { en: "...", es: "..." }). */
  function buildAccessibility() {
    var grid = $('[data-access-grid]');
    if (!grid) return;
    var acc = CFG.accessibility || {};

    // --- Card 1: sign language video ---
    var video = acc.signVideo || {};
    var li = el('li', { class: 'sign-card arcade-panel' });
    var slot = el('div', { class: 'video-slot video-slot--card' });
    li.appendChild(slot);
    var body = el('div', { class: 'sign-card__body' });
    var tag = el('p', { class: 'lang-tag' }, '<span class="lang-tag__code"></span><span class="lang-tag__name"></span>');
    var title = el('h3', { class: 'sign-card__title' });
    var linkBox = el('div', { class: 'sign-card__link' });
    body.appendChild(el('p', { class: 'access-kind', 'data-i18n': 'sign.signTag' }));
    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(linkBox);
    li.appendChild(body);
    grid.appendChild(li);
    mountVideo(slot, linkBox, video, ['sign.soonTitle', 'sign.soonText'], '');
    onLang(function () {
      var lg = video.language || {};
      var name = L(lg.name || lg);
      title.textContent = L(video.title);
      tag.querySelector('.lang-tag__code').textContent = L(lg.code);
      tag.querySelector('.lang-tag__name').textContent = name;
      tag.setAttribute('aria-label', t('sign.langLabel') + ': ' + name);
    });

    // --- Card 2: braille PDF ---
    var pdf = acc.braillePdf || {};
    var li2 = el('li', { class: 'sign-card arcade-panel' });
    var cover = el('div', { class: 'video-slot video-slot--card braille-cover', role: 'img' });
    li2.appendChild(cover);
    var body2 = el('div', { class: 'sign-card__body' });
    body2.appendChild(el('p', { class: 'access-kind', 'data-i18n': 'sign.brailleTag' }));
    body2.appendChild(el('p', { class: 'lang-tag lang-tag--braille' }, '<span class="lang-tag__code">PDF</span><span class="lang-tag__name" data-i18n="sign.brailleFormat"></span>'));
    var title2 = el('h3', { class: 'sign-card__title' });
    body2.appendChild(title2);
    body2.appendChild(el('p', { class: 'sign-card__text', 'data-i18n': 'sign.brailleText' }));
    var pdfActions = el('div', { class: 'pdf-actions' });
    body2.appendChild(pdfActions);
    li2.appendChild(body2);
    grid.appendChild(li2);
    onLang(function () {
      var url = L(pdf.url);
      var hasPdf = !isPlaceholder(url);
      title2.textContent = L(pdf.title);
      cover.setAttribute('aria-label', t('a11y.brailleArt'));
      // Optional own cover image: config.js → accessibility.braillePdf.image (commented out there for now)
      var coverImg = L(pdf.image);
      var hasImg = coverImg && !isPlaceholder(coverImg);
      cover.classList.toggle('has-image', !!hasImg);
      cover.innerHTML = (hasImg
          ? '<img class="braille-cover__img" src="' + escapeHtml(coverImg) + '" alt="" decoding="async">'
          : '<span class="braille-cover__dots" aria-hidden="true">' + (lang === 'es' ? '⠍⠁⠗⠞⠑' : '⠍⠁⠗⠎') + '</span>') +
        (hasPdf ? '' : '<p class="video-soon__title" data-i18n="sign.pdfSoonTitle"></p><p class="video-soon__text" data-i18n="sign.pdfSoonText"></p>');
      var imgAlt = L(pdf.imageAlt);
      cover.setAttribute('aria-label', hasImg && imgAlt ? imgAlt : t('a11y.brailleArt'));
      pdfActions.innerHTML = '';
      pdfActions.hidden = !hasPdf;
      if (hasPdf) {
        pdfActions.appendChild(el('a', { class: 'pixel-btn pixel-btn--cyan', href: url.trim(), target: '_blank', rel: 'noopener noreferrer' },
          '<span data-i18n="sign.openPdf"></span><span class="sr-only"> <span data-i18n="a11y.newTab"></span></span>'));
        pdfActions.appendChild(el('a', { class: 'pixel-btn', href: url.trim(), download: true },
          '<span data-i18n="sign.downloadPdf"></span>'));
      }
      translateTree(cover);
      translateTree(pdfActions);
    });
  }

  function buildCharacters() {
    var grid = $('[data-char-grid]');
    if (!grid) return;
    CHARACTERS.forEach(function (ch) {
      var li = el('li', { class: 'char-card arcade-panel' + (ch.hero ? ' char-card--hero' : '') });
      li.innerHTML =
        '<div class="char-card__scan">' +
          '<span class="char-card__tag" data-i18n="story.chars.' + ch.id + '.tag"></span>' +
          '<span class="sprite" role="img" data-sprite="' + ch.sprite + '" data-asset="' + ch.id + '" data-fit="160x172"' +
            (ch.pal ? " data-pal='" + JSON.stringify(ch.pal) + "'" : '') + '></span>' +
        '</div>' +
        '<div class="char-card__body">' +
          '<h4 class="char-card__name" data-i18n="story.names.' + ch.id + '"></h4>' +
          '<p class="char-card__line" data-i18n="story.chars.' + ch.id + '.line"></p>' +
        '</div>';
      grid.appendChild(li);
      var art = li.querySelector('.sprite');
      onLang(function () { art.setAttribute('aria-label', t('a11y.pixelArtOf', { name: t('story.names.' + ch.id) })); });
    });
  }

  /** "Who we are": a YouTube video (one per language), shown in a big screen frame. */
  function buildTeamVideo() {
    var slot = $('[data-video="team"]');
    if (!slot) return;
    mountVideo(slot, $('[data-video-actions="team"]'), CFG.teamVideo, ['team.videoSoonTitle', 'team.videoSoonText'], 'pixel-btn pixel-btn--cyan');
  }

  /* ---------- 7. LANGUAGE ---------- */

  /** Fill every data-i18n element inside root (and draw any sprites in it). */
  function translateTree(root) {
    $$('[data-i18n]', root).forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      var text = t(key);
      // A key missing in config.js hides its element (and warns in the console) instead of showing "section.key"
      var missing = text === key;
      node.hidden = missing;
      if (missing && window.console) console.warn('Missing text in config.js:', key);
      node.textContent = missing ? '' : text;
    });
    if (root !== document) renderSprites(root);
  }

  function setMeta(selector, value) {
    var m = document.querySelector(selector);
    if (m) m.setAttribute('content', value);
  }

  function applyLanguage() {
    document.documentElement.lang = lang;

    translateTree(document);
    $$('[data-i18n-attr]').forEach(function (node) {
      node.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
    $$('[data-config]').forEach(function (node) { node.textContent = getPath(CFG, node.getAttribute('data-config')) || ''; });

    // <title>, description and social previews
    document.title = t('meta.title');
    setMeta('meta[name="description"]', t('meta.description'));
    setMeta('meta[property="og:title"]', t('meta.title'));
    setMeta('meta[property="og:description"]', t('meta.description'));
    setMeta('meta[property="og:locale"]', lang === 'es' ? 'es_LA' : 'en_US');
    setMeta('meta[property="og:locale:alternate"]', lang === 'es' ? 'en_US' : 'es_LA');

    $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    updateNavToggleLabel();
    langUpdaters.forEach(function (fn) { fn(); });
    typewriter();
  }

  function setLanguage(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    lang = next;
    store.set(LANG_KEY, lang);
    applyLanguage();
  }

  function applySiteUrl() {
    var url = CFG.siteUrl;
    if (isPlaceholder(url)) return;
    var base = url.trim();
    var canon = $('link[rel="canonical"]'); if (canon) canon.href = base;
    $$('link[rel="alternate"][hreflang]').forEach(function (l) {
      var h = l.getAttribute('hreflang');
      l.href = h === 'x-default' ? base : base + (base.indexOf('?') > -1 ? '&' : '?') + 'lang=' + h;
    });
    setMeta('meta[property="og:url"]', base);
    try { setMeta('meta[property="og:image"]', new URL('assets/img/og-image.png', base).href); } catch (e) { /* ignore */ }
  }

  /* ---------- 8. NAVIGATION ---------- */
  var navToggle = $('.nav-toggle');
  var nav = $('#site-nav');

  function updateNavToggleLabel() {
    if (!navToggle) return;
    var open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
  }
  function setNav(open, focusToggle) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    updateNavToggleLabel();
    if (!open && focusToggle) navToggle.focus();
  }

  function initNav() {
    if (!navToggle || !nav) return;
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false, true);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) setNav(false);
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) setNav(false); });

    // Scroll spy: mark the section currently on screen
    var links = $$('a', nav);
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) spy.observe(s); });
    }
  }

  // Arcade menu: hover/focus moves the selection bar; ↑ ↓ Home End move; Enter or Z selects
  function initArcadeMenu() {
    var menu = $('[data-arcade-menu]');
    if (!menu) return;
    var items = $$('.arcade-menu__item', menu);
    function select(item) { items.forEach(function (i) { i.classList.toggle('is-selected', i === item); }); }
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () { select(item); });
      item.addEventListener('focus', function () { select(item); });
    });
    menu.addEventListener('keydown', function (e) {
      var idx = items.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = null;
      if (e.key === 'ArrowDown') next = items[(idx + 1) % items.length];
      else if (e.key === 'ArrowUp') next = items[(idx - 1 + items.length) % items.length];
      else if (e.key === 'Home') next = items[0];
      else if (e.key === 'End') next = items[items.length - 1];
      else if (e.key === 'z' || e.key === 'Z') { e.preventDefault(); items[idx].click(); return; }
      if (next) { e.preventDefault(); next.focus(); }
    });
  }

  /* ---------- 9. INTRO, TYPEWRITER, TOAST, EASTER EGG ---------- */

  function initIntro() {
    var intro = $('#intro');
    if (!intro || OPTS.showIntro === false || reduceMotion || session.get('m9-intro')) return;
    session.set('m9-intro', '1');
    intro.hidden = false;
    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      intro.classList.add('is-leaving');
      setTimeout(function () { intro.hidden = true; }, 500);
      window.removeEventListener('keydown', close, true);
    }
    // Any key closes it (and the key still works normally — e.g. Tab moves focus)
    window.addEventListener('keydown', close, true);
    intro.addEventListener('pointerdown', close);
    setTimeout(close, 3800);
  }

  var typeTimer = null;
  function typewriter() {
    var node = $('.typewriter');
    if (!node) return;
    var text = t(node.dataset.type);
    clearTimeout(typeTimer);
    if (reduceMotion) { node.textContent = text; return; }
    node.textContent = '';
    var i = 0;
    (function step() {
      node.textContent = text.slice(0, ++i);
      if (i < text.length) typeTimer = setTimeout(step, 55);
    })();
  }

  var toastTimer = null;
  function toast(msg) {
    var box = $('.toast');
    if (!box) return;
    box.textContent = msg;
    requestAnimationFrame(function () { box.classList.add('is-visible'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      box.classList.remove('is-visible');
      setTimeout(function () { box.textContent = ''; }, 400);
    }, 5500);
  }

  function initEasterEgg() {
    if (OPTS.easterEgg === false) return;
    var code = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    var pos = 0;
    window.addEventListener('keydown', function (e) {
      var k = (e.key || '').toLowerCase();
      pos = (k === code[pos]) ? pos + 1 : (k === code[0] ? 1 : 0);
      if (pos === code.length) { pos = 0; launchMariner(); }
    });
  }

  function launchMariner() {
    if (!reduceMotion) {
      var layer = $('.egg-layer');
      var flyer = el('span', { class: 'sprite egg-flyer', 'data-sprite': 'mariner9', 'data-asset': 'mariner9' });
      layer.appendChild(flyer);
      renderSprites(layer);
      setTimeout(function () { flyer.remove(); }, 3800);
    }
    toast(t('egg.toast'));
  }

  /* ---------- 10. BOOT ---------- */
  function boot() {
    $$('[data-logo]').forEach(function (n) { n.innerHTML = constellationSVG(); });

    buildStoryVideo();
    buildGame();
    buildAccessibility();
    buildCharacters();
    buildTeamVideo();

    renderSprites(document);
    $$('[data-mars]').forEach(createMars);

    $$('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { setLanguage(b.dataset.lang); });
    });

    applySiteUrl();
    applyLanguage();
    initNav();
    initArcadeMenu();
    initIntro();
    initEasterEgg();
    starfield.start();
    startMarsSpin();

    if (motionQuery && motionQuery.addEventListener) {
      motionQuery.addEventListener('change', function (e) {
        reduceMotion = e.matches;
        starfield.start();
        startMarsSpin();
        typewriter();
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
