"use client";

// Fondo animado "SEO técnico" para su card del bento (Qué incluye) — card ANCHA
// (col-span-2). UNA sola escena hub-and-spoke: en el CENTRO tu web ("Your
// Company") como una tarjeta-navegador; de ahí SALEN líneas (con pulsos que
// viajan) hacia TODO lo que el SEO te consigue → el resultado #1 en Google
// (panel SERP + medalla de rank, izq), el tráfico que sube (gráfico, der) y tu
// presencia en todos los buscadores/redes (Google, Bing, Yahoo, Facebook,
// Instagram, X, arriba). Toda la escena hace ZOOM al hover (igual que el card
// destacado). Vector/HTML + motion (transform/opacity/strokeDashoffset → GPU).
import { motion } from "motion/react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const AMBER = "#ff9900";
const GREEN = "#22c55e"; // URL de resultado + tendencia positiva (señal "SEO")

// Marcas de plataformas (colores oficiales, glifos simplificados/reconocibles).
const FB = "#1877f2";
const XDARK = "#0f1419";
const BING = "#0d7c72";
const YAHOO = "#6001d2";

// Coordenadas (en % del card) — el mismo sistema para las líneas SVG y los nodos
// HTML, así todo "encaja" en una sola composición. Hub más abajo para que no se
// pierda arriba.
const HUB = { x: 50, y: 45 };

type Node = { x: number; y: number };
const PLATFORMS: { key: string; x: number; y: number; bg: string; node: React.ReactNode }[] = [
  { key: "google", x: 27, y: 24, bg: "#ffffff", node: <GoogleG /> },
  { key: "bing", x: 36, y: 17, bg: "#ffffff", node: <span className="text-[12px] font-black italic" style={{ color: BING }}>b</span> },
  { key: "yahoo", x: 45, y: 14, bg: "#ffffff", node: <span className="text-[9px] font-black" style={{ color: YAHOO }}>Y!</span> },
  { key: "facebook", x: 55, y: 14, bg: FB, node: <span className="text-[13px] font-black text-white">f</span> },
  { key: "instagram", x: 64, y: 17, bg: "linear-gradient(135deg,#feda75,#d62976 45%,#962fbf 80%,#4f5bd5)", node: <InstagramGlyph /> },
  { key: "x", x: 73, y: 24, bg: XDARK, node: <span className="text-[11px] font-black text-white">𝕏</span> },
];

// Endpoints hacia los laterales: gráfico de RANK ahora a la IZQUIERDA (borde der)
// y página de Google (SERP) ahora a la DERECHA (borde izq).
const CHART_NODE: Node = { x: 19, y: 34 };
const SERP_NODE: Node = { x: 66, y: 40 };
const SPOKES: Node[] = [...PLATFORMS.map(({ x, y }) => ({ x, y })), SERP_NODE, CHART_NODE];

// ── Glifos de plataformas ──────────────────────────────────────────────────
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="size-3.5">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#fff" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" stroke="none" />
    </svg>
  );
}

// ── Resultado de búsqueda. El #1 va destacado (badge + glow), los otros dim. ──
function ResultRow({ rank, win = false }: { rank: number; win?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${win ? "bg-[#1e63e6]/8 dark:bg-white/8" : ""}`}>
      <motion.span
        className="grid size-3.5 shrink-0 place-items-center rounded-[5px] text-[8px] font-extrabold text-white"
        style={{ background: win ? `linear-gradient(135deg, ${BLUE}, ${SKY})` : "transparent" }}
        animate={win ? { boxShadow: [`0 0 0 ${BLUE}00`, `0 0 10px ${BLUE}aa`, `0 0 0 ${BLUE}00`] } : undefined}
        transition={win ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        {win ? <span>1</span> : <span className="text-[8px] font-bold text-[#022977]/40 dark:text-white/40">{rank}</span>}
      </motion.span>
      <div className={`flex flex-1 flex-col gap-1 ${win ? "" : "opacity-55"}`}>
        <span className="block h-1 rounded-full" style={{ width: win ? "46%" : "36%", background: `${GREEN}cc` }} />
        <span className="block rounded-full" style={{ height: win ? "7px" : "5px", width: win ? "84%" : "64%", background: win ? BLUE : "#022977" }} />
      </div>
    </div>
  );
}

export function SeoBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Toda la escena hace zoom al hover (igual que el card destacado). */}
      <div className="absolute inset-0 origin-center transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {/* ── Red: líneas del hub a cada nodo + pulsos que viajan (una sola capa) ── */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {SPOKES.map((n, i) => (
            <g key={i}>
              <line x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} stroke={SKY} strokeOpacity="0.16" strokeWidth="0.5" />
              <motion.circle
                r="1.1"
                fill={SKY}
                animate={{ cx: [HUB.x, n.x], cy: [HUB.y, n.y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.28, ease: "easeOut" }}
              />
            </g>
          ))}
        </svg>

        {/* ── Página de Google (SERP, derecha) — el resultado #1 + MEDALLA ── */}
        <motion.div
          className="absolute w-[31%] max-w-52 rounded-xl border border-[#022977]/10 bg-white/92 shadow-[0_16px_36px_rgba(2,41,119,0.14)] backdrop-blur-[1px] dark:border-white/10 dark:bg-white/[0.07]"
          style={{ right: "3%", top: "12%" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Medalla de rank #1 (sobresale, bien visual) */}
          <div className="absolute -left-2.5 -top-2.5 z-10">
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 0 2px ${AMBER}` }}
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="relative grid size-7 place-items-center rounded-full text-white shadow-[0_6px_16px_rgba(30,99,230,0.45)] ring-2 ring-white dark:ring-[#0b1220]"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${SKY})` }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[11px] font-black leading-none">#1</span>
            </motion.span>
            {/* Chevron de subida */}
            <motion.svg
              viewBox="0 0 12 12"
              className="absolute -right-1.5 top-1 size-3"
              fill="none"
              stroke={GREEN}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, -2, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M6 9V3M3 6l3-3 3 3" />
            </motion.svg>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex items-center gap-1.5 border-b border-[#022977]/8 px-2.5 py-1.5 pl-6 dark:border-white/10">
            <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-[#022977]/50 dark:text-white/50" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M20 20l-4.5-4.5" strokeLinecap="round" />
            </svg>
            <span className="block h-1.5 w-[44%] rounded-full bg-[#022977]/15 dark:bg-white/20" />
            <span className="ml-auto rounded-full px-2 py-0.75 text-[7px] font-bold text-white" style={{ background: BLUE }}>
              Google
            </span>
          </div>
          {/* Resultados */}
          <div className="flex flex-col gap-0.5 p-1.5">
            <ResultRow rank={1} win />
            <ResultRow rank={2} />
            <ResultRow rank={3} />
          </div>
        </motion.div>

        {/* ── Plataformas (arriba) — presencia en buscadores y redes ── */}
        {PLATFORMS.map((p, i) => (
          <div key={p.key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <motion.span
              className="absolute inset-0 rounded-[7px]"
              style={{ boxShadow: `0 0 0 1.5px ${SKY}` }}
              animate={{ scale: [1, 1.8], opacity: [0.55, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.28, ease: "easeOut" }}
            />
            <motion.span
              className="grid size-5 place-items-center rounded-[7px] shadow-[0_5px_12px_rgba(2,41,119,0.18)] ring-1 ring-black/5 dark:ring-white/10"
              style={{ background: p.bg }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {p.node}
            </motion.span>
          </div>
        ))}

        {/* ── HUB central: tu web ("Your Company") — de acá sale todo ── */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}>
          <motion.span
            className="absolute inset-0 rounded-xl"
            style={{ boxShadow: `0 0 0 2px ${BLUE}` }}
            animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="relative w-34 max-w-[42vw] overflow-hidden rounded-xl border border-[#022977]/10 bg-white/95 shadow-[0_14px_34px_rgba(30,99,230,0.22)] dark:border-white/10 dark:bg-white/9"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1 border-b border-[#022977]/8 px-2 py-1 dark:border-white/10">
              <span className="size-1 rounded-full" style={{ background: `${AMBER}b3` }} />
              <span className="size-1 rounded-full" style={{ background: `${SKY}b3` }} />
              <span className="size-1 rounded-full" style={{ background: `${BLUE}b3` }} />
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <span
                className="grid size-4 shrink-0 place-items-center rounded-[5px] text-[8px] font-black text-white"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${SKY})` }}
              >
                ◆
              </span>
              <span className="text-[10px] font-extrabold tracking-tight text-[#022977] dark:text-white" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                Your Company
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Gráfico de rank/tráfico subiendo (izquierda) ── */}
        <div className="absolute" style={{ left: "4%", top: "20%", width: "16%", maxWidth: "7rem" }}>
          <svg viewBox="0 0 100 64" className="w-full drop-shadow-sm">
            <defs>
              <linearGradient id="seoTrend" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor={SKY} />
                <stop offset="100%" stopColor={GREEN} />
              </linearGradient>
            </defs>
            {[16, 26, 22, 38, 52].map((h, i) => (
              <motion.rect
                key={i}
                x={6 + i * 15}
                width="9"
                rx="2"
                y={60 - h}
                height={h}
                fill={i === 4 ? BLUE : `${BLUE}40`}
                style={{ transformOrigin: `${10.5 + i * 15}px 60px` }}
                animate={{ scaleY: [0.2, 1, 1, 0.2] }}
                transition={{ duration: 4, times: [0, 0.25, 0.85, 1], repeat: Infinity, ease: "easeOut", delay: i * 0.18 }}
              />
            ))}
            <motion.polyline
              points="6,52 27,44 48,46 69,30 90,10"
              fill="none"
              stroke="url(#seoTrend)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="120"
              animate={{ strokeDashoffset: [120, 0, 0, 120] }}
              transition={{ duration: 4, times: [0, 0.4, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M84 8 L92 8 L92 16"
              fill="none"
              stroke={GREEN}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.42, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
