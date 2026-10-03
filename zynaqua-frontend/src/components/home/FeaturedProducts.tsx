import { ProductGrid } from "@/components/product/ProductGrid";
import Link from "next/link";
import type { Product } from "@/types";

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/featured`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to load featured products");
  }

  const body = await res.json();
  return body.data;
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <ProductGrid products={products} />
      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="font-semibold text-charcoal-950 transition-colors hover:text-charcoal-700"
        >
          View All Products →
        </Link>
      </div>
    </div>
  );
}

export interface ProductImageView {
  id: string; // `${productId}-image-${index}`, generated at fetch time
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
}