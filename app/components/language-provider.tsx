"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultLocale, localeStorageKey, type Locale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

// Un año. La cookie es la fuente de verdad que lee el SERVER en cada request
// para SSR el idioma correcto (sin flip en cliente → sin penalización de LCP).
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function persistLocale(locale: Locale) {
  document.documentElement.lang = locale;
  window.localStorage.setItem(localeStorageKey, locale);
  document.cookie = `${localeStorageKey}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  // Resuelto en el server (cookie → Accept-Language). El primer render de
  // cliente y servidor coinciden en este valor → sin hydration mismatch.
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Migración one-shot: usuarios previos a este cambio guardaban su preferencia
  // solo en localStorage. Si no tienen cookie todavía pero sí un valor en
  // localStorage distinto al que resolvió el server, lo adoptamos (una vez) y
  // la cookie pasa a mandar de acá en adelante.
  useEffect(() => {
    const hasCookie = document.cookie.includes(`${localeStorageKey}=`);
    if (hasCookie) return;
    const stored = window.localStorage.getItem(localeStorageKey);
    if ((stored === "es" || stored === "en") && stored !== initialLocale) {
      setLocaleState(stored);
    }
    // Solo al montar: es una migración puntual, no una detección recurrente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refleja el locale en <html lang>, localStorage y cookie ante cada cambio.
  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
