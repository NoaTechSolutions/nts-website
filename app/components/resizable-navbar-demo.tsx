"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavContactButton,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  getActiveNavIndex,
} from "./ui/resizable-navbar";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";
import { translations } from "@/lib/i18n";

export function ResizableNavbarDemo() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const pathname = usePathname();

  const navItems = [
    {
      name: t.nav.home,
      link: "/",
    },
    {
      name: t.nav.services,
      link: "/servicios",
      children: [
        {
          name: t.nav.webDesign,
          link: "/servicios/diseno-web",
        },
        {
          name: t.nav.branding,
          link: "/servicios",
        },
        {
          name: t.nav.businessCards,
          link: "/servicios",
        },
      ],
    },
    {
      name: t.nav.solutions,
      link: "/portfolio",
    },
    {
      name: t.nav.about,
      link: "/nosotros",
    },
  ];

  const activeIndex = getActiveNavIndex(navItems, pathname);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!mobileNavRef.current) return;
      if (!mobileNavRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setOpenMobileSection(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} activeIndex={activeIndex} />
          <div className="flex items-center gap-3 lg:justify-self-end">
            <NavbarButton variant="primary">{t.nav.cta}</NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <div ref={mobileNavRef}>
            <MobileNavHeader>
              <NavbarLogo />
              <div className="flex items-center gap-2 md:absolute md:left-1/2 md:-translate-x-1/2">
                <div className="hidden md:block">
                  <MobileNavToggle
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 md:ml-auto">
                <MobileNavContactButton label={t.nav.contact} />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden"
                />
              </div>
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) =>
                item.children ? (
                  <div
                    key={`mobile-link-${idx}`}
                    className="rounded-2xl border border-transparent bg-transparent p-0 shadow-none"
                  >
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenMobileSection((current) =>
                          current === item.name ? null : item.name,
                        );
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-1 py-2 text-left text-base font-medium transition-colors ${
                        idx === activeIndex ? "text-[#ff9900]" : "text-white"
                      }`}
                    >
                      <span className="relative flex items-center justify-between pr-6">
                        <span>{item.name}</span>
                      </span>
                      <span className="text-base text-[#ff9900]">+</span>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        openMobileSection === item.name
                          ? "mt-3 max-h-48 gap-2 opacity-100"
                          : "max-h-0 gap-0 opacity-0"
                      }`}
                    >
                      {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.link}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenMobileSection(null);
                            }}
                          className="rounded-xl border border-transparent px-3 py-2 text-sm text-[#8fd0ff] transition-colors hover:border-[rgba(5,165,255,0.12)] hover:text-[#ff9900]"
                          >
                            <span className="relative flex items-center justify-between pr-6">
                              <span>{child.name}</span>
                            </span>
                          </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-xl px-1 py-2 text-base font-medium transition-colors ${
                      idx === activeIndex ? "text-[#ff9900]" : "text-white"
                    }`}
                  >
                    <span className="relative flex items-center justify-between pr-6">
                      <span className="block">{item.name}</span>
                    </span>
                  </Link>
                ),
              )}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full !border-[#ffb84d] !bg-[#ff9900] !text-white hover:!bg-[#f2a11a]"
                >
                  {t.nav.cta}
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
