/* ============================================================
   JS compartido del portfolio — menú móvil + animaciones
   ============================================================ */
(function () {
    /* ---------- Menú móvil ---------- */
    document.addEventListener("click", function (e) {
        var toggle = e.target.closest("[data-menu-toggle]");
        if (toggle) {
            var menu = document.getElementById("mobile-menu");
            if (menu) menu.classList.toggle("hidden");
            return;
        }
        var link = e.target.closest("#mobile-menu a");
        if (link) {
            var m = document.getElementById("mobile-menu");
            if (m) m.classList.add("hidden");
        }
    });

    /* ---------- Animaciones (progressive enhancement) ---------- */
    function initAnimations() {
        document.body.classList.add("anim-ready");

        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Auto-etiquetar bloques a revelar: hijos directos de cada section/header del main
        var containers = document.querySelectorAll("main > section, main > header, footer");
        containers.forEach(function (c) {
            var kids = c.children;
            var i = 0;
            for (var k = 0; k < kids.length; k++) {
                var el = kids[k];
                if (el.classList.contains("reveal")) continue;
                // saltar líneas/decoraciones absolutas
                el.classList.add("reveal");
                el.style.transitionDelay = Math.min(i * 70, 350) + "ms";
                i++;
            }
        });

        if (reduce || !("IntersectionObserver" in window)) {
            document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

        // Barras de progreso: llenado animado al entrar en pantalla
        var bars = [];
        document.querySelectorAll('[style*="width:"]').forEach(function (el) {
            var m = (el.getAttribute("style") || "").match(/width:\s*([\d.]+)%/);
            if (!m) return;
            if (!/rounded-full/.test(el.className)) return; // sólo barras
            el.dataset.fill = m[1];
            el.style.width = "0%";
            el.style.transition = "width 1.2s cubic-bezier(.2,.7,.2,1)";
            bars.push(el);
        });
        if (bars.length) {
            var bio = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target;
                    bio.unobserve(el);
                    requestAnimationFrame(function () {
                        setTimeout(function () { el.style.width = el.dataset.fill + "%"; }, 120);
                    });
                });
            }, { threshold: 0.6 });
            bars.forEach(function (el) { bio.observe(el); });
        }

        // Contador animado para métricas con [data-count]
        var counters = document.querySelectorAll("[data-count]");
        if (counters.length) {
            var cio = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target;
                    cio.unobserve(el);
                    var raw = el.getAttribute("data-count");
                    var prefix = el.getAttribute("data-prefix") || "";
                    var suffix = el.getAttribute("data-suffix") || "";
                    var target = parseFloat(raw);
                    if (isNaN(target)) return;
                    var dur = 1100, start = performance.now();
                    function tick(now) {
                        var p = Math.min((now - start) / dur, 1);
                        var eased = 1 - Math.pow(1 - p, 3);
                        var val = Math.round(target * eased);
                        el.textContent = prefix + val + suffix;
                        if (p < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
            }, { threshold: 0.5 });
            counters.forEach(function (el) { cio.observe(el); });
        }
    }

    /* ---------- Lightbox (visor de imágenes de la Galería de Producto) ---------- */
    function initLightbox() {
        var imgs = [].slice.call(document.querySelectorAll("[data-gallery] img"));
        if (!imgs.length) return;

        var overlay = document.createElement("div");
        overlay.className = "lb-overlay";
        overlay.innerHTML =
            '<div class="lb-stage">' +
                '<img class="lb-img" alt="" />' +
                '<button class="lb-btn lb-prev" aria-label="Anterior">‹</button>' +
                '<button class="lb-btn lb-next" aria-label="Siguiente">›</button>' +
                '<button class="lb-btn lb-close" aria-label="Cerrar">✕</button>' +
                '<span class="lb-counter"></span>' +
                '<span class="lb-caption"></span>' +
            '</div>';
        document.body.appendChild(overlay);

        var imgEl = overlay.querySelector(".lb-img");
        var counter = overlay.querySelector(".lb-counter");
        var caption = overlay.querySelector(".lb-caption");
        var current = 0;

        function show(i) {
            current = (i + imgs.length) % imgs.length;
            var src = imgs[current];
            imgEl.style.opacity = 0;
            setTimeout(function () {
                imgEl.src = src.currentSrc || src.src;
                imgEl.alt = src.alt || "";
                imgEl.style.opacity = 1;
            }, 90);
            counter.textContent = (current + 1) + " / " + imgs.length;
            caption.textContent = src.alt || "";
        }
        function open(i) { show(i); overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
        function close() { overlay.classList.remove("open"); document.body.style.overflow = ""; }

        imgs.forEach(function (im, i) {
            im.classList.add("lb-zoomable");
            im.addEventListener("click", function () { open(i); });
        });

        overlay.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
        overlay.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
        overlay.querySelector(".lb-close").addEventListener("click", close);
        overlay.addEventListener("click", function (e) { if (e.target === overlay || e.target.classList.contains("lb-stage")) close(); });
        document.addEventListener("keydown", function (e) {
            if (!overlay.classList.contains("open")) return;
            if (e.key === "Escape") close();
            else if (e.key === "ArrowLeft") show(current - 1);
            else if (e.key === "ArrowRight") show(current + 1);
        });

        // Swipe en móvil
        var sx = null;
        overlay.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
        overlay.addEventListener("touchend", function (e) {
            if (sx === null) return;
            var dx = e.changedTouches[0].clientX - sx;
            if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
            sx = null;
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { initAnimations(); initLightbox(); });
    } else {
        initAnimations(); initLightbox();
    }
})();
