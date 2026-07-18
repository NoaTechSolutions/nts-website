"use client";

import { useLanguage } from "../language-provider";
import { ContactForm } from "../contact-form";
import { GradientBadge } from "../ui/gradient-badge";

export function ContactSection() {
  const { locale } = useLanguage();

  return (
    <section id="contacto-form" className="section-divider contact-form-section">
      <div className="grid-shell">
        <div className="contact-form-layout">
          <div className="contact-form-motivation">
            <GradientBadge icon="chat">
              {locale === "es" ? "Hablemos" : "Let's talk"}
            </GradientBadge>
            <h2 className="contact-form-motivation-title">
              {locale === "es"
                ? "¿Tienes un proyecto en mente?"
                : "Got a project in mind?"}
            </h2>
            <p className="contact-form-motivation-copy">
              {locale === "es"
                ? "Cuéntanos tu idea. Respondemos en menos de 24 horas con una propuesta real."
                : "Tell us your idea. We respond within 24 hours with a real proposal."}
            </p>
            <ul className="contact-form-trust-list">
              {[
                locale === "es" ? "Respuesta en menos de 24h" : "Response within 24h",
                locale === "es" ? "Primera consulta sin costo" : "First consultation free",
                locale === "es" ? "Sin compromisos" : "No commitments",
              ].map((item) => (
                <li key={item} className="contact-form-trust-item">
                  <span className="contact-form-trust-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="contact-form-social-proof">
              {locale === "es"
                ? "Más de 150 proyectos entregados en California, USA, Perú y el mundo"
                : "Over 150 projects delivered in California, USA, Peru and worldwide"}
            </p>
          </div>

          <div className="contact-form-card">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
