"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN 3 · El problema (framing de dolor). Efecto STICKY SCROLL REVEAL
// (inspirado en Aceternity): a la izquierda los "frenos" van cambiando con el
// scroll y a la derecha un panel PEGADO (sticky) muestra el video del freno
// activo. Recreado con scroll de PÁGINA + position:sticky; el freno activo se
// detecta por proximidad al centro del viewport (ver useEffect) — robusto a
// cualquier alto de pantalla. Cada freno tiene su color de acento (ACCENTS).
// Mobile: tarjetas apiladas (el sticky 2-col no aplica).
// ═══════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from "react";
import { type MotionValue, motion, useMotionValue, useTransform } from "motion/react";
import { useLanguage } from "../language-provider";
import { GradientBadge } from "../ui/gradient-badge";
import { Highlighter } from "../ui/highlighter";
import { ScrollRevealText } from "../ui/scroll-reveal-text";
import { CargaLentaBg } from "./animations/carga-lenta-bg";
import { BrokenMobileBg } from "./animations/broken-mobile-bg";
import { NoConvierteBg } from "./animations/no-convierte-bg";
import { InvisibleGoogleBg } from "./animations/invisible-google-bg";

const COPY = {
  es: {
    eyebrow: "El problema",
    // Título en 2 filas (l1/l2). `mark` = palabra con efecto Highlighter:
    // l1 subrayado ("tu mejor vendedor"), l2 resaltado ("peor enemigo").
    title: {
      l1: { pre: "Tu web puede ser ", mark: "tu mejor vendedor", post: "…" },
      l2: { pre: "o tu ", mark: "peor enemigo", post: "" },
    },
    copy: "Se ve bien, pero si carga lento, no funciona en el celular o Google no la muestra, cada día pierdes clientes que ni sabes que tuviste.",
    items: [
      { title: "Carga lenta", subtitle: "Tu cliente no espera: si tarda, se va con la competencia." },
      { title: "Rota en el celular", subtitle: "8 de cada 10 te miran desde el teléfono… y ven un desastre." },
      { title: "Linda pero vacía", subtitle: "Entran, miran y se van sin dejarte un solo mensaje." },
      { title: "Invisible en Google", subtitle: "Tu competencia aparece arriba. Quedas al fondo, donde nadie llega." },
    ],
  },
  en: {
    eyebrow: "The problem",
    title: {
      l1: { pre: "Your website can be your ", mark: "best salesperson", post: "…" },
      l2: { pre: "or your ", mark: "worst enemy", post: "" },
    },
    copy: "It looks good, but if it loads slow, breaks on mobile, or Google won't show it, you're losing customers every single day you never knew you had.",
    items: [
      { title: "Slow to load", subtitle: "Your customer won't wait — if it lags, they're gone." },
      { title: "Broken on mobile", subtitle: "8 in 10 visit from their phone… and see a mess." },
      { title: "Pretty but empty", subtitle: "They come, they look, they leave without a word." },
      { title: "Invisible on Google", subtitle: "Your competition ranks above you. You're at the bottom, where no one looks." },
    ],
  },
} as const;

// Gradientes on-brand por freno (navy/sky, el último con acento naranja).
// Fondo base de cada panel/card, detrás del fondo animado en código.
const GRADIENTS = [
  "linear-gradient(135deg, #022977 0%, #0a3fb0 100%)",
  "linear-gradient(135deg, #0a3fb0 0%, #05a5ff 100%)",
  "linear-gradient(135deg, #012061 0%, #1e50ff 100%)",
  "linear-gradient(135deg, #04122e 0%, #ff8c1a 100%)",
];

// Color de acento por freno — distinto para cada uno, on-brand y visible en
// claro y oscuro. Pinta el título del texto (izquierda) y el borde del card.
const ACCENTS = ["#1e63e6", "#05a5ff", "#1e50ff", "#ff9900"];

// Fondos animados en CÓDIGO por freno (reemplazaron a los 4 videos .mp4 que había
// antes; motion + transform/opacity → weightless, sin decoders ni peso de assets).
const PROBLEM_BGS = [CargaLentaBg, BrokenMobileBg, NoConvierteBg, InvisibleGoogleBg] as const;

// Las animaciones están diseñadas en px fijos para el panel ancho del desktop
// (~544×306, 16:9). ScaleStage las renderiza a ese tamaño y las ESCALA para
// caber en cualquier contenedor (móvil/tablet) sin rediseñar cada una. Escala
// máx 1 (nunca agranda) → el desktop, que ya usa el panel a tamaño real, no se
// toca (allá se sigue montando la animación directa, sin ScaleStage).
function ScaleStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth ? Math.min(1, el.clientWidth / 544) : 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div style={{ position: "absolute", left: 0, top: 0, width: 544, height: 306, transformOrigin: "top left", transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

// Título de la sección (eyebrow + h2 con los efectos Highlighter). Se extrae
// porque se renderiza DOS veces: una en desktop (arriba del grid, estático) y
// otra en mobile (dentro del mismo contenedor que el stack, sticky). Cada
// breakpoint muestra solo el suyo (hidden lg:block / lg:hidden).
function ProblemHeading({ t, titleSize }: { t: (typeof COPY)[keyof typeof COPY]; titleSize?: string }) {
  return (
    <>
      <GradientBadge icon="alert">{t.eyebrow}</GradientBadge>
      {/* marginInline + maxWidth inline (NO mx-auto / NO max-w-*): en Tailwind v4
          el CSS sin @layer (.section-title con `margin:0` y `max-width`) le gana
          a las utilities. lineHeight amplio → aire entre las 2 filas. */}
      <h2
        className="section-title mt-3"
        style={{ marginInline: "auto", maxWidth: "min(92vw, 72rem)", lineHeight: 1.45, fontSize: titleSize }}
      >
        {/* Fila 1 (mobile): "Tu web puede ser". En desktop (lg:inline) vuelve a
            fluir con la fila 2 → desktop se queda en 2 filas, sin tocar. */}
        <span className="block lg:inline">{t.title.l1.pre}</span>
        {/* Fila 2 (mobile): "tu mejor vendedor…" con subrayado. mt-1 = poco aire
            (la fila 1 ya deja leading suficiente); en desktop inline sin margen. */}
        <span className="mt-1 block lg:mt-0 lg:inline">
          <Highlighter action="underline" color="#1e63e6" strokeWidth={3} padding={4} animationDuration={800} isView>
            {t.title.l1.mark}
          </Highlighter>
          {t.title.l1.post}
        </span>{" "}
        {/* Fila 3 (mobile) / Fila 2 (desktop): "o tu peor enemigo" resaltado. */}
        <span className="mt-5 block lg:mt-8">
          {t.title.l2.pre}
          <Highlighter action="highlight" color="#ff9900" padding={6} animationDuration={900} isView>
            {t.title.l2.mark}
          </Highlighter>
          {t.title.l2.post}
        </span>
      </h2>
    </>
  );
}

// Card del stack en MOBILE, DENTRO del pinned stage. Se posiciona ABSOLUTA (todas
// apiladas en el mismo lugar; offset de `top` + z creciente deja ver el borde de
// las de abajo = efecto mazo). Su entrada (slide desde la derecha + fade) la
// maneja el PROGRESO del scroll del track, NO un sticky propio → así el stage
// entero (título + cards) se despega y se va JUNTO al final, sin peel ni el
// título tapando nada (son la misma pieza).
function ProblemMobileCard({
  it,
  i,
  n,
  Bg,
  accent,
  gradient,
  progress,
}: {
  it: { title: string; subtitle: string };
  i: number;
  n: number;
  Bg: (typeof PROBLEM_BGS)[number];
  accent: string;
  gradient: string;
  progress: MotionValue<number>;
}) {
  // Entrada ATADA AL SCROLL (scrub), 3D y SIN fade. Cada card ocupa su tramo del
  // progreso dejando un HUECO antes de la siguiente (span*0.7 → más tiempo entre
  // una card y la otra). En vez de opacidad, "flipea" desde canto (rotateY -90 =
  // casi invisible) hasta ponerse de frente, con un leve pop (scale) y subida (y):
  // así entra en su COLOR ENTERO, sin transparencia, y mucho más vistoso. Al subir
  // el scroll se des-apila (motion sigue el progreso en ambos sentidos).
  const span = 1 / n;
  const start = i * span;
  const end = start + span * 0.7;
  const rotateY = useTransform(progress, [start, end], [-90, 0], { clamp: true });
  const scale = useTransform(progress, [start, end], [0.82, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [46, 0], { clamp: true });
  return (
    <motion.div
      style={{
        rotateY,
        scale,
        y,
        top: i * 12,
        zIndex: i + 1,
        transformPerspective: 1000,
        transformOrigin: "center",
      }}
      className="absolute inset-x-0 mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#022977]/10 bg-white text-center shadow-[0_20px_50px_rgba(2,41,119,0.2)] dark:border-white/12 dark:bg-[#0b1220]"
    >
      {Bg && (
        <div className="relative aspect-video w-full overflow-hidden border-b-4" style={{ background: gradient, borderBottomColor: accent }}>
          <ScaleStage>
            <Bg />
          </ScaleStage>
        </div>
      )}
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display), sans-serif", color: accent }}>
          {it.title}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#022977]/70 dark:text-[#c8d8f0]/75">
          {it.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export function DisenoWebProblem() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  // El título EN es más largo → en mobile se iba a 4 filas. Reducimos SOLO el
  // mínimo del clamp para EN: ese mínimo actúa únicamente en viewports chicos
  // (mobile) → desktop queda idéntico (usa la parte 4vw/cap) y ES no se toca.
  const titleSize = locale === "en" ? "clamp(1.65rem, 4vw, 3.4rem)" : "clamp(2.1rem, 4vw, 3.4rem)";
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  // ── MOBILE: pinned stage con entrada scroll-scrubbed ───────────────────────
  // Todo el bloque (título + cards) es UN solo elemento sticky pinneado mientras
  // el "track" (un div alto) scrollea → al final se despega y se va COMPLETO
  // (título + cards juntos), imposible que el título tape las cards en la salida.
  // La ENTRADA está atada al scroll: calculamos el progreso 0→1 A MANO desde la
  // posición del track (mismo mecanismo confiable que la detección de `active`,
  // NO useScroll que se colgaba con el hijo pinneado) y lo guardamos en un
  // MotionValue (sin re-render). Cada card mapea su tramo → scrub en ambos sentidos.
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileProgress = useMotionValue(0);
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      if (!track.offsetHeight) return; // desktop: track lg:hidden (offsetHeight 0)
      const top = track.getBoundingClientRect().top;
      // 0 cuando el stage recién se pega (top ~88px); 1 tras `entrance` px de scroll.
      const entrance = window.innerHeight * 1.35;
      mobileProgress.set(Math.min(1, Math.max(0, (88 - top) / entrance)));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mobileProgress]);

  useEffect(() => {
    // En cada scroll, marca activo el paso cuyo CENTRO está más cerca del centro
    // del viewport. Determinista y robusto a cualquier alto de pantalla — el
    // IntersectionObserver con banda de rootMargin fallaba en viewports bajos
    // (1024×768) y dejaba el activo clavado en 0. Lenis scrollea la página de
    // forma nativa, así que el evento "scroll" de window dispara igual.
    let raf = 0;
    const compute = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header (desktop ≥1024): estático, arriba del grid de 2 columnas. En
            mobile el título va DENTRO del stack (sticky) — ver bloque de abajo. */}
        <div className="hidden text-center lg:block">
          <ProblemHeading t={t} titleSize={titleSize} />
        </div>

        {/* ── STICKY SCROLL REVEAL (desktop ≥1024) ── */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: los frenos, uno por paso de scroll */}
          <div>
            {t.items.map((it, i) => (
              <div
                key={it.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[80vh] flex-col justify-center"
              >
                {/* Reveal palabra-por-palabra por scroll (ScrollRevealText):
                    reemplaza el fade binario por-active → sincroniza con el
                    crossfade del video. El color/tipo se heredan (h3 = acento). */}
                <div>
                  <h3
                    className="text-4xl font-semibold"
                    style={{ fontFamily: "var(--font-display), sans-serif", color: ACCENTS[i] }}
                  >
                    <ScrollRevealText text={it.title} />
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-[#022977]/70 dark:text-[#c8d8f0]/75">
                    <ScrollRevealText text={it.subtitle} />
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Derecha: panel PEGADO que muestra el freno activo */}
          <div>
            <div
              // top-[42vh]: alinea el TOP del video con el top del texto activo
              // de la izquierda. El texto está centrado en un bloque de 62vh
              // (justify-center) → cuando el freno está activo su top cae en
              // ~42-44vh. Antes era 32vh → el video arrancaba más arriba que su
              // texto. Ajustar este vh si hace falta afinar la alineación.
              className="sticky top-[42vh] aspect-video w-full overflow-hidden rounded-3xl border-2 shadow-[0_24px_60px_rgba(2,41,119,0.28)] transition-colors duration-500"
              style={{ borderColor: ACCENTS[active] }}
            >
              {t.items.map((it, i) => {
                const Bg = PROBLEM_BGS[i];
                return (
                <div
                  key={it.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: GRADIENTS[i] }}
                >
                  <Bg className="absolute inset-0 h-full w-full" />
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET (<1024): PINNED STAGE. Todo el bloque (título +
            cards) es UN elemento sticky que se mantiene pinneado mientras el
            "track" (este div alto) scrollea. Las cards entran animadas por el
            progreso del scroll y se apilan. Al terminar el track, el stage se
            despega y se va COMPLETO → el título nunca tapa las cards en la salida
            (son la misma pieza). La altura del track da el scroll de las entradas. ── */}
        <div ref={mobileTrackRef} className="lg:hidden" style={{ height: "280vh" }}>
          <div
            className="sticky top-[88px] flex flex-col"
            style={{ height: "calc(100vh - 108px)" }}
          >
            {/* Título — dentro del stage → queda fijo mientras el stage está pinneado */}
            <div className="shrink-0 text-center">
              <ProblemHeading t={t} titleSize={titleSize} />
            </div>
            {/* Zona del stack: las cards se apilan absolutas y su entrada la maneja
                el progreso del scroll (scrub) — ver ProblemMobileCard. */}
            <div className="relative mt-6 flex-1">
              {t.items.map((it, i) => (
                <ProblemMobileCard
                  key={it.title}
                  it={it}
                  i={i}
                  n={t.items.length}
                  Bg={PROBLEM_BGS[i]}
                  accent={ACCENTS[i]}
                  gradient={GRADIENTS[i]}
                  progress={mobileProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

