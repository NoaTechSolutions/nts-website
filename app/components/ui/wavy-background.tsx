"use client";

// Wavy Background (Aceternity · https://ui.aceternity.com/components/wavy-background)
// Adaptado a fondo-de-sección: el canvas LLENA su contenedor (parent relative),
// sin wrapper de children. Usa createNoise3D de simplex-noise (ya en deps).
//
// PERF (TBT): la versión original aplicaba `ctx.filter = blur()` — blur
// rasterizado por CPU sobre CADA draw en un canvas full-viewport, 60fps →
// long tasks permanentes (TBT de 7s en desktop). Ahora: (1) el blur va SOLO
// por CSS en el elemento (GPU, gratis — como ya hacía el fallback de Safari);
// (2) el canvas renderiza a media resolución y CSS lo estira (el blur de 11px
// esconde la diferencia por completo); (3) el rAF se pausa fuera de viewport
// y con la pestaña oculta; (4) con prefers-reduced-motion se dibuja UN frame
// estático y no hay loop.
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

// Resolución interna del canvas relativa al contenedor (0.5 = mitad de píxeles
// por eje → 1/4 del costo por frame). Invisible bajo blur(10px+).
const RES = 0.5;

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
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nt = 0;
    let animId = 0;
    let inView = true;
    let running = false;
    // Si no se pasa backgroundFill, se lee el fondo del contenedor → se adapta
    // solo a claro/oscuro (var(--bg-page)).
    let fill = backgroundFill || getComputedStyle(parent).backgroundColor || "#ffffff";

    const resize = () => {
      // Coordenadas lógicas a tamaño del contenedor; backing store a RES —
      // CSS estira el canvas de vuelta (h-full w-full) y el blur tapa todo.
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.round(w * RES));
      canvas.height = Math.max(1, Math.round(h * RES));
      ctx.setTransform(RES, 0, 0, RES, 0, 0);
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

    const paintFrame = () => {
      ctx.fillStyle = fill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
    };

    const render = () => {
      paintFrame();
      animId = requestAnimationFrame(render);
    };

    // Loop solo cuando el hero está en viewport Y la pestaña visible.
    const syncLoop = () => {
      const shouldRun = inView && !document.hidden && !reducedMotion;
      if (shouldRun && !running) {
        running = true;
        animId = requestAnimationFrame(render);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(animId);
      }
    };

    resize();
    if (reducedMotion) {
      paintFrame(); // un frame estático, sin loop
    } else {
      syncLoop();
    }

    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      syncLoop();
    });
    io.observe(parent);
    const onVisibility = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) paintFrame();
    });
    ro.observe(parent);
    // Re-leer el fill al cambiar de tema (clase en <html>).
    const mo = new MutationObserver(() => {
      resize();
      if (reducedMotion) paintFrame();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(animId);
      running = false;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
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
