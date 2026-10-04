// src/app/page.tsx
import { DemoForm } from "@/components/home/DemoForm";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyZynAqua } from "@/components/home/WhyZynAqua";
import { AmcTeaser } from "@/components/home/AmcTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-16 px-4 py-10 sm:px-6">
      <section id="book-demo" className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-3xl flex-col items-center">
          <h1 className="max-w-[20rem] text-3xl font-bold leading-tight md:max-w-3xl md:text-5xl">
            Premium Water Purifiers for Your Home
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-charcoal-600 md:mt-5 md:text-base">
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