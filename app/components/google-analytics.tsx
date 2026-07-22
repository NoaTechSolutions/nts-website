"use client";

import Script from "next/script";

/**
 * Google Analytics 4 (GA4) loader.
 *
 * Measurement ID de la propiedad GA4 de NoaTechSolutions. Es un identificador
 * PÚBLICO (aparece en el HTML de cualquier página), no un secreto → va directo
 * en el código. La env var `NEXT_PUBLIC_GA_ID` lo puede overridear sin tocar
 * código (útil para una propiedad de staging distinta, por ejemplo).
 *
 * Si tanto la env como el fallback fueran vacíos, el componente NO renderiza
 * nada (return null) → no rompe.
 *
 * Usa strategy="afterInteractive" → carga tras la hidratación, sin bloquear
 * el LCP ni la interactividad inicial.
 */
const GA_MEASUREMENT_ID = "G-VSRWW1KE7Z";

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? GA_MEASUREMENT_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
