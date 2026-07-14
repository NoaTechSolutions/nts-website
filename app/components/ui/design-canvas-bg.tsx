"use client";

// Fondo animado "Diseño a medida" para la card destacada del bento (Qué incluye).
// Mini-mockup de web que "respira": una ventanita de browser con bloques de
// layout que flotan + swatches de color (paleta = diseño). Vector puro + motion
// (solo transform/opacity → GPU-composited). Weightless: CERO archivos de video,
// cero decoders, cero banding, escala infinito a cualquier tamaño de card.
// Es la "opción 4" (animación en código) aplicada directo. Solo desktop (lg).
import { motion } from "motion/react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const VIOLET = "#7c5cff";
const AMBER = "#ff9900";

export function DesignCanvasBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/* Ventanita de browser flotando (mockup de la web que diseñamos). */}
      <motion.div
        className="absolute right-5 top-7 w-[56%] rounded-2xl border border-[#022977]/10 bg-white/70 pb-3 shadow-[0_18px_40px_rgba(2,41,119,0.10)] backdrop-blur-[1px] dark:border-white/10 dark:bg-white/[0.05]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Barra superior con los 3 puntitos. */}
        <div className="flex items-center gap-1.5 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff9900]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#05a5ff]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1e63e6]/70" />
        </div>

        {/* Banda "hero" con gradiente que pulsa. */}
        <motion.div
          className="mx-3 h-6 rounded-md"
          style={{ background: `linear-gradient(90deg, ${BLUE}33, ${SKY}33)` }}
          animate={{ opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fila de 3 bloques de contenido que se encienden escalonados. */}
        <div className="mx-3 mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-7 rounded-md bg-[#022977]/[0.08] dark:bg-white/10"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
            />
          ))}
        </div>

        {/* Un par de líneas de "texto". */}
        <div className="mx-3 mt-2 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-[#022977]/10 dark:bg-white/10" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#022977]/10 dark:bg-white/10" />
        </div>
      </motion.div>

      {/* Swatches de paleta flotando (a contratiempo de la ventana). */}
      <motion.div
        className="absolute right-9 top-[54%] flex gap-2"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {[BLUE, SKY, VIOLET, AMBER].map((c) => (
          <span
            key={c}
            className="h-4 w-4 rounded-full shadow-sm"
            style={{ background: c, opacity: 0.6 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
