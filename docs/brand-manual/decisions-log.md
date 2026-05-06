# Decisions Log · NoaTech Design System

| Owner | Maintainer | Versión | Última actualización |
|---|---|---|---|
| Israel · Fundador | NoaTech Design | v0.8.0 | 2026-05-05 |

> Registro vivo de cada decisión aprobada, en backlog o descartada en el proceso de construcción del Design System NTS. Es la fuente de verdad que alimenta el Manual de Marca NOA-229.

---

## Resumen

| Estado | Cantidad |
|---|---|
| ✅ Aprobadas | 27 |
| 📌 Backlog | 3 |
| 🚫 Descartadas | 7 |

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

> **Suplemento (DS-011, v0.4)**: la regla "no gradientes multicolor" sigue vigente para diseño nuevo. Los gradientes existentes en producción al 03-May-2026 quedan exceptuados bajo el marco de aplicación. Cualquier gradiente multicolor nuevo requiere aprobación explícita.

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

> **Aclaración (DS-011, v0.4)**: las reglas 03, 04 y 05 aplican únicamente a colores sólidos en elementos distintos, no a gradientes que mezclan colores en un mismo elemento.

**Marca**: tecnología B2B California · elegancia institucional (Navy) · calidez que convierte (Amber) · profesionalismo técnico (Sky) · energía premium encapsulada (Electric como voz de Noa).

**Alternativas descartadas**: Opción B · jubilar Electric completamente (`DS-X006`), Electric libre en UI estática (vibración con Amber), Sky sobre blanco como texto body (falla AA), Electric sobre Navy (dos azules oscuros), HEX aproximados no oficiales (rompía producción).

### DS-011 · Auditoría Electric + marco de aplicación de reglas
**2026-05-03** · Sección [02 · Colores](02-colors.md#8-marco-de-aplicación-de-reglas)

**Marco**: las reglas 03, 04 y 05 de DS-010 aplican únicamente a colores sólidos en elementos distintos, no a gradientes que mezclan colores en un mismo elemento. Suplemento a DS-009 (no la modifica): DS-009 sigue vigente para diseño nuevo; el marco aplica solo a los elementos auditados al 03-May-2026. Cualquier gradiente multicolor nuevo requiere aprobación explícita.

**3 criterios de excepción para gradientes**:
1. Es percibido como un único elemento expresivo
2. No se usa en CTAs ni elementos de UI funcional
3. Mantiene una transición continua (sin hard-stops)

**Auditoría de 14 usos de `#0400F0` en producción**:
- 4 mantener (compatibles con DS-010)
- 5 excepciones documentadas: 4 gradientes expresivos (`globals.css:2001`, `globals.css:4993`, `globals.css:2766/2788/2795`, `text-hover-effect.tsx`) + 1 glow effect del orb 3D (`hero-orb-3d.tsx`)
- 5 migraciones pendientes de aplicar en código (`process-sticky-section`, `resizable-navbar` × 2 cambios, `reviews-marquee`, `portfolio-page-client`)

**Marca**: pragmatismo técnico · disciplina que respeta el lenguaje visual existente · regla clara para diseño futuro.

**Alternativas descartadas**: aplicar reglas 03/04/05 a gradientes multicolor — rompería 4 usos en producción sin beneficio perceptual real (los gradientes son percibidos como un solo elemento expresivo, no como roles compitiendo).

### DS-012 · Token Link · 4 estados × 2 modos
**2026-05-03** · Sección [02 · Colores](02-colors.md#10-token-link--ds-012)

> Promovida desde `DS-F002` (backlog v1.0). Estado anterior: en backlog.

Token oficial para hyperlinks inline de body. Tabla 4×2 con HEX y contraste WCAG. Resuelve las dos contradicciones que tenía DS-F002 con DS-010:

- **Default light** = Sky 700 `#036399` (no Sky 500) → cumple regla 06
- **Visited** = Sky 800 `#024266` light / Sky 300 `#3FBAFF` dark (no Electric) → preserva el encapsulamiento de Electric (regla 07) y mantiene jerarquía visual coherente con la familia Sky
- **Hover light** = Amber 700 `#995B00` (no Amber 500) → cumple regla 08
- **Focus ring** = Amber 500 outline 2px / offset 3px en ambos modos

**Marca**: lectura clara en ambos modos · jerarquía visible (default → hover → visited) · encapsulamiento de Electric preservado.

**Alternativas descartadas**: Visited en Electric (rompía regla 07 al meter Electric en UI estática); default Sky 500 en light (falla AA, regla 06).

### DS-013 · Token Navbar Link · 3 estados × 2 modos
**2026-05-03** · Sección [02 · Colores](02-colors.md#11-token-navbar-link--ds-013)

Token específico para nav links estructurales del header / navbar. Distinto de DS-012 porque los nav links son texto principal estructural, no links inline en body.

**Estados clave**:
- **Default light** = Ink 1 `#02215F` (12.8:1 AAA)
- **Default dark** = Paper 0 `#FFFFFF` 88% opacity (14.7:1 AAA)
- **Highlighted** = underline Amber 500 2px decorativo (texto NO cambia de color, solo aparece el subrayado)
- **Hover** = Amber 700 light / Amber 500 dark (unifica con DS-012)

Migración asociada (parte de DS-011): `bg-[#0400f0]` del mobile menu surface (`resizable-navbar.tsx:317, 390`) pasa a `bg-[#022977]` (Navy 500).

**Marca**: estructura del nav anclada al sistema neutral · Sky / Amber libres para roles activos · highlighted decorativo no compite con jerarquía cromática.

**Alternativas descartadas**: Sky 700 como default del nav (`DS-X007`) — sonaba a link inline de body, no a nav estructural; mezclaba el rol del token Link general con el del nav.

### DS-014 · Escala de spacing base 4px · 11 tokens
**2026-05-04** · Sección [03 · Espaciado, radios y sombras](03-spacing-radii-shadows.md#9-decisiones-de-diseño)

11 niveles (0·4·8·12·16·24·32·48·64·96·128). Hitos en doble (4·8·16·32·64·128), pasos intermedios (12·24·48·96) donde el ojo lo pide. Reemplaza valores libres del CSS actual.

**Marca**: ritmo perceptible · respiración consistente · disciplina técnica · base múltiplo 4 estándar moderno.

**Alternativas descartadas**: escala 8px puro (pierde granularidad), escala ratio 1.5 (no intuitiva), valores libres como hoy (caos).

### DS-015 · Radii semánticos · 7 tokens
**2026-05-04** · Sección [03 · Espaciado, radios y sombras](03-spacing-radii-shadows.md#9-decisiones-de-diseño)

7 tokens con nombres semánticos (xs/sm/md/lg/xl/2xl/pill) atados a la jerarquía del componente, no al pixel. La pill (999px) es categóricamente distinta del resto — no es una cantidad, es una forma.

**Marca**: curva expresiva sin caos · cada componente sabe su radius por rol · pill como gesto formal de marca.

**Alternativas descartadas**: tokens por pixel (`r-12`, `r-16`) — no comunican jerarquía; combinaciones libres como hoy (17/27/28/29/36 conviviendo).

### DS-016 · Shadows con tinte Navy + focus ring paralelo
**2026-05-04** · Sección [03 · Espaciado, radios y sombras](03-spacing-radii-shadows.md#9-decisiones-de-diseño)

5 niveles de elevación (sh-1 a sh-5) con tinte `rgba(2,41,119,X)` (Navy 500), no negro puro. Focus ring `--sh-focus` Amber 3px sólidos, sistema paralelo combinable vía coma con cualquier sh-N. Tolerancia óptica ±2px solo para alineación interna de íconos/borders.

Auditoría preventiva: 12 hallazgos en `ui_kits/website/kit.css` (3 OK · 8 migraciones · 1 tolerancia 1080 narrow · N tolerancias ópticas).

**Marca**: profundidad cálida · evita gris azulado mortuorio · focus visible siempre · accesibilidad sin sacrificar identidad.

**Alternativas descartadas**: shadow negro puro (rompe brand), focus ring sin token (inconsistencia accesibilidad), focus ring con blur (poco visible para keyboard nav).

### DS-021 · Arquitectura de implementación en 3 capas
✅ **Aprobada** — 2026-05-04 · Sección [00 · Estrategia de implementación](00-implementation-strategy.md#7-decisiones-de-diseño)

Stack oficial: shadcn/ui (primitives) + motion/react & GSAP (motion) + Aceternity UI (showcase). Una librería por capa, criterios claros para sumar nuevas. Compatible con stack actual del proyecto sin migraciones forzadas.

**Marca**: disciplina técnica · sin lock-in · stack estándar de la industria moderna (Vercel, Linear, Resend) · permite escalar sin caos de librerías solapadas.

**Alternativas descartadas**: una sola librería all-in-one (MUI/Chakra) — fuerza opiniones de styling que pelean con identidad de marca, no cubre showcase animado; solo shadcn (perdemos showcase); solo Aceternity (falta primitives sólidos); sin librería custom (costoso en time-to-brand y mantenimiento, pierde accesibilidad pre-resuelta de Radix).

### DS-017 v0.2 · Button motion specs + eje ortogonal modality · reconfirma 9→4
✅ **Aprobada** — 2026-05-04 · Sección [04 · Componentes core](04-components-core.md#2-button--ds-017-v02)

**Corrección al gap de v0.1**: motion no es opcional, ES identidad de marca en NoaTech. La regla 02 original ("Motion no define variante") sub-especificaba; v0.2 la reescribe: motion se aplica vía atributo ortogonal `data-modality="base|pulse|orbit"`, no por variante nueva.

4 variantes (Primary/Secondary/Ghost/Link) × 3 tamaños (sm 36 / md 44 / lg 54) × 6 estados (default / hover / active / focus / disabled / loading). Specs accionables tabuladas en sección 06 con duration, ease, transform, shadow, extras (text-swap, icon-fade, modality entries).

**Reconfirmación 9→4**: los 7 efectos legacy son 2 patrones base + 2 modalities perpetuas opcionales (pulse, orbit). Mapping completo: `btn-cta-navy → primary lg pulse` · `btn-body-ghost → ghost lg orbit` · `btn-cta-ghost-navy → ghost lg dark orbit` · 6 al base · 2 retiros sin pérdida.

**Modality solo en `lg` hero/CTA Band.** Pulse y orbit son loops perpetuos: se reservan a botones lg en posiciones jerárquicas. Hover detiene el loop y aplica el hover state base. text-swap promovido a primary lg.

**Marca**: motion como lenguaje, no decoración · identidad hero preservada (pulse, orbit) · eje ortogonal sin multiplicar variantes · implementable con motion/react o CSS.

**Alternativas descartadas**: mantener "motion opcional" v0.1 (drift de impl, downgrade visual) · promover pulse/orbit a variantes propias (5 o 6 variantes, multiplicación) · motion libre por instancia (caos sin tokens) · modality aplicable en sm/md (loops perpetuos en formularios = ruido).

### DS-018 · Card · 5 tipos canónicos
✅ **Aprobada** — 2026-05-04 · Sección [04 · Componentes core](04-components-core.md#3-card--ds-018)

5 tipos canónicos (Feature, Featured, Dark, Testimonial, FAQ). CardSticky, CardSwap, CometCard son **comportamientos** sobre Feature, no tipos nuevos. Una Featured por grid. Radius `--r-lg` (16px) default. Cards nunca usan pill.

**Marca**: jerarquía cromática y elevación definen identidad · motion es producto, no tipo · disciplina visual.

**Alternativas descartadas**: promover Sticky/Swap/Comet a tipos nuevos (multiplicaba variantes innecesariamente), permitir múltiples Featured por grid (rompe la jerarquía visual), cards en pill (rompe DS-015 pill categórica).

### DS-019 · Input · 3 tipos × 6 estados con validación inline
✅ **Aprobada** — 2026-05-04 · Sección [04 · Componentes core](04-components-core.md#4-input--ds-019)

Text/Textarea/Select × 6 estados (default/hover/focus/error/success/disabled). Validación inline con helptxt obligatorio en errores. Variante dark hereda anatomía con chrome contextual. Focus ring DS-016 unificado. Label siempre visible (no placeholder-as-label).

**Marca**: accesibilidad sin sacrificio · feedback honesto al usuario (no marcar error mientras escribe) · tokens DS 03 aplicados sin excepciones.

**Alternativas descartadas**: placeholder-as-label (anti-pattern accesibilidad), validación on-keystroke (genera ansiedad), input con radius pill (rompe affordance).

### DS-020 · Badge · 4 familias semánticamente distintas
✅ **Aprobada** — 2026-05-04 · Sección [04 · Componentes core](04-components-core.md#5-badge--ds-020)

Eyebrow (metadata sin chrome) · Pill (3 niveles solid/soft/outline) · Status (semantic x4) · Step (numérico). Eyebrow ≠ Pill conceptualmente. Pill solid escasea (1 por viewport máx). Status estricto por color semántico.

**Marca**: diferenciación semántica clara · intensidad cromática reservada para señales · tipografía como vector de jerarquía.

**Alternativas descartadas**: Eyebrow y Pill en una sola familia (confunde metadata con objeto interactivo), Pill multicolor (rompe disciplina cromática), Status con colores libres (rompe convención WCAG / semáforo).

### DS-022 · Tokens de motion · 6 durations + 3 easings + reduced-motion
✅ **Aprobada** — 2026-05-04 · Sección [04 · Componentes core](04-components-core.md#6-motion--ds-017-v02--ds-022)

Seis tokens de duración: `--motion-duration-instant` (80ms · press) · `fast` (120ms · transitions simples) · `base` (180ms · hover changes) · `slow` (280ms · emphasis) · `pulse` (2500ms · glow loop) · `orbit` (3000ms · orb loop).

Tres easings: `--motion-ease-emphasis` `cubic-bezier(.4, 0, .2, 1)` material standard para 90% de transitions · `--motion-ease-overshoot` `cubic-bezier(.34, 1.56, .64, 1)` spring sutil para text-swap fade-in · `--motion-ease-pulse` `ease-in-out` para loops perpetuos.

**`prefers-reduced-motion` obligatorio**: loops perpetuos se desactivan, hover transforms se reducen a opacity/color. Implementación a nivel global en CSS reset.

Toda nueva CSS o motion variant usa exclusivamente DS-022. **No se permiten valores inline.** Si un componente requiere otra duración/easing, se evalúa promover token nuevo.

**Marca**: movimiento con disciplina · tempo predecible y reutilizable · a11y por defecto (reduced-motion) · base para motion engine impl (DS-021 capa 2).

**Alternativas descartadas**: mantener durations inline ad-hoc (caos: 0.12s/0.15s/0.2s/2.5s sin token) · una sola duration default (pierde matiz fast vs slow) · easings nombrados sin curva explícita ("snappy", "bouncy") · no documentar prefers-reduced-motion (a11y comprometido).

### DS-023 · Hero · 3 variantes (lg / md / compact)
✅ **Aprobada** — 2026-05-05 · Sección [05 · Patrones](05-patterns.md#2-hero--ds-023)

3 variantes oficiales atadas a contexto: lg full-viewport (home) · md 60vh (`/servicios/[slug]`) · compact ~36vh (blog/legales/nosotros). Pulse y orbit obligatorios en lg. Orb 3D solo en lg como momento wow encapsulado bajo DS-011 regla 07. H1 mínimo 36px mobile (DS-F003). CTA cluster ≤ 3 (primary + ghost + link).

**Marca**: bienvenida con jerarquía clara · jerarquía cromática preservada · motion como identidad (DS-022) · accesibilidad (`aria-live`, focus ring DS-016, reduced-motion).

**Alternativas descartadas**: Hero único full-viewport en todas las páginas (incoherente jerárquicamente — `/blog/[slug]` no debe gritar como home), Orb 3D en todas las variantes (ruido visual fuera del momento de bienvenida principal), CTA cluster sin tope (compite por jerarquía).

### DS-024 · CTA Band · 1 anatomía con 2 contextos declarables
✅ **Aprobada** — 2026-05-05 · Sección [05 · Patrones](05-patterns.md#3-cta-band--ds-024)

Una sola anatomía full-bleed dark con prop `variant="proof|final"`. Pulse obligatorio en primary. Onda en uno solo de los lados (top o bottom). Boxes solo en dark. Price (AuroraText mono-tono Amber) solo en contexto final. Diferencias acotadas entre contextos: bg shade (Navy 500 vs Navy 600), presencia de price, posición de onda.

**Marca**: disciplina de patrones · contexto declarable evita duplicación · momento de alta intención con motion identitario.

**Alternativas descartadas**: promover proof y final a 2 patrones distintos (duplicación innecesaria, comparten 90% de anatomía), pulse opcional en CTA Band (degrada el momento de conversión), Boxes en light (no existe versión light testeada), price gradient multicolor (rompe DS-011 marco gradientes).

### DS-025 · Process · sticky vertical 4 pasos
✅ **Aprobada** — 2026-05-05 · Sección [05 · Patrones](05-patterns.md#4-process--ds-025)

Variante única v1.0: pin GSAP + CardSwap + 4 pasos. Step badges en escala Amber 500/600/700/800 (migración DS-011 desde array legacy `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]`). CardSwap exclusivo de Process (no reutilizar en grids). CTA opcional ghost lg (nunca primary aquí). Timeline horizontal a backlog (`DS-F004`).

**Marca**: progreso visual claro (escala Amber comunica avance) · disciplina cromática (sin Electric, Sky, libres) · CardSwap como gesto exclusivo de proceso.

**Alternativas descartadas**: mantener array legacy `["#0400f0", "#05a5ff", "#ff9900", "#09215e"]` (rompe DS-010 reglas 04+07), promover timeline horizontal a v1.0 (no hay use-case actual con 5+ pasos), CTA primary en Process (no es momento de conversión).

### DS-026 · FAQ · 2 layouts + JSON-LD FAQPage obligatorio
✅ **Aprobada** — 2026-05-05 · Sección [05 · Patrones](05-patterns.md#5-faq--ds-026)

2-col default (home, `/servicios/[slug]`) · 1-col centered backlog (`/preguntas-frecuentes` futura). Single-open behavior. Active sólido Amber border-left para nuevas instancias; gradient multicolor legacy = tolerancia DS-011. **JSON-LD `FAQPage` con `mainEntity` obligatorio** (rich snippets en SERP, no negociable).

**Marca**: SEO-friendly por diseño · objeciones resueltas inline · disciplina conversacional (preguntas en primera persona).

**Alternativas descartadas**: multi-open en 2-col (desordena lectura), gradient multicolor para nuevas FAQs (rompe disciplina post-DS-011), FAQ sin schema (pierde rich snippets — costo SEO directo).

### DS-027 · Forms · 2 variantes con validación inline + ratelimit obligatorio
✅ **Aprobada** — 2026-05-05 · Sección [05 · Patrones](05-patterns.md#6-forms--ds-027)

short (3 campos · CTA Band final) · extended (5–7 campos · `/contacto` page). Trust strip obligatorio. Validación on-submit + on-blur (nunca on-keystroke, hereda DS-019). 6 estados de submit (idle, validating, submitting, success, error, ratelimited). Success persistente con card replacement. **Honeypot + Upstash 3/h obligatorios** en producción.

**Marca**: feedback honesto · accesibilidad (focus ring DS-016, helptxt obligatorio) · captura segura (ratelimit + honeypot).

**Alternativas descartadas**: validación on-keystroke (DS-019 regla heredada — genera ansiedad), success como toast efímero (el usuario pierde la confirmación al volver a navegar), submit con modality pulse/orbit (no es momento de "llamar", es momento contextual).

---

## 📌 Backlog

Ideas evaluadas que no entran en la versión actual. Cada una con prioridad y target de release.

| ID | Componente | Sugerencia | Prioridad | Target |
|---|---|---|---|---|
| DS-F001 | Tipografía · Mono | JetBrains Mono para metadata técnica — eyebrows numéricos, "PROYECTO · 2025", timestamps, snippets. Peso único 400, carga condicional. | Baja | v1.1 |
| DS-F003 | Tipografía · SEO | Documentar regla H1 mobile mínimo 36px en template `/servicios/[slug]` y checklist QA pre-deploy. | Media | v1.0 |
| DS-F004 | Patrón · Process timeline horizontal | Variante alternativa de Process (DS-025) para procesos con 5+ pasos o storytelling tipo case study. Scroll horizontal con snap. No entra en v1.0 — promovido a backlog hasta tener use-case concreto. | Baja | v1.1 |

> **`DS-F002` salió de Backlog en v0.4.0**: promovida a `DS-012` (Token Link) tras resolver las contradicciones con DS-010. Ver entrada correspondiente en Aprobadas.

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

### DS-X007 · Sky 700 como default del nav link
Evaluada como default del Token Navbar Link (DS-013). Sonaba a link inline de body, no a navegación estructural; mezclaba el rol del token Link general (DS-012) con el del nav, lo cual difuminaba la jerarquía cromática del header.
**Reemplazo**: Ink 1 `#02215F` como default del nav (`DS-013`) — ancla los nav links al sistema neutral y deja Sky / Amber libres para sus roles activos.

---

## Versionado del log

| Versión | Fecha | Cambio |
|---|---|---|
| v0.8.0 | 2026-05-05 | DS-023 (Hero) · DS-024 (CTA Band) · DS-025 (Process) · DS-026 (FAQ) · DS-027 (Forms) aprobadas · DS-F004 (Process timeline horizontal) en backlog · DS 05 · Patrones v0.1 cerrado |
| v0.7.0 | 2026-05-04 | DS-017 v0.2 motion specs + eje ortogonal modality (reconfirma 9→4) · DS-022 tokens de motion · DS 04 promovido a ✅ Aprobado integralmente |
| v0.6.0 | 2026-05-04 | DS-017 (estructural, motion pendiente), DS-018, DS-019, DS-020 aprobadas (DS 04 · Componentes core v0.1) |
| v0.5.0 | 2026-05-04 | DS-014, DS-015, DS-016 aprobadas (DS 03 · Spacing, Radii & Shadows v0.1) · DS-021 aprobada (arquitectura en 3 capas, sección 00) |
| v0.4.0 | 2026-05-03 | DS-011, DS-012 (ex DS-F002), DS-013 aprobadas · DS-X007 registrada · DS 02 v0.4 cerrada |
| v0.3.0 | 2026-04-24 | DS-010 aprobada · DS-X006 registrada · DS 02 v0.3 cerrada |
| v0.2.x | 2026-04-24 | DS-005 a DS-009 aprobadas y corregidas con HEX oficiales de producción |
| v0.1.x | 2026-04-24 | DS-001 a DS-004 aprobadas (DS 01 · Tipografía) |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`01-typography.md`](01-typography.md) — sección 01
- [`02-colors.md`](02-colors.md) — sección 02
- [`_open-questions/`](_open-questions/) — preguntas abiertas
- [`_open-questions/_archive/`](_open-questions/_archive/) — preguntas resueltas
