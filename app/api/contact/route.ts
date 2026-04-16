import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
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

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
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

    const ipLimit = await getRatelimitByIp().limit(ip);
    if (!ipLimit.success) {
      return NextResponse.json<ContactResponse>(
        { ok: false, error: "Demasiados mensajes. Intentá de nuevo en 24 horas." },
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

    const resend = getResend();
    await resend.emails.send({
      from: "NoaTechSolutions <noreply@noatechsolutions.com>",
      to: "hello@noatechsolutions.com",
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

    await resend.emails.send({
      from: "NoaTechSolutions <noreply@noatechsolutions.com>",
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
      { ok: true, message: "Mensaje enviado. Revisá tu email para la confirmación." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json<ContactResponse>(
      { ok: false, error: "Error interno del servidor. Intentá más tarde." },
      { status: 500 },
    );
  }
}
