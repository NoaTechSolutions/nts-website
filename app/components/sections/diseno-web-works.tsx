"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "PORTFOLIO WEB" · ÚNICA sección para MOSTRAR LAS WEBS HECHAS.
// Carrusel horizontal (scroll-snap) de sitios en marco de navegador.
// Primera pasada: capturas placeholder (gradientes). Se reemplazan por
// screenshots reales de cada proyecto.
// ═══════════════════════════════════════════════════════════
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "Nuestro trabajo",
    title: "Webs que diseñamos",
    copy: "Una muestra de sitios que combinan diseño premium con resultados reales.",
    cta: "Ver todos los proyectos",
  },
  en: {
    eyebrow: "Our work",
    title: "Websites we've designed",
    copy: "A selection of sites that combine premium design with real results.",
    cta: "See all projects",
  },
} as const;

// Proyectos placeholder (reemplazar por capturas + datos reales).
const WORKS = [
  { name: "Aurora Store", tag: "E-commerce", url: "aurorastore.com", from: "#022977", to: "#05a5ff" },
  { name: "Nórdic Estudio", tag: "Web corporativa", url: "nordic.studio", from: "#0a3fb0", to: "#38b6ff" },
  { name: "Vértice", tag: "Landing page", url: "vertice.io", from: "#022977", to: "#0a63d6" },
  { name: "Lumen Café", tag: "Sitio + reservas", url: "lumencafe.com", from: "#04143f", to: "#05a5ff" },
];

export function DisenoWebWorks() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-3">{t.title}</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>
        </div>

        {/* Carrusel horizontal (scroll-snap) */}
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {WORKS.map((w) => (
            <article
              key={w.name}
              className="w-[86vw] shrink-0 snap-start sm:w-[440px]"
            >
              {/* Marco de navegador */}
              <div className="overflow-hidden rounded-2xl border border-[#022977]/10 bg-white shadow-[0_20px_50px_rgba(2,41,119,0.14)] dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 border-b border-black/5 bg-[#f4f7fc] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate text-xs text-[#022977]/50 dark:text-[#c8d8f0]/50">
                    {w.url}
                  </span>
                </div>
                {/* Captura placeholder */}
                <div
                  className="flex aspect-[16/10] items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${w.from}, ${w.to})` }}
                >
                  <span
                    className="text-2xl font-semibold text-white/90"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {w.name}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h3
                  className="text-lg font-semibold text-[#022977] dark:text-white"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {w.name}
                </h3>
                <span className="rounded-full bg-[#05a5ff]/12 px-3 py-1 text-xs font-medium text-[#0a63d6] dark:text-[#38b6ff]">
                  {w.tag}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a63d6] hover:underline dark:text-[#38b6ff]"
          >
            {t.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
