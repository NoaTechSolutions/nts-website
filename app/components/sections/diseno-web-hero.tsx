"use client";

// ─────────────────────────────────────────────────────────────
// HERO · página de servicio "Diseño Web" (/servicios/diseno-web).
// Premium-first. Desktop: 2 columnas (texto izq + escena 3D der). Mobile/tablet:
// centrado + glows (el 3D NO se monta <1024px → performance). Copy con keywords
// para SEO. Título con keyword rotativa, entrada en cascada, CTA ámbar (10%).
// ─────────────────────────────────────────────────────────────

import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../language-provider";
import { HeroRotatingWord } from "../hero-rotating-word";
import { NumberTicker } from "@/components/ui/number-ticker";

// Escena 3D: chunk aparte (three/drei son pesados) → solo se descarga cuando
// realmente se monta (desktop). Lazy + gate por matchMedia.
const Hero3DScene = lazy(() =>
  import("../ui/hero-3d-scene").then((m) => ({ default: m.Hero3DScene })),
);

const COPY = {
  es: {
    eyebrow: "Diseño Web",
    lead: "Diseño web que",
    rotating: ["convierte", "vende", "enamora", "posiciona"],
    rotatingAria: "Diseño web que convierte, vende, enamora y posiciona.",
    subtitle:
      "Estudio de diseño y desarrollo web a medida. Creamos páginas web profesionales, rápidas y optimizadas para convertir visitas en clientes reales.",
    primaryCta: "Cotizá tu proyecto",
    secondaryCta: "Ver trabajos",
    stats: [
      { value: 150, suffix: "+", label: "Proyectos entregados", delay: 0 },
      { value: 99, suffix: "%", label: "Clientes satisfechos", delay: 0.15 },
      { value: 48, suffix: "h", label: "Tiempo de respuesta", delay: 0.3 },
    ],
  },
  en: {
    eyebrow: "Web Design",
    lead: "Web design that",
    rotating: ["converts", "sells", "delights", "ranks"],
    rotatingAria: "Web design that converts, sells, delights and ranks.",
    subtitle:
      "A custom web design and development studio. We build fast, professional websites optimized to turn visitors into real customers.",
    primaryCta: "Get a quote",
    secondaryCta: "See our work",
    stats: [
      { value: 150, suffix: "+", label: "Projects delivered", delay: 0 },
      { value: 99, suffix: "%", label: "Happy clients", delay: 0.15 },
      { value: 48, suffix: "h", label: "Response time", delay: 0.3 },
    ],
  },
} as const;

// Cascada de entrada (fade + subida + blur), coherente con el hero de la home.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function DisenoWebHero() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  // 3D solo en desktop (≥1024) y si el usuario no pidió menos movimiento.
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow3D(desktop && !reduce);
  }, []);

  return (
    <section className="dw-hero">
      {/* Backdrop premium: glows suaves navy/sky (sin canvas → rápido) */}
      <div className="dw-hero-glow dw-hero-glow-a" aria-hidden="true" />
      <div className="dw-hero-glow dw-hero-glow-b" aria-hidden="true" />

      <div className="dw-hero-inner">
        <motion.div
          className="dw-hero-text"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className="eyebrow dw-hero-eyebrow" variants={item}>
            {t.eyebrow}
          </motion.span>

          <motion.h1 className="dw-hero-title" variants={item}>
            {t.lead}{" "}
            <HeroRotatingWord words={t.rotating} ariaLabel={t.rotatingAria} />
          </motion.h1>

          <motion.p className="dw-hero-subtitle" variants={item}>
            {t.subtitle}
          </motion.p>

          <motion.div className="dw-hero-actions" variants={item}>
            <a href="#contacto-form" className="dw-hero-cta-primary">
              {t.primaryCta}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#portfolio" className="dw-hero-cta-secondary">
              {t.secondaryCta}
            </a>
          </motion.div>

          <motion.div className="dw-hero-stats" variants={item}>
            {t.stats.map((stat) => (
              <div key={stat.label} className="dw-hero-stat">
                <p className="dw-hero-stat-value">
                  <NumberTicker value={stat.value} delay={stat.delay} />
                  <span>{stat.suffix}</span>
                </p>
                <p className="dw-hero-stat-label">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Columna visual 3D — solo desktop (montaje client-only) */}
        <div className="dw-hero-visual" aria-hidden="true">
          {show3D && (
            <Suspense fallback={null}>
              <Hero3DScene />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
