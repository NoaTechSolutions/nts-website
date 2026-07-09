"use client";

import Image from "next/image";
import { ResizableNavbarDemo } from "../resizable-navbar-demo";
import { HeroRotatingWord } from "../hero-rotating-word";
import { useLanguage } from "../language-provider";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NumberTicker } from "@/components/ui/number-ticker";
import { translations } from "@/lib/i18n";
import { HeroRobot3D } from "./hero-robot-3d";
import { HeroCursor } from "../hero-cursor";

export function HeaderSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const stats = t.hero.stats;

  return (
    <div id="home" className="grid-shell section-space">
      <ResizableNavbarDemo />

      <section className="hero-showcase is-hero-exp">
        <div className="hero-art hero-art-right hero-art-asset" aria-hidden="true">
          <Image
            src="/noatechsolutions-digital-orb-hero.svg"
            alt=""
            width={420}
            height={420}
            priority
            loading="eager"
            className="hero-floating-object"
          />
        </div>

        <div className="hero-exp-grid">
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
        </div>
        <HeroRobot3D />
        <div className="hero-bottom-divider" aria-hidden="true" />
      </section>
      <HeroCursor />
    </div>
  );
}
