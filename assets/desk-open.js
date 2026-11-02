/* Rediseño · Fase 3: animación de apertura de carpeta (y de la tarjeta índice) antes de navegar.
   Solo transform/opacity (más un desenfoque puntual del fondo). Con movimiento reducido o clic con
   modificadores se navega sin animar. Cualquier tecla o clic durante la animación salta a la página. */
(function () {
  var desk = document.querySelector('.desk');
  var K = .5; // multiplicador global de duraciones (1 = original)
  var setTimeout = function (f, ms) { return window.setTimeout(f, ms * K); };
  if (!desk) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var running = false, timers = [], href = null;
  var PAPER = 'cubic-bezier(.65,0,.2,1)', POP = 'cubic-bezier(.34,1.56,.64,1)', SPRING = 'cubic-bezier(.3,1.18,.4,1)', LID = 'cubic-bezier(.55,.05,.25,1)', EASE = 'cubic-bezier(.22,.8,.22,1)';

  function go() { if (href) location.href = href; }
  function skip() { if (running) { timers.forEach(clearTimeout); go(); } }
  function anim(el, frames, opts) { opts.fill = 'forwards'; opts.duration *= K; if (opts.delay) opts.delay *= K; return el.animate(frames, opts); }
  function rectT(r, vw, vh) { return 'translate(' + r.left + 'px,' + r.top + 'px) scale(' + (r.width / vw) + ',' + (r.height / vh) + ')'; }

  function makeDoc(r, color, label, name) {
    var d = document.createElement('div');
    d.className = 'dk-doc';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<span class="dk-doc-strip" style="background:' + color + '"></span><div class="dk-doc-in"><span class="mono">' + label + '</span><b>' + name + '</b></div>';
    d.style.transform = rectT(r, innerWidth, innerHeight);
    d.style.opacity = '0';
    document.body.appendChild(d);
    return d;
  }

  function openDoc(doc, r, tExtract, onEnd) {
    var vw = innerWidth, vh = innerHeight, t = 0;
    var up = { left: r.left, top: r.top - r.height * tExtract, width: r.width, height: r.height };
    var big = { left: r.left - r.width * .035, top: up.top - r.height * .035, width: r.width * 1.07, height: r.height * 1.07 };
    sfx('paper', .6, .26);
    anim(doc, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE });
    timers.push(setTimeout(function () {
      anim(doc, [{ transform: rectT(r, vw, vh) }, { transform: rectT(up, vw, vh) }], { duration: 720, easing: PAPER });
    }, 300));
    timers.push(setTimeout(function () {
      doc.style.boxShadow = '0 3px 4px rgba(25,18,8,.16),18px 36px 44px -14px rgba(25,18,8,.42),48px 90px 130px -30px rgba(25,18,8,.48)';
      anim(doc, [{ transform: rectT(up, vw, vh) }, { transform: rectT(big, vw, vh) }], { duration: 360, easing: EASE });
    }, 1020));
    timers.push(setTimeout(function () {
      anim(doc, [{ transform: rectT(big, vw, vh), boxShadow: doc.style.boxShadow }, { transform: 'translate(0,0) scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' }], { duration: 860, easing: PAPER });
      var inn = doc.querySelector('.dk-doc-in');
      anim(inn, [{ opacity: 0 }, { opacity: 1 }], { duration: 450, delay: 420, easing: EASE });
    }, 1380));
    timers.push(setTimeout(onEnd, 2300));
  }

  function sfx(n, l, v) { if (window.dkSfx) dkSfx[n](l, v); }
  function openFolder(a) {
    sfx('paper', .3, .2);
    var r0 = a.getBoundingClientRect();
    var rot = getComputedStyle(a).getPropertyValue('--r').trim() || '0deg';
    var color = getComputedStyle(a).getPropertyValue('--c').trim();
    var front = a.querySelector('.f-front');
    var name = a.querySelector('.f-name').textContent, num = a.querySelector('.f-num').textContent;
    desk.classList.add('dk-opening');
    a.classList.add('is-active');
    a.style.zIndex = '40';

    // 1 · levantar (240 ms)
    var lift = anim(a, [{ transform: 'translateY(0) rotate(' + rot + ') scale(1)' }, { transform: 'translateY(-38px) rotate(' + rot + ') scale(1.04)' }], { duration: 240, easing: POP });

    // 2 · centrar (800 ms)
    var s = Math.min(innerWidth * .36 / r0.width, innerHeight * .6 / r0.height);
    var cx = innerWidth / 2, cy = innerHeight * .5;
    var ox = r0.left + r0.width / 2, oy = r0.bottom;
    var dx = cx - ox, dy = (cy + s * r0.height / 2) - oy;
    timers.push(setTimeout(function () {
      anim(a, [{ transform: 'translateY(-38px) rotate(' + rot + ') scale(1.04)' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(' + s + ')' }], { duration: 800, easing: SPRING });
    }, 240));

    // 3 · abrir tapa (900 ms): se clona la tapa para tener cara exterior e interior
    var lid = document.createElement('span');
    lid.className = 'f-lid';
    var out = front.cloneNode(true);
    out.classList.add('face', 'face-out');
    var inn = document.createElement('span');
    inn.className = 'face face-in';
    lid.appendChild(out); lid.appendChild(inn);
    a.appendChild(lid);
    front.style.visibility = 'hidden';
    var t3 = 840;
    timers.push(setTimeout(function () {
      sfx('paper', .45, .24);
      anim(lid, [{ transform: 'perspective(2000px) rotateY(0deg)' }, { transform: 'perspective(2000px) rotateY(-174deg)' }], { duration: 900, easing: LID });
      anim(out, [{ filter: 'brightness(1)' }, { filter: 'brightness(.55)' }], { duration: 900, easing: LID });
      anim(inn, [{ filter: 'brightness(.7)' }, { filter: 'brightness(1.05)' }], { duration: 900, easing: LID });
    }, t3));

    // 4–8 · hoja dentro → extraer → al aire → expandir → documento
    timers.push(setTimeout(function () {
      var sheet = a.querySelector('.f-sheet.s1').getBoundingClientRect();
      var doc = makeDoc({ left: sheet.left, top: sheet.top, width: sheet.width, height: sheet.height * 1.9 }, color, 'Expediente ' + num, name);
      openDoc(doc, { left: sheet.left, top: sheet.top, width: sheet.width, height: sheet.height * 1.9 }, .5, go);
      anim(a, [{ transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(' + s + ')' }, { transform: 'translate(' + dx + 'px,' + (dy + 30) + 'px) rotate(0deg) scale(' + s + ')' }], { duration: 720, delay: 300, easing: PAPER });
    }, t3 + 560));
  }

  function openCard(a) {
    sfx('paper', .3, .2);
    var r = a.getBoundingClientRect();
    var doc = makeDoc(r, 'var(--primary)', 'Índice', a.textContent.trim());
    a.style.visibility = 'hidden';
    desk.classList.add('dk-opening');
    var vw = innerWidth, vh = innerHeight;
    var lifted = { left: r.left, top: r.top - 14, width: r.width, height: r.height };
    var s = Math.min(vw * .34 / r.width, vh * .7 / r.height);
    var cw = r.width * s, ch = r.height * s;
    var mid = { left: vw / 2 - cw / 2, top: vh / 2 - ch / 2, width: cw, height: ch };
    doc.style.opacity = '1';
    doc.style.boxShadow = '0 3px 4px rgba(25,18,8,.16),18px 36px 44px -14px rgba(25,18,8,.42),48px 90px 130px -30px rgba(25,18,8,.48)';
    anim(doc, [{ transform: rectT(r, vw, vh) }, { transform: rectT(lifted, vw, vh) }], { duration: 380, easing: POP });
    timers.push(setTimeout(function () {
      anim(doc, [{ transform: rectT(lifted, vw, vh) }, { transform: rectT(mid, vw, vh) + ' rotate(-1.4deg)' }], { duration: 740, easing: SPRING });
    }, 380));
    timers.push(setTimeout(function () {
      anim(doc, [{ transform: rectT(mid, vw, vh) + ' rotate(-1.4deg)' }, { transform: 'translate(0,0) scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' }], { duration: 860, easing: PAPER });
      anim(doc.querySelector('.dk-doc-in'), [{ opacity: 0 }, { opacity: 1 }], { duration: 450, delay: 420, easing: EASE });
    }, 1120));
    timers.push(setTimeout(go, 2050));
  }

  document.addEventListener('click', function (e) {
    if (running) { e.preventDefault(); skip(); return; }
    if (reduce.matches || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var f = e.target.closest('.folder');
    var c = e.target.closest('.dk-index a');
    var a = f || c;
    if (!a) return;
    if (c && (c.target === '_blank' || /^(mailto:|tel:)/.test(c.getAttribute('href')) || /\.pdf$/i.test(c.getAttribute('href')))) return;
    e.preventDefault();
    running = true; href = a.href;
    try { sessionStorage.setItem('dk-origin', a.getAttribute('href')); } catch (_) {}
    document.documentElement.style.overflow = 'hidden';
    f ? openFolder(a) : openCard(a);
  }, true);
  addEventListener('keydown', skip);

  // Al volver con el botón atrás (bfcache) el escritorio debe estar limpio
  addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    running = false; timers.forEach(clearTimeout); timers = [];
    document.querySelectorAll('.dk-doc,.f-lid').forEach(function (n) { n.remove(); });
    desk.classList.remove('dk-opening');
    document.documentElement.style.overflow = '';
    desk.querySelectorAll('.folder').forEach(function (f) {
      f.classList.remove('is-active'); f.style.zIndex = ''; f.getAnimations().forEach(function (x) { x.cancel(); });
      var fr = f.querySelector('.f-front'); if (fr) fr.style.visibility = '';
    });
    desk.querySelectorAll('.dk-index a').forEach(function (l) { l.style.visibility = ''; });
  });
})();
