# SITEMAP — Orden de secciones

> Última actualización: 2026-04-16 (FAQ ↔ Contact swap)

## Página principal (`app/page.tsx`)

| # | ID DOM | Sección | Componente | Ancla nav |
|---|--------|---------|------------|-----------|
| 1 | `#home` | Hero + navbar + stats | `ResizableNavbarDemo` + inline `.hero-showcase` | Home |
| 2 | — | Mensajes de crecimiento | `GrowthMessagesSection` | — |
| 3 | `#servicios` | Servicios (scroll-stacking) | `ServicesStackSection` | Servicios |
| 4 | `#proceso` | Cómo trabajamos (sticky pin) | `ProcessStickySection` | Proceso |
| 5 | — | Portafolio (parallax horizontal) | `HeroParallaxDemo` → `HeroParallax` | — |
| 6 | `#reviews` | Reseñas (marquee) | `ReviewsMarqueeSection` | — |
| 7 | — | CTA media página (asesoría) | inline `.services-proof-section` | — |
| 8 | `#faq` | FAQ accordion | inline `.contact-faq-section` | FAQ |
| 9 | `#contacto` | Contact Final — ContactForm + mailto | inline `.contact-final-section` | Contacto |
| 10 | — | Footer | `SiteFooter` | — |

**Lógica del orden:** el visitante recorre hero → valor/mensajes → servicios → proceso → portafolio → reseñas → mid-CTA → FAQ (resuelve dudas) → **formulario de contacto como último acto antes del footer**.

## Animaciones scroll-dependientes

Estas secciones usan `useScroll` + ref propio. Moverlas en el DOM **no rompe** la animación mientras no se anide dentro de contenedores con `overflow: hidden` o `transform` que corten el containing block:

- `GrowthMessagesSection`
- `ServicesStackSection`
- `ProcessStickySection`
- `HeroParallax` (vía `HeroParallaxDemo`)

## Anclas activas

| Ancla | ID destino | Estado |
|-------|------------|--------|
| `#home` | hero wrapper | ✅ |
| `#servicios` | wrapper de ServicesStackSection | ✅ |
| `#proceso` | wrapper de ProcessStickySection | ✅ |
| `#reviews` | wrapper de ReviewsMarqueeSection | ✅ (no usado en nav aún) |
| `#faq` | `.contact-faq-section` | ✅ |
| `#contacto` | `.contact-final-section` | ✅ |

## Rutas (páginas)

| Ruta | Archivo | Estado |
|------|---------|--------|
| `/` | [app/page.tsx](app/page.tsx) | ✅ Activa |
| `/portafolio` | [app/portafolio/page.tsx](app/portafolio/page.tsx) | ✅ Activa (contenido real) |
| `/portfolio` | — | 🔁 Redirect 301 → `/portafolio` ([next.config.ts](next.config.ts)) |
| `/dashboard` | [app/dashboard/page.tsx](app/dashboard/page.tsx) | ✅ Activa |
| `/servicios` | [app/servicios/page.tsx](app/servicios/page.tsx) | 🚧 Placeholder |
| `/blog` | [app/blog/page.tsx](app/blog/page.tsx) | 🚧 Placeholder |
| `/nosotros` | [app/nosotros/page.tsx](app/nosotros/page.tsx) | 🚧 Placeholder |
| `/contacto` | [app/contacto/page.tsx](app/contacto/page.tsx) | 🚧 Placeholder |

### API routes

- `/api/contact` — POST con Zod + Resend + Upstash ratelimit (3/24h)
- `/robots.txt` — generado
- `/sitemap.xml` — generado

## Nota de CI

El workflow `auto-merge-develop.yml` solo trigger en ramas que matcheen `feature/**` o `fix/**`. Ramas con otros prefijos (ej. `refactor/*`, `docs/*`, `chore/*`) no disparan el auto-merge y requieren merge manual o renombrado.
