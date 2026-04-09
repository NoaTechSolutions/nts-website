"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuroraTextProps = {
  className?: string;
  children: ReactNode;
  colors?: string[];
  speed?: number;
};

export function AuroraText({
  className,
  children,
  colors = ["#ffcf70", "#ff9900", "#ffd89a", "#fff1d0"],
  speed = 1,
}: AuroraTextProps) {
  const style = {
    "--aurora-duration": `${8 / speed}s`,
    "--aurora-gradient": `linear-gradient(120deg, ${colors.join(", ")})`,
  } as CSSProperties;

  return (
    <span className={cn("aurora-text", className)} style={style}>
      {children}
    </span>
  );
}
