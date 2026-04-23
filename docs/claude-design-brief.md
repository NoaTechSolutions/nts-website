# Claude Design Brief — NoaTechSolutions

> Brief para review de diseño y exploración de nuevas secciones, páginas internas y guía visual del sitio.
> Stack: Next.js 16 + React 19 + Tailwind 4 + motion/react + GSAP.

---

## Estructura de navegación

Servicios dropdown: 9 servicios
Productos dropdown: NTSSign + SaaS futuros

---

## Componentes de UI disponibles

### Botones
- BtnPrimaryHero — hero con glow
- BtnGhostMoving — ghost con orb
- .btn-body-primary — navy fill
- .btn-body-amber — amber fill
- .btn-body-ghost — ghost navy
- .btn-cta-navy — amber fill + text swap hover + pulse animation
- .btn-nav-primary — nav
- .btn-nav-ghost — nav ghost
- .pill-amber — pill info tag

### Animaciones y efectos
- BackgroundBoxes — grid isométrico con hover colores random + auto-animación en touch devices
- CardSticky — cards que se apilan con scroll sticky
- CardSwap (GSAP) — cards 3D que rotan con scroll progress
- LayoutTextFlip — texto con palabra rotativa animada
- MouseGlowBg — glow que sigue al cursor
- HeroParallax — galería parallax
- TextHoverEffect — SVG reveal en hover
- Highlighter — subrayado animado (rough-notation)
- NumberTicker — contador animado
- ContainerScroll — scroll container para CardSticky

### Layout helpers
- .grid-shell — max-w-6xl centered
- .page-shell — wrapper principal
- .section-divider — full-width con escape del grid
- .eyebrow — label pequeño sobre títulos
- .section-copy — párrafo de sección

---

## Estilo visual actual

- Dark navy sobre fondos claros
- Acentos amber en CTAs
- Gradientes en cards (navy→electric, electric→sky, sky→amber)
- Ondas blancas entre secciones
- Grid isométrico animado en CTAs
- Cards con perspectiva 3D y rotación
- Sticky scroll para revelar contenido
- Parallax en portfolio

---

## Lo que buscamos de Claude Design

1. **REVISIÓN** del home actual y sugerencias de mejora visual
2. **NUEVAS SECCIONES** que podrían agregar valor al home
3. **GUÍA DE ESTILO** para las páginas internas manteniendo consistencia con el home
4. **INTEGRACIÓN** de la mascota Noa en el flujo narrativo del sitio
5. **JERARQUÍA VISUAL** del nav con dropdowns para que se vea premium
6. **SUGERENCIAS** para las páginas de servicios individuales (estructura, secciones, CTA)
7. **CONCEPTO** para la página /nosotros que comunique confianza y profesionalismo

---

## Recursos adicionales

- Design system completo: [`docs/design-system.md`](design-system.md)
- Componentes documentados: [`docs/COMPONENTS.md`](COMPONENTS.md)
- Mapa del sitio: [`docs/SITEMAP.md`](SITEMAP.md)
