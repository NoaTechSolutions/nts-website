# CHANGELOG — NoaTechSolutions Website

## [2026-04-17] — Contact/Crisp fixes, footer redesign, breakpoints, fluid typography (NOA-149, NOA-150, NOA-153)

### Contact + Crisp + FAB (NOA-149)
- Sección contacto centrada en mobile/tablet (≤1023px): motivation, header, card, trust items
- Crisp widget vuelve a esquina inferior derecha (eliminado `position:reverse`)
- FAB speed-dial movido a esquina inferior izquierda para evitar overlap con Crisp
- CSS `bottom: 80px` / `100px` en ≥1440px para subir el widget

### Footer redesign (NOA-149)
- Copyright duplicado eliminado — solo queda `{copyright}` dinámico de i18n
- Copyright en i18n ahora incluye "© 2026"
- Copyright centrado con `grid-column: 1 / -1`
- Fondo: gradient navy `#011d5e → #022977 → #021f5a → #011540` (light) y deep navy (dark)
- Watermark: `clamp(2rem, 5.8vw, 10rem)` fluido, mask-image fade arriba, `overflow: hidden`
- Shell `padding-bottom: 7rem` desktop, responsive por breakpoint
- Tablet: 4 columnas de links, `padding-bottom: 8rem`
- Clases residuales eliminadas: `.site-footer-brand-lockup`, `.site-footer-logo-mark`, `.site-footer-brand-copy`, `.site-footer-copyright-brand`

### Breakpoints normalizados (NOA-150)
- Sistema único: 479/767/768/1023/1024/1279/1439/1440
- Reemplazados: `max-width: 768px` → `767px`, `min-width: 769px` → `768px`, `min-width: 1441px` → `1440px`, `max-width: 1440px` → `1439px`
- Documentado en `docs/design-system.md` sección 9

### Tipografía fluida (NOA-153)
- 32 font-size convertidos a `clamp()`: H3 (5), body text (12), botones principales (4), footer (2)
- 10 valores `px` normalizados a `rem`: 15px→0.94rem, 14px→0.875rem, 12px→0.75rem, 11px→0.69rem
- 0 font-size con `px` restantes en globals.css

### Linear
- `NOA-149` → PR abierto
- `NOA-150` → **Done**
- `NOA-153` → **In Review** (PR #37)

---

## [2026-04-16] — Hydration fix, LCP, Crisp position (NOA-146, NOA-134, NOA-107, NOA-126)

### PageLoader SSR fix
- `page-loader.tsx`: migrado a `useSyncExternalStore` para evitar hydration mismatch (`null` en SSR, render en client)
- Hero images: `priority` + `loading="eager"` para mejorar LCP

### Crisp widget reposicionado
- `crisp-chat.tsx`: `position:reverse` → widget en esquina inferior izquierda
- `globals.css`: `.crisp-client .cc-kv6t` sube a `bottom: 80px`, `100px` en ≥1440px

### Dependencias limpiadas (NOA-145)
- Eliminados `@base-ui/react`, `class-variance-authority`, `crisp-sdk-web`, shadcn residuales

### Linear
- Issues `NOA-134`, `NOA-107`, `NOA-126` → **Done**
- Issue `NOA-146` → **Done** (PR #29)

---

## [2026-04-15] — Contact form visible + Crisp chat (NOA-135)

### ContactForm en homepage
- Integrado `<ContactForm />` en la sección `#contacto` sobre el fondo navy (estilos glassmorphism ya existentes)
- Layout `.contact-final-layout` grid 2 columnas desktop (1fr 1fr gap 4rem) → 1 columna mobile (≤1023px)
- Columna izquierda: pills + título + botón mailto secundario "O escríbenos directo" / "Or write us directly"
- Columna derecha: `ContactForm` conectado a `/api/contact` (Resend + Zod + Upstash ratelimit 3/24h)
- i18n nueva key: `ctaSection.directMail` (ES + EN)
- Botón mailto: ícono email hover muestra `hello@noatechsolutions.com`

### Crisp chat integration
- `app/components/crisp-chat.tsx`: script injection (`window.$crisp` + `CRISP_WEBSITE_ID` + `client.crisp.chat/l.js`), solo activa si `NEXT_PUBLIC_CRISP_ID` tiene valor
- `types/crisp.d.ts`: type augmentation de `Window` con `$crisp: unknown[]` y `CRISP_WEBSITE_ID: string`
- `CrispChat` integrado en `app/layout.tsx` como último hijo del body
- `.env.example`: `NEXT_PUBLIC_CRISP_ID=` agregado
- Dependency: `crisp-sdk-web` instalado (no usado, dejado para futura migración al SDK tipado)

---

## [2026-04-15] — Placeholder pages + fix anclas (NOA-134, NOA-137)

### Páginas placeholder creadas
- `/servicios` — "Nuestros Servicios"
- `/portafolio` — "Portafolio de Proyectos"
- `/blog` — "Blog & Recursos"
- `/nosotros` — "Sobre Nosotros"
- `/contacto` — "Contacto"

Cada página usa `<PlaceholderPage title="...">` wrapper compartido con navbar + badge "Próximamente" + título clamp + footer. `export const metadata` con title + description.

### Componentes auxiliares
- `app/components/placeholder-page.tsx` — wrapper compartido
- `app/components/site-footer-i18n.tsx` — SiteFooter con i18n automático (páginas server-side no pasan props)

### Nav links actualizados (fix anclas rotas NOA-134)
- Home: `#home` → `/`
- Servicios: `#servicios` → `/servicios`
- Soluciones: `#solutions` (roto) → `/portafolio`
- Nosotros: `#about-us` (roto) → `/nosotros`
- Contacto: `#contacto` (sin cambio)

---

## [2026-04-15] — Documentación nomenclatura (NOA-136)

### docs/COMPONENTS.md
- 10 secciones de homepage con nombre canónico, componente, archivo, ID, animación
- 13 componentes de sección con props
- 14 componentes UI reutilizables
- 11 tipos de botones del sistema
- Tabla de páginas actuales + planificadas
- Variables CSS principales (colores, espaciado responsive, texto)
- Guía de uso para referirse a secciones/botones en Linear y Claude Code

---

## [2026-04-15] — Reorganización de secciones + fix anclas (NOA-132)

### Nuevo orden de secciones en `app/page.tsx`
1. `#home` — Hero
2. GrowthMessagesSection
3. `#servicios` — ServicesStackSection (scroll-stacking)
4. `#proceso` — ProcessStickySection (sticky pin)
5. HeroParallaxDemo (parallax horizontal)
6. `#reviews` — ReviewsMarqueeSection
7. Mid-CTA (`.services-proof-section`)
8. `#contacto` — Contact final
9. `#faq` — FAQ accordion
10. SiteFooter

### Anclas DOM agregadas
- `id="servicios"` → wrapper de `ServicesStackSection`
- `id="proceso"` → wrapper de `ProcessStickySection`
- `id="reviews"` → wrapper de `ReviewsMarqueeSection`
- `id="contacto"` ya existía
- `id="faq"` ya existía

### Pendiente (issues separados)
- `#solutions` y `#about-us` del nav no tienen ID destino
- Sección de contacto visible (ContactForm) antes del FAQ
- Integración Crisp chat

---

## [2026-04-15] — Fixes técnicos múltiples (NOA-125 / NOA-126)

### Botones
- `.btn-cta-navy`: `min-width: fit-content`, text-hover centrado `left:0 right:0 width:100% justify-content:center`
- `.btn-body-primary .btn-text-hover`: mismo patrón centrado, `padding: 0 12px`
- Mobile: sin hover en touch (`:hover → transform: none`), solo 3D press en `:active`
- Botón secundario CTA "Preguntar por pagos" eliminado
- Ghost button: sin blur (eliminado `filter: drop-shadow`), wrapper transparente, orb `display: none`, hover con border-glow

### Footer
- Wrapper `<div className="site-footer-bottom">` agrupa watermark + copyright-brand
- Mobile: grid 2 columnas, watermark `clamp(2.8rem, 12vw, 4.5rem)` sin desborde, copyright con `order: 2`
- Logo sin contenedor, height 4rem, fondo navy `#0c1e4a`

### FAB mobile
- Ícono hamburger → sliders SVG con círculos rellenos
- Mini menú: idioma (ES/EN) + tema (sol/luna), stagger 80ms, spring `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Navbar tablet/desktop
- Mobile: controles solo en FAB
- Tablet normal: theme + lang fixed top-right con gap
- Tablet/Desktop scrolled: theme top-LEFT + lang top-right (transition 0.3s)
- Desktop normal: ambos dentro del navbar (`NavInlineControls`)

### CTA section
- `$299` con `AuroraText` colores `["#ffffff", "#ff9900", "#ffcc00", "#ff6600"]`
- Pills amber `#ff9900` con `rgba(255,153,0,0.15)` bg
- Ícono "regalo" → rayo tecnológico `M13 2L3 14h9l-1 8 10-12h-9l1-8z`
- Línea azul entre secciones eliminada (`.section-divider` → `border-top: none`)

### PageLoader (NOA-121)
- `/app/components/page-loader.tsx` con logo fade-in 0.3s + barra progreso 1.6s (navy→electric→sky)
- Cortina split cubic-bezier, unmount a 2800ms via `sessionStorage["nts-loaded"]`

### Linear
- Issues `NOA-117`, `NOA-119`, `NOA-120`, `NOA-121`, `NOA-122`, `NOA-123`, `NOA-124`, `NOA-125`, `NOA-126`, `NOA-132` → **Done**

---

## [2026-04-12] — Sistema completo de botones (NOA-117)

### Button System CSS (`globals.css`)
- 7 tipos de botón: `btn-body-primary`, `btn-body-amber`, `btn-body-ghost`, `btn-cta-navy`, `btn-cta-ghost-navy`, `btn-body-electric`, `btn-nav-primary`, `btn-nav-ghost`
- Efecto 3D press (translateY + box-shadow) en todos los tipos
- `btn-body-primary`: anillo pulsante idle + text swap hover (idle → hover con ícono)
- `btn-cta-navy`: glow pulse amber + text swap hover (flecha → regalo)
- `btn-body-ghost` / `btn-cta-ghost-navy`: orb navy/blanco orbitando el borde
- 3 keyframes: `btn-ring-pulse`, `btn-orbit`, `btn-glow-pulse`
- Mobile: full-width en `≤767px`
- Dark mode: primary → sky `#05a5ff`, ghost → orb sky, nav → sky

### Componentes reutilizables
- `app/components/ui/btn-primary-hero.tsx` — `BtnPrimaryHero`: desktop `<a>` + mobile `HoverBorderGradient`
- `app/components/ui/btn-ghost-moving.tsx` — `BtnGhostMoving`: `MovingBorderButton` con orb amber

### page.tsx
- Mid-CTA: `MovingBorderButton` → `btn-cta-navy` con text swap (flecha → regalo + "¡Vamos allá!")
- Contact-final: `MovingBorderButton` → `btn-cta-navy` + `btn-cta-ghost-navy` secundario

### Correcciones visuales previas (NOA-105, NOA-106, NOA-107, NOA-108)
- Precio $299: `AuroraText` con colores `#ffffff, #ff9900, #ffcc00, #ff6600`
- Pills CTA: `color: #ff9900`, `background: rgba(255,153,0,0.15)`, iconos amber
- Línea azul entre secciones: `.section-divider` → `border-top: none`
- Footer: fondo `#0c1e4a`, textos blancos, socials bordes blancos, watermark sutil

### Documentación
- `docs/design-system.md`: sección 3.1 "Sistema de botones" con tabla de 8 tipos + estructuras HTML

### Linear
- Issue `NOA-117` movido a estado **Done**

---

## [2026-04-12] — Formulario de contacto con Resend (NOA-80)

### API Route
- `app/api/contact/route.ts`: POST endpoint con validación Zod (nombre, email, mensaje, honeypot)
- Rate limiting: Upstash Redis + `@upstash/ratelimit` — max 3 requests por IP cada 24h
- Resend: email a `hello@noatechsolutions.com` + confirmación automática al usuario
- Respuestas tipadas: 200/400/429/500 con `ContactResponse` type

### Componente
- `app/components/contact-form.tsx`: formulario con estados idle/loading/success/error
- Honeypot anti-spam (campo oculto)
- Errores inline por campo + banner de error genérico
- Grid responsive: 1 columna mobile → 2 columnas tablet+
- Glassmorphism sobre fondo navy (`rgba(255,255,255,0.06)` + `backdrop-filter: blur(12px)`)
- Submit button amber gradient (DS compliant)
- i18n completo ES + EN en `lib/i18n.ts`

### Integración
- `app/page.tsx`: reemplazado `<a mailto>` por `<ContactForm />` en sección contacto
- `.env.example` creado con todas las keys necesarias
- `.gitignore`: excepción `!.env.example`

### Dependencias
- `resend`, `zod`, `@upstash/redis`, `@upstash/ratelimit`

### Linear
- Issue `NOA-80` movido a estado **Done**

---

## [2026-04-11] — Dark mode completo (NOA-78, sesión 3)

### Dark mode
- Anti-FOUC: script inline en `<head>` lee `localStorage('ntssign-theme')` → fallback `prefers-color-scheme` → aplica clase `dark` al `<html>` antes de hydration React
- `app/components/theme-provider.tsx`: `ThemeProvider` + `useTheme()` con `{ theme, toggleTheme }`, persistencia en `localStorage key ntssign-theme`
- `ThemeToggle` en `app/components/ui/resizable-navbar.tsx`: track navy/sky, knob blanco, íconos sol/luna SVG, transición 200ms. Exportado como componente independiente
- Toggle integrado en `resizable-navbar-demo.tsx`: desktop (junto al CTA) + mobile (dentro del menú hamburger)
- `globals.css` — tokens y componentes:
  - `--bg-cta-final: #022977` agregado a `:root` (ya existía en `.dark {}`) — CTA final siempre navy
  - `.page-shell` → `var(--bg-page)` (era `#ffffff` hardcodeado)
  - `.hero-badge` → `var(--bg-page)` para adaptar al modo
  - `.hero-copy-showcase` → `var(--text-body)` (eliminado grey `#6a7fa9`, violación DS)
  - `.contact-final-section` → `var(--bg-cta-final)` (era gradient dark, ahora siempre `#022977`)
  - Footer: light mode `var(--bg-section)` (#f0f4ff) + dark mode gradient navy; textos con overrides `.dark .site-footer-*` para copyright, column-title, links, socials, watermark

### Linear
- Issue `NOA-78` movido a estado **In Review**

---

## [2026-04-11] — Configuración integración Linear (sesión 2)

### Integración Linear
- Instalado `@linear/sdk` v81
- Creado `lib/linear.ts` con funciones: `createIssue`, `updateIssueStatus`, `addComment`, `getTeamIssues`
- Creado `lib/linear-config.ts` con `TEAM_ID` y `PROJECT_ID` del proyecto `noatechsolutions-web`
- Creados scripts: `linear-setup.ts`, `linear-done.ts`, `linear-move.ts`
- Agregados scripts en `package.json`: `linear:setup`, `linear:done`, `linear:move`
- Proyecto `noatechsolutions-web` creado en Linear bajo el workspace NoaTechSolutions
- Issue `NOA-77` creado en Linear: "Limpieza inicial y sync design system" → estado Done, labels design + infra
- Labels `design` (#0400f0) e `infra` (#ff9900) creados en el team NoaTechSolutions [NOA]
- Fix: env loader en scripts soporta UTF-16 LE (Windows) y UTF-8

---

## [2026-04-11] — Limpieza inicial y sync design system (NTS-001)

### Eliminados
- `app/components/resizable-navbar.tsx` — stub duplicado con datos hardcodeados en inglés
- `components/ui/button.tsx` — componente shadcn sin uso real
- `components/ui/container-text-flip.tsx` — sin uso
- `components/ui/hyper-text.tsx` — sin uso
- `components/ui/sticky-scroll-reveal.tsx` — sin uso

### Corregidos — Colores
- `#02215f` → `#022977` en todo el proyecto (navy primario correcto según DS)
- rgba equivalente `rgba(2,33,95,...)` → `rgba(2,41,119,...)` en todos los componentes
- Eliminado `--color-body: #222222` (gris prohibido por DS en light mode)
- Eliminado `--color-ink-soft: #41516f` (gris prohibido por DS en light mode)
- Nuevos tokens de texto: `--text-label: rgba(2,41,119,0.5)`, `--text-body: rgba(2,41,119,0.7)`

### Corregidos — Tokens CSS (renombrados al naming del DS)
- `--color-ink` → `--color-navy`
- `--color-highlight` → `--color-amber`
- `--color-accent-soft` → `--color-sky`
- `--color-panel` → `--bg-section`
- `--color-panel-soft` → `--bg-card`
- `--color-paper` → `--bg-page`

### Agregados — Dark mode
- Bloque `.dark {}` en `globals.css` con 13 tokens: `--bg-page`, `--bg-section`, `--bg-card`, `--bg-card-pop`, `--text-heading`, `--text-body`, `--text-label`, `--text-note`, `--border-default`, `--color-navy`, `--color-amber`, `--bg-cta-final`

### Corregidos — Tipografía
- `app/layout.tsx`: eliminado Montserrat (Google Font), reemplazado por system fonts
- `globals.css`: `--font-body-fallback` → `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `globals.css`: 42 violaciones de `font-weight: 600/700/800` → `font-weight: 500`
- TSX: `font-bold`, `font-semibold`, `font-extrabold` → `font-medium` en 6 archivos

### Documentación
- Generado `docs/AUDIT.md` con inventario completo de componentes, dependencias, assets y tokens
- Sección `## 6. CORRECCIONES EJECUTADAS` agregada a `docs/AUDIT.md`
