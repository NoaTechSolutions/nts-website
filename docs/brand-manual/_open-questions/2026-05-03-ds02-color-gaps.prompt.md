# Prompt para diseñador · Cierre de gaps DS 02 v0.3

| Estado | Para | De | Fecha |
|---|---|---|---|
| 📤 Listo para enviar | Diseñador | Israel | 2026-05-03 |

> Versión copy-paste-ready del documento [`2026-05-03-ds02-color-gaps.md`](2026-05-03-ds02-color-gaps.md), optimizada para pegar directamente en el chat con el diseñador. Cuando se reciba la respuesta, se actualiza el doc estructurado y se archivan ambos archivos.

---

## Mensaje a copiar

```
Asunto: DS 02 v0.3 → v0.4 · Cerrar 2 gaps antes de avanzar a DS 03

Hola, dos puntos detectados en la revisión técnica de v0.3 contra el código de producción. Ambos requieren tu definición antes de avanzar a DS 03 · Spacing, Radii & Shadows.

---

## Gap 1 · Auditoría Electric vs producción

Las reglas 03, 04 y 05 de DS-010 chocan con varios usos actuales de #0400F0 en el código. Búsqueda exhaustiva en el repo (2026-05-03):

### A · Compatibles con DS-010 (no requieren acción)

- app/globals.css:1639, 1679 — hover del botón primario en light mode (sobre fondo claro)
- app/globals.css:2367, 5298 — texto Electric sobre fondo claro

### B · Conflicto con regla 03 (Sky ⊕ Electric mutuamente excluyentes)

- app/globals.css:2001 — gradiente linear-gradient(90deg, #022977, #0400f0, #05a5ff) mezcla Navy + Electric + Sky
- app/globals.css:4993 — gradiente linear-gradient(90deg, #0400f0, #05a5ff) mezcla Electric + Sky
- app/components/process-sticky-section.tsx:48 — array ["#0400f0", "#05a5ff", "#ff9900", "#09215e"] rota Electric, Sky y Amber por step
- components/ui/text-hover-effect.tsx:69, 149 — watermark del footer mezcla Navy + Electric + Sky

### C · Posible conflicto con regla 04 (Electric nunca sobre Navy)

- app/components/ui/hero-orb-3d.tsx:38 — emissive="#0400f0" del orb 3D (depende del fondo en cada tema)
- components/ui/text-hover-effect.tsx — watermark del footer suele renderizarse sobre fondos oscuros

### D · Conflicto con regla 05 (Electric nunca toca Amber)

- app/components/process-sticky-section.tsx:48 — array de accent colors mezcla Electric y Amber por step
- app/components/ui/resizable-navbar.tsx:199, 223 — links highlighted Amber + no highlighted Electric, adyacentes en el navbar

### E · Otros usos significativos por evaluar

- app/globals.css:2766, 2788, 2795 — gradiente linear-gradient(180deg, #1a15ff 0%, #0400f0 100%) en botones
- app/components/ui/resizable-navbar.tsx:317, 390 — bg-[#0400f0] en navbar
- app/components/reviews-marquee-section.tsx:23 — accent: "#0400f0"
- app/portfolio/portfolio-page-client.tsx:65 — eyebrow del portfolio en Electric

### Pregunta marco

Antes de auditar caso por caso: ¿las reglas 03, 04 y 05 se aplican solo a colores sólidos en elementos distintos, o también a gradientes que mezclan colores en un mismo elemento?

Si solo aplican a sólidos, los conflictos de la categoría B (gradientes) desaparecen y queda un alcance manejable de migraciones reales.

### Entrega esperada Gap 1

Tabla con cada uso (categorías B, C, D, E) y su veredicto:

- Migrar → token de reemplazo (especificar cuál)
- Excepción documentada → justificación y bajo qué condición
- Gradiente compuesto → si las reglas no aplican a gradientes

---

## Gap 2 · DS-F002 contradice DS-010

DS-F002 (en backlog v1.0) define el token Link así:

"default Sky, hover Amber, visited Electric, focus ring Amber (2px · offset 3px)"

Dos contradicciones internas con DS-010:

Contradicción 1 — "default Sky" vs Regla 06

DS-010 regla 06 dice: "Sky solo sobre Navy en dark mode — sobre blanco da 3.1:1, falla AA body. Para azul sobre blanco usar Sky 700 #036399."

Si los links son Sky 500 sobre Paper 0 (light), fallan AA. DS-006 sugiere Sky 700, pero DS-F002 no especifica si es 500 o 700.

Contradicción 2 — "visited Electric" vs Regla 07

DS-010 regla 07 dice: "Electric encapsulado como voz de Noa — animaciones, mascota, badges 'nuevo/beta', momentos wow. Nunca en UI estática corporativa."

Los visited links son UI estática corporativa y pueden ser muchos por pantalla. Electric como visited rompe el encapsulamiento.

### Entrega esperada Gap 2

Tabla del token Link con 4 estados × 2 modos (light / dark), HEX exactos y contraste WCAG 2.2:

| Estado     | Light (sobre Paper 0) | Contraste | Dark (sobre Navy 500) | Contraste |
|------------|-----------------------|-----------|-----------------------|-----------|
| Default    | ?                     | ?         | ?                     | ?         |
| Hover      | ?                     | ?         | ?                     | ?         |
| Visited    | ?                     | ?         | ?                     | ?         |
| Focus ring | ?                     | ?         | ?                     | ?         |

---

## Formato de entrega

Actualizar:

1. DS 02 → v0.4 con la auditoría Electric resuelta (excepciones o migraciones en sección dedicada).
2. Decisions Log con DS-011 (auditoría Electric — qué se decidió, marco de aplicación de reglas, alternativas descartadas).
3. DS-F002 promovido de Backlog a Aprobado, con la tabla 4×2 estados resuelta.

Confirma cuando esté listo para que Israel apruebe antes de avanzar a DS 03 · Spacing, Radii & Shadows.
```

---

## Notas operativas

- **Cuándo enviarlo**: cuando el diseñador esté disponible para iterar sobre v0.3.
- **Qué hacer con la respuesta**: actualizar [`2026-05-03-ds02-color-gaps.md`](2026-05-03-ds02-color-gaps.md) con el resultado, propagar las decisiones a [`02-colors.md`](../02-colors.md) y [`01-typography.md`](../01-typography.md), registrar `DS-011` en [`decisions-log.md`](../decisions-log.md).
- **Cierre**: mover este archivo y el doc estructurado a `_open-questions/_archive/` como apéndice de la decisión final.

---

**Archivos relacionados**:
- [`2026-05-03-ds02-color-gaps.md`](2026-05-03-ds02-color-gaps.md) — versión estructurada del mismo gap
- [`../decisions-log.md`](../decisions-log.md) — log completo de decisiones
- [`../02-colors.md`](../02-colors.md) — sistema cromático
