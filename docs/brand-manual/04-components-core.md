# 04 · Componentes core (DS 04)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.2 | 2026-05-04 |

> Sección 04 del Manual de Marca. De 9 botones a un sistema. Define Button (4 variantes × 3 tamaños) · Card (5 tipos canónicos) · Input (3 tipos × 6 estados) · Badge (4 familias) + Motion (DS-022 tokens + DS-017 v0.2 specs por variante × estado con eje ortogonal `data-modality`). Auditoría preventiva consolida 14 componentes de producción contra el sistema. Tokens de DS 01–03 aplicados sin HEX hardcoded.
>
> **v0.2 · motion patch** · DS-022 tokens de motion + DS-017 v0.2 specs accionables. Motion ES identidad.

---

## Contenido

1. [Filosofía · menos componentes, más uso](#1-filosofía--menos-componentes-más-uso)
2. [Button · DS-017 v0.2](#2-button--ds-017-v02)
3. [Card · DS-018](#3-card--ds-018)
4. [Input · DS-019](#4-input--ds-019)
5. [Badge · DS-020](#5-badge--ds-020)
6. [Motion · DS-017 v0.2 + DS-022](#6-motion--ds-017-v02--ds-022)
7. [Auditoría preventiva · producción](#7-auditoría-preventiva--producción)
8. [Comparativas antes / después](#8-comparativas-antes--después)
9. [Migraciones pendientes en código](#9-migraciones-pendientes-en-código)
10. [Decisiones de diseño](#10-decisiones-de-diseño)
11. [Historial de cambios](#11-historial-de-cambios)

---

## 1. Filosofía · menos componentes, más uso

Producción tiene 9 variantes activas de botón. Algunas se solapan (`.btn-body-primary` y `.btn-cta-navy` hacen lo mismo en contexto distinto). DS 04 consolida en 4 variantes con tamaño y contexto explícitos, agregando un **eje ortogonal de motion modality** para preservar los efectos hero sin multiplicar variantes.

Cada componente declara: anatomía base, variantes oficiales, tamaños, estados, reglas, motion specs y auditoría contra producción.

| Componente | Variantes | Tamaños | Estados | Motion |
|---|---|---|---|---|
| Button (DS-017 v0.2) | 4 | 3 (sm/md/lg) | 6 | base / pulse / orbit (modality, lg only) |
| Card (DS-018) | 5 tipos | — | hover (si interactiva) | Sticky / Swap / Comet (comportamientos opcionales) |
| Input (DS-019) | 3 tipos | 2 (sm/md) | 6 | hover/focus simples |
| Badge (DS-020) | 4 familias | — | — | sin motion específico |

---

## 2. Button · DS-017 v0.2

El componente más usado del sistema. Producción tiene 9 variantes con motion específico (3D press, orb orbital, glow pulse, text swap). DS 04 v0.2 separa **identidad** (4 variantes) de **modality** (eje ortogonal `data-modality`), preservando los efectos hero sin multiplicar variantes.

### Anatomía

| Slot | Detalle |
|---|---|
| Container | Padding tokens DS-014 según tamaño · radius `--r-pill` · border 1px transparent (slot para outline/focus) |
| Leading slot (opcional) | Ícono o dot · gap `--sp-2` con label · 16px (sm/md) · 18px (lg) |
| Label | Inter 500 · fontSize por tamaño · line-height 1 (no descender) |
| Trailing slot (opcional) | Chevron, arrow, contador · mismo gap y tamaño que leading |
| Focus ring | DS-016 `--sh-focus` Amber 3px · combinable con shadow base |

### 4 variantes oficiales

| Variante | Rol | Color base | Cuándo usar |
|---|---|---|---|
| **Primary** | CTA principal | Amber 500 | Acción comercial · UNA por sección |
| **Secondary** | Acción estructural | Navy 500 | Nav, header, acciones secundarias en dark |
| **Ghost** | Acción terciaria | Outline (border `--ink-5`) | "Ver más", "casos", "cancelar" |
| **Link** | Acción inline | Sin chrome | Texto + underline en cards, tablas, forms |

### 3 tamaños

| Tamaño | min-height | Uso |
|---|---|---|
| `sm` | 36px | Tablas · cards densas · toolbar · navbar CTA |
| `md` | 44px | Default · forms · navbar · CTAs in-body (cumple WCAG 2.5.5 target size) |
| `lg` | 54px | Hero · CTA Band · landing pages |

### Estados · 5 + loading por variante

| Estado | Primary | Secondary | Ghost | Link |
|---|---|---|---|---|
| Default | bg `--amber-500` · color `--ink-0` · sh-2 | bg `--navy-500` · color `#fff` | bg transparent · border `--ink-5` | color `--sky-700` · underline |
| Hover | bg `--amber-600` · sh-3 · ty -1px | bg `--navy-600` | bg `--ink-6` · border `--ink-4` | color `--amber-700` |
| Active | bg `--amber-700` · sh-1 · ty 0 | bg `--navy-700` | bg `--ink-5` | color `--amber-700` · op .8 |
| Focus | `--sh-focus` · 3px Amber 30% · combinable con shadow base · DS-016 unificado | idem | idem | idem |
| Disabled | opacity .5 · cursor not-allowed · sin shadow · sin transform · pointer-events none | idem | idem | idem |
| Loading | spinner 16px en leading slot · label opacity .7 · pointer-events none · `aria-busy="true"` | idem | idem | idem |

### Reglas · Button

| # | Regla | Detalle |
|---|---|---|
| 01 | **Una sola Primary por sección** | Hereda DS-009 regla 02. Si necesitas dos acciones igual de importantes, una se vuelve Secondary |
| 02 | **Motion ES identidad** ✨ v0.2 | En NoaTech motion no es opcional, es identidad de marca. 3D press define la familia Primary/Secondary; orbit define Ghost; glow pulse perpetuo distingue Primary lg en hero. Especificado en [sección 06](#6-motion--ds-017-v02--ds-022) con tokens DS-022 y specs por variante × estado. Motion se aplica vía atributo `data-modality="base|pulse|orbit"`, no por variante nueva |
| 03 | **Electric jubilado de botones** | `.btn-body-electric` retirado. Producía vibración con Amber adyacente y ya tiene rol único en mascota Noa (DS-010 regla 07) |
| 04 | **Pill obligatorio** | Todos los botones usan `--r-pill`. Es el gesto formal del sistema (DS-015). No existen botones cuadrados ni rounded-md |
| 05 | **min-height fija por tamaño** | 36 / 44 / 54. El 44 default cumple WCAG 2.5.5 (target size). Nunca botones <36px |
| 06 | **Focus visible siempre** | Usar `:focus-visible` con `--sh-focus`. Nunca `outline:none` sin reemplazo. Combinar vía coma con shadow base |

---

## 3. Card · DS-018

Cinco tipos canónicos. Sticky, Swap y Comet son **comportamientos de motion** aplicados sobre Feature, no tipos nuevos. La identidad de la card está en cromática y elevación; el motion es producto.

### Anatomía base

| Slot | Detalle |
|---|---|
| Container | bg `--paper-0` · radius `--r-lg` (16px) · border `--ink-5` · shadow `--sh-2` |
| Padding | `--sp-5` (24px) default · `--sp-6` (32px) en cards generosas (Featured, Dark) |
| Gap interno | `--sp-3` (12px) entre slots · `--sp-2` (8px) entre eyebrow y título |
| Slots opcionales | Eyebrow (DS-020) · Plate icónica · Título · Descripción · Lista · CTA Link |
| Hover | shadow `--sh-3` · transform `translateY(-4px)` · transition 250ms · solo en cards interactivas |

### 5 tipos canónicos

| Tipo | Uso | Estilo |
|---|---|---|
| **Feature** | Card estándar — servicios, blog posts, casos | bg blanco · sh-2 · border `--ink-5`. La más usada del sistema |
| **Featured** | Card destacada — "más popular", "recomendado", "premium" | sh-3 · border `--ink-4` · padding generoso. **Una por grid máximo** |
| **Dark** | Procesos, secciones inmersivas | bg `--navy-500` · sh-4. Texto blanco · eyebrow Amber preserva rol |
| **Testimonial** | Citas con autor | Plate avatar + quote estilo DS-004 · sin hover (estática) |
| **FAQ** | Acordeón pregunta/respuesta | Estado abierto/cerrado con `aria-expanded`. Active state opcional con gradiente expresivo (excepción DS-011) |

### Comportamientos de motion (variantes opcionales sobre Feature)

| Comportamiento | Implementación | Uso |
|---|---|---|
| Sticky | `motion/react` `useScroll` + sticky positioning | Stack que se apila con scroll |
| Swap | GSAP timeline | Stack 3D con autoplay y skew |
| Comet | `motion/react` springs | 3D mouse-follow (perspective + rotateX/Y) |

### Reglas · Card

| # | Regla | Detalle |
|---|---|---|
| 01 | Radius lg (16px) default | DS-015 pega `--r-lg` a cards principales. Featured y Dark pueden subir a `--r-xl` (24px) si jerarquía lo pide. Cards densas en grid usan `--r-md` (12px) |
| 02 | Una Featured por grid | Si toda card es destacada, ninguna lo es. Solo una usa shadow elevado dentro de un grid de hermanas |
| 03 | Plate icónica con gradient mono-tono | Plates 54×54 con gradient Amber 400→500 o Sky 400→500 según contexto. Multicolor solo donde DS-011 lo permite |
| 04 | Hover solo si la card es interactiva | Card que abre página o expande FAQ → hover. Card de testimonial estática → sin hover. La afordancia visual debe coincidir con la realidad |
| 05 | Motion (Sticky / Swap / Comet) opcional | Variantes de comportamiento aplicables a Feature. La identidad visual no cambia. No promover a tipo nuevo |
| 06 | Cards nunca usan pill | DS-015. La pill es categórica para botones/chips/dots. Las cards viven en xs–2xl, nunca en pill |

---

## 4. Input · DS-019

Producción tiene inputs en dos contextos: contact-form (sobre Navy, glassmorphism) y formularios light. DS 04 unifica anatomía y deja el chrome contextual (light/dark) como variante de container, no de input.

### Anatomía

| Slot | Detalle |
|---|---|
| Label | Visible siempre · eyebrow style (Inter mono uppercase 10px) · arriba del input · obligatorio |
| Container | radius `--r-sm` (8px) · padding interno `--sp-3` |
| Helptxt | `--ink-3` default · color semántico en error/success |
| Focus ring | DS-016 `--sh-focus` Amber 3px |

### 3 tipos

| Tipo | Uso |
|---|---|
| Text | Single-line — email, nombre, teléfono |
| Textarea | Multi-line — mensaje, descripción · min 4 rows |
| Select | Dropdown — país, plan, prioridad |

### Estados · 6

| Estado | Border | Background | Shadow | Texto / helptxt |
|---|---|---|---|---|
| Default | `--ink-5` | `--paper-0` | `--sh-1` | Color `--ink-0` · placeholder `--ink-3` · helptxt `--ink-3` |
| Hover | `--ink-4` | `--paper-0` | `--sh-1` | Solo border cambia · sin transform |
| Focus | `--amber-500` | `--paper-0` | `--sh-focus` (Amber 3px) | Outline removed; ring sustituye · DS-016 unificado |
| Error | `--danger-500` | `--paper-0` | sh-1 · focus ring red 18% | helptxt rojo · `aria-invalid="true"` · `aria-describedby` al helptxt |
| Success | `--success-500` | `--paper-0` | sh-1 | helptxt verde · solo después de validación pasada (no on-blur de campo intacto) |
| Disabled | `--ink-5` | `--ink-6` | none | Color `--ink-3` · cursor not-allowed · readonly aplica el mismo styling |

### Variante dark (heredada)

En contact-form sobre Navy, el input usa misma anatomía con bg `rgba(255,255,255,.05)`, border `rgba(255,255,255,.14)`. Focus ring Amber preserva DS-016 (`--sh-focus-d` con 0.45 alpha). **No es un input nuevo** — es contexto.

### Reglas · Input

| # | Regla | Detalle |
|---|---|---|
| 01 | Label siempre visible | No usar placeholder como label (anti-pattern accesibilidad). Label arriba en eyebrow style. Para floating labels usar variante explícita |
| 02 | Validación on-submit, hint on-blur | No marcar error mientras el usuario escribe. Mostrar success solo si la validación realmente pasó (no asumir) |
| 03 | Helptxt obligatorio en errores | Border rojo sin texto explicativo es inaccesible. Toda card error tiene helptxt err que dice qué corregir |
| 04 | Radius sm (8px) | DS-015. Inputs viven en sm. Nunca pill — un input pill se confunde con un botón y rompe affordance |
| 05 | Variante dark hereda anatomía | Misma estructura, distinto chrome. Focus ring Amber preserva DS-016 |
| 06 | min-height 44px (md) | Coincide con WCAG 2.5.5. Inputs sm (36) solo en filtros densos de tabla |

---

## 5. Badge · DS-020

Cuatro familias **semánticamente distintas**. Eyebrow no es Pill aunque parezcan similares: Eyebrow es metadata textual sin chrome, Pill es un objeto interactivo con fondo.

### 4 familias

| Familia | Estilo | Uso |
|---|---|---|
| **Eyebrow** | Metadata textual · sin fondo · Amber 500 · Inter Mono o Inter uppercase · letter-spacing 0.18em–0.28em | Kicker de sección, capítulo, metadata "PROYECTO 2026" |
| **Pill** | Objeto con fondo y padding · radius `--r-pill` · 3 niveles | Tag visible (alta jerarquía → solid; media → soft; baja → outline) |
| **Status** | Color semántico (success/warning/danger/info) | Estados operativos, alertas, novedades |
| **Step** | Numérico · activo en Amber, inactivo en Ink 5 con texto Ink 2 | Procesos numerados, sticky steps |

### 3 niveles de Pill

| Nivel | Estilo | Uso |
|---|---|---|
| **Solid** | bg Amber 500 · texto Navy 500 · border none | Tag visible · 1 por viewport máximo |
| **Soft** | bg Amber 50 · texto Amber 700 · border Amber 200 | Tags múltiples · estados secundarios |
| **Outline** | bg transparent · texto Ink 2 · border `--ink-5` | Filtros, tags densos, navegación facetada |

### 4 variantes de Status

| Variante | Color | Uso |
|---|---|---|
| Success | `--success-500` (Verde `#2F9E4F`) | Operativo, validación positiva |
| Warning | `--warning-500` (Amarillo `#D18B1F`) | En revisión, alerta no crítica |
| Danger | `--danger-500` (Rojo `#C93A2A`) | Bloqueante, error crítico |
| Info | `--info-500` (Sky `#05A5FF`) | Novedad, informativo |

### Reglas · Badge

| # | Regla | Detalle |
|---|---|---|
| 01 | Eyebrow ≠ Pill | Eyebrow es texto metadata sin chrome. Pill es objeto con fondo y padding. No usar Pill donde corresponde Eyebrow |
| 02 | Pill solid escasea | Una solid Amber por viewport máximo. Para tags múltiples usar soft o outline. La intensidad cromática se reserva para señales |
| 03 | Status usa color semántico | Verde = success · Amarillo = warning · Rojo = danger · Sky = info. No mezclar (un "warning" en azul comunica info, no alerta) |
| 04 | Step Amber para activo, Ink para inactivo | En procesos sticky/numerados, paso actual = Amber 500, pasos futuros = Ink 5 con texto Ink 2 |

---

## 6. Motion · DS-017 v0.2 + DS-022

Sección agregada en v0.2. **Motion es identidad de marca, no decoración opcional.** DS-022 introduce tokens de duración y easing. DS-017 v0.2 especifica motion por variante × estado, con un eje ortogonal de **modality** (base / pulse / orbit) para preservar los efectos hero sin multiplicar variantes.

### 6.1 · DS-022 · Tokens de motion

#### Durations (6 tokens)

| Token | Valor | Uso |
|---|---|---|
| `--motion-duration-instant` | 80ms | Press / active. Feedback táctil inmediato |
| `--motion-duration-fast` | 120ms | Container transitions sm/md · transform 3D |
| `--motion-duration-base` | 180ms | Hover changes simples · color/border |
| `--motion-duration-slow` | 280ms | Hover enfático · text-swap · emphasis lg |
| `--motion-duration-pulse` | 2500ms | Loop perpetuo glow pulse hero |
| `--motion-duration-orbit` | 3000ms | Loop perpetuo orb orbital |

#### Easings (3 tokens)

| Token | Valor | Uso |
|---|---|---|
| `--motion-ease-emphasis` | `cubic-bezier(.4, 0, .2, 1)` | Default para hover/active. Material standard, ramp acelerado · 90% de transitions |
| `--motion-ease-overshoot` | `cubic-bezier(.34, 1.56, .64, 1)` | Spring sutil. Solo en text-swap fade-in y modality entries |
| `--motion-ease-pulse` | `ease-in-out` | Loops perpetuos (pulse, orbit). Suaviza ambos extremos |

#### `prefers-reduced-motion` (obligatorio)

- Loops perpetuos se desactivan completamente
- Hover transforms se reducen a opacity/color (sin translateY)
- Implementación a nivel global en CSS reset

> Toda nueva CSS o motion variant usa exclusivamente DS-022. **No se permiten valores inline.** Si un componente requiere otra duración/easing, se evalúa promover token nuevo.

### 6.2 · Eje ortogonal `data-modality`

Producción tiene 7 efectos de motion sobre 9 botones. Auditados, son:

- **2 patrones base** · 3D press + hover lift
- **2 modalities perpetuas opcionales** · pulse + orbit

La consolidación 9→4 se mantiene válida agregando un **atributo ortogonal**: `data-modality="base|pulse|orbit"`. Pulse y orbit quedan **reservadas a tamaño `lg` en posiciones hero/CTA Band** — nunca en sm/md ni en formularios.

| Modality | Uso | Implementación |
|---|---|---|
| `base` (default) | Todos los botones sm/md/lg | 3D press transform + shadow transition |
| `pulse` (lg only) | CTA hero (ex `.btn-cta-navy`) | `animation: glow-pulse 2500ms ease-in-out infinite` |
| `orbit` (lg only) | Ghost hero (ex `.btn-body-ghost`, `.btn-cta-ghost-navy`) | Orb child con `animation: orbit 3000ms linear infinite` |

### 6.3 · Specs por variante × estado

#### Primary · 3D press + text-swap (md/lg)

| Estado | duration | ease | transform | shadow / extras |
|---|---|---|---|---|
| Default | — | — | none | `0 4px 0 var(--amber-700)`, `--sh-2` |
| Hover (md) | `--motion-duration-fast` | `--motion-ease-emphasis` | `translateY(-2px)` | `0 6px 0 amber-700`, `--sh-3` |
| Hover (lg) | `--motion-duration-slow` | `--motion-ease-emphasis` | `translateY(-2px) scale(1.01)` | `0 6px 0 amber-700`, `--sh-4` + text-swap |
| Active | `--motion-duration-instant` | `ease-out` | `translateY(3px)` | `0 1px 0 amber-700`, `--sh-1` |
| Focus-visible | — | — | none | `--sh-focus` combinado con shadow base |

**Text-swap**: idle fade-out 120ms ease-out (offset 0) · hover fade-in 180ms **overshoot** + slide-up 8px (offset 60ms) · icon fade-out 120ms + slide-left 4px.

**`modality=pulse`**: `animation: glow-pulse 2500ms ease-in-out infinite`. Hover **detiene el loop** y aplica el hover state base. Solo lg en hero/CTA Band. Respeta `prefers-reduced-motion`.

#### Secondary · 3D press Navy

| Estado | duration | ease | transform | shadow / extras |
|---|---|---|---|---|
| Default | — | — | none | `0 4px 0 var(--navy-700)`, `--sh-2` |
| Hover | `--motion-duration-fast` | `--motion-ease-emphasis` | `translateY(-2px)` | `0 6px 0 navy-700`, `--sh-3` |
| Active | `--motion-duration-instant` | `ease-out` | `translateY(3px)` | `0 1px 0 navy-700`, `--sh-1` |
| Focus-visible | — | — | none | `--sh-focus` + shadow base |

**Nav variant (sm)**: background hover `--amber-700` (DS-013) · transition `background 180ms emphasis` + transform fast · navbar exclusivo.

#### Ghost · outline + modality orbit (lg hero)

| Estado | duration | ease | transform | shadow / extras |
|---|---|---|---|---|
| Default | — | — | none | border `--ink-5` |
| Hover | `--motion-duration-base` | `--motion-ease-emphasis` | none | bg `--ink-6`, border `--ink-4` |
| Active | `--motion-duration-instant` | `ease-out` | `scale(.98)` | bg `--ink-5` |
| Focus-visible | — | — | none | `--sh-focus` |

**`modality=orbit`**: orb child `::before` con radial-gradient · `animation: orbit 3000ms linear infinite` · 70px translateX · solo lg en hero. Respeta `prefers-reduced-motion`.

#### Link · inline minimal

| Estado | duration | ease | transform | shadow / extras |
|---|---|---|---|---|
| Default | — | — | none | color `--sky-700`, underline |
| Hover | `--motion-duration-base` | `--motion-ease-emphasis` | none | color `--amber-700` |
| Active | `--motion-duration-instant` | `ease-out` | none | opacity .8 |
| Focus-visible | — | — | none | `--sh-focus` en bounding box |

**Modality**: no aplica. Link permanece minimal.

### 6.4 · Mapping motion 9→4 + modality (auditoría reconfirmada)

| Variante legacy | Motion actual | DS-017 v0.2 | Notas |
|---|---|---|---|
| `.btn-body-amber` | 3D press 0.12s + amber shadow | `primary md · base` | Mapping directo. duration-fast |
| `.btn-body-primary` (Navy) | 3D press 0.15s + text-swap | `secondary md/lg · base` | text-swap promovido a primary lg según v0.2 |
| `.btn-cta-navy` | 3D press 0.15s + glow-pulse 2.5s perpetuo + text-swap | `primary lg · modality=pulse` | Loop perpetuo preservado vía data-modality. Hero/CTA Band exclusivo |
| `.btn-body-ghost` | orb orbital 3s perpetuo | `ghost lg · modality=orbit` | Orbit preservado vía data-modality. duration-orbit 3000ms |
| `.btn-cta-ghost-navy` | orb orbital blanco 3s | `ghost lg dark · modality=orbit` | Variante dark del ghost orbit. Orb radial blanco |
| `.btn-nav-primary` | 3D press 0.12s + bg hover Electric | `primary sm + DS-013` | Hover migra a Amber 700 (DS-013). duration-fast |
| `.btn-nav-ghost` | all 0.15s | `ghost sm · base` | duration-base 180ms unificado |
| `.btn-body-electric` | N/A | 🚫 retirado | DS-010 regla 07. Sin sucesor de motion |
| `.pill-amber-as-button` | N/A | 🚫 retirado | Migra a badge solid-amber |

> **Reconfirmación 9→4**: la consolidación se mantiene. Los 7 efectos legacy son 2 patrones base + 2 modalities perpetuas opcionales aplicables a la combinación cromática. **2 retiros sin pérdida de motion** (Electric no tenía único; pill-as-button migra a Badge).

### 6.5 · Reglas de motion

6 reglas oficiales aprobadas (`DS-022` + `DS-017 v0.2`).

| # | Regla | Detalle |
|---|---|---|
| 01 | **Modality solo en lg hero/CTA Band** | Pulse y orbit son loops perpetuos. Aplicar solo a botones `lg` en posiciones jerárquicas (hero, CTA Band cierre). Nunca en formularios, navbar, cards in-grid |
| 02 | **Hover detiene loops** | En `modality=pulse` y `orbit`, el hover **pausa** el loop perpetuo y aplica el hover state base. Esto da feedback de interactividad y evita motion encimado |
| 03 | **`prefers-reduced-motion` obligatorio** | Loops perpetuos se desactivan completamente. Hover transforms (translateY) se reducen a cambio de opacity/color. Implementación con media query a nivel global |
| 04 | **Implementación con motion/react variants o CSS keyframes** | Hover/active simples → CSS transition. text-swap, glow-pulse, orbit → motion/react variants o GSAP timeline. DS-021 arquitectura impl 3 capas: shadcn primitive + motion engine + showcase Aceternity |
| 05 | **Sin nuevos easings ni durations inline** | Toda nueva CSS o motion variant usa exclusivamente DS-022. Si un componente "necesita" un valor distinto, se evalúa promover token nuevo — no inventar inline |
| 06 | **Combinar `transition` + `animation` con cuidado** | Modality loops usan `animation`; hover/active usan `transition`. En el mismo elemento se combinan separando properties (`animation: box-shadow; transition: transform`) |

---

## 7. Auditoría preventiva · producción

14 hallazgos en código actual (`app/components/ui/`, `app/globals.css`, `ui_kits/website/kit.css`).

| Categoría | OK | Migrar | Retirar | Total |
|---|---|---|---|---|
| Botones | 0 | 7 | 2 | 9 |
| Cards | 3 | 2 | 0 | 5 |
| Inputs | 1 | 1 | 0 | 2 |
| Badges | 0 | 3 | 0 | 3 |
| **Total** | **4** | **13** | **2** | **19** |

> El designer reporta "14 hallazgos" agrupando algunos OK; el detalle individual da 19 entradas (4 OK + 13 migraciones + 2 retiros).

### Botones · 9 variantes legacy → 4 oficiales

| Tipo | Variante legacy | Mapping DS-017 v0.2 | Razón |
|---|---|---|---|
| Migrar | `.btn-body-primary` | `secondary md · base` | Navy fill estructural · 3D press y text-swap son motion del base |
| Migrar | `.btn-body-amber` | `primary md · base` | Es el primary canónico. 3D press queda como motion del primary |
| Migrar | `.btn-body-ghost` | `ghost md · base` o `ghost lg · orbit` | Outline ya cumple. Orb orbital → modality=orbit en lg |
| Migrar | `.btn-cta-navy` | `primary lg · modality=pulse` | Tamaño hero. Glow pulse preservado vía data-modality |
| Migrar | `.btn-cta-ghost-navy` | `ghost lg dark · orbit` | Variante dark del ghost orbit. Contexto, no botón nuevo |
| **Retirar** | `.btn-body-electric` | — eliminado | Electric jubilado de botones (DS-010 regla 07) |
| Migrar | `.btn-nav-primary` | `primary sm + DS-013` | CTA del navbar. Hover Electric → Amber 700 |
| Migrar | `.btn-nav-ghost` | `ghost sm · base` | Texto navy con hover sutil |
| **Retirar** | `.pill-amber` (como botón) | → `bdg solid-amber` | Era pill informativa usada como botón. Mover a Badge |

### Cards · 5 hallazgos

| Tipo | Componente | Mapping DS-018 | Razón |
|---|---|---|---|
| OK | Feature card (`--bg-card`) | Card · Feature | Mantener · ajustar tokens (radius 29 → 16, shadow custom → sh-2) |
| OK | Card destacada (`--bg-card-pop`) | Card · Featured | Mantener · radius/shadow desde DS-016 |
| OK | CardSticky / CardSwap / CometCard | Comportamientos sobre Feature | No promover a tipos nuevos |
| Migrar | `.proc` (process dark) | Card · Dark | Backdrop-filter blur 8px y borders 1px rgba mantienen. Radius 24 → r-xl OK |
| Migrar | `.faq.active` gradient multicolor | Card · FAQ active state | Gradient queda bajo excepción DS-011 (gradiente expresivo único) |

### Inputs · 2 hallazgos

| Tipo | Ubicación | Mapping DS-019 | Razón |
|---|---|---|---|
| OK | contact-form `.input/.ta` | Input · variante dark | Focus ring ya usa Amber. Migrar a `--sh-focus-d` (.45 alpha) |
| Migrar | Inputs light (si existen en blog/admin) | Input · default light | Aplicar tokens DS-019 |

### Badges · 3 hallazgos

| Tipo | Componente | Mapping DS-020 | Razón |
|---|---|---|---|
| Migrar | `.eyebrow` (Amber uppercase) | Badge · Eyebrow | Letter-spacing 0.28em ya correcto. Unificar a 0.18em en uso compacto |
| Migrar | `.svc-idx` (pill Electric soft) | Badge · Pill soft (Amber) | Migrar de Electric a Amber soft según DS-011 |
| Migrar | `.proc-step` (Electric pill) | Badge · Step | Migrar a Amber según DS-011 |

---

## 8. Comparativas antes / después

### Botón hero CTA

```
ANTES   · .btn-cta-navy + glow + 3D + text-swap (motion ad-hoc)
DESPUÉS · btn-primary lg · modality=pulse + tokens DS-022
```

Motion preservado vía data-modality. Mismo loop de glow-pulse 2500ms, ahora con duration-pulse y ease-pulse oficiales.

### Card de servicio

```
ANTES   · .svc · radius 29 · shadow custom · plate gradient multicolor
DESPUÉS · Card Feature · radius lg · sh-2 · plate Amber soft + eyebrow Amber
```

### Process step (badge)

```
ANTES   · .proc-step · pill Electric solid
DESPUÉS · Badge Step · Amber circle + eyebrow
```

---

## 9. Migraciones pendientes en código

Total: **13 migraciones + 2 retiros**. Aplicar como tarea separada de desarrollo, alineada con migraciones DS 02 v0.4 (5) y DS 03 v0.1 (8).

### Botones (9)

| # | Cambio |
|---|---|
| 1 | `.btn-body-primary` → `secondary md base` |
| 2 | `.btn-body-amber` → `primary md base` |
| 3 | `.btn-body-ghost` → `ghost md base` o `ghost lg modality=orbit` según contexto |
| 4 | `.btn-cta-navy` → `primary lg modality=pulse` |
| 5 | `.btn-cta-ghost-navy` → `ghost lg dark modality=orbit` |
| 6 | **Retirar** `.btn-body-electric` (Electric jubilado) |
| 7 | `.btn-nav-primary` → `primary sm + DS-013` (Amber 700 hover) |
| 8 | `.btn-nav-ghost` → `ghost sm base` |
| 9 | **Retirar** `.pill-amber` como botón → mover a Badge solid-amber |

### Cards (2)

| # | Cambio |
|---|---|
| 10 | `.proc` (process dark) → Card Dark (radius 24 → r-xl) |
| 11 | `.faq.active` gradient → documentar como excepción DS-011 |

### Inputs (1+1)

| # | Cambio |
|---|---|
| 12 | contact-form `.input/.ta` focus ring → `--sh-focus-d` |
| 13 | Inputs light → tokens DS-019 |

### Badges (3)

| # | Cambio |
|---|---|
| 14 | `.eyebrow` letter-spacing 0.28em → 0.18em en uso compacto |
| 15 | `.svc-idx` Electric soft → Amber soft (DS-011) |
| 16 | `.proc-step` Electric → Amber (DS-011) |

> Total acumulado del manual: 5 (DS 02) + 8 (DS 03) + 16 (DS 04) = **29 cambios** para tarea de desarrollo separada.

---

## 10. Decisiones de diseño

### DS-017 v0.2 · Button motion specs + eje ortogonal modality
✅ **Aprobada** — 2026-05-04 · **Reconfirma 9→4**

**Corrección al gap de v0.1**: motion no es opcional, ES identidad de marca en NoaTech. La regla 02 original ("Motion no define variante") sub-especificaba; v0.2 la reescribe: motion se aplica vía atributo ortogonal `data-modality="base|pulse|orbit"`, no por variante nueva.

Specs accionables tabuladas en sección 06 para las 4 variantes × estados aplicables: duration, ease, transform, shadow, extras (text-swap, icon-fade, modality entries).

**Reconfirmación 9→4**: los 7 efectos legacy son 2 patrones base + 2 modalities perpetuas opcionales (pulse, orbit). Mapping completo: `btn-cta-navy → primary lg pulse` · `btn-body-ghost → ghost lg orbit` · `btn-cta-ghost-navy → ghost lg dark orbit` · 6 al base · 2 retiros sin pérdida.

**Modality solo en `lg` hero/CTA Band.** Pulse y orbit son loops perpetuos: se reservan a botones lg en posiciones jerárquicas. Hover detiene el loop y aplica el hover state base. text-swap promovido a primary lg.

**Marca**: motion como lenguaje, no decoración · identidad hero preservada · eje ortogonal sin multiplicar variantes · implementable con motion/react o CSS.

**Alternativas descartadas**: mantener "motion opcional" v0.1 (drift de impl, downgrade visual) · promover pulse/orbit a variantes propias (5 o 6 variantes, multiplicación) · motion libre por instancia (caos sin tokens) · modality aplicable en sm/md (loops perpetuos en formularios = ruido).

### DS-018 · Card · 5 tipos canónicos
✅ **Aprobada** — 2026-05-04

5 tipos canónicos (Feature, Featured, Dark, Testimonial, FAQ). CardSticky, CardSwap, CometCard son **comportamientos** sobre Feature, no tipos nuevos. Una Featured por grid. Radius `--r-lg` (16px) default. Cards nunca usan pill.

**Marca**: jerarquía cromática y elevación definen identidad · motion es producto, no tipo · disciplina visual.

**Alternativas descartadas**: promover Sticky/Swap/Comet a tipos nuevos (multiplicaba variantes innecesariamente), permitir múltiples Featured por grid (rompe la jerarquía visual), cards en pill (rompe DS-015 pill categórica).

### DS-019 · Input · 3 tipos × 6 estados con validación inline
✅ **Aprobada** — 2026-05-04

Text/Textarea/Select × 6 estados (default/hover/focus/error/success/disabled). Validación inline con helptxt obligatorio en errores. Variante dark hereda anatomía con chrome contextual. Focus ring DS-016 unificado. Label siempre visible (no placeholder-as-label).

**Marca**: accesibilidad sin sacrificio · feedback honesto al usuario · tokens DS 03 aplicados sin excepciones.

**Alternativas descartadas**: placeholder-as-label (anti-pattern accesibilidad), validación on-keystroke (genera ansiedad), input con radius pill (rompe affordance).

### DS-020 · Badge · 4 familias semánticamente distintas
✅ **Aprobada** — 2026-05-04

Eyebrow (metadata sin chrome) · Pill (3 niveles solid/soft/outline) · Status (semantic x4) · Step (numérico). Eyebrow ≠ Pill conceptualmente. Pill solid escasea (1 por viewport máx). Status estricto por color semántico.

**Marca**: diferenciación semántica clara · intensidad cromática reservada para señales · tipografía como vector de jerarquía.

**Alternativas descartadas**: Eyebrow y Pill en una sola familia (confunde metadata con objeto interactivo), Pill multicolor (rompe disciplina cromática), Status con colores libres (rompe convención WCAG / semáforo).

### DS-022 · Tokens de motion
✅ **Aprobada** — 2026-05-04

5 durations (instant 80ms / fast 120ms / base 180ms / slow 280ms / pulse 2500ms) + duration-orbit 3000ms + 3 easings (emphasis material standard / overshoot spring sutil / pulse ease-in-out). `prefers-reduced-motion` obligatorio: loops perpetuos se desactivan, hover transforms se reducen a opacity/color.

Toda nueva CSS o motion variant usa exclusivamente DS-022. No se permiten valores inline.

**Marca**: movimiento con disciplina · tempo predecible y reutilizable · a11y por defecto (reduced-motion) · base para motion engine impl (DS-021 capa 2).

**Alternativas descartadas**: mantener durations inline ad-hoc (caos: 0.12s/0.15s/0.2s/2.5s sin token) · una sola duration default (pierde matiz fast vs slow) · easings nombrados sin curva explícita ("snappy", "bouncy") · no documentar prefers-reduced-motion (a11y comprometido).

---

## 11. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.2 | 2026-05-04 | `DS-017 v0.2` motion specs (4 tablas variante × estado) + eje ortogonal `data-modality` · `DS-022` tokens de motion (6 durations + 3 easings + reduced-motion) · regla 02 reescrita: "Motion ES identidad" · gap de v0.1 cerrado · DS 04 promovido a ✅ Aprobado |
| v0.1 | 2026-05-04 | `DS-017` (Button 4×3×6, motion pendiente) · `DS-018` (Card 5 tipos) · `DS-019` (Input 3 tipos × 6 estados) · `DS-020` (Badge 4 familias) · auditoría 14 hallazgos en producción |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`00-implementation-strategy.md`](00-implementation-strategy.md) — arquitectura en 3 capas
- [`02-colors.md`](02-colors.md) — sistema cromático
- [`03-spacing-radii-shadows.md`](03-spacing-radii-shadows.md) — espaciado y elevación
- [`_open-questions/_archive/2026-05-04-ds-017-motion-specs.md`](_open-questions/_archive/2026-05-04-ds-017-motion-specs.md) — historial del gap cerrado en v0.2
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
