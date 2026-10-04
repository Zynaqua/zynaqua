import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ZynAqua's approach to water purification, quality, and customer trust.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <section className="text-center">
        <h1>Water You Can Trust</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 md:text-base md:leading-relaxed">
          ZynAqua builds water purifiers designed around one priority: genuinely
          clean, safe drinking water for your home — without shortcuts.
        </p>
      </section>

      {/* Who We Are */}
      <section className="mt-16">
        <h2 className="mb-4">Who We Are</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          ZynAqua is a water purification brand focused on residential RO, UV,
          and alkaline purification systems. We design our products around
          real household needs — reliable purification, straightforward
          installation, and after-sales support that's easy to reach.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mt-12">
        <h2 className="mb-4">Our Mission</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          To make genuinely effective water purification accessible and
          dependable for every home, backed by transparent pricing and
          service you can count on.
        </p>
      </section>

      {/* Our Approach */}
      <section className="mt-12">
        <h2 className="mb-4">Our Approach</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          We focus on multi-stage purification — combining reverse osmosis,
          UV, and alkaline mineral technology depending on the product — and
          pair every purifier with expert-fitted installation, so what you
          receive is set up correctly from day one.
        </p>
      </section>

      {/* Technology */}
      <section className="mt-12">
        <h2 className="mb-4">Technology</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          Our purifiers use RO membranes for dissolved-solids reduction, UV
          purification for microbiological safety, and alkaline or
          copper-infused cartridges for mineral balance — the specific
          combination varies by model; see each product's specification
          table for exact details.
        </p>
      </section>

      {/* Quality */}
      <section className="mt-12">
        <h2 className="mb-4">Quality</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          Every unit goes through installation by trained technicians, and
          our AMC plans are built to keep purification performance consistent
          well beyond the first year of use.
        </p>
      </section>

      {/* Brand Values */}
      <section className="mt-12">
        <h2 className="mb-4">Brand Values</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "Transparency", desc: "Clear pricing, no hidden charges." },
            { title: "Reliability", desc: "Support that's easy to reach when you need it." },
            { title: "Craftsmanship", desc: "Purification technology chosen for real effectiveness, not marketing." },
          ].map((value) => (
            <li key={value.title} className="rounded-xl border border-charcoal-100 p-5">
              <h4>{value.title}</h4>
              <p className="mt-1 text-sm leading-6">{value.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why ZynAqua */}
      <section className="mt-12">
        <h2 className="mb-4">Why ZynAqua</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          We keep the range focused rather than overwhelming, so every
          product on our site is one we can stand behind — see our{" "}
          <Link href="/products" className="font-medium text-charcoal-950 underline">
            full product range
          </Link>{" "}
          or explore our{" "}
          <Link href="/amc" className="font-medium text-charcoal-950 underline">
            AMC plans
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-2xl bg-charcoal-950 px-8 py-10 text-center text-white">
        <h3 className="text-white">Ready to Experience ZynAqua?</h3>
        <Link href="/products" className="mt-4 inline-block">
          <Button variant="secondary">Browse Products</Button>
        </Link>
      </section>
    </div>
  );
}