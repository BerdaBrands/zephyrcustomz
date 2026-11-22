/* Zephyr Customz - site behaviour. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var PHOTO_BASE = 'assets/images/projects/';
  var VIDEO_BASE = 'assets/videos/';
  var PROJECTS = {
    'mercedes-gle': {
      title: 'Mercedes-Benz GLE',
      alts: [
        'Front of a black Mercedes-Benz GLE in the studio',
        'Black Mercedes-Benz GLE front three-quarter view with studio lighting reflected in the paint',
        'Black Mercedes-Benz GLE parked in the studio bay',
        'Side of a black Mercedes-Benz GLE reflecting hexagon lights'
      ]
    },
    'audi-tt': {
      title: 'Audi TT',
      alts: [
        'Front of a white Audi TT in the studio',
        'White Audi TT front three-quarter view in the studio bay',
        'White Audi TT with illuminated headlights in the studio',
        'White Audi TT parked in the studio bay'
      ]
    },
    'paint-correction': {
      title: 'Paint Correction',
      alts: [
        'Dual-action polisher with a blue pad on a black door'
      ]
    },
    'ceramic-coating': {
      title: 'Ceramic Coating',
      alts: [
        'Coating poured onto an applicator and wiped across glossy black paint'
      ]
    },
    'ppf-install': {
      title: 'PPF Installation',
      alts: [
        'Paint protection film squeegeed onto a green bumper'
      ]
    },
    'mercedes-amg': {
      title: 'Mercedes-AMG',
      alts: [
        'Studio hexagon lights reflecting in black paint'
      ]
        },
    'red-corvette': {
      title: 'Red Corvette',
      alts: [
        'Red Corvette seen from the front',
        'Red Corvette, front three-quarter view',
        'Red Corvette, front three-quarter view from the other side'
      ]
    },
    'white-chevrolet': {
      title: 'White Chevrolet',
      alts: [
        'White Chevrolet SUV facing the camera in the studio bay',
        'White Chevrolet SUV, front three-quarter view in the studio',
        'White Chevrolet SUV with a film sheet laid on the hood',
        'Technician working on the door of the white Chevrolet'
      ]
    },
    'toyota-sedan': {
      title: 'Toyota Sedan',
      alts: [
        'Rear of a gray Toyota sedan with a spoiler under the hexagon lights',
        'Gray Toyota sedan, rear three-quarter view in the studio'
      ]
    },
    'black-sedan': {
      title: 'Black Sedan',
      alts: [
        'Black sedan at the studio doorway'
      ]
    }
  };

  var PROJECT_INFO = {
    'mercedes-gle': {
      tag: 'Studio photos',
      desc: 'A black Mercedes-Benz GLE in the Zephyr Customz studio bay, photographed from the front and the side.',
      chips: []
    },
    'audi-tt': {
      tag: 'Studio photos',
      desc: 'A white Audi TT parked in the Zephyr Customz studio bay.',
      chips: []
    },
    'paint-correction': {
      tag: 'Paint Correction',
      media: 'video',
      desc: 'Machine polishing on black paint in the studio. Polishing levels out surface marks and brings the gloss back before protection goes on.',
      chips: ['Machine Polish', 'Paint Correction']
    },
    'ceramic-coating': {
      tag: 'Ceramic Coating',
      media: 'video',
      desc: 'Ceramic coating poured onto an applicator and worked into glossy black paint by hand.',
      chips: ['Ceramic Coating', 'Hand Applied']
    },
    'ppf-install': {
      tag: 'Paint Protection Film',
      media: 'video',
      desc: 'Clear paint protection film going onto a green bumper. The film is laid wet, steamed, squeegeed down and worked around the edges by hand.',
      chips: ['PPF Install', 'Hand Squeegee']
    },
    'mercedes-amg': {
      tag: 'Studio video',
      media: 'video',
      desc: 'A black Mercedes-AMG in the studio, with the hexagon lights reflecting in the paint.',
      chips: []
        },
    'red-corvette': {
      tag: 'Photos',
      desc: 'A red Corvette photographed from three angles.',
      chips: []
    },
    'white-chevrolet': {
      tag: 'Studio photos',
      desc: 'A white Chevrolet SUV in the studio bay, from the front and the side, with film work in progress.',
      chips: []
    },
    'toyota-sedan': {
      tag: 'Studio photos',
      desc: 'A gray Toyota sedan with a rear spoiler, under the studio hexagon lights.',
      chips: []
    },
    'black-sedan': {
      tag: 'Studio photos',
      desc: 'A black sedan at the studio doorway.',
      chips: []
    }
  };

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero background video ---------- */
  var heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    var saveData = navigator.connection && navigator.connection.saveData;
    if (window.matchMedia('(max-width: 47.99em)').matches) {
      heroVideo.poster = 'assets/video/hero-sm.jpg';
      heroVideo.src = 'assets/video/hero-sm.mp4';
    }
    if (reduceMotion || saveData) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    } else {
      var playHero = function () {
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function () {});
      };
      playHero();
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) playHero();
          else heroVideo.pause();
        }, { threshold: 0 }).observe(heroVideo);
      }
    }
  }

  /* ---------- Land on the right section when arriving with a #hash ---------- */
  function scrollToHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    var target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  if (window.location.hash) {
    window.addEventListener('load', function () {
      scrollToHash();
      window.setTimeout(scrollToHash, 500);
    });
  }

  /* ---------- Nav: mobile menu + shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('site-nav');
  var desktopMq = window.matchMedia('(min-width: 64em)');

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(e.target)) setMenu(false);
    });
    desktopMq.addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  /* ---------- Process: line fills step by step while scrolling ---------- */
  var stepsEl = document.getElementById('steps');
  var stepEls = stepsEl ? stepsEl.querySelectorAll('.step') : [];

  function updateSteps() {
    if (!stepEls.length) return;
    var vh = window.innerHeight;
    var last = -1;
    if (desktopMq.matches) {
      /* Steps sit side by side: map scroll distance to progress 0..1 */
      var top = stepsEl.getBoundingClientRect().top;
      var p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.55)));
      last = Math.ceil(p * stepEls.length) - 1;
    } else {
      stepEls.forEach(function (step, i) {
        if (step.getBoundingClientRect().top < vh * 0.65) last = i;
      });
    }
    stepEls.forEach(function (step, i) {
      step.classList.toggle('is-active', i <= last);
      step.classList.toggle('is-done', i < last);
    });
  }

  var ticking = false;
  function onScrollFrame() {
    onScroll();
    updateSteps();
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });
  window.addEventListener('resize', updateSteps);
  onScrollFrame();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Chat widget: contact and quote buttons open it ---------- */
  function chatApi() {
    var lc = window.leadConnector;
    return lc && lc.chatWidget && lc.chatWidget.isLoaded && typeof lc.chatWidget.openWidget === 'function' ? lc.chatWidget : null;
  }

  function openChat() {
    var api = chatApi();
    if (api) { api.openWidget(); return; }
    var done = false;
    function fallback() {
      if (done) return;
      done = true;
      window.removeEventListener('LC_chatWidgetLoaded', onLoaded);
      var contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ block: 'start' });
      else window.location.href = 'index.html#contact';
    }
    function onLoaded() {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      var ready = chatApi();
      if (ready) ready.openWidget();
    }
    var timer = window.setTimeout(fallback, 5000);
    window.addEventListener('LC_chatWidgetLoaded', onLoaded, { once: true });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-open-chat]');
    if (!btn || e.defaultPrevented) return;
    e.preventDefault();
    openChat();
  });

  /* ---------- Black Friday countdown ---------- */
  var offers = document.getElementById('offers');
  if (offers) {
    var endAt = Date.parse(offers.getAttribute('data-end'));
    var cdEls = {
      days: document.querySelector('[data-cd="days"]'),
      hours: document.querySelector('[data-cd="hours"]'),
      minutes: document.querySelector('[data-cd="minutes"]'),
      seconds: document.querySelector('[data-cd="seconds"]')
    };
    var cdTimer = null;
    var tickOffers = function () {
      var left = endAt - Date.now();
      if (isNaN(endAt) || left <= 0) {
        offers.hidden = true;
        document.querySelectorAll('[data-promo]').forEach(function (el) { el.hidden = true; });
        if (cdTimer) window.clearInterval(cdTimer);
        return;
      }
      var s = Math.floor(left / 1000);
      cdEls.days.textContent = pad(Math.floor(s / 86400));
      cdEls.hours.textContent = pad(Math.floor(s % 86400 / 3600));
      cdEls.minutes.textContent = pad(Math.floor(s % 3600 / 60));
      cdEls.seconds.textContent = pad(s % 60);
    };
    tickOffers();
    cdTimer = window.setInterval(tickOffers, 1000);
  }

  /* ---------- Gallery lightbox ---------- */
  var viewer = document.getElementById('viewer');
  var current = { slug: null, index: 0, trigger: null };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function isVideo(slug) { return PROJECT_INFO[slug].media === 'video'; }
  function mediaBase(slug) { return isVideo(slug) ? VIDEO_BASE : PHOTO_BASE; }

  function setText(id, text) { document.getElementById(id).textContent = text; }

  function showPhoto(index) {
    var project = PROJECTS[current.slug];
    var total = project.alts.length;
    var img = document.getElementById('viewer-img');
    var vid = document.getElementById('viewer-video');
    var base;
    current.index = (index + total) % total;
    base = mediaBase(current.slug) + current.slug + '/' + pad(current.index + 1);

    if (isVideo(current.slug)) {
      img.hidden = true;
      img.removeAttribute('src');
      vid.hidden = false;
      vid.poster = base + '-poster.jpg';
      vid.src = base + '.mp4';
      vid.setAttribute('aria-label', project.alts[current.index]);
      var p = vid.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      vid.pause();
      vid.hidden = true;
      vid.removeAttribute('src');
      img.hidden = false;
      img.src = base + '.jpg';
      img.alt = project.alts[current.index];
    }

    document.querySelector('.viewer__media').classList.toggle('is-single', total === 1);
    setText('viewer-count', (current.index + 1) + ' / ' + total);
    setText('viewer-caption', project.alts[current.index]);
    Array.prototype.forEach.call(document.getElementById('viewer-thumbs').children, function (li, i) {
      var active = i === current.index;
      li.firstChild.setAttribute('aria-current', active ? 'true' : 'false');
      if (active && li.scrollIntoView) li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  function buildViewer(slug) {
    var project = PROJECTS[slug];
    var info = PROJECT_INFO[slug];
    var thumbs = document.getElementById('viewer-thumbs');
    var chips = document.getElementById('viewer-chips');
    thumbs.textContent = '';
    chips.textContent = '';

    project.alts.forEach(function (alt, i) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      var im = document.createElement('img');
      btn.type = 'button';
      btn.className = 'viewer__thumb' + (isVideo(slug) ? ' viewer__thumb--video' : '');
      btn.setAttribute('aria-label', (isVideo(slug) ? 'Play clip ' : 'Show photo ') + (i + 1));
      im.src = mediaBase(slug) + slug + '/' + pad(i + 1) + '-thumb.jpg';
      im.alt = '';
      im.width = 64;
      im.height = 80;
      btn.appendChild(im);
      btn.addEventListener('click', function () { showPhoto(i); });
      li.appendChild(btn);
      thumbs.appendChild(li);
    });

    info.chips.forEach(function (label) {
      var li = document.createElement('li');
      li.textContent = label;
      chips.appendChild(li);
    });
    document.getElementById('viewer-details').hidden = !info.chips.length;

    setText('viewer-tag', info.tag);
    setText('viewer-title', project.title);
    setText('viewer-desc', info.desc);

    var book = document.getElementById('viewer-book');
    book.setAttribute('href', document.getElementById('contact') ? '#contact' : 'index.html#contact');
    var body = "Hi, I'm interested in " + project.title.toLowerCase() + '.';
    document.getElementById('viewer-text').href = 'sms:12015461137?&body=' + encodeURIComponent(body);
  }

  function stopMedia() {
    var vid = document.getElementById('viewer-video');
    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    document.getElementById('viewer-img').removeAttribute('src');
  }

  function closeViewer() {
    stopMedia();
    if (viewer.open) viewer.close();
  }

  function openProject(slug, trigger) {
    if (!PROJECTS[slug] || !viewer || typeof viewer.showModal !== 'function') return;
    current.slug = slug;
    current.trigger = trigger;
    buildViewer(slug);
    showPhoto(0);
    viewer.showModal();
  }

  if (viewer) {
    document.querySelectorAll('[data-project]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openProject(btn.getAttribute('data-project'), btn);
      });
    });
    document.getElementById('viewer-close').addEventListener('click', closeViewer);
    document.getElementById('viewer-prev').addEventListener('click', function () { showPhoto(current.index - 1); });
    document.getElementById('viewer-next').addEventListener('click', function () { showPhoto(current.index + 1); });
    document.getElementById('viewer-book').addEventListener('click', function () {
      current.trigger = null;
      closeViewer();
    });
    viewer.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showPhoto(current.index - 1);
      if (e.key === 'ArrowRight') showPhoto(current.index + 1);
    });
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer) closeViewer();
    });
    viewer.addEventListener('close', function () {
      stopMedia();
      if (current.trigger) current.trigger.focus();
    });
  }
})();
