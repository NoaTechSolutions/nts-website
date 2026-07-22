"use client";

// ─────────────────────────────────────────────────────────────
// QUÉ INCLUYE · /servicios/branding. Grid bento de 6 entregables — la lista
// destilada del research de agencias top (Ramotion, Halo Lab, Clay): suite de
// logo, brand book, sistema color+tipo, papelería, kit social, motion.
// Iconos lucide (convención: sin emoji). Cards con hover lift sutil.
// ─────────────────────────────────────────────────────────────

import { motion } from "motion/react";
import {
  PenTool,
  BookOpen,
  Palette,
  Printer,
  Share2,
  Clapperboard,
} from "lucide-react";
import { useLanguage } from "../language-provider";

const ICONS = [PenTool, BookOpen, Palette, Printer, Share2, Clapperboard];

const COPY = {
  es: {
    eyebrow: "Qué incluye",
    title: "Todo lo que tu marca necesita",
    copy: "Sin piezas sueltas: un sistema completo y coherente, listo para usar desde el primer día. Y los archivos fuente son tuyos, siempre.",
    items: [
      {
        title: "Suite de logo completa",
        text: "Logo principal, variantes horizontales y verticales, isotipo y favicon. Para cada fondo y cada tamaño.",
      },
      {
        title: "Manual de marca",
        text: "Reglas claras de uso: espacios, tamaños mínimos, qué sí y qué no. Cualquiera podrá aplicar tu marca sin romperla.",
      },
      {
        title: "Color y tipografía",
        text: "Paleta con códigos exactos para pantalla e impresión, y tipografías con jerarquías definidas.",
      },
      {
        title: "Papelería y aplicaciones",
        text: "Tarjetas, hojas membretadas, firmas de email y las piezas impresas que tu negocio use a diario.",
      },
      {
        title: "Kit para redes sociales",
        text: "Plantillas de posts e historias, foto de perfil y portadas. Tu feed coherente sin diseñador de guardia.",
      },
      {
        title: "Animación de logo",
        text: "Tu marca en movimiento para videos, reels e intros. El detalle que separa lo profesional de lo casero.",
      },
    ],
  },
  en: {
    eyebrow: "What's included",
    title: "Everything your brand needs",
    copy: "No loose pieces: a complete, coherent system, ready to use from day one. And the source files are yours, always.",
    items: [
      {
        title: "Full logo suite",
        text: "Primary logo, horizontal and vertical variants, mark and favicon. For every background and every size.",
      },
      {
        title: "Brand guidelines",
        text: "Clear usage rules: spacing, minimum sizes, do's and don'ts. Anyone can apply your brand without breaking it.",
      },
      {
        title: "Color & typography",
        text: "A palette with exact codes for screen and print, and typefaces with defined hierarchies.",
      },
      {
        title: "Stationery & applications",
        text: "Business cards, letterheads, email signatures and the printed pieces your business uses daily.",
      },
      {
        title: "Social media kit",
        text: "Post and story templates, profile picture and covers. A consistent feed without a designer on call.",
      },
      {
        title: "Logo animation",
        text: "Your brand in motion for videos, reels and intros. The detail that separates professional from homemade.",
      },
    ],
  },
} as const;

export function BrandingIncludes() {
  const { locale } = useLanguage();
  const t = COPY[locale];

  return (
    <section className="section-space">
      <div className="grid-shell">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="section-title mt-3">{t.title}</h2>
        <p className="section-copy mt-4 max-w-2xl">{t.copy}</p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-6"
                style={{
                  borderColor: "var(--color-line)",
                  background: "var(--bg-card)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: "var(--bg-section)", color: "var(--color-sky)" }}
                >
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3
                  className="mt-4 text-lg"
                  style={{
                    color: "var(--text-heading, #022977)",
                    fontFamily: "var(--font-display-stack)",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h3>
                <p className="section-copy mt-2 text-[0.95rem]">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
