import type { Metadata } from "next";
import { DisenoWebClient } from "./diseno-web-client";

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

// Server component: solo metadata + JSON-LD (SEO). La composición visual y el
// code-splitting de secciones viven en el client wrapper (dynamic + ssr:false
// no está permitido en server components).
export default function DisenoWebPage() {
  return (
    <main className="page-shell dw-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DisenoWebClient />
    </main>
  );
}
