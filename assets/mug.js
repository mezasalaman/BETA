/* Taza del escritorio: al hacer clic sale humo. Se generan bocanadas (círculos con degradado radial)
   que suben, se ensanchan y se desvanecen con trayectorias distintas; solo transform y opacity. */
(function () {
  var m = document.querySelector('.dk-mug2'); if (!m) return;
  var g = m.querySelector('.m2-steam'), NS = 'http://www.w3.org/2000/svg', t = 0;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function puff(i) {
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', 118 + rnd(-20, 20)); c.setAttribute('cy', 118 + rnd(-14, 12)); c.setAttribute('r', rnd(14, 24));
    c.setAttribute('fill', 'url(#m2Puff2)');
    var dir = Math.random() < .5 ? -1 : 1;
    c.style.setProperty('--x', rnd(10, 46) * dir + 'px');
    c.style.setProperty('--mx', rnd(-26, 26) + 'px');
    c.style.setProperty('--y', -rnd(92, 150) + 'px');
    c.style.setProperty('--s', rnd(2.2, 3.2));
    c.style.animationDuration = rnd(2.8, 3.8) + 's';
    c.style.animationDelay = (i * .16 + rnd(0, .25)) + 's';
    return c;
  }
  m.addEventListener('click', function () {
    if (reduce.matches) return;
    g.textContent = '';
    for (var i = 0; i < 12; i++) g.appendChild(puff(i));
    m.classList.remove('is-steaming'); void m.getBoundingClientRect(); m.classList.add('is-steaming');
    clearTimeout(t); t = setTimeout(function () { m.classList.remove('is-steaming'); g.textContent = ''; }, 6200);
  });
})();
