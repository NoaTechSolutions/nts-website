"use client";

// Wavy Background (Aceternity · https://ui.aceternity.com/components/wavy-background)
// Adaptado a fondo-de-sección: el canvas LLENA su contenedor (parent relative),
// sin wrapper de children. Usa createNoise3D de simplex-noise (ya en deps).
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

export function WavyBackground({
  className,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  amplitude = 100,
}: {
  className?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const noise = createNoise3D();
    const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    const getSpeed = () => (speed === "slow" ? 0.001 : 0.002);
    // Safari: ctx.filter=blur no anda → se aplica blur por CSS al canvas.
    const isSafari =
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome");

    let w = 0;
    let h = 0;
    let nt = 0;
    let animId = 0;
    // Si no se pasa backgroundFill, se lee el fondo del contenedor → se adapta
    // solo a claro/oscuro (var(--bg-page)).
    let fill = backgroundFill || getComputedStyle(parent).backgroundColor || "#ffffff";

    const resize = () => {
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
      if (!isSafari) ctx.filter = `blur(${blur}px)`;
      fill = backgroundFill || getComputedStyle(parent).backgroundColor || "#ffffff";
    };

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * amplitude;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = fill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animId = requestAnimationFrame(render);
    };

    resize();
    render();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    // Re-leer el fill al cambiar de tema (clase en <html>).
    const mo = new MutationObserver(resize);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      mo.disconnect();
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ filter: `blur(${blur}px)` }}
    />
  );
}
