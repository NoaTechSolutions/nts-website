"use client";

// Fondo animado "100% responsive" para su card del bento (Qué incluye).
// Concepto: la MISMA web en laptop, tablet y teléfono, con el layout que se
// ADAPTA (3 columnas → 2 → 1). Cada dispositivo se "activa" en secuencia (pulse
// + glow) → se ve bien en todos. Reconocible al instante. Va arriba para no
// tapar el texto (abajo-izq). HTML puro + motion (transform/opacity → GPU).
// Weightless: cero video. Todos los breakpoints.
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const VIOLET = "#7c5cff";

const COL_CLASS: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

// Mini-web dentro de cada pantalla: nav + hero + N columnas (reflow responsive).
function MiniSite({ cols }: { cols: 1 | 2 | 3 }) {
  return (
    <div className="flex h-full flex-col gap-0.5 p-1">
      <div className="h-0.5 rounded-[1px]" style={{ background: BLUE }} />
      <div
        className="h-1.5 rounded-[1px]"
        style={{ background: `linear-gradient(90deg, ${SKY}88, ${VIOLET}88)` }}
      />
      <div className={`grid flex-1 gap-0.5 ${COL_CLASS[cols]}`}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="rounded-[1px] bg-[#022977]/15 dark:bg-white/15" />
        ))}
      </div>
    </div>
  );
}

// Pulse + glow secuencial por dispositivo (delay escalonado).
function pulse(i: number) {
  return {
    animate: {
      scale: [1, 1.07, 1],
      boxShadow: [
        "0 6px 14px rgba(2,41,119,0.10)",
        "0 10px 24px rgba(30,99,230,0.38)",
        "0 6px 14px rgba(2,41,119,0.10)",
      ],
    },
    transition: {
      duration: 0.9,
      repeat: Infinity,
      repeatDelay: 2.7,
      delay: i * 1.2,
      ease: "easeInOut" as const,
    },
  };
}

export function ResponsiveBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Laptop */}
      <motion.div className="absolute" style={{ left: "5%", top: "16%", width: "42%" }} {...pulse(0)}>
        <div className="aspect-[16/10] overflow-hidden rounded-md border-2 border-[#022977]/15 bg-white dark:border-white/15 dark:bg-[#0b1220]">
          <MiniSite cols={3} />
        </div>
        {/* Base / hinge */}
        <div
          className="mt-0.5 h-1 rounded-b-md bg-[#022977]/20 dark:bg-white/20"
          style={{ width: "116%", marginLeft: "-8%" } as CSSProperties}
        />
      </motion.div>

      {/* Tablet */}
      <motion.div className="absolute" style={{ left: "53%", top: "20%", width: "20%" }} {...pulse(1)}>
        <div className="aspect-[3/4] overflow-hidden rounded-[6px] border-2 border-[#022977]/15 bg-white dark:border-white/15 dark:bg-[#0b1220]">
          <MiniSite cols={2} />
        </div>
      </motion.div>

      {/* Teléfono */}
      <motion.div className="absolute" style={{ right: "6%", top: "18%", width: "12%" }} {...pulse(2)}>
        <div className="aspect-[1/2] overflow-hidden rounded-[6px] border-2 border-[#022977]/15 bg-white dark:border-white/15 dark:bg-[#0b1220]">
          {/* Notch */}
          <div className="mx-auto mt-[2px] h-0.5 w-3 rounded-full bg-[#022977]/25 dark:bg-white/25" />
          <MiniSite cols={1} />
        </div>
      </motion.div>
    </div>
  );
}
