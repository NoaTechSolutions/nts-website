# 00 · Estrategia de implementación

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobada | v0.1 | 2026-05-04 |

> Documento meta del Manual de Marca. Define cómo se traduce el manual (QUÉ) en código (CÓMO). Establece la arquitectura en capas, las librerías oficiales del proyecto y los criterios para sumar librerías nuevas. Vive antes de DS 01 porque toda sección posterior asume esta estrategia.

---

## Contenido

1. [Propósito](#1-propósito)
2. [Arquitectura en 3 capas](#2-arquitectura-en-3-capas)
3. [Stack oficial](#3-stack-oficial)
4. [Tabla componente → capa](#4-tabla-componente--capa)
5. [Criterios para sumar librería nueva](#5-criterios-para-sumar-librería-nueva)
6. [Cómo aplicar el manual al código](#6-cómo-aplicar-el-manual-al-código)
7. [Decisiones de diseño](#7-decisiones-de-diseño)
8. [Historial de cambios](#8-historial-de-cambios)

---

## 1. Propósito

- Una **sola fuente de verdad** de la stack que implementa el manual.
- Evitar **drift** y proliferación de librerías solapadas (ej. dos botones de dos librerías distintas).
- Dejar **criterios claros** para futuras decisiones de implementación.
- Permitir que el equipo de diseño entregue specs sabiendo que se implementan con un stack conocido y compatible.

---

## 2. Arquitectura en 3 capas

```
┌──────────────────────────────────────────────────────────────┐
│  CAPA 3 · SHOWCASE / WOW                                      │
│  Aceternity UI + custom motion                                │
│  → BackgroundBoxes, HeroParallax, CometCard, AuroraText,      │
│    TextHoverEffect, FlipWords, LayoutTextFlip, CardSticky,    │
│    NumberTicker, hero-orb-3d, etc.                            │
│  → SOLO en marketing pages (home, /servicios, /portfolio)     │
│  → NUNCA reemplazan primitives — viven al lado                │
├──────────────────────────────────────────────────────────────┤
│  CAPA 2 · MOTION ENGINE                                       │
│  motion/react (Framer Motion) + GSAP + CSS @keyframes         │
│  → Hover, press, focus, transitions, scroll-driven, timelines │
│  → Tokens de motion definidos en DS (timing, easing,          │
│    choreography). El motion ES parte del lenguaje de marca,   │
│    no decoración opcional.                                    │
├──────────────────────────────────────────────────────────────┤
│  CAPA 1 · PRIMITIVES                                          │
│  shadcn/ui (CLI · Radix base · Tailwind 4 · cva variants)     │
│  → Button, Input, Card, Badge, Form, Dialog, Select,          │
│    Tooltip, Popover, etc.                                     │
│  → Base accesible (ARIA, keyboard nav) que vestimos con       │
│    tokens de DS 01 (tipografía), DS 02 (color), DS 03         │
│    (spacing/radii/shadows), DS 04 (anatomía de componentes).  │
└──────────────────────────────────────────────────────────────┘
```

### Por qué 3 capas y no 1

Ninguna librería sola cubre todos los casos:

| Necesidad | shadcn solo | Aceternity solo | MUI / Chakra solo |
|---|---|---|---|
| Primitives accesibles (Button/Input/Card/Form) | ✅ Excelente | ❌ No es su scope | ✅ Pero peleando con brand tokens |
| Showcase animado (Hero/Boxes/Parallax) | ❌ No tiene | ✅ Especialidad | ❌ No tiene |
| Customización profunda con tokens propios | ✅ CLI copy-into-repo | ✅ CLI copy-into-repo | ❌ Pelea con sus opiniones |
| Tailwind-first (consistente con stack actual) | ✅ Sí | ✅ Sí | ❌ CSS-in-JS o sus propios tokens |

Las 3 librerías recomendadas (shadcn + Aceternity + motion/react) **no compiten entre sí** — cada una cubre una capa única y comparten el mismo modelo: CLI / copy-into-repo / Tailwind-first.

---

## 3. Stack oficial

Librerías aprobadas. Cualquier librería nueva debe pasar por los [criterios de la sección 5](#5-criterios-para-sumar-librería-nueva).

### Capa 1 · Primitives

| Librería | Rol | Por qué |
|---|---|---|
| **shadcn/ui** (CLI) | Base de Button, Input, Card, Badge, Form, Dialog, etc. | Copy-into-repo · Radix accesibilidad · Tailwind nativo · industria estándar (Vercel, Cal.com, Resend, Linear) |
| **Radix UI** primitives | Headless primitives | Viene incluido en shadcn. ARIA y keyboard nav resueltos. |
| **class-variance-authority** (cva) | Variantes tipadas | Patrón shadcn estándar |
| **tailwind-merge** + **clsx** | Utilidad `cn()` | Ya en uso |

### Capa 2 · Motion engine

| Librería | Rol | Por qué |
|---|---|---|
| **motion/react** (Framer Motion rebrand) | Animaciones declarativas, variants, AnimatePresence | Ya en uso · integra con shadcn y Aceternity |
| **GSAP** | Timelines complejos, scroll-driven choreography | Ya en uso (CardSwap, ProcessSticky) · cubre lo que motion/react no |
| **lenis** | Smooth scroll wrapper | Ya en uso |
| **CSS @keyframes** | Loops infinitos (shimmer, glow pulse, marquee) | Ya en uso |

### Capa 3 · Showcase / wow

| Librería | Rol | Por qué |
|---|---|---|
| **Aceternity UI** (CLI) | BackgroundBoxes, HeroParallax, CometCard, etc. | Ya en uso · CLI copy-into-repo · compatible con shadcn |
| **three** | Hero orb 3D | Ya en uso · scope limitado al hero |
| **rough-notation** | Highlighter / annotations | Ya en uso · scope limitado a `Highlighter` |
| **lucide-react** | Iconografía oficial | Ya en uso |

### Soportes (infraestructura)

| Librería | Rol |
|---|---|
| **next** | Framework |
| **react** + **react-dom** | Base |
| **tailwindcss** v4 | CSS framework |
| **zod** | Schema validation (forms) |
| **resend** | Emails (contact form) |
| **@upstash/ratelimit** | Rate limiting (contact form) |

---

## 4. Tabla componente → capa

Dónde vive cada cosa. Si no encaja en ninguna fila, se discute en Decisions Log antes de implementar.

| Componente | Capa | Implementación |
|---|---|---|
| Button (todas las variantes de DS-017) | 1 · Primitives | `components/ui/button.tsx` (shadcn base) + motion/react variants |
| Input / Textarea / Select | 1 · Primitives | `components/ui/input.tsx`, etc. (shadcn base) |
| Card | 1 · Primitives | `components/ui/card.tsx` (shadcn base) |
| Badge / Pill | 1 · Primitives | `components/ui/badge.tsx` (shadcn base) |
| Form (Zod + React Hook Form) | 1 · Primitives | `components/ui/form.tsx` (shadcn base) |
| Dialog / Sheet / Popover / Tooltip | 1 · Primitives | shadcn base |
| Hover, press, focus de Button | 2 · Motion | motion/react variants en `button.tsx` |
| Choreography de scroll (CardSwap, ProcessSticky) | 2 · Motion | GSAP timelines |
| Smooth scroll del sitio | 2 · Motion | lenis (`lenis-provider.tsx`) |
| BackgroundBoxes (CTAs hero) | 3 · Showcase | Aceternity (`components/ui/background-boxes.tsx`) |
| HeroParallax (portfolio) | 3 · Showcase | Aceternity (`components/ui/hero-parallax.tsx`) |
| CometCard / TextHoverEffect / AuroraText / FlipWords | 3 · Showcase | Aceternity en `components/ui/` |
| Hero orb 3D | 3 · Showcase | three (`hero-orb-3d.tsx`) |
| Mascota Noa (Lottie) | 3 · Showcase | lottie-react (pendiente — ver NOA-159) |
| Iconografía | Soporte | lucide-react |

---

## 5. Criterios para sumar librería nueva

Una librería nueva se considera **SI Y SOLO SI** cumple los 4 criterios:

1. **Llena un gap real** — no duplica una librería ya en stack. Justificar qué problema resuelve que motion/react o GSAP o shadcn o Aceternity no resuelven.
2. **Mismo modelo CLI / copy-into-repo** — no instalación con vendor lock-in. Excepción permitida solo para infraestructura (next, react, etc.).
3. **Tailwind-first** — sin CSS-in-JS, sin styled-components, sin sus propios tokens forzados.
4. **Aprobación explícita en Decisions Log** — `DS-NNN` nuevo con justificación, alternativas evaluadas, alternativas descartadas.

Si una propuesta no cumple los 4, se rechaza por defecto y se documenta en Descartadas (`DS-XNNN`) para no reabrir el debate.

---

## 6. Cómo aplicar el manual al código

```
Manual (QUÉ)                        →   Implementación (CÓMO)
─────────────────────────────────────────────────────────────────────
DS 01 · Tipografía Space Grotesk    →   next/font/google + var(--font-display)
DS 02 · Token Amber 500             →   tailwind.config: amber-500: '#FF9900'
DS 02 · Token Sky 700               →   tailwind.config: sky-700: '#036399'
DS 02 · Ink 1                       →   tailwind.config: ink-1: '#02215F'
DS 03 · Spacing 4px base            →   tailwind default (1 = 4px) — ya cumple
DS 03 · Radius card-md              →   tailwind.config: borderRadius extension
DS 03 · Shadow elevation-2          →   tailwind.config: boxShadow extension
DS 04 · Button variant primary      →   components/ui/button.tsx (cva variants)
DS 04 · Button motion 3D press      →   motion/react variants (whileTap)
DS 04 · Button motion glow pulse    →   CSS @keyframes (perpetuo) o motion infinite
```

### Convención de nombres

- **Tokens cromáticos**: `--{color}-{shade}` (ej. `--amber-500`, `--sky-700`, `--ink-1`)
- **Tokens de spacing**: nombres semánticos definidos en DS 03 (pendiente aplicación)
- **Tokens de motion**: `--motion-{prop}-{semantic}` (ej. `--motion-duration-fast`, `--motion-ease-emphasis`) — pendiente cuando DS 04 cierre con motion specs

### Refactor pendiente

Migración de `globals.css` button classes (`.btn-body-primary`, `.btn-cta-navy`, etc.) a primitives shadcn. Tarea separada del manual; ver auditoría de DS-017 cuando esté completa.

---

## 7. Decisiones de diseño

### DS-021 · Arquitectura de implementación en 3 capas
✅ **Aprobada** — 2026-05-04

Stack oficial: shadcn/ui (primitives) + motion/react & GSAP (motion) + Aceternity UI (showcase). Una librería por capa, criterios claros para sumar nuevas. Compatible con stack actual del proyecto sin migraciones forzadas.

**Marca**: disciplina técnica · sin lock-in · stack estándar de la industria moderna (Vercel, Linear, Resend) · permite escalar sin caos de librerías solapadas.

**Alternativas descartadas**:
- Una sola librería all-in-one (MUI / Chakra) — fuerza opiniones de styling que pelean con la identidad de marca, no cubre showcase animado.
- Solo shadcn — excelente para primitives pero no tiene showcase (perderíamos BackgroundBoxes, HeroParallax, etc.).
- Solo Aceternity — excelente para showcase pero falta primitives sólidos (Button, Input, Form).
- Sin librería (todo custom) — viable pero costoso en time-to-brand y mantenimiento; pierde accesibilidad pre-resuelta de Radix.

---

## 8. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-05-04 | `DS-021` — arquitectura en 3 capas (primitives shadcn + motion/react + Aceternity) |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
- [`docs/design-system.md`](../design-system.md) — implementación actual del código
- [`docs/AUDIT.md`](../AUDIT.md) — auditoría técnica del proyecto
