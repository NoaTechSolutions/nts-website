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
    midCtaSection: {
      title: "Agenda una asesoria gratis para tu marca",
      copy:
        "Resuelve bloqueos tecnologicos y atrae mas clientes con una estrategia digital clara.",
      primary: "Agendar una cita",
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
      eyebrow: "Asi impulsamos tu crecimiento",
      title: "Construyamos tu marca con una ruta clara.",
      items: [
        {
          step: "01",
          title: "Te damos ideas claras para hacer crecer tu marca",
          detail:
            "Analizamos tu negocio, detectamos oportunidades y te asesoramos con ideas practicas para que tu marca conecte mejor, venda mas y se vea mas fuerte en internet.",
          cardDetail:
            "Te ayudamos a descubrir que hace especial a tu marca para que la gente la entienda rapido, la recuerde y quiera dar el siguiente paso contigo.",
        },
        {
          step: "02",
          title: "Mejoramos tu presencia en Google y en redes",
          detail:
            "Organizamos tu web y optimizamos tus redes con SEO claro, contenido util y mensajes que ayudan a que mas personas te encuentren y confien en ti.",
          cardDetail:
            "Hacemos que tu negocio se vea mejor en Google y redes con mensajes claros, contenido util y una presencia que inspire confianza desde el primer clic.",
        },
        {
          step: "03",
          title: "Integramos herramientas que te ahorran tiempo",
          detail:
            "Sumamos soluciones tecnologicas y recursos digitales que te ayudan a atender mejor, ordenar procesos y dar una imagen mas profesional a tu negocio.",
          cardDetail:
            "Incorporamos herramientas digitales que ordenan tu dia a dia, agilizan tu trabajo y hacen que atender clientes se sienta mas facil y mas profesional.",
        },
        {
          step: "04",
          title: "Te acompanamos para seguir creciendo",
          detail:
            "Te damos asesoria continua, revisamos que esta funcionando y ajustamos web, SEO y redes para atraer mas clientes y mejorar tus resultados con el tiempo.",
          cardDetail:
            "No te dejamos solo despues del lanzamiento: medimos, ajustamos y seguimos afinando tu web, SEO y redes para que tu marca siga creciendo con claridad.",
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
    midCtaSection: {
      title: "Book a free strategy call for your brand",
      copy:
        "Solve technology roadblocks and attract more clients with a clear digital strategy.",
      primary: "Book a call",
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
      eyebrow: "How we help you grow",
      title: "Let us build your brand with a clear roadmap.",
      items: [
        {
          step: "01",
          title: "We give you clear ideas to grow your brand",
          detail:
            "We analyze your business, uncover opportunities, and guide you with practical ideas so your brand connects better, sells more, and looks stronger online.",
          cardDetail:
            "We help you uncover what makes your brand special so people understand it quickly, remember it, and feel ready to take the next step with you.",
        },
        {
          step: "02",
          title: "We improve your presence on Google and social media",
          detail:
            "We organize your website and optimize your social channels with clear SEO, useful content, and messaging that helps more people find and trust you.",
          cardDetail:
            "We make your business look stronger on Google and social media with clear messaging, useful content, and a presence that builds trust from the first click.",
        },
        {
          step: "03",
          title: "We integrate tools that save you time",
          detail:
            "We add technology solutions and digital tools that help you respond better, organize processes, and give your business a more professional image.",
          cardDetail:
            "We bring in digital tools that streamline your day, make your workflow lighter, and help every client interaction feel smoother and more professional.",
        },
        {
          step: "04",
          title: "We stay with you so you keep growing",
          detail:
            "We provide ongoing guidance, review what is working, and refine your website, SEO, and social media so you can attract more clients over time.",
          cardDetail:
            "We stay with you after launch to measure, refine, and keep improving your website, SEO, and social media so your brand keeps growing with clarity.",
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
