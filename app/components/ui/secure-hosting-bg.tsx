"use client";

// Fondo animado "Segura y con hosting" para su card del bento (Qué incluye).
// Concepto: VOS Y LO TUYO, PROTEGIDOS. Un domo grande con 4 nodos etiquetados
// adentro — You, Clients, Info, Web — y una BARRERA que los rodea. Los ATAQUES
// (virus, ladrón, bug, calavera, phishing, bomba) llegan desde afuera, chocan
// contra la barrera y REBOTAN hacia afuera (bloqueados). Entendible de un
// vistazo, llamativo por los impactos. Va arriba para no tapar el texto.
// Vector/HTML + motion (transform/opacity → GPU). Zoom al hover. Cero video.
import { motion } from "motion/react";

const BLUE = "#1e63e6";
const SKY = "#05a5ff";
const VIOLET = "#7c5cff";
const GREEN = "#22c55e";
const RED = "#ef4444";
const DARK = "#1f2937";
const ORANGE = "#f97316";

// ── Nodos protegidos (adentro del domo) ─────────────────────────────────────
const NODES = [
  {
    x: 31,
    y: 31,
    label: "You",
    grad: `linear-gradient(135deg, ${BLUE}, ${SKY})`,
    glyph: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
      </>
    ),
  },
  {
    x: 69,
    y: 31,
    label: "Clients",
    grad: `linear-gradient(135deg, ${VIOLET}, ${BLUE})`,
    glyph: (
      <>
        <circle cx="8" cy="9" r="3" />
        <circle cx="16" cy="9" r="3" />
        <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6zM12 20c.4-2.6 2.5-5 5.5-5 3 0 4.6 2.4 4.5 5z" />
      </>
    ),
  },
  {
    x: 31,
    y: 57,
    label: "Info",
    grad: `linear-gradient(135deg, ${SKY}, ${VIOLET})`,
    glyph: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  {
    x: 69,
    y: 57,
    label: "Web",
    grad: `linear-gradient(135deg, #16c79a, ${SKY})`,
    glyph: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
];

// ── Iconos de ataque ────────────────────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  virus: (
    <svg viewBox="0 0 24 24" className="size-full">
      <g stroke={RED} strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="1.5" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22.5" y2="12" />
        <line x1="4.5" y1="4.5" x2="7.7" y2="7.7" />
        <line x1="16.3" y1="16.3" x2="19.5" y2="19.5" />
        <line x1="19.5" y1="4.5" x2="16.3" y2="7.7" />
        <line x1="7.7" y1="16.3" x2="4.5" y2="19.5" />
      </g>
      <circle cx="12" cy="12" r="6" fill={RED} />
      <circle cx="10.5" cy="10.5" r="1.3" fill="#fff" />
      <circle cx="14" cy="13.5" r="1.1" fill="#fff" />
    </svg>
  ),
  mask: (
    <svg viewBox="0 0 24 24" className="size-full" fill={DARK}>
      <path d="M2 9c3-2 6-2.5 10-2.5s7 .5 10 2.5c0 4.2-2.2 6.5-5.2 6.5-2 0-3.3-1.2-4.8-1.2s-2.8 1.2-4.8 1.2C4.2 15.5 2 13.2 2 9z" />
      <circle cx="8" cy="10.5" r="1.7" fill="#fff" />
      <circle cx="16" cy="10.5" r="1.7" fill="#fff" />
    </svg>
  ),
  bug: (
    <svg viewBox="0 0 24 24" className="size-full">
      <g stroke={RED} strokeWidth="2" strokeLinecap="round">
        <path d="M9 5l-1.5-2M15 5l1.5-2" />
        <path d="M6 11H2.5M6 15H2.5M18 11h3.5M18 15h3.5M6 18l-2.5 2.5M18 18l2.5 2.5" />
      </g>
      <ellipse cx="12" cy="13" rx="5" ry="6.5" fill={RED} />
      <path d="M9 11h6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  skull: (
    <svg viewBox="0 0 24 24" className="size-full" fill="#7f1d1d">
      <path d="M12 2C7 2 3.5 5.6 3.5 10.5c0 2.8 1.4 4.8 3 6v2.6a1 1 0 0 0 1 1H8v-1.6h1.6V22H11v-1.6h2V22h1.4v-1.5H16V22h.5a1 1 0 0 0 1-1v-2.6c1.6-1.1 3-3.1 3-6C20.5 5.6 17 2 12 2z" />
      <circle cx="8.6" cy="11" r="2.1" fill="#fff" />
      <circle cx="15.4" cy="11" r="2.1" fill="#fff" />
      <path d="M11 15h2l-1 2.2z" fill="#fff" />
    </svg>
  ),
  hook: (
    <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke={ORANGE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3v9a5.5 5.5 0 0 1-11 0" />
      <path d="M4 12l-1.6-1.6M4 12l1.6-1.6" />
      <circle cx="15" cy="3" r="1.4" fill={ORANGE} stroke="none" />
    </svg>
  ),
  bomb: (
    <svg viewBox="0 0 24 24" className="size-full">
      <circle cx="11" cy="15" r="7" fill={DARK} />
      <path d="M15.5 8.5l2.2-2.2" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17.7 6.3c.8-1.6 2.6-1.6 2.6-3.3" fill="none" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20.5" cy="2.5" r="1.5" fill={ORANGE} />
      <circle cx="8.5" cy="12.5" r="1.8" fill="#fff" fillOpacity="0.5" />
    </svg>
  ),
};

// Ataques: {start, impacto (sobre el anillo), rebote afuera, icono, delay}.
// Coords en % del domo. Llegan → chocan → rebotan.
const ATTACKS = [
  { sx: -90, sy: 50, ix: 4, iy: 50, bx: -45, by: 50, icon: "virus", delay: 0 },
  { sx: -57, sy: -40, ix: 15, iy: 20, bx: -23, by: -11, icon: "mask", delay: 0.75 },
  { sx: 14, sy: -85, ix: 38, iy: 6, bx: 25, by: -42, icon: "bug", delay: 1.5 },
  { sx: 86, sy: -85, ix: 62, iy: 6, bx: 75, by: -42, icon: "skull", delay: 2.25 },
  { sx: 157, sy: -40, ix: 85, iy: 20, bx: 123, by: -11, icon: "hook", delay: 3.0 },
  { sx: 190, sy: 50, ix: 96, iy: 50, bx: 145, by: 50, icon: "bomb", delay: 3.75 },
];
const ATK_DUR = 4.6;

// ── Radar de monitoreo (flanquea el domo, sin tocar la animación central):
// vigilancia activa 24/7 → haz que barre + blips detectados + anillos + label.
// Comunica al cliente "te estamos cuidando en tiempo real, listos y preparados".
function Radar({ style, label, delay, dim = "size-10" }: { style: React.CSSProperties; label: string; delay: number; dim?: string }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-0.5"
      style={style}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className={`relative ${dim} overflow-hidden rounded-full border-2 shadow-[0_4px_12px_rgba(2,41,119,0.25)]`}
        style={{ borderColor: `${GREEN}aa`, background: "radial-gradient(circle, rgba(6,16,32,0.92), rgba(6,16,32,0.78))" }}
      >
        {/* Anillos concéntricos + crosshair */}
        <span className="absolute inset-[24%] rounded-full border" style={{ borderColor: `${GREEN}40` }} />
        <span className="absolute inset-[46%] rounded-full border" style={{ borderColor: `${GREEN}55` }} />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: `${GREEN}33` }} />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: `${GREEN}33` }} />
        {/* Haz que barre (radar sweep) */}
        <motion.div
          className="absolute inset-0"
          style={{ background: `conic-gradient(from 0deg, ${GREEN}cc, ${GREEN}22 55deg, transparent 90deg)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay }}
        />
        {/* Blips detectados (aparecen al pasar el haz) */}
        <motion.span
          className="absolute size-1 rounded-full"
          style={{ left: "62%", top: "32%", background: GREEN, boxShadow: `0 0 6px ${GREEN}` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, times: [0, 0.08, 0.55], repeat: Infinity, ease: "easeOut", delay }}
        />
        <motion.span
          className="absolute size-1 rounded-full"
          style={{ left: "34%", top: "64%", background: GREEN, boxShadow: `0 0 6px ${GREEN}` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, times: [0.45, 0.55, 0.95], repeat: Infinity, ease: "easeOut", delay }}
        />
        {/* Centro */}
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: GREEN, boxShadow: `0 0 5px ${GREEN}` }} />
      </div>
      <span className="flex items-center gap-0.5 text-[6px] font-bold text-[#022977] dark:text-white">
        <motion.span
          className="size-1 rounded-full"
          style={{ background: GREEN }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {label}
      </span>
    </motion.div>
  );
}

// ── Candado (izquierda): se BLOQUEA en loop (aro que baja + flash verde + check
// + anillos de protección). Refleja seguridad de un vistazo: "cerrado/protegido".
function LockModule({ style, label, delay }: { style: React.CSSProperties; label: string; delay: number }) {
  const CYCLE = 3;
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-0.5"
      style={style}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="relative grid size-11 place-items-center rounded-full border-2 bg-white/95 shadow-[0_4px_12px_rgba(2,41,119,0.22)] dark:bg-white/8"
        style={{ borderColor: `${BLUE}66` }}
      >
        {/* Anillos de protección que se expanden */}
        {[0, 1].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: SKY }}
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: delay + k * 1.2, ease: "easeOut" }}
          />
        ))}

        {/* Flash verde al cerrar (bloqueado) */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 12px ${GREEN}` }}
          animate={{ opacity: [0, 0, 0.9, 0, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.4, 0.47, 0.62, 1], repeat: Infinity, ease: "easeOut", delay }}
        />

        {/* Candado */}
        <svg viewBox="0 0 40 44" className="relative size-6">
          <motion.g
            animate={{ y: [-7, -7, 0, 0, -7] }}
            transition={{ duration: CYCLE, times: [0, 0.28, 0.44, 0.86, 1], repeat: Infinity, ease: "easeInOut", delay }}
          >
            <path d="M12 22 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
          </motion.g>
          <rect x="7" y="21" width="26" height="19" rx="4" fill={BLUE} />
          <circle cx="20" cy="28" r="2.6" fill="#fff" />
          <rect x="18.7" y="29.6" width="2.6" height="6" rx="1.3" fill="#fff" />
        </svg>

        {/* Check verde al cerrar */}
        <motion.span
          className="absolute -bottom-1 -right-1 grid size-3.5 place-items-center rounded-full text-white shadow-[0_2px_6px_rgba(34,197,94,0.5)] ring-2 ring-white dark:ring-[#0b1220]"
          style={{ background: GREEN }}
          animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.42, 0.5, 0.85, 1], repeat: Infinity, ease: "easeOut", delay }}
        >
          <svg viewBox="0 0 20 20" className="size-2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </motion.span>
      </div>
      <span className="flex items-center gap-0.5 text-[6px] font-bold text-[#022977] dark:text-white">
        <motion.span
          className="size-1 rounded-full"
          style={{ background: GREEN }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {label}
      </span>
    </motion.div>
  );
}

export function SecureHostingBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Toda la escena hace zoom al hover (igual que el card destacado). */}
      <div className="absolute inset-0 origin-center transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {/* ── Domo de protección (centro, grande) ── */}
        <div className="absolute size-24 -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "34%" }}>
          {/* Glow pulsante */}
          <motion.span
            className="absolute -inset-4 rounded-full blur-xl"
            style={{ background: `radial-gradient(circle, ${BLUE}4d, transparent 70%)` }}
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.92, 1.06, 0.92] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Anillo punteado girando (defensa activa) */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke={BLUE} strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="4 6" strokeLinecap="round" />
          </motion.svg>

          {/* Anillo sólido (la barrera) con pulso */}
          <motion.span
            className="absolute inset-[6%] rounded-full border-2"
            style={{ borderColor: SKY, background: `radial-gradient(circle, transparent 55%, ${SKY}14)` }}
            animate={{ boxShadow: [`0 0 6px ${SKY}55, inset 0 0 8px ${SKY}33`, `0 0 16px ${SKY}aa, inset 0 0 12px ${SKY}66`, `0 0 6px ${SKY}55, inset 0 0 8px ${SKY}33`] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Nodos protegidos */}
          {NODES.map((n) => (
            <div key={n.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <span className="grid size-4 place-items-center rounded-full shadow-[0_2px_6px_rgba(2,41,119,0.3)] ring-2 ring-white dark:ring-[#0b1220]" style={{ background: n.grad }}>
                <svg viewBox="0 0 24 24" className="size-2.5 text-white" fill="currentColor">
                  {n.glyph}
                </svg>
              </span>
              <span className="text-[6px] font-bold leading-none whitespace-nowrap text-[#022977] dark:text-white">{n.label}</span>
            </div>
          ))}

          {/* Ataques: llegan, chocan y rebotan afuera */}
          {ATTACKS.map((a, i) => (
            <motion.div
              key={`atk-${i}`}
              className="absolute size-4 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]"
              animate={{
                left: [`${a.sx}%`, `${a.ix}%`, `${a.bx}%`],
                top: [`${a.sy}%`, `${a.iy}%`, `${a.by}%`],
                opacity: [1, 1, 0],
                scale: [1, 1.05, 0.7],
              }}
              transition={{ duration: ATK_DUR, times: [0, 0.45, 0.9], repeat: Infinity, delay: a.delay, ease: "easeIn" }}
            >
              {ICONS[a.icon]}
            </motion.div>
          ))}

          {/* Flashes de impacto (bloqueado con éxito) */}
          {ATTACKS.map((a, i) => (
            <motion.span
              key={`hit-${i}`}
              className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{ left: `${a.ix}%`, top: `${a.iy}%`, borderColor: SKY }}
              animate={{ scale: [0, 0, 1.4, 0], opacity: [0, 0, 1, 0] }}
              transition={{ duration: ATK_DUR, times: [0, 0.42, 0.55, 0.72], repeat: Infinity, delay: a.delay, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* ── Defensas laterales (no tocan el domo): candado izq + radar der ── */}
        <LockModule style={{ left: "3%", top: "11%" }} label="Secured" delay={0} />
        <Radar style={{ right: "2%", top: "11%" }} label="24/7" delay={1.2} dim="size-12" />
      </div>
    </div>
  );
}
