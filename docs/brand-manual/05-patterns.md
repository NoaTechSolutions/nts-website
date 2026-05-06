# 05 · Patrones (DS 05)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-05-05 |

> Sección 05 del Manual de Marca. **5 patrones · 1 sistema.** Hero, CTA Band, Process, FAQ y Forms canonizados como patrones del DS — anatomía, variantes oficiales, motion y reglas. Auditoría preventiva contra producción (13 hallazgos). Puente directo con el UX-SEO Playbook: él compone, DS 05 define.

---

## Contenido

1. [Filosofía · patrón ≠ componente ≠ página](#1-filosofía--patrón--componente--página)
2. [Hero · DS-023](#2-hero--ds-023)
3. [CTA Band · DS-024](#3-cta-band--ds-024)
4. [Process · DS-025](#4-process--ds-025)
5. [FAQ · DS-026](#5-faq--ds-026)
6. [Forms · DS-027](#6-forms--ds-027)
7. [Auditoría preventiva · producción](#7-auditoría-preventiva--producción)
8. [Puente con el UX-SEO Playbook](#8-puente-con-el-ux-seo-playbook)
9. [Migraciones pendientes en código](#9-migraciones-pendientes-en-código)
10. [Decisiones de diseño](#10-decisiones-de-diseño)
11. [Historial de cambios](#11-historial-de-cambios)

---

## 1. Filosofía · patrón ≠ componente ≠ página

Un **patrón** es una composición narrativa de componentes que cumple un rol en la experiencia: bienvenida, conversión, prueba, objeción, captura.

| Capa | Define | Ejemplo |
|---|---|---|
| **DS 04** · Componentes | Átomos del sistema | Button, Card, Input, Badge |
| **DS 05** · Patrones | Composiciones narrativas | Hero, CTA Band, Process, FAQ, Forms |
| **UX-SEO Playbook** | Orquestación por página | "Home = Hero lg + CTA proof + Process + FAQ + CTA final" |

Cada patrón declara: anatomía → composición → variantes → motion → reglas → auditoría.

| Patrón | Decisión | Variantes |
|---|---|---|
| Hero | DS-023 | 3 (lg / md / compact) |
| CTA Band | DS-024 | 2 contextos (proof / final) declarables |
| Process | DS-025 | 1 (sticky vertical) + 1 backlog (timeline horizontal · DS-F004) |
| FAQ | DS-026 | 2 (2-col / 1-col centered) |
| Forms | DS-027 | 2 (short 3 campos / extended 5–7 campos) |

---

## 2. Hero · DS-023

Primer patrón que ve el usuario. Carga la promesa de marca y abre la jerarquía visual de la página. Producción tiene un solo Hero (full-viewport) — DS 05 lo canoniza y agrega `md` y `compact` para páginas internas.

### Anatomía y composición

**Slots** (orden top→bottom):

| # | Slot | Detalle |
|---|---|---|
| 1 | Eyebrow | Badge eyebrow Amber (DS-020) sobre H1 · max 1 por hero · no vibra con rotating word |
| 2 | H1 + rotating word | Space Grotesk 500 · `clamp(3rem, 7vw, 7rem)` · palabra rotativa Amber 500 con `aria-live="polite"` |
| 3 | Subtitle | Inter 400 · 18–20px · max 58ch · color Ink 2 light / `rgba(255,255,255,.72)` dark |
| 4 | CTA cluster | 1 primary lg + 1 ghost lg + 1 link opcional · primary siempre con modality (pulse en home, base en `/servicios/[slug]`) |
| 5 | Stats grid | 4 columnas desktop · 2×2 tablet · 1 col mobile · NumberTicker on viewport-enter |
| 6 | Hero Orb 3D | Three.js · emissive Electric (DS-011 wow encapsulado) · solo en variante lg · off bajo prefers-reduced-motion |
| 7 | Hero glow | Radial gradients en esquinas + blur 60px · decorativo, no afecta layout |

**Container**: full-viewport · `min-height: 100svh` con fallback `100dvh` · padding top `--sp-10` (128) / bottom `--sp-9` (96) en lg.

### Composición · qué componentes DS 04 entran

| Slot | Componente DS 04 | Tokens · variante / tamaño / modality |
|---|---|---|
| Eyebrow | Badge · eyebrow | color `--amber-500` · font `--fm` 11px · letter-spacing `0.18em` |
| CTA principal | Button · primary lg | modality `pulse` (home) / `base` (`/servicios`) · radius `--r-pill` · `--sh-2` |
| CTA secundario | Button · ghost lg | modality `orbit` opcional · sobre dark hereda border `rgba(#fff,.2)` |
| CTA terciario | Button · link md | color `--sky-700` light / `--sky-500` dark (DS-012) |
| Stats | Type · Stat token | font `--fd` 500 · `tabular-nums` · eyebrow Amber arriba |
| Orb 3D | Custom · Three.js | emissive `--electric-500` · solo lg · prefers-reduced-motion: reduce → static |

### 3 variantes oficiales

| Variante | Uso | Características |
|---|---|---|
| **DS-023.A · lg** | Home / landings | Full-viewport · Orb 3D · 4 stats · Primary lg `modality=pulse` · ghost lg `modality=orbit` · rotating word. **Una vez por sitio** |
| **DS-023.B · md** | `/servicios/[slug]` | 60vh · sin Orb · 0–2 stats · Primary lg base · ghost md base · imagen o ilustración temática a la derecha · sin rotating word |
| **DS-023.C · compact** | `/blog/[slug]`, `/nosotros`, legales | ~36vh · solo eyebrow + H1 + subtitle + breadcrumb opcional · sin CTA cluster, sin stats · background Paper 1 o Navy 500 |

### Motion · DS-022

| Capa | Token / duration / ease | Notas |
|---|---|---|
| Entry sequence | `slow 280ms` · `ease-emphasis` · stagger 80ms | Eyebrow → H1 → subtitle → CTAs → stats. Una sola vez en page-load |
| Rotating word | `base 180ms` · `ease-overshoot` | Fade + 4px rise. Loop 3s default. Pausa en `:hover` sobre H1 |
| Primary lg pulse | `pulse 2500ms` · `ease-pulse infinite` | Glow Amber + scale subtle. Pausa en hover, vuelve al estado base |
| Ghost lg orbit | `orbit 3000ms` · linear infinite | Línea/dot orbital. Pausa en hover |
| NumberTicker | `slow 280ms` · `ease-emphasis` | Trigger on viewport-enter · una vez · delay stagger 60ms entre stats |
| Orb 3D | `orbit 3000ms` · custom GL loop | Off bajo reduced-motion. Reemplazado por imagen estática |

### Reglas · Hero

| # | Regla | Detalle |
|---|---|---|
| 01 | **Un Hero por página** | Nunca dos hero consecutivos. Para "segundo intro" usar Section starter (eyebrow + H2), no otro Hero |
| 02 | **Variante por contexto** | lg solo en home/landings · md en `/servicios/[slug]` · compact en blog/legales/nosotros · no mezclar |
| 03 | **CTA cluster ≤ 3** | Primary + ghost + link como máximo. Nunca dos primary (compiten). Primary lg siempre con modality en lg |
| 04 | **Orb 3D solo en lg** | Reservado a Hero lg como momento wow. md/compact lo sustituyen por imagen temática estática o nada |
| 05 | **H1 mínimo 36px mobile** | DS-F003 vigente. `clamp()` con floor 36px (md), 48px (lg). Subtitle nunca > 20px |
| 06 | **Reduced-motion respetado** | Pulse, orbit y Orb se desactivan. Rotating word fija última palabra. Entry stagger reducido a fade |

---

## 3. CTA Band · DS-024

Banda full-bleed que rompe el flujo neutral del cuerpo y empuja a conversión. Producción tiene 2 instancias (`services-proof-section` y `contact-final-section`) — DS 05 las canoniza como **una sola anatomía con 2 contextos declarables**, no como 2 patrones distintos.

### Anatomía y composición

| # | Slot | Detalle |
|---|---|---|
| 1 | Eyebrow pill | Pill outline o soft Amber · max 1 por banda · reemplaza al "eyebrow textual" cuando el contexto necesita más peso |
| 2 | H2 bicolor | Space Grotesk 500 · `clamp(2rem, 4vw, 3.5rem)` · palabra clave en Amber 500 (no gradient) · una palabra Amber |
| 3 | Subtitle | Inter 400 · 18px · color `rgba(255,255,255,.72)` · max 58ch |
| 4 | CTA cluster | 1 primary lg `modality=pulse` + 1 ghost lg dark `modality=orbit` (opcional) · sin link · sin tercer CTA |
| 5 | BackgroundBoxes | Aceternity · radial mask al centro · electric encapsulado bajo DS-011 regla 07 · off bajo reduced-motion |
| 6 | Onda SVG | Decorativa · top o bottom (no ambas) · stroke `rgba(#fff,.08)` · connector visual con la sección adyacente |
| 7 | Price (opcional) | AuroraText · solo en contexto final con pricing visible · variante mono-tono Amber, no gradient multicolor |

**Container**: full-bleed (rompe grid 1180) · padding y `--sp-9` desktop / `--sp-7` mobile · background Navy 500 (proof) o Navy 600 (final).

### 2 contextos canónicos

> **Decisión clave**: `proof` y `final` NO son patrones distintos. Comparten anatomía idéntica. El contexto se declara con un prop (`variant="proof|final"` en React, `data-context="proof|final"` en HTML), no se duplica el patrón.

| Contexto | Uso | Diferencias acotadas |
|---|---|---|
| **DS-024.A · proof** | Post-grid de servicios / casos | Background `--navy-500` · eyebrow "DEMOSTRADO" · H2 con palabra Amber · 1 primary lg pulse "Ver casos" · sin price · onda al **top** conecta con grid de proyectos · 1 por home máx |
| **DS-024.B · final** | Pre-footer | Background `--navy-600` (un step más profundo) · pills eyebrow ("Disponibilidad", "Setup gratis") · price AuroraText opcional · CTA mailto o form anchor · onda al **bottom** cierra la página antes del footer · 1 por página, siempre |

### Motion · DS-022

| Capa | Token / duration / ease | Notas |
|---|---|---|
| Entry on-scroll | `slow 280ms` · `ease-emphasis` · stagger 100ms | Eyebrow → H2 → subtitle → CTAs · trigger al 30% de viewport-enter |
| Primary lg pulse | `pulse 2500ms` · infinite | **Obligatorio** en CTA Band. Pausa en hover |
| Ghost lg orbit (opt) | `orbit 3000ms` · linear infinite | Solo si hay 2 CTAs. En 1-CTA layouts se omite |
| BackgroundBoxes | `orbit 3000ms` · `ease-pulse` | Hover-aware (boxes brillan al hover). Off bajo reduced-motion |
| Onda SVG | `slow 280ms` · `ease-emphasis` · path draw | One-shot al viewport-enter. Sin loop |

### Reglas · CTA Band

| # | Regla | Detalle |
|---|---|---|
| 01 | **Nunca dos CTA Band consecutivas** | Mínimo 1 sección de cuerpo (Process, FAQ, Reviews) entre dos bandas. Dos seguidas anestesian la conversión |
| 02 | **Una primary por band** | Ghost dark opcional. Nunca dos primary lg compitiendo. Si la página necesita 2 acciones, jerarquizar: primary + ghost |
| 03 | **Onda en uno solo de los lados** | Top o bottom — nunca ambos. La onda conecta visualmente con UNA sección adyacente, no encierra la banda como caja |
| 04 | **Pulse obligatorio en primary** | CTA Band es el momento "alta intención". Modality pulse no es opcional aquí (a diferencia del Hero, donde puede ser base) |
| 05 | **Boxes solo en dark** | BackgroundBoxes vive sobre Navy. Si en el futuro hay CTA Band light, se sustituye por hairline grid + radial mask Paper |
| 06 | **Price solo en contexto final** | AuroraText mono-tono Amber · solo si la página comunica precio explícito. `/servicios/[slug]` sí · home no |

---

## 4. Process · DS-025

Pin sticky con CardSwap GSAP que narra los 4 pasos del flujo de trabajo (descubrimiento → diseño → desarrollo → entrega). Producción tiene un array de accent colors heredado del legacy `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` que rompe DS-011 — migración pendiente a escala Amber 500/600/700/800.

### Anatomía y composición

| # | Slot | Detalle |
|---|---|---|
| 1 | Eyebrow + H2 | Section starter estándar (Eyebrow Amber + H2 display 500) · max 24ch en H2 |
| 2 | Sticky left | Pin GSAP `position: sticky; top: var(--sp-7)` · contiene Step badge + title + detail. Cambia de step al avanzar el scroll de la columna derecha |
| 3 | Step badge | Badge step (DS-020) · escala Amber: step 1 → `--amber-500`, 2 → `--amber-600`, 3 → `--amber-700`, 4 → `--amber-800`. Migración desde array legacy |
| 4 | Step title | Space Grotesk 500 · `clamp(1.5rem, 2.5vw, 2.25rem)` · color Ink 0 |
| 5 | Step detail | Inter 400 · 16px · max 52ch · 2–3 líneas · sin lista, sin sub-título — pura prosa |
| 6 | CardSwap right | Card Dark (DS-018) · `backdrop-filter: blur(8px)` sobre Navy 600 · radius `--r-xl` · padding `--sp-6` · animación GSAP swap con `--motion-duration-slow` + `ease-emphasis` |
| 7 | CTA opcional | Ghost lg al final del proceso · "Ver caso completo →" · enlace a `/casos/[slug]` · no primary aquí (la página ya tiene su CTA Band) |

**Container**: full-width sobre Paper 0 · padding y `--sp-9` · grid 1180 · sin full-bleed.

### Variante oficial · v1.0

| Variante | Estado | Uso |
|---|---|---|
| **DS-025.A · sticky vertical** | ✅ Aprobada v1.0 | Pin GSAP · CardSwap · 4 pasos · Step Amber escala. Variante única en v1.0. Cubre home, `/servicios/[slug]` y `/nosotros` (capítulo "Cómo trabajamos") |
| **DS-F004 · timeline horizontal** | 📌 Backlog v1.1 | Para uso futuro (proceso de 6+ pasos o storytelling tipo case study). Scroll horizontal con snap. No entra en v1.0 |

### ⚠ Migración obligatoria · DS-011

El array `accentColors = ["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` en `process-sticky-section.tsx` rompe:
- DS-010 regla 07 (Electric encapsulado, no UI estática recurrente)
- DS-010 regla 03 (Sky+Electric mutuamente excluyentes)
- mezcla 4 roles cromáticos en un componente "recurrente"

**Migración aprobada en DS-011**: pasar a escala Amber `[--amber-500, --amber-600, --amber-700, --amber-800]`. Mantiene jerarquía visual progresiva (más oscuro = más avanzado) sin romper roles.

### Motion · DS-022

| Capa | Token / duration / ease | Notas |
|---|---|---|
| Sticky pin | CSS `position: sticky` + GSAP ScrollTrigger | Top offset `--sp-7` (48). Unpins al salir de la sección |
| Step transition | `slow 280ms` · `ease-emphasis` | Title + detail crossfade al cambiar de step. Step badge re-tinte |
| CardSwap | `slow 280ms` · `ease-emphasis` · GSAP timeline | Card sale top, entra bottom. Solapamiento 120ms para evitar gap |
| Backdrop blur | CSS estático · sin animación | 8px blur fijo. Animar blur degrada FPS |
| CTA hover | `base 180ms` · `ease-emphasis` | Ghost lg estándar. Sin modality (no es jerárquico) |

### Reglas · Process

| # | Regla | Detalle |
|---|---|---|
| 01 | **4 pasos máx en sticky vertical** | Más de 4 sobrecarga el pin. Si el proceso tiene 5+ pasos, fusionar o promover a timeline horizontal (DS-F004) |
| 02 | **Step Amber escala 500→800** | No usar Electric, Sky, ni colores libres. La escala Amber comunica progreso (oscurecer = avanzar) sin romper DS-010 |
| 03 | **CardSwap solo aquí** | Comportamiento exclusivo de Process. No reutilizar CardSwap en grids de servicios o testimonios — pierde semántica |
| 04 | **CTA opcional, ghost** | Process no es momento de conversión — es de explicación. Si hay CTA, ghost lg → caso o servicio. Nunca primary aquí |
| 05 | **Visuales placeholder OK** | Mascota Noa, mock UI, ilustración temática. No fotos genéricas de stock. Si no hay asset, placeholder geométrico es preferible |
| 06 | **Reduced-motion: stack vertical** | Pin se desactiva, CardSwap se reemplaza por stack lineal. El usuario ve los 4 pasos sin scroll-jacking |

---

## 5. FAQ · DS-026

Accordion 2-col que responde objeciones de venta y alimenta JSON-LD `FAQPage` para rich snippets en SERP. Producción usa `active` con gradient multicolor (excepción documentada en DS-011) — DS 05 confirma migración a sólido Amber 500 para nuevas instancias y deja el gradient legacy como tolerancia.

### Anatomía y composición

| # | Slot | Detalle |
|---|---|---|
| 1 | Left col · copy | Eyebrow + H2 + subtitle + tabs (opt) + link "Más dudas". Sticky en desktop si la lista es larga (`position: sticky; top: var(--sp-7)`) |
| 2 | Right col · accordion | FAQ items stack · 5–8 preguntas · single-open behavior · al abrir uno, se cierra el anterior · Card faq (DS-018) |
| 3 | FAQ item | Card faq · question Inter 500 16px · answer Inter 400 15px max 64ch · chevron animado · padding `--sp-5` |
| 4 | Active state | Border-left 3px Amber 500 + bg `rgba(255,153,0,.04)` · **no gradient multicolor** (regla nueva) · gradient legacy = tolerancia DS-011 |
| 5 | Tabs (opcional) | Pill outline · 3–4 tabs · filtra el accordion · solo si la FAQ tiene 8+ preguntas |
| 6 | Schema | JSON-LD `FAQPage` con `mainEntity` array · obligatorio para SEO · generado automático desde el array de preguntas |

**Container**: grid 1180 · padding y `--sp-9` · sin full-bleed · layout 2-col desktop / 1-col stacked mobile.

### 2 variantes oficiales

| Variante | Uso | Características |
|---|---|---|
| **DS-026.A · 2-col** | Home / `/servicios/[slug]` | Layout default · copy left + accordion right · single-open · 5–8 preguntas · tabs opcional · solid Amber active · `FAQPage` schema obligatorio |
| **DS-026.B · 1-col centered** | `/preguntas-frecuentes` (futura) | Página dedicada con 20+ preguntas · tabs en top como nav · accordion 1-col centrado max 720px · aún sin implementar — DS 05 lo deja preparado |

### ⚠ Excepción documentada · DS-011

El gradient multicolor de `.faq.active` en producción (`linear-gradient(90deg, var(--amber), var(--sky), var(--electric), var(--navy-700))`) cumple los 3 criterios de excepción de DS-011:
- gradiente continuo en elemento expresivo único
- no es CTA
- no es UI funcional

**Tolerancia documentada**. Nuevas FAQs creadas tras DS 05 usan border-left Amber sólido. Migración del legacy queda como tarea de mantenimiento separada.

### Motion · DS-022

| Capa | Token / duration / ease | Notas |
|---|---|---|
| Accordion expand | `base 180ms` · `ease-emphasis` | `max-height` + `opacity` · single-open (otro item se cierra antes) |
| Chevron rotate | `fast 120ms` · `ease-emphasis` | 0° → 180° · sincronizado con expand |
| Active border-left | `fast 120ms` · `ease-emphasis` | Width 0 → 3px desde left · color Amber 500 fijo |
| Tab change (opt) | `base 180ms` · `ease-emphasis` | Crossfade del accordion list · no re-mount |

### Reglas · FAQ

| # | Regla | Detalle |
|---|---|---|
| 01 | **`FAQPage` schema obligatorio** | JSON-LD `@type: "FAQPage"` con `mainEntity`. Sin schema = pierde rich snippets en SERP. **No negociable** |
| 02 | **Single-open behavior** | Solo un item abierto a la vez. Multi-open desordena lectura. Excepción: layout 1-col puede ser multi-open |
| 03 | **Active sólido Amber** | Nuevas FAQs: border-left 3px Amber 500. Sin gradient multicolor. Legacy queda como tolerancia hasta migración planificada |
| 04 | **5–8 preguntas por sección** | Menos de 5 → integrar al cuerpo. Más de 8 → agregar tabs o promover a `/preguntas-frecuentes` |
| 05 | **Preguntas en primera persona** | "¿Cuánto cuesta?" no "Costos del servicio". Copy conversacional. Respuesta máx 64ch por línea, 4 líneas |
| 06 | **Sin link list dentro de la answer** | Si la respuesta requiere 3+ links, es un artículo de blog o página dedicada. La FAQ resuelve la duda inline |

---

## 6. Forms · DS-027

Captura de leads. **DS-019 ya canoniza el componente Input** · DS-027 canoniza el patrón de formulario: layout, copy motivacional, validación inline, estados submit, integración Resend + Upstash ratelimit. Producción usa `contact-form` en `/contacto` y CTA Band final.

### Anatomía y composición

| # | Slot | Detalle |
|---|---|---|
| 1 | Left col · motivacional | Eyebrow + H2 + subtitle + trust strip (chips outline) · comunica por qué el usuario debería enviar el form · no es decorativa — es persuasiva |
| 2 | Right col · form | Form stack vertical · gap `--sp-4` · max-width 480px · field inputs DS-019 · submit primary lg al final |
| 3 | Field · Input DS-019 | Label visible · input radius `--r-sm` · focus ring Amber · variante dark hereda anatomía con bg `rgba(#fff,.05)` |
| 4 | Validación | Zod schema · validación on-submit + hint on-blur · helptxt obligatorio en errores · **nunca on-keystroke** (DS-019 regla) |
| 5 | Submit | Primary lg · estado loading con spinner · estado disabled durante submit · estado success con check + "Enviado, revisamos en 24h" |
| 6 | Trust strip | 3 chips outline · íconos opcionales · "Respuesta <24h", "Sin compromiso", "NDA disponible" · refuerza compromiso, no decora |
| 7 | Backend | Resend (email) + Upstash ratelimit (3 envíos/hora/IP) · honeypot + rate limit por email · errores genéricos al usuario, log detallado server-side |
| 8 | Success state | Reemplaza el form por card de confirmación · check Amber + copy + link "Volver al inicio" · trigger Celebrate (mascota Noa, futuro) |

**Container**: grid 1180 · padding y `--sp-9` · puede ser full-bleed dark (CTA Band final) o sobre Paper 0 (`/contacto` page).

### 2 variantes oficiales

| Variante | Uso | Campos |
|---|---|---|
| **DS-027.A · short** | CTA Band final · `/servicios/[slug]` | 3 campos: nombre · email · mensaje · layout 2-col motivacional+form · sobre Navy 600 (CTA Band) o Paper 0 |
| **DS-027.B · extended** | `/contacto` page | 5–7 campos: nombre · email · empresa · servicio (select) · presupuesto (select) · timeline (select) · mensaje · variante page-level con hero compact |

### Estados del submit (6)

| Estado | UI | Comportamiento |
|---|---|---|
| `idle` | Primary lg "Enviar mensaje" · cursor pointer | Estado por defecto. Form válido o aún no validado |
| `validating` | Inputs muestran helptxt error si falla on-blur · borders rojos donde aplique | No bloquea submit hasta intento explícito |
| `submitting` | Primary lg disabled + spinner + label "Enviando…" · todos los inputs disabled | Duración real. Sin timeout artificial |
| `success` | Form reemplazado por card success · check Amber + H3 "Mensaje enviado" + copy "Te contestamos en 24h" + link "Volver" | **Persistente** hasta navigation. Trigger Celebrate Noa (futuro) |
| `error` | Banner danger arriba del form · "Algo salió mal. Intenta de nuevo o escríbenos a hola@…" | Form vuelve a idle, mantiene valores · log server-side detallado |
| `ratelimited` | Banner warning · "Recibimos varios mensajes desde tu IP. Espera unos minutos." | Upstash 3/h. Form bloqueado hasta reset |

### Motion · DS-022

| Capa | Token / duration / ease | Notas |
|---|---|---|
| Field focus | `fast 120ms` · `ease-emphasis` | Border + focus ring DS-016 · sin transform |
| Helptxt error in | `base 180ms` · `ease-overshoot` | Fade + 4px rise · solo on-blur fail, no on-keystroke |
| Submit loading | `slow 280ms` · spinner orbit infinite | Spinner GSAP · sin modality (no es jerárquico aquí) |
| Success swap | `slow 280ms` · `ease-emphasis` | Form fade-out + card success fade-in · sin overlap |

### Reglas · Forms

| # | Regla | Detalle |
|---|---|---|
| 01 | **Validación on-submit + on-blur** | Nunca on-keystroke. DS-019 regla heredada. El usuario escribe en paz; valida al salir del campo |
| 02 | **Trust strip obligatorio** | 3 chips de confianza junto al form. Refuerza compromiso (24h, NDA, Resend). Sin chips, el form se siente expuesto |
| 03 | **Submit lg sin modality** | Pulse y orbit no aplican aquí. El submit es de alta intención pero contextual — no necesita "llamar" como Hero CTA |
| 04 | **Success state persistente** | No volver al form vacío automático. El usuario ve confirmación visual hasta navigate. Re-enviar requiere acción explícita |
| 05 | **Honeypot + ratelimit · obligatorios** | Campo oculto `website` + Upstash 3/h por IP. Sin esto, spam llega a hola@. **No negociable en producción** |
| 06 | **Variante dark hereda DS-019** | Sobre Navy: bg `rgba(#fff,.05)`, border `rgba(#fff,.14)`, focus ring Amber preservado. No es input nuevo, es contexto |

---

## 7. Auditoría preventiva · producción

Revisión de los archivos referenciados (`app/components/*` + `app/page.tsx` + `app/globals.css`) contra DS 05. **13 hallazgos** identificados.

| Categoría | Cantidad |
|---|---|
| ✅ OK · mantener | 5 |
| 🔄 Migrar | 6 |
| ⚠ Tolerancia / verificar | 2 |
| 🆕 Nuevo (a crear cuando se implementen variantes B/C) | 1 |

### Tabla completa de hallazgos

| # | Patrón / archivo | Estado | Hallazgo · acción |
|---|---|---|---|
| 01 | Hero · `hero-showcase` / `hero-rotating-word.tsx` | ✅ OK | Estructura cumple DS-023.A (lg). H1 clamp correcto · stats · CTA cluster ≤3 · rotating word con `aria-live`. Mantener |
| 02 | Hero · `hero-orb-3d.tsx` | ✅ OK | Emissive Electric encapsulado bajo DS-011 regla 07 (momento wow único). Cumple. Falta toggle para reduced-motion → static fallback. **Add reduced-motion fallback** |
| 03 | Hero · padding `4.2rem 0 4.5rem` | 🔄 Migrar | Valores fuera de escala DS 03. Reemplazar por `--sp-10` (128) / `--sp-9` (96). `app/globals.css` o componente |
| 04 | Hero md/compact | 🆕 Nuevo | Variantes B y C aún no existen en producción. Crear cuando se implementen `/servicios/[slug]` y `/blog/[slug]`. DS 05 las deja especificadas, no migra nada existente |
| 05 | CTA Band proof · `services-proof-section` | 🔄 Migrar | HEX hardcoded `#011540`. Migrar a `var(--navy-500)`. Resto cumple anatomía DS-024.A |
| 06 | CTA Band final · `contact-final-section` | 🔄 Migrar | HEX hardcoded `#022977` (correcto pero no tokenizado). Migrar a `var(--navy-600)` (un step más profundo que proof). AuroraText price actual usa multicolor — migrar a mono-tono Amber. **2 cambios** |
| 07 | CTA Band · BackgroundBoxes Aceternity | ✅ OK | Electric encapsulado en motion · cumple DS-011. Off bajo reduced-motion. Mantener |
| 08 | CTA Band · onda decorativa SVG | ⚠ Verificar | Usar solo top o bottom (regla 03). Verificar que no haya CTA Band con ondas en ambos lados. **Audit caso a caso** |
| 09 | Process · `process-sticky-section.tsx` `accentColors` array | 🔄 Migrar | Array `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` rompe DS-010 reglas 04+07. Migrar a escala Amber `[--amber-500, --amber-600, --amber-700, --amber-800]`. **Migración crítica ya aprobada en DS-011** |
| 10 | Process · Card Dark backdrop-blur 8px | ✅ OK | Cumple DS-018 (Card Dark). Backdrop estático. Mantener |
| 11 | FAQ · `contact-faq-section` · `.faq.active` gradient | ⚠ Tolerancia | Gradient multicolor en active state · excepción documentada en DS-011 (3 criterios cumplidos). Tolerancia. Nuevas FAQs: sólido Amber border-left. Migración legacy: tarea de mantenimiento separada |
| 12 | FAQ · JSON-LD `FAQPage` schema | 🔄 Migrar | **No implementado en producción**. Regla 01 obligatoria. Agregar JSON-LD `FAQPage` con `mainEntity` array · template generador desde el array de preguntas |
| 13 | Forms · `contact-form.tsx` (Zod + Resend + Upstash) | ✅ OK | Validación inline · estados submit · ratelimit · variante dark glass. Cumple DS-027.A integralmente. Falta success state persistente con card replacement (actual hace toast). **Mejora pendiente** DS-027 regla 04 |

### ⚠ Duplicación evaluada

Se consideró si CTA Band proof y CTA Band final son **2 patrones distintos**. Conclusión: son **1 patrón con 2 contextos declarables**.

- **Comparten**: anatomía (full-bleed dark, eyebrow, H2 bicolor, CTA cluster, Boxes opcional, onda)
- **Difieren**: bg shade, presencia de price, posición de onda
- **Implementación**: prop `variant="proof|final"`. No se promueven como patrones independientes.

Esto evita duplicación y mantiene el surface de patrones en 5.

---

## 8. Puente con el UX-SEO Playbook

El **NoaTechSolutions UX/UI + SEO Playbook** describe la composición narrativa de cada página (qué bloques, en qué orden, con qué copy). DS 05 define el sistema visual de cada bloque.

> **Regla**: el playbook referencia DS 05; nunca al revés. Si un blueprint del playbook necesita un patrón nuevo, se canoniza acá primero (ej. DS-F004 timeline horizontal).

### Matriz de composición · 5 páginas

| Página | Patrón usado | Variante DS 05 | Notas de composición |
|---|---|---|---|
| **Home `/`** | Hero | DS-023.A · lg | Full-viewport · rotating word · Orb 3D · 4 stats · primary lg pulse |
| | CTA Band | DS-024.A · proof | Post-grid de servicios · "Construye con quien cumple" · 1 primary |
| | Process | DS-025.A · sticky | 4 pasos · escala Amber · CardSwap · CTA ghost a `/casos` |
| | FAQ | DS-026.A · 2-col | 5–6 preguntas · single-open · `FAQPage` schema · sólido Amber |
| | CTA Band | DS-024.B · final | Pre-footer · pills + price opcional · primary lg pulse |
| **`/servicios/[slug]`** | Hero | DS-023.B · md | 60vh · sin Orb · imagen temática · primary lg base |
| | Process | DS-025.A · sticky | Pasos del servicio específico · puede ser 3–4 |
| | FAQ | DS-026.A · 2-col | FAQ específica del servicio · 6 objeciones |
| | CTA Band + Form | DS-024.B + DS-027.A | Final con form short embebido · trust strip + 3 campos |
| **`/contacto`** | Hero | DS-023.C · compact | ~36vh · eyebrow + H1 + subtitle |
| | Forms | DS-027.B · extended | 5–7 campos con select · trust strip · success persistente |
| | FAQ | DS-026.A · 2-col | FAQ "antes de escribir": tiempos, NDA, formatos |
| **`/nosotros`** | Hero | DS-023.C · compact | Quién somos · sin CTA cluster |
| | Process | DS-025.A · sticky | "Cómo trabajamos" · 4 pasos cultura |
| | CTA Band | DS-024.B · final | Cierre con form short o link a `/contacto` |
| **`/blog/[slug]`** | Hero | DS-023.C · compact | Eyebrow categoría + H1 + meta (autor, fecha, tiempo lectura) |
| | FAQ (opt) | DS-026.A · 2-col | Solo si el post lo requiere · TL;DR + objeciones |

### Handoff con el Playbook

El playbook v1.0 ya tiene blueprints visuales para home, `/servicios`, `/contacto`, `/nosotros`. Tras DS 05, los blueprints deben actualizarse para **referenciar variantes DS 05** en lugar de describir bloques ad-hoc.

Ejemplo: el wireframe del playbook que dice *"FAQ acordeón × 6"* pasa a decir *"DS-026.A · 2-col, 6 preguntas, FAQPage schema"*.

**Tarea de sincronización playbook ↔ DS 05** queda pendiente tras la aprobación.

---

## 9. Migraciones pendientes en código

**6 migraciones nuevas** introducidas por DS 05 (sumadas a las 29 acumuladas previas: 5 DS 02 + 8 DS 03 + 16 DS 04).

Total acumulado del manual: **35 migraciones + 2 retiros**.

### Nuevas en DS 05

| # | Archivo | Cambio |
|---|---|---|
| 30 | Hero · `app/globals.css` o componente | Padding `4.2rem 0 4.5rem` → `--sp-10` (128) / `--sp-9` (96) |
| 31 | `services-proof-section` | bg `#011540` → `var(--navy-500)` |
| 32 | `contact-final-section` | bg `#022977` → `var(--navy-600)` |
| 33 | `contact-final-section` | AuroraText price multicolor → mono-tono Amber |
| 34 | FAQ · template global | Agregar JSON-LD `FAQPage` con `mainEntity` array (no implementado en producción) |
| 35 | `contact-form.tsx` | Success state persistente (card replacement) en lugar de toast actual |

### Verificaciones (no migraciones)

| # | Archivo | Verificación |
|---|---|---|
| V1 | CTA Band ondas SVG | Audit caso a caso · ondas solo top o bottom, no ambas (regla 03) |
| V2 | `hero-orb-3d.tsx` | Add reduced-motion fallback → static image |

### Pendiente al implementar nuevas páginas

- Hero md (variante B) · al implementar `/servicios/[slug]`
- Hero compact (variante C) · al implementar `/blog/[slug]`, `/nosotros`, legales

---

## 10. Decisiones de diseño

### DS-023 · Hero · 3 variantes (lg / md / compact)
✅ **Aprobada** — 2026-05-05

3 variantes oficiales atadas a contexto: lg full-viewport (home) · md 60vh (`/servicios/[slug]`) · compact ~36vh (blog/legales/nosotros). Pulse y orbit obligatorios en lg. Orb 3D solo en lg como momento wow encapsulado. H1 mínimo 36px mobile. CTA cluster ≤ 3 (primary + ghost + link).

**Marca**: bienvenida con jerarquía clara · jerarquía cromática preservada · motion como identidad (DS-022) · accesibilidad (`aria-live`, focus ring DS-016, reduced-motion).

**Alternativas descartadas**: Hero único full-viewport en todas las páginas (incoherente jerárquicamente — `/blog/[slug]` no debe gritar como home), Orb 3D en todas las variantes (ruido visual fuera del momento de bienvenida principal), CTA cluster sin tope (compite por jerarquía).

### DS-024 · CTA Band · 1 anatomía con 2 contextos declarables
✅ **Aprobada** — 2026-05-05

Una sola anatomía full-bleed dark con prop `variant="proof|final"`. Pulse obligatorio en primary. Onda en uno solo de los lados (top o bottom). Boxes solo en dark. Price (AuroraText mono-tono Amber) solo en contexto final.

**Marca**: disciplina de patrones · contexto declarable evita duplicación · momento de alta intención con motion identitario.

**Alternativas descartadas**: promover proof y final a 2 patrones distintos (duplicación innecesaria, comparten 90% de anatomía), pulse opcional en CTA Band (degrada el momento de conversión), Boxes en light (no existe versión light testeada), price gradient multicolor (rompe DS-011 marco gradientes).

### DS-025 · Process · sticky vertical 4 pasos
✅ **Aprobada** — 2026-05-05

Variante única v1.0: pin GSAP + CardSwap + 4 pasos. Step badges en escala Amber 500/600/700/800 (migración DS-011 desde array legacy). CardSwap exclusivo de Process (no reutilizar en grids). CTA opcional ghost lg (nunca primary aquí). Timeline horizontal a backlog (DS-F004).

**Marca**: progreso visual claro (escala Amber comunica avance) · disciplina cromática (sin Electric, Sky, libres) · CardSwap como gesto exclusivo de proceso.

**Alternativas descartadas**: mantener array legacy `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` (rompe DS-010 reglas 04+07), promover timeline horizontal a v1.0 (no hay use-case actual con 5+ pasos), CTA primary en Process (no es momento de conversión).

### DS-026 · FAQ · 2 layouts + JSON-LD FAQPage obligatorio
✅ **Aprobada** — 2026-05-05

2-col default (home, `/servicios/[slug]`) · 1-col centered backlog (`/preguntas-frecuentes` futura). Single-open behavior. Active sólido Amber border-left para nuevas instancias; gradient multicolor legacy = tolerancia DS-011. JSON-LD `FAQPage` con `mainEntity` obligatorio (rich snippets en SERP, no negociable).

**Marca**: SEO-friendly por diseño · objeciones resueltas inline · disciplina conversacional (preguntas en primera persona).

**Alternativas descartadas**: multi-open en 2-col (desordena lectura), gradient multicolor para nuevas FAQs (rompe disciplina post-DS-011), FAQ sin schema (pierde rich snippets — costo SEO directo).

### DS-027 · Forms · 2 variantes con validación inline + ratelimit obligatorio
✅ **Aprobada** — 2026-05-05

short (3 campos · CTA Band final) · extended (5–7 campos · `/contacto` page). Trust strip obligatorio. Validación on-submit + on-blur (nunca on-keystroke, hereda DS-019). 6 estados de submit (idle, validating, submitting, success, error, ratelimited). Success persistente con card replacement. Honeypot + Upstash 3/h obligatorios en producción.

**Marca**: feedback honesto · accesibilidad (focus ring DS-016, helptxt obligatorio) · captura segura (ratelimit + honeypot).

**Alternativas descartadas**: validación on-keystroke (DS-019 regla heredada — genera ansiedad), success como toast efímero (el usuario pierde la confirmación al volver a navegar), submit con modality pulse/orbit (no es momento de "llamar", es momento contextual).

---

## 11. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-05 | DS-023 (Hero · 3 variantes) · DS-024 (CTA Band · 1 anatomía / 2 contextos) · DS-025 (Process · sticky vertical) · DS-026 (FAQ · 2 layouts + FAQPage schema obligatorio) · DS-027 (Forms · short/extended + 6 estados submit) · DS-F004 (Process timeline horizontal · backlog v1.1) · auditoría 13 hallazgos · matriz puente con UX-SEO Playbook |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`00-implementation-strategy.md`](00-implementation-strategy.md) — arquitectura en 3 capas
- [`02-colors.md`](02-colors.md) — sistema cromático (DS-010 reglas, DS-011 marco gradientes)
- [`03-spacing-radii-shadows.md`](03-spacing-radii-shadows.md) — espaciado y elevación
- [`04-components-core.md`](04-components-core.md) — componentes core (Button, Card, Input, Badge, Motion DS-022)
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
- **NoaTech UX-SEO Playbook** — entregable del equipo de diseño · matriz de composición por página
