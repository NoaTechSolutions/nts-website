# Progreso Home + Handoff · NoaTechSolutions

> Bitácora detallada del trabajo sobre la home para **retomar mañana donde quedamos**.
> Última sesión: 2026-07-09 · Branch: `develop` · Dev server: `npm run dev` → puerto **3006**.

---

## 🔜 PARA MAÑANA (2026-07-10) — MODO TELÉFONO (mobile)

> ⚠️ **Restricción del usuario:** trabajar **SOLO la vista de teléfono** (media queries `max-width`, ~≤767px). **NO mover nada** de tablet/desktop.

**Tareas (en orden):**

1. **Robot del header — reubicar en mobile** *(decisión abierta: definir dónde va)*
   - Archivos: `app/components/sections/hero-robot-3d.tsx` + CSS `.hero-robot-stage` / `.hero-exp3d-stage` (`globals.css`, media queries mobile ~L3320-3365).
   - Hoy el robot sangra al borde derecho detrás del texto. En pantalla chica hay que decidir: ¿arriba del texto? ¿más chico? ¿de fondo con opacidad? — **pendiente de definir con el usuario.**

2. **Quitar el botón de configuración (gear) de la esquina superior DERECHA en mobile**
   - Motivo: ya existe otro control arriba a la IZQUIERDA → `MobileSpeedDial` (`app/components/mobile-speed-dial.tsx`, montado en `app/page.tsx`). El gear es redundante en mobile.
   - Acción: ocultar `.page-settings-gear` en mobile → `@media (max-width: 767px){ .page-settings-gear{ display:none } }` en `globals.css`. (El gear se renderiza en `page.tsx` → `<div className="page-settings-gear"><NavSettingsGear/></div>`.)
   - Verificar que `MobileSpeedDial` cubra idioma + tema; si no, mover esas opciones ahí.

3. **Centrar el header (título + botones + stats) en mobile**
   - Hoy están a la izquierda: `.is-hero-exp .hero-content { justify-items:start; text-align:left }` (`globals.css` ~L3143).
   - Acción: en la media query mobile de `.hero-content` (~L6831), centrar → `justify-items:center; text-align:center`, y `.hero-actions{ justify-content:center }`, stats centradas. Solo mobile.

4. **Quitar el cursor custom en mobile** *(no sirve en touch)*
   - `app/components/hero-cursor.tsx`: no montar/activar el efecto en `(hover: none)` o `(pointer: coarse)`. Ojo: hoy se agregó `body{ cursor:none }` global — revisar que en mobile no cause problemas (idealmente gatearlo también a dispositivos con hover).

---

## 🆕 Sesión 2026-07-09 (resumen — 6 commits, `145f2dc`→`ac7fed3`)

- **feat(services)** `145f2dc`: rediseño color-por-servicio (var `--card-accent`) + estrella destacada (Web & Software).
- **feat(process)** `a2f2568`: sección proceso reescrita a fases reales (descubrimiento/estrategia/construcción/lanzamiento) + barra de progreso vertical liberada + cards livianas (link subrayado) + imágenes WebP 1600×900 (~100KB, antes hasta 10MB).
- **feat(ux)** `6d8cdf7`: cursor tech **global** (`body cursor:none`, inputs exceptuados; excepciones: warning, CTAs, footer) + **spotlight** interactivo (halo + núcleo amarillo + botón que late) en CTA1 y CTA2, generalizado a clases `.cta-spotlight`.
- **fix(faq)** `265ceff`: fondo blanco (`var(--bg-page)`, antes gradiente azulado que cortaba).
- **feat(footer)** `fed9be6`: spotlight blanco (fondo dark) + redes reales (Facebook/Instagram/**X**/**TikTok** con SVG propios) + labels de servicios a las 4 categorías + `/branding` roto→`/servicios` + **rutas portfolio unificadas a `/portfolio`** (`/portafolio` → 308 redirect) + subtítulo portfolio humanizado/SEO.
- **chore** `ac7fed3`: limpieza de assets sin uso + dedupe de ids `#proceso`/`#reviews`.
- Además: convertidas 4 imágenes del proceso a WebP con `sharp`; limpieza de ~28MB en `public/`.
- **Pendientes:** Resend (infra DNS/API key para leads en `contact@`); optimizar los 8 `*-raw.png` del portfolio (~13MB) a WebP; mascota Noa huérfana (se MANTIENE por marca NOA-229); footer/chips proceso hardcoded en español (no localizados EN).

---

## 1. Estado general

La home compila y corre (HTTP 200). Se trabajó responsive, header, navbar, servicios y footer.
Los cambios de esta sesión que estaban sin commitear **se commitean hoy** (ver sección 5).

---

## 🆕 Sesión 2026-07-08

### Footer — watermark P1 RESUELTO ✅
- `components/ui/text-hover-effect.tsx`: `textLength={690}` + `lengthAdjust="spacingAndGlyphs"` + `fontSize={104}` en los 3 `<text>` (constantes FONT_SIZE/TEXT_LENGTH), viewBox 100→120. Como `textLength < 720` (ancho del viewBox), el texto **nunca se desborda** + efecto "alargado". Ojo: hubo que sacar `text-7xl` porque la font-size de la clase CSS le gana al atributo SVG `fontSize`.
- `footer-section.tsx`: columna de contacto a 1024 — `lg:px-10 xl:px-14`, `lg:gap-6`, email `whitespace-nowrap lg:text-[13px]` → entra en 1 línea.

### Hero — mascota Noa → robot Spline (SELF-HOSTED)
- **Decisión del usuario**: reemplazar Noa por robot 3D de Spline (21st.dev) que sigue el cursor. Advertí (1) Noa es marca (NOA-269/271), (2) CDN externo violaría la decisión de §Descartado. Eligió **self-hosted**.
- `public/spline/robot.splinecode` (1.3MB, servido local, **NO CDN**). Deps nuevas: `@splinetool/react-spline` + `@splinetool/runtime`.
- `components/ui/splite.tsx` (SplineScene lazy) + `app/components/sections/hero-robot-3d.tsx` (HeroRobot3D).
- `header-section.tsx`: import `HeroExperiment3D` → `HeroRobot3D`. **`hero-experiment-3d.tsx` (Noa) quedó INTACTO para revertir fácil** (re-importar y usar `<HeroExperiment3D />`).
- Robot: sin card (transparente), canvas sangra al borde derecho (`right: calc(50% - 58vw); width: 76vw`), detrás del texto (z-index 1) para no tapar la navbar, divider full-width abajo (`.hero-bottom-divider`) que disuelve el corte de piernas.
- Color: tinte azul dark on-brand `#022977` (navy DS) en `onLoad` — pinta todas las piezas (SKIP luces por nombre). **Para volver al original: borrar el `forEach` de color en `hero-robot-3d.tsx`.**

### Cursor custom por zona (nuevo)
- `app/components/hero-cursor.tsx`: retículo **tech** en `#home`, triángulo **warning** en `.growth-section`. Montado en header-section. Escucha `window` mousemove, `closest()` decide zona. CSS en globals (buscar "Cursor 3D tech"). Respeta `prefers-reduced-motion` + touch.

### Nav — tuerca con hover + menú
- `resizable-navbar.tsx` (NavSettingsGear): abre con **hover** (`onMouseEnter/Leave` + `closeTimer` 160ms para cruzar el hueco del abanico). Íconos del abanico más separados (globals `.nav-gear.is-open .nav-gear-item-*`).
- Quitado item **"Contacto"** del menú (`resizable-navbar-demo.tsx` navItems) — ya existe el botón CONTACTAR.

### SEO
- **Subtítulo** hero (ES+EN) reescrito, corto + keywords (patrón "transformación primero"): *"Convertimos tu presencia digital en más clientes con diseño web, software a medida y marketing que da resultados."*
- `layout.tsx` metadata: agregado **"software a medida"** (servicio estrella P1 que faltaba) a title/description/keywords/og/twitter + acentos corregidos.

### Sección Problemas (cards warning)
- `problems-section.tsx` + globals: letra `0.72→1.05rem`, texto a **2 líneas** (saqué `white-space: nowrap`, ancho card 21rem), ícono círculo `1.65→2.35rem` con `flex: 0 0 auto` (no óvalo) + `TriangleAlert` `14→22px`.

### ⏳ Pendiente para mañana (de esta sesión)
- **Color fino del robot**: hoy pinta todas las piezas del mismo navy (pierde detalle metálico). Para un pase por pieza (cuerpo/acentos/luz) faltan los **nombres de los objetos del scene** → pedírselos al usuario desde `F12 → Console → [robot-objects]` (el forwarding del server no los captura).
- Validar cursor warning / hover tuerca / separación íconos según feedback del usuario.

---

## 2. Hecho en esta sesión (✅) · [histórico 2026-07-07]

### Responsive / sistema (ya commiteado antes de hoy)
- **DS 03b · breakpoints canónicos** `768 / 1024 / 1440` + limpieza off-by-one en `globals.css`.
- **Tailwind alineado**: `--breakpoint-xl: 1440px` en `@theme`.
- **Hydration fixes**: theme (`suppressHydrationWarning` en `layout.tsx`) + i18n (`language-provider.tsx`).
- Docs: `docs/brand-manual/03b-responsive-breakpoints.md`.

### Header (hero) — `app/components/sections/header-section.tsx` + `hero-experiment-3d.tsx`
- Layout **texto a la izquierda** + pieza central 3D a la derecha (`.is-hero-exp`).
- Pieza central = **mascota Noa** (`/noa/noa-mascot-original.png`, ya sonríe + saluda) en **card espacial con borde liquid-glass**, con **tilt 3D reactivo al scroll** (motion `useScroll`+`useSpring`) y burbuja "¡Hola! 👋". Animación de saludo en loop (`hero-noa-wave`).
- Título del hero **más chico** (`clamp(2.5rem, 5vw, 4.4rem)`).
- **Quitada** la mano robótica (del header) y la **mascota flotante** (de `page.tsx`: import + `useNoaScroll` + `<NoaMascot>`).

### Navbar — tuerca de configuración
- Los botones de **idioma/tema salieron del menú**. Ahora viven en una **tuerca fija (sticky) en la esquina superior DERECHA** (`.page-settings-gear`, `NavSettingsGear` en `ui/resizable-navbar.tsx`, montada en `page.tsx`).
- Abre un **abanico radial** (idioma ES/EN + tema sol/luna) hacia **abajo-izquierda**. La tuerca rota 120° al abrir.
- `NavInlineControls` / `NavFloatingControls` quedaron sin usar en `resizable-navbar-demo.tsx` (código muerto, se puede limpiar).

### Servicios — `app/components/sections/services-section.tsx`
- **Cards de la derecha CENTRADAS verticalmente** (a 50vh, misma altura que el texto izquierdo `items-center h-screen`).
  - Se mide la **altura real de la card** con JS (`card.offsetHeight`) → `top: calc(50vh - mitad)` vía el **`style` del CardSticky** (Motion lo respeta; el `!important` de CSS NO funcionaba).
  - **Clave**: se removió `layout="position"` de `components/ui/cards-stack.tsx` — ese prop de Motion aplicaba un transform que pisaba el `top`.
  - Scopeado a desktop con `matchMedia("(min-width: 1024px)")`.
- **Reducida la distancia al CTA**: sección `min-h 280vh → 210vh`, `pb 60vh → 30vh`.

### Layout / padding
- **`.grid-shell`** con margen lateral fluido: `min(1180px, calc(100% - clamp(2rem, 6vw, 6rem)))` → ~16px mobile · ~30px en 1024 · 48px en 1440+ (DS). Afecta hero, proceso, reseñas.
- Servicios: `px-6 → lg:px-12`.

### Footer — `app/components/sections/footer-section.tsx`
- **Full width**: se quitó `rounded-3xl mx-4 mb-4` + `clipPath`. Fondo edge-to-edge, contenido centrado en `max-w-7xl`.
- **Watermark "NoaTechSolutions" más grande**: `viewBox` del SVG `900 → 720` en `components/ui/text-hover-effect.tsx` (texto llena ~92% del ancho).
- **Columna de contacto (fix 1024)**: el email se desbordaba a la derecha. Solución: `min-w-0` + `wrap-break-word` en los items + gap `lg:gap-10 xl:gap-16`.

### Documentación / estrategia
- **`docs/web-structure.md`**: consolidación del Brief Maestro del diseñador + docs `01d` (espaciado) y `02a2` (mapa sitio). Decisión: **el DS del repo manda** sobre el brief (fuentes Space Grotesk, navy #022977). Ver también engram `brand/canonical-source`.

### Descartado
- **Efecto TubesCursor (WebGL de la CDN)**: se probó en el header y se hizo **rollback completo** (el lib de jsdelivr fallaba: WebGPU→WebGL2 devolvía contexto null). No usar CDN externos en runtime.

---

## 3. ⏳ TAREAS PENDIENTES (retomar acá mañana)

### ✅ P1 — RESUELTO (2026-07-08) · Watermark del footer se desborda (pedido explícito)
El título grande **"NoaTechSolutions"** del footer **se desborda por derecha e izquierda**.
- **Objetivo**: que NO se desborde.
- **Restricción del usuario**: se puede **agrandar en tamaño (alto), NO en ancho**.
- **Dónde**: `components/ui/text-hover-effect.tsx` (SVG `viewBox="0 0 720 100"`, texto `text-7xl` en `x/y = 50%`). El contenedor: `footer-section.tsx` → `<div className="lg:flex hidden h-48 -mt-4 overflow-visible">`.
- **Pista**: al bajar el viewBox a 720 el texto quedó ancho pero se sale por los lados. Para "más alto, no más ancho": subir el `viewBox` height (ej. `0 0 720 130`) y/o el `font-size`/alto del contenedor manteniendo el ancho controlado, o ajustar `preserveAspectRatio`. Probar valores y verificar que NO se corte lateralmente.

### 🟠 P2 — Validación visual pendiente (el usuario estaba revisando)
- Confirmar en **1024x768** que: cards de servicios quedan centradas, footer full-width OK, columna contacto ya no pegada.
- Revisar si **otras secciones** (problemas, mid-CTA, portafolio, CTA final, FAQ, contacto) se ven pegadas a los lados en 1024 — tienen su **propio contenedor**, no `grid-shell`. Si alguna está tight, pasada consistente de padding.

### 🟢 P3 — Gaps estructurales del brief (de `web-structure.md` §8)
- **Sección "Productos propios"** en la home (NTSSign + KinderCtrl) — NO existe, es el gap clave del brief.
- Página **`/productos`**.
- **8 servicios en 4 categorías** (hoy el nav lista 3).
- Menú **"Productos ⌄"**.
- Docs del brief que faltan: `02c` (briefs Hero + Productos), `01e_MarcasHijas`.

### Limpieza técnica (opcional)
- `NavInlineControls`/`NavFloatingControls` + `LanguageToggle`/`ThemeToggle` sin uso en el navbar.
- CSS muerto: `.nav-float-lang`/`.nav-float-theme`, `.nav-float-gear`.
- `app/components/site-footer.tsx` (footer viejo) parece no usarse.

---

## 4. Archivos tocados esta sesión

| Archivo | Qué |
|---|---|
| `app/globals.css` | breakpoints, grid-shell fluido, hero-exp (mascota/liquid-glass), nav-gear, limpieza |
| `app/components/sections/header-section.tsx` | hero texto-izquierda + mascota, sin mano |
| `app/components/sections/hero-experiment-3d.tsx` | pieza 3D mascota saludando |
| `app/components/sections/services-section.tsx` | centrado cards (JS + style.top), altura/pb reducidos |
| `app/components/sections/footer-section.tsx` | full width, watermark, fix contacto |
| `app/components/ui/resizable-navbar.tsx` | `NavSettingsGear` (tuerca) |
| `app/components/resizable-navbar-demo.tsx` | quitados controles del menú |
| `components/ui/cards-stack.tsx` | quitado `layout="position"` |
| `components/ui/text-hover-effect.tsx` | viewBox 900→720 |
| `app/page.tsx` | tuerca montada, mascota flotante quitada |
| `docs/web-structure.md`, `docs/home-progress.md` | documentación |

---

## 5. Cómo retomar mañana

1. `npm run dev` → http://localhost:3006
2. Abrir DevTools en **1024x768** y validar servicios/footer (P2).
3. Atacar **P1** (watermark que no se desborde, más alto no más ancho) en `text-hover-effect.tsx`.
4. Luego, si el usuario confirma, arrancar el gap grande: **sección Productos en la home** (P3).
