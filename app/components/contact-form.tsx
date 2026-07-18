"use client";

import { type FormEvent, useState } from "react";
import { useLanguage } from "./language-provider";
import { translations } from "@/lib/i18n";
import type { ContactResponse } from "@/app/api/contact/route";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const { locale } = useLanguage();
  const t = translations[locale].contactForm;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.get("nombre"),
          email: formData.get("email"),
          mensaje: formData.get("mensaje"),
          _honeypot: formData.get("_honeypot") ?? "",
          website: formData.get("website") ?? "",
        }),
      });

      const data: ContactResponse = await res.json();

      if (data.ok) {
        setStatus("success");
        setNombre("");
        setEmail("");
        setMensaje("");
        return;
      }

      if (res.status === 429) {
        setErrorMsg(t.rateLimit);
      } else if ("fields" in data && data.fields) {
        setFieldErrors(data.fields);
      } else {
        setErrorMsg(data.error);
      }
      setStatus("error");
    } catch {
      setErrorMsg(t.errorGeneric);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form-success">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="contact-form-success-title">{t.successTitle}</h3>
        <p className="contact-form-success-body">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {/* Honeypots — hidden from real users, attractive to bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}>
        <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </div>

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <label htmlFor="cf-nombre" className="contact-form-label">
            {t.nombre}
          </label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            minLength={2}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={t.nombrePlaceholder}
            className={`contact-form-input ${fieldErrors.nombre ? "contact-form-input-error" : ""}`}
            suppressHydrationWarning
          />
          {fieldErrors.nombre && (
            <span className="contact-form-error">{fieldErrors.nombre}</span>
          )}
        </div>

        <div className="contact-form-field">
          <label htmlFor="cf-email" className="contact-form-label">
            {t.email}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className={`contact-form-input ${fieldErrors.email ? "contact-form-input-error" : ""}`}
            suppressHydrationWarning
          />
          {fieldErrors.email && (
            <span className="contact-form-error">{fieldErrors.email}</span>
          )}
        </div>
      </div>

      <div className="contact-form-field">
        <label htmlFor="cf-mensaje" className="contact-form-label">
          {t.mensaje}
        </label>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          required
          minLength={10}
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder={t.mensajePlaceholder}
          className={`contact-form-textarea ${fieldErrors.mensaje ? "contact-form-input-error" : ""}`}
          suppressHydrationWarning
        />
        {fieldErrors.mensaje && (
          <span className="contact-form-error">{fieldErrors.mensaje}</span>
        )}
      </div>

      {errorMsg && <p className="contact-form-error-banner">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="contact-form-submit"
        suppressHydrationWarning
      >
        {status === "loading" ? t.sending : t.submit}
      </button>
    </form>
  );
}
