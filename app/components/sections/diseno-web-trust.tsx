"use client";

// SECCIÓN 2 · Barra de confianza (social proof temprano). Carrusel (marquee) de
// logos reales de clientes en TARJETAS 3D (profundidad + inclinación al hover +
// el logo "sale" con translateZ), acorde a los efectos premium de la web.
import { useLanguage } from "../language-provider";

const COPY = {
  es: { label: "Marcas y negocios que ya confían en nosotros" },
  en: { label: "Brands and businesses that already trust us" },
} as const;

// Logos procesados a webp (nombre SEO). alt descriptivo por marca.
const LOGOS = [
  { src: "/ada-luz-home-daycare-logo.webp", alt: "Logo de Ada Luz Home Daycare, cliente de NoaTechSolutions" },
  { src: "/laura-bravo-music-logo.webp", alt: "Logo de Laura Bravo Music, cliente de NoaTechSolutions" },
  { src: "/alfredo-reyes-music-logo.webp", alt: "Logo de Alfredo Reyes Music, cliente de NoaTechSolutions" },
  { src: "/mi-casita-musical-logo.webp", alt: "Logo de Mi Casita Musical, cliente de NoaTechSolutions" },
  { src: "/gyg-auto-servicio-logo.webp", alt: "Logo de G&G Auto Servicio, cliente de NoaTechSolutions" },
  { src: "/ednas-home-4-childcare-logo.webp", alt: "Logo de Edna's Home 4 Childcare, cliente de NoaTechSolutions" },
  { src: "/marisol-bisso-logo.webp", alt: "Logo de Marisol Bisso, cliente de NoaTechSolutions" },
  { src: "/alonso-zapata-logo.webp", alt: "Logo de Alonso Zapata, cliente de NoaTechSolutions" },
  { src: "/carla-tortas-y-detalles-logo.webp", alt: "Logo de Carla Tortas y Detalles, cliente de NoaTechSolutions" },
  { src: "/j1-window-cleaning-logo.webp", alt: "Logo de J1 Window Cleaning, cliente de NoaTechSolutions" },
  { src: "/tacos-la-poblanita-logo.webp", alt: "Logo de Tacos La Poblanita, cliente de NoaTechSolutions" },
  { src: "/hector-zapana-logo.webp", alt: "Logo de Hector Zapana, cliente de NoaTechSolutions" },
  { src: "/normita-cholita-logo.webp", alt: "Logo de Normita Cholita Peruvian Cuisine, cliente de NoaTechSolutions" },
  { src: "/world-pavers-company-logo.webp", alt: "Logo de World Pavers Company, cliente de NoaTechSolutions" },
];

export function DisenoWebTrust() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  const row = [...LOGOS, ...LOGOS]; // doble set → loop sin cortes

  return (
    <section className="relative w-full overflow-hidden px-6 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#022977]/50 dark:text-[#c8d8f0]/50">
          {t.label}
        </p>

        {/* Carrusel: máscara para fundir los bordes + pausa al hover (globals) */}
        <div
          className="dw-logos-mask relative mt-8"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          }}
        >
          <div className="dw-logos-track flex w-max gap-2.5 py-4">
            {row.map((logo, i) => (
              <div key={i} className="group/logo shrink-0 [perspective:800px]">
                {/* Tarjeta 3D: gradiente + brillo superior + sombra en capas; al
                    hover se inclina (rotateX) y sube. */}
                <div className="flex h-20 w-40 items-center justify-center rounded-2xl border-2 border-white/70 bg-white/50 px-5 py-3 backdrop-blur-md transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover/logo:[transform:rotateX(9deg)_translateY(-5px)_scale(1.05)] dark:border-white/15 dark:bg-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out group-hover/logo:[transform:translateZ(26px)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
