"use client";

// ─────────────────────────────────────────────────────────────
// DE BOCETO A REAL · sección estrella de /servicios/branding.
// Diferenciador validado por research: las agencias top (Ramotion, Pentagram,
// Halo Lab, Outcrowd) NO muestran la evolución boceto→final en sus páginas de
// servicio — la esconden en case studies. Acá es la pieza central.
//
// Desktop (lg+): pin sticky de 4 etapas scroll-driven. Un mismo logo demo
// evoluciona: (1) boceto a lápiz que se dibuja solo (SVG stroke-dashoffset),
// (2) vector con grid de construcción, (3) sistema de color + tipografía,
// (4) mockups reales (tarjeta / celular / etiqueta) hechos 100% con CSS —
// cero imágenes, cero peso. Cada etapa ancla a un ENTREGABLE (research: la
// sección vende proceso y entregables a la vez).
// Mobile: las 4 etapas apiladas como cards estáticas.
// ─────────────────────────────────────────────────────────────

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "De boceto a real",
    title: "Así nace tu marca",
    copy: "Sin cajas negras: mira exactamente cómo una idea a lápiz se convierte en una marca viviendo en el mundo real. Este es el camino que recorremos juntos.",
    stages: [
      {
        label: "01 · Boceto",
        deliverable: "Estrategia y concepto",
        text: "Escuchamos tu historia y exploramos conceptos a mano alzada. Las mejores marcas nacen en papel, no en plantillas.",
      },
      {
        label: "02 · Vector",
        deliverable: "Suite de logo completa",
        text: "El concepto ganador se construye con precisión geométrica: principal, variantes, isotipo y favicon.",
      },
      {
        label: "03 · Sistema",
        deliverable: "Manual de marca",
        text: "Color, tipografía y reglas de uso. Un sistema coherente que cualquiera puede aplicar sin romper tu marca.",
      },
      {
        label: "04 · Real",
        deliverable: "Kit de aplicaciones",
        text: "Tu marca viviendo donde importa: tarjetas, redes, empaques y pantallas. Lista para salir al mundo.",
      },
    ],
  },
  en: {
    eyebrow: "From sketch to real",
    title: "This is how your brand is born",
    copy: "No black boxes: watch exactly how a pencil idea becomes a brand living in the real world. This is the path we walk together.",
    stages: [
      {
        label: "01 · Sketch",
        deliverable: "Strategy & concept",
        text: "We listen to your story and explore concepts by hand. The best brands are born on paper, not templates.",
      },
      {
        label: "02 · Vector",
        deliverable: "Full logo suite",
        text: "The winning concept is built with geometric precision: primary, variants, mark and favicon.",
      },
      {
        label: "03 · System",
        deliverable: "Brand guidelines",
        text: "Color, typography and usage rules. A coherent system anyone can apply without breaking your brand.",
      },
      {
        label: "04 · Real",
        deliverable: "Application kit",
        text: "Your brand living where it matters: cards, social, packaging and screens. Ready for the world.",
      },
    ],
  },
} as const;

// ── Marca demo (abstracta): órbita + chispa. 3 paths simples → el stroke-draw
// se ve orgánico en etapa boceto y geométrico en vector. ──
function DemoMark({ stage }: { stage: number }) {
  const sketch = stage === 0;
  const withGrid = stage === 1;
  const withColor = stage >= 2;
  const stroke = sketch ? "rgba(2,41,119,0.45)" : withColor ? "url(#br-mark-grad)" : "var(--color-navy)";
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="br-mark-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff9900" />
          <stop offset="0.55" stopColor="#05a5ff" />
          <stop offset="1" stopColor="#0400f0" />
        </linearGradient>
      </defs>

      {/* Grid de construcción (solo etapa vector) */}
      <g
        className="transition-opacity duration-700"
        style={{ opacity: withGrid ? 1 : 0 }}
        stroke="var(--color-sky)"
        strokeWidth="0.6"
        strokeDasharray="3 3"
      >
        <circle cx="60" cy="60" r="44" />
        <circle cx="60" cy="60" r="26" />
        <line x1="60" y1="8" x2="60" y2="112" />
        <line x1="8" y1="60" x2="112" y2="60" />
      </g>

      {/* Órbita */}
      <path
        d="M 60 16 A 44 44 0 1 0 104 60"
        stroke={stroke}
        strokeWidth={sketch ? 3 : 6}
        strokeLinecap="round"
        className="br-sketch-path transition-all duration-700"
        style={{
          strokeDasharray: 280,
          strokeDashoffset: 0,
          transform: sketch ? "rotate(-3deg)" : "none",
          transformOrigin: "60px 60px",
        }}
      />
      {/* Chispa */}
      <path
        d="M 66 34 L 52 64 L 64 64 L 56 88 L 82 54 L 68 54 Z"
        stroke={stroke}
        strokeWidth={sketch ? 3 : 5}
        strokeLinejoin="round"
        fill={withColor ? "url(#br-mark-grad)" : "none"}
        className="br-sketch-path transition-all duration-700"
        style={{
          strokeDasharray: 200,
          strokeDashoffset: 0,
          transform: sketch ? "rotate(2deg)" : "none",
          transformOrigin: "60px 60px",
        }}
      />
    </svg>
  );
}

// ── Panel visual por etapa ──
function StageVisual({ stage }: { stage: number }) {
  const isReal = stage === 3;
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Hoja de papel / lienzo del logo */}
      <div
        className="relative flex items-center justify-center rounded-xl border transition-all duration-700"
        style={{
          width: isReal ? "38%" : "62%",
          aspectRatio: "1",
          background: stage === 0 ? "var(--bg-card)" : "var(--bg-page)",
          borderColor: "var(--color-line)",
          boxShadow: "var(--shadow-card)",
          transform: isReal ? "translate(-46%, -30%) rotate(-5deg)" : "none",
          // Cuadrícula de papel solo en boceto
          backgroundImage:
            stage === 0
              ? "linear-gradient(rgba(2,41,119,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(2,41,119,0.05) 1px, transparent 1px)"
              : "none",
          backgroundSize: stage === 0 ? "22px 22px" : "auto",
        }}
      >
        <div className="h-3/4 w-3/4">
          <DemoMark stage={stage} />
        </div>
      </div>

      {/* Sistema: chips de color + specimen tipográfico (etapa 2+) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: stage === 2 ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="absolute right-[4%] top-[12%] flex gap-2">
          {["#022977", "#0400f0", "#05a5ff", "#ff9900"].map((c) => (
            <span
              key={c}
              className="h-9 w-9 rounded-full border"
              style={{ background: c, borderColor: "var(--color-line)" }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-[10%] right-[4%] rounded-xl border px-5 py-3"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--color-line)",
            fontFamily: "var(--font-display-stack)",
          }}
        >
          <span className="block text-3xl" style={{ color: "var(--color-navy)" }}>
            Aa
          </span>
          <span className="block text-[0.65rem] uppercase tracking-[0.28em]" style={{ color: "var(--color-sky)" }}>
            Space Grotesk
          </span>
        </div>
      </div>

      {/* Real: mockups CSS (tarjeta + celular + etiqueta), etapa 3 */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isReal ? 1 : 0 }}
        aria-hidden="true"
      >
        {/* Tarjeta de visita */}
        <div
          className="absolute left-[8%] top-[54%] w-[46%] rounded-xl border p-4"
          style={{
            aspectRatio: "1.7",
            background: "var(--color-navy)",
            borderColor: "var(--color-line)",
            boxShadow: "var(--shadow-soft)",
            transform: "rotate(4deg)",
          }}
        >
          <div className="h-8 w-8">
            <DemoMark stage={2} />
          </div>
          <div className="mt-3 h-1.5 w-1/2 rounded-full bg-white/70" />
          <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-white/35" />
        </div>
        {/* Pantalla de celular */}
        <div
          className="absolute right-[10%] top-[16%] w-[26%] rounded-2xl border p-2.5"
          style={{
            aspectRatio: "0.5",
            background: "var(--bg-page)",
            borderColor: "var(--color-line-strong)",
            boxShadow: "var(--shadow-soft)",
            transform: "rotate(-4deg)",
          }}
        >
          <div className="mx-auto mt-1 h-1 w-1/3 rounded-full" style={{ background: "var(--color-line-strong)" }} />
          <div className="mx-auto mt-4 h-12 w-12">
            <DemoMark stage={2} />
          </div>
          <div className="mx-auto mt-3 h-1.5 w-3/4 rounded-full" style={{ background: "var(--color-line-strong)" }} />
          <div className="mx-auto mt-1.5 h-1.5 w-1/2 rounded-full" style={{ background: "var(--color-line)" }} />
          <div
            className="mx-auto mt-4 h-6 w-3/4 rounded-lg"
            style={{ background: "var(--color-amber)" }}
          />
        </div>
        {/* Etiqueta / sticker */}
        <div
          className="absolute bottom-[6%] right-[30%] flex h-[18%] items-center justify-center rounded-full border"
          style={{
            aspectRatio: "1",
            background: "var(--bg-card)",
            borderColor: "var(--color-line)",
            boxShadow: "var(--shadow-card)",
            transform: "rotate(9deg)",
          }}
        >
          <div className="h-2/3 w-2/3">
            <DemoMark stage={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandingSketch() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(3, Math.max(0, Math.floor(v * 4))));
  });

  return (
    <section className="section-space">
      <div className="grid-shell">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="section-title mt-3">{t.title}</h2>
        <p className="section-copy mt-4 max-w-2xl">{t.copy}</p>
      </div>

      {/* ── Desktop: pin sticky scroll-driven ── */}
      <div ref={sectionRef} className="relative mt-10 hidden lg:block" style={{ height: "340vh" }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="grid-shell grid w-full grid-cols-[1fr_1.2fr] gap-14">
            {/* Rail de etapas */}
            <div className="flex flex-col justify-center gap-3">
              {t.stages.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => {
                    // Salto directo: scrollea el section al tramo de la etapa.
                    const el = sectionRef.current;
                    if (!el) return;
                    const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / 4);
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                  className="rounded-xl border p-5 text-left transition-all duration-500"
                  style={{
                    borderColor: stage === i ? "var(--color-amber)" : "var(--color-line)",
                    background: stage === i ? "var(--bg-card)" : "transparent",
                    opacity: stage === i ? 1 : 0.55,
                  }}
                >
                  <span
                    className="text-[0.7rem] uppercase tracking-[0.28em]"
                    style={{ color: stage === i ? "var(--color-amber)" : "var(--color-sky)" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="mt-1 block text-xl"
                    style={{ color: "var(--text-heading, #022977)", fontFamily: "var(--font-display-stack)", fontWeight: 500 }}
                  >
                    {s.deliverable}
                  </span>
                  <motion.span
                    className="section-copy mt-1 block overflow-hidden text-[0.95rem]"
                    animate={{ height: stage === i ? "auto" : 0, opacity: stage === i ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {s.text}
                  </motion.span>
                </button>
              ))}
            </div>

            {/* Panel visual */}
            <div
              className="relative overflow-hidden rounded-xl border"
              style={{
                borderColor: "var(--color-line)",
                background: "var(--bg-section)",
                minHeight: "34rem",
              }}
            >
              <StageVisual stage={stage} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile/tablet: etapas apiladas estáticas ── */}
      <div className="grid-shell mt-8 flex flex-col gap-5 lg:hidden">
        {t.stages.map((s, i) => (
          <article
            key={s.label}
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--color-line)", background: "var(--bg-card)" }}
          >
            <div className="relative" style={{ aspectRatio: "1.45", background: "var(--bg-section)" }}>
              <StageVisual stage={i} />
            </div>
            <div className="p-5">
              <span className="text-[0.7rem] uppercase tracking-[0.28em]" style={{ color: "var(--color-amber)" }}>
                {s.label}
              </span>
              <h3
                className="mt-1 text-xl"
                style={{ color: "var(--text-heading, #022977)", fontFamily: "var(--font-display-stack)", fontWeight: 500 }}
              >
                {s.deliverable}
              </h3>
              <p className="section-copy mt-1 text-[0.95rem]">{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
