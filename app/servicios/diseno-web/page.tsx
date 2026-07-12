import type { Metadata } from "next";
import { ResizableNavbarDemo } from "@/app/components/resizable-navbar-demo";
import { DisenoWebHero } from "@/app/components/sections/diseno-web-hero";
import { DisenoWebTrust } from "@/app/components/sections/diseno-web-trust";
import { DisenoWebProblem } from "@/app/components/sections/diseno-web-problem";
import { DisenoWebIncludes } from "@/app/components/sections/diseno-web-includes";
import { DisenoWebShowcase } from "@/app/components/sections/diseno-web-showcase";
import { DisenoWebWhy } from "@/app/components/sections/diseno-web-why";
import { DisenoWebGallery } from "@/app/components/sections/diseno-web-gallery";
import { ProcessSection } from "@/app/components/sections/process-section";
import { TestimonialsSection } from "@/app/components/sections/testimonials-section";
import { DisenoWebCta } from "@/app/components/sections/diseno-web-cta";
import { FaqSection } from "@/app/components/sections/faq-section";
import { ContactSection } from "@/app/components/sections/contact-section";
import { FooterSection } from "@/app/components/sections/footer-section";

export const metadata: Metadata = {
  title: "Diseño Web a Medida | NoaTechSolutions",
  description:
    "Diseñamos y desarrollamos sitios web rápidos, a medida y pensados para convertir visitas en clientes. Diseño web profesional que hace crecer tu negocio.",
  alternates: { canonical: "/servicios/diseno-web" },
  openGraph: {
    title: "Diseño Web a Medida | NoaTechSolutions",
    description:
      "Sitios web rápidos, a medida y pensados para convertir. Diseño web profesional que hace crecer tu negocio.",
    url: "https://noatechsolutions.com/servicios/diseno-web",
    type: "website",
  },
};

// Service JSON-LD (patrón de app/page.tsx). Estático en ES (canónico) para SEO.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Diseño Web",
  name: "Diseño Web a Medida",
  description:
    "Diseño y desarrollo de sitios web rápidos, a medida y optimizados para convertir visitas en clientes.",
  provider: {
    "@type": "ProfessionalService",
    name: "NoaTechSolutions",
    url: "https://noatechsolutions.com",
  },
  areaServed: ["California, United States", "Baja California, Mexico"],
  url: "https://noatechsolutions.com/servicios/diseno-web",
};

export default function DisenoWebPage() {
  return (
    <main className="page-shell dw-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
      <div id="portfolio">
        <DisenoWebGallery />
      </div>

      {/* ── 7. POR QUÉ NOATECH ── */}
      <DisenoWebWhy />

      {/* ── 8. TESTIMONIOS ── */}
      <div className="grid-shell">
        <TestimonialsSection />
      </div>

      {/* ── 9. CTA FINAL · SVG mask effect (dolor → solución) ── */}
      <DisenoWebCta />

      {/* ── 10. FAQ ── */}
      <FaqSection />

      {/* ── 11. CONTACTO ── */}
      <ContactSection />

      {/* ── 12. FOOTER ── */}
      <FooterSection />
    </main>
  );
}
