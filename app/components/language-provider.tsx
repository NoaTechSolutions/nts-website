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

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey);
  if (storedLocale === "es" || storedLocale === "en") {
    return storedLocale;
  }

  const browserLocale = window.navigator.language.toLowerCase();
  return browserLocale.startsWith("en") ? "en" : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectBrowserLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(localeStorageKey, locale);
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
