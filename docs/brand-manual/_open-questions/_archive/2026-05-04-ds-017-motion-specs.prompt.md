# Prompt para diseñador · DS-017 motion patch · ENVIADO Y RESUELTO

| Estado | Para | De | Enviado | Resuelto |
|---|---|---|---|---|
| ✅ Resuelto | Diseñador | Israel | 2026-05-04 | 2026-05-04 |

> Versión copy-paste que se le envió a Claude Design. La respuesta y el delivery están reflejados en DS 04 v0.2 (`DS-017 v0.2`, `DS-022`) y en el Decisions Log v0.7.0. Documento conservado como rastro histórico del proceso de comunicación.

Resolución completa en [`2026-05-04-ds-017-motion-specs.md`](2026-05-04-ds-017-motion-specs.md) (sección "Resolución").

---

## Mensaje a copiar

```
DS 03 v0.1 + DS 04 v0.1 aprobados estructuralmente · Patch DS-017 v0.2 antes de avanzar a DS 05

Aplicado al manual:

- DS 03 v0.1 (DS-014 spacing 4px / DS-015 radii semánticos / DS-016 shadows tinte Navy + auditoría 12 hallazgos) → ✅ Aprobado
- DS 04 v0.1 estructural:
  · DS-018 Card 5 tipos canónicos → ✅ Aprobado
  · DS-019 Input 3 tipos × 6 estados → ✅ Aprobado
  · DS-020 Badge 4 familias → ✅ Aprobado
  · DS-017 Button 4×3×6 → ⏳ Parcialmente aprobado (motion pendiente)

Decision Log v0.6.0 · arquitectura impl 3 capas (DS-021): primitives shadcn + motion engine motion/react/GSAP + showcase Aceternity. Las anatomías de DS 04 implementan con shadcn + cva variants; el motion con motion/react variants o keyframes CSS.

Antes de avanzar a DS 05, necesito patch DS-017 v0.2 con motion specs accionables. Te explico el gap y te paso los keyframes actuales del código para que formalices motion en lugar de inventar.

---

## Gap detectado

DS-017 v0.1 regla 02 dice:

"Motion no define variante — 3D press, glow pulse, orb orbital son comportamientos OPCIONALES."

Problema: en este proyecto motion ES identidad de marca, no opcional. Cada variante de botón actual tiene motion específico que la distingue (orb orbital = ghost, glow pulse = CTA navy, ring pulse = primary). Sin motion specs:

1. La implementación queda librada a criterio del dev → drift
2. Los botones perderían el lenguaje visual actual de producción → downgrade
3. La consolidación 9 → 4 podría no ser viable si los efectos diferenciales son tan cruciales como la paleta

---

## Motion actual en producción

Extracción literal de app/globals.css (líneas 1323–1730, auditoría 04-May-2026).

### Keyframes definidos

@keyframes btn-ring-pulse {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(1.7); opacity: 0; }
}

@keyframes btn-orbit {
  0%   { transform: rotate(0deg)   translateX(100px); }
  100% { transform: rotate(360deg) translateX(100px); }
}

@keyframes btn-glow-pulse {
  0%, 100% { box-shadow: 0 4px 0 #b36b00, 0 0 10px rgba(255, 153, 0, 0.25); }
  50%      { box-shadow: 0 4px 0 #b36b00, 0 0 30px rgba(255, 153, 0, 0.75); }
}

### Transitions por variante

.btn-body-primary (Navy fill · 3D press)
  default:  box-shadow: 0 4px 0 #011a52, 0 0 12px rgba(2,41,119,.2)
            transition: transform 0.15s, box-shadow 0.15s
  hover:    transform: translateY(-2px)
            box-shadow: 0 6px 0 #011a52, 0 0 25px rgba(2,41,119,.4)
  active:   transform: translateY(3px)
            box-shadow: 0 1px 0 #011a52
  + text-swap: idle text fade-out + hover text fade-in centrado por abajo
  + icon-fade-out en hover

.btn-body-amber (Amber fill · 3D press)
  default:  box-shadow: 0 4px 0 #b36b00, 0 6px 12px rgba(255,153,0,.35)
            transition: transform 0.12s, box-shadow 0.12s
  hover:    transform: translateY(-2px)
            box-shadow: 0 6px 0 #b36b00, 0 10px 20px rgba(255,153,0,.45)
  active:   transform: translateY(3px)
            box-shadow: 0 1px 0 #b36b00

.btn-body-ghost (Outline + orb orbital)
  container transition: transform 0.12s
  orb child: animation: btn-orbit 3s linear infinite
             radial-gradient circle de 70px orbita el borde

.btn-cta-navy (Amber sobre Navy + glow pulse PERPETUO)
  default:  animation: btn-glow-pulse 2.5s ease-in-out infinite
            transition: transform 0.15s, box-shadow 0.15s
  hover:    animation: NONE (se detiene)
            transform: translateY(-2px)
            box-shadow: 0 6px 0 #b36b00, 0 0 35px rgba(255,153,0,.75)
  active:   transform: translateY(3px)
  + text-swap + icon-fade-out idem que primary

.btn-cta-ghost-navy (Outline blanco + orb orbital blanco)
  container transition: transform 0.12s
  orb child: animation: btn-orbit 3s linear infinite
             radial-gradient blanco

.btn-nav-primary (Navbar pill — hover Electric migra a Amber 700 por DS-013)
  default:  box-shadow: 0 3px 0 #011a52
            transition: transform 0.12s, box-shadow 0.12s, background 0.2s
  hover:    background: #995B00 (Amber 700 — DS-013)
            transform: translateY(-1px)
            box-shadow: 0 4px 0 #011a52, 0 6px 12px rgba(2,41,119,.25)
  active:   transform: translateY(2px)

.btn-nav-ghost
  transition: all 0.15s
  hover: background: rgba(2,41,119,.07); color: #022977

### Patrones identificados

3D press transform: 0.12–0.15s linear · todas excepto Link
Glow pulse perpetuo: 2.5s ease-in-out infinite · CTA navy
Orbit infinite: 3s linear · ghost variants
Text-swap + icon-fade: hover · primary y CTA navy
Ring pulse 1.8s: sugerido en design-system.md, verificar si está en código

---

## Pedido · DS-017 v0.2

### 1. Definir tokens de motion (DS-022 sugerido)

Sugerencia de tokens base:

  --motion-duration-instant: 80ms    // press
  --motion-duration-fast:    120ms   // simple transitions
  --motion-duration-base:    180ms   // hover changes
  --motion-duration-slow:    280ms   // emphasized transitions
  --motion-duration-pulse:  2500ms   // perpetual loops

  --motion-ease-emphasis:  cubic-bezier(0.4, 0, 0.2, 1)
  --motion-ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1)
  --motion-ease-pulse:     ease-in-out

Validar nombres y valores; si proponés diferente, justificá.

### 2. Specs accionables por variante × estado

Formato esperado (no descripciones genéricas):

  Variante: primary
  Estado: hover (sobre Paper 0)
    duration: var(--motion-duration-slow)   // 280ms
    ease: var(--motion-ease-emphasis)
    transform: scale(1.02) translateY(-1px)
    shadow: var(--sh-2) → var(--sh-3)
    text-swap:
      idle:  fade-out 120ms (offset 0)
      hover: fade-in 180ms + slide-up 8px (offset 60ms)
    icon-swap:
      idle: fade-out 120ms + slide-left 4px

  Estado: active / press
    duration: var(--motion-duration-instant)  // 80ms
    ease: ease-out
    transform: scale(0.98) translateY(1px)
    shadow: var(--sh-2) → var(--sh-1)

  Estado: focus-visible
    ring: var(--sh-focus)  // Amber 500 outline 3px
    no transform

  Estado: idle (continuous, si aplica)
    ring-pulse: 1.8s ease-in-out infinite
    glow-pulse: 2.5s ease-in-out infinite

Repetir para las 4 variantes oficiales (Primary, Secondary, Ghost, Link) × estados que apliquen.

### 3. Reconfirmar consolidación 9 → 4

Tras agregar motion specs, ¿la consolidación 9 → 4 sigue siendo viable?

Si el orb orbital es identidad estructural de Ghost y el glow pulse es identidad estructural de Primary lg, podrían justificar 5 o 6 variantes en lugar de 4. Decisión tuya con justificación.

Si la consolidación cambia, actualizar la auditoría preventiva de DS 04 (mapping 9 → N variantes).

---

## Formato de entrega

Igual a entregables anteriores: HTML del módulo + actualización del Decisions Log + commit sugerido. Backup del v0.1.

Decision Log v0.7.0 esperado:
  · DS-017 v0.2 (Button con motion specs)
  · DS-022 (tokens de motion, si se introducen)
  · DS 04 status: ⏳ → ✅

Confirma cuando esté listo para revisión y aprobación. Después avanzamos a DS 05 · Patrones (Hero, CTA Band, Process, FAQ, Forms).
```

---

## Notas operativas

- **Cuándo enviarlo**: cuando Claude Design esté disponible para iterar.
- **Qué hacer con la respuesta**: actualizar [`2026-05-04-ds-017-motion-specs.md`](2026-05-04-ds-017-motion-specs.md), aplicar motion specs en [`04-components-core.md` sección 2 (Button)](../04-components-core.md#2-button--ds-017), sumar `DS-022` (si aplica) al [`decisions-log.md`](../decisions-log.md), promover DS 04 a ✅ Aprobado.
- **Cierre**: mover este archivo y el doc estructurado a `_open-questions/_archive/` como apéndice de la decisión final.

---

**Archivos relacionados**:
- [`2026-05-04-ds-017-motion-specs.md`](2026-05-04-ds-017-motion-specs.md) — versión estructurada del gap
- [`../04-components-core.md`](../04-components-core.md) — sección 04 del manual
- [`../decisions-log.md`](../decisions-log.md) — log completo de decisiones
