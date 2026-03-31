"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { useLanguage } from "./language-provider";
import { translations } from "@/lib/i18n";
import { portfolioProjects } from "@/lib/portfolio-projects";

export function HeroParallaxDemo() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <HeroParallax
      products={portfolioProjects}
      title={t.portfolioSection.title}
      subtitle={
        <>
          <span className="portfolio-parallax-copy-line">
            {t.portfolioSection.copy}
          </span>
          <span className="portfolio-parallax-accent">
            {t.portfolioSection.accent}
          </span>
        </>
      }
      ctaLabel={t.portfolioSection.ctaLabel}
      ctaHref="/portfolio"
    />
  );
}
