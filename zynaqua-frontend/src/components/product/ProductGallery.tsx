"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => a.displayOrder - b.displayOrder);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(sorted.findIndex((img) => img.isPrimary), 0)
  );

  if (sorted.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl bg-charcoal-50 text-charcoal-400">
        No image available
      </div>
    );
  }

  const active = sorted[activeIndex];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-charcoal-50">
        <Image
          src={active.imageUrl}
          alt={active.altText ?? productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {sorted.length > 1 && (
        <div className="mt-3 flex gap-2">
          {sorted.map((img, index) => (
            <button
              key={`${img.imageUrl}-${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${productName}`}
              aria-current={index === activeIndex}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                index === activeIndex ? "border-gold-500" : "border-transparent"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}