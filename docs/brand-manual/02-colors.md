# 02 · Sistema cromático (DS 02)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.4 | 2026-05-03 |

> Sección 02 del Manual de Marca. Cuatro colores oficiales con roles únicos, escalas derivadas, neutrales, superficies, semánticos, matriz de compatibilidad, reglas de uso, marco de aplicación, auditoría de producción, tokens de link y navbar, y accesibilidad. v0.4 cierra todos los gaps detectados sobre v0.3 (ver [Historial de cambios](#14-historial-de-cambios)).

---

## Contenido

1. [Paleta oficial](#1-paleta-oficial)
2. [Roles definitivos](#2-roles-definitivos)
3. [Escalas derivadas](#3-escalas-derivadas)
4. [Neutrales y superficies](#4-neutrales-y-superficies)
5. [Tokens semánticos](#5-tokens-semánticos)
6. [Matriz de compatibilidad](#6-matriz-de-compatibilidad)
7. [Reglas de uso](#7-reglas-de-uso)
8. [Marco de aplicación de reglas](#8-marco-de-aplicación-de-reglas)
9. [Auditoría Electric vs producción](#9-auditoría-electric-vs-producción)
10. [Token Link · DS-012](#10-token-link--ds-012)
11. [Token Navbar Link · DS-013](#11-token-navbar-link--ds-013)
12. [Contraste y accesibilidad](#12-contraste-y-accesibilidad)
13. [Decisiones de diseño](#13-decisiones-de-diseño)
14. [Historial de cambios](#14-historial-de-cambios)

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
| Electric | Accent encapsulado | Glow effects, badges nuevo/beta, animaciones 3D, mascota Noa, momentos wow |

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
| Ink 1 | `#02215F` | Elevado dark (= Navy 600) · texto principal estructural light |
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

> Las reglas que sostienen esta matriz aplican a **colores sólidos en elementos distintos**. Para gradientes, ver [Marco de aplicación de reglas](#8-marco-de-aplicación-de-reglas).

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

> Las reglas 03, 04 y 05 aplican únicamente a **colores sólidos en elementos distintos**, no a gradientes que mezclan colores en un mismo elemento. Ver [Marco de aplicación de reglas](#8-marco-de-aplicación-de-reglas).

---

## 8. Marco de aplicación de reglas

Sección agregada en v0.4 como parte de `DS-011`.

Las reglas 03, 04 y 05 de DS-010 aplican únicamente a **colores sólidos en elementos distintos**, no a gradientes que mezclan colores en un mismo elemento.

> **Suplemento a DS-009**: DS-009 sigue vigente para diseño nuevo (gradientes mono-tono dentro de un mismo rol). El marco de excepciones aplica únicamente a los elementos auditados en producción al **03-May-2026**. Cualquier gradiente multicolor nuevo requiere aprobación explícita en el Decisions Log.

### Razonamiento

Las 3 reglas existen para resolver problemas de percepción cuando hay 2+ elementos compitiendo en jerarquía:

- **Regla 03** (Sky ⊕ Electric): evitar que el ojo lea "dos azules random" en roles distintos
- **Regla 04** (Electric sobre Navy): evitar que Electric "se pierda" como elemento separado
- **Regla 05** (Electric ⊕ Amber): evitar vibración complementaria entre dos elementos sólidos adyacentes

En un gradiente, los colores no compiten — se funden. El cerebro no los lee como "dos roles", los lee como "una transición cromática". Es un caso fundamentalmente distinto.

### 3 criterios de excepción

Un gradiente multicolor existente queda exceptuado de las reglas 03, 04 y 05 si cumple los 3 criterios:

1. Es percibido como un **único elemento expresivo** (hero, watermark, orb, glow)
2. **No** se usa en CTAs ni elementos de UI funcional
3. Mantiene una **transición continua** (sin hard-stops)

---

## 9. Auditoría Electric vs producción

Auditoría de los 14 usos de `#0400F0` en el código (parte de `DS-011`, fecha 03-May-2026).

| Categoría | # | Veredicto |
|---|---|---|
| A · Compatibles con DS-010 | 4 | ✓ Mantener |
| B · Gradientes multicolor | 3 | Excepción documentada (marco) |
| C · Electric sobre Navy | 1 | Excepción documentada (regla 07) |
| D · Electric ⊕ Amber | 2 | Migrar |
| E · Otros | 4 | 1 excepción · 3 migraciones |

**Total**: 4 mantener · 5 excepciones · 5 migraciones.

### A · Compatibles (mantener)

Sin cambios — cumplen DS-010.

| Archivo | Línea | Uso |
|---|---|---|
| `app/globals.css` | 1639, 1679 | Hover del botón primario en light mode |
| `app/globals.css` | 2367, 5298 | Texto Electric sobre fondo claro |

### Excepciones documentadas

5 elementos exceptuados bajo el marco DS-011 o regla 07 de DS-010.

| Archivo | Línea | Uso | Justificación |
|---|---|---|---|
| `app/globals.css` | 2001 | Gradiente Navy + Electric + Sky | Marco · gradiente multicolor expresivo |
| `app/globals.css` | 4993 | Gradiente Electric + Sky | Marco · gradiente multicolor expresivo |
| `app/globals.css` | 2766, 2788, 2795 | Gradiente mono-tono `#1a15ff → #0400f0` | DS-009 · gradiente mono-tono dentro del rol Electric |
| `components/ui/text-hover-effect.tsx` | 69, 149 | Watermark del footer (gradiente Navy + Electric + Sky) | Marco · elemento expresivo único, no UI funcional |
| `app/components/ui/hero-orb-3d.tsx` | 38 | `emissive="#0400f0"` del orb 3D | Regla 07 · glow effect / momento wow |

### Migraciones pendientes en código

5 migraciones documentadas en el manual; aplicar en código como tarea separada.

| # | Archivo | Línea | Estado actual | Migración |
|---|---|---|---|---|
| 1 | `app/components/process-sticky-section.tsx` | 48 | `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` | `["#FF9900", "#CC7A00", "#995B00", "#663D00"]` (Amber 500–800) |
| 2 | `app/components/ui/resizable-navbar.tsx` | 199, 223 | Links highlighted Amber + no highlighted Electric | Default → Ink 1 `#02215F` · Highlighted → underline Amber 500 (texto Ink 1). Ver [DS-013](#11-token-navbar-link--ds-013) |
| 3 | `app/components/ui/resizable-navbar.tsx` | 317, 390 | `bg-[#0400f0]` (mobile menu surface) | `bg-[#022977]` (Navy 500) |
| 4 | `app/components/reviews-marquee-section.tsx` | 23 | `accent: "#0400f0"` | `accent: "#05A5FF"` (Sky 500) |
| 5 | `app/portfolio/portfolio-page-client.tsx` | 65 | Eyebrow `text-[#0400f0]` | `text-[#FF9900]` (Amber 500) — eyebrows son rol Amber por DS-005 |

> **Nota operativa para `process-sticky-section`**: confirmar que los 4 accents NO se usan como fills grandes (cards completas, fondos de bloque). Si lo son, ajustar a un solo accent (ej. Amber 500) para no concentrar 10% Amber en una sola sección y romper la regla 60/30/10.

---

## 10. Token Link · DS-012

Token oficial para hyperlinks de cuerpo de texto (no botones, no nav).

Promovido desde `DS-F002` (backlog v1.0) tras resolver las contradicciones con DS-010.

| Estado | Light (sobre Paper 0) | Contraste | Dark (sobre Navy 500) | Contraste |
|---|---|---|---|---|
| Default | Sky 700 `#036399` | 6.4:1 ✓ AA | Sky 500 `#05A5FF` | 5.3:1 ✓ AA |
| Hover | Amber 700 `#995B00` (subrayado) | 5.9:1 ✓ AA | Amber 500 `#FF9900` | 6.6:1 ✓ AA |
| Visited | Sky 800 `#024266` | 11.2:1 ✓ AAA | Sky 300 `#3FBAFF` | 7.8:1 ✓ AAA |
| Focus ring | Amber 500 outline 2px / offset 3px | — | Amber 500 outline 2px / offset 3px | — |

### Cómo cumple DS-010

- **Regla 06 ✓** — light usa Sky 700 (no Sky 500). Dark usa Sky 500 sobre Navy en su contexto correcto.
- **Regla 07 ✓** — Electric NO se usa como visited. Reemplazado por Sky 800 / Sky 300 — misma familia que default, jerarquía clara, sin romper el encapsulamiento de Electric como voz de Noa.

---

## 11. Token Navbar Link · DS-013

Token específico para nav links estructurales del header / navbar. Distinto del token Link general (DS-012) porque los nav links son texto principal estructural, no links inline en body.

| Estado | Light (sobre Paper 0) | Contraste | Dark (sobre Navy 500) | Contraste |
|---|---|---|---|---|
| Default | Ink 1 `#02215F` | 12.8:1 ✓ AAA | Paper 0 `#FFFFFF` 88% opacity | 14.7:1 ✓ AAA |
| Highlighted | Underline Amber 500 2px (texto Ink 1) | — decorativo | Underline Amber 500 2px (texto Paper 0) | — decorativo |
| Hover | Amber 700 `#995B00` | 5.9:1 ✓ AA | Amber 500 `#FF9900` | 6.6:1 ✓ AA |

### Notas operativas

- **Default ≠ Sky 700**: nav links son estructura, no body inline. Ink 1 los ancla al sistema neutral y deja Sky / Amber libres para sus roles activos.
- **Highlighted = decorativo**: el texto NO cambia de color; solo aparece el subrayado. Por eso no aplica contraste de texto en esa fila.
- **Hover unifica con DS-012**: mismos valores que el token Link genérico para consistencia.
- **Mobile menu surface** (`resizable-navbar.tsx:317, 390`): `bg-[#0400f0]` migra a `bg-[#022977]` (Navy 500) — ver migración 3 en [Auditoría Electric](#9-auditoría-electric-vs-producción).

---

## 12. Contraste y accesibilidad

WCAG 2.2 — pares más relevantes.

| Combinación | Contraste | Veredicto | Uso recomendado |
|---|---|---|---|
| Navy 500 sobre Paper 0 | 14.7:1 | AAA | Body, headlines |
| Ink 1 sobre Paper 0 | 12.8:1 | AAA | Nav links default light |
| Sky 800 sobre Paper 0 | 11.2:1 | AAA | Visited link light |
| Electric 500 sobre Paper 0 | 8.4:1 | AAA | Texto accent en light |
| Sky 300 sobre Navy 500 | 7.8:1 | AAA | Visited link dark |
| Navy 500 sobre Amber 500 | 6.6:1 | AA+ | Texto de CTA |
| Amber 500 sobre Navy 500 | 6.6:1 | AA | Eyebrow, stat hero, hover navbar dark |
| Sky 700 sobre Paper 0 | 6.4:1 | AA | Default link light |
| Amber 700 sobre Paper 0 | 5.9:1 | AA | Hover link light, hover navbar light |
| Sky 500 sobre Navy 500 | 5.3:1 | AA | Default link dark, eyebrows en dark |
| Sky 500 sobre Paper 0 | 3.1:1 | 🚫 NO BODY | Falla AA — usar Sky 700 |
| Amber 500 sobre Paper 0 | 2.2:1 | 🚫 NO TEXTO | Solo decoración / stats grandes |

> **Para texto azul sobre blanco**: usar Sky 700 `#036399`.
> **Para texto amber sobre blanco**: usar Amber 700 `#995B00`.

---

## 13. Decisiones de diseño

### DS-005 · Color CTA · Amber 500 (`#FF9900`)
✅ **Aprobada** — 2026-04-24

HEX oficial de producción intacto. Naranja vivo y humano. Único color con función "acción". Máximo 3 usos simultáneos por viewport. Amber 700 `#995B00` reservado para texto body sobre blanco.

**Alternativas descartadas**: Amber tierra `#D97F2B`, naranja coral `#F97459`, Amber dorado `#E9B949` (falla AA).

### DS-006 · Color highlights · Sky 500 (`#05A5FF`)
✅ **Aprobada** — 2026-04-24

HEX oficial. Azul vibrante con rol exclusivo. Jamás CTA, jamás texto body sobre blanco. Sky 700 `#036399` reservado para texto azul sobre fondos light.

**Alternativas descartadas**: Sky desaturado `#4A7CC7`, Navy como secundario, azul ciano genérico.

### DS-007 · Escala neutral · Ink 0–6 derivada de Navy
✅ **Aprobada** — 2026-04-24

7 pasos derivados del Navy. Cohesión cromática total con primary — no son grises random.

**Alternativas descartadas**: grises neutros puros, negro `#000`, Ink independiente del Navy.

### DS-008 · Superficies · Paper light + Navy dark
✅ **Aprobada** — 2026-04-24

4 surfaces light + dark derivado del Navy. Paper 1 = hero light por defecto. Amber y Sky con HEX idéntico en dark.

**Alternativas descartadas**: paper rosa/crema cálido, dark puro negro, Amber diferente en dark.

### DS-009 · Reglas de uso · 60/30/10 + semántica
✅ **Aprobada** — 2026-04-24

Proporción 60/30/10. Un solo CTA Amber por sección. Semantic x4 con variantes soft 50. No gradientes multicolor (ver suplemento en DS-011).

**Alternativas descartadas**: Gradient Aurora legacy (`DS-X003`), 2 CTAs primarios por sección, Electric como CTA principal (`DS-X005`).

### DS-010 · Paleta cromática final · 4 colores con reglas de no-mezcla
✅ **Aprobada** — 2026-04-24 · **Opción A + matiz C**

4 HEX oficiales con roles únicos. 5 reglas de no-mezcla (3, 4, 5, 6, 7).

**Alternativas descartadas**: jubilar Electric (`DS-X006`), Electric libre en UI estática, Sky sobre blanco como body, Electric sobre Navy, HEX no oficiales.

### DS-011 · Auditoría Electric + marco de aplicación de reglas
✅ **Aprobada** — 2026-05-03

Marco: las reglas 03, 04 y 05 aplican únicamente a colores sólidos en elementos distintos, no a gradientes que mezclan colores en un mismo elemento. Suplemento a DS-009 (no la modifica): DS-009 sigue vigente para diseño nuevo, el marco aplica solo a los elementos auditados al 03-May-2026.

Auditoría de 14 usos de `#0400F0` en producción:
- 4 mantener (compatibles con DS-010)
- 5 excepciones documentadas (4 gradientes expresivos + 1 glow effect del orb 3D)
- 5 migraciones pendientes de aplicar en código

**Alternativas descartadas**: aplicar reglas 03/04/05 a gradientes multicolor — rompería 4 usos en producción sin beneficio perceptual real (los gradientes son percibidos como un solo elemento expresivo, no como roles compitiendo).

### DS-012 · Token Link · 4 estados × 2 modos
✅ **Aprobada** — 2026-05-03

Promovida desde `DS-F002` (backlog v1.0). Estado anterior: en backlog.

Token oficial para hyperlinks inline. Tabla 4×2 con HEX y contraste WCAG ([sección 10](#10-token-link--ds-012)). Visited en familia Sky (Sky 800 light / Sky 300 dark) en lugar de Electric — preserva el encapsulamiento de Electric y mantiene jerarquía visual coherente.

**Alternativas descartadas**: Visited en Electric (rompía regla 07 al meter Electric en UI estática); default Sky 500 en light (falla AA, regla 06).

### DS-013 · Token Navbar Link · 3 estados × 2 modos
✅ **Aprobada** — 2026-05-03

Token específico para nav links estructurales del header. Default en Ink 1 (no Sky 700) — los nav links son estructura, no body inline. Highlighted como underline Amber 500 decorativo (texto sigue en color default, no cambia).

**Alternativas descartadas**: Sky 700 como default (`DS-X007`) — sonaba a link inline de body, no a nav estructural; mezclaba el rol del token Link general con el del nav.

---

## 14. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.4 | 2026-05-03 | `DS-011` (auditoría Electric + marco) · `DS-012` (Token Link, ex DS-F002) · `DS-013` (Token Navbar Link) · `DS-X007` registrada · gaps de v0.3 cerrados |
| v0.3 | 2026-04-24 | `DS-010` — paleta final 4 colores + reglas de no-mezcla + matriz de compatibilidad |
| v0.2.1 | 2026-04-24 | Corrección de HEX oficiales (Navy / Amber / Sky / Electric) según producción |
| v0.2 | 2026-04-24 | Primera propuesta cromática del diseñador con escalas derivadas |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`01-typography.md`](01-typography.md) — sistema tipográfico
- [`_open-questions/_archive/2026-05-03-ds02-color-gaps.md`](_open-questions/_archive/2026-05-03-ds02-color-gaps.md) — historial del gap cerrado en v0.4
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
