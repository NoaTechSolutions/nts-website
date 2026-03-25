export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const localeStorageKey = "nts-locale";

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      webDesign: "Diseno Web",
      branding: "Branding",
      businessCards: "Tarjetas de Presentacion",
      solutions: "Soluciones",
      about: "Nosotros",
      contact: "Contacto",
      cta: "CONTACTAR",
      languageLabel: "Idioma",
    },
    hero: {
      badge: "Tu Socio en Transformacion Digital",
      lead: "Eleva Tu",
      rotatingAria:
        "Eleva Tu Negocio, Proyecto, Idea, Marca, Empresa, Producto, Servicio, StartUp, Pyme o Firma a la era digital.",
      rotatingWords: [
        "Negocio",
        "Proyecto",
        "Idea",
        "Marca",
        "Empresa",
        "Producto",
        "Servicio",
        "StartUp",
        "Pyme",
        "Firma",
      ],
      accent: "A La Era Digital",
      copy:
        "Creamos sitios web impresionantes, campanas de marketing digital poderosas y soluciones de software personalizadas que ayudan a emprendedores y pequenas empresas a prosperar en linea.",
      primaryCta: "Iniciar Tu Proyecto",
      secondaryCta: "Explorar Servicios",
      stats: [
        { value: 150, suffix: "+", label: "Proyectos Completados", delay: 0 },
        {
          value: 99,
          suffix: "%",
          label: "Satisfaccion del Cliente",
          mobileLabel: "Satisf. del Cliente",
          delay: 0.1,
        },
        { value: 15, suffix: "+", label: "Anos de Experiencia", delay: 0.2 },
        { value: 125, suffix: "+", label: "Clientes Satisfechos", delay: 0.3 },
      ],
    },
    growthSection: {
      eyebrow: "Presencia digital",
      title: "Tu marca merece crecer mas",
      copy:
        "Mientras avanzas, aparecen los frenos que hoy estan limitando la visibilidad y el crecimiento de tu negocio.",
      items: [
        "Tu negocio no esta apareciendo en Google u otras redes sociales.",
        "Tu pagina web no esta generando clientes.",
        "Tu negocio no esta creciendo como deberia.",
        "Tu negocio necesita una presencia digital profesional.",
      ],
    },
    servicesSection: {
      eyebrow: "Soluciones digitales",
      title: "Impulsamos tu",
      copy:
        "Combinamos estrategia, diseno, tecnologia y marketing para que tu marca se vea profesional, atraiga mejores oportunidades y convierta mas visitas en clientes reales.",
      cta: "Ver soluciones",
      cardCta: "Mas info",
      items: [
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
      ],
    },
    positioningSection: {
      eyebrow: "Posicionamiento",
      title:
        "El sitio debe hablarle a clientes que buscan una agencia seria, moderna y resolutiva.",
      copy:
        "La ventaja no esta solo en el estilo visual. Esta en conectar identidad, arquitectura de informacion, copy comercial, SEO tecnico y una experiencia que deje claro por que tu marca deberia elegirnos.",
    },
    scalabilitySection: {
      eyebrow: "Escalabilidad",
      title:
        "Preparada para motion, nuevos servicios y una evolucion visual por fases.",
      copy:
        "La primera fase debe concentrarse en narrativa, conversion, SEO y sistema visual. La siguiente puede sumar mas recursos interactivos sin sacrificar rendimiento ni claridad.",
      tiles: [
        {
          label: "Performance first",
          copy:
            "Efectos solo donde mejoran percepcion, diferenciacion y conversion.",
        },
        {
          label: "Component driven",
          copy:
            "Estructura lista para ampliar servicios sin rehacer la experiencia.",
        },
      ],
    },
    processSection: {
      eyebrow: "Proceso recomendado",
      title: "Construyamos una web competitiva con una ruta clara y sostenible.",
      items: [
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
      ],
    },
    seoSection: {
      eyebrow: "SEO comercial",
      title:
        "Una homepage moderna tambien debe responder a la busqueda correcta.",
      copy:
        "La estructura incorpora contenido orientado a terminos como agencia de marketing digital, diseno web y SEO, pero organizado con criterio semantico para sonar claro y profesional. Eso facilita crecer despues hacia paginas especificas por servicio.",
    },
    faqSection: {
      eyebrow: "Preguntas clave",
      title:
        "Las decisiones visuales y tecnicas deben alinearse con negocio y crecimiento.",
      items: [
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
      ],
    },
    ctaSection: {
      eyebrow: "Siguiente paso",
      title:
        "La base visual ya puede integrarse con tu logo y quedar lista para la version final.",
      copy:
        "Ya deje el sistema listo sobre fondo blanco, con la paleta oficial y una estructura mas alineada a SEO. Cuando me pases el logo lo incorporo en el header, favicon y bloques clave de marca.",
      primary: "Solicitar propuesta",
      secondary: "Ver sitio actual",
    },
    jsonLd: {
      description:
        "Agencia digital moderna especializada en diseno web, SEO y marketing digital.",
      serviceType: ["Diseno web", "SEO", "Marketing digital", "Branding"],
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      webDesign: "Web Design",
      branding: "Branding",
      businessCards: "Business Cards",
      solutions: "Solutions",
      about: "About Us",
      contact: "Contact",
      cta: "CONTACT",
      languageLabel: "Language",
    },
    hero: {
      badge: "Your Partner in Digital Transformation",
      lead: "Elevate Your",
      rotatingAria:
        "Elevate your business, project, idea, brand, company, product, service, startup, small business, or firm into the digital era.",
      rotatingWords: [
        "Business",
        "Project",
        "Idea",
        "Brand",
        "Company",
        "Product",
        "Service",
        "Startup",
        "Small Business",
        "Firm",
      ],
      accent: "Go Digital Era",
      copy:
        "We create stunning websites, powerful digital marketing campaigns, and custom software solutions that help entrepreneurs and small businesses thrive online.",
      primaryCta: "Start Your Project",
      secondaryCta: "Explore Services",
      stats: [
        { value: 150, suffix: "+", label: "Completed Projects", delay: 0 },
        {
          value: 99,
          suffix: "%",
          label: "Client Satisfaction",
          mobileLabel: "Client Sat.",
          delay: 0.1,
        },
        { value: 15, suffix: "+", label: "Years Experience", delay: 0.2 },
        { value: 125, suffix: "+", label: "Happy Clients", delay: 0.3 },
      ],
    },
    growthSection: {
      eyebrow: "Digital presence",
      title: "Your brand deserves to grow more",
      copy:
        "As you scroll, the main blockers limiting your visibility and business growth come into focus.",
      items: [
        "Your business is not showing up on Google or other social platforms.",
        "Your website is not generating clients.",
        "Your business is not growing as it should.",
        "Your business needs a professional digital presence.",
      ],
    },
    servicesSection: {
      eyebrow: "Digital solutions",
      title: "We grow your",
      copy:
        "We combine strategy, design, technology, and marketing so your brand looks professional, attracts better opportunities, and turns more visits into real clients.",
      cta: "View solutions",
      cardCta: "More info",
      items: [
        {
          title: "Premium web design",
          description:
            "Clear, fast websites aligned with a commercial narrative that elevates your brand perception.",
        },
        {
          title: "Strategic SEO",
          description:
            "Architecture, content, and technical optimization built to attract qualified traffic on a sustainable foundation.",
        },
        {
          title: "Digital marketing",
          description:
            "Campaigns, funnels, and messaging aligned to turn visits into real opportunities.",
        },
        {
          title: "Branding and visual direction",
          description:
            "Consistent visual systems so every brand touchpoint feels professional and memorable.",
        },
      ],
    },
    positioningSection: {
      eyebrow: "Positioning",
      title:
        "The site should speak to clients looking for a serious, modern, and reliable agency.",
      copy:
        "The advantage is not only visual style. It comes from connecting identity, information architecture, commercial copy, technical SEO, and an experience that clearly explains why your brand should choose us.",
    },
    scalabilitySection: {
      eyebrow: "Scalability",
      title:
        "Ready for motion, new services, and a phased visual evolution.",
      copy:
        "The first phase should focus on narrative, conversion, SEO, and visual system. The next one can add richer interactive resources without sacrificing performance or clarity.",
      tiles: [
        {
          label: "Performance first",
          copy:
            "Effects only where they improve perception, differentiation, and conversion.",
        },
        {
          label: "Component driven",
          copy:
            "A structure ready to expand services without rebuilding the experience.",
        },
      ],
    },
    processSection: {
      eyebrow: "Recommended process",
      title: "Let us build a competitive website with a clear, sustainable roadmap.",
      items: [
        {
          step: "01",
          title: "Discovery and positioning",
          detail:
            "We define your value proposition, priority services, target audience, and visual direction.",
        },
        {
          step: "02",
          title: "Architecture and content",
          detail:
            "We organize navigation, H1-H2 hierarchy, keywords, CTAs, and commercial content by page.",
        },
        {
          step: "03",
          title: "UI and development",
          detail:
            "We build a modern, lightweight experience that is ready to grow.",
        },
        {
          step: "04",
          title: "SEO and optimization",
          detail:
            "We launch with measurement, sound technical practices, and a clear roadmap for ongoing improvement.",
        },
      ],
    },
    seoSection: {
      eyebrow: "Commercial SEO",
      title: "A modern homepage also needs to answer the right search intent.",
      copy:
        "The structure includes content aligned with terms such as digital marketing agency, web design, and SEO, but organized with semantic discipline so it sounds clear and professional. That makes it easier to grow later into service-specific pages.",
    },
    faqSection: {
      eyebrow: "Key questions",
      title:
        "Visual and technical decisions should align with business goals and growth.",
      items: [
        {
          question: "What does a website need to compete today?",
          answer:
            "A clear value proposition, fast loading, correct SEO structure, focused content, and a consistent visual identity.",
        },
        {
          question: "Can the website grow in phases?",
          answer:
            "Yes. The right foundation lets you launch a strong homepage first and then expand with service, industry, or location pages.",
        },
        {
          question: "How does design connect with results?",
          answer:
            "When design aligns with the offer, messaging, CTAs, and site architecture, trust and conversion improve.",
        },
      ],
    },
    ctaSection: {
      eyebrow: "Next step",
      title:
        "The visual foundation is already ready to integrate your logo and move into the final version.",
      copy:
        "The system is already set on a white background, using the official palette and a structure more aligned with SEO. Once you share the logo, I can integrate it into the header, favicon, and key brand blocks.",
      primary: "Request a proposal",
      secondary: "View current site",
    },
    jsonLd: {
      description:
        "Modern digital agency specialized in web design, SEO, and digital marketing.",
      serviceType: ["Web design", "SEO", "Digital marketing", "Branding"],
    },
  },
} as const;

export type TranslationDictionary = typeof translations;
export type TranslationContent = TranslationDictionary[Locale];
