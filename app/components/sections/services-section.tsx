"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import {
  Code2,
  Palette,
  Megaphone,
  LifeBuoy,
  ArrowUpRight,
} from "lucide-react";

// 4 categorías del brief (web-structure.md §4). Orden: estrella primero.
// Los `modifier` reutilizan los 4 estilos de color ya existentes en el CSS.
const cardData = [
  {
    icon: Code2,
    badge: "Web & Software",
    footer: "Hecho para escalar tu negocio",
    benefits: ["Software a medida", "Carga veloz", "Escalable"],
    modifier: "services-stack-card-web",
  },
  {
    icon: Palette,
    badge: "Marca",
    footer: "Creado para diferenciarte",
    benefits: ["Branding", "Diseño gráfico", "Identidad sólida"],
    modifier: "services-stack-card-branding",
  },
  {
    icon: Megaphone,
    badge: "Marketing",
    footer: "Pensado para convertir",
    benefits: ["Más leads", "Redes sociales", "Campañas efectivas"],
    modifier: "services-stack-card-marketing",
  },
  {
    icon: LifeBuoy,
    badge: "Soporte",
    footer: "Listo para acompañarte",
    benefits: ["Hosting", "Mantenimiento", "Asesoría tech"],
    modifier: "services-stack-card-seo",
  },
];

export function ServicesSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const items = t.servicesSection.items;
  const rotatingWords = t.hero.rotatingWords;

  // Centra el stack de cards a 50vh (misma altura que el texto izquierdo, que
  // usa items-center h-screen). Solo desktop (≥1024). Mide la altura REAL de la
  // card y se aplica vía el `style` del CardSticky (Motion lo respeta), no CSS.
  const stackRef = useRef<HTMLDivElement>(null);
  const [cardTop, setCardTop] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const compute = () => {
      if (!mq.matches) {
        setCardTop(undefined); // mobile/tablet: usa el top original del componente
        return;
      }
      const card = el.querySelector(".services-stack-card") as HTMLElement | null;
      if (card) {
        setCardTop(`calc(50vh - ${Math.round(card.offsetHeight / 2)}px)`);
      }
    };
    compute();
    const settle = window.setTimeout(compute, 300); // tras montar cards/fuentes
    mq.addEventListener("change", compute);
    window.addEventListener("resize", compute);
    return () => {
      window.clearTimeout(settle);
      mq.removeEventListener("change", compute);
      window.removeEventListener("resize", compute);
    };
  }, [locale]);

  const CopyContent = (
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
  );

  return (
    <section className="bg-(--bg-page) relative w-full min-h-[180vh] lg:min-h-[210vh]">
      <h2 className="sr-only">{t.servicesSection.title}</h2>

      {/* Título mobile/tablet — estático arriba, solo visible < lg */}
      <div className="lg:hidden px-6 pt-12 pb-6 text-center growth-v2-copy-mobile">{CopyContent}</div>

      <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Columna izquierda — sticky centrada al viewport, solo desktop (≥lg) */}
        <div className="hidden lg:flex sticky top-0 h-screen items-center">
          {CopyContent}
        </div>

        {/* Columna derecha — cards apilándose con scroll nativo */}
        <div className="py-12 col-span-1 md:col-span-1">
        <ContainerScroll
          ref={stackRef}
          className="space-y-6 pb-[15vh] md:pb-[25vh] lg:pb-[30vh]"
        >
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
                  ...(cardTop ? { top: cardTop } : {}),
                  ["--card-rotate" as string]: `perspective(1000px) rotateZ(${reversedIndex * 1.2}deg)`,
                  opacity: Math.max(1 - reversedIndex * 0.04, 0.88),
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
      </div>
    </section>
  );
}
