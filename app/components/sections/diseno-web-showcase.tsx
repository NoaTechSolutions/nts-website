"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "ANTES / DESPUÉS" · wipe al scrollear (efecto del CodePen de GreenSock
// oNjgEjm, recreado con Motion en vez de GSAP ScrollTrigger para integrarse con
// el smooth-scroll Lenis del sitio sin tocar el provider global).
// La sección se pinnea y, al scrollear, el "después" hace un wipe sobre el
// "antes". Caso REAL: hero de Laura Bravo (sitio anterior vs rediseño de NoaTech),
// con marcadores animados que señalan los problemas del antes (rojo) y las mejoras
// del después (verde). La imagen se muestra COMPLETA (aspect fijo) para que los
// marcadores caigan siempre sobre el mismo punto en cualquier pantalla.
// ═══════════════════════════════════════════════════════════
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../language-provider";
import { GradientBadge } from "../ui/gradient-badge";
import { Highlighter } from "../ui/highlighter";

const COPY = {
  es: {
    eyebrow: "La transformación",
    title: { l1: "Hacemos el cambio", l2: "que te mereces" },
    copy: "Un caso real: desplázate y mira cómo convertimos un sitio que espantaba clientes en una web que enamora y vende.",
    before: "ANTES",
    after: "DESPUÉS",
    beforeMarks: [
      "Navegación amontonada",
      "Texto en mayúscula, difícil de leer",
      "Foto sin tratamiento",
      "CTA débil y genérico",
    ],
    afterMarks: [
      "Hero con impacto visual",
      "Identidad y tipografía propia",
      "CTA claro que convierte",
      "Elementos dinámicos",
    ],
  },
  en: {
    eyebrow: "The transformation",
    title: { l1: "We make the change", l2: "you deserve" },
    copy: "A real case: scroll and see how we turned a site that pushed customers away into one that wins them over.",
    before: "BEFORE",
    after: "AFTER",
    beforeMarks: [
      "Cluttered navigation",
      "All-caps, hard to read",
      "Untreated photo",
      "Weak, generic CTA",
    ],
    afterMarks: [
      "Striking hero visual",
      "Own brand & typography",
      "Clear, converting CTA",
      "Dynamic elements",
    ],
  },
} as const;

// Posiciones (% del ancho/alto de la imagen) de cada marcador, calibradas a las
// capturas 1600×804. Compartidas ES/EN — solo cambian los textos (arriba).
const BEFORE_MARKS = [
  { x: 15, y: 12 }, // navegación (arriba-izq)
  { x: 27, y: 52 }, // titular en mayúsculas
  { x: 70, y: 44 }, // foto de la cantante
  { x: 27, y: 84 }, // botón "Listen Now"
] as const;
const AFTER_MARKS = [
  { x: 18, y: 54 }, // micrófono con glow
  { x: 70, y: 44 }, // logo script "Laura Bravo"
  { x: 72, y: 66 }, // botón CONTACT
  { x: 46, y: 30 }, // notas musicales
] as const;

// Marcador animado sobre la imagen: punto con "ping" (radar) + etiqueta. Rojo
// para los problemas del ANTES, verde para las mejoras del DESPUÉS. La etiqueta
// va hacia adentro (izq/der según el lado) para no salirse del cuadro.
function Marker({
  x,
  y,
  label,
  tone,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  tone: "bad" | "good";
  delay: number;
}) {
  const bad = tone === "bad";
  const alignLeft = x > 50; // marcadores del lado derecho → etiqueta hacia la izq
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.2, y: -8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Punto radar (DOBLE ping escalonado) centrado en (x,y). Más chico en
          teléfono (h-2.5) → sm: vuelve al tamaño desktop (h-3.5). */}
      <span className="absolute left-0 top-0 flex h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 sm:h-3.5 sm:w-3.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${bad ? "bg-red-400" : "bg-emerald-400"}`}
        />
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 [animation-delay:0.7s] ${bad ? "bg-red-400" : "bg-emerald-400"}`}
        />
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-white/80 sm:h-3.5 sm:w-3.5 ${bad ? "bg-red-500" : "bg-emerald-500"}`}
        />
      </span>
      {/* Etiqueta — el wrapper posiciona; el hijo hace un float continuo (vida).
          En teléfono: texto y padding más chicos → sm: tamaño desktop. */}
      <span className={`absolute top-0 -translate-y-1/2 ${alignLeft ? "right-2 sm:right-3" : "left-2 sm:left-3"}`}>
        <motion.span
          className={`block whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-tight text-white shadow-lg sm:px-2.5 sm:py-1 sm:text-[11px] ${bad ? "bg-red-500/90" : "bg-emerald-500/95"}`}
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: delay + 0.4 }}
        >
          {label}
        </motion.span>
      </span>
    </motion.div>
  );
}

export function DisenoWebShowcase() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // El "después" hace el wipe entre el 12% y 88% del scroll pinneado.
  const afterX = useTransform(scrollYProgress, [0.12, 0.88], ["100%", "0%"]);
  const innerX = useTransform(scrollYProgress, [0.12, 0.88], ["-100%", "0%"]);

  return (
    <section ref={ref} className="relative w-full" style={{ height: "200vh" }}>
      <div className="dw-compare-pin">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <GradientBadge icon="wand">{t.eyebrow}</GradientBadge>
          {/* maxWidth none (inline) destraba el centrado: .section-title tiene
              max-width:18ch sin margin:auto → sin esto la caja queda a la izq.
              lineHeight amplio = más aire entre las 2 filas para que respire el
              resaltado. Efecto HIGHLIGHT (pintado) naranja en la 2ª fila. */}
          <h2 className="section-title mt-3" style={{ maxWidth: "none", lineHeight: 1.6 }}>
            <span className="block">{t.title.l1}</span>
            <span className="block">
              <Highlighter action="highlight" color="#ff9900" padding={6} animationDuration={900} isView>
                {t.title.l2}
              </Highlighter>
            </span>
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>
        </div>

        <div
          // TELÉFONO (<640): aspecto más alto (3/2) para que no quede una tira
          // fina y baja. TABLET/DESKTOP (sm:): aspecto real de la imagen
          // (1600/804) → imagen completa + marcadores exactos. DESKTOP INTACTO.
          className="dw-compare-stage aspect-[3/2] sm:aspect-[1600/804]"
          style={{
            height: "auto",
            width: "100%",
            maxWidth: "1100px",
            marginInline: "auto",
            alignSelf: "center",
          }}
        >
          {/* ANTES (fondo) — hero del sitio anterior (caso real Laura Bravo).
              `isolate` (isolation:isolate) crea stacking context propio → los
              marcadores rojos (z-20) quedan CONTENIDOS acá y no se escapan por
              encima del "después" (que es un stacking context por su transform). */}
          <div className="dw-compare-before isolate">
            <img
              src="/noatechsolutions-caso-laura-bravo-antes.webp"
              alt={`${t.before} — sitio anterior de Laura Bravo`}
              className="h-full w-full object-cover"
              draggable={false}
            />
            {BEFORE_MARKS.map((m, i) => (
              <Marker key={i} x={m.x} y={m.y} label={t.beforeMarks[i]} tone="bad" delay={i * 0.15} />
            ))}
            <span className="absolute left-2 top-2 z-30 flex items-center gap-1.5 rounded-full bg-neutral-900/65 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white/90 shadow-lg ring-1 ring-white/15 backdrop-blur sm:left-4 sm:top-4 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.9)] sm:h-2.5 sm:w-2.5" />
              {t.before}
            </span>
          </div>

          {/* DESPUÉS (wipe) — hero del sitio rediseñado (caso real Laura Bravo) */}
          <motion.div className="dw-compare-after" style={{ x: afterX }}>
            <motion.div className="dw-compare-after-inner" style={{ x: innerX }}>
              <img
                src="/noatechsolutions-caso-laura-bravo-despues.webp"
                alt={`${t.after} — sitio de Laura Bravo rediseñado por NoaTechSolutions`}
                className="h-full w-full object-cover"
                draggable={false}
              />
              {AFTER_MARKS.map((m, i) => (
                <Marker key={i} x={m.x} y={m.y} label={t.afterMarks[i]} tone="good" delay={i * 0.15} />
              ))}
            </motion.div>
            <span className="absolute left-2 top-2 z-30 flex items-center gap-1 rounded-full bg-[#ff9900] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[0_8px_26px_rgba(255,153,0,0.6)] ring-1 ring-white/40 sm:left-4 sm:top-4 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3 sm:h-[15px] sm:w-[15px]">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t.after}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
