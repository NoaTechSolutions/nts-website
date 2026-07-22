"use client";

// ─────────────────────────────────────────────────────────────
// HERO · página de servicio "Branding" (/servicios/branding).
// Sigue el molde del hero de Diseño Web (dw-hero) pero con personalidad
// propia: ondas CÁLIDAS (amber-led, el secundario de marca) en vez del océano
// azul — misma familia visual, otra energía. Accent del título con AuroraText
// (gradiente animado) en vez de video word. Copy con keywords SEO de branding.
// ─────────────────────────────────────────────────────────────

import { motion } from "motion/react";
import { useLanguage } from "../language-provider";
import { WavyBackground } from "../ui/wavy-background";
import { AuroraText } from "@/components/ui/aurora-text";
import { MagneticButton } from "../ui/magnetic-button";
import { GradientBadge } from "../ui/gradient-badge";

const COPY = {
  es: {
    eyebrow: "Branding e Identidad Visual",
    titleLead: "La marca que",
    titleAccent: "Tu Negocio Merece",
    subtitle:
      "Diseño de logo, identidad visual y manual de marca profesionales. Convertimos tu idea en una marca memorable y coherente en cada punto de contacto: del boceto a la realidad.",
    primaryCta: "Habla con un experto",
  },
  en: {
    eyebrow: "Branding & Visual Identity",
    titleLead: "The brand your",
    titleAccent: "Business Deserves",
    subtitle:
      "Professional logo design, visual identity and brand guidelines. We turn your idea into a memorable brand, consistent across every touchpoint: from sketch to reality.",
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

export function BrandingHero() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  return (
    <section className="dw-hero">
      {/* Ondas cálidas: amber (secundario de marca) + navy/sky de soporte.
          El amber solo como acento decorativo — nunca fondo de sección. */}
      <WavyBackground
        colors={["#ff9900", "#ffb85c", "#05a5ff", "#ffd9a3", "#022977"]}
        waveOpacity={0.45}
        amplitude={160}
        blur={11}
        speed="fast"
      />

      <div className="dw-hero-inner">
        <motion.div
          className="dw-hero-text"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className="dw-hero-badge-wrap" variants={item}>
            <GradientBadge icon="wand">{t.eyebrow}</GradientBadge>
          </motion.span>

          <motion.h1 className="dw-hero-title" variants={item}>
            {t.titleLead}
            <br />
            <AuroraText
              className="dw-hero-title-accent"
              colors={["#ff9900", "#ffb85c", "#05a5ff", "#0400f0"]}
            >
              {t.titleAccent}
            </AuroraText>
          </motion.h1>

          <motion.p className="dw-hero-subtitle" variants={item}>
            {t.subtitle}
          </motion.p>

          <motion.div className="dw-hero-actions" variants={item}>
            <MagneticButton href="#contacto-form" className="dw-hero-cta-primary">
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
