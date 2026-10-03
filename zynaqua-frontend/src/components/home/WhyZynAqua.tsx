import {
  BadgeIndianRupee,
  Headphones,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const REASONS = [
  {
    title: "Genuine Technology",
    desc: "Real RO + UV + Alkaline purification — no shortcuts.",
    icon: ShieldCheck,
  },
  {
    title: "Free Installation",
    desc: "Expert-fitted at your home, included with every purchase.",
    icon: Wrench,
  },
  {
    title: "Reliable AMC Support",
    desc: "Scheduled maintenance so your purifier never lets you down.",
    icon: Headphones,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges — what you see is what you pay.",
    icon: BadgeIndianRupee,
  },
];

export function WhyZynAqua() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {REASONS.map((reason) => (
        <div
          key={reason.title}
          className="rounded-xl border border-charcoal-100 bg-white p-5 shadow-card"
        >
          <div
            className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gold-500/15 text-charcoal-950"
            aria-hidden="true"
          >
            <reason.icon size={22} strokeWidth={1.8} />
          </div>

          <h4 className="text-lg">{reason.title}</h4>

          <p className="mt-2 text-sm">{reason.desc}</p>
        </div>
      ))}
    </div>
  );
}