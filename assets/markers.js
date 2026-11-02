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
})();
