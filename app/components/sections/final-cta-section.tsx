"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { CreditCard, MessageCircle, Sparkles } from "lucide-react";
import { useLanguage } from "../language-provider";
import { Boxes } from "@/components/ui/background-boxes";
import { AuroraText } from "@/components/ui/aurora-text";
import { translations } from "@/lib/i18n";

export function FinalCtaSection() {
  const { locale } = useLanguage();
  const t = translations[locale];

  // Spotlight interactivo (mismo efecto que CTA1). Ver .cta-spotlight en CSS.
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

  const ctaPriceHighlight =
    t.ctaSection.priceTag.match(/\$\d[\d.,]*/)?.[0] ?? t.ctaSection.priceTag;
  const hasPriceTagInCtaTitle = t.ctaSection.title.includes(t.ctaSection.priceTag);
  const hasPriceHighlightInCtaTitle = t.ctaSection.title.includes(ctaPriceHighlight);
  const [ctaTitleLead, ctaTitleTail] = hasPriceHighlightInCtaTitle
    ? t.ctaSection.title.split(ctaPriceHighlight)
    : [t.ctaSection.title, ""];
  const [ctaPriceTagLead, ctaPriceTagTail] = t.ctaSection.priceTag
    .split(ctaPriceHighlight)
    .map((part) => part.trim());
  const ctaTitleMain = hasPriceTagInCtaTitle
    ? t.ctaSection.title.replace(t.ctaSection.priceTag, "").trim()
    : ctaTitleLead.trim();

  const contactTopPills = [
    { label: t.ctaSection.eyebrow, Icon: Sparkles },
    { label: t.ctaSection.highlights[0], Icon: MessageCircle },
    { label: t.ctaSection.highlights[1], Icon: CreditCard },
  ].filter((item) => Boolean(item.label));

  const finalCtaTitle = hasPriceTagInCtaTitle ? (
    <>
      <span className="contact-final-title-main">{ctaTitleMain}</span>
      <span className="contact-final-title-break">
        {ctaPriceTagLead ? (
          <span className="contact-final-title-prefix">{ctaPriceTagLead}</span>
        ) : null}
        <AuroraText
          className="contact-final-title-accent"
          colors={["#ffffff", "#ff9900", "#ffcc00", "#ff6600"]}
        >
          {ctaPriceHighlight}
        </AuroraText>
        {ctaPriceTagTail ? (
          <span className="contact-final-title-suffix">{ctaPriceTagTail}</span>
        ) : null}
      </span>
    </>
  ) : hasPriceHighlightInCtaTitle ? (
    <>
      <span className="contact-final-title-line">{ctaTitleLead.trim()}</span>{" "}
      <span className="contact-final-price-glow">{ctaPriceHighlight}</span>{" "}
      <span className="contact-final-title-line">{ctaTitleTail.trim()}</span>
    </>
  ) : (
    t.ctaSection.title
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      id="contacto"
      className={`section-divider contact-final-section cta-spotlight-section${lit ? " is-lit" : ""}`}
    >
      <div className="contact-final-background" aria-hidden="true">
        <Boxes />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, #022977 80%)",
          }}
        />
      </div>

      {/* Spotlight: halo de luz + núcleo (cursor) que siguen al mouse */}
      <div className="cta-spotlight" aria-hidden="true" />
      <div className="cta-spotlight-core" aria-hidden="true" />

      <div className="contact-final-shell">
        <div className="contact-final-copy">
          <div className="contact-final-top-row">
            {contactTopPills.map(({ label, Icon }, index) => (
              <span
                key={label}
                className={`contact-final-pill contact-final-chip ${
                  index === 0 ? "contact-final-pill-eyebrow" : ""
                }`}
              >
                <span className="contact-final-pill-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={2.2} />
                </span>
                <span>{label}</span>
              </span>
            ))}
          </div>

          <h2 className="contact-final-title">{finalCtaTitle}</h2>
        </div>

        <div className="contact-final-actions">
          <a href="#contacto-form" className="btn-cta-navy">
            <span className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="btn-text-idle">{t.ctaSection.primary}</span>
            <span className="btn-text-hover">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {locale === "es" ? "¡Vamos allá!" : "Let's go!"}
            </span>
          </a>
        </div>
      </div>

      <div className="contact-final-wave-bottom" aria-hidden="true" />
    </section>
  );
}
