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
    reviewsSection: {
      eyebrow: "Reviews",
      title: "Lo que opinan de nosotros",
      copy:
        "Cuando la estrategia, el diseno y el acompanamiento se sienten claros, el cambio se nota en la confianza con la que una marca empieza a mostrarse.",
      highlights: [
        "Claridad en el proceso",
        "Trato cercano",
        "Diseno con estrategia",
      ],
      items: [
        {
          quote:
            "I just wanted to take a moment to share how much I love NoaTechSolutions! I had a fantastic experience with Noa, who really went out of their way to help me. If you haven't checked them out yet, do yourself a favor and stop by. You won't regret it!",
          author: "Catalina Ocampo",
          title: "Vendedora de artesanias",
          tag: "5/5 ESTRELLAS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjWO5-yCfecbZwr_NHSf3gTP9YN4OX2jCFC6X4i-MTgZO75Syzyw=w72-h72-p-rp-mo-br100",
        },
        {
          quote:
            "Quiero agradecer y recomendar a Israel Esparza (NoaTechSolution), quien hizo un trabajo excelente en el diseno y...",
          author: "Edna Garces",
          title: "Duena de Home Daycare",
          website: "ednashome4childcare.com",
          tag: "5/5 ESTRELLAS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjXjK-axSCzkX-xgf8wP-Nf2pnc2KczcmKykAnHrknBmfUxG2C8=w72-h72-p-rp-mo-br100",
        },
        {
          quote:
            "Quiero agradecer y recomendar a Israel Esparza (NoaTechSolution) quien hizo un trabajo excelente en el diseno y desarrollo de mi pagina web para mi negocio. Su profesionalismo, creatividad y compromiso hicieron que el proceso fuera muy facil y el resultado supero mis expectativas. Excelente trabajo. Gracias.",
          author: "Luisa Serrano",
          title: "Home Daycare",
          website: "ednashome4childcare.com",
          tag: "5/5 ESTRELLAS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjULkxPvxmmkKC8eeCpgMvgMt764T0JO6z3ym4n6DA9s0gdkQY_4=w72-h72-p-rp-mo-br100",
        },
        {
          quote:
            "Muy buen trabajo, me ayudo mucho con mi perfil de artista ya sea digital como con tarjetas impresas. Simplemente espectaculares.",
          author: "MOISES REYES",
          title: "Cantante",
          website: "alfredormusic.com",
          tag: "5/5 ESTRELLAS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjX0DC9cVeuz7Cg-rd5btleu1tJbu1rd2vXNQwSb8GH9TDJ0LfM=w72-h72-p-rp-mo-ba4-br100",
        },
        {
          quote:
            "Noa Techsolutions is such a game changer! My website went from looking dull and truly unappealing to being a dynamic, sophisticated marketing tool that truly projects the nature of my business.",
          author: "Laura B",
          title: "Singer and Vocal Coach",
          website: "laurabravomusic.com",
          tag: "5/5 ESTRELLAS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjW_7DZwg_neNr7uTBDiURs1UdBW2SMKjUGeMAM4wgiM-fzL1q6whg=w72-h72-p-rp-mo-br100",
        },
      ],
    },
    portfolioSection: {
      title: "Trabajos Que Hablan Por Si Solos",
      copy:
        "Descubre una seleccion de proyectos creados para inspirar, transmitir confianza y demostrar hasta donde puede llegar una marca cuando su presencia digital se ve fuerte, cuidada y memorable.",
      accent: "El siguiente puede ser el tuyo.",
      ctaLabel: "Ver mas proyectos",
    },
    seoSection: {
      eyebrow: "SEO comercial",
      title:
        "Una homepage moderna tambien debe responder a la busqueda correcta.",
      copy:
        "La estructura incorpora contenido orientado a terminos como agencia de marketing digital, diseno web y SEO, pero organizado con criterio semantico para sonar claro y profesional. Eso facilita crecer despues hacia paginas especificas por servicio.",
    },
    faqSection: {
      eyebrow: "Preguntas frecuentes",
      title:
        "Lo Que Mas Nos Preguntan",
      copy:
        "Aqui resolvemos las dudas mas comunes de las marcas que buscan un sitio web mas profesional, una estructura clara para vender mejor y una base SEO solida para crecer con estrategia.",
      highlights: ["Precio claro", "SEO desde la base", "Acompanamiento real"],
      items: [
        {
          question: "Cuanto cuesta realmente empezar un sitio profesional?",
          answer:
            "Depende del alcance, pero hoy puedes empezar desde $299 con una base profesional pensada para presentar mejor tu marca, generar confianza y dejar el sitio listo para crecer por etapas.",
        },
        {
          question: "Que incluye el proyecto desde $299?",
          answer:
            "Incluye una estructura clara, diseno responsive, CTA comercial, seccion de contacto y una base visual mucho mas solida que la tipica web armada sin estrategia.",
        },
        {
          question: "Cuanto tarda en estar lista la web?",
          answer:
            "En proyectos base solemos movernos rapido. Si la informacion esta relativamente ordenada, una primera version fuerte puede salir en pocos dias o un par de semanas segun el alcance.",
        },
        {
          question: "Necesito tener logo, textos y fotos antes de empezar?",
          answer:
            "No necesariamente. Podemos comenzar con lo que ya tienes, ayudarte a ordenar el mensaje y definir que piezas faltan para que el sitio no se detenga por no tener todo perfecto desde el primer dia.",
        },
        {
          question: "La web me puede ayudar a aparecer en Google y conseguir clientes?",
          answer:
            "Si, siempre que se construya bien. Dejamos una base preparada para SEO, mensajes claros y conversion. Despues podemos reforzar con contenido, paginas por servicio y estrategia de visibilidad.",
        },
        {
          question: "Se puede pagar por etapas y seguir creciendo despues?",
          answer:
            "Si. Justamente la idea es que no tengas que hacer todo de golpe. Podemos lanzar una version inicial fuerte y despues sumar branding, SEO, nuevas secciones, automatizaciones o paginas extra.",
        },
      ],
    },
    ctaSection: {
      eyebrow: "Hazlo realidad",
      title:
        "Inicia Tu Proyecto Desde $299",
      copy:
        "Si ya sabes que tu marca necesita verse mas profesional, este es un buen momento para empezar. Podemos lanzar una base clara, atractiva y pensada para vender, y si lo necesitas revisamos contigo opciones de pago para que avanzar sea mas facil.",
      primary: "Iniciar ahora",
      directMail: "O escríbenos directo",
      priceTag: "Desde $299",
      highlights: [
        "Asesoria inicial gratis",
        "Opciones de pago a plazos",
      ],
    },
    contactSection: {
      eyebrow: "Hablemos",
      title: "Cuéntanos tu proyecto",
      copy: "Responderemos en menos de 24 horas.",
    },
    contactForm: {
      nombre: "Nombre",
      nombrePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      mensaje: "Mensaje",
      mensajePlaceholder: "Contanos sobre tu proyecto...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      successTitle: "¡Mensaje enviado!",
      successBody: "Revisá tu email para la confirmación.",
      errorGeneric: "Algo salió mal. Intentá de nuevo.",
      rateLimit: "Demasiados mensajes. Intentá en 24 horas.",
    },
    footerSection: {
      eyebrow: "Soluciones tecnologicas",
      watermark: "NoaTechSolutions",
      copyright: "\u00A9 2026 NoaTechSolutions. Todos los derechos reservados.",
      columns: [
        {
          title: "Mapa",
          links: [
            { label: "Inicio", href: "#home" },
            { label: "Servicios", href: "#servicios" },
            { label: "Proceso", href: "#proceso" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Soluciones",
          links: [
            { label: "Diseno web premium", href: "#servicios" },
            { label: "SEO estrategico", href: "#servicios" },
            { label: "Marketing digital", href: "#servicios" },
            { label: "Branding visual", href: "#servicios" },
          ],
        },
        {
          title: "Recursos",
          links: [
            { label: "Portfolio", href: "/portfolio" },
            { label: "Reviews", href: "#reviews" },
            { label: "Contacto", href: "#contacto" },
            { label: "Base desde $299", href: "#contacto" },
          ],
        },
        {
          title: "Contacto",
          links: [
            { label: "Iniciar proyecto", href: "#contacto" },
            { label: "Asesoria inicial gratis", href: "#contacto" },
            {
              label: "hello@noatechsolutions.com",
              href:
                "mailto:hello@noatechsolutions.com?subject=Quiero%20iniciar%20mi%20proyecto%20web",
              external: true,
            },
            { label: "Baja California + California" },
          ],
        },
      ],
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
    reviewsSection: {
      eyebrow: "Reviews",
      title: "What people say about us",
      copy:
        "When strategy, design, and support feel clear from the start, brands naturally begin to show up with more confidence.",
      highlights: [
        "Clear process",
        "Close support",
        "Design with strategy",
      ],
      items: [
        {
          quote:
            "I just wanted to take a moment to share how much I love NoaTechSolutions! I had a fantastic experience with Noa, who really went out of their way to help me. If you haven't checked them out yet, do yourself a favor and stop by. You won't regret it!",
          author: "Catalina Ocampo",
          title: "Handmade crafts seller",
          tag: "5/5 STARS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjWO5-yCfecbZwr_NHSf3gTP9YN4OX2jCFC6X4i-MTgZO75Syzyw=w72-h72-p-rp-mo-br100",
        },
        {
          quote:
            "I want to thank and recommend Israel Esparza (NoaTechSolution), who did an excellent job with the design and...",
          author: "Edna Garces",
          title: "Home Daycare owner",
          website: "ednashome4childcare.com",
          tag: "5/5 STARS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjXjK-axSCzkX-xgf8wP-Nf2pnc2KczcmKykAnHrknBmfUxG2C8=w72-h72-p-rp-mo-br100",
        },
        {
          quote:
            "I want to thank and recommend Israel Esparza (NoaTechSolution), who did an excellent job designing and developing my business website. His professionalism, creativity, and commitment made the whole process very easy, and the result exceeded my expectations. Excellent work. Thank you.",
          author: "Luisa Serrano",
          title: "Home Daycare",
          website: "ednashome4childcare.com",
          tag: "5/5 STARS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjULkxPvxmmkKC8eeCpgMvgMt764T0JO6z3ym4n6DA9s0gdkQY_4=w72-h72-p-rp-mo-br100",
        },
        {
          quote:
            "Very good work. It helped me a lot with my artist profile, both digitally and with printed cards. Simply spectacular.",
          author: "MOISES REYES",
          title: "Singer",
          website: "alfredormusic.com",
          tag: "5/5 STARS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjX0DC9cVeuz7Cg-rd5btleu1tJbu1rd2vXNQwSb8GH9TDJ0LfM=w72-h72-p-rp-mo-ba4-br100",
        },
        {
          quote:
            "Noa Techsolutions is such a game changer! My website went from looking dull and truly unappealing to being a dynamic, sophisticated marketing tool that truly projects the nature of my business.",
          author: "Laura B",
          title: "Singer and Vocal Coach",
          website: "laurabravomusic.com",
          tag: "5/5 STARS",
          source: "google",
          avatarUrl:
            "https://lh3.googleusercontent.com/a-/ALV-UjW_7DZwg_neNr7uTBDiURs1UdBW2SMKjUGeMAM4wgiM-fzL1q6whg=w72-h72-p-rp-mo-br100",
        },
      ],
    },
    portfolioSection: {
      title: "Work That Speaks For Itself",
      copy:
        "Discover a curated selection of projects designed to inspire, build trust, and show how far a brand can go when its digital presence feels strong, polished, and memorable.",
      accent: "The next one could be yours.",
      ctaLabel: "See more projects",
    },
    seoSection: {
      eyebrow: "Commercial SEO",
      title: "A modern homepage also needs to answer the right search intent.",
      copy:
        "The structure includes content aligned with terms such as digital marketing agency, web design, and SEO, but organized with semantic discipline so it sounds clear and professional. That makes it easier to grow later into service-specific pages.",
    },
    faqSection: {
      eyebrow: "Frequently asked questions",
      title:
        "What Clients Ask Us Most",
      copy:
        "Here we answer the most common questions from brands looking for a more professional website, a clearer structure to sell better, and an SEO-ready foundation built to grow strategically.",
      highlights: ["Clear pricing", "SEO-ready foundation", "Real guidance"],
      items: [
        {
          question: "How much does it really cost to start a professional website?",
          answer:
            "It depends on scope, but you can start from $299 with a professional foundation built to present your brand better, build trust, and grow in phases.",
        },
        {
          question: "What is included in the project starting at $299?",
          answer:
            "It includes a clear structure, responsive design, a strong call to action, contact section, and a much more strategic visual foundation than a generic website put together without direction.",
        },
        {
          question: "How long does it take to launch the website?",
          answer:
            "Base projects can move fast. If the information is reasonably organized, a strong first version can be ready in days or within a couple of weeks depending on scope.",
        },
        {
          question: "Do I need to have my logo, copy, and photos ready first?",
          answer:
            "Not necessarily. We can start with what you already have, help you organize the message, and define what is still missing so the project does not get stuck waiting for perfection.",
        },
        {
          question: "Can the website help me rank on Google and bring clients?",
          answer:
            "Yes, if it is built correctly. We set up an SEO-ready, conversion-focused foundation with clear messaging, then we can strengthen it with content, service pages, and visibility strategy.",
        },
        {
          question: "Can I pay in phases and keep growing later?",
          answer:
            "Yes. The goal is to avoid doing everything at once. We can launch a strong first version and then expand with branding, SEO, more sections, automations, or extra pages.",
        },
      ],
    },
    ctaSection: {
      eyebrow: "Make it happen",
      title:
        "Start Your Project From $299",
      copy:
        "If you already know your brand needs to look more professional, this is a great time to start. We can launch a clear, attractive, conversion-ready foundation, and if needed we can walk you through flexible payment options so moving forward feels easier.",
      primary: "Start now",
      directMail: "Or write us directly",
      priceTag: "From $299",
      highlights: [
        "Free initial strategy call",
        "Installment payment options",
      ],
    },
    contactSection: {
      eyebrow: "Let's talk",
      title: "Tell us about your project",
      copy: "We'll respond within 24 hours.",
    },
    contactForm: {
      nombre: "Name",
      nombrePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      mensaje: "Message",
      mensajePlaceholder: "Tell us about your project...",
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successBody: "Check your email for confirmation.",
      errorGeneric: "Something went wrong. Try again.",
      rateLimit: "Too many messages. Try again in 24 hours.",
    },
    footerSection: {
      eyebrow: "Technology solutions",
      watermark: "NoaTechSolutions",
      copyright: "\u00A9 2026 NoaTechSolutions. All rights reserved.",
      columns: [
        {
          title: "Map",
          links: [
            { label: "Home", href: "#home" },
            { label: "Services", href: "#servicios" },
            { label: "Process", href: "#proceso" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Solutions",
          links: [
            { label: "Premium web design", href: "#servicios" },
            { label: "Strategic SEO", href: "#servicios" },
            { label: "Digital marketing", href: "#servicios" },
            { label: "Branding", href: "#servicios" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Portfolio", href: "/portfolio" },
            { label: "Reviews", href: "#reviews" },
            { label: "Contact", href: "#contacto" },
            { label: "Start from $299", href: "#contacto" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Start your project", href: "#contacto" },
            { label: "Free strategy call", href: "#contacto" },
            {
              label: "hello@noatechsolutions.com",
              href:
                "mailto:hello@noatechsolutions.com?subject=I%20want%20to%20start%20my%20web%20project",
              external: true,
            },
            { label: "Baja California + California" },
          ],
        },
      ],
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
