"use client";

// ─────────────────────────────────────────────────────────────
// Fondo animado: "Diseño a medida / web hecha a medida".
//
// Concepto: bloques modulares de UI (nav, hero, imagen, CTA, cards)
// que se MIDEN y ENCAJAN con precisión en un artboard custom.
// Aparecen guías de medición acotadas (dashed + ticks + tag "A MEDIDA")
// mientras el layout está armado → la idea de "hecho a tu medida".
//
// Peso: 0 KB de video. 100% SVG + CSS @keyframes (GPU-composited:
// solo transform/opacity). Escala a cualquier card vía viewBox + slice.
// Sin rAF, sin ResizeObserver, sin dependencias de Remotion.
//
// Loop seamless: el estado 0% == 100% (bloques dispersos, --o:1),
// así que cualquier animation-delay negativo (stagger) loopea perfecto.
// Respeta prefers-reduced-motion: muestra el layout ya armado, quieto.
// ─────────────────────────────────────────────────────────────

import type { CSSProperties } from "react";

// Paleta consistente con las 4 animaciones de la sección "Problema".
const C = {
  primary: "#05A5FF",
  primaryDark: "#078ED8",
  primarySoft: "#8FD8FF",
  secondary: "#022977",
  secondarySoft: "#6F8FC7",
  accent: "#FF9900",
  accentSoft: "#FFC66D",
  surface: "#FFFFFF",
  muted: "#E3ECF5",
  mutedDark: "#D4E1EE",
  border: "#C9DFF4",
};

// Bloques que vuelan a su slot. dx/dy = offset de dispersión (estado --o:1).
// d = animation-delay (negativo => arranca más avanzado => llega antes).
type Block = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  fill: string;
  dx: number;
  dy: number;
  d: string;
  stroke?: string;
};

const BLOCKS: Block[] = [
  // Topbar
  { x: 250, y: 190, w: 700, h: 56, r: 14, fill: C.surface, stroke: C.border, dx: 0, dy: -140, d: "-1.30s" },
  // Título / copy del hero (líneas)
  { x: 250, y: 282, w: 330, h: 150, r: 16, fill: C.muted, dx: -170, dy: 0, d: "-1.15s" },
  // Imagen del hero (accent gradient)
  { x: 612, y: 282, w: 338, h: 198, r: 18, fill: "url(#damHero)", dx: 175, dy: 0, d: "-1.00s" },
  // CTA
  { x: 250, y: 452, w: 178, h: 50, r: 25, fill: C.primary, dx: 0, dy: 110, d: "-0.85s" },
  // Cards inferiores
  { x: 250, y: 520, w: 210, h: 96, r: 16, fill: C.surface, stroke: C.border, dx: -130, dy: 120, d: "-0.70s" },
  { x: 485, y: 520, w: 210, h: 96, r: 16, fill: C.surface, stroke: C.border, dx: 0, dy: 150, d: "-0.55s" },
  { x: 720, y: 520, w: 230, h: 96, r: 16, fill: C.surface, stroke: C.border, dx: 135, dy: 120, d: "-0.40s" },
];

const CSS = `
@property --damO {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}
@keyframes damPlace {
  0%   { --damO: 1; }
  20%  { --damO: 0; }
  80%  { --damO: 0; }
  100% { --damO: 1; }
}
@keyframes damGuides {
  0%, 20%   { opacity: 0; }
  32%       { opacity: 0.95; }
  70%       { opacity: 0.95; }
  82%, 100% { opacity: 0; }
}
@keyframes damSweep {
  0%   { transform: translateX(-520px); opacity: 0; }
  22%  { opacity: 0.55; }
  46%  { transform: translateX(1240px); opacity: 0; }
  100% { transform: translateX(1240px); opacity: 0; }
}
.dam-block {
  transform: translate(calc(var(--dx) * var(--damO) * 1px), calc(var(--dy) * var(--damO) * 1px));
  opacity: calc(1 - var(--damO));
  animation: damPlace 7s cubic-bezier(.22,.61,.36,1) infinite;
  animation-delay: var(--d);
  will-change: transform, opacity;
}
.dam-guides { animation: damGuides 7s ease-in-out infinite; }
.dam-sweep  { animation: damSweep 7s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .dam-block { --damO: 0; opacity: 1; transform: none; animation: none; }
  .dam-guides { opacity: 0.95; animation: none; }
  .dam-sweep { display: none; }
}
`;

export function DisenoAMedidaBg({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Bloques de UI que se miden y encajan en un layout a medida"
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    >
      <style>{CSS}</style>

      <defs>
        <linearGradient id="damBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3F8FF" />
          <stop offset="50%" stopColor="#EAF4FF" />
          <stop offset="100%" stopColor="#F8FBFF" />
        </linearGradient>
        <linearGradient id="damHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.primarySoft} />
          <stop offset="100%" stopColor={C.primary} />
        </linearGradient>
        <linearGradient id="damSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Fondo + halos suaves (consistente con la sección) */}
      <rect x="0" y="0" width="1200" height="800" fill="url(#damBg)" />
      <circle cx="250" cy="200" r="260" fill="rgba(143,216,255,0.28)" />
      <circle cx="1000" cy="640" r="240" fill="rgba(255,198,109,0.16)" />

      {/* Artboard / lienzo custom */}
      <rect
        x="210" y="150" width="780" height="500" rx="28"
        fill="rgba(255,255,255,0.55)"
        stroke={C.border}
        strokeWidth="1.5"
      />

      {/* Bloques que se miden y encajan */}
      {BLOCKS.map((b, i) => (
        <g
          key={i}
          className="dam-block"
          style={{ ["--dx" as string]: b.dx, ["--dy" as string]: b.dy, ["--d" as string]: b.d }}
        >
          <rect
            x={b.x} y={b.y} width={b.w} height={b.h} rx={b.r}
            fill={b.fill}
            stroke={b.stroke ?? "none"}
            strokeWidth={b.stroke ? 1 : 0}
          />
        </g>
      ))}

      {/* Detalles estáticos dentro de los slots (viajan con nada: quietos,
          aparecen al hacer fade-in del bloque de abajo vía la opacity global
          NO — van sueltos y siempre visibles pero sutiles). Los mantenemos
          mínimos para no competir con el concepto. */}
      <g opacity="0.9">
        {/* logo mark en la topbar */}
        <rect x="270" y="206" width="26" height="26" rx="7" fill={C.accent} />
        {/* nav pill */}
        <rect x="812" y="204" width="118" height="28" rx="14" fill={C.primary} opacity="0.9" />
      </g>

      {/* ── Guías de medición (aparecen con el layout armado) ── */}
      <g className="dam-guides" stroke={C.accent} strokeWidth="1.6" fill="none">
        {/* Medida horizontal bajo la imagen del hero */}
        <line x1="612" y1="502" x2="950" y2="502" strokeDasharray="6 6" />
        <line x1="612" y1="494" x2="612" y2="510" />
        <line x1="950" y1="494" x2="950" y2="510" />
        {/* Medida vertical a la derecha del artboard */}
        <line x1="968" y1="282" x2="968" y2="480" strokeDasharray="6 6" />
        <line x1="960" y1="282" x2="976" y2="282" />
        <line x1="960" y1="480" x2="976" y2="480" />
      </g>

      {/* Tag "A MEDIDA" sobre la guía */}
      <g className="dam-guides">
        <rect x="716" y="516" width="130" height="30" rx="15" fill={C.accent} />
        <text
          x="781" y="536"
          textAnchor="middle"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontSize="15"
          fontWeight="700"
          fill="#FFFFFF"
          letterSpacing="1.5"
        >
          A MEDIDA
        </text>
      </g>

      {/* Sheen diagonal que barre una vez por loop (brillo de "pulido") */}
      <g clipPath="url(#damClip)">
        <clipPath id="damClip">
          <rect x="210" y="150" width="780" height="500" rx="28" />
        </clipPath>
        <rect className="dam-sweep" x="-260" y="120" width="200" height="560" fill="url(#damSheen)" transform="skewX(-16)" />
      </g>
    </svg>
  );
}
