"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Clock3,
  CreditCard,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ResizableNavbarDemo } from "./components/resizable-navbar-demo";
import { HeroRotatingWord } from "./components/hero-rotating-word";
import { GrowthMessagesSection } from "./components/growth-messages-section";
import { HeroParallaxDemo } from "./components/hero-parallax-demo";
import { ProcessStickySection } from "./components/process-sticky-section";
import { ReviewsMarqueeSection } from "./components/reviews-marquee-section";
import { ServicesStackSection } from "./components/services-stack-section";
import { MobileSpeedDial } from "./components/mobile-speed-dial";
import { LanguageSwitcher } from "./components/ui/resizable-navbar";
import GridDistortion from "./components/ui/grid-distortion";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { useLanguage } from "./components/language-provider";
import { translations } from "@/lib/i18n";

export default function Home() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const stats = t.hero.stats;
  const services = t.servicesSection.items;
  const process = t.processSection.items;
  const reviews = t.reviewsSection.items;
  const faqItems = t.faqSection.items;
  const faqHighlights = t.faqSection.highlights.filter(Boolean);
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
  const faqIcons = [Rocket, CreditCard, Clock3, Search, ShieldCheck, BadgeCheck];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NoaTechSolutions",
    url: "https://noatechsolutions.com",
    description: t.jsonLd.description,
    areaServed: ["California, United States", "Baja California, Mexico"],
    serviceType: t.jsonLd.serviceType,
  };
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
  const finalCtaTitle = hasPriceTagInCtaTitle ? (
    <>
      <span className="contact-final-title-main">{ctaTitleMain}</span>
      <span className="contact-final-title-break">
        {ctaPriceTagLead ? (
          <span className="contact-final-title-prefix">{ctaPriceTagLead}</span>
        ) : null}
        <AuroraText
          className="contact-final-title-accent"
          colors={["#ff9900", "#05a5ff", "#0400f0", "#09215e"]}
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
      <AuroraText
        className="contact-final-title-accent"
        colors={["#ff9900", "#05a5ff", "#0400f0", "#09215e"]}
      >
        {ctaPriceHighlight}
      </AuroraText>{" "}
      <span className="contact-final-title-line">{ctaTitleTail.trim()}</span>
    </>
  ) : (
    t.ctaSection.title
  );

  return (
    <main className="page-shell" onContextMenu={(event) => event.preventDefault()}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />
      <MobileSpeedDial />

      <div id="home" className="grid-shell section-space">
        <div className="page-language-switcher hidden md:block">
          <LanguageSwitcher />
        </div>
        <ResizableNavbarDemo />

        <section className="hero-showcase">
          <div className="hero-art hero-art-left hero-art-hand-desktop hidden lg:block" aria-hidden="true">
            <Image
              src="/noatechsolutions-robotic-hand-hero.svg"
              alt=""
              width={520}
              height={520}
              className="hero-left-object"
            />
          </div>

          <div className="hero-art hero-art-right hero-art-asset" aria-hidden="true">
            <Image
              src="/noatechsolutions-digital-orb-hero.svg"
              alt=""
              width={420}
              height={420}
              className="hero-floating-object"
            />
          </div>

          <div className="hero-content">
            <span className="hero-badge">
              <span className="hero-badge-star" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hero-badge-spark hero-badge-spark-main"
                >
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09m8.445-7.188L18 9.75l-.259-1.035a3.38 3.38 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.38 3.38 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.38 3.38 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.38 3.38 0 0 0-2.456 2.456m-1.365 11.852L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183l.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394l-1.183.394a2.25 2.25 0 0 0-1.423 1.423" />
                </svg>
              </span>
              {t.hero.badge}
            </span>

            <h1 className="hero-title hero-title-showcase">
              <span>
                {t.hero.lead}{" "}
                <HeroRotatingWord
                  words={t.hero.rotatingWords}
                  ariaLabel={t.hero.rotatingAria}
                />
              </span>
              <span className="hero-title-accent">{t.hero.accent}</span>
            </h1>

            <p className="hero-copy hero-copy-showcase">
              {t.hero.copy}
            </p>

            <div className="hero-actions">
              <a href="#contacto" className="button-primary button-primary-hero button-primary-desktop">
                <span className="button-primary-label button-primary-label-default">
                  {t.hero.primaryCta}
                </span>
                <span className="button-primary-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="button-primary-icon-arrow"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <HoverBorderGradient
                as="a"
                href="#contacto"
                duration={1.2}
                clockwise
                containerClassName="button-primary-mobile-gradient"
                className="button-primary-mobile-inner"
              >
                <span>{t.hero.primaryCta}</span>
                <span className="button-primary-mobile-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="button-primary-mobile-icon-arrow"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </HoverBorderGradient>
              <MovingBorderButton
                as="a"
                href="#servicios"
                duration={2800}
                borderRadius="999px"
                containerClassName="button-outline-moving"
                borderClassName="button-outline-moving-border"
                className="button-outline button-outline-hero"
              >
                {t.hero.secondaryCta}
              </MovingBorderButton>
            </div>

            <div className="hero-stats">
              {stats.map((stat) => (
                <article key={stat.label} className="hero-stat">
                  <p className="hero-stat-value">
                    <NumberTicker
                      value={stat.value}
                      delay={stat.delay}
                      className="hero-stat-number"
                    />
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="hero-stat-copy">
                    {"mobileLabel" in stat ? (
                      <>
                        <span className="hero-stat-copy-desktop">{stat.label}</span>
                        <span className="hero-stat-copy-mobile">{stat.mobileLabel}</span>
                      </>
                    ) : (
                      stat.label
                    )}
                  </p>
                </article>
              ))}
            </div>
          </div>

        </section>

      </div>

      <GrowthMessagesSection
        title={t.growthSection.title}
        items={t.growthSection.items}
      />

      <div className="grid-shell">
        <ServicesStackSection
          eyebrow={t.servicesSection.eyebrow}
          title={t.servicesSection.title}
          copy={t.servicesSection.copy}
          cta={t.servicesSection.cta}
          cardCta={t.servicesSection.cardCta}
          rotatingWords={t.hero.rotatingWords}
          items={services}
        />

        <ReviewsMarqueeSection
          eyebrow={t.reviewsSection.eyebrow}
          title={t.reviewsSection.title}
          items={reviews}
        />

        <section className="section-divider services-proof-section">
          <div className="mid-cta-background" aria-hidden="true">
            <GridDistortion
              imageSrc="/noatechsolutions-cta-background-tech-grid.png"
              grid={16}
              mouse={0.34}
              strength={0.68}
              relaxation={0.76}
              className="mid-cta-distortion"
            />
          </div>

          <div className="mid-cta-shell">
            <h2 className="mid-cta-title">{midCtaTitle}</h2>
            <p className="section-copy mid-cta-body">{t.midCtaSection.copy}</p>

            <div className="mid-cta-actions">
              <MovingBorderButton
                as="a"
                href="#contacto"
                duration={2800}
                borderRadius="1.75rem"
                containerClassName="mid-cta-button-moving"
                borderClassName="mid-cta-button-moving-border"
                className="mid-cta-button-inner"
              >
                {t.midCtaSection.primary}
              </MovingBorderButton>
            </div>
          </div>
        </section>

        <ProcessStickySection
          eyebrow={t.processSection.eyebrow}
          title={t.processSection.title}
          rotatingWords={t.hero.rotatingWords}
          items={process}
        />
      </div>

      <HeroParallaxDemo />

      <section id="contacto" className="section-divider contact-final-section">
        <div className="contact-final-background" aria-hidden="true">
          <GridDistortion
            imageSrc="/noatechsolutions-cta-background-tech-grid.png"
            grid={14}
            mouse={0.3}
            strength={0.64}
            relaxation={0.8}
            className="contact-final-distortion"
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
            <a
              href="mailto:hello@noatechsolutions.com?subject=Quiero%20iniciar%20mi%20proyecto%20web"
              className="contact-final-primary-button"
            >
              {t.ctaSection.primary}
            </a>
          </div>
        </div>
      </section>

      <section className="section-divider contact-faq-section">
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
    </main>
  );
}
