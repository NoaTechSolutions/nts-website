"use client";

// SECCIÓN 4 · Qué incluye tu web (grid BENTO). Value prop / entregables.
import { useLanguage } from "../language-provider";
import { FlipWords } from "@/components/ui/flip-words";
import { DesignCanvasBg } from "../ui/design-canvas-bg";
import { CargaRapidaBg } from "../ui/carga-rapida-bg";
import { ResponsiveBg } from "../ui/responsive-bg";
import { SeoBg } from "../ui/seo-bg";
import { AutogestionableBg } from "../ui/autogestionable-bg";
import { SecureHostingBg } from "../ui/secure-hosting-bg";

const COPY = {
  es: {
    eyebrow: "Todo incluido",
    titleLead1: "Nos ocupamos de todo:",
    titleLead2: "tu web completa que",
    titleLead3: "impulsa tu",
    titleWords: ["negocio", "marca", "proyecto", "idea", "futuro"],
    titleAria: "Nos ocupamos de todo: tu web completa que impulsa tu negocio",
    copy: "No solo diseño. Nos encargamos de todo —velocidad, SEO, seguridad y hosting— para darte una web profesional y completa, lista para convertir visitas en clientes.",
    included: "Incluido",
    cards: [
      { icon: "🎨", title: "Diseño a medida", copy: "Nada de plantillas. Cada pixel pensado para tu marca y tu público.", span: "md:col-span-2 md:row-span-2" },
      { icon: "⚡", title: "Carga ultra-rápida", copy: "Optimizada para <2s. Más velocidad = más conversión.", span: "" },
      { icon: "📱", title: "100% responsive", copy: "Impecable en teléfono, tablet y desktop.", span: "" },
      { icon: "🔍", title: "SEO técnico", copy: "Estructura pensada para rankear en Google desde el día uno.", span: "md:col-span-2" },
      { icon: "🛠️", title: "Autogestionable", copy: "Editá tu contenido sin depender de nadie (CMS).", span: "" },
      { icon: "🔒", title: "Segura y con hosting", copy: "SSL, backups y mantenimiento incluidos.", span: "" },
    ],
  },
  en: {
    eyebrow: "Everything included",
    titleLead1: "We handle everything:",
    titleLead2: "a complete website that",
    titleLead3: "powers your",
    titleWords: ["business", "brand", "project", "growth", "vision"],
    titleAria: "We handle everything: a complete website that powers your business",
    copy: "Not just design. We handle everything —speed, SEO, security and hosting— to give you a professional, complete website ready to turn visitors into customers.",
    included: "Included",
    cards: [
      { icon: "🎨", title: "Custom design", copy: "No templates. Every pixel built for your brand and audience.", span: "md:col-span-2 md:row-span-2" },
      { icon: "⚡", title: "Ultra-fast load", copy: "Optimized for <2s. More speed = more conversion.", span: "" },
      { icon: "📱", title: "100% responsive", copy: "Flawless on phone, tablet and desktop.", span: "" },
      { icon: "🔍", title: "Technical SEO", copy: "Built to rank on Google from day one.", span: "md:col-span-2" },
      { icon: "🛠️", title: "Self-manageable", copy: "Edit your content without depending on anyone (CMS).", span: "" },
      { icon: "🔒", title: "Secure + hosting", copy: "SSL, backups and maintenance included.", span: "" },
    ],
  },
} as const;

export function DisenoWebIncludes() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="section-title dw-includes-title mx-auto mt-3 text-center">
            <span className="block">{t.titleLead1} {t.titleLead2}</span>
            <span className="block">
              {t.titleLead3}{" "}
              <span className="dw-flip-shell" aria-live="polite">
                <span className="sr-only">{t.titleAria}</span>
                <FlipWords words={[...t.titleWords]} duration={2300} className="dw-flip-word" />
              </span>
            </span>
          </h2>
          <p className="section-copy dw-includes-copy max-w-2xl">{t.copy}</p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-4 sm:auto-rows-[minmax(11rem,auto)] sm:grid-cols-2 md:grid-cols-4">
          {t.cards.map((c) => {
            // Card destacada (col-span-2 row-span-2) → lleva fondo animado.
            const isFeatured = c.span.includes("row-span-2");
            const isFast = c.icon === "⚡";
            const isResponsive = c.icon === "📱";
            const isSeo = c.icon === "🔍";
            const isCms = c.icon === "🛠️";
            const isSecure = c.icon === "🔒";
            return (
            <div
              key={c.title}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#022977]/10 bg-white p-7 shadow-[0_10px_30px_rgba(2,41,119,0.06)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/4 ${c.span}`}
            >
              {isFeatured && <DesignCanvasBg />}
              {isFast && <CargaRapidaBg />}
              {isResponsive && <ResponsiveBg />}
              {isSeo && <SeoBg />}
              {isCms && <AutogestionableBg />}
              {isSecure && <SecureHostingBg />}
              {/* Glow de fondo: aparece al hover (contenido en overflow-hidden). */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#05a5ff]/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Texto abajo (mt-auto) — sin ícono emoji, el fondo animado y el
                  título llevan el peso visual. Se eleva al hover (desktop) para
                  dejar aparecer el CTA. La destacada: título más grande y acotado
                  a la izquierda (para no meterse debajo del mockup). */}
              <div
                className={`relative z-10 mt-auto transform-gpu transition-transform duration-300 md:group-hover:-translate-y-7 ${
                  isFeatured ? "md:max-w-[54%]" : ""
                }`}
              >
                <h3
                  className={`font-semibold text-[#022977] dark:text-white ${
                    isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                  }`}
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {c.title}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-[#022977]/65 dark:text-[#c8d8f0]/70 ${
                    isFeatured ? "text-base" : "text-sm"
                  }`}
                >
                  {c.copy}
                </p>
              </div>

              {/* CTA que se revela desde abajo (efecto bento) — píldora/badge. */}
              <div className="pointer-events-none absolute bottom-6 left-7 z-10 flex translate-y-4 items-center gap-1.5 rounded-full bg-[#1e63e6] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-[0_6px_16px_rgba(30,99,230,0.35)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.included}
              </div>

              {/* Overlay sutil al hover. */}
              <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-[#022977]/2 dark:group-hover:bg-white/3" />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
