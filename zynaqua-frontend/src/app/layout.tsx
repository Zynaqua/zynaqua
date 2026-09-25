import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZynAqua — Premium Water Purifiers",
    template: "%s | ZynAqua",
  },
  description:
    "Premium water purifiers for your home. Book a free demo and get expert-fitted RO purification today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-white text-charcoal-950 antialiased">
        {children}
      </body>
    </html>
  );
}