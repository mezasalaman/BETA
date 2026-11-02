/* Rediseño · Fase 3: marca qué elemento viaja (view-transition-name: doc) al ir y al volver.
   Entrar por URL directa no dispara pageswap/pagereveal con transición: se ve la página sin animar. */
(function () {
  var KEY = 'dk-origin';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var onDesk = !!document.querySelector('.desk');
  var origin = null;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.folder, .dk-index a');
    if (!a) return;
    origin = a;
    try { sessionStorage.setItem(KEY, a.getAttribute('href')); } catch (_) {}
  }, true);

  function nameDoc() {
    var m = document.querySelector('main');
    if (m) m.style.viewTransitionName = 'doc';
  }

  addEventListener('pageswap', function (e) {
    if (!e.viewTransition || reduce) return;
    if (!onDesk) nameDoc();
  });

  addEventListener('pagereveal', function (e) {
    if (!e.viewTransition || reduce) return;
    if (!onDesk) return nameDoc();
    var href = null;
    try { href = sessionStorage.getItem(KEY); } catch (_) {}
    var el = href && document.querySelector('.folder[href="' + href + '"], .dk-index a[href="' + href + '"]');
    if (el) el.style.viewTransitionName = 'doc';
  });

  // Esc cierra el documento y vuelve al escritorio (si no hay un diálogo abierto)
  if (!onDesk) {
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      if (document.querySelector('dialog[open]')) return;
      var t = e.target;
      if (t && /^(input|textarea|select)$/i.test(t.tagName)) return;
      var home = document.querySelector('a[href$="index.html"]');
      if (home) location.href = home.href;
    });
  }
})();

// Al abrir un documento con teclado, el foco pasa al botón de volver (con ratón no se fuerza el anillo)
document.addEventListener('keydown', function () { try { sessionStorage.setItem('dk-input', 'kbd'); } catch (_) {} }, true);
document.addEventListener('pointerdown', function () { try { sessionStorage.setItem('dk-input', 'ptr'); } catch (_) {} }, true);
addEventListener('pageshow', function () {
  var b = document.querySelector('.dk-back'), k = null;
  try { k = sessionStorage.getItem('dk-input'); } catch (_) {}
  if (b && !document.querySelector('.desk') && k === 'kbd') b.focus({ preventScroll: true });
});
