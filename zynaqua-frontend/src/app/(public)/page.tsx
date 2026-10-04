// src/app/page.tsx
import { DemoButton } from "@/components/home/DemoButton";
import Image from "next/image";
import { Check } from "lucide-react";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyZynAqua } from "@/components/home/WhyZynAqua";
import { AmcTeaser } from "@/components/home/AmcTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <div>
      <Section tone="warm" padding="hero">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
              Premium Water Purifiers
            </p>
            <h1 className="max-w-xl text-[2.5rem] leading-[1.08] md:text-5xl lg:text-[3.5rem]">
              Pure water, designed for your home.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-charcoal-700">
              RO + Alkaline purification, free installation, and reliable after-sales
              support — trusted by homes across Surat.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <DemoButton size="lg">Book Free Demo</DemoButton>
              <ButtonLink
                href={buildWhatsAppUrl(navbarWhatsAppMessage())}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                WhatsApp
              </ButtonLink>
            </div>
            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-semibold text-charcoal-950 md:text-5xl">2-Year</span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">Unconditional Coverage</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-charcoal-700 md:flex-row md:gap-5">
                {["All filters covered", "All electrical covered", "All spare parts covered"].map((item) => (
                  <li key={item} className="flex items-center gap-2"><Check size={16} className="text-gold-700" aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-aqua-50" aria-hidden="true" />
            <Image
              src="/images/products/zynaqua-model-1.webp"
              alt="ZynAqua water purifier"
              className="relative mx-auto h-auto max-h-[280px] w-auto max-w-full object-contain md:max-h-[560px]"
              width="615"
              height="890"
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 80vw, 42vw"
            />
          </div>
        </div>
      </Section>

      <Section tone="warm" padding="tail">
        <PromoCarousel />
      </Section>

      <Section tone="white">
        <SectionHeading title="Featured Products" description="Explore dependable purification built for modern homes." />
        <div className="mt-8"><FeaturedProducts /></div>
      </Section>

      <Section tone="warm">
        <SectionHeading title="Why Buy From ZynAqua" description="Straightforward products and dependable support from a team you can reach." />
        <div className="mt-8"><WhyZynAqua /></div>
      </Section>

      <Section tone="aqua"><AmcTeaser /></Section>

      <Section tone="white"><FinalCTA /></Section>
    </div>
  );
}