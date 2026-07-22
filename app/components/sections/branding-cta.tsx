"use client";

// ─────────────────────────────────────────────────────────────
// CTA FINAL · /servicios/branding. Full-bleed navy (regla absoluta del DS:
// el CTA final es SIEMPRE navy). Botón amber .btn-cta-navy del sistema con
// text-swap. Copy directo al dolor: la marca que no comunica cuesta clientes.
// ─────────────────────────────────────────────────────────────

import { useLanguage } from "../language-provider";

const COPY = {
  es: {
    eyebrow: "¿Empezamos?",
    titleLead: "Tu negocio ya es bueno.",
    titleAccent: "Que tu marca lo cuente.",
    subtitle:
      "Agenda una llamada sin costo: escuchamos tu historia y te decimos exactamente qué necesita tu marca — con plazos y alcance claros.",
    cta: "Iniciar mi marca",
    ctaHover: "¡Vamos allá!",
  },
  en: {
    eyebrow: "Ready to start?",
    titleLead: "Your business is already good.",
    titleAccent: "Let your brand tell it.",
    subtitle:
      "Book a free call: we listen to your story and tell you exactly what your brand needs — with clear scope and timelines.",
    cta: "Start my brand",
    ctaHover: "Let's go!",
  },
} as const;

export function BrandingCta() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        left: "50%",
        width: "100vw",
        marginLeft: "-50vw",
        position: "relative",
        background: "var(--bg-cta-final)",
        isolation: "isolate",
        padding: "6.5rem 1.5rem",
      }}
    >
      {/* Glows decorativos sutiles (amber + sky, coherentes con el hero) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.18), transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(5,165,255,0.18), transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <span
          className="text-[0.75rem] uppercase"
          style={{ letterSpacing: "0.28em", color: "var(--color-sky)" }}
        >
          {t.eyebrow}
        </span>
        <h2
          className="mt-4 text-white"
          style={{
            fontFamily: "var(--font-display-stack)",
            fontWeight: 500,
            fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
            lineHeight: 1.08,
          }}
        >
          {t.titleLead}
          <br />
          <span style={{ color: "var(--color-amber)" }}>{t.titleAccent}</span>
        </h2>
        <p
          className="mx-auto mt-5 max-w-xl text-[1.02rem]"
          style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85 }}
        >
          {t.subtitle}
        </p>

        <div className="mt-8 flex justify-center">
          <a href="#contacto-form" className="btn-cta-navy">
            <span className="btn-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="18"
                height="18"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="btn-text-idle">{t.cta}</span>
            <span className="btn-text-hover">{t.ctaHover}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
