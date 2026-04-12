"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text,
  words,
  duration = 3000,
  className,
  textClassName,
  wordClassName,
}: {
  text: string;
  words: readonly string[];
  duration?: number;
  className?: string;
  textClassName?: string;
  wordClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <motion.span
        layoutId="subtext"
        className={cn(
          "text-2xl font-medium tracking-tight drop-shadow-lg md:text-4xl",
          textClassName,
        )}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className={cn(
          "relative w-fit overflow-hidden rounded-md border border-transparent bg-white px-4 py-2 font-sans text-2xl font-medium tracking-tight text-black shadow-sm ring ring-black/10 shadow-black/10 drop-shadow-lg md:text-4xl",
          wordClassName,
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};
