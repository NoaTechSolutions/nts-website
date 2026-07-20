import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { localeStorageKey, resolveLocale } from "@/lib/i18n";
import { LanguageProvider } from "./components/language-provider";
import { ThemeProvider } from "./components/theme-provider";
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
    default:
      "Diseño web, software a medida y marketing digital | NoaTechSolutions",
    template: "%s | NoaTechSolutions",
  },
  description:
    "Agencia digital especializada en diseño web, software a medida, SEO y marketing digital. Hacemos que tu negocio se vea profesional y convierta más clientes.",
  keywords: [
    "diseño web profesional",
    "software a medida",
    "desarrollo de software a medida",
    "agencia de marketing digital",
    "agencia SEO",
    "desarrollo web",
    "branding digital",
    "e-commerce",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NoaTechSolutions | Diseño web y software a medida",
    description:
      "Diseño web, software a medida, SEO y marketing digital con una base estratégica, visual y técnica pensada para posicionar y convertir.",
    url: "https://noatechsolutions.com",
    siteName: "NoaTechSolutions",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoaTechSolutions",
    description:
      "Agencia digital con enfoque en diseño web, software a medida, SEO y marketing digital.",
  },
  category: "marketing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolvemos el idioma en el SERVER (cookie → Accept-Language) para SSR el
  // idioma correcto y evitar el flip en cliente que penalizaba el LCP del
  // usuario EN (~5.4s). Leer cookies()/headers() hace esta ruta dinámica.
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const initialLocale = resolveLocale(
    cookieStore.get(localeStorageKey)?.value,
    headerStore.get("accept-language"),
  );

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth",
        spaceGrotesk.variable,
      )}
    >
      <head>
        {/* Anti-FOUC: aplica clase dark ANTES de que React hidrate */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC }} />
        {/* NOTA: se quitó el preload de /spline/robot.splinecode (1.3MB). En 4G
            lenta saturaba la conexión (~10s), retrasaba CSS+JS de hidratación y
            disparaba el LCP a ~14s en mobile — donde el robot NI SE MONTA. El
            scene se baja solo cuando SplineScene se monta (desktop). Ver #90. */}
        {/* Sin JS no corre la entrada escalonada → mostramos el hero completo */}
        <noscript>
          <style>{`.hero-reveal>div:first-child,.hero-reveal .hero-badge,.hero-reveal .hero-title-showcase,.hero-reveal .hero-copy-showcase,.hero-reveal .hero-actions,.hero-reveal .hero-stats,.page-settings-gear{opacity:1!important;transform:none!important;filter:none!important;}`}</style>
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full bg-[var(--bg-page)] text-[var(--color-navy)] antialiased"
      >
        <ThemeProvider>
          <LanguageProvider initialLocale={initialLocale}>
            <LenisProvider>{children}</LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
        <CrispChat />
      </body>
    </html>
  );
}
