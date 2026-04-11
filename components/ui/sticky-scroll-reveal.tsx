"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type StickyScrollItem = {
  title: string;
  description: string;
  content: React.ReactNode;
};

type StickyScrollProps = {
  content: StickyScrollItem[];
  className?: string;
};

export function StickyScroll({ content, className }: StickyScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const stepCount = Math.max(content.length, 1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(stepCount - 1, Math.max(0, Math.round(latest * (stepCount - 1))));
    setActiveCard(index);
  });

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ height: `${Math.max(stepCount * 92, 280)}vh` }}
    >
      <div className="sticky top-0 grid min-h-screen items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.8fr)]">
        <div className="relative">
          <div className="mx-auto flex max-w-3xl flex-col gap-10 lg:gap-16">
            {content.map((item, index) => {
              const isActive = index === activeCard;

              return (
                <motion.article
                  key={item.title}
                  animate={{
                    opacity: isActive ? 1 : 0.28,
                    y: isActive ? 0 : 12,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="absolute left-[-1.35rem] top-2 hidden h-16 w-[2px] bg-gradient-to-b from-[#05a5ff] via-[#0c2d73] to-transparent lg:block" />
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#02215f] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#536b9c] sm:text-lg">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="sticky top-24 hidden h-[34rem] items-center lg:flex">
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-[#dbe7ff] bg-white/70 shadow-[0_28px_70px_rgba(2,33,95,0.12)] backdrop-blur-sm">
            {content.map((item, index) => (
              <motion.div
                key={item.title}
                className="absolute inset-0"
                animate={{
                  opacity: index === activeCard ? 1 : 0,
                  scale: index === activeCard ? 1 : 0.96,
                  y: index === activeCard ? 0 : 16,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {item.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
