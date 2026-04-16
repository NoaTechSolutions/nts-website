import type { Metadata } from "next";
import { PlaceholderPage } from "../components/placeholder-page";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conocé al equipo y la filosofía de NoaTechSolutions — una agencia digital enfocada en resultados.",
};

export default function NosotrosPage() {
  return <PlaceholderPage title="Sobre Nosotros" />;
}
