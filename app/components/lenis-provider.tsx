"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Smooth-scroll global (Lenis) INTEGRADO con GSAP ScrollTrigger (integración
// canónica): Lenis se maneja desde el ticker de GSAP y notifica su scroll a
// ScrollTrigger → los efectos con pin/scrub (Flip, wipe, etc.) van perfectamente
// sincronizados, sin temblor. Motion (useScroll) sigue funcionando: escucha el
// scroll real de la página, que Lenis actualiza igual.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(
    null,
  );
  const pathname = usePathname();

  useEffect(() => {
    let tickerFn: ((time: number) => void) | null = null;
    let mounted = true;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      // Lenis notifica cada scroll → ScrollTrigger se actualiza.
      lenis.on("scroll", ScrollTrigger.update);

      // El ticker de GSAP maneja el rAF de Lenis (un solo loop, sincronizado).
      tickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      mounted = false;
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de ruta, Lenis conserva su posición interna → la página nueva
  // abría scrolleada donde venías (ej: entrar a /servicios/diseno-web desde el
  // FAQ del home la abría por abajo). Reseteamos al tope de forma instantánea.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
