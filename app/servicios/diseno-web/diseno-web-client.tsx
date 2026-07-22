"use client";

import dynamic from "next/dynamic";
import { MobileSpeedDial } from "@/app/components/mobile-speed-dial";
import { NavSettingsGear } from "@/app/components/ui/resizable-navbar";
import { ResizableNavbarDemo } from "@/app/components/resizable-navbar-demo";
// Above/near the fold → estáticas (se hidratan de una con el hero).
import { DisenoWebHero } from "@/app/components/sections/diseno-web-hero";
import { DisenoWebTrust } from "@/app/components/sections/diseno-web-trust";

// Below-the-fold → code-split (patrón de app/page.tsx). Chunks aparte que no
// bloquean la hidratación del hero. Saca del bundle inicial a los pesados:
// GSAP+Flip+ScrollTrigger (gallery) y MacbookScroll (why). Placeholder con
// min-height para acotar el CLS. #99
const holder = (h: string) => {
  const Holder = () => <div aria-hidden style={{ minHeight: h }} />;
  Holder.displayName = "SectionPlaceholder";
  return Holder;
};
const DisenoWebProblem = dynamic(() => import("@/app/components/sections/diseno-web-problem").then((m) => m.DisenoWebProblem), { loading: holder("80vh"), ssr: false });
const DisenoWebIncludes = dynamic(() => import("@/app/components/sections/diseno-web-includes").then((m) => m.DisenoWebIncludes), { loading: holder("80vh"), ssr: false });
const ProcessSection = dynamic(() => import("@/app/components/sections/process-section").then((m) => m.ProcessSection), { loading: holder("80vh"), ssr: false });
const DisenoWebShowcase = dynamic(() => import("@/app/components/sections/diseno-web-showcase").then((m) => m.DisenoWebShowcase), { loading: holder("80vh"), ssr: false });
const DisenoWebGallery = dynamic(() => import("@/app/components/sections/diseno-web-gallery").then((m) => m.DisenoWebGallery), { loading: holder("100vh"), ssr: false });
const DisenoWebWhy = dynamic(() => import("@/app/components/sections/diseno-web-why").then((m) => m.DisenoWebWhy), { loading: holder("100vh"), ssr: false });
const TestimonialsSection = dynamic(() => import("@/app/components/sections/testimonials-section").then((m) => m.TestimonialsSection), { loading: holder("70vh"), ssr: false });
const DisenoWebCta = dynamic(() => import("@/app/components/sections/diseno-web-cta").then((m) => m.DisenoWebCta), { loading: holder("60vh"), ssr: false });
const FaqSection = dynamic(() => import("@/app/components/sections/faq-section").then((m) => m.FaqSection), { loading: holder("70vh"), ssr: false });
const ContactSection = dynamic(() => import("@/app/components/sections/contact-section").then((m) => m.ContactSection), { loading: holder("70vh"), ssr: false });
const FooterSection = dynamic(() => import("@/app/components/sections/footer-section").then((m) => m.FooterSection), { loading: holder("40vh"), ssr: false });

export function DisenoWebClient() {
  return (
    <>
      {/* Controles idioma/tema (mismos que la home): FAB en mobile + engranaje en
          desktop. `is-entered` fijo → visibles ya (esta página no tiene la entrada
          del hero que dispara el fade del gear en la home). El idioma persiste vía
          localStorage (LanguageProvider en el layout raíz). */}
      <MobileSpeedDial />
      <div className="page-settings-gear is-entered">
        <NavSettingsGear />
      </div>

      <ResizableNavbarDemo />

      {/* ── 1. HERO ── */}
      <DisenoWebHero />

      {/* ── 2. BARRA DE CONFIANZA ── */}
      <DisenoWebTrust />

      {/* ── 3. PROBLEMA ── */}
      <DisenoWebProblem />

      {/* ── 4. QUÉ INCLUYE (bento) ── */}
      <DisenoWebIncludes />

      {/* ── 5. PROCESO ── */}
      <div className="grid-shell">
        <ProcessSection />
      </div>

      {/* ── 6a. ANTES / DESPUÉS ── */}
      <DisenoWebShowcase />

      {/* ── 6b. PORTFOLIO WEB · galería bento → fullscreen (GSAP Flip) ── */}
      <DisenoWebGallery />

      {/* ── 7. POR QUÉ NOATECH ── */}
      <DisenoWebWhy />

      {/* ── 8. TESTIMONIOS ── */}
      <div className="grid-shell">
        <TestimonialsSection />
      </div>

      {/* ── 9. CTA FINAL · SVG mask effect (dolor → solución) ── */}
      <DisenoWebCta />

      {/* ── 10. FAQ ── */}
      <FaqSection variant="diseno-web" />

      {/* ── 11. CONTACTO ── */}
      <ContactSection />

      {/* ── 12. FOOTER ── */}
      <FooterSection />
    </>
  );
}
