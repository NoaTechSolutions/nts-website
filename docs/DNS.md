# DNS y dominio — NoaTechSolutions

El dominio `noatechsolutions.com` y el **email** viven en **SiteGround** (el DNS se administra
ahí, en Site Tools → Domain → DNS Zone Editor). La **web** se sirve desde **Netlify**.

- Site de Netlify: **`beamish-salmiakki-478d5f.netlify.app`**
- Go-live (cutover de DNS): **2026-07-18**
- SSL: Let's Encrypt (automático, provisto por Netlify), auto-renueva.

---

## Qué se cambió para apuntar la web a Netlify (cutover)

En SiteGround hubo que **desactivar el CDN de SiteGround** para el dominio, porque los
registros A del apex y `www` figuraban como "Registro CDN" (no editables). Al desactivarlo,
volvieron a ser registros A normales y editables.

Luego se cambiaron **solo estos 2 registros**:

| Registro | Valor ANTES (SiteGround) | Valor AHORA (Netlify) |
|---|---|---|
| `noatechsolutions.com` (A, apex) | `34.174.200.50` | **`75.2.60.5`** |
| `www.noatechsolutions.com` (A) | `34.174.200.50` | **`75.2.60.5`** |

> Nota: `www` quedó como registro **A → 75.2.60.5** (config válida; Netlify lo redirige al
> apex). La alternativa "más prolija" habría sido un **CNAME** `www` →
> `beamish-salmiakki-478d5f.netlify.app`, pero no es necesario.
> IP de apex de Netlify: **`75.2.60.5`** (load balancer, documentada y estable).

---

## Registros que NUNCA se tocan (mantienen el email vivo)

El correo NO está en Netlify. Estos registros de SiteGround quedan intactos:

- **MX**: `mx10`, `mx20`, `mx30.antispam.mailspamprotection.com`
- **`mail.noatechsolutions.com`** (A → `34.174.200.50`) — servidor IMAP/SMTP (lo usa el form)
- **`autodiscover`, `autoconfig`, `ssh`, `ftp`** (A → `34.174.200.50`)
- **SPF**: `noatechsolutions.com` TXT `v=spf1 +a +mx +ip4:34.174.102.41 include:...dnssmarthost...`
- **DKIM**: `default._domainkey` (CNAME) y `_domainkey` (TXT)
- **DMARC**: `_dmarc` TXT
- Subdominios de OTROS proyectos: `staging`, `api-staging`, `staging9`, `vcard`,
  `alonsozapata`, `iesparza` (varios en `34.174.200.50` y un CNAME a Vercel). **No tocar.**

---

## Cómo REVERTIR (volver la web a SiteGround)

Si alguna vez hay que devolver la web a SiteGround:

1. En SiteGround → DNS Zone Editor, editar los 2 registros A y volver a apuntarlos a
   **`34.174.200.50`**:
   - `noatechsolutions.com` (A) → `34.174.200.50`
   - `www.noatechsolutions.com` (A) → `34.174.200.50`
2. Reactivar el **CDN de SiteGround** si se quiere.
3. La propagación DNS puede tardar hasta 72h (TTL 24h).

El email NO se ve afectado en ningún caso porque esos registros no se tocan.

---

## Rollback de la WEB (sin tocar DNS)

Si el problema es un deploy malo (no el DNS), NO tocar DNS: en Netlify → Deploys → elegir un
deploy anterior "Published" → **Publish deploy**. Revierte al instante. Ver [DEPLOY.md](DEPLOY.md).
