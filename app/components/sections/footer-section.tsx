"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import {
  TextHoverEffect,
  FooterBackgroundGradient,
} from "@/components/ui/text-hover-effect";

// X y TikTok no están en lucide (íconos de marca) → SVG propios.
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// Solo links a páginas/secciones construidas. Ocultos hasta construirse:
// /servicios (placeholder), /nosotros, /blog, y /portfolio. Se apunta a la
// página real (Diseño Web) y a secciones reales del home (#proceso, #faq,
// #contacto).
const footerColumns = [
  {
    title: "Servicios",
    links: [
      { label: "Diseño Web", href: "/servicios/diseno-web" },
      { label: "Nuestro proceso", href: "/#proceso" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Preguntas frecuentes", href: "/#faq" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
];

const contactInfo = [
  {
    icon: Mail,
    text: "contact@noatechsolutions.com",
    href: "mailto:contact@noatechsolutions.com",
  },
  {
    icon: Phone,
    text: "+1 (510) 778-6601",
    href: "tel:+15107786601",
  },
  {
    icon: MapPin,
    text: "California, USA",
  },
];

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/noatechsolutions/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/noatechsolutions/",
  },
  { icon: XIcon, label: "X", href: "https://x.com/noatechsolution" },
  {
    icon: TikTokIcon,
    label: "TikTok",
    href: "https://www.tiktok.com/@noatechsolutions",
  },
];

export function FooterSection() {
  // Spotlight blanco (fondo dark), mismo sistema que los CTAs.
  const footerRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [lit, setLit] = useState(false);

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    const el = footerRef.current;
    if (!el || rafRef.current) return;
    const { clientX, clientY } = event;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${clientY - rect.top}px`);
    });
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      className={`bg-[#0F0F11] relative w-full overflow-hidden text-gray-400 cta-spotlight-section footer-spotlight${lit ? " is-lit" : ""}`}
    >
      <FooterBackgroundGradient />
      <div className="cta-spotlight" aria-hidden="true" />
      <div className="cta-spotlight-core" aria-hidden="true" />

      <div className="max-w-7xl mx-auto p-14 lg:px-10 xl:px-14 z-40 relative">
        {/* Grid principal */}
        <div className="nurui-footer-grid grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-16 pb-12">
          {/* Brand */}
          <div className="nurui-footer-brand flex flex-col space-y-4">
            <Image
              src="/noatechsolutions-logo-mark-white.png"
              alt="NoaTechSolutions"
              width={120}
              height={55}
              className="object-contain"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              Tu socio en transformación digital. Diseño web, SEO y marketing
              para empresas en California, USA y resto del mundo.
            </p>
          </div>

          {/* Columnas de links (wrapper flattens to grid items via display: contents) */}
          <div className="nurui-footer-links-wrapper">
            {footerColumns.map((col) => (
              <div key={col.title}>
                {/* h2, no h4: el footer va en todas las páginas y saltaba de
                    h1/h2 a h4. El tamaño lo fija text-lg, no el nivel. */}
                <h2 className="text-white text-lg font-semibold mb-6">
                  {col.title}
                </h2>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-[#ff9900] transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contacto */}
          <div className="nurui-footer-contact">
            <h2 className="text-white text-lg font-semibold mb-6">Contacto</h2>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center space-x-3 text-sm min-w-0"
                >
                  <item.icon
                    size={18}
                    className="text-[#ff9900] shrink-0"
                  />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#ff9900] transition-colors whitespace-nowrap lg:text-[13px] xl:text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="whitespace-nowrap">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-800 my-8" />

        {/* Barra inferior */}
        <div className="nurui-footer-bottom flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* space-x-2 + área de 44px por link: el icono se sigue viendo de
              20px, pero el área tocable pasa de 20px a 44px sin mover el
              layout (el -m-2 reabsorbe el padding extra). */}
          <div className="flex space-x-2 text-gray-400">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="-m-2 inline-flex h-11 w-11 items-center justify-center hover:text-[#ff9900] transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          {/* gray-400 sobre #0F0F11 = 7.3:1 (AA). gray-500 daba 3.9:1 y fallaba. */}
          <p className="text-center text-gray-400 text-xs">
            © 2026 NoaTechSolutions. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* TextHoverEffect watermark */}
      <div
        className="md:flex hidden h-48 -mt-4 overflow-visible"
        style={{ position: "relative", zIndex: 10 }}
      >
        <TextHoverEffect text="NoaTechSolutions" duration={0.3} />
      </div>
    </footer>
  );
}
