# 03 · Espaciado, radios y sombras (DS 03)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-05-04 |

> Sección 03 del Manual de Marca. Ritmo, curva y profundidad. Define la escala de spacing base 4px (11 niveles), los 7 radios semánticos, los 5 niveles de elevación + focus ring, la grid container 1180px y la auditoría preventiva de 12 hallazgos en producción.

---

## Contenido

1. [Filosofía · base 4, ritmo doble](#1-filosofía--base-4-ritmo-doble)
2. [Escala de spacing](#2-escala-de-spacing)
3. [Escala de radius · semántica](#3-escala-de-radius--semántica)
4. [Escala de shadows](#4-escala-de-shadows)
5. [Grid container](#5-grid-container)
6. [Reglas de uso](#6-reglas-de-uso)
7. [Auditoría preventiva · producción](#7-auditoría-preventiva--producción)
8. [Migraciones pendientes en código](#8-migraciones-pendientes-en-código)
9. [Decisiones de diseño](#9-decisiones-de-diseño)
10. [Historial de cambios](#10-historial-de-cambios)

---

## 1. Filosofía · base 4, ritmo doble

Spacing y radii comparten una base de 4px que escala en pasos perceptibles. Cada nivel duplica visualmente al anterior en zonas críticas (4 → 8 → 16 → 32) y rellena con pasos intermedios donde el ojo lo necesita.

| Escala | Tokens | Lógica |
|---|---|---|
| Spacing | 11 | Ritmo de aire — ratio doble en hitos (4·8·16·32·64·128); intermedios (12·24·48·96) dan respiración sin romper sistema |
| Radius | 7 | Curva semántica — nombres atados a la jerarquía del componente, no al pixel |
| Shadow | 5 + focus | Profundidad jerárquica — más Y, más blur, más distancia visual; tinte Navy 500 (no negro) preserva marca |

---

## 2. Escala de spacing

11 niveles desde 0 hasta 128px. Todos múltiplos de 4. Los hitos (4·8·16·32·64·128) son los que mejor responden a la regla de doble; los intermedios (12·24·48·96) son atajos cuando 16→32 o 32→64 quedan corto.

| Token | Valor | Uso recomendado |
|---|---|---|
| `--sp-0` | 0px | Reset · sin separación. Útil para overrides |
| `--sp-1` | 4px | Hairline · separación entre íconos pequeños y texto. Borde de focus offset |
| `--sp-2` | 8px | Micro · gap dentro de chips, badges. Separación entre ícono y label |
| `--sp-3` | 12px | Small · padding inputs, gap entre buttons hermanos, padding interno chips |
| `--sp-4` | 16px | Base · padding default componentes pequeños, gap grid items pequeños |
| `--sp-5` | 24px | Medium · padding cards, gap grids medianos, separación entre componentes adyacentes |
| `--sp-6` | 32px | Large · padding cards generosos, margen entre subsecciones |
| `--sp-7` | 48px | XL · gap entre bloques semánticos dentro de una sección, padding hero mobile |
| `--sp-8` | 64px | 2XL · padding sections en mobile/tablet, padding vertical hero |
| `--sp-9` | 96px | 3XL · padding sections desktop default. Reemplaza el 100px actual de producción |
| `--sp-10` | 128px | 4XL · padding hero desktop, separación entre bloques mayores en landings premium |

> **Nota**: NO existen tokens 5/6/14/18/20/22/26/28/40/60. Si un valor fuera-de-escala aparece en producción se documenta en sección 7 con plan de migración. Tolerancia ±2px solo para alineación óptica en componentes con borde+padding (ver DS-016).

---

## 3. Escala de radius · semántica

Cada radius está atado a un **tipo de componente**, no a un valor de pixel arbitrario. Esto evita el caos de tener 17px, 27px y 29px conviviendo (auditoría sec. 7 muestra 8 valores únicos en producción).

| Token | Valor | Uso |
|---|---|---|
| `--r-xs` | 4px | Code chips, banner tags, badges densos. Esquina apenas suavizada |
| `--r-sm` | 8px | Inputs, textareas, botones secundarios pequeños, dropdowns inline |
| `--r-md` | 12px | Cards densas, banners, navbar pill interna, lang switcher, FAQ inputs |
| `--r-lg` | 16px | Cards principales (servicios, testimoniales), plates icónicas, modals pequeños |
| `--r-xl` | 24px | Cards hero secundarias, stats card, process cards dark, FAQ cards |
| `--r-2xl` | 32px | Hero card principal, CTA band card, modals grandes — la curva más expresiva |
| `--r-pill` | 999px | Botones, chips, highlights, hero badge, dots, focus rings circulares |

> **Pill es categórica** — `999px` no es "más curvo que xl". Es una **forma distinta**. Botones, chips, dots viven en pill. Cards nunca.

> **Regla anti-caos (DS-015)**: el producto actual usa 17px · 27px · 28px · 29px · 36px mezclados sin sistema. Toda CSS nueva debe usar exclusivamente los 7 tokens. Si un componente "necesita" un radius distinto, se evalúa si requiere un nuevo token semántico — no un nuevo valor mágico.

---

## 4. Escala de shadows

Cinco elevaciones jerárquicas desde hairline hasta modal. Todas usan tinte `rgba(2,41,119,X)` — Navy 500 con opacidad — para preservar la marca y evitar el gris azulado mortuorio del shadow negro puro.

| Token | Nivel | Uso |
|---|---|---|
| `--sh-0` | none | Sin elevación. Texto, separadores, áreas planas dentro de un parent ya elevado |
| `--sh-1` | hairline | Inputs en estado normal, lift mínimo. Apenas separa del fondo |
| `--sh-2` | card resting | Cards de servicios, testimoniales, FAQ cerradas. Estado "disponible para interactuar" |
| `--sh-3` | card hover · sticky | Hover de cards, sticky nav. Transición desde sh-2 con duración 200ms |
| `--sh-4` | stats · raised | Stats card flotante (overlap del hero), CTAs primarios al hover |
| `--sh-5` | modal · CTA card | CTA band card (sale del flujo), modals, drawers móviles. Profundidad máxima |

### Focus ring (DS-016, sistema paralelo)

El focus ring **NO está en la escala de elevación** — es un sistema paralelo.

```css
--sh-focus:   0 0 0 3px rgba(255,153,0,.30);  /* sobre light */
--sh-focus-d: 0 0 0 3px rgba(255,153,0,.45);  /* sobre dark */
```

Siempre Amber 500, siempre 3px sólidos, sin blur. **Combinable** con cualquier `sh-N` vía coma:

```css
box-shadow: var(--sh-focus), var(--sh-2);
```

---

## 5. Grid container

Container default **1180px**. La auditoría detecta que el código actual usa mayoritariamente 1200px (excepto CTA card con 1080px). Se documenta como migración aprobada.

| Atributo | Valor | Token | Detalle |
|---|---|---|---|
| Container max-width | 1180px | `--container-max` | Centrado con `margin: 0 auto`. Padding lateral responsivo |
| Columnas | 12 | — | Grid de 12 columnas |
| Gutter | 16px | `--sp-4` | Gap CSS entre columnas y entre cards en grids |
| Margin lateral desktop | 48px | `--sp-7` | Reemplaza el 32px hardcoded actual |
| Margin lateral mobile | 16px | `--sp-4` | — |
| Section padding desktop | 96px | `--sp-9` | Reemplaza el 100px actual |
| Section padding tablet | 64px | `--sp-8` | — |
| Section padding mobile | 48px | `--sp-7` | — |
| Hero padding desktop | 128px | `--sp-10` | Hero respira más que sections estándar |
| Hero padding tablet | 96px | `--sp-9` | — |
| Hero padding mobile | 64px | `--sp-8` | — |

### Breakpoints (heredados del producto actual)

| Rango | Modo |
|---|---|
| `< 720px` | Mobile |
| `720 – 999px` | Tablet |
| `1000 – 1279px` | Desktop |
| `≥ 1280px` | Wide |

### Container narrow (`--container-narrow: 1080px`)

CTA card es intencionalmente más estrecha que el container. Documentada como variante explícita; si aparece en otros componentes, reutilizar el mismo token.

---

## 6. Reglas de uso

8 reglas oficiales aprobadas (`DS-014` + `DS-015` + `DS-016`).

| # | Regla | Detalle |
|---|---|---|
| 01 | **No mezclar escalas** | Si usas tokens, todos los valores del componente vienen de tokens. No combinar `padding: 24px 28px` donde 24 es token y 28 es libre |
| 02 | **Spacing siempre múltiplo de 4** | Sin excepciones para elementos en flujo de layout. La excepción óptica aplica solo a alineación interna de íconos/borders |
| 03 | **Radius por componente, no por capricho** | Los 7 radii son semánticos. Si necesitas algo distinto, evalúa si requiere un nuevo token con nombre — nunca un valor mágico inline |
| 04 | **Pill es categórica** | 999px no es "más curvo que xl". Es una forma distinta. Botones, chips, dots viven en pill. Cards nunca |
| 05 | **Shadow refleja jerarquía, no estilo** | A más elevación, más importancia visual. No usar sh-5 en una card secundaria solo "porque queda lindo" |
| 06 | **Focus ring siempre Amber, siempre 3px** | El usuario no debe perder el cursor de teclado nunca. Combinar con shadow base vía coma. Nunca reemplazar |
| 07 | **Section padding responde al breakpoint** | Desktop `--sp-9` / Tablet `--sp-8` / Mobile `--sp-7`. Hero un nivel arriba (`--sp-10/--sp-9/--sp-8`). Consistente en todo el sitio |
| 08 | **Container 1180, gutter 16** | Todos los layouts heredan estos dos valores. Si una sección necesita full-bleed o narrow (CTA card 1080), se documenta como variante explícita |

---

## 7. Auditoría preventiva · producción

12 inconsistencias detectadas en `ui_kits/website/kit.css` al 04-May-2026.

| Categoría | # | Veredicto |
|---|---|---|
| OK · Mantener | 3 | Cumple sistema, sin cambios |
| Migrar | 8 | Aplicar token, fuera de escala |
| Tolerar | 1 | Caso especial documentado (`--container-narrow` 1080) |
| Tolerancias ópticas | N | ±2px en alineación interna íconos/borders, caso a caso |

### Container · 2 hallazgos

| Tipo | Ubicación | Actual | Token | Razón |
|---|---|---|---|---|
| Migrar | `kit.css:8, 24, 44, 52, 127, 133` | `max-width: 1200px` | `--container-max` (1180px) | 6 ocurrencias hardcoded en navbar, hero, stats, section, footer y footer-bottom. Diferencia 20px imperceptible, alineable con grid 12-col |
| Tolerar | `kit.css:96` | `max-width: 1080px` | `--container-narrow` (caso especial) | CTA card intencionalmente más estrecha. Documentar como token narrow si aparece en otros componentes |

### Border-radius · 5 hallazgos

| Tipo | Ubicación | Actual | Token | Razón |
|---|---|---|---|---|
| Migrar | `kit.css:8 · .nav` | 17px | `--r-md` (12px) | Valor mágico fuera de escala. 12px arma con sistema sin perder sensación pill-like |
| Migrar | `kit.css:44 · .stats` | 28px | `--r-2xl` (32px) | Stats card overlap del hero — 32px refuerza jerarquía como elemento "hero secundario" |
| Migrar | `kit.css:58 · .svc` | 29px | `--r-xl` (24px) | Service cards. 29 → 24 normaliza con resto de cards principales |
| Migrar | `kit.css:84 · .faq` | 27px | `--r-xl` (24px) | FAQ cards. Mismo razonamiento que .svc |
| Migrar | `kit.css:96 · .cta-card` | 36px | `--r-2xl` (32px) | CTA band card. 36 → 32 se mantiene en "tier expresivo" sin inventar valor |

### Box-shadow · 4 hallazgos

| Tipo | Ubicación | Actual | Token | Razón |
|---|---|---|---|---|
| Migrar | `kit.css:8 · .nav` | `0 10px 24px /.10` | `--sh-3` | Sticky nav. sh-3 es el nivel correcto para sticky con depth visible |
| Migrar | `kit.css:44 · .stats` | `0 26px 60px /.10` | `--sh-5` | Stats card flotante. sh-5 (modal-tier) es lo más cercano |
| Migrar | `kit.css:58, 84, 117 · cards` | `0 18px 42px /.06` | `--sh-2` | 3 cards (svc, faq, testimonial) con shadow custom. Diferencia de blur (42 vs 28) no es perceptible a 3px de alpha |
| Migrar | `kit.css:59 · .svc:hover` | `0 26px 56px /.12` | `--sh-3` | Hover de cards. sh-3 es el nivel diseñado para esta transición |

### Spacing · 1 hallazgo

| Tipo | Ubicación | Actual | Token | Razón |
|---|---|---|---|---|
| Migrar | `kit.css:51, 95 · .section, .cta-band` | 100px / 72px vertical | `--sp-9` (96) / `--sp-8` (64) | 100→96 y 72→64. Diferencia 4–8px no es perceptible en sections del tamaño del producto |

### Tolerancias ópticas

`14 · 18 · 22 · 26px` aparecen en componentes con borde+padding para alineación óptica (botón con borde, hero badge con ícono+texto). DS-016 permite tolerancia ±2px en estos casos. Documentar en code review, no migrar masivamente.

---

## 8. Migraciones pendientes en código

8 migraciones documentadas en el manual; aplicar como tarea separada de desarrollo (alineada con migraciones DS 02 v0.4 y futuras DS 04).

| # | Archivo | Cambio |
|---|---|---|
| 1 | `kit.css:8, 24, 44, 52, 127, 133` | `max-width: 1200px` × 6 ocurrencias → `--container-max` (1180px) |
| 2 | `kit.css:8 .nav` | `border-radius: 17px` → `var(--r-md)` (12px) + `box-shadow` → `var(--sh-3)` |
| 3 | `kit.css:44 .stats` | `border-radius: 28px` → `var(--r-2xl)` (32px) + `box-shadow` → `var(--sh-5)` |
| 4 | `kit.css:58 .svc` | `border-radius: 29px` → `var(--r-xl)` (24px) + `box-shadow` → `var(--sh-2)` |
| 5 | `kit.css:59 .svc:hover` | `box-shadow` custom → `var(--sh-3)` |
| 6 | `kit.css:84 .faq` | `border-radius: 27px` → `var(--r-xl)` (24px) + `box-shadow` → `var(--sh-2)` |
| 7 | `kit.css:96 .cta-card` | `border-radius: 36px` → `var(--r-2xl)` (32px) |
| 8 | `kit.css:51, 95` | section/cta-band padding 100/72 → `var(--sp-9)` (96) / `var(--sp-8)` (64) |

> Las migraciones DS 03 se acumulan con las 5 de DS 02 v0.4 en un mismo ticket de refactor cromático/spacing cuando el equipo de dev las aborde.

---

## 9. Decisiones de diseño

### DS-014 · Escala de spacing base 4px
✅ **Aprobada** — 2026-05-04

11 niveles (0·4·8·12·16·24·32·48·64·96·128). Hitos en doble (4·8·16·32·64·128), pasos intermedios donde el ojo lo pide. Reemplaza valores libres del CSS actual.

**Marca**: ritmo perceptible · respiración consistente · disciplina técnica · base múltiplo 4 estándar moderno.

**Alternativas descartadas**: escala 8px puro (pierde granularidad en componentes pequeños), escala 1.5 ratio (no intuitiva), valores libres como hoy (caos).

### DS-015 · Radii semánticos
✅ **Aprobada** — 2026-05-04

7 tokens con nombres semánticos (xs/sm/md/lg/xl/2xl/pill) atados a la jerarquía del componente, no al pixel. La pill (999px) es categóricamente distinta.

**Marca**: curva expresiva sin caos · cada componente sabe su radius por rol · pill como gesto formal de marca.

**Alternativas descartadas**: tokens por pixel (`r-12`, `r-16`) — no comunican jerarquía; combinaciones libres como hoy (17/27/28/29 conviviendo).

### DS-016 · Shadows con tinte Navy + focus ring paralelo
✅ **Aprobada** — 2026-05-04

5 niveles de elevación con tinte `rgba(2,41,119,X)` (Navy 500), no negro puro. Focus ring `--sh-focus` Amber 3px sólidos, sistema paralelo combinable. Tolerancia óptica ±2px solo para alineación interna de íconos/borders.

**Marca**: profundidad cálida · evita gris azulado mortuorio · focus visible siempre · accesibilidad sin sacrificar identidad.

**Alternativas descartadas**: shadow negro puro (rompe brand), focus ring sin token (inconsistencia accesibilidad), focus ring con blur (poco visible).

---

## 10. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-04 | `DS-014` (spacing base 4px · 11 tokens) · `DS-015` (radii semánticos · 7 tokens) · `DS-016` (shadows tinte Navy · 5 niveles + focus) · auditoría 12 hallazgos en producción |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`00-implementation-strategy.md`](00-implementation-strategy.md) — arquitectura en 3 capas
- [`02-colors.md`](02-colors.md) — sistema cromático
- [`04-components-core.md`](04-components-core.md) — componentes core (próximo)
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
