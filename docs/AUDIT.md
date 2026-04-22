# AUDIT.md — NoaTechSolutions Website
> Auditoría completa del proyecto. Solo diagnóstico, sin cambios al código.
> Generado: Abril 2026

---

## 1. INVENTARIO DE COMPONENTES

### app/components/ — Componentes de página

| Archivo | Estado | Descripción |
|---|---|---|
| `growth-messages-section.tsx` | ✅ Activo | Sección de scroll con 4 mensajes que aparecen secuencialmente sobre el viewport usando `motion/react` y `Highlighter`. Depende de: `Highlighter`, `lucide-react`. |
| `hero-parallax-demo.tsx` | ✅ Activo | Wrapper del `HeroParallax` que inyecta traducciones y datos del portfolio. Depende de: `HeroParallax`, `portfolioProjects`, `translations`. |
| `hero-rotating-word.tsx` | ✅ Activo | Palabra rotante accesible del hero usando `FlipWords`. Expone `aria-live` y `sr-only` fallback. Depende de: `FlipWords`. |
| `language-provider.tsx` | ✅ Activo | Context provider de i18n. Detecta idioma por `localStorage` y `navigator.language`. Expone `useLanguage()`. |
| `mobile-speed-dial.tsx` | ✅ Activo | FAB flotante en mobile (`md:hidden`) para cambiar idioma ES/EN. Depende de: `useLanguage`. |
| `process-sticky-section.tsx` | ✅ Activo | Sección sticky de 4 pasos del proceso. Usa scroll tracking con `motion`, gradientes temáticos por paso, y tarjetas con imagen. Depende de: `CometCard`, `LayoutTextFlip`. |
| `resizable-navbar-demo.tsx` | ✅ Activo | Navbar real del sitio: desktop flotante, mobile con dropdown de servicios, i18n, y scroll resize. Depende de: `ui/resizable-navbar`, `useLanguage`, `translations`. |
| `resizable-navbar.tsx` | ❌ SIN USO | Versión stub/demo del navbar con items hardcodeados en inglés. No se importa en ningún archivo. Duplicado de prueba de `resizable-navbar-demo.tsx`. |
| `reviews-marquee-section.tsx` | ✅ Activo | Marquee infinito de reviews en desktop. En mobile: slider con swipe, autoplay y dots. |
| `services-stack-section.tsx` | ✅ Activo | Sección sticky de servicios con pila de tarjetas animadas. Usa `CardSwap` (GSAP) y `LayoutTextFlip`. Depende de: `CardSwap`, `LayoutTextFlip`. |
| `site-footer.tsx` | ✅ Activo | Footer del sitio con logo-mark, redes sociales (sin href real), columnas de links, y watermark. |
| `ui/grid-distortion.tsx` | ✅ Activo | Efecto WebGL de distorsión de imagen sobre pointer. Usado en sección CTA y FAQ. Depende de: `three`. |
| `ui/resizable-navbar.tsx` | ✅ Activo | Componentes base del navbar: `Navbar`, `NavBody`, `NavItems`, `NavbarButton`, `NavbarLogo`, `LanguageSwitcher`, `MobileNav*`. |

---

### components/ui/ — Librería de UI

| Archivo | Estado | Usado en |
|---|---|---|
| `aurora-text.tsx` | ✅ Usado | `app/page.tsx` — título del CTA final |
| `card-swap.tsx` | ✅ Usado | `services-stack-section.tsx` |
| `comet-card.tsx` | ✅ Usado | `process-sticky-section.tsx` |
| `flip-words.tsx` | ✅ Usado | `hero-rotating-word.tsx` |
| `hero-parallax.tsx` | ✅ Usado | `hero-parallax-demo.tsx` |
| `highlighter.tsx` | ✅ Usado | `growth-messages-section.tsx` |
| `hover-border-gradient.tsx` | ✅ Usado | `app/page.tsx` — botón primario mobile del hero |
| `layout-text-flip.tsx` | ✅ Usado | `services-stack-section.tsx`, `process-sticky-section.tsx` |
| `moving-border.tsx` | ✅ Usado | `app/page.tsx` (2×), `hero-parallax.tsx` |
| `number-ticker.tsx` | ✅ Usado | `app/page.tsx` — stats del hero |
| `button.tsx` | ❌ SIN USO | Componente shadcn/base-ui genérico. No importado en ningún archivo de la app. |
| `container-text-flip.tsx` | ❌ SIN USO | Animación de palabra en contenedor coloreado. No importado en ningún archivo. |
| `hyper-text.tsx` | ❌ SIN USO | Efecto scramble/glitch de texto. No importado en ningún archivo. |
| `sticky-scroll-reveal.tsx` | ❌ SIN USO | Scroll sticky con reveal de contenido lateral. No importado en ningún archivo. |

---

### Páginas y rutas

| Archivo | Descripción |
|---|---|
| `app/page.tsx` | Homepage — orquesta todos los componentes activos. `"use client"` al nivel de página. |
| `app/layout.tsx` | Root layout con Montserrat + Space Grotesk, metadata SEO, `LanguageProvider`. |
| `app/globals.css` | Estilos globales. ~1500+ líneas. CSS puro, sin módulos. |
| `app/dashboard/page.tsx` | Dashboard placeholder post-login de NoaSign. Completamente separado del sitio principal. Usa variables CSS propias (`--ink`, `--panel`, `--surface-strong`) que NO están definidas en globals.css. |
| `app/portfolio/page.tsx` | Página de portfolio — SSR wrapper. |
| `app/portfolio/portfolio-page-client.tsx` | Grid de proyectos del portfolio. Usa `portfolioProjects`. |
| `app/login-form.tsx` | Formulario de login (archivo en raíz de app/). Sin ruta pública visible — posiblemente integrado en `/dashboard` flow. |
| `app/robots.ts` | Genera robots.txt. |
| `app/sitemap.ts` | Genera sitemap.xml. |

---

## 2. COMPONENTES SIN USO

| Archivo | Motivo |
|---|---|
| `app/components/resizable-navbar.tsx` | Duplicado stub con datos hardcodeados en inglés. No importado en ningún archivo. |
| `components/ui/button.tsx` | Componente base-ui/shadcn. No importado. Las únicas dependencias que lo usan (`@base-ui/react`, `class-variance-authority`) son transitivas a este archivo. |
| `components/ui/container-text-flip.tsx` | No importado en ningún archivo del proyecto. |
| `components/ui/hyper-text.tsx` | No importado en ningún archivo del proyecto. |
| `components/ui/sticky-scroll-reveal.tsx` | No importado en ningún archivo del proyecto. Tenía potencial para el proceso pero fue reemplazado por `process-sticky-section.tsx` custom. |

---

## 3. DEPENDENCIAS

### Activamente usadas

| Paquete | Versión | Dónde |
|---|---|---|
| `next` | 16.2.0 | Framework completo |
| `react` + `react-dom` | 19.2.4 | Base |
| `motion` | ^12.38.0 | Animaciones en casi todos los componentes de sección |
| `gsap` | ^3.14.2 | `card-swap.tsx` — animación de pila de tarjetas |
| `lucide-react` | ^0.577.0 | Iconos en navbar, hero, FAQ, reviews, footer |
| `rough-notation` | ^0.5.1 | `highlighter.tsx` — anotación de texto en growth section |
| `three` | ^0.183.2 | `grid-distortion.tsx` — WebGL en CTA y FAQ |
| `tailwind-merge` | ^3.5.0 | `cn()` en múltiples componentes UI |
| `clsx` | ^2.1.1 | `cn()` en múltiples componentes UI |
| `tw-animate-css` | ^1.4.0 | Importado en `globals.css` línea 2 |
| `tailwindcss` | ^4 | CSS framework |

### Posiblemente sin uso directo

| Paquete | Versión | Situación |
|---|---|---|
| `@base-ui/react` | ^1.3.0 | Solo usado en `button.tsx`, que está sin uso. Si se elimina el componente, esta dep queda huérfana. |
| `class-variance-authority` | ^0.7.1 | Solo usado en `button.tsx`. Misma situación. |
| `shadcn` | ^4.1.0 | `shadcn/tailwind.css` se importa en `globals.css`. Genera las variables shadcn (`--background`, `--foreground`, etc.) que están en el CSS pero no se usan en la app real. |

---

## 4. BRAND ASSETS (public/)

| Asset | Tipo | Usado en |
|---|---|---|
| `noatechsolutions-logo-full.svg` | Logo SVG | `app/components/ui/resizable-navbar.tsx` — logo expandido en navbar |
| `noatechsolutions-logo-mark-white.png` | Isotipo PNG | Navbar scrolled (isotipo) + `site-footer.tsx` (footer brand) |
| `noatechsolutions-digital-orb-hero.svg` | Decorativo SVG | `app/page.tsx` — orbe flotante derecho del hero |
| `noatechsolutions-robotic-hand-hero.svg` | Decorativo SVG | `app/page.tsx` — mano robótica izquierda del hero (`hidden lg:block`) |
| `noatechsolutions-cta-background-tech-grid.webp` | Textura WebP | `app/page.tsx` — fondo de la sección mid-CTA y CTA final (MouseGlowBg) |
| `noatechsolutions-brand-strategy-consulting-session.jpg` | Foto JPG | `process-sticky-section.tsx` — imagen del paso 1 del proceso |
| `noatechsolutions-social-media-marketing-visibility.jpg` | Foto JPG | `process-sticky-section.tsx` — imagen del paso 2 |
| `noatechsolutions-digital-tools-dashboard.jpg` | Foto JPG | `process-sticky-section.tsx` — imagen del paso 3 |
| `noatechsolutions-business-growth-strategy.jpg` | Foto JPG | `process-sticky-section.tsx` — imagen del paso 4 |
| `micasitamusical-raw.png` | Screenshot | `portfolio-projects.ts` → hero parallax + portfolio page |
| `zapana-raw.png` | Screenshot | `portfolio-projects.ts` |
| `ednashome4childcare-raw.png` | Screenshot | `portfolio-projects.ts` |
| `laurabravomusic-raw.png` | Screenshot | `portfolio-projects.ts` |
| `maricruzbisso-raw.png` | Screenshot | `portfolio-projects.ts` |
| `adaluzhomedaycare-raw.png` | Screenshot | `portfolio-projects.ts` |
| `alfredormusic-raw.png` | Screenshot | `portfolio-projects.ts` |
| `worldpaversco-raw.png` | Screenshot | `portfolio-projects.ts` |

**Todos los assets de public/ tienen al menos un uso.** Ninguno es huérfano.

---

## 5. VARIABLES CSS vs DESIGN SYSTEM

### 5.1 Variables existentes con valor INCORRECTO respecto al DS

| Variable en globals.css | Valor actual | Valor correcto según DS | Problema |
|---|---|---|---|
| `--color-ink` | `#02215f` | `#022977` (navy) | Hex incorrecto — navy primario del DS es `#022977`, no `#02215f` |
| `--color-body` | `#222222` | ❌ No existe en DS | VIOLACIÓN CRÍTICA: DS prohíbe explícitamente grises genéricos en light mode |
| `--color-ink-soft` | `#41516f` | ❌ No existe en DS | VIOLACIÓN: gris genérico, viola regla absoluta del DS |
| `--color-panel-soft` | `#f6f9ff` | `#f0f4ff` (`--bg-section-light`) | Hex incorrecto — DS dice `#f0f4ff` para secciones alternas |
| `--color-line` | `rgba(2, 33, 95, 0.12)` | `rgba(2,41,119,0.12)` | Base navy incorrecta (95 vs 119 en canal azul) |
| `--color-line-strong` | `rgba(2, 33, 95, 0.18)` | `rgba(2,41,119,0.18)` | Mismo problema |

### 5.2 Variables del DS que FALTAN en globals.css

Estas son las variables que el DS define como fuente de verdad pero que NO están declaradas:

| Token DS | Hex | Situación |
|---|---|---|
| `--color-navy` | `#022977` | Existe como `--color-ink` pero con hex incorrecto y nombre diferente |
| `--color-electric` | `#0400f0` | Existe como `--color-accent` pero con nombre semánticamente incorrecto |
| `--color-sky` | `#05a5ff` | Existe como `--color-accent-soft` — nombre no coincide con DS |
| `--color-amber` | `#ff9900` | Existe como `--color-highlight` — nombre no coincide con DS |
| `--color-amber-hover` | `#cc7a00` | NO existe en globals.css |
| `--bg-section-light` | `#f0f4ff` | NO existe — hay `--color-panel-soft: #f6f9ff` que es incorrecto |
| `--bg-card-light` | `#f7f8fa` | NO existe |
| `--bg-navy` | `#022977` | NO existe como token semántico |
| `--bg-page-dark` | `#0b0f1a` | NO existe — dark mode no configurado |
| `--bg-surface-dark` | `#0f1628` | NO existe |
| `--bg-card-dark` | `#161d30` | NO existe |
| `--bg-card-pop-dark` | `#0a1a3a` | NO existe |

### 5.3 Variables en globals.css que NO pertenecen al DS (shadcn defaults)

Estas variables fueron generadas por shadcn y no tienen relación con el design system de NTSsign. Están en el CSS pero no se usan en ningún componente real de la app:

```
--background, --foreground, --card, --card-foreground, --popover,
--popover-foreground, --primary, --primary-foreground, --secondary,
--secondary-foreground, --muted, --muted-foreground, --accent,
--accent-foreground, --destructive, --border, --input, --ring,
--chart-1 a --chart-5, --radius,
--sidebar, --sidebar-foreground, --sidebar-primary, --sidebar-primary-foreground,
--sidebar-accent, --sidebar-accent-foreground, --sidebar-border, --sidebar-ring
```

Excepción: `--border` y `--panel` son referenciados en `app/dashboard/page.tsx`, que es un área separada del sitio principal.

### 5.4 Colores hardcodeados en componentes que VIOLAN el DS

Estos colores aparecen hardcodeados en el código (no como variables) y no coinciden con el DS o directamente lo violan:

| Color | Ubicación | Problema |
|---|---|---|
| `#02215f` | Múltiples componentes | Hex incorrecto de navy — debería ser `#022977` |
| `#6a7fa9` | `globals.css` (`.hero-copy-showcase`) | VIOLACIÓN: gris sobre fondo blanco |
| `#5f7398` | `globals.css` (`.portfolio-parallax-copy`) | VIOLACIÓN: gris sobre fondo blanco |
| `#556c8d` | `globals.css` (`.contact-faq-answer`) | VIOLACIÓN: gris sobre fondo blanco |
| `#536b9c` | `sticky-scroll-reveal.tsx` | VIOLACIÓN: gris — además, componente sin uso |
| `#0c2d73` | `resizable-navbar.tsx` (navbar scrolled bg) | No definido en DS |
| `#c5d2e9` | `resizable-navbar.tsx` (navbar scrolled bg) | No definido en DS |
| `#8da3c8` | `resizable-navbar.tsx` (navbar border) | No definido en DS |
| `#15367e` | `resizable-navbar.tsx` (hover state) | No definido en DS |
| `#09215e` | `globals.css` (CTA gradient) | No definido en DS (cercano a navy pero diferente) |
| `#08152d` | `globals.css` (footer bg) | No definido en DS |
| `#edf4ff` | `portfolio-page-client.tsx` | No definido en DS |

### 5.5 Tipografía — Violaciones respecto al DS

| Aspecto | Estado actual | DS exige |
|---|---|---|
| Familia | Montserrat (body) + Space Grotesk (display) — Google Fonts | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (sistema) |
| Pesos usados | 400, 500, 600, 700, 800 (`font-extrabold`) | Solo 400 y 500 |
| Pesos con violación | `font-weight: 600` (nav CTA, varios), `700` (nav links, badges, watermark), `800` (varios titles) | ❌ Cualquier peso > 500 viola el DS |

---

## Resumen ejecutivo

| Categoría | Hallazgo |
|---|---|
| Componentes activos | 12 en `app/components/`, 10 en `components/ui/` |
| Componentes sin uso | 5 archivos (1 en app/components, 4 en components/ui/) |
| Dependencias activas | 11 packages |
| Dependencias huérfanas | 2 (`@base-ui/react`, `class-variance-authority`) — atadas a `button.tsx` sin uso |
| Assets en public/ | 18 — todos con al menos un uso |
| Nombre de token incorrecto | 4 tokens del DS existen pero con nombre diferente |
| Tokens del DS faltantes | 8 tokens no declarados (incluidos todos los dark mode) |
| Variables shadcn sin uso real | ~25 variables generadas por shadcn que no se usan en la app principal |
| Colores hardcodeados incorrectos | 12+ valores hardcodeados que no coinciden con el DS |
| Violaciones tipográficas | 2 (familia de fuente, pesos mayores a 500) |
| Violación crítica de color | `--color-body: #222222` — gris genérico prohibido por DS en light mode |

---

## 6. CORRECCIONES EJECUTADAS

| Paso | Estado | Archivos tocados |
|---|---|---|
| **PASO 1** — Eliminar 5 componentes sin uso | ✅ | `app/components/resizable-navbar.tsx`, `components/ui/button.tsx`, `components/ui/container-text-flip.tsx`, `components/ui/hyper-text.tsx`, `components/ui/sticky-scroll-reveal.tsx` |
| **PASO 2** — Corregir navy `#02215f` → `#022977` | ✅ | `app/globals.css`, `app/components/mobile-speed-dial.tsx`, `app/components/process-sticky-section.tsx`, `app/components/ui/resizable-navbar.tsx`, `app/portfolio/portfolio-page-client.tsx` |
| **PASO 3** — Eliminar grises prohibidos (`--color-body`, `--color-ink-soft`) | ✅ | `app/globals.css` — tokens `--text-label: rgba(2,41,119,0.5)` y `--text-body: rgba(2,41,119,0.7)` |
| **PASO 4** — Renombrar tokens al naming del DS | ✅ | `app/globals.css` — `--color-ink` → `--color-navy`, `--color-highlight` → `--color-amber`, `--color-accent-soft` → `--color-sky`, `--color-panel` → `--bg-section`, `--color-panel-soft` → `--bg-card`, `--color-paper` → `--bg-page` |
| **PASO 5** — Agregar bloque dark mode (`.dark {}`) | ✅ | `app/globals.css` — bloque `.dark {}` con 13 tokens de dark mode |
| **PASO 6** — Corregir tipografía: familia y pesos | ✅ | `app/layout.tsx` (Montserrat eliminado), `app/globals.css` (42 violations 600/700/800→500, `--font-body-fallback` a system fonts), `app/components/mobile-speed-dial.tsx`, `app/components/resizable-navbar-demo.tsx`, `app/components/ui/resizable-navbar.tsx`, `app/components/process-sticky-section.tsx`, `app/portfolio/portfolio-page-client.tsx`, `components/ui/layout-text-flip.tsx` |
