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
    eyebrow: "Seamos honestos",
    pain: "Cada día con una web que no convence, es un cliente que elige a otro.",
    solutionLead: "Creemos juntos la que ",
    solutionHighlight: "enamora, inspira confianza y vende.",
    solutionTail: "",
  },
  en: {
    eyebrow: "Let's be honest",
    pain: "Every day with a website that doesn't convince is a client choosing someone else.",
    solutionLead: "Let's build the one that ",
    solutionHighlight: "wins hearts, earns trust and sells.",
    solutionTail: "",
  },
} as const;

type Copy = (typeof COPY)[keyof typeof COPY];

// Fragmento de la SOLUCIÓN (lead + highlight naranja + tail). Se usa en el
// fallback estático y en la capa reveal → vive a nivel de módulo para no
// recrearse en cada render.
function Solution({ t }: { t: Copy }) {
  return (
    <>
      {t.solutionLead}
      <span className="dw-cta-hl">{t.solutionHighlight}</span>
      {t.solutionTail}
    </>
  );
}

export function DisenoWebCta() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  // mode: "static" (reduced-motion), "interactive" (desktop, spotlight sigue al
  // cursor), "auto" (touch/tablet → spotlight se mueve SOLO para que el reveal
  // se aprecie sin cursor). Arranca "static" (SSR) → se resuelve en el cliente.
  const [mode, setMode] = useState<"static" | "interactive" | "auto">("static");

  useEffect(() => {
    const resolve = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return setMode("static");
      const hoverCapable = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      // Teléfono/tablet (por ancho) o sin puntero fino → animación AUTOMÁTICA
      // (no hay mouse para pasar por encima). Desktop → spotlight con el cursor.
      if (window.innerWidth < 1024 || !hoverCapable) setMode("auto");
      else setMode("interactive");
    };
    resolve();
    window.addEventListener("resize", resolve);
    return () => window.removeEventListener("resize", resolve);
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

  // ── Fallback estático (reduced-motion) ──
  if (mode === "static") {
    return (
      <section className="dw-cta dw-cta--static section-divider">
        <div className="dw-cta-inner">
          <p className="dw-cta-eyebrow">{t.eyebrow}</p>
          <p className="dw-cta-headline dw-cta-headline--pain">{t.pain}</p>
          <p className="dw-cta-headline dw-cta-headline--solution">
            <Solution t={t} />
          </p>
        </div>
      </section>
    );
  }

  // ── Con capas + spotlight. Desktop: sigue al cursor. Touch/tablet ("auto"):
  //    el spotlight se mueve solo (clase dw-cta--auto, animación en globals). ──
  const isAuto = mode === "auto";
  return (
    <section
      ref={sectionRef}
      className={`dw-cta section-divider${isAuto ? " dw-cta--auto" : ""}`}
      onMouseMove={isAuto ? undefined : handleMove}
      onMouseEnter={
        isAuto
          ? undefined
          : (event) => {
              sectionRef.current?.classList.add("is-hovered");
              handleMove(event);
            }
      }
      onMouseLeave={
        isAuto ? undefined : () => sectionRef.current?.classList.remove("is-hovered")
      }
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
            <Solution t={t} />
          </p>
        </div>
      </div>
    </section>
  );
}
