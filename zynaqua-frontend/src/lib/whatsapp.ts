const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

if (!WHATSAPP_NUMBER && typeof window !== "undefined") {
  // Fail loud in the browser console during dev rather than silently
  // producing a broken wa.me link with no number.
  console.error(
    "NEXT_PUBLIC_WHATSAPP_NUMBER is not set. WhatsApp links will not work."
  );
}


export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/** Navbar "WhatsApp Us" CTA — generic brand-level enquiry. */
export function navbarWhatsAppMessage(): string {
  return "Hello ZynAqua, I would like to know more about your products.";
}

/** Permanent floating WhatsApp button — present on every page. */
export function floatingWhatsAppMessage(): string {
  return "Hello ZynAqua, I would like to enquire about your water purifiers.";
}

export function productWhatsAppMessage(productName: string): string {
  return `Hello ZynAqua, I am interested in ${productName}. Please share more details.`;
}

/** AMC page WhatsApp CTA. */
export function amcWhatsAppMessage(): string {
  return "Hello ZynAqua, I would like to know more about your AMC plans.";
}

export function demoFormWhatsAppMessage(details: {
  name: string;
  mobile: string;
  email?: string;
  city: string;
  pincode: string;
  address: string;
}): string {
  const lines = [
    "Hello ZynAqua, I just submitted a Free Demo request:",
    `Name: ${details.name}`,
    `Mobile: ${details.mobile}`,
    details.email ? `Email: ${details.email}` : null,
    `City: ${details.city}`,
    `Pincode: ${details.pincode}`,
    `Address: ${details.address}`,
  ].filter(Boolean);
  return lines.join("\n");
}