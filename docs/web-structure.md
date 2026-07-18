# Estructura de la Web · NoaTechSolutions

> Consolidación del **Brief Maestro del Diseñador** (Jul 2025) con el **Design System del repo** (canónico).
> **Regla de precedencia (decisión 2026-07-07):** donde el brief y el DS chocan, **manda el DS ya construido**. El brief aporta estructura, estrategia y personalidad; NO redefine tokens.
> Estado: v0.1 · Fuente estructura: Brief Maestro · Fuente tokens: `docs/brand-manual/`

---

## 1. Qué transmitimos (el alma)

Estudio de **diseño web y branding que además construye su propio software**. Doble naturaleza: diseñamos Y construimos producto real (NTSSign, KinderCtrl).

**Fórmula de personalidad — guía cada decisión visual:**

| Peso | Eje | Cómo se logra |
|---|---|---|
| **60%** | Premium / refinado | Mucho espacio en blanco, tipografía cuidada, composición sobria. *El lujo es el aire, no el adorno.* |
| **30%** | Tech / moderno | Precisión, limpieza, dinamismo, ADN de circuito (del logo). |
| **10%** | Humano / cercano | Calidez en trato y copy, foto real. Poco pero presente. Hablamos de "tú". |

**Objetivo:** que un desconocido confíe y nos escriba en 30 segundos. Máquina de credibilidad + captación de leads.

**Nunca:** barato, recargado, genérico (plantilla), frío/corporativo sin alma.

---

## 2. Sistema visual (tokens CANÓNICOS del DS — el brief coincide salvo lo marcado)

### Color · detalle en [`brand-manual/02-colors.md`](brand-manual/02-colors.md)

| Rol | Token / HEX (canónico) | Uso | Nota vs brief |
|---|---|---|---|
| Navy dominante | `--color-navy` **#022977** | Serio, premium. El azul que manda | ⚠️ Brief pedía `#02215F` — **gana el DS** |
| Cian secundario | `--color-sky` **#05A5FF** | Toques tech | ✅ coincide |
| Naranja acento | `--color-amber` **#FF9900** | **Solo CTA/acciones** (regla del 10%) | ✅ coincide |
| Eléctrico | `--color-accent` **#0400F0** | **Solo en el logo**, nunca fondos grandes | ✅ coincide |
| Dark bg | **#0b0f1a** | Marino profundo, nunca negro puro | ✅ ≈ brief `#0A0F1A` |
| Neutros | grises azulados (no puros) | 40% de la sensación premium | ✅ |

**Proporción:** 60% neutros/blanco · 30% marino · 10% naranja.
**Modo claro Y oscuro** obligatorio (toggle con tokens).

### Tipografía · detalle en [`brand-manual/01-typography.md`](brand-manual/01-typography.md)

| Rol | Fuente (canónica) | Nota vs brief |
|---|---|---|
| Títulos / display | **Space Grotesk** (DS-001) | ⚠️ Brief pedía **Sora** — **gana el DS** |
| Cuerpo / UI | **Inter** (DS-002) | ✅ coincide |

> El logo usa Glance Sans (es imagen, no texto de la web).

### Layout · detalle en [`brand-manual/03-spacing-radii-shadows.md`](brand-manual/03-spacing-radii-shadows.md) y [`brand-manual/03b-responsive-breakpoints.md`](brand-manual/03b-responsive-breakpoints.md)

Spacing múltiplos de 4px · grid 12 columnas · container ~1180px centrado · texto máx ~70 caracteres/línea · breakpoints 768/1024/1440.

> **`01d` (brief) recibido y reconciliado:** confirma base-4px, grid 12-col, texto ~70 car/línea, radios 8/12/16, padding vertical 64–96px. Donde difiere, **manda el DS**: container **1180px** (no 1200), gutter **16px** (no 24). La escala de spacing del DS tiene 11 tokens (superset del 01d de 7).

---

## 3. Páginas y menú

### Menú principal (objetivo — del brief)

`Home · Servicios ⌄ · Portafolio · Productos ⌄ · Nosotros · Contacto` (Contacto destacado)

> **Gap actual:** el nav construido tiene `Home · Servicios⌄ · Solutions · Nosotros · Contacto`. Falta **Productos ⌄** y clarificar Portafolio vs Solutions.

### Rutas

| Ruta | Contenido | Estado actual |
|---|---|---|
| `/` | Home | ✅ Activa |
| `/servicios` (+ 8 sub-páginas) | Catálogo de servicios | 🚧 Placeholder |
| `/portafolio` | Trabajos reales | ✅ Activa |
| `/productos` | NTSSign · KinderCtrl | ❌ **No existe (gap)** |
| `/nosotros` | Quiénes somos | 🚧 Placeholder |
| `/contacto` | Contacto | 🚧 Placeholder |
| `/legales` | Legales | ❌ Pendiente |

---

## 4. Servicios · 4 categorías · con prioridad de producción (02a2)

| Categoría | Servicios (prioridad) |
|---|---|
| Diseño & Marca | Branding (P2) · Diseño gráfico (P3) · Business cards (P3) |
| **Web & Software** ⭐ (ESTRELLA) | **Diseño web (P1)** · **Software a medida (P1)** · E-commerce (P2) |
| Marketing | Marketing digital (P2) · Redes sociales (P3) |
| Soporte & Asesoría | Hosting/mantenimiento (P3) · Asesoría tecnológica (P2) |

**Cada servicio = su propia página** (mejor SEO — posiciona por búsqueda específica — y mejor conversión).

**Estrategia de lanzamiento (02a2):** salir con las **P1 completas e impecables** (Diseño web + Software a medida), luego P2, y las P3 pueden empezar como páginas simples. **NO bloquear el lanzamiento** por tener las 10 perfectas.

> **Web & Software** = más presencia visual en menú, home y página de servicios.
> **Plantilla reutilizable** de "página de servicio" pendiente (todas comparten estructura).
> **Gap actual:** el nav construido solo lista 3 servicios sin categorías. Falta el agrupamiento + el resto.

---

## 5. Productos SaaS propios (arma de confianza)

| Producto | Qué es | Sello |
|---|---|---|
| **NTSSign** | Firma de documentos | "producto de NoaTechSolutions" |
| **KinderCtrl** | Gestión de daycare | "producto de NoaTechSolutions" |

Son la **mayor prueba de que hacemos las cosas en serio**. Dominio aparte, pero siempre con el sello NTS. Relación de marca en `01e_MarcasHijas` (⛔ falta el doc).

---

## 6. La Home, sección por sección (argumento persuasivo en orden)

Cada sección responde una pregunta del visitante:

| # | Sección | Pregunta que responde | Estado en la home actual |
|---|---|---|---|
| 1 | **Hero** | ¿Qué es esto y me sirve? | ✅ Existe (mascota Noa) |
| 2 | **Servicios** | ¿Qué hacen por mí? | ✅ Existe (scroll-stacking) |
| 3 | **Productos propios** ⭐ | ¿Por qué confiar? (NTSSign, KinderCtrl reales) | ❌ **NO existe — gap clave del brief** |
| 4 | **Portafolio** | ¿Qué han hecho? | ✅ Existe (parallax) |
| 5 | **Proceso** | ¿Cómo sería trabajar con ustedes? | ✅ Existe (sticky) |
| 6 | **Testimonios** | ¿Otros quedaron contentos? (opcional) | ✅ Existe (marquee) |
| 7 | **CTA final** ⭐ | ¿Listo para empezar? (el naranja con toda su fuerza) | ✅ Existe |

> La home actual además tiene: mensajes de crecimiento (problemas), mid-CTA y FAQ — no están en los 7 del brief pero no contradicen. El **título del hero sugerido**: *"Diseño y software que hacen crecer tu negocio"*.

---

## 7. Libertades y líneas rojas (del brief)

**Libertad total:** composición, imágenes/ilustraciones/íconos/animaciones, microinteracciones, tratamiento visual, interpretación de la personalidad.

**Líneas rojas (innegociables):**
- Fuentes: **Space Grotesk (títulos) + Inter (cuerpo)**. No otras.
- Naranja **solo en acciones/CTA** (regla del 10%).
- Eléctrico `#0400F0` **solo en el logo**.
- Reglas del logo (área protección, mínimos, no deformar/recolorear/sombras).
- Funciona en **claro Y oscuro**.
- La marca **siempre premium**, nunca barata.
- Respetar la **jerarquía** de cada sección.
- **Claridad y velocidad > cualquier efecto.** Si confunde o hace lento, no va.

---

## 8. Gaps priorizados (qué falta construir vs el brief)

| Prioridad | Gap | Acción |
|---|---|---|
| 🔴 Alta | **Sección "Productos propios" en la home** | Construir sección #3 con NTSSign + KinderCtrl (arma de confianza) |
| 🔴 Alta | **Página `/productos`** | Crear ruta + showcase de los 2 SaaS |
| 🟠 Media | **8 servicios en 4 categorías** | Expandir nav + `/servicios` (hoy hay 3) |
| 🟠 Media | **Menú "Productos ⌄"** | Agregar al nav |
| 🟢 Baja | Páginas internas de servicio (empezar por las estrella P1) | Diseño web + software a medida primero |

---

## 9. Documentos del brief que faltan (para el detalle fino)

El Brief Maestro referencia sub-docs. Estado:

- `02a2_MapaSitio` — ✅ **recibido** (incorporado: 4 categorías, prioridades P1/P2/P3, árbol)
- `01d_Espaciado_Grid` — ✅ **recibido** (reconciliado; manda el DS: 1180px / gutter 16)
- `02c_01`…`02c_08` — ❌ **falta** · briefs por sección (sobre todo **Hero** y **Productos**)
- `01e_MarcasHijas` — ❌ **falta** · relación con NTSSign / KinderCtrl (clave para sección Productos)
- `02a_Arquitectura` — ⚠️ tengo el orden de la home por el máster; el detalle fino de la home falta
- `02b_Copy_Home` — ⚠️ parcial en `lib/i18n.ts`
- `01a_Color` / `01b_Tipografia` — no necesarios (manda el DS)

---

*Tokens y reglas exactas: `docs/brand-manual/`. Estructura y estrategia: este documento + Brief Maestro. Donde choquen, manda el DS.*
