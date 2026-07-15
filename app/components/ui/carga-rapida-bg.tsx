"use client";

// Fondo animado "Carga ultra-rápida" para su card del bento (Qué incluye).
// Concepto: medidor de performance (tipo Lighthouse/PageSpeed) que se LLENA de
// golpe a ~99 + rayo + un "0.1s", y CHIPS de assets (Photo 1, Video 1) que pasan
// VOLANDO con estelas de velocidad → los recursos cargan a toda velocidad.
// Reconocible: score de PageSpeed = "web rápida". Va en la esquina sup-der para
// no tapar el texto. Vector/HTML + motion (transform/opacity/strokeDashoffset →
// GPU). Weightless: cero video. Todos los breakpoints.
import { motion } from "motion/react";

const SKY = "#05a5ff";
const BLUE = "#1e63e6";
const VIOLET = "#7c5cff";

const R = 33;
const CIRC = 2 * Math.PI * R;

type AssetType = "photo" | "video" | "anim" | "font";

// Chips de assets que pasan volando (con estela).
const ASSETS: { label: string; icon: AssetType; top: string; delay: number; color: string }[] = [
  { label: "Photo", icon: "photo", top: "26%", delay: 0, color: SKY },
  { label: "Video", icon: "video", top: "46%", delay: 0.6, color: VIOLET },
  { label: "Animation", icon: "anim", top: "34%", delay: 1.2, color: BLUE },
  { label: "Font", icon: "font", top: "54%", delay: 1.8, color: "#ff9900" },
];

function AssetIcon({ type }: { type: AssetType }) {
  if (type === "video") {
    return (
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === "anim") {
    // Sparkle (efecto / animación).
    return (
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor">
        <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
        <circle cx="18.5" cy="17.5" r="1.6" />
      </svg>
    );
  }
  if (type === "font") {
    return (
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor">
        <text x="12" y="18" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Georgia, serif">A</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="8.5" cy="9" r="1.4" />
      <path d="M4 18l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CargaRapidaBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Toda la escena hace zoom al hover (igual que el card destacado). */}
      <div className="absolute inset-0 origin-center transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
      {/* Líneas de velocidad finas (whoosh). */}
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute h-0.75 rounded-full"
          style={{
            top: `${14 + i * 40}%`,
            width: "30%",
            background: `linear-gradient(90deg, transparent, ${SKY})`,
          }}
          animate={{ x: ["-40%", "280%"], opacity: [0, 0.85, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.5, ease: "easeIn" }}
        />
      ))}

      {/* Chips de assets volando con estela. */}
      {ASSETS.map((a) => (
        <div key={a.label} className="absolute left-0 w-full" style={{ top: a.top }}>
          <motion.div
            className="absolute flex items-center gap-1 whitespace-nowrap"
            animate={{ x: ["-30%", "240%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, delay: a.delay, ease: "easeIn", times: [0, 0.15, 0.8, 1] }}
          >
            {/* Estela */}
            <span
              className="h-0.75 w-6 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${a.color})` }}
            />
            {/* Chip */}
            <span
              className="flex items-center gap-1 rounded-md border border-[#022977]/10 bg-white/95 px-1.5 py-1 text-[8px] font-semibold text-[#022977] shadow-[0_4px_10px_rgba(2,41,119,0.15)] dark:border-white/10 dark:bg-white/15 dark:text-white"
              style={{ color: a.color }}
            >
              <AssetIcon type={a.icon} />
              <span className="text-[#022977] dark:text-white">{a.label}</span>
            </span>
          </motion.div>
        </div>
      ))}

      {/* Medidor de performance (esquina sup-der). */}
      <div className="absolute right-5 top-5 h-18 w-18">
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <defs>
            <linearGradient id="crArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={SKY} />
              <stop offset="100%" stopColor={BLUE} />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r={R} fill="none" stroke="#022977" strokeOpacity="0.1" strokeWidth="6" className="dark:hidden" />
          <circle cx="40" cy="40" r={R} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="6" className="hidden dark:block" />
          <motion.circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke="url(#crArc)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            transform="rotate(-90 40 40)"
            animate={{ strokeDashoffset: [CIRC, CIRC * 0.05, CIRC * 0.05, CIRC] }}
            transition={{ duration: 3.2, times: [0, 0.26, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill={SKY}>
            <path d="M13 2 L4 14 h6 l-1 8 9-12 h-6 z" />
          </svg>
        </div>
      </div>

      {/* Métrica "0.1s" bajo el medidor. */}
      <motion.div
        className="absolute right-[1.6rem] top-[5.6rem] text-[11px] font-extrabold tracking-tight text-[#022977] dark:text-white"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
        animate={{ opacity: [0.4, 1, 1, 0.4] }}
        transition={{ duration: 3.2, times: [0, 0.26, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
      >
        0.1s
      </motion.div>
      </div>
    </div>
  );
}
