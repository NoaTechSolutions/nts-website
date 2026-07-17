"use client";

// ─────────────────────────────────────────────────────────────
// HERO · página de servicio "Diseño Web" (/servicios/diseno-web).
// Premium-first. Desktop: 2 columnas (texto izq + escena 3D der). Mobile/tablet:
// centrado + glows (el 3D NO se monta <1024px → performance). Copy con keywords
// para SEO. Título con keyword rotativa, entrada en cascada, CTA ámbar (10%).
// ─────────────────────────────────────────────────────────────

import { motion } from "motion/react";
import { useLanguage } from "../language-provider";
import { HeroRotatingWord } from "../hero-rotating-word";
import { WavyBackground } from "../ui/wavy-background";

const COPY = {
  es: {
    eyebrow: "Diseño y Desarrollo Web",
    lead: "Diseño web a medida que",
    rotating: ["convierte", "vende", "enamora", "posiciona"],
    rotatingAria: "Diseño web a medida que convierte, vende, enamora y posiciona.",
    subtitle:
      "Estudio de diseño y desarrollo web a medida: creamos páginas web profesionales, rápidas y optimizadas para SEO, pensadas para convertir tus visitas en clientes reales.",
    primaryCta: "Cotiza tu proyecto",
    secondaryCta: "Ver trabajos",
  },
  en: {
    eyebrow: "Web Design & Development",
    lead: "Custom web design that",
    rotating: ["converts", "sells", "delights", "ranks"],
    rotatingAria: "Custom web design that converts, sells, delights and ranks.",
    subtitle:
      "A custom web design and development studio: we build fast, professional, SEO-optimized websites made to turn your visitors into real customers.",
    primaryCta: "Get a quote",
    secondaryCta: "See our work",
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

  return (
    <section className="dw-hero">
      {/* Fondo Wavy Background (Aceternity) — ondas navy/sky por ruido simplex.
          El fill se adapta al tema (lee var(--bg-page)). Detrás del contenido. */}
      <WavyBackground
        colors={["#05a5ff", "#38b6ff", "#0a4fd0", "#7cc4ff", "#022977"]}
        waveOpacity={0.5}
        amplitude={160}
        blur={11}
        speed="fast"
      />
      {/* Backdrop anterior (glows) — se mantiene comentado por si se revierte:
      <div className="dw-hero-glow dw-hero-glow-a" aria-hidden="true" />
      <div className="dw-hero-glow dw-hero-glow-b" aria-hidden="true" /> */}

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
        </motion.div>
      </div>
    </section>
  );
}
