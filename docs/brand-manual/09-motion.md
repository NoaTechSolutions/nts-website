# 09 · Motion · sistema completo (DS 09)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-05-06 |

> Sección 09 del Manual de Marca. Lenguaje completo de motion del proyecto NTS · construye sobre `DS-022` (tokens base) y `DS-017 v0.2` (button motion). Cubre page transitions, scroll-driven, stagger, modal/dialog, performance budget y reduced-motion comprehensive. **Cierra el sistema motion.**

---

## Contenido

1. [Filosofía del motion en NTS](#1-filosofía-del-motion-en-nts)
2. [Tokens base · expansión de DS-022 (DS-038)](#2-tokens-base--expansión-de-ds-022-ds-038)
3. [Page transitions (DS-039)](#3-page-transitions-ds-039)
4. [Scroll-driven motion (DS-040)](#4-scroll-driven-motion-ds-040)
5. [Stagger choreography (DS-041)](#5-stagger-choreography-ds-041)
6. [Modal · dialog · popover (DS-042)](#6-modal--dialog--popover-ds-042)
7. [Performance budget (DS-043)](#7-performance-budget-ds-043)
8. [Reduced-motion comprehensive (DS-044)](#8-reduced-motion-comprehensive-ds-044)
9. [Auditoría preventiva · 13 keyframes](#9-auditoría-preventiva--13-keyframes)
10. [Migraciones pendientes en código](#10-migraciones-pendientes-en-código)
11. [Decisiones de diseño](#11-decisiones-de-diseño)
12. [Historial de cambios](#12-historial-de-cambios)

---

## 1. Filosofía del motion en NTS

El motion en NTS comunica **calidad y atención**, no presencia. Una transición bien temporizada dice *"esto fue diseñado por alguien que se importa"*; una mal hecha dice lo contrario más fuerte que cualquier copy.

> **Regla maestra**: si el usuario nota que hay animación, fallamos. El motion debe ser **invisible** cuando es funcional, y **deliberado** cuando es identitario — nunca decorativo gratuito.

### Linaje deliberado

- **Linear** · transiciones casi imperceptibles, easing custom
- **Vercel** · page transitions instantáneas + reveal-on-scroll restraint
- **Stripe** · loops sutiles, micro-feedback en form
- **Apple** · overshoot ligero solo donde aporta carácter

### Lo que rechaza

Parallax exagerado tipo agencia · scroll-jacking · bounces gomosos · "wow moments" cada 300px · animaciones de loading que no informan.

### Tipología de motion en NTS

| Categoría | ¿Cuándo? | Ejemplos |
|---|---|---|
| ✅ **Identitario** | Loops perpetuos sutiles + brand wow | Heart Noa · glow CTA navy · badge shimmer · entry sequence Hero · path draw onda CTA Band · aurora text shift |
| ✅ **Funcional** | Feedback inmediato + transiciones de estado | Hover/focus 120ms · form transitions · FAQ accordion · stagger Hero · page transition |
| 🚫 **Gratuito** | NO HACER | Bounces sin propósito · scroll-jacking · parallax mobile · loading sin información · hover scales en cada elemento · AOS-style fade-up universal |
| 🚫 **Distractor** | NO HACER | Loops perpetuos compitiendo con CTA · parallax detrás de copy denso (FAQ, blog) · modals con bounce overshoot · transiciones >400ms en feedback |

---

## 2. Tokens base · expansión de DS-022 (DS-038)

DS-022 cubría 6 durations + 3 easings + reduced-motion. DS-038 agrega **1 duration nueva + 2 easings extra + 1 token de stagger**.

### Durations · 7 tokens (DS-022 + DS-038)

| Token | Valor | Uso | Origen |
|---|---|---|---|
| `--motion-duration-instant` | 80 ms | Hover/active feedback inmediato | DS-022 |
| `--motion-duration-fast` | 120 ms | Form focus, chevron rotate, color swap | DS-022 |
| `--motion-duration-base` | 180 ms | Default UI transitions, FAQ accordion, helptxt | DS-022 |
| `--motion-duration-medium` | 280 ms | Card swap, modal enter, success card replacement | DS-022 |
| `--motion-duration-page` | **360 ms** | Page transitions App Router · entry/exit asimétrico | **DS-038 nuevo** |
| `--motion-duration-pulse` | 2500 ms | Heart Noa, glow CTA navy, btn-glow-pulse | DS-022 |
| `--motion-duration-orbit` | 3000 ms | Orb hero, btn-orbit modality | DS-022 |

### Easings · 5 tokens (DS-022 + DS-038)

| Token | Valor | Uso | Origen |
|---|---|---|---|
| `--motion-ease-std` | `cubic-bezier(.2, .8, .2, 1)` | Default UI · simétrico | DS-022 |
| `--motion-ease-overshoot` | `cubic-bezier(.34, 1.56, .64, 1)` | Entry brand · spring sutil · text-swap | DS-022 |
| `--motion-ease-linear` | `linear` | Loops perpetuos solamente (orbit, marquee) | DS-022 |
| `--motion-ease-decelerate` | `cubic-bezier(0, 0, .2, 1)` | **Entries** · llega y se asienta | **DS-038 nuevo** |
| `--motion-ease-accelerate` | `cubic-bezier(.4, 0, 1, 1)` | **Exits** · acelera al irse | **DS-038 nuevo** |

### Stagger · 1 token nuevo (DS-038)

| Token | Valor | Uso |
|---|---|---|
| `--motion-stagger-base` | 80 ms | Default stagger entre children (Hero entry, listas, CTA Band) |

### Regla · simétrico vs asimétrico

Entries/exits del **mismo elemento** usan curvas **asimétricas** (`decelerate` al entrar, `accelerate` al salir) cuando hay contexto direccional (page transitions, modal). Para hover/focus que vuelven al estado original, `--motion-ease-std` simétrico.

---

## 3. Page transitions (DS-039)

Patrón canónico para entrada/salida de rutas. **Crossfade simple sobre slide** — anclaje editorial sobre cinemático.

### Especificación canónica

| Aspecto | Valor |
|---|---|
| **Patrón** | Crossfade simple `opacity 0→1 ↔ 1→0` · sin slide, sin scale |
| **Duration** | `--motion-duration-page` (360 ms) · entrada y salida iguales · **sin overlap** (exit completa antes de entry) |
| **Easing entrada** | `--motion-ease-decelerate` · llega y se asienta · sensación de "aterrizar" |
| **Easing salida** | `--motion-ease-accelerate` · acelera al irse · sensación de "soltar" |
| **match-element con `layoutId`** | **Rechazado para v1.0** — agrega complejidad sin payoff claro · backlog `DS-F009` si surgen casos |
| **Implementación** | `app/template.tsx` con `AnimatePresence` de motion/react · `key` por pathname |
| **Reduced-motion** | Cambio inmediato · cero transition (NO crossfade ultra-corto, eso es peor que cero) |

### Implementación de referencia

```tsx
// app/template.tsx
'use client';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.36, ease: [0, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 4. Scroll-driven motion (DS-040)

4 patrones canonizados: reveal-on-scroll · parallax · sticky pin · Lenis smooth scroll.

### 4.1 · Reveal-on-scroll · patrón base

| Aspecto | Valor |
|---|---|
| **Propiedades** | `opacity 0→1` + `translateY 16px → 0` · **solo estas dos** · sin scale, sin rotate |
| **Duration** | `--motion-duration-base` (180 ms) · `--motion-ease-std` |
| **Threshold** | 0.4 default · 0.6 para hero/headers prominentes |
| **Trigger** | **Una sola vez** por defecto (`once: true`) · repetir solo en carousels |
| **Stagger entre siblings** | `--motion-stagger-base` (80 ms) · cap total 600 ms (8 items max stagger) |
| **Implementación** | motion/react `whileInView` + `viewport={{ once: true, amount: 0.4 }}` |
| **Reduced-motion** | `opacity 0→1` sin translateY · duration 0 (instantáneo) |

### 4.2 · Parallax · velocidad relativa

| Factor | Uso | Cuándo |
|---|---|---|
| **0.3** | Hero deep background | Capas decorativas profundas. Sensación de profundidad sutil |
| **0.5** | Hero mid-layer | Imagen secundaria, halo, elementos no-críticos. **Default** si no hay razón para otro factor |
| **0.8** | Foreground sutil | Elementos casi al ritmo del scroll. Casi imperceptible |
| **— (off)** | Mobile | **Parallax desactivado completamente en mobile** (`<720px`). Performance + reduced-motion implícito |

### 4.3 · Sticky pin · scroll-trigger GSAP

| Regla | Detalle |
|---|---|
| **Cuándo usar** | Process (DS-025) · case studies con storytelling secuencial · narrative hero (1 caso por trimestre) |
| **Duración del pin** | **Máximo 4 viewport heights** · más allá pierde el ritmo de scroll y se siente "atascado" |
| **Unpin** | Al completar la última card del CardSwap · scroll continúa libre |
| **Mobile** | Sticky pin **desactivado `<720px`** · fallback a stack vertical natural sin pin |
| **Reduced-motion** | Sticky pin se mantiene (es **estructural**) · CardSwap entre cards instantáneo |

### 4.4 · Lenis smooth scroll · settings oficiales

| Aspecto | Valor |
|---|---|
| **Duration** | 1.2 |
| **Easing** | `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))` |
| **smoothWheel** | `true` |
| **Desactivar en** | Formularios largos · mobile · `prefers-reduced-motion: reduce` automático |
| **Implementación** | `lenis-provider.tsx` wrapper en root layout · respeta media query reduced-motion |
| **Regla de no-abuso** | Lenis **suaviza, no orquesta**. Pin/parallax van con GSAP/motion/react sobre Lenis |

---

## 5. Stagger choreography (DS-041)

Reglas de orquestación entre children. **80 ms base, cap total 600 ms.**

| Regla | Detalle |
|---|---|
| **Default** | `--motion-stagger-base` (80 ms) · default para entry sequences |
| **100 ms** | CTA Band entry on-scroll (DS-024) · sequencias editoriales con menos elementos (3–4) |
| **120 ms** | Reservado para grupos pequeños (2–3) que necesitan "respirar" — testimonials carousel |
| **Cap total 600 ms** | Listas largas (>10 items) no exceden 600 ms · resto entra simultáneo (last batch sin delay) |
| **Por row vs por item en grids** | 2D grids **staggear por row, no por item** · evita zig-zag visual |
| **Reduced-motion** | `stagger=0` · todos los items aparecen simultáneo · single fade global del contenedor |

---

## 6. Modal · dialog · popover (DS-042)

Enter scale 0.95→1 + opacity · exit acelera · backdrop fade independiente.

### Spec canónico modal/dialog

| Aspecto | Enter | Exit |
|---|---|---|
| **Propiedades** | `opacity 0→1` + `scale 0.95→1` | `opacity 1→0` + `scale 1→0.97` |
| **Duration** | `--motion-duration-medium` (280 ms) | `--motion-duration-base` (180 ms) — **más rápido que enter, asimetría intencional** |
| **Easing** | scale: `--motion-ease-overshoot` · opacity: `--motion-ease-std` | `--motion-ease-accelerate` |
| **Origen scale** | Centro del card (`transform-origin: center`). **No** desde el trigger button (eso es match-element · `DS-F009`) |

### Backdrop

- Fade `0 → 0.5 alpha` · `--motion-duration-medium` (280 ms) · `--motion-ease-std`
- **Independiente del card** (puede iniciar antes y terminar después)

### Popover / dropdown

Mismo patrón pero `--motion-duration-base` (180 ms) · `scale 0.96→1` · `transform-origin: top` o `top-right` según anchor.

### Reduced-motion

- `opacity 0→1` sin scale · backdrop también solo opacity
- Duration **80 ms** (NO 0 — el cambio brusco de modal sin transición es desorientador)

---

## 7. Performance budget (DS-043)

60 fps target · propiedades seguras · GPU hints disciplinados.

### Tabla de propiedades animables

| Propiedad | Compositor | Veredicto |
|---|---|---|
| `transform` (translate, scale, rotate) | ✅ SÍ | GPU-accelerated · 60fps seguro · **primera elección** |
| `opacity` | ✅ SÍ | GPU · sin layout · combinar con `transform` es el patrón estándar |
| `filter` (blur, brightness) | ⚠️ CON CUIDADO | GPU pero costoso · solo si esencial · **nunca animar blur en lista >3 items** |
| `color` / `background-color` | ⚠️ OK SI CORTO | Paint-only · OK en hover/focus <200ms · **evitar en loops perpetuos** |
| `box-shadow` (animar blur) | 🚫 EVITAR | Repaint completo. Para hover lift, animar `transform: translateY` de un pseudo-element |
| `width` / `height` | 🚫 EVITAR | Trigger layout · cascada de reflow. Usar `transform: scale` o `clip-path` |
| `top` / `left` / `right` / `bottom` | 🚫 EVITAR | Trigger layout. **Usar `transform: translate` siempre** |
| `margin` / `padding` | 🚫 EVITAR | Trigger layout. Animar contenedor con `transform` o usar `gap` |

### Reglas de performance

| # | Regla | Detalle |
|---|---|---|
| 01 | **Frame budget** | 16.66 ms · si una animación roza el límite, **simplificar** antes de aceptar |
| 02 | **`will-change` disciplinado** | Aplicar **durante motion activo** y remover al terminar. **Nunca permanente** |
| 03 | **Listas largas (>20 items)** | Animar el contenedor padre, no cada child individual |
| 04 | **Mobile baseline** | Pixel 5 / iPhone SE 2020 · 60 fps target |
| 05 | **Audit obligatorio** | Lighthouse CI con TBT <200ms y CLS <0.1. **Pre-merge en cualquier PR que toque motion** |
| 06 | **GSAP scroll-trigger** | `fastScrollEnd: true` y `preventOverlaps: true` · `scrub` solo cuando es necesario |

---

## 8. Reduced-motion comprehensive (DS-044)

Extiende DS-022 a todos los patrones de DS 09. **Una matriz · ningún caso queda implícito.**

| Patrón | Comportamiento bajo `prefers-reduced-motion: reduce` |
|---|---|
| Page transitions (DS-039) | Cambio inmediato · cero crossfade. Ultra-corto **rechazado** — peor que cero |
| Reveal-on-scroll (DS-040) | `opacity 0→1` sin translateY · duration 0 |
| Parallax (DS-040) | Off completo · capas estáticas en posición de equilibrio |
| Sticky pin (DS-040) | **Pin se mantiene** (estructural) · CardSwap instantáneo |
| Lenis smooth scroll | Off · scroll nativo del browser |
| Stagger (DS-041) | `stagger=0` · todos simultáneo · single fade global |
| Modal/dialog (DS-042) | `opacity 0→1` sin scale · duration **80 ms** (NO 0 — desorientador) |
| Loops perpetuos (DS-022) | Off completo · pulse, orbit, shimmer, marquee, aurora-shift detenidos |
| Button motion (DS-017 v0.2) | Hover/active sin transform · solo color swap. Modality off |
| Form transitions (DS-027) | Focus border instantáneo · helptxt sin overshoot · success swap directo |
| FAQ accordion (DS-026) | Expand instantáneo · chevron rotate 0ms (snap a 180°) |
| Mascota Noa (DS-036) | WebP estático · heart pulse off · glow Electric off. **Identidad sí, motion no** |

### Implementación canónica

| Aspecto | Detalle |
|---|---|
| **Hook único** | `useReducedMotion()` de motion/react · branchea props de transition |
| **CSS global** | `@media (prefers-reduced-motion: reduce)` con `animation-duration: 0.01ms !important` y `transition-duration: 0.01ms !important` como **red de seguridad** |
| **Excepciones documentadas** | Sticky pin (estructural) · Lenis off · modal 80ms (orientación) · Noa WebP (identidad) |
| **QA** | Testear con `prefers-reduced-motion` activado · checklist pre-merge en PRs que tocan motion |

---

## 9. Auditoría preventiva · 13 keyframes

Veredicto por keyframe en `app/globals.css` y patrones motion/react.

| Categoría | Cantidad |
|---|---|
| ✅ OK | 4 |
| 🔄 Migrar | 6 |
| 🗑 Retirar | 3 |

### Tabla completa de hallazgos

| # | Keyframe / patrón | Veredicto | Acción | Prioridad |
|---|---|---|---|---|
| K-01 | `badge-shimmer` 6.85s | ✅ OK | Loop identitario sutil · glint sobre Hero badge. Mantener · alinear con futuro `--motion-duration-shimmer` (DS-F010) o caso especial 6.85s | — |
| K-02 | `btn-ring-pulse` 1.8s | 🗑 Retirar | Ya migrado a DS-022 modality=pulse vía DS-017 v0.2. Keyframe huérfano post-merge de DS 04 | **Alta** |
| K-03 | `btn-orbit` 3s linear | 🔄 Token | Migrar a `var(--motion-duration-orbit)` + `var(--motion-ease-linear)` | Media |
| K-04 | `btn-glow-pulse` 2.5s | 🔄 Token | Migrar a `var(--motion-duration-pulse)` | Media |
| K-05 | `loader-logo-in` + `loader-bar-fill` + `loader-bar-glow` 1.6s | ✅ OK | PageLoader · 3 keyframes coordinados. Mantener como caso de uso único · alinear timeline a 4× `--motion-duration-base` | — |
| K-06 | `hero-float` variable | 🔄 motion/react | Loop perpetuo del orb hero. Control declarativo + pausa en hover (DS-022) más limpio en JS | Media |
| K-07 | `reviews-marquee-scroll` infinite | ✅ OK | Loop horizontal sobre testimonials · CSS keyframe es la implementación correcta (linear infinite, GPU translateX). Verificar pause-on-hover y reduced-motion | — |
| K-08 | `growth-warning-pulse` variable | 🔄 Token | Si es pulse de atención debe usar `--motion-duration-pulse` 2500ms para coherencia | Media |
| K-09 | `aurora-text-shift` 8s | ✅ OK | Gradient shift sobre AuroraText (CTA Band final). Caso identitario · 8s deliberado lento. **Excepción documentada al sistema de tokens** | — |
| K-10 | `growth-card-glitch-*` 1500ms (5 keyframes) | 🔄 motion/react | Glitch transitions de GrowthMessages. Timeline complejo · mejor declarativo. **1500ms total no encaja en token** · caso especial brand-wow | **Alta** |
| K-11 | `noa-float` + `noa-wave` + `noa-celebrate` stopgap | 🗑 Retirar | Al cerrar producción Lottie (DS-036). Reemplazado por `lottie-react`. Mantener hasta sprint 1 de Lottie · luego eliminar | **Alta** |
| K-12 | CSS `transition` ad-hoc en componentes (200ms, 0.15s, 0.12s mezclados) | 🔄 Token | Reemplazar por `var(--motion-duration-{instant\|fast\|base\|medium})`. PR de cleanup sistemático | **Alta** |
| K-13 | Patrones motion/react con duration inconsistente (HeroParallax, ProcessSticky, NumberTicker, BackgroundBoxes) | 🔄 Token | **Centralizar en `lib/motion-tokens.ts`** exportando objetos `{ duration, ease }` alineados a DS-022 + DS-038 | **Alta** |

### Resumen ejecutivo

**4 OK** · **6 migraciones** (4 a tokens, 2 a motion/react) · **3 retiros** (K-02 huérfano, K-11 stopgap, K-12+13 cleanup).

**Bloqueante alta**: retirar K-02 ya · K-11 al cerrar Lottie sprint 1 · K-12 + K-13 cleanup sistemático.

---

## 10. Migraciones pendientes en código

**9 work items nuevos** introducidos por DS 09 (sumados a las 47 acumuladas previas).

Total acumulado del manual: **56 + 3 retiros + 2 verificaciones**.

### Nuevas en DS 09

| # | Archivo / patrón | Cambio | Prioridad |
|---|---|---|---|
| 48 | `app/globals.css` · `:root` | Agregar tokens DS-038: `--motion-duration-page` 360ms · `--motion-stagger-base` 80ms · `--motion-ease-decelerate` · `--motion-ease-accelerate` | **Alta** |
| 49 | `app/template.tsx` (NUEVO) | Implementar page transitions canónicas (DS-039) con AnimatePresence + crossfade 360ms · key por pathname | **Alta** |
| 50 | `app/globals.css` · `btn-ring-pulse` | **Retirar** keyframe huérfano (ya migrado a DS-022 modality=pulse) — K-02 | **Alta** |
| 51 | `app/globals.css` · `btn-orbit` | Migrar a tokens · `var(--motion-duration-orbit)` + `var(--motion-ease-linear)` — K-03 | Media |
| 52 | `app/globals.css` · `btn-glow-pulse` | Migrar a tokens · `var(--motion-duration-pulse)` — K-04 | Media |
| 53 | `app/globals.css` · `growth-warning-pulse` | Migrar a `var(--motion-duration-pulse)` 2500ms — K-08 | Media |
| 54 | `hero-float` keyframe | Migrar a motion/react `animate` con `repeat: Infinity` · pausa en hover declarativa — K-06 | Media |
| 55 | `growth-card-glitch-*` (5 keyframes coordinados) | Migrar a motion/react sequences · timeline complejo declarativo · documentar como caso especial brand-wow (1500ms fuera de escala) — K-10 | **Alta** |
| 56 | **Crear `lib/motion-tokens.ts`** + migrar transitions ad-hoc | Centralizar tokens en lib · refactor sistemático de transitions inline (200ms, 0.15s, 0.12s) y motion/react inconsistentes (HeroParallax, ProcessSticky, NumberTicker, BackgroundBoxes) — K-12 + K-13 | **Alta** |

### Retiro post-Lottie sprint 1 (DS-036)

| # | Archivo | Cambio |
|---|---|---|
| R-K11 | `noa-float` + `noa-wave` + `noa-celebrate` keyframes | **Retirar** stopgap CSS al completar Lottie sprint 1. Reemplazado por lottie-react — bloqueado por production de Lottie |

> Total acumulado del manual: 5 (DS 02) + 8 (DS 03) + 16 (DS 04) + 6 (DS 05) + 5 (DS 06) + 7 (DS 08) + 9 (DS 09) = **56 cambios** + 3 retiros + 2 verificaciones para tarea de desarrollo separada (NOA-269).

---

## 11. Decisiones de diseño

### DS-038 · Tokens motion expandidos
✅ **Aprobada** — 2026-05-06

4 tokens nuevos suman a los de DS-022 sin reemplazarlos: `--motion-duration-page` 360ms, `--motion-stagger-base` 80ms, `--motion-ease-decelerate`, `--motion-ease-accelerate`. Regla de uso simétrico vs asimétrico documentada.

**Marca**: tempo predecible · curvas para cada caso · stagger único centraliza decisiones previas.

**Alternativas descartadas**: una sola easing universal · `--motion-duration-page` 200ms (flicker) o 500ms (lag) · stagger 100ms default.

### DS-039 · Page transitions canónicas
✅ **Aprobada** — 2026-05-06

Crossfade simple 360ms · sin slide ni scale · entrada decelerate / salida accelerate · `AnimatePresence` en `app/template.tsx`. Reduced-motion = inmediato.

**Marca**: editorial sobre cinemático · anclaje calmo.

**Alternativas descartadas**: slide horizontal (cinemático iOS) · scale entry (modal-feel) · match-element `layoutId` (`DS-X011`) · crossfade ultra-corto bajo reduced-motion.

### DS-040 · Scroll-driven motion · 4 patrones
✅ **Aprobada** — 2026-05-06

Reveal-on-scroll opacity+translateY 16px once · parallax 0.3/0.5/0.8 desktop, off mobile · sticky pin máximo 4vh · Lenis settings oficiales con desactivación automática reduced-motion.

**Marca**: scroll-driven con propósito · sin parallax mobile gratuito · sticky pin con tope.

**Alternativas descartadas**: reveal con scale/rotate · parallax mobile · sticky pin sin tope · Lenis en formularios.

### DS-041 · Stagger choreography
✅ **Aprobada** — 2026-05-06

Default 80ms · 100/120ms casos específicos · cap total 600ms · grids por row no por item · reduced-motion stagger=0.

**Marca**: orquestación legible · cap previene cansancio.

**Alternativas descartadas**: 100ms default · staggear grids por item · sin cap total.

### DS-042 · Modal · dialog · popover transitions
✅ **Aprobada** — 2026-05-06

Enter 280ms scale 0.95→1 + opacity overshoot · exit 180ms accelerate (asimetría intencional) · backdrop independiente. Reduced-motion: solo opacity · 80ms (no 0 — desorientador).

**Marca**: enter cuidadoso · exit rápido · backdrop separado.

**Alternativas descartadas**: enter sin scale · timing simétrico · backdrop sincronizado · `transform-origin` desde trigger (`DS-X011`).

### DS-043 · Performance budget
✅ **Aprobada** — 2026-05-06

60fps target · transform y opacity primera elección · filter cuidado · evitar box-shadow blur, width/height, top/left, margin/padding. `will-change` solo durante motion activo · listas >20 items animan padre · audit Lighthouse CI obligatorio.

**Marca**: performance disciplinada · audit antes de aceptar.

**Alternativas descartadas**: animar `box-shadow` blur · width/height · `will-change` permanente · scrub en parallax.

### DS-044 · Reduced-motion comprehensive
✅ **Aprobada** — 2026-05-06

Matriz cerrada 12 patrones · `useReducedMotion()` hook + CSS global como red de seguridad · excepciones documentadas (sticky pin, modal 80ms, Noa WebP).

**Marca**: accesibilidad sin sacrificar identidad · cero casos implícitos.

**Alternativas descartadas**: cero animation universal (pierde modal orientation, Noa identity) · sin red de seguridad CSS · sticky pin off · crossfade ultra-corto en page transitions.

---

## 12. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-06 | DS-038 (4 tokens motion nuevos) · DS-039 (page transitions canónicas) · DS-040 (scroll-driven 4 patrones) · DS-041 (stagger choreography) · DS-042 (modal/dialog/popover) · DS-043 (performance budget) · DS-044 (reduced-motion comprehensive) · DS-X011 (match-element layoutId descartado v1.0) · DS-F009 (match-element layoutId v1.2) · DS-F010 (`--motion-duration-shimmer` token v1.x) · auditoría 13 keyframes |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`00-implementation-strategy.md`](00-implementation-strategy.md) — DS-021 arquitectura 3 capas (motion engine = capa 2)
- [`04-components-core.md`](04-components-core.md) — DS-022 tokens motion + DS-017 v0.2 button motion
- [`05-patterns.md`](05-patterns.md) — patrones que usan motion (Hero entry, CTA Band, Process, FAQ, Forms)
- [`08-mascot-noa.md`](08-mascot-noa.md) — DS-036 Lottie · DS-037 reglas heredadas
- `app/globals.css` — keyframes legacy auditados en §9
- `app/components/lenis-provider.tsx` — Lenis wrapper · DS-040
