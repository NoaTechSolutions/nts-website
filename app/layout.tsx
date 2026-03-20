import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://noatechsolutions.com"),
  title: {
    default: "NoaTechSolutions | Agencia de marketing digital, SEO y diseno web",
    template: "%s | NoaTechSolutions",
  },
  description:
    "Agencia digital moderna especializada en diseno web, SEO y marketing digital para marcas que quieren crecer con una presencia clara, profesional y orientada a conversion.",
  keywords: [
    "agencia de marketing digital",
    "agencia SEO",
    "diseno web profesional",
    "desarrollo web",
    "branding digital",
    "agencia creativa",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NoaTechSolutions | Agencia digital moderna",
    description:
      "Diseno web, SEO y marketing digital con una base estrategica, visual y tecnica pensada para posicionar y convertir.",
    url: "https://noatechsolutions.com",
    siteName: "NoaTechSolutions",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoaTechSolutions",
    description:
      "Agencia digital moderna con enfoque en diseno web, SEO y marketing digital.",
  },
  category: "marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("h-full scroll-smooth", "font-sans", geist.variable)}>
      <body className="min-h-full bg-[var(--color-paper)] text-[var(--color-ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
