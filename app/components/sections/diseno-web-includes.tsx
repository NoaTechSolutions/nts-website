"use client";

// SECCIÓN 4 · Qué incluye tu web (grid BENTO). Value prop / entregables.
import { useLanguage } from "../language-provider";
import { DesignCanvasBg } from "../ui/design-canvas-bg";

const COPY = {
  es: {
    eyebrow: "Qué incluye",
    title: "Todo lo que tu web necesita para vender",
    copy: "No solo diseño. Una web completa, rápida y lista para crecer.",
    included: "Incluido",
    cards: [
      { icon: "🎨", title: "Diseño a medida", copy: "Nada de plantillas. Cada pixel pensado para tu marca y tu público.", span: "lg:col-span-2 lg:row-span-2" },
      { icon: "⚡", title: "Carga ultra-rápida", copy: "Optimizada para <2s. Más velocidad = más conversión.", span: "" },
      { icon: "📱", title: "100% responsive", copy: "Impecable en teléfono, tablet y desktop.", span: "" },
      { icon: "🔍", title: "SEO técnico", copy: "Estructura pensada para rankear en Google desde el día uno.", span: "lg:col-span-2" },
      { icon: "🛠️", title: "Autogestionable", copy: "Editá tu contenido sin depender de nadie (CMS).", span: "" },
      { icon: "🔒", title: "Segura y con hosting", copy: "SSL, backups y mantenimiento incluidos.", span: "" },
    ],
  },
  en: {
    eyebrow: "What's included",
    title: "Everything your site needs to sell",
    copy: "Not just design. A complete, fast website ready to grow.",
    included: "Included",
    cards: [
      { icon: "🎨", title: "Custom design", copy: "No templates. Every pixel built for your brand and audience.", span: "lg:col-span-2 lg:row-span-2" },
      { icon: "⚡", title: "Ultra-fast load", copy: "Optimized for <2s. More speed = more conversion.", span: "" },
      { icon: "📱", title: "100% responsive", copy: "Flawless on phone, tablet and desktop.", span: "" },
      { icon: "🔍", title: "Technical SEO", copy: "Built to rank on Google from day one.", span: "lg:col-span-2" },
      { icon: "🛠️", title: "Self-manageable", copy: "Edit your content without depending on anyone (CMS).", span: "" },
      { icon: "🔒", title: "Secure + hosting", copy: "SSL, backups and maintenance included.", span: "" },
    ],
  },
} as const;

export function DisenoWebIncludes() {
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

        <div className="mt-12 grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map((c) => {
            // Card destacada (col-span-2 row-span-2) → lleva fondo animado.
            const isFeatured = c.span.includes("row-span-2");
            return (
            <div
              key={c.title}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#022977]/10 bg-white p-7 shadow-[0_10px_30px_rgba(2,41,119,0.06)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/4 ${c.span}`}
            >
              {isFeatured && <DesignCanvasBg />}
              {/* Glow de fondo: aparece al hover (contenido en overflow-hidden). */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#05a5ff]/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Ícono: se achica un toque al hover. */}
              <div className="relative z-10 origin-left text-3xl transition-transform duration-300 group-hover:scale-90">
                {c.icon}
              </div>

              {/* Texto: se eleva al hover (desktop) para dejar aparecer el CTA. */}
              <div className="relative z-10 mt-6 transform-gpu transition-transform duration-300 lg:group-hover:-translate-y-7">
                <h3
                  className="text-xl font-semibold text-[#022977] dark:text-white"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#022977]/65 dark:text-[#c8d8f0]/70">
                  {c.copy}
                </p>
              </div>

              {/* CTA que se revela deslizándose desde abajo (efecto bento). */}
              <div className="pointer-events-none absolute inset-x-7 bottom-6 z-10 flex translate-y-4 items-center gap-1.5 text-sm font-semibold text-[#1e63e6] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:text-[#5fa8ff]">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.included}
              </div>

              {/* Overlay sutil al hover. */}
              <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-[#022977]/2 dark:group-hover:bg-white/3" />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
