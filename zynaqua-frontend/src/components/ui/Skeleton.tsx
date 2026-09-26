import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-charcoal-100", className)}
      {...props}
    />
  );
}