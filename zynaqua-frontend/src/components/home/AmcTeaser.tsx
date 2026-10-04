import { ButtonLink } from "@/components/ui";

export function AmcTeaser() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-aqua-400/30 bg-white/70 px-6 py-8 sm:flex-row sm:items-center sm:px-10">
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl">Keep Your Purifier Running Like New</h2>
        <p className="max-w-md">
          Our AMC plans cover filter replacement, servicing, and genuine parts.
        </p>
      </div>
      <ButtonLink href="/amc" variant="secondary">Explore AMC Plans</ButtonLink>
    </div>
  );
}