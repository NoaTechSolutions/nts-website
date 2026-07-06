import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "./components/language-provider";
import { ThemeProvider } from "./components/theme-provider";
import { PageLoader } from "./components/page-loader";
import { CrispChat } from "./components/crisp-chat";
import { LenisProvider } from "./components/lenis-provider";

const ANTI_FOUC = `(function(){try{var t=localStorage.getItem('ntssign-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500"],
});

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
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth",
        spaceGrotesk.variable,
      )}
    >
      <head>
        {/* Anti-FOUC: aplica clase dark ANTES de que React hidrate */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-[var(--bg-page)] text-[var(--color-navy)] antialiased"
      >
        <PageLoader />
        <ThemeProvider>
          <LanguageProvider>
            <LenisProvider>{children}</LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
        <CrispChat />
      </body>
    </html>
  );
}
