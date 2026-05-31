/* ============================================================
   SISTEMA DE ICONOGRAFÍA — Portfolio Carlos Meza
   ------------------------------------------------------------
   • Trazo (stroke) sobre viewBox 24×24, grosor 1.7, caps/joins
     redondeados. Heredan color y tamaño del contenedor
     (currentColor + width/height 100%).
   • Uso:  <span class="ic" data-icon="rocket"></span>
           tamaño/color con clases del contenedor (text-primary, h-6 w-6…)
           grosor opcional:  data-sw="1.5"
   • Algunos íconos llevan tramos rellenos (fill="currentColor").
   ============================================================ */
(function () {
    var ICONS = {
        /* ---------- Navbar / navegación ---------- */
        "brush": '<path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>',
        "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
        "close": '<path d="M6 6l12 12M18 6 6 18"/>',
        "home": '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-9"/><path d="M10 20v-5h4v5"/>',
        "work": '<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>',
        "about": '<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>',
        "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
        "arrow-up-right": '<path d="M7 17 17 7M8 7h9v9"/>',
        "external": '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
        "chevron-down": '<path d="m6 9 6 6 6-6"/>',
        "download": '<path d="M12 3v12M8 11l4 4 4-4M5 20h14"/>',

        /* ---------- Secciones principales ---------- */
        "intro": '<path d="M12 3l1.9 4.9L19 9.5l-5.1 1.6L12 16l-1.9-4.9L5 9.5l5.1-1.6L12 3z"/>',
        "section-work": '<path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M4 13h16"/>',
        "process": '<rect x="3" y="4" width="6" height="5" rx="1.5"/><rect x="15" y="15" width="6" height="5" rx="1.5"/><path d="M9 6.5h3a3 3 0 0 1 3 3V17"/>',
        "gallery": '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 3.5L17 12l3 3"/>',
        "section-contact": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',

        /* ---------- Servicios / habilidades ---------- */
        "ux-strategy": '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.4 5.6L8 16l2.4-5.6L16 8z"/>',
        "product-design": '<path d="m4 20 1-4L16 5l3 3L8 19l-4 1z"/><path d="m14 7 3 3"/>',
        "research": '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.3-3.3"/>',
        "design-systems": '<circle cx="7" cy="7" r="3.2"/><rect x="14" y="4" width="6" height="6" rx="1.4"/><rect x="4" y="14" width="6" height="6" rx="3"/><rect x="14" y="14" width="6" height="6" rx="1.4"/>',
        "prototyping": '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M8 9l2.5 2.5L8 14M13 14h3"/>',
        "ai-workflow": '<path d="M12 3l1.6 4.2L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.8L12 3z"/><path d="m18.5 14 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" fill="currentColor" stroke="none"/>',
        "usability": '<path d="M5 3l6.5 16.5 2.3-6.7 6.7-2.3L5 3z"/>',
        "data-analysis": '<path d="M4 20h16"/><rect x="5" y="11" width="3.2" height="7" rx="1"/><rect x="10.4" y="6" width="3.2" height="12" rx="1"/><rect x="15.8" y="9" width="3.2" height="9" rx="1"/>',

        /* ---------- Proyectos ---------- */
        "delivery": '<path d="M6 8h12l-1.1 11.1a1 1 0 0 1-1 .9H8.1a1 1 0 0 1-1-.9L6 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/><path d="M9.5 12h5"/>',
        "satelock": '<path d="M12 3 5 6v5c0 4.6 3.1 7.6 7 9 3.9-1.4 7-4.4 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/>',
        "seller": '<path d="M5 9 6 4h12l1 5"/><path d="M5 9h14v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9z"/><path d="M5 9a2.4 2.4 0 0 0 4.7 0 2.4 2.4 0 0 0 4.6 0 2.4 2.4 0 0 0 4.7 0"/>',
        "conduzko": '<path d="m4.5 12 1.4-4.2A2 2 0 0 1 7.8 6.4h8.4a2 2 0 0 1 1.9 1.4L19.5 12"/><path d="M3 12h18v4.5a1 1 0 0 1-1 1h-1.5"/><path d="M5.5 17.5H4a1 1 0 0 1-1-1V12"/><circle cx="7.6" cy="17" r="1.7"/><circle cx="16.4" cy="17" r="1.7"/>',
        "case-study": '<path d="M6 3h7l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M13 3v5h5"/><circle cx="10.5" cy="13" r="2.1"/><path d="m13.5 16-1.4-1.4"/>',
        "web": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6" cy="6.6" r=".7" fill="currentColor" stroke="none"/><circle cx="8.3" cy="6.6" r=".7" fill="currentColor" stroke="none"/>',
        "mobile-app": '<rect x="7" y="3" width="10" height="18" rx="2.6"/><path d="M10.5 18h3"/>',
        "dashboard": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/><path d="m12 13 2 2 3-3.5"/>',

        /* ---------- Tecnologías (marcas representadas con iconografía propia) ---------- */
        "tech-html": '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
        "tech-css": '<path d="M9 4c-2 0-3 1-3 3v2c0 1.6-.9 2.6-2 3 1.1.4 2 1.4 2 3v2c0 2 1 3 3 3"/><path d="M15 4c2 0 3 1 3 3v2c0 1.6.9 2.6 2 3-1.1.4-2 1.4-2 3v2c0 2-1 3-3 3"/>',
        "tech-js": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13.5 15H17"/>',
        "tech-tailwind": '<path d="M4 11.2c1.6-3.2 4.2-3.2 5.8-1.6C11.2 11.2 12.2 11.6 13.6 10c1.6-1.6 4.2-1.6 5.8 1.6"/><path d="M4 16.2c1.6-3.2 4.2-3.2 5.8-1.6 1.4 1.6 2.4 2 3.8.4 1.6-1.6 4.2-1.6 5.8 1.6" opacity=".45"/>',
        "tech-react": '<circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
        "tech-figma": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 4v16"/><circle cx="14.5" cy="14.5" r="2.1"/>',
        "tech-ai": '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9.5 10v4M14.5 10v4M11 11.5h2.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
        "tech-analytics": '<path d="M4 5v14h16"/><path d="m7 14 3-4 3 2.2 4-6"/>',
        "tech-automation": '<circle cx="6" cy="6.5" r="2.4"/><circle cx="18" cy="6.5" r="2.4"/><circle cx="18" cy="17.5" r="2.4"/><path d="M8.4 6.5H15.6M18 8.9v6.2"/>',

        /* ---------- Métricas / logros ---------- */
        "trending-up": '<path d="M3 17 9 11l4 4 8-8"/><path d="M16 7h5v5"/>',
        "target": '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/>',
        "funnel": '<path d="M4 5h16l-6 7v5l-4 2v-7L4 5z"/>',
        "gauge": '<path d="M5 18a8 8 0 1 1 14 0"/><path d="m12 14 4-3.2"/><circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none"/>',
        "rocket": '<path d="M9 15c-5 1-5 5-5 5s4 0 5-5"/><path d="M9.5 14.5 8 13c.5-5 4-9.5 11-10.5C20 9.5 15.5 13 10.5 13.5l-1-.5z"/><circle cx="14.5" cy="9.5" r="1.4"/>',
        "trophy": '<path d="M8 4h8v4.5a4 4 0 0 1-8 0V4z"/><path d="M8 5H5v1.2a3 3 0 0 0 3 3M16 5h3v1.2a3 3 0 0 1-3 3"/><path d="M10 13.5h4M9 20h6M12 13v3.5"/>',
        "growth": '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
        "verified": '<path d="m12 3 2.3 1.7 2.8-.3 1 2.7 2.4 1.5-.8 2.7.8 2.7-2.4 1.5-1 2.7-2.8-.3L12 21l-2.3-1.7-2.8.3-1-2.7L3.5 15.4l.8-2.7-.8-2.7 2.4-1.5 1-2.7 2.8.3L12 3z"/><path d="m9 12 2 2 4-4"/>',

        /* ---------- Contacto ---------- */
        "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        "phone": '<path d="M5 4h3.2l1.6 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.6V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
        "whatsapp": '<path d="M.5 23.5l1.7-6.1A11.8 11.8 0 1 1 12.5 23a11.9 11.9 0 0 1-5.7-1.4L.5 23.5zm6.6-3.8c1.7 1 3.3 1.6 5.4 1.6a9.9 9.9 0 1 0-9.9-9.9c0 2.1.6 3.6 1.6 5.3l-1 3.6 3.9-1.6z" fill="currentColor" stroke="none"/><path d="M18 14.2c-.2 0-1.7-.9-2-1-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5l-1-2.2c-.2-.6-.4-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.8.7 2.4.8 3.3.6.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4l-.5-.3z" fill="currentColor" stroke="none"/>',
        "location": '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
        "calendar": '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
        "send": '<path d="M21 4 3 11l7 3 3 7 8-17z"/><path d="M21 4 10 14"/>',

        /* ---------- Redes sociales ---------- */
        "linkedin": '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H17v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z" fill="currentColor" stroke="none"/>',
        "social-whatsapp": '<path d="M.5 23.5l1.7-6.1A11.8 11.8 0 1 1 12.5 23a11.9 11.9 0 0 1-5.7-1.4L.5 23.5zm6.6-3.8c1.7 1 3.3 1.6 5.4 1.6a9.9 9.9 0 1 0-9.9-9.9c0 2.1.6 3.6 1.6 5.3l-1 3.6 3.9-1.6zm10.9-3.5c-.2 0-1.7-.9-2-1-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5l-1-2.2c-.2-.6-.4-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.8.7 2.4.8 3.3.6.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4l-.5-.3z" fill="currentColor" stroke="none"/>',
        "social-mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        "profile": '<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>',
        "link": '<path d="M9 15 15 9"/><path d="M10.5 6.5 12 5a4 4 0 0 1 5.7 5.7l-1.5 1.5M13.5 17.5 12 19a4 4 0 0 1-5.7-5.7l1.5-1.5"/>',

        /* ---------- Estados UI ---------- */
        "hover": '<path d="M5 3l6.5 16.5 2.3-6.7 6.7-2.3L5 3z"/><path d="m14 14 5 5" />',
        "active": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6" fill="currentColor" stroke="none"/>',
        "error": '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
        "success": '<circle cx="12" cy="12" r="9"/><path d="m8.4 12.3 2.3 2.3 4.9-5.1"/>',
        "loading": '<path d="M12 3a9 9 0 1 0 9 9" stroke-linecap="round"/>',
        "info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r=".7" fill="currentColor" stroke="none"/>',
        "warning": '<path d="M12 3.5 2.6 20h18.8L12 3.5z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".7" fill="currentColor" stroke="none"/>',
        "disabled": '<circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/>'
    };

    function svgFor(name, sw) {
        var inner = ICONS[name];
        if (!inner) return "";
        var spin = name === "loading" ? " class=\"ic-spin\"" : "";
        return '<svg' + spin + ' viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="' +
            (sw || "1.7") + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
    }

    function hydrate(root) {
        (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
            if (el.dataset.iconDone) return;
            var html = svgFor(el.getAttribute("data-icon"), el.getAttribute("data-sw"));
            if (!html) return;
            el.innerHTML = html;
            el.classList.add("ic");
            el.dataset.iconDone = "1";
        });
    }

    // Exponer para uso programático
    window.ICONS = ICONS;
    window.icon = function (name, sw) { return svgFor(name, sw); };
    window.hydrateIcons = hydrate;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { hydrate(); });
    } else {
        hydrate();
    }
})();
