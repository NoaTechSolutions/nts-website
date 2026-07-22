"use client";

import dynamic from "next/dynamic";
import { LazyMount } from "@/app/components/lazy-mount";
import { MobileSpeedDial } from "@/app/components/mobile-speed-dial";
import { NavSettingsGear } from "@/app/components/ui/resizable-navbar";
import { ResizableNavbarDemo } from "@/app/components/resizable-navbar-demo";
// Above/near the fold → estáticas (se hidratan de una con el hero).
import { BrandingHero } from "@/app/components/sections/branding-hero";
import { BrandingTrust } from "@/app/components/sections/branding-trust";

// Below-the-fold → code-split + gating por viewport (LazyMount): el chunk de
// cada sección no se descarga ni ejecuta hasta que el usuario se acerca
// scrolleando (lección de performance del molde diseno-web, acá desde el día
// cero). Placeholder con min-height para acotar el CLS.
//
// EXCEPCIÓN — ContactSection y FooterSection van SIN LazyMount (solo dynamic):
// el hero linkea a `#contacto-form` y el target del anchor tiene que existir
// SIEMPRE en el DOM. Su JS es liviano; el tradeoff es correcto.
const holder = (h: string) => {
  const Holder = () => <div aria-hidden style={{ minHeight: h }} />;
  Holder.displayName = "SectionPlaceholder";
  return Holder;
};
const BrandingSketch = dynamic(() => import("@/app/components/sections/branding-sketch").then((m) => m.BrandingSketch), { loading: holder("320vh"), ssr: false });
const BrandingIncludes = dynamic(() => import("@/app/components/sections/branding-includes").then((m) => m.BrandingIncludes), { loading: holder("80vh"), ssr: false });
const ProcessSection = dynamic(() => import("@/app/components/sections/process-section").then((m) => m.ProcessSection), { loading: holder("80vh"), ssr: false });
const BrandingCta = dynamic(() => import("@/app/components/sections/branding-cta").then((m) => m.BrandingCta), { loading: holder("60vh"), ssr: false });
const TestimonialsSection = dynamic(() => import("@/app/components/sections/testimonials-section").then((m) => m.TestimonialsSection), { loading: holder("70vh"), ssr: false });
const FaqSection = dynamic(() => import("@/app/components/sections/faq-section").then((m) => m.FaqSection), { loading: holder("70vh"), ssr: false });
const ContactSection = dynamic(() => import("@/app/components/sections/contact-section").then((m) => m.ContactSection), { loading: holder("70vh"), ssr: false });
const FooterSection = dynamic(() => import("@/app/components/sections/footer-section").then((m) => m.FooterSection), { loading: holder("40vh"), ssr: false });

export function BrandingClient() {
  return (
    <>
      {/* Controles idioma/tema (mismos que las demás páginas de servicio). */}
      <MobileSpeedDial />
      <div className="page-settings-gear is-entered">
        <NavSettingsGear />
      </div>

      <ResizableNavbarDemo />

      {/* ── 1. HERO ── */}
      <BrandingHero />

      {/* ── 2. CONFIANZA (transparencia, sin métricas infladas) ── */}
      <BrandingTrust />

      {/* ── 3. DE BOCETO A REAL ⭐ (pieza central / diferenciador) ── */}
      <LazyMount minHeight="320vh">
        <BrandingSketch />
      </LazyMount>

      {/* ── 4. QUÉ INCLUYE (bento de entregables) ── */}
      <LazyMount minHeight="80vh">
        <BrandingIncludes />
      </LazyMount>

      {/* ── 5. PROCESO ── */}
      <LazyMount minHeight="80vh">
        <div className="grid-shell">
          <ProcessSection />
        </div>
      </LazyMount>

      {/* ── 6. CTA FINAL (navy) ── */}
      <LazyMount minHeight="60vh">
        <BrandingCta />
      </LazyMount>

      {/* ── 7. TESTIMONIOS ── */}
      <LazyMount minHeight="70vh">
        <div className="grid-shell">
          <TestimonialsSection />
        </div>
      </LazyMount>

      {/* ── 8. FAQ ── */}
      <LazyMount minHeight="70vh">
        <FaqSection variant="branding" />
      </LazyMount>

      {/* ── 9. CONTACTO · sin LazyMount: target del anchor #contacto-form ── */}
      <ContactSection />

      {/* ── 10. FOOTER · sin LazyMount: liviano, acompaña a contacto ── */}
      <FooterSection />
    </>
  );
}
