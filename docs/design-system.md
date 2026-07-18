# Design System — NoaTechSolutions Website

> Single source of truth del sistema visual del sitio.
> Stack: Next.js 16 + React 19 + Tailwind 4 + motion/react + GSAP.
> Última actualización: Abril 2026.

## Contenido

1. [Colores](#1-colores)
2. [Tipografía](#2-tipografía)
3. [Breakpoints](#3-breakpoints)
4. [Botones](#4-botones)
5. [Componentes](#5-componentes)
6. [Secciones del homepage](#6-secciones-del-homepage)
7. [Patrones de layout](#7-patrones-de-layout)
8. [Efectos y animaciones](#8-efectos-y-animaciones)
9. [Reglas absolutas](#9-reglas-absolutas)
10. [Hallazgos de deuda técnica](#10-hallazgos-de-deuda-técnica)

---

## 1. Colores

### Brand tokens (variables CSS `:root`)

| Token | Hex | Uso semántico |
|---|---|---|
| `--color-navy` | `#022977` | Primario — headings, body, logo, botón navy |
| `--color-accent` | `#0400f0` | Electric — hover del primario, acentos |
| `--color-sky` | `#05a5ff` | Sky/cyan — eyebrows, primario en dark, iconos activos |
| `--color-amber` | `#ff9900` | Secundario — botón amber, badges, highlighter |
| `--color-amber-hover` | `#cc7a00` | Hover del secundario amber |
| `--color-line` | `rgba(2,41,119,0.12)` | Bordes suaves |
| `--color-line-strong` | `rgba(2,41,119,0.18)` | Bordes prominentes |

### Fondos

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--bg-page` | `#ffffff` | `#0b0f1a` | Fondo principal del `<main>` |
| `--bg-section` | `#f0f4ff` | `#0f1628` | Secciones alternas (hero, footer) |
| `--bg-card` | `#f7f8fa` | `#161d30` | Cards de features/servicios |
| `--bg-card-pop` | — | `#0a1a3a` | Card "destacada" (solo dark) |
| `--bg-cta-final` | `#022977` | `#022977` | **Invariable** — CTA2 siempre navy |

### Texto

| Uso | Light | Dark |
|---|---|---|
| Headings (H1/H2/H3) | `#022977` | `#f0f4ff` |
| Body / párrafos | `rgba(2,41,119,0.7)` | `#c8d8f0` |
| Labels / eyebrows | `rgba(2,41,119,0.5)` | `rgba(200,216,240,0.6)` |
| Notas / trust lines | `rgba(2,41,119,0.45)` | `rgba(200,216,240,0.45)` |

**Regla crítica light mode**: NO usar grises genéricos (`#666`, `#999`) sobre `#ffffff` o `#f0f4ff`. Todo texto es navy con distintas opacidades.

### Shadows

| Token | Valor |
|---|---|
| `--shadow-soft` | `0 24px 70px rgba(2,41,119,0.08)` |
| `--shadow-card` | `0 16px 40px rgba(2,41,119,0.08)` |

### Bordes

| Contexto | Light | Dark |
|---|---|---|
| Default | `0.5px solid rgba(2,41,119,0.12)` | `0.5px solid rgba(255,255,255,0.08)` |
| Card destacada | `2.5px solid #022977` | `2.5px solid #05a5ff` |

### Hex hardcoded más frecuentes en `globals.css`

Los tokens DEBERÍAN usarse siempre, pero hay hexadecimales repetidos candidatos a refactor:

| Hex | Ocurrencias | Semántica | Reemplazo recomendado |
|---|---|---|---|
| `#ffffff` | 59 | blanco puro | — |
| `#ff9900` | 26 | amber | `var(--color-amber)` |
| `#022977` | 19 | navy | `var(--color-navy)` |
| `#0400f0` | 11 | electric | `var(--color-accent)` |
| `#05a5ff` | 9 | sky | `var(--color-sky)` |
| `#b36b00` | 7 | amber oscuro (hover) | Token nuevo sugerido |
| `#011540` / `#011a52` | 6 | navy profundo (CTA1 bg, radial mask) | Token nuevo sugerido |

---

## 2. Tipografía

### Fonts cargadas ([`app/layout.tsx`](app/layout.tsx))

**Space Grotesk** (Google Fonts):
```ts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500"],
});
```

**System stack fallback** para body:
```css
--font-body-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Variables CSS

| Variable | Uso |
|---|---|
| `--font-display` | Space Grotesk — headings, display |
| `--font-body-stack` | System stack — párrafos, UI |
| `--font-display-stack` | `"Space Grotesk", "Trebuchet MS", "Segoe UI"` |

### Escalas responsive (clamp())

| Contexto | clamp() | Rango |
|---|---|---|
| Hero title showcase | `clamp(3.2rem, 7vw, 5.8rem)` | 51–93px |
| Hero copy | `clamp(1.08rem, 1.9vw, 1.34rem)` | 17–21px |
| Section title (H2) | `clamp(2.1rem, 4vw, 3.4rem)` | 34–54px |
| Feature title | `clamp(1.9rem, 3.2vw, 2.8rem)` | 30–45px |
| Mid-CTA title | `clamp(1.8rem, 3.95vw, 5rem)` | 29–80px |
| Growth center title | `clamp(3.4rem, 7vw, 6rem)` | 54–96px |
| Hero rotating word | `clamp(1.32rem, 3.75vw, 4.95rem)` | 21–79px |
| Section copy | `1.02rem` fija | ~16px |
| Eyebrow | `0.75rem` + `letter-spacing: 0.28em` | ~12px uppercase |

### Pesos y line-heights

| Elemento | Peso | Line-height |
|---|---|---|
| Headings | 500 | 1.02–1.12 |
| Body | 400 | 1.75 |
| Eyebrow | 500 | 1 |
| Section copy | 400 | 1.95 |

**Solo se cargan pesos 400 y 500**. Evitar `font-weight: 600/700`.

---

## 3. Breakpoints

### Media queries en uso (por frecuencia)

| Breakpoint | Frecuencia | Target |
|---|---|---|
| `(max-width: 767px)` | 9 | Mobile |
| `(max-width: 768px)` | 8 | Mobile (variante) |
| `(min-width: 1024px)` | 8 | Desktop |
| `(max-width: 1023px)` | 7 | Mobile + tablet |
| `(min-width: 769px) and (max-width: 1023px)` | 5 | Tablet (precise) |
| `(min-width: 1440px)` | 5 | Wide desktop |
| `(min-width: 768px) and (max-width: 1023px)` | 4 | Tablet |
| `(min-width: 1024px) and (max-width: 1440px)` | 2 | Desktop medio |
| `(hover: hover)` | 2 | Devices con mouse |
| `(hover: none)` | 1 | Touch-only |
| `(prefers-reduced-motion: reduce)` | 1 | Accesibilidad |

### Tailwind breakpoints (defaults)

- `sm: 640px`
- `md: 768px` (tablet)
- `lg: 1024px` (desktop) — **breakpoint crítico del proyecto**
- `xl: 1280px`
- `2xl: 1536px`

### Estrategia responsive

**Mobile-first**. Base styles sin `@media`, overrides con `@media (min-width: ...)` escalan hacia arriba. Las excepciones `@media (max-width: ...)` se usan para reducir tamaños o cambiar layouts específicamente en mobile.

### Breakpoint crítico: `lg` (1024px)

- `< 1024px`: layouts colapsan a 1 columna (hero stats, servicios stack, contact form)
- `≥ 1024px`: layouts se despliegan a grids multi-columna
- Sticky + parallax effects activos solo en desktop

---

## 4. Botones

### Sistema de 3 variantes semánticas

#### 4.1 Botón primario
```css
background: #022977;
color: #ffffff;
padding: 11px 26px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
/* hover */
background: #0400f0;
```
**Dark mode:**
```css
background: #05a5ff;
color: #00183a;
/* hover */
background: #33b8ff;
```
**Uso:** Acción principal — "Empezar proyecto", "Solicitar acceso"

#### 4.2 Botón secundario (amber)
```css
background: #ff9900;
color: #ffffff;
padding: 11px 26px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
/* hover */
background: #cc7a00;
```
**Dark mode:** mismo — el amber no cambia entre modos.
**Uso:** Acción secundaria — siempre visible sobre cualquier fondo.

#### 4.3 Botón ghost (outline)
```css
background: #ffffff;
color: #022977;
border: 2.5px solid #022977;
padding: 9px 24px;
border-radius: 8px;
/* hover */
background: #022977;
color: #ffffff;
```
**Dark mode:**
```css
background: #0b0f1a;
color: #05a5ff;
border: 2.5px solid #05a5ff;
```
**Uso:** Acción terciaria — "Login", "Ver precios"

#### 4.4 Botones sobre fondo navy (CTA final)
```css
/* Primario sobre navy */
background: #ff9900;
color: #ffffff;

/* Secundario sobre navy */
background: transparent;
color: #ffffff;
border: 2.5px solid #ffffff;
/* hover */
background: rgba(255,255,255,0.15);
```

### Regla por fondo

| Fondo | Primario | Secundario | Ghost |
|---|---|---|---|
| Blanco `#ffffff` | Navy | Amber | Outline navy + bg blanco |
| Hero `#f0f4ff` | Navy | Amber | Outline navy + bg blanco |
| Navy `#022977` | Amber | Outline blanco | — |
| Dark `#0b0f1a` | Sky | Amber | Outline sky |

### Clases CSS activas

| Clase | Color | Efecto | Contexto |
|---|---|---|---|
| `.btn-body-primary` | Navy | 3D press + anillo idle + text swap hover | Hero, body sections |
| `.btn-body-amber` | Amber | 3D press | Secundario sobre claros |
| `.btn-body-ghost` | Outline navy | Orb navy orbitando + 3D press | Terciario sobre claros |
| `.btn-cta-navy` | Amber | Glow pulse + 3D press + text swap hover + icon fade-out | Sobre fondo navy (CTA1/CTA2) |
| `.btn-cta-ghost-navy` | Outline blanco | Orb blanco orbitando | Secundario sobre navy |
| `.btn-body-electric` | Electric `#0400f0` | 3D press | Acción especial/destacada |
| `.btn-nav-primary` | Navy pill | 3D press, hover → electric | Navbar CTA |
| `.btn-nav-ghost` | Texto navy | Hover bg sutil | Navbar links secundarios |

### Estructura HTML del text-swap

**`.btn-body-primary` / `.btn-cta-navy`** (text swap en hover):
```html
<a class="btn-cta-navy">
  <span class="btn-icon"><svg>→</svg></span>
  <span class="btn-text-idle">Empezar proyecto</span>
  <span class="btn-text-hover"><svg>⚡</svg> ¡Vamos allá!</span>
</a>
```

En hover: el icono hace fade-out + slide-left, el texto idle sale por arriba, el texto hover entra centrado por abajo.

**`.btn-body-ghost` / `.btn-cta-ghost-navy`** (con orb orbital):
```html
<div class="btn-body-ghost">
  <div class="btn-ghost-orb"></div>
  <a class="btn-ghost-inner">Ver soluciones</a>
</div>
```

---

## 5. Componentes

### Componentes de página ([app/components/](app/components/))

| Componente | Rol |
|---|---|
| `growth-messages-section.tsx` | Cards orbitales con glitch scroll-trigger (posición #2) |
| `growth-messages-v2.tsx` | Layout sticky 2-col con LayoutTextFlip + CardSticky stack (posición #3) |
| `hero-parallax-demo.tsx` | Wrapper del HeroParallax con data del portafolio |
| `hero-rotating-word.tsx` | Flip accesible entre palabras (aria-live) |
| `process-sticky-section.tsx` | Sticky pin + CardSwap GSAP por paso |
| `reviews-marquee-section.tsx` | Marquee CSS desktop / carousel touch mobile |
| `services-stack-section.tsx` | Cards apiladas (orphan — no renderizado) |
| `contact-form.tsx` | Form con Zod + Resend + Upstash ratelimit |
| `site-footer-nurui.tsx` | Footer activo con TextHoverEffect watermark |
| `site-footer.tsx`, `site-footer-i18n.tsx` | Variantes legacy (no renderizadas) |
| `mobile-speed-dial.tsx` | FAB amber con mini-menú idioma + tema (solo mobile) |
| `page-loader.tsx` | Logo fade + progress bar + cortina split |
| `resizable-navbar-demo.tsx` | Navbar que colapsa a pill al scroll (`isScrolled > 24px`) |
| `noa-mascot.tsx` | Mascota animada con expresiones scroll-bound |
| `language-provider.tsx` | Context + localStorage → `useLanguage()` |
| `theme-provider.tsx` | Context + clase `.dark` → `useTheme()` |
| `lenis-provider.tsx` | Wrapper de Lenis smooth-scroll |
| `crisp-chat.tsx` | Widget Crisp chat integrado |

### Componentes UI reutilizables ([components/ui/](components/ui/))

| Componente | Librería | Descripción |
|---|---|---|
| `card-swap.tsx` | GSAP | Stack de cards con autoplay + skew + z-index choreography |
| `aurora-text.tsx` | CSS | Texto con gradient animado |
| `background-boxes.tsx` | motion/react | Grid de 1,500 celdas con whileHover + fallback touch loop |
| `cards-stack.tsx` | motion/react | Primitives `ContainerScroll` + `CardSticky` |
| `comet-card.tsx` | motion/react | Card 3D mouse-follow con springs |
| `flip-words.tsx` | motion/react | Palabras con flip letra a letra |
| `hero-parallax.tsx` | motion/react | Scroll-driven parallax 3 filas |
| `highlighter.tsx` | rough-notation | Wrappea texto con highlight/underline/box |
| `hover-border-gradient.tsx` | motion/react | Borde gradient rotante al hover |
| `layout-text-flip.tsx` | motion/react | Texto estático + palabra rotativa |
| `moving-border.tsx` | motion/react | Botón con orb que orbita el borde |
| `number-ticker.tsx` | motion/react | Contador spring al entrar en viewport |
| `text-hover-effect.tsx` | motion/react | SVG text con reveal mask radial mouse-follow |

### Dependencias externas clave

```
next              ^16.2.0      Framework
react + react-dom ^19.2.4      Base
motion            ^12.38.0     Animaciones (Framer rebrand)
gsap              ^3.14.2      CardSwap + timelines
three             ^0.183.2     3D orb hero
lucide-react      ^0.577.0     Iconos
rough-notation    ^0.5.1       Highlighter annotations
lenis             ^1.3.23      Smooth scroll
resend            ^6.10.0      Emails del contact form
zod               ^4.3.6       Schema validation
@upstash/ratelimit             Rate limiting del contact form
tailwindcss       ^4           CSS framework
tailwind-merge    ^3.5.0       `cn()` merge para clases
clsx              ^2.1.1       `cn()` conditional
```

---

## 6. Secciones del homepage

Desde [`app/page.tsx`](app/page.tsx) — marcadores canónicos `{/* ── N. NAME ── */}`:

| # | Nombre canónico | Componente/Clase | ID ancla | Descripción |
|---|---|---|---|---|
| 1 | **Header** | `ResizableNavbarDemo` + `.hero-showcase` | `#home` | Navbar resizable + hero con title, rotating word, 3 botones, stats con NumberTicker |
| 2 | **Problemas** | `GrowthMessagesSection` (legacy) | — | Cards orbitales scroll-trigger con glitch enter/exit. Consume `t.growthSection` |
| 3 | **Servicios** | `GrowthMessagesV2` (sticky 2-col) | `#servicios` | Left column sticky con LayoutTextFlip + right column CardSticky stack con 3D rotate. Consume `t.servicesSection` |
| 4 | **CTA1** (Mid-CTA) | inline `.services-proof-section` | — | Full-bleed navy `#011540`, background Boxes + radial mask, h2 bicolor + botón amber |
| 5 | **Ruta** (Process) | `ProcessStickySection` | `#proceso` | Sticky pin + CardSwap GSAP por step con `scrollYProgress` |
| 6 | **PortfolioWeb** | `HeroParallaxDemo` → `HeroParallax` | — | Parallax 3 filas horizontal con scroll-driven transforms |
| 7 | **Testimonios** | `ReviewsMarqueeSection` | `#reviews` | Marquee infinito desktop / carousel touch mobile |
| 8 | **CTA2** (Contact Final) | inline `.contact-final-section` | `#contacto` | Full-bleed navy `#022977`, Boxes + radial mask + onda inferior, pills eyebrow, AuroraText price, CTA mailto |
| 9 | **FAQ** | inline `.contact-faq-section` | `#faq` | Accordion con iconos lucide, left copy + right grid accordion |
| 10 | **Contact** | `ContactForm` (inline wrapper) | `#contacto-form` | Form 2-col desktop: left motivacional + right form con Resend |
| 11 | **Footer** | `SiteFooterNurui` | — | Multi-idioma, columnas links, watermark con TextHoverEffect |

### Overlays globales

- `MobileSpeedDial` — FAB amber con menú idioma+tema (mobile only, fixed)
- `NoaMascot` — mascota animada (fixed, scroll-bound expressions)
- `PageLoader` — en `layout.tsx`, renderiza solo primera carga (sessionStorage gate)

---

## 7. Patrones de layout

### Clases helper principales

| Clase | Propósito |
|---|---|
| `.page-shell` | Root del `<main>`: `position: relative; background: var(--bg-page); user-select: none` |
| `.grid-shell` | Container centrado: `width: min(1180px, calc(100% - 2rem)); margin-inline: auto` |
| `.section-space` | Padding vertical responsive: `padding-block: 2.8rem 4rem` (desktop) / `3rem 3rem` (mobile) |
| `.section-divider` | Separador visual entre CTA sections |
| `.hero-showcase` | Hero full-viewport: `min-height: 100svh/100dvh; padding: 4.2rem 0 4.5rem` |
| `.section-title` | H2 estándar: `font-size: clamp(2.1rem, 4vw, 3.4rem)` |
| `.eyebrow` | Label sup: `0.75rem uppercase; letter-spacing: 0.28em; color: var(--color-sky)` |
| `.section-copy` | Párrafo: `1.02rem; line-height: 1.95; color: var(--text-body)` |

### Full-bleed sections (escape del container)

Patrón usado en CTA1 (`.services-proof-section`) y CTA2 (`.contact-final-section`):

```css
position: relative;
left: 50%;
width: 100vw;
margin-left: -50vw;
padding: 8.5rem 1.5rem 6.5rem;   /* CTA2 ejemplo */
overflow: hidden;                 /* crítico — contiene hijos absolute */
isolation: isolate;               /* nuevo stacking context */
```

### Overflow-x handling crítico

`html { overflow-x: hidden }` en [globals.css](app/globals.css) para que `position: sticky` descendientes no se rompan. **El `.page-shell` NO debe tener `overflow-x: hidden`** — se movió a `html`.

### Ondas decorativas (`::before` / `::after`)

Las CTA sections usan pseudo-elementos con SVG path inline:

```css
.services-proof-section::before,
.services-proof-section::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 6rem;
  z-index: 2;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.services-proof-section::before { top: -1px; background-image: url("..."); }
.services-proof-section::after  { bottom: -1px; background-image: url("..."); }
```

Mobile override: `height: 2rem`.

**Excepción CTA2**: el `::after` del CTA2 está ocupado por overlay decorativo. La onda inferior se implementa con `<div className="contact-final-wave-bottom">` dedicado.

### Pointer-events pattern (fondos interactivos + shell)

En secciones con background interactivo (Boxes) + shell con contenido:

```css
.cta-background  { pointer-events: auto; }   /* recibe mousemove para Boxes hover */
.cta-shell       { pointer-events: none; }   /* eventos pasan through al fondo */
.cta-shell a,
.cta-shell button { pointer-events: auto; }  /* pero buttons siguen clickables */
```

### Espaciado y contenedores

- **Padding de sección**: `60–80px` vertical en desktop, `40px` en mobile
- **Gap entre cards**: `10–12px`
- **Padding interno de cards**: `16–18px`
- **Max-width de contenido**: `1100–1200px`
- **Padding lateral mobile**: `16–20px`

### Border radius

| Elemento | Radius |
|---|---|
| Botones | `8px` |
| Cards | `10–12px` |
| Navbar / hero / secciones con fondo | `12px` |
| Badge / tags | `20px` (pill) |
| Logo mark | `7px` |
| Step number | `50%` (círculo) |
| Feature icon | `8px` |

---

## 8. Efectos y animaciones

### Keyframes CSS ([globals.css](app/globals.css))

| Keyframe | Uso | Duración |
|---|---|---|
| `badge-shimmer` | Shine del hero badge | 6.85s ease-in-out infinite |
| `btn-ring-pulse` | Ring pulse en botón primary | 1.8s |
| `btn-orbit` | Orb que orbita botón (moving-border) | 3s linear infinite |
| `btn-glow-pulse` | Glow perpetuo del CTA amber | 2.5s |
| `loader-logo-in` | Fade-in logo del PageLoader | ~1.6s |
| `loader-bar-fill` + `loader-bar-glow` | Progress bar | 1.6s |
| `hero-float` | Floating orb + robotic-hand | variable |
| `reviews-marquee-scroll` | Marquee infinito testimonios | infinite |
| `growth-warning-pulse` | Pulse de warning cards (growth v1) | variable |
| `aurora-text-shift` | Gradient shift del AuroraText | 8s default |
| `growth-card-glitch-in` / `-out` | Entry/exit glitch de cards | 1500ms |
| `growth-card-glitch-layer-a/b` | RGB split layers del glitch | 1500ms |
| `growth-text-glitch-scale` + `-a/b` | Text glitch effect | 1500ms |
| `noa-float` / `noa-wave` / `noa-celebrate` | Expresiones del mascot | variables |

### Librerías de animación

- **motion/react (Framer Motion rebrand)** — default para componentes: `useScroll`, `useTransform`, `useSpring`, `useInView`, `whileHover`, `whileInView`, `AnimatePresence`, `layoutId`.
- **GSAP** — `card-swap.tsx` timeline choreography.
- **CSS `@keyframes`** — infinite loops y shimmer effects.
- **rough-notation** — annotations scribble en `Highlighter`.

### Efectos visuales custom

| Efecto | Implementación | Dónde |
|---|---|---|
| `.hero-glow` | `blur(60px)` + radial-gradient rgba | Hero left/right corners |
| `MouseGlowBg` | rAF + radial-gradient mouse-follow | Legacy (reemplazado por Boxes) |
| `Boxes` | 50×30 grid motion.div + whileHover + touch fallback loop | CTA1 + CTA2 backgrounds |
| `TextHoverEffect` | SVG text + reveal mask radial gradient | Footer watermark |
| `AuroraText` | CSS gradient animation | Final CTA price highlight |
| `CardSwap` (GSAP) | Stack con skew + z-index + autoplay | Process Sticky steps |

### Transitions estándar

| Duración | cubic-bezier | Uso |
|---|---|---|
| `0.12s` | default | Box shadow micro-interactions |
| `0.15s` | default | Button hover transform (base) |
| `180ms` | `ease` | Nav links color/opacity |
| `0.28s` | `cubic-bezier(0.4, 0, 0.2, 1)` | Button state changes |
| `260ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Navbar resize (collapse a pill) |
| `0.3s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Card hover lift + scale (overshoot) |

### Touch device detection (Boxes fallback)

```ts
const isTouchDevice =
  !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia("(max-width: 1023px)").matches;
```

En touch: loop automático ilumina 5 celdas cada 200ms con fade-out de 1.2s.

### Accesibilidad

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## 9. Reglas absolutas

1. **Nunca usar grises genéricos en light mode** — todo texto es navy con opacidad.
2. **El botón secundario es siempre amber** — visible en cualquier fondo.
3. **El CTA final es siempre navy** — no cambia entre modos.
4. **Nunca texto blanco o gris claro sobre fondo blanco o `#f0f4ff`**.
5. **El amber `#ff9900` nunca se usa como fondo de página o sección** — solo acento/botón.
6. **El electric `#0400f0` solo se usa en hover del botón primario**.
7. **Dos pesos tipográficos únicamente: 400 y 500**.
8. **`html { overflow-x: hidden }` OBLIGATORIO** — para que sticky descendants funcionen.
9. **`.page-shell` NO debe tener `overflow-x: hidden`** — rompe sticky.
10. **Canonical section markers** — toda sección en `page.tsx` debe tener `{/* ── N. NAME ── */}` antes de su wrapper.

---

## 10. Hallazgos de deuda técnica

1. **`ServicesStackSection` huérfano** — archivo existe en `app/components/` pero no se renderiza. Reemplazado por `GrowthMessagesV2` en posición #3.

2. **Breakpoints mixtos (767 vs 768)** — inconsistencia en `globals.css`. Normalizar a `767` (mobile-end) y `768` (tablet-start).

3. **Hex codes hardcoded vs tokens** — 26 usos de `#ff9900` directo en lugar de `var(--color-amber)`.

4. **Pesos Space Grotesk limitados** — solo 400, 500 cargados. Usar `font-weight: 600/700` simula visualmente.

5. **Footers duplicados** — `site-footer.tsx`, `site-footer-nurui.tsx`, `site-footer-i18n.tsx` coexisten. Solo `nurui` se renderiza. Consolidar.

6. **`.mid-cta-distortion` legacy class** — nombre antiguo de cuando se usaba `GridDistortion` Three.js. Renombrar.

7. **`.grid-shell` width inconsistente** — `.grid-shell` usa `min(1180px, ...)` pero `.contact-final-shell` usa `max-width: 1200px`. Estandarizar.

8. **Animation keyframes sin prefix consistente** — algunos usan prefix semántico (`btn-*`, `loader-*`, `growth-*`), otros no.

---

## Archivos de referencia

- [`docs/COMPONENTS.md`](docs/COMPONENTS.md) — inventario canónico de componentes + secciones
- [`docs/AUDIT.md`](docs/AUDIT.md) — auditoría de assets y dependencias
- [`docs/SITEMAP.md`](docs/SITEMAP.md) — orden de secciones y anclas
- [`app/globals.css`](app/globals.css) — fuente verdadera de tokens, variables, keyframes
- [`app/layout.tsx`](app/layout.tsx) — providers + fonts + metadata
- [`app/page.tsx`](app/page.tsx) — orden y estructura del homepage

---

**Cualquier componente, feature o página nueva debe seguir estas convenciones o flagear en el PR por qué se desvía.**
