"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
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

  return (
    <section className="py-12 bg-(--bg-page)">
      <div className="grid md:grid-cols-2 gap-8 xl:gap-12 max-w-6xl mx-auto px-6 items-start">
        {/* Columna izquierda sticky — visual parity con ServicesStackSection */}
        <div
          className="services-stack-copy md:sticky md:h-fit flex flex-col justify-center"
          style={{ top: "calc(50vh - 150px)" }}
        >
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

        {/* Columna derecha — CardSticky stack con 3D fan */}
        <ContainerScroll className="min-h-[300vh] space-y-6 pt-[10vh] pb-24">
          {items.map((item, index) => {
            const card = cardData[index];
            const Icon = card.icon;
            const reversedIndex = items.length - 1 - index;
            return (
              <CardSticky
                key={index}
                index={index + 3}
                incrementY={20}
                incrementZ={8}
                className={`services-stack-card ${card.modifier} w-full`}
                style={{
                  transform: `perspective(1000px) rotateZ(${reversedIndex * 1.2}deg)`,
                  opacity: Math.max(1 - reversedIndex * 0.15, 0.4),
                }}
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
                <p className="services-stack-description">{item.description}</p>
                <div className="services-stack-benefits">
                  {card.benefits.map((b) => (
                    <span key={b} className="services-stack-benefit">
                      {b}
                    </span>
                  ))}
                </div>
                <div className="services-stack-card-actions">
                  <a href="/servicios" className="services-stack-card-cta">
                    <span>{t.servicesSection.cardCta}</span>
                    <ArrowUpRight size={16} strokeWidth={2.2} />
                  </a>
                </div>
              </CardSticky>
            );
          })}
        </ContainerScroll>
      </div>
    </section>
  );
}
