# DS 02 v0.3 · Gaps cromáticos pendientes

| Estado | Para | De | Fecha |
|---|---|---|---|
| ⏳ Abierta | Diseñador | Israel | 2026-05-03 |

> Dos gaps detectados sobre la versión aprobada de DS 02 v0.3. Requieren decisión antes de avanzar a DS 03 · Spacing, Radii & Shadows.

---

## Contenido

1. [Contexto](#contexto)
2. [Gap 1 · Auditoría Electric vs producción](#gap-1--auditoría-electric-vs-producción)
3. [Gap 2 · DS-F002 contradice DS-010](#gap-2--ds-f002-contradice-ds-010)
4. [Decisión esperada](#decisión-esperada)
5. [Criterio de cierre](#criterio-de-cierre)

---

## Contexto

DS 02 v0.3 quedó aprobada con cuatro colores oficiales (Navy, Amber, Sky, Electric), 36 tokens de escalas derivadas, Ink 0–6, Paper 0–3, semantic x4, matriz de compatibilidad y 8 reglas de uso (`DS-005` a `DS-010`).

Antes de avanzar a DS 03, se detectaron dos gaps:

1. La regla 04 de `DS-010` ("Electric nunca sobre Navy") y las reglas 03 ("Sky y Electric mutuamente excluyentes por pantalla") y 05 ("Electric nunca toca Amber") chocan con varios usos actuales en código.
2. El token Link de `DS-F002` (en backlog para v1.0) entra en contradicción interna con `DS-010` reglas 06 y 07.

Resolver estos puntos garantiza que el sistema cromático pueda implementarse sin contradecir lo que ya está en producción ni dejar tensiones sin documentar.

---

## Gap 1 · Auditoría Electric vs producción

### Problema

Tres reglas aprobadas de `DS-010` chocan con usos actuales de `#0400F0` en el código:

- **Regla 03** — Sky y Electric mutuamente excluyentes por pantalla
- **Regla 04** — Electric nunca aparece sobre fondo Navy
- **Regla 05** — Electric nunca toca Amber directamente

### Datos del código actual

Búsqueda exhaustiva de `#0400f0` / `#0400F0` (auditoría 2026-05-03).

#### A · Usos compatibles con DS-010

| Archivo | Línea | Uso |
|---|---|---|
| `app/globals.css` | 1639, 1679 | Hover del botón primario en light mode (sobre fondo claro) |
| `app/globals.css` | 2367, 5298 | Texto en Electric sobre fondo claro |

#### B · Conflicto con regla 03 (Sky ⊕ Electric mutuamente excluyentes)

| Archivo | Línea | Uso |
|---|---|---|
| `app/globals.css` | 2001 | Gradiente `linear-gradient(90deg, #022977, #0400f0, #05a5ff)` mezcla Navy + Electric + Sky |
| `app/globals.css` | 4993 | Gradiente `linear-gradient(90deg, #0400f0, #05a5ff)` mezcla Electric + Sky |
| `app/components/process-sticky-section.tsx` | 48 | Array `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` rota Electric, Sky y Amber por step |
| `components/ui/text-hover-effect.tsx` | 69, 149 | Gradiente del watermark del footer mezcla Navy + Electric + Sky |

#### C · Posible conflicto con regla 04 (Electric nunca sobre Navy)

| Archivo | Línea | Uso |
|---|---|---|
| `app/components/ui/hero-orb-3d.tsx` | 38 | `emissive="#0400f0"` del orb 3D del hero (depende del fondo en cada tema) |
| `components/ui/text-hover-effect.tsx` | — | Watermark del footer suele renderizarse sobre fondos oscuros |

#### D · Conflicto con regla 05 (Electric nunca toca Amber)

| Archivo | Línea | Uso |
|---|---|---|
| `app/components/process-sticky-section.tsx` | 48 | Array de accent colors mezcla Electric y Amber por step en la misma sección |
| `app/components/ui/resizable-navbar.tsx` | 199, 223 | Links highlighted Amber + no highlighted Electric, adyacentes en el navbar |

#### E · Otros usos significativos por evaluar

| Archivo | Línea | Uso |
|---|---|---|
| `app/globals.css` | 2766, 2788, 2795 | Gradiente `linear-gradient(180deg, #1a15ff 0%, #0400f0 100%)` en botones |
| `app/components/ui/resizable-navbar.tsx` | 317, 390 | `bg-[#0400f0]` en navbar |
| `app/components/reviews-marquee-section.tsx` | 23 | `accent: "#0400f0"` |
| `app/portfolio/portfolio-page-client.tsx` | 65 | Eyebrow del portfolio en Electric |

### Decisión necesaria

Para cada uso identificado:

- **Migrar** → reemplazar por otro token (especificar cuál)
- **Conservar como excepción** → documentar excepción y justificación en `DS-010`
- **Conservar como gradiente compuesto** → reconocer que las reglas se aplican a sólidos en elementos distintos, no a gradientes que mezclan colores en un mismo elemento

**Pregunta marco**: las reglas 03, 04 y 05 ¿se aplican solo a colores sólidos en elementos distintos, o también a gradientes que mezclan colores dentro de un mismo elemento?

Si solo aplican a sólidos, los conflictos de la categoría B (gradientes en `globals.css` y `text-hover-effect.tsx`) desaparecen y queda un alcance manejable de migraciones reales.

---

## Gap 2 · DS-F002 contradice DS-010

### Problema

`DS-F002` (en backlog para v1.0) define el token Link así:

> "default **Sky**, hover **Amber**, visited **Electric**, focus ring **Amber** (2px · offset 3px)"

Dos contradicciones con `DS-010`:

#### Contradicción 1 — "default Sky" vs Regla 06

`DS-010` regla 06 dice: "Sky solo sobre Navy en dark mode — sobre blanco da 3.1:1, falla AA body. Para azul sobre blanco usar Sky 700 `#036399`."

Si los links son Sky 500 sobre Paper 0 (light), fallan AA. La nota de `DS-006` resuelve usando Sky 700 — pero `DS-F002` no especifica si es 500 o 700.

#### Contradicción 2 — "visited Electric" vs Regla 07

`DS-010` regla 07 dice: "Electric encapsulado como voz de Noa — animaciones Lottie, glow effects, BackgroundBoxes, badges 'nuevo/beta', momentos wow. Nunca en UI estática corporativa."

Los visited links son UI estática corporativa y pueden ser muchos por pantalla. Electric como visited rompe el encapsulamiento.

### Decisión necesaria

Aclarar `DS-F002` antes de promoverlo de Backlog a Aprobado:

- **Default link en light mode**: ¿Sky 500 o Sky 700? (Sky 700 cumple AA; Sky 500 falla)
- **Default link en dark mode**: Sky 500 sobre Navy es óptimo (5.3:1) — confirmar
- **Visited link**: ¿se mantiene Electric (excepción documentada en regla 07) o se cambia por otro token (ej. Navy 700, Sky 700 muted)?
- **Hover link**: Amber 500 cumple sobre Navy (6.6:1) pero falla AA sobre Paper 0 (2.2:1) — ¿se usa Amber 700 en light?

**Entrega esperada**: tabla con los 4 estados × 2 modos (light / dark) con HEX exactos y contraste WCAG.

---

## Decisión esperada

El diseñador entrega:

1. **Tabla de auditoría Electric** — cada uso identificado en Gap 1 con su veredicto (migrar / excepción / gradiente compuesto). Incluir aclaración del marco de aplicación de las reglas (sólidos vs gradientes).
2. **DS-F002 aclarado y promovido** — tabla de 4 estados × 2 modos del token Link, con HEX y contraste WCAG, sin contradicciones con `DS-010`.

Formato sugerido: actualización de DS 02 a v0.4 + Decisions Log con `DS-011` (auditoría Electric) y `DS-F002` promovido a aprobado.

---

## Criterio de cierre

La pregunta se cierra cuando:

- DS 02 v0.4 incorpora las decisiones anteriores.
- El Decisions Log registra `DS-011` con justificación y alternativas descartadas; `DS-F002` pasa de Backlog a Aprobado.
- Las secciones [`01-typography.md`](../01-typography.md) y [`02-colors.md`](../02-colors.md) se actualizan con los nuevos tokens y excepciones.
- Este archivo se mueve a `_open-questions/_archive/` con el resultado final como apéndice.

Una vez cerrada, se puede avanzar a DS 03 · Spacing, Radii & Shadows.

---

**Archivos relacionados**:
- [`02-colors.md`](../02-colors.md) — sistema cromático
- [`01-typography.md`](../01-typography.md) — sistema tipográfico (`DS-F002` vive acá)
- [`decisions-log.md`](../decisions-log.md) — log completo de decisiones
- [`docs/design-system.md`](../../design-system.md) — implementación actual del código
