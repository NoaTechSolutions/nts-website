"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Efecto "alargado" + anti-desborde: fijamos el ancho del texto por debajo del
  // ancho del viewBox (720) y dejamos que lengthAdjust comprima los glifos.
  // Resultado: letras altas y angostas que NUNCA se salen de los costados.
  const FONT_SIZE = 104;
  const TEXT_LENGTH = 690;

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      if (svgRect.width === 0 || svgRect.height === 0) return;

      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 720 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const x = e.clientX;
        const y = e.clientY;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setCursor({ x, y });
        });
      }}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ff9900" />
              <stop offset="25%" stopColor="#0400f0" />
              <stop offset="50%" stopColor="#05a5ff" />
              <stop offset="75%" stopColor="#022977" />
              <stop offset="100%" stopColor="#ff9900" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fontSize={FONT_SIZE}
        textLength={TEXT_LENGTH}
        lengthAdjust="spacingAndGlyphs"
        className="fill-transparent stroke-neutral-200 font-[helvetica] font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fontSize={FONT_SIZE}
        textLength={TEXT_LENGTH}
        lengthAdjust="spacingAndGlyphs"
        className="fill-transparent stroke-[#05a5ff] font-[helvetica] font-bold dark:stroke-[#05a5ff99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        fontSize={FONT_SIZE}
        textLength={TEXT_LENGTH}
        lengthAdjust="spacingAndGlyphs"
        className="fill-transparent font-[helvetica] font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => (
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 10%, #022977aa 0%, #0400f022 50%, #05a5ff11 100%)",
    }}
  />
);
