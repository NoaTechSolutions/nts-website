"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { Highlighter } from "@/components/ui/highlighter";
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

function formatTitle(title: string) {
  const words = title.trim().split(/\s+/);
  return {
    firstWord: words[0] ?? "",
    highlightedWord: words[1] ?? "",
    accentWord: words[2] ?? "",
    trailingWords: words.slice(3).join(" "),
  };
}

export function GrowthMessagesV2() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const items = t.servicesSection.items;
  const formatted = formatTitle(t.servicesSection.title);

  return (
    <section className="py-12 bg-(--bg-page)">
      <div className="grid md:grid-cols-2 gap-8 xl:gap-12 max-w-6xl mx-auto px-6">
        {/* Columna izquierda sticky */}
        <div className="md:sticky md:top-[20vh] md:h-fit flex flex-col justify-center py-12">
          <p className="eyebrow">{t.servicesSection.eyebrow}</p>
          <h2 className="growth-center-title">
            <span className="growth-center-line">
              <span>{formatted.firstWord}</span>
              <span className="growth-center-pill">
                {formatted.highlightedWord}
              </span>
            </span>
            <span className="growth-center-line growth-center-line-accent">
              <Highlighter
                action="underline"
                color="#ff9900"
                strokeWidth={3}
                animationDuration={900}
                padding={4}
                isView
              >
                <span className="growth-center-underlined">
                  {formatted.accentWord}
                </span>
              </Highlighter>
              <span className="growth-center-trailing">
                {formatted.trailingWords}
              </span>
            </span>
          </h2>
          <p className="section-copy">{t.servicesSection.copy}</p>
        </div>

        {/* Columna derecha — cards stack */}
        <ContainerScroll className="min-h-[300vh] space-y-6 pt-[10vh] pb-24">
          {items.map((item, index) => {
            const card = cardData[index];
            const Icon = card.icon;
            return (
              <CardSticky
                key={index}
                index={index + 3}
                incrementY={20}
                incrementZ={8}
                className={`services-stack-card ${card.modifier} w-full`}
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
                    <span>Mas info</span>
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
