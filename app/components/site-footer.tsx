import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

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
  title: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
  emailLabel: string;
  emailHref: string;
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
  title,
  copy,
  ctaLabel,
  ctaHref,
  emailLabel,
  emailHref,
  watermark,
  copyright,
  columns,
}: SiteFooterProps) {
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
                <p className="site-footer-brand-name">NoaTechSolutions</p>
              </div>
            </div>

            <div className="site-footer-copy-block">
              <h2 className="site-footer-title">{title}</h2>
              <p className="site-footer-description">{copy}</p>
            </div>

            <div className="site-footer-actions">
              <a href={ctaHref} className="site-footer-cta">
                <span>{ctaLabel}</span>
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </a>

              <a href={emailHref} className="site-footer-email">
                <Mail size={16} strokeWidth={2.1} />
                <span>{emailLabel}</span>
              </a>
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
