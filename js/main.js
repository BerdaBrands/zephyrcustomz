/* Zephyr Customz - site behaviour. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  /* ==========================================================
     FORM SETTINGS - edit these two lines to go live.
     Get a free access key at https://web3forms.com (enter the
     email that should receive inquiries), then paste it below.
     ========================================================== */
  var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
  var FORM_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
  /* ======================================================== */

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
      title: 'Paint correction',
      alts: [
        'Dual-action polisher with a blue pad on a black door'
      ]
    },
    'ceramic-coating': {
      title: 'Ceramic coating',
      alts: [
        'Coating poured onto an applicator and wiped across glossy black paint'
      ]
    },
    'ppf-install': {
      title: 'PPF installation',
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
      title: 'Toyota sedan',
      alts: [
        'Rear of a gray Toyota sedan with a spoiler under the hexagon lights',
        'Gray Toyota sedan, rear three-quarter view in the studio'
      ]
    },
    'black-sedan': {
      title: 'Black sedan',
      alts: [
        'Black sedan at the studio doorway'
      ]
    }
  };

  var PROJECT_INFO = {
    'mercedes-gle': {
      tag: 'Studio photos',
      desc: 'A black Mercedes-Benz GLE in the Zephyr Customz studio bay, photographed from the front and the side.',
      chips: [],
      service: 'Not sure yet'
    },
    'audi-tt': {
      tag: 'Studio photos',
      desc: 'A white Audi TT parked in the Zephyr Customz studio bay.',
      chips: [],
      service: 'Not sure yet'
    },
    'paint-correction': {
      tag: 'Paint correction',
      media: 'video',
      desc: 'Machine polishing on black paint in the studio. Polishing levels out surface marks and brings the gloss back before protection goes on.',
      chips: ['Machine polish', 'Paint correction'],
      service: 'Paint correction (polish)'
    },
    'ceramic-coating': {
      tag: 'Ceramic coating',
      media: 'video',
      desc: 'Ceramic coating poured onto an applicator and worked into glossy black paint by hand.',
      chips: ['Ceramic coating', 'Hand applied'],
      service: 'Ceramic coating'
    },
    'ppf-install': {
      tag: 'Paint protection film',
      media: 'video',
      desc: 'Clear paint protection film going onto a green bumper. The film is laid wet, steamed, squeegeed down and worked around the edges by hand.',
      chips: ['PPF install', 'Hand squeegee'],
      service: 'Paint protection film (PPF)'
    },
    'mercedes-amg': {
      tag: 'Studio video',
      media: 'video',
      desc: 'A black Mercedes-AMG in the studio, with the hexagon lights reflecting in the paint.',
      chips: [],
      service: 'Not sure yet'
        },
    'red-corvette': {
      tag: 'Photos',
      desc: 'A red Corvette photographed from three angles.',
      chips: [],
      service: 'Not sure yet'
    },
    'white-chevrolet': {
      tag: 'Studio photos',
      desc: 'A white Chevrolet SUV in the studio bay, from the front and the side, with film work in progress.',
      chips: [],
      service: 'Not sure yet'
    },
    'toyota-sedan': {
      tag: 'Studio photos',
      desc: 'A gray Toyota sedan with a rear spoiler, under the studio hexagon lights.',
      chips: [],
      service: 'Not sure yet'
    },
    'black-sedan': {
      tag: 'Studio photos',
      desc: 'A black sedan at the studio doorway.',
      chips: [],
      service: 'Not sure yet'
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

  /* ---------- Service buttons preselect the form ---------- */
  var serviceSelect = document.getElementById('f-service');
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-service]');
    if (!trigger || !serviceSelect) return;
    var wanted = trigger.getAttribute('data-service');
    Array.prototype.forEach.call(serviceSelect.options, function (opt) {
      if (opt.value === wanted || opt.text === wanted) serviceSelect.value = opt.value || opt.text;
    });
  });

  /* ---------- Preselect service from ?service= (used by the gallery page) ---------- */
  if (serviceSelect) {
    var wantedService = new URLSearchParams(window.location.search).get('service');
    if (wantedService) {
      Array.prototype.forEach.call(serviceSelect.options, function (opt) {
        if (opt.value === wantedService || opt.text === wantedService) serviceSelect.value = opt.value || opt.text;
      });
    }
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
    book.setAttribute('data-service', info.service);
    book.setAttribute('href', document.getElementById('f-service') ? '#contact' : 'index.html?service=' + encodeURIComponent(info.service) + '#contact');
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
    document.getElementById('viewer-book').addEventListener('click', closeViewer);
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

  /* ---------- Contact form ---------- */
  var form = document.getElementById('quote-form');
  if (form) {
    var errorEl = document.getElementById('form-error');
    var successEl = document.getElementById('form-success');
    var submitBtn = document.getElementById('form-submit');
    var submitLabel = submitBtn.textContent;

    var showError = function (msg) {
      successEl.hidden = true;
      errorEl.textContent = msg;
      errorEl.hidden = false;
    };

    var markInvalid = function (input, invalid) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('has-error', invalid);
      if (invalid) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    };

    form.addEventListener('input', function (e) { markInvalid(e.target, false); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorEl.hidden = true;
      successEl.hidden = true;

      var name = form.elements.name;
      var phone = form.elements.phone;
      var email = form.elements.email;
      var service = form.elements.service;
      var vehicle = form.elements.vehicle;
      var problems = [];
      var firstBad = null;

      function flag(input, message) {
        markInvalid(input, true);
        problems.push(message);
        if (!firstBad) firstBad = input;
      }

      [name, phone, email, service, vehicle].forEach(function (input) { markInvalid(input, false); });

      if (!name.value.trim()) flag(name, 'enter your name');
      if (!phone.value.trim()) flag(phone, 'enter your phone number');
      else if (phone.value.replace(/\D/g, '').length < 10) flag(phone, 'check your phone number');
      if (!email.value.trim()) flag(email, 'enter your email');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) flag(email, 'check your email address');
      if (!service.value) flag(service, 'choose a service');
      if (!vehicle.value.trim()) flag(vehicle, 'enter your vehicle make and model');

      if (problems.length) {
        var list = problems.length > 1
          ? problems.slice(0, -1).join(', ') + ' and ' + problems[problems.length - 1]
          : problems[0];
        showError('Please ' + list + '.');
        if (firstBad) firstBad.focus();
        return;
      }

      /* Honeypot: bots tick the hidden box. Pretend success, send nothing. */
      if (form.elements.botcheck.value) {
        form.reset();
        successEl.hidden = false;
        return;
      }

      if (FORM_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        showError('The form is not connected yet. Please text or call us instead.');
        return;
      }

      var payload = {
        access_key: FORM_ACCESS_KEY,
        subject: 'New quote request from zephyrcustomz.com',
        from_name: 'Zephyr Customz website',
        name: name.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        service: service.value,
        vehicle: vehicle.value.trim(),
        details: form.elements.details.value.trim() || '(none)',
        botcheck: '',
        replyto: email.value.trim()
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            if (!res.ok || data.success === false) throw new Error(data.message || 'Request failed');
          });
        })
        .then(function () {
          form.reset();
          successEl.hidden = false;
          successEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
        })
        .catch(function () {
          showError('Sorry, something went wrong and your message was not sent. Please try again, or text or call +1 (201) 546-1137.');
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        });
    });
  }
})();
