# Página "Diseño Web" — Mapa de secciones y estado

> Ruta: **`/servicios/diseno-web`** → `app/servicios/diseno-web/page.tsx`
> Es el **molde reutilizable** de "página de servicio" (el brief pide una página por servicio).
> Última sesión: **2026-07-10** · Branch: `develop` · Dev: `npm run dev` → **3006**
> Estado: estructura completa (12 secciones) construida y funcionando. **Sin commitear.**

---

## 🗺️ MAPA DE SECCIONES (para seguir diseñando)

| # | Sección | Archivo | Tipo | Efecto / notas |
|---|---------|---------|------|----------------|
| 1 | **Hero** | `app/components/sections/diseno-web-hero.tsx` (+ `ui/hero-3d-scene.tsx`) | 🆕 propia | Título rotativo + **3D R3F** (blob, solo desktop) + glows en mobile. Copy con keywords SEO. Layout 2-col desktop / centrado mobile. |
| 2 | **Barra de confianza** | `diseno-web-trust.tsx` | 🆕 propia | Logos placeholder (texto). Social proof temprano. |
| 3 | **Problema** | `diseno-web-problem.tsx` | 🆕 propia | **Sticky Scroll Reveal** (Aceternity) recreado con scroll de PÁGINA + `position:sticky` + `IntersectionObserver` (compatible con Lenis; el scroll interno del original pelearía con el smooth scroll). Desktop ≥1024: 4 "frenos" a la izquierda que van cambiando con el scroll + panel visual pegado (gradientes on-brand) a la derecha. Mobile: tarjetas apiladas (fallback). Íconos emoji (placeholder). |
| 4 | **Qué incluye** | `diseno-web-includes.tsx` | 🆕 propia | Grid **bento** de 6 features. |
| 5 | **Proceso** | `process-section.tsx` | ♻️ reusada | Contenido de la home (hacer bespoke). |
| 6a | **Antes / Después** | `diseno-web-showcase.tsx` | 🆕 propia | **Wipe scroll-linked** (Motion). Full-bleed. Mockups placeholder. |
| 6b | **Portfolio Web** ⭐ | `diseno-web-gallery.tsx` | 🆕 propia | **Galería bento → fullscreen** (GSAP Flip + ScrollTrigger). 8 webs reales. `id=portfolio`. |
| 7 | **Por qué elegirnos** | `diseno-web-why.tsx` | 🆕 propia | Diferenciadores de diseño web. **Sin software** (eso va en la página Software a medida). |
| 8 | **Testimonios** | `testimonials-section.tsx` | ♻️ reusada | Contenido home. |
| 9 | **CTA** | `diseno-web-cta.tsx` | 🆕 propia | **SVG Mask Effect** (Aceternity) a TODA la sección: **dos capas full-section** — base (navy, DOLOR) + reveal (blanca, SOLUCIÓN con palabra clave en **NARANJA**), recortada por un spotlight (mask SVG 640px) que sigue al cursor (`--mask-x/--mask-y` + rAF, sin re-render). `.is-hovered` global también vira botón+eyebrow de la base al naranja. **Fallback touch/reduced-motion**: estático (dolor+solución+botón). Botón real clickeable en la base (reveal con `pointer-events:none`, botón decorativo `aria-hidden`). Solución accesible vía `sr-only` en la base. Copy bilingüe editable en `COPY`. |
| 10 | **FAQ** | `faq-section.tsx` | ♻️ reusada | Home (hacer específica de web + JSON-LD). |
| 11 | **Contacto** | `contact-section.tsx` | ♻️ reusada | Form → `/api/contact`. Ancla `#contacto-form`. |
| 12 | **Footer** | `footer-section.tsx` | 🌐 global | — |

> **Convención de nombres:** todas las secciones propias llevan prefijo `diseno-web-` → imposible confundirlas con las de la home al editar.
> `diseno-web-works.tsx` (carrusel browser-frame) quedó **sin uso** en disco (se reemplazó por la galería Flip) — se puede borrar o reusar.

---

## ⚙️ Decisiones técnicas clave

- **3D del hero** (`ui/hero-3d-scene.tsx`): React Three Fiber, blob distorsionado que sigue el cursor. **Solo desktop** (lazy + gate matchMedia ≥1024 + reduced-motion). Sin `Environment` preset (evita CDN). En mobile/tablet: glows CSS.
- **Lenis ↔ GSAP ScrollTrigger INTEGRADO** (`app/components/lenis-provider.tsx`): integración canónica (`gsap.ticker` maneja `lenis.raf` + `lenis.on('scroll', ScrollTrigger.update)`). Necesario para el Flip. Andan sincronizados en TODO el sitio. El Motion del home sigue OK.
- **Antes/Después**: recreado con **Motion** (no GSAP) — pin sticky + `useScroll`/`useTransform`. Wipe: `after` x 100%→0 + `after-inner` x -100%→0.
- **Galería Flip**: GSAP `Flip.getState` del estado `--final` (fullscreen) → `Flip.to` con `expoScale(1,5)`, pin + scrub por ScrollTrigger.
- **Cursor**: la página lleva `.dw-page` en el `<main>` → restaura el puntero nativo (el `body{cursor:none}` global del home dejaba las otras páginas sin cursor). Excepción: la CTA (`.dw-cta-stage`) usa `cursor:none` a propósito porque el spotlight ES el cursor.
- **CTA mask effect** (`diseno-web-cta.tsx` + `public/mask.svg` + CSS `.dw-cta-*`): recreado de Aceternity SIN la lib motion. El foco (mask blanco) sigue al mouse con CSS vars `--mask-x/--mask-y` (rAF, sin re-render), tamaño 0→460px vía clase `.is-hovered` con transición CSS. `mask.svg` es un círculo con radial-gradient (borde difuminado). El estado `interactive` (matchMedia hover+pointer, sin reduced-motion) decide entre stage interactivo y fallback estático — arranca `false` (SSR) → sin hydration mismatch.
- **Estilos**: Tailwind inline + `dark:` (funciona por `@custom-variant dark` en globals.css) + clases brand `.eyebrow`/`.section-title`/`.section-copy`. CSS propio en globals.css bajo bloques `.dw-*`.
- **Copy**: bilingüe ES/EN **co-locado** en cada componente (constante `COPY`). Migrable a `lib/i18n.ts` después. Metadata + **Service JSON-LD** en `page.tsx`.

---

## ⏳ PENDIENTE (para próximas sesiones)

1. ~~**Imágenes de la galería**: son `*-raw.png`. **Convertir a WebP** (crítico para performance).~~ ✅ **HECHO (2026-07-11)**: las 8 capturas (`*-raw.png`, ~12.8MB total, 1600×2200) convertidas a WebP q80 con `sharp` → ~1.27MB total (**90% menos**). Referencias en `lib/portfolio-projects.ts` actualizadas a `/{slug}.webp`. PNG viejos borrados (quedan en historial git).
2. **Capturas reales** para Antes/Después (hoy son gradientes placeholder).
3. **Íconos**: reemplazar emoji (problema, includes) por lucide-react.
4. **Logos reales** en la barra de confianza (hoy texto).
5. Hacer **bespoke** las secciones reusadas (proceso, testimonios, FAQ) con copy de diseño web.
6. **Migrar copy** a `lib/i18n.ts` central.
7. **Bug global del cursor**: el `body{cursor:none}` del home afecta a TODAS las páginas sin cursor custom (nosotros, servicios, etc.). Arreglar de raíz (no página por página).
8. **Commits**: ✅ commiteado el 2026-07-11 → portfolio WebP (`c03719c`), home mobile (`76ba725`), página Diseño Web base (`b16c899`). **⚠️ Falta commitear:** CTA mask effect (`diseno-web-cta.tsx` + `mask.svg` + CSS `.dw-cta-*`) y Sticky Scroll de Problema (`diseno-web-problem.tsx`). Hacerlo al arrancar mañana.
9. **🐛 Bug menú activo** (global, no solo esta página): `resizable-navbar.tsx:110` tiene `activeIndex = 0` hardcodeado → "Home" siempre activo. Derivar de `usePathname()`. Ver `docs/home-progress.md` → "PARA MAÑANA".

---

## Cómo retomar

1. `npm run dev` → http://localhost:3006/servicios/diseno-web
2. Abrir este mapa y elegir sección a pulir.
3. Efectos scroll (Flip, wipe): probar en **desktop**, scrollear despacio.
