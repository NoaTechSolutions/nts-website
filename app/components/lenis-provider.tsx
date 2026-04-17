"use client";

import { useEffect, useRef } from "react";

export function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);

  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
