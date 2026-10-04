import type { Metadata } from "next";
import { Card, CardBody } from "@/components/ui";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ZynAqua by phone, WhatsApp, or email.",
};

const CONTACT_DETAILS = [
  { label: "Phone", value: "+91 92271 19282", href: "tel:+919227119282" },
  {
    label: "WhatsApp",
    value: "+91 92271 19282",
    href: buildWhatsAppUrl(navbarWhatsAppMessage()),
  },
  { label: "Email", value: "support@zynaqua.com", href: "mailto:support@zynaqua.com" },
  { label: "Address", value: "Surat, Gujarat, India", href: null },
];

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: "https://wa.me/919227119282" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Amazon", href: "https://amazon.in" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1>Get in Touch</h1>
        <p className="mx-auto mt-4 max-w-lg">
          Have a question about a product, an existing AMC plan, or anything
          else? Reach us directly — we typically respond fastest on WhatsApp.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONTACT_DETAILS.map((detail) => (
          <Card key={detail.label}>
            <CardBody>
              <p className="text-sm font-medium text-charcoal-400">{detail.label}</p>
              {detail.href ? (
                <a
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-1 block text-lg font-semibold text-charcoal-950 hover:text-gold-700"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="mt-1 text-lg font-semibold text-charcoal-950">{detail.value}</p>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4">Follow Us</h2>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-charcoal-100 px-4 py-2 text-center text-sm font-medium text-charcoal-700 hover:bg-charcoal-50"
            >
              {social.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}