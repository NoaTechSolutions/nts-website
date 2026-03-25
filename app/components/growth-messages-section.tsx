"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Highlighter } from "@/components/ui/highlighter";

type GrowthMessagesSectionProps = {
  title: string;
  items: readonly string[];
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
  const lowerMessage = message.toLowerCase();
  const normalizedMessage = lowerMessage
    ? `${lowerMessage.charAt(0).toUpperCase()}${lowerMessage.slice(1)}`
    : lowerMessage;
  const [isRendered, setIsRendered] = useState(active);
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">(
    active ? "idle" : "exit",
  );

  useEffect(() => {
    let frameId: number | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (active) {
      frameId = window.requestAnimationFrame(() => {
        setIsRendered(true);
        setPhase("enter");
        timer = setTimeout(() => setPhase("idle"), 1500);
      });
    } else if (isRendered) {
      frameId = window.requestAnimationFrame(() => {
        setPhase("exit");
        timer = setTimeout(() => {
          setIsRendered(false);
          setPhase("idle");
        }, 1500);
      });
    }

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, isRendered]);

  if (!isRendered) {
    return null;
  }

  return (
    <motion.article
      className={`growth-message-card growth-message-card-${index + 1} growth-message-card-${phase}`}
      initial={false}
      animate={{
        opacity: phase === "exit" ? 0 : 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: phase === "exit" ? 0.55 : 0.18,
        ease: "linear",
      }}
    >
      <div className="growth-message-copy">
        <span className="growth-message-icon" aria-hidden="true">
          <TriangleAlert size={14} strokeWidth={2.2} />
        </span>
        <p
          className={`growth-message-text ${
            phase !== "idle" ? "growth-message-text-glitch" : ""
          }`}
          data-text={normalizedMessage}
        >
          {normalizedMessage}
        </p>
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
    const thresholds = [0.16, 0.36, 0.56, 0.76];
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
