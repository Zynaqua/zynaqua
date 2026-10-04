import { buildWhatsAppUrl, floatingWhatsAppMessage } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui";
import { DemoButton } from "./DemoButton";

export function FinalCTA() {
  return (
    <div className="rounded-2xl bg-charcoal-950 px-6 py-10 text-center text-white sm:px-10 md:py-14">
      <h2 className="text-white">Ready for Pure, Safe Water at Home?</h2>
      <p className="mx-auto mt-2 max-w-lg text-footer">
        Book a free demo today or chat with us directly on WhatsApp.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <DemoButton variant="secondary">
          Book Free Demo
        </DemoButton>
        <ButtonLink
          href={buildWhatsAppUrl(floatingWhatsAppMessage())}
          variant="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </ButtonLink>
      </div>
    </div>
  );
}