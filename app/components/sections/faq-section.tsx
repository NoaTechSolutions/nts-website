"use client";

import { useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Clock3,
  CreditCard,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../language-provider";
import { translations } from "@/lib/i18n";

const faqIcons = [Rocket, CreditCard, Clock3, Search, ShieldCheck, BadgeCheck];

// FAQ específica de /servicios/diseno-web: dudas reales de clientes que NO son
// de tecnología, explicadas en simple (sin tecnicismos). Bilingüe co-locado.
const FAQ_DISENO_WEB = {
  es: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo Que Más Nos Preguntan",
    copy: "Resolvemos en simple las dudas más comunes de quienes quieren su web y no son de tecnología. Sin términos raros: te lo explicamos como se lo contarías a un amigo.",
    highlights: ["Sin tecnicismos", "Precio claro", "Acompañamiento real"],
    items: [
      {
        question: "¿Necesito saber de tecnología o computación para tener mi web?",
        answer:
          "Para nada. De la parte técnica nos encargamos nosotros. Tú solo nos cuentas de tu negocio y qué quieres lograr, y nosotros lo convertimos en una web lista para usar.",
      },
      {
        question: "¿Cuánto cuesta y cómo se paga?",
        answer:
          "Depende de lo que necesites, pero hay opciones para cada presupuesto y se puede pagar por etapas. Antes de empezar te damos un precio claro, sin sorpresas ni costos ocultos.",
      },
      {
        question: "¿Cuánto tarda en estar lista?",
        answer:
          "Según el tamaño del proyecto, suele estar en pocos días o un par de semanas. Si tienes tu información a mano avanzamos más rápido, y si no, te ayudamos a ordenarla.",
      },
      {
        question: "¿La gente va a poder encontrarme en Google?",
        answer:
          "Sí. Dejamos tu web preparada para que Google la entienda y la muestre cuando te buscan. Con el tiempo se puede reforzar para aparecer aún más arriba.",
      },
      {
        question: "¿El dominio, el hosting y todo eso lo tengo que hacer yo?",
        answer:
          "No te preocupes por los términos técnicos. Nosotros nos ocupamos de que tu web esté online, segura y funcionando. Tú solo disfrutas el resultado.",
      },
      {
        question: "¿Y si después necesito cambiar algo o pedir ayuda?",
        answer:
          "No te dejamos solo. Después de lanzar seguimos disponibles para cambios, dudas y mejoras. Tu web puede crecer junto con tu negocio.",
      },
    ],
  },
  en: {
    eyebrow: "Frequently asked questions",
    title: "What People Ask Us Most",
    copy: "We answer the most common questions from people who want a website and aren't tech-savvy — in plain words, the way you'd explain it to a friend.",
    highlights: ["No jargon", "Clear pricing", "Real support"],
    items: [
      {
        question: "Do I need to know about technology or computers to have my website?",
        answer:
          "Not at all. We handle the technical part. You just tell us about your business and what you want to achieve, and we turn it into a ready-to-use website.",
      },
      {
        question: "How much does it cost and how do I pay?",
        answer:
          "It depends on what you need, but there are options for every budget and you can pay in stages. Before we start, we give you a clear price — no surprises or hidden costs.",
      },
      {
        question: "How long does it take to be ready?",
        answer:
          "Depending on the size of the project, it's usually a few days to a couple of weeks. If your info is ready we move faster; if not, we help you organize it.",
      },
      {
        question: "Will people be able to find me on Google?",
        answer:
          "Yes. We set your site up so Google understands it and shows it when people search for you. Over time it can be reinforced to rank even higher.",
      },
      {
        question: "Do I have to handle the domain, hosting and all that myself?",
        answer:
          "Don't worry about the technical terms. We take care of getting your site online, secure and running. You just enjoy the result.",
      },
      {
        question: "What if I need to change something or ask for help later?",
        answer:
          "We don't leave you alone. After launch we stay available for changes, questions and improvements. Your site can grow with your business.",
      },
    ],
  },
} as const;

export function FaqSection({ variant }: { variant?: "diseno-web" }) {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  const content = variant === "diseno-web" ? FAQ_DISENO_WEB[locale] : t.faqSection;
  const faqItems = content.items;
  const faqHighlights = content.highlights.filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-divider contact-faq-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="contact-faq-background" aria-hidden="true" />
      <div className="grid-shell contact-faq-shell">
        <div className="contact-faq-copy">
          <p className="eyebrow contact-faq-eyebrow">{content.eyebrow}</p>
          <h2 className="section-title contact-faq-title">{content.title}</h2>
          <p className="section-copy contact-faq-body">{content.copy}</p>

          <div className="contact-faq-highlights">
            {faqHighlights.map((highlight) => (
              <span key={highlight} className="contact-faq-highlight">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="contact-faq-accordion">
          {faqItems.map((item, index) => {
            const Icon = faqIcons[index % faqIcons.length];
            const isActive = index === activeFaqIndex;

            return (
              <article
                key={item.question}
                className={`contact-faq-item ${isActive ? "is-active" : ""}`}
              >
                <button
                  type="button"
                  className="contact-faq-trigger"
                  aria-expanded={isActive}
                  onClick={() =>
                    setActiveFaqIndex((current) => (current === index ? -1 : index))
                  }
                >
                  <span className="contact-faq-item-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>

                  <span className="contact-faq-item-copy">
                    <span className="contact-faq-question">{item.question}</span>
                  </span>

                  <span className="contact-faq-item-toggle" aria-hidden="true">
                    <ChevronDown size={20} strokeWidth={2.4} />
                  </span>
                </button>

                <div className="contact-faq-answer-wrap">
                  <div className="contact-faq-answer-inner">
                    <p className="contact-faq-answer">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
