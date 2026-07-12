"use client";

// ═══════════════════════════════════════════════════════════
// CTA "SVG Mask Effect" (inspirado en Aceternity) — página Diseño Web.
// DOS capas que cubren TODA la sección:
//   · base    → navy oscuro, muestra el DOLOR (paleta apagada).
//   · reveal  → blanca, muestra la SOLUCIÓN con la frase clave en NARANJA;
//               recortada por un spotlight (mask SVG) que sigue al cursor.
// El foco sigue al cursor con CSS vars (--mask-x/--mask-y) vía rAF → sin
// re-render de React. `.is-hovered` global también tiñe el eyebrow de naranja.
//
// Fallback touch / reduced-motion: versión estática (dolor + solución).
// ═══════════════════════════════════════════════════════════
import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "¿Te suena familiar?",
    pain: "Tu web se ve linda… pero no te trae clientes.",
    solutionLead: "Nosotros creamos la que ",
    solutionHighlight: "enamora y vende.",
    solutionTail: "",
  },
  en: {
    eyebrow: "Sound familiar?",
    pain: "Your website looks nice… but it brings you no clients.",
    solutionLead: "We create the one that ",
    solutionHighlight: "wins hearts and sells.",
    solutionTail: "",
  },
} as const;

export function DisenoWebCta() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  // interactive = hover real + sin reduced-motion. Arranca false (SSR) y se
  // resuelve en el cliente → mismo patrón que el robot del hero, sin hydration
  // mismatch (SSR y primer render cliente coinciden en la rama estática).
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const hoverCapable = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setInteractive(hoverCapable && !reduced);
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el || rafRef.current) return;
    const { clientX, clientY } = event;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mask-x", `${clientX - rect.left}px`);
      el.style.setProperty("--mask-y", `${clientY - rect.top}px`);
    });
  };

  const Solution = () => (
    <>
      {t.solutionLead}
      <span className="dw-cta-hl">{t.solutionHighlight}</span>
      {t.solutionTail}
    </>
  );

  // ── Fallback estático (touch / reduced-motion) ──
  if (!interactive) {
    return (
      <section className="dw-cta dw-cta--static section-divider">
        <div className="dw-cta-inner">
          <p className="dw-cta-eyebrow">{t.eyebrow}</p>
          <p className="dw-cta-headline dw-cta-headline--pain">{t.pain}</p>
          <p className="dw-cta-headline dw-cta-headline--solution">
            <Solution />
          </p>
        </div>
      </section>
    );
  }

  // ── Interactivo (desktop): dos capas full-section + spotlight ──
  return (
    <section
      ref={sectionRef}
      className="dw-cta section-divider"
      onMouseMove={handleMove}
      onMouseEnter={(event) => {
        sectionRef.current?.classList.add("is-hovered");
        handleMove(event);
      }}
      onMouseLeave={() => sectionRef.current?.classList.remove("is-hovered")}
    >
      {/* Capa base — el DOLOR (paleta apagada). Contenido real para SEO/a11y. */}
      <div className="dw-cta-layer dw-cta-layer--base">
        <div className="dw-cta-inner">
          <p className="dw-cta-eyebrow">{t.eyebrow}</p>
          <p className="dw-cta-headline">{t.pain}</p>
          {/* Solución accesible para lectores de pantalla (visible bajo la luz) */}
          <span className="sr-only">
            {t.solutionLead}
            {t.solutionHighlight}
            {t.solutionTail}
          </span>
        </div>
      </div>

      {/* Capa reveal — la SOLUCIÓN (paleta encendida). Recortada por el mask. */}
      <div className="dw-cta-layer dw-cta-layer--reveal" aria-hidden="true">
        <div className="dw-cta-inner">
          <p className="dw-cta-eyebrow">{t.eyebrow}</p>
          <p className="dw-cta-headline">
            <Solution />
          </p>
        </div>
      </div>
    </section>
  );
}
