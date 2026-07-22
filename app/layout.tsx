import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { localeStorageKey, resolveLocale } from "@/lib/i18n";
import { themeStorageKey } from "@/lib/theme";
import { LanguageProvider } from "./components/language-provider";
import { ThemeProvider } from "./components/theme-provider";
import { CrispChat } from "./components/crisp-chat";
import { LenisProvider } from "./components/lenis-provider";
import { GoogleAnalytics } from "./components/google-analytics";

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
    // canonical absoluto vía metadataBase. El sitio es bilingüe (es/en) pero
    // sirve AMBOS idiomas sobre la MISMA URL (locale resuelto server-side por
    // cookie/Accept-Language en este layout). NO existen URLs separadas
    // /es/ y /en/, así que NO se declara `languages` (hreflang): apuntar es y en
    // a la misma URL sería hreflang inválido/inútil y podría confundir a Google.
    // Si en el futuro se separan las URLs por idioma, acá va:
    //   languages: { es: "...", en: "...", "x-default": "..." }
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
    images: [
      {
        // Servida desde /public → resuelta absoluta con metadataBase.
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoaTechSolutions — Diseño web y software a medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoaTechSolutions",
    description:
      "Agencia digital con enfoque en diseño web, software a medida, SEO y marketing digital.",
    images: ["/og-image.png"],
  },
  // Verificación de Google Search Console (propiedad URL-prefix). El token es
  // PÚBLICO (se emite como <meta name="google-site-verification"> en el HTML),
  // no un secreto → va directo. La env var lo puede overridear sin tocar código.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "0DqPzNZm5rjBCFfZ5DCv5lM4rOJCDJZhXluZZVIzlpQ",
  },
  category: "marketing",
};

// JSON-LD Organization: datos estructurados globales del sitio. Datos
// hardcodeados/estáticos → seguro para dangerouslySetInnerHTML (sin input de
// usuario, sin riesgo XSS). Complementa el ProfessionalService de la home.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NoaTechSolutions",
  url: "https://noatechsolutions.com",
  logo: "https://noatechsolutions.com/og-image.png",
  description:
    "Agencia digital especializada en diseño web, software a medida, SEO y marketing digital.",
  areaServed: ["California, United States", "Baja California, Mexico"],
  knowsAbout: [
    "Diseño web",
    "Software a medida",
    "SEO",
    "Marketing digital",
    "Branding",
    "E-commerce",
  ],
  // Redes sociales: agregar las URLs reales cuando estén listas para reforzar
  // la entidad ante Google (Knowledge Graph). Placeholders comentados:
  // sameAs: [
  //   "https://www.facebook.com/...",
  //   "https://www.instagram.com/...",
  //   "https://www.linkedin.com/company/...",
  // ],
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@noatechsolutions.com",
    contactType: "customer support",
    availableLanguage: ["Spanish", "English"],
  },
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
  // Tema resuelto en el SERVER desde la cookie → el <html> ya llega con (o sin)
  // la clase `dark` desde el primer byte. Así se elimina el flash de tema
  // (antes el anti-FOUC agregaba `dark` en cliente y React lo reseteaba al
  // hidratar → parpadeo oscuro→claro). Default claro si no hay cookie.
  const initialTheme =
    cookieStore.get(themeStorageKey)?.value === "dark" ? "dark" : "light";

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth",
        spaceGrotesk.variable,
        initialTheme === "dark" && "dark",
      )}
    >
      <head>
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
        {/* Datos estructurados Organization (SEO / Knowledge Graph). Estático. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ThemeProvider initialTheme={initialTheme}>
          <LanguageProvider initialLocale={initialLocale}>
            <LenisProvider>{children}</LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
        <CrispChat />
        {/* GA4: solo renderiza si NEXT_PUBLIC_GA_ID está seteada. */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
