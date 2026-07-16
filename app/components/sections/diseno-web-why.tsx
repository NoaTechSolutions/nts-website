"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "POR QUÉ ELEGIRNOS" · diferenciadores de DISEÑO WEB.
// (Nada de software/SaaS — eso vive en la página de Software a medida.)
// ═══════════════════════════════════════════════════════════
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "Por qué elegirnos",
    title: "Diseño web con estrategia, no plantillas",
    copy: "Cualquiera te arma una web. Nosotros diseñamos una herramienta pensada para que tu negocio venda más.",
    points: [
      { title: "Diseño a medida", copy: "Nada de temas genéricos. Cada web nace de tu marca y tu público." },
      { title: "Rápida y optimizada para SEO", copy: "Velocidad y estructura pensadas para rankear y convertir." },
      { title: "Un solo equipo, trato directo", copy: "Hablas con quien diseña tu web. Sin intermediarios ni demoras." },
      { title: "Soporte después de lanzar", copy: "No desaparecemos: te acompañamos con cambios y mejoras." },
    ],
    proofLabel: "El resultado",
    proofTitle: "Webs que venden",
    proofStat: "<2s",
    proofStatLabel: "de carga promedio",
    proofCopy: "Diseño premium + rendimiento real: sitios rápidos, claros y pensados para convertir visitas en clientes.",
  },
  en: {
    eyebrow: "Why choose us",
    title: "Web design with strategy, not templates",
    copy: "Anyone can build you a website. We design a tool made to help your business sell more.",
    points: [
      { title: "Custom design", copy: "No generic themes. Every site starts from your brand and audience." },
      { title: "Fast and SEO-optimized", copy: "Speed and structure built to rank and convert." },
      { title: "One team, direct contact", copy: "You talk to whoever designs your site. No middlemen, no delays." },
      { title: "Support after launch", copy: "We don't disappear: we stay with you for changes and improvements." },
    ],
    proofLabel: "The result",
    proofTitle: "Websites that sell",
    proofStat: "<2s",
    proofStatLabel: "average load time",
    proofCopy: "Premium design + real performance: fast, clear sites built to turn visitors into customers.",
  },
} as const;

export function DisenoWebWhy() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Izquierda: texto + puntos */}
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-3">{t.title}</h2>
          <p className="section-copy mt-4">{t.copy}</p>

          <ul className="mt-8 space-y-5">
            {t.points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#05a5ff]/15 text-[#05a5ff]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <h3
                    className="font-semibold text-[#022977] dark:text-white"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#022977]/65 dark:text-[#c8d8f0]/70">
                    {p.copy}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Derecha: card de resultado (web, sin software) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#022977] to-[#0a3fb0] p-10 text-white shadow-[0_24px_60px_rgba(2,41,119,0.28)]">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#05a5ff]/30 blur-3xl" />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#ff9900]">
            {t.proofLabel}
          </p>
          <h3
            className="mt-4 text-3xl font-semibold"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {t.proofTitle}
          </h3>
          <div className="mt-6 flex items-baseline gap-2">
            <span
              className="text-5xl font-bold text-[#38b6ff]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {t.proofStat}
            </span>
            <span className="text-sm text-white/70">{t.proofStatLabel}</span>
          </div>
          <p className="mt-4 max-w-sm leading-relaxed text-white/80">{t.proofCopy}</p>
        </div>
      </div>
    </section>
  );
}
