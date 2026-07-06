# 03b · Responsive · breakpoints y matriz de test (DS 03b)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-07-06 |

> Sub-sección de DS 03. Define el sistema **canónico de breakpoints** derivado de la evidencia del código (no de tamaños de catálogo), el **modelo de aislamiento** base + overrides acotados, la **matriz de viewports de test** y el plan de limpieza del caos actual de media queries. Esta es la fuente de verdad de breakpoints: DS 03 §5 referencia acá.

---

## Contenido

1. [Filosofía · viewport de test ≠ breakpoint](#1-filosofía--viewport-de-test--breakpoint)
2. [Sistema de breakpoints canónico](#2-sistema-de-breakpoints-canónico)
3. [Modelo de aislamiento · base + overrides acotados](#3-modelo-de-aislamiento--base--overrides-acotados)
4. [Matriz de viewports de test](#4-matriz-de-viewports-de-test)
5. [Reglas de uso](#5-reglas-de-uso)
6. [Alineación Tailwind ↔ CSS](#6-alineación-tailwind--css)
7. [Auditoría · caos actual y plan de limpieza](#7-auditoría--caos-actual-y-plan-de-limpieza)
8. [Rango ultra ≥1920 · decisión pendiente](#8-rango-ultra-1920--decisión-pendiente)
9. [Decisiones de diseño](#9-decisiones-de-diseño)
10. [Historial de cambios](#10-historial-de-cambios)

---

## 1. Filosofía · viewport de test ≠ breakpoint

Dos conceptos que NO son lo mismo y que confundirlos genera breakpoints inventados:

| Concepto | Qué es | Naturaleza | Ejemplo |
|---|---|---|---|
| **Viewport de test** | El tamaño exacto donde abrís DevTools y validás con el ojo | Un **punto** | `375×812`, `1440×900` |
| **Breakpoint** | El rango (min–max) donde el diseño es UNO solo | Un **rango** | `phone: 0–767` |

Regla mental: **probás EN un viewport, diseñás PARA un rango.** Un rango contiene muchos viewports. `375×812` y `430×900` comparten el mismo diseño de `phone` — son dos puntos de control del mismo rango, no dos breakpoints. Solo se crea un breakpoint nuevo cuando el layout **genuinamente cambia** (grid, dirección, densidad, visibilidad de un bloque), no cuando cambia el ancho del device de prueba.

---

## 2. Sistema de breakpoints canónico

**4 rangos · 3 boundaries.** Derivados de los saltos reales del CSS de producción (ver §7), no de tamaños de catálogo.

| Rango | Bounds | Token | `@media` acotado | Evidencia en código |
|---|---|---|---|---|
| `phone` | `0 – 767px` | `--bp-phone-max: 767px` | `(max-width: 767px)` | 6× `max-767`, 4× `max-768`, JS `innerWidth <= 768` |
| `tablet` | `768 – 1023px` | `--bp-tablet: 768px` | `(min-width: 768px) and (max-width: 1023px)` | 14× `max-1023`, 6× `min-769`, `matchMedia("max-1023")` |
| `desktop` | `1024 – 1439px` | `--bp-desktop: 1024px` | `(min-width: 1024px) and (max-width: 1439px)` | 6× `min-1024`, bloques `min-1024 & max-1440` |
| `wide` | `≥ 1440px` | `--bp-wide: 1440px` | `(min-width: 1440px)` | `min-1440/1441`, 1 regla height-aware |

**Los 3 boundaries canónicos: `768` · `1024` · `1440`.** El código YA converge en estos tres; todo lo demás (767/768/769, 1439/1440/1441) es **ruido de off-by-one** sobre los mismos puntos — el mismo breakpoint escrito de formas distintas. Se normaliza (§7).

### Regla anti-off-by-one (canónica)

Para que NO haya solapamiento ni hueco a un pixel, la frontera se parte SIEMPRE así:

- Límite superior de un rango: `max-width: (N − 1)px`
- Límite inferior del siguiente: `min-width: Npx`

| Boundary | Rango que cierra | Rango que abre |
|---|---|---|
| **768** | `phone` → `max-width: 767px` | `tablet` → `min-width: 768px` |
| **1024** | `tablet` → `max-width: 1023px` | `desktop` → `min-width: 1024px` |
| **1440** | `desktop` → `max-width: 1439px` | `wide` → `min-width: 1440px` |

> Prohibido: `max-width: 768px` + `min-width: 769px`. A 768px exacto un bloque cree que sos tablet y otro que seguís en phone → bug de solapamiento (hoy existe en producción, ver §7).

---

## 3. Modelo de aislamiento · base + overrides acotados

Requerimiento del equipo: **editar un rango no debe modificar los otros.** El modelo mobile-first puro de Tailwind/CSS NO cumple esto — `base → sm → md` **cascadea hacia arriba** (lo que ponés en base se hereda). Solución aprobada: **base compartida + overrides acotados por rango con min+max.**

### Capa 1 · Base compartida (NO se duplica)

Todo lo que es **igual en todos los rangos**: colores, tokens, tipografía, radios, sombras, estructura semántica. Vive sin media query. Se edita una sola vez. Cambiar un color acá se refleja en todos los rangos → cero drift.

### Capa 2 · Overrides acotados (aislados por rango)

Solo lo que **cambia entre rangos**: layout, grid, direcciones, tamaños específicos, visibilidad. Cada override vive en un `@media` acotado (min+max) → editarlo NO toca ningún otro rango.

```css
/* Capa 1 · BASE — compartida, sin media query */
.hero {
  color: var(--color-navy);          /* igual en todos lados */
  font-family: var(--font-display);
  display: grid;
  gap: var(--sp-6);
}

/* Capa 2 · OVERRIDES ACOTADOS — solo layout, aislados */
@media (max-width: 767px)                        { .hero { gap: var(--sp-4); text-align: center; } }
@media (min-width: 768px) and (max-width: 1023px){ .hero { gap: var(--sp-6); } }
@media (min-width: 1024px) and (max-width: 1439px){ .hero { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1440px)                        { .hero { grid-template-columns: 1.2fr 1fr; } }
/* Editar el bloque phone NO afecta tablet/desktop/wide */
```

### Qué va en cada capa

| Va en BASE (compartido) | Va en OVERRIDE (aislado por rango) |
|---|---|
| Color, background, borde | `grid-template-columns` / `flex-direction` |
| Tipografía (familia, weight) | Cambios de `gap` / `padding` por device |
| Tokens (spacing, radius, shadow) | `display: none` / mostrar-ocultar bloques |
| Estructura DOM / semántica | `text-align`, alineación específica |
| Estados (`:hover`, `:focus`) | Tamaños que dependen del ancho |

> **Antipatrón**: duplicar color/tipografía dentro de cada `@media` "para aislar del todo". Eso NO es aislamiento, es **drift garantizado**: cambiás un color y lo tenés que tocar en 4 lugares, te olvidás uno, y ahora tablet tiene otro azul. El aislamiento aplica al **layout**, no a los tokens.

---

## 4. Matriz de viewports de test

Puntos de control oficiales. Cada uno valida el rango donde cae — no son breakpoints, son dónde miramos con el ojo.

| Rango | Viewport | Device de referencia | Prioridad |
|---|---|---|---|
| `phone` | **375×812** | iPhone X/11/12 mini · base mobile | 🔴 Obligatorio |
| `phone` | **430×900** | iPhone Pro Max / Android grande | 🟡 Recomendado |
| `phone` | 320×568 | iPhone SE 1ª gen · piso extremo | 🟢 Opcional |
| `tablet` | **768×1024** | iPad vertical | 🔴 Obligatorio |
| `desktop` | **1024×768** | iPad landscape / laptop chico | 🔴 Obligatorio |
| `desktop` | **1280×800** | Laptop estándar | 🟡 Recomendado |
| `wide` | **1440×900** | MacBook Pro 15" · laptop premium | 🔴 Obligatorio |
| `wide` | **1920×1080** | Monitor Full HD | 🟡 Recomendado |
| `wide` (ultra) | 2560×1440 | Monitor 2K/QHD | 🟢 Opcional † |
| `wide` (ultra) | 3840×2160 | Monitor 4K | 🟢 Opcional † |

> **Ojo con 1440×900**: cae en `wide`, NO en `desktop`. El boundary wide arranca en 1440. Si probás "desktop" a 1440 estás mirando el rango wide.

> **Sugerencia de sustitución**: `482×900` (pedido inicial) no corresponde a ningún device real (es ancho de phablet/foldable). Se reemplaza por **430×900** (iPhone Pro Max), que es el phone grande real y sigue dentro del rango `phone`.

> † Los tests 2560 y 3840 hoy renderizan idénticos a `wide` (contenido capado al container y centrado). Solo tienen diseño propio si se construye el rango `ultra` — ver §8.

---

## 5. Reglas de uso

| # | Regla | Detalle |
|---|---|---|
| 01 | **3 boundaries, no más** | Todo `@media` de ancho usa exclusivamente `768` · `1024` · `1440`. Ningún valor nuevo sin promoverlo a token en esta tabla |
| 02 | **Frontera con la regla N−1 / N** | Cierra con `max-width: (N−1)` abre con `min-width: N`. Nunca `max-768 + min-769` ni `max-767 + min-767` |
| 03 | **Rango acotado siempre lleva min Y max** | Salvo `phone` (solo max) y `wide` (solo min), todo override intermedio es `(min-width: A) and (max-width: B)`. Esto es lo que garantiza el aislamiento |
| 04 | **Token compartido → capa base** | Color, tipografía, spacing, radius, shadow NUNCA se duplican dentro de un `@media`. Se editan una vez en base |
| 05 | **Layout específico → capa override** | Grid, flex-direction, visibilidad, tamaños por device viven en el `@media` acotado del rango |
| 06 | **JS respeta los mismos boundaries** | `innerWidth`/`matchMedia` en JS usan 768/1024/1440, iguales al CSS. Hoy hay `innerWidth <= 768` (correcto) y `matchMedia("max-1023")` (correcto) |
| 07 | **Editar un rango no toca otro** | Si un cambio de phone obliga a tocar el bloque de tablet, algo del layout está mal separado — revisar antes de duplicar |
| 08 | **Height-aware es excepción documentada** | La única query con `min-height` (`min-1440 & min-height-901`) es un caso especial de wide alto. Se conserva documentado, no se generaliza |

---

## 6. Alineación Tailwind ↔ CSS

**Problema actual**: los componentes usan clases Tailwind (`md:` `lg:` `xl:` `2xl:`) con los defaults `640/768/1024/1280/1536`, pero el CSS a mano usa `1440`. Arriba de 1024 **las clases y las media queries no coinciden** → un `xl:` dispara en 1280 mientras la media query dispara en 1440. Bug silencioso.

**Hallazgo clave**: los defaults de Tailwind v4 (`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`) YA coinciden con el canónico en `md` (768) y `lg` (1024). El ÚNICO que no matchea es `xl` (1280 ≠ 1440). No hace falta remapear toda la escala — sería un martillazo innecesario que rompería usos existentes.

**Solución aplicada (2026-07-06)** ✅ — bisturí, no machete:

```css
/* app/globals.css · @theme dedicado, antes de @theme inline */
@theme {
  --breakpoint-md: 768px;   /* tablet  · = default, ya coincidía con el canónico */
  --breakpoint-lg: 1024px;  /* desktop · = default, ya coincidía con el canónico */
  --breakpoint-xl: 1440px;  /* wide    · antes 1280 — ahora coincide con el CSS */
  /* sm (640) se deja en default: sub-phone de auth/dashboard, no es boundary canónico */
  /* 2xl (1536) se deja en default: se reservará para ultra ≥1920 al construir DS-F011 */
}
```

**Único cambio de comportamiento**: `xl` pasa de 1280 → 1440. Afecta 3 usos, todos "más espacio en pantalla grande" (benignos, se corren 160px hacia arriba):

| Archivo | Clase | Efecto del shift |
|---|---|---|
| `portfolio-page-client.tsx:36` | `xl:grid-cols-3` | Grid pasa a 3 columnas en 1440 (antes 1280). 1280–1439 muestra 2 col |
| `ui/resizable-navbar.tsx:46` | `xl:w-[...]` | Ancho navbar sube su step en 1440 |
| `sections/services-section.tsx:83` | `xl:gap-12` | Gap generoso arranca en 1440 |

> **`sm:` NO se tocó** — sus usos (`login-form`, `dashboard`, `portfolio`) son de páginas auth/dashboard. Remapear `sm→768` habría roto su tipografía/padding entre 640–767.

> Las clases Tailwind son **mobile-first** (min-width): `lg:` = "desde 1024 hacia arriba". Para **aislamiento** por rango en Tailwind se combinan con variantes `max-*` (ej. `lg:max-xl:` = solo desktop 1024–1439). Cuando el aislamiento es crítico, preferir el `@media` acotado en CSS.

---

## 7. Auditoría · caos actual y plan de limpieza

Estado de `app/globals.css` al 2026-07-06: **~40 media queries de ancho** con 3 boundaries reales contaminados por off-by-one y un mismatch con Tailwind.

### Boundaries encontrados vs canónico

| En código hoy | Ocurrencias | Boundary canónico | Acción |
|---|---|---|---|
| `max-width: 767px` | 6 | 768 (cierra phone) | ✅ Correcto — mantener |
| `max-width: 768px` | 4 | 768 (cierra phone) | ⚠️ Normalizar → `max-width: 767px` |
| `max-width: 480px` | 1 | (dentro de phone) | ⚠️ Es un punto de test, no un rango — fusionar en phone |
| `min-width: 768px` | 2 | 768 (abre tablet) | ✅ Correcto — mantener |
| `min-width: 769px` | 6 | 768 (abre tablet) | ⚠️ Normalizar → `min-width: 768px` |
| `max-width: 1023px` | 14 | 1024 (cierra tablet) | ✅ Correcto — mantener |
| `min-width: 1024px` | 6 | 1024 (abre desktop) | ✅ Correcto — mantener |
| `max-width: 1439px` | 1 | 1440 (cierra desktop) | ✅ Correcto — mantener |
| `max-width: 1440px` | 3 | 1440 (cierra desktop) | ⚠️ Normalizar → `max-width: 1439px` |
| `min-width: 1440px` | 2 | 1440 (abre wide) | ✅ Correcto — mantener |
| `min-width: 1441px` | 3 | 1440 (abre wide) | ⚠️ Normalizar → `min-width: 1440px` |

### Bugs de solapamiento confirmados

1. **A 768px exacto**: coexisten `max-width: 768px` (cree phone) y `min-width: 768px` (cree tablet). Doble-match. Origen del off-by-one 767/768/769.
2. **A 1440px exacto**: coexisten `max-width: 1440px` (cree desktop) y `min-width: 1440px` (cree wide). Doble-match.

### Limpieza aplicada (2026-07-06) ✅

Normalización off-by-one de las parejas **limpias** (sin gate de altura):

1. ✅ `max-width: 768px` → `max-width: 767px` (4 bloques: reviews, process, services/mid-cta, nav)
2. ✅ `min-width: 769px` → `min-width: 768px` (6 bloques tablet)
3. ✅ `max-width: 1440px` → `max-width: 1439px` en reviews + process (2 de 3 — hero excluido, ver abajo)
4. ✅ `min-width: 1441px` → `min-width: 1440px` en reviews + process (2 bloques standalone)

Resultado: boundaries consistentes `767/768 · 1023/1024 · 1439/1440`. Server compila 200, sin errores CSS.

### Excepción NO migrada · par del hero (height-gated) ⚠️

El par hero **NO se tocó** porque no es un off-by-one puro, está entangled con un gate de altura:

- `@media (min-width: 1024px) and (max-width: 1440px)` — hero art desktop (nota: `max-1440` inclusivo, a propósito)
- `@media (min-width: 1441px) and (min-height: 901px)` — hero art "wide alto"

El `max-1440` inclusivo existe para que un laptop **1440×900** (alto 900 < 901) reciba el hero art de desktop. Normalizarlo mecánicamente dejaría 1440×900 en un hueco (ni desktop ni wide-alto → hero art roto). Migración correcta = refactor #3 con tratamiento height-aware, no mecánico.

### Alineación Tailwind aplicada (2026-07-06) ✅

`--breakpoint-xl: 1440px` en `@theme` (§6). `md`/`lg` ya coincidían. `sm`/`2xl` sin tocar. Home y `/portfolio` compilan 200.

### Conformance · el código YA cumple el modelo (2026-07-06) ✅

Auditoría post-limpieza confirma que `app/globals.css` cumple DS 03b sin refactor masivo adicional:

| Capa | Estado | Evidencia |
|---|---|---|
| `phone` (≤767) | ✅ Acotado | Todos `max-width: 767px` → editar phone NO toca tablet/desktop/wide |
| `tablet` (768–1023) | ✅ Acotado | `min-768 and max-1023` |
| `desktop` (1024–1439) | ✅ Acotado | `min-1024 and max-1439` |
| `wide` (≥1440) | ✅ Abierto-arriba correcto | `min-1440` (es el rango tope, no lleva max) |
| Shared "and-up" | ✅ Legítimo | `min-768` (form grid, heading) y `min-1024` (nav) abiertos = comportamiento compartido tablet+/desktop+, permitido por el modelo base+override |

> **Por qué NO se acotan los `min-width` abiertos**: son declaraciones compartidas "de tal rango hacia arriba" (ej. la nav aparece desde 1024 en desktop Y wide). Acotarlas a un rango rompería wide (la nav desaparecería a ≥1440). El aislamiento del modelo aplica a los **overrides de layout por rango**, no a las cascadas compartidas.

### Decisiones finales

5. **`max-width: 480px`** → ✅ **Se queda** como refinamiento small-phone anidado dentro de `phone` (tuning de FAQ/contact/services en móviles ≤480). No es off-by-one ni viola aislamiento (max-480 ⊂ phone, sin conflicto de frontera).
6. **Par hero (height-aware)** → ✅ **Se deja como excepción documentada (Regla 08).** Funciona correcto en todos los viewports hoy (incl. 1440×900 → hero art desktop). La única "inconsistencia" es filosófica (a 1440 el hero usa art desktop mientras otras secciones usan wide) y es invisible: es posicionamiento DECORATIVO. Restructurarlo arriesga regresiones decorativas (wide-alto heredando props extra, o nuevo hueco) sin beneficio de usuario. **No se toca por tocar.**

### Pendiente real (requiere validación visual · no automatizable headless)

- Polish visual sección por sección en cada viewport de la matriz (§4) — necesita ojo humano en el browser.

> Errores pre-existentes NO relacionados con breakpoints (fuera de scope): hydration mismatch en theme `dark` (`layout.tsx:11`) e i18n `ES/EN` (`mobile-speed-dial.tsx:41`).

---

## 8. Rango ultra ≥1920 · decisión pendiente

**Hoy no existe.** No hay ninguna regla CSS arriba de 1440px. Los viewports `1920`, `2560` y `3840` renderizan idénticos a `wide`: contenido capado al container (1180px) y centrado, con márgenes laterales crecientes.

Construir un rango `ultra` (`≥1920px`) es una **decisión de diseño**, no un bug. Solo tiene sentido si se quiere un layout bespoke para monitores grandes:

| A favor | En contra |
|---|---|
| Aprovecha ancho en 2K/4K (container más ancho, tipo más grande) | Tráfico real en ≥1920 suele ser bajo en landing B2B |
| Evita "isla de contenido" con márgenes enormes | Un container centrado ya se ve premium sin trabajo extra |
| Coincide con el modelo mental "pantalla grande" del equipo | Suma un 5º rango a mantener |

**Estado**: `DS-F011` en backlog. Si se aprueba, se agrega boundary `1920` (`--bp-ultra`), rango `wide: 1440–1919` + `ultra: ≥1920`, y se activa `--breakpoint-xl: 1920px` en `@theme`.

---

## 9. Decisiones de diseño

### DS-052 · Sistema de breakpoints canónico · 3 boundaries / 4 rangos
✅ **Aprobada** — 2026-07-06

Boundaries `768 · 1024 · 1440` derivados de los saltos reales del CSS de producción. 4 rangos: `phone` (0–767), `tablet` (768–1023), `desktop` (1024–1439), `wide` (≥1440). Regla de frontera `N−1 / N` para eliminar off-by-one. Fuente de verdad única; DS 03 §5 referencia acá.

**Marca**: consistencia técnica · un solo lenguaje de breakpoints en CSS, JS y Tailwind · disciplina sobre el caos heredado.

**Alternativas descartadas**: 1 rango por cada tamaño de test (`DS-X012` — duplicación masiva y drift), breakpoints de catálogo sin evidencia (inventar saltos donde el layout no cambia), mantener el mix 767/768/769/1439/1440/1441 (bugs de solapamiento).

### DS-053 · Modelo de aislamiento · base + overrides acotados
✅ **Aprobada** — 2026-07-06

Capa base compartida (color, tipografía, tokens, estructura) sin media query + capa de overrides acotados (min+max) solo para layout. Editar un rango no modifica los otros; los tokens no se duplican. Cumple el requerimiento de aislamiento sin generar drift.

**Marca**: mantenibilidad · aislamiento del layout sin sacrificar DRY en los tokens.

**Alternativas descartadas**: aislamiento puro total (`DS-X013` — duplica tokens en cada rango, drift garantizado), mobile-first cascada pura (no aísla — editar base afecta todo hacia arriba).

### DS-054 · Matriz de viewports de test · 9 puntos → 4 rangos
✅ **Aprobada** — 2026-07-06

9 viewports oficiales mapeados a los 4 rangos, con prioridad (obligatorio/recomendado/opcional). `430×900` reemplaza el `482×900` inexistente. `1440×900` documentado como `wide`, no `desktop`.

**Marca**: QA reproducible · todos prueban en los mismos puntos · claridad sobre qué rango valida cada viewport.

**Alternativas descartadas**: tratar cada viewport como breakpoint propio (confunde punto de test con rango), lista de tamaños sin mapear a rangos (no dice qué valida cada uno).

---

## 10. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-07-06 | `DS-052` (breakpoints canónicos 768/1024/1440) · `DS-053` (aislamiento base + overrides) · `DS-054` (matriz de test 9 viewports) · auditoría de ~40 media queries con plan de limpieza off-by-one · `DS-F011` (rango ultra ≥1920) a backlog |

---

**Archivos relacionados**:
- [`03-spacing-radii-shadows.md`](03-spacing-radii-shadows.md) — DS 03 padre (grid, spacing, §5 breakpoints heredados)
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo (DS-052, DS-053, DS-054, DS-F011)
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
- `app/globals.css` — CSS a migrar según §7
