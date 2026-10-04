import { ButtonLink } from "@/components/ui";
import { buildPhoneUrl } from "@/lib/whatsapp";

interface ProductMobileCTAProps {
  price: number;
  href: string;
}

export function ProductMobileCTA({ price, href }: ProductMobileCTAProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal-100 bg-white/95 px-4 pt-2 shadow-elevated backdrop-blur-sm md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <span className="min-w-0 flex-1 truncate text-base font-bold text-charcoal-950">
          ₹{price.toLocaleString("en-IN")}
        </span>
        <ButtonLink
          href={buildPhoneUrl()}
          variant="ghost"
          size="icon"
          aria-label="Call ZynAqua"
        >
          <span aria-hidden="true">☎</span>
        </ButtonLink>
        <ButtonLink href={href} variant="whatsapp" size="sm" target="_blank" rel="noopener noreferrer">
          Enquire on WhatsApp
        </ButtonLink>
      </div>
    </div>
  );
}
