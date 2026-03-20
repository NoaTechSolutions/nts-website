"use client";

import { FlipWords } from "@/components/ui/flip-words";

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
  return (
    <span className="hero-rotating-shell" aria-live="polite">
      <span className="sr-only">
        Eleva Tu Negocio, Proyecto, Idea, Marca, Empresa, Producto, Servicio,
        StartUp, Pyme o Firma a la era digital.
      </span>
      <FlipWords
        words={words}
        duration={2300}
        className="hero-rotating-word"
      />
    </span>
  );
}
