"use client";

import { useCallback, useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type CometCardProps = {
  children: ReactNode;
  className?: string;
  rotateDepth?: number;
  translateDepth?: number;
};

const springConfig = {
  stiffness: 180,
  damping: 18,
  mass: 0.9,
};

export function CometCard({
  children,
  className,
  rotateDepth = 17.5,
  translateDepth = 20,
}: CometCardProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothTranslateX = useSpring(translateX, springConfig);
  const smoothTranslateY = useSpring(translateY, springConfig);

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  }, [rotateX, rotateY, translateX, translateY]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const element = hostRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const offsetX = relativeX - 0.5;
      const offsetY = relativeY - 0.5;

      rotateY.set(offsetX * rotateDepth * 2);
      rotateX.set(offsetY * -rotateDepth * 2);
      translateX.set(offsetX * translateDepth * 2);
      translateY.set(offsetY * translateDepth * 2);
    },
    [rotateDepth, rotateX, rotateY, translateDepth, translateX, translateY],
  );

  return (
    <div
      ref={hostRef}
      className="pointer-events-auto w-full [perspective:1200px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <motion.div
        className={cn("w-full transform-gpu will-change-transform", className)}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          x: smoothTranslateX,
          y: smoothTranslateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="h-full w-full [transform:translateZ(32px)] [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
