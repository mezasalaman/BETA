/* Casos de estudio en celular: los párrafos largos se resumen a 3 líneas con «Ver más». En tablet y escritorio no hace nada. */
(function () {
  var mq = matchMedia('(max-width:640px)'), done = false;
  var SKIP = 'dialog,svg,table,details,summary,button,a,figure,.fd-chart,.cv-panel,.pc-note,.pc-board,[data-no-clamp]';
  function init() {
    if (done || !mq.matches) return;
    done = true;
    document.querySelectorAll('main p').forEach(function (p) {
      if (p.closest(SKIP) || (p.textContent || '').trim().length < 170) return;
      p.classList.add('mc-clamp');
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mc-more'; b.textContent = 'Ver más'; b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', function () {
        var open = p.classList.toggle('mc-open');
        b.textContent = open ? 'Ver menos' : 'Ver más';
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      p.parentNode.insertBefore(b, p.nextSibling);
    });
  }
  init();
  if (mq.addEventListener) mq.addEventListener('change', init);
})();
