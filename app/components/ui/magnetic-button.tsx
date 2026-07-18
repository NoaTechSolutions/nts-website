"use client";

// ─────────────────────────────────────────────────────────────
// MagneticButton · botón "magnético" con GSAP (patrón del demo oficial
// https://demos.gsap.com/demo/magnetic-button-overwrite-modes/).
//
// El botón sigue al cursor mientras está encima y vuelve al centro al salir.
// Cada mousemove dispara un tween nuevo; para que NO se apilen y peleen con el
// tween de "volver al centro", usamos `overwrite: "auto"`: solo pisa las props
// en conflicto (x/y) de los tweens previos → movimiento suave.
//
// Solo se activa en punteros finos con hover (mouse). En touch y con
// prefers-reduced-motion no hace nada (el botón queda normal).
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  /** Cuánto sigue al cursor (0 = nada, 1 = 1:1). Default 0.4. */
  strength?: number;
}

export function MagneticButton({
  strength = 0.4,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduce) return;

    const ctx = gsap.context(() => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(el, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, ref);

    return () => ctx.revert();
  }, [strength]);

  return (
    <a ref={ref} {...props}>
      {children}
    </a>
  );
}
