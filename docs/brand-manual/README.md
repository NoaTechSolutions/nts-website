# Manual de Marca · NoaTechSolutions

> Documento canónico de las decisiones de marca, identidad visual y reglas de uso del sistema de diseño NTS. Define el QUÉ y el PORQUÉ; el código las implementa.

**Base del Manual NOA-229** · Living doc · Owner: Israel · Maintainer: NoaTech Design

---

## Estado del manual

La numeración de las secciones (`DS NN`) está alineada con la numeración del Decisions Log y con los entregables del equipo de diseño.

| DS | Sección | Estado | Versión | Última actualización |
|---|---|---|---|---|
| 00 | [Estrategia de implementación](00-implementation-strategy.md) | ✅ Aprobada | v0.1 | 2026-05-04 |
| 01 | [Tipografía](01-typography.md) | ✅ Aprobado | v0.4.1 | 2026-05-03 |
| 01b | [Decisión de pairing tipográfico](01b-typography-pairing-decision.md) | ✅ Aprobada | v1.0 | 2026-04-24 |
| 02 | [Sistema cromático](02-colors.md) | ✅ Aprobado | v0.4 | 2026-05-03 |
| 03 | [Espaciado, radios y sombras](03-spacing-radii-shadows.md) | ✅ Aprobado | v0.1 | 2026-05-04 |
| 04 | [Componentes core](04-components-core.md) | ✅ Aprobado | v0.2 | 2026-05-04 |
| 05 | [Patrones (Hero, CTA, Process, FAQ, Forms)](05-patterns.md) | ✅ Aprobado | v0.1 | 2026-05-05 |
| 06 | [Iconografía](06-iconography.md) | ✅ Aprobado | v0.1 | 2026-05-05 |
| 07 | Ilustración | 📝 Pendiente | — | — |
| 08 | [Mascota Noa](08-mascot-noa.md) | ✅ Aprobado | v0.1 | 2026-05-05 |
| 09 | [Motion · sistema completo](09-motion.md) | ✅ Aprobado | v0.1 | 2026-05-06 |
| 10 | Tono de voz y copy | 📝 Pendiente | — | — |

> El roadmap de módulos 04 a 10 es una proyección. Se ajustará a medida que el equipo de diseño confirme la secuencia oficial.

📒 [`decisions-log.md`](decisions-log.md) — registro completo **v1.1.0** (44 aprobadas · 9 backlog · 11 descartadas).

---

## Cómo leer este manual

- **Audiencia**: equipo de diseño, desarrollo, contenido y stakeholders.
- **Propósito**: alinear todas las decisiones visuales y de identidad antes de que lleguen al código.
- **Relación con el código**: el manual define el QUÉ y el PORQUÉ; [`docs/design-system.md`](../design-system.md) describe el CÓMO está implementado actualmente. Si el manual y el código divergen, se corrige el código (no el manual), salvo que se documente una excepción explícita.

## Convenciones del manual

### Indicadores de estado

| Símbolo | Significado |
|---|---|
| ✅ | Aprobado — decisión tomada y documentada |
| ⏳ | Parcialmente aprobado — decisión tomada con preguntas abiertas |
| ❓ | En revisión — propuesta sobre la mesa, pendiente de aprobación |
| 📝 | Pendiente / próximo — sección sin abordar todavía |
| 🚫 | Descartado — alternativa rechazada (se conserva el rastro) |

### Identificadores de decisiones

- `DS-NNN` — decisiones aprobadas (DS-001, DS-002, …)
- `DS-FNNN` — backlog / propuestas futuras (DS-F001, DS-F002, …)
- `DS-XNNN` — descartadas (DS-X001, DS-X002, …)

Cualquier referencia desde código, commits, issues o PRs debe usar el ID estable. Una vez asignado, no se reutiliza.

### Versionado

Cada sección lleva su propio versionado semántico:

- **Mayor (v1.0)** — cambia roles definitivos o reglas absolutas
- **Menor (v0.x)** — agrega tokens, refina reglas, suma documentación
- **Patch (v0.x.y)** — correcciones de redacción o tipos

El Decisions Log lleva su propio versionado (`v0.x.y`) que avanza con cada nueva decisión registrada.

---

## Preguntas abiertas

Las preguntas pendientes con el equipo de diseño viven en [`_open-questions/`](_open-questions/). Cada una se archiva una vez resuelta y sus decisiones se incorporan a la sección correspondiente.

| Pregunta | Sección afectada | Estado | Para |
|---|---|---|---|
| _Sin preguntas abiertas activas._ | — | — | — |

### Archivo histórico

| Pregunta | Cierre | Resultado |
|---|---|---|
| [Gaps DS 02 v0.3 — sistema cromático](_open-questions/_archive/2026-05-03-ds02-color-gaps.md) | 2026-05-03 | Resuelta en DS 02 v0.4 (`DS-011`, `DS-012`, `DS-013`, `DS-X007`) |
| [DS-017 motion specs pendientes](_open-questions/_archive/2026-05-04-ds-017-motion-specs.md) | 2026-05-04 | Resuelta en DS 04 v0.2 (`DS-017 v0.2`, `DS-022`) |

---

## Cómo agregar una sección nueva

1. Crear `NN-nombre-en-kebab.md` siguiendo la plantilla de la sección 02 (encabezado de estado, contenido numerado, decisiones de diseño, historial de cambios).
2. Sumar la entrada al índice de este README.
3. Si introduce decisiones nuevas, asignar IDs consecutivos en el Decisions Log y agregarlas también al log.
4. Si depende de una decisión todavía abierta, abrir un archivo en `_open-questions/`.

## Cómo abrir una pregunta nueva al diseñador

1. Crear archivo en `_open-questions/` con nombre `YYYY-MM-DD-tema-corto.md`.
2. Estructura sugerida: contexto, gaps numerados con datos, decisión esperada, criterio de cierre.
3. Sumar entrada en la tabla de "Preguntas abiertas" de este README.
4. Cuando se cierre, mover el archivo a `_open-questions/_archive/` y reflejar las decisiones en la sección del manual y en el Decisions Log.

---

## Archivos relacionados

### Implementación y código
- [`docs/design-system.md`](../design-system.md) — implementación actual (snapshot del código)
- [`docs/COMPONENTS.md`](../COMPONENTS.md) — inventario canónico de componentes
- [`docs/SITEMAP.md`](../SITEMAP.md) — mapa del sitio y secciones
- [`docs/AUDIT.md`](../AUDIT.md) — auditoría técnica del proyecto
- [`docs/CHANGELOG.md`](../CHANGELOG.md) — bitácora de cambios del proyecto

### Artefactos estratégicos del scope NOA-229

- **NoaTech UX-SEO Playbook** (entregable del equipo de diseño) — documento estratégico aparte que cubre auditoría del home actual, arquitectura SEO por página, plantilla `/servicios/[slug]`, mega-menú, mascota Noa Lottie, `/nosotros` y roadmap de implementación. NO es un módulo del manual de marca, vive como deliverable independiente. Próximo bloque de trabajo después de cerrar DS 05–10.
