"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import {
  TextHoverEffect,
  FooterBackgroundGradient,
} from "@/components/ui/text-hover-effect";

const footerColumns = [
  {
    title: "Servicios",
    links: [
      { label: "Diseño web premium", href: "/servicios" },
      { label: "SEO estratégico", href: "/servicios" },
      { label: "Marketing digital", href: "/servicios" },
      { label: "Branding visual", href: "/branding" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Portafolio", href: "/portafolio" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

const contactInfo = [
  {
    icon: Mail,
    text: "hello@noatechsolutions.com",
    href: "mailto:hello@noatechsolutions.com",
  },
  {
    icon: Phone,
    text: "+1 (619) 555-0123",
    href: "tel:+16195550123",
  },
  {
    icon: MapPin,
    text: "California + Baja California",
  },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function SiteFooterNurui() {
  return (
    <footer className="bg-[#0F0F11] relative rounded-3xl overflow-hidden mx-4 mb-4 text-gray-400">
      <FooterBackgroundGradient />

      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Image
              src="/noatechsolutions-logo-mark-white.png"
              alt="NoaTechSolutions"
              width={120}
              height={55}
              className="object-contain"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              Tu socio en transformación digital. Diseño web, SEO y marketing
              para empresas en California y Baja California.
            </p>
          </div>

          {/* Columnas de links */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-[#05a5ff] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacto */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center space-x-3 text-sm"
                >
                  <item.icon
                    size={18}
                    className="text-[#05a5ff] flex-shrink-0"
                  />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#05a5ff] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-800 my-8" />

        {/* Barra inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#05a5ff] transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs">
            © 2026 NoaTechSolutions. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* TextHoverEffect watermark */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="NoaTechSolutions" duration={0.3} />
      </div>
    </footer>
  );
}
