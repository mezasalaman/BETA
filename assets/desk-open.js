/* Apertura de carpeta (y de la tarjeta índice) antes de navegar.
   Una sola secuencia continua: la carpeta se levanta y viaja al centro, la tapa se abre, una hoja
   sale y crece (escala uniforme, sin deformar) hasta cubrir la pantalla. Solo transform/opacity
   (más un filtro de sombra puntual). Con movimiento reducido o clic con modificadores se navega
   sin animar. Cualquier tecla o clic durante la animación salta a la página. */
(function () {
  var desk = document.querySelector('.desk');
  if (!desk) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var running = false, timers = [], href = null;
  var PAPER = 'cubic-bezier(.65,0,.2,1)', GLIDE = 'cubic-bezier(.25,.9,.3,1)', LID = 'cubic-bezier(.55,.05,.25,1)', EASE = 'cubic-bezier(.22,.8,.22,1)';
  var SH0 = 'drop-shadow(0 4px 6px rgba(25,18,8,.25))', SH1 = 'drop-shadow(0 34px 38px rgba(25,18,8,.42))';

  var T = 1.3; // factor de duración (1 = original); un poco más lenta
  function at(ms, fn) { timers.push(setTimeout(fn, ms * T)); }
  function go() { if (href) location.href = href; }
  function skip() { if (running && !skipFn) { timers.forEach(clearTimeout); go(); } }
  function anim(el, frames, opts) { opts.fill = 'forwards'; opts.duration *= T; if (opts.delay) opts.delay *= T; return el.animate(frames, opts); }

  // Hoja que sale de la carpeta: mide exactamente su rectángulo; solo se transforma con escala uniforme
  function makeDoc(r, color, label, name) {
    var d = document.createElement('div');
    d.className = 'dk-doc';
    d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px';
    d.innerHTML = '<span class="dk-doc-strip" style="background:' + color + '"></span><div class="dk-doc-in"><span class="mono">' + label + '</span><b>' + name + '</b><i></i></div>';
    d.style.opacity = '0';
    document.body.appendChild(d);
    // Título a tamaño real (nítido): aparece al final en vez de escalar el texto pequeño de la hoja
    var big = document.createElement('div');
    big.className = 'dk-doc-big';
    big.setAttribute('aria-hidden', 'true');
    big.innerHTML = '<span class="mono">' + label + '</span><b>' + name + '</b><i></i>';
    document.body.appendChild(big);
    d._big = big;
    return d;
  }
  function reveal(doc, delay, dur) {
    anim(doc.querySelector('.dk-doc-in'), [{ opacity: 1 }, { opacity: 0 }], { duration: dur * .35, easing: EASE });
    anim(doc._big, [{ opacity: 0 }, { opacity: 1 }], { duration: dur * .45, delay: delay + dur * .55, easing: EASE });
  }
  function cover(r) {
    var vw = innerWidth, vh = innerHeight;
    var f = Math.max(vw / r.width, vh / r.height) * 1.02;
    return { f: f, dx: vw / 2 - (r.left + r.width / 2), dy: vh / 2 - (r.top + r.height / 2) };
  }

  function openFolder(a) {
    if (window.dkSfx) dkSfx.flip();
    var r0 = a.getBoundingClientRect();
    var rot = getComputedStyle(a).getPropertyValue('--r').trim() || '0deg';
    var color = getComputedStyle(a).getPropertyValue('--c').trim();
    var front = a.querySelector('.f-front');
    var name = a.querySelector('.f-name').textContent, num = a.querySelector('.f-num').textContent;
    desk.classList.add('dk-opening');
    a.classList.add('is-active');
    a.style.zIndex = '40';

    // 1 · se levanta (260 ms)
    anim(a, [{ transform: 'translateY(0) rotate(' + rot + ') scale(1)', filter: SH0 }, { transform: 'translateY(-22px) rotate(' + rot + ') scale(1.03)', filter: SH1 }], { duration: 260, easing: EASE });

    // 2 · viaja al centro (620 ms), sin rebote y sin crecer más de 2,1×
    var s = Math.min(innerWidth * .3 / r0.width, innerHeight * .56 / r0.height, 2.1);
    var cx = innerWidth / 2, cy = innerHeight * .52;
    var dx = cx - (r0.left + r0.width / 2), dy = (cy + s * r0.height / 2) - r0.bottom;
    var mid = 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(' + s + ')';
    at(200, function () {
      anim(a, [{ transform: 'translateY(-22px) rotate(' + rot + ') scale(1.03)' }, { transform: mid }], { duration: 620, easing: GLIDE });
    });

    // 3 · se abre la tapa (520 ms): cara exterior que se oscurece e interior que se aclara
    var lid = document.createElement('span');
    lid.className = 'f-lid';
    var out = front.cloneNode(true); out.classList.add('face', 'face-out');
    var inn = document.createElement('span'); inn.className = 'face face-in';
    lid.appendChild(out); lid.appendChild(inn);
    a.appendChild(lid);
    front.style.visibility = 'hidden';
    at(700, function () {
      anim(lid, [{ transform: 'perspective(1800px) rotateY(0deg)' }, { transform: 'perspective(1800px) rotateY(-172deg)' }], { duration: 520, easing: LID });
      anim(out, [{ filter: 'brightness(1)' }, { filter: 'brightness(.6)' }], { duration: 520, easing: LID });
      anim(inn, [{ filter: 'brightness(.75)' }, { filter: 'brightness(1.04)' }], { duration: 520, easing: LID });
    });

    // 4 · sale la hoja y se extiende hasta cubrir la pantalla
    at(930, function () {
      var sh = a.querySelector('.f-sheet.s1').getBoundingClientRect();
      var r = { left: sh.left, top: sh.top, width: sh.width, height: sh.width * 1.05 };
      var doc = makeDoc(r, color, 'Expediente ' + num, name);
      var c = cover(r);
      // el título ya está en la hoja al abrirse la tapa: aparece quieta dentro de la carpeta y luego sigue
      anim(doc, [{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: EASE });
      anim(doc, [{ transform: 'translateY(0) scale(1)', filter: 'drop-shadow(0 4px 6px rgba(25,18,8,.3))' }, { transform: 'translateY(' + (-r.height * .42) + 'px) scale(1.04)', filter: 'drop-shadow(0 26px 30px rgba(25,18,8,.38))' }], { duration: 380, delay: 380, easing: PAPER });
      at(760, function () {
        anim(doc, [{ transform: 'translateY(' + (-r.height * .42) + 'px) scale(1.04)', filter: 'drop-shadow(0 26px 30px rgba(25,18,8,.38))' },
                   { transform: 'translate(' + c.dx + 'px,' + (c.dy) + 'px) scale(' + c.f + ')', filter: 'drop-shadow(0 0 0 rgba(25,18,8,0))' }], { duration: 520, easing: PAPER });
        anim(a, [{ opacity: 1 }, { opacity: 0 }], { duration: 320, delay: 160, easing: EASE });
        reveal(doc, 0, 520);
      });
      at(1710, go);
    });
  }

  function openCard(a) {
    var cr = a.getBoundingClientRect();
    // La hoja que sale de la tarjeta es vertical (más alta que ancha), no apretada como la ficha
    var r = { left: cr.left, top: cr.top, width: cr.width, height: cr.width * 1.4 };
    var doc = makeDoc(r, 'var(--primary)', 'Índice', a.textContent.trim());
    desk.classList.add('dk-opening');
    var vw = innerWidth, vh = innerHeight;
    var s = Math.min(vw * .34 / r.width, vh * .78 / r.height);
    var dx = vw / 2 - (r.left + r.width / 2), dy = vh / 2 - (r.top + r.height / 2);
    var mid = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ') rotate(-1.4deg)';
    var c = cover(r);
    doc.style.opacity = '1';
    var tray = a.closest('.dk-index'); if (tray) tray.style.opacity = '.0';
    anim(doc, [{ transform: 'translateY(0) scale(1)', filter: SH0 }, { transform: 'translateY(-14px) scale(1.03)', filter: SH1 }], { duration: 300, easing: EASE });
    at(260, function () { anim(doc, [{ transform: 'translateY(-14px) scale(1.03)', filter: SH1 }, { transform: mid, filter: SH1 }], { duration: 700, easing: GLIDE }); });
    at(980, function () {
      anim(doc, [{ transform: mid, filter: SH1 }, { transform: 'translate(' + c.dx + 'px,' + c.dy + 'px) scale(' + c.f + ')', filter: 'drop-shadow(0 0 0 rgba(25,18,8,0))' }], { duration: 640, easing: PAPER });
      reveal(doc, 0, 640);
    });
    at(1700, go);
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
  addEventListener('keydown', function () { if (skipFn && running) skipFn(); else skip(); });
  document.addEventListener('click', function () { if (skipFn && running) skipFn(); }, true);

  // Al volver con el botón atrás (bfcache) el escritorio debe estar limpio
  addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    running = false; timers.forEach(clearTimeout); timers = [];
    document.querySelectorAll('.dk-doc,.dk-doc-big,.f-lid').forEach(function (n) { n.remove(); });
    desk.classList.remove('dk-opening');
    document.documentElement.style.overflow = '';
    desk.querySelectorAll('.folder').forEach(function (f) {
      f.classList.remove('is-active'); f.style.zIndex = ''; f.getAnimations().forEach(function (x) { x.cancel(); });
      var fr = f.querySelector('.f-front'); if (fr) fr.style.visibility = '';
    });
    desk.querySelectorAll('.dk-index a').forEach(function (l) { l.style.visibility = ''; });
    var ix = desk.querySelector('.dk-index'); if (ix) ix.style.opacity = '';
  });

  // ---- Regreso: la hoja se encoge y entra a la carpeta, la tapa se cierra y la carpeta vuelve a su sitio ----
  function playReturn() {
    var flag = null, org = null;
    try { flag = sessionStorage.getItem('dk-return'); sessionStorage.removeItem('dk-return'); org = sessionStorage.getItem('dk-origin'); } catch (_) {}
    if (!flag || !org || reduce.matches) return;
    var a = desk.querySelector('.folder[href="' + org + '"]'); if (!a) return;
    var r0 = a.getBoundingClientRect();
    var rot = getComputedStyle(a).getPropertyValue('--r').trim() || '0deg';
    var color = getComputedStyle(a).getPropertyValue('--c').trim();
    var front = a.querySelector('.f-front');
    var name = a.querySelector('.f-name').textContent, num = a.querySelector('.f-num').textContent;
    var s = Math.min(innerWidth * .3 / r0.width, innerHeight * .56 / r0.height, 2.1);
    var dx = innerWidth / 2 - (r0.left + r0.width / 2), dy = (innerHeight * .52 + s * r0.height / 2) - r0.bottom;
    var mid = 'translate(' + dx + 'px,' + dy + 'px) rotate(0deg) scale(' + s + ')';
    running = true; href = null;
    document.documentElement.style.overflow = 'hidden';
    desk.classList.add('dk-opening'); a.classList.add('is-active'); a.style.zIndex = '40';
    a.style.transition = 'none'; // sin transición CSS: la carpeta debe estar ya en el centro al medir la hoja
    a.style.transform = mid;
    void a.getBoundingClientRect();
    var lid = document.createElement('span'); lid.className = 'f-lid';
    var out = front.cloneNode(true); out.classList.add('face', 'face-out');
    var inn = document.createElement('span'); inn.className = 'face face-in';
    lid.appendChild(out); lid.appendChild(inn); a.appendChild(lid);
    lid.style.transform = 'perspective(1800px) rotateY(-172deg)'; out.style.filter = 'brightness(.6)'; inn.style.filter = 'brightness(1.04)';
    front.style.visibility = 'hidden';
    var sh = a.querySelector('.f-sheet.s1').getBoundingClientRect();
    var r = { left: sh.left, top: sh.top, width: sh.width, height: sh.width * 1.05 };
    var doc = makeDoc(r, color, 'Expediente ' + num, name), c = cover(r);
    doc.style.opacity = '1'; doc._big.style.opacity = '1'; doc.querySelector('.dk-doc-in').style.opacity = '0';
    var up = 'translateY(' + (-r.height * .42) + 'px) scale(1.04)';
    anim(doc._big, [{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: EASE });
    anim(doc.querySelector('.dk-doc-in'), [{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 160, easing: EASE });
    anim(doc, [{ transform: 'translate(' + c.dx + 'px,' + c.dy + 'px) scale(' + c.f + ')', filter: 'drop-shadow(0 0 0 rgba(25,18,8,0))' }, { transform: up, filter: 'drop-shadow(0 26px 30px rgba(25,18,8,.38))' }], { duration: 560, easing: PAPER });
    at(560, function () { anim(doc, [{ transform: up }, { transform: 'translateY(0) scale(1)' }], { duration: 360, easing: PAPER }); });
    at(900, function () { anim(doc, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: EASE }); });
    at(960, function () {
      anim(lid, [{ transform: 'perspective(1800px) rotateY(-172deg)' }, { transform: 'perspective(1800px) rotateY(0deg)' }], { duration: 520, easing: LID });
      anim(out, [{ filter: 'brightness(.6)' }, { filter: 'brightness(1)' }], { duration: 520, easing: LID });
      anim(inn, [{ filter: 'brightness(1.04)' }, { filter: 'brightness(.75)' }], { duration: 520, easing: LID });
    });
    at(1480, function () {
      desk.classList.remove('dk-opening');
      anim(a, [{ transform: mid }, { transform: 'translateY(0) rotate(' + rot + ') scale(1)' }], { duration: 640, easing: GLIDE });
    });
    function done() {
      timers.forEach(clearTimeout); timers = [];
      [doc, doc._big, lid].forEach(function (n) { n.remove(); });
      a.getAnimations().forEach(function (x) { x.cancel(); });
      a.style.transform = ''; a.style.zIndex = ''; requestAnimationFrame(function () { a.style.transition = ''; }); a.classList.remove('is-active'); front.style.visibility = '';
      desk.classList.remove('dk-opening'); document.documentElement.style.overflow = ''; running = false; skipFn = null;
    }
    skipFn = done;
    at(2200, done);
  }
  var skipFn = null;
  if (document.readyState === 'complete') playReturn(); else addEventListener('load', playReturn);
})();
