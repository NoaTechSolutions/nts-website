import type { Metadata } from "next";
import { PlaceholderPage } from "../components/placeholder-page";

export const metadata: Metadata = {
  title: "Blog & Recursos",
  description:
    "Artículos, guías y recursos sobre diseño web, SEO, marketing digital y estrategia de marca — NoaTechSolutions.",
};

export default function BlogPage() {
  return <PlaceholderPage title="Blog & Recursos" />;
}
