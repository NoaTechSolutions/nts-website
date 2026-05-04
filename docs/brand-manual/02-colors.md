# 02 · Sistema cromático (DS 02)

| Estado | Versión | Última actualización |
|---|---|---|
| ⏳ Parcialmente aprobado | v0.3 | 2026-04-24 |

> Sección 02 del Manual de Marca. Cuatro colores oficiales con roles únicos, escalas derivadas, neutrales, superficies, semánticos, matriz de compatibilidad, reglas de uso y accesibilidad. Hay un gap pendiente sobre la convivencia con código de producción; ver [Pendientes](#9-pendientes).

---

## Contenido

1. [Paleta oficial](#1-paleta-oficial)
2. [Roles definitivos](#2-roles-definitivos)
3. [Escalas derivadas](#3-escalas-derivadas)
4. [Neutrales y superficies](#4-neutrales-y-superficies)
5. [Tokens semánticos](#5-tokens-semánticos)
6. [Matriz de compatibilidad](#6-matriz-de-compatibilidad)
7. [Reglas de uso](#7-reglas-de-uso)
8. [Contraste y accesibilidad](#8-contraste-y-accesibilidad)
9. [Pendientes](#9-pendientes)
10. [Decisiones de diseño](#10-decisiones-de-diseño)
11. [Historial de cambios](#11-historial-de-cambios)

---

## 1. Paleta oficial

Cuatro colores oficiales de producción. Los HEX son fijos: son la base 500 de cada escala.

| Color | HEX | Token CSS | Significado |
|---|---|---|---|
| Navy 500 | `#022977` | `--navy-500` | Autoridad tech / dark / headlines |
| Amber 500 | `#FF9900` | `--amber-500` | CTA único / eyebrows / stats |
| Sky 500 | `#05A5FF` | `--sky-500` | Highlights / dark mode / data-viz |
| Electric 500 | `#0400F0` | `--electric-500` | Mascota Noa / animaciones / momentos wow |

> El token CSS actual del repositorio para Electric es `--color-accent`. La auditoría técnica ([`docs/AUDIT.md`](../AUDIT.md)) recomienda renombrarlo a `--color-electric` o `--electric-500` para alinear nombre con rol.

---

## 2. Roles definitivos

| Color | Rol | Casos de uso |
|---|---|---|
| Navy | Primary — autoridad tech | Fondo dark mode, headlines en light, footer, navegación, superficies premium |
| Amber | CTA único | CTA principal, eyebrows de marca, stats destacados, focus ring, highlight |
| Sky | Highlights técnicos | Highlights dark mode, links default, data-viz, íconos técnicos, info states |
| Electric | Accent encapsulado | Hover states, badges nuevo/beta, animaciones 3D, mascota Noa |

> **Regla de oro**: si un componente no encaja en ninguno de los cuatro roles, no usa ninguno de los cuatro colores oficiales — usa neutrales (Ink) o semánticos.

---

## 3. Escalas derivadas

Las escalas 50–400 se generan aclarando el HEX oficial (mezcla con blanco en sRGB). Las escalas 600–800 se generan oscureciendo (mezcla con negro). Los 500 permanecen intactos.

### Navy — Primary

| 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|---|
| `#E8EDFB` | `#C3D0F2` | `#8AA0E4` | `#4F6ECF` | `#1E43A8` | **`#022977`** | `#02215F` | `#011947` | `#01102F` |

### Amber — CTA

| 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|---|
| `#FFF6E6` | `#FFE6B8` | `#FFD485` | `#FFC252` | `#FFB01F` | **`#FF9900`** | `#CC7A00` | `#995B00` | `#663D00` |

### Sky — Highlights

| 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|---|
| `#E0F4FF` | `#B8E4FF` | `#7CCFFF` | `#3FBAFF` | `#1FAFFF` | **`#05A5FF`** | `#0484CC` | `#036399` | `#024266` |

### Electric — Accent

| 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|---|
| `#E6E5FF` | `#B8B5FF` | `#7F7BFF` | `#4640FF` | `#1E17FF` | **`#0400F0`** | `#0300C0` | `#020090` | `#010060` |

> **Tokens 700 reservados para texto sobre fondos light**: Amber 700 (`#995B00`) y Sky 700 (`#036399`) cubren los casos donde el 500 no alcanza contraste AA sobre blanco.

---

## 4. Neutrales y superficies

### Ink · Escala neutral derivada de Navy

7 pasos derivados del Navy oficial. NO son grises random — son Navy desaturado, lo que mantiene cohesión cromática total con primary.

| Token | HEX | Uso |
|---|---|---|
| Ink 0 | `#01102F` | Base dark (= Navy 800) |
| Ink 1 | `#02215F` | Elevado dark (= Navy 600) |
| Ink 2 | `#3C4A7A` | Texto secundario, borders fuertes |
| Ink 3 | `#6C7AA3` | Body secundario, placeholders |
| Ink 4 | `#A3AECC` | Disabled, dividers |
| Ink 5 | `#D0D6E8` | Borders suaves, hover-surface |
| Ink 6 | `#EEF1F8` | Backgrounds neutros, surface alt |

### Paper · Superficies

| Token | HEX | Uso |
|---|---|---|
| Paper 0 | `#FFFFFF` | Fondo base light |
| Paper 1 | `#F0F4FF` | Hero light por defecto |
| Paper 2 | `#E8EEF9` | Cards, secciones alternas |
| Paper 3 warm | `#FAF8F5` | Profundidad editorial cálida |

### Dark surfaces

Derivadas del Navy oficial:

| Token | HEX | Uso |
|---|---|---|
| Navy 500 | `#022977` | Base dark |
| Navy 600 | `#02215F` | Superficie elevada dark |
| Navy 800 | `#01102F` | Profundidad / fondo más oscuro |

> Amber 500 y Sky 500 mantienen HEX idéntico en dark mode — el reconocimiento de marca no cambia entre temas.

---

## 5. Tokens semánticos

Cuatro estados con variantes soft 50.

| Token | HEX | Uso |
|---|---|---|
| Success | `#2F9E4F` | Confirmaciones, validaciones positivas |
| Warning | `#D18B1F` | Alertas no críticas |
| Danger | `#C93A2A` | Errores y validaciones bloqueantes |
| Info | `#05A5FF` | Mensajes informativos (= Sky 500) |

---

## 6. Matriz de compatibilidad

Lee la fila como **fondo** y la columna como **elemento encima**. 16 pares · 4×4 + Paper 0.

Leyenda: ✅ óptimo · ⚠️ condicional · 🚫 prohibido

| Fondo ↓ / Encima → | Navy | Amber | Sky | Electric | Paper 0 |
|---|---|---|---|---|---|
| **Navy** `#022977` | — | ✅ 6.6:1 · combo insignia | ✅ 5.3:1 · highlights dark | 🚫 dos azules oscuros | — |
| **Amber** `#FF9900` | ✅ 6.6:1 · texto de CTA | — | 🚫 roles solapados | 🚫 vibración complementaria | — |
| **Sky** `#05A5FF` | ⚠️ raro · solo ilustración | 🚫 compiten por highlight | — | 🚫 mutuamente excluyentes | — |
| **Electric** `#0400F0` | — | 🚫 vibración complementaria | 🚫 mutuamente excluyentes | — | — |
| **Paper 0** `#FFFFFF` | ✅ 14.7:1 · headlines | ⚠️ 2.2:1 · decorativo (no texto) | 🚫 3.1:1 · Sky solo dark | ✅ 8.4:1 · accent / mascota | — |

---

## 7. Reglas de uso

8 reglas oficiales aprobadas (`DS-009` + `DS-010`).

| # | Regla | Detalle |
|---|---|---|
| 01 | **60 / 30 / 10** | 60% neutrales (Paper + Ink/Navy), 30% Navy contenido, 10% Amber |
| 02 | **Un CTA Amber por sección** | Nunca dos primarios compitiendo. Texto del botón Amber en Navy 500 (6.6:1) |
| 03 | **Sky y Electric mutuamente excluyentes** | Nunca en el mismo viewport. Dark / técnico → Sky · Animación / Noa → Electric |
| 04 | **Electric nunca sobre Navy** | Dos azules oscuros se pierden. Electric solo sobre Paper 0–1 y como protagonista de animación |
| 05 | **Electric nunca toca Amber** | Complementarios casi puros en RGB. Mínimo 40px de separación neutral |
| 06 | **Sky solo sobre Navy en dark** | Sobre blanco da 3.1:1 (falla AA body). Para azul sobre blanco usar Sky 700 `#036399` |
| 07 | **Electric encapsulado como voz de Noa** | Animaciones Lottie, glow effects, BackgroundBoxes, badges "nuevo/beta", momentos wow. Nunca en UI estática corporativa |
| 08 | **Amber no es texto body** | 2.2:1 sobre blanco. Solo highlights grandes, stats, eyebrows. Para body usar Amber 700 `#995B00` |

---

## 8. Contraste y accesibilidad

WCAG 2.2 — pares más relevantes.

| Combinación | Contraste | Veredicto | Uso recomendado |
|---|---|---|---|
| Navy 500 sobre Paper 0 | 14.7:1 | AAA | Body, headlines |
| Navy 500 sobre Amber 500 | 6.6:1 | AA+ | Texto de CTA |
| Sky 500 sobre Navy 500 | 5.3:1 | AA | Links, eyebrows en dark |
| Amber 500 sobre Navy 500 | 6.6:1 | AA | Eyebrow, stat hero |
| Electric 500 sobre Paper 0 | 8.4:1 | AAA | Texto accent en light |
| Amber 500 sobre Paper 0 | 2.2:1 | 🚫 NO TEXTO | Solo decoración / stats grandes |
| Sky 500 sobre Paper 0 | 3.1:1 | 🚫 NO BODY | Falla AA — usar Sky 700 |

> **Para texto azul sobre blanco**: usar Sky 700 `#036399`.
> **Para texto amber sobre blanco**: usar Amber 700 `#995B00`.

---

## 9. Pendientes

Hay un gap pendiente antes de avanzar a DS 03. Detalle completo en:

📋 [`_open-questions/2026-05-03-ds02-color-gaps.md`](_open-questions/2026-05-03-ds02-color-gaps.md)

Resumen ejecutivo:

1. **Auditoría Electric vs producción**. Electric aparece en código en lugares que contradicen las reglas 03, 04, 05 y 07: gradientes con Sky+Electric, footer watermark sobre dark, process steps con Electric+Amber adyacentes, navbar, orb 3D del hero. Hay que decidir uno a uno: migrar / excepción / gradiente compuesto.
2. **DS-F002 vs DS-010**. El token Link en backlog (DS-F002) define "default Sky / visited Electric" pero contradice la regla 06 (Sky no sobre body light, falla AA) y la regla 07 (Electric encapsulado, no en UI estática). Aclarar antes de promover DS-F002 a aprobado.

---

## 10. Decisiones de diseño

### DS-005 · Color CTA · Amber 500 (`#FF9900`)
✅ **Aprobada** — 2026-04-24

HEX oficial de producción intacto. Naranja vivo y humano. Único color con función "acción". Máximo 3 usos simultáneos por viewport. Amber 700 `#995B00` reservado para texto body sobre blanco.

**Alternativas descartadas**: Amber tierra `#D97F2B` (`DS-X` interno), naranja coral `#F97459`, Amber dorado `#E9B949` (falla AA).

### DS-006 · Color highlights · Sky 500 (`#05A5FF`)
✅ **Aprobada** — 2026-04-24

HEX oficial. Azul vibrante con rol exclusivo. Jamás CTA, jamás texto body sobre blanco. Sky 700 `#036399` reservado para texto azul sobre fondos light.

**Alternativas descartadas**: Sky desaturado `#4A7CC7`, Navy como secundario (se fusiona con Ink), azul ciano genérico.

### DS-007 · Escala neutral · Ink 0–6 derivada de Navy
✅ **Aprobada** — 2026-04-24

7 pasos derivados del Navy. Cohesión cromática total con primary — no son grises random.

**Alternativas descartadas**: grises neutros puros (sin cohesión), negro `#000` (peso excesivo), Ink independiente del Navy (rompe unidad).

### DS-008 · Superficies · Paper light + Navy dark
✅ **Aprobada** — 2026-04-24

4 surfaces light + dark derivado del Navy. Paper 1 = hero light por defecto. Amber y Sky con HEX idéntico en dark.

**Alternativas descartadas**: paper rosa/crema cálido, dark puro negro, Amber diferente en dark.

### DS-009 · Reglas de uso · 60/30/10 + semántica
✅ **Aprobada** — 2026-04-24

Proporción 60/30/10. Un solo CTA Amber por sección. Semantic x4 con variantes soft 50. No gradientes multicolor.

**Alternativas descartadas**: Gradient Aurora legacy (`DS-X003`), 2 CTAs primarios por sección, Electric como CTA principal (`DS-X005`).

### DS-010 · Paleta cromática final · 4 colores con reglas de no-mezcla
✅ **Aprobada** — 2026-04-24 · **Opción A + matiz C**

4 HEX oficiales con roles únicos. 5 reglas de no-mezcla.

**Alternativas descartadas**: jubilar Electric (`DS-X006`), Electric libre en UI estática, Sky sobre blanco como body, Electric sobre Navy, HEX no oficiales.

---

## 11. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.3 | 2026-04-24 | `DS-010` — paleta final 4 colores + reglas de no-mezcla + matriz de compatibilidad |
| v0.2.1 | 2026-04-24 | Corrección de HEX oficiales (Navy / Amber / Sky / Electric) según producción |
| v0.2 | 2026-04-24 | Primera propuesta cromática del diseñador con escalas derivadas |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`01-typography.md`](01-typography.md) — sistema tipográfico
- [`_open-questions/2026-05-03-ds02-color-gaps.md`](_open-questions/2026-05-03-ds02-color-gaps.md) — gaps abiertos
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
