"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { id: 1, headline: "RO + Alkaline Purification", sub: "Pure, mineral-balanced water every day." },
  { id: 2, headline: "Free Installation & Demo", sub: "Our technician sets it up at your home, at no cost." },
  { id: 3, headline: "AMC Plans Available", sub: "Keep your purifier running like new, year-round." },
];

export function PromoCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-charcoal-950 px-8 py-10 text-white">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`transition-opacity duration-500 ${
            i === active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
          }`}
        >
          <h3 className="text-white">{slide.headline}</h3>
          <p className="mt-1 text-charcoal-400">{slide.sub}</p>
        </div>
      ))}
      <div className="mt-6 flex gap-2">
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