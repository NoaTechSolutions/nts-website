"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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
  // gsap se resuelve dentro del effect (import dinámico) → hace falta guardarlo
  // para poder desmontar el ticker en el cleanup.
  const gsapRef = useRef<typeof import("gsap").default | null>(null);

  useEffect(() => {
    let tickerFn: ((time: number) => void) | null = null;
    let mounted = true;

    (async () => {
      // PERF (TBT): LenisProvider vive en el ROOT layout, así que importar gsap
      // + ScrollTrigger estáticamente los embarcaba en el bundle compartido de
      // TODAS las rutas (~39KB gzip / ~110KB min), incluida la home, donde nadie
      // crea ScrollTriggers. Ahora se cargan dinámicamente junto a Lenis: mismo
      // orden de inicialización, misma lógica, solo fuera del chunk inicial.
      const [Lenis, gsap, { ScrollTrigger }] = await Promise.all([
        import("lenis").then((m) => m.default),
        import("gsap").then((m) => m.default),
        import("gsap/ScrollTrigger"),
      ]);
      if (!mounted) return;

      gsapRef.current = gsap;
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
      if (tickerFn) gsapRef.current?.ticker.remove(tickerFn);
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
