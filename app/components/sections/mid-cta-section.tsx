"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../language-provider";
import { Boxes } from "@/components/ui/background-boxes";
import { translations } from "@/lib/i18n";

export function MidCtaSection() {
  const { locale } = useLanguage();
  const t = translations[locale];

  // Spotlight interactivo: un foco de luz que sigue el cursor SOLO en esta
  // sección (fondo oscuro). Actualiza --spot-x/--spot-y vía rAF y las capas se
  // mueven con transform (GPU), sin re-render de React ni repaint del gradiente.
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [lit, setLit] = useState(false);

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el || rafRef.current) return;
    const { clientX, clientY } = event;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${clientY - rect.top}px`);
    });
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const midCtaTitle =
    locale === "es" ? (
      <>
        <span className="mid-cta-title-line">Agenda una</span>{" "}
        <span className="mid-cta-title-accent">ASESORIA GRATIS</span>{" "}
        <span className="mid-cta-title-line">para tu marca</span>
      </>
    ) : (
      <>
        <span className="mid-cta-title-line">Book a</span>{" "}
        <span className="mid-cta-title-accent">FREE STRATEGY CALL</span>{" "}
        <span className="mid-cta-title-line">for your brand</span>
      </>
    );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      className={`section-divider services-proof-section cta-spotlight-section${lit ? " is-lit" : ""}`}
    >
      <div className="mid-cta-background" aria-hidden="true">
        <Boxes />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, #011540 80%)",
          }}
        />
      </div>

      {/* Spotlight: halo de luz + núcleo (cursor) que siguen al mouse */}
      <div className="cta-spotlight" aria-hidden="true" />
      <div className="cta-spotlight-core" aria-hidden="true" />

      <div className="mid-cta-shell">
        <h2 className="mid-cta-title">{midCtaTitle}</h2>
        <p className="section-copy mid-cta-body">{t.midCtaSection.copy}</p>

        <div className="mid-cta-actions">
          <a href="#contacto-form" className="btn-cta-navy">
            <span className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="btn-text-idle">{t.midCtaSection.primary}</span>
            <span className="btn-text-hover">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {locale === "es" ? "¡Vamos allá!" : "Let's go!"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
