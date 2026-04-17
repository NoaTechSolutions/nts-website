"use client";

import { Suspense, lazy, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  url: string;
  className?: string;
  onLoad?: (app: Application) => void;
}

export function SplineScene({
  url,
  className = "",
  onLoad,
}: SplineSceneProps) {
  const splineRef = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function onSplineLoad(app: Application) {
    splineRef.current = app;
    setIsLoaded(true);
    onLoad?.(app);
  }

  return (
    <div
      className={`spline-wrapper ${className}`}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      <Suspense fallback={<div className="spline-placeholder" />}>
        <Spline
          scene={url}
          onLoad={onSplineLoad}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      </Suspense>
    </div>
  );
}
