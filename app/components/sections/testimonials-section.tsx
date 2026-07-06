"use client";

import { type CSSProperties, type TouchEvent, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLanguage } from "../language-provider";
import { translations } from "@/lib/i18n";

type ReviewItem = {
  quote: string;
  author: string;
  role?: string;
  title?: string;
  website?: string;
  tag: string;
  source?: "google";
  avatarUrl?: string;
};

const reviewThemes = [
  {
    accent: "#0400f0",
    accentSoft: "rgba(4, 0, 240, 0.08)",
    glow: "rgba(4, 0, 240, 0.18)",
  },
  {
    accent: "#05a5ff",
    accentSoft: "rgba(5, 165, 255, 0.1)",
    glow: "rgba(5, 165, 255, 0.18)",
  },
  {
    accent: "#ff9900",
    accentSoft: "rgba(255, 153, 0, 0.1)",
    glow: "rgba(255, 153, 0, 0.18)",
  },
  {
    accent: "#09215e",
    accentSoft: "rgba(9, 33, 94, 0.1)",
    glow: "rgba(9, 33, 94, 0.16)",
  },
];

function GoogleSourceBadge() {
  return (
    <span className="review-card-source" aria-label="Review de Google">
      <span className="review-card-google-wordmark" aria-hidden="true">
        <span className="review-card-google-letter review-card-google-blue">G</span>
        <span className="review-card-google-letter review-card-google-red">o</span>
        <span className="review-card-google-letter review-card-google-yellow">o</span>
        <span className="review-card-google-letter review-card-google-blue">g</span>
        <span className="review-card-google-letter review-card-google-green">l</span>
        <span className="review-card-google-letter review-card-google-red">e</span>
      </span>
      <span className="review-card-source-meta">
        <span className="review-card-source-label">Reviews</span>
        <span className="review-card-source-stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star key={starIndex} size={12} fill="currentColor" strokeWidth={1.7} />
          ))}
        </span>
      </span>
    </span>
  );
}

function ReviewCard({
  item,
  index,
}: {
  item: ReviewItem;
  index: number;
}) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const theme = reviewThemes[index % reviewThemes.length] ?? reviewThemes[0];
  const style = {
    "--review-accent": theme.accent,
    "--review-accent-soft": theme.accentSoft,
    "--review-glow": theme.glow,
  } as CSSProperties;

  return (
    <article className="review-card" style={style}>
      <div className="review-card-top">
        <span className="review-card-tag">{item.tag}</span>
        <div className="review-card-trust">
          {item.source === "google" ? (
            <GoogleSourceBadge />
          ) : (
            <div className="review-card-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" strokeWidth={1.8} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="review-card-quote-wrap">
        <Quote size={18} strokeWidth={2.2} className="review-card-quote-icon" />
        <p className="review-card-quote">{item.quote}</p>
      </div>

      <div className="review-card-footer">
        <span className="review-card-avatar">
          {item.avatarUrl && !avatarFailed ? (
            // Google profile avatars render more reliably here with a direct img fallback.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.avatarUrl}
              alt=""
              className="review-card-avatar-image"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            item.author
              .split(" ")
              .map((segment) => segment[0])
              .join("")
              .slice(0, 2)
          )}
        </span>
        <div className="review-card-meta">
          <p className="review-card-author">{item.author}</p>
          {(item.title ?? item.role) ? (
            <p className="review-card-title">{item.title ?? item.role}</p>
          ) : null}
          {item.website ? <p className="review-card-website">{item.website}</p> : null}
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const eyebrow = t.reviewsSection.eyebrow;
  const title = t.reviewsSection.title;
  const items = t.reviewsSection.items;
  const mobileResumeRef = useRef<number | null>(null);
  const mobileTouchStartXRef = useRef<number | null>(null);
  const mobileTouchCurrentXRef = useRef<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const syncCompactMode = () => {
      setIsCompactMode(mediaQuery.matches);
    };

    syncCompactMode();
    mediaQuery.addEventListener("change", syncCompactMode);

    return () => {
      mediaQuery.removeEventListener("change", syncCompactMode);
    };
  }, []);

  useEffect(() => {
    if (!isCompactMode || items.length <= 1 || isTouchPaused) {
      return undefined;
    }

    const autoAdvance = window.setInterval(() => {
      setMobileIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, 4200);

    return () => {
      window.clearInterval(autoAdvance);
    };
  }, [isCompactMode, isTouchPaused, items.length]);

  useEffect(() => {
    return () => {
      if (mobileResumeRef.current !== null) {
        window.clearTimeout(mobileResumeRef.current);
      }
    };
  }, []);

  const pauseMobileAutoplay = () => {
    if (!isCompactMode) {
      return;
    }

    setIsTouchPaused(true);

    if (mobileResumeRef.current !== null) {
      window.clearTimeout(mobileResumeRef.current);
    }
  };

  const resumeMobileAutoplay = () => {
    if (!isCompactMode) {
      return;
    }

    if (mobileResumeRef.current !== null) {
      window.clearTimeout(mobileResumeRef.current);
    }

    mobileResumeRef.current = window.setTimeout(() => {
      setIsTouchPaused(false);
    }, 2200);
  };

  const handleMobileNavigation = (nextIndex: number) => {
    pauseMobileAutoplay();
    setMobileIndex((nextIndex + items.length) % items.length);
    resumeMobileAutoplay();
  };

  const handleMobileTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    pauseMobileAutoplay();
    mobileTouchStartXRef.current = event.touches[0]?.clientX ?? null;
    mobileTouchCurrentXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleMobileTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    mobileTouchCurrentXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleMobileTouchEnd = () => {
    const startX = mobileTouchStartXRef.current;
    const currentX = mobileTouchCurrentXRef.current;

    mobileTouchStartXRef.current = null;
    mobileTouchCurrentXRef.current = null;

    if (startX === null || currentX === null) {
      resumeMobileAutoplay();
      return;
    }

    const deltaX = currentX - startX;
    const swipeThreshold = 42;

    if (Math.abs(deltaX) >= swipeThreshold) {
      handleMobileNavigation(deltaX < 0 ? mobileIndex + 1 : mobileIndex - 1);
      return;
    }

    resumeMobileAutoplay();
  };

  const getMobileFrameClassName = (index: number) => {
    const baseClassName = "review-card-mobile-frame";

    if (items.length <= 1) {
      return `${baseClassName} is-active`;
    }

    const previousIndex = (mobileIndex - 1 + items.length) % items.length;
    const nextIndex = (mobileIndex + 1) % items.length;

    if (index === mobileIndex) {
      return `${baseClassName} is-active`;
    }

    if (index === previousIndex) {
      return `${baseClassName} is-prev`;
    }

    if (index === nextIndex) {
      return `${baseClassName} is-next`;
    }

    return `${baseClassName} is-hidden`;
  };

  return (
    <section id="reviews" className="section-divider reviews-marquee-section">
      <div className="reviews-marquee-header">
        <div className="reviews-marquee-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title reviews-marquee-title">{title}</h2>
        </div>
      </div>

      <div className="reviews-mobile-slider-shell">
        <div
          className="reviews-mobile-stage"
          aria-label={`${title} en formato deslizable`}
          onTouchStart={handleMobileTouchStart}
          onTouchMove={handleMobileTouchMove}
          onTouchEnd={handleMobileTouchEnd}
          onTouchCancel={resumeMobileAutoplay}
        >
          {items.map((item, index) => (
            <div
              key={`mobile-${item.author}-${item.tag}-${index}`}
              className={getMobileFrameClassName(index)}
            >
              <ReviewCard item={item} index={index} />
            </div>
          ))}
        </div>

        {items.length > 1 ? (
          <div className="reviews-mobile-controls" aria-label="Controles de reviews">
            <div className="reviews-mobile-arrows">
              <button
                type="button"
                className="reviews-mobile-arrow"
                aria-label="Review anterior"
                onClick={() => handleMobileNavigation(mobileIndex - 1)}
              >
                <ChevronLeft size={18} strokeWidth={2.6} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="reviews-mobile-arrow"
                aria-label="Siguiente review"
                onClick={() => handleMobileNavigation(mobileIndex + 1)}
              >
                <ChevronRight size={18} strokeWidth={2.6} aria-hidden="true" />
              </button>
            </div>

            <div className="reviews-mobile-dots" aria-label="Posicion actual del slider">
              {items.map((item, index) => (
                <button
                  key={`review-dot-${item.author}-${index}`}
                  type="button"
                  className={`reviews-mobile-dot${
                    mobileIndex === index ? " is-active" : ""
                  }`}
                  aria-label={`Ir al review ${index + 1}`}
                  aria-pressed={mobileIndex === index}
                  onClick={() => handleMobileNavigation(index)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="reviews-marquee" aria-label={title}>
        <div className="reviews-marquee-rail">
          <div className="reviews-marquee-group">
            {items.map((item, index) => (
              <ReviewCard key={`${item.author}-${item.tag}-${index}`} item={item} index={index} />
            ))}
          </div>

          <div className="reviews-marquee-group" aria-hidden="true">
            {items.map((item, index) => (
              <ReviewCard
                key={`duplicate-${item.author}-${item.tag}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
