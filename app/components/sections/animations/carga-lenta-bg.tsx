"use client";

// ─────────────────────────────────────────────────────────────
// Fondo animado: "Carga lenta" (freno #1) — reemplaza el video de la tortuga.
// Concepto: la web NO termina de cargar. Spinner girando lento en la URL y al
// centro, barra de progreso que se ARRASTRA y se traba a ~38%, reloj que sigue,
// skeletons que nunca resuelven (con shimmer) y un caracol cruzando abajo.
// Comunica al toque: "tarda demasiado → tu cliente se va".
// HTML + motion (transform/opacity → GPU). Cero video. Escala al panel.
// ─────────────────────────────────────────────────────────────
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const NAVY = "#022977";
const SKY = "#05a5ff";
const BLUE = "#1e63e6";
const AMBER = "#ff9900";
const MUTED = "#dbe6f5";

export function CargaLentaBg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0, ...style }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#eef5ff,#dcecff)" }} />

      {/* Ventana de navegador */}
      <div className="absolute" style={{ left: "6%", right: "6%", top: "9%", bottom: "9%" }}>
        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_20px_50px_rgba(2,41,119,0.18)]"
          style={{ borderColor: MUTED }}
        >
          {/* Titlebar con URL + spinner (cargando) */}
          <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2" style={{ borderColor: MUTED }}>
            <span className="flex gap-1.5">
              {["#FFB4A8", "#FFC66D", "#8FD8FF"].map((c) => (
                <span key={c} className="block size-2.5 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <div className="ml-2 flex h-6 flex-1 items-center gap-2 rounded-full border px-2" style={{ borderColor: MUTED }}>
              <motion.span
                className="block size-3 rounded-full border-2"
                style={{ borderColor: MUTED, borderTopColor: SKY, borderRightColor: SKY }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
              />
              <span className="block h-2 rounded-full" style={{ width: "42%", background: MUTED }} />
            </div>
          </div>

          {/* Body: skeletons que nunca resuelven + shimmer */}
          <div className="relative flex flex-1 flex-col gap-3 overflow-hidden p-4">
            <div className="flex items-center gap-3">
              <span className="block h-4 w-24 rounded" style={{ background: MUTED }} />
              <span className="ml-auto flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="block h-3 w-12 rounded" style={{ background: MUTED }} />
                ))}
              </span>
            </div>
            <div className="mt-2 flex flex-1 gap-4">
              <div className="flex flex-1 flex-col gap-3">
                <span className="block h-6 w-3/4 rounded" style={{ background: MUTED }} />
                <span className="block h-6 w-1/2 rounded" style={{ background: MUTED }} />
                <span className="block h-3 w-full rounded" style={{ background: MUTED }} />
                <span className="block h-3 w-5/6 rounded" style={{ background: MUTED }} />
              </div>
              <div className="w-2/5 rounded-xl" style={{ background: MUTED }} />
            </div>
            {/* Shimmer que barre (cargando eternamente) */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(100deg, transparent 32%, rgba(255,255,255,0.65) 50%, transparent 68%)" }}
              animate={{ x: ["-60%", "160%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Overlay central: spinner lento + Loading + progreso trabado + reloj */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/85 px-6 py-5 shadow-[0_10px_30px_rgba(2,41,119,0.14)] backdrop-blur-sm">
              <svg viewBox="0 0 50 50" className="size-10">
                <circle cx="25" cy="25" r="20" fill="none" stroke={MUTED} strokeWidth="5" />
                <motion.circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke={SKY}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="80 200"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>
              <span className="text-sm font-bold" style={{ color: NAVY, fontFamily: "var(--font-display), sans-serif" }}>
                Loading…
              </span>
              <div className="h-2 w-40 overflow-hidden rounded-full" style={{ background: MUTED }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${SKY}, ${BLUE})` }}
                  animate={{ width: ["4%", "30%", "38%", "38%"] }}
                  transition={{ duration: 6, times: [0, 0.55, 0.72, 1], repeat: Infinity, ease: "easeOut" }}
                />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: AMBER }}>
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                still loading…
              </span>
            </div>
          </div>

          {/* Caracol cruzando lento abajo (guiño a la lentitud) */}
          <motion.div
            className="absolute bottom-2"
            animate={{ x: ["-10%", "120%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ left: 0 }}
          >
            <svg viewBox="0 0 48 30" className="h-7 w-11" fill="none">
              <path d="M4 26 h20" stroke={NAVY} strokeWidth="3.5" strokeLinecap="round" />
              <path d="M24 26 q4 0 6 -4" stroke={NAVY} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="31" cy="17" r="3" fill={NAVY} />
              <path d="M32 14 l2 -6 M34 15 l4 -5" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
              <circle cx="34" cy="7.5" r="1.4" fill={AMBER} />
              <circle cx="38" cy="9" r="1.4" fill={AMBER} />
              <circle cx="16" cy="15" r="9.5" fill="#fff" stroke={SKY} strokeWidth="3" />
              <path d="M16 15 a4.5 4.5 0 1 1 -0.01 0" fill="none" stroke={SKY} strokeWidth="2.5" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
