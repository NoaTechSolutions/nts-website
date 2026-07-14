"use client";

// ─────────────────────────────────────────────────────────────
// Fondo de video para card, con GATING por IntersectionObserver:
// solo reproduce cuando la card está visible en viewport. Fuera de
// vista → pausa (libera el decoder). Así, aunque haya 6 cards, nunca
// corren 6 decoders a la vez: solo los que el usuario está mirando.
//
// Para la tortuga (SlowWebsiteLoopV3) que NO se pudo portar a código.
// Usar con el source downscaleado a 640×360 (no 1080p).
// Respeta prefers-reduced-motion: no reproduce, muestra el poster.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export function CardVideoBg({
  src,
  webmSrc,
  poster,
  className,
  style,
}: {
  src: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si el usuario pidió menos movimiento, ni lo reproducimos.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {}); // autoplay muted: no debería fallar
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
