"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "ANTES / DESPUÉS" · wipe al scrollear (efecto del CodePen de GreenSock
// oNjgEjm, recreado con Motion en vez de GSAP ScrollTrigger para integrarse con
// el smooth-scroll Lenis del sitio sin tocar el provider global).
// La sección se pinnea y, al scrollear, el "después" hace un wipe sobre el
// "antes": el contenedor entra desde la derecha (x 100%→0) y su contenido
// contra-traslada (x -100%→0) → el contenido queda fijo mientras se revela.
// Mockups placeholder — se reemplazan por capturas reales.
// ═══════════════════════════════════════════════════════════
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "El cambio",
    title: "Antes y después",
    copy: "Scrolleá para ver la transformación: del sitio que frenaba a la web que vende.",
    before: "ANTES",
    after: "DESPUÉS",
  },
  en: {
    eyebrow: "The change",
    title: "Before & after",
    copy: "Scroll to see the transformation: from the site that held them back to the one that sells.",
    before: "BEFORE",
    after: "AFTER",
  },
} as const;

export function DisenoWebShowcase() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // El "después" hace el wipe entre el 12% y 88% del scroll pinneado.
  const afterX = useTransform(scrollYProgress, [0.12, 0.88], ["100%", "0%"]);
  const innerX = useTransform(scrollYProgress, [0.12, 0.88], ["-100%", "0%"]);

  return (
    <section ref={ref} className="relative w-full" style={{ height: "200vh" }}>
      <div className="dw-compare-pin">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title mt-3">{t.title}</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>
        </div>

        <div className="dw-compare-stage">
            {/* ANTES (fondo) — mock apagado */}
            <div className="dw-compare-before">
              <div className="flex h-full w-full flex-col gap-3 bg-neutral-200 p-5 dark:bg-neutral-800 sm:p-7">
                <div className="h-3.5 w-20 rounded bg-neutral-400 dark:bg-neutral-600" />
                <div className="h-1/3 w-full rounded-lg bg-neutral-300 dark:bg-neutral-700" />
                <div className="grid flex-1 grid-cols-3 gap-3">
                  <div className="rounded-lg bg-neutral-300 dark:bg-neutral-700" />
                  <div className="rounded-lg bg-neutral-300 dark:bg-neutral-700" />
                  <div className="rounded-lg bg-neutral-300 dark:bg-neutral-700" />
                </div>
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur">
                {t.before}
              </span>
            </div>

            {/* DESPUÉS (wipe) — mock on-brand */}
            <motion.div className="dw-compare-after" style={{ x: afterX }}>
              <motion.div className="dw-compare-after-inner" style={{ x: innerX }}>
                <div className="flex h-full w-full flex-col gap-3 bg-gradient-to-br from-[#022977] via-[#0a3fb0] to-[#05a5ff] p-5 sm:p-7">
                  <div className="h-3.5 w-24 rounded bg-white/50" />
                  <div className="h-1/3 w-full rounded-xl bg-white/15 backdrop-blur" />
                  <div className="grid flex-1 grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/15" />
                    <div className="rounded-xl bg-[#ff9900]/70" />
                    <div className="rounded-xl bg-white/15" />
                  </div>
                </div>
              </motion.div>
              <span className="absolute left-4 top-4 z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur">
                {t.after}
              </span>
            </motion.div>
          </div>
      </div>
    </section>
  );
}
