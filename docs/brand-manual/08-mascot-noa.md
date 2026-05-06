# 08 · Mascota Noa (DS 08)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-05-05 |

> Sección 08 del Manual de Marca. Sistema de mascota del proyecto NTS · identidad, anatomía, 10 expresiones canónicas, implementación Lottie y reglas de uso. **Único lugar del manual donde el color Electric `#0400F0` tiene rol activo prolongado** (DS-010 regla 07).
>
> **Bloqueante para producción**: requiere los 10 archivos Lottie producidos (asset task separado, ver §9 H-05). Sin ellos el componente queda en stopgap aunque el manual esté cerrado.

---

## Contenido

1. [Identidad y personalidad (DS-033)](#1-identidad-y-personalidad-ds-033)
2. [Anatomía visual (DS-033)](#2-anatomía-visual-ds-033)
3. [Las 10 expresiones canónicas (DS-034)](#3-las-10-expresiones-canónicas-ds-034)
4. [Tokens de tamaño · 4 niveles (DS-035)](#4-tokens-de-tamaño--4-niveles-ds-035)
5. [Tokens cromáticos · 5 slots (DS-033)](#5-tokens-cromáticos--5-slots-ds-033)
6. [Implementación Lottie (DS-036)](#6-implementación-lottie-ds-036)
7. [Mapping cruzado con DS 05 patrones (DS-034)](#7-mapping-cruzado-con-ds-05-patrones-ds-034)
8. [Reglas de uso + accesibilidad (DS-037)](#8-reglas-de-uso--accesibilidad-ds-037)
9. [Auditoría preventiva · 8 hallazgos](#9-auditoría-preventiva--8-hallazgos)
10. [Migraciones pendientes en código](#10-migraciones-pendientes-en-código)
11. [Decisiones de diseño](#11-decisiones-de-diseño)
12. [Historial de cambios](#12-historial-de-cambios)

---

## 1. Identidad y personalidad (DS-033)

Noa es la **mascota narrativa** de NoaTechSolutions. No es un asistente, no es un avatar, no es un logotipo animado — **es un personaje**. Vive en los intersticios del producto: en el rincón del hero saludando, en el sidebar del blog pensando con el lector, en el momento exacto en que el formulario se envía y celebra. Su trabajo es **humanizar la fricción técnica**: cuando algo carga, cuando algo falla, cuando algo se logra.

Visualmente Noa es una sola forma: shell Navy redondeado con un corazón Amber que late en el centro y un ojo Sky que cambia según lo que mira. Todo lo demás (antena, brazos, glow Electric, lágrimas Sky) es opcional y aparece según la expresión. **La forma cabe en un círculo** — esa es la prueba: si una variante necesita salirse, no es Noa.

**Noa no habla. No tiene boca.** Comunica con el ojo, con la pose y con el ritmo del pulse. El silencio es deliberado: invita al lector a proyectar la voz que necesita, sin imponer un tono. Esto es importante para el bilingüismo del sitio (ES/EN) — Noa funciona idéntico en ambos idiomas porque no depende de palabras.

### Voz visual · adjetivos clave

| Adjetivo | Descripción |
|---|---|
| **Curiosa · atenta** | Mira antes de actuar. El ojo Sky se mueve antes que el cuerpo. Noa observa, calibra. Nunca llega encima del usuario — espera a que el usuario llegue a ella |
| **Cálida · cercana** | El heart Amber late despacio (2.5s/ciclo, ritmo respiratorio). Sugiere presencia viva sin intrusión. La calidez del Amber 500 contrasta con la frialdad técnica del Navy shell — esa tensión es el carácter de Noa |
| **Técnica · precisa** | Geometría limpia, no orgánica. Es un objeto digital, no un peluche. Bordes radiused pero no blob. Stroke 1.5 cuando aparece line work. Pertenece al mundo de Vercel/Linear, no al de Slack/Mailchimp |
| **Amable · discreta** | Aparece y se va sin pedir aplauso. Un loop, dos a lo más. No baila para llamar atención. Su valor es estar ahí cuando el usuario necesita un anclaje emocional — no protagonizar la página |

### Linaje visual · referencias deliberadas

| Referencia | Qué se toma · qué se rechaza |
|---|---|
| **Eve** (WALL·E, Pixar 2008) | Elegancia minimalista del shell ovalado · ojos Sky azulados como única expresión · forma que cabe en un círculo. **La mayor influencia** |
| **WALL·E** (Pixar 2008) | Fragilidad y warmth del personaje técnico · pero **rechazada** la estética industrial. Noa es la versión Eve, no la versión WALL·E |
| **Vercel Triangle / Linear arrow** | Geometría única reconocible · el "logo que también es mascota" sin ser ninguna de las dos. Noa toma esa idea de mark con personalidad latente |
| **BB-8** (Star Wars) | Lenguaje sin palabras · expresión por movimiento de cabeza/cuerpo · pero **rechazado** el mecanicismo droide · Noa es más suave |
| **GitHub Octocat** | Idea de mascota de marca técnica que aparece en moments y no satura. Pero **rechazada** la sobre-iconografía (versiones holiday/halloween) hasta v1.2 |

### Lo que NO es Noa

| Tropo rechazado | Por qué |
|---|---|
| 🚫 Robot tonto / cute genérico | Sin ojos kawaii saltones, sin sonrisa permanente, sin manos saludando todo el tiempo. Noa **no es Clippy** |
| 🚫 Asistente conversacional | No chatea, no propone acciones, no tiene burbuja de habla. Si el sitio necesita chatbot, eso es otro componente — Noa narra, no responde |
| 🚫 Mascota corporativa sin alma | No es el "amigo con casco" de una constructora ni el "gatito con corbata" de un banco. Tiene rol y momento — no aparece en cada esquina porque sí |
| 🚫 Reemplazo de UI | No clickeable como CTA principal. No es portadora única de información crítica. Si el form falla, el copy lo dice — Noa lo acompaña, no lo reemplaza |

---

## 2. Anatomía visual (DS-033)

Composición canónica de Noa · slots fijos y opcionales. Toda variante respeta esta estructura.

| Slot | Token | Descripción |
|---|---|---|
| **Shell** · cuerpo principal | `--noa-shell: var(--navy-500)` | Ellipse ratio 1:1.06 · radius interno equiv. `--r-xl` en proyección plana · cabe en círculo Ø160 a tamaño base |
| **Heart** · core latente | `--noa-heart: var(--amber-500)` | Disco central Ø22 a base 200 · `pulse --motion-duration-pulse 2500ms ease-in-out infinite` (DS-022) · pausa en hover · **slot fijo, siempre presente** |
| **Eye** · ojo expresivo | `--noa-eye: var(--sky-500)` | Disco Ø28 a base 200 con highlight blanco Ø8 desplazado +4,−4 · variable según expresión: single (default), dual (Curious, Love), squint (Focus, Building), closed (Sleep, Celebrate peak) · **slot fijo, forma variable** |
| **Antenna** · slot opcional | Stroke `var(--navy-700)` 3px linecap round + dot Ø10 `var(--amber-500)` | Aparece **sólo en**: Hello, Curious, Thinking, Invite. **Ausente en**: Focus, Building, Celebrate, Love, Oops, Sleep |
| **Glow** · accent Electric | `--noa-glow: var(--electric-500)` | Halo radial blur 24px alpha .35 detrás del shell · **único uso de Electric en motion del manual (DS-010 regla 07)** · aparece en: Celebrate (peak), Hello (entry), Love (peak) · nunca estático prolongado |

### Reglas de composición · invariantes

| # | Regla |
|---|---|
| 01 | **Forma cabe en círculo**. Cualquier variante (incluyendo arms en Celebrate) respeta el bounding circle. Si necesita salirse, no es Noa — es otra ilustración |
| 02 | **Heart siempre visible**. Aún en Sleep el heart late (más lento, 4s en vez de 2.5s) — la "vida" no se apaga |
| 03 | **Una sola eye color**. Sky 500. Nunca rojo, verde, multicolor. La emoción se transmite por **forma**, no por hue |
| 04 | **Stroke 1.5 cuando aparece line work** — alineado con DS-030 (Iconografía) |
| 05 | **Sin boca. Nunca.** La comunicación es por eye + pulse + motion · no por sonrisas/expresiones faciales tradicionales |
| 06 | **Sin sombra dura debajo** — Noa flota. Drop-shadow opcional `0 8 24 rgba(2,41,119,.18)` sutil para anclaje espacial, nunca cast realista |

---

## 3. Las 10 expresiones canónicas (DS-034)

Inventario cerrado · documentado originalmente en el UX-SEO Playbook · ahora con segments Lottie + triggers + duraciones.

| # | Expresión | Descripción visual |
|---|---|---|
| 01 | **Hello** | Saludo de entrada · antenna up, eye single, glow Electric brief |
| 02 | **Curious** | Discovery · antenna up, eye dual, ligera inclinación |
| 03 | **Focus** | Trabajo creativo · sin antenna, eye squint horizontal |
| 04 | **Building** | Construcción · sin antenna, eye bar, arms work animan |
| 05 | **Celebrate** | Logro · sin antenna, eyes cerrados, glow Electric peak, sparkles Amber |
| 06 | **Invite** | Llamado · antenna up, eye single, gesto hacia CTA |
| 07 | **Thinking** | Reflexión · antenna up, eye single, burbujas pensamiento Navy 300 |
| 08 | **Love** | Cariño · sin antenna, eye dual, corazón Amber overlay, glow Electric peak |
| 09 | **Oops** | Lamento · sin antenna, eye down, lágrima Sky cae cada 3s |
| 10 | **Sleep** | Descanso · sin antenna, eye closed, "z"/"Z" Navy 300 escalonadas |

### Specs técnicas por expresión · Lottie segments + trigger

| # | Expresión | Segment `[in, out]` | Loop | Duración | Trigger + condiciones de fallback |
|---|---|---|---|---|---|
| 01 | Hello | `[0, 60]` | loop | 2.0s | Page load · first paint Home. Glow Electric en frames 0–15 · pausa hover (DS-022) |
| 02 | Curious | `[60, 120]` | loop | 2.0s | IntersectionObserver threshold .4 · viewport-enter una vez · loops mientras visible |
| 03 | Focus | `[120, 180]` | loop | 2.0s | viewport-enter en hero `/servicios/diseno-web` y `/servicios/branding` · stop on idle 8s |
| 04 | Building | `[180, 270]` | loop | 3.0s | viewport-enter en hero `/servicios/desarrollo-software` · arms work animan en sub-loop |
| 05 | Celebrate | `[270, 360]` | one-shot | 3.0s | Submit success en form · `playSegments([270,360], true)` · al terminar queda en frame 360 estático · glow Electric peak frame 320 |
| 06 | Invite | `[360, 420]` | loop | 2.0s | viewport-enter en CTA Band final y `/contacto` hero · gesto hacia CTA en sub-loop |
| 07 | Thinking | `[420, 510]` | loop | 3.0s | Scroll progress ≥30% en `/blog/[slug]` · burbujas pensamiento aparecen escalonadas |
| 08 | Love | `[510, 570]` | one-shot | 2.0s | viewport-enter cada 4 reviews del carousel · corazón overlay sale frame 530–560 |
| 09 | Oops | `[570, 660]` | loop | 3.0s | Page render en `/404` y `/500` · lágrima Sky cae cada 3s |
| 10 | Sleep | `[660, 780]` | loop | 4.0s | Idle timeout ≥20s sin interacción · loading skeleton NTSsign · "Z" aparece escalonado · heart pulse desacelera a 4s |

> **Total animación**: 780 frames @ 30fps. Decisión técnica: **10 archivos individuales** (`noa-{expression}.json`) en lugar de master file de 780 frames. Ver §6 para justificación.

---

## 4. Tokens de tamaño · 4 niveles (DS-035)

Atados al rol de Noa en la sección, **no al pixel**. Soportan responsive vía `clamp()` en breakpoint mobile.

| Token | Valor | Uso recomendado |
|---|---|---|
| `--noa-sm` | 120 px | Sidebar blog (Thinking), Process step inline (CardSwap), CTA Band invite, FAQ home left col, reviews carousel inline |
| `--noa-md` | 180 px | Hero home (bottom-right floating), hero servicios secundarios (right column), NTSsign skeleton loading center |
| `--noa-lg` | 240 px | Form success state replacement (DS-027 success card center), thank-you page hero |
| `--noa-xl` | 320 px | 404 / 500 error pages center, empty states críticos sin contenido alternativo |

**Saltos**: 120 → 180 → 240 → 320 · ratios 1.5× / 1.33× / 1.33×.

### Responsive cap

En breakpoint **`<720px`** todos los tamaños se reducen al token inmediatamente menor (`--noa-xl → --noa-lg`, `--noa-lg → --noa-md`, etc) **excepto `--noa-sm` que se mantiene**.

Implementación: `clamp(120px, 18vw, 180px)` para los tamaños responsive-críticos.

---

## 5. Tokens cromáticos · 5 slots (DS-033)

Heredados de DS 02 sin HEX inline. **Único lugar del manual donde Electric tiene rol activo prolongado** (DS-010 regla 07).

| Slot | Token | Detalle |
|---|---|---|
| **Shell** · cuerpo principal | `--noa-shell: var(--navy-500)` | Navy 500 oficial (DS-008). Anclaje técnico. Contrasta con paper/dark mode sin cambiar — Noa se ve igual sobre fondo claro y oscuro |
| **Heart** · core latente | `--noa-heart: var(--amber-500)` | Amber 500 oficial (DS-005). Calidez · ritmo respiratorio. Mismo Amber del logo + CTAs primary — coherencia macro |
| **Eye** · ojo expresivo | `--noa-eye: var(--sky-500)` | Sky 500 oficial (DS-006). Único portador de color "vivo" en la cara. Muta forma según expresión, **nunca color** |
| **Glow** · accent Electric | `--noa-glow: var(--electric-500)` | **Único uso activo de Electric en el manual** · DS-010 regla 07. Halo radial blur 24px alpha .35 detrás del shell. Aparece en Hello (entry), Celebrate (peak), Love (peak). Nunca estático prolongado |
| **Outline** · stroke decorativo | `--noa-outline: var(--navy-700)` | Navy 700 para antenna line, arms en Building, line work mínimo. Stroke 1.5 alineado con DS-030. Sólo cuando aparece — no es slot fijo |

### Colores accesorios por expresión

| Expresión | Accesorio | Token + uso |
|---|---|---|
| Oops | Lágrima | `var(--sky-500)` · cae cada 3s · misma hue del eye, no color nuevo |
| Love | Corazón overlay | `var(--amber-500)` · sub-elemento side-right · misma hue del heart, no color nuevo |
| Celebrate | Sparkles | `var(--amber-500)` · 3 trazos cortos alrededor del shell · stroke 1.5 |
| Thinking | Burbujas pensamiento | `var(--navy-300)` opacity .5–.7 · escalonadas · neutro contemplativo |
| Sleep | "z" / "Z" | Tipografía Space Grotesk weight 500 · color `var(--navy-300)` · tamaños descendentes |

> **Regla absoluta**: los accesorios **no introducen colores nuevos**. Cada accesorio reusa Sky, Amber o Navy 300. Esto evita que el sistema cromático de Noa drift hacia "personaje multicolor" — la economía visual es deliberada.

---

## 6. Implementación Lottie (DS-036)

Reglas técnicas de producción y delivery. **`lottie-react` confirmado en NOA-159** · Rive descartado (`DS-X010`).

### Reglas de producción

| # | Regla técnica |
|---|---|
| 01 | **Renderer**: SVG default (mejor a11y + DOM inspeccionable). Canvas sólo si ≥5 loops simultáneos en viewport |
| 02 | **Peso máximo por archivo**: 35 KB sugerido · confirmado. Si supera 35 KB → refactor (simplificar curvas, reducir keyframes, usar shape repeat). **Hard limit: 50 KB** |
| 03 | **Master file vs split**: **10 archivos individuales** `noa-{expression}.json` en lugar de un master de 780 frames. Ventajas: lazy load por expresión, cache HTTP por archivo, peso individual <35 KB asegurado, sin overhead de cargar 780 frames cuando sólo se usa Hello en home |
| 04 | **Naming**: `public/noa/lottie/noa-{expression}.json` · expression en kebab-case (`noa-hello.json`, `noa-curious.json`, etc) |
| 05 | **Carga**: `lottie-react` con dynamic import por expresión + IntersectionObserver threshold .4 (LazyMotion pattern). No cargar JSON hasta que el container esté a 60% de viewport |
| 06 | **Control**: `useLottie()` hook · `play()`, `pause()`, `stop()`, `setSpeed()` · loop según tabla §3 |
| 07 | **Fallback estático**: cada expresión también vive como WebP 1200×800 en `public/noa/static/noa-{expression}.webp` · se renderiza bajo `prefers-reduced-motion: reduce` y como placeholder mientras carga el JSON |

### Snippet de referencia

```tsx
// app/components/noa-mascot.tsx · v2 (NOA-205 / NOA-269 sub-task F)
import { useLottie, useLottieInteractivity } from 'lottie-react';
import dynamic from 'next/dynamic';

type NoaExpression =
  | 'hello' | 'curious' | 'focus' | 'building' | 'celebrate'
  | 'invite' | 'thinking' | 'love' | 'oops' | 'sleep';

type NoaSize = 'sm' | 'md' | 'lg' | 'xl';

interface NoaProps {
  expression: NoaExpression;
  size?: NoaSize;          // default 'md'
  loop?: boolean;          // override default per expression
  trigger?: 'auto' | 'viewport' | 'idle' | 'hover';
  alt: string;             // REQUIRED — a11y
}

// Lazy import por expresión
const loadAnimation = (expr: NoaExpression) =>
  import(`/noa/lottie/noa-${expr}.json`);
```

### Comportamiento bajo `prefers-reduced-motion: reduce`

| Aspecto | Comportamiento |
|---|---|
| Lottie | **No reproducir**. Renderizar el WebP estático del primer frame en su lugar |
| Heart pulse | Desactivado incluso en el SVG inline de fallback (CSS animation con media query) |
| Glow Electric | **Removido** en estados estáticos — el halo blur sólo tiene sentido con motion. Sin él, queda un fondo plano que rompe la composición |
| Page-load triggers | Respetan reduced-motion globalmente · viewport-enter triggers cargan estático directo |

> **DS-022 regla heredada**: cuando reduced-motion está activo, las durations >200ms se truncan a 0; pero **Noa va más allá** — no se reproduce ninguna animación, no sólo se acortan.

---

## 7. Mapping cruzado con DS 05 patrones (DS-034)

Tabla canónica de qué expresión aparece en qué patrón, con qué tamaño, posición y comportamiento.

| Patrón DS 05 · variante | Expresión | Tamaño | Posición | Comportamiento |
|---|---|---|---|---|
| Hero `DS-023.A` · home lg | Hello | `--noa-md` | bottom-right floating | Page-load trigger · idle loop · hover dispara cross-fade a Curious por 2s y vuelve a Hello |
| Hero `DS-023.B` · `/servicios/diseno-web` | Focus | `--noa-md` | right column | viewport-enter · loop · stop on idle 8s |
| Hero `DS-023.B` · `/servicios/branding` | Focus | `--noa-md` | right column | Idem diseño-web · misma expresión Focus comparte el rol "trabajo creativo" |
| Hero `DS-023.B` · `/servicios/desarrollo-software` | Building | `--noa-md` | right column | viewport-enter · loop · arms work animan en sub-loop |
| CTA Band `DS-024.B` · final pre-footer | Invite | `--noa-sm` | left column | viewport-enter · loop · gesto hacia el CTA en sub-loop sincronizado |
| Process `DS-025.A` · sticky vertical | variable por step | `--noa-sm` | dentro CardSwap | Step 01 → Curious · 02 → Focus · 03 → Building · 04 → Celebrate · cross-fade 300ms entre expresiones |
| FAQ `DS-026.A` · 2-col home | Curious | `--noa-sm` | left col debajo eyebrow | Idle loop · pausa al expandir un FAQ item (focus del usuario en la pregunta) |
| Forms `DS-027.A/B` success state | Celebrate | `--noa-lg` | center · replacement card | One-shot al submit success · al terminar queda en frame 360 estático con heart pulse activo (DS-027 regla 04) |
| Error 404 / 500 | Oops | `--noa-xl` | center · empty state | Page render · loop · lágrima Sky cae cada 3s · CTA debajo es "Volver al inicio" |
| Blog `/blog/[slug]` sidebar | Thinking | `--noa-sm` | sidebar fixed | Aparece tras 30% scroll progress · loop · burbujas pensamiento escalonadas |
| Reviews carousel · testimonios | Love | `--noa-sm` | inline cada 4 reviews | viewport-enter por slot · one-shot · corazón overlay aparece y desaparece |
| NTSsign dashboard skeleton | Sleep | `--noa-md` | center loading | Idle 20s+ sin interacción · loop lento · heart pulse desacelera a 4s · despierta a Hello al detectar input |

**Cobertura**: 12 contextos productivos · 10 expresiones · todas las expresiones tienen al menos 1 home productiva. Sin overlaps de viewport (regla 02 §8).

---

## 8. Reglas de uso + accesibilidad (DS-037)

### 8 reglas de uso

| # | Regla | Detalle |
|---|---|---|
| 01 | **Una expresión por sección** | Nunca dos Noa con expresiones distintas en la misma sección. Si una sección necesita "doble Noa", una de las dos debe migrar a otro patrón o desaparecer |
| 02 | **Una Noa por viewport** | Excepción única: Reviews carousel que rota Love cada 4 reviews. Fuera de eso, máximo una instancia visible al mismo tiempo |
| 03 | **Nunca portadora única de info crítica** | Form success/error siempre acompañado de copy. Si el usuario no puede ver Noa (a11y, conexión lenta, reduced-motion), el mensaje sigue siendo claro por texto |
| 04 | **Encapsula Electric** (DS-010 regla 07) | El glow Electric solo aparece aquí. Si otro componente "necesita" Electric, no lo necesita — está usando rol de Noa |
| 05 | **Pausa loops perpetuos en hover** | DS-022 regla heredada: cualquier loop ≥3s pausa cuando el usuario hace hover sobre Noa. Excepto Sleep (idle indicator — pausarla rompe su sentido) |
| 06 | **Reduced-motion: WebP estático** | No se cae el componente · se renderiza el WebP del primer frame. Mantiene identidad visual sin movimiento. Heart pulse CSS también desactivado |
| 07 | **No clickeable como CTA principal** | Noa puede ser focus secundario de un click (Hello → Curious cross-fade), pero **nunca el CTA principal**. El CTA es Button · Noa lo acompaña |
| 08 | **No aparece en cada esquina** | Si la página no está en el mapping §7, Noa no aparece. Su valor depende de la escasez — saturarla la convierte en wallpaper |

### Accesibilidad · checklist obligatorio

| Aspecto | Regla |
|---|---|
| `alt` descriptivo | `alt="Noa, la mascota de NoaTechSolutions, [acción]"` · acción en gerundio · ejemplos: "saludando" (Hello), "celebrando" (Celebrate), "pensando" (Thinking), "lamentando un error" (Oops) |
| `role="img"` cuando es decorativa narrativa | `role="img"` + `aria-label` con la acción · alternativa a `alt` en SVG inline |
| `aria-hidden` cuando duplica copy | Si el copy dice "¡Mensaje enviado!" y Noa Celebrate está al lado, `aria-hidden="true"` en Noa para evitar doble lectura del screen reader |
| **Nunca como único indicador** | Form success: copy + Noa. Form error: copy + `AlertCircle` (DS-031) + Noa Oops opcional. Loading: spinner + texto + Noa Sleep opcional. **El estado nunca depende sólo del visual de Noa** |
| `prefers-reduced-motion` | WebP estático del primer frame · heart pulse off · glow Electric off. Identidad sí, motion no |
| `prefers-color-scheme` | Noa se ve igual en light y dark mode — Navy shell + Amber heart + Sky eye contrastan en ambos. **No hay variante "Noa dark"** |
| Hitbox no aplica | Noa no es clickeable (regla 07). Si en alguna variante futura se hace interactiva, hitbox ≥44×44 px (DS-006) |

---

## 9. Auditoría preventiva · 8 hallazgos

Inventario de la implementación stopgap (NOA-162) contra DS 08 v0.1 + plan de migración.

| Categoría | Cantidad |
|---|---|
| ✅ OK | 1 |
| 🔄 Migrar (alta) | 5 |
| 🔄 Migrar (media) | 1 |
| ⚠ Check | 1 |

### Tabla de hallazgos

| # | Ubicación · asset | Hallazgo | Estado | Prioridad |
|---|---|---|---|---|
| H-01 | `app/components/noa-mascot.tsx` · stopgap CSS | Implementación CSS animation flotante mientras se produce Lottie. Plan: mantener positioning + props API + fallback PNG/WebP · reemplazar el motor de animación por `lottie-react`. La interfaz pública del componente (`expression`, `size`, `alt`) se preserva | 🔄 Migrar | **Alta** |
| H-02 | Expresiones CSS actuales · idle, wave, point-right, thumbs-up, celebrate, think | El stopgap tiene 6 expresiones. Mapping a las 10 oficiales: idle→Hello (loop reposo), wave→Hello (entry), point-right→Invite, thumbs-up→Celebrate, celebrate→Celebrate, think→Thinking. **Faltan 5 expresiones por producir**: Curious, Focus, Building, Love, Oops, Sleep | 🔄 Migrar | **Alta** |
| H-03 | `public/noa/` · 3 PNG source 1536×1024 + 3 WebP 1200×800 | 3 source PNGs desde Figma `4Bv96hNRzdDdQ7vIsjWwMB`. Cubren idle/wave/celebrate básicos. Plan: usar como fallback estático prefers-reduced-motion + placeholder mientras carga Lottie. **Producción pendiente: 7 WebP adicionales** (Curious, Focus, Building, Invite frame, Thinking, Love, Oops, Sleep) + WebP del frame 360 de Celebrate | 🔄 Migrar | **Alta** |
| H-04 | Hook `useNoaScroll` con IntersectionObserver (NOA-162) | Hook actual maneja scroll-based triggers. Mantener · expandir: agregar `useNoaIdle` (timeout 20s para Sleep) y `useNoaSubmit` (escucha success de form para Celebrate). API ya alineada con el spec §6 | ✅ OK | — |
| H-05 | Lottie JSON files · ninguno producido aún | **0 de 10 Lottie files producidos**. Plan de producción: priorizar Hello (home hero) + Celebrate (form success) + Curious (FAQ) en sprint 1 · Focus + Building + Invite + Thinking en sprint 2 · Love + Oops + Sleep en sprint 3. Cada uno ≤35 KB validado pre-merge. **Bloqueante para v1.0 productivo** | 🔄 Migrar | **Alta** |
| H-06 | Color tokens del stopgap · HEX inline en CSS | El CSS actual usa colores HEX directos (`#022977`, `#ff9900`). Migrar a tokens DS 02 usando `var(--navy-500)`, `var(--amber-500)`, `var(--sky-500)`, `var(--electric-500)`. En el JSON Lottie los colores quedan como decimales 0–1 — documentar en el playbook de producción Lottie qué hex corresponde a qué token | 🔄 Migrar | Media |
| H-07 | Hardcoded size 200px en stopgap | El stopgap renderiza Noa a 200px fijo. Migrar a tokens `--noa-sm/md/lg/xl` · prop `size` en el componente. 200px no es ningún token — el más cercano es `--noa-md` 180px · ajustar consumidores actuales | 🔄 Migrar | Media |
| H-08 | Otros componentes mencionando Noa · grep producción | Búsqueda recomendada: `grep -rn "noa\|Noa\|mascot\|Mascot" en app/`. Esperado: import de `NoaMascot` en home Hero y posiblemente en CTA Band. Cada consumidor debe migrar a la nueva API `expression="hello"` + `size="md"`. Sin breaking changes si la prop `expression` se mantiene como string | ⚠ Check | Media |

### Resumen ejecutivo

**1 OK · 5 alta prioridad · 2 media · 1 check.**

**Bloqueante para v1.0 productivo**: producción de los 10 Lottie files (H-05) — sin ellos el componente queda en stopgap aunque el manual esté cerrado. Plan en 3 sprints documentado en H-05.

---

## 10. Migraciones pendientes en código

**7 work items nuevos** introducidos por DS 08 (sumados a las 40 acumuladas previas).

Total acumulado del manual: **47 + 2 retiros + 2 verificaciones**.

### Nuevas en DS 08

| # | Archivo / asset | Cambio | Prioridad |
|---|---|---|---|
| 41 | `app/components/noa-mascot.tsx` | Migrar de CSS animation a `lottie-react` · preservar props API (`expression`, `size`, `alt`) · agregar `trigger` prop · expandir hooks (`useNoaIdle`, `useNoaSubmit`) | Alta |
| 42 | `public/noa/lottie/` (nueva) | **Producir 10 archivos Lottie JSON** (≤35KB cada uno) · sprint 1: Hello, Celebrate, Curious · sprint 2: Focus, Building, Invite, Thinking · sprint 3: Love, Oops, Sleep. **Bloqueante v1.0** | Alta · blocker |
| 43 | `public/noa/static/` (nueva) | Producir 10 WebP estáticos (1200×800) para fallback `prefers-reduced-motion` · 3 ya existen, **7 pendientes** | Alta |
| 44 | Mapping CSS legacy → 10 oficiales | Reemplazar expresiones del stopgap (idle/wave/point-right/thumbs-up/celebrate/think) por las 10 canónicas en consumidores | Alta |
| 45 | Color tokens de Noa · HEX → tokens DS 02 | `noa-mascot.tsx` HEX inline (`#022977`, `#ff9900`) → `var(--navy-500)`, `var(--amber-500)`, etc · documentar mapping HEX↔token en playbook de producción Lottie | Media |
| 46 | Size hardcoded 200px → tokens `--noa-N` | Migrar `200px` fijo a sistema de 4 tokens (`--noa-sm` 120 / `--noa-md` 180 / `--noa-lg` 240 / `--noa-xl` 320) · ajustar consumidores | Media |
| 47 | Grep consumidores de NoaMascot | Audit de imports de `NoaMascot` en `app/` · cada consumidor migra a nueva API `expression` + `size` · sin breaking changes esperados | Check |

### Tokens nuevos a agregar en CSS

```css
:root {
  /* DS-035 · sizes */
  --noa-sm: 120px;
  --noa-md: 180px;
  --noa-lg: 240px;
  --noa-xl: 320px;

  /* DS-033 · color slots (alias semánticos) */
  --noa-shell:   var(--navy-500);
  --noa-heart:   var(--amber-500);
  --noa-eye:     var(--sky-500);
  --noa-glow:    var(--electric-500);
  --noa-outline: var(--navy-700);
}
```

> **Total acumulado del manual**: 5 (DS 02) + 8 (DS 03) + 16 (DS 04) + 6 (DS 05) + 5 (DS 06) + 7 (DS 08) = **47 cambios** + 2 retiros + 2 verificaciones para tarea de desarrollo separada (NOA-269).

---

## 11. Decisiones de diseño

### DS-033 · Identidad y anatomía de Noa
✅ **Aprobada** — 2026-05-05

Identidad codificada: shell Navy + heart Amber + eye Sky · cabe en círculo · sin boca · linaje Eve/Vercel/Octocat. Anatomía: 5 slots (Shell, Heart fijo, Eye fijo forma variable, Antenna opcional, Glow Electric opcional). 6 reglas de composición invariantes (cabe en círculo, heart siempre visible, una eye color, stroke 1.5, sin boca, sin sombra dura). 5 tokens cromáticos heredados de DS 02 · accesorios reusan colores existentes (sin paleta nueva).

**Marca**: personaje narrativo (no asistente, no avatar, no logo) · curiosa/cálida/técnica/amable · linaje Eve/Vercel/Octocat · rechazo explícito de tropos cute genéricos.

**Alternativas descartadas**: Noa con boca (rompe silencio deliberado, condiciona idioma) · Noa con paleta multicolor (drift hacia personaje "kawaii") · variante "Noa dark mode" (rompe coherencia macro — el Navy shell ya funciona en ambos modos) · Noa industrial estilo WALL·E (pertenece al mundo Slack/Mailchimp, no Vercel/Linear).

### DS-034 · 10 expresiones canónicas con mapping
✅ **Aprobada** — 2026-05-05

10 expresiones cerradas (Hello, Curious, Focus, Building, Celebrate, Invite, Thinking, Love, Oops, Sleep) con segments Lottie `[in, out]`, loop/one-shot, duraciones y triggers exactos. Mapping cruzado con DS 05 cubre 12 contextos productivos · todas las expresiones tienen ≥1 home productiva. Sin overlaps de viewport.

**Marca**: alfabeto emocional cerrado · cada expresión con momento exacto · economía narrativa (no aparece en cada esquina).

**Alternativas descartadas**: master file de 780 frames (overhead de cargar 780 frames cuando sólo se usa Hello) · expresiones libres por componente (caos: cada dev/diseñador agrega su propia variante) · expresiones sin trigger explícito (loops sin razón saturan).

### DS-035 · Tokens de tamaño · 4 niveles
✅ **Aprobada** — 2026-05-05

4 tokens semánticos: `--noa-sm` 120 / `--noa-md` 180 / `--noa-lg` 240 / `--noa-xl` 320. Saltos 1.5×/1.33×/1.33×. Responsive cap por breakpoint <720px (tokens reducen al inmediatamente menor, excepto `sm`).

**Marca**: tamaño por rol, no por pixel · responsive sin break visual · escala derivada del role en la sección.

**Alternativas descartadas**: tamaño único fijo (Noa pierde adaptabilidad en error pages vs sidebar) · 5+ tokens (over-engineering · 4 cubren todos los contextos productivos del mapping §7) · escala lineal sin saltos perceptuales (saltos 1.5×/1.33× respetan ratio mínimo de discriminación visual).

### DS-036 · Implementación Lottie · 10 archivos split
✅ **Aprobada** — 2026-05-05

`lottie-react` confirmado como motor (NOA-159 cerrada formalmente como `DS-X010`). 10 archivos individuales `noa-{expression}.json` en lugar de master file. Peso ≤35 KB por archivo · hard limit 50 KB. SVG renderer default · canvas si ≥5 loops simultáneos. Lazy load con IntersectionObserver. WebP estático fallback para `prefers-reduced-motion`. Heart pulse off bajo reduced-motion.

**Marca**: performance disciplinada · accesibilidad por defecto · cache HTTP optimizado.

**Alternativas descartadas**: Rive (`DS-X010` · NOA-159) — curva de aprendizaje, comunidad menor, archivos `.riv` más pesados · master file (overhead) · canvas renderer default (peor a11y, DOM no inspeccionable) · sin fallback estático (rompe reduced-motion).

### DS-037 · 8 reglas de uso + a11y obligatorio
✅ **Aprobada** — 2026-05-05

8 reglas: una expresión por sección, una Noa por viewport (excepto reviews carousel), nunca portadora única de info crítica, encapsula Electric (DS-010 regla 07), pausa loops en hover, reduced-motion = WebP estático, no clickeable como CTA principal, no aparece en cada esquina. Checklist a11y obligatorio: `alt` descriptivo en gerundio, `role="img"`, `aria-hidden` cuando duplica copy, nunca único indicador, reduced-motion soportado, igual en light/dark mode.

**Marca**: discreción narrativa · accesibilidad sin sacrificio · escasez como valor (saturación = wallpaper).

**Alternativas descartadas**: Noa clickeable como CTA (rompe rol narrativo · CTA es Button) · Noa como único indicador de form state (a11y comprometida) · Noa en cada esquina del sitio (saturación · pierde valor narrativo) · variante "Noa dark mode" (innecesaria · paleta funciona en ambos modos).

---

## 12. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-05 | DS-033 (identidad + anatomía + tokens cromáticos) · DS-034 (10 expresiones canónicas + mapping 12 contextos) · DS-035 (4 tokens tamaño) · DS-036 (Lottie 10 archivos split + ≤35KB + WebP fallback) · DS-037 (8 reglas + a11y) · DS-X010 (Rive descartado formalmente desde NOA-159) · DS-F007 (expresiones extra v1.2) · DS-F008 (eye-tracking cursor v1.1) · auditoría 8 hallazgos · bloqueante v1.0: producción de 10 Lottie files |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`02-colors.md`](02-colors.md) — DS-010 regla 07 (Electric encapsulado a Noa)
- [`04-components-core.md`](04-components-core.md) — DS-022 motion tokens · DS-027 form success state
- [`05-patterns.md`](05-patterns.md) — patrones donde aparece Noa (Hero, CTA Band, Process, FAQ, Forms, error pages)
- [`06-iconography.md`](06-iconography.md) — DS-030 stroke 1.5 alineado con line work de Noa
- `app/components/noa-mascot.tsx` — implementación stopgap actual (NOA-162) · target migración (NOA-269)
- **NoaTech UX-SEO Playbook** — documento estratégico aparte · 10 expresiones de Noa originalmente catalogadas allí
