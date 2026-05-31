/* ============================================================
   Configuración compartida de Tailwind (CDN) — Portfolio Carlos Meza
   TEMA CLARO: fondo blanco, superficies suaves, CTAs azules.
   Editá aquí los colores/tipografía y se aplican a todas las páginas.
   ============================================================ */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#2563eb",   /* azul CTA principal */
                royal: "#2563eb",     /* azul CTA / acentos */
                electric: "#2563eb",  /* azul métricas / acentos */
                accent: "#2563eb",    /* CTA (antes naranja) -> azul */
                ink: "#ffffff",        /* fondo base (blanco) */
                card: "#f6f7f9",       /* superficie de cards */
                panel: "#eef1f5",      /* paneles */
                panel2: "#eef1f5",     /* bento */
                dim: "#5b6573",        /* texto secundario */
                hairline: "#e4e8ee",   /* bordes / líneas */
                err: "#dc2626",        /* rojo problema */
                ok: "#16a34a",         /* verde solución */
            },
            fontFamily: {
                sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            maxWidth: {
                shell: "1100px",
                grid: "1050px",
            },
            boxShadow: {
                glow: "0 0 0 4px rgba(37,99,235,0.15)",
                drop: "0 12px 30px rgba(15,23,42,0.10)",
                showcase: "0 30px 70px rgba(15,23,42,0.12)",
            },
        },
    },
};
