# NTSsign — Design System
> Fuente de verdad visual. Todo componente, página o feature debe seguir estas reglas.
> Última actualización: Abril 2026

---

## 1. Paleta de colores

### Colores de marca

| Token | Hex | Uso |
|---|---|---|
| `--color-navy` | `#022977` | Color primario light — botones, headings, logo, texto |
| `--color-electric` | `#0400f0` | Solo hover del botón primario en light mode |
| `--color-sky` | `#05a5ff` | Color primario dark — botones, links, iconos activos |
| `--color-amber` | `#ff9900` | Acento — botón secundario, badges, separadores, palabra clave en hero |
| `--color-amber-hover` | `#cc7a00` | Hover del botón secundario/amber |

### Fondos light mode

| Token | Hex | Uso |
|---|---|---|
| `--bg-page-light` | `#ffffff` | Fondo de página principal |
| `--bg-section-light` | `#f0f4ff` | Fondo hero, secciones alternas, footer |
| `--bg-card-light` | `#f7f8fa` | Cards de features, pricing, pasos |
| `--bg-navy` | `#022977` | CTA final — siempre navy, no cambia con el modo |

### Fondos dark mode

| Token | Hex | Uso |
|---|---|---|
| `--bg-page-dark` | `#0b0f1a` | Fondo de página principal |
| `--bg-surface-dark` | `#0f1628` | Navbar, hero, footer en dark |
| `--bg-card-dark` | `#161d30` | Cards de features, pricing, pasos |
| `--bg-card-pop-dark` | `#0a1a3a` | Card "Más popular" en dark |

### Texto light mode

| Uso | Color |
|---|---|
| Headings H1/H2/H3 | `#022977` |
| Body / descripciones | `rgba(2,41,119,0.7)` |
| Labels / eyebrows / subtítulos | `rgba(2,41,119,0.5)` |
| Trust lines / notas pequeñas | `rgba(2,41,119,0.45)` |

> **Regla crítica light:** Nunca usar grises genéricos (`#666`, `#999`, `var(--color-text-secondary)`) sobre fondos blancos o `#f0f4ff`. Todo texto usa navy con distintos niveles de opacidad.

### Texto dark mode

| Uso | Color |
|---|---|
| Headings H1/H2/H3 | `#f0f4ff` |
| Body / descripciones | `#c8d8f0` |
| Labels / subtítulos | `rgba(200,216,240,0.6)` |
| Trust lines / notas pequeñas | `rgba(200,216,240,0.45)` |

### Bordes

| Modo | Color |
|---|---|
| Light | `rgba(2,41,119,0.12)` — 0.5px |
| Dark | `rgba(255,255,255,0.08)` — 0.5px |
| Card destacada (pop) | `2.5px solid #022977` (light) / `2.5px solid #05a5ff` (dark) |

---

## 2. Tipografía

| Elemento | Tamaño | Peso | Color light | Color dark |
|---|---|---|---|---|
| H1 (hero) | 26–40px | 500 | `#022977` | `#f0f4ff` |
| H2 (secciones) | 18–22px | 500 | `#022977` | `#f0f4ff` |
| H3 (cards) | 13–15px | 500 | `#022977` | `#f0f4ff` |
| Body | 14–16px | 400 | `rgba(2,41,119,0.7)` | `#c8d8f0` |
| Labels / eyebrow | 11px | 500 | `#022977` a 0.5 opac. | `#05a5ff` |
| Notas / trust | 11–12px | 400 | `rgba(2,41,119,0.45)` | `rgba(5,165,255,0.7)` |

- **Font:** Sistema / sans-serif — `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Line height:** body = 1.75, headings = 1.25
- **Solo dos pesos:** 400 (regular) y 500 (medium). Nunca 600 ni 700.

---

## 3. Botones

### Sistema de 3 botones

#### Botón primario
```css
background: #022977;
color: #ffffff;
border: none;
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
**Uso:** Acción principal — "Solicitar acceso", "Empezar"

---

#### Botón secundario (amber)
```css
background: #ff9900;
color: #ffffff;
border: none;
padding: 11px 26px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
/* hover */
background: #cc7a00;
```
**Dark mode:** mismo — el amber no cambia entre modos.

**Uso:** Acción secundaria — "Ver cómo funciona", "Ver planes". Siempre visible sobre cualquier fondo, incluido blanco y `#f0f4ff`.

---

#### Botón ghost (outline)
```css
background: #ffffff;
color: #022977;
border: 2.5px solid #022977;
padding: 9px 24px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
/* hover */
background: #022977;
color: #ffffff;
```
**Dark mode:**
```css
background: #0b0f1a;
color: #05a5ff;
border: 2.5px solid #05a5ff;
/* hover */
background: #05a5ff;
color: #00183a;
```
**Uso:** Acción terciaria — "Login", "Ver precios"

---

#### Botones sobre fondo navy (CTA final)
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

### Regla de uso por fondo

| Fondo | Primario | Secundario | Ghost |
|---|---|---|---|
| Blanco `#ffffff` | Navy | Amber | Outline navy + bg blanco |
| Hero `#f0f4ff` | Navy | Amber | Outline navy + bg blanco |
| Navy `#022977` | Amber | Outline blanco | — |
| Dark `#0b0f1a` | Sky blue | Amber | Outline sky |

---

## 3.1 Sistema de botones — Clases CSS

| Clase | Color | Efecto | Contexto |
|---|---|---|---|
| `.btn-body-primary` | Navy `#022977` | 3D press + anillo idle + text swap hover | Secciones light (hero, body) |
| `.btn-body-amber` | Amber `#ff9900` | 3D press | Secundario sobre fondos claros |
| `.btn-body-ghost` | Outline navy | Orb navy orbitando + 3D press | Terciario sobre fondos claros |
| `.btn-cta-navy` | Amber `#ff9900` | Glow pulse + 3D press + text swap hover | Sobre fondo navy (CTA, mid-CTA) |
| `.btn-cta-ghost-navy` | Outline blanco | Orb blanco orbitando | Secundario sobre fondo navy |
| `.btn-body-electric` | Electric `#0400f0` | 3D press | Acción especial / destacada |
| `.btn-nav-primary` | Navy pill | 3D press, hover → electric | Navbar CTA |
| `.btn-nav-ghost` | Texto navy | Hover bg sutil | Navbar links secundarios |

Dark mode: `.btn-body-primary` → sky `#05a5ff`, `.btn-body-ghost` → orb sky, `.btn-nav-primary` → sky.

Estructura `btn-body-primary` y `btn-cta-navy` con text swap:
```html
<a class="btn-cta-navy">
  <span class="btn-icon"><svg>→</svg></span>
  <span class="btn-text-idle">Texto visible</span>
  <span class="btn-text-hover"><svg>regalo</svg> Texto hover</span>
</a>
```

Estructura `btn-body-ghost` / `btn-cta-ghost-navy`:
```html
<div class="btn-body-ghost">
  <div class="btn-ghost-orb"></div>
  <button class="btn-ghost-inner">Texto</button>
</div>
```

---

## 4. Componentes

### Navbar
- **Light:** `background: #ffffff`, border `0.5px rgba(2,41,119,0.15)`
- **Dark:** `background: #0f1628`, border `0.5px rgba(255,255,255,0.1)`
- Logo: lmark cuadrado `border-radius: 7px`, `background: #022977` (light) / `#05a5ff` (dark)
- Links: navy 65% opacidad (light) / blanco 55% (dark)
- Botones en navbar: ghost (Login) + primario (Solicitar acceso), `padding: 6px 16px`, `font-size: 12px`

### Hero section
- **Light:** `background: #f0f4ff`
- **Dark:** `background: #0f1628`, border `0.5px rgba(255,255,255,0.07)`
- Eyebrow: uppercase, `letter-spacing: 0.12em`, navy (light) / sky blue (dark), separadores en amber `●`
- H1: 26px+, navy (light) / `#f0f4ff` (dark) — palabra clave en `#ff9900`
- Subtítulo: navy 70% (light) / `#c8d8f0` (dark) — **nunca gris**
- CTAs: primario + secundario
- Trust line: 12px, navy 50% (light) / sky 70% (dark), separadores en amber `•`

### Feature cards
- **Light:** `background: #f7f8fa`, border `0.5px rgba(2,41,119,0.1)`
- **Dark:** `background: #161d30`, border `0.5px rgba(255,255,255,0.08)`
- Ícono: container `border-radius: 8px`, `background: #e8eeff` (light) / `rgba(5,165,255,0.12)` (dark)
- Título: navy (light) / `#f0f4ff` (dark)
- Descripción: navy 60% (light) / `rgba(200,216,240,0.55)` (dark)

### Step cards (cómo funciona)
- Mismo fondo que feature cards
- Número: círculo `border-radius: 50%`, `background: #022977` (light) / `#05a5ff` (dark), texto blanco / `#00183a`

### Pricing cards
- Normal: mismo fondo que feature cards
- **Card "Más popular" light:** `background: #ffffff`, `border: 2.5px solid #022977`
- **Card "Más popular" dark:** `background: #0a1a3a`, `border: 2.5px solid #05a5ff`
- Badge tags:

| Tag | Light | Dark |
|---|---|---|
| Ocasional / Arranque | `bg:#e8eeff color:#022977` | `bg:rgba(5,165,255,.12) color:#7dcfff` |
| Más popular | `bg:#022977 color:#fff` | `bg:#05a5ff color:#00183a` |
| Crecimiento (amber) | `bg:#fff3e0 color:#b36b00` | `bg:rgba(255,153,0,.15) color:#ffb84d` |
| Scale (purple) | `bg:#f3e8ff color:#6b00b3` | `bg:rgba(138,43,226,.15) color:#c084fc` |

- Overage badge: `background: #e8eeff, color: #022977` (light) / `rgba(5,165,255,0.1), #7dcfff` (dark)
- Checkmarks: `color: #022977` (light) / `#05a5ff` (dark)
- Botón en plan destacado: primario. Resto: ghost.

### CTA final
- **Siempre:** `background: #022977` — no cambia con dark/light mode
- H2: `color: #ffffff`
- Subtítulo: `color: rgba(255,255,255,0.65)`
- Botones: amber primario + outline blanco secundario
- Trust line: `color: rgba(255,255,255,0.45)`, separadores `rgba(255,153,0,0.7)`

### Footer
- **Light:** `background: #f0f4ff`
- **Dark:** `background: #0f1628`
- Logo: navy (light) / `#f0f4ff` (dark)
- Links: navy 60% (light) / `rgba(200,216,240,0.5)` (dark)
- Nota: navy 35% (light) / `rgba(200,216,240,0.3)` (dark)

---

## 5. Dark mode — Toggle

El toggle light/dark debe:
- Estar en la navbar, alineado a la derecha junto a Login y CTA
- Estado light: track `#022977`, ícono sol `☀`
- Estado dark: track `#05a5ff`, ícono luna `🌙`
- Knob siempre blanco, transición `transform 0.2s`
- Persistir la preferencia en `localStorage` con key `ntssign-theme`
- Respetar `prefers-color-scheme` del sistema como estado inicial si no hay preferencia guardada

---

## 6. Border radius

| Elemento | Radius |
|---|---|
| Botones | `8px` |
| Cards | `10–12px` |
| Navbar / hero / secciones | `12px` (cuando tienen fondo propio) |
| Badge / tags | `20px` (pill) |
| Logo mark | `7px` |
| Step number | `50%` (círculo) |
| Feature icon | `8px` |

---

## 7. Espaciado

- Padding de sección: `60–80px` vertical en desktop, `40px` en móvil
- Gap entre cards: `10–12px`
- Padding interno de cards: `16–18px`
- Max-width de contenido: `1100px`, centrado con `margin: 0 auto`
- Padding lateral en móvil: `16–20px`

---

## 8. Reglas absolutas

1. **Nunca usar grises genéricos en light mode** — todo texto es navy con opacidad
2. **El botón secundario es siempre amber** — visible en cualquier fondo
3. **El CTA final es siempre navy** — no cambia entre modos
4. **Nunca texto blanco o gris claro sobre fondo blanco o `#f0f4ff`**
5. **El amber `#ff9900` nunca se usa como fondo de página o sección**
6. **El electric `#0400f0` solo se usa en hover del botón primario**
7. **Dos pesos tipográficos únicamente:** 400 y 500

---

## 9. Breakpoints

Sistema único de breakpoints para todo el proyecto. Usar exclusivamente estos valores en media queries.

| Nombre | Rango | Media query |
|---|---|---|
| Mobile S | 0 – 479px | `(max-width: 479px)` |
| Mobile | 0 – 767px | `(max-width: 767px)` |
| Tablet | 768px – 1023px | `(min-width: 768px) and (max-width: 1023px)` |
| Laptop | 1024px – 1279px | `(min-width: 1024px) and (max-width: 1279px)` |
| Desktop | 1280px – 1439px | `(min-width: 1280px) and (max-width: 1439px)` |
| Wide | 1440px+ | `(min-width: 1440px)` |

### Atajos comunes

| Atajo | Media query | Cubre |
|---|---|---|
| Mobile-down | `(max-width: 767px)` | Mobile S + Mobile |
| Tablet-down | `(max-width: 1023px)` | Mobile S + Mobile + Tablet |
| Desktop-up | `(min-width: 1024px)` | Laptop + Desktop + Wide |
| Wide-up | `(min-width: 1440px)` | Wide |

### Reglas

1. **Nunca usar 769px, 1441px, max-width: 768px, max-width: 1440px** — off by one
2. Los cortes son: 480, 768, 1024, 1280, 1440
3. `max-width` siempre es corte - 1 (479, 767, 1023, 1279, 1439)
4. `min-width` siempre es el corte exacto (480, 768, 1024, 1280, 1440)
