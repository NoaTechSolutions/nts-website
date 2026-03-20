"use client";

import { useEffect, useState } from "react";

const words = [
  "Negocio",
  "Proyecto",
  "Idea",
  "Marca",
  "Empresa",
  "Producto",
  "Servicio",
  "StartUp",
  "Pyme",
  "Firma",
];

export function HeroRotatingWord() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsAnimating(true);

      window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setIsAnimating(false);
      }, 260);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="hero-rotating-shell" aria-live="polite">
      <span className="sr-only">
        Eleva Tu Negocio, Proyecto, Idea, Marca, Empresa, Producto, Servicio,
        StartUp, Pyme o Firma a la era digital.
      </span>
      <span
        aria-hidden="true"
        className={`hero-rotating-word ${isAnimating ? "hero-rotating-word-flip-out" : "hero-rotating-word-flip-in"}`}
      >
        {words[index]}
      </span>
    </span>
  );
}
