import type { Metadata } from "next";
import { PortafolioPageClient } from "./portafolio-page-client";

export const metadata: Metadata = {
  title: "Portafolio de Proyectos",
  description:
    "Portafolio de NoaTechSolutions con trabajos reales de diseño web y presencia digital.",
};

export default function PortafolioPage() {
  return <PortafolioPageClient />;
}
