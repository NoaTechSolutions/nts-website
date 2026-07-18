"use client";

import { useRef, useEffect } from "react";

interface MouseGlowBgProps {
  className?: string;
  imageSrc?: string;
  glowColor?: string;
}

export function MouseGlowBg({
  className = "",
  imageSrc,
  glowColor = "rgba(4,0,240,0.15)",
}: MouseGlowBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    let rafId: number;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      glow.style.background = `radial-gradient(
        600px circle at ${currentX}% ${currentY}%,
        ${glowColor},
        transparent 70%
      )`;

      rafId = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [glowColor]);

  return (
    <div
      ref={containerRef}
      className={`mouse-glow-bg ${className}`}
      aria-hidden="true"
    >
      {imageSrc && (
        <div
          className="mouse-glow-bg-image"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      )}
      <div ref={glowRef} className="mouse-glow-bg-glow" />
    </div>
  );
}
