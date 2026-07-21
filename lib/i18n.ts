export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const localeStorageKey = "nts-locale";

function isLocale(value: string | null | undefined): value is Locale {
  return value === "es" || value === "en";
}

/**
 * Resuelve el locale en el SERVER (request-time) para poder SSR el idioma
 * correcto y evitar el flip de idioma en el cliente (que penalizaba el LCP del
 * usuario EN en ~5.4s). Prioridad:
 *   1. Cookie `nts-locale` → preferencia explícita del usuario (gana siempre).
 *   2. `Accept-Language` → idioma de mayor prioridad del browser.
 *   3. defaultLocale (`es`) → mercado principal.
 * Función pura (sin dependencias de Next) para poder testearla aislada.
 */
export function resolveLocale(
  cookieValue: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  if (isLocale(cookieValue)) {
    return cookieValue;
  }

  const firstLang = (acceptLanguage ?? "")
    .toLowerCase()
    .split(",")[0]
    ?.trim();

  return firstLang?.startsWith("en") ? "en" : defaultLocale;
}

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
        "Convertimos tu presencia digital en más clientes con diseño web, software a medida y marketing que da resultados.",
      primaryCta: "Iniciar Tu Proyecto",
      secondaryCta: "Explorar Servicios",
      stats: [
        { value: 150, suffix: "+", label: "Proyectos Completados", delay: 0 },
        {
          value: 99,
          suffix: "%",
          label: "Satisfacción del Cliente",
          mobileLabel: "Satisf. del Cliente",
          delay: 0.1,
        },
        { value: 15, suffix: "+", label: "Años de Experiencia", delay: 0.2 },
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
        "Desde tu página web y software a medida hasta tu marca, marketing y soporte: reunimos todo lo que tu negocio necesita para crecer online en un solo equipo.",
      cta: "Ver soluciones",
      cardCta: "Más info",
      items: [
        {
          title: "Web y software a medida",
          description:
            "Tu sitio web profesional y el software que tu negocio necesita: rápidos, escalables y hechos a la medida de tu operación.",
        },
        {
          title: "Diseño y marca",
          description:
            "Branding, diseño gráfico y material corporativo para que tu marca se vea profesional, coherente y memorable.",
        },
        {
          title: "Marketing digital",
          description:
            "Campañas, redes sociales y embudos coordinados para atraer tráfico calificado y convertir visitas en clientes reales.",
        },
        {
          title: "Soporte y asesoría",
          description:
            "Hosting, mantenimiento y asesoría tecnológica para que tu operación siga funcionando sin dolores de cabeza.",
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
          title: "Escuchamos y entendemos tu negocio",
          detail:
            "Nos sentamos contigo para conocer tu marca, tus objetivos y tus clientes. Sin un buen diagnóstico no hay una buena solución.",
          cardDetail:
            "Analizamos tu marca, tu mercado y tu competencia para entender qué te hace diferente y por dónde conviene empezar.",
        },
        {
          step: "02",
          title: "Diseñamos el plan a tu medida",
          detail:
            "Definimos la ruta: qué construir, con qué prioridad y para qué. En cada paso sabes qué sigue y por qué lo hacemos.",
          cardDetail:
            "Convertimos ese diagnóstico en un plan concreto: objetivos, entregables y prioridades claras, sin humo ni promesas vacías.",
        },
        {
          step: "03",
          title: "Construimos tu proyecto",
          detail:
            "Diseñamos y desarrollamos con estándar profesional y te mostramos avances en el camino, sin cajas negras ni sorpresas.",
          cardDetail:
            "Damos vida al proyecto con diseño y desarrollo profesional, revisando contigo cada avance importante antes de seguir.",
        },
        {
          step: "04",
          title: "Lanzamos y te acompañamos",
          detail:
            "Publicamos, medimos resultados y ajustamos para que sigas creciendo. No desaparecemos después de entregar.",
          cardDetail:
            "Medimos, optimizamos y te acompañamos con soporte continuo para que tu negocio siga creciendo con el tiempo.",
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
      title: "Trabajos que hablan por sí solos",
      copy:
        "Detrás de cada proyecto hay una persona que confió en nosotros para llevar su negocio más lejos. Sitios web, tiendas online y marcas reales, diseñadas para verse profesionales y convertir visitas en clientes.",
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
      successBody: "Revisa tu email para la confirmación.",
      errorGeneric: "Algo salió mal. Intenta de nuevo.",
      rateLimit: "Demasiados mensajes. Intenta en 24 horas.",
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
            { label: "Contacto", href: "#contacto-form" },
            { label: "Base desde $299", href: "#contacto-form" },
          ],
        },
        {
          title: "Contacto",
          links: [
            { label: "Iniciar proyecto", href: "#contacto-form" },
            { label: "Asesoria inicial gratis", href: "#contacto-form" },
            {
              label: "contact@noatechsolutions.com",
              href:
                "mailto:contact@noatechsolutions.com?subject=Quiero%20iniciar%20mi%20proyecto%20web",
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
        "We turn your digital presence into more clients with web design, custom software, and marketing that delivers results.",
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
        { value: 15, suffix: "+", label: "Years of Experience", delay: 0.2 },
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
        "From your website and custom software to branding, marketing, and support: everything your business needs to grow online, brought together by one team.",
      cta: "View solutions",
      cardCta: "More info",
      items: [
        {
          title: "Web & custom software",
          description:
            "Your professional website and the software your business needs: fast, scalable, and built to fit your operation.",
        },
        {
          title: "Design & brand",
          description:
            "Branding, graphic design, and corporate materials so your brand looks professional, consistent, and memorable.",
        },
        {
          title: "Digital marketing",
          description:
            "Campaigns, social media, and coordinated funnels to attract qualified traffic and turn visits into real clients.",
        },
        {
          title: "Support & advisory",
          description:
            "Hosting, maintenance, and tech advisory so your operation keeps running without headaches.",
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
          title: "We listen and understand your business",
          detail:
            "We sit down with you to learn your brand, your goals, and your customers. There's no good solution without a good diagnosis.",
          cardDetail:
            "We analyze your brand, your market, and your competition to understand what sets you apart and where to begin.",
        },
        {
          step: "02",
          title: "We design a plan that fits you",
          detail:
            "We map out the roadmap: what to build, in what order, and why. At every step you know what's next and the reason behind it.",
          cardDetail:
            "We turn that diagnosis into a concrete plan: goals, deliverables, and clear priorities, with no fluff or empty promises.",
        },
        {
          step: "03",
          title: "We build your project",
          detail:
            "We design and develop to a professional standard and show you progress along the way, with no black boxes or surprises.",
          cardDetail:
            "We bring the project to life with professional design and development, reviewing each key milestone with you before moving on.",
        },
        {
          step: "04",
          title: "We launch and stay with you",
          detail:
            "We publish, measure results, and fine-tune so you keep growing. We don't disappear after delivery.",
          cardDetail:
            "We measure, optimize, and support you continuously so your business keeps growing over time.",
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
      title: "Work that speaks for itself",
      copy:
        "Behind every project there's a real person who trusted us to take their business further. Websites, online stores, and brands built to look professional and turn visitors into customers.",
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
            { label: "Contact", href: "#contacto-form" },
            { label: "Start from $299", href: "#contacto-form" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Start your project", href: "#contacto-form" },
            { label: "Free strategy call", href: "#contacto-form" },
            {
              label: "contact@noatechsolutions.com",
              href:
                "mailto:contact@noatechsolutions.com?subject=I%20want%20to%20start%20my%20web%20project",
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
