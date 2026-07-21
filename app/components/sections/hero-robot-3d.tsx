"use client";

// ─────────────────────────────────────────────────────────────
// HERO · pieza central 3D con el robot interactivo (sigue el cursor).
// Scene de Spline SELF-HOSTED en /public/spline/robot.splinecode.
// Reutiliza el frame premium liquid-glass (.hero-exp3d-*) como marco.
// La interactividad la maneja el propio scene de Spline (no scroll-tilt).
// (La variante previa `hero-experiment-3d.tsx` con la mascota Noa se eliminó
// por código muerto; recuperarla del historial de git si hiciera falta.)
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import type { Application } from "@splinetool/runtime";

// Red de seguridad: si el scene nunca dispara onLoad (falla de red/WebGL),
// mostramos el canvas igual pasado este tiempo para no dejar el robot invisible.
const ROBOT_FADE_FALLBACK_MS = 4000;

export function HeroRobot3D({ onReady }: { onReady?: () => void }) {
  // Al cargar el scene marcamos .is-loaded → el canvas hace su fade lento de
  // entrada (CSS). El hero ya no depende de esto para revelarse (lo hace en
  // mount vía rAF), pero seguimos avisando onReady por compatibilidad.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setLoaded(true), ROBOT_FADE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  const handleLoad = (spline: Application) => {
    // El scene ya está descargado y parseado. Su zoom de entrada corre ahora;
    // marcamos loaded para disparar el fade lento del canvas.
    setLoaded(true);
    onReady?.();

    const objects = spline.getAllObjects();

    // PRIMER PASE (tosco): azul dark on-brand (navy del DS) en todas las piezas.
    // Para VOLVER AL COLOR ORIGINAL del robot: borrar este forEach completo.
    // Saltea luces/cámara/vacíos por nombre para no romper la iluminación.
    const ROBOT_TINT = "#022977"; // navy de marca (DS-010)
    const SKIP = /light|spot|point|direct|camera|scene|null|empty|ground|floor|env/i;
    objects.forEach((o) => {
      if (!o.name || SKIP.test(o.name)) return;
      try {
        o.color = ROBOT_TINT;
      } catch {
        /* algunos objetos no aceptan color (grupos/vacíos) — se ignoran */
      }
    });
  };

  return (
    <div className="hero-exp3d">
      <div
        className={`hero-exp3d-stage hero-robot-stage${loaded ? " is-loaded" : ""}`}
      >
        <SplineScene
          scene="/spline/robot.splinecode"
          className="hero-robot-canvas"
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
