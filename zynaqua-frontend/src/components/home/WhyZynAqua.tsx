const REASONS = [
  {
    title: "Genuine Technology",
    desc: "Real RO + UV + Alkaline purification — no shortcuts.",
  },
  {
    title: "Free Installation",
    desc: "Expert-fitted at your home, included with every purchase.",
  },
  {
    title: "Reliable AMC Support",
    desc: "Scheduled maintenance so your purifier never lets you down.",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges — what you see is what you pay.",
  },
];

export function WhyZynAqua() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {REASONS.map((reason) => (
        <div key={reason.title}>
          <div
            className="mb-3 h-10 w-10 rounded-lg bg-gold-500/15"
            aria-hidden="true"
          />

          <h4>{reason.title}</h4>

          <p className="mt-1 text-sm">
            {reason.desc}
          </p>
        </div>
      ))}
    </div>
  );
}