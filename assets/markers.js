/* Bandeja fija de plumones en los casos de estudio: el plumón elegido define el color del cursor. */
(function () {
  var COLORS = [['Negro', '#161a2b'], ['Azul', '#315CFF'], ['Rojo', '#d9342b'], ['Verde', '#1f9d55']];
  var KEY = 'dk-marker', cur = 0;
  try { cur = Math.max(0, +sessionStorage.getItem(KEY) || 0); } catch (_) {}
  function marker(col) { return '<i style="--mk:' + col + '"></i>'; }
  function cursor(col) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36'><g transform='rotate(45 18 18)'><rect x='14' y='2' width='8' height='9' rx='2' fill='" + col + "'/><rect x='13' y='10' width='10' height='17' rx='2' fill='#f1f3f5' stroke='#7b8088' stroke-width='.6'/><rect x='13' y='16' width='10' height='5' fill='" + col + "'/><path d='M15 27h6l-1.6 6h-2.8z' fill='#d9dce0'/><path d='M16.6 33h2.8l-.6 2.2h-1.6z' fill='" + col + "'/></g></svg>";
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") 9 33, auto';
  }
  function apply(i) {
    cur = i;
    document.documentElement.style.setProperty('--dk-cursor', cursor(COLORS[i][1]));
    tray.querySelectorAll('.dk-mk').forEach(function (b, n) { b.setAttribute('aria-checked', n === i ? 'true' : 'false'); b.tabIndex = n === i ? 0 : -1; });
    try { sessionStorage.setItem(KEY, i); } catch (_) {}
  }
  var tray = document.createElement('div');
  tray.className = 'dk-tray';
  tray.setAttribute('role', 'radiogroup');
  tray.setAttribute('aria-label', 'Color del plumón');
  tray.innerHTML = '<span class="dk-tray-l">Plumones</span>' + COLORS.map(function (c, n) {
    return '<button type="button" class="dk-mk" role="radio" aria-label="Plumón ' + c[0].toLowerCase() + '" aria-checked="false">' + marker(c[1]) + '</button>';
  }).join('');
  document.body.appendChild(tray);
  tray.addEventListener('click', function (e) {
    var b = e.target.closest('.dk-mk'); if (!b) return;
    apply([].indexOf.call(tray.querySelectorAll('.dk-mk'), b));
  });
  tray.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    var n = (cur + (e.key === 'ArrowRight' ? 1 : COLORS.length - 1)) % COLORS.length;
    apply(n); tray.querySelectorAll('.dk-mk')[n].focus();
  });
  apply(cur);

  // ---- Pintar con el plumón elegido: los trazos desaparecen 3 s después de soltarlos ----
  var LIFE = 1000, FADE = 500, strokes = [], cur2 = null, raf = 0;
  var cv = document.createElement('canvas'), g = cv.getContext('2d');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9997';
  document.body.appendChild(cv);
  function size() {
    var d = window.devicePixelRatio || 1;
    cv.width = Math.round(innerWidth * d); cv.height = Math.round(innerHeight * d);
    g.setTransform(d, 0, 0, d, 0, 0);
  }
  size(); addEventListener('resize', size);
  function draw(now) {
    g.clearRect(0, 0, innerWidth, innerHeight);
    strokes = strokes.filter(function (s) { return !s.end || now - s.end < LIFE + FADE; });
    strokes.forEach(function (s) {
      var a = 1;
      if (s.end) { var age = now - s.end; if (age > LIFE) a = 1 - (age - LIFE) / FADE; }
      g.globalAlpha = Math.max(0, a) * .92;
      g.strokeStyle = s.col; g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath();
      s.pts.forEach(function (p, i) { var x = p[0] - scrollX, y = p[1] - scrollY; i ? g.lineTo(x, y) : g.moveTo(x, y); });
      if (s.pts.length === 1) g.lineTo(s.pts[0][0] - scrollX + .01, s.pts[0][1] - scrollY);
      g.stroke();
    });
    raf = strokes.length ? requestAnimationFrame(draw) : 0;
    if (!raf) g.clearRect(0, 0, innerWidth, innerHeight);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(draw); }
  var SKIP = 'a,button,input,textarea,select,summary,label,dialog,[role="button"],[role="radio"],.dk-tray,.dk-bar';
  document.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 || e.pointerType === 'touch' || (e.target.closest && e.target.closest(SKIP))) return;
    e.preventDefault(); // evita seleccionar texto o arrastrar imágenes mientras se pinta
    cur2 = { col: COLORS[cur][1], pts: [[e.pageX, e.pageY]], end: 0 };
    strokes.push(cur2); kick();
  }, true);
  document.addEventListener('pointermove', function (e) {
    if (!cur2) return;
    var l = cur2.pts[cur2.pts.length - 1];
    if (Math.abs(l[0] - e.pageX) + Math.abs(l[1] - e.pageY) > 1.5) cur2.pts.push([e.pageX, e.pageY]);
  }, true);
  function stop() { if (cur2) { cur2.end = performance.now(); cur2 = null; kick(); } }
  document.addEventListener('pointerup', stop, true);
  document.addEventListener('pointercancel', stop, true);
  addEventListener('blur', stop);
})();
