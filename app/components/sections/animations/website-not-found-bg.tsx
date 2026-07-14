"use client";

// ─────────────────────────────────────────────────────────────
// Port de WebsiteNotFoundV3 (Remotion) → componente standalone.
//
// Concepto original intacto: buscás "your business", scrolleás toda
// la lista de resultados y tu sitio aparece ENTERRADO al fondo (#13),
// resaltado en rojo. Loop: scroll down → hold (reveal) → scroll up.
//
// Port: el único movimiento real era un `scrollY` (translateY de una
// lista estática) + reveal de opacity + un anillo + cursor. Todo eso
// es transform/opacity → se expresa nativo con @keyframes (GPU).
// Cero video, cero rAF. SVG viewBox + slice → escala a cualquier card.
//
// Nota de fidelidad: para uso como FONDO condensé 13 → 12 filas
// genéricas (la densidad lee idéntico); la geometría 1920×1080 se
// re-mapeó a un viewBox 1200×800 (ratio de card 3:2).
// ─────────────────────────────────────────────────────────────

import type { CSSProperties } from "react";

const C = {
  primary: "#05A5FF",
  linkBlue: "#2C7BE5",
  secondary: "#022977",
  secondarySoft: "#6F8FC7",
  surface: "#FFFFFF",
  found: "#3FC98A",
  urlGreen: "#3E9E7A",
  muted: "#E3ECF5",
  mutedDark: "#D4E1EE",
  grey: "#C8D4E2",
  greyText: "#9DB0CC",
  border: "#C9DFF4",
  lost: "#FF786B",
  lostDeep: "#E5503C",
};

// Layout
const VIEW = { x: 180, y: 186, w: 840, h: 524 };
const PITCH = 88;
const N = 12; // filas genéricas
const YOURS_Y = 20 + N * PITCH + 44 + 24; // enterrado al fondo, tras "Page 2"
const LIST_H = YOURS_Y + 150;
const SCROLL = LIST_H - VIEW.h; // recorrido del scroll

const GENERIC = [
  { fav: "#7CCBFF", tw: 380, found: true },
  { fav: "#FFD38A", tw: 320, found: true },
  { fav: "#A8E6CF", tw: 360, found: true },
  { fav: "#B9C8F5", tw: 300, found: false },
  { fav: "#8FD8FF", tw: 340, found: false },
  { fav: "#FFC66D", tw: 270, found: false },
  { fav: "#7CCBFF", tw: 360, found: false },
  { fav: "#A8E6CF", tw: 310, found: false },
  { fav: "#B9C8F5", tw: 345, found: false },
  { fav: "#8FD8FF", tw: 295, found: false },
  { fav: "#FFC66D", tw: 360, found: false },
  { fav: "#7CCBFF", tw: 315, found: false },
];

const thumbH = VIEW.h * (VIEW.h / LIST_H);

const CSS = `
@keyframes nfScroll {
  0%   { transform: translateY(0); }
  16%  { transform: translateY(0); }
  60%  { transform: translateY(-${SCROLL}px); }
  84%  { transform: translateY(-${SCROLL}px); }
  100% { transform: translateY(0); }
}
@keyframes nfThumb {
  0%   { transform: translateY(0); }
  16%  { transform: translateY(0); }
  60%  { transform: translateY(${VIEW.h - thumbH - 16}px); }
  84%  { transform: translateY(${VIEW.h - thumbH - 16}px); }
  100% { transform: translateY(0); }
}
@keyframes nfReveal {
  0%, 52%   { opacity: 0; }
  64%       { opacity: 1; }
  82%       { opacity: 1; }
  90%, 100% { opacity: 0; }
}
@keyframes nfRing {
  0%, 56%   { transform: scale(0.2); opacity: 0; }
  60%       { opacity: 0.6; }
  74%       { transform: scale(1); opacity: 0; }
  100%      { transform: scale(1); opacity: 0; }
}
@keyframes nfRipple {
  0%   { transform: scale(0.2); opacity: 0; }
  6%   { opacity: 0.34; }
  16%  { transform: scale(1); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}
.nf-scroll { animation: nfScroll 8s cubic-bezier(.645,.045,.355,1) infinite; will-change: transform; }
.nf-thumb  { animation: nfThumb  8s cubic-bezier(.645,.045,.355,1) infinite; will-change: transform; }
.nf-reveal { animation: nfReveal 8s ease-in-out infinite; }
.nf-ring   { animation: nfRing   8s ease-out infinite; transform-origin: center; }
.nf-ripple { animation: nfRipple 8s ease-out infinite; transform-origin: center; }

@media (prefers-reduced-motion: reduce) {
  .nf-scroll { transform: translateY(-${SCROLL}px); animation: none; }
  .nf-thumb  { transform: translateY(${VIEW.h - thumbH - 16}px); animation: none; }
  .nf-reveal { opacity: 1; animation: none; }
  .nf-ring, .nf-ripple { display: none; }
}
`;

function GenericRow({ y, num, fav, tw, found }: { y: number; num: number; fav: string; tw: number; found: boolean }) {
  return (
    <g transform={`translate(${VIEW.x + 60} ${y})`}>
      <text x="-30" y="18" textAnchor="end" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill={C.greyText}>{num}</text>
      <rect x="0" y="4" width="40" height="40" rx="11" fill={fav} />
      {found && <rect x="28" y="0" width="12" height="12" rx="6" fill={C.found} stroke="#FFF" strokeWidth="2" />}
      <rect x="56" y="6" width={tw} height="18" rx="6" fill={C.linkBlue} opacity="0.85" />
      <rect x="56" y="32" width="190" height="11" rx="5" fill={C.urlGreen} opacity="0.5" />
      <rect x="0" y="56" width="740" height="12" rx="6" fill={C.muted} />
      <rect x="0" y="76" width="560" height="12" rx="6" fill={C.muted} />
    </g>
  );
}

export function WebsiteNotFoundBg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Resultados de búsqueda: tu sitio aparece enterrado al fondo"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    >
      <style>{CSS}</style>

      <defs>
        <linearGradient id="nfBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3F8FF" />
          <stop offset="50%" stopColor="#EAF4FF" />
          <stop offset="100%" stopColor="#F8FBFF" />
        </linearGradient>
        <clipPath id="nfViewport">
          <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="1200" height="800" fill="url(#nfBg)" />
      <circle cx="250" cy="220" r="250" fill="rgba(143,216,255,0.26)" />
      <circle cx="980" cy="620" r="230" fill="rgba(255,198,109,0.15)" />

      {/* Browser */}
      <rect x="180" y="90" width="840" height="620" rx="24" fill="rgba(255,255,255,0.95)" stroke={C.border} strokeWidth="1.5" />
      {/* Header */}
      <rect x="180" y="90" width="840" height="96" rx="24" fill="#FBFDFF" />
      <rect x="180" y="150" width="840" height="36" fill="#FBFDFF" />
      {["#FFB4A8", "#FFC66D", "#8FD8FF"].map((c, i) => (
        <circle key={i} cx={210 + i * 24} cy={118} r={7} fill={c} />
      ))}
      {/* Search bar */}
      <rect x="216" y="132" width="700" height="42" rx="21" fill="#FFF" stroke={C.border} strokeWidth="1" />
      <circle cx="244" cy="153" r="7" fill="none" stroke={C.secondarySoft} strokeWidth="2" />
      <line x1="250" y1="159" x2="256" y2="165" stroke={C.secondarySoft} strokeWidth="2" strokeLinecap="round" />
      <text x="268" y="159" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="500" fill={C.secondary}>your business</text>
      <rect x="932" y="132" width="66" height="42" rx="21" fill={C.primary} />

      {/* Viewport (scrolleable) */}
      <g clipPath="url(#nfViewport)">
        <g className="nf-scroll">
          <g transform={`translate(0 ${VIEW.y})`}>
            {GENERIC.map((g, i) => (
              <GenericRow key={i} y={20 + i * PITCH} num={i + 1} fav={g.fav} tw={g.tw} found={g.found} />
            ))}

            {/* Divider "Page 2" */}
            <line x1={VIEW.x + 40} y1={20 + N * PITCH + 20} x2={VIEW.x + VIEW.w - 40} y2={20 + N * PITCH + 20} stroke={C.grey} strokeWidth="1" strokeDasharray="6 6" />
            <text x="600" y={20 + N * PITCH + 6} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill={C.greyText}>— Page 2 —</text>

            {/* Tu sitio, enterrado y resaltado */}
            <g className="nf-reveal">
              <circle className="nf-ring" cx={VIEW.x + 420} cy={YOURS_Y + 56} r="70" fill="none" stroke={C.lost} strokeWidth="2" />
            </g>
            <rect x={VIEW.x + 40} y={YOURS_Y} width="760" height="112" rx="14" fill="rgba(255,215,210,0.18)" stroke={C.lost} strokeWidth="2" />
            <g className="nf-reveal">
              <rect x={VIEW.x + 6} y={YOURS_Y + 14} width="46" height="26" rx="8" fill={C.lost} />
              <text x={VIEW.x + 29} y={YOURS_Y + 32} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill="#FFF">#{N + 1}</text>
            </g>
            <rect x={VIEW.x + 56} y={YOURS_Y + 20} width="44" height="44" rx="12" fill={C.grey} />
            <text x={VIEW.x + 116} y={YOURS_Y + 42} fontFamily="'Space Grotesk', system-ui, sans-serif" fontSize="23" fontWeight="700" fill={C.lostDeep}>Your Business</text>
            <text x={VIEW.x + 116} y={YOURS_Y + 74} fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="500" fill={C.grey}>yourbusiness.com</text>

            {/* Fin de resultados */}
            <text x="600" y={YOURS_Y + 150} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill={C.greyText} opacity="0.6">— End of results —</text>
          </g>
        </g>
      </g>

      {/* Scrollbar */}
      <rect x={VIEW.x + VIEW.w + 4} y={VIEW.y + 8} width="5" height={VIEW.h - 16} rx="3" fill="rgba(201,223,244,0.4)" />
      <rect className="nf-thumb" x={VIEW.x + VIEW.w + 4} y={VIEW.y + 8} width="5" height={thumbH} rx="3" fill={C.secondarySoft} opacity="0.6" />

      {/* Click ripple (loop-safe) */}
      <circle className="nf-ripple" cx={VIEW.x + 200} cy={VIEW.y + 40} r="40" fill="none" stroke={C.primary} strokeWidth="2" />

      {/* Cursor */}
      <g transform={`translate(${VIEW.x + 260} ${VIEW.y + 300})`}>
        <path d="M6 3 L6 33 L14 26 L19 39 L24 37 L19 24 L29 24 Z" fill={C.surface} stroke={C.secondary} strokeWidth="2" strokeLinejoin="round" filter="drop-shadow(0 6px 9px rgba(2,41,119,0.20))" />
      </g>
    </svg>
  );
}
