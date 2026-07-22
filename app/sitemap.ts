import type { MetadataRoute } from "next";

const BASE_URL = "https://noatechsolutions.com";

/**
 * Sitemap: SOLO rutas reales y con contenido publicable.
 *
 * INCLUIDAS:
 *   /                      → home (contenido completo)          priority 1.0
 *   /servicios/diseno-web  → landing de servicio completa       priority 0.9
 *   /portfolio             → grid de trabajos reales            priority 0.8
 *
 * EXCLUIDAS a propósito (NO indexar):
 *   /servicios, /nosotros, /contacto, /blog → son PlaceholderPage "Próximamente"
 *     (sin contenido real). Indexar páginas vacías perjudica la calidad SEO del
 *     sitio → se agregan acá cuando tengan contenido.
 *   /portafolio → redirect 308 a /portfolio (contenido duplicado). Solo va la
 *     URL canónica /portfolio.
 *
 * El sitio es bilingüe (es/en) sobre la MISMA URL (locale resuelto server-side
 * por cookie/Accept-Language), por eso NO hay entradas por idioma ni <xhtml:link>
 * de hreflang: no existen URLs separadas /es/ /en/ que declarar.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/servicios/diseno-web`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
