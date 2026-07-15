"use client";

// Fondo animado "100% responsive" para su card del bento (Qué incluye).
// Concepto: la MISMA web en laptop, tablet y teléfono, con el layout que se
// ADAPTA (3 columnas → 2 → 1). Cada dispositivo se "activa" en secuencia (pulse
// + glow) → se ve bien en todos. Arriba, una REGLA DE BREAKPOINTS con un punto
// que escanea de un dispositivo al otro + un handle de RESIZE (↔) refuerzan
// "un diseño, todos los anchos". Reconocible al instante. Va arriba para no
// tapar el texto (abajo-izq). HTML puro + motion (transform/opacity → GPU).
// Weightless: cero video. Todos los breakpoints.
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const VIOLET = "#7c5cff";
const AMBER = "#ff9900";

const COL_CLASS: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

const DOT = [BLUE, SKY, AMBER];

// Mini-web reconocible dentro de cada pantalla (mismo lenguaje que el card de
// "Diseño a medida"): navbar con logo, hero con título + CTA + foto, y grid de
// features. Es la MISMA web en los 3 dispositivos → sólo cambia el LAYOUT:
// laptop 3 col + hero al lado, tablet 2 col, teléfono 1 col apilada. Ese reflow
// es lo que hace leer "100% responsive".
function MiniSite({ cols }: { cols: 1 | 2 | 3 }) {
  const stacked = cols === 1; // teléfono → hero apilado, sin menú
  const chrome = cols === 3; // laptop → dots de browser para reforzar "web"
  return (
    <div className="flex h-full flex-col gap-0.75 p-0.75">
      {/* Navbar: (dots browser en laptop) + logo + brand + menú */}
      <div className="flex items-center gap-0.5">
        {chrome && (
          <span className="flex gap-[1.5px]">
            <span className="block size-0.5 rounded-full" style={{ background: `${AMBER}b3` }} />
            <span className="block size-0.5 rounded-full" style={{ background: `${SKY}b3` }} />
            <span className="block size-0.5 rounded-full" style={{ background: `${BLUE}b3` }} />
          </span>
        )}
        <span
          className="block size-1 shrink-0 rounded-[1px]"
          style={{ background: `linear-gradient(135deg, ${BLUE}, ${SKY})` }}
        />
        <span
          className="block h-0.5 rounded-full bg-[#022977]/60 dark:bg-white/60"
          style={{ width: stacked ? "38%" : "26%" }}
        />
        {!stacked && (
          <span className="ml-auto flex items-center gap-0.5">
            <span className="block h-0.5 w-1.25 rounded-full bg-[#022977]/25 dark:bg-white/25" />
            <span className="block h-0.5 w-1.25 rounded-full bg-[#022977]/25 dark:bg-white/25" />
            <span className="block h-0.75 w-1.5 rounded-full" style={{ background: BLUE }} />
          </span>
        )}
      </div>

      {/* Hero: título + acento ámbar + CTA azul, con bloque de foto al lado
          (apilado en teléfono). */}
      <div className={stacked ? "flex flex-col gap-0.75" : "flex items-stretch gap-0.75"}>
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="block h-0.75 w-4/5 rounded-full bg-[#022977]/85 dark:bg-white/85" />
          <span className="block h-0.75 w-3/5 rounded-full" style={{ background: AMBER }} />
          <span
            className="mt-px block h-1 rounded-full"
            style={{ width: stacked ? "48%" : "60%", background: BLUE }}
          />
        </div>
        <div
          className="shrink-0 rounded-xs"
          style={{
            width: stacked ? "100%" : "38%",
            height: stacked ? "8px" : "auto",
            background: `linear-gradient(135deg, ${SKY}33, ${VIOLET}33)`,
          }}
        />
      </div>

      {/* Grid de features → acá se ve el REFLOW (3 → 2 → 1 columnas) */}
      <div className={`grid flex-1 gap-0.5 ${COL_CLASS[cols]}`}>
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-0.5 rounded-xs border border-[#022977]/8 p-0.5 dark:border-white/10"
          >
            <span className="block size-0.75 rounded-[1px]" style={{ background: DOT[i % 3] }} />
            <span className="block h-[1.5px] w-full rounded-full bg-[#022977]/12 dark:bg-white/15" />
            <span className="block h-[1.5px] w-2/3 rounded-full bg-[#022977]/12 dark:bg-white/15" />
          </div>
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

// Regla de breakpoints (arriba): línea con ticks + 3 nodos alineados sobre
// laptop/tablet/teléfono + un punto que "escanea" saltando entre ellos.
const NODES = ["23%", "64%", "92%"] as const;

function BreakpointRuler() {
  return (
    <div className="absolute" style={{ left: "5%", right: "5%", top: "7%" }}>
      <div
        className="relative h-px w-full rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${BLUE}55 12%, ${BLUE}55 88%, transparent)` }}
      >
        {/* Ticks finos */}
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 h-1 w-px bg-[#022977]/15 dark:bg-white/20"
            style={{ left: `${5 + i * 9}%` }}
          />
        ))}
        {/* Nodos de breakpoint (sobre cada dispositivo) */}
        {NODES.map((left) => (
          <span
            key={left}
            className="absolute top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-[#022977]/30 dark:border-[#0b1220] dark:bg-white/40"
            style={{ left }}
          />
        ))}
        {/* Punto que escanea saltando entre los 3 breakpoints */}
        <motion.span
          className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: SKY, boxShadow: `0 0 8px ${SKY}` }}
          animate={{
            left: [NODES[0], NODES[0], NODES[1], NODES[1], NODES[2], NODES[2], NODES[0]],
            opacity: [1, 1, 1, 1, 1, 1, 1],
            scale: [1, 1.5, 1, 1.5, 1, 1.5, 1],
          }}
          transition={{ duration: 3.6, times: [0, 0.16, 0.4, 0.55, 0.78, 0.92, 1], repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

// Handle de resize (↔): sugiere "arrastrás el ancho y el layout se adapta".
function ResizeHandle() {
  return (
    <motion.div
      className="absolute flex items-center gap-1"
      style={{ right: "8%", top: "64%" }}
      animate={{ x: [0, -6, 0, 6, 0], opacity: [0.5, 0.9, 0.5, 0.9, 0.5] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 40 16" className="h-3 w-9 text-[#1e63e6]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4 L3 8 L8 12" />
        <path d="M32 4 L37 8 L32 12" />
        <path d="M3 8 H37" strokeOpacity="0.5" />
      </svg>
    </motion.div>
  );
}

export function ResponsiveBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Toda la escena hace zoom al hover (igual que el card destacado). */}
      <div className="absolute inset-0 origin-center transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        <BreakpointRuler />

      {/* Laptop */}
      <motion.div className="absolute" style={{ left: "5%", top: "16%", width: "42%" }} {...pulse(0)}>
        <div className="aspect-16/10 overflow-hidden rounded-md border-2 border-[#022977]/15 bg-white dark:border-white/15 dark:bg-[#0b1220]">
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
        <div className="aspect-3/4 overflow-hidden rounded-[6px] border-2 border-[#022977]/15 bg-white dark:border-white/15 dark:bg-[#0b1220]">
          <MiniSite cols={2} />
        </div>
      </motion.div>

      {/* Teléfono */}
      <motion.div className="absolute" style={{ right: "6%", top: "18%", width: "12%" }} {...pulse(2)}>
        <div className="aspect-1/2 overflow-hidden rounded-[6px] border-2 border-[#022977]/15 bg-white dark:border-white/15 dark:bg-[#0b1220]">
          {/* Notch */}
          <div className="mx-auto mt-0.5 h-0.5 w-3 rounded-full bg-[#022977]/25 dark:bg-white/25" />
          <MiniSite cols={1} />
        </div>
      </motion.div>

        <ResizeHandle />
      </div>
    </div>
  );
}
