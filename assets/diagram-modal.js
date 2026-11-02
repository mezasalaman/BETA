/* Diagramas ampliados: botón X, zoom con botones, rueda (Ctrl/⌘), doble clic/toque y pellizco */
(function () {
  document.querySelectorAll('dialog').forEach(function (d) {
    var img = d.querySelector('img[src$=".svg"]');
    var close = d.querySelector('button[id$="-close"]');
    if (!img || !close) return;
    var box = img.parentElement, head = close.parentElement, z = 1, MAX = 4;

    close.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    close.setAttribute('aria-label', 'Cerrar diagrama');
    close.style.cssText += ';display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;flex:none';

    function btn(label, txt) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', label); b.textContent = txt;
      b.style.cssText = 'width:40px;height:40px;border-radius:999px;border:1px solid #315CFF;background:#fff;color:#315CFF;font:600 20px/1 inherit;cursor:pointer';
      return b;
    }
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;gap:8px;margin-left:auto;align-items:center';
    var minus = btn('Alejar', '−'), plus = btn('Acercar', '+');
    bar.append(minus, plus); head.insertBefore(bar, close);
    head.style.flexWrap = 'nowrap';

    function apply(nz, cx, cy) {
      nz = Math.max(1, Math.min(MAX, nz));
      var r = box.getBoundingClientRect(), fx = (box.scrollLeft + (cx == null ? r.width / 2 : cx)) / box.scrollWidth, fy = (box.scrollTop + (cy == null ? r.height / 2 : cy)) / box.scrollHeight;
      z = nz;
      img.style.width = (z * 100) + '%';
      img.style.maxWidth = 'none';
      img.style.maxHeight = z === 1 ? 'calc(94vh - 110px)' : 'none';
      img.style.cursor = z === 1 ? 'zoom-in' : 'zoom-out';
      minus.disabled = z === 1; plus.disabled = z === MAX;
      minus.style.opacity = z === 1 ? .4 : 1; plus.style.opacity = z === MAX ? .4 : 1;
      box.scrollLeft = fx * box.scrollWidth - (cx == null ? r.width / 2 : cx);
      box.scrollTop = fy * box.scrollHeight - (cy == null ? r.height / 2 : cy);
    }
    apply(1);
    minus.addEventListener('click', function () { apply(z - 1); });
    plus.addEventListener('click', function () { apply(z + 1); });
    img.addEventListener('click', function (e) {
      var r = box.getBoundingClientRect();
      apply(z === 1 ? 2.5 : 1, e.clientX - r.left, e.clientY - r.top);
    });
    box.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      var r = box.getBoundingClientRect();
      apply(z * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });

    var d0 = 0, z0 = 1;
    function dist(t) { return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY); }
    box.addEventListener('touchstart', function (e) { if (e.touches.length === 2) { d0 = dist(e.touches); z0 = z; } }, { passive: true });
    box.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 2 || !d0) return;
      e.preventDefault();
      var r = box.getBoundingClientRect();
      apply(z0 * dist(e.touches) / d0, (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left, (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top);
    }, { passive: false });
    box.addEventListener('touchend', function () { d0 = 0; });
    box.style.touchAction = 'pan-x pan-y';
    d.addEventListener('close', function () { apply(1); box.scrollTo(0, 0); });
  });
})();
