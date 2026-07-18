"use client";

// ─────────────────────────────────────────────────────────────
// HeroVideoWord · efecto "Video Text" (inspirado en MagicUI) para UNA palabra/
// línea dentro de un título. El video se ve SOLO a través de las letras.
//
// Por qué NO usamos el método de MagicUI (máscara SVG en data-URL): un SVG
// cargado como imagen NO tiene acceso a las fuentes de la página → el texto
// saldría en una fuente genérica. Acá usamos SVG *inline* + `mask: url(#id)`,
// que SÍ usa la fuente del documento (Space Grotesk), así la fila 2 calza con
// la fila 1. El degradado del `className` queda de FALLBACK debajo del video
// (progressive enhancement: si el video no carga, se ve el degradado, no un
// hueco vacío).
// ─────────────────────────────────────────────────────────────

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Box {
  w: number;
  h: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  letterSpacing: string;
}

interface HeroVideoWordProps {
  /** Texto a rellenar con el video */
  text: string;
  /** Fuente del video (local, en /public) */
  src: string;
  /** Clase del texto de fallback (ej. el degradado de marca) */
  className?: string;
  /** Apila cada palabra en su propia línea (una máscara multi-línea, 1 video). */
  stack?: boolean;
}

export function HeroVideoWord({ text, src, className, stack }: HeroVideoWordProps) {
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<Box | null>(null);
  // idle → aún cargando (se ve el fallback); playing → video corriendo (fallback
  // apagado, solo video); error → el video falló (fallback visible de nuevo).
  const [status, setStatus] = useState<"idle" | "playing" | "error">("idle");
  const rawId = useId();
  const maskId = `hero-word-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  // Líneas de la máscara: apiladas (1 palabra por línea) o todo en una.
  const lines = stack ? text.split(/\s+/).filter(Boolean) : [text];

  // useLayoutEffect en cliente; en SSR no corre (se hidrata y mide).
  const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsoLayoutEffect(() => {
    const el = sizerRef.current;
    if (!el) return;

    const measure = () => {
      const cs = getComputedStyle(el);
      setBox({
        w: el.offsetWidth,
        h: el.offsetHeight,
        fontSize: parseFloat(cs.fontSize),
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing === "normal" ? "0" : cs.letterSpacing,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Re-medir cuando la webfont termina de cargar (cambia el ancho).
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [text, stack]);

  return (
    <span
      className="dw-hero-word"
      style={{
        position: "relative",
        display: "inline-block",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {/* Sizer + FALLBACK: el texto real (define la caja y lo lee el lector).
          En mayúsculas por CSS (el DOM conserva el texto natural para a11y).
          Cuando el video corre, se apaga (transparente) para que NO asome el
          degradado detrás; si el video falla, vuelve a verse. */}
      <span
        ref={sizerRef}
        className={status === "playing" ? undefined : className}
        style={{
          textTransform: "uppercase",
          color: status === "playing" ? "transparent" : undefined,
        }}
      >
        {stack
          ? lines.map((w, i) => (
              <span key={i} style={{ display: "block" }}>
                {w}
              </span>
            ))
          : text}
      </span>

      {box && box.w > 0 && (
        <>
          <svg
            width="0"
            height="0"
            aria-hidden="true"
            style={{ position: "absolute", width: 0, height: 0 }}
          >
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={box.w}
                height={box.h}
              >
                {lines.map((w, i) => (
                  <text
                    key={i}
                    x={box.w / 2}
                    y={((i + 0.5) * box.h) / lines.length}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily={box.fontFamily}
                    fontSize={box.fontSize}
                    fontWeight={box.fontWeight}
                    letterSpacing={box.letterSpacing}
                    fill="#fff"
                  >
                    {w.toUpperCase()}
                  </text>
                ))}
              </mask>
            </defs>
          </svg>

          <video
            className={cn("dw-hero-word-video")}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setStatus("playing")}
            onLoadedData={() => setStatus("playing")}
            onError={() => setStatus("error")}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              WebkitMaskImage: `url(#${maskId})`,
              maskImage: `url(#${maskId})`,
            }}
          />
        </>
      )}
    </span>
  );
}
