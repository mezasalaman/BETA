/* Sonidos sintetizados (sin archivos): hoja de papel y tiza. Solo suenan tras un gesto del usuario
   y nunca con prefers-reduced-motion. */
(function () {
  var ctx = null, reduce = matchMedia('(prefers-reduced-motion: reduce)');
  function ac() {
    if (reduce.matches) return null;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (_) { ctx = null; }
    return ctx;
  }
  function noise(c, dur) {
    var n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var s = c.createBufferSource(); s.buffer = b; return s;
  }
  // Hoja de papel: ruido filtrado con "crujidos" irregulares
  function paper(len, vol) {
    var c = ac(); if (!c) return;
    len = len || .35; vol = vol || .22;
    var t0 = c.currentTime, s = noise(c, len), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'bandpass'; f.Q.value = .7;
    f.frequency.setValueAtTime(2600, t0); f.frequency.exponentialRampToValueAtTime(6500, t0 + len);
    g.gain.setValueAtTime(0, t0);
    for (var t = 0; t < len; t += .018) g.gain.setValueAtTime(vol * Math.random() * (1 - t / len), t0 + t);
    g.gain.linearRampToValueAtTime(0, t0 + len);
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(t0); s.stop(t0 + len);
  }
  // Tiza sobre pizarra: ruido agudo pulsado
  function chalk(len, vol) {
    var c = ac(); if (!c) return;
    len = len || .6; vol = vol || .18;
    var t0 = c.currentTime, s = noise(c, len), h = c.createBiquadFilter(), g = c.createGain();
    h.type = 'highpass'; h.frequency.value = 2200;
    for (var t = 0; t < len; t += .012) g.gain.setValueAtTime(vol * (.3 + .7 * Math.random()) * Math.min(1, (len - t) * 4), t0 + t);
    s.connect(h); h.connect(g); g.connect(c.destination); s.start(t0); s.stop(t0 + len);
  }
  window.dkSfx = { paper: paper, chalk: chalk };
})();
