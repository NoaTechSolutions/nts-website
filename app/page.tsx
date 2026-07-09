"use client";

import { useCallback, useEffect, useState } from "react";
import { MobileSpeedDial } from "./components/mobile-speed-dial";
import { NavSettingsGear } from "./components/ui/resizable-navbar";
import { useLanguage } from "./components/language-provider";
import { translations } from "@/lib/i18n";
import { HeaderSection } from "./components/sections/header-section";
import { ProblemsSection } from "./components/sections/problems-section";
import { ServicesSection } from "./components/sections/services-section";
import { MidCtaSection } from "./components/sections/mid-cta-section";
import { ProcessSection } from "./components/sections/process-section";
import { PortfolioSection } from "./components/sections/portfolio-section";
import { TestimonialsSection } from "./components/sections/testimonials-section";
import { FinalCtaSection } from "./components/sections/final-cta-section";
import { FaqSection } from "./components/sections/faq-section";
import { ContactSection } from "./components/sections/contact-section";
import { FooterSection } from "./components/sections/footer-section";

// Red-net: si el robot 3D no dispara onReady (red lenta o 1.3MB del scene
// tardando), revelamos el hero igual pasado este tiempo. Mantenerlo corto
// protege el LCP (el título del hero no espera indefinidamente al robot).
const ENTRANCE_FALLBACK_MS = 2200;

export default function Home() {
  const { locale } = useLanguage();
  const t = translations[locale];

  // Estado de entrada compartido entre el hero (HeaderSection) y el gear de
  // config (hermanos) → vive en el padre común. Lo dispara la carga del robot.
  const [heroEntered, setHeroEntered] = useState(false);
  const revealHero = useCallback(() => setHeroEntered(true), []);

  useEffect(() => {
    if (heroEntered) return;
    const fallback = window.setTimeout(revealHero, ENTRANCE_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [heroEntered, revealHero]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NoaTechSolutions",
    url: "https://noatechsolutions.com",
    description: t.jsonLd.description,
    areaServed: ["California, United States", "Baja California, Mexico"],
    serviceType: t.jsonLd.serviceType,
  };

  return (
    <main className="page-shell" onContextMenu={(event) => event.preventDefault()}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />
      <MobileSpeedDial />
      <div className={`page-settings-gear${heroEntered ? " is-entered" : ""}`}>
        <NavSettingsGear />
      </div>

      {/* ── 1. HEADER ── */}
      <HeaderSection entered={heroEntered} onReveal={revealHero} />

      {/* ── 2. PROBLEMAS ── */}
      <ProblemsSection />

      {/* Spacer: permite que el fixed frame de Problemas se desenganche antes de la siguiente sección */}
      <div aria-hidden="true" style={{ height: "4rem" }} />

      {/* ── 3. SERVICIOS ── */}
      <div id="servicios">
        <ServicesSection />
      </div>

      {/* ── 4. CTA 1 ── */}
      <MidCtaSection />

      {/* ── 5. PROCEDIMIENTO ── */}
      <div id="proceso" className="grid-shell">
        <ProcessSection />
      </div>

      {/* ── 6. PORTFOLIO ── */}
      <PortfolioSection />

      {/* ── 7. TESTIMONIOS ── */}
      <div id="reviews" className="grid-shell">
        <TestimonialsSection />
      </div>

      {/* ── 8. CTA 2 ── */}
      <FinalCtaSection />

      {/* ── 9. FAQ ── */}
      <FaqSection />

      {/* ── 10. CONTACT ── */}
      <ContactSection />

      {/* ── 11. FOOTER ── */}
      <FooterSection />
    </main>
  );
}
