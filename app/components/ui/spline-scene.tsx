"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  url: string;
  className?: string;
}

export function SplineScene({ url, className = "" }: SplineSceneProps) {
  return (
    <Suspense
      fallback={<div className={`spline-placeholder ${className}`} />}
    >
      <Spline scene={url} className={className} />
    </Suspense>
  );
}
