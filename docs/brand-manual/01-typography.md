# 01 · Tipografía (DS 01)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.4 | 2026-04-24 |

> Sección 01 del Manual de Marca. Define las dos familias tipográficas oficiales, la escala fluida y los tokens adicionales (Quote, Overline, Stat).

---

## Contenido

1. [Familias tipográficas](#1-familias-tipográficas)
2. [Escala tipográfica](#2-escala-tipográfica)
3. [Tokens adicionales](#3-tokens-adicionales)
4. [Decisiones de diseño](#4-decisiones-de-diseño)
5. [Backlog relacionado](#5-backlog-relacionado)
6. [Historial de cambios](#6-historial-de-cambios)

---

## 1. Familias tipográficas

| Familia | Rol | Pesos | Carga |
|---|---|---|---|
| Space Grotesk | Display | 400, 500 | Google Fonts · `display=swap` |
| Inter | Body / UI | 400, 500 | Google Fonts · `display=swap` |

### Space Grotesk · Display

Geométrica-humanista. Aperturas amplias, cortes distintivos en 9, 7, g descendiente. Solo 400 y 500: rendimiento web y disciplina de jerarquía.

**Uso**: H1–H4, CTAs, stats / números, eyebrows, card titles.

**Linaje visual**: Linear, Vercel.

### Inter · Body / UI

Diseñada específicamente para UI: altura-x alta, hinting optimizado a pantalla, `font-variant-numeric: tabular-nums` nativo. Complementa a Space Grotesk sin competir — una es la voz (display), la otra es el habla (body).

**Uso**: párrafos, labels, UI text, footer links, card body, formularios.

**Linaje visual**: Stripe, Linear.

---

## 2. Escala tipográfica

Ratio modular **1.250** (mayor tercera) con interpolación fluida `clamp()` entre 375px (mobile) y 1440px (desktop). Sin media queries tipográficas.

**Mínimos absolutos**:
- Body ≥ 1rem (16px) — estándar WCAG
- H1 ≥ 36px en mobile

---

## 3. Tokens adicionales

Cierran vacíos identificados en revisión.

| Token | Uso | Detalle |
|---|---|---|
| Quote | Citas y testimonios | `max-width: 42ch`, comillas en Amber 500 |
| Overline | Metadata neutra (timestamps, kicker) | Diferenciado del Eyebrow Amber |
| Stat | Contadores numéricos | `font-variant-numeric: tabular-nums` para animación precisa |

**Ajuste global Space Grotesk**: `font-feature-settings: "ss01", "ss02", "cv11"` para activar variantes estilísticas alternativas.

**Max-width por nivel**: lectura óptima 45–75 caracteres por línea.

---

## 4. Decisiones de diseño

### DS-001 · Tipografía display · Space Grotesk
✅ **Aprobada** — 2026-04-24

Geométrica-humanista con personalidad sin sacrificar legibilidad. Pesos 400 y 500.

**Marca**: tech-premium moderno · precisión geométrica · agencia digital con carácter · linaje Linear, Vercel.

**Alternativas descartadas**: Montserrat display (`DS-X002`), Inter Display (sin personalidad en hero), fuentes custom (costo y time-to-brand).

### DS-002 · Tipografía body · Inter
✅ **Aprobada** — 2026-04-24

Diseñada para UI. Complementa a Space Grotesk: una es la voz, la otra es el habla. Pesos 400 y 500.

**Marca**: claridad funcional · legibilidad sin fricción · estándar SaaS premium · respeto por el lector.

**Alternativas descartadas**: Montserrat en body (`DS-X001`), solo Space Grotesk (`DS-X002`), system fonts (anonimato).

### DS-003 · Escala tipográfica · clamp() fluida
✅ **Aprobada** — 2026-04-24

Ratio 1.250 con `clamp()` entre 375 y 1440px. Body ≥ 16px, H1 ≥ 36px mobile.

**Marca**: calidad técnica invisible · responsive sin saltos · cuidado editorial.

**Alternativas descartadas**: escala fija por breakpoint (saltos visibles), ratio 1.333 (jerarquía exagerada en mobile), body 15px (debajo de WCAG).

### DS-004 · Tokens tipográficos adicionales
✅ **Aprobada** — 2026-04-24

Quote (42ch · comillas Amber), Overline (metadata neutra), Stat (`tabular-nums`), max-width por nivel, `font-feature-settings: "ss01","ss02","cv11"` global.

**Marca**: detalle editorial · lectura óptima · stats con precisión.

**Alternativas descartadas**: Eyebrow + Overline en un solo token (poca diferenciación), Quote sin comilla decorativa (pierde carácter).

---

## 5. Backlog relacionado

| ID | Tema | Prioridad | Target |
|---|---|---|---|
| DS-F001 | Tipografía Mono · JetBrains Mono para metadata técnica | Baja | v1.1 |
| DS-F002 | Token Link con 4 estados (default, hover, visited, focus) | Media | v1.0 |
| DS-F003 | SEO · H1 mobile mínimo 36px en `/servicios/[slug]` + checklist QA pre-deploy | Media | v1.0 |

> **Nota sobre DS-F002**: el token Link en su forma actual ("default Sky, visited Electric") tiene contradicciones internas con `DS-010` (reglas 06 y 07 del sistema cromático). Antes de promover de Backlog a Aprobado hay que resolverlas. Ver [pregunta abierta](_open-questions/2026-05-03-ds02-color-gaps.md).

---

## 6. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.4 | 2026-04-24 | `DS-004` — agrega Quote, Overline, Stat, max-width, font-feature-settings |
| v0.3 | 2026-04-24 | `DS-003` — escala fluida con clamp() |
| v0.2 | 2026-04-24 | `DS-002` — Inter como body |
| v0.1 | 2026-04-24 | `DS-001` — Space Grotesk como display |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`02-colors.md`](02-colors.md) — sistema cromático
