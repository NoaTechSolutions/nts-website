"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Highlighter } from "@/components/ui/highlighter";

type GrowthMessagesSectionProps = {
  title: string;
  items: string[];
};

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

function GrowthMessageCard({
  active,
  index,
  message,
}: {
  active: boolean;
  index: number;
  message: string;
}) {
  return (
    <motion.article
      className={`growth-message-card growth-message-card-${index + 1}`}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        x: active ? 0 : index % 2 === 0 ? -42 : 42,
        y: active ? 0 : 36,
        scale: active ? 1 : 0.9,
        rotate: active ? 0 : index % 2 === 0 ? -4 : 4,
      }}
      transition={{
        duration: 0.46,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="growth-message-copy">
        <span className="growth-message-icon" aria-hidden="true">
          <TriangleAlert size={18} strokeWidth={2.2} />
        </span>
        <p>{message}</p>
      </div>
    </motion.article>
  );
}

export function GrowthMessagesSection({
  title,
  items,
}: GrowthMessagesSectionProps) {
  const formattedTitle = formatTitle(title);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPinned, setIsPinned] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const thresholds = [0.14, 0.32, 0.5, 0.68];
    let nextIndex = -1;

    thresholds.forEach((threshold, index) => {
      if (value >= threshold) {
        nextIndex = index;
      }
    });

    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    const updatePinned = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const withinSection = rect.top <= 0 && rect.bottom >= viewportHeight;
      setIsPinned(withinSection);
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
    <section ref={sectionRef} className="section-divider growth-section">
      {isPinned ? (
        <div className="growth-centerpiece-overlay" aria-hidden="true">
          <div className="growth-centerpiece growth-centerpiece-floating">
            <h2 className="growth-center-title">
              <span className="growth-center-line">
                <span>{formattedTitle.firstWord}</span>
                <span className="growth-center-pill">{formattedTitle.highlightedWord}</span>
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
                  <span className="growth-center-underlined">{formattedTitle.accentWord}</span>
                </Highlighter>
                <span className="growth-center-trailing">{formattedTitle.trailingWords}</span>
              </span>
            </h2>
          </div>
        </div>
      ) : null}

      <div className="growth-stage-spacer" aria-hidden="true" />

      <div
        className={`growth-stage-frame ${isPinned ? "growth-stage-frame-pinned" : ""}`}
      >
        <div
          className={`growth-centerpiece ${
            isPinned ? "growth-centerpiece-hidden" : ""
          }`}
        >
          <h2 className="growth-center-title">
            <span className="growth-center-line">
              <span>{formattedTitle.firstWord}</span>
              <span className="growth-center-pill">{formattedTitle.highlightedWord}</span>
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
                <span className="growth-center-underlined">{formattedTitle.accentWord}</span>
              </Highlighter>
              <span className="growth-center-trailing">{formattedTitle.trailingWords}</span>
            </span>
          </h2>
        </div>

        <div className="growth-message-orbit" aria-label={title}>
          {items.map((message, index) => (
            <GrowthMessageCard
              key={`${index}-${message}`}
              active={index <= activeIndex}
              index={index}
              message={message}
            />
          ))}
        </div>
      </div>

      <div className="growth-scroll-track" aria-hidden="true">
        {[...items, "hold"].map((item, index) => (
          <div key={`${index}-${item}`} className="growth-scroll-step" />
        ))}
      </div>
    </section>
  );
}
