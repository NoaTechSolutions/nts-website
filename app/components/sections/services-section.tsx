"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import {
  Code2,
  Palette,
  Megaphone,
  LifeBuoy,
  ArrowUpRight,
  Check,
  Star,
  type LucideIcon,
} from "lucide-react";

// 4 categorías del brief (web-structure.md §4). Orden: estrella primero.
// Los `modifier` reutilizan los 4 estilos de color ya existentes en el CSS.
const cardData = [
  {
    icon: Code2,
    badge: "Web & Software",
    featured: true,
    benefits: ["Software a medida", "Carga veloz", "Escalable"],
    modifier: "services-stack-card-web",
  },
  {
    icon: Palette,
    badge: "Marca",
    benefits: ["Branding", "Diseño gráfico", "Identidad sólida"],
    modifier: "services-stack-card-branding",
  },
  {
    icon: Megaphone,
    badge: "Marketing",
    benefits: ["Más leads", "Redes sociales", "Campañas efectivas"],
    modifier: "services-stack-card-marketing",
  },
  {
    icon: LifeBuoy,
    badge: "Soporte",
    benefits: ["Hosting", "Mantenimiento", "Asesoría tech"],
    modifier: "services-stack-card-seo",
  },
];

type ServiceItem = { title: string; description: string };
type ServiceCardMeta = (typeof cardData)[number];

// ── Card del stack (scrollytelling pinneado). Absoluta, centrada al área de
// cards. Entrada + apilado salen del MISMO progreso de scroll. Cada card tiene
// un tramo escalonado → entran una por una desde la derecha al bajar. Offset
// vertical (index*16px) → pila visible. useTransform clampa por defecto: antes
// del tramo queda a la derecha invisible; después, fija en x=0.
function ServiceStackCard({
  item,
  card,
  index,
  total,
  progress,
  cardCta,
}: {
  item: ServiceItem;
  card: ServiceCardMeta;
  index: number;
  total: number;
  progress: MotionValue<number>;
  cardCta: string;
}) {
  const Icon: LucideIcon = card.icon;

  // Las N cards entran escalonadas entre 0 y ~0.8 del scroll pinneado (el resto
  // es margen para que las 4 completen ANTES de que el pin se suelte).
  const ENTER_PHASE = 0.8;
  const segment = ENTER_PHASE / total;
  const start = index * segment;
  const end = start + segment * 1.1; // solapa leve → cascada continua

  // x en % del ANCHO de la card ("120%" = totalmente fuera de pantalla a la
  // derecha, sin importar el tamaño del device) → NO asoma hasta su entrada.
  // Sin opacity: la card aparece con su COLOR ENTERO (oculta solo por estar
  // fuera de pantalla, no por transparencia).
  const x = useTransform(progress, [start, end], ["120%", "0%"]);

  return (
    <motion.div
      data-featured={card.featured ? "true" : undefined}
      className={`services-stack-card ${card.modifier} absolute inset-x-0`}
      style={{
        top: `calc(50% + ${index * 16}px)`,
        x,
        y: "-50%",
        zIndex: index,
      }}
    >
      <div className="services-stack-card-top">
        <span className="services-stack-icon">
          <Icon size={20} strokeWidth={2.1} />
        </span>
        <span className="services-stack-card-badge">
          {card.featured ? (
            <Star size={12} strokeWidth={2.5} fill="currentColor" />
          ) : null}
          {card.badge}
        </span>
      </div>
      <h3 className="services-stack-title">{item.title}</h3>
      <p className="services-stack-description">{item.description}</p>
      <ul className="services-stack-benefits">
        {card.benefits.map((b) => (
          <li key={b} className="services-stack-benefit">
            <span className="services-stack-benefit-check">
              <Check size={13} strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>
      <div className="services-stack-card-actions">
        <a href="/servicios" className="services-stack-card-cta">
          <span>{cardCta}</span>
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </a>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const items = t.servicesSection.items;
  const rotatingWords = t.hero.rotatingWords;

  // Altura EXPLÍCITA (400vh) → 300vh de scroll para el pin (el viewport interno
  // es 100vh). Con 280vh solo entraban ~2 cards antes de soltarse el pin; 400vh
  // da recorrido para las 4. Inline para no depender del arbitrary de Tailwind.
  // El pin (sticky top-0 h-screen) aguanta fijo mientras la sección scrollea, y
  // este progreso 0→1 escrubea la entrada escalonada de las cards.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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
    <section
      ref={sectionRef}
      className="services-scroll-section bg-(--bg-page) relative w-full"
      style={{ height: "400vh" }}
    >
      <h2 className="sr-only">{t.servicesSection.title}</h2>

      {/* Viewport PINNEADO — fijo mientras la sección scrollea */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto flex h-full max-w-7xl flex-col px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-12 xl:gap-12">
          {/* Copy — arriba en mobile, columna izquierda en desktop */}
          <div className="shrink-0 pt-14 pb-4 text-center lg:flex lg:h-full lg:items-center lg:pt-0 lg:pb-0 lg:text-left growth-v2-copy-mobile">
            {CopyContent}
          </div>

          {/* Área del stack — cards absolutas, centradas */}
          <div className="relative min-h-0 flex-1 lg:h-[74vh]">
            {items.map((item, index) => (
              <ServiceStackCard
                key={index}
                item={item}
                card={cardData[index]}
                index={index}
                total={items.length}
                progress={scrollYProgress}
                cardCta={t.servicesSection.cardCta}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
