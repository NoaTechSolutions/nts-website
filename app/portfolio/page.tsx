import type { Metadata } from "next";
import { PortfolioPageClient } from "./portfolio-page-client";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Portfolio de NoaTechSolutions con trabajos reales de diseno web y presencia digital.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
