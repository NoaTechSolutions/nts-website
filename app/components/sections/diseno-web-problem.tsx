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
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../language-provider";
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
    copy: "Se ve bien, pero si carga lento, no anda en el celu o Google no la muestra, cada día perdés clientes que ni sabés que tuviste.",
    items: [
      { title: "Carga lenta", subtitle: "Tu cliente no espera: si tarda, se va con la competencia." },
      { title: "Rota en el celular", subtitle: "8 de cada 10 te miran desde el teléfono… y ven un desastre." },
      { title: "Linda pero vacía", subtitle: "Entran, miran y se van sin dejarte un solo mensaje." },
      { title: "Invisible en Google", subtitle: "Tu competencia aparece arriba. Vos quedás al fondo, donde nadie llega." },
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
// Sirven de FONDO/placeholder mientras el video del freno no exista.
const GRADIENTS = [
  "linear-gradient(135deg, #022977 0%, #0a3fb0 100%)",
  "linear-gradient(135deg, #0a3fb0 0%, #05a5ff 100%)",
  "linear-gradient(135deg, #012061 0%, #1e50ff 100%)",
  "linear-gradient(135deg, #04122e 0%, #ff8c1a 100%)",
];

// Color de acento por freno — distinto para cada uno, on-brand y visible en
// claro y oscuro. Pinta el título del texto (izquierda) y el borde del card.
const ACCENTS = ["#1e63e6", "#05a5ff", "#1e50ff", "#ff9900"];

// Video por freno (mismo para ES/EN, es visual). "" = todavía sin video →
// se muestra el gradiente + emoji de placeholder. Servido desde /public.
const VIDEOS = [
  "/noatechsolutions-diseno-web-carga-lenta.mp4",
  "/noatechsolutions-diseno-web-no-mobile.mp4",
  "/noatechsolutions-diseno-web-no-convierte.mp4",
  "/noatechsolutions-diseno-web-no-seo.mp4",
];

// Fondos en CÓDIGO que reemplazan los videos (null = todavía usa video/placeholder).
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

// Card del stack (mobile/tablet): pegada (sticky) → cada una ENTRA desde la
// derecha con el scroll y se APILA encima de la anterior (mismo lugar). El
// offset de `top` + z creciente deja ver un borde de las de abajo (efecto mazo).
function StackCard({
  it,
  i,
  Bg,
  accent,
  gradient,
}: {
  it: { title: string; subtitle: string };
  i: number;
  Bg: (typeof PROBLEM_BGS)[number];
  accent: string;
  gradient: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 42%"] });
  const x = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  return (
    <div ref={ref} className="sticky" style={{ top: `${88 + i * 14}px`, zIndex: i + 1 }}>
      <motion.div
        style={{ x, opacity }}
        className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#022977]/10 bg-white text-center shadow-[0_20px_50px_rgba(2,41,119,0.2)] dark:border-white/12 dark:bg-[#0b1220]"
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
    </div>
  );
}

export function DisenoWebProblem() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  // ── Optimización de carga de video (sin tocar los .mp4, cero pérdida de
  // calidad) ──────────────────────────────────────────────────────────────
  // Antes: los 4 <video> tenían autoPlay → el navegador descargaba Y decodificaba
  // los ~2.7MB en paralelo al entrar (autoPlay ignora preload). Ahora control
  // imperativo por refs: preload dinámico ("none" frío / "auto" warm) + src
  // condicional (no baja nada hasta que hace falta), se reproduce SOLO el
  // activo (1 decoder) y se pausa el
  // resto. `inView` (IntersectionObserver) evita cargar nada mientras la sección
  // está fuera de pantalla; `warm` mantiene precargado el activo + el SIGUIENTE
  // para que el crossfade entre suave (el siguiente buffereado pero quieto).
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [warm, setWarm] = useState<Set<number>>(() => new Set());

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

  // Descarga NADA hasta que la sección se acerca al viewport (rootMargin 200px
  // → warming apenas antes de entrar). Solo desktop monta los <video>.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Marca "warm" (a precargar) el activo y el SIGUIENTE, solo cuando la sección
  // está en vista. El set solo CRECE → nunca se recarga uno ya visto (evita el
  // flash al scrollear para atrás).
  useEffect(() => {
    if (!inView) return;
    setWarm((prev) => {
      const needed = [active, active + 1].filter((i) => i < VIDEOS.length);
      if (needed.every((i) => prev.has(i))) return prev;
      const next = new Set(prev);
      needed.forEach((i) => next.add(i));
      return next;
    });
  }, [active, inView]);

  // Reproduce SOLO el activo (1 decoder), pausa el resto. Fuera de vista, todos
  // pausados. play() puede rechazar si el buffer aún no llegó → se ignora.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && inView) {
        const p = v.play();
        if (p) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, inView, warm]);

  return (
    <section ref={sectionRef} className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          {/* marginInline + maxWidth inline (NO mx-auto / NO max-w-*): en
              Tailwind v4 el CSS sin @layer (.section-title/.section-copy con
              `margin:0` y `max-width`) le gana a las utilities. Inline lo fuerza.
              maxWidth min(92vw, 72rem) = responsive con un solo valor: desktop
              usa hasta 72rem (aprovecha el ancho → título en 2 filas, subtítulo
              en 1), mobile usa 92vw. La 2ª parte del título va en su fila con
              lg:block (salto controlado solo en desktop). */}
          {/* lineHeight amplio (1.45 vs el 1.05 de .section-title) → aire entre
              las 2 filas para que el subrayado y el resaltado respiren. */}
          <h2
            className="section-title mt-3"
            style={{ marginInline: "auto", maxWidth: "min(92vw, 72rem)", lineHeight: 1.45 }}
          >
            {t.title.l1.pre}
            <Highlighter action="underline" color="#1e63e6" strokeWidth={3} padding={4} animationDuration={800} isView>
              {t.title.l1.mark}
            </Highlighter>
            {t.title.l1.post}{" "}
            <span className="lg:mt-8 lg:block">
              {t.title.l2.pre}
              <Highlighter action="highlight" color="#ff9900" padding={6} animationDuration={900} isView>
                {t.title.l2.mark}
              </Highlighter>
              {t.title.l2.post}
            </span>
          </h2>
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
                  {Bg ? (
                    <Bg className="absolute inset-0 h-full w-full" />
                  ) : VIDEOS[i] ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="absolute inset-0 h-full w-full object-contain"
                      // src + preload solo cuando está "warm". OJO: con
                      // preload="none" setear src NO descarga nada (el browser
                      // respeta el none hasta un play()/load()). Por eso el
                      // preload es DINÁMICO: "auto" en warm → el activo Y su
                      // siguiente SÍ buffean de verdad (crossfade suave); "none"
                      // en los fríos → 0 bytes hasta que les toca.
                      src={warm.has(i) ? VIDEOS[i] : undefined}
                      aria-label={`${it.title} — ${it.subtitle}`}
                      loop
                      muted
                      playsInline
                      preload={warm.has(i) ? "auto" : "none"}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-10 text-center text-white">
                      <span
                        className="text-4xl font-bold"
                        style={{ fontFamily: "var(--font-display), sans-serif" }}
                      >
                        {it.title}
                      </span>
                      <span className="text-lg font-medium text-white/80">
                        {it.subtitle}
                      </span>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET (<1024): STACK de cards que entran desde la derecha
            con el scroll y se apilan una encima de otra (efecto mazo) ── */}
        <div className="mt-12 pb-[40vh] lg:hidden">
          {t.items.map((it, i) => (
            <StackCard key={it.title} it={it} i={i} Bg={PROBLEM_BGS[i]} accent={ACCENTS[i]} gradient={GRADIENTS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

