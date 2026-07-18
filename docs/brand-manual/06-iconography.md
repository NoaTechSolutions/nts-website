# 06 · Iconografía (DS 06)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-05-05 |

> Sección 06 del Manual de Marca. Sistema visual de íconos UI funcional del proyecto NTS. Define librería oficial, escala semántica de tamaños, stroke, color por contexto, mapping canónico de 22 acciones, reglas de custom SVG y accesibilidad.
>
> **Scope**: íconos UI funcional únicamente. Mascota Noa (DS 08 · Lottie) e ilustraciones (DS 07) fuera de scope. Logo / isotipo / colorways quedan referenciados pero su sistema vive en otro doc del equipo de diseño.

---

## Contenido

1. [Filosofía](#1-filosofía)
2. [Librería oficial · Lucide React (DS-028)](#2-librería-oficial--lucide-react-ds-028)
3. [Escala semántica · 5 tokens (DS-029)](#3-escala-semántica--5-tokens-ds-029)
4. [Stroke + Color por contexto (DS-030)](#4-stroke--color-por-contexto-ds-030)
5. [Mapping semántico canónico · 22 acciones (DS-031)](#5-mapping-semántico-canónico--22-acciones-ds-031)
6. [Custom SVG · cuándo sí y cuándo no (DS-032)](#6-custom-svg--cuándo-sí-y-cuándo-no-ds-032)
7. [Accesibilidad](#7-accesibilidad)
8. [Auditoría preventiva · 11 hallazgos](#8-auditoría-preventiva--11-hallazgos)
9. [Migraciones pendientes en código](#9-migraciones-pendientes-en-código)
10. [Decisiones de diseño](#10-decisiones-de-diseño)
11. [Historial de cambios](#11-historial-de-cambios)

---

## 1. Filosofía

Los íconos son el alfabeto visual del producto: aparecen en cada CTA, cada FAQ, cada nav, cada estado de submit. Sin reglas, ese alfabeto se contamina rápido — un proyecto típico acumula 4 íconos distintos para "forward", 3 estilos de stroke en la misma página y 6 tamaños inventados por instinto.

DS 06 establece **una sola decisión por dimensión**:
- una librería (Lucide)
- una escala (5 tokens)
- un stroke (1.5 uniforme)
- un mapping (22 acciones)

La libertad creativa se reserva para **custom SVG con propósito expresivo** (orb, watermark, ondas). Todo lo demás se canaliza por Lucide con tokens — no porque Lucide sea perfecto, sino porque la consistencia compounding-interest es más valiosa que la novedad por ícono.

### Conexión con otros módulos

| Módulo | Cómo se conecta |
|---|---|
| DS 02 · Colores | Color por estado siempre como token (sin HEX inline) |
| DS 03 · Spacing/Radii/Shadows | Escala 4px-base justifica los tamaños de ícono |
| DS 04 · Componentes core | Botones llevan slot leading/trailing con tamaño según variante |
| DS 05 · Patrones | FAQ chevron, Hero CTAs, Forms states, MobileSpeedDial |
| DS 09 · Motion (futuro) | Loader2 spin · reduced-motion handling |

---

## 2. Librería oficial · Lucide React (DS-028)

Producción ya usa `lucide-react v0.577.0` en navbar, FAQ, MobileSpeedDial, contact-form, feature cards y CTAs. La pregunta no es "¿qué librería elegimos?" sino "¿confirmamos Lucide o migramos antes de que el catálogo crezca?". DS 06 confirma Lucide.

### Criterios DS-021 aplicados

| Criterio | Lucide React | Phosphor Icons | Tabler Icons | Custom set |
|---|---|---|---|---|
| Modelo CLI / copy-into-repo | ✅ Tree-shaking nativo · `import { Plus } from 'lucide-react'` | ✅ Igual modelo | ✅ Igual modelo | ⚠️ Copia inline · sin overhead pero requiere mantenimiento |
| Tailwind-first / className passthrough | ✅ `className`, `size`, `strokeWidth` nativos | ✅ Idem | ✅ Idem | ⚠️ Depende de implementación |
| Catálogo (cantidad de glifos) | ✅ ~1500 íconos · cubre 100% del mapping NTS | ✅ ~7500 (6 weights × ~1250) | ✅ ~5500 íconos | ❌ Hay que dibujar cada uno |
| Estilo monoline · stroke-based | ✅ Default 24×24, stroke 2 (configurable) · 1 weight | ⚠️ 6 weights (thin/light/regular/bold/fill/duotone) — multiplicidad invita a inconsistencia | ✅ Default 24×24, stroke 2 · 1 weight | ⚠️ Personalizable pero hay que disciplinarlo |
| Stroke editable runtime | ✅ Prop `strokeWidth` nativa | ⚠️ Prop `weight` entre 6 valores discretos | ✅ Prop `stroke` nativa | ❌ Hay que parametrizar manualmente |
| Madurez · adopción · React 18+ | ✅ Fork oficial de Feather con momentum activo · Vercel/Linear-tier | ✅ Activo · adopción amplia | ✅ Activo · adopción media | ❌ Sin comunidad |
| Bundle impact · per-icon | ✅ ~600B–1.2KB por ícono importado (gzip) | ✅ ~700B–1.4KB | ✅ ~600B–1.2KB | ✅ Inline SVG = 0 overhead js |
| Costo de migración desde producción | ✅ Cero — ya está instalado y usado | ❌ Cambiar imports en ~12 archivos · re-mapear nombres | ❌ Cambiar imports en ~12 archivos | ❌ Dibujar 22 íconos canónicos + plumbing |

### Veredicto · DS-028

**Lucide React confirmado como librería oficial** (`lucide-react ≥ 0.577.0`).

- Cumple los 7 criterios de DS-021 sin compromisos
- Costo de migración cero — Phosphor/Tabler obligarían a cambiar ~12 archivos sin ganancia visual proporcional
- **Phosphor descartado en `DS-X008`**: 6 weights es flexibilidad que invita a inconsistencia
- **Custom set descartado en `DS-X009`** (en la auditoría — número diferente): pintar 22 íconos manuales para uso UI funcional es over-engineering

### Reglas de uso

- Versión mínima: `lucide-react@0.577.0` · upgrades aceptados dentro de SemVer minor
- Import canónico: `import { Plus, ArrowRight, Mail } from 'lucide-react'` — **nunca** `import * as Icons` (rompe tree-shaking)
- Reapertura de la decisión solo si Lucide pierde mantenimiento (>12 meses sin commits) o si NTS necesita >40 íconos custom

---

## 3. Escala semántica · 5 tokens (DS-029)

Tamaños atados al **rol del ícono**, no al pixel. Derivados de DS 03 (4px-base) y respetando WCAG 2.5.5 (target ≥44×44 px en mobile vía hitbox).

### Tokens oficiales

| Token | Valor | Uso |
|---|---|---|
| `--ic-xs` | 14 px | Acompañante de texto inline (link arrows, badge dots, helptxt). Ratio 0.875× respecto a body 16px |
| `--ic-sm` | 16 px | **Default UI**: nav links, button md/sm leading, FAQ chevron, badge leading, form helptxt icons. El más usado del sistema |
| `--ic-md` | 20 px | Button lg leading/trailing, card eyebrow icon, MobileSpeedDial buttons, contact section labels |
| `--ic-lg` | 24 px | Mobile menu trigger, theme toggle, language toggle, Hero CTA cluster (only secondary slot), feature card hero icons |
| `--ic-xl` | 32 px | Empty states, error pages, success card replacement (Forms DS-027), 404/500 illustrations placeholder |

> La escala salta 2/4/4/8 px. Saltos consecutivos respetan ratio mínimo 1.2× (legibilidad sin "casi-igual" entre tokens). 5 tokens son suficientes — agregar `--ic-xxl` es over-engineering: si necesitas >32 px, probablemente sea ilustración (DS 07), no ícono.

### Mapping por componente

| Contexto · Componente | Token | px | Justificación |
|---|---|---|---|
| Navbar link | `--ic-sm` | 16 | Misma altura visual que el label (text-sm). No compite con copy |
| Navbar mobile · trigger Menu/X | `--ic-lg` | 24 | Único affordance — debe leerse a 1m de distancia del thumb |
| Button · sm (h36) | `--ic-sm` | 16 | Padding interno 12 → ícono 16 mantiene aire visual |
| Button · md (h44) | `--ic-sm` | 16 | Default productivo · text-sm + ícono 16 = par tipográfico estable |
| Button · lg (h52) | `--ic-md` | 20 | Hero/CTA Band CTAs · ícono crece con la prominencia |
| Button · link (inline) | `--ic-xs` | 14 | Acompaña texto sin saltar visualmente — body 14–16px line |
| Card · eyebrow icon | `--ic-sm` | 16 | Eyebrow uppercase · ícono al nivel de la x-height |
| Card · feature/service plate | `--ic-lg` | 24 | Hero icon de la card · protagonismo por encima del label |
| FAQ · chevron expand/collapse | `--ic-sm` | 16 | Affordance secundario · no debe robar foco del título |
| Form · validation icon (success/error) | `--ic-sm` | 16 | Inline al campo · sm casa con label/helptxt |
| Form · submit loader (Loader2) | `--ic-md` | 20 | Reemplaza al label durante submitting · button lg → md |
| Badge · leading dot | `--ic-xs` | 14 | Badges son densos · 14 evita romper la altura del pill |
| MobileSpeedDial · theme/lang/contact | `--ic-md` | 20 | Buttons circulares h44 · 20 mantiene padding óptico |
| Empty state · 404/500/no results | `--ic-xl` | 32 | Punto focal de la card · acompañado por copy + CTA |

### Implementación CSS

```css
:root {
  --ic-xs: 14px;
  --ic-sm: 16px;
  --ic-md: 20px;
  --ic-lg: 24px;
  --ic-xl: 32px;
}
```

Tokens viven en `:root` al lado de DS 03.

---

## 4. Stroke + Color por contexto (DS-030)

### Stroke width · 1.5 uniforme

Lucide default es `strokeWidth=2`. NTS reduce a **1.5 para alinearse con la sensibilidad editorial de Space Grotesk + Inter** — menos peso visual, más cuidado tipográfico.

> Stroke 1.5 es la **única excepción permitida** — no se mezclan strokes en la misma vista.

**Excepciones documentadas**: ninguna en v1.0. Si un componente requiere stroke distinto (ej. bold para alta visibilidad en banner), se evalúa promover token `--ic-stroke-bold: 2` en versión futura — registro como decisión nueva, no como inline.

### Color por contexto · siempre token DS 02

| Contexto | Default | Hover | Active / Pressed | Disabled |
|---|---|---|---|---|
| Nav link | `--ink-2` light · `--d-ink-2` dark | `--ink` light · `--d-ink` dark | `--amber-500` | `--ink-4` · opacity .6 |
| Body link (inline) | `--sky-700` light · `--sky-500` dark (DS-012) | `--sky-800` light · `--sky-400` dark | hereda del padre · ícono `currentColor` | `--ink-4` · opacity .6 |
| Button · primary leading | `--navy-900` sobre fondo Amber 500 | Idem · subimos shadow no color | Idem · scale .98 | `--ink-3` · sobre Amber 200 |
| Button · secondary leading | `--ink` sobre Navy 50 (light) / `#fff` sobre Navy 700 (dark) | Idem · bg shift | Idem · scale .98 | `--ink-4` |
| Button · ghost leading | `--ink` light · `#fff` dark | Idem · border darken | Idem · scale .98 | `--ink-4` |
| Button · link (inline) | `--sky-700` light · `--sky-500` dark | `--sky-800` · underline | Idem hover | `--ink-4` |
| Status badge | Semántico DS-009 · success/warning/danger/info | — | — | — |
| Decorativo (eyebrow, divider, plate) | `--amber-500` en eyebrows · `--ink-3` en dividers · `--amber-700` en plates light | — | — | — |
| Form · validation success | `--success-500` · DS-009 | — | — | — |
| Form · validation error | `--danger-500` · DS-009 | — | — | — |

### Reglas heredadas

- **DS-010**: Sky y Electric nunca conviven en la misma instancia. Si un ícono es body link (Sky por DS-012), no convive con CTA Electric en la misma card.
- **DS-011**: Electric encapsulado a primary CTA + decorativo expresivo · nunca en íconos UI funcionales.

---

## 5. Mapping semántico canónico · 22 acciones (DS-031)

**Una sola elección de ícono por acción.** Si una acción tiene 2 candidatos, uno se canoniza y el otro se descarta como `DS-XNNN`.

El catálogo se ordena por familia: Navegación · Acciones · Estados · Comunicación · Sistema · Decorativo.

### 5.1 · Navegación · forward / back / external / expand

| Acción | Ícono Lucide | Token | Dónde aparece · regla |
|---|---|---|---|
| Forward / Next (CTA) | `ArrowRight` | `--ic-md` | Hero CTAs primary/ghost lg, CTA Band, Button md/lg con trailing slot. **Canonizado para CTAs**. ChevronRight descartado para este uso (DS-F005 backlog) |
| Forward inline (link) | `ArrowUpRight` | `--ic-xs` | Body link interno con énfasis ("Ver casos →") · footer portfolio links |
| Back / Previous | `ArrowLeft` | `--ic-sm` | Breadcrumbs (futuro), multi-step forms (extended variant DS-027), modal "Volver" buttons |
| External link | `ArrowUpRight` | `--ic-xs` | Links que abren a dominio externo · footer (LinkedIn, Twitter, GitHub), portfolio cards. **Mismo glifo que "forward inline" pero con `target="_blank"` + `rel="noopener"`** — el contexto del padre da el sentido. Reuso intencional |
| Expand (closed) | `ChevronDown` | `--ic-sm` | FAQ accordion estado cerrado (DS-026), select dropdown trigger, mega-menú toggle |
| Collapse (open) | `ChevronUp` | `--ic-sm` | FAQ accordion estado abierto · cualquier toggle. **Pareja obligatoria con `ChevronDown`** |

### 5.2 · Acciones · add / close / send

| Acción | Ícono Lucide | Token | Dónde aparece · regla |
|---|---|---|---|
| Add / New | `Plus` | `--ic-sm` | "Agregar campo" en forms, "Nuevo proyecto" en dashboard futuro, FAB add. No usar para "expand" — eso es ChevronDown |
| Close / Dismiss | `X` | `--ic-sm` en banners · `--ic-lg` en mobile menu | Modals, banners, mobile menu, toast dismiss. Hitbox 44×44 obligatorio aún cuando el glifo sea 16px |
| Send / Submit | `Send` | `--ic-md` | Forms submit button trailing slot (DS-027) · "Enviar mensaje". Reemplazado por `Loader2` durante submitting |
| Search | `Search` | `--ic-sm` | Search input leading slot · futuro nav search · blog filter. v1.1 |

### 5.3 · Estados · semánticos DS-009

| Estado | Ícono Lucide | Color | Dónde aparece · regla |
|---|---|---|---|
| Success | `CheckCircle2` | `--success-500` | Form validation success, toast success, status badge. **`CheckCircle2` sobre `Check`** — el círculo da contención visual |
| Warning | `AlertTriangle` | `--warning-500` | Cambios no guardados, deprecation notice, validation soft-warn |
| Error | `AlertCircle` | `--danger-500` | Form errors, submit ratelimit, toast error, validation hard-fail. **`AlertCircle` sobre `AlertTriangle`** — círculo = bloqueo; triángulo = atención |
| Info | `Info` | `--sky-700` | Helptxt informativo, tooltip trigger, FAQ schema reminder |
| Loading | `Loader2` (con `animate-spin`) | `currentColor` | Form submit state, async data load. Tailwind `animate-spin`. Reduced-motion: reemplazar por "…" texto o desactivar spin |

### 5.4 · Comunicación · sistema · decorativo

| Acción | Ícono Lucide | Token | Dónde aparece · regla |
|---|---|---|---|
| Email / Mail | `Mail` | `--ic-md` | Contact section labels, footer email link, MobileSpeedDial contact |
| Phone | `Phone` | `--ic-md` | Contact section, MobileSpeedDial. WhatsApp integration usa `MessageCircle` (variante separada en v1.1) |
| Calendar | `Calendar` | `--ic-md` | Calendly integration trigger, schedule CTA. v1.1 |
| Theme toggle (light) | `Sun` | `--ic-md` | MobileSpeedDial theme toggle estado actual=dark → muestra `Sun` (acción disponible) |
| Theme toggle (dark) | `Moon` | `--ic-md` | MobileSpeedDial theme toggle estado actual=light → muestra `Moon`. **Pareja obligatoria con `Sun`** |
| Language toggle | `Languages` | `--ic-sm` en navbar · `--ic-md` en MobileSpeedDial | ES/EN switch. **`Languages` sobre `Globe`** — Globe se confunde con "internacionalización geográfica" (region/timezone), Languages es específico de idioma. Globe descartado `DS-X009` |
| User / Profile | `User` | `--ic-sm` | Futuro nav login, profile menu trigger. v1.2 |
| Star / Rating | `Star` | `--ic-xs` en lista · `--ic-md` en review card | Reviews, ratings, testimonial cards |
| Decorativo · eyebrow plate | Pool curado · 6 glifos | `--ic-lg` | Service cards plates: `Sparkles` (premium), `Layers` (branding), `TrendingUp` (SEO), `Megaphone` (marketing), `Code2` (software), `Compass` (consultoría) |

### Pool decorativo (6 glifos cerrados)

`Sparkles` · `Layers` · `TrendingUp` · `Megaphone` · `Code2` · `Compass`

Reemplaza glifos unicode (`◆ ✦ ▲ ○ ▸ $`) usados actualmente en `Services.jsx` — ver auditoría hallazgo H-04. **No expansible sin decisión nueva** — agregar un 7° glifo requiere `DS-NNN` o promover a `DS-F006` (custom set).

---

## 6. Custom SVG · cuándo sí y cuándo no (DS-032)

Reglas para evitar drift. La pregunta correcta no es "¿puedo dibujar este SVG?" sino "**¿pertenece al alfabeto UI o al lenguaje expresivo?**".

### ✅ SÍ · custom permitido

| Caso | Ejemplos |
|---|---|
| Efectos expresivos únicos | Hero `OrbHero3D` Three.js · footer `TextHoverEffect` watermark con gradiente · ondas decorativas SVG (`services-proof-section`, `contact-final-section`) · isotipo · branding visual |
| Logo + isotipo + colorways | El sistema de logo vive en el doc del equipo de diseño · DS 06 referencia pero no documenta. **Excepción permanente** — no se canaliza por Lucide |

### ❌ NO · usar Lucide

| Caso | Justificación |
|---|---|
| Cualquier acción UI funcional | CTA leading/trailing, FAQ chevron, status (success/error/warn), navbar, form states, theme/lang toggles, badges, dropdowns. Si tiene rol funcional repetible, va por mapping §5 |
| Service plates / feature icons | Glifos unicode actuales (`◆ ✦ ▲ ○ ▸ $`) en `Services.jsx` son improvisación · migran al pool decorativo §5.4 (Sparkles, Layers, TrendingUp, etc) |

### Proceso · promover custom → librería

Si un SVG custom se reusa en ≥ 3 instancias y tiene rol funcional:

1. ¿Existe equivalente Lucide? **Si sí → migrar**
2. Si no → ¿amerita decisión `DS-XNNN` para agregar a pool custom? **Documentar y aprobar antes de implementar**

### Reduced-motion para custom expresivo

`OrbHero3D`, ondas animadas, watermarks con motion: reducidos o congelados bajo `prefers-reduced-motion: reduce`. **Custom no exime de DS-022** — aplica igual.

---

## 7. Accesibilidad

Reglas no negociables. WCAG 2.5.5 (target size), `aria-hidden` vs `aria-label`, hitbox vs glifo.

### `aria-hidden` vs `aria-label`

#### ✓ Decorativo · ícono acompaña label visible

```jsx
<button>
  Enviar
  <Send aria-hidden="true" />
</button>
```

El label "Enviar" lo lee el screen reader · el ícono es ornamento. `aria-hidden="true"` evita doble lectura ("Enviar enviar").

#### ✓ Significativo · ícono es único portador

```jsx
<button aria-label="Cerrar menú">
  <X />
</button>
```

No hay label visible · screen reader lee el `aria-label`. **Obligatorio** para close, theme toggle, language toggle, mobile menu trigger.

#### ✗ Mal · doble lectura

```jsx
<button aria-label="Enviar">
  Enviar
  <Send />
</button>
```

Screen reader lee "Enviar enviar". Falta `aria-hidden` en el ícono.

#### ✗ Mal · ícono significativo sin label

```jsx
<button>
  <X />
</button>
```

Screen reader lee "botón" sin contexto. Falla WCAG.

### Target size mínimo · WCAG 2.5.5 AAA / 2.5.8 AA

Cualquier ícono clickeable debe tener **hitbox ≥ 44×44 px en mobile**. El glifo visible puede ser 16, 20 o 24 px — el hitbox lo abraza con padding.

| Patrón | Hitbox | Glifo | Cómo se logra |
|---|---|---|---|
| FAQ chevron | El header completo es el target · ~64 px alto | 16 px | Click handler en `<button>` que envuelve título + chevron · hitbox heredado |
| Mobile menu trigger | 44×44 px | 24 px | Button h44 w44 con padding 10 → 24 ícono centrado |
| Theme/lang toggle (MobileSpeedDial) | 44×44 px circular | 20 px | Button h44 w44 rounded-full padding 12 → 20 ícono centrado |
| Close banner/modal | 44×44 px | 16 o 20 px | Button con padding generoso · hitbox abraza glifo pequeño |
| Star rating individual | 44×44 px en mobile · 32×32 desktop | 14 o 20 px | Spacing entre stars no resta del hitbox · usar label wrappers |

### Loading · reduced-motion

`Loader2` con `animate-spin` debe respetar `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-spin { animation: none; }
}
```

Alternativas:
- Reemplazar visualmente con texto "…" animado por opacity step (también reduced-friendly)
- Usar texto "Cargando…"
- **Nunca dejar ícono estático sin feedback alterno** — usuario reduced-motion también debe saber que algo carga

### Color contrast

Íconos significativos deben cumplir WCAG 1.4.11 (3:1 contraste mínimo) contra su fondo. Stroke 1.5 puede comprometer contraste vs fondo claro · validar con Stark/axe DevTools por contexto. Tokens DS 02 ya están auditados — usar sin HEX inline garantiza compliance.

---

## 8. Auditoría preventiva · 11 hallazgos

Inventario de íconos en producción contra DS 06 v0.1.

| Categoría | Cantidad |
|---|---|
| ✅ OK · mantener | 4 |
| 🔄 Migrar | 5 |
| ⚠ Tolerancia | 1 |
| 🆕 Clarificación / nuevo | 1 |

### Tabla de hallazgos

| # | Ubicación | Hallazgo · acción | Estado | Prioridad |
|---|---|---|---|---|
| H-01 | `resizable-navbar.tsx` · nav links | Nav links sin ícono trailing — tokens en orden. Stroke 1.5 ya aplicado vía className, color hereda `--ink-2` light | ✅ OK | — |
| H-02 | `FAQ.jsx` · línea 7–10 · accordion items | Glifos unicode `🚀 $ ⚡ ✦` como ícono leading de cada FAQ. Mezcla emoji + caracteres genéricos. **Decisión DS 06**: remover íconos del FAQ leading — el chevron expand/collapse es el único ícono permitido en accordion (DS-026 confirma) | 🔄 Migrar | **Alta** |
| H-03 | `FAQ.jsx` · chevron expand | Chevron Lucide ya usado · stroke 2 default · color amber gradient legacy en active. Migrar a stroke 1.5 + color sólido alineado con DS-026 | 🔄 Migrar | Media |
| H-04 | `Services.jsx` · línea 4–9 · service cards | Plates con glifos unicode `◆ ✦ ▲ ○ ▸ $`. Migrar al pool decorativo DS-031: `Sparkles` (premium), `Layers` (branding), `TrendingUp` (SEO), `Megaphone` (marketing), `Code2` (software), `Compass` (consultoría). Token `--ic-lg` 24px stroke 1.5 | 🔄 Migrar | **Alta** |
| H-05 | `Hero.jsx` · CTAs trailing | Si los CTAs Hero ya tienen `ArrowRight` stroke 1.5 + size 20 (`--ic-md`) — OK. Verificar consistencia entre primary y ghost | ✅ OK | — |
| H-06 | `contact-form.tsx` · form states | Validación success/error: si usa `Check` y `AlertCircle` mezclados → estandarizar a `CheckCircle2` + `AlertCircle` (par DS-031). Submit: confirmar `Send` trailing + `Loader2` `animate-spin` durante submitting | 🔄 Migrar | **Alta** |
| H-07 | MobileSpeedDial · theme/lang/contact | Theme toggle: confirmar pareja `Sun`/`Moon` según estado. Lang: migrar de `Globe` a `Languages` (DS-X009). Contact: `Mail` + `Phone` + `MessageCircle` (WhatsApp) en submenu | 🔄 Migrar | Media |
| H-08 | `Footer.jsx` · social links | Social icons (LinkedIn, Twitter/X, Instagram, GitHub) — Lucide `Linkedin`, `Twitter`, `Instagram`, `Github` cumplen brand guidelines básicas. Token `--ic-md` | ✅ OK | — |
| H-09 | `text-hover-effect.tsx` · footer watermark | SVG inline custom con gradientes. Custom expresivo permitido (DS-032 regla 1) | ⚠ Tolerar | — |
| H-10 | `hero-orb-3d.tsx` · Three.js orb | Custom expresivo · permitido (DS-032 regla 1). Aplica reduced-motion (DS-023 regla) | ⚠ Tolerar | — |
| H-11 | Step number circles · `process-sticky-section` | Círculos numerados con texto "01 02 03 04" — **no son íconos sino números tipográficos**. Quedan fuera de DS 06 · gobernados por DS 01 (Stat token) + DS 03 (radius full) + DS-025 (escala Amber) | 🆕 Clarificación | — |

### Resumen ejecutivo

**4 OK · 5 migraciones (3 alta, 2 media) · 1 tolerancia (custom expresivo) · 1 clarificación (step numbers no son íconos).**

Migraciones alta prioridad H-02, H-04, H-06 son las que más mueven la aguja visual del sitio actual — recomendado agruparlas en un solo PR.

---

## 9. Migraciones pendientes en código

**5 migraciones nuevas** introducidas por DS 06 (sumadas a las 35 acumuladas previas).

Total acumulado del manual: **40 migraciones + 2 retiros + 2 verificaciones**.

### Nuevas en DS 06

| # | Archivo | Cambio | Prioridad |
|---|---|---|---|
| 36 | `FAQ.jsx` (línea 7–10) | Remover glifos unicode `🚀 $ ⚡ ✦` del leading de cada FAQ item · solo chevron permitido | Alta |
| 37 | `FAQ.jsx` · chevron | Stroke 2 → 1.5 · color sólido (no gradient legacy) | Media |
| 38 | `Services.jsx` (línea 4–9) | Plates `◆ ✦ ▲ ○ ▸ $` → pool decorativo Lucide (`Sparkles`, `Layers`, `TrendingUp`, `Megaphone`, `Code2`, `Compass`) · token `--ic-lg` stroke 1.5 | Alta |
| 39 | `contact-form.tsx` | Validation: `Check`/`AlertCircle` mezclados → `CheckCircle2` + `AlertCircle` par DS-031 · submit: confirmar `Send` + `Loader2` con animate-spin | Alta |
| 40 | MobileSpeedDial | Lang `Globe` → `Languages` · confirmar pareja `Sun`/`Moon` según theme state · Contact submenu con `Mail` + `Phone` + `MessageCircle` | Media |

### Tokens nuevos en CSS / Tailwind config

Antes de aplicar las migraciones, agregar al `:root` o `tailwind.config.ts`:

```css
:root {
  --ic-xs: 14px;
  --ic-sm: 16px;
  --ic-md: 20px;
  --ic-lg: 24px;
  --ic-xl: 32px;
}
```

> Total acumulado del manual: 5 (DS 02) + 8 (DS 03) + 16 (DS 04) + 6 (DS 05) + 5 (DS 06) = **40 cambios** + 2 retiros + 2 verificaciones para tarea de desarrollo separada.

---

## 10. Decisiones de diseño

### DS-028 · Librería de íconos oficial · Lucide React
✅ **Aprobada** — 2026-05-05

`lucide-react ≥ 0.577.0` confirmado como librería oficial. Cumple los 7 criterios de DS-021 (CLI/copy-into-repo, Tailwind-first, catálogo suficiente, monoline 1-weight, stroke runtime, madurez, bundle bajo). Costo de migración cero — ya está instalado y usado.

**Marca**: consistencia compounding-interest sobre novedad por ícono · disciplina por design (1 weight) en lugar de flexibilidad invitando inconsistencia (6 weights de Phosphor).

**Alternativas descartadas**: Phosphor Icons (`DS-X008`) por 6 weights que invitan a inconsistencia · Tabler Icons (mismo costo de migración sin ganancia visual proporcional) · custom set (`DS-X009` interno — 22 íconos manuales para uso UI funcional es over-engineering).

### DS-029 · Escala semántica de tamaños · 5 tokens
✅ **Aprobada** — 2026-05-05

5 tokens atados al rol del componente: `--ic-xs` 14px · `--ic-sm` 16px · `--ic-md` 20px · `--ic-lg` 24px · `--ic-xl` 32px. Saltos 2/4/4/8 px respetan ratio mínimo 1.2× (legibilidad sin "casi-igual"). Mapping completo por componente en sección 3.

**Marca**: tamaño por rol, no por pixel · escala derivada de DS 03 (4px-base) · WCAG 2.5.5 cumplido vía hitbox separado del glifo.

**Alternativas descartadas**: escala numérica plana (12/16/20/24/28/32) sin semántica · agregar `--ic-xxl` (over-engineering: si necesitas >32 px es ilustración, no ícono) · tamaños por pixel sin token (caos de producción actual con 16/18/20/24 mezclados sin sistema).

### DS-030 · Stroke 1.5 uniforme + color por contexto via DS 02
✅ **Aprobada** — 2026-05-05

Stroke `1.5` uniforme en todo el sistema (Lucide default es 2) — alinea con sensibilidad editorial Space Grotesk + Inter. Color siempre como token DS 02 sin HEX inline. Tabla de color por contexto (nav, body, button×4, status, decorativo, form validation) con hover/active/disabled.

**Marca**: cuidado tipográfico editorial · disciplina cromática (cero HEX inline) · accesibilidad por defecto (tokens DS 02 ya auditados WCAG).

**Alternativas descartadas**: stroke 2 default (Lucide) — más bold/industrial, no alinea con la voz tipográfica · mezclar strokes según contexto (caos visual) · color HEX inline (rompe DS 02).

### DS-031 · Mapping semántico canónico · 22 acciones
✅ **Aprobada** — 2026-05-05

22 acciones canonizadas con un solo glifo cada una, agrupadas en 4 familias (Navegación, Acciones, Estados, Comunicación/Sistema/Decorativo). Pares obligatorios documentados: `Sun`/`Moon`, `ChevronDown`/`ChevronUp`, `CheckCircle2`/`AlertCircle`. Pool decorativo cerrado de 6 glifos para service plates (`Sparkles`, `Layers`, `TrendingUp`, `Megaphone`, `Code2`, `Compass`).

**Marca**: alfabeto visual cerrado y predecible · cero ambigüedad ("ChevronRight vs ArrowRight" cerrado para v1.0) · pool decorativo no expansible sin decisión nueva.

**Alternativas descartadas**: `ChevronRight` para CTAs (`DS-F005` backlog) — `ArrowRight` mejor comunica "forward" en CTAs · `Check` solo (sin círculo) — `CheckCircle2` da contención visual, evita confusión con dividers · `Globe` para language toggle (`DS-X009`) — confunde con region/timezone, `Languages` es específico · pool decorativo expansible — invita a service plates ad-hoc.

### DS-032 · Custom SVG · cuándo sí, cuándo no
✅ **Aprobada** — 2026-05-05

Reglas claras para evitar drift. **SÍ custom**: efectos expresivos únicos (orb hero, watermark footer, ondas decorativas) + logo/isotipo/colorways. **NO custom**: cualquier acción UI funcional (CTA leading, FAQ chevron, status, navbar, form states) → usar Lucide. Proceso de promoción custom → librería: ≥3 instancias + rol funcional → evaluar Lucide equivalente o decisión `DS-XNNN`. Reduced-motion (DS-022) aplica también a custom expresivo.

**Marca**: libertad creativa con propósito (custom = expresivo único) · disciplina UI funcional (cero drift) · proceso documentado para promoción.

**Alternativas descartadas**: custom libre por componente (caos: cada dev dibuja su X y su Plus) · prohibir custom totalmente (mata el lenguaje expresivo del proyecto: orb, watermark, ondas son identidad).

---

## 11. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-05 | DS-028 (Lucide React oficial) · DS-029 (escala 5 tokens) · DS-030 (stroke 1.5 + color por contexto) · DS-031 (22 acciones canónicas + 6 plates decorativos) · DS-032 (reglas custom SVG) · DS-X008 (Phosphor descartado) · DS-X009 (Globe → Languages) · DS-F005 (ChevronRight v1.1) · DS-F006 (custom service plates v1.2) · auditoría 11 hallazgos |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`00-implementation-strategy.md`](00-implementation-strategy.md) — arquitectura en 3 capas
- [`02-colors.md`](02-colors.md) — sistema cromático (color por estado)
- [`03-spacing-radii-shadows.md`](03-spacing-radii-shadows.md) — escala 4px-base que justifica los tamaños
- [`04-components-core.md`](04-components-core.md) — componentes que llevan slots de íconos
- [`05-patterns.md`](05-patterns.md) — patrones que usan íconos (FAQ chevron, Hero CTA, Forms states)
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
