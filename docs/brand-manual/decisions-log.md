# Decisions Log · NoaTech Design System

| Owner | Maintainer | Versión | Última actualización |
|---|---|---|---|
| Israel · Fundador | NoaTech Design | v0.3.0 | 2026-04-24 |

> Registro vivo de cada decisión aprobada, en backlog o descartada en el proceso de construcción del Design System NTS. Es la fuente de verdad que alimenta el Manual de Marca NOA-229.

---

## Resumen

| Estado | Cantidad |
|---|---|
| ✅ Aprobadas | 10 |
| 📌 Backlog | 3 |
| 🚫 Descartadas | 6 |

---

## ✅ Aprobadas

### DS-001 · Tipografía display · Space Grotesk
**2026-04-24** · Sección [01 · Tipografía](01-typography.md#decisiones-de-diseño)

Geométrica-humanista con personalidad sin sacrificar legibilidad. Pesos 400 y 500. Cargada vía Google Fonts con `display=swap`.

**Uso**: H1–H4, CTAs, stats/números, eyebrows, card titles.

**Marca**: tech-premium moderno · precisión geométrica · agencia digital con carácter · linaje Linear, Vercel.

**Alternativas descartadas**: Montserrat display (`DS-X002`), Inter Display (sin personalidad en hero), fuentes custom (costo y time-to-brand).

### DS-002 · Tipografía body · Inter
**2026-04-24** · Sección [01 · Tipografía](01-typography.md#decisiones-de-diseño)

Diseñada específicamente para UI. Altura-x alta, hinting optimizado a pantalla, `font-variant-numeric: tabular-nums` nativo. Complementa a Space Grotesk: una es la voz (display), la otra es el habla (body). Pesos 400 y 500.

**Uso**: párrafos, labels, UI text, footer links, card body, formularios.

**Marca**: claridad funcional · legibilidad sin fricción · estándar SaaS premium (Stripe, Linear) · respeto por el lector.

**Alternativas descartadas**: Montserrat en body (`DS-X001`), solo Space Grotesk (`DS-X002`), system fonts (anonimato).

### DS-003 · Escala tipográfica · clamp() fluida
**2026-04-24** · Sección [01 · Tipografía](01-typography.md#decisiones-de-diseño)

Ratio modular **1.250** (mayor tercera). Interpolación fluida con `clamp()` entre 375px (mobile) y 1440px (desktop), sin media queries tipográficas. Body mínimo 1rem (16px); H1 mínimo 36px en mobile.

**Marca**: calidad técnica invisible · responsive sin saltos bruscos · cuidado tipográfico editorial.

**Alternativas descartadas**: escala fija por breakpoint (saltos visibles), ratio 1.333 (jerarquía exagerada en mobile), body 15px (debajo de WCAG).

### DS-004 · Tokens tipográficos adicionales
**2026-04-24** · Sección [01 · Tipografía](01-typography.md#decisiones-de-diseño)

Cierra vacíos identificados en revisión: Quote (42ch · comillas Amber), Overline (metadata neutra, separado del Eyebrow Amber), Stat (contadores con `tabular-nums`), max-width por nivel, y `font-feature-settings: "ss01","ss02","cv11"` global en Space Grotesk.

**Marca**: detalle editorial en cada componente · lectura óptima (45–75 caracteres) · stats que animan con precisión.

**Alternativas descartadas**: Eyebrow + Overline en un solo token (poca diferenciación), Quote sin comilla decorativa (pierde carácter).

### DS-005 · Color CTA · Amber 500 (`#FF9900`)
**2026-04-24** · Sección [02 · Colores](02-colors.md#decisiones-de-diseño)

HEX oficial de producción intacto. Naranja vivo y humano. Contraste 6.6:1 sobre Navy 500 (AA+) y 6.6:1 sobre Ink 0. Único color con función "acción": CTAs, eyebrows, stats destacados, focus ring. Máximo 3 usos simultáneos por viewport.

Escala 50→800 derivada matemáticamente del base 500 (sRGB mix con blanco/negro). **Amber 700 `#995B00`** reservado para texto body sobre blanco donde el 500 falla contraste.

**Marca**: calidez humana que convierte · energía comercial california-tech · diferenciación vs azul SaaS · único color con permiso de "gritar".

**Alternativas descartadas**: Amber tierra `#D97F2B` (rompía producción), naranja coral `#F97459` (muy rojo, urgencia), Amber dorado `#E9B949` (falla contraste AA).

### DS-006 · Color highlights · Sky 500 (`#05A5FF`)
**2026-04-24** · Sección [02 · Colores](02-colors.md#decisiones-de-diseño)

HEX oficial de producción intacto. Azul vibrante con rol exclusivo: highlights sobre Navy, data-viz, ilustraciones técnicas, íconos, info states. Contraste 5.3:1 sobre Navy 500. Jamás CTA · jamás sobre blanco para texto body (3.1:1).

Escala completa 50→800 derivada matemáticamente. **Sky 700 `#036399`** reservado para texto body sobre blanco donde aplique.

**Marca**: claridad técnica · know-how de producto · dark mode con identidad · data-viz confiable.

**Alternativas descartadas**: Sky desaturado `#4A7CC7` (fuera de producción), Navy como secundario (se fusiona con Ink), azul ciano genérico ("SaaS genérico").

### DS-007 · Escala neutral · Ink 0–6 derivada de Navy
**2026-04-24** · Sección [02 · Colores](02-colors.md#decisiones-de-diseño)

Escala de 7 pasos derivada del Navy oficial `#022977`. Ink 0 = `#01102F` (Navy 800) como base dark, Ink 1 = `#02215F` (Navy 600), escalando a Ink 6 = `#EEF1F8`. Cohesión cromática total con primary — no son grises random, son Navy desaturado.

**Marca**: profundidad premium · seriedad sin rigidez · jerarquía visual clara · foco y sofisticación tech.

**Alternativas descartadas**: grises neutros puros (sin cohesión con Navy), negro puro `#000` (exceso de peso), Ink independiente del Navy (rompe unidad cromática).

### DS-008 · Superficies · Paper light + Navy dark
**2026-04-24** · Sección [02 · Colores](02-colors.md#decisiones-de-diseño)

4 surfaces light (`#FFFFFF` / `#F0F4FF` soft / `#E8EEF9` / `#FAF8F5` warm) y dark derivado del Navy oficial (`#022977` base / `#02215F` elevado / `#01102F` profundo). Paper 1 es la superficie hero light por defecto. Amber 500 y Sky 500 mantienen HEX idéntico en dark.

**Marca**: luz tech limpia (Paper 1) · profundidad editorial (Paper 3 warm) · dark mode con identidad intacta.

**Alternativas descartadas**: paper rosa/crema cálido (rompe narrativa tech), dark puro negro (agresivo en lecturas largas), Amber diferente en dark (rompe reconocimiento de marca).

### DS-009 · Reglas de uso · 60/30/10 + semántica
**2026-04-24** · Sección [02 · Colores](02-colors.md#decisiones-de-diseño)

Proporción **60 neutrales · 30 Navy contenido · 10 Amber**. Un solo CTA Amber por sección. Semantic x4 (Success, Warning, Danger, Info) con variantes soft 50. **No gradientes multicolor** — solo mono-tono dentro de un mismo rol.

**Marca**: disciplina que proyecta madurez · Amber "grita" porque es raro · paleta reconocible sin saturada.

**Alternativas descartadas**: Gradient Aurora legacy (`DS-X003`), 2 CTAs primarios por sección (competencia), Electric como CTA principal (`DS-X005`).

### DS-010 · Paleta cromática final · 4 colores con reglas de no-mezcla
**2026-04-24** · Sección [02 · Colores](02-colors.md#decisiones-de-diseño) · **Opción A + matiz C**

Se cierra la paleta en 4 HEX oficiales de producción con roles únicos y mutuamente excluyentes por contexto:

- `#022977` Navy · autoridad / dark / headlines
- `#FF9900` Amber · CTA único / eyebrows / stats
- `#05A5FF` Sky · dark mode / highlights / links
- `#0400F0` Electric · animaciones / mascota Noa / momentos wow

**Reglas de no-mezcla**:
1. Sky y Electric mutuamente excluyentes por pantalla
2. Electric nunca sobre Navy (contraste insuficiente, dos azules oscuros)
3. Electric nunca toca Amber directamente (vibración cromática complementaria)
4. Sky solo sobre Navy en dark mode (sobre blanco falla 3.1:1)
5. Electric encapsulado en animación, mascota y badges "nuevo/beta" — máx 1 por pantalla

**Marca**: tecnología B2B California · elegancia institucional (Navy) · calidez que convierte (Amber) · profesionalismo técnico (Sky) · energía premium encapsulada (Electric como voz de Noa).

**Alternativas descartadas**: Opción B · jubilar Electric completamente (`DS-X006`), Electric libre en UI estática (vibración con Amber), Sky sobre blanco como texto body (falla AA), Electric sobre Navy (dos azules oscuros), HEX aproximados no oficiales (rompía producción).

---

## 📌 Backlog

Ideas evaluadas que no entran en la versión actual. Cada una con prioridad y target de release.

| ID | Componente | Sugerencia | Prioridad | Target |
|---|---|---|---|---|
| DS-F001 | Tipografía · Mono | JetBrains Mono para metadata técnica — eyebrows numéricos, "PROYECTO · 2025", timestamps, snippets. Peso único 400, carga condicional. | Baja | v1.1 |
| DS-F002 | Tipografía · Link | Token Link con 4 estados — default Sky, hover Amber, visited Electric, focus ring Amber (2px · offset 3px). | Media | v1.0 |
| DS-F003 | Tipografía · SEO | Documentar regla H1 mobile mínimo 36px en template `/servicios/[slug]` y checklist QA pre-deploy. | Media | v1.0 |

> **Nota DS-F002**: tiene contradicciones internas con `DS-010` (reglas 06 y 07) que deben resolverse antes de promoverlo a aprobado. Ver [pregunta abierta](_open-questions/2026-05-03-ds02-color-gaps.md).

---

## 🚫 Descartadas

Opciones evaluadas y cerradas. Se registran para no reabrir debates y dejar trazabilidad.

### DS-X001 · Space Grotesk + Montserrat
Combinación legacy del sitio actual. Montserrat es display-poster, no UI: altura-x baja, pesada en body 16px, letal en 14px. Dos display sans compiten por protagonismo.
**Reemplazo**: Inter como body (`DS-002`).

### DS-X002 · Solo Space Grotesk
Una sola display sans produce fatiga visual en textos largos. Coherencia no compensa pérdida de jerarquía y legibilidad en FAQ, blog y proceso.
**Reemplazo**: Space Grotesk display + Inter body (`DS-001` + `DS-002`).

### DS-X003 · Gradient Aurora multicolor
Legacy `linear-gradient(90deg, #ff9900, #05a5ff, #0400f0, #09215e)`. Cuatro colores en un mismo elemento producen ruido visual y dificultan reconocimiento.
**Reemplazo**: gradients mono-tono (`DS-009`).

### DS-X004 · Navy `#022977` como primary
Legacy navy saturado compite con Sky y con Ink. Se fusiona semánticamente con Ink 0 (oscuro premium). No aportaba rol único.
**Resolución**: Navy se mantiene como primary pero con jerarquía clara vs Ink (`DS-007` + `DS-010`).

### DS-X005 · Electric `#0400F0` como CTA principal
Saturado al máximo. Falla WCAG AA sobre Paper 0 en botones pequeños. Rebaja la jerarquía del Amber.
**Reemplazo**: Electric encapsulado como accent / voz de Noa (`DS-010`).

### DS-X006 · Opción B · jubilar Electric completamente
Reducir la paleta a 3 colores eliminando Electric, reemplazando por Amber 700 (hovers) y Navy 700 (acentos oscuros). Descartada porque Electric ya está en producción (hover de botones, glow, BackgroundBoxes) y se decidió darle rol único como color de la mascota Noa y momentos animados.
**Resolución**: Opción A + matiz C (`DS-010`).

---

## Versionado del log

| Versión | Fecha | Cambio |
|---|---|---|
| v0.3.0 | 2026-04-24 | DS-010 aprobada · DS-X006 registrada · DS 02 v0.3 cerrada |
| v0.2.x | 2026-04-24 | DS-005 a DS-009 aprobadas y corregidas con HEX oficiales de producción |
| v0.1.x | 2026-04-24 | DS-001 a DS-004 aprobadas (DS 01 · Tipografía) |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`01-typography.md`](01-typography.md) — sección 01
- [`02-colors.md`](02-colors.md) — sección 02
- [`_open-questions/`](_open-questions/) — preguntas abiertas
