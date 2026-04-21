"use client";

import { useEffect, useRef, useState } from "react";
import CardSwap, { Card } from "@/components/ui/card-swap";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import {
  Globe,
  Search,
  Megaphone,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import { useScroll, useMotionValueEvent } from "motion/react";

const cardData = [
  {
    icon: Globe,
    badge: "Web",
    footer: "Listo para vender mejor",
    benefits: ["Mas visibilidad", "Carga veloz", "Mejor conversion"],
    modifier: "services-stack-card-web",
  },
  {
    icon: Search,
    badge: "SEO",
    footer: "Optimizado para encontrarte",
    benefits: ["Mas trafico", "Mejor posicion", "Base sostenible"],
    modifier: "services-stack-card-seo",
  },
  {
    icon: Megaphone,
    badge: "Marketing",
    footer: "Pensado para convertir",
    benefits: ["Mas leads", "Mensajes claros", "Campanas efectivas"],
    modifier: "services-stack-card-marketing",
  },
  {
    icon: Palette,
    badge: "Branding",
    footer: "Creado para diferenciarte",
    benefits: ["Mas confianza", "Imagen premium", "Marca consistente"],
    modifier: "services-stack-card-branding",
  },
];

export function GrowthMessagesV2() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const items = t.servicesSection.items;
  const rotatingWords = t.hero.rotatingWords;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(
      Math.min(Math.floor(v * items.length), items.length - 1),
    );
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="services-stack-section"
      style={{ minHeight: `${items.length * 100}vh` }}
    >
      {isActive && (
        <div className="services-stack-overlay">
          <div className="services-stack-shell services-stack-shell-floating">
            {/* Columna izquierda */}
            <div className="services-stack-copy">
              <p className="eyebrow">{t.servicesSection.eyebrow}</p>
              <div className="services-stack-heading">
                <LayoutTextFlip
                  text={t.servicesSection.title}
                  words={rotatingWords}
                  duration={2800}
                  className="services-stack-heading-flip"
                  textClassName="services-stack-heading-text"
                  wordClassName="services-stack-heading-word"
                />
              </div>
              <p className="section-copy">{t.servicesSection.copy}</p>
              <div className="btn-body-ghost">
                <div className="btn-ghost-orb" />
                <a href="/servicios" className="btn-ghost-inner">
                  {t.servicesSection.cta}
                </a>
              </div>
            </div>

            {/* Columna derecha — CardSwap 3D */}
            <div className="services-stack-stage">
              <div className="services-stack-scroller">
                <CardSwap
                  width={520}
                  height={470}
                  cardDistance={55}
                  verticalDistance={58}
                  activeIndex={activeIndex}
                >
                  {items.map((item, index) => {
                    const card = cardData[index];
                    const Icon = card.icon;
                    return (
                      <Card
                        key={index}
                        customClass={`services-stack-card ${card.modifier}`}
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
                        <h3 className="services-stack-title">{item.title}</h3>
                        <p className="services-stack-description">
                          {item.description}
                        </p>
                        <div className="services-stack-benefits">
                          {card.benefits.map((b) => (
                            <span
                              key={b}
                              className="services-stack-benefit"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <div className="services-stack-card-actions">
                          <a
                            href="/servicios"
                            className="services-stack-card-cta"
                          >
                            <span>{t.servicesSection.cardCta}</span>
                            <ArrowUpRight size={16} strokeWidth={2.2} />
                          </a>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="services-stack-spacer" aria-hidden="true" />
    </div>
  );
}
