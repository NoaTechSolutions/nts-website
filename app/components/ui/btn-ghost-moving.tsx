"use client";

import type { ReactNode } from "react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

export function BtnGhostMoving({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <MovingBorderButton
      as="a"
      href={href}
      duration={2800}
      borderRadius="999px"
      containerClassName="button-outline-moving"
      borderClassName="button-outline-moving-border"
      className={`button-outline button-outline-hero ${className}`.trim()}
    >
      {children}
    </MovingBorderButton>
  );
}
