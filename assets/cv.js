(function () {
  var dlg = document.querySelector('.dk-viewer'); if (!dlg) return;
  var pages = [['../assets/cv/cv-p1.webp', 'CV de José Carlos Meza, página 1 de 2'], ['../assets/cv/cv-p2.webp', 'CV de José Carlos Meza, página 2 de 2']];
  var img = dlg.querySelector('img'), i = 0, opener = null;
  function show(n) { i = (n + pages.length) % pages.length; img.src = pages[i][0]; img.alt = pages[i][1]; }
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
