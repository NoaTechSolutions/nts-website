"use client";

// Efecto "Sparkles Text" (inspirado en MagicUI): destellos de estrellitas que
// aparecen/desaparecen alrededor del texto. Recreado con motion (ya instalado).
// Las estrellas usan la PALETA DE MARCA (sky, azul, naranja). El texto hereda el
// estilo del elemento contenedor (font/size/color) → se puede meter dentro de un
// h2.section-title sin cambiarle la tipografía.
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Colores de marca para los destellos (brillan sobre fondo claro y oscuro).
const BRAND_SPARKLE_COLORS = ["#05a5ff", "#1e63e6", "#ff9900"];

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

function SparkleIcon({ x, y, color, delay, scale }: Sparkle) {
  return (
    <motion.svg
      className="pointer-events-none absolute z-10"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, scale, 0], rotate: [75, 120, 150] }}
      transition={{ duration: 0.8, repeat: Infinity, delay }}
      width="18"
      height="18"
      viewBox="0 0 21 21"
      aria-hidden="true"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.9998 7.99988C15.6081 9.60819 17.8074 9.59915 19.2794 10.1379L21.1558 10.8251C21.7845 11.0551 21.7845 11.9444 21.1558 12.1744L19.2794 12.8617C17.8074 13.4004 15.6081 13.3914 13.9998 14.9997C12.3916 16.608 12.4006 18.8073 11.8618 20.2793L11.1746 22.1557C10.9446 22.7844 10.0553 22.7844 9.82531 22.1557L9.13809 20.2793C8.59934 18.8073 8.60834 16.608 7.00003 14.9997C5.39172 13.3914 3.19244 13.4004 1.72041 12.8617L-0.155996 12.1744C-0.784663 11.9444 -0.784663 11.0551 -0.155996 10.8251L1.72041 10.1379C3.19244 9.59915 5.39172 9.60819 7.00003 7.99988C8.60834 6.39157 8.59934 4.19229 9.13809 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  );
}

export function SparklesText({
  text,
  colors = BRAND_SPARKLE_COLORS,
  className,
  sparklesCount = 14,
}: {
  text: string;
  colors?: string[];
  className?: string;
  sparklesCount?: number;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const colorsKey = colors.join(",");

  useEffect(() => {
    // Respeta prefers-reduced-motion: sin destellos, queda el texto limpio.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const palette = colorsKey.split(",");
    const gen = (): Sparkle => ({
      id: `${Math.random()}-${Date.now()}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      color: palette[Math.floor(Math.random() * palette.length)],
      delay: Math.random() * 2,
      scale: Math.random() * 1 + 0.3,
      lifespan: Math.random() * 10 + 5,
    });

    setSparkles(Array.from({ length: sparklesCount }, gen));
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.map((s) => (s.lifespan <= 0 ? gen() : { ...s, lifespan: s.lifespan - 0.1 })),
      );
    }, 100);
    return () => clearInterval(interval);
  }, [colorsKey, sparklesCount]);

  return (
    <span className={cn("relative inline-block", className)}>
      {sparkles.map((s) => (
        <SparkleIcon key={s.id} {...s} />
      ))}
      <span className="relative z-[1]">{text}</span>
    </span>
  );
}
