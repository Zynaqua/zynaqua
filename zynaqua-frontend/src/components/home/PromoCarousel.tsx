"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/images/promo/promo1.webp",
    alt: "Two-year unconditional coverage — all filters, electrical parts and spare parts covered",
  },
  // TODO(alt): Replace with approved descriptive copy.
  { id: 2, image: "/images/promo/promo2.webp", alt: "ZynAqua promotional image" },
  // TODO(alt): Replace with approved descriptive copy.
  { id: 3, image: "/images/promo/promo3.webp", alt: "ZynAqua promotional image" },
  // TODO(alt): Replace with approved descriptive copy.
  { id: 4, image: "/images/promo/promo4.webp", alt: "ZynAqua promotional image" },
];

export function PromoCarousel() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (userPaused || hoverPaused || reducedMotion) return;
    const timer = setInterval(() => setActive((prev) => (prev + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, [hoverPaused, reducedMotion, userPaused]);

  return (
    <div
      className="w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Promotions"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setHoverPaused(false);
      }}
    >
      <div className="relative aspect-[1280/714] w-full overflow-hidden rounded-2xl bg-charcoal-50">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${SLIDES.length}`}
            aria-hidden={index !== active}
            inert={index !== active ? true : undefined}
            className={`absolute inset-0 transition-opacity duration-500 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}
        {!reducedMotion && (
          <button
            type="button"
            aria-label={userPaused ? "Play promotions" : "Pause promotions"}
            onClick={() => setUserPaused((value) => !value)}
            className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-charcoal-950 shadow-card"
          >
            {userPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
      <div className="mt-2 flex justify-center gap-1">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className={`block h-2 rounded-full transition-all ${index === active ? "w-6 bg-gold-500" : "w-2 bg-charcoal-400"}`} />
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live={userPaused || hoverPaused || reducedMotion ? "polite" : "off"}>{`Slide ${active + 1} of ${SLIDES.length}`}</p>
    </div>
  );
}
