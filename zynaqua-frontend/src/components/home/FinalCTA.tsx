import { buildWhatsAppUrl, floatingWhatsAppMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui";

export function FinalCTA() {
  return (
    <div className="rounded-2xl bg-charcoal-950 px-8 py-12 text-center text-white">
      <h2 className="text-white">Ready for Pure, Safe Water at Home?</h2>
      <p className="mx-auto mt-2 max-w-lg text-charcoal-400">
        Book a free demo today or chat with us directly on WhatsApp.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href="#book-demo">
          <Button variant="secondary">Book Free Demo</Button>
        </a>
        <a
          href={buildWhatsAppUrl(floatingWhatsAppMessage())}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="whatsapp">WhatsApp Us</Button>
        </a>
      </div>
    </div>
  );
}