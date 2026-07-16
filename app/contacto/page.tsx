import type { Metadata } from "next";
import { PlaceholderPage } from "../components/placeholder-page";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Empieza tu proyecto con NoaTechSolutions — contáctanos para consultas, cotizaciones o asesoría inicial gratis.",
};

export default function ContactoPage() {
  return <PlaceholderPage title="Contacto" />;
}
