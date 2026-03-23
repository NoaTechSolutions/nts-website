"use client";

import { FlipWords } from "@/components/ui/flip-words";

export function HeroRotatingWord({
  words,
  ariaLabel,
}: {
  words: readonly string[];
  ariaLabel: string;
}) {
  return (
    <span className="hero-rotating-shell" aria-live="polite">
      <span className="sr-only">{ariaLabel}</span>
      <FlipWords
        words={[...words]}
        duration={2300}
        className="hero-rotating-word"
      />
    </span>
  );
}
