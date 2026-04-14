"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Globe, Megaphone, Palette, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import CardSwap, { Card } from "@/components/ui/card-swap";

type ServiceItem = {
  title: string;
  description: string;
};

type ServicesStackSectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  cardCta: string;
  rotatingWords: readonly string[];
  items: readonly ServiceItem[];
};

type ServicesStackShellContentProps = {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  cardCta: string;
  rotatingWords: readonly string[];
  items: readonly ServiceItem[];
  activeIndex: number;
  stageOpacity: number;
};

const icons = [Globe, Search, Megaphone, Palette];
const serviceBadges = ["Web", "SEO", "Marketing", "Branding"];
const serviceBenefits = [
  ["Mas visibilidad", "Carga veloz", "Mejor conversion"],
  ["Mas trafico", "Mejor posicion", "Base sostenible"],
  ["Mas leads", "Mensajes claros", "Campanas efectivas"],
  ["Mas confianza", "Imagen premium", "Marca consistente"],
];
const serviceFooters = [
  "Listo para vender mejor",
  "Optimizado para encontrarte",
  "Pensado para convertir",
  "Creado para diferenciarte",
];
const serviceCardClasses = [
  "services-stack-card-web",
  "services-stack-card-seo",
  "services-stack-card-marketing",
  "services-stack-card-branding",
];

function ServicesStackShellContent({
  eyebrow,
  title,
  copy,
  cta,
  cardCta,
  rotatingWords,
  items,
  activeIndex,
  stageOpacity,
}: ServicesStackShellContentProps) {
  return (
    <>
      <div className="services-stack-copy">
        <p className="eyebrow">{eyebrow}</p>
        <div className="services-stack-heading">
          <LayoutTextFlip
            text={title}
            words={rotatingWords}
            duration={2800}
            className="services-stack-heading-flip"
            textClassName="services-stack-heading-text"
            wordClassName="services-stack-heading-word"
          />
        </div>
        <p className="section-copy">{copy}</p>
        <div className="btn-body-ghost">
          <div className="btn-ghost-orb" />
          <a href="#proceso" className="btn-ghost-inner">
            {cta}
          </a>
        </div>
      </div>

      <div className="services-stack-stage" style={{ opacity: stageOpacity }}>
        <div className="services-stack-scroller">
          <CardSwap
            width={520}
            height={470}
            cardDistance={55}
            verticalDistance={58}
            activeIndex={activeIndex}
          >
            {items.map((item, index) => {
              const Icon = icons[index] ?? Globe;

              return (
                <Card
                  key={item.title}
                  customClass={`services-stack-card ${serviceCardClasses[index] ?? ""}`}
                >
                  <p className="services-stack-footer">
                    {serviceFooters[index] ?? "Pensado para crecer"}
                  </p>
                  <div className="services-stack-card-top">
                    <span className="services-stack-icon">
                      <Icon size={18} strokeWidth={2.1} />
                    </span>
                    <span className="services-stack-card-badge">
                      {serviceBadges[index] ?? "Servicio"}
                    </span>
                  </div>
                  <h3 className="services-stack-title">{item.title}</h3>
                  <p className="services-stack-description">{item.description}</p>
                  <div className="services-stack-benefits">
                    {(serviceBenefits[index] ?? []).map((benefit) => (
                      <span key={benefit} className="services-stack-benefit">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <div className="services-stack-card-actions">
                    <a href="/servicios" className="services-stack-card-cta">
                      <span>{cardCta}</span>
                      <ArrowUpRight size={16} strokeWidth={2.2} />
                    </a>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </>
  );
}

export function ServicesStackSection({
  eyebrow,
  title,
  copy,
  cta,
  cardCta,
  rotatingWords,
  items,
}: ServicesStackSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shellOpacity, setShellOpacity] = useState(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    let nextIndex = 1;

    if (value >= 0.34) nextIndex = 2;
    if (value >= 0.66) nextIndex = 3;
    if (value >= 0.9) nextIndex = 0;

    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    const updatePinned = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const exitThreshold = window.innerWidth <= 768 ? 0.88 : 0.8;
      const withinSection =
        rect.top <= viewportHeight && rect.bottom >= viewportHeight * exitThreshold;
      const fadeDistance = viewportHeight * 0.3;
      const fadeIn = Math.min(
        Math.max((viewportHeight - rect.top) / fadeDistance, 0),
        1,
      );
      const fadeOut = Math.min(Math.max(rect.bottom / fadeDistance, 0), 1);

      setIsActive(withinSection);
      setShellOpacity(Math.min(fadeIn, fadeOut));
    };

    updatePinned();
    window.addEventListener("scroll", updatePinned, { passive: true });
    window.addEventListener("resize", updatePinned);

    return () => {
      window.removeEventListener("scroll", updatePinned);
      window.removeEventListener("resize", updatePinned);
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="section-divider services-stack-section relative"
    >
      {isActive ? (
        <div className="services-stack-overlay">
          <div
            className="services-stack-shell services-stack-shell-floating"
            style={{ opacity: shellOpacity }}
          >
            <ServicesStackShellContent
              eyebrow={eyebrow}
              title={title}
              copy={copy}
              cta={cta}
              cardCta={cardCta}
              rotatingWords={rotatingWords}
              items={items}
              activeIndex={activeIndex}
              stageOpacity={shellOpacity}
            />
          </div>
        </div>
      ) : null}

      <div className="services-stack-spacer" aria-hidden="true" />
    </section>
  );
}
