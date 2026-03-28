"use client";

import { ArrowUpRight, BarChart3, Compass, LayoutTemplate, Rocket } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

type ProcessItem = {
  step: string;
  title: string;
  detail: string;
};

type ProcessStickySectionProps = {
  eyebrow: string;
  title: string;
  rotatingWords: readonly string[];
  items: readonly ProcessItem[];
};

const processIcons = [Compass, LayoutTemplate, Rocket, BarChart3];
const processHighlights = [
  ["Ideas claras", "Asesoria cercana", "Enfoque comercial"],
  ["SEO entendible", "Redes optimizadas", "Mas alcance"],
  ["Herramientas utiles", "Procesos mas agiles", "Mas confianza"],
  ["Acompanamiento", "Resultados medibles", "Mejora continua"],
];
const processThemes = [
  "from-[#0c2d73] via-[#1747b5] to-[#05a5ff]",
  "from-[#0f3f7a] via-[#1c6fd7] to-[#66d6ff]",
  "from-[#0c2d73] via-[#112d8d] to-[#ff9900]",
  "from-[#09215e] via-[#1242c8] to-[#00b9ff]",
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

export function ProcessStickySection({
  eyebrow,
  title,
  rotatingWords,
  items,
}: ProcessStickySectionProps) {
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
        const Icon = processIcons[index] ?? Compass;
        const highlights = processHighlights[index] ?? [];
        const theme = processThemes[index] ?? processThemes[0];
        return {
          ...item,
          Icon,
          highlights,
          theme,
        };
      }),
    [items]
  );

  const activeItem = content[activeIndex] ?? content[0];
  const ActiveIcon = activeItem.Icon;
  const titleMatch = title.match(/^(.*?)(?:\s+)(marca|brand)(.*)$/i);
  const titleLead = titleMatch ? titleMatch[1].trim() : title;
  const titleTail = titleMatch ? titleMatch[3].trim() : "";
  const titleInline = /^with\b/i.test(titleTail) ? "with a" : "con una";
  const titleBottom = /^with\b/i.test(titleTail)
    ? "clear roadmap and modern SEO"
    : "ruta clara y estrategica.";
  const titleTabletBottomLine = `${titleInline} ${titleBottom}`.trim();
  const totalSegments = Math.max(content.length - 1, 1);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="section-divider relative"
      style={{ minHeight: `${Math.max(items.length * 95, 340)}vh` }}
    >
      {isActive ? (
        <div className="pointer-events-none fixed inset-0 z-[14] flex items-center justify-center">
          <div
            className="mx-auto grid w-[min(1180px,calc(100vw-2rem))] items-center gap-8 px-4 py-8 sm:px-5 lg:gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.88fr)]"
            style={{ opacity: shellOpacity }}
          >
            <div className="grid gap-5 justify-items-center text-center lg:justify-items-stretch lg:text-left">
              <p className="eyebrow">{eyebrow}</p>
              <div className="grid process-sticky-heading md:hidden">
                <p className="process-sticky-title-top">{titleLead}</p>
                <div className="process-sticky-title-inline justify-center lg:justify-start">
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
              <div className="hidden process-sticky-heading md:grid lg:hidden">
                <div className="process-sticky-title-inline justify-center whitespace-nowrap">
                  <p className="process-sticky-title-top text-[clamp(3.2rem,6.45vw,4.55rem)]">
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
                <p className="process-sticky-title-tail text-[clamp(2.7rem,5.2vw,3.85rem)]">
                  {titleTabletBottomLine}
                </p>
              </div>
              <div className="hidden process-sticky-heading lg:grid">
                <p className="process-sticky-title-top">{titleLead}</p>
                <div className="process-sticky-title-inline justify-center lg:justify-start">
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
              <div className="grid w-full justify-items-center gap-7 lg:justify-items-stretch">
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
                        isCurrent ? "translate-y-0 opacity-100" : "translate-y-3 opacity-30"
                      }`}
                    >
                      <div className="flex h-full flex-col items-center">
                        <span
                          className={`inline-flex min-w-[3.2rem] justify-center rounded-full border px-3.5 py-2 text-[0.82rem] font-extrabold tracking-[0.2em] transition-all duration-200 ${
                            isCurrent
                              ? stepBadgeTheme
                              : "border-[#05a5ff]/20 bg-white/80 text-[#0c2d73]"
                          }`}
                        >
                          {formatStepLabel(item.step)}
                        </span>
                        {index < content.length - 1 ? (
                          <div className="mt-3 flex min-h-[4.8rem] w-2.5 justify-center lg:hidden">
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
                      <div className="min-w-0">
                        <h3
                          className={`m-0 text-[1.5rem] font-extrabold leading-[1.05] tracking-[-0.04em] ${
                            isCurrent ? stepTextTheme.title : "text-[#02215f]"
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

            <div className="hidden items-center justify-center lg:flex">
              <div
                className={`flex min-h-[36rem] w-full flex-col justify-between rounded-[2rem] bg-gradient-to-br ${activeItem.theme} p-8 text-white shadow-[0_28px_70px_rgba(2,33,95,0.18)]`}
                key={activeItem.step}
              >
                <div className="process-sticky-card-frame">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-white/90">
                      Paso {formatStepLabel(activeItem.step)}
                    </span>
                    <span className="inline-flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-2xl border border-white/20 bg-white/12">
                      <ActiveIcon size={24} strokeWidth={2.05} />
                    </span>
                  </div>

                  <div>
                    <h4 className="m-0 max-w-[12ch] text-5xl leading-none tracking-[-0.05em]">
                      {activeItem.title}
                    </h4>
                    <p className="m-0 mt-5 max-w-[28rem] text-base leading-8 text-white/80">
                      {activeItem.detail}
                    </p>
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
                    <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                      <p className="m-0 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-white/70">
                        Ruta clara para crecer
                      </p>
                      <ArrowUpRight size={18} strokeWidth={2.2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
