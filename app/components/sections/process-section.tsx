"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GradientBadge } from "../ui/gradient-badge";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CometCard } from "@/components/ui/comet-card";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { useLanguage } from "../language-provider";
import { translations } from "@/lib/i18n";

type ProcessItem = {
  step: string;
  title: string;
  detail: string;
  cardDetail?: string;
};

const processHighlights = [
  ["Diagnóstico real", "Escucha activa", "Enfoque comercial"],
  ["Plan claro", "Prioridades", "Sin humo"],
  ["Avances visibles", "Estándar pro", "Sin cajas negras"],
  ["Soporte continuo", "Resultados medibles", "Mejora continua"],
];
const processThemes = [
  "from-[#02004f] via-[#0400f0] to-[#3551ff]",
  "from-[#02456f] via-[#05a5ff] to-[#2bc4ff]",
  "from-[#7a4100] via-[#ff9900] to-[#ffb44a]",
  "from-[#04112f] via-[#09215e] to-[#2a54bd]",
];
const processCardShadowThemes = [
  "shadow-[0_52px_140px_rgba(4,0,240,0.5),0_24px_48px_rgba(4,0,240,0.26),0_18px_28px_rgba(255,255,255,0.04)_inset]",
  "shadow-[0_52px_140px_rgba(5,165,255,0.42),0_24px_48px_rgba(5,165,255,0.22),0_18px_28px_rgba(255,255,255,0.04)_inset]",
  "shadow-[0_52px_140px_rgba(255,153,0,0.38),0_24px_48px_rgba(255,153,0,0.22),0_18px_28px_rgba(255,255,255,0.04)_inset]",
  "shadow-[0_52px_140px_rgba(9,33,94,0.52),0_24px_48px_rgba(9,33,94,0.28),0_18px_28px_rgba(255,255,255,0.04)_inset]",
];
const processStepBadgeThemes = [
  "border-[#0400f0] bg-[#0400f0] text-white shadow-[0_12px_28px_rgba(4,0,240,0.28)]",
  "border-[#05a5ff] bg-[#05a5ff] text-white shadow-[0_12px_28px_rgba(5,165,255,0.28)]",
  "border-[#ff9900] bg-[#ff9900] text-white shadow-[0_12px_28px_rgba(255,153,0,0.24)]",
  "border-[#09215e] bg-[#09215e] text-white shadow-[0_12px_28px_rgba(9,33,94,0.26)]",
];
const processStepAccentColors = ["#0400f0", "#05a5ff", "#ff9900", "#09215e"];
const processStepTextThemes = [
  {
    title: "text-[#0400f0]",
    detail: "text-[#0400f0]",
  },
  {
    title: "text-[#05a5ff]",
    detail: "text-[#05a5ff]",
  },
  {
    title: "text-[#ff9900]",
    detail: "text-[#ff9900]",
  },
  {
    title: "text-[#09215e]",
    detail: "text-[#09215e]",
  },
];
const processCardImages = [
  {
    src: "/noatechsolutions-descubrimiento-diagnostico-negocio.webp",
    alt: "Sesión de descubrimiento donde escuchamos y entendemos el negocio, la marca y los objetivos del cliente",
    title: "Paso 1: escuchamos y entendemos tu negocio antes de proponer soluciones",
  },
  {
    src: "/noatechsolutions-estrategia-plan-digital.webp",
    alt: "Planificación de la estrategia digital con hoja de ruta, prioridades y entregables claros",
    title: "Paso 2: diseñamos el plan a tu medida con una ruta clara",
  },
  {
    src: "/noatechsolutions-desarrollo-web-software-medida.webp",
    alt: "Diseño y desarrollo del proyecto web y software a medida con estándar profesional",
    title: "Paso 3: construimos tu proyecto mostrándote los avances en el camino",
  },
  {
    src: "/noatechsolutions-lanzamiento-resultados-acompanamiento.webp",
    alt: "Lanzamiento, medición de resultados y acompañamiento continuo para seguir creciendo",
    title: "Paso 4: lanzamos y te acompañamos con soporte continuo",
  },
];

export function ProcessSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const eyebrow = t.processSection.eyebrow;
  const title = t.processSection.title;
  const rotatingWords = t.hero.rotatingWords;
  // `translations` es `as const` → items con tipos literales; al unir ES/EN la
  // intersección de literales da `never`. Se ensancha a ProcessItem[].
  const items = t.processSection.items as readonly ProcessItem[];
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [shellOpacity, setShellOpacity] = useState(1);
  const [scrollProgressValue, setScrollProgressValue] = useState(0);
  const formatStepLabel = (step: string) => String(Number.parseInt(step, 10) || step);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScrollProgressValue(value);
    const steps = Math.max(items.length - 1, 1);
    const nextIndex = Math.min(items.length - 1, Math.max(0, Math.round(value * steps)));
    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    const updatePinned = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const exitThreshold = window.innerWidth <= 768 ? 0.88 : 0.76;
      const withinSection =
        rect.top <= 0 && rect.bottom >= viewportHeight * exitThreshold;
      const fadeDistance = viewportHeight * 0.24;
      const fadeIn = Math.min(Math.max((-rect.top) / fadeDistance, 0), 1);
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

  const content = useMemo(
    () =>
      items.map((item, index) => {
        const highlights = processHighlights[index] ?? [];
        const theme = processThemes[index] ?? processThemes[0];
        const shadowTheme = processCardShadowThemes[index] ?? processCardShadowThemes[0];
        const image = processCardImages[index] ?? processCardImages[0];
        return {
          ...item,
          highlights,
          theme,
          shadowTheme,
          cardDetail: item.cardDetail ?? item.detail,
          image,
        };
      }),
    [items]
  );

  const activeItem = content[activeIndex] ?? content[0];
  const titleMatch = title.match(/^(.*?)(?:\s+)(marca|brand)(.*)$/i);
  const titleLead = titleMatch ? titleMatch[1].trim() : title;
  const titleTail = titleMatch ? titleMatch[3].trim() : "";
  const titleInline = /^with\b/i.test(titleTail) ? "with a" : "con una";
  const titleBottom = /^with\b/i.test(titleTail)
    ? "clear roadmap and modern SEO"
    : "ruta clara y estrategica.";
  const titleTabletBottomLine = `${titleInline} ${titleBottom}`.trim();
  const cardCtaLabel = /^with\b/i.test(titleTail) ? "Let's get started" : "Empecemos ahora";
  const totalSegments = Math.max(content.length - 1, 1);
  const renderStageCard = (stageClassName: string) => (
    <div className={`process-sticky-stage ${stageClassName}`}>
      <div className="group block w-full pointer-events-auto">
        <CometCard
          className={`flex min-h-[34rem] w-full flex-col justify-between rounded-[2rem] bg-gradient-to-br ${activeItem.theme} p-8 text-white ${activeItem.shadowTheme}`}
          key={`${stageClassName}-${activeItem.step}`}
        >
          <div className="process-sticky-card-frame">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/18 bg-white/12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_60%)]" />
              <div className="relative h-[20rem] w-full">
                <Image
                  src={activeItem.image.src}
                  alt={activeItem.image.alt}
                  title={activeItem.image.title}
                  fill
                  sizes="(min-width: 1536px) 560px, (min-width: 1280px) 38vw, (min-width: 1024px) 42vw, 100vw"
                  quality={96}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="grid gap-5">
              <div className="flex flex-wrap gap-2.5">
                {activeItem.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.78rem] text-white/95"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <a
                href="#contacto-form"
                className="process-card-link"
                aria-label={`${cardCtaLabel}: ${activeItem.title}`}
              >
                <span>{cardCtaLabel}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={2.4}
                  className="process-card-link-arrow"
                />
              </a>
            </div>
          </div>
        </CometCard>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="section-divider relative"
      style={{ position: "relative", minHeight: `${Math.max(items.length * 95, 340)}vh` }}
    >
      <h2 className="sr-only">{title}</h2>

      {isActive ? (
        <div className="pointer-events-none fixed inset-0 z-[14] flex items-center justify-center">
          <div className="process-sticky-shell" style={{ opacity: shellOpacity }}>
            <div className="process-sticky-copy">
              <GradientBadge icon="growth">{eyebrow}</GradientBadge>
              <div className="process-phone-only process-sticky-heading">
                <p className="process-sticky-title-top">{titleLead}</p>
                <div className="process-sticky-title-inline justify-center">
                  <LayoutTextFlip
                    text=""
                    words={rotatingWords}
                    duration={2800}
                    className="process-sticky-heading-flip process-sticky-heading-flip-inline"
                    textClassName="process-sticky-heading-empty"
                    wordClassName="services-stack-heading-word"
                  />
                  <span className="process-sticky-title-inline-copy">{titleInline}</span>
                </div>
                <p className="process-sticky-title-tail">{titleBottom}</p>
              </div>
              <div className="process-tablet-only process-sticky-heading">
                <div className="process-sticky-title-inline justify-center whitespace-nowrap">
                  <p className="process-sticky-title-top process-sticky-title-top-tablet">
                    {titleLead}
                  </p>
                  <LayoutTextFlip
                    text=""
                    words={rotatingWords}
                    duration={2800}
                    className="process-sticky-heading-flip process-sticky-heading-flip-inline"
                    textClassName="process-sticky-heading-empty"
                    wordClassName="services-stack-heading-word process-sticky-heading-word-tablet"
                  />
                </div>
                <p className="process-sticky-title-tail process-sticky-title-tail-tablet">
                  {titleTabletBottomLine}
                </p>
              </div>
              <div className="process-desktop-only process-sticky-heading">
                <p className="process-sticky-title-top">{titleLead}</p>
                <div className="process-sticky-title-inline justify-start">
                  <LayoutTextFlip
                    text=""
                    words={rotatingWords}
                    duration={2800}
                    className="process-sticky-heading-flip process-sticky-heading-flip-inline"
                    textClassName="process-sticky-heading-empty"
                    wordClassName="services-stack-heading-word"
                  />
                  <span className="process-sticky-title-inline-copy">{titleInline}</span>
                </div>
                <p className="process-sticky-title-tail">{titleBottom}</p>
              </div>
              <div className="process-wide-only process-sticky-heading">
                <p className="process-sticky-title-top">{titleLead}</p>
                <div className="process-sticky-title-inline justify-start">
                  <LayoutTextFlip
                    text=""
                    words={rotatingWords}
                    duration={2800}
                    className="process-sticky-heading-flip process-sticky-heading-flip-inline"
                    textClassName="process-sticky-heading-empty"
                    wordClassName="services-stack-heading-word"
                  />
                  <span className="process-sticky-title-inline-copy">{titleInline}</span>
                </div>
                <p className="process-sticky-title-tail">{titleBottom}</p>
              </div>
              <div className="process-sticky-steps">
                {content.map((item, index) => {
                  const isCurrent = index === activeIndex;
                  const stepBadgeTheme = processStepBadgeThemes[index] ?? processStepBadgeThemes[0];
                  const stepTextTheme = processStepTextThemes[index] ?? processStepTextThemes[0];
                  const connectorFill = Math.min(
                    1,
                    index < activeIndex
                      ? 1
                      : index === activeIndex
                        ? Math.max(0, scrollProgressValue * totalSegments - index)
                        : 0
                  );
                  const currentStepColor = processStepAccentColors[index] ?? processStepAccentColors[0];
                  const nextStepColor =
                    processStepAccentColors[index + 1] ??
                    processStepAccentColors[index] ??
                    processStepAccentColors[0];
                  return (
                    <article
                      key={item.step}
                      className={`grid w-full max-w-[42rem] grid-cols-[auto_1fr] items-start gap-5 text-left transition-all duration-200 ${
                        isCurrent ? "translate-y-0" : "translate-y-1"
                      }`}
                    >
                      <div className="flex h-full flex-col items-center">
                        <span
                          className={`inline-flex min-w-[3.2rem] justify-center rounded-full border px-3.5 py-2 text-[0.82rem] font-medium tracking-[0.2em] transition-all duration-200 ${
                            isCurrent
                              ? stepBadgeTheme
                              : "border-[#05a5ff]/20 bg-white/80 text-[#0c2d73]"
                          }`}
                        >
                          {formatStepLabel(item.step)}
                        </span>
                        {index < content.length - 1 ? (
                          <div className="process-sticky-step-connector">
                            <span className="relative block h-full w-full overflow-hidden rounded-full bg-[#d6e4ff]">
                              <span
                                className="absolute inset-0 origin-top rounded-full transition-transform duration-300 ease-out"
                                style={{
                                  backgroundImage: `linear-gradient(180deg, ${currentStepColor} 0%, ${nextStepColor} 100%)`,
                                  opacity: connectorFill > 0 ? 1 : 0,
                                  transform: `scaleY(${connectorFill})`,
                                }}
                              />
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`min-w-0 transition-opacity duration-200 ${
                          isCurrent ? "opacity-100" : "opacity-45"
                        }`}
                      >
                        <h3
                          className={`m-0 text-[1.5rem] font-medium leading-[1.05] tracking-[-0.04em] ${
                            isCurrent ? stepTextTheme.title : "text-[#022977]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            isCurrent ? "mt-3 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"
                          }`}
                        >
                          <p
                            className={`m-0 max-w-[34rem] text-base leading-7 ${
                              isCurrent ? stepTextTheme.detail : "text-[#536b9c]"
                            }`}
                          >
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            {renderStageCard("process-desktop-stage")}
            {renderStageCard("process-wide-stage")}
          </div>
        </div>
      ) : null}
    </section>
  );
}
