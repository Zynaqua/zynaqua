"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui";
import { MobileMenu } from "./MobileMenu";
import { DemoButton } from "@/components/home/DemoButton";
import {
  buildWhatsAppUrl,
  navbarWhatsAppMessage,
} from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/amc", label: "AMC" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-shadow duration-200 ${
          isScrolled
            ? "bg-white shadow-card"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-charcoal-950"
          >
            Zyn<span className="text-gold-500">Aqua</span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`border-b-2 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "border-gold-500 text-charcoal-950"
                      : "border-transparent text-charcoal-700 hover:border-gold-400 hover:text-charcoal-950"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop WhatsApp */}
          <div className="hidden items-center gap-2 md:flex">
            <DemoButton size="sm">Book Free Demo</DemoButton>
            <ButtonLink href={buildWhatsAppUrl(navbarWhatsAppMessage())} variant="whatsapp" size="sm" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a href="tel:+919227119282" className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-charcoal-950" aria-label="Call ZynAqua">
              <span aria-hidden="true">☎</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open menu"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-950"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        pathname={pathname}
        triggerRef={menuButtonRef}
      />
    </>
  );
}