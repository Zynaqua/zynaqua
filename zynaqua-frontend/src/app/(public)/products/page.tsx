import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui";

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
    <Section>
      <SectionHeading title="Our Products" description="Browse our full range of water purifiers and accessories. Tap any product to see full specifications, or WhatsApp us directly." />
      <div className="mt-10">
        {products.length > 0 ? (
          <ProductGrid products={products} groupByCategory />
        ) : (
          <p className="text-charcoal-400">No products available right now — please check back soon.</p>
        )}
      </div>
      </Section>
  );
}