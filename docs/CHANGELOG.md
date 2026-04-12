# CHANGELOG — NoaTechSolutions Website

## [2026-04-11] — Limpieza inicial y sync design system (NTS-001)

### Eliminados
- `app/components/resizable-navbar.tsx` — stub duplicado con datos hardcodeados en inglés
- `components/ui/button.tsx` — componente shadcn sin uso real
- `components/ui/container-text-flip.tsx` — sin uso
- `components/ui/hyper-text.tsx` — sin uso
- `components/ui/sticky-scroll-reveal.tsx` — sin uso

### Corregidos — Colores
- `#02215f` → `#022977` en todo el proyecto (navy primario correcto según DS)
- rgba equivalente `rgba(2,33,95,...)` → `rgba(2,41,119,...)` en todos los componentes
- Eliminado `--color-body: #222222` (gris prohibido por DS en light mode)
- Eliminado `--color-ink-soft: #41516f` (gris prohibido por DS en light mode)
- Nuevos tokens de texto: `--text-label: rgba(2,41,119,0.5)`, `--text-body: rgba(2,41,119,0.7)`

### Corregidos — Tokens CSS (renombrados al naming del DS)
- `--color-ink` → `--color-navy`
- `--color-highlight` → `--color-amber`
- `--color-accent-soft` → `--color-sky`
- `--color-panel` → `--bg-section`
- `--color-panel-soft` → `--bg-card`
- `--color-paper` → `--bg-page`

### Agregados — Dark mode
- Bloque `.dark {}` en `globals.css` con 13 tokens: `--bg-page`, `--bg-section`, `--bg-card`, `--bg-card-pop`, `--text-heading`, `--text-body`, `--text-label`, `--text-note`, `--border-default`, `--color-navy`, `--color-amber`, `--bg-cta-final`

### Corregidos — Tipografía
- `app/layout.tsx`: eliminado Montserrat (Google Font), reemplazado por system fonts
- `globals.css`: `--font-body-fallback` → `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `globals.css`: 42 violaciones de `font-weight: 600/700/800` → `font-weight: 500`
- TSX: `font-bold`, `font-semibold`, `font-extrabold` → `font-medium` en 6 archivos

### Documentación
- Generado `docs/AUDIT.md` con inventario completo de componentes, dependencias, assets y tokens
- Sección `## 6. CORRECCIONES EJECUTADAS` agregada a `docs/AUDIT.md`
