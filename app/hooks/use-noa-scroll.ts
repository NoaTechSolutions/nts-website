"use client";

import { useEffect, useState } from "react";

type NoaExpression =
  | "idle"
  | "wave"
  | "point-right"
  | "thumbs-up"
  | "celebrate"
  | "think";

export function useNoaScroll() {
  const [expression, setExpression] = useState<NoaExpression>("wave");

  useEffect(() => {
    const sections = [
      { id: "home", expression: "wave" as const },
      { id: "servicios", expression: "point-right" as const },
      { id: "proceso", expression: "think" as const },
      { id: "reviews", expression: "thumbs-up" as const },
      { id: "contacto", expression: "celebrate" as const },
      { id: "faq", expression: "think" as const },
    ];

    const observers = sections.map(({ id, expression: exp }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setExpression(exp);
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return { expression };
}
