"use client";

// SECCIÓN 4 · Qué incluye tu web (grid BENTO). Value prop / entregables.
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "Qué incluye",
    title: "Todo lo que tu web necesita para vender",
    copy: "No solo diseño. Una web completa, rápida y lista para crecer.",
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
          {t.cards.map((c) => (
            <div
              key={c.title}
              className={`group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#022977]/10 bg-white p-7 shadow-[0_10px_30px_rgba(2,41,119,0.06)] transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04] ${c.span}`}
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-6">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
