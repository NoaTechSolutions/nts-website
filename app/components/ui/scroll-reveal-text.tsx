"use client";

// ScrollRevealText — adaptado de MagicUI TextReveal
// (https://magicui.design/docs/components/text-reveal).
// El componente original trae su PROPIO contenedor de scroll (h-[200vh] +
// sticky top-0) que NO encaja en el sticky-scroll de 2 columnas de la sección
// Problema (rompería la alineación del video y el detector de "activo"). Acá
// reusamos solo el MECANISMO: revelar palabra por palabra según el
// scrollYProgress del PROPIO texto → coincide con el scroll del video (se
// termina de revelar justo cuando el freno se vuelve activo). El color y la
// tipografía se heredan del elemento padre (h3 con su acento, p con body).
import { useRef, type FC, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export const ScrollRevealText: FC<ScrollRevealTextProps> = ({ text, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Revela mientras el texto sube del 92% → 32% del viewport → rango ancho =
    // reveal más gradual/lento, en sync con el crossfade del video.
    offset: ["start 0.92", "start 0.32"],
  });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`relative inline ${className ?? ""}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <RevealWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </RevealWord>
        );
      })}
    </span>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const RevealWord: FC<RevealWordProps> = ({ children, progress, range }) => {
  // 0.2 (fantasma tenue) → 1 (revelado). Hereda el color del padre.
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};
