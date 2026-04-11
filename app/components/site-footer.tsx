import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

type FooterLink = {
  label: string;
  href?: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: readonly FooterLink[];
};

type SiteFooterProps = {
  eyebrow: string;
  watermark: string;
  copyright: string;
  columns: readonly FooterColumn[];
};

function FooterNavLink({ label, href, external }: FooterLink) {
  if (!href) {
    return <span className="site-footer-link is-muted">{label}</span>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className="site-footer-link">
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className="site-footer-link"
      {...(external ? { rel: "noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

export function SiteFooter({
  eyebrow,
  watermark,
  copyright,
  columns,
}: SiteFooterProps) {
  const footerSocials = [
    { label: "Instagram", Icon: Instagram },
    { label: "Facebook", Icon: Facebook },
    { label: "LinkedIn", Icon: Linkedin },
    { label: "YouTube", Icon: Youtube },
  ] as const;

  return (
    <footer className="site-footer-section">
      <div className="site-footer-shell">
        <div className="site-footer-divider" aria-hidden="true" />

        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <div className="site-footer-brand-lockup">
              <span className="site-footer-logo-mark" aria-hidden="true">
                <Image
                  src="/noatechsolutions-logo-mark-white.png"
                  alt=""
                  width={96}
                  height={44}
                  className="site-footer-logo-image"
                />
              </span>

              <div className="site-footer-brand-copy">
                <p className="site-footer-eyebrow">{eyebrow}</p>
              </div>
            </div>

            <div className="site-footer-socials" aria-label="Redes sociales">
              {footerSocials.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="site-footer-social"
                  title={label}
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={2.1} />
                </span>
              ))}
            </div>

            <p className="site-footer-copyright">{copyright}</p>
          </div>

          <div className="site-footer-columns">
            {columns.map((column) => (
              <div key={column.title} className="site-footer-column">
                <p className="site-footer-column-title">{column.title}</p>

                <ul className="site-footer-column-list">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <FooterNavLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="site-footer-watermark" aria-hidden="true">
          {watermark}
        </div>
      </div>
    </footer>
  );
}
