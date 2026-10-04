import type { Metadata } from "next";
import { Card, CardBody, Button, Container, SectionHeading } from "@/components/ui";
import { FaqAccordion } from "@/components/product/FaqAccordion";
import { buildWhatsAppUrl, amcWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "AMC Plans",
  description: "Keep your ZynAqua water purifier running reliably with our Annual Maintenance Contract plans.",
};

const BENEFITS = [
  { title: "Scheduled Servicing", desc: "Regular maintenance visits to keep purification performance consistent." },
  { title: "Filter Replacement", desc: "Cartridges and membranes replaced on schedule, before performance drops." },
  { title: "Genuine Parts", desc: "Only manufacturer-approved parts used in every service visit." },
  { title: "Priority Support", desc: "AMC customers get priority scheduling for service requests." },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Enrol", desc: "Reach out via WhatsApp to enrol your purifier in an AMC plan." },
  { step: "2", title: "Scheduled Visits", desc: "Our technician visits on a set schedule to service and inspect your unit." },
  { step: "3", title: "Filter & Parts Replacement", desc: "Filters and parts are replaced as part of your plan, at no extra service charge." },
  { step: "4", title: "Ongoing Support", desc: "Reach out any time between visits if something feels off." },
];

const AMC_FAQ = [
  {
    question: "What does an AMC plan cover?",
    answer: "Scheduled servicing, filter and cartridge replacement, and genuine parts for your ZynAqua purifier, as outlined when you enrol.",
  },
  {
    question: "How do I enrol my purifier in an AMC plan?",
    answer: "Message us on WhatsApp with your purifier model and we'll walk you through enrolment and scheduling.",
  },
];

export default function AmcPage() {
  const whatsappUrl = buildWhatsAppUrl(amcWhatsAppMessage());

  return (
    <Container className="max-w-4xl py-16">
      {/* AMC Hero */}
      <section>
        <SectionHeading
          title="Keep Your Purifier Running Like New"
          level="h1"
          align="center"
          description="Our AMC plans handle servicing, filter replacement, and genuine parts — so your purifier keeps delivering the water quality it did on day one."
        />
      </section>

      {/* Why AMC? */}
      <section className="mt-16">
        <h2 className="mb-4">Why AMC?</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          Purification performance depends on filters and membranes being
          replaced on schedule. Without regular servicing, even a well-built
          purifier gradually loses effectiveness — an AMC plan removes the
          guesswork of when that maintenance is due.
        </p>
      </section>

      {/* AMC Benefits */}
      <section className="mt-12">
        <h2 className="mb-6">AMC Benefits</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <Card key={benefit.title}>
              <CardBody>
                <h4>{benefit.title}</h4>
                <p className="mt-1 text-sm leading-6">{benefit.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Maintenance */}
      <section className="mt-12">
        <h2 className="mb-4">Maintenance</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          Scheduled visits check purification performance, tank condition,
          and overall system health — catching small issues before they
          affect your water quality.
        </p>
      </section>

      {/* Filter Replacement */}
      <section className="mt-12">
        <h2 className="mb-4">Filter Replacement</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          Filters and membranes are replaced on a schedule appropriate to
          your specific purifier model, included as part of your AMC plan —
          no separate charge at the time of replacement.
        </p>
      </section>

      {/* Genuine Parts */}
      <section className="mt-12">
        <h2 className="mb-4">Genuine Parts</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          Every replacement part used during an AMC service visit is
          manufacturer-approved — never a generic substitute.
        </p>
      </section>

      {/* Service Support */}
      <section className="mt-12">
        <h2 className="mb-4">Service Support</h2>
        <p className="text-sm leading-6 md:text-base md:leading-relaxed">
          AMC customers can reach us directly on WhatsApp between scheduled
          visits if something needs attention sooner.
        </p>
      </section>

      {/* How AMC Works */}
      <section className="mt-12">
        <h2 className="mb-6">How AMC Works</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-bold text-gold-700">
                {item.step}
              </span>
              <div>
                <h4>{item.title}</h4>
                <p className="mt-1 text-sm leading-6">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="mb-4">Frequently Asked Questions</h2>
        <FaqAccordion items={AMC_FAQ} />
      </section>

      {/* WhatsApp CTA — AMC-specific message from Day 3's lib/whatsapp.ts */}
      <section className="mt-16 rounded-2xl bg-charcoal-950 px-8 py-10 text-center text-white">
        <h3 className="text-white">Ready to Enrol in an AMC Plan?</h3>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
          <Button variant="whatsapp">WhatsApp Us About AMC</Button>
        </a>
      </section>
    </Container>
  );
}