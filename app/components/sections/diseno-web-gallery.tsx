"use client";

// ═══════════════════════════════════════════════════════════
// SECCIÓN "PORTFOLIO WEB" · galería BENTO que se expande a pantalla completa al
// scrollear (efecto GSAP Flip + ScrollTrigger del CodePen de GreenSock).
// La sección se pinnea y los items pasan de un layout bento a fullscreen con un
// zoom (Flip + expoScale). Usa las 8 capturas reales de portfolioProjects.
// ═══════════════════════════════════════════════════════════
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ExpoScaleEase } from "gsap/EasePack";
import { useLanguage } from "../language-provider";
import { portfolioProjects } from "@/lib/portfolio-projects";

const COPY = {
  es: {
    eyebrow: "Nuestro trabajo",
    title: "Webs que diseñamos",
    copy: "Scrolleá y mirá de cerca los proyectos que construimos.",
  },
  en: {
    eyebrow: "Our work",
    title: "Websites we've designed",
    copy: "Scroll and take a closer look at the projects we've built.",
  },
} as const;

export function DisenoWebGallery() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    // Respeta prefers-reduced-motion: sin flip/pin, queda el bento estático.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, Flip, ExpoScaleEase);

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
  }, []);

  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-3xl px-6 pb-10 pt-20 text-center md:pt-28">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 className="section-title mt-3">{t.title}</h2>
        <p className="section-copy mx-auto mt-4 max-w-2xl">{t.copy}</p>
      </div>

      <div className="dw-gallery-wrap">
        <div ref={galleryRef} className="dw-gallery dw-gallery--bento">
          {portfolioProjects.map((p) => (
            <div key={p.title} className="dw-gallery__item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumbnail} alt={p.title} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
