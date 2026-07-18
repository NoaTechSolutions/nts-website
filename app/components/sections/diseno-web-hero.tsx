"use client";

// ─────────────────────────────────────────────────────────────
// HERO · página de servicio "Diseño Web" (/servicios/diseno-web).
// Premium-first. Desktop: 2 columnas (texto izq + escena 3D der). Mobile/tablet:
// centrado + glows (el 3D NO se monta <1024px → performance). Copy con keywords
// para SEO. Título con keyword rotativa, entrada en cascada, CTA ámbar (10%).
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../language-provider";
import { WavyBackground } from "../ui/wavy-background";
import { HeroVideoWord } from "../ui/hero-video-word";
import { MagneticButton } from "../ui/magnetic-button";
import { GradientBadge } from "../ui/gradient-badge";

const COPY = {
  es: {
    eyebrow: "Diseño y Desarrollo Web",
    titleLead: "La web que",
    titleAccent: "Siempre Imaginaste",
    subtitle:
      "Diseño y desarrollo web a medida, veloz y optimizado para SEO. Creamos una página que enamora a tus visitantes desde el primer segundo y los transforma en clientes reales. Empieza hoy.",
    primaryCta: "Habla con un experto",
  },
  en: {
    eyebrow: "Web Design & Development",
    titleLead: "The website you",
    titleAccent: "Always Imagined",
    subtitle:
      "Custom web design and development, fast and SEO-optimized. We build a site that wins over your visitors from the very first second and turns them into real customers. Start today.",
    primaryCta: "Talk to an expert",
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

  // Teléfono / phablet (≤600px): la palabra del video se apila en 2 filas para
  // que las letras sean más grandes y no toquen los bordes.
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");
    const update = () => setIsPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
          <motion.span className="dw-hero-badge-wrap" variants={item}>
            <GradientBadge icon="palette">{t.eyebrow}</GradientBadge>
          </motion.span>

          <motion.h1 className="dw-hero-title" variants={item}>
            {t.titleLead}
            <br />
            <HeroVideoWord
              text={t.titleAccent}
              src="/diseno-web-hero-ocean-loop.webm"
              className="dw-hero-title-accent"
              stack={isPhone}
            />
          </motion.h1>

          <motion.p className="dw-hero-subtitle" variants={item}>
            {t.subtitle}
          </motion.p>

          <motion.div className="dw-hero-actions" variants={item}>
            <MagneticButton
              href="#contacto-form"
              className="dw-hero-cta-primary"
            >
              <span className="dw-hero-cta-label">
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
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
