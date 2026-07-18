"use client";

// ─────────────────────────────────────────────────────────────
// HERO · pieza central 3D con la mascota Noa (sonriendo + saludando).
// Técnica liquid-glass extraída del prompt NFT, con nuestra paleta.
// Card espacial + borde liquid-glass + tilt 3D reactivo al scroll.
// Para removerlo: buscar "hero-exp" en globals.css + sacar <HeroExperiment3D />
// y la clase "is-hero-exp" de header-section.tsx.
// ─────────────────────────────────────────────────────────────

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function HeroExperiment3D() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Suavizado para que el tilt 3D no salte con el scroll
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  const rotateY = useTransform(progress, [0, 0.5, 1], [-22, 0, 22]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [12, 0, -12]);
  const y = useTransform(progress, [0, 1], [28, -28]);

  return (
    <div ref={ref} className="hero-exp3d">
      <div className="hero-exp3d-stage">
        <motion.div className="hero-exp3d-card" style={{ rotateX, rotateY, y }}>
          <div className="hero-exp3d-shine" />
          <div className="hero-exp3d-lines" />
          <span className="hero-exp3d-hello">¡Hola! 👋</span>
          <div className="hero-exp3d-mascot">
            <Image
              src="/noa/noa-mascot-original.png"
              alt="Noa, la mascota de NoaTechSolutions, sonriendo y saludando"
              width={1200}
              height={800}
              priority
              className="hero-exp3d-mascot-img"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
