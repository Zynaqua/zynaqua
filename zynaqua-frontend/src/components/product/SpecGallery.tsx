import Image from "next/image";
import { SPEC_IMAGES, type ProductTier } from "./productDetails";

export function SpecGallery({ tier }: { tier: ProductTier }) {
  const images = SPEC_IMAGES.filter((img) => img.tiers.includes(tier));
  if (images.length === 0) return null;

  const isOdd = images.length % 2 === 1;

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((img, index) => (
        <div
          key={img.src}
          className={`relative aspect-video overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-card ${
            isOdd && index === images.length - 1 ? "md:col-span-2" : ""
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}