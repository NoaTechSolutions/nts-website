"use client";

import type { ReactNode } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function BtnPrimaryHero({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <a
        href={href}
        className={`button-primary button-primary-hero button-primary-desktop ${className}`.trim()}
      >
        <span className="button-primary-label button-primary-label-default">
          {children}
        </span>
        <span className="button-primary-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="button-primary-icon-arrow"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </a>
      <HoverBorderGradient
        as="a"
        href={href}
        duration={1.2}
        clockwise
        containerClassName="button-primary-mobile-gradient"
        className="button-primary-mobile-inner"
      >
        <span>{children}</span>
        <span className="button-primary-mobile-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="button-primary-mobile-icon-arrow"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </HoverBorderGradient>
    </>
  );
}
