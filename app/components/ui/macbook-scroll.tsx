"use client";

// ═══════════════════════════════════════════════════════════
// Scroll reveal tipo Aceternity MacBook, con la secuencia pedida:
//   1) INICIO: laptop completa; la IMAGEN es la pantalla (16:9, ancha).
//   2) SCROLL: la tapa se abre (rotateX) y la imagen CRECE y SALE de la
//      pantalla hasta llenar la ventana (grow → ancho del viewport).
//   3) A la vez, el resto de la laptop (bisel + teclado) se DESVANECE → la
//      laptop desaparece y queda la imagen grande.
//   • PINNEADO (sticky) → el título queda fijo. Sin deps nuevas.
// ═══════════════════════════════════════════════════════════

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

const SCREEN_W = 512; // w-[32rem]

export function MacbookScroll({ title, children }: { title?: ReactNode; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Laptop COMPLETA visible al inicio (pantalla + teclado). Al scrollear la
  // imagen crece hasta llenar el ancho del viewport (growEnd) y la laptop se
  // desvanece.
  const [scale, setScale] = useState(1);
  const [growMax, setGrowMax] = useState(1.3);
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      // Cap en 1.0: la laptop NUNCA se agranda por CSS (evita el borroso del
      // upscaling). En teléfono se reduce más (factor + reserva de alto mayores)
      // para que no se desborde el borde superior de la laptop.
      const wF = mobile ? 0.82 : 0.9;
      const s = Math.max(0.4, Math.min((vw * wF) / SCREEN_W, (vh - (mobile ? 175 : 150)) / 645, 1));
      setScale(s);
      // Al crecer, la pantalla no debe pasar de este % del ancho (en teléfono
      // más margen para que no quede pegada a los bordes).
      const growW = mobile ? 0.86 : 0.96;
      setGrowMax(Math.min(1.3, (vw * growW) / (SCREEN_W * s)));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Desvanecido de la laptop por CSS (no motion/opacity persistente → evita el
  // "gris hasta scrollear" del layer will-change).
  const [fading, setFading] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setFading(v > 0.42));

  const rotate = useTransform(scrollYProgress, [0.05, 0.28], [-28, 0]);
  // Zoom MODERADO (1 → growMax): la imagen "sale" sin pixelarse ni desbordar
  // (growMax se limita por el ancho del viewport → no se sale en teléfono).
  const grow = useTransform(scrollYProgress, [0.3, 0.85], [1, growMax]);

  return (
    <div ref={ref} className="relative min-h-[340vh] w-full">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden py-8">
        {/* Título FIJO */}
        <div
          className="mb-8 max-w-2xl px-6 text-center text-2xl font-bold text-[#022977] md:mb-12 md:text-4xl dark:text-white"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {title}
        </div>

        <div
          style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
          className="relative flex flex-col items-center"
        >
          {/* PANTALLA (imagen 16:9) — perspectiva SOLO acá (para el rotateX).
              Bisagra abajo (origin bottom) → queda pegada al teclado. Al salir
              (fading) hace FLOATING (bob vertical). */}
          <div className="relative z-20 [perspective:1000px]">
            <motion.div
              style={{
                scaleX: grow,
                scaleY: grow,
                rotateX: rotate,
                transformOrigin: "bottom center",
              }}
              animate={fading ? { y: [64, 50, 64] } : { y: 0 }}
              transition={
                fading
                  ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4 }
              }
              className="relative z-10 h-72 w-[32rem] overflow-hidden rounded-2xl bg-[#05070d] shadow-[0_30px_80px_rgba(2,20,60,0.4)]"
            >
              <div className="absolute inset-0">{children}</div>
              {/* bisel negro (marco de la pantalla) que se desvanece al salir */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-2xl ring-[10px] ring-inset ring-[#0a0a0c] transition-opacity duration-500",
                  fading ? "opacity-0" : "opacity-100",
                )}
              />
            </motion.div>
          </div>

          {/* BASE (teclado) — ABSOLUTA bajo la pantalla → la pantalla queda
              CENTRADA al desvanecerse el teclado. Pegada (simula la laptop). */}
          <div
            className={cn(
              "absolute left-1/2 top-full z-0 h-[22rem] w-[32rem] -translate-x-1/2 -translate-y-[3px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#c4c9d1] to-[#8b909b] shadow-[0_24px_55px_rgba(0,0,0,0.45)] ring-1 ring-black/30 transition-opacity duration-500 dark:from-[#3a3a3d] dark:to-[#242427]",
              fading ? "opacity-0" : "opacity-100",
            )}
          >
            {/* filo superior con brillo (define el borde contra el fondo) */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
            <div className="relative h-10 w-full">
              <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
            </div>
            <div className="relative flex">
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
              <div className="mx-auto h-full w-[80%]">
                <Keypad />
              </div>
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
            </div>
            <Trackpad />
            <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Trackpad() {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl bg-gradient-to-b from-[#c9cdd4] to-[#aeb3bc] ring-1 ring-black/15"
      style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.14)" }}
    />
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

// ── Teclado (KBtn; iconos de tabler → texto/unicode) ──
function Keypad() {
  const FN = ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "⏻"];
  const NUM: [string, string][] = [["~", "`"], ["!", "1"], ["@", "2"], ["#", "3"], ["$", "4"], ["%", "5"], ["^", "6"], ["&", "7"], ["*", "8"], ["(", "9"], [")", "0"], ["—", "-"], ["+", "="]];
  const QWERTY = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const ASDF = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const ZXCV = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
      <Row>
        {FN.map((k, i) => (
          <KBtn key={i} className={i === 0 ? "w-10 justify-start pl-[4px]" : undefined}>
            {k}
          </KBtn>
        ))}
      </Row>
      <Row>
        {NUM.map(([a, b], i) => (
          <KBtn key={i}>
            <span className="block">{a}</span>
            <span className="block">{b}</span>
          </KBtn>
        ))}
        <KBtn className="w-10 justify-end pr-[4px]">delete</KBtn>
      </Row>
      <Row>
        <KBtn className="w-10 justify-start pl-[4px]">tab</KBtn>
        {QWERTY.map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn>
          <span className="block">{"{"}</span>
          <span className="block">{"["}</span>
        </KBtn>
        <KBtn>
          <span className="block">{"}"}</span>
          <span className="block">{"]"}</span>
        </KBtn>
        <KBtn>
          <span className="block">{"|"}</span>
          <span className="block">{"\\"}</span>
        </KBtn>
      </Row>
      <Row>
        <KBtn className="w-[2.8rem] justify-start pl-[4px]">caps</KBtn>
        {ASDF.map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn>
          <span className="block">{":"}</span>
          <span className="block">{";"}</span>
        </KBtn>
        <KBtn>
          <span className="block">{'"'}</span>
          <span className="block">{"'"}</span>
        </KBtn>
        <KBtn className="w-[2.85rem] justify-end pr-[4px]">return</KBtn>
      </Row>
      <Row>
        <KBtn className="w-[3.65rem] justify-start pl-[4px]">shift</KBtn>
        {ZXCV.map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn>
          <span className="block">{"<"}</span>
          <span className="block">{","}</span>
        </KBtn>
        <KBtn>
          <span className="block">{">"}</span>
          <span className="block">{"."}</span>
        </KBtn>
        <KBtn>
          <span className="block">{"?"}</span>
          <span className="block">{"/"}</span>
        </KBtn>
        <KBtn className="w-[3.65rem] justify-end pr-[4px]">shift</KBtn>
      </Row>
      <Row>
        <KBtn>fn</KBtn>
        <KBtn>⌃</KBtn>
        <KBtn>⌥</KBtn>
        <KBtn className="w-8">⌘</KBtn>
        <KBtn className="w-[8.2rem]"> </KBtn>
        <KBtn className="w-8">⌘</KBtn>
        <KBtn>⌥</KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end p-[0.5px]">
          <KBtn className="h-3 w-6">▲</KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">◀</KBtn>
            <KBtn className="h-3 w-6">▼</KBtn>
            <KBtn className="h-3 w-6">▶</KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>;
}

function KBtn({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-[4px] bg-gradient-to-b from-[#2b2b30] to-[#161619] ring-1 ring-black/60",
        className,
      )}
      style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)" }}
    >
      <div className="flex w-full flex-col items-center justify-center text-[5px] text-[#c9ccd2]">
        {children}
      </div>
    </div>
  );
}
