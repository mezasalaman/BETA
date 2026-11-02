/* Abre el bloque desplegable si el enlace llega a un ancla de su interior. */
(function () {
  var d = document.querySelector('.ov-more'); if (!d) return;
  function open() { var id = location.hash.slice(1); if (id && d.querySelector('#' + CSS.escape(id))) { d.open = true; document.getElementById(id).scrollIntoView(); } }
  addEventListener('hashchange', open); open();
})();
