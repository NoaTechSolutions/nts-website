"use client";

// SECCIÓN 3 · El problema (framing de dolor, corto). Premium-first: breve.
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "El problema",
    title: "Tu web no debería frenar tu negocio",
    copy: "La mayoría de las webs se ven bien... y no venden. Estos son los frenos más comunes que cuestan clientes todos los días.",
    items: [
      { icon: "🐌", title: "Carga lenta", copy: "Cada segundo de más hace que pierdas visitas y ventas." },
      { icon: "📱", title: "No se ve en el celular", copy: "El 65% de tu tráfico es mobile. Si ahí falla, perdés." },
      { icon: "🎯", title: "No convierte", copy: "Bonita pero sin estrategia: la gente entra y se va." },
      { icon: "🔍", title: "Nadie la encuentra", copy: "Sin SEO técnico, Google no te muestra." },
    ],
  },
  en: {
    eyebrow: "The problem",
    title: "Your website shouldn't hold your business back",
    copy: "Most websites look good... and don't sell. These are the most common blockers costing you clients every day.",
    items: [
      { icon: "🐌", title: "Slow to load", copy: "Every extra second loses you visits and sales." },
      { icon: "📱", title: "Broken on mobile", copy: "65% of your traffic is mobile. If it fails there, you lose." },
      { icon: "🎯", title: "Doesn't convert", copy: "Pretty but no strategy: people come and leave." },
      { icon: "🔍", title: "Nobody finds it", copy: "Without technical SEO, Google won't show you." },
    ],
  },
} as const;

export function DisenoWebProblem() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="section-title mt-3">{t.title}</h2>
        <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-[#022977]/10 bg-white p-6 text-left shadow-[0_10px_30px_rgba(2,41,119,0.06)] dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="text-2xl">{it.icon}</div>
              <h3
                className="mt-3 text-lg font-semibold text-[#022977] dark:text-white"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#022977]/65 dark:text-[#c8d8f0]/70">
                {it.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
