# SITEMAP — Orden de secciones

> Última actualización: 2026-04-15 (NOA-132)

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
| 8 | `#contacto` | CTA final (botón mailto) | inline `.contact-final-section` | Contacto |
| 9 | `#faq` | FAQ accordion | inline `.contact-faq-section` | FAQ |
| 10 | — | Footer | `SiteFooter` | — |

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
| `#contacto` | `.contact-final-section` | ✅ |
| `#faq` | `.contact-faq-section` | ✅ |
| `#reviews` | wrapper de ReviewsMarqueeSection | ✅ (no usado en nav aún) |

## Anclas rotas (pendiente)

| Ancla | Usado en | Problema |
|-------|----------|----------|
| `#solutions` | nav "Soluciones" | Sin ID destino en `page.tsx` |
| `#about-us` | nav "About us" | Sin ID destino en `page.tsx` |

## Páginas adicionales

- `/dashboard` — prerendered static
- `/portfolio` — prerendered static
- `/api/contact` — API route POST (Resend + Zod + Upstash ratelimit)
- `/robots.txt` — generado
- `/sitemap.xml` — generado
