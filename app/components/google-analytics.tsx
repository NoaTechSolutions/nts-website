"use client";

import Script from "next/script";

/**
 * Google Analytics 4 (GA4) loader.
 *
 * Se activa SOLO si existe la env var `NEXT_PUBLIC_GA_ID`. Si no está seteada,
 * el componente NO renderiza nada (return null) → no rompe ni agrega scripts
 * hasta que el usuario ponga su Measurement ID.
 *
 * SETUP: creá un `.env.local` (o variable en Vercel) con:
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 * (el prefijo NEXT_PUBLIC_ es obligatorio para exponerla al cliente).
 *
 * Usa strategy="afterInteractive" → carga tras la hidratación, sin bloquear
 * el LCP ni la interactividad inicial.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
