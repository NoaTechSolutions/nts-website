# SEO & Metadata — Estado y guía

_Última actualización: 2026-07-21. Todo lo de abajo está **live en producción** (noatechsolutions.com)._

## 🎯 Qué se implementó (2026-07-21)

| Área | Estado | Dónde |
| --- | --- | --- |
| **og:image** (preview del link) | ✅ live | `public/og-image.png` (1200×630) + `app/layout.tsx` |
| **Sitemap** | ✅ live, enviado a Google | `app/sitemap.ts` |
| **JSON-LD** (datos estructurados) | ✅ live | `app/layout.tsx` (Organization) + `app/page.tsx` (ProfessionalService) |
| **Favicons modernos** | ✅ live | `app/icon.png` (512), `app/apple-icon.png` (180), `app/favicon.ico` |
| **Google Analytics 4** | ✅ conectado y midiendo | `app/components/google-analytics.tsx` |
| **Google Search Console** | ✅ verificado + sitemap enviado | `app/layout.tsx` (`verification.google`) |
| **hreflang** | ⛔ N/A (ver abajo) | — |

## 🔗 Google — cómo está conectado

Ambos IDs son **públicos** (se emiten en el HTML de cada página), no secretos, así que van **directo en el código** con override opcional por env var. NO hace falta configurar env vars en Netlify.

| Servicio | Valor | Archivo | Override por env |
| --- | --- | --- | --- |
| Analytics (GA4) | `G-VSRWW1KE7Z` | `app/components/google-analytics.tsx` | `NEXT_PUBLIC_GA_ID` |
| Search Console | token de verificación URL-prefix | `app/layout.tsx` → `metadata.verification.google` | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |

- **Search Console**: propiedad `https://noatechsolutions.com` verificada (owner). Método efectivo: "HTML file" (verificación previa) + nuestro meta tag como método adicional. Sitemap `/sitemap.xml` enviado → **Success, 3 páginas**.
- **Analytics**: midiendo tráfico en vivo (confirmado en Realtime). Carga vía `next/script` `afterInteractive` (no bloquea LCP).

## 🗺️ Política del sitemap

`app/sitemap.ts` incluye **solo rutas reales y publicables**:

| Ruta | priority |
| --- | --- |
| `/` | 1.0 |
| `/servicios/diseno-web` | 0.9 |
| `/portfolio` | 0.8 |

**Excluidas a propósito** (no indexar):
- `/servicios`, `/nosotros`, `/contacto`, `/blog` → son `PlaceholderPage` "Próximamente". Indexar páginas vacías baja la calidad SEO. **Agregar acá cuando tengan contenido real.**
- `/portafolio` → redirect 308 a `/portfolio` (contenido duplicado); solo va la URL canónica.

> ⚠️ **Sitemap viejo `sitemap_index.xml`**: es de la época de SiteGround (WordPress). Hoy devuelve **404** → Google lo ignora, sin impacto SEO. Quedó en el reporte de Search Console porque no se pudo borrar desde la UI; se decidió dejarlo (inofensivo). Si molesta, opción documentada: redirect 301 `/sitemap_index.xml` → `/sitemap.xml`.

## 🌐 hreflang — por qué NO aplica

El sitio es bilingüe (es/en) pero sirve **ambos idiomas sobre la MISMA URL** (locale resuelto server-side por cookie/Accept-Language en `app/layout.tsx`). NO existen URLs separadas `/es/` y `/en/`. Declarar `alternates.languages` apuntando ambos idiomas a la misma URL sería hreflang **inválido**. Por eso solo se declara `canonical`. Si algún día se separan las URLs por idioma, el snippet queda comentado en `layout.tsx`.

## 🔜 Pendiente (issue #107, prioridad baja)

- og:image **por página** (`opengraph-image.tsx` por ruta) para previews más relevantes.
- Versión diseñada a mano de la og:image (hoy es generada por script con sharp).
- JSON-LD: `sameAs: []` está **vacío** → agregar URLs de redes sociales cuando estén (refuerza la entidad ante Google).
- Evaluar schema adicional (`LocalBusiness`, `BreadcrumbList`, `FAQPage`).

## 🧪 Cómo validar (tras cada deploy)

- **Preview del link** (og): [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — pegar la URL, "Scrape Again" si cacheó viejo. También [Twitter Card Validator](https://cards-dev.twitter.com/validator).
- **Datos estructurados**: [Google Rich Results Test](https://search.google.com/test/rich-results).
- **Analytics**: GA4 → Reports → Realtime (entrar al sitio y verse aparecer).
- **Indexación/posicionamiento**: Search Console → Pages / Performance (tarda **días** en llenarse de datos; es normal que arranque vacío).

## 🛠️ Cómo se generó la og:image

Script con `sharp`: rasteriza un SVG de marca (navy #022977 con gradiente + glows sutiles sky/amber) y compone encima el **logo-mark BLANCO** (`noatechsolutions-logo-mark-white.png`) + tagline "Diseño web y software a medida" ("a medida" en amber) + strip de servicios + dominio.

> ⚠️ **Gotcha**: `noatechsolutions-logo-full.webp` es texto navy **oscuro** → invisible sobre fondo navy. Para fondos oscuros usar SIEMPRE `noatechsolutions-logo-mark-white.png`.
