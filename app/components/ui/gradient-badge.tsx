// ─────────────────────────────────────────────────────────────
// GradientBadge · píldora tipo "Animated Gradient Text" (MagicUI): borde de
// gradiente animado + ícono opcional + separador + texto con gradiente. Colores
// on-brand (ámbar↔celeste). Los estilos viven en globals.css (.gradient-badge*);
// las máscaras de cada ícono se seleccionan por [data-icon]. Componente de
// presentación puro → sirve en server y client components por igual.
// ─────────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";

export type BadgeIcon =
  | "palette"
  | "alert"
  | "check"
  | "wand"
  | "star"
  | "images"
  | "growth"
  | "quote"
  | "help"
  | "chat";

interface GradientBadgeProps {
  children: React.ReactNode;
  /** Ícono (opcional). Si se omite, no se muestra ícono ni separador. */
  icon?: BadgeIcon;
  className?: string;
}

export function GradientBadge({ children, icon, className }: GradientBadgeProps) {
  return (
    <span className={cn("gradient-badge", className)}>
      <span className="gradient-badge__border" aria-hidden="true" />
      {icon && (
        <>
          <span
            className="gradient-badge__icon"
            data-icon={icon}
            aria-hidden="true"
          />
          <span className="gradient-badge__sep" aria-hidden="true" />
        </>
      )}
      <span className="gradient-badge__text">{children}</span>
    </span>
  );
}
