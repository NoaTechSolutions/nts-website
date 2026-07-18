"use client";

// ─────────────────────────────────────────────────────────────
// Wrapper del scene de Spline. SELF-HOSTED: el `scene` apunta a un
// archivo local en /public (NO al CDN prod.spline.design en runtime).
// El paquete se importa lazy para no cargar el runtime WebGL en SSR.
// ─────────────────────────────────────────────────────────────

import { Suspense, lazy } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (spline: Application) => void;
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="hero-robot-loader" aria-hidden="true" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
