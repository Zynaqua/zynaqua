"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { buildWhatsAppUrl, navbarWhatsAppMessage } from "@/lib/whatsapp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  pathname: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ isOpen, onClose, links, pathname, triggerRef }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-charcoal-950/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute right-0 top-0 h-full w-[min(86%,24rem)] overflow-y-auto bg-white p-6 shadow-elevated">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-extrabold text-charcoal-950">
            Zyn<span className="text-gold-500">Aqua</span>
          </span>
          <button ref={closeButtonRef} type="button" aria-label="Close menu" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-950">
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
                aria-current={pathname === link.href ? "page" : undefined}
                className={`block rounded-lg border-l-2 px-3 py-3 text-base font-medium ${
                  pathname === link.href
                    ? "border-gold-500 bg-charcoal-50 text-charcoal-950"
                    : "border-transparent text-charcoal-700 hover:bg-charcoal-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <ButtonLink
            href={buildWhatsAppUrl(navbarWhatsAppMessage())}
            variant="whatsapp"
            className="w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}