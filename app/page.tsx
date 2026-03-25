"use client";

import Image from "next/image";
import { ResizableNavbarDemo } from "./components/resizable-navbar-demo";
import { HeroRotatingWord } from "./components/hero-rotating-word";
import { GrowthMessagesSection } from "./components/growth-messages-section";
import { ServicesStackSection } from "./components/services-stack-section";
import { MobileSpeedDial } from "./components/mobile-speed-dial";
import { LanguageSwitcher } from "./components/ui/resizable-navbar";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useLanguage } from "./components/language-provider";
import { translations } from "@/lib/i18n";

export default function Home() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const stats = t.hero.stats;
  const services = t.servicesSection.items;
  const process = t.processSection.items;
  const faqs = t.faqSection.items;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NoaTechSolutions",
    url: "https://noatechsolutions.com",
    description: t.jsonLd.description,
    areaServed: ["California, United States", "Baja California, Mexico"],
    serviceType: t.jsonLd.serviceType,
  };

  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              src="/abstrac2svg.svg"
              alt=""
              width={520}
              height={520}
              className="hero-left-object"
            />
          </div>

          <div className="hero-art hero-art-right hero-art-asset" aria-hidden="true">
            <Image
              src="/abstrac1.svg"
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

        <section className="section-divider services-proof-section">
          <div className="services-proof-card">
            <p className="eyebrow">Seccion 4 de prueba</p>
            <h2 className="section-title">Este bloque solo existe para revisar como suelta el sticky de la seccion 3.</h2>
            <p className="section-copy">
              Si al entrar aqui la seccion de servicios deja de quedarse fija de forma limpia,
              entonces el comportamiento ya esta funcionando como debe.
            </p>
          </div>
        </section>

        <section className="section-divider grid gap-8 py-16 lg:grid-cols-[1fr_1fr]">
          <article className="surface-card p-7 sm:p-8">
            <p className="eyebrow">{t.positioningSection.eyebrow}</p>
            <h2 className="feature-title mt-3">
              {t.positioningSection.title}
            </h2>
            <p className="section-copy mt-5">
              {t.positioningSection.copy}
            </p>
          </article>

          <article className="insight-panel">
            <div>
              <p className="eyebrow">{t.scalabilitySection.eyebrow}</p>
              <h3 className="feature-title mt-3">
                {t.scalabilitySection.title}
              </h3>
            </div>
            <p className="section-copy">
              {t.scalabilitySection.copy}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.scalabilitySection.tiles.map((tile) => (
                <div key={tile.label} className="stat-tile">
                  <p className="tile-label">{tile.label}</p>
                  <p className="tile-copy">{tile.copy}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="proceso"
          className="section-divider grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="space-y-4">
            <p className="eyebrow">{t.processSection.eyebrow}</p>
            <h2 className="section-title">
              {t.processSection.title}
            </h2>
          </div>
          <div className="grid gap-4">
            {process.map((item) => (
              <article key={item.step} className="process-card">
                <div className="flex items-start gap-5">
                  <span className="process-step">{item.step}</span>
                  <div>
                    <h3 className="service-title">{item.title}</h3>
                    <p className="service-copy mt-3">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-divider py-16">
          <div className="seo-panel">
            <div>
              <p className="eyebrow">{t.seoSection.eyebrow}</p>
              <h2 className="feature-title mt-3">
                {t.seoSection.title}
              </h2>
            </div>
            <p className="section-copy">
              {t.seoSection.copy}
            </p>
          </div>
        </section>

        <section
          id="faq"
          className="section-divider grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="space-y-4">
            <p className="eyebrow">{t.faqSection.eyebrow}</p>
            <h2 className="section-title">
              {t.faqSection.title}
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-card">
                <h3 className="service-title">{faq.question}</h3>
                <p className="service-copy mt-4">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="py-16">
          <div className="cta-panel">
            <div className="space-y-5">
              <p className="eyebrow">{t.ctaSection.eyebrow}</p>
              <h2 className="cta-title">
                {t.ctaSection.title}
              </h2>
              <p className="section-copy max-w-2xl">
                {t.ctaSection.copy}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="mailto:hello@noatechsolutions.com" className="button-primary">
                {t.ctaSection.primary}
              </a>
              <a href="https://noatechsolutions.com/" className="button-outline">
                {t.ctaSection.secondary}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
