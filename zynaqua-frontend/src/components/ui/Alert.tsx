import { Info, CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant: "error" | "success" | "info";
  title?: string;
  children: React.ReactNode;
}

export function Alert({ variant, title, children }: AlertProps) {
  const Icon = variant === "error" ? CircleX : variant === "success" ? CircleCheck : Info;
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-lg border p-3 text-sm",
        variant === "error" && "border-red-200 bg-red-50 text-red-700",
        variant === "success" && "border-emerald-200 bg-emerald-50 text-emerald-700",
        variant === "info" && "border-aqua-400/30 bg-aqua-50 text-aqua-700"
      )}
    >
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div>{title && <p className="font-semibold">{title}</p>}{children}</div>
    </div>
  );
}
