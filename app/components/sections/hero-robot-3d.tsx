"use client";

// ─────────────────────────────────────────────────────────────
// HERO · pieza central 3D con el robot interactivo (sigue el cursor).
// Scene de Spline SELF-HOSTED en /public/spline/robot.splinecode.
// Reutiliza el frame premium liquid-glass (.hero-exp3d-*) como marco.
// La interactividad la maneja el propio scene de Spline (no scroll-tilt).
// Para volver a la mascota Noa: en header-section.tsx importar de nuevo
// ./hero-experiment-3d y usar <HeroExperiment3D />.
// ─────────────────────────────────────────────────────────────

import { SplineScene } from "@/components/ui/splite";
import type { Application } from "@splinetool/runtime";

// Margen (ms) tras el onLoad de Spline para dejar correr la animación de
// entrada (zoom) del propio scene antes de revelar el contenido del hero.
const ROBOT_ENTRANCE_MS = 1100;

export function HeroRobot3D({ onReady }: { onReady?: () => void }) {
  const handleLoad = (spline: Application) => {
    // El scene ya está descargado y parseado. Su zoom de entrada corre ahora;
    // avisamos al hero tras un margen para encadenar la entrada escalonada.
    window.setTimeout(() => onReady?.(), ROBOT_ENTRANCE_MS);

    const objects = spline.getAllObjects();

    // Nombres de las piezas → mirar en DevTools del browser (F12 → Console).
    // Con estos nombres podemos pintar cuerpo/acentos por separado (pase fino).
    console.log(
      "[robot-objects]",
      objects.map((o) => `${o.name} (${o.id})`).join(" || ")
    );

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
      <div className="hero-exp3d-stage hero-robot-stage">
        <SplineScene
          scene="/spline/robot.splinecode"
          className="hero-robot-canvas"
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
