"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN 3 · El problema (framing de dolor). Efecto STICKY SCROLL REVEAL
// (inspirado en Aceternity): a la izquierda los "frenos" van cambiando con el
// scroll y a la derecha un panel PEGADO (sticky) muestra el video del freno
// activo. Recreado con scroll de PÁGINA + position:sticky; el freno activo se
// detecta por proximidad al centro del viewport (ver useEffect) — robusto a
// cualquier alto de pantalla. Cada freno tiene su color de acento (ACCENTS).
// Mobile: tarjetas apiladas (el sticky 2-col no aplica).
// ═══════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "El problema",
    title: "Tu web no debería frenar tu negocio",
    copy: "La mayoría de las webs se ven bien... y no venden. Estos son los frenos más comunes que cuestan clientes todos los días.",
    items: [
      { title: "Carga lenta", subtitle: "Tu cliente no espera: si tarda, se va con la competencia." },
      { title: "Rota en el celular", subtitle: "8 de cada 10 te miran desde el teléfono… y ven un desastre." },
      { title: "Linda pero vacía", subtitle: "Entran, miran y se van sin dejarte un solo mensaje." },
      { title: "Invisible en Google", subtitle: "Tu competencia aparece arriba. Vos quedás al fondo, donde nadie llega." },
    ],
  },
  en: {
    eyebrow: "The problem",
    title: "Your website shouldn't hold your business back",
    copy: "Most websites look good... and don't sell. These are the most common blockers costing you clients every day.",
    items: [
      { title: "Slow to load", subtitle: "Your customer won't wait — if it lags, they're gone." },
      { title: "Broken on mobile", subtitle: "8 in 10 visit from their phone… and see a mess." },
      { title: "Pretty but empty", subtitle: "They come, they look, they leave without a word." },
      { title: "Invisible on Google", subtitle: "Your competition ranks above you. You're at the bottom, where no one looks." },
    ],
  },
} as const;

// Gradientes on-brand por freno (navy/sky, el último con acento naranja).
// Sirven de FONDO/placeholder mientras el video del freno no exista.
const GRADIENTS = [
  "linear-gradient(135deg, #022977 0%, #0a3fb0 100%)",
  "linear-gradient(135deg, #0a3fb0 0%, #05a5ff 100%)",
  "linear-gradient(135deg, #012061 0%, #3f2fb0 100%)",
  "linear-gradient(135deg, #04122e 0%, #ff8c1a 100%)",
];

// Color de acento por freno — distinto para cada uno, on-brand y visible en
// claro y oscuro. Pinta el título del texto (izquierda) y el borde del card.
const ACCENTS = ["#1e63e6", "#05a5ff", "#7c5cff", "#ff9900"];

// Video por freno (mismo para ES/EN, es visual). "" = todavía sin video →
// se muestra el gradiente + emoji de placeholder. Servido desde /public.
const VIDEOS = [
  "/noatechsolutions-diseno-web-carga-lenta.mp4",
  "/noatechsolutions-diseno-web-no-mobile.mp4",
  "/noatechsolutions-diseno-web-no-convierte.mp4",
  "/noatechsolutions-diseno-web-no-seo.mp4",
];

export function DisenoWebProblem() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // En cada scroll, marca activo el paso cuyo CENTRO está más cerca del centro
    // del viewport. Determinista y robusto a cualquier alto de pantalla — el
    // IntersectionObserver con banda de rootMargin fallaba en viewports bajos
    // (1024×768) y dejaba el activo clavado en 0. Lenis scrollea la página de
    // forma nativa, así que el evento "scroll" de window dispara igual.
    let raf = 0;
    const compute = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mx-auto mt-3">{t.title}</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>
        </div>

        {/* ── STICKY SCROLL REVEAL (desktop ≥1024) ── */}
        <div className="mt-6 hidden lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: los frenos, uno por paso de scroll */}
          <div>
            {t.items.map((it, i) => (
              <div
                key={it.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[62vh] flex-col justify-center"
              >
                <div
                  className={`transition-all duration-500 ${
                    active === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-30 translate-y-1"
                  }`}
                >
                  <h3
                    className="text-4xl font-semibold"
                    style={{ fontFamily: "var(--font-display), sans-serif", color: ACCENTS[i] }}
                  >
                    {it.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-[#022977]/70 dark:text-[#c8d8f0]/75">
                    {it.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Derecha: panel PEGADO que muestra el freno activo */}
          <div>
            <div
              className="sticky top-[32vh] aspect-video w-full overflow-hidden rounded-3xl border-2 shadow-[0_24px_60px_rgba(2,41,119,0.28)] transition-colors duration-500"
              style={{ borderColor: ACCENTS[active] }}
            >
              {t.items.map((it, i) => (
                <div
                  key={it.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: GRADIENTS[i] }}
                >
                  {VIDEOS[i] ? (
                    <video
                      className="absolute inset-0 h-full w-full object-contain"
                      src={VIDEOS[i]}
                      aria-label={`${it.title} — ${it.subtitle}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-10 text-center text-white">
                      <span
                        className="text-4xl font-bold"
                        style={{ fontFamily: "var(--font-display), sans-serif" }}
                      >
                        {it.title}
                      </span>
                      <span className="text-lg font-medium text-white/80">
                        {it.subtitle}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fallback MOBILE (<1024): tarjetas apiladas ── */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
          {t.items.map((it, i) => (
            <div
              key={it.title}
              className="rounded-2xl border-l-4 border-y border-r border-[#022977]/10 bg-white p-6 text-left shadow-[0_10px_30px_rgba(2,41,119,0.06)] dark:border-y-white/10 dark:border-r-white/10 dark:bg-white/4"
              style={{ borderLeftColor: ACCENTS[i] }}
            >
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-display), sans-serif", color: ACCENTS[i] }}
              >
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#022977]/70 dark:text-[#c8d8f0]/75">
                {it.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
