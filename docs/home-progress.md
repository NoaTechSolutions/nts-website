# Progreso Home + Handoff · NoaTechSolutions

> Bitácora detallada del trabajo sobre la home para **retomar mañana donde quedamos**.
> Última sesión: 2026-07-14 · Branch: `develop` · Dev server: `npm run dev` → puerto **3006**.

---

## ✅ HECHO (2026-07-14) · Bento "Qué incluye" completo + Sección Problema a código

> **Todo compila (HTTP 200). SIN COMMITEAR al momento de escribir esto → se commitea al cerrar la sesión** (3 commits: bento / problema / docs). Branch `develop`.

### A · Bento "Qué incluye" (`diseno-web-includes.tsx`) — los 3 fondos que faltaban + refinamientos

Se cerraron los **6 fondos animados** del bento (todo en código, motion, transform/opacity → GPU). Se identifican por `c.icon` y flag `isX`. Nuevos hoy:
- **🔍 SEO** → `app/components/ui/seo-bg.tsx`: **UNA escena hub-and-spoke**. Centro = tarjeta-navegador **"Your Company"** (tu web); de ahí salen líneas + pulsos hacia **plataformas** (Google logo real de 4 colores, Bing, Yahoo, Facebook, Instagram, X), el **panel SERP #1** (izq) y el **gráfico de tráfico** subiendo (der). Los 3 antes parecían sueltos → se unificaron para que "todo encaje en 1".
- **🛠️ Autogestionable** → `app/components/ui/autogestionable-bg.tsx`: **biblioteca de medios** (izq) + **cursor "YOU"** que arrastra una foto de **izq→der** al dropzone **"Upload new photo"** de tu web (der, **fija**, no flota) → aparece con **check**. Web con "● Live" + botón "Publish".
- **🔒 Segura + hosting** → `app/components/ui/secure-hosting-bg.tsx`: **domo grande** con 4 nodos etiquetados adentro (**You / Clients / Info / Web**) + **barrera** que DEFIENDE. Ataques con iconos reconocibles (**virus, ladrón/máscara, bug, calavera, phishing/anzuelo, bomba**) que llegan y **rebotan**. Laterales: **candado que se bloquea** (izq, `LockModule`) + **radar de monitoreo** (der, `Radar`, más grande).
- **Zoom al hover en TODOS los fondos** (patrón del card destacado): wrapper `group-hover:scale-[1.04] transition-transform duration-500`.

### B · Título de la sección "Qué incluye" — centrado + SEO + FlipWords

- **Centrado (bug real):** `.section-title` (globals.css) tiene `max-width:18ch` **sin `margin:auto`** → la caja quedaba a la izquierda. Fix: **clase custom `.dw-includes-title`** con `text-align:center` + `max-width:none` (las utilities `text-center`/`mx-auto` NO pisan el CSS base unlayered — GOTCHA reafirmado).
- **Copy SEO + emocional (elegido por el usuario):** *"Nos ocupamos de todo: tu web completa que impulsa tu **[Negocio→Marca→Proyecto→Idea→Futuro]**"*. La **última palabra rota** con **FlipWords** (mismo efecto del hero) + **highlight naranja** (`.dw-flip-shell > div` con `background:var(--color-amber)` + `color:#fff !important` + `text-transform:capitalize`; el `!important` porque las utilities de color de FlipWords pisaban).
- **2 filas centradas** (título dividido en spans block) + **subtítulo centrado y separado** (`.dw-includes-copy`, `margin:1.85rem auto 0`).
- **Distribución bento en TABLET:** movido de `lg:` → `md:` (en `diseno-web-includes.tsx` + `design-canvas-bg.tsx`) → el bento 4-col aparece desde 768px. **Mobile:** filas más altas (`auto-rows-[minmax(14rem,auto)]` base, `11rem` desde `sm`).

### C · Sección Problema (`diseno-web-problem.tsx`) — los 4 videos → animaciones en código

Reemplazados los 4 `<video>` por fondos en código (array `PROBLEM_BGS`; el render usa `<Bg/>` en vez de `<video>`). **Los `.mp4` ya NO se usan** (quedan en `/public`).
- **Carga lenta** → `animations/carga-lenta-bg.tsx` (NEW): spinner lento + barra de progreso **trabada en ~38%** + "still loading…" + skeletons con shimmer + **caracol** cruzando.
- **Rota en el celular** → `animations/broken-mobile-bg.tsx` (NEW): **split** → desktop OK (**✓**) vs **tablet + móvil** con la misma web ROTA (**✗**): overflow horizontal, menú cortado, imagen rota, cards que se salen.
- **Linda pero vacía** → `animations/no-convierte-bg.tsx` (NEW): sitio lindo (izq, CTA "Contact us" que late) + **visitantes** (cursores) que entran **"Client"** (lento) y se van **"✗ Missing client"** + tablero (**1,248 visitas** vs **0 mensajes**, 97% bounce).
- **Invisible en Google** → `animations/invisible-google-bg.tsx` (NEW): SERP; **competidores arriba** llevándose el click (cursor + "✓ clicked") vs **tu sitio enterrado #14** en rojo con **"0 clicks"** y "nobody scrolls this far". **Reemplaza** al `website-not-found-bg.tsx` (SVG portado, ya no se usa).
- **Color freno #3:** de **morado `#7c5cff`** (no es de paleta) → **azul eléctrico `#1e50ff`** (en `ACCENTS[2]`, `GRADIENTS[2]`, y dentro de `no-convierte`/`broken-mobile`).

### D · Sección Problema en MOBILE (sin tocar desktop)

- **`ScaleStage`** (en `diseno-web-problem.tsx`): las animaciones están en **px fijos** (diseñadas para el panel ancho ~544×306, 16:9). Mide el contenedor con `ResizeObserver` y **escala** la animación para caber en cualquier ancho (escala **máx 1**, nunca agranda). Solo se usa en el bloque mobile → **desktop intacto** (allá el panel monta la animación directa).
- **`StackCard`** (efecto mazo): cada card es **`sticky`** + `useScroll`/`useTransform` → **entra desde la derecha** con el scroll (`x:120→0`) y se **apila ENCIMA** de la anterior (offset de `top` + z creciente = se ve el borde de las de abajo). Contenido **centrado**. El grid 2-col de tablet se cambió por **stack vertical centrado** (`max-w-md`).

### 🐛 GOTCHA de la sesión
`ReferenceError: WebsiteNotFoundBg is not defined` tras cambiar el import → era **estado viejo de HMR** (la fuente estaba limpia, `grep` sin matches). Se resolvió tocando el archivo (recompile fresco).

## 🎯 PARA MAÑANA (2026-07-15) — retomar acá

1. **Validar en pantalla real (lo que no pude ver yo):**
   - Los 3 fondos nuevos del bento (SEO/CMS/Segura) en **mobile** y **dark mode** (legibilidad, que no se pisen con el texto).
   - Las 4 animaciones de Problema en **mobile**: el **efecto stack** (`StackCard` — que entren de la derecha y se apilen bien, ver el `top` del sticky por si la navbar tapa) y el **escalado** (`ScaleStage`).
2. **Calibrar números si hace falta:** `StackCard` sticky `top` (`88 + i·14px`), distancia de entrada (`x:120`); `ScaleStage` designW (`544`).
3. **Limpieza de código muerto de video** en `diseno-web-problem.tsx`: ya ningún freno usa `<video>` → sacar `videoRefs`, `inView`, `warm`, el `IntersectionObserver` de warming, el array `VIDEOS` y el branch `VIDEOS[i] ?`. Decidir borrar los `.mp4` de `/public` + `animations/website-not-found-bg.tsx` + `card-video-bg.tsx` + `diseno-a-medida-bg.tsx` (sin usar).
4. **Detalles finos del bento "Qué incluye"** (el usuario dijo "pequeños detalles pero después").
5. **Pushear** `develop` a `origin/develop` (~muchos commits acumulados).

---

## 🆕 Sesión 2026-07-11 (resumen)

**Foco: página Diseño Web (`/servicios/diseno-web`) + assets.** Detalle en `docs/diseno-web-page.md`.

- **perf: portfolio a WebP** — 8 capturas `*-raw.png` (~12.8MB) → WebP q80 (~1.27MB, **90% menos**). `lib/portfolio-projects.ts` actualizado. **✅ COMMITEADO** (`c03719c`).
- **CTA "SVG Mask Effect"** (nueva sección `diseno-web-cta.tsx`, reemplaza al `mid-cta` en la página): dos capas full-section (base navy = DOLOR / reveal blanca = SOLUCIÓN con frase clave en **naranja**), spotlight que sigue el cursor. Sin botón ni hint (pedido del usuario). Copy: *"Tu web se ve linda… pero no te trae clientes"* → *"Nosotros creamos la que enamora y vende."* Fallback estático en touch.
- **Sticky Scroll Reveal** en la sección **Problema** (`diseno-web-problem.tsx`): scroll de página + `position:sticky` + `IntersectionObserver` (Lenis-safe). Desktop: 4 frenos que cambian + panel sticky con gradientes. Mobile: tarjetas apiladas.
- **home mobile + página Diseño Web completa** (trabajo del 2026-07-10): **✅ COMMITEADOS** (`76ba725` home mobile, `b16c899` página diseño web).

> ⚠️ **SIN COMMITEAR (2026-07-11):** la CTA mask effect (`diseno-web-cta.tsx` + `mask.svg` + CSS `.dw-cta-*`) y el Sticky Scroll de Problema (`diseno-web-problem.tsx`). Más docs. **Commitear al arrancar mañana.**

### 🐛 GOTCHA importante (Turbopack + Windows)
Editar `app/globals.css` con el dev server corriendo **NO recompila el CSS** (queda stale; el JS/HTML sí actualiza). Pasó 3 veces. **Fix confiable:** parar server → `taskkill //PID <pid> //F` (matar el node que toma el 3006, `TaskStop` no libera el puerto) → `rm -rf .next` → `npm run dev`. Editar solo componentes + Tailwind (sin globals) NO tiene el bug. Detalle en engram.

---

## ✅ HECHO (2026-07-12)

1. **✅ COMMITEADO** lo pendiente del 2026-07-11 (CTA mask + sticky scroll problema + docs) → `6da68b8`. Un solo commit cohesivo: el `globals.css` es compartido entre la CTA y el sticky scroll, así que separar obligaba a staging parcial por hunks (el gotcha frágil). Se usó índice completo (`git add -A`, commit sin pathspec).

2. **✅ BUG del menú activo RESUELTO** → `61a25e2`.
   - **Era peor de lo anotado:** el hardcodeo estaba en DOS lugares, no uno. Desktop `resizable-navbar.tsx:110` (`activeIndex = 0`) **y** mobile `resizable-navbar-demo.tsx:166` (`idx === 0 ? naranja : blanco`).
   - **Fix (una sola fuente de verdad):** helper exportado `getActiveNavIndex(items, pathname)` en `resizable-navbar.tsx` (Home = match exacto de `/`; resto = `pathname === link || startsWith(link + "/")` → `/servicios/diseno-web` activa "Servicios"; devuelve -1 si ninguna ruta es del nav). El container (`resizable-navbar-demo.tsx`) calcula con `usePathname()` y lo pasa como prop a `NavItems` (presentational) y al map del mobile. Se agregó `activeIndex` a las deps del `useLayoutEffect` del indicador para que el punto naranja siga la navegación client-side.
   - **Verificado end-to-end** contra el HTML SSR: desktop y mobile marcan el item correcto en `/`, `/servicios/diseno-web`, `/nosotros`, `/portfolio`. `usePathname()` resuelve en SSR (App Router), así que el naranja ya viene en el HTML servido.

3. **(Opcional, sigue pendiente) Validar copy** de la CTA (*"enamora y vende"*).

### 🎬 Tarde 2026-07-12 · Videos + rediseño de la sección Problema (`diseno-web-problem.tsx`)

Los "gradiente + emoji" del sticky panel se reemplazaron por **4 videos reales** (uno por freno). Commits `36977bb`, `5ac70f8`, `b8abd52`, `08edc70`, `1c133be`, `8d5e429`.

- **Pipeline de video establecido** (ver engram `assets/video-pipeline`): videos en `public/` con nombre SEO (`noatechsolutions-diseno-web-<concepto>.mp4`), `<video muted autoPlay loop playsInline object-contain>`. Comprimidos con **ffmpeg** (instalado hoy vía winget; binario en `.../WinGet/Packages/Gyan.FFmpeg_.../bin/ffmpeg.exe`, el PATH no se refresca en la shell). Comando: `ffmpeg -y -i in.mp4 -an -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4` → ~1.3-1.8MB a ~400-780KB. **Comprimir SIEMPRE antes del primer commit** (git guarda el blob pesado para siempre).
- **Videos:** `carga-lenta`, `no-mobile` (reemplazado por v2), `no-convierte`, `no-seo`. Vienen 1920×1080 (16:9). El panel es `aspect-video` + `object-contain` para mostrarlos **completos, sin recorte**.
- **Detector de scroll REESCRITO:** el `IntersectionObserver` con banda de `rootMargin` se clavaba en el freno 0 en viewports bajos (1024×768). Ahora es scroll-based: marca activo el paso cuyo **centro está más cerca del centro del viewport** (Lenis scrollea nativo → `window scroll` dispara). Robusto a cualquier alto.
- **Título de sección centrado:** `.section-title` (globals.css) tiene `max-width:18ch` **sin `margin:auto`** → en `text-center` la caja quedaba pegada a la izquierda. Fix: `mx-auto` en el `<h2>` (el subtítulo ya lo tenía). **Ojo: esto afecta a `.section-title` en cualquier header centrado del sitio.**
- **Color por freno** (`ACCENTS = ["#1e63e6","#05a5ff","#7c5cff","#ff9900"]`): pinta el título del texto izquierdo y el borde del card activo (transición al scrollear).
- **Copy nuevo:** sin emoji; cada freno = título breve + subtítulo emocional en 1ª persona.

## ✅ HECHO (2026-07-13) · Sesión larga: Problema (optimización + efectos) + Bento "Qué incluye"

> **Todo commiteado hoy.** Commits: `1bc6736`, `ae22a28`, `14daae0` (mañana) + el commit del cierre (bento backgrounds). Branch `develop`, **~44 commits sin pushear a origin**.

### A · Sección Problema (`app/components/sections/diseno-web-problem.tsx`) — commit `1bc6736`

1. **Optimización de carga de los 4 videos.** Antes: 4 `<video autoPlay>` → descargaba **y decodificaba ~2.7MB juntos**. GOTCHAS: `autoPlay` **ignora** `preload`; y con `preload="none"` setear `src` **NO baja nada** hasta `play()`/`load()`. Ahora control **imperativo por refs**: sin `autoPlay`, `preload` **dinámico** (`none` frío / `auto` warm), `src` condicional, `IntersectionObserver` (rootMargin 200px) → 0 bytes fuera de pantalla, estado `warm` (activo + siguiente, solo crece), se **reproduce solo el activo** (1 decoder). Cero pérdida de calidad (no se tocan los `.mp4`).
2. **Centrado título/subtítulo — GOTCHA Tailwind v4** (ver engram `tailwind/unlayered-beats-utilities`): `.section-title`/`.section-copy` tienen `margin:0` y `max-width` **fuera de `@layer`** → el CSS unlayered **le gana a las utilities** (`mx-auto`, `max-w-*` no funcionan). Fix scoped: **`style` inline** (`marginInline:"auto"`, `maxWidth:"min(92vw,72rem)"`) — inline gana a todo. **Fix global pendiente (mejor):** `margin:0` → `margin-block:0` en globals.css (requiere gotcha Turbopack).
3. **Alineación video ↔ texto:** panel sticky `top-[32vh]` → **`top-[42vh]`** para que el top del video coincida con el top del texto activo.
4. **Copy nuevo (opción D, ES/EN):** *"Tu web puede ser tu mejor vendedor… o tu peor enemigo"* / *"Se ve bien, pero si carga lento… cada día perdés clientes que ni sabés que tuviste."* Título en **2 filas** desktop (`lg:block` en la 2ª parte), subtítulo eliminado.
5. **Efecto MagicUI Highlighter** (`app/components/ui/highlighter.tsx`, rough-notation + motion, ambos ya instalados): **subrayado** azul en "tu mejor vendedor" + **resaltado** naranja en "peor enemigo". `isView` → se dibuja al scrollear.
6. **Efecto MagicUI TextReveal** adaptado (`app/components/ui/scroll-reveal-text.tsx`): los textos de cada freno se **revelan palabra por palabra** con el scroll, en sync con el crossfade del video. El componente original trae su propio contenedor de scroll (h-200vh) que NO encaja → se reusó solo el MECANISMO (`useScroll` del propio texto, offset `["start 0.92","start 0.32"]`).
7. **Ritmo más lento + espaciado:** bloques `62vh → 80vh`, crossfade `500ms → 700ms`, más aire entre filas del título (`lineHeight 1.45` + `lg:mt-8`), gap header→video `mt-6 → mt-16`.

### B · Bento "Qué incluye" (`app/components/sections/diseno-web-includes.tsx`) — commit `ae22a28` + cierre

**Efecto bento (MagicUI, reimplementado con estilos de marca, sin deps radix/shadcn):** glow al hover, contenido que se eleva (`lg:group-hover:-translate-y-7`), CTA **"✓ Incluido"** que sube desde abajo — ahora **píldora/badge** azul con texto blanco. Overlay sutil.

**Íconos emoji QUITADOS** de la esquina de todas las cards (texto fijado abajo con `mt-auto`). **Título/subtítulo de la card destacada MÁS grandes** (`text-2xl lg:text-3xl` / `text-base`, acotados `lg:max-w-[54%]`).

**Fondos animados por card — TODO EN CÓDIGO (motion, solo transform/opacity → GPU). Weightless: cero video/decoders/banding, escala infinito.** Se identifican por `c.icon` (estable ES/EN). Hechos 3 de 6:
- **🎨 "Diseño a medida"** (destacada) → `app/components/ui/design-canvas-bg.tsx`: **mockup de landing completa EN INGLÉS** (navbar "Your Company" + logo, hero "More clients for your business" con caret que titila + "Photo" placeholder, features, trust strip, testimonio ⭐, footer). **Al lado** (no encima): herramientas de arte (paleta, pincel, lápiz) + digitales (**sliders/ajustes** + cursor). **Zoom + enfoque al hover** (capa externa = scale, interna = float motion, separadas para no pisar transforms). Blur leve `0.5px` que se enfoca al hover. **`TitleScrim`** = degradado vertical leve sobre todo el card, más fuerte abajo (texto legible, theme-aware). **Versión MOBILE compacta aparte** (`lg:hidden`): mini-ventana + 1 paleta (el desktop no se toca, gateado por breakpoint).
- **⚡ "Carga ultra-rápida"** → `app/components/ui/carga-rapida-bg.tsx`: **medidor de performance** (tipo Lighthouse) que se llena a ~99 + rayo + **"0.1s"** + **chips de assets** (Photo, Video, Animation, Font) que pasan volando con estela.
- **📱 "100% responsive"** → `app/components/ui/responsive-bg.tsx`: **laptop + tablet + teléfono** con la misma web y **reflow real** (3 col → 2 → 1). Cada dispositivo se activa en secuencia (pulse + glow).

### C · Decisión de arquitectura: animaciones a CÓDIGO, no video/GIF (ver engram `diseno-web/animaciones-estrategia`)

Consultado con el Claude-Remotion. **Regla central: el cuello de botella son los DECODERS simultáneos, no el peso** (WebM/AV1 ahorra bytes pero no decoders → el peso es un pescado rojo). **GIF descartado** (256 colores = banding, 15-30x más pesado, sin HW decode). **Ganador: portar a componentes React/CSS/SVG** (las animaciones ya son código en Remotion). Fallback: video con gating (IntersectionObserver) + **source downscaleado** (~600×400, no 1080p).

**El Claude-Remotion entregó ports en `app/components/sections/animations/` (WIP, sin integrar):**
- `diseno-a-medida-bg.tsx` — versión SVG de "diseño a medida". **SIN USAR** (fuimos con `design-canvas-bg.tsx` mío, que al usuario le gustó más). Decidir: mantener o borrar.
- `website-not-found-bg.tsx` — port del freno "invisible en Google" (scroll a lista, sitio enterrado #12). **Para la parte C.**
- `card-video-bg.tsx` — componente de video con gating IntersectionObserver, para la tortuga (carga-lenta) que NO se pudo portar. **Para la parte C.**
- Faltan 2 ports del Claude-Remotion: `no-mobile` (responsive) y `no-convierte` (marquee).

## 🎯 PARA MAÑANA (2026-07-14) — retomar acá

1. **Terminar los fondos del bento (faltan 3 cards):** **🔍 SEO**, **🛠️ Autogestionable**, **🔒 Segura + hosting**. **Patrón:** crear `app/components/ui/<concepto>-bg.tsx` (motion, transform/opacity, weightless) → importar en `diseno-web-includes.tsx` → `const isX = c.icon === "<emoji>"` → render `{isX && <XBg />}`. Ideas: SEO = ranking que sube al #1 en Google / lupa; Autogestionable = editor/CMS con cursor editando un bloque; Segura = candado + escudo + SSL + backups.
2. **Validar en pantalla real (lo que no pude ver yo):** las 3 cards nuevas en **mobile** y en **dark mode** (legibilidad del texto sobre los fondos), que los elementos no se pisen con el texto (abajo-izq) ni el gauge.
3. **Parte C — portar los 4 videos de la sección Problema a código:** integrar `website-not-found-bg` (freno SEO) y `card-video-bg` (tortuga, con source downscaleado); pedir al Claude-Remotion los 2 ports que faltan (`no-mobile`, `no-convierte`). **Ojo integración:** los SVG son **3:2** (viewBox 1200×800) y el panel de Problema es **16:9** (`aspect-video`) → ajustar aspect del panel o viewBox (con `slice` recorta arriba/abajo).
4. **Decidir** sobre `animations/diseno-a-medida-bg.tsx` (sin usar): mantener o borrar.
5. **Pendientes viejos:** validar carga de video de Problema en Network panel; bug global del cursor (`body{cursor:none}`, ver `docs/diseno-web-page.md` punto 7); fix global del centrado (`margin-block:0` en globals.css).
6. **Pushear** los ~44 commits de `develop` a `origin/develop`.

---

## 🆕 Sesión 2026-07-10 (resumen)

**Mañana — home MODO TELÉFONO** (ver detalle abajo): robot oculto en mobile, gear oculto, header centrado, cursor fuera de touch, fondo **Vortex** (partículas navy/sky), ajuste de tamaño de título.

**Tarde — sección Servicios (home)**: reescrita a **scrollytelling pinneado** — las cards entran una por una desde la derecha y se apilan al centro, escrubeado por scroll (después de varias iteraciones: el approach final es sección alta 400vh + pin + `useScroll` con tramos por card). Card **rediseñada compacta** para mobile (bento chips, max-width para que sea cuadrada en teléfonos anchos).

**Nueva página: DISEÑO WEB** (`/servicios/diseno-web`) — estructura completa de 12 secciones. 👉 **Ver `docs/diseno-web-page.md`** (mapa de secciones + estado + pendientes). Destacados: hero con **3D (React Three Fiber)**, **antes/después** (wipe scroll con Motion), **galería bento→fullscreen** (GSAP Flip), e **integración global Lenis↔ScrollTrigger**.

> ⚠️ **TODO sin commitear** (home mobile + página nueva). Asegurar en commits antes de seguir.
> ⚠️ **Regla del usuario:** cambios "solo mobile" NO deben tocar tablet/desktop (usar `order`/`lg:` resets, media queries acotadas).

---

## ✅ HECHO (2026-07-10) — MODO TELÉFONO (mobile) · las 4 tareas cerradas

> ⚠️ **Restricción respetada:** todo acotado a **teléfono** (`max-width: 767px` / `hover: none`). **Tablet y desktop NO se tocaron.** Verificado: dev server HTTP 200, compila limpio, robot fuera del SSR, hero en SSR.

1. **Robot del header — DECISIÓN: ocultar en mobile.** No se reubica; en teléfono no se muestra.
   - `hero-robot-3d.tsx` es un scene Spline de **1.3MB + WebGL** (`lazy()`), peso muerto en mobile.
   - Solución en `header-section.tsx`: estado `mountRobot` (`matchMedia("(min-width: 768px)")`, arranca `null` por SSR). `{mountRobot && <HeroRobot3D/>}` → **ni se monta** en ≤767px (no descarga el 1.3MB), no un `display:none`.
   - **Gotcha clave:** el `onReveal` del robot dispara el reveal del hero. Sin robot, un `useEffect` llama `onReveal()` al instante en mobile (si no, el fallback de 2.2s de `page.tsx` L23 penalizaba el LCP).

2. **Gear de config oculto en mobile** ✅
   - `globals.css`: `@media (max-width: 767px){ .page-settings-gear{ display:none } }` (tras el bloque `.page-settings-gear`, ~L1953). Confirmado: `MobileSpeedDial` (izq) cubre idioma + tema.

3. **Header centrado en mobile** ✅
   - `globals.css`, dentro de `@media (max-width: 767px)` (~L7016): `.is-hero-exp .hero-content{ justify-items:center; text-align:center }` + `.hero-actions{ justify-content:center }` + `.hero-stat{ justify-items:center }` + `.hero-stat-copy{ text-align:center }`.
   - **Ojo especificidad:** se usó el prefijo `.is-hero-exp` (0,0,2) para ganarle a las reglas base que alinean a la izquierda; con `.hero-content` solo NO alcanzaba.

4. **Cursor custom fuera de touch** ✅
   - `hero-cursor.tsx`: estado `enabled` (`matchMedia("(hover: hover) and (pointer: fine)")`); si es falso → `return null` (no listener, no springs). Deps `[x, y, enabled]`.
   - `globals.css` `@media (hover: none)`: se agregó `body` (y `.cta-spotlight-section.is-lit`) al reset `cursor: auto` → tapa el agujero del `body{cursor:none}` global.

---

## 🆕 Sesión 2026-07-09 (resumen — 6 commits, `145f2dc`→`ac7fed3`)

- **feat(services)** `145f2dc`: rediseño color-por-servicio (var `--card-accent`) + estrella destacada (Web & Software).
- **feat(process)** `a2f2568`: sección proceso reescrita a fases reales (descubrimiento/estrategia/construcción/lanzamiento) + barra de progreso vertical liberada + cards livianas (link subrayado) + imágenes WebP 1600×900 (~100KB, antes hasta 10MB).
- **feat(ux)** `6d8cdf7`: cursor tech **global** (`body cursor:none`, inputs exceptuados; excepciones: warning, CTAs, footer) + **spotlight** interactivo (halo + núcleo amarillo + botón que late) en CTA1 y CTA2, generalizado a clases `.cta-spotlight`.
- **fix(faq)** `265ceff`: fondo blanco (`var(--bg-page)`, antes gradiente azulado que cortaba).
- **feat(footer)** `fed9be6`: spotlight blanco (fondo dark) + redes reales (Facebook/Instagram/**X**/**TikTok** con SVG propios) + labels de servicios a las 4 categorías + `/branding` roto→`/servicios` + **rutas portfolio unificadas a `/portfolio`** (`/portafolio` → 308 redirect) + subtítulo portfolio humanizado/SEO.
- **chore** `ac7fed3`: limpieza de assets sin uso + dedupe de ids `#proceso`/`#reviews`.
- Además: convertidas 4 imágenes del proceso a WebP con `sharp`; limpieza de ~28MB en `public/`.
- **Pendientes:** Resend (infra DNS/API key para leads en `contact@`); ~~optimizar los 8 `*-raw.png` del portfolio a WebP~~ ✅ **HECHO 2026-07-11** (12.8MB→1.27MB, 90% menos); mascota Noa huérfana (se MANTIENE por marca NOA-229); footer/chips proceso hardcoded en español (no localizados EN).

---

## 1. Estado general

La home compila y corre (HTTP 200). Se trabajó responsive, header, navbar, servicios y footer.
Los cambios de esta sesión que estaban sin commitear **se commitean hoy** (ver sección 5).

---

## 🆕 Sesión 2026-07-08

### Footer — watermark P1 RESUELTO ✅
- `components/ui/text-hover-effect.tsx`: `textLength={690}` + `lengthAdjust="spacingAndGlyphs"` + `fontSize={104}` en los 3 `<text>` (constantes FONT_SIZE/TEXT_LENGTH), viewBox 100→120. Como `textLength < 720` (ancho del viewBox), el texto **nunca se desborda** + efecto "alargado". Ojo: hubo que sacar `text-7xl` porque la font-size de la clase CSS le gana al atributo SVG `fontSize`.
- `footer-section.tsx`: columna de contacto a 1024 — `lg:px-10 xl:px-14`, `lg:gap-6`, email `whitespace-nowrap lg:text-[13px]` → entra en 1 línea.

### Hero — mascota Noa → robot Spline (SELF-HOSTED)
- **Decisión del usuario**: reemplazar Noa por robot 3D de Spline (21st.dev) que sigue el cursor. Advertí (1) Noa es marca (NOA-269/271), (2) CDN externo violaría la decisión de §Descartado. Eligió **self-hosted**.
- `public/spline/robot.splinecode` (1.3MB, servido local, **NO CDN**). Deps nuevas: `@splinetool/react-spline` + `@splinetool/runtime`.
- `components/ui/splite.tsx` (SplineScene lazy) + `app/components/sections/hero-robot-3d.tsx` (HeroRobot3D).
- `header-section.tsx`: import `HeroExperiment3D` → `HeroRobot3D`. **`hero-experiment-3d.tsx` (Noa) quedó INTACTO para revertir fácil** (re-importar y usar `<HeroExperiment3D />`).
- Robot: sin card (transparente), canvas sangra al borde derecho (`right: calc(50% - 58vw); width: 76vw`), detrás del texto (z-index 1) para no tapar la navbar, divider full-width abajo (`.hero-bottom-divider`) que disuelve el corte de piernas.
- Color: tinte azul dark on-brand `#022977` (navy DS) en `onLoad` — pinta todas las piezas (SKIP luces por nombre). **Para volver al original: borrar el `forEach` de color en `hero-robot-3d.tsx`.**

### Cursor custom por zona (nuevo)
- `app/components/hero-cursor.tsx`: retículo **tech** en `#home`, triángulo **warning** en `.growth-section`. Montado en header-section. Escucha `window` mousemove, `closest()` decide zona. CSS en globals (buscar "Cursor 3D tech"). Respeta `prefers-reduced-motion` + touch.

### Nav — tuerca con hover + menú
- `resizable-navbar.tsx` (NavSettingsGear): abre con **hover** (`onMouseEnter/Leave` + `closeTimer` 160ms para cruzar el hueco del abanico). Íconos del abanico más separados (globals `.nav-gear.is-open .nav-gear-item-*`).
- Quitado item **"Contacto"** del menú (`resizable-navbar-demo.tsx` navItems) — ya existe el botón CONTACTAR.

### SEO
- **Subtítulo** hero (ES+EN) reescrito, corto + keywords (patrón "transformación primero"): *"Convertimos tu presencia digital en más clientes con diseño web, software a medida y marketing que da resultados."*
- `layout.tsx` metadata: agregado **"software a medida"** (servicio estrella P1 que faltaba) a title/description/keywords/og/twitter + acentos corregidos.

### Sección Problemas (cards warning)
- `problems-section.tsx` + globals: letra `0.72→1.05rem`, texto a **2 líneas** (saqué `white-space: nowrap`, ancho card 21rem), ícono círculo `1.65→2.35rem` con `flex: 0 0 auto` (no óvalo) + `TriangleAlert` `14→22px`.

### ⏳ Pendiente para mañana (de esta sesión)
- **Color fino del robot**: hoy pinta todas las piezas del mismo navy (pierde detalle metálico). Para un pase por pieza (cuerpo/acentos/luz) faltan los **nombres de los objetos del scene** → pedírselos al usuario desde `F12 → Console → [robot-objects]` (el forwarding del server no los captura).
- Validar cursor warning / hover tuerca / separación íconos según feedback del usuario.

---

## 2. Hecho en esta sesión (✅) · [histórico 2026-07-07]

### Responsive / sistema (ya commiteado antes de hoy)
- **DS 03b · breakpoints canónicos** `768 / 1024 / 1440` + limpieza off-by-one en `globals.css`.
- **Tailwind alineado**: `--breakpoint-xl: 1440px` en `@theme`.
- **Hydration fixes**: theme (`suppressHydrationWarning` en `layout.tsx`) + i18n (`language-provider.tsx`).
- Docs: `docs/brand-manual/03b-responsive-breakpoints.md`.

### Header (hero) — `app/components/sections/header-section.tsx` + `hero-experiment-3d.tsx`
- Layout **texto a la izquierda** + pieza central 3D a la derecha (`.is-hero-exp`).
- Pieza central = **mascota Noa** (`/noa/noa-mascot-original.png`, ya sonríe + saluda) en **card espacial con borde liquid-glass**, con **tilt 3D reactivo al scroll** (motion `useScroll`+`useSpring`) y burbuja "¡Hola! 👋". Animación de saludo en loop (`hero-noa-wave`).
- Título del hero **más chico** (`clamp(2.5rem, 5vw, 4.4rem)`).
- **Quitada** la mano robótica (del header) y la **mascota flotante** (de `page.tsx`: import + `useNoaScroll` + `<NoaMascot>`).

### Navbar — tuerca de configuración
- Los botones de **idioma/tema salieron del menú**. Ahora viven en una **tuerca fija (sticky) en la esquina superior DERECHA** (`.page-settings-gear`, `NavSettingsGear` en `ui/resizable-navbar.tsx`, montada en `page.tsx`).
- Abre un **abanico radial** (idioma ES/EN + tema sol/luna) hacia **abajo-izquierda**. La tuerca rota 120° al abrir.
- `NavInlineControls` / `NavFloatingControls` quedaron sin usar en `resizable-navbar-demo.tsx` (código muerto, se puede limpiar).

### Servicios — `app/components/sections/services-section.tsx`
- **Cards de la derecha CENTRADAS verticalmente** (a 50vh, misma altura que el texto izquierdo `items-center h-screen`).
  - Se mide la **altura real de la card** con JS (`card.offsetHeight`) → `top: calc(50vh - mitad)` vía el **`style` del CardSticky** (Motion lo respeta; el `!important` de CSS NO funcionaba).
  - **Clave**: se removió `layout="position"` de `components/ui/cards-stack.tsx` — ese prop de Motion aplicaba un transform que pisaba el `top`.
  - Scopeado a desktop con `matchMedia("(min-width: 1024px)")`.
- **Reducida la distancia al CTA**: sección `min-h 280vh → 210vh`, `pb 60vh → 30vh`.

### Layout / padding
- **`.grid-shell`** con margen lateral fluido: `min(1180px, calc(100% - clamp(2rem, 6vw, 6rem)))` → ~16px mobile · ~30px en 1024 · 48px en 1440+ (DS). Afecta hero, proceso, reseñas.
- Servicios: `px-6 → lg:px-12`.

### Footer — `app/components/sections/footer-section.tsx`
- **Full width**: se quitó `rounded-3xl mx-4 mb-4` + `clipPath`. Fondo edge-to-edge, contenido centrado en `max-w-7xl`.
- **Watermark "NoaTechSolutions" más grande**: `viewBox` del SVG `900 → 720` en `components/ui/text-hover-effect.tsx` (texto llena ~92% del ancho).
- **Columna de contacto (fix 1024)**: el email se desbordaba a la derecha. Solución: `min-w-0` + `wrap-break-word` en los items + gap `lg:gap-10 xl:gap-16`.

### Documentación / estrategia
- **`docs/web-structure.md`**: consolidación del Brief Maestro del diseñador + docs `01d` (espaciado) y `02a2` (mapa sitio). Decisión: **el DS del repo manda** sobre el brief (fuentes Space Grotesk, navy #022977). Ver también engram `brand/canonical-source`.

### Descartado
- **Efecto TubesCursor (WebGL de la CDN)**: se probó en el header y se hizo **rollback completo** (el lib de jsdelivr fallaba: WebGPU→WebGL2 devolvía contexto null). No usar CDN externos en runtime.

---

## 3. ⏳ TAREAS PENDIENTES (retomar acá mañana)

### ✅ P1 — RESUELTO (2026-07-08) · Watermark del footer se desborda (pedido explícito)
El título grande **"NoaTechSolutions"** del footer **se desborda por derecha e izquierda**.
- **Objetivo**: que NO se desborde.
- **Restricción del usuario**: se puede **agrandar en tamaño (alto), NO en ancho**.
- **Dónde**: `components/ui/text-hover-effect.tsx` (SVG `viewBox="0 0 720 100"`, texto `text-7xl` en `x/y = 50%`). El contenedor: `footer-section.tsx` → `<div className="lg:flex hidden h-48 -mt-4 overflow-visible">`.
- **Pista**: al bajar el viewBox a 720 el texto quedó ancho pero se sale por los lados. Para "más alto, no más ancho": subir el `viewBox` height (ej. `0 0 720 130`) y/o el `font-size`/alto del contenedor manteniendo el ancho controlado, o ajustar `preserveAspectRatio`. Probar valores y verificar que NO se corte lateralmente.

### 🟠 P2 — Validación visual pendiente (el usuario estaba revisando)
- Confirmar en **1024x768** que: cards de servicios quedan centradas, footer full-width OK, columna contacto ya no pegada.
- Revisar si **otras secciones** (problemas, mid-CTA, portafolio, CTA final, FAQ, contacto) se ven pegadas a los lados en 1024 — tienen su **propio contenedor**, no `grid-shell`. Si alguna está tight, pasada consistente de padding.

### 🟢 P3 — Gaps estructurales del brief (de `web-structure.md` §8)
- **Sección "Productos propios"** en la home (NTSSign + KinderCtrl) — NO existe, es el gap clave del brief.
- Página **`/productos`**.
- **8 servicios en 4 categorías** (hoy el nav lista 3).
- Menú **"Productos ⌄"**.
- Docs del brief que faltan: `02c` (briefs Hero + Productos), `01e_MarcasHijas`.

### Limpieza técnica (opcional)
- `NavInlineControls`/`NavFloatingControls` + `LanguageToggle`/`ThemeToggle` sin uso en el navbar.
- CSS muerto: `.nav-float-lang`/`.nav-float-theme`, `.nav-float-gear`.
- `app/components/site-footer.tsx` (footer viejo) parece no usarse.

---

## 4. Archivos tocados esta sesión

| Archivo | Qué |
|---|---|
| `app/globals.css` | breakpoints, grid-shell fluido, hero-exp (mascota/liquid-glass), nav-gear, limpieza |
| `app/components/sections/header-section.tsx` | hero texto-izquierda + mascota, sin mano |
| `app/components/sections/hero-experiment-3d.tsx` | pieza 3D mascota saludando |
| `app/components/sections/services-section.tsx` | centrado cards (JS + style.top), altura/pb reducidos |
| `app/components/sections/footer-section.tsx` | full width, watermark, fix contacto |
| `app/components/ui/resizable-navbar.tsx` | `NavSettingsGear` (tuerca) |
| `app/components/resizable-navbar-demo.tsx` | quitados controles del menú |
| `components/ui/cards-stack.tsx` | quitado `layout="position"` |
| `components/ui/text-hover-effect.tsx` | viewBox 900→720 |
| `app/page.tsx` | tuerca montada, mascota flotante quitada |
| `docs/web-structure.md`, `docs/home-progress.md` | documentación |

---

## 5. Cómo retomar mañana

1. `npm run dev` → http://localhost:3006
2. Abrir DevTools en **1024x768** y validar servicios/footer (P2).
3. Atacar **P1** (watermark que no se desborde, más alto no más ancho) en `text-hover-effect.tsx`.
4. Luego, si el usuario confirma, arrancar el gap grande: **sección Productos en la home** (P3).
