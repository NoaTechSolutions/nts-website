"use client";

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { Highlighter } from "@/components/ui/highlighter";
import { useLanguage } from "@/app/components/language-provider";
import { translations } from "@/lib/i18n";
import { TriangleAlert } from "lucide-react";

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
  const items = t.growthSection.items;
  const formatted = formatTitle(t.growthSection.title);

  return (
    <section className="py-12 bg-(--bg-page)">
      <div className="grid md:grid-cols-2 gap-8 xl:gap-12 max-w-6xl mx-auto px-6">
        {/* Columna izquierda sticky */}
        <div className="md:sticky md:top-[20vh] md:h-fit flex flex-col justify-center py-12">
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
        </div>

        {/* Columna derecha cards */}
        <ContainerScroll className="min-h-[250vh] space-y-6 pt-[10vh] pb-24">
          {items.map((item, index) => {
            const normalized = item.replace(/\.$/, "");
            return (
              <CardSticky
                key={index}
                index={index + 3}
                incrementY={20}
                incrementZ={8}
                className="w-full"
                style={{
                  position: "sticky" as const,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: "0.38rem 0.74rem 0.4rem",
                    overflow: "hidden",
                    border: "1px solid rgba(255,153,0,0.44)",
                    borderRadius: "1.55rem",
                    background:
                      "linear-gradient(180deg, rgba(255,247,237,0.98), rgba(255,255,255,0.94)), linear-gradient(90deg, rgba(255,153,0,0.08), rgba(255,255,255,0))",
                    boxShadow:
                      "0 0 0 1px rgba(255,153,0,0.08), 0 16px 34px rgba(2,41,119,0.08), 0 0 28px rgba(255,153,0,0.16)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.65rem",
                      height: "1.65rem",
                      borderRadius: "999px",
                      color: "#ffffff",
                      background:
                        "linear-gradient(180deg, #ffb23f, #ff9900)",
                      boxShadow:
                        "0 0 0 3px rgba(255,153,0,0.14), 0 8px 18px rgba(255,153,0,0.28)",
                      flexShrink: 0,
                    }}
                  >
                    <TriangleAlert size={14} strokeWidth={2.2} />
                  </span>
                  <p
                    style={{
                      textWrap: "balance",
                      whiteSpace: "nowrap",
                      color: "#022977",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {normalized}
                  </p>
                </div>
              </CardSticky>
            );
          })}
        </ContainerScroll>
      </div>
    </section>
  );
}
