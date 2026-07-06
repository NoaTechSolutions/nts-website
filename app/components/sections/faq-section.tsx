"use client";

import { useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Clock3,
  CreditCard,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../language-provider";
import { translations } from "@/lib/i18n";

const faqIcons = [Rocket, CreditCard, Clock3, Search, ShieldCheck, BadgeCheck];

export function FaqSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  const faqItems = t.faqSection.items;
  const faqHighlights = t.faqSection.highlights.filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-divider contact-faq-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="contact-faq-background" aria-hidden="true" />
      <div className="grid-shell contact-faq-shell">
        <div className="contact-faq-copy">
          <p className="eyebrow contact-faq-eyebrow">{t.faqSection.eyebrow}</p>
          <h2 className="section-title contact-faq-title">{t.faqSection.title}</h2>
          <p className="section-copy contact-faq-body">{t.faqSection.copy}</p>

          <div className="contact-faq-highlights">
            {faqHighlights.map((highlight) => (
              <span key={highlight} className="contact-faq-highlight">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="contact-faq-accordion">
          {faqItems.map((item, index) => {
            const Icon = faqIcons[index % faqIcons.length];
            const isActive = index === activeFaqIndex;

            return (
              <article
                key={item.question}
                className={`contact-faq-item ${isActive ? "is-active" : ""}`}
              >
                <button
                  type="button"
                  className="contact-faq-trigger"
                  aria-expanded={isActive}
                  onClick={() =>
                    setActiveFaqIndex((current) => (current === index ? -1 : index))
                  }
                >
                  <span className="contact-faq-item-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>

                  <span className="contact-faq-item-copy">
                    <span className="contact-faq-question">{item.question}</span>
                  </span>

                  <span className="contact-faq-item-toggle" aria-hidden="true">
                    <ChevronDown size={20} strokeWidth={2.4} />
                  </span>
                </button>

                <div className="contact-faq-answer-wrap">
                  <div className="contact-faq-answer-inner">
                    <p className="contact-faq-answer">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
