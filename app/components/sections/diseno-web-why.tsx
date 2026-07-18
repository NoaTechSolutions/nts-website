"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "POR QUÉ ELEGIRNOS" · diferenciadores de DISEÑO WEB.
// Efecto: MacBook Scroll (Aceternity, recreado en ui/macbook-scroll.tsx).
// Dentro de la pantalla va nuestra "web" de fondo claro: logo original a color +
// los 4 diferenciadores como mini-cards. Llena EXACTO la pantalla. Título fijo.
// ═══════════════════════════════════════════════════════════
import { motion } from "motion/react";
import { PenTool, Zap, Users, LifeBuoy, type LucideIcon } from "lucide-react";
import { useLanguage } from "../language-provider";
import { GradientBadge } from "../ui/gradient-badge";
import { MacbookScroll } from "../ui/macbook-scroll";
import { Highlighter } from "../ui/highlighter";

const COPY = {
  es: {
    eyebrow: "Por qué elegirnos",
    titleLine1: "Tu esencia, nuestra estrategia:",
    titleLine2: "Una Web Que Te Representa",
    screenEyebrow: "¿Por qué elegirnos?",
    tagline: "Diseño web que convierte visitas en clientes.",
    points: [
      { title: "Única, como tu marca", copy: "Sin plantillas: una web que se siente 100% tuya." },
      { title: "Te encuentran en Google", copy: "Carga en segundos y apareces donde te buscan." },
      { title: "Hablas con quien la crea", copy: "Trato directo, humano y sin intermediarios." },
      { title: "Nunca te dejamos solo", copy: "Te acompañamos y mejoramos tu web tras lanzar." },
    ],
  },
  en: {
    eyebrow: "Why choose us",
    titleLine1: "Your essence, our strategy:",
    titleLine2: "A Website That Represents You",
    screenEyebrow: "Why choose us?",
    tagline: "Web design that turns visitors into customers.",
    points: [
      { title: "Unique, like your brand", copy: "No templates — a site that feels 100% yours." },
      { title: "Found on Google", copy: "Loads in seconds and shows up where they search." },
      { title: "Talk to who builds it", copy: "Direct, human, no middlemen." },
      { title: "Never left alone", copy: "We support and improve your site after launch." },
    ],
  },
} as const;

type Copy = (typeof COPY)[keyof typeof COPY];

const ICONS: LucideIcon[] = [PenTool, Zap, Users, LifeBuoy];
const ACCENTS = ["#05a5ff", "#ff9900", "#a06bff", "#28c840"] as const;

export function DisenoWebWhy() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  return (
    <section className="relative w-full">
      <MacbookScroll
        title={
          <>
            <span className="block text-center">
              <GradientBadge icon="star">{t.eyebrow}</GradientBadge>
            </span>
            <span className="mt-3 block">{t.titleLine1}</span>
            <span className="mt-1.5 block">
              <Highlighter action="underline" color="#ff9900" strokeWidth={3.5} padding={3} isView>
                {t.titleLine2}
              </Highlighter>
            </span>
          </>
        }
      >
        <ScreenContent t={t} />
      </MacbookScroll>
    </section>
  );
}

// Contenido DENTRO de la pantalla: una web de fondo claro que llena todo.
function ScreenContent({ t }: { t: Copy }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#eef2f9]">
      {/* Barra de browser */}
      <div className="flex items-center gap-1.5 bg-[#dde3ee] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex flex-1 items-center gap-1 rounded-md bg-white px-2 py-1 text-[9px] font-medium text-[#5a6b8c]">
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#28c840]">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          noatechsolutions.com
        </div>
      </div>

      {/* Cuerpo claro que ocupa el resto (compacto → entra completo) */}
      <div className="relative flex flex-1 flex-col justify-center gap-1.5 px-6 py-2">
        {/* adornos suaves */}
        <motion.div
          aria-hidden
          className="absolute -right-8 -top-4 h-24 w-24 rounded-full bg-[#05a5ff]/15 blur-3xl"
          animate={{ x: [0, -14, 0], y: [0, 10, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -left-8 bottom-[-1.5rem] h-20 w-20 rounded-full bg-[#ff9900]/15 blur-3xl"
          animate={{ x: [0, 12, 0], y: [0, -8, 0], scale: [1, 1.16, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo NTS original a color */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/noatechsolutions-logo-full.svg"
          alt="NoaTechSolutions"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-11 w-auto object-contain"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative max-w-[92%] text-[12px] font-semibold leading-snug text-[#022977]"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {t.tagline}
        </motion.p>

        {/* Mini-cards + cursor que recorre cada una con zoom/hover */}
        <div className="relative mt-0.5 grid grid-cols-2 gap-1.5">
          {t.points.map((p, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            const hover = {
              duration: 1,
              ease: "easeInOut" as const,
              repeat: Infinity,
              repeatDelay: 3.8,
              delay: 1 + i * 1.2,
            };
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 8, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-6% 0px" }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              >
                {/* capa de zoom/hover en loop (como si el cursor pasara) */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={hover}
                  style={{ willChange: "transform" }}
                  className="relative overflow-hidden rounded-xl border border-[#022977]/10 bg-white p-2.5 shadow-[0_5px_14px_rgba(2,41,119,0.08)]"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                  />
                  {/* borde de resalte cuando el cursor pasa */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{ boxShadow: `inset 0 0 0 2px ${accent}` }}
                    animate={{ opacity: [0, 0.75, 0] }}
                    transition={hover}
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 flex-none items-center justify-center rounded-lg"
                      style={{ background: `${accent}1f`, color: accent }}
                    >
                      <Icon size={15} strokeWidth={2.3} />
                    </span>
                    <p className="text-[11px] font-bold leading-tight text-[#022977]">{p.title}</p>
                  </div>
                  <p className="mt-1 text-[8px] leading-snug text-[#5a6b8c]">{p.copy}</p>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Cursor que recorre las 4 cards en secuencia */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute z-20"
            animate={{
              left: ["26%", "76%", "26%", "76%", "26%"],
              top: ["32%", "32%", "82%", "82%", "32%"],
            }}
            transition={{
              duration: 4.8,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: Infinity,
              delay: 1,
            }}
          >
            <CursorIcon />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CursorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" className="drop-shadow-md">
      <path
        d="M3 2 L3 18 L7.2 14 L10 20 L12.4 19 L9.6 13.2 L15 13 Z"
        fill="#ffffff"
        stroke="#022977"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
