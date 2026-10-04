
import Link from "next/link";
import {
  buildWhatsAppUrl,
  navbarWhatsAppMessage,
} from "@/lib/whatsapp";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/amc", label: "AMC" },
];

const SOCIAL_LINKS = [
  {
    href: buildWhatsAppUrl(navbarWhatsAppMessage()),
    label: "WhatsApp",
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    href: "https://amazon.in",
    label: "Amazon",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-charcoal-950 text-charcoal-100">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-x-10 gap-y-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <span className="text-lg font-extrabold text-white">
            Zyn
            <span className="text-gold-500">
              Aqua
            </span>
          </span>

          <p className="mt-3 text-sm text-charcoal-400">
            Premium water purifiers built on trust,
            real purification technology, and
            dependable after-sales service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="mb-3 text-sm font-semibold text-white">
            Quick Links
          </h5>

          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-charcoal-400 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="mb-3 text-sm font-semibold text-white">
            Contact
          </h5>

          <ul className="space-y-2 text-sm text-charcoal-400">
            <li>WhatsApp: +91 92271 19282</li>
            <li>Surat, Gujarat, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h5 className="mb-3 text-sm font-semibold text-white">
            Follow Us
          </h5>

          <ul className="space-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal-400 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-900 px-6 py-5">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-4 text-xs text-charcoal-400 sm:flex-row sm:px-6">

          <p>
            &copy; {new Date().getFullYear()} ZynAqua.
            All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}