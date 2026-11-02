/* CV: vista de hojas, selector de idioma (ES / EN) y visor a pantalla completa. */
(function () {
  var dlg = document.querySelector('.dk-viewer'); if (!dlg) return;
  var LANGS = {
    es: { pdf: '../assets/CV-Jose-Carlos-Meza-Gonzales-ES.pdf', pre: '../assets/cv/cv-p', alt: 'CV de José Carlos Meza, página ', of: ' de 2', open: 'Abrir página ', openEnd: ' de 2 del CV a pantalla completa',
          dl: 'Descargar CV · PDF', full: 'Ver en pantalla completa', quick: ['Product Designer Semi Senior', 'Lima, Perú', '4+ años de experiencia'] },
    en: { pdf: '../assets/CV-Jose-Carlos-Meza-Gonzales-EN.pdf', pre: '../assets/cv/cv-en-p', alt: 'CV of José Carlos Meza, page ', of: ' of 2', open: 'Open page ', openEnd: ' of 2 of the CV in full screen',
          dl: 'Download CV · PDF', full: 'View full screen', quick: ['Semi-Senior Product Designer', 'Lima, Peru', '4+ years of experience'] }
  };
  var lang = 'es';
  try { lang = sessionStorage.getItem('dk-cv-lang') || (/^en/i.test(navigator.language) ? 'en' : 'es'); } catch (_) {}
  if (!LANGS[lang]) lang = 'es';
  var img = dlg.querySelector('img'), i = 0, opener = null;
  function pageSrc(n) { return LANGS[lang].pre + (n + 1) + '.webp'; }
  function pageAlt(n) { return LANGS[lang].alt + (n + 1) + LANGS[lang].of; }
  function show(n) { i = (n + 2) % 2; img.src = pageSrc(i); img.alt = pageAlt(i); }
  function setLang(l) {
    lang = l; var L = LANGS[l];
    try { sessionStorage.setItem('dk-cv-lang', l); } catch (_) {}
    document.documentElement.lang = l;
    document.querySelectorAll('.dk-pg').forEach(function (b) {
      var n = +b.dataset.page, im = b.querySelector('img');
      im.src = pageSrc(n); im.alt = pageAlt(n);
      b.setAttribute('aria-label', L.open + (n + 1) + L.openEnd);
    });
    var dl = document.querySelector('.dk-dl'), op = document.querySelector('.dk-open'), q = document.querySelectorAll('.dk-quick span');
    dl.href = L.pdf; dl.textContent = L.dl; op.href = L.pdf; op.textContent = L.full;
    q.forEach(function (sp, k) { sp.textContent = L.quick[k]; });
    document.querySelectorAll('.dk-lang button').forEach(function (b) { b.setAttribute('aria-checked', b.dataset.lang === l ? 'true' : 'false'); b.tabIndex = b.dataset.lang === l ? 0 : -1; });
  }
  document.querySelectorAll('.dk-lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
    b.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); var o = document.querySelector('.dk-lang button:not([data-lang="' + lang + '"])'); o.focus(); setLang(o.dataset.lang);
    });
  });
  setLang(lang);
  document.querySelectorAll('.dk-pg').forEach(function (b) {
    b.addEventListener('click', function () { opener = b; show(+b.dataset.page); dlg.showModal(); dlg.querySelector('.dk-vclose').focus(); });
  });
  dlg.querySelector('.dk-vprev').addEventListener('click', function () { show(i - 1); });
  dlg.querySelector('.dk-vnext').addEventListener('click', function () { show(i + 1); });
  dlg.querySelector('.dk-vclose').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('dk-viewer-in')) dlg.close(); });
  dlg.addEventListener('close', function () { if (opener) opener.focus(); });
})();
