"use client";

// Fondo animado "Autogestionable (CMS)" para su card del bento (Qué incluye).
// Concepto: LO MANEJÁS VOS. A la IZQUIERDA tu biblioteca de medios; el cursor
// "YOU" agarra una foto y la arrastra de izquierda a DERECHA hasta el dropzone
// "Upload new photo" de tu propia web → aparece al instante en la galería con un
// check ("online, sin depender de nadie"). Loop reconocible, va arriba para no
// tapar el texto (abajo-izq). Vector/HTML + motion (transform/opacity → GPU).
// Zoom al hover (igual que el card destacado). Weightless: cero video.
import { motion } from "motion/react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const VIOLET = "#7c5cff";
const AMBER = "#ff9900";
const GREEN = "#22c55e";

const DUR = 4.5;
const T = [0, 0.35, 0.5, 0.8, 1];
const NEW_GRAD = `linear-gradient(135deg, ${BLUE}, ${SKY})`;

// Degradés variados para que las fotos no se vean todas iguales.
const GRADS = [
  `linear-gradient(135deg, ${SKY}, ${VIOLET})`,
  `linear-gradient(135deg, ${AMBER}, #ff5e8a)`,
  `linear-gradient(135deg, ${VIOLET}, ${BLUE})`,
  `linear-gradient(135deg, #16c79a, ${SKY})`,
];

// Miniatura de foto (degradé + ícono de imagen).
function PhotoThumb({ grad, className = "" }: { grad: string; className?: string }) {
  return (
    <div className={`grid place-items-center overflow-hidden ${className}`} style={{ background: grad }}>
      <svg viewBox="0 0 24 24" className="size-3 text-white/75" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M4 18l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function AutogestionableBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Toda la escena hace zoom al hover (igual que el card destacado). */}
      <div className="absolute inset-0 origin-center transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {/* ── Biblioteca de medios (izquierda) — tu librería de fotos ── */}
        <motion.div
          className="absolute rounded-lg border border-[#022977]/10 bg-white/95 p-1 shadow-[0_10px_24px_rgba(2,41,119,0.12)] dark:border-white/10 dark:bg-white/[0.07]"
          style={{ left: "3%", top: "18%" }}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-0.5 flex items-center gap-0.5 px-0.5">
            <svg viewBox="0 0 24 24" className="size-2 text-[#022977]/55 dark:text-white/55" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M3 7h6l2 2h10v9a1 1 0 0 1-1 1H3z" strokeLinejoin="round" />
            </svg>
            <span className="text-[6px] font-bold text-[#022977]/55 dark:text-white/55">Media</span>
          </div>
          <div className="grid grid-cols-2 gap-0.5">
            {GRADS.map((g, i) => (
              <PhotoThumb key={i} grad={g} className="size-4 rounded-[3px]" />
            ))}
          </div>
        </motion.div>

        {/* ── Mini-ventana: TU web con su galería + dropzone (DERECHA, FIJA) ── */}
        <div
          className="absolute w-[60%] max-w-60 overflow-hidden rounded-xl border border-[#022977]/10 bg-white/95 shadow-[0_16px_36px_rgba(2,41,119,0.14)] backdrop-blur-[1px] dark:border-white/10 dark:bg-white/[0.07]"
          style={{ right: "4%", top: "8%" }}
        >
          {/* Titlebar con estado "Live" */}
          <div className="flex items-center gap-1 border-b border-[#022977]/8 px-2 py-1 dark:border-white/10">
            <span className="size-1 rounded-full" style={{ background: `${AMBER}b3` }} />
            <span className="size-1 rounded-full" style={{ background: `${SKY}b3` }} />
            <span className="size-1 rounded-full" style={{ background: `${BLUE}b3` }} />
            <span className="ml-1 text-[7px] font-bold text-[#022977]/70 dark:text-white/70">Your site</span>
            <span className="ml-auto flex items-center gap-0.5 rounded-full bg-[#22c55e]/12 px-1 py-0.5 text-[6px] font-bold" style={{ color: GREEN }}>
              <motion.span
                className="size-1 rounded-full"
                style={{ background: GREEN }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              Live
            </span>
          </div>

          {/* Galería: dropzone (izq, donde cae) + 2 fotos existentes ── */}
          <div className="flex items-stretch gap-1.5 p-1.5">
            {/* Dropzone que se llena */}
            <div className="relative aspect-square w-10 shrink-0 overflow-hidden rounded-[5px]">
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 rounded-[5px] border border-dashed border-[#022977]/25 text-[#022977]/55 dark:border-white/25 dark:text-white/55"
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15V5M8 9l4-4 4 4" />
                  <path d="M5 19h14" />
                </svg>
                <span className="px-0.5 text-center text-[6px] font-bold leading-tight">Upload new photo</span>
              </motion.div>

              <motion.div
                className="absolute inset-0"
                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] }}
                transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeOut" }}
              >
                <PhotoThumb grad={NEW_GRAD} className="h-full w-full rounded-[5px]" />
              </motion.div>

              <motion.span
                className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full text-white shadow-[0_2px_6px_rgba(34,197,94,0.5)]"
                style={{ background: GREEN }}
                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
                transition={{ duration: DUR, times: [0, 0.48, 0.56, 0.8, 1], repeat: Infinity, ease: "easeOut" }}
              >
                <svg viewBox="0 0 20 20" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
              </motion.span>
            </div>

            {/* Fotos existentes (con chip de editar en la primera) */}
            <div className="relative flex-1">
              <PhotoThumb grad={GRADS[0]} className="h-full w-full rounded-[5px]" />
              <span className="absolute right-0.5 top-0.5 grid size-2.5 place-items-center rounded-full bg-white/90 shadow-sm dark:bg-white/80">
                <svg viewBox="0 0 24 24" className="size-1.5 text-[#022977]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20h4L18 10l-4-4L4 16z" />
                </svg>
              </span>
            </div>
            <PhotoThumb grad={GRADS[3]} className="flex-1 rounded-[5px]" />
          </div>

          {/* Barra de acción CMS: Publish */}
          <div className="flex items-center gap-1 border-t border-[#022977]/8 px-1.5 py-1 dark:border-white/10">
            <span className="h-1 w-1/3 rounded-full bg-[#022977]/12 dark:bg-white/15" />
            <span className="ml-auto rounded-full px-1.5 py-0.5 text-[6px] font-bold text-white" style={{ background: BLUE }}>
              Publish
            </span>
          </div>
        </div>

        {/* ── Cursor "YOU": entra desde la IZQUIERDA con la foto y la suelta ── */}
        <motion.div
          className="absolute"
          animate={{ left: ["3%", "44%", "44%", "44%", "3%"], top: ["42%", "23%", "23%", "23%", "42%"] }}
          transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Foto que carga (centrada en el punto animado; se "suelta" al llegar) */}
          <motion.div
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
            animate={{ opacity: [1, 1, 0, 0, 0], scale: [1, 1, 0.5, 0.5, 1] }}
            transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
          >
            <PhotoThumb grad={NEW_GRAD} className="size-7 rounded-[6px] shadow-[0_8px_18px_rgba(2,41,119,0.28)] ring-2 ring-white dark:ring-[#0b1220]" />
          </motion.div>

          {/* Cursor + etiqueta YOU (abajo-derecha del punto) */}
          <motion.div
            className="absolute left-1.5 top-1.5 flex items-center gap-0.5"
            animate={{ scale: [1, 1, 0.82, 1, 1] }}
            transition={{ duration: DUR, times: [0, 0.33, 0.43, 0.52, 1], repeat: Infinity, ease: "easeOut" }}
          >
            <svg viewBox="0 0 24 28" className="size-4 drop-shadow-md">
              <path d="M5 2 L5 22 L10 17 L13 25 L16 24 L13 16 L20 16 Z" fill="#fff" stroke="#022977" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <span className="rounded-full px-1.5 py-0.5 text-[8px] font-black text-white shadow-sm" style={{ background: VIOLET }}>
              YOU
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
