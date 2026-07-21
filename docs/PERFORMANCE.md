# Performance — Estado y hoja de ruta

_Última actualización: 2026-07-20. Todo lo de abajo está **live en producción** (noatechsolutions.com) salvo lo marcado como PENDIENTE._

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
