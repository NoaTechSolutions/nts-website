"use client";

import { TriangleAlert } from "lucide-react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { Highlighter } from "@/components/ui/highlighter";
import { useLanguage } from "./language-provider";
import { translations } from "@/lib/i18n";

function formatTitle(title: string) {
  const words = title
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return {
    firstWord: words[0] ?? "",
    highlightedWord: words[1] ?? "",
    accentWord: words[2] ?? "",
    trailingWords: words.slice(3).join(" "),
  };
}

function normalizeMessage(message: string) {
  const lower = message.toLowerCase();
  return lower ? `${lower.charAt(0).toUpperCase()}${lower.slice(1)}` : lower;
}

export function GrowthMessagesV2() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const { title, items } = t.growthSection;
  const formattedTitle = formatTitle(title);

  return (
    <section className="section-divider relative py-16 md:py-24">
      <div className="grid-shell">
        {/* Section title */}
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-medium text-[#022977] mb-16 leading-tight">
          <span className="block">
            <span>{formattedTitle.firstWord} </span>
            <span className="text-[#ff9900]">
              {formattedTitle.highlightedWord}
            </span>
          </span>
          <span className="block">
            <Highlighter
              action="underline"
              color="#ff9900"
              strokeWidth={3}
              animationDuration={900}
              padding={4}
              isView
            >
              <span>{formattedTitle.accentWord}</span>
            </Highlighter>{" "}
            <span>{formattedTitle.trailingWords}</span>
          </span>
        </h2>

        {/* Cards stack */}
        <ContainerScroll className="space-y-4 pb-[60vh]">
          {items.map((message, index) => (
            <CardSticky
              key={`${index}-${message}`}
              index={index}
              incrementY={12}
              incrementZ={6}
              className="flex items-start gap-4 rounded-2xl border border-[rgba(2,41,119,0.1)] bg-white p-8 shadow-[0_4px_24px_rgba(2,41,119,0.08)] dark:bg-[#161d30]"
            >
              <span
                className="mt-1 shrink-0 text-[#ff9900]"
                aria-hidden="true"
              >
                <TriangleAlert size={24} strokeWidth={2.2} />
              </span>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-[#022977] dark:text-white">
                {normalizeMessage(message)}
              </p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
