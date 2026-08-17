import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  _honeypot: z.string().max(0, "Spam detectado"),
  website: z.string().max(0, "Spam detectado").optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export type ContactResponse =
  | { ok: true; message: string }
  | { ok: false; error: string; fields?: Record<string, string> };

// Transporte SMTP genérico. NO está atado a ningún proveedor: host, puerto y
// credenciales salen por completo de env vars, scopeadas por contexto en el
// panel de deploy (prod vs staging). Puerto 465 = SSL implícito (secure),
// 587 = STARTTLS. Se instancia por request (serverless, sin estado compartido).
//
// Cambiar de proveedor de correo (SiteGround → Resend/SES/Postmark/lo que sea)
// NO requiere tocar este archivo: los cuatro SMTP_* apuntan al host nuevo y
// listo. Resend, SES y Postmark exponen SMTP además de su API HTTP.
function getTransport() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Buzón que recibe los mensajes del formulario. Se puede desviar sin deploy.
const DEFAULT_CONTACT_INBOX = "contact@noatechsolutions.com";

function getContactInbox(): string {
  return process.env.CONTACT_INBOX?.trim() || DEFAULT_CONTACT_INBOX;
}

// Remitente. Se separa de SMTP_USER a propósito: en SiteGround el usuario SMTP
// ES una dirección (`noreply@...`), pero en casi cualquier otro proveedor NO lo
// es (en Resend el usuario es el string `resend`, en SES es un ID de API). Sin
// MAIL_FROM, mover el correo haría salir `NoaTechSolutions <resend>` → inválido.
// Default = comportamiento actual, para que el cambio sea invisible en prod.
function getMailFrom(): string {
  return process.env.MAIL_FROM?.trim() || `NoaTechSolutions <${process.env.SMTP_USER}>`;
}

function getRatelimitByIp() {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "24h"),
    prefix: "contact:ip",
  });
}

function getRatelimitByEmail() {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(2, "24h"),
    prefix: "contact:email",
  });
}

// Bypass de rate-limit para el cutover de correo. Ausente por default: si
// RATELIMIT_BYPASS_TOKEN no está cargada, los limitadores se aplican exactamente
// como antes. Existe porque probar el SMTP nuevo desde una IP se come el 429 al
// cuarto intento, y el síntoma se lee como "el SMTP no anda" cuando el SMTP anda.
// Se saca de las env vars de producción cuando el cutover termina.
const BYPASS_HEADER = "x-ratelimit-bypass";

function hasRatelimitBypass(req: NextRequest): boolean {
  const expected = process.env.RATELIMIT_BYPASS_TOKEN?.trim();
  if (!expected) return false;
  return req.headers.get(BYPASS_HEADER)?.trim() === expected;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        fields[key] ??= issue.message;
      }
      return NextResponse.json<ContactResponse>(
        { ok: false, error: "Error de validación", fields },
        { status: 400 },
      );
    }

    const { nombre, email, mensaje } = parsed.data;
    const ip = getClientIp(req);

    if (!hasRatelimitBypass(req)) {
      const ipLimit = await getRatelimitByIp().limit(ip);
      if (!ipLimit.success) {
        return NextResponse.json<ContactResponse>(
          { ok: false, error: "Demasiados mensajes. Intenta de nuevo en 24 horas." },
          { status: 429, headers: { "X-RateLimit-Remaining": String(ipLimit.remaining) } },
        );
      }

      const emailLimit = await getRatelimitByEmail().limit(email.toLowerCase());
      if (!emailLimit.success) {
        return NextResponse.json<ContactResponse>(
          { ok: false, error: "Ya recibimos tu mensaje recientemente. Esperá unas horas." },
          { status: 429, headers: { "X-RateLimit-Remaining": String(emailLimit.remaining) } },
        );
      }
    }

    const transport = getTransport();
    const from = getMailFrom();

    await transport.sendMail({
      from,
      to: getContactInbox(),
      subject: `Nuevo contacto: ${nombre}`,
      replyTo: email,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        "",
        "Mensaje:",
        mensaje,
      ].join("\n"),
    });

    await transport.sendMail({
      from,
      to: email,
      subject: "Recibimos tu mensaje — NoaTechSolutions",
      text: [
        `Hola ${nombre},`,
        "",
        "Recibimos tu mensaje y te responderemos lo antes posible.",
        "",
        "— El equipo de NoaTechSolutions",
      ].join("\n"),
    });

    return NextResponse.json<ContactResponse>(
      { ok: true, message: "Mensaje enviado. Revisa tu email para la confirmación." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ContactResponse>(
      { ok: false, error: "Error interno del servidor. Intenta más tarde." },
      { status: 500 },
    );
  }
}
