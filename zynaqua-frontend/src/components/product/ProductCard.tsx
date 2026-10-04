// src/components/product/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, Badge, Button } from "@/components/ui";
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
    <Card interactive className="flex h-full flex-col overflow-hidden">
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
          <h4 className="text-sm font-semibold md:text-xl">
            {product.name}
          </h4>
          {product.modelName && (
            <p className="mt-1 text-xs font-medium text-charcoal-500 md:text-sm">
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

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-sm font-bold text-charcoal-950 md:text-lg">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-sm text-charcoal-400 line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={`/products/${product.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-full px-2 text-xs md:h-auto md:px-3 md:py-1.5 md:text-sm"
            >
              View Details
            </Button>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="whatsapp"
              size="sm"
              className="h-9 w-full px-2 text-xs md:h-auto md:px-3 md:py-1.5 md:text-sm"
            >
              WhatsApp
            </Button>
          </a>
        </div>
      </CardBody>
    </Card>
  );
}