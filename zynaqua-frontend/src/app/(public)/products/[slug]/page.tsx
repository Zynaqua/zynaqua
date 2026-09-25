// src/app/(public)/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";
import { FaqAccordion } from "@/components/product/FaqAccordion";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button, Badge } from "@/components/ui";
import { buildWhatsAppUrl, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/types";

// WHY Promise<{ slug: string }>: Next.js 15+ resolves dynamic route params
// asynchronously so the route shell can begin streaming before params are
// known. Accessing params.slug synchronously (Day 6's original pattern)
// throws at runtime on this Next.js version — awaiting it is now mandatory,
// not optional, in every function that receives `params`.
interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`, {
    next: { revalidate: 300 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load product");

  const body = await res.json();
  return body.data;
}

async function getRelatedProducts(slug: string): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}/related`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const body = await res.json();
  return body.data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description:
      product.shortDescription ??
      `${product.name} — premium water purifier from ZynAqua.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription ?? undefined,
      images: product.images[0] ? [product.images[0].imageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts] = await Promise.all([getRelatedProducts(slug)]);
  const whatsappUrl = buildWhatsAppUrl(productWhatsAppMessage(product.name));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal-400">
        <a href="/products" className="hover:text-charcoal-950">Products</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal-950">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <h1>{product.name}</h1>
          {product.shortDescription && (
            <p className="mt-2">{product.shortDescription}</p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-charcoal-950">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-charcoal-400 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {product.features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <Badge key={`${product.id}-feature-${index}`} variant="gold">
                  {feature.featureName}
                </Badge>
              ))}
            </div>
          )}

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 block">
            <Button variant="whatsapp" className="w-full sm:w-auto">
              Enquire on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {product.description && (
        <section className="mt-16 max-w-3xl">
          <h2 className="mb-4">Product Overview</h2>
          <p>{product.description}</p>
        </section>
      )}

      {product.specifications.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4">Specifications</h2>
          <SpecTable specifications={product.specifications} />
        </section>
      )}

      <section className="mt-16">
        <h2 className="mb-4">Frequently Asked Questions</h2>
        <FaqAccordion items={[]} />
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}

      <section className="mt-16 rounded-2xl bg-charcoal-950 px-8 py-10 text-center text-white">
        <h3 className="text-white">Have Questions About {product.name}?</h3>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
          <Button variant="whatsapp">Chat With Us on WhatsApp</Button>
        </a>
      </section>
    </div>
  );
}