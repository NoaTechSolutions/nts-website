"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MobileSpeedDial } from "./components/mobile-speed-dial";
import { NavSettingsGear } from "./components/ui/resizable-navbar";
import { useLanguage } from "./components/language-provider";
import { translations } from "@/lib/i18n";
// Above/near the fold → estáticas (se hidratan de una con el hero).
import { HeaderSection } from "./components/sections/header-section";
import { ProblemsSection } from "./components/sections/problems-section";

// Below-the-fold → code-split (chunks aparte, no bloquean la hidratación del
// hero → LCP más rápido). Placeholder con min-height para acotar el CLS. #99
const holder = (h: string) => {
  const Holder = () => <div aria-hidden style={{ minHeight: h }} />;
  Holder.displayName = "SectionPlaceholder";
  return Holder;
};
const ServicesSection = dynamic(() => import("./components/sections/services-section").then((m) => m.ServicesSection), { loading: holder("80vh"), ssr: false });
const MidCtaSection = dynamic(() => import("./components/sections/mid-cta-section").then((m) => m.MidCtaSection), { loading: holder("40vh"), ssr: false });
const ProcessSection = dynamic(() => import("./components/sections/process-section").then((m) => m.ProcessSection), { loading: holder("80vh"), ssr: false });
const PortfolioSection = dynamic(() => import("./components/sections/portfolio-section").then((m) => m.PortfolioSection), { loading: holder("80vh"), ssr: false });
const TestimonialsSection = dynamic(() => import("./components/sections/testimonials-section").then((m) => m.TestimonialsSection), { loading: holder("70vh"), ssr: false });
const FinalCtaSection = dynamic(() => import("./components/sections/final-cta-section").then((m) => m.FinalCtaSection), { loading: holder("60vh"), ssr: false });
const FaqSection = dynamic(() => import("./components/sections/faq-section").then((m) => m.FaqSection), { loading: holder("70vh"), ssr: false });
const ContactSection = dynamic(() => import("./components/sections/contact-section").then((m) => m.ContactSection), { loading: holder("70vh"), ssr: false });
const FooterSection = dynamic(() => import("./components/sections/footer-section").then((m) => m.FooterSection), { loading: holder("40vh"), ssr: false });

export default function Home() {
  const { locale } = useLanguage();
  const t = translations[locale];

  // Estado de entrada compartido entre el hero (HeaderSection) y el gear de
  // config (hermanos) → vive en el padre común. Lo dispara la carga del robot.
  const [heroEntered, setHeroEntered] = useState(false);
  const revealHero = useCallback(() => setHeroEntered(true), []);

  // Disparamos la entrada del hero apenas hidrata (siguiente frame), SIN esperar
  // al robot 3D (1.3MB de Spline). El robot conserva su propia animación y
  // aparece cuando carga, sin frenar la cascada de badge/botones/stats. Antes
  // esto esperaba al robot (onReady) o a un fallback de 2.2s → el contenido
  // aparecía tarde. El navbar ya no depende de esto (entra por animación CSS).
  useEffect(() => {
    const id = window.requestAnimationFrame(revealHero);
    return () => window.cancelAnimationFrame(id);
  }, [revealHero]);

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
      <div className="grid-shell">
        <ProcessSection />
      </div>

      {/* ── 6. PORTFOLIO ── */}
      <PortfolioSection />

      {/* ── 7. TESTIMONIOS ── */}
      <div className="grid-shell">
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
