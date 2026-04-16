# Componentes y Secciones — NoaTechSolutions
> Fuente de verdad de nomenclatura.
> Usar siempre estos nombres en Linear, Claude Code y conversaciones de equipo.
> Última actualización: 2026-04-15 (NOA-136)

---

## Secciones de la homepage (en orden)

| # | Nombre canónico | Componente | Archivo | ID ancla | Animación |
|---|---|---|---|---|---|
| 1 | **Hero Showcase** | inline (`.hero-showcase`) | [app/page.tsx](app/page.tsx) | `#home` | NumberTicker (stats) + HeroRotatingWord |
| 2 | **Growth Messages** | `GrowthMessagesSection` | [app/components/growth-messages-section.tsx](app/components/growth-messages-section.tsx) | — | scrollYProgress + glitch effect |
| 3 | **Services Stack** | `ServicesStackSection` | [app/components/services-stack-section.tsx](app/components/services-stack-section.tsx) | `#servicios` | useScroll + card stacking |
| 4 | **Process Sticky** | `ProcessStickySection` | [app/components/process-sticky-section.tsx](app/components/process-sticky-section.tsx) | `#proceso` | sticky pin + CardSwap |
| 5 | **Hero Parallax** (portfolio) | `HeroParallaxDemo` → `HeroParallax` | [app/components/hero-parallax-demo.tsx](app/components/hero-parallax-demo.tsx) | — | useScroll + useTransform horizontal |
| 6 | **Reviews Marquee** | `ReviewsMarqueeSection` | [app/components/reviews-marquee-section.tsx](app/components/reviews-marquee-section.tsx) | `#reviews` | CSS marquee + mobile carousel |
| 7 | **Mid CTA** | inline (`.services-proof-section`) | [app/page.tsx](app/page.tsx) | — | GridDistortion mouse |
| 8 | **Contact Final** | inline (`.contact-final-section`) | [app/page.tsx](app/page.tsx) | `#contacto` | GridDistortion mouse |
| 9 | **FAQ Accordion** | inline (`.contact-faq-section`) | [app/page.tsx](app/page.tsx) | `#faq` | state interno |
| 10 | **Site Footer** | `SiteFooter` | [app/components/site-footer.tsx](app/components/site-footer.tsx) | — | — |

---

## Componentes de sección

### Growth Messages
- **Archivo:** [app/components/growth-messages-section.tsx](app/components/growth-messages-section.tsx)
- **Props:** `{ title: string; items: readonly string[] }`
- **Animación:** Mensajes orbitales con activación por scroll y efecto glitch
- **Usado en:** homepage
- **Notas:** Usa `useScroll` con ref propio — no anidar en contenedores con `overflow:hidden` o `transform`

### Services Stack
- **Archivo:** [app/components/services-stack-section.tsx](app/components/services-stack-section.tsx)
- **Props:** `{ eyebrow: string; title: string; copy: string; cta: string; cardCta: string; rotatingWords: readonly string[]; items: readonly ServiceItem[] }`
- **Animación:** Cards que se apilan con `useScroll` + fade de opacidad + título rotativo
- **Usado en:** homepage
- **Notas:** CTA usa `.btn-body-ghost` con estructura wrapper + orb + inner

### Process Sticky
- **Archivo:** [app/components/process-sticky-section.tsx](app/components/process-sticky-section.tsx)
- **Props:** `{ eyebrow: string; title: string; rotatingWords: readonly string[]; items: readonly ProcessItem[] }`
- **Animación:** Sticky pin con CardSwap por paso según `scrollYProgress`
- **Usado en:** homepage

### Hero Parallax Demo
- **Archivo:** [app/components/hero-parallax-demo.tsx](app/components/hero-parallax-demo.tsx)
- **Props:** — (ninguno, consume i18n directo)
- **Animación:** Wrapper de `HeroParallax` (componente UI) con grid de productos del portafolio
- **Usado en:** homepage

### Reviews Marquee
- **Archivo:** [app/components/reviews-marquee-section.tsx](app/components/reviews-marquee-section.tsx)
- **Props:** `{ eyebrow: string; title: string; items: readonly ReviewItem[] }`
- **Animación:** Marquee CSS infinito en desktop, carousel touch en mobile
- **Usado en:** homepage

### Site Footer
- **Archivo:** [app/components/site-footer.tsx](app/components/site-footer.tsx)
- **Props:** `{ eyebrow: string; watermark: string; copyright: string; columns: readonly FooterColumn[] }`
- **Animación:** —
- **Usado en:** todas las páginas
- **Notas:** Mobile usa grid 2 cols + `.site-footer-bottom` wrapper con watermark + copyright

### Resizable Navbar Demo
- **Archivo:** [app/components/resizable-navbar-demo.tsx](app/components/resizable-navbar-demo.tsx)
- **Props:** —
- **Animación:** Navbar que colapsa a pill al hacer scroll (`isScrolled > 24px`)
- **Usado en:** homepage
- **Notas:** Usa `NavBody`, `NavInlineControls`, `NavFloatingControls`, `MobileNav` de [app/components/ui/resizable-navbar.tsx](app/components/ui/resizable-navbar.tsx)

### Hero Rotating Word
- **Archivo:** [app/components/hero-rotating-word.tsx](app/components/hero-rotating-word.tsx)
- **Props:** `{ words: readonly string[]; ariaLabel: string }`
- **Animación:** Flip entre palabras con accesibilidad aria-live

### Mobile Speed Dial (FAB)
- **Archivo:** [app/components/mobile-speed-dial.tsx](app/components/mobile-speed-dial.tsx)
- **Props:** —
- **Animación:** FAB amber con mini menú (idioma + tema), stagger 80ms spring
- **Usado en:** homepage (solo mobile ≤767px)

### Page Loader
- **Archivo:** [app/components/page-loader.tsx](app/components/page-loader.tsx)
- **Props:** —
- **Animación:** Logo fade-in + barra progreso 1.6s + cortina split 0.6s
- **Usado en:** [app/layout.tsx](app/layout.tsx) — solo primera carga (sessionStorage `nts-loaded`)

### Contact Form
- **Archivo:** [app/components/contact-form.tsx](app/components/contact-form.tsx)
- **Props:** —
- **Animación:** —
- **Notas:** Envía a `/api/contact` (Resend + Zod + Upstash ratelimit). Honeypot anti-spam. Estados `idle/loading/success/error`
- **Usado en:** actualmente no renderizado (pendiente NOA-135)

### Language Provider
- **Archivo:** [app/components/language-provider.tsx](app/components/language-provider.tsx)
- **Exports:** `LanguageProvider`, `useLanguage`
- **Props:** `{ children: ReactNode }`
- **Notas:** Locale en context + `localStorage`. Hook retorna `{ locale, setLocale }`

### Theme Provider
- **Archivo:** [app/components/theme-provider.tsx](app/components/theme-provider.tsx)
- **Exports:** `ThemeProvider`, `useTheme`
- **Props:** `{ children: ReactNode }`
- **Notas:** Clase `dark` en `<html>`. Hook retorna `{ theme, toggleTheme }`. `localStorage` key `ntssign-theme`. Anti-FOUC inline en `<head>`

---

## Componentes UI reutilizables

### BtnPrimaryHero
- **Archivo:** [app/components/ui/btn-primary-hero.tsx](app/components/ui/btn-primary-hero.tsx)
- **Descripción:** Botón hero primario con variante desktop + mobile (`HoverBorderGradient`)
- **Props:** `{ href: string; children: ReactNode; className?: string }`
- **Dependencias:** `HoverBorderGradient`

### BtnGhostMoving
- **Archivo:** [app/components/ui/btn-ghost-moving.tsx](app/components/ui/btn-ghost-moving.tsx)
- **Descripción:** Botón ghost con borde amber rotante (`MovingBorderButton`)
- **Props:** `{ href: string; children: ReactNode; className?: string }`
- **Dependencias:** `MovingBorderButton` (moving-border)

### Resizable Navbar (system)
- **Archivo:** [app/components/ui/resizable-navbar.tsx](app/components/ui/resizable-navbar.tsx)
- **Exports:** `Navbar`, `NavBody`, `NavbarLogo`, `NavItems`, `NavbarButton`, `LanguageSwitcher`, `MobileNav`, `MobileNavHeader`, `MobileNavToggle`, `MobileNavContactButton`, `MobileNavMenu`, `ThemeToggle`, `NavFloatingControls`, `NavInlineControls`
- **Descripción:** Sistema completo de navbar con context de scroll compartido
- **Dependencias:** React context API

### GridDistortion
- **Archivo:** [app/components/ui/grid-distortion.tsx](app/components/ui/grid-distortion.tsx)
- **Descripción:** Efecto Three.js de distorsión de imagen/video con grid mouse-driven
- **Props:** `{ grid?: number; mouse?: number; strength?: number; relaxation?: number; imageSrc?: string; videoSrc?: string; className?: string }`
- **Dependencias:** three

### AuroraText
- **Archivo:** [components/ui/aurora-text.tsx](components/ui/aurora-text.tsx)
- **Descripción:** Texto con fondo gradient animado tipo aurora boreal
- **Props:** `{ className?: string; children: ReactNode; colors?: string[]; speed?: number }`
- **Dependencias:** CSS animation

### CardSwap
- **Archivo:** [components/ui/card-swap.tsx](components/ui/card-swap.tsx)
- **Descripción:** Stack animado de cards con autoplay y swap por índice
- **Props:** `{ width?, height?, cardDistance?, verticalDistance?, delay?, pauseOnHover?, onCardClick?, skewAmount?, easing?, activeIndex?, children }`
- **Dependencias:** GSAP

### CometCard
- **Archivo:** [components/ui/comet-card.tsx](components/ui/comet-card.tsx)
- **Descripción:** Card 3D con rotación perspectiva que sigue el mouse
- **Props:** `{ children: ReactNode; className?: string; rotateDepth?: number; translateDepth?: number }`
- **Dependencias:** Framer Motion springs

### FlipWords
- **Archivo:** [components/ui/flip-words.tsx](components/ui/flip-words.tsx)
- **Descripción:** Secuencia de palabras con flip letra a letra
- **Props:** `{ words: string[]; duration?: number; className?: string }`
- **Dependencias:** Framer Motion

### HeroParallax
- **Archivo:** [components/ui/hero-parallax.tsx](components/ui/hero-parallax.tsx)
- **Exports:** `HeroParallax`, `Header`, `ProductCard`
- **Descripción:** Sección parallax full-screen con 3 filas de productos y scroll-driven transforms
- **Props:** `{ products: readonly PortfolioProduct[]; title: ReactNode; subtitle: ReactNode; ctaLabel?: string; ctaHref?: string }`
- **Dependencias:** Framer Motion (`useScroll`, `useSpring`, `useTransform`)

### Highlighter
- **Archivo:** [components/ui/highlighter.tsx](components/ui/highlighter.tsx)
- **Descripción:** Wrappea texto con resaltado tipo rough-notation (highlight/underline/box)
- **Props:** `{ children, action?, color?, strokeWidth?, animationDuration?, iterations?, padding?, multiline?, isView? }`
- **Dependencias:** rough-notation

### HoverBorderGradient
- **Archivo:** [components/ui/hover-border-gradient.tsx](components/ui/hover-border-gradient.tsx)
- **Descripción:** Borde gradient animado que rota en sentido configurable al hover
- **Props:** `{ as?, containerClassName?, className?, duration?, clockwise?, children }`
- **Dependencias:** Framer Motion

### LayoutTextFlip
- **Archivo:** [components/ui/layout-text-flip.tsx](components/ui/layout-text-flip.tsx)
- **Descripción:** Texto estático + palabras rotativas con animación de layout
- **Props:** `{ text: string; words: readonly string[]; duration?, className?, textClassName?, wordClassName? }`
- **Dependencias:** Framer Motion

### MovingBorderButton (Button)
- **Archivo:** [components/ui/moving-border.tsx](components/ui/moving-border.tsx)
- **Exports:** `Button`, `MovingBorder`
- **Descripción:** Botón con orb que orbita el borde siguiendo path SVG
- **Props:** `{ borderRadius?, children, as?, containerClassName?, borderClassName?, duration?, className? }`
- **Dependencias:** Framer Motion

### NumberTicker
- **Archivo:** [components/ui/number-ticker.tsx](components/ui/number-ticker.tsx)
- **Descripción:** Animación de contador con spring, activa al entrar en viewport
- **Props:** `{ value: number; startValue?, direction?, delay?, decimalPlaces? }`
- **Dependencias:** Framer Motion (`useInView`)

---

## Sistema de botones

| Nombre canónico | Tipo | Clase / Componente | Fondo recomendado | Uso |
|---|---|---|---|---|
| **HeroPrimary** | Componente | `BtnPrimaryHero` | Cualquiera | Hero — CTA principal |
| **HeroGhost** | Componente | `BtnGhostMoving` | Cualquiera | Hero — CTA secundario |
| **BodyPrimary** | CSS class | `.btn-body-primary` | Blanco / `#f0f4ff` | Secciones cuerpo |
| **BodyAmber** | CSS class | `.btn-body-amber` | Cualquiera | CTAs conversión |
| **BodyElectric** | CSS class | `.btn-body-electric` | Blanco / `#f0f4ff` | Acción especial |
| **BodyGhost** | CSS class | `.btn-body-ghost` | Blanco / `#f0f4ff` | Acciones terciarias |
| **CTANavy** | CSS class | `.btn-cta-navy` | `#022977` navy | CTA final / mid-CTA |
| **CTAGhostNavy** | CSS class | `.btn-cta-ghost-navy` | `#022977` navy | Secundario en navy |
| **NavPrimary** | CSS class | `.btn-nav-primary` | Navbar | Solo navbar |
| **NavGhost** | CSS class | `.btn-nav-ghost` | Navbar | Solo navbar |
| **PillInfo** | CSS class | `.contact-final-pill` | Cualquiera | Decorativo — no clickeable |

---

## Páginas

| Nombre | Ruta | Archivo | Estado |
|---|---|---|---|
| Home | `/` | [app/page.tsx](app/page.tsx) | ✅ Activa |
| Portafolio | `/portafolio` | [app/portafolio/page.tsx](app/portafolio/page.tsx) | ✅ Activa |
| Dashboard | `/dashboard` | [app/dashboard/page.tsx](app/dashboard/page.tsx) | ✅ Activa |
| Servicios | `/servicios` | [app/servicios/page.tsx](app/servicios/page.tsx) | 🚧 Placeholder |
| Blog | `/blog` | [app/blog/page.tsx](app/blog/page.tsx) | 🚧 Placeholder |
| Nosotros | `/nosotros` | [app/nosotros/page.tsx](app/nosotros/page.tsx) | 🚧 Placeholder |
| Contacto | `/contacto` | [app/contacto/page.tsx](app/contacto/page.tsx) | 🚧 Placeholder |

### Redirects

| From | To | Type |
|---|---|---|
| `/portfolio` | `/portafolio` | 301 permanent ([next.config.ts](next.config.ts)) |

### API routes

| Ruta | Archivo | Método | Descripción |
|---|---|---|---|
| `/api/contact` | [app/api/contact/route.ts](app/api/contact/route.ts) | POST | Formulario contacto: Zod + Resend + Upstash ratelimit (3/24h) |

---

## Variables CSS principales

| Token | Valor | Uso |
|---|---|---|
| `--color-navy` | `#022977` | Color primario |
| `--color-electric` | `#0400f0` | Solo hover btn primario |
| `--color-sky` | `#05a5ff` | Primario dark mode |
| `--color-amber` | `#ff9900` | Acento y botón secundario |
| `--bg-page` | `#ffffff` / `#0b0f1a` | Fondo página |
| `--bg-section` | `#f0f4ff` / `#0f1628` | Fondo secciones alternas |
| `--bg-card` | `#f7f8fa` / `#161d30` | Fondo cards |
| `--bg-cta-final` | `#022977` | CTA final — nunca cambia |

### Tokens de espaciado (responsive)

| Token | Valor |
|---|---|
| `--space-section-mobile` | `40px` |
| `--space-section-tablet` | `60px` |
| `--space-section-desktop` | `80px` |
| `--space-section-wide` | `100px` |
| `--max-width` | `1100px` |
| `--padding-mobile` | `20px` |
| `--padding-tablet` | `24px` |
| `--padding-desktop` | `48px` |

### Tokens de texto

| Token | Valor light | Valor dark |
|---|---|---|
| `--text-label` | `rgba(2,41,119,0.5)` | `rgba(200,216,240,0.6)` |
| `--text-body` | `rgba(2,41,119,0.7)` | `#c8d8f0` |
| `--text-heading` | `#022977` | `#f0f4ff` |

---

## Guía de uso rápido

### Para editar una sección:
> "Edita la sección **Growth Messages**"
> "Ajusta la **Hero Showcase**"
> "Agrega un botón a **Contact Final**"

### Para crear issue en Linear:
> `Fix: Hero Showcase — título no visible en mobile S`
> `Feature: Services Stack — agregar filtro por categoría`

### Para pedir cambios de botón:
> "Cambia el **CTANavy** de **Contact Final** por un **BodyAmber**"
> "En la sección **Mid CTA** reemplaza el **CTANavy** por **HeroPrimary**"

### Para referencias de estilo visual:
- [docs/design-system.md](docs/design-system.md) — colores, tipografía, radios
- [docs/SITEMAP.md](docs/SITEMAP.md) — orden de secciones y anclas
- [docs/CHANGELOG.md](docs/CHANGELOG.md) — historial de cambios

### Animaciones que dependen del DOM
Estas secciones NO pueden anidarse dentro de contenedores con `overflow: hidden` o `transform` — usan `useScroll({ target: ref })`:
- **Growth Messages**
- **Services Stack**
- **Process Sticky**
- **Hero Parallax**
