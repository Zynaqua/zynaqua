import { ButtonLink } from "@/components/ui";
import { DemoButton } from "@/components/home/DemoButton";
import {
  buildPhoneUrl,
  buildWhatsAppUrl,
  displayPhoneNumber,
  navbarWhatsAppMessage,
} from "@/lib/whatsapp";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-100 bg-white/95 px-3 pt-2 shadow-elevated backdrop-blur-sm md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-3 items-center gap-2">
        <ButtonLink
          href={buildPhoneUrl()}
          variant="ghost"
          size="sm"
          aria-label={`Call ZynAqua at ${displayPhoneNumber()}`}
          className="flex-col gap-0.5 px-2 text-xs"
        >
          <span aria-hidden="true" className="text-base leading-none">☎</span>
          Call
        </ButtonLink>
        <ButtonLink
          href={buildWhatsAppUrl(navbarWhatsAppMessage())}
          variant="whatsapp"
          size="sm"
          aria-label="Chat with ZynAqua on WhatsApp"
          className="flex-col gap-0.5 px-2 text-xs"
        >
          <span aria-hidden="true" className="text-base leading-none">⌕</span>
          WhatsApp
        </ButtonLink>
        <DemoButton variant="primary" size="sm" className="flex-col gap-0.5 px-2 text-xs">
          <span aria-hidden="true" className="text-base leading-none">＋</span>
          Book Demo
        </DemoButton>
      </div>
    </nav>
  );
}
