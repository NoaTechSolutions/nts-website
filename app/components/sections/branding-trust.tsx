"use client";

// ─────────────────────────────────────────────────────────────
// CONFIANZA · /servicios/branding. Franja temprana post-hero (patrón del
// research: prueba social inmediata). Decisión: NADA de métricas infladas —
// somos un estudio joven y no inventamos "120+ marcas". La confianza acá es
// TRANSPARENCIA: compromisos verificables que atacan el miedo a la "caja
// negra" creativa (el patrón de confianza más repetido en el research).
// ─────────────────────────────────────────────────────────────

import { motion } from "motion/react";
import { Eye, Clock3, RefreshCcw, FolderKey } from "lucide-react";
import { useLanguage } from "../language-provider";

const ICONS = [Eye, Clock3, RefreshCcw, FolderKey];

const COPY = {
  es: {
    items: [
      {
        title: "Sin caja negra",
        text: "Ves cada etapa del proceso, del primer boceto al arte final.",
      },
      {
        title: "Plazos claros",
        text: "Sabes qué recibes y cuándo, antes de empezar.",
      },
      {
        title: "Revisiones incluidas",
        text: "Rondas de ajustes definidas en cada etapa. Sin sorpresas.",
      },
      {
        title: "Los archivos son tuyos",
        text: "Fuentes editables y todos los formatos. Tu marca te pertenece.",
      },
    ],
  },
  en: {
    items: [
      {
        title: "No black box",
        text: "You see every stage of the process, from first sketch to final art.",
      },
      {
        title: "Clear timelines",
        text: "You know what you get and when, before we start.",
      },
      {
        title: "Revisions included",
        text: "Defined adjustment rounds at every stage. No surprises.",
      },
      {
        title: "The files are yours",
        text: "Editable sources and every format. Your brand belongs to you.",
      },
    ],
  },
} as const;

export function BrandingTrust() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  return (
    <section className="section-space" style={{ paddingBlock: "2rem" }}>
      <div className="grid-shell grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: "var(--color-line)", background: "var(--bg-card)" }}
            >
              <span
                className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--bg-section)", color: "var(--color-amber)" }}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h3
                  className="text-[0.98rem]"
                  style={{
                    color: "var(--text-heading, #022977)",
                    fontFamily: "var(--font-display-stack)",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h3>
                <p className="section-copy mt-0.5 text-[0.88rem] leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
