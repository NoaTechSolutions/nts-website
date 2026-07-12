"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN 3 · El problema (framing de dolor). Efecto STICKY SCROLL REVEAL
// (inspirado en Aceternity): a la izquierda los "frenos" van cambiando con el
// scroll y a la derecha un panel PEGADO (sticky) muestra el visual del freno
// activo. Recreado con scroll de PÁGINA + position:sticky + IntersectionObserver
// (compatible con Lenis; el scroll interno del original pelearía con el smooth
// scroll del sitio). Mobile: tarjetas apiladas (el sticky 2-col no aplica).
// ═══════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "El problema",
    title: "Tu web no debería frenar tu negocio",
    copy: "La mayoría de las webs se ven bien... y no venden. Estos son los frenos más comunes que cuestan clientes todos los días.",
    items: [
      { icon: "🐌", title: "Carga lenta", copy: "Cada segundo de más hace que pierdas visitas y ventas.", visual: "Se fue" },
      { icon: "📱", title: "No se ve en el celular", copy: "El 65% de tu tráfico es mobile. Si ahí falla, perdés.", visual: "65%" },
      { icon: "🎯", title: "No convierte", copy: "Bonita pero sin estrategia: la gente entra y se va.", visual: "0 leads" },
      { icon: "🔍", title: "Nadie la encuentra", copy: "Sin SEO técnico, Google no te muestra.", visual: "Página 7" },
    ],
  },
  en: {
    eyebrow: "The problem",
    title: "Your website shouldn't hold your business back",
    copy: "Most websites look good... and don't sell. These are the most common blockers costing you clients every day.",
    items: [
      { icon: "🐌", title: "Slow to load", copy: "Every extra second loses you visits and sales.", visual: "Gone" },
      { icon: "📱", title: "Broken on mobile", copy: "65% of your traffic is mobile. If it fails there, you lose.", visual: "65%" },
      { icon: "🎯", title: "Doesn't convert", copy: "Pretty but no strategy: people come and leave.", visual: "0 leads" },
      { icon: "🔍", title: "Nobody finds it", copy: "Without technical SEO, Google won't show you.", visual: "Page 7" },
    ],
  },
} as const;

// Gradientes on-brand por freno (navy/sky, el último con acento naranja).
const GRADIENTS = [
  "linear-gradient(135deg, #022977 0%, #0a3fb0 100%)",
  "linear-gradient(135deg, #0a3fb0 0%, #05a5ff 100%)",
  "linear-gradient(135deg, #012061 0%, #3f2fb0 100%)",
  "linear-gradient(135deg, #04122e 0%, #ff8c1a 100%)",
];

export function DisenoWebProblem() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Detecta el paso cuyo centro cruza el centro del viewport (banda del 10%).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-3">{t.title}</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>
        </div>

        {/* ── STICKY SCROLL REVEAL (desktop ≥1024) ── */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: los frenos, uno por paso de scroll */}
          <div>
            {t.items.map((it, i) => (
              <div
                key={it.title}
                data-idx={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[68vh] flex-col justify-center"
              >
                <div
                  className={`transition-all duration-500 ${
                    active === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-30 translate-y-1"
                  }`}
                >
                  <span className="text-4xl">{it.icon}</span>
                  <h3
                    className="mt-4 text-3xl font-semibold text-[#022977] dark:text-white"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {it.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-[#022977]/65 dark:text-[#c8d8f0]/70">
                    {it.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Derecha: panel PEGADO que muestra el freno activo */}
          <div>
            <div className="sticky top-[18vh] h-[64vh] overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(2,41,119,0.28)]">
              {t.items.map((it, i) => (
                <div
                  key={it.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 text-center text-white transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: GRADIENTS[i] }}
                >
                  <span className="text-7xl drop-shadow-lg">{it.icon}</span>
                  <span
                    className="text-5xl font-bold"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {it.visual}
                  </span>
                  <span className="text-lg font-medium text-white/80">
                    {it.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fallback MOBILE (<1024): tarjetas apiladas ── */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
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
