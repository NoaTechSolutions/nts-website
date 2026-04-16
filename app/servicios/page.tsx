import type { Metadata } from "next";
import { PlaceholderPage } from "../components/placeholder-page";

export const metadata: Metadata = {
  title: "Nuestros Servicios",
  description:
    "Diseño web, SEO, branding y marketing digital — servicios de NoaTechSolutions para hacer crecer tu marca.",
};

export default function ServiciosPage() {
  return <PlaceholderPage title="Nuestros Servicios" />;
}
