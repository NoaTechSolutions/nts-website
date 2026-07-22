import type { Metadata } from "next";
import { BrandingClient } from "./branding-client";

export const metadata: Metadata = {
  title: "Branding e Identidad Visual | NoaTechSolutions",
  description:
    "Diseño de logo, identidad visual y manual de marca profesionales. Creamos marcas memorables y coherentes que hacen crecer tu negocio: del boceto a la realidad.",
  alternates: { canonical: "/servicios/branding" },
  openGraph: {
    title: "Branding e Identidad Visual | NoaTechSolutions",
    description:
      "Marcas memorables y coherentes, del boceto a la realidad. Logo, identidad visual y manual de marca profesionales.",
    url: "https://noatechsolutions.com/servicios/branding",
    type: "website",
  },
};

// Service JSON-LD (patrón de /servicios/diseno-web). Estático en ES (canónico).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Branding",
  name: "Branding e Identidad Visual",
  description:
    "Diseño de logo, identidad visual y manual de marca profesionales. Marcas memorables y coherentes en cada punto de contacto.",
  provider: {
    "@type": "ProfessionalService",
    name: "NoaTechSolutions",
    url: "https://noatechsolutions.com",
  },
  areaServed: ["California, United States", "Baja California, Mexico"],
  url: "https://noatechsolutions.com/servicios/branding",
};

// Server component: solo metadata + JSON-LD (SEO). La composición visual y el
// code-splitting/gating de secciones viven en el client wrapper.
export default function BrandingPage() {
  return (
    <main className="page-shell dw-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrandingClient />
    </main>
  );
}
