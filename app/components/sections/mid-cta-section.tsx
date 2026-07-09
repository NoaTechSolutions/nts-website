"use client";

import { useLanguage } from "../language-provider";
import { Boxes } from "@/components/ui/background-boxes";
import { translations } from "@/lib/i18n";

export function MidCtaSection() {
  const { locale } = useLanguage();
  const t = translations[locale];

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
    <section className="section-divider services-proof-section">
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
