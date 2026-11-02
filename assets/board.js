/* Preview → caso de estudio: la pantalla se convierte en una pizarra blanca de plástico más grande y el cursor pasa a ser un plumón indeleble.
   En el caso, la pizarra se "borra" al cargar. Sin movimiento reducido solamente. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FLAG = 'dk-board', K = .6;
  function label() {
    var run = (document.querySelector('.dk-run') || {}).textContent || '';
    return run.split(' · ')[1] || '';
  }
  function board(name, from) {
    var d = document.createElement('div');
    d.className = 'dk-board';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="dk-board-in"><span class="dk-board-k">Expediente</span><b>' + name + '</b><span class="dk-board-s">Caso de estudio</span>' +
      '<svg viewBox="0 0 400 20" preserveAspectRatio="none"><path d="M4 12C80 4 160 18 240 9S360 8 396 11" pathLength="1"/></svg></div><i class="dk-board-tray"></i>';
    document.body.appendChild(d);
    return d;
  }
  var cta = document.querySelector('.cta-explore');
  if (cta && !reduce) {
    cta.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      var href = cta.href, r = cta.getBoundingClientRect();
      document.documentElement.classList.add('dk-marker');
      try { sessionStorage.setItem(FLAG, label()); } catch (_) {}
      var d = board(label(), r);
      var cx = r.left + r.width / 2 - innerWidth / 2, cy = r.top + r.height / 2 - innerHeight / 2;
      var a = d.animate([{ transform: 'translate(' + cx + 'px,' + cy + 'px) scale(.08) rotate(-3deg)', opacity: .2 }, { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 }],
        { duration: 650 * K, easing: 'cubic-bezier(.3,1.18,.4,1)', fill: 'forwards' });
      d.querySelector('.dk-board-in').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 * K, delay: 500 * K, fill: 'forwards' });
      d.querySelector('svg path').animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 600 * K, delay: 800 * K, fill: 'forwards', easing: 'ease-out' });
      var go = function () { location.href = href; };
      var t = setTimeout(go, 1600 * K);
      document.addEventListener('keydown', function () { clearTimeout(t); go(); }, { once: true });
    });
  }
  // En el caso: la pizarra se borra al entrar
  var name = null;
  try { name = sessionStorage.getItem(FLAG); sessionStorage.removeItem(FLAG); } catch (_) {}
  if (name !== null && document.body.classList.contains('nb-case') && !reduce) {
    var d = board(name);
    d.style.pointerEvents = 'none';
    d.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.06)' }], { duration: 700 * K, delay: 250 * K, easing: 'cubic-bezier(.65,0,.2,1)', fill: 'forwards' })
      .onfinish = function () { d.remove(); };
  }
})();
