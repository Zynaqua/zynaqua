import {
  BadgeIndianRupee,
  Headphones,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui";

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
        <Card
          key={reason.title}
          accentTop
          className="group"
        >
          <CardBody>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gold-400/30 text-charcoal-950 transition-colors group-hover:bg-gold-500" aria-hidden="true">
              <reason.icon size={22} strokeWidth={1.8} />
            </div>
            <h3 className="text-base md:text-lg">{reason.title}</h3>
            <p className="mt-2 text-sm leading-6">{reason.desc}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}