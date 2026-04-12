# CHANGELOG — NoaTechSolutions Website

## [2026-04-12] — Sistema responsive 7 breakpoints (NOA-79)

### Responsive tokens
- Variables de espaciado en `:root`: `--space-section-mobile/tablet/desktop/wide`, `--max-width: 1100px`, `--padding-mobile/tablet/desktop`

### Tipografía fluida
- H1 (`.hero-title`, `.hero-title-showcase`): `clamp(26px, 5vw, 40px)`
- H2 (`.section-title`, `.feature-title`, `.cta-title`): `clamp(18px, 3vw, 22px)`
- H3 (`.service-title`): `clamp(13px, 2vw, 15px)`
- Body (`.hero-copy`, `.section-copy`, `.service-copy`, etc.): `clamp(14px, 1.5vw, 16px)`

### 7 breakpoints
- Mobile S (≤374px): 1 columna, padding 20px, sin decoraciones hero
- Mobile M (375–479px): 1 columna, hero 26px
- Mobile L (480–767px): 1 columna, hero 30px, isotipo visible
- Tablet (768–1023px): 2 columnas cards, hero 34px, hamburger
- Laptop (1024–1279px): 3 columnas, navbar horizontal completo
- Desktop (1280–1439px): 3 columnas, layout completo
- Wide (1440px+): max-width centrado, section-space 100px, 4 columnas con `.grid-wide`

### Grid-shell responsive
- `width: min(var(--max-width), 100%)` con padding por breakpoint
- Wide: `max-width: var(--max-width)` centrado

### Accesibilidad
- `prefers-reduced-motion: reduce` global (`animation-duration` + `transition-duration` → 0.01ms)
- Touch targets mínimo 44×44px en mobile para `.mobile-nav-toggle`, `.header-cta`, botones
- `NavbarButton` scrolled: 43px → 44px corregido

### Linear
- Issue `NOA-79` movido a estado **In Review**

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
