"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { type Theme, themeStorageKey } from "@/lib/theme";

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(themeStorageKey, theme);
    document.cookie = `${themeStorageKey}=${theme};path=/;max-age=${THEME_COOKIE_MAX_AGE};samesite=lax`;
  } catch {}
}

export function ThemeProvider({
  children,
  initialTheme = "light",
}: {
  children: ReactNode;
  // Resuelto en el SERVER desde la cookie → el <html> ya llega con (o sin) la
  // clase `dark`, así el primer render de cliente coincide y React NO resetea la
  // clase al hidratar (esa era la causa del flash de tema oscuro→claro).
  initialTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Migración one-shot: usuarios previos guardaban el tema solo en localStorage.
  // Si no hay cookie todavía pero sí una preferencia guardada distinta a la que
  // resolvió el server, la adoptamos (una vez) y la cookie pasa a mandar.
  useEffect(() => {
    const hasCookie = document.cookie.includes(`${themeStorageKey}=`);
    if (hasCookie) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(themeStorageKey);
    } catch {}
    if ((stored === "light" || stored === "dark") && stored !== initialTheme) {
      setTheme(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refleja el tema en <html class>, localStorage y cookie ante cada cambio.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
