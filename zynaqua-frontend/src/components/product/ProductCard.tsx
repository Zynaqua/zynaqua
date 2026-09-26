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
  const whatsappUrl = buildWhatsAppUrl(productWhatsAppMessage(product.name));

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square bg-charcoal-50">
        {primaryImage ? (
          <Image
            src={primaryImage.imageUrl}
            alt={primaryImage.altText ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-charcoal-400">
            No image available
          </div>
        )}
      </div>

      <CardBody className="flex flex-1 flex-col">
        <h4>{product.name}</h4>
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
          <span className="text-lg font-bold text-charcoal-950">
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
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="sm" className="w-full">WhatsApp</Button>
          </a>
        </div>
      </CardBody>
    </Card>
  );
}