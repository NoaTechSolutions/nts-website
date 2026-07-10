import { permanentRedirect } from "next/navigation";

// Ruta unificada: /portafolio (es) → /portfolio (la página real con el grid).
// Redirect permanente (308) para no dejar contenido duplicado ni enlaces rotos.
export default function PortafolioPage() {
  permanentRedirect("/portfolio");
}
