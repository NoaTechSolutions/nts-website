"use client";

// SECCIÓN 2 · Barra de confianza (social proof temprano). Logos placeholder +
// mini-frase. Primera pasada — los logos reales se cargan después.
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    label: "Marcas y negocios que ya confían en nosotros",
    logos: ["NTSSign", "KinderCtrl", "Aurora", "NÓRDIC", "Vértice", "Lumen"],
  },
  en: {
    label: "Brands and businesses that already trust us",
    logos: ["NTSSign", "KinderCtrl", "Aurora", "NÓRDIC", "Vértice", "Lumen"],
  },
} as const;

export function DisenoWebTrust() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  return (
    <section className="relative w-full px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#022977]/50 dark:text-[#c8d8f0]/50">
          {t.label}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {t.logos.map((logo) => (
            <span
              key={logo}
              className="text-lg font-semibold tracking-tight text-[#022977]/55 transition-opacity hover:opacity-100 dark:text-[#c8d8f0]/55"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
