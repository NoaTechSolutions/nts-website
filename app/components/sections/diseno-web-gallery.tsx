"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "NUESTRO TRABAJO" · portfolio web. Dos experiencias según pantalla
// (gsap.matchMedia maneja el cambio de breakpoint y limpia solo):
//  • TABLET + DESKTOP (≥768): galería BENTO que se expande a pantalla completa al
//    scrollear (GSAP Flip + expoScale). Usa las 8 capturas reales.
//  • TELÉFONO (<768): carrusel HORIZONTAL atado al scroll — las webs en línea
//    avanzan hacia la izquierda a medida que se scrollea (pin + scrub).
// ═══════════════════════════════════════════════════════════
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ExpoScaleEase } from "gsap/EasePack";
import { useLanguage } from "../language-provider";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { SparklesText } from "../ui/sparkles-text";

const COPY = {
  es: {
    eyebrow: "Nuestro trabajo",
    title: "Webs que enamoran y venden",
  },
  en: {
    eyebrow: "Our work",
    title: "Websites that captivate and sell",
  },
} as const;

// Dominio legible (sin protocolo ni barra final) para mostrar bajo cada card.
function formatDomain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function DisenoWebGallery() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  const bentoRef = useRef<HTMLDivElement>(null);
  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const carouselRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced-motion: sin animaciones. El carrusel del teléfono queda swipeable
    // a mano (overflow-x auto); el bento queda estático.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const viewport = carouselSectionRef.current?.firstElementChild as HTMLElement | null;
      if (viewport) viewport.style.overflowX = "auto";
      return;
    }

    gsap.registerPlugin(ScrollTrigger, Flip, ExpoScaleEase);
    const mm = gsap.matchMedia();

    // ── TABLET + DESKTOP (≥768): bento → fullscreen (Flip) ──
    mm.add("(min-width: 768px)", () => {
      const gallery = bentoRef.current;
      if (!gallery) return;
      let flipCtx: gsap.Context | undefined;

      const createTween = () => {
        const items = gallery.querySelectorAll(".dw-gallery__item");
        flipCtx && flipCtx.revert();
        gallery.classList.remove("dw-gallery--final");

        flipCtx = gsap.context(() => {
          // Captura el estado FINAL (fullscreen) para animar hacia él.
          gallery.classList.add("dw-gallery--final");
          const flipState = Flip.getState(items);
          gallery.classList.remove("dw-gallery--final");

          const flip = Flip.to(flipState, { simple: true, ease: "expoScale(1,5)" });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gallery,
              start: "center center",
              end: "+=100%",
              scrub: true,
              pin: gallery.parentNode as HTMLElement,
            },
          });
          tl.add(flip);

          return () => gsap.set(items, { clearProps: "all" });
        });
      };

      createTween();
      window.addEventListener("resize", createTween);
      return () => {
        window.removeEventListener("resize", createTween);
        flipCtx && flipCtx.revert();
      };
    });

    // ── TELÉFONO (<768): carrusel horizontal atado al scroll ──
    mm.add("(max-width: 767px)", () => {
      const section = carouselSectionRef.current;
      const row = carouselRowRef.current;
      if (!section || !row) return;

      const tween = gsap.to(row, {
        x: () => -(row.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (row.scrollWidth - window.innerWidth),
          scrub: true,
          pin: true,
          invalidateOnRefresh: true, // recalcula anchos al rotar/redimensionar
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-3xl px-6 pb-4 pt-14 text-center md:pb-10 md:pt-28">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="section-title mt-3" style={{ maxWidth: "none" }}>
          <SparklesText text={t.title} />
        </h2>
      </div>

      {/* ── TABLET + DESKTOP (≥768): bento → fullscreen (GSAP Flip) ── */}
      <div className="hidden md:block">
        <div className="dw-gallery-wrap">
          <div ref={bentoRef} className="dw-gallery dw-gallery--bento">
            {portfolioProjects.map((p) => (
              <div key={p.title} className="dw-gallery__item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.thumbnail} alt={p.title} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TELÉFONO (<768): carrusel horizontal que avanza con el scroll.
          Contenedor COMPACTO (alto = imagen + pie), no 100svh → menos espacio
          arriba (título) y abajo. Cada card es link al sitio, con URL + "Online". ── */}
      <div ref={carouselSectionRef} className="overflow-hidden py-4 md:hidden">
        <div ref={carouselRowRef} className="flex items-start gap-4 px-4">
          {portfolioProjects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="w-[88vw] shrink-0"
            >
              <div className="aspect-video overflow-hidden rounded-2xl border border-[#022977]/10 shadow-[0_16px_40px_rgba(2,41,119,0.18)] dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Pie: dominio + señal "Online" (punto verde con pulso) */}
              <div className="mt-2.5 flex items-center justify-between gap-2 px-1">
                <span className="truncate text-sm font-medium text-[#5f7398] dark:text-[#8fa6c8]">
                  {formatDomain(p.link)}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Online
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
