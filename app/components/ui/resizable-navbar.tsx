"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  type MouseEventHandler,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLanguage } from "../language-provider";
import { useTheme } from "../theme-provider";
import type { Locale } from "@/lib/i18n";

type NavbarContextValue = {
  isScrolled: boolean;
};

const NavbarContext = createContext<NavbarContextValue>({ isScrolled: false });

type NavItem = {
  name: string;
  link: string;
  children?: Array<{
    name: string;
    link: string;
  }>;
};

export function Navbar({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <NavbarContext.Provider value={{ isScrolled }}>
      <div className="fixed left-1/2 top-0 z-40 w-[min(1240px,calc(100%-2rem))] -translate-x-1/2 lg:w-[min(1000px,calc(100%-12rem))] xl:w-[min(1070px,calc(100%-10.5rem))] 2xl:w-[min(1140px,calc(100%-10.5rem))]">
        {children}
      </div>
    </NavbarContext.Provider>
  );
}

export function NavBody({ children }: { children: ReactNode }) {
  const { isScrolled } = useContext(NavbarContext);

  return (
    <header
      className={`mt-3 hidden items-center justify-between transition-[width,padding,gap,border-radius,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
        isScrolled
          ? "mx-auto w-fit max-w-full gap-1.5 rounded-[18px] border border-[#8da3c8] bg-[#c5d2e9] px-[5px] py-[5px] shadow-[0_10px_24px_rgba(2,41,119,0.10)]"
          : "gap-8 bg-transparent px-0 py-3"
      }`}
    >
      {children}
    </header>
  );
}

export function NavbarLogo() {
  const { isScrolled } = useContext(NavbarContext);

  return (
    <Link
      href="#home"
      aria-label="Ir al inicio de NoaTechSolutions"
        className={`relative inline-flex items-center justify-center overflow-hidden ${
        isScrolled
          ? "h-[43px] w-[58px] rounded-[14px] bg-[#0c2d73]"
          : "ml-[-24px] h-[55px] w-[216px]"
      } transition-[width,height,border-radius,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    >
      <Image
        src="/noatechsolutions-logo-full.svg"
        alt="Logotipo principal de NoaTechSolutions"
        width={360}
        height={142}
        priority
        className={`h-auto w-auto max-w-full transition-[opacity,filter,transform,max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "pointer-events-none scale-[0.995] opacity-0 blur-0"
            : "max-h-[59px] object-contain opacity-100"
        }`}
      />
      <Image
        src="/noatechsolutions-logo-mark-white.png"
        alt="Isotipo blanco de NoaTechSolutions"
        width={190}
        height={88}
        priority
        className={`absolute h-auto w-[36px] transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "opacity-100" : "pointer-events-none scale-[0.995] opacity-0 blur-0"
        }`}
      />
    </Link>
  );
}

export function NavItems({ items }: { items: NavItem[] }) {
  const { isScrolled } = useContext(NavbarContext);
  const activeIndex = 0;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [isIndicatorReady, setIsIndicatorReady] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const syncIndicator = (index: number) => {
    const nav = navRef.current;
    const item = itemRefs.current[index];
    if (!nav || !item) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setIndicatorLeft(itemRect.left - navRect.left + itemRect.width / 2);
    setIsIndicatorReady(true);
  };

  useLayoutEffect(() => {
    const update = () => syncIndicator(hoveredIndex ?? activeIndex);
    const frameId = window.requestAnimationFrame(update);
    const timeoutId = window.setTimeout(update, 60);
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", update);
    };
  }, [hoveredIndex, isScrolled]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setOpenDropdownIndex(null);
        syncIndicator(activeIndex);
      }}
      className={`relative hidden items-center lg:flex ${
        isScrolled
          ? "min-h-[43px] gap-6 rounded-[14px] bg-[#0c2d73] px-4"
          : "gap-9"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute h-[0.3rem] w-[0.3rem] -translate-x-1/2 rounded-full bg-[#ff9900] transition-[left,opacity,bottom] duration-300 ${
          isIndicatorReady ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${indicatorLeft}px`,
          bottom: isScrolled ? "0.36rem" : "-0.05rem",
        }}
      />
      {items.map((item, index) => {
        const active = index === activeIndex;
        const hovered = hoveredIndex === index;
        const highlighted = active || hovered;
        return (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => {
              setHoveredIndex(index);
              syncIndicator(index);
            }}
            onMouseLeave={() => {
              if (item.children) {
                setOpenDropdownIndex(null);
              }
            }}
          >
            {item.children ? (
              <button
                type="button"
                ref={(element) => {
                  itemRefs.current[index] = element;
                  if (index === activeIndex && element && !isIndicatorReady) {
                    window.requestAnimationFrame(() => syncIndicator(activeIndex));
                  }
                }}
                className={`relative inline-flex items-center gap-2 font-[var(--font-body)] transition-colors ${
                  isScrolled
                    ? `min-h-[43px] text-[0.92rem] font-medium tracking-[0.02em] ${
                        highlighted ? "text-[#ff9900]" : "text-white"
                      }`
                    : `text-[0.98rem] font-medium tracking-[0.04em] ${
                        highlighted ? "text-[#ff9900]" : "text-[#0400f0]"
                    }`
                }`}
                onMouseEnter={() => {
                  setOpenDropdownIndex(index);
                }}
              >
                {item.name}
              </button>
            ) : (
              <Link
                href={item.link}
                ref={(element) => {
                  itemRefs.current[index] = element;
                  if (index === activeIndex && element && !isIndicatorReady) {
                    window.requestAnimationFrame(() => syncIndicator(activeIndex));
                  }
                }}
                className={`relative inline-flex items-center font-[var(--font-body)] transition-colors ${
                  isScrolled
                    ? `min-h-[43px] text-[0.92rem] font-medium tracking-[0.02em] ${
                        highlighted ? "text-[#ff9900]" : "text-white"
                      }`
                    : `text-[0.98rem] font-medium tracking-[0.04em] ${
                        highlighted ? "text-[#ff9900]" : "text-[#0400f0]"
                      }`
                }`}
              >
                {item.name}
              </Link>
            )}

            {item.children && openDropdownIndex === index ? (
              <div
                className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
              >
                <div
                  className={`rounded-2xl border border-[rgba(5,165,255,0.14)] bg-[#0c2d73]/96 p-3 shadow-[0_18px_48px_rgba(2,41,119,0.20)] backdrop-blur-xl ${
                    isScrolled ? "" : "ring-1 ring-[rgba(5,165,255,0.08)]"
                  }`}
                >
                  <div className="grid gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.link}
                        className="group rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-white/90 transition-all hover:border-[rgba(5,165,255,0.12)] hover:text-[#ff9900]"
                      >
                        <span className="relative flex items-center justify-between pr-6">
                          <span>{child.name}</span>
                          <span className="absolute right-0 top-1/2 h-[0.3rem] w-[0.3rem] -translate-y-1/2 rounded-full bg-[#ff9900] opacity-0 transition-[opacity,right] duration-300 group-hover:right-14 group-hover:opacity-100" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

export function NavbarButton({
  children,
  variant,
  className = "",
  onClick,
}: {
  children: ReactNode;
  variant: "primary" | "secondary";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const { isScrolled } = useContext(NavbarContext);

  const base = isScrolled
    ? "inline-flex min-h-[43px] items-center justify-center rounded-[14px] border border-[#90a5cb] bg-[#ff9900] px-4 font-[var(--font-body)] text-[0.92rem] font-medium text-white transition-colors hover:bg-[#f2a11a]"
    : "inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#022977] px-6 font-[var(--font-body)] text-[0.95rem] font-medium text-white transition-colors hover:bg-[#15367e]";

  const secondary = "border border-[rgba(255,153,0,0.35)] bg-[rgba(255,153,0,0.06)] text-[#ff9900]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variant === "secondary" ? secondary : ""} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const options: Array<{ locale: Locale; label: string }> = [
    { locale: "es", label: "ES" },
    { locale: "en", label: "EN" },
  ];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-[16px] border border-[#9fb0cf] bg-white/92 p-1 shadow-[0_10px_24px_rgba(2,41,119,0.12)] backdrop-blur-md"
      aria-label="Selector de idioma"
    >
      {options.map((option) => {
        const active = locale === option.locale;

        return (
          <button
            key={option.locale}
            type="button"
            onClick={() => setLocale(option.locale)}
            className={`inline-flex min-w-[52px] items-center justify-center rounded-[12px] px-3 py-2 text-[0.74rem] font-medium uppercase tracking-[0.08em] transition-colors ${
              active
                ? "bg-[#0400f0] text-white"
                : "text-[#022977] hover:bg-[rgba(4,0,240,0.08)]"
            }`}
          >
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function MobileNav({ children }: { children: ReactNode }) {
  return <div className="mx-3 mt-3 lg:hidden">{children}</div>;
}

export function MobileNavHeader({ children }: { children: ReactNode }) {
  const { isScrolled } = useContext(NavbarContext);

  return (
    <div
      className={`flex items-center justify-between rounded-[18px] px-2 py-2 ${
        isScrolled
          ? "border border-[#8da3c8] bg-[#c5d2e9] shadow-[0_10px_24px_rgba(2,41,119,0.10)] md:mx-auto md:max-w-[70%]"
          : "bg-transparent"
      }`}
    >
      {children}
    </div>
  );
}

export function MobileNavToggle({
  isOpen,
  onClick,
  className,
}: {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  const { isScrolled } = useContext(NavbarContext);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className={`inline-flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-[14px] ${
        isOpen
          ? "border border-[#ffb84d] bg-[#ff9900]"
          : isScrolled
          ? "border border-[#ffb84d] bg-[#ff9900]"
          : "border border-[rgba(2,41,119,0.12)] bg-white/70"
      } ${className ?? ""}`.trim()}
    >
      <span className={`h-[2px] w-4 rounded-full transition ${isOpen || isScrolled ? "bg-white" : "bg-[#022977]"} ${isOpen ? "translate-y-[6px] rotate-45" : ""}`} />
      <span className={`h-[2px] w-4 rounded-full transition ${isOpen || isScrolled ? "bg-white" : "bg-[#022977]"} ${isOpen ? "opacity-0" : ""}`} />
      <span className={`h-[2px] w-4 rounded-full transition ${isOpen || isScrolled ? "bg-white" : "bg-[#022977]"} ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
    </button>
  );
}

export function MobileNavContactButton({ label }: { label: string }) {
  const { isScrolled } = useContext(NavbarContext);

  if (!isScrolled) {
    return null;
  }

  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center rounded-[14px] bg-[#0400f0] px-4 font-[var(--font-body)] text-sm font-medium text-white transition-colors hover:bg-[#15367e]"
    >
      {label}
    </button>
  );
}

export function MobileNavMenu({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`relative z-50 overflow-hidden rounded-[22px] transition-all duration-300 ${
        isOpen
          ? "mt-3 max-h-[34rem] border border-[rgba(5,165,255,0.14)] bg-[#0c2d73] p-4 opacity-100 shadow-[0_18px_48px_rgba(2,41,119,0.24)] md:mx-auto md:w-[70%]"
          : "mt-0 max-h-0 bg-transparent p-0 opacity-0"
      }`}
    >
      <div className="grid gap-3" onClick={onClose}>
        {children}
      </div>
    </div>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`relative inline-flex h-7 w-[3.1rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05a5ff] ${
        isDark ? "bg-[#05a5ff]" : "bg-[#022977]"
      } ${className}`}
    >
      {/* Knob */}
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
          isDark ? "translate-x-[1.55rem]" : "translate-x-0.5"
        }`}
      >
        {isDark ? (
          /* Moon icon */
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-[#05a5ff]">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          /* Sun icon */
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-[#022977]">
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
      </span>
    </button>
  );
}

export function NavFloatingControls() {
  const { isScrolled } = useContext(NavbarContext);
  if (!isScrolled) return null;
  return (
    <div
      className="hidden md:flex fixed flex-col items-end gap-2 z-50"
      style={{ top: "0.9rem", right: "1rem" }}
    >
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}

export function NavInlineControls() {
  const { isScrolled } = useContext(NavbarContext);
  if (isScrolled) return null;
  return (
    <div className="hidden md:flex items-center gap-3">
      <ThemeToggle />
    </div>
  );
}
