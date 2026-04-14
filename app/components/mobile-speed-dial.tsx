"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import { useTheme } from "./theme-provider";

export function MobileSpeedDial() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es");
  const isDark = theme === "dark";

  return (
    <div ref={rootRef} className="mobile-fab-root md:hidden">
      {/* Botón idioma */}
      <button
        type="button"
        aria-label="Cambiar idioma"
        onClick={() => {
          toggleLocale();
          setOpen(false);
        }}
        className={`mobile-fab-item mobile-fab-item-1 ${open ? "is-open" : ""}`}
      >
        <span className="text-sm font-medium uppercase tracking-wider">
          {locale === "es" ? "ES" : "EN"}
        </span>
      </button>

      {/* Botón tema */}
      <button
        type="button"
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        onClick={() => {
          toggleTheme();
          setOpen(false);
        }}
        className={`mobile-fab-item mobile-fab-item-2 ${open ? "is-open" : ""}`}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>

      {/* FAB principal */}
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`mobile-fab-main ${open ? "is-open" : ""}`}
      >
        <span className="mobile-fab-burger" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  );
}
