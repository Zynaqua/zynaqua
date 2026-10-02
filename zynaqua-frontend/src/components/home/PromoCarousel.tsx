"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { id: 1, image: "/images/promo/promo1.webp", alt: "ZynAqua promotional image 1" },
  { id: 2, image: "/images/promo/promo2.webp", alt: "ZynAqua promotional image 2" },
  { id: 3, image: "/images/promo/promo3.webp", alt: "ZynAqua promotional image 3" },
  { id: 4, image: "/images/promo/promo4.webp", alt: "ZynAqua promotional image 4" },
];

export function PromoCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden" aria-live="polite">
        <img
          src={SLIDES[active].image}
          alt={SLIDES[active].alt}
          className="block h-auto w-full"
        />
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-gold-500" : "w-1.5 bg-charcoal-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}