import { ResizableNavbarDemo } from "./components/resizable-navbar-demo";

const stats = [
  { value: "SEO + UX", label: "Estructura pensada para posicionar y convertir" },
  { value: "Full funnel", label: "Desde branding hasta crecimiento digital" },
  { value: "Escalable", label: "Base lista para nuevos servicios y landings" },
];

const services = [
  {
    title: "Diseno web premium",
    description:
      "Websites claros, veloces y alineados con una narrativa comercial que eleva la percepcion de tu marca.",
  },
  {
    title: "SEO estrategico",
    description:
      "Arquitectura, contenido y optimizacion tecnica para atraer trafico calificado con una base sostenible.",
  },
  {
    title: "Marketing digital",
    description:
      "Campanas, embudos y mensajes coordinados para convertir visitas en oportunidades reales.",
  },
  {
    title: "Branding y direccion visual",
    description:
      "Sistemas visuales consistentes para que cada punto de contacto se vea profesional y memorable.",
  },
];

const pillars = [
  "Estrategia antes de disenar para que cada seccion responda a un objetivo comercial.",
  "Sistema visual modular listo para crecer por servicios, sectores y ubicaciones.",
  "SEO desde la estructura y el contenido, no como ajuste tardio.",
  "Experiencia moderna con espacio para motion y componentes avanzados sin perder claridad.",
];

const process = [
  {
    step: "01",
    title: "Diagnostico y posicionamiento",
    detail:
      "Definimos propuesta de valor, servicios prioritarios, publico objetivo y direccion visual.",
  },
  {
    step: "02",
    title: "Arquitectura y contenido",
    detail:
      "Ordenamos navegacion, jerarquia H1-H2, keywords, CTAs y contenido comercial por pagina.",
  },
  {
    step: "03",
    title: "UI y desarrollo",
    detail:
      "Construimos una experiencia visual moderna, ligera y preparada para crecer.",
  },
  {
    step: "04",
    title: "SEO y optimizacion",
    detail:
      "Publicamos con medicion, buenas practicas tecnicas y una ruta clara de mejora continua.",
  },
];

const faqs = [
  {
    question: "Que necesita una web para competir hoy?",
    answer:
      "Una propuesta de valor clara, carga rapida, estructura SEO correcta, contenido bien enfocado y una identidad visual consistente.",
  },
  {
    question: "Se puede crecer la web por etapas?",
    answer:
      "Si. La base correcta permite lanzar primero una homepage fuerte y despues sumar paginas por servicio, industria o ubicacion.",
  },
  {
    question: "Como se conecta el diseno con resultados?",
    answer:
      "Cuando el diseno se alinea con la oferta, los mensajes, los CTAs y la arquitectura del sitio, mejora la confianza y la conversion.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NoaTechSolutions",
  url: "https://noatechsolutions.com",
  description:
    "Agencia digital moderna especializada en diseno web, SEO y marketing digital.",
  areaServed: ["California, United States", "Baja California, Mexico"],
  serviceType: ["Diseno web", "SEO", "Marketing digital", "Branding"],
};

export default function Home() {
  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />

      <div id="home" className="grid-shell section-space">
        <ResizableNavbarDemo />

        <section className="hero-grid">
          <div className="space-y-8">
            <span className="hero-pill">Diseno web, SEO y marketing digital</span>
            <div className="space-y-5">
              <p className="eyebrow">Estrategia creativa + tecnica</p>
              <h1 className="hero-title">
                Eleva tu negocio con una presencia digital clara, moderna y lista para crecer.
              </h1>
              <p className="hero-copy">
                Creamos sitios web impresionantes, estrategias SEO bien estructuradas y sistemas digitales que ayudan a emprendedores y pequenas empresas a competir con mas autoridad.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#contacto" className="button-primary">
                Inicia tu proyecto
              </a>
              <a href="#servicios" className="button-outline">
                Explorar servicios
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <article key={stat.label} className="metric-card">
                  <p className="metric-value">{stat.value}</p>
                  <p className="metric-copy">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="feature-panel">
            <div className="space-y-4">
              <p className="eyebrow">Direccion recomendada</p>
              <h2 className="feature-title">
                Una homepage comercial con look premium y estructura SEO preparada para expandirse.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[var(--color-ink-soft)]">
              {pillars.map((pillar) => (
                <div key={pillar} className="feature-item">
                  {pillar}
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section
          id="servicios"
          className="section-divider grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="space-y-4">
            <p className="eyebrow">Servicios core</p>
            <h2 className="section-title">
              Una base digital que vende mejor hoy y permite crecer manana.
            </h2>
            <p className="section-copy">
              La web debe funcionar como activo comercial, no solo como presentacion. Por eso la estructura se plantea con modulos reutilizables y con espacio para crecer por servicio, industria o ubicacion.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.title} className="service-card">
                <span className="service-index">0{index + 1}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-copy">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-divider grid gap-8 py-16 lg:grid-cols-[1fr_1fr]">
          <article className="surface-card p-7 sm:p-8">
            <p className="eyebrow">Posicionamiento</p>
            <h2 className="feature-title mt-3">
              El sitio debe hablarle a clientes que buscan una agencia seria, moderna y resolutiva.
            </h2>
            <p className="section-copy mt-5">
              La ventaja no esta solo en el estilo visual. Esta en conectar identidad, arquitectura de informacion, copy comercial, SEO tecnico y una experiencia que deje claro por que tu marca deberia elegirnos.
            </p>
          </article>

          <article className="insight-panel">
            <div>
              <p className="eyebrow">Escalabilidad</p>
              <h3 className="feature-title mt-3">
                Preparada para motion, nuevos servicios y una evolucion visual por fases.
              </h3>
            </div>
            <p className="section-copy">
              La primera fase debe concentrarse en narrativa, conversion, SEO y sistema visual. La siguiente puede sumar mas recursos interactivos sin sacrificar rendimiento ni claridad.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="stat-tile">
                <p className="tile-label">Performance first</p>
                <p className="tile-copy">
                  Efectos solo donde mejoran percepcion, diferenciacion y conversion.
                </p>
              </div>
              <div className="stat-tile">
                <p className="tile-label">Component driven</p>
                <p className="tile-copy">
                  Estructura lista para ampliar servicios sin rehacer la experiencia.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section
          id="proceso"
          className="section-divider grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="space-y-4">
            <p className="eyebrow">Proceso recomendado</p>
            <h2 className="section-title">
              Construyamos una web competitiva con una ruta clara y sostenible.
            </h2>
          </div>
          <div className="grid gap-4">
            {process.map((item) => (
              <article key={item.step} className="process-card">
                <div className="flex items-start gap-5">
                  <span className="process-step">{item.step}</span>
                  <div>
                    <h3 className="service-title">{item.title}</h3>
                    <p className="service-copy mt-3">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-divider py-16">
          <div className="seo-panel">
            <div>
              <p className="eyebrow">SEO comercial</p>
              <h2 className="feature-title mt-3">
                Una homepage moderna tambien debe responder a la busqueda correcta.
              </h2>
            </div>
            <p className="section-copy">
              La estructura incorpora contenido orientado a terminos como agencia de marketing digital, diseno web y SEO, pero organizado con criterio semantico para sonar claro y profesional. Eso facilita crecer despues hacia paginas especificas por servicio.
            </p>
          </div>
        </section>

        <section
          id="faq"
          className="section-divider grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="space-y-4">
            <p className="eyebrow">Preguntas clave</p>
            <h2 className="section-title">
              Las decisiones visuales y tecnicas deben alinearse con negocio y crecimiento.
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="faq-card">
                <h3 className="service-title">{faq.question}</h3>
                <p className="service-copy mt-4">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="py-16">
          <div className="cta-panel">
            <div className="space-y-5">
              <p className="eyebrow">Siguiente paso</p>
              <h2 className="cta-title">
                La base visual ya puede integrarse con tu logo y quedar lista para la version final.
              </h2>
              <p className="section-copy max-w-2xl">
                Ya deje el sistema listo sobre fondo blanco, con la paleta oficial y una estructura mas alineada a SEO. Cuando me pases el logo lo incorporo en el header, favicon y bloques clave de marca.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="mailto:hello@noatechsolutions.com" className="button-primary">
                Solicitar propuesta
              </a>
              <a href="https://noatechsolutions.com/" className="button-outline">
                Ver sitio actual
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
