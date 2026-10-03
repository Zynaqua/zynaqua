"use client";

import Image from "next/image";
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
      <div className="relative h-52 w-full overflow-hidden bg-white md:h-96" aria-live="polite">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
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