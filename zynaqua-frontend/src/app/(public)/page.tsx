// src/app/page.tsx
import { DemoForm } from "@/components/home/DemoForm";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyZynAqua } from "@/components/home/WhyZynAqua";
import { AmcTeaser } from "@/components/home/AmcTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-10">
      <section id="book-demo" className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-3xl flex-col items-center">
          <h1>Premium Water Purifiers for Your Home</h1>
          <p className="mt-3 max-w-2xl">
            RO + Alkaline purification, free installation, and reliable after-sales
            support — trusted by homes across Surat.
          </p>
        </div>
        <DemoForm />
      </section>

      <section><PromoCarousel /></section>

      <section>
        <h2 className="mb-6">Featured Products</h2>
        <FeaturedProducts />
      </section>

      <section>
        <h2 className="mb-6">Why Buy From ZynAqua</h2>
        <WhyZynAqua />
      </section>

      <section><AmcTeaser /></section>

      <section><FinalCTA /></section>
    </div>
  );
}