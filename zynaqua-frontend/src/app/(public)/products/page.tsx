import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse ZynAqua's range of premium water purifiers and accessories.",
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {

    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  const body = await res.json();
  return body.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <h1>Our Products</h1>
      <p className="mt-2 max-w-xl">
        Browse our full range of water purifiers and accessories. Tap any
        product to see full specifications, or WhatsApp us directly.
      </p>

      <div className="mt-10">
        {products.length > 0 ? (
          <ProductGrid products={products} groupByCategory />
        ) : (
          <p className="text-charcoal-400">No products available right now — please check back soon.</p>
        )}
      </div>
    </div>
  );
}