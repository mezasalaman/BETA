/* ============================================================
   JS compartido del portfolio — menú móvil + animaciones
   ============================================================ */
(function () {
    /* ---------- Menú móvil: botón hamburguesa + drawer lateral ----------
       Componente global. Se construye a partir de los enlaces que el navbar
       ya tiene en cada página (no hay que duplicar markup en los HTML).
       Solo aplica en móvil (< 768px); en desktop/tablet se conserva el navbar. */
    var NAV_PROJECTS = [
        { num: "01", name: "FoodDelivery", desc: "Data-Driven Product Design", file: "food-delivery.html", current: "food-delivery" },
        { num: "02", name: "Satelock", desc: "Product Design · Research & Operations", file: "satelock.html", current: "satelock" },
        { num: "03", name: "Seller Center", desc: "Marketplace · Product Design", file: "sellercenter.html", current: "seller" },
        { num: "04", name: "ConDuzko", desc: "Product Management · IA", file: "conduzko.html", current: "conduzko" }
    ];
    var ARROW_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var CLOSE_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

    function escAttr(s) {
        return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    }

    function initMobileNav() {
        var nav = document.querySelector("nav");
        if (!nav || nav.getAttribute("data-mobile-nav") === "ready") return;

        var brand = nav.querySelector('a[href$="index.html"]');
        var aboutLink = nav.querySelector('a[href$="about.html"]');
        var dropdownLinks = nav.querySelectorAll(".dropdown-menu a");
        if (!brand || !aboutLink || !dropdownLinks.length) return;

        // Ruta correcta de cada proyecto (raíz o /pages/), tomada del navbar de la página
        function hrefFor(file) {
            for (var i = 0; i < dropdownLinks.length; i++) {
                var h = dropdownLinks[i].getAttribute("href") || "";
                if (h.toLowerCase().indexOf(file) > -1) return h;
            }
            return null;
        }

        // Página actual (también reconoce los case studies de cada proyecto)
        var path = decodeURIComponent(location.pathname).toLowerCase().split("/").pop().replace(/\.html$/, "");
        var onAbout = path === "about";

        // ---- Botón hamburguesa: cuadrado azul a la derecha (el logo no se toca) ----
        var burger = document.createElement("button");
        burger.type = "button";
        burger.className = "nav-burger";
        burger.setAttribute("aria-label", "Abrir menú");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-controls", "nav-drawer");
        burger.setAttribute("aria-haspopup", "dialog");
        burger.innerHTML = '<span class="nav-burger__bar"></span><span class="nav-burger__bar"></span><span class="nav-burger__bar"></span>';

        // Menú móvil anterior (sustituido por el drawer): el botón nuevo ocupa su lugar, a la derecha
        var oldToggle = nav.querySelector("[data-menu-toggle]");
        if (oldToggle && oldToggle.parentNode) {
            oldToggle.parentNode.replaceChild(burger, oldToggle);
        } else {
            brand.parentNode.appendChild(burger);
        }
        var oldMenu = document.getElementById("mobile-menu");
        if (oldMenu) oldMenu.remove();

        // ---- Drawer ----
        var items = NAV_PROJECTS.map(function (p, i) {
            var href = hrefFor(p.file);
            if (!href) return "";
            var isCurrent = path.indexOf(p.current) === 0;
            return '<a class="nav-drawer__item" style="--i:' + i + '" href="' + escAttr(href) + '"' +
                (isCurrent ? ' aria-current="page"' : "") + ">" +
                '<span class="nav-drawer__num">' + p.num + "</span>" +
                '<span class="nav-drawer__text"><span class="nav-drawer__name">' + p.name + '</span>' +
                '<span class="nav-drawer__desc">' + p.desc + "</span></span>" +
                '<span class="nav-drawer__end" aria-hidden="true">' +
                (isCurrent ? '<span class="nav-drawer__dot"></span>' : ARROW_SVG) + "</span></a>";
        }).join("");

        var overlay = document.createElement("div");
        overlay.className = "nav-overlay";
        overlay.setAttribute("aria-hidden", "true");

        var drawer = document.createElement("aside");
        drawer.id = "nav-drawer";
        drawer.className = "nav-drawer";
        drawer.setAttribute("role", "dialog");
        drawer.setAttribute("aria-modal", "true");
        drawer.setAttribute("aria-label", "Menú de navegación");
        drawer.setAttribute("aria-hidden", "true");
        drawer.innerHTML =
            '<div class="nav-drawer__head">' +
                '<div><a class="nav-drawer__brand" href="' + escAttr(brand.getAttribute("href")) + '">Carlos Meza</a>' +
                '<p class="nav-drawer__role">PRODUCT / UX / IA</p></div>' +
                '<button type="button" class="nav-drawer__close" aria-label="Cerrar menú">' + CLOSE_SVG + "</button>" +
            "</div>" +
            '<nav class="nav-drawer__nav" aria-label="Principal">' +
                '<p class="nav-drawer__eyebrow">Proyectos</p>' +
                '<div class="nav-drawer__list">' + items + "</div>" +
                '<a class="nav-drawer__about" style="--i:4" href="' + escAttr(aboutLink.getAttribute("href")) + '"' +
                    (onAbout ? ' aria-current="page"' : "") + ">" +
                    '<span>Sobre mí</span><span class="nav-drawer__end" aria-hidden="true">' +
                    (onAbout ? '<span class="nav-drawer__dot"></span>' : ARROW_SVG) + "</span></a>" +
            "</nav>";

        document.body.appendChild(overlay);
        document.body.appendChild(drawer);
        nav.setAttribute("data-mobile-nav", "ready");

        var closeBtn = drawer.querySelector(".nav-drawer__close");
        var mq = window.matchMedia("(max-width: 767.98px)");
        var isOpen = false;

        function open() {
            if (isOpen || !mq.matches) return;
            isOpen = true;
            burger.setAttribute("aria-expanded", "true");
            burger.setAttribute("aria-label", "Cerrar menú");
            drawer.setAttribute("aria-hidden", "false");
            drawer.classList.add("is-open");
            overlay.classList.add("is-open");
            document.documentElement.classList.add("nav-lock");
            requestAnimationFrame(function () { closeBtn.focus({ preventScroll: true }); });
        }

        function close(returnFocus) {
            if (!isOpen) return;
            isOpen = false;
            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Abrir menú");
            drawer.setAttribute("aria-hidden", "true");
            drawer.classList.remove("is-open");
            overlay.classList.remove("is-open");
            document.documentElement.classList.remove("nav-lock");
            if (returnFocus !== false) burger.focus({ preventScroll: true });
        }

        burger.addEventListener("click", function () { isOpen ? close() : open(); });
        closeBtn.addEventListener("click", function () { close(); });
        overlay.addEventListener("click", function () { close(); });
        drawer.addEventListener("click", function (e) {
            if (e.target.closest("a")) close(false);
        });

        document.addEventListener("keydown", function (e) {
            if (!isOpen) return;
            if (e.key === "Escape") { e.preventDefault(); close(); return; }
            if (e.key !== "Tab") return;
            // Trampa de foco dentro del drawer
            var f = drawer.querySelectorAll("a[href], button:not([disabled])");
            if (!f.length) return;
            var first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            else if (!drawer.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        });

        // Si se pasa a tablet/desktop con el menú abierto, se cierra y se libera el scroll
        var onChange = function () { if (!mq.matches) close(false); };
        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq.addListener) mq.addListener(onChange);
        window.addEventListener("pageshow", function (e) { if (e.persisted) close(false); });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initMobileNav);
    else initMobileNav();

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
