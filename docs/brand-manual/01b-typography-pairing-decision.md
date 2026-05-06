# 01b · Decisión de pairing tipográfico (DS 01b)

| Estado | Versión | Última actualización |
|---|---|---|
| ✅ Aprobada | v1.0 | 2026-04-24 |

> Sub-sección 01b del Manual de Marca. Documento de decisión que cerró el par tipográfico oficial de DS 01 (Space Grotesk + Inter). Compara 4 opciones de pairing aplicadas al home en light y dark, argumenta la elección y registra alternativas descartadas.

---

## Contenido

1. [Criterios](#1-criterios)
2. [Opciones evaluadas](#2-opciones-evaluadas)
3. [Decisión final](#3-decisión-final)
4. [Decisiones relacionadas](#4-decisiones-relacionadas)
5. [Historial de cambios](#5-historial-de-cambios)

---

## 1. Criterios

Seis criterios de evaluación aplicados a las 4 opciones:

| # | Criterio |
|---|---|
| 01 | Contraste visual claro entre niveles tipográficos |
| 02 | Legibilidad perfecta en mobile a 375px |
| 03 | Personalidad tech-premium moderna (linaje Vercel · Linear · Stripe) |
| 04 | Máximo 2 fuentes en producción |
| 05 | Ambas disponibles en Google Fonts |
| 06 | Solo pesos 400 y 500 — rendimiento web |

---

## 2. Opciones evaluadas

### Opción A · Solo Space Grotesk

> Estado: 🚫 Descartada (`DS-X002`)

Una sola display sans para toda la web. Coherencia absoluta + un solo archivo de fuente (~40 KB gzip) + personalidad tech distintiva + números display excelentes.

**Por qué se descartó**: fatiga visual en párrafos largos. La g descendiente y las contra-formas amplias que la hacen distintiva en hero satura al ojo en body-sm. Jerarquía plana entre H3 y body. Menos "profesional-serio" para clientes corporate.

### Opción B · Space Grotesk + Inter ✅

> Estado: ✅ **Aprobada · Recomendación oficial**

- **Space Grotesk** 400 · 500 → títulos, stats, eyebrows
- **Inter** 400 · 500 → body, CTAs, labels

Pairing clásico del stack tech-premium moderno. Space Grotesk aporta personalidad en display (cortes geométricos, número 9 icónico, caja alta tensa). Inter — diseñada específicamente para UI y lectura en pantalla — asume todo lo que tiene que ser invisible y funcional: párrafos, botones, campos de formulario, micro-copy.

Inter tiene variantes tabulares por defecto, altura-x alta (legible a 14px), hinting optimizado y un cuerpo neutro que **hace que Space Grotesk brille más por contraste**. Mismo principio que Vercel, Linear, productos SaaS premium.

**Cumple los 6 criterios sin compromiso.**

**Pros**:
- Contraste display/body perfecto
- Inter = gold standard en legibilidad UI
- Excelente en mobile 375px
- Personalidad distintiva en hero y stats
- Inter variable (1 archivo, múltiples pesos)
- Ambas en Google Fonts

**Contras menores**:
- Inter está "muy vista" en SaaS
- Requiere 2 requests de fuente

### Opción C · Space Grotesk + Montserrat

> Estado: 🚫 Descartada (`DS-X001`) — combinación legacy del sitio actual

- Space Grotesk 400·500 → títulos
- Montserrat 400·500 → UI y body

**Por qué se descartó**: Montserrat es una display geométrica diseñada para carteles, no para UI. Su altura-x baja, su contraste óptico parejo y su letterspacing natural la hacen preciosa en logotipos y hero grandes — pero pesada y poco legible en body a 16px y letal en 14px.

Además, poner dos display sans (Space Grotesk + Montserrat) una al lado de la otra **compite**: ambas quieren protagonismo, ninguna se subordina, y el ojo se cansa. Es como combinar dos voces gritando en la misma canción.

Ejemplos donde Montserrat sí funciona: marcas de moda, inmobiliarias, estudios de fotografía — poca UI, mucho poster. NoaTech es lo contrario.

### Opción D · Space Grotesk + Inter + JetBrains Mono

> Estado: 📌 Backlog (`DS-F001` · target v1.1)

Extensión de la Opción B con un tercer tipo monoespaciado SOLO para acentos técnicos: eyebrows, metadata ("5 min lectura · Abril 2026"), timestamps, números de versión, snippets de código. NO aparece en body ni títulos.

**Por qué quedó en backlog**: técnicamente son 3 familias (infringe "máximo 2 estricto"), pero JetBrains Mono solo carga peso 400 y se usa <5% del contenido. Payload real: ~55 KB vs ~48 KB de B. Si más adelante querés empujar la narrativa técnica, evolucionar B → D sumando JetBrains Mono a metadata.

---

## 3. Decisión final

**Aprobada Opción B** (Space Grotesk + Inter) el 2026-04-24.

**Tokens finales**:

```css
--font-display: 'Space Grotesk', sans-serif;
--font-body:    'Inter', system-ui, sans-serif;

--fw-regular: 400;
--fw-medium:  500;

/* Carga Google Fonts */
family=Space+Grotesk:wght@400;500
family=Inter:wght@400;500
&display=swap
```

**Ruta de evolución futura**: si más adelante el equipo quiere empujar la narrativa técnica un paso más (metadata mono, snippets de código), evolucionar a Opción D agregando JetBrains Mono solo para acentos técnicos. Es una **extensión, no un cambio** — Space Grotesk + Inter quedan intactos como par principal.

---

## 4. Decisiones relacionadas

| ID | Tipo | Tema |
|---|---|---|
| `DS-001` | ✅ Aprobada | Tipografía display · Space Grotesk |
| `DS-002` | ✅ Aprobada | Tipografía body · Inter |
| `DS-F001` | 📌 Backlog | JetBrains Mono para metadata técnica (Opción D) |
| `DS-X001` | 🚫 Descartada | Space Grotesk + Montserrat (legacy) |
| `DS-X002` | 🚫 Descartada | Solo Space Grotesk (fatiga en lectura larga) |

---

## 5. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-04-24 | Pairing cerrado: Opción B aprobada (Space Grotesk + Inter) |

---

**Archivos relacionados**:
- [`README.md`](README.md) — índice del manual
- [`01-typography.md`](01-typography.md) — sección 01 · Tipografía
- [`decisions-log.md`](decisions-log.md) — log completo de decisiones
