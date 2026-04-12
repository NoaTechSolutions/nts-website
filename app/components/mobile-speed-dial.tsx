"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import type { Locale } from "@/lib/i18n";

function TranslateIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`relative block h-6 w-6 transition-transform duration-300 ${
        open ? "scale-105" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          fill="currentColor"
          d="M12.025 22 11 19H4c-0.583335 0 -1.0625 -0.1875 -1.4375 -0.5625S2 17.58335 2 17V4c0 -0.583335 0.1875 -1.0625 0.5625 -1.4375S3.416665 2 4 2h6l0.875 2.985H20c0.58335 0 1.0625 0.1866 1.4375 0.55975 0.375 0.373 0.5625 0.84975 0.5625 1.43025V20c0 0.58335 -0.187 1.0625 -0.561 1.4375 -0.37415 0.375 -0.85215 0.5625 -1.434 0.5625H12.025Zm-4.8575 -7.4c1.155 0 2.09915 -0.37315 2.8325 -1.1195 0.73335 -0.74635 1.1 -1.71485 1.1 -2.9055v-0.3875c0 -0.10835 -0.01675 -0.20415 -0.05025 -0.2875H7.075v1.525h2.25c-0.13335 0.4825 -0.3875 0.85725 -0.7625 1.12425 -0.375 0.26715 -0.82915 0.40075 -1.3625 0.40075 -0.65 0 -1.20835 -0.23575 -1.675 -0.70725 -0.46665 -0.4715 -0.7 -1.0524 -0.7 -1.74275s0.23335 -1.27125 0.7 -1.74275c0.46665 -0.4715 1.02285 -0.70725 1.6685 -0.70725 0.298 0 0.5795 0.05415 0.8445 0.1625 0.26485 0.10835 0.50485 0.27085 0.72 0.4875l1.217 -1.15c-0.33335 -0.36665 -0.75 -0.65 -1.25 -0.85 -0.5 -0.2 -1.01665 -0.3 -1.55 -0.3 -1.13335 0 -2.09585 0.4 -2.8875 1.2C3.495835 8.4 3.1 9.36665 3.1 10.5c0 1.13335 0.397585 2.1 1.19275 2.9 0.795 0.8 1.75325 1.2 2.87475 1.2Zm6.69275 0.475L14.425 14.55c-0.23335 -0.28335 -0.45 -0.55415 -0.65 -0.8125 -0.2 -0.25835 -0.39165 -0.5375 -0.575 -0.8375l0.66025 2.175Zm1.2445 -1.275c0.47285 -0.55 0.83165 -1.075 1.0765 -1.575s0.4094 -0.89165 0.49375 -1.175H12.7l0.275 1.075h1c0.13335 0.245 0.29165 0.5104 0.475 0.79625 0.18335 0.28585 0.4016 0.57875 0.65475 0.87875ZM13.025 21H20c0.28335 0 0.52085 -0.096 0.7125 -0.288 0.19165 -0.192 0.2875 -0.4299 0.2875 -0.71375V6.975c0 -0.28335 -0.09585 -0.52085 -0.2875 -0.7125s-0.42915 -0.2875 -0.7125 -0.2875H11.2l1.15 4.075h1.975v-1.075h1.025v1.075h3.675v1h-1.3c-0.15 0.63335 -0.39165 1.25125 -0.725 1.85375s-0.725 1.16315 -1.175 1.682l2.725 2.68625L17.825 18l-2.725 -2.7 -0.9 0.9 0.825 2.8 -2 2Z"
        />
      </svg>
    </span>
  );
}

export function MobileSpeedDial() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { locale, setLocale } = useLanguage();

  const actions: Array<{ locale: Locale; label: string }> = [
    { locale: "es", label: "ES" },
    { locale: "en", label: "EN" },
  ];

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

  return (
    <div ref={rootRef} className="fixed bottom-4 right-4 z-50 md:hidden">
      <div className="relative flex min-h-[12rem] min-w-[5rem] items-end justify-end">
        {actions.map((action, index) => {
          const active = locale === action.locale;

          return (
            <button
              key={action.locale}
              type="button"
              aria-label={`Cambiar idioma a ${action.label}`}
              onClick={() => {
                setLocale(action.locale);
                setOpen(false);
              }}
              className={`absolute right-0 inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_10px_24px_rgba(2,41,119,0.14)] transition-all duration-300 ${
                active
                  ? "border-[#0400f0] bg-[#0400f0] text-white"
                  : "border-[rgba(2,41,119,0.26)] bg-white text-[#022977] shadow-[0_10px_24px_rgba(2,41,119,0.18)]"
              } ${open ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
              style={{
                bottom: open ? `${(index + 1) * 4.15}rem` : "1rem",
                transitionDelay: open ? `${index * 40}ms` : "0ms",
              }}
            >
              <span className="text-sm font-medium uppercase tracking-[0.08em]">
                {action.label}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Open language selector"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0400f0] text-white shadow-[0_16px_36px_rgba(4,0,240,0.3)] transition-transform duration-300 active:scale-95"
        >
          <TranslateIcon open={open} />
        </button>
      </div>
    </div>
  );
}
