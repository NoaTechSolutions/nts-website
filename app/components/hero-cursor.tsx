"use client";

// ─────────────────────────────────────────────────────────────
// Cursor custom por ZONA (coherencia de diseño):
//   · #home            → retículo 3D tech (escáner + núcleo)
//   · .growth-section  → triángulo de advertencia (warning)
//   · resto            → oculto, vuelve el cursor default
// Escucha en window y decide la zona con closest(). pointer-events:none.
// El cursor default se esconde vía CSS en esas zonas.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { TriangleAlert } from "lucide-react";

type Zone = "tech" | "warning" | null;

export function HeroCursor() {
  const [zone, setZone] = useState<Zone>(null);
  const [active, setActive] = useState(false); // sobre un elemento interactivo (tech)
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      let z: Zone = null;
      if (el?.closest("#home")) z = "tech";
      else if (el?.closest(".growth-section")) z = "warning";

      setZone(z);
      if (z) {
        x.set(e.clientX);
        y.set(e.clientY);
      }
      setActive(
        z === "tech" && Boolean(el?.closest("a, button, [role='button']")),
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className={`hero-cursor hero-cursor--${zone ?? "hidden"} ${
        active ? "hero-cursor-active" : ""
      }`}
      style={{ x: sx, y: sy, opacity: zone ? 1 : 0 }}
      aria-hidden="true"
    >
      {zone === "warning" ? (
        <span className="hero-cursor-warn">
          <TriangleAlert size={26} strokeWidth={2.4} />
        </span>
      ) : (
        <>
          <span className="hero-cursor-ring" />
          <span className="hero-cursor-scan" />
          <span className="hero-cursor-core" />
        </>
      )}
    </motion.div>
  );
}
