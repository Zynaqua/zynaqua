// src/app/(public)/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";
import { FaqAccordion } from "@/components/product/FaqAccordion";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductMobileCTA } from "@/components/product/ProductMobileCTA";
import { ButtonLink, Badge, Section, SectionHeading } from "@/components/ui";
import { buildWhatsAppUrl, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT_DETAIL_SPECS, PRODUCT_HIGHLIGHTS } from "@/components/product/productDetails";

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
    title: product.modelName
      ? `${product.name} - ${product.modelName}`
      : product.name,
    description:
      product.shortDescription ??
      `${product.name} — premium water purifier from ZynAqua.`,
    openGraph: {
      title: product.modelName
        ? `${product.name} - ${product.modelName}`
        : product.name,
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

  const modelVariants = relatedProducts.filter(
    (item) =>
      item.name === product.name &&
      item.slug !== product.slug
  );

  const otherProducts = relatedProducts.filter(
    (item) => item.name !== product.name
  );

  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];
  const whatsappUrl = buildWhatsAppUrl(
    productWhatsAppMessage(product.name, product.modelName)
  );
  const faqItems: { question: string; answer: string }[] = [];

  return (
    <Section className="pb-28 md:pb-24">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-charcoal-400">
        <Link href="/products" className="hover:text-charcoal-950">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal-950">
          {product.name}
          {product.modelName ? ` - ${product.modelName}` : ""}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <h1 className="text-4xl md:text-5xl">{product.name}</h1>

          {product.modelName && (
            <p className="mt-1 text-sm font-medium text-charcoal-400">
              {product.modelName}
            </p>
          )}
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

          {modelVariants.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-base font-semibold">Choose Model</h3>

              <div className="grid grid-cols-2 gap-3">
                <div aria-current="true" className="rounded-2xl border-2 border-gold-500 bg-warm p-3">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-charcoal-50">
                    {primaryImage && (
                      <Image
                        src={primaryImage.imageUrl}
                        alt={product.modelName ? `${product.name} ${product.modelName}` : product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 200px"
                        className="object-contain p-2"
                      />
                    )}
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {product.modelName}
                  </p>

                  <p className="text-sm text-charcoal-500">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {modelVariants.map((variant) => {
                  const variantPrimaryImage =
                    variant.images.find((image) => image.isPrimary) ?? variant.images[0];

                  return (
                    <Link
                      key={variant.id}
                      href={`/products/${variant.slug}`}
                      aria-current="false"
                      className="rounded-2xl border border-charcoal-100 p-3 transition hover:border-gold-700 focus-visible:border-gold-700"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-charcoal-50">
                        {variantPrimaryImage && (
                          <Image
                            src={variantPrimaryImage.imageUrl}
                            alt={variant.modelName ? `${variant.name} ${variant.modelName}` : variant.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 200px"
                            className="object-contain p-2"
                          />
                        )}
                      </div>

                      <p className="mt-2 text-sm font-semibold">
                        {variant.modelName}
                      </p>

                      <p className="text-sm text-charcoal-400">
                        ₹{variant.price.toLocaleString("en-IN")}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {product.features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <Badge key={`${product.id}-feature-${index}`} variant="gold">
                  {feature.featureName}
                </Badge>
              ))}
            </div>
          )}

          <ButtonLink href={whatsappUrl} variant="whatsapp" className="mt-6 w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
            Enquire on WhatsApp
          </ButtonLink>
        </div>
      </div>

      <section className="mt-12">
        <SectionHeading title="Top Highlights" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Purification", "10 Stage RO + UV"],
            ["Filter Life", "2 Years"],
            ["Storage", "10 Litres"],
            ["Installation", "Wall Mount"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-charcoal-100 bg-charcoal-50 p-3 sm:p-4">
              <p className="text-xs font-medium text-charcoal-500">{label}</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-charcoal-950">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {product.description && (
        <section className="mt-14 max-w-3xl">
          <SectionHeading title="Product Overview" />
          <p>{product.description}</p>
        </section>
      )}

      <section className="mt-12">
        <SectionHeading title="Key Product Highlights" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRODUCT_HIGHLIGHTS.map(([title, description], index) => (
            <article key={title} className="rounded-xl border border-charcoal-100 bg-white p-4 shadow-card">
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400/30 text-sm font-semibold">{index + 1}</span>
                <div>
                  <h3 className="text-base">{title}</h3>
                  <p className="mt-2 text-sm leading-6">{description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="Specifications" />
        <div className="mt-6">
          <SpecTable specifications={[
              ...PRODUCT_DETAIL_SPECS.map(([specificationName, specificationValue], index) => ({
                id: 100000 + index,
                specificationName,
                specificationValue,
                displayOrder: index,
              })),
              ...product.specifications.map((spec) => ({
                ...spec,
                displayOrder: PRODUCT_DETAIL_SPECS.length + spec.displayOrder,
              })),
            ]} />
        </div>
      </section>

      {faqItems.length > 0 && (
        <section className="mt-14">
          <SectionHeading title="Frequently Asked Questions" />
          <FaqAccordion items={faqItems} />
        </section>
      )}

      {otherProducts.length > 0 && (
        <section className="mt-14">
          <SectionHeading title="You May Also Like" />
          <ProductGrid products={otherProducts} />
        </section>
      )}

      <section className="mt-14 rounded-2xl bg-charcoal-950 px-6 py-10 text-center text-white sm:px-8">
        <h3 className="text-white">Have Questions About {product.name}?</h3>
        <ButtonLink href={whatsappUrl} variant="whatsapp" className="mt-4" target="_blank" rel="noopener noreferrer">
          Chat With Us on WhatsApp
        </ButtonLink>
      </section>
      <ProductMobileCTA price={product.price} href={whatsappUrl} />
    </Section>
  );
}