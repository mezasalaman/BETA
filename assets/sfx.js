/* Sonido sintetizado (sin archivos): hoja que se pasa. Solo al abrir una carpeta del escritorio,
   tras un gesto del usuario y nunca con prefers-reduced-motion. */
(function () {
  var ctx = null, reduce = matchMedia('(prefers-reduced-motion: reduce)');
  function ac() {
    if (reduce.matches) return null;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (_) { ctx = null; }
    return ctx;
  }
  function flip() {
    var c = ac(); if (!c) return;
    var t0 = c.currentTime, len = .42, n = Math.floor(c.sampleRate * len);
    var buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var s = c.createBufferSource(); s.buffer = buf;
    // "fshh" de la hoja al pasar: barrido de frecuencia alto → medio con ataque rápido y cola suave
    var f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = .9;
    f.frequency.setValueAtTime(7000, t0); f.frequency.exponentialRampToValueAtTime(1800, t0 + len);
    var g = c.createGain();
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.32, t0 + .05); g.gain.exponentialRampToValueAtTime(.001, t0 + len);
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(t0); s.stop(t0 + len);
    // golpecito suave cuando la hoja cae en su sitio
    var o = c.createOscillator(), og = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(140, t0 + .3); o.frequency.exponentialRampToValueAtTime(60, t0 + .42);
    og.gain.setValueAtTime(0, t0 + .3); og.gain.linearRampToValueAtTime(.12, t0 + .31); og.gain.exponentialRampToValueAtTime(.001, t0 + .44);
    o.connect(og); og.connect(c.destination); o.start(t0 + .3); o.stop(t0 + .46);
  }
  window.dkSfx = { flip: flip };
})();
