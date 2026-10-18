/* ============================================================
   Configuración compartida de Tailwind (CDN) — Portfolio Carlos Meza
   TEMA CLARO: fondo blanco, superficies suaves, CTAs azules.
   Editá aquí los colores/tipografía y se aplican a todas las páginas.
   ============================================================ */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#315CFF",   /* azul CTA principal */
                royal: "#315CFF",     /* azul CTA / acentos */
                electric: "#315CFF",  /* azul métricas / acentos */
                accent: "#315CFF",    /* CTA (antes naranja) -> azul */
                ink: "#ffffff",        /* fondo base (blanco) */
                card: "#f6f7f9",       /* superficie de cards */
                panel: "#eef1f5",      /* paneles */
                panel2: "#eef1f5",     /* bento */
                dim: "#5b6573",        /* texto secundario */
                hairline: "#e4e8ee",   /* bordes / líneas */
                err: "#dc2626",        /* rojo problema */
                ok: "#16a34a",         /* verde solución */
                sun: "#FFD34E",        /* cuaderno: amarillo */
                navy: "#101828",       /* cuaderno: azul navy */
            },
            fontFamily: {
                sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            maxWidth: {
                shell: "1100px",
                grid: "1050px",
            },
            boxShadow: {
                glow: "0 0 0 4px rgba(49,92,255,0.15)",
                drop: "0 12px 30px rgba(16,24,40,0.10)",
                showcase: "0 30px 70px rgba(16,24,40,0.12)",
            },
        },
    },
};
