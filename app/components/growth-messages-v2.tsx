"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { ContainerScroll } from "@/components/ui/cards-stack";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import {
  EyeOff,
  TrendingDown,
  BarChart2,
  AlertTriangle,
} from "lucide-react";

const cardData = [
  {
    icon: EyeOff,
    badge: "Visibilidad",
    footer: "Tu negocio es invisible online",
    modifier: "services-stack-card-web",
  },
  {
    icon: TrendingDown,
    badge: "Conversión",
    footer: "Visitas sin resultados",
    modifier: "services-stack-card-seo",
  },
  {
    icon: BarChart2,
    badge: "Crecimiento",
    footer: "Potencial sin aprovechar",
    modifier: "services-stack-card-marketing",
  },
  {
    icon: AlertTriangle,
    badge: "Identidad",
    footer: "Sin presencia profesional",
    modifier: "services-stack-card-branding",
  },
];

export function GrowthMessagesV2() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const items = t.growthSection.items;
  const rotatingWords = t.hero.rotatingWords;

  const CopyContent = (
    <div className="services-stack-copy">
      <p className="eyebrow">{t.growthSection.eyebrow}</p>
      <div className="services-stack-heading">
        <LayoutTextFlip
          text={t.growthSection.title}
          words={rotatingWords}
          duration={2800}
          className="services-stack-heading-flip"
          textClassName="services-stack-heading-text"
          wordClassName="services-stack-heading-word"
        />
      </div>
      <p className="section-copy">{t.growthSection.copy}</p>
      <div className="btn-body-ghost">
        <div className="btn-ghost-orb" />
        <a href="/servicios" className="btn-ghost-inner">
          {locale === "es" ? "Ver soluciones" : "View solutions"}
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative w-full min-h-auto">
      {/* Título mobile/tablet — estático arriba, visible < lg */}
      <div className="lg:hidden px-6 pt-12 pb-8 text-center growth-v2-copy-mobile">{CopyContent}</div>

      <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Columna izquierda — sticky centrada al viewport, solo desktop (≥lg) */}
        <div className="hidden lg:flex sticky top-0 h-screen items-center">
          {CopyContent}
        </div>

        {/* Columna derecha — cards apilándose con scroll nativo */}
        <div className="py-8 lg:py-12 col-span-1">
        <ContainerScroll className="space-y-4 pb-[20vh] md:pb-[40vh] lg:pb-[60vh]">
          {items.map((item, index) => {
            const card = cardData[index];
            const Icon = card.icon;
            const reversedIndex = items.length - 1 - index;
            return (
              <motion.div
                key={index}
                className={`services-stack-card ${card.modifier} w-full mb-6`}
                style={{
                  position: "sticky",
                  top: "80px",
                  zIndex: index + 1,
                  opacity: Math.max(1 - reversedIndex * 0.04, 0.88),
                  ["--card-rotate" as string]: `perspective(1000px) rotateZ(${reversedIndex * 1.2}deg)`,
                } as CSSProperties}
              >
                <p className="services-stack-footer">{card.footer}</p>
                <div className="services-stack-card-top">
                  <span className="services-stack-icon">
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <span className="services-stack-card-badge">
                    {card.badge}
                  </span>
                </div>
                <h3 className="services-stack-title">{item}</h3>
              </motion.div>
            );
          })}
        </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
