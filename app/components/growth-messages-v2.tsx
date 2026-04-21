"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import { Zap, Globe, BarChart, Shield, Rocket, Star } from "lucide-react";

const icons = [Zap, Globe, BarChart, Shield, Rocket, Star];

const colors = [
  "#022977",
  "#0400f0",
  "#05a5ff",
  "#ff9900",
  "#022977",
  "#0400f0",
];

export function GrowthMessagesV2() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const { title, items, eyebrow, copy } = t.growthSection;

  return (
    <section className="py-12">
      <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12 max-w-6xl mx-auto px-6">
        {/* Columna izquierda — sticky */}
        <div className="left-0 top-0 md:sticky md:h-svh md:py-12 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-[#ff9900] font-medium mb-4">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-medium tracking-tight text-[#022977] dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-500 max-w-prose">
            {copy}
          </p>
        </div>

        {/* Columna derecha — cards stack */}
        <ContainerScroll className="min-h-[250vh] space-y-6 pt-[30vh] pb-24">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <CardSticky
                key={index}
                index={index + 3}
                incrementY={20}
                incrementZ={8}
                className="rounded-2xl border border-[#022977]/10 bg-white dark:bg-[#161d30] p-8 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <span className="text-3xl font-medium opacity-10 text-[#022977] dark:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-base font-medium text-[#022977] dark:text-white leading-snug">
                  {item}
                </p>
              </CardSticky>
            );
          })}
        </ContainerScroll>
      </div>
    </section>
  );
}
