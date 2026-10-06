// src/components/product/ProductCard.tsx
import Image from "next/image";
import { Card, CardBody, Badge, ButtonLink } from "@/components/ui";
import { buildWhatsAppUrl, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean; 
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const whatsappUrl = buildWhatsAppUrl(
    productWhatsAppMessage(product.name, product.modelName)
  );

  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-charcoal-50 sm:aspect-square">
        {primaryImage ? (
          <Image
            src={primaryImage.imageUrl}
            alt={primaryImage.altText ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-charcoal-400">
            No image available
          </div>
        )}
      </div>

      <CardBody className="flex flex-1 flex-col">
        <div>
          <h3 className="text-base font-semibold md:text-xl">
            {product.name}
          </h3>
          {product.modelName && (
            <p className="mt-1 text-xs font-medium text-charcoal-400 md:text-sm">
              {product.modelName}
            </p>
          )}
        </div>
        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 text-sm">{product.shortDescription}</p>
        )}

        {product.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.features.slice(0, 3).map((feature, index) => (
              <Badge key={`${product.id}-feature-${index}`} variant="gold">
                {feature.featureName}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-charcoal-950 md:text-lg">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-sm text-charcoal-400 line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <ButtonLink href={`/products/${product.slug}`} variant="outline" size="sm" className="w-full px-2 text-xs md:px-3 md:text-sm">
            View Details
          </ButtonLink>
          <ButtonLink href={whatsappUrl} variant="whatsapp" size="sm" className="w-full px-2 text-xs md:px-3 md:text-sm" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </ButtonLink>
        </div>
      </CardBody>
    </Card>
  );
}