"use client";

// ─────────────────────────────────────────────────────────────
// Fondo animado: "Linda pero vacía" (freno #3) — reemplaza el video.
// Concepto: la web se ve LINDA pero no CONVIERTE. Visitantes (cursores) entran,
// miran y se van (rebotan) sin hacer nada — el botón "Contact us" late invitando
// pero nadie lo toca. A la derecha, el tablero: muchas VISITAS subiendo vs 0
// MENSAJES (inbox vacío) + 97% de rebote. Comunica: "entran, miran y se van sin
// dejarte un solo mensaje". HTML + motion (transform/opacity → GPU). Cero video.
// ─────────────────────────────────────────────────────────────
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const NAVY = "#022977";
const SKY = "#05a5ff";
const BLUE = "#1e63e6";
const AMBER = "#ff9900";
const ELECTRIC = "#1e50ff";
const RED = "#ef4444";
const MUTED = "#dbe6f5";

// Visitantes que entran (desde abajo), miran arriba y se van (rebote). x en % del
// panel, dentro de la zona del sitio (izquierda).
const VISITORS = [
  { x: 16, lx: 20, color: BLUE, delay: 0 },
  { x: 30, lx: 26, color: ELECTRIC, delay: 1.6 },
  { x: 40, lx: 44, color: SKY, delay: 3.2 },
  { x: 24, lx: 30, color: AMBER, delay: 4.8 },
];

const V_DUR = 6.4; // más lento
const V_TIMES = [0, 0.28, 0.6, 0.9, 1];

function Cursor({ color }: { color: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 28" className="size-4 drop-shadow-md">
        <path d="M5 2 L5 22 L10 17 L13 25 L16 24 L13 16 L20 16 Z" fill="#fff" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="absolute -right-1 -top-1 block size-2 rounded-full ring-2 ring-white" style={{ background: color }} />
    </div>
  );
}

export function NoConvierteBg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#eef5ff,#dcecff)", ...style }} />

      {/* ── El sitio (LINDO) — browser a la izquierda ── */}
      <div className="absolute" style={{ left: "4%", top: "13%", width: "54%", aspectRatio: "16 / 10" }}>
        <div className="relative h-full w-full overflow-hidden rounded-xl border bg-white shadow-[0_16px_40px_rgba(2,41,119,0.18)]" style={{ borderColor: MUTED }}>
          <div className="flex items-center gap-1 border-b px-2 py-1" style={{ borderColor: MUTED }}>
            {["#FFB4A8", "#FFC66D", "#8FD8FF"].map((c) => (<span key={c} className="block size-1.5 rounded-full" style={{ background: c }} />))}
          </div>
          <div className="flex h-[calc(100%-1.25rem)] flex-col gap-1.5 p-2.5">
            {/* navbar */}
            <div className="flex items-center gap-1.5">
              <span className="grid size-3.5 shrink-0 place-items-center rounded-[3px] text-[6px] font-black text-white" style={{ background: `linear-gradient(135deg,${BLUE},${SKY})` }}>◆</span>
              <span className="text-[8px] font-extrabold" style={{ color: NAVY }}>Your Company</span>
              <span className="ml-auto flex gap-2">{["Home", "About", "Contact"].map((m) => (<span key={m} className="text-[6px] font-semibold" style={{ color: `${NAVY}99` }}>{m}</span>))}</span>
            </div>
            {/* hero */}
            <div className="flex flex-1 gap-2.5">
              <div className="flex flex-1 flex-col justify-center gap-1.5">
                <div className="text-[13px] font-extrabold leading-tight" style={{ color: NAVY, fontFamily: "var(--font-display), sans-serif" }}>
                  More clients <span style={{ color: AMBER }}>for you</span>
                </div>
                <span className="block h-1.5 w-full rounded-full" style={{ background: MUTED }} />
                <span className="block h-1.5 w-4/5 rounded-full" style={{ background: MUTED }} />
                {/* CTA que late invitando (pero nadie lo toca) */}
                <motion.span
                  className="mt-1 inline-block w-fit rounded-full px-3 py-1.5 text-[8px] font-bold text-white shadow"
                  style={{ background: BLUE }}
                  animate={{ scale: [1, 1.07, 1], boxShadow: [`0 0 0 ${BLUE}00`, `0 0 10px ${BLUE}99`, `0 0 0 ${BLUE}00`] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  Contact us
                </motion.span>
              </div>
              <div className="w-2/5 rounded-lg" style={{ background: `linear-gradient(135deg,${SKY}44,${ELECTRIC}44)` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Visitantes = clientes potenciales: entran (Client), miran y se van
          (Missing client). Más lento para que se lea. ── */}
      {VISITORS.map((v, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            left: [`${v.x}%`, `${v.lx}%`, `${v.lx}%`, `${v.lx - 4}%`, `${v.x - 8}%`],
            top: ["106%", "46%", "46%", "64%", "106%"],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: V_DUR, times: V_TIMES, repeat: Infinity, delay: v.delay, ease: "easeInOut" }}
        >
          <div className="relative">
            <Cursor color={v.color} />
            {/* Etiqueta "Client" (al entrar/mirar) */}
            <motion.span
              className="absolute left-4 top-0 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white shadow"
              style={{ background: v.color }}
              animate={{ opacity: [0, 1, 1, 0, 0] }}
              transition={{ duration: V_DUR, times: [0, 0.3, 0.55, 0.64, 1], repeat: Infinity, delay: v.delay, ease: "easeInOut" }}
            >
              Client
            </motion.span>
            {/* Etiqueta "Missing client" (al irse) */}
            <motion.span
              className="absolute left-4 top-0 flex items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white shadow"
              style={{ background: RED }}
              animate={{ opacity: [0, 0, 0, 1, 0] }}
              transition={{ duration: V_DUR, times: [0, 0.58, 0.66, 0.88, 1], repeat: Infinity, delay: v.delay, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 20 20" className="size-2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5l10 10M15 5L5 15" /></svg>
              Missing client
            </motion.span>
          </div>
        </motion.div>
      ))}

      {/* ── Tablero: muchas visitas vs 0 mensajes ── */}
      <div className="absolute flex flex-col gap-2" style={{ right: "4%", top: "15%", width: "33%", maxWidth: "16rem" }}>
        {/* Visitas (arriba, alto) */}
        <div className="rounded-xl border bg-white/95 p-2.5 shadow-[0_10px_26px_rgba(2,41,119,0.14)]" style={{ borderColor: MUTED }}>
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="size-3.5" style={{ color: BLUE }} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.5" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            <span className="text-[7px] font-bold uppercase tracking-wide" style={{ color: `${NAVY}99` }}>Visitors</span>
            <span className="ml-auto flex items-center gap-0.5 text-[7px] font-bold" style={{ color: "#16a34a" }}>
              <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V3M3 6l3-3 3 3" /></svg>
              +18%
            </span>
          </div>
          <div className="mt-1 flex items-end justify-between">
            <span className="text-lg font-black leading-none" style={{ color: NAVY, fontFamily: "var(--font-display), sans-serif" }}>1,248</span>
            <div className="flex h-6 items-end gap-0.5">
              {[10, 16, 13, 20, 17, 24].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full"
                  style={{ height: h, background: `${BLUE}${i === 5 ? "" : "66"}`, transformOrigin: "bottom" }}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mensajes = 0 (el remate: linda pero vacía) */}
        <div className="relative rounded-xl border-2 border-dashed bg-white/95 p-2.5 shadow-[0_10px_26px_rgba(2,41,119,0.12)]" style={{ borderColor: `${RED}88` }}>
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="size-3.5" style={{ color: `${NAVY}88` }} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            <span className="text-[7px] font-bold uppercase tracking-wide" style={{ color: `${NAVY}99` }}>Messages</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <motion.span
              className="text-3xl font-black leading-none"
              style={{ color: RED, fontFamily: "var(--font-display), sans-serif" }}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              0
            </motion.span>
            <span className="text-[8px] font-semibold" style={{ color: `${NAVY}88` }}>new leads<br />all empty</span>
          </div>
        </div>

        {/* Rebote */}
        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-[0_6px_16px_rgba(2,41,119,0.12)]">
          <svg viewBox="0 0 24 24" className="size-3" style={{ color: RED }} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h5l2-8 4 16 2-8h5" /></svg>
          <span className="text-[8px] font-bold" style={{ color: NAVY }}>97%</span>
          <span className="text-[7px] font-semibold" style={{ color: `${NAVY}88` }}>bounce rate</span>
        </div>
      </div>
    </div>
  );
}
