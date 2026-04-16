import type { Metadata } from "next";
import { PlaceholderPage } from "../components/placeholder-page";

export const metadata: Metadata = {
  title: "Portafolio de Proyectos",
  description:
    "Casos de estudio y proyectos destacados de NoaTechSolutions — diseño web, branding y soluciones digitales.",
};

export default function PortafolioPage() {
  return <PlaceholderPage title="Portafolio de Proyectos" />;
}
