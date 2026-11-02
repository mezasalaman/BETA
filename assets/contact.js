document.querySelectorAll('[data-copy]').forEach(function (b) {
  b.addEventListener('click', function () {
    var out = b.parentNode.querySelector('.dk-copied');
    function ok() { out.textContent = 'Copiado'; setTimeout(function () { out.textContent = ''; }, 2000); }
    if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(ok, ok); else ok();
  });
});
