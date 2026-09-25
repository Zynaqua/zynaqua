"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-charcoal-950/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm overflow-y-auto bg-white p-6 shadow-elevated">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-extrabold text-charcoal-950">
            Zyn<span className="text-gold-500">Aqua</span>
          </span>
          <button aria-label="Close menu" onClick={onClose} className="p-2 -mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-3 text-base font-medium text-charcoal-700 hover:bg-charcoal-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppUrl(navbarWhatsAppMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block"
        >
          <Button variant="whatsapp" className="w-full">WhatsApp Us</Button>
        </a>
      </div>
    </div>
  );
}