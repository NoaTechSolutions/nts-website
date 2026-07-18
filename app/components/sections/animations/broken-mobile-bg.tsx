"use client";

// ─────────────────────────────────────────────────────────────
// Fondo animado: "Rota en el celular" (freno #2) — reemplaza el video.
// Concepto (contraste): a la IZQUIERDA la web como DEBE verse (desktop, prolija,
// todo encaja, ✓). A la DERECHA la MISMA web en TABLET y MÓVIL, donde se ROMPE:
// layout de desktop metido a la fuerza → contenido desbordado de costado (scroll
// horizontal), menú cortado, título encimado con imagen rota, cards que se salen
// (✗). Comunica: "en desktop se ve bien… pero en celu/tablet es un desastre".
// HTML + motion (transform/opacity → GPU). Cero video. Escala al panel.
// ─────────────────────────────────────────────────────────────
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const NAVY = "#022977";
const SKY = "#05a5ff";
const BLUE = "#1e63e6";
const AMBER = "#ff9900";
const GREEN = "#22c55e";
const RED = "#ef4444";
const MUTED = "#dbe6f5";

const FEAT = [BLUE, SKY, AMBER, "#16c79a"];
const SCROLL_T = [0, 0.4, 0.55, 0.95, 1];

// La web COMO DEBE verse: todo encaja (navbar, hero lado a lado, 3 cards).
function GoodSite() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-2">
      <div className="flex items-center gap-1.5">
        <span className="grid size-3 shrink-0 place-items-center rounded-[3px] text-[6px] font-black text-white" style={{ background: `linear-gradient(135deg,${BLUE},${SKY})` }}>◆</span>
        <span className="text-[7px] font-extrabold" style={{ color: NAVY }}>Your Company</span>
        <span className="ml-auto flex gap-1.5">
          {["Home", "About", "Contact"].map((m) => (
            <span key={m} className="text-[6px] font-semibold" style={{ color: `${NAVY}99` }}>{m}</span>
          ))}
        </span>
      </div>
      <div className="flex flex-1 gap-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <span className="block h-2 w-4/5 rounded-full" style={{ background: NAVY }} />
          <span className="block h-2 w-3/5 rounded-full" style={{ background: AMBER }} />
          <span className="mt-1 inline-block w-fit rounded-full px-2 py-1 text-[6px] font-bold text-white" style={{ background: BLUE }}>Get started</span>
        </div>
        <div className="w-2/5 rounded-md" style={{ background: `linear-gradient(135deg,${SKY}44,#1e50ff44)` }} />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {FEAT.slice(0, 3).map((c, i) => (
          <div key={i} className="rounded-md border p-1" style={{ borderColor: MUTED }}>
            <span className="mb-1 block size-2.5 rounded" style={{ background: c }} />
            <span className="block h-1 w-full rounded-full" style={{ background: MUTED }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// La MISMA web ROTA: contenido de 175% que se desborda + scroll horizontal.
function BrokenSite() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 flex flex-col gap-1.5 p-1.5"
        style={{ width: "175%" }}
        animate={{ x: ["0%", "-40%", "-40%", "0%", "0%"] }}
        transition={{ duration: 5, times: SCROLL_T, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Navbar cortado */}
        <div className="flex items-center gap-1">
          <span className="grid size-3 shrink-0 place-items-center rounded-[3px] text-[6px] font-black text-white" style={{ background: `linear-gradient(135deg,${BLUE},${SKY})` }}>◆</span>
          <span className="text-[7px] font-extrabold" style={{ color: NAVY }}>Your Company</span>
          <span className="ml-auto flex gap-1.5">
            {["Home", "About", "Services", "Products", "Contact"].map((m) => (
              <span key={m} className="whitespace-nowrap text-[6px] font-semibold" style={{ color: `${NAVY}99` }}>{m}</span>
            ))}
          </span>
        </div>
        {/* Hero: título que se sale + imagen rota encimada */}
        <div className="relative flex gap-1">
          <div className="flex-1">
            <div className="text-[11px] font-extrabold leading-tight" style={{ color: NAVY, whiteSpace: "nowrap" }}>More clients for your business</div>
            <span className="mt-1 inline-block rounded-full px-2 py-1 text-[6px] font-bold text-white" style={{ background: BLUE }}>Get started now</span>
          </div>
          <div className="absolute -left-4 top-3 grid size-11 place-items-center rounded border-2 border-dashed bg-white" style={{ borderColor: RED }}>
            <svg viewBox="0 0 48 40" className="size-6" fill="none">
              <rect x="3" y="3" width="42" height="34" rx="3" stroke={RED} strokeWidth="2" />
              <path d="M8 30l9-10 6 6 5-6 8 10" stroke={`${NAVY}55`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 8l10 10M40 8L30 18" stroke={RED} strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        {/* Cards que se salen */}
        <div className="flex gap-1.5">
          {FEAT.map((c, i) => (
            <div key={i} className="w-16 shrink-0 rounded-md border p-1" style={{ borderColor: MUTED }}>
              <span className="mb-1 block size-3 rounded" style={{ background: c }} />
              <span className="block h-1 w-full rounded-full" style={{ background: MUTED }} />
            </div>
          ))}
        </div>
      </motion.div>
      {/* Barra de scroll horizontal (no entra) */}
      <div className="absolute bottom-1 left-1.5 right-1.5 h-1 rounded-full" style={{ background: MUTED }}>
        <motion.div
          className="h-full rounded-full"
          style={{ width: "45%", background: `${NAVY}88` }}
          animate={{ x: ["0%", "122%", "122%", "0%", "0%"] }}
          transition={{ duration: 5, times: SCROLL_T, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function Badge({ ok, label, className }: { ok: boolean; label: string; className: string }) {
  return (
    <span className={`absolute z-20 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white shadow ${className}`} style={{ background: ok ? GREEN : RED }}>
      <svg viewBox="0 0 20 20" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {ok ? <path d="M4 10.5l4 4 8-9" /> : <path d="M5 5l10 10M15 5L5 15" />}
      </svg>
      {label}
    </span>
  );
}

export function BrokenMobileBg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0, ...style }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#eef5ff,#dcecff)" }} />

      {/* ── IZQUIERDA: desktop, la web como debe verse (✓) ── */}
      <div className="absolute" style={{ left: "3%", top: "16%", width: "43%", aspectRatio: "16 / 10" }}>
        <div className="relative h-full w-full overflow-hidden rounded-xl border bg-white shadow-[0_16px_40px_rgba(2,41,119,0.18)]" style={{ borderColor: MUTED }}>
          <div className="flex items-center gap-1 border-b px-2 py-1" style={{ borderColor: MUTED }}>
            {["#FFB4A8", "#FFC66D", "#8FD8FF"].map((c) => (<span key={c} className="block size-1.5 rounded-full" style={{ background: c }} />))}
          </div>
          <div className="h-[calc(100%-1.25rem)]"><GoodSite /></div>
        </div>
        <Badge ok label="Desktop" className="-right-2 -top-2" />
      </div>

      {/* ── DERECHA: tablet + móvil, la misma web ROTA (✗) ── */}
      {/* Tablet (portrait) */}
      <div className="absolute" style={{ right: "20%", top: "11%", height: "76%", aspectRatio: "3 / 4" }}>
        <div className="relative h-full w-full overflow-hidden rounded-[10px] border-4 bg-white shadow-[0_18px_44px_rgba(2,41,119,0.24)]" style={{ borderColor: "#0b1220" }}>
          <BrokenSite />
        </div>
        <Badge ok={false} label="Tablet" className="-left-2 -top-2" />
      </div>

      {/* Teléfono (portrait) al frente, con temblor */}
      <motion.div
        className="absolute z-10"
        style={{ right: "3%", top: "20%", height: "66%", aspectRatio: "9 / 19" }}
        animate={{ rotate: [-0.7, 0.7, -0.7] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[14px] border-[5px] bg-white shadow-[0_20px_50px_rgba(2,41,119,0.3)]" style={{ borderColor: "#0b1220" }}>
          <div className="absolute left-1/2 top-0.5 z-20 h-1 w-8 -translate-x-1/2 rounded-full" style={{ background: "#0b1220" }} />
          <div className="h-full pt-2"><BrokenSite /></div>
        </div>
        <Badge ok={false} label="Mobile" className="-right-2 -top-1" />
      </motion.div>
    </div>
  );
}
