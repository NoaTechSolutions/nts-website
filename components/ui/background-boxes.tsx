"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// PERF (TBT): esta grilla monta 50x30 = 1500 celdas. Antes cada fila y cada
// celda era un `motion.div` solo para un `whileHover` que cambiaba
// backgroundColor con `transition: { duration: 0 }` — es decir, NI SIQUIERA
// animaba: era un `:hover` de CSS pagando el costo de 1550 componentes de
// Motion (suscripciones, hooks y listeners por celda). Ahora son divs planos y
// el hover es CSS puro. Fidelidad visual 1:1:
//   • entrada al hover instantánea  → `hover:duration-0`
//   • salida del hover con fade 2s  → `transition-colors duration-[2000ms]`
//     (equivalente al `animate={{ transition: { duration: 2 } }}` anterior)
//   • color aleatorio POR CELDA, fijado en render igual que antes, pasado como
//     custom property `--hover-color` y leído por `hover:bg-[color:var(...)]`.

export const BoxesCore = ({
  className,
  ...rest
}: { className?: string }) => {
  const rows = new Array(50).fill(1);
  const cols = new Array(30).fill(1);

  const cellRefs = useRef<Map<string, HTMLElement>>(new Map());

  const colors = [
    "rgba(4,0,240,0.7)",
    "rgba(5,165,255,0.7)",
    "rgba(255,153,0,0.8)",
    "rgba(2,41,119,0.8)",
    "rgba(4,0,240,0.4)",
    "rgba(5,165,255,0.4)",
    "rgba(255,153,0,0.4)",
    "rgba(255,255,255,0.12)",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const isTouchDevice =
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(max-width: 1023px)").matches;

    if (!isTouchDevice) return;

    const totalCells = rows.length * cols.length;

    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        const row = Math.floor(randomIndex / cols.length);
        const col = randomIndex % cols.length;
        const key = `${row}-${col}`;
        const el = cellRefs.current.get(key);
        if (!el) continue;

        const color = getRandomColor();
        el.style.backgroundColor = color;
        el.style.transition = "background-color 0.2s ease-in";

        setTimeout(() => {
          if (el) {
            el.style.transition = "background-color 1.2s ease-out";
            el.style.backgroundColor = "";
          }
        }, 1500);
      }
    }, 200);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{}}
      className={cn(
        "absolute inset-0 flex flex-wrap z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className="w-8 h-8 border-l border-[rgba(255,255,255,0.06)] relative"
        >
          {cols.map((_, j) => (
            <div
              ref={(el) => {
                if (el) {
                  cellRefs.current.set(`${i}-${j}`, el as HTMLElement);
                }
              }}
              key={`col` + j}
              style={
                { "--hover-color": getRandomColor() } as React.CSSProperties
              }
              className="w-8 h-8 border-r border-t border-[rgba(255,255,255,0.06)] relative bg-[rgba(255,255,255,0.02)] transition-colors duration-2000 hover:duration-0 hover:bg-(--hover-color)"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-[rgba(255,255,255,0.06)] stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
