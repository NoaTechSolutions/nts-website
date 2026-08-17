# Deploy runbook — NoaTechSolutions website

> ⚠️ **HAY DOS PIPELINES DE DEPLOY CORRIENDO EN PARALELO.** Netlify sirve el dominio de
> producción; un workflow de GitHub Actions despliega a Vercel y sirve
> `staging.noatechsolutions.com`. **Antes de borrar, "consolidar" o limpiar cualquiera de los
> dos, leé [Pipeline paralelo: Vercel](#pipeline-paralelo-vercel-no-borrar-sin-leer-esto).**

Hosting de **producción**: **Netlify** (Next.js 16 runtime, SSR + funciones Node para `/api/contact`).
CD: cada `git push` dispara un deploy automático.

- `main`  → **producción**
- `develop` → **staging** (branch deploy)
- Pull Requests → deploy preview temporal

El **DNS** está en **Cloudflare** desde el 2026-08-16. El **correo** sigue en **SiteGround hasta
el 2026-09-05**. Ver [DNS.md](DNS.md).

---

## Pipeline paralelo: Vercel (NO borrar sin leer esto)

Además del CD de Netlify, el repo tiene un workflow de GitHub Actions que despliega a **Vercel**
en cada push. **No es residuo muerto: está verde y sirve un host real.**

| | |
|---|---|
| Archivo | `.github/workflows/deploy-production.yml` |
| Trigger | `push` a `main` y a `develop` |
| Job `deploy-staging` (`develop`) | Deploy al proyecto Vercel de staging (`VERCEL_STAGING_PROJECT_ID`) |
| Job `deploy-production` (`main`) | Deploy al proyecto Vercel de producción (`VERCEL_PROJECT_ID`) |
| Secrets de GitHub que usa | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_STAGING_PROJECT_ID` |

### Qué sirve cada proveedor HOY

| Host | Sirve | Verificado |
|---|---|---|
| `noatechsolutions.com` · `www` | **Netlify** (A → `75.2.60.5`) | `server: Netlify` |
| `staging.noatechsolutions.com` | **Vercel** (CNAME → `*.vercel-dns-017.com`) | `server: Vercel` |
| `develop--<site>.netlify.app` | **Netlify** (branch deploy de `develop`) | 200 OK |

> El job `deploy-production` de Vercel **sí corre en cada push a `main`**, pero su salida **no
> está en el dominio real** — producción la sirve Netlify. Es un deploy que se publica en la URL
> `*.vercel.app` del proyecto y nada más.

### Qué se rompe si apagás cada uno

- **Apagar Vercel** → se cae `staging.noatechsolutions.com` y **cada push a `develop` falla en
  rojo** (el job `deploy-staging` no encuentra el proyecto). Producción: **sin impacto**.
- **Apagar Netlify** → **se cae el sitio**.

### Estado de la decisión

El cutover a Vercel como único proveedor está decidido para **octubre 2026** (ver milestone
`stack-2026-10`). **Hasta después del 2026-09-05 no se toca nada de este sitio** — la ventana de
la migración de SiteGround no se comparte con un cambio de hosting.

---

## Flujo de deploy (repetible)

```
local → APROBACIÓN visual en local → develop (staging) → verificar staging → main (producción) → verificar
```

> ⚠️ **REGLA (2026-07-22): nada se pushea a `develop` sin aprobación visual en LOCAL primero.**
> Todo cambio (feature, perf, fix) se revisa y aprueba en `localhost:3006` ANTES del push a
> staging. Con el OK en staging, recién ahí se promueve a `main`. Sin excepciones.

### 1. Pre-check local (obligatorio antes de pushear)

```bash
npx tsc --noEmit      # 0 errores
npm run lint          # 0 errores (warnings <img> intencionales OK)
```

Y la **aprobación visual**: levantar `npm run dev` (puerto 3006), revisar el cambio en el
navegador y dar el OK explícito. Recién entonces se pushea.

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

| Variable | Secret | Requerida | Nota |
|---|---|---|---|
| `SMTP_HOST` | no | sí | Hoy `mail.noatechsolutions.com` (SiteGround) |
| `SMTP_PORT` | no | no | Default `465` (SSL). `587` = STARTTLS |
| `SMTP_USER` | no | sí | Hoy `noreply@noatechsolutions.com` |
| `SMTP_PASS` | **sí** | sí | Password del buzón `noreply@` |
| `MAIL_FROM` | no | **no** | Remitente. **Ausente → `NoaTechSolutions <SMTP_USER>`** (igual que antes) |
| `CONTACT_INBOX` | no | **no** | Buzón destino. **Ausente → `contact@noatechsolutions.com`** (igual que antes) |
| `RATELIMIT_BYPASS_TOKEN` | **sí** | **no** | Bypass de rate-limit. **Ausente → límites normales.** Solo durante el cutover |
| `UPSTASH_REDIS_REST_URL` | no | sí | rate-limit del form |
| `UPSTASH_REDIS_REST_TOKEN` | **sí** | sí | rate-limit del form |
| `NEXT_PUBLIC_CRISP_ID` | no | no | chat (público, se embebe en build) |

`NEXT_PUBLIC_ENV` la setea `netlify.toml` por contexto. `NODE_VERSION=22` también. NO cargar `LINEAR_API_KEY` (solo dev local).

> El comentario de `netlify.toml:4` menciona `RESEND_API_KEY`. **El código nunca la lee** — el
> transporte es SMTP genérico vía nodemailer. O es un resto de un intento previo, o es
> aspiracional. Verificar en el panel antes de asumir que existe.

### Las tres env vars nuevas son opt-in

`MAIL_FROM`, `CONTACT_INBOX` y `RATELIMIT_BYPASS_TOKEN` tienen **default al comportamiento
actual**. Sin cargarlas, producción se comporta exactamente igual que antes del cambio. Existen
para que la salida de SiteGround sea un cambio de configuración y no un deploy bajo presión.

### Cómo migrar el correo a otro proveedor (sin tocar código)

1. Dar de alta el proveedor (Resend / SES / Postmark) y verificar el dominio
2. Publicar en **Cloudflare** los SPF/DKIM del proveedor nuevo (los de SiteGround mueren — ver [DNS.md](DNS.md))
3. En el panel: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` → valores del proveedor nuevo
4. Cargar **`MAIL_FROM`** (ej. `NoaTechSolutions <noreply@noatechsolutions.com>`) — obligatorio si
   el `SMTP_USER` del proveedor nuevo no es una dirección de correo
5. Cargar **`CONTACT_INBOX`** apuntando al buzón nuevo
6. Probar en staging con `RATELIMIT_BYPASS_TOKEN` para no comerse el 429 a la cuarta prueba:
   ```bash
   curl -X POST https://<staging>/api/contact \
     -H 'content-type: application/json' \
     -H 'x-ratelimit-bypass: <token>' \
     -d '{"nombre":"Prueba","email":"vos@ejemplo.com","mensaje":"prueba de cutover smtp","_honeypot":""}'
   ```
7. Terminado el cutover: **sacar `RATELIMIT_BYPASS_TOKEN` de producción**

---

## Rollback

Netlify → Deploys → elegir un deploy anterior "Published" → **Publish deploy**. Revierte al instante sin tocar git. Después, arreglar en código y repetir el flujo.

---

## Pendientes / mejoras post-launch

- 🔴 **Migrar el correo fuera de SiteGround antes del 2026-09-05.** Ya NO reemplaza el transporte
  de `app/api/contact/route.ts` — el código quedó desacoplado del proveedor (ver arriba). Lo que
  falta es **externo al repo**: alta del proveedor, verificación de dominio, mudanza del buzón
  `contact@` y SPF/DKIM nuevos en Cloudflare.
- El `catch` de `app/api/contact/route.ts` devuelve 500 genérico **sin loguear el error**. Si el
  SMTP se cae, el formulario falla en silencio y el aviso interno —que es justo cómo te
  enterarías— es lo que falló. Sin observabilidad, se pierden leads sin saberlo.
- Base de **Upstash separada para staging** (hoy staging comparte contador de rate-limit con prod).
- Convertir los `<img>` del slider antes/después (`diseno-web-showcase.tsx`) a `next/image` (warnings de LCP).
