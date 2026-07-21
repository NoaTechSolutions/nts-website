# Performance — Estado y hoja de ruta

_Última actualización: 2026-07-21. Lo de la sesión del 20 está **live en producción**. Lo del 21 (FASE 3 + a11y) está en **`develop` (staging), SIN promover a prod todavía**._

---

## 📌 Sesión 2026-07-21 — FASE 3 (JS) + accesibilidad

### Baseline medido contra PROD (Lighthouse 13.4.1, antes de tocar nada)

| | Perf | A11y | BP | SEO | FCP | LCP | **TBT** | CLS | SI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 74 | 82 | 96 | 92 | 1.2 s | 2.9 s | 500 ms | 0 | 8.9 s |
| Desktop | **62** | 91 | 96 | 92 | 0.3 s | **0.6 s** | **1310 ms** | 0.029 | 3.5 s |

> 🔑 **El hallazgo de la sesión:** desktop pinta **rapidísimo** (LCP 0.6 s) pero puntúa PEOR que mobile. La causa es exclusivamente el **TBT de 1310 ms**. El problema no es *cargar*, es **ejecutar JS** — justo lo que la FASE 3 anticipaba. Mobile tiene mejor TBT porque no monta el robot Spline.

Detalle: `bootup-time` 3.5 s · main-thread 8.7 s (scriptEvaluation 3472 ms) · un solo chunk de 68 KB consumía 3297 ms · 20 KB de JS sin usar · 13 KB de polyfills innecesarios.

### ✅ Verificado con medición (no estimado)

A11y y SEO se re-midieron contra el dev server y **cerraron en 100** (los audits de markup no dependen del timing, así que son válidos localmente):

| | Antes (prod) | Después (dev) |
| --- | --- | --- |
| Accesibilidad | 82 | **100** |
| SEO | 92 | **100** |
| Best practices | 96 | **100** |

### ⏳ NO verificado todavía

**El impacto en TBT/Performance no está medido.** Requiere build de producción + medición externa, y el build está prohibido localmente. Los cambios de JS son direccionalmente correctos (menos módulos en el chunk inicial, 1550 componentes de Motion menos) pero **el número hay que confirmarlo tras deployar**.

### Qué se hizo (3 commits en `develop`)

**`perf(js)`** — GSAP + ScrollTrigger salieron del bundle compartido de TODAS las rutas (~39 KB gzip; vivían en el root layout vía LenisProvider y en la home nadie los consume) · HeroRobot3D y Vortex a `next/dynamic` (son mutuamente excluyentes por viewport y sin embargo se cargaban los dos) · background-boxes: 1500 celdas dejaron de ser `motion.div` (su `whileHover` tenía `duration: 0` → ni siquiera animaba) · 4 archivos muertos borrados + `three`/`@react-three/*` desinstalados (55 paquetes) · `browserslist` alineado al baseline de Tailwind v4.

**`fix(a11y)`** — hamburguesa sin nombre accesible · 5 `aria-label` sobre `div` genéricos (los lectores de pantalla los ignoraban) · footer h4→h2 · 4 links "More info" ahora descriptivos · touch targets (dots 8→24 px, sociales 20→44 px) · contraste · logo del navbar que se renderizaba aplastado (declaraba 190×88, el archivo es 900×579) · teclado en speed dial y mascota.

**`fix(css)`** — red de seguridad global de `prefers-reduced-motion` (**estaba exigida por DS-022 y nunca se había implementado**) · 15 pins sticky de `100vh`→`100svh` (arregla el salto cuando la barra de URL de mobile aparece/desaparece; desktop idéntico) · `will-change` permanente removido de 4 botones y `.card` scopeado.

### 🔜 Próximos pasos

1. **Deployar `develop` y re-medir con PSI/Lighthouse externo.** Sin ese número no se sabe cuánto bajó el TBT. Es el paso 1 obligatorio.
2. Si el TBT sigue alto, el siguiente objetivo claro es **`/servicios/diseno-web`**: 16 imports estáticos, cero `dynamic()`. Es la ruta más pesada del sitio (arrastra GSAP + Flip + MacbookScroll). Replicar el patrón de `app/page.tsx`.
3. Animaciones que repintan en loop infinito y siguen pendientes: `dw-hero-accent-shine` y `dw-eyebrow-gradient` (animan `background-position` con `background-clip: text`, en el hero). Convertirlas cambia el look; la alternativa segura es **pausarlas fuera de viewport** con IntersectionObserver.
4. `bf-cache` bloqueado por `cache-control: no-store`, consecuencia de `cookies()`+`headers()` en el layout. Es el **tradeoff deliberado** del locale server-side, no un bug.
5. Verificación visual en el S24 (sobre todo los pins `svh` y los dots del carrusel).

---

## 🎯 El reto

Llegar a **PageSpeed > 90** en mobile Y desktop. Punto de partida: mobile **68**, desktop fallando.

## ✅ Estado actual (medido)

| Métrica | Antes | Ahora |
| --- | --- | --- |
| Peso de la home | 1472 KB | **403 KB** (−73%) |
| Imágenes (carga inicial) | 1095 KB | 25 KB |
| LCP usuarios EN | 6.6 s | ~1.5 s |
| LCP usuarios ES | ~2.5 s | ~1.5 s |
| Process-section (re-renders/scroll) | ~115 | 4 |

> ⚠️ **Los tiempos (LCP/TBT) hay que medirlos desde afuera** (PageSpeed Insights o Lighthouse en el teléfono), NO desde la máquina de desarrollo local: tras horas de sesión se satura de procesos y **infla las mediciones de tiempo** (test decisivo: sin CPU-throttle daba MÁS lento que con throttle → imposible salvo por carga de máquina). Los **bytes** (peso de recursos) sí son confiables localmente.

## 🛠️ Lo que se hizo (esta sesión, 11 commits en prod)

**Performance del hero / LCP**
- Locale resuelto en el **server** (cookie → Accept-Language) → sin flip de idioma en cliente → LCP EN de 6.6 s a ~1.5 s.
- Tema resuelto en el **server** (cookie) → mató el flash oscuro→claro (FOUC).
- Navbar y entrada del hero por **animación CSS autoplay** (no dependen de la hidratación JS).
- Entrada cohesiva: título/subtítulo con solo-movimiento (LCP-safe), robot con fade lento.

**Bugs de mobile (reportados en Samsung S24 Ultra)**
- `touch-action: pan-x` → `pan-y` en el slider de reviews (destrabó el scroll vertical).
- `bounce: 100` (bug: va 0–1) en el spring del portfolio parallax → causaba wobble perpetuo.
- **`overflow-x: clip` en `.page-shell`** → contuvo el overflow horizontal de los full-bleed `100vw` que descentraba el navbar/títulos.
- Lenis `scrollTo(0)` en cada cambio de ruta → las páginas abren desde arriba.
- Process-section: valores de scroll por **CSS vars** en vez de `setState` por frame (115 → 4 re-renders).

**Optimización de assets (el −73% de peso)**
- Logo: SVG de 320 KB (¡PNG de 2500px embebido en base64!) → **webp de 17 KB** (mostrado a 216px).
- Orb del hero: SVG de 777 KB → **webp de 42 KB**.
- Portfolio: `<img>` plano a 600px → **`next/image`** con `sizes` responsivos.
- Robot Spline (1.3 MB, solo desktop): **diferido a `requestIdleCallback`** → no compite con la carga inicial (era el asesino de desktop).

## 🔜 PENDIENTE — Próxima sesión

> ⚠️ **La FASE 3 de abajo se ATACÓ el 2026-07-21** (ver la sección del 21 arriba). Se mantiene el texto original como registro del diagnóstico previo.

### 1. FASE 3: JavaScript (el bloque grande que queda: ~306 KB)
El JS es ahora el mayor peso de la home. **NO tocar a ciegas** — necesita el **TBT real** de PageSpeed para priorizar.
- **Paso 1:** correr PageSpeed Insights (o Lighthouse en el teléfono) en mobile Y desktop, anotar **score + TBT + LCP**.
- **Paso 2:** con el TBT, atacar candidatos a diferir/reducir:
  - GSAP + ScrollTrigger (en `lenis-provider.tsx`) — ¿se usa de verdad o alcanza con el raf de Lenis?
  - Framer Motion (`motion/react`) — verificar tree-shaking; se usa en muchas secciones.
  - Chunks de secciones (ya van `ssr:false`, revisar si algo se puede diferir más).
- Objetivo: bajar el TBT para cerrar el 90+.

### 2. Menores (no urgentes)
- Borrar los SVG viejos sin uso de `/public` (`noatechsolutions-logo-full.svg` 320KB, `noatechsolutions-digital-orb-hero.svg` 777KB) — no se descargan (sin referencia) pero ensucian el repo.
- El otro `Highlighter` en `app/components/ui/highlighter.tsx` (el de las páginas de diseño-web) podría tener el mismo patrón frágil de rough-notation que se arregló en `components/ui/highlighter.tsx`.
- Verificación visual del usuario en el S24 de todas las mejoras.

## 🧪 Cómo medir (metodología / gotchas)

- **Bytes/peso:** confiable local. Puppeteer + `performance.getEntriesByType("resource")`.
- **Tiempos (LCP/TBT):** desde afuera (PSI o Lighthouse en el teléfono). Local no sirve (máquina cargada).
- **PSI API** sin key: se agota la cuota diaria rápido. Usar PSI web o con API key.
- **Chrome zombies:** puppeteer no cierra limpio en Windows → `taskkill //IM chrome.exe //F` ANTES de medir tiempos.
- **La página usa Lenis:** en tests, `window.scrollTo` NO funciona; usar `page.mouse.wheel`.
- **`next dev` con Turbopack:** panic en Windows con `globals.css` → usar `npx next dev --webpack --port 3006`. El hijo `next` sobrevive a matar el wrapper → `taskkill` el PID del 3006 antes de relanzar.
- **Optimizar imágenes:** `sharp` (0.34.5, instalado). Correr el script desde el dir del proyecto (no `/tmp`). Los SVG "pesados" acá son raster embebido → rasterizar a webp (no SVGO). `next/image` NO optimiza SVGs.

## 🌳 Git

- `main` = producción (noatechsolutions.com). `develop` = staging (`develop--beamish-salmiakki-478d5f.netlify.app`).
- Promoción a prod: merge `develop` → `main` + push (dispara deploy Netlify). Pre-check: `npx tsc --noEmit` + `npm run lint`.
- `main` y `develop` quedan sincronizados al cierre de hoy.
