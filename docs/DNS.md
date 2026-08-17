# DNS y dominio — NoaTechSolutions

El DNS de `noatechsolutions.com` se administra en **Cloudflare**. La **web** se sirve desde
**Netlify**. El **correo** sigue en **SiteGround — hasta el 2026-09-05** (ver
[Salida de SiteGround](#salida-de-siteground-2026-09-05)).

| Hito | Fecha |
|---|---|
| Go-live de la web en Netlify (cutover de los 2 registros A) | **2026-07-18** |
| Cambio de nameservers SiteGround → Cloudflare | **2026-08-16** |
| Baja del hosting de SiteGround (meta) | **2026-09-05** |

- Nameservers autoritativos: **`gemma.ns.cloudflare.com`** · **`kaiser.ns.cloudflare.com`**
- Site de Netlify: **`beamish-salmiakki-478d5f.netlify.app`**
- SSL: Let's Encrypt (automático, provisto por Netlify), auto-renueva.

> **El contenido no se movió con los nameservers.** La migración a Cloudflare del 2026-08-16
> replicó los registros apuntando a los mismos destinos de siempre. Cero downtime.

---

## Estado de la zona en Cloudflare

**19 registros, todos en DNS only (nube gris).** Sin proxy, a propósito: durante la ventana de
migración queremos comportamiento **idéntico** al anterior. El proxy de Cloudflare se evalúa
recién cuando los sitios estén estables — activarlo cambia IPs de origen, headers y caché, y no
se mezcla con una migración de correo en curso.

### Verificado contra DNS público (2026-08-16)

| Host | Resuelve a | Quién lo sirve | Estado |
|---|---|---|---|
| `noatechsolutions.com` (apex, A) | `75.2.60.5` | Netlify | ✅ vivo |
| `www` (A) | `75.2.60.5` | Netlify | ✅ vivo |
| `staging` (CNAME) | `f7cad2d3eec01f14.vercel-dns-017.com` → `64.29.17.1` | **Vercel** | ✅ vivo |
| `mail` (A) | `34.174.200.50` | SiteGround | ⏳ muere 2026-09-05 |
| `autodiscover` (A) | `34.174.200.50` | SiteGround | ⏳ muere 2026-09-05 |
| `autoconfig` (A) | `34.174.200.50` | SiteGround | ⏳ muere 2026-09-05 |
| `ssh` (A) | `34.174.200.50` | SiteGround | ⏳ muere 2026-09-05 |
| `ftp` (A) | `34.174.200.50` | SiteGround | ⏳ muere 2026-09-05 |
| `iesparza` (A) | `34.174.200.50` | SiteGround | ⚠️ ver nota |
| `MX` ×3 | `mx10` / `mx20` / `mx30.antispam.mailspamprotection.com` | SiteGround | ⏳ muere 2026-09-05 |

> ⚠️ **`iesparza`** sobrevivió la migración de nameservers y apunta a SiteGround. **Este repo no
> lo usa** (verificado por grep: cero referencias en código, config y workflows). Nadie decidió
> explícitamente mantenerlo ni apagarlo — si es de otro proyecto, hay que decidir antes del
> 2026-09-05, porque en esa fecha se cae solo.

### Subdominios apagados en la migración (NO se recrearon)

Auditados como vacíos o en desuso antes de la baja. **Ninguno resuelve hoy** (verificado):

| Host | Qué era |
|---|---|
| `vcard` | Vacío, solo un `php_errorlog` |
| `api-staging` | Vacío, "Under construction" |
| `staging9` | WordPress viejo de NoaTech |
| `alonsozapata` | Descartado por decisión |

**Este repo no referencia ninguno** (verificado por grep). No hay impacto.

---

## ⛔ `staging` NO es `staging9`

```
staging.noatechsolutions.com   → Vercel     · VIVO  · en la zona de Cloudflare
staging9.noatechsolutions.com  → SiteGround · MUERTO · NO está en la zona nueva
```

**Nunca filtrar por el patrón `staging*` en una limpieza.** Son dos cosas distintas con nombres
parecidos, y una de ellas es el staging real de este sitio. Un `delete where name like 'staging%'`
se lleva puesto el entorno de pruebas de producción.

---

## Registros de correo (siguen en SiteGround)

El correo NO está en Netlify ni en Cloudflare. Estos registros viven en la zona de Cloudflare
pero apuntan a infraestructura de SiteGround:

- **MX**: `mx10`, `mx20`, `mx30.antispam.mailspamprotection.com`
- **`mail.noatechsolutions.com`** (A → `34.174.200.50`) — servidor IMAP/SMTP. Es el valor de la
  env var `SMTP_HOST` que usa `app/api/contact/route.ts`
- **`autodiscover`, `autoconfig`, `ssh`, `ftp`** (A → `34.174.200.50`)
- **SPF**: `noatechsolutions.com` TXT `v=spf1 +a +mx +ip4:34.174.102.41 include:...dnssmarthost...`
- **DKIM**: `default._domainkey` (CNAME) y `_domainkey` (TXT)
- **DMARC**: `_dmarc` TXT

> ⚠️ El SPF incluye `ip4:34.174.102.41` y un `include:` de SiteGround; el DKIM es un CNAME a
> SiteGround. Cuando el hosting se dé de baja, **esos registros quedan apuntando al vacío** y el
> correo saliente puede empezar a fallar autenticación (SPF/DKIM → DMARC). Se reemplazan por los
> del proveedor nuevo **en el mismo cambio**, no después.

---

## Salida de SiteGround (2026-09-05)

Qué se rompe si no se toca nada:

1. **El formulario de contacto deja de enviar.** `SMTP_HOST` (`mail.noatechsolutions.com`) deja
   de resolver → `sendMail` tira → el `catch` de `route.ts` devuelve 500 genérico. Se caen los
   **dos** envíos: el aviso interno y el acuse al visitante.
2. **Se cae el correo ENTRANTE.** `contact@noatechsolutions.com` es un buzón de SiteGround y los
   MX apuntan a su antispam. Esa dirección está publicada en el footer, en i18n (ES/EN) y en el
   JSON-LD de `app/layout.tsx`.
3. **SPF/DKIM quedan colgados** (ver advertencia arriba).
4. `autodiscover` / `autoconfig` dejan de autoconfigurar clientes de correo.
5. `ssh` / `ftp` mueren con el hosting (esperado).

El **código ya está desacoplado del proveedor**: `MAIL_FROM`, `CONTACT_INBOX` y los cuatro
`SMTP_*` salen de env vars. Migrar el correo es un cambio de configuración, no un deploy. Ver
[DEPLOY.md](DEPLOY.md#variables-de-entorno).

**Lo que sigue faltando es externo al repo:** dar de alta el proveedor nuevo, verificar el
dominio, mover el buzón `contact@` y publicar SPF/DKIM nuevos en Cloudflare.

---

## Cómo REVERTIR la web a SiteGround

> El DNS ya **no** se edita en SiteGround. Tocar el DNS Zone Editor de SiteGround hoy **no tiene
> ningún efecto**: los autoritativos son los de Cloudflare.

1. En **Cloudflare → DNS → Records**, editar los 2 registros A y apuntarlos a `34.174.200.50`:
   - `noatechsolutions.com` (A) → `34.174.200.50`
   - `www.noatechsolutions.com` (A) → `34.174.200.50`
2. Reactivar el CDN de SiteGround si se quiere.
3. La propagación la fija el **TTL de la zona de Cloudflare** (no las 72h del TTL viejo de
   SiteGround). Con TTL bajo, minutos.

> Esto solo tiene sentido **antes** del 2026-09-05. Después, el destino no existe.

El correo no se ve afectado por este rollback: son registros distintos.

---

## Rollback de la WEB (sin tocar DNS)

Si el problema es un deploy malo (no el DNS), NO tocar DNS: en Netlify → Deploys → elegir un
deploy anterior "Published" → **Publish deploy**. Revierte al instante. Ver [DEPLOY.md](DEPLOY.md).
