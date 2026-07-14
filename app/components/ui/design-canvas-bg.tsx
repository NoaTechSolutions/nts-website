"use client";

// Fondo animado "Diseño a medida" para la card destacada del bento (Qué incluye).
// DESKTOP (lg): mockup de landing COMPLETA (navbar, hero+Photo, features, trust,
// testimonio, footer) con zoom suave al hover + AL LADO herramientas de arte
// (paleta, pincel, lápiz) y digitales (pen tool vectorial, cursor).
// MOBILE (<lg): versión COMPACTA aparte (mini-ventana, sin tools laterales) para
// que entre bien en la card angosta de 1 columna, sin tocar el diseño desktop.
// Un difuminado radial LEVE detrás del título asegura que el texto no se pierda.
// Vector/HTML puro + motion (transform/opacity → GPU). Weightless: cero video.
import { motion } from "motion/react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const VIOLET = "#7c5cff";
const AMBER = "#ff9900";

// Difuminado LEVE sobre TODO el card, un poco más fuerte en la parte inferior
// (donde va el texto del card) → el título/subtítulo siempre se leen, sin tapar
// el mockup de arriba. Theme-aware (claro/oscuro).
function TitleScrim() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 28%, rgba(255,255,255,0.12) 58%, transparent 82%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(to top, rgba(6,12,26,0.82) 0%, rgba(6,12,26,0.4) 28%, rgba(6,12,26,0.12) 58%, transparent 82%)",
        }}
      />
    </>
  );
}

export function DesignCanvasBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ══════════ DESKTOP (lg+) ══════════ */}
      <div className="absolute inset-0 hidden lg:block">
        {/* ── Herramientas AL LADO (izquierda): arte + digitales ── */}
        {/* Paleta de artista */}
        <motion.div
          className="absolute left-[18%] top-[19%] w-16"
          animate={{ y: [0, 8, 0], rotate: [-6, -2, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 56" className="h-full w-full drop-shadow-md">
            <path
              d="M32 3 C51 3 61 15 61 27 C61 37 53 41 47 39 C43 38 41 43 43 47 C45 51 41 53 34 53 C15 53 3 41 3 27 C3 13 13 3 32 3 Z"
              fill="#F7FBFF"
              stroke="#C9DFF4"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="20" r="4.5" fill={BLUE} />
            <circle cx="34" cy="15" r="4.5" fill={SKY} />
            <circle cx="47" cy="21" r="4.5" fill={VIOLET} />
            <circle cx="23" cy="35" r="4.5" fill={AMBER} />
            <circle cx="15" cy="41" r="5.5" fill="#fff" stroke="#C9DFF4" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Pincel */}
        <motion.div
          className="absolute left-[26%] top-[42%] w-14"
          animate={{ y: [0, -7, 0], rotate: [38, 44, 38] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-md">
            <rect x="29" y="4" width="6" height="30" rx="3" fill="#7E97BF" />
            <rect x="26.5" y="33" width="11" height="8" rx="2" fill="#C9DFF4" />
            <path d="M26.5 41 h11 l-2.2 13 q-3.3 4.5 -6.6 0 z" fill={AMBER} />
          </svg>
        </motion.div>

        {/* Lápiz */}
        <motion.div
          className="absolute left-[13%] top-[61%] w-12"
          animate={{ y: [0, 7, 0], rotate: [-40, -34, -40] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-md">
            <rect x="26" y="8" width="12" height="6" rx="2" fill="#FFB4A8" />
            <rect x="26" y="14" width="12" height="30" fill={AMBER} />
            <rect x="26" y="14" width="4" height="30" fill="#E58900" opacity="0.5" />
            <path d="M26 44 h12 l-6 13 z" fill="#F0E6D2" />
            <path d="M29 51 h6 l-3 6 z" fill="#33260F" />
          </svg>
        </motion.div>

        {/* DIGITAL 1 · Sliders / ajustes (reconocible: "editar / personalizar") */}
        <motion.div
          className="absolute left-[28%] top-[9%] w-11 rounded-lg border border-[#022977]/10 bg-white/95 p-1.5 shadow-[0_8px_18px_rgba(2,41,119,0.15)] dark:border-white/10 dark:bg-white/15"
          animate={{ y: [0, -6, 0], rotate: [-4, 2, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 44 34" className="w-full">
            <g stroke="#6F8FC7" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="8" x2="38" y2="8" />
              <line x1="6" y1="17" x2="38" y2="17" />
              <line x1="6" y1="26" x2="38" y2="26" />
            </g>
            <circle cx="28" cy="8" r="4" fill={BLUE} />
            <circle cx="14" cy="17" r="4" fill={SKY} />
            <circle cx="32" cy="26" r="4" fill={AMBER} />
          </svg>
        </motion.div>

        {/* DIGITAL 2 · Cursor (apunta a la página) */}
        <motion.div
          className="absolute left-[47%] top-[47%] w-7"
          animate={{ y: [0, 5, 0], x: [0, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 34 40" className="h-full w-full">
            <path
              d="M6 3 L6 33 L14 26 L19 39 L24 37 L19 24 L29 24 Z"
              fill="#fff"
              stroke="#022977"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── Página (browser) — zoom + enfoque al hover ── */}
        <div className="absolute right-4 top-5 w-[60%] transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <motion.div
            className="overflow-hidden rounded-2xl border border-[#022977]/10 bg-white/90 shadow-[0_22px_50px_rgba(2,41,119,0.16)] blur-[0.5px] backdrop-blur-[1px] transition-[filter] duration-500 group-hover:blur-0 dark:border-white/10 dark:bg-white/[0.07]"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Navbar */}
            <div className="flex items-center gap-2 border-b border-[#022977]/8 px-3 py-2 dark:border-white/10">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff9900]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#05a5ff]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#1e63e6]/70" />
              </div>
              <div className="ml-1 flex items-center gap-1.5">
                <span
                  className="grid h-4 w-4 place-items-center rounded-[5px] text-[6px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, ${SKY})` }}
                >
                  ◆
                </span>
                <span className="text-[9px] font-bold tracking-tight text-[#022977] dark:text-white">Your Company</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="h-1.5 w-5 rounded-full bg-[#022977]/10 dark:bg-white/15" />
                <span className="h-1.5 w-5 rounded-full bg-[#022977]/10 dark:bg-white/15" />
                <span className="rounded-full px-2 py-[3px] text-[7px] font-bold text-white" style={{ background: BLUE }}>
                  Menu
                </span>
              </div>
            </div>

            {/* Hero */}
            <div className="flex gap-3 px-3 py-3">
              <div className="flex-1">
                <div
                  className="text-[13px] font-extrabold leading-tight tracking-tight text-[#022977] dark:text-white"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  More clients <span style={{ color: AMBER }}>for your business</span>
                  <motion.span
                    className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[1px] rounded-full align-middle"
                    style={{ background: BLUE }}
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-[#022977]/10 dark:bg-white/12" />
                  <div className="h-1.5 w-4/5 rounded-full bg-[#022977]/10 dark:bg-white/12" />
                </div>
                <motion.span
                  className="mt-3 inline-block rounded-full px-3 py-1.5 text-[8px] font-bold text-white shadow-sm"
                  style={{ background: BLUE }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Get started
                </motion.span>
              </div>
              <div
                className="grid w-[42%] place-items-center rounded-lg border border-[#022977]/8 dark:border-white/10"
                style={{ background: `linear-gradient(135deg, ${SKY}22, ${VIOLET}22)` }}
              >
                <div className="flex flex-col items-center gap-1 py-4 text-[#022977]/45 dark:text-white/45">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="8.5" cy="9" r="1.5" />
                    <path d="M4 18l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[7px] font-semibold uppercase tracking-wider">Photo</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 px-3">
              {[BLUE, SKY, AMBER].map((c, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg border border-[#022977]/8 p-2 dark:border-white/10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  <span className="mb-1.5 block h-3 w-3 rounded-md" style={{ background: c, opacity: 0.9 }} />
                  <span className="mb-1 block h-1 w-full rounded-full bg-[#022977]/10 dark:bg-white/12" />
                  <span className="block h-1 w-2/3 rounded-full bg-[#022977]/10 dark:bg-white/12" />
                </motion.div>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-3 flex items-center justify-center gap-2 border-y border-[#022977]/6 bg-[#022977]/[0.02] py-2 dark:border-white/8 dark:bg-white/[0.03]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-2 w-9 rounded-full bg-[#022977]/12 dark:bg-white/15" />
              ))}
            </div>

            {/* Testimonio */}
            <div className="flex items-center gap-2 px-3 py-3">
              <span
                className="h-8 w-8 shrink-0 rounded-full"
                style={{ background: `linear-gradient(135deg, ${VIOLET}, ${SKY})` }}
              />
              <div className="flex-1">
                <div className="mb-1 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-2 w-2" fill={AMBER}>
                      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
                    </svg>
                  ))}
                </div>
                <div className="h-1 w-full rounded-full bg-[#022977]/10 dark:bg-white/12" />
                <div className="mt-1 h-1 w-3/4 rounded-full bg-[#022977]/10 dark:bg-white/12" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 border-t border-[#022977]/6 px-3 py-2 dark:border-white/8">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: BLUE }} />
              <span className="h-1 w-14 rounded-full bg-[#022977]/10 dark:bg-white/12" />
              <span className="ml-auto h-1 w-8 rounded-full bg-[#022977]/10 dark:bg-white/12" />
            </div>
          </motion.div>
        </div>

        <TitleScrim />
      </div>

      {/* ══════════ MOBILE (<lg) · versión compacta ══════════ */}
      <div className="absolute inset-0 block lg:hidden">
        <motion.div
          className="absolute right-3 top-4 w-[52%] overflow-hidden rounded-xl border border-[#022977]/10 bg-white/90 shadow-[0_14px_30px_rgba(2,41,119,0.14)] dark:border-white/10 dark:bg-white/[0.07]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Navbar */}
          <div className="flex items-center gap-1.5 border-b border-[#022977]/8 px-2.5 py-1.5 dark:border-white/10">
            <span
              className="grid h-3.5 w-3.5 place-items-center rounded-[4px] text-[5px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${SKY})` }}
            >
              ◆
            </span>
            <span className="text-[7px] font-bold tracking-tight text-[#022977] dark:text-white">Your Company</span>
            <span className="ml-auto h-1 w-4 rounded-full bg-[#022977]/10 dark:bg-white/15" />
          </div>
          {/* Hero + Photo */}
          <div className="flex gap-2 px-2.5 py-2.5">
            <div className="flex-1">
              <div
                className="text-[9px] font-extrabold leading-tight tracking-tight text-[#022977] dark:text-white"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                More clients <span style={{ color: AMBER }}>for you</span>
              </div>
              <div className="mt-1.5 space-y-1">
                <div className="h-1 w-full rounded-full bg-[#022977]/10 dark:bg-white/12" />
                <div className="h-1 w-3/4 rounded-full bg-[#022977]/10 dark:bg-white/12" />
              </div>
              <span className="mt-2 inline-block rounded-full px-2 py-1 text-[6px] font-bold text-white" style={{ background: BLUE }}>
                Get started
              </span>
            </div>
            <div
              className="grid w-[40%] place-items-center rounded-md"
              style={{ background: `linear-gradient(135deg, ${SKY}22, ${VIOLET}22)` }}
            >
              <span className="py-2 text-[5px] font-semibold uppercase tracking-wider text-[#022977]/45 dark:text-white/45">
                Photo
              </span>
            </div>
          </div>
        </motion.div>

        {/* Un solo tool de arte (paleta) para dar la intención, sin saturar. */}
        <motion.div
          className="absolute left-[6%] top-[46%] w-10"
          animate={{ y: [0, 6, 0], rotate: [-6, -2, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 56" className="h-full w-full drop-shadow-md">
            <path
              d="M32 3 C51 3 61 15 61 27 C61 37 53 41 47 39 C43 38 41 43 43 47 C45 51 41 53 34 53 C15 53 3 41 3 27 C3 13 13 3 32 3 Z"
              fill="#F7FBFF"
              stroke="#C9DFF4"
              strokeWidth="1.5"
            />
            <circle cx="20" cy="20" r="4.5" fill={BLUE} />
            <circle cx="34" cy="15" r="4.5" fill={SKY} />
            <circle cx="47" cy="21" r="4.5" fill={VIOLET} />
            <circle cx="23" cy="35" r="4.5" fill={AMBER} />
          </svg>
        </motion.div>

        <TitleScrim />
      </div>
    </div>
  );
}
