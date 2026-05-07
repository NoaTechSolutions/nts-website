# 10 · Copy y voz textual (DS 10)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobado | v0.1 | 2026-05-07 |

> Sección 10 del Manual de Marca. Lado verbal del proyecto · filosofía editorial, atributos de voz, bilingüismo ES neutro / EN US, microcopy patterns canónicos, glosario, reglas de formato y tone shifts. **Cierra el manual v1.x junto con DS 09.**

---

## Contenido

1. [Filosofía de la voz NTS](#1-filosofía-de-la-voz-nts)
2. [Atributos de voz · 5 adjetivos canónicos (DS-045)](#2-atributos-de-voz--5-adjetivos-canónicos-ds-045)
3. [Bilingüismo ES neutro / EN US (DS-046)](#3-bilingüismo-es-neutro--en-us-ds-046)
4. [Microcopy patterns canónicos · 32 ES/EN (DS-047)](#4-microcopy-patterns-canónicos--32-esen-ds-047)
5. [Glosario · qué decimos vs qué evitamos · 22 pares (DS-048)](#5-glosario--qué-decimos-vs-qué-evitamos--22-pares-ds-048)
6. [Reglas de formato · 6 reglas (DS-049)](#6-reglas-de-formato--6-reglas-ds-049)
7. [Tone shifts por sección · 8 contextos (DS-050)](#7-tone-shifts-por-sección--8-contextos-ds-050)
8. [Glosario bilingüe técnico · 30 términos (DS-051)](#8-glosario-bilingüe-técnico--30-términos-ds-051)
9. [Auditoría preventiva · 16 hallazgos](#9-auditoría-preventiva--16-hallazgos)
10. [Aplicación visual · antes/después](#10-aplicación-visual--antesdespués)
11. [Migraciones pendientes en código](#11-migraciones-pendientes-en-código)
12. [Decisiones de diseño](#12-decisiones-de-diseño)
13. [Historial de cambios](#13-historial-de-cambios)

---

## 1. Filosofía de la voz NTS

El copy de NTS **no vende. Explica con calma** lo que hacemos, asume inteligencia del lector y cumple lo que promete. Profesional con calor humano. Técnico cuando importa, llano cuando no. Cero jerga vacía, cero promesas sin métrica detrás.

> **La voz es la prolongación del trabajo**: si el sitio se ve sobrio y rápido, el copy debe sonar sobrio y rápido.

### Qué transmite el copy NTS

| Atributo | Manifestación |
|---|---|
| **Calidad** | Cada palabra justifica su lugar · nada de relleno |
| **Atención** | Detalles que demuestran cuidado: el "+" en "150+ proyectos", la coma serial, las cifras coherentes |
| **Claridad** | Una idea por frase. Si una oración necesita coma + "que" + coma, se parte en dos |
| **Profesionalismo cálido** | Trato cercano sin perder distancia técnica · ni "Estimado cliente" ni "¡Hola amigo!" |
| **Honestidad** | "150 proyectos" antes que "incontables" · "California" antes que "todo el mundo" · específico siempre gana |

### Linaje editorial · qué tomamos

| Referencia | Qué tomamos |
|---|---|
| **Vercel** · técnico claro | Cero jerga vacía. Oraciones cortas. La home dice qué es y qué hace, no qué se siente |
| **Linear** · asume inteligencia | No explica obviedades. Sin paternalismo. Confía en que el lector entiende "deploy" o "issue" |
| **Stripe** · cálido sin cursi | Profesional con calor humano. Errores honestos. Confirmaciones sobrias. Precios transparentes |
| **Resend** · directo con humor sutil | Técnico con un toque cálido. La firma del fundador en el footer. Honestidad sobre el producto |

### Tropos rechazados por sistema

| ❌ Tropo | ✓ NTS dice | Por qué |
|---|---|---|
| Marketing speak · *"Revolucionamos tu negocio digital"* · *"Sinergias 360°"* | *"Diseñamos y desarrollamos sitios web"* · *"SEO técnico + branding"* | Verbo concreto + objeto concreto · cero métrica vacía |
| Cute corporativo · *"¡Increíble! ¡Vamos juntos!"* · *"¡Awesome trabajo!"* | *"Empezar proyecto"* · *"Mensaje enviado"* · *"Listo"* | Imperativo suave · pasado claro · sin signos enfáticos |
| Promesas vacías · *"El mejor estudio de California"* · *"Único en su tipo"* | *"7+ años · 150 proyectos · California"* · *"Discovery · diseño · build · entrega"* | Cifras concretas · proceso explícito · compromiso medible |

### Lista de tropos prohibidos · zero tolerance

- 🚫 MAYÚSCULAS ESTRIDENTES en CTAs o headings ("GRATIS", "COMPRA YA") → sentence case siempre
- 🚫 Imperativos agresivos ("¡Compra ya!", "¡No esperes más!", "¡Aprovecha!") → imperativo suave sin "!"
- 🚫 ESL false friends ("Aplique aquí" por *apply*, "Realice un click") → "Postular" / "Hacer clic"
- 🚫 Buzzwords sin sustancia ("transformación digital", "experiencia única", "soluciones 360°") → describir lo que hacemos
- 🚫 Promesas grandilocuentes ("el mejor", "increíble", "único en su tipo") → cifras o silencio
- 🚫 Emojis decorativos en CTAs, headings, errores y meta tags → reservados para Mascota Noa visual y casos editoriales explícitos
- 🚫 Signos de exclamación en producción (incluso en confirmaciones de éxito · evaluar)

---

## 2. Atributos de voz · 5 adjetivos canónicos (DS-045)

Cinco atributos que definen toda producción textual. Alineados con DS-033 (Noa: curiosa, cálida, técnica, amable). Cada uno con ejemplo correcto e incorrecto para auditoría rápida.

| ID | Atributo | Definición | ✓ Correcto | ❌ Incorrecto |
|---|---|---|---|---|
| **A1** | **Claros** | Sin jerga · oraciones cortas · una idea por frase | "Diseñamos sitios web rápidos" | "Soluciones digitales 360°" |
| **A2** | **Cálidos** | Profesional con calor humano · `tú` neutro · sin "Sr./Sra." | "Te respondemos en 24h" | "Estimado cliente" |
| **A3** | **Técnicos** | Precisos cuando importa · stack real · métricas reales | "Next.js · Tailwind · Vercel" | "Tecnología de punta" |
| **A4** | **Honestos** | Sin promesas sin métrica · cifras concretas siempre | "150+ proyectos · 7+ años" | "Incontables proyectos exitosos" |
| **A5** | **Sobrios** | Cero exclamación · cero emoji decorativo · calma editorial | "Mensaje enviado" | "¡Genial! 🎉 ¡Listo!" |

### Mapping con DS-033 (Mascota Noa)

Noa es la **encarnación visual de la voz**. Su silencio (DS-033 estableció que no habla) deja que el copy escrito haga el trabajo verbal. La coherencia entre los dos canales es deliberada:

| Voz textual NTS | Mascota Noa (DS-033) | Cómo se conectan |
|---|---|---|
| Claros | Curiosa | Curiosidad implica preguntar lo justo · claridad implica responder lo justo |
| Cálidos | Cálida / amable | Pulse Sky en Noa = calidez visible · "Te respondemos en 24h" = calidez verbal |
| Técnicos | Técnica | Geometría limpia + stack real · ambos comunican competencia sin alardear |
| Honestos | Silente | Noa no exagera porque no habla · el copy no exagera porque no hay sitio para promesas vacías |
| Sobrios | Geometría minimal | Sin adornos visuales en Noa · sin adornos verbales en el copy |

---

## 3. Bilingüismo ES neutro / EN US (DS-046)

El sitio es bilingüe con `hreflang="es"` y `hreflang="en"` ya implementados. Esta sección formaliza la fuente de verdad, el tratamiento, y la estrategia de traducción.

### Fuente de verdad · ES neutro como base

Toda la copy **nace en español neutro** (memoria del proyecto · directiva Israel). El inglés se traduce desde ahí. Esto es deliberado: la voz se diseña en ES neutro y se exporta a EN, no al revés. Mantiene coherencia editorial con el origen del estudio (California · Latinoamérica) y evita anglicismos forzados que delatan traducción literal.

### Tratamiento ES · `tú` neutro

| Opción | Decisión | Por qué |
|---|---|---|
| `tú` | ✅ Canónico producción | Cercano sin perder profesionalismo. Estándar editorial neutro Latinoamérica/España. Lo que ya usa el sitio en CTAs y forms |
| `usted` | ❌ NO | Distancia excesiva para audiencia tech moderna. Suena formal anticuado en California/LATAM 2026 |
| `vos` | ❌ NO en producción | Solo conversación interna del equipo (Rioplatense). Memoria del proyecto: "el copy de la web en español neutro". Vos quedaría regional |

> **Excepción operativa documentada**: el lenguaje interno del equipo (Israel, Slack, internal docs) puede usar voseo Rioplatense. **Cero voseo en producción** del sitio, emails transaccionales, contratos o materiales de marca.

### Tratamiento EN · "you" casual · US English

- **"you" casual**, no "you" formal. Linaje Stripe/Vercel. Cercano sin pretensión
- **US English** como variante: `color` (no `colour`), `optimize` (no `optimise`), `center` (no `centre`). Target principal California
- **Date format US**: `May 7, 2026` (no `7 May 2026` al estilo UK)
- **Símbolos**: `$299` con USD por defecto. Si EUR, código explícito `EUR 299`

### Estrategia de traducción · adaptada, no literal

| Caso | Estrategia | Ejemplo |
|---|---|---|
| CTA | Adaptación idiomática · prioriza el verbo natural en cada idioma | ES *"Empezar proyecto"* → EN *"Start your project"* (no *"Start project"*, suena cortante en EN) |
| Headline | Adaptación con misma intención · puede cambiar estructura | ES *"Eleva tu negocio a la era digital"* → EN *"Bring your business into the digital era"* (no *"Elevate"*, literal y frío) |
| Términos técnicos | Sin traducir cuando son convención | "Implementamos SEO técnico" / "We implement technical SEO" — ambos mantienen "SEO" |
| Errores | Adaptación · cero traducción literal | ES *"Algo salió mal"* → EN *"Something went wrong"* (no *"Something exited bad"*) |
| FAQ | Reformulación natural · primera persona en ambos | ES *"¿Cuánto cuesta empezar?"* → EN *"How much does it cost to start?"* |
| Marca / proper nouns | Sin traducir nunca | "NoaTechSolutions", "NTSsign", "Noa" idénticos en ambos idiomas |

### Términos sin traducir vs traducidos

**Sin traducir** (uso convencional en el ecosistema):
- `SEO`, `UX`, `UI`, `SaaS`, `API`, `e-commerce`, `landing page`
- `Next.js`, `Tailwind`, `Vercel`, `React`, `TypeScript`, `Node.js`
- `dashboard`, `onboarding`, `checkout`, `backend`, `frontend`, `responsive`, `hosting`
- `branding`, `copywriting`, `storytelling` cuando es contexto profesional

**Traducidos** (tienen equivalente claro y natural):
- Web design ↔ Diseño web · siempre traducido
- Software development ↔ Desarrollo de software
- Click ↔ Clic (ES localizado · no "click")
- Booking ↔ Agendar (no "bookear")
- Feedback ↔ Comentarios (salvo contexto técnico explícito)

---

## 4. Microcopy patterns canónicos · 32 ES/EN (DS-047)

Patterns de uso por contexto. Fuente de verdad para `lib/i18n.ts`, `contact-form`, FAQ y todos los componentes con copy.

### CTAs · 6 patterns

| ID | Contexto | ES | EN | Notas |
|---|---|---|---|---|
| MC-01 | CTA primario hero | Empezar proyecto | Start your project | Imperativo suave · sin "!" · "empezar" más cálido que "iniciar" |
| MC-02 | CTA secundario hero | Ver casos | See our work | Verbo + sustantivo concreto · "casos" más directo que "portafolio" |
| MC-03 | CTA Band | Solicitar propuesta | Request a proposal | Verbo formal cuando hay contrato detrás |
| MC-04 | CTA terciario nav | Contacto | Contact | Sustantivo · neutro · más sobrio que "Contáctanos" |
| MC-05 | CTA explorar servicios | Ver servicios | View services | "Ver" antes que "explorar" (más rápido y honesto) |
| MC-06 | CTA ghost / link | Saber más | Learn more | Sin "→" en el copy · la flecha la pone el componente DS-017 ghost |

### Forms · 12 patterns

| ID | Contexto | ES | EN | Notas |
|---|---|---|---|---|
| MC-07 | Label nombre | Nombre | Name | Una palabra · sin "*" en label |
| MC-08 | Label email | Email | Email | Sin traducir · convención universal |
| MC-09 | Label mensaje | Mensaje | Message | No "Cuéntanos sobre tu proyecto" en label · eso va en placeholder |
| MC-10 | Placeholder mensaje | Cuéntanos sobre tu proyecto | Tell us about your project | Imperativo suave · invita sin presionar |
| MC-11 | Helptxt opcional | Opcional | Optional | Una palabra · evitar "(opcional)" con paréntesis |
| MC-12 | Submit idle | Enviar mensaje | Send message | Sentence case · sin signo final |
| MC-13 | Submit loading | Enviando… | Sending… | Gerundio + ellipsis (… Unicode, no `...`) |
| MC-14 | Success | Mensaje enviado | Message sent | Pasado claro · sin "¡Genial!" ni emoji |
| MC-15 | Success descripción | Te respondemos en 24h | We'll get back to you within 24h | Compromiso medible · "24h" antes que "pronto" |
| MC-16 | Error campo email | Email inválido. Verifica el formato | Invalid email. Check the format | Específico + acción |
| MC-17 | Error campo requerido | Este campo es obligatorio | This field is required | Neutro · sin "Por favor" |
| MC-18 | Error rate-limit | Recibimos varios mensajes. Espera unos minutos | We received several messages. Wait a few minutes | Honesto · sin culpar al user |

### Errores genéricos · 4 patterns

| ID | Contexto | ES | EN | Notas |
|---|---|---|---|---|
| MC-19 | 404 page | Esta página no existe | This page doesn't exist | Honesto · sin "¡Ups!" · ofrecer link al home |
| MC-20 | 500 page | Algo se rompió de nuestro lado | Something broke on our side | Asume responsabilidad |
| MC-21 | Error genérico inline | Algo salió mal. Intenta de nuevo | Something went wrong. Try again | Humilde · próximo paso · sin "Lo sentimos" |
| MC-22 | Sin conexión | Sin conexión. Revisa tu internet | No connection. Check your internet | Diagnóstico + acción · sin tono dramático |

### Estados · loading, empty, success · 5 patterns

| ID | Contexto | ES | EN | Notas |
|---|---|---|---|---|
| MC-23 | Loading genérico | Cargando… | Loading… | Sin "Por favor espera" · sin emoji · ellipsis Unicode |
| MC-24 | Empty state lista | No hay nada acá todavía | Nothing here yet | Honesto · "todavía/yet" deja la puerta abierta |
| MC-25 | Empty con CTA | No hay proyectos. Empieza el primero | No projects yet. Start the first one | Diagnóstico + invitación específica |
| MC-26 | Success genérico | Listo | Done | Una palabra · sin "¡Éxito!" ni emoji · Stripe-style |
| MC-27 | Copia portapapeles | Copiado | Copied | Pasado · una palabra · toast 1.5s |

### Navegación + helptexts · 5 patterns

| ID | Contexto | ES | EN | Notas |
|---|---|---|---|---|
| MC-28 | Nav home | Inicio | Home | "Inicio" antes que "Home" en ES (localizado) |
| MC-29 | Nav servicios | Servicios | Services | Plural en ambos · DS-013 nav structural |
| MC-30 | Nav contacto | Contacto | Contact | Singular en ambos · sustantivo |
| MC-31 | Footer copyright | © 2026 NoaTechSolutions · California | © 2026 NoaTechSolutions · California | Mismo string ambos idiomas |
| MC-32 | Trust strip form | 24h respuesta · Sin compromiso · NDA disponible | 24h response · No commitment · NDA available | 3 chips DS-005-pill · separador medium dot |

---

## 5. Glosario · qué decimos vs qué evitamos · 22 pares (DS-048)

22 pares "preferido / evitar" con razón documentada. Fuente para revisión de copy nuevo y auditoría de copy existente.

| ID | ✓ Preferido | ❌ Evitar | Razón |
|---|---|---|---|
| G-01 | Consulta gratuita | ASESORÍA GRATIS | Mayúsculas estridentes · "asesoría" suena legal · "gratis" en mayúsculas grita |
| G-02 | Sin compromiso | 100% libre | Buzzword vacío · "100%" sin métrica · "libre" ambiguo |
| G-03 | 150+ proyectos | Incontables proyectos | Honestidad cuantitativa · "+" da margen · número exacto da credibilidad |
| G-04 | Diseñamos sitios web | Soluciones digitales 360° | Verbo concreto + objeto · "360°" buzzword vacío |
| G-05 | California | En todo el mundo | Específico · honesto · target real |
| G-06 | Clic / hacer clic | Click / clickear | Localización ES · DRAE acepta "clic" · "clickear" calco innecesario |
| G-07 | Agendar / reservar | Bookear | Calco innecesario · "agendar" preciso y profesional |
| G-08 | Comentarios | Feedback (en contexto general) | Localización · feedback OK en contexto técnico interno · público use "comentarios" |
| G-09 | Setup gratis | Inicio sin costo | "Setup" anglicismo aceptado en tech · más conciso · ya en producción |
| G-10 | Sitio web rápido | Web optimizada al máximo | Atributo concreto · "al máximo" sin métrica |
| G-11 | Empezar proyecto | ¡Iniciar tu proyecto! | "Empezar" más cálido que "iniciar" · sin "!" · sin "tu" redundante |
| G-12 | Te respondemos en 24h | Respondemos lo antes posible | Compromiso medible · "lo antes posible" cobertura ambigua |
| G-13 | Diseño que convierte | Diseño espectacular | Atributo medible (conversión) vs adjetivo subjetivo |
| G-14 | 7+ años | Años de experiencia | Cifra concreta · "+ años" implica experiencia |
| G-15 | Algo salió mal | ¡Ups! Algo falló | "Ups" cute corporativo · sin signo exclamación |
| G-16 | Mensaje enviado | ¡Genial! Tu mensaje llegó perfectamente | Pasado claro 2 palabras · cero adjetivos enfáticos |
| G-17 | Listo | ¡Éxito! | Una palabra · sin signo · Stripe-style |
| G-18 | Postular / aplicar (a empleo) | Aplicar aquí (en otros contextos) | "Aplicar" ESL false friend en contextos no-empleo |
| G-19 | Discovery · diseño · build · entrega | Proceso revolucionario en 4 pasos | Lista concreta de fases · "revolucionario" buzzword |
| G-20 | SEO técnico | SEO de última generación | Adjetivo concreto (técnico = on-page/perf) vs grandilocuente |
| G-21 | Estudio de diseño | Agencia de soluciones digitales | "Estudio" honesto al tamaño · "agencia 360°" buzzword |
| G-22 | Hablamos pronto | ¡Estamos ansiosos por escucharte! | Sobrio · 2 palabras · cero performance emocional |

---

## 6. Reglas de formato · 6 reglas (DS-049)

| # | Regla | Detalle |
|---|---|---|
| **R1** | **Mayúsculas · sentence case siempre** | CTAs, headings, labels, opciones de menú: solo la primera letra en mayúscula. **Cero TITLE CASE** ("Empezar Tu Proyecto") y **cero MAYÚSCULAS COMPLETAS** ("EMPEZAR PROYECTO"). Nombres propios respetan su grafía: NoaTechSolutions, NTSsign, Next.js, iOS, SEO |
| **R2** | **Puntuación · oraciones cortas · cero exclamación** | Una idea por frase. Sin punto final en CTAs, headlines de hero ni labels. Ellipsis Unicode `…` (no `...`). Coma serial (Oxford) en listas: "diseño, desarrollo, y entrega". Cero "!" en producción salvo casos editoriales explícitos previa aprobación |
| **R3** | **Números · cifras desde 10** | De 0 a 9: en letra ("cinco proyectos"). De 10 en adelante: cifra ("150 proyectos"). **Excepción**: stats de hero/marketing siempre en cifra para impacto visual ("7+ años", "98% satisfacción"). Decimales con punto en EN ($2.99) y coma en ES ($2,99) salvo cifras absolutas y precios USD que mantienen punto |
| **R4** | **Fechas · formato bilingüe** | ES: `7 de mayo de 2026` · EN: `May 7, 2026`. **Cero formato numérico ambiguo** (`05/07/2026` es 5 julio en ES y 7 mayo en EN). Si el espacio obliga formato corto, usar `2026-05-07` ISO 8601. Año siempre completo (no `'26`) |
| **R5** | **Símbolos y unidades** | Moneda: `$299` implica USD por defecto · si EUR explicitar `EUR 299` · si CLP/MXN/ARS también código + cifra. Porcentaje pegado: `98%` (no `98 %`). Plus: `150+` sin espacio. Símbolo separador medium dot `·` (Unicode U+00B7): "Diseño · desarrollo · entrega" — **usar el `·` y no la pipe `\|` ni el guión `-`** |
| **R6** | **Listas · paralelismo** | Todos los items con la misma estructura gramatical. Si uno empieza con verbo, todos empiezan con verbo. Si uno es sustantivo, todos son sustantivos. Sin mezclar oración completa con frase corta. Termina cada item con o sin punto, pero **consistente en toda la lista** |

---

## 7. Tone shifts por sección · 8 contextos (DS-050)

La voz NTS es **una sola**, pero el tono se modula por contexto.

| Sección | Tono | Ejemplo |
|---|---|---|
| **Hero** | Visión · breve · aspiracional pero cuantificable | *"Diseño que convierte visitas en clientes"* — una sola frase, sin verbos imperativos. La promesa es el atributo del trabajo, no el ego del estudio |
| **Servicios** | Concreto · listado · sin adornos | *"Diseño web · SEO técnico · branding · desarrollo"* — lista de capacidades, sin adornos. Cero adjetivos calificadores ("excepcional", "premium"). Medium dot · separa entradas de igual peso |
| **Process** | Técnico · paso a paso · honesto | *"Discovery · diseño · build · entrega"* — honestidad sobre cómo trabajamos. Inglés conservado en términos convencionales. Cuatro fases, no cinco ni siete inflados |
| **CTA Band** | Acción · imperativo suave | *"Empezar proyecto"* — verbo en infinitivo cuando el botón es la acción. Sin "ya", sin signos. Confianza sin urgencia |
| **FAQ** | Conversacional · primera persona | *"¿Cuánto cuesta empezar?"* — *"Desde $299. Setup gratis."* — pregunta como la haría el cliente. Respuesta directa con cifra. Sin "Bueno…" ni "Es una excelente pregunta" |
| **Forms** | Cálido · profesional · seguro | *"Cuéntanos sobre tu proyecto"* — *"Te respondemos en 24h"* — invita sin presionar. Compromiso medible explícito. Cero "rellena este formulario" ni "ingresa tus datos" |
| **Error / 404 / 500** | Humilde · próximo paso | *"Algo salió mal. Intenta de nuevo"* — *"Esta página no existe"* — asume responsabilidad cuando es nuestra. Reconoce el hecho sin dramatizar. **Siempre ofrece próximo paso** (botón al home, retry, contacto) |
| **Footer / Legal** | Mínimo · información clave | *"© 2026 NoaTechSolutions · California"* — datos esenciales. Sin "Todos los derechos reservados" salvo legal explícito. Sin tagline duplicada. **Una línea** |

---

## 8. Glosario bilingüe técnico · 30 términos (DS-051)

Términos canónicos del lado profesional con su traducción y nota de uso. Fuente para `lib/i18n.ts`, copy editorial y meta tags.

| ID | ES | EN | Notas de uso |
|---|---|---|---|
| T-01 | Diseño web | Web design | Sin guión · ambos idiomas separados |
| T-02 | Desarrollo de software | Software development | Sin "a medida" cuando es obvio. Solo agregar si distingue de SaaS |
| T-03 | SEO | SEO | Sigla universal · sin traducir · "SEO técnico" / "technical SEO" |
| T-04 | Branding | Branding | Sin traducir · "identidad de marca" solo si el contexto exige ES puro |
| T-05 | e-commerce | e-commerce | Con guión · ambos idiomas · "tienda online" admisible en ES |
| T-06 | Dashboard | Dashboard | Sin traducir · "panel" en contextos generales no-tech |
| T-07 | Sitio web | Website | "Sitio web" preferido a "página web" cuando es multipágina |
| T-08 | Landing page | Landing page | Sin traducir · "página de aterrizaje" calco innecesario |
| T-09 | UX / UI | UX / UI | Siglas universales · sin traducir |
| T-10 | Responsive | Responsive | Sin traducir · "adaptable" admisible si la audiencia es no-tech |
| T-11 | Hosting | Hosting | Sin traducir · "alojamiento" suena legal/inmobiliario |
| T-12 | Dominio | Domain | Traducido en ES · concepto universal |
| T-13 | Tienda online | Online store | Para públicos no-tech · "e-commerce" para B2B |
| T-14 | Auditoría SEO | SEO audit | "Auditoría" formal pero ya naturalizado en LATAM tech |
| T-15 | Keyword research | Keyword research | Sin traducir · convención SEO |
| T-16 | Onboarding | Onboarding | Sin traducir · "incorporación" suena RRHH |
| T-17 | Stack | Stack | Sin traducir · "tecnologías" si la audiencia no es dev |
| T-18 | Frontend / backend | Frontend / backend | Sin traducir · convención dev · sin guión |
| T-19 | Discovery | Discovery | Sin traducir en process step · "descubrimiento" admisible explicativo |
| T-20 | Build | Build | Sin traducir en process step · "construcción" admisible explicativo |
| T-21 | Entrega | Delivery | Process step final · ambos idiomas naturales |
| T-22 | Velocidad / rendimiento | Speed / performance | "Performance" sin traducir admisible en contextos técnicos |
| T-23 | Mobile-first | Mobile-first | Sin traducir · concepto de design system universal |
| T-24 | Accesibilidad / a11y | Accessibility / a11y | "a11y" técnico interno · "accesibilidad" producción |
| T-25 | Analítica | Analytics | "Analítica" formal · "analytics" admisible cuando refiere herramienta (Google Analytics) |
| T-26 | Conversión | Conversion | Métrica de marketing · ambos idiomas naturales |
| T-27 | CMS / sin código | CMS / no-code | "CMS" sin traducir · "sin código" preferido a "no-code" en ES marketing |
| T-28 | Tipografía | Typography | Traducción directa · ambos idiomas |
| T-29 | Componente | Component | Concepto dev universal · ambos idiomas |
| T-30 | Setup | Setup | Anglicismo aceptado tech · "configuración" admisible en contextos formales · ya en producción |

---

## 9. Auditoría preventiva · 16 hallazgos

Revisión de copy en producción contra la voz NTS canonizada.

| Categoría | Cantidad |
|---|---|
| ✅ OK | 6 |
| 🔄 Migrar | 7 |
| 🔄 Reescribir | 3 |

**Inventario revisado**: `lib/i18n.ts` · `language-provider.tsx` + `useLanguage()` hook · componentes con copy hardcoded (Hero, CTAs, FAQ, contact-form, footer) · meta tags `<title>` y `<meta name="description">`.

### Tabla de hallazgos

| # | Ubicación · contenido | Veredicto · acción |
|---|---|---|
| **A01** | `Hero.jsx` headline ES *"Eleva tu negocio a la era digital"* | 🔄 **Migrar** · verbo "elevar" formal-aspiracional ESL · "era digital" buzzword temporal |
| **A02** | `Hero.jsx` eyebrow *"Diseño web · California"* | ✅ **OK** · capacidad + ubicación con medium dot · sentence case · cumple R5 + R1 |
| **A03** | `Hero.jsx` CTA primario *"Empezar proyecto"* | ✅ **OK** · imperativo suave · sin signos · sentence case · cumple MC-01 |
| **A04** | Hero + CTABand variante *"Iniciar tu proyecto"* | 🔄 **Migrar** a MC-02 *"Ver casos"* · duplica intención de A03 con verbo distinto y "tu" redundante |
| **A05** | `CTABand.jsx` *"Solicitar propuesta"* | ✅ **OK** · cumple MC-03 · verbo formal apropiado para "propuesta" |
| **A06** | `CTABand.jsx` headline *"Construye con quien cumple"* | ⚠️ **Evaluar** · imperativo en segunda persona · "quien cumple" honesto pero abstracto. Aceptable o simplificar a *"Construye con un equipo que cumple"* |
| **A07** | CTA Band trust strip *"Disponibilidad"* + *"Setup gratis"* | 🔄 **Migrar** · *"Disponibilidad"* sola es ambigua → cambiar a *"Respuesta 24h"* (concreto + medible) |
| **A08** | `Hero.jsx` stats *"150+ Proyectos · 98% Satisfacción · 7+ Años"* | 🔄 **Migrar** · cifras concretas correctas (G-03, G-14) pero title case rompe R1 → sentence case |
| **A09** | `FAQ.jsx` preguntas *"¿Cuánto cuesta?"*, *"¿Cuánto tarda?"* | ✅ **OK** · cumplen tone shift FAQ · cortas, directas, primera persona |
| **A10** | `contact-form.tsx` trust strip *"24h · Sin compromiso · NDA disponible"* | ✅ **OK** · cumple MC-32 · tres beneficios concretos · medium dot |
| **A11** | `contact-form.tsx` *"Cuéntanos sobre tu proyecto y te respondemos rápido"* | 🔄 **Migrar** · *"rápido"* ambiguo · contradice promesa medible "24h" → *"Cuéntanos sobre tu proyecto. Te respondemos en 24h"* |
| **A12** | CTA *"Solicitar propuesta GRATIS"* | 🔄 **Reescribir** (alta) · rompe R1 + G-01 · *"Solicitar propuesta · setup gratis"* |
| **A13** | Meta description home *"Estudio digital especializado en soluciones tecnológicas integrales para empresas que buscan transformación y crecimiento"* | 🔄 **Reescribir** (alta) · 3 buzzwords en una sola frase · *"Estudio de diseño y desarrollo en California. Sitios web, SEO técnico, branding. 150+ proyectos · 7+ años"* |
| **A14** | 404 / 500 actuales · `app/not-found.tsx` + `app/error.tsx` | 🔄 **Reescribir** (alta) · si copy default Next.js o ausente, no cumple MC-19 + MC-20 · agregar link al home |
| **A15** | EN translation gaps en `lib/i18n.ts` | ⚠️ **QA pendiente** · revisar 1:1 que toda string ES tenga EN |
| **A16** | Mascota Noa silente · DS-033 cumplido | ✅ **OK** · coherencia perfecta entre canal visual (Noa) y verbal (copy) |

### Resumen ejecutivo

**6 OK · 7 migrar · 3 reescribir.**

**Bloqueante alta**:
- A12 ("GRATIS" mayúsculas)
- A13 (meta description con 3 buzzwords)
- A14 (404/500 sin copy NTS)

**Migración prioridad media**: A01 hero headline · A04 CTA secundario duplicado · A07 chip "Disponibilidad" ambiguo · A08 stats title case · A11 form copy "rápido" ambiguo.

**QA pendiente**: A15 i18n bilingüe full coverage.

---

## 10. Aplicación visual · antes/después

5 secciones del sitio con copy actual vs copy DS 10 · bloque ejecutable para sprint de migración.

### 1 · Hero headline + eyebrow + CTAs

```
❌ Antes (producción)
"Diseño web · California"
"Eleva tu negocio a la era digital"
[Empezar proyecto] [Iniciar tu proyecto]
"150+ Proyectos · 98% Satisfacción · 7+ Años"
```
*A01 + A04 + A08 · headline ESL · CTAs duplicados · stats title case*

```
✓ Después (DS 10)
"Diseño web · California"
"Diseño que convierte visitas en clientes"
[Empezar proyecto] [Ver casos]
"150+ proyectos · 98% satisfacción · 7+ años"
```
*headline aspiracional medible · CTAs MC-01+MC-02 distintos · stats sentence case*

### 2 · CTA Band

```
❌ Antes (producción)
"Construye con quien cumple"
[Solicitar propuesta GRATIS]
"Disponibilidad · Setup gratis"
```
*A06 + A07 + A12 · "GRATIS" mayúsculas · chip "Disponibilidad" ambiguo*

```
✓ Después (DS 10)
"Construye con un equipo que cumple"
[Solicitar propuesta]
"Respuesta 24h · Setup gratis"
```
*headline más natural · CTA sin GRATIS · trust chips concretos y medibles*

### 3 · Contact form

```
❌ Antes (producción)
"Cuéntanos sobre tu proyecto y te respondemos rápido"
[Email] [Mensaje] [Enviar]
"24h · Sin compromiso · NDA disponible"
```
*A11 · "rápido" ambiguo · contradice promesa de 24h*

```
✓ Después (DS 10)
"Cuéntanos sobre tu proyecto. Te respondemos en 24h"
[Email] [Mensaje] [Enviar mensaje]
"24h respuesta · Sin compromiso · NDA disponible"
```
*compromiso medible · MC-12 submit · MC-32 trust strip*

### 4 · Meta description home

```
❌ Antes (producción)
"Estudio digital especializado en soluciones tecnológicas integrales para empresas que buscan transformación y crecimiento"
```
*A13 · 3 buzzwords ("soluciones integrales", "transformación", "crecimiento") en una sola frase*

```
✓ Después (DS 10)
"Estudio de diseño y desarrollo en California. Sitios web, SEO técnico, branding. 150+ proyectos · 7+ años"
```
*concreto · cifras reales · ubicación · capacidades específicas · 152 caracteres óptimo SEO*

### 5 · Error states

```
❌ Antes (producción)
404: copy default Next.js o ausente
500: stack trace o "Internal Server Error"
Form error: "Error al enviar el formulario"
```
*A14 · sin copy NTS · sin próximo paso · genérico*

```
✓ Después (DS 10)
404: "Esta página no existe" + [Volver al inicio]
500: "Algo se rompió de nuestro lado" + [Reintentar]
Form: "Algo salió mal. Intenta de nuevo"
```
*MC-19 · MC-20 · MC-21 · humilde · próximo paso explícito*

---

## 11. Migraciones pendientes en código

**10 work items nuevos** introducidos por DS 10 (sumados a los 56 acumulados previos).

Total acumulado del manual: **66 + 3 retiros + 2 verificaciones**.

### Nuevas en DS 10

| # | Archivo / contexto | Cambio | Prioridad |
|---|---|---|---|
| 57 | `Hero.jsx` headline ES | *"Eleva tu negocio a la era digital"* → *"Diseño que convierte visitas en clientes"* (aspiracional medible) — A01 | Media |
| 58 | `Hero.jsx` + `CTABand.jsx` CTA secundario | *"Iniciar tu proyecto"* duplicado → MC-02 *"Ver casos"* (distinto del primario) — A04 | Media |
| 59 | `CTABand.jsx` trust strip | *"Disponibilidad"* ambiguo → *"Respuesta 24h"* (medible) — A07 | Media |
| 60 | `Hero.jsx` stats | Title case → sentence case · *"150+ proyectos · 98% satisfacción · 7+ años"* — A08 | Media |
| 61 | `contact-form.tsx` motivacional | *"…te respondemos rápido"* → *"…Te respondemos en 24h"* (compromiso medible) — A11 | Media |
| 62 | CTA con *"GRATIS"* mayúsculas (Hero/CTA Band) | **Reescribir** · *"Solicitar propuesta · setup gratis"* — A12 (bloqueante alta) | **Alta** |
| 63 | `app/layout.tsx` meta description | **Reescribir** · *"Estudio de diseño y desarrollo en California. Sitios web, SEO técnico, branding. 150+ proyectos · 7+ años"* (152 chars SEO óptimo) — A13 (bloqueante alta) | **Alta** |
| 64 | `app/not-found.tsx` (NUEVO o reescribir) | **Implementar** copy MC-19 *"Esta página no existe"* + link al home — A14 (bloqueante alta) | **Alta** |
| 65 | `app/error.tsx` (NUEVO o reescribir) | **Implementar** copy MC-20 *"Algo se rompió de nuestro lado"* + retry button — A14 (bloqueante alta) | **Alta** |
| 66 | `lib/i18n.ts` · QA bilingual coverage | Audit 1:1 · toda string ES debe tener EN paralela · MC-01..32 + T-01..30 implementados — A15 | Media |

### Sub-tarea opcional

| # | Contexto | Cambio |
|---|---|---|
| 67 (opt) | `CTABand.jsx` headline | Evaluar simplificar *"Construye con quien cumple"* → *"Construye con un equipo que cumple"* — A06 |

> Total acumulado del manual: 5 (DS 02) + 8 (DS 03) + 16 (DS 04) + 6 (DS 05) + 5 (DS 06) + 7 (DS 08) + 9 (DS 09) + 10 (DS 10) = **66 cambios** + 3 retiros + 2 verificaciones para tarea de desarrollo separada (NOA-269).

---

## 12. Decisiones de diseño

### DS-045 · Filosofía + 5 atributos canónicos
✅ **Aprobada** — 2026-05-07

Voz NTS · clara, cálida, técnica, honesta, sobria. Linaje editorial Vercel + Linear + Stripe + Resend. Cinco atributos con ejemplos correctos/incorrectos para auditoría rápida. Mapping explícito con DS-033 (Mascota Noa) — la coherencia entre canal visual silente y canal verbal es deliberada.

**Marca**: copy que no vende · explica con calma · profesional con calor humano · honestidad cuantificable.

**Alternativas descartadas**: voz "joven y disruptiva" tipo startup early-stage (incoherente con linaje Linear/Vercel), voz "premium y exclusiva" (rompe atributo de calidez), atributos "innovadores · disruptivos" (buzzwords vacíos).

### DS-046 · Bilingüismo ES neutro / EN US
✅ **Aprobada** — 2026-05-07

ES neutro como fuente de verdad · `tú` en producción · `you` casual EN US. Estrategia adaptada (no literal). Términos tech sin traducir cuando son convención. Vos solo en conversación interna del equipo, cero en producción.

**Marca**: voz nace en ES y se traduce, no al revés · coherencia editorial sin anglicismos forzados · target California explícito (US English).

**Alternativas descartadas**: `usted` (distancia excesiva para audiencia tech moderna), `vos` en producción (regional · rompe directiva ES neutro), traducción literal palabra-por-palabra (anglicismos forzados), UK English (target principal es California).

### DS-047 · 32 microcopy patterns canónicos
✅ **Aprobada** — 2026-05-07

Patterns por contexto · CTAs (6) · Forms (12) · Errors (4) · Estados (5) · Nav+helptexts (5). Fuente de verdad para `lib/i18n.ts` y todos los componentes con copy. Cada pattern con ID (MC-NN), versión ES, versión EN y nota de uso.

**Marca**: alfabeto verbal cerrado · cero ambigüedad por contexto · trazabilidad ID estable.

**Alternativas descartadas**: copy ad-hoc por componente (drift garantizado), patterns sin ID (rompe trazabilidad), patterns solo en ES (rompe paridad bilingüe), patterns con emojis (rompe regla de sobriedad).

### DS-048 · Glosario · 22 pares preferido/evitar
✅ **Aprobada** — 2026-05-07

Pares "preferido / evitar" cubriendo CTA-speak, marketing-speak, anglicismos y false friends. Cada par con razón explícita. Sirve como check de auditoría para copy nuevo y como referencia rápida para QA editorial.

**Marca**: disciplina editorial · cero buzzwords · honestidad cuantificable.

**Alternativas descartadas**: glosario solo de términos técnicos (no cubre copy editorial), glosario sin pares "evitar" (no anti-patterns documentados), glosario sin razón documentada (rompe trazabilidad).

### DS-049 · 6 reglas de formato
✅ **Aprobada** — 2026-05-07

Sentence case siempre · cero exclamación · cifras desde 10 · fechas formato bilingüe · símbolos pegados · listas paralelas. Aplica a producción y meta tags.

**Marca**: forma como contenido · respeto al lector (cero estridencias) · localización honesta (fechas, decimales, monedas).

**Alternativas descartadas**: TITLE CASE en CTAs (estilo agresivo), exclamación en éxitos ("¡Mensaje enviado!"), formato fecha numérico ambiguo (`05/07/2026`), pipe `|` o guión `-` como separador (medium dot `·` es la convención NTS).

### DS-050 · 8 tone shifts por sección
✅ **Aprobada** — 2026-05-07

Hero (visión) · Servicios (concreto) · Process (técnico) · CTA Band (acción) · FAQ (conversacional) · Forms (cálido) · Error (humilde) · Footer (mínimo). Voz única, tono modulado por contexto.

**Marca**: una voz, ocho tonos · coherencia con variabilidad controlada.

**Alternativas descartadas**: tono único uniforme para todo el sitio (Hero y 404 con misma voz suena raro), tonos sin documentar (drift por contexto), Footer con tagline duplicada (redundancia sin valor).

### DS-051 · Glosario bilingüe técnico · 30 términos
✅ **Aprobada** — 2026-05-07

30 términos técnicos canónicos ES/EN con notas de uso. Cubre diseño web, dev, SEO, branding, e-commerce, dashboard, hosting, dominio, UX/UI, responsive, performance, accesibilidad, analítica, conversión, CMS, tipografía, componente, setup. Fuente para `lib/i18n.ts` y meta tags.

**Marca**: vocabulario técnico canónico · paridad bilingüe · convenciones del ecosistema respetadas (SEO, dashboard, e-commerce sin traducir).

**Alternativas descartadas**: traducir todo a ES literal (rompe convenciones tech), dejar todo en EN sin traducir (rompe localización ES neutro), glosario sin notas de uso (no captura contextos).

---

## 13. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-07 | DS-045 (filosofía + 5 atributos) · DS-046 (bilingüismo ES/EN) · DS-047 (32 microcopy patterns) · DS-048 (22 pares glosario) · DS-049 (6 reglas formato) · DS-050 (8 tone shifts) · DS-051 (30 términos bilingües) · auditoría 16 hallazgos · cierra manual v1.x |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`08-mascot-noa.md`](08-mascot-noa.md) — DS-033 (Noa silente · canal visual paralelo al verbal)
- [`05-patterns.md`](05-patterns.md) — patrones que llevan copy (Hero, CTA Band, Process, FAQ, Forms)
- `lib/i18n.ts` — provider de strings · target del sprint de migración (Migrations 57–66 en NOA-269)
- `app/layout.tsx` — meta tags · target de A13 reescrito
- `app/not-found.tsx`, `app/error.tsx` — 404/500 · target de A14
