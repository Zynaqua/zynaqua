import Link from "next/link";
import { Button } from "@/components/ui";

export function AmcTeaser() {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-aqua-500/10 px-8 py-10 sm:flex-row">
      <div className="space-y-3">
        <h3>Keep Your Purifier Running Like New</h3>
        <p className="max-w-md">
          Our AMC plans cover filter replacement, servicing, and genuine parts.
        </p>
      </div>
      <Link href="/amc">
        <Button variant="secondary">Explore AMC Plans</Button>
      </Link>
    </div>
  );
}