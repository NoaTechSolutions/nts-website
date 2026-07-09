"use client";

import { CreditCard, MessageCircle, Sparkles } from "lucide-react";
import { useLanguage } from "../language-provider";
import { Boxes } from "@/components/ui/background-boxes";
import { AuroraText } from "@/components/ui/aurora-text";
import { translations } from "@/lib/i18n";

export function FinalCtaSection() {
  const { locale } = useLanguage();
  const t = translations[locale];

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
    <section id="contacto" className="section-divider contact-final-section">
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
