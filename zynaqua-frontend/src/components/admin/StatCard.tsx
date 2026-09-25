import { Card, CardBody } from "@/components/ui";

interface StatCardProps {
  label: string;
  value: number;
  accent?: "neutral" | "gold" | "aqua";
}

export function StatCard({ label, value, accent = "neutral" }: StatCardProps) {
  const accentClass =
    accent === "gold" ? "text-gold-600" : accent === "aqua" ? "text-aqua-600" : "text-charcoal-950";

  return (
    <Card>
      <CardBody>
        <p className="text-sm font-medium text-charcoal-400">{label}</p>
        <p className={`mt-1 text-3xl font-bold ${accentClass}`}>{value.toLocaleString("en-IN")}</p>
      </CardBody>
    </Card>
  );
}