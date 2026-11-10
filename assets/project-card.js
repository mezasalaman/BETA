/* Ficha de proyecto flotante: se muestra cuando termina la animación de apertura de la carpeta (desk-open.js).
   Un único diálogo reutilizable para los cuatro proyectos. El CTA lleva directo al caso de estudio. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var EASE = 'cubic-bezier(.22,.8,.22,1)';
  var A = 'assets/projects/', C = 'assets/conduzko/';

  // Contenido y assets reales de cada proyecto (los mismos que ya usan los overview y los casos)
  var DATA = {
    'food-delivery-case.html': {
      gal: '#galeria', cta: ['#C75F14', '#A84E0D', '#fff'], num: '01', name: 'FoodDelivery', cat: 'Web · E-commerce',
      lead: 'Rediseñé el onboarding de comercios para que más tiendas lleguen a publicarse.',
      ctx: 'Solo el 48% de los comercios que iniciaban el onboarding lograba publicar su tienda; la mayor caída ocurría entre el registro y el contexto del comercio.',
      metric: '48% → 63%', cap: 'Activation Rate tras el lanzamiento (+15 pp). Observado: no demuestra por sí solo que el rediseño causara toda la mejora.',
      role: 'Product Designer (research, UX y estrategia de producto), junto a Producto y Desarrollo. Diseñé y documenté el rediseño del onboarding.',
      how: ['Análisis del funnel (GA4, Mixpanel, Clarity)', 'Hipótesis medible para el onboarding', 'Documentación del flujo de registro y carta', 'Diseño y prototipo en Figma'],
      imgs: [
        { s: A + 'food-hero-aimo.jpg', w: 1663, h: 945, a: 'FoodDelivery: panel de comercio con el onboarding' },
        { s: A + 'food/sol-01-bienvenida.webp', w: 2000, h: 970, a: 'Pantalla de bienvenida del onboarding' },
        { s: A + 'food/sol-05-producto.webp', w: 2000, h: 965, a: 'Pantalla de alta de producto' }]
    },
    'satelock-case.html': {
      gal: '#galeria', cta: ['#2B5DB5', '#1F4A98', '#fff'], num: '02', name: 'Satelock', cat: 'Logística · Seguridad',
      lead: 'Rediseñé el monitoreo de flotas para que el operador identifique qué requiere atención y actúe con menos navegación.',
      ctx: 'La información crítica estaba dispersa entre vistas y evaluar una incidencia exigía demasiado esfuerzo, con carga cognitiva alta en jornadas prolongadas.',
      metric: '−25%', cap: 'Tiempo de reacción ante alertas, de 15 a 11,25 min. Documentado en el caso; el modelo económico asociado es una estimación.',
      role: 'Product Designer (estrategia, research, UX y datos). Rediseñé la experiencia de monitoreo operativo de un producto pensado para entidades del Estado.',
      how: ['Shadowing con operadores (48h+)', 'Mapeo del proceso de atención de incidencias', 'Priorización de oportunidades', 'Rediseño del monitoreo y las rutas'],
      imgs: [
        { s: A + 'satelock-hero.jpg', w: 1707, h: 921, a: 'Satelock: panel de monitoreo de flotas' },
        { s: A + 'satelock/sol-01-entregas.webp', w: 2000, h: 1069, a: 'Vista de entregas' },
        { s: A + 'satelock/sol-02-rutas-mapa.webp', w: 2000, h: 1068, a: 'Rutas sobre el mapa' },
        { s: A + 'satelock/sol-06-detalle-entrega.webp', w: 2000, h: 1060, a: 'Detalle de una entrega' }]
    },
    'conduzko-case.html': {
      gal: '#galeria', cta: ['#F7D154', '#E8BC33', '#14215C'], num: '03', name: 'ConDuzko', cat: 'IA conversacional · Marketplace',
      lead: 'Definí y diseñé un marketplace de autos usados (comprador, vendedor y administración) con IA donde mejora una decisión.',
      ctx: 'Publicar, buscar y negociar un auto ocurría en canales separados, con poca confianza en cada etapa.',
      metric: '248 → 41', cap: 'Autos publicados → vendidos. Resultado documentado en el caso.',
      role: 'Product Designer con foco en diseño conversacional (4 meses). Diseñé la experiencia; no desarrollé la API ni la integración.',
      how: ['Estrategia de producto para tres perfiles', 'Diseño conversacional del asistente con IA', 'Flujos web y mobile en Figma', 'Embudo y analítica (Mixpanel, GA4)'],
      imgs: [
        { s: C + 'portada.webp', w: 1512, h: 1040, a: 'ConDuzko: marketplace de autos verificados' },
        { s: C + 'home.webp', w: 1826, h: 1042, a: 'Inicio del marketplace' },
        { s: C + 'hero-asistente-duzko.webp', w: 1690, h: 1198, a: 'Asistente con IA' },
        { s: C + 'dashboard.webp', w: 1766, h: 1050, a: 'Panel de administración' }]
    },
    'Seller-case.html': {
      gal: '#galeria', cta: ['#3A8056', '#2C6845', '#fff'], num: '04', name: 'Seller Center', cat: 'Marketplace · Mobile App',
      lead: 'Diseñé un marketplace que conecta conductores con talleres y vendedores: servicios por contrato y productos con comisión.',
      ctx: 'Los conductores no encontraban ni comparaban con facilidad talleres y productos, y los proveedores no tenían cómo digitalizar su oferta.',
      metric: '+22%', cap: 'Conversión búsqueda → reserva. Estimado en el case study; no es una validación en producción.',
      role: 'Product Designer (estrategia, research, UX y datos), 10 semanas. Diseñé el flujo de búsqueda y reserva de talleres.',
      how: ['Paseo cognitivo de búsqueda y reserva', 'Recorrido y escenarios alternativos documentados', 'Filtros y detalle de taller para decidir con contexto', 'Prototipo de la reserva en Figma'],
      imgs: [
        { s: A + 'seller-hero-geo.jpg', w: 1536, h: 1024, a: 'Seller Center: app móvil y panel' },
        { s: A + 'seller/sol-01-detalle-taller.webp', w: 1616, h: 840, a: 'Detalle de un taller' },
        { s: A + 'seller/sol-02-filtros.webp', w: 2000, h: 1044, a: 'Filtros de búsqueda' },
        { s: A + 'seller/sol-04-agendar-cita.webp', w: 2000, h: 1042, a: 'Agendar una cita' }]
    }
  };

  function key(a) { return (a.getAttribute('href') || '').split('/').pop(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  var ov, card, st = null, lockedScroll = false, inerted = [];

  function build() {
    ov = document.createElement('div');
    ov.className = 'pcard-ov';
    ov.hidden = true;
    ov.innerHTML = '<div class="pcard" role="dialog" aria-modal="true" aria-labelledby="pcard-title" tabindex="-1"></div>';
    document.body.appendChild(ov);
    card = ov.firstChild;
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    card.addEventListener('click', function (e) {
      var x = e.target.closest('.pcard-x'), t = e.target.closest('.pcard-thumb');
      if (x) close();
      else if (t) pick(+t.dataset.i);
    });
    document.addEventListener('keydown', onKey, true);
  }

  function render(d, color) {
    var thumbs = d.imgs.slice(1, 3).map(function (m, k) {
      var i = k + 1;
      return '<button type="button" class="pcard-thumb" data-i="' + i + '" style="--i:' + k + '" aria-pressed="false" aria-label="Ver imagen ' + (i + 1) + ' de ' + d.imgs.length + ': ' + esc(m.a) + '"><span><img src="' + m.s + '" alt="" width="' + m.w + '" height="' + m.h + '" decoding="async"></span></button>';
    }).join('');
    thumbs += '<a class="pcard-thumb pcard-more" style="--i:' + Math.min(d.imgs.length - 1, 2) + '" href="pages/' + d.file + d.gal + '"><span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><b>Ver más fotos</b></span></a>';
    var m0 = d.imgs[0];
    card.style.setProperty('--pc', color);
    card.style.setProperty('--cta', d.cta[0]); card.style.setProperty('--cta-h', d.cta[1]); card.style.setProperty('--cta-ink', d.cta[2]);
    card.innerHTML =
      '<svg class="pcard-clip" viewBox="0 0 20 52" fill="none" stroke-linecap="round" aria-hidden="true"><path d="M16 8v29a7 7 0 0 1-14 0V12a5 5 0 0 1 10 0v22a3 3 0 0 1-6 0V16" stroke="#9aa0aa" stroke-width="2.2"/></svg>' +
      '<button type="button" class="pcard-x" aria-label="Cerrar"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg></button>' +
      '<div class="pcard-scroll">' +
        '<header class="pcard-head"><p class="pcard-kicker"><b>' + d.num + '</b>' + esc(d.cat) + '</p>' +
          '<h2 class="pcard-title" id="pcard-title">' + esc(d.name) + '</h2>' +
          '<svg class="pcard-wave" viewBox="0 0 120 10" fill="none" stroke="#315CFF" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M2 6c10-6 18 4 28-1s18 4 28-1 18 4 28-1 18 3 30-1"/></svg>' +
          '<p class="pcard-lead">' + esc(d.lead) + '</p></header>' +
        '<div class="pcard-vis"><figure class="pcard-main" style="margin:6px 4px 0"><span class="pcard-frame"><img id="pcard-img" src="' + m0.s + '" alt="' + esc(m0.a) + '" width="' + m0.w + '" height="' + m0.h + '" decoding="async"></span></figure>' +
          '<div class="pcard-thumbs" role="group" aria-label="Pantallas del proyecto">' + thumbs + '</div></div>' +
        '<dl class="pcard-info">' +
          '<div class="pcard-blk"><dt>Contexto del negocio</dt><dd>' + esc(d.ctx) + '</dd></div>' +
          '<div class="pcard-blk"><dt>Impacto</dt><dd><span class="pcard-metric">' + esc(d.metric) + '<svg class="pcard-goal" viewBox="0 0 32 32" fill="none" stroke="#14215C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="14" cy="18" r="10"/><circle cx="14" cy="18" r="5.5"/><circle cx="14" cy="18" r="1.3" fill="#315CFF" stroke="#315CFF"/><path d="M14 18 26 6M21 5l1 5 5 1" stroke="#315CFF"/></svg></span><span class="pcard-cap">' + esc(d.cap) + '</span></dd></div>' +
          '<div class="pcard-blk"><dt>Mi rol</dt><dd>' + esc(d.role) + '</dd></div>' +
          '<div class="pcard-blk"><dt>¿Cómo lo hice?</dt><dd><ol class="pcard-how">' + d.how.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ol></dd></div>' +
        '</dl>' +
      '</div>' +
      '<div class="pcard-foot"><a class="pcard-cta" href="pages/' + d.file + '">Ver caso de estudio <i aria-hidden="true">→</i></a></div>';
  }

  function pick(i) {
    var img = card.querySelector('#pcard-img');
    // Volver a pulsar la miniatura activa regresa a la portada
    if (img.getAttribute('src') === st.d.imgs[i].s) i = 0;
    var m = st.d.imgs[i];
    card.querySelectorAll('.pcard-thumb[data-i]').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.i === i); });
    if (reduce.matches) { swap(img, m); return; }
    img.classList.add('is-swap');
    setTimeout(function () { swap(img, m); img.classList.remove('is-swap'); }, 200);
  }
  function swap(img, m) { img.src = m.s; img.alt = m.a; img.width = m.w; img.height = m.h; }

  // Mientras la ficha está abierta, nada de detrás recibe foco ni clics
  function lockBehind(on) {
    if (on) {
      Array.prototype.forEach.call(document.body.children, function (n) {
        if (n === ov || /^(SCRIPT|STYLE|LINK)$/.test(n.tagName) || n.id === 'analytics-consent' || n.id === 'analytics-settings' || n.inert) return;
        n.inert = true; inerted.push(n);
      });
      if (document.documentElement.style.overflow !== 'hidden') { document.documentElement.style.overflow = 'hidden'; lockedScroll = true; }
    } else {
      inerted.forEach(function (n) { n.inert = false; }); inerted = [];
      if (lockedScroll) { document.documentElement.style.overflow = ''; lockedScroll = false; }
    }
  }

  function onKey(e) {
    if (!st) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.filter.call(card.querySelectorAll('button,a[href]'), function (n) { return n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1], cur = document.activeElement;
    if (!card.contains(cur)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && (cur === first || cur === card)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
  }

  function open(a, opts) {
    var d = DATA[key(a)];
    if (!d || st) return false;
    if (!ov) build();
    d.file = key(a);
    st = { a: a, d: d, onClose: opts && opts.onClose, closing: false };
    render(d, getComputedStyle(a).getPropertyValue('--c').trim() || '#F28A3C');
    lockBehind(true);
    ov.hidden = false;
    void ov.offsetWidth;
    ov.classList.add('is-in');
    if (!reduce.matches) {
      card.animate([
        { opacity: 0, transform: 'translateY(26px) scale(.96)' },
        { opacity: 1, transform: 'none' }
      ], { duration: 520, easing: EASE });
    }
    // El foco va al CTA: es la acción principal de la ficha
    card.querySelector('.pcard-cta').focus({ preventScroll: true });
    return true;
  }

  function finish() {
    if (!st) return;
    var cb = st.onClose;
    card.getAnimations().forEach(function (x) { x.cancel(); });
    ov.hidden = true; ov.classList.remove('is-in');
    lockBehind(false);
    st = null;
    if (cb) cb();
  }
  function close() {
    if (!st || st.closing) return;
    st.closing = true;
    ov.classList.remove('is-in');
    if (reduce.matches) return finish();
    card.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(16px) scale(.97)' }], { duration: 260, easing: EASE, fill: 'forwards' }).finished.then(finish, finish);
  }

  // Precarga las imágenes de la ficha cuando el visitante se acerca a una carpeta
  var warmed = {};
  function warm(e) {
    var f = e.target.closest && e.target.closest('.folder');
    var d = f && DATA[key(f)];
    if (!d || warmed[d.num]) return;
    warmed[d.num] = 1;
    d.imgs.forEach(function (m) { var i = new Image(); i.decoding = 'async'; i.src = m.s; });
  }
  document.addEventListener('pointerover', warm, { passive: true });
  document.addEventListener('focusin', warm);

  // Llegar desde «Ver resumen del proyecto» de un caso: abre directo la ficha de ese proyecto
  function fromHash() {
    var m = /^#resumen=(.+)$/.exec(location.hash);
    if (!m) return;
    var f = Array.prototype.filter.call(document.querySelectorAll('.folder'), function (a) { return key(a) === decodeURIComponent(m[1]); })[0];
    if (!f) return;
    history.replaceState(null, '', location.pathname + location.search);
    open(f, { onClose: function () { f.focus({ preventScroll: true }); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fromHash); else fromHash();

  window.dkCard = {
    has: function (a) { return !!DATA[key(a)]; },
    open: open,
    reset: function () { if (st) { st.onClose = null; finish(); } }
  };
})();
