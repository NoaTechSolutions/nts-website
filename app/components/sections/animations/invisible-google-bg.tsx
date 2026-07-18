"use client";

// ─────────────────────────────────────────────────────────────
// Fondo animado: "Invisible en Google" (freno #4) — reemplaza el video.
// Concepto mejorado (contraste): buscás "your business" → tus COMPETIDORES
// aparecen arriba y se llevan el click (cursor + "clicked"). La lista scrollea
// hacia abajo, pasa "Page 2", y aparece TU sitio ENTERRADO al fondo (#14), en
// rojo, con "0 clicks / nadie llega". Comunica: "tu competencia arriba, vos al
// fondo donde nadie mira". HTML + motion (transform/opacity → GPU). Cero video.
// ─────────────────────────────────────────────────────────────
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const NAVY = "#022977";
const SKY = "#05a5ff";
const BLUE = "#1e63e6";
const GREEN = "#22c55e";
const URLGREEN = "#3e9e7a";
const RED = "#ef4444";
const MUTED = "#dbe6f5";

const DUR = 8;
const T = [0, 0.14, 0.28, 0.62, 0.82, 0.94, 1];

// Competidores (arriba) + genéricos. El #1 se lleva el click.
const COMPETITORS = [
  { name: "Competitor A", fav: "#4285F4", win: true },
  { name: "Competitor B", fav: "#34A853" },
  { name: "Competitor C", fav: "#FBBC05" },
];
const GENERIC = ["#8FD8FF", "#B9C8F5", "#FFC66D", "#A8E6CF", "#7CCBFF"];

function Row({ rank, fav, children, dim }: { rank: number; fav: string; children: React.ReactNode; dim?: boolean }) {
  return (
    <div className="flex items-start gap-2" style={{ opacity: dim ? 0.5 : 1 }}>
      <span className="w-3 shrink-0 pt-1 text-right text-[7px] font-bold" style={{ color: `${NAVY}66` }}>{rank}</span>
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md text-[7px] font-black text-white" style={{ background: fav }}>◆</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function InvisibleGoogleBg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#eef5ff,#dcecff)", ...style }} />

      {/* Browser con la búsqueda */}
      <div className="absolute" style={{ left: "6%", right: "6%", top: "8%", bottom: "8%" }}>
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_20px_50px_rgba(2,41,119,0.2)]" style={{ borderColor: MUTED }}>
          {/* Titlebar + search */}
          <div className="shrink-0 border-b px-3 py-2" style={{ borderColor: MUTED }}>
            <div className="flex items-center gap-1.5">
              {["#FFB4A8", "#FFC66D", "#8FD8FF"].map((c) => (<span key={c} className="block size-2 rounded-full" style={{ background: c }} />))}
              <div className="ml-2 flex h-6 flex-1 items-center gap-2 rounded-full border px-2" style={{ borderColor: MUTED }}>
                <svg viewBox="0 0 24 24" className="size-3 shrink-0" style={{ color: `${NAVY}66` }} fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.5-4.5" strokeLinecap="round" /></svg>
                <span className="text-[9px] font-semibold" style={{ color: NAVY }}>your business</span>
                <span className="ml-auto flex gap-0.5">
                  <span className="block size-1.5 rounded-full" style={{ background: "#4285F4" }} />
                  <span className="block size-1.5 rounded-full" style={{ background: "#EA4335" }} />
                  <span className="block size-1.5 rounded-full" style={{ background: "#FBBC05" }} />
                </span>
              </div>
            </div>
            <div className="mt-1 pl-6 text-[7px] font-medium" style={{ color: `${NAVY}66` }}>About 2,480,000 results</div>
          </div>

          {/* Viewport de resultados (scroll) */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 flex w-full flex-col gap-2.5 p-3"
              animate={{ y: ["0%", "0%", "0%", "-60%", "-60%", "0%", "0%"] }}
              transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Competidores arriba */}
              {COMPETITORS.map((c, i) => (
                <Row key={c.name} rank={i + 1} fav={c.fav}>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold" style={{ color: BLUE }}>{c.name}</span>
                    {c.win && (
                      <motion.span
                        className="flex items-center gap-0.5 rounded-full px-1 py-px text-[6px] font-bold text-white"
                        style={{ background: GREEN }}
                        animate={{ opacity: [0, 0, 1, 1, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 1, 1, 0.6] }}
                        transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeOut" }}
                      >
                        <svg viewBox="0 0 20 20" className="size-2" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                        clicked
                      </motion.span>
                    )}
                  </div>
                  <div className="text-[7px] font-medium" style={{ color: URLGREEN }}>{c.name.toLowerCase().replace(" ", "")}.com</div>
                  <div className="mt-1 space-y-1">
                    <span className="block h-1 w-full rounded-full" style={{ background: MUTED }} />
                    <span className="block h-1 w-4/5 rounded-full" style={{ background: MUTED }} />
                  </div>
                </Row>
              ))}

              {/* Genéricos (dim) */}
              {GENERIC.map((fav, i) => (
                <Row key={i} rank={i + 4} fav={fav} dim>
                  <span className="block h-2 w-3/5 rounded-full" style={{ background: `${BLUE}66` }} />
                  <span className="mt-1 block h-1 w-1/3 rounded-full" style={{ background: URLGREEN, opacity: 0.5 }} />
                  <div className="mt-1 space-y-1">
                    <span className="block h-1 w-full rounded-full" style={{ background: MUTED }} />
                    <span className="block h-1 w-3/4 rounded-full" style={{ background: MUTED }} />
                  </div>
                </Row>
              ))}

              {/* Divider Page 2 */}
              <div className="flex items-center gap-2 py-1">
                <span className="h-px flex-1" style={{ background: MUTED }} />
                <span className="text-[7px] font-bold" style={{ color: `${NAVY}55` }}>— Page 2 —</span>
                <span className="h-px flex-1" style={{ background: MUTED }} />
              </div>

              {/* TU sitio, enterrado y en rojo */}
              <div className="relative rounded-xl border-2 p-2" style={{ borderColor: RED, background: `${RED}0d` }}>
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  style={{ boxShadow: `0 0 0 2px ${RED}` }}
                  animate={{ opacity: [0, 0, 0, 0.8, 0.4, 0, 0], scale: [1, 1, 1, 1.03, 1, 1, 1] }}
                  transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeOut" }}
                />
                <div className="flex items-start gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-md text-[8px] font-black text-white" style={{ background: RED }}>#14</span>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md text-[7px] font-black text-white" style={{ background: `linear-gradient(135deg,${BLUE},${SKY})` }}>◆</span>
                  <div className="flex-1">
                    <div className="text-[11px] font-extrabold" style={{ color: RED, fontFamily: "var(--font-display), sans-serif" }}>Your Business</div>
                    <div className="text-[7px] font-medium" style={{ color: `${NAVY}88` }}>yourbusiness.com</div>
                  </div>
                  <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white" style={{ background: RED }}>
                    0 clicks
                  </span>
                </div>
                <div className="mt-1 pl-8 text-[7px] font-semibold" style={{ color: `${RED}cc` }}>nobody scrolls this far ↓</div>
              </div>

              <div className="py-1 text-center text-[7px] font-semibold" style={{ color: `${NAVY}55` }}>— End of results —</div>
            </motion.div>

            {/* Scrollbar */}
            <div className="absolute bottom-1 right-1 top-1 w-1 rounded-full" style={{ background: MUTED }}>
              <motion.div
                className="w-full rounded-full"
                style={{ height: "38%", background: `${NAVY}66` }}
                animate={{ y: ["0%", "0%", "0%", "165%", "165%", "0%", "0%"] }}
                transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Cursor que clickea al competidor #1 (arriba) y luego se va */}
            <motion.div
              className="absolute"
              style={{ left: "22%", top: "8%" }}
              animate={{ opacity: [0, 1, 1, 0, 0, 0, 0], scale: [1, 1, 0.88, 1, 1, 1, 1] }}
              transition={{ duration: DUR, times: T, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute -left-3 -top-3 block size-8 rounded-full" style={{ boxShadow: `0 0 0 2px ${GREEN}` }} />
              <svg viewBox="0 0 24 28" className="size-4 drop-shadow-md">
                <path d="M5 2 L5 22 L10 17 L13 25 L16 24 L13 16 L20 16 Z" fill="#fff" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
