# DS-017 · Motion specs pendientes

| Estado | Para | De | Fecha |
|---|---|---|---|
| ⏳ Abierta | Diseñador | Israel | 2026-05-04 |

> DS-017 v0.1 explicita "motion no define variante". Sin specs de motion, los botones implementados perderían el lenguaje visual actual de producción. Se requiere patch v0.2 con motion specs accionables.

---

## Contenido

1. [Contexto](#contexto)
2. [Gap detectado](#gap-detectado)
3. [Motion actual en producción · keyframes y transitions](#motion-actual-en-producción--keyframes-y-transitions)
4. [Decisión necesaria](#decisión-necesaria)
5. [Criterio de cierre](#criterio-de-cierre)

---

## Contexto

DS 04 v0.1 quedó con 4 decisiones (DS-017 a DS-020). DS-018 (Card), DS-019 (Input) y DS-020 (Badge) están completas estructuralmente. **DS-017 (Button) tiene un gap deliberado**: la regla 02 explicita que el motion es "comportamiento opcional" y no forma parte de la variante.

Sin motion specs, la implementación de los botones quedaría sin las animaciones actuales (3D press, glow pulse, ring pulse, orb orbital, text swap, icon fade). Eso es un downgrade del estándar visual de producción y rompe la identidad de marca: en este proyecto, motion **no es decoración** — es lenguaje (precedente Linear, Vercel, Stripe, Resend).

---

## Gap detectado

### Texto exacto de DS-017 v0.1 regla 02

> *"Motion no define variante — 3D press, glow pulse, orb orbital son comportamientos OPCIONALES. La variante es identidad cromática + jerárquica. Motion se aplica caso a caso (hero CTA sí, button en form no)."*

### Por qué es un gap

1. **Motion en este proyecto ES identidad de marca**, no opcional. Cada variante actual de botón tiene motion específico que la distingue (orb orbital = ghost, glow pulse = CTA navy, ring pulse = primary).
2. **Sin tokens de motion** (duration, easing) la implementación queda librada a criterio del dev. Rompe la disciplina sistémica del manual.
3. **La consolidación 9 → 4** podría no ser viable si los efectos diferenciales son tan cruciales como las paletas. Sin motion specs no se puede juzgar.

---

## Motion actual en producción · keyframes y transitions

Extraído de `app/globals.css` líneas 1323–1730 (auditoría 04-May-2026).

### Keyframes definidos

```css
/* app/globals.css:1720-1731 */

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
```

### Transitions y choreography por variante

#### `.btn-body-primary` (Navy fill)

```css
/* default */
box-shadow: 0 4px 0 #011a52, 0 0 12px rgba(2, 41, 119, 0.2);
transition: transform 0.15s, box-shadow 0.15s;

/* hover */
transform: translateY(-2px);
box-shadow: 0 6px 0 #011a52, 0 0 25px rgba(2, 41, 119, 0.4);

/* active */
transform: translateY(3px);
box-shadow: 0 1px 0 #011a52;
```

Motion adicional: **text swap** (idle text fade-out + hover text fade-in centrado por abajo). Estructura HTML:

```html
<a class="btn-body-primary">
  <span class="btn-icon"><svg>→</svg></span>
  <span class="btn-text-idle">Empezar proyecto</span>
  <span class="btn-text-hover"><svg>⚡</svg> ¡Vamos allá!</span>
</a>
```

#### `.btn-body-amber` (Amber fill)

```css
/* default */
box-shadow: 0 4px 0 #b36b00, 0 6px 12px rgba(255, 153, 0, 0.35);
transition: transform 0.12s, box-shadow 0.12s;

/* hover */
transform: translateY(-2px);
box-shadow: 0 6px 0 #b36b00, 0 10px 20px rgba(255, 153, 0, 0.45);

/* active */
transform: translateY(3px);
box-shadow: 0 1px 0 #b36b00;
```

#### `.btn-body-ghost` (Outline + orb orbital)

```css
/* container */
transition: transform 0.12s;

/* orb orbital — child element */
animation: btn-orbit 3s linear infinite;
/* radial-gradient circle de 70px que orbita el borde */
```

#### `.btn-cta-navy` (Amber sobre Navy + glow pulse perpetuo)

```css
/* default — glow perpetuo */
animation: btn-glow-pulse 2.5s ease-in-out infinite;
transition: transform 0.15s, box-shadow 0.15s;

/* hover — animación se detiene, glow se intensifica */
transform: translateY(-2px);
animation: none;
box-shadow: 0 6px 0 #b36b00, 0 0 35px rgba(255, 153, 0, 0.75);

/* active */
transform: translateY(3px);
```

Motion adicional: **text swap + icon fade-out en hover**. El icono leading desaparece y el texto hover ocupa todo el ancho centrado.

#### `.btn-cta-ghost-navy` (Outline blanco + orb orbital)

```css
/* container */
transition: transform 0.12s;

/* orb-white — child element */
animation: btn-orbit 3s linear infinite;
background: radial-gradient(rgba(255,255,255,1) 34%, rgba(255,255,255,0) 68%);
```

#### `.btn-nav-primary` (Navbar pill, hover Electric → migrar a Amber 700 por DS-013)

```css
/* default */
box-shadow: 0 3px 0 #011a52;
transition: transform 0.12s, box-shadow 0.12s, background 0.2s;

/* hover */
background: #0400f0;  /* ⚠️ migrar a #995B00 Amber 700 según DS-013 */
transform: translateY(-1px);
box-shadow: 0 4px 0 #011a52, 0 6px 12px rgba(2, 41, 119, 0.25);

/* active */
transform: translateY(2px);
box-shadow: 0 1px 0 #011a52;
```

#### `.btn-nav-ghost`

```css
transition: all 0.15s;

/* hover */
background: rgba(2, 41, 119, 0.07);
color: #022977;
```

### Patrones identificados

| Patrón | Duración | Easing | Uso |
|---|---|---|---|
| 3D press (transform translateY) | 0.12s–0.15s | default (linear) | Todas las variantes excepto Link |
| Box-shadow transition | 0.12s–0.15s | default | Todas excepto Link |
| Color/background transition | 0.15s–0.20s | default | Nav variants |
| Glow pulse perpetuo | 2.5s | ease-in-out infinite | CTA navy |
| Ring pulse perpetuo | 1.8s (sugerido en design-system.md) | — | Primary idle (no encontrado en código actual — verificar) |
| Orbit infinite | 3s | linear infinite | Ghost variants |
| Text swap | sin transition explícita | — | Primary, CTA navy |

---

## Decisión necesaria

Patch **DS-017 v0.2** que:

### 1. Defina tokens de motion

Tokens nuevos sugeridos (posiblemente registrar como `DS-022` separada o como sub-decisión de DS-017):

```css
/* duration */
--motion-duration-instant: 80ms;   /* press */
--motion-duration-fast:    120ms;  /* simple transitions */
--motion-duration-base:    180ms;  /* hover changes */
--motion-duration-slow:    280ms;  /* emphasized transitions */
--motion-duration-pulse:  2500ms;  /* perpetual loops */

/* easing */
--motion-ease-emphasis:  cubic-bezier(0.4, 0, 0.2, 1);
--motion-ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);
--motion-ease-pulse:     ease-in-out;
```

### 2. Spec por variante × estado en formato accionable

No descripciones genéricas. Formato esperado tipo:

```
Variante: primary
Estado: hover (sobre Paper 0)
  duration: var(--motion-duration-slow)  // 280ms
  ease: var(--motion-ease-emphasis)
  transform: scale(1.02) translateY(-1px)
  shadow: var(--sh-2) → var(--sh-3)
  text-swap:
    idle:  fade-out 120ms (offset 0)
    hover: fade-in 180ms + slide-up 8px (offset 60ms)
  icon-swap:
    idle:  fade-out 120ms + slide-left 4px

Estado: active / press
  duration: var(--motion-duration-instant)  // 80ms
  ease: ease-out
  transform: scale(0.98) translateY(1px)
  shadow: var(--sh-2) → var(--sh-1)

Estado: focus-visible
  ring: var(--sh-focus)  // Amber 500 outline 3px
  no transform

Estado: idle (continuous)
  ring-pulse: 1.8s ease-in-out infinite  // si aplica
  glow-pulse: 2.5s ease-in-out infinite  // si aplica
```

### 3. Reconfirme la consolidación 9 → 4

¿Tras agregar motion specs, la consolidación 9 → 4 sigue siendo viable, o algunos efectos diferenciales (orb orbital, glow pulse, ring idle) ameritan variante propia?

Si el orb orbital es identidad de la variante ghost y el glow pulse es identidad del CTA-navy, podrían justificar 5 o 6 variantes en lugar de 4. Decisión del diseñador con justificación.

---

## Criterio de cierre

La pregunta se cierra cuando:

- DS-017 v0.2 incorpora motion specs accionables por variante × estado.
- Decisions Log registra `DS-022` (tokens de motion) o equivalente, si se introducen tokens nuevos.
- La sección [Button · DS-017](../04-components-core.md#2-button--ds-017) de `04-components-core.md` se actualiza con la tabla de motion specs.
- Si la consolidación cambia (ej. 9 → 5 en lugar de 9 → 4), se actualiza la auditoría preventiva del DS 04.
- Este archivo se mueve a `_open-questions/_archive/` con el resultado final como apéndice.

Una vez cerrado, DS 04 pasa de ⏳ Parcialmente aprobado a ✅ Aprobado, y se puede avanzar a DS 05 · Patrones (Hero, CTA Band, Process, FAQ, Forms).

---

**Archivos relacionados**:
- [`04-components-core.md`](../04-components-core.md) — sección 04 del manual
- [`00-implementation-strategy.md`](../00-implementation-strategy.md) — arquitectura en 3 capas (motion engine = capa 2)
- [`decisions-log.md`](../decisions-log.md) — log completo de decisiones
- [`docs/design-system.md`](../../design-system.md) — implementación actual del código
- `app/globals.css` líneas 1323–1730 — definiciones actuales de botones y keyframes
