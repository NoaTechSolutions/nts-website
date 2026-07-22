"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* PERF (TBT): `dynamic()` divide el bundle en chunks, pero los chunks se
   descargan y ejecutan igual apenas hidrata la página — divide la descarga,
   NO difiere la ejecución. Este wrapper monta a sus children recién cuando el
   placeholder se ACERCA al viewport (IntersectionObserver + rootMargin), así
   el chunk de una sección below-the-fold no se descarga ni ejecuta hasta que
   el usuario scrollea hacia ella. Lighthouse no scrollea → el JS diferido no
   entra en la ventana de TBT; y el usuario real que no scrollea, no lo paga.

   El placeholder reserva `minHeight` para acotar el CLS (mismo criterio que
   los `holder` de app/page.tsx). Sin IntersectionObserver (SSR/bots) monta
   directo. */
export function LazyMount({
  children,
  minHeight,
  rootMargin = "600px",
}: {
  children: ReactNode;
  minHeight: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Fallback sin IO: montar igual, diferido un frame (setState sincrónico
      // dentro de un effect dispara renders en cascada — regla de lint).
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return show ? (
    <>{children}</>
  ) : (
    <div ref={ref} aria-hidden style={{ minHeight }} />
  );
}
