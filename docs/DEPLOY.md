# Deploy runbook — NoaTechSolutions website

Hosting: **Netlify** (Next.js 16 runtime, SSR + funciones Node para `/api/contact`).
CD: cada `git push` dispara un deploy automático.

- `main`  → **producción**
- `develop` → **staging** (branch deploy)
- Pull Requests → deploy preview temporal

El dominio + email quedan en **SiteGround** (los MX NO se tocan nunca).

---

## Flujo de deploy (repetible)

```
feature → develop (staging) → verificar → main (producción) → verificar
```

### 1. Pre-check local (obligatorio antes de pushear)

```bash
npx tsc --noEmit      # 0 errores
npm run lint          # 0 errores (warnings <img> intencionales OK)
```

> No corremos `next build` local (preferencia del proyecto). El build real lo hace Netlify.

### 2. Commit + push a staging

```bash
git add -A
git commit -m "tipo(scope): descripcion"   # conventional commits, sin co-authored-by
git push origin develop
```

Netlify buildea el branch deploy de `develop`. "Deployed in Xs" = OK; "Failed" = revisar log.

### 3. Verificar staging

Abrir la URL del branch deploy (`develop--<site>.netlify.app`) y probar:
- Home y `/servicios/diseno-web` cargan.
- Formulario de contacto: enviar prueba → debe llegar a `contact@noatechsolutions.com`.

### 4. Promover a producción

```bash
git checkout main
git pull origin main --ff-only
git merge develop --no-edit
git push origin main          # dispara deploy de prod
git checkout develop
```

### 5. Verificar producción

En Netlify, deploy de `main` en estado **Published**. Probar la URL de prod + el form.

---

## Variables de entorno (Netlify → Site configuration → Environment variables)

Cargadas en el panel de Netlify, NO en el repo. Scope: same value for all deploy contexts.

| Variable | Secret | Nota |
|---|---|---|
| `SMTP_HOST` | no | `mail.noatechsolutions.com` |
| `SMTP_PORT` | no | `465` (SSL) |
| `SMTP_USER` | no | `noreply@noatechsolutions.com` |
| `SMTP_PASS` | **sí** | password del buzón `noreply@` |
| `UPSTASH_REDIS_REST_URL` | no | rate-limit del form |
| `UPSTASH_REDIS_REST_TOKEN` | **sí** | rate-limit del form |
| `NEXT_PUBLIC_CRISP_ID` | no | chat (público, se embebe en build) |

`NEXT_PUBLIC_ENV` la setea `netlify.toml` por contexto. `NODE_VERSION=22` también. NO cargar `LINEAR_API_KEY` (solo dev local).

---

## Rollback

Netlify → Deploys → elegir un deploy anterior "Published" → **Publish deploy**. Revierte al instante sin tocar git. Después, arreglar en código y repetir el flujo.

---

## Pendientes / mejoras post-launch

- Migrar email a **Resend** cuando haya presupuesto (plan Pro para 2º dominio). Reemplaza el transporte SMTP en `app/api/contact/route.ts`.
- Base de **Upstash separada para staging** (hoy staging comparte contador de rate-limit con prod).
- Convertir los `<img>` del slider antes/después (`diseno-web-showcase.tsx`) a `next/image` (warnings de LCP).
